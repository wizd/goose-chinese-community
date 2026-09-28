---
title: "Hooks：在每一个 goose 事件上运行你自己的脚本"
description: "goose 现在通过 Open Plugins 规范支持生命周期钩子。把 shell 脚本接到 PreToolUse、PostToolUse、UserPromptSubmit、SessionStart 等事件上。"
image: /img/blog/goose-hooks.jpg
authors:
  - alexhancock
---

![Hooks：在每一个 goose 事件上运行你自己的脚本](/img/blog/goose-hooks.jpg)

goose 现在支持**生命周期钩子**。把一个插件放进磁盘上的目录，会话中有事情发生时 goose 就会运行你的 shell 脚本：工具即将触发、工具刚刚结束、用户提交了提示、会话开始、会话结束。

如果你用过 Claude Code 的 hooks 或 git hooks，这是同一个想法。如果你没用过：智能体循环现在可以从外部脚本化，不必写任何 Rust，也不必写任何 MCP 服务器。

<!-- truncate -->

## 它如何工作

goose 遵循 [Open Plugins hooks 规范](https://open-plugins.com/agent-builders/components/hooks)。`~/.agents/plugins/<name>/`（用户范围）或 `<project>/.agents/plugins/<name>/`（项目范围）下任何包含 `hooks/hooks.json` 文件的插件目录，都会在启动时被自动发现。

一份最小的 hook 配置看起来是这样：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "developer__shell|developer__text_editor",
        "hooks": [
          { "type": "command", "command": "${PLUGIN_ROOT}/scripts/log.sh" }
        ]
      }
    ]
  }
}
```

事件触发时，goose 运行命令，在环境里设置 `PLUGIN_ROOT`，并把一份 JSON 载荷通过 stdin 传给脚本：

```json
{
  "event": "PostToolUse",
  "session_id": "abc-123",
  "tool_name": "developer__shell",
  "tool_input": { "command": "rg TODO" },
  "working_dir": "/Users/you/project"
}
```

支持的事件是：

- `SessionStart`、`SessionEnd`、`Stop`
- `UserPromptSubmit`
- `PreToolUse`、`PostToolUse`、`PostToolUseFailure`
- `BeforeReadFile`、`AfterFileEdit`
- `BeforeShellExecution`、`AfterShellExecution`

`matcher` 字段是一个正则，针对该事件最相关的字符串进行测试（工具名、文件路径或 shell 命令）。不写它，hook 就会对该类型的每一个事件触发。失败或超时的 hook 会被记录，但不会让宿主工具崩溃，所以你的脚本可以随你想多粗糙。

## 可以试试的几件事

### 1. 让 goose 在真正需要你时跟你说话

挑出少数意味着“现在人类的注意力会有用”的事件——工具失败了、会话结束了、一条长时间运行的命令完成了——并让 goose 在其中一个触发时说出一句话：

```json
{
  "hooks": {
    "PostToolUseFailure": [{ "hooks": [{ "type": "command", "command": "${PLUGIN_ROOT}/scripts/notify.sh" }] }],
    "SessionEnd":         [{ "hooks": [{ "type": "command", "command": "${PLUGIN_ROOT}/scripts/notify.sh" }] }],
    "AfterShellExecution": [
      {
        "matcher": "^(cargo (test|build|clippy)|pnpm (test|build)|just )",
        "hooks": [{ "type": "command", "command": "${PLUGIN_ROOT}/scripts/notify.sh" }]
      }
    ]
  }
}
```

然后 `notify.sh` 根据载荷分支，并选一句话：

```bash
#!/usr/bin/env bash
payload="$(cat)"
event="$(printf '%s' "$payload" | jq -r .event)"

case "$event" in
  PostToolUseFailure)  echo "That didn't work. Need a hand?" | say -v Daniel ;;
  SessionEnd)          echo "Done. Come check this out."     | say -v Daniel ;;
  AfterShellExecution) echo "Long command finished."         | say -v Daniel ;;
esac
```

把 `matcher` 正则调成你世界里算“长时间运行”的东西——测试套件、构建、部署、`terraform apply`。

### 2. “goose 正在做事”的台灯 🪿💡

如果你有带 HTTP API 的智能灯泡（Hue、LIFX、Home Assistant 等），在 goose 开始工具调用时打开它，结束时关掉：

```json
{
  "hooks": {
    "PreToolUse":  [{ "hooks": [{ "type": "command", "command": "curl -s -X POST http://hue.local/light/on"  }] }],
    "PostToolUse": [{ "hooks": [{ "type": "command", "command": "curl -s -X POST http://hue.local/light/off" }] }]
  }
}
```

现在你的台灯是智能体的状态指示灯。走开，再瞥一眼，如果它亮着，goose 还在工作。

### 3. 自动格式化 goose 编辑的每一个文件

挂上 `AfterFileEdit`，自己运行格式化工具，这样智能体就不必记住：

```json
{
  "hooks": {
    "AfterFileEdit": [
      {
        "matcher": "\\.(ts|tsx|js|jsx|json|md)$",
        "hooks": [{ "type": "command", "command": "${PLUGIN_ROOT}/scripts/format.sh" }]
      },
      {
        "matcher": "\\.rs$",
        "hooks": [{ "type": "command", "command": "cargo fmt" }]
      }
    ]
  }
}
```

`scripts/format.sh` 从 stdin 读取文件路径，并对它运行 `prettier --write`。

### 4. 每日会话日记

挂上 `SessionEnd`，把一行摘要追加到一个 markdown 文件：

```bash
#!/usr/bin/env bash
payload="$(cat)"
session_id="$(printf '%s' "$payload" | jq -r .session_id)"
date_str="$(date '+%Y-%m-%d %H:%M')"
echo "- $date_str — session $session_id ended" >> ~/notes/goose-journal.md
```

也捕捉 `UserPromptSubmit` 载荷，你就有了今天问智能体的每一个问题的日志。

### 5. 让 goose 听起来像一艘潜艇

因为你可以：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Submarine.aiff"
          }
        ]
      }
    ],
    "SessionEnd": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "say 'Captain, the session has ended.'"
          }
        ]
      }
    ]
  }
}
```

当 goose 在另一个窗口做长时间任务时这很有用。音频提示告诉你它确实在做事，而不是坐在那里等你。

## 试试示例

仓库里有一个可工作的示例，在 [`examples/plugins/hello-hooks`](https://github.com/block/goose/tree/main/examples/plugins/hello-hooks)——一个插件，接上 `SessionStart`、`UserPromptSubmit`、`PreToolUse` 和 `PostToolUse`，并为每一个向 stderr 打印一个友好的 emoji。把它复制到 `~/.agents/plugins/`，开始一个会话，看着事件飞过：

```bash
mkdir -p ~/.agents/plugins
cp -R examples/plugins/hello-hooks ~/.agents/plugins/hello-hooks
chmod +x ~/.agents/plugins/hello-hooks/scripts/announce.sh

goose session
# 🚀 [hello-hooks] SessionStart
# 💬 [hello-hooks] UserPromptSubmit
# ⚡ [hello-hooks] PreToolUse tool=developer__shell
# ✅ [hello-hooks] PostToolUse tool=developer__shell
```

每一个事件也会被追加到 `~/.agents/plugins/hello-hooks/last-event.log`，这样你可以看到脚本收到的确切 JSON。触发一些事件，`tail` 日志，从那里开始构建。

## 为什么这重要

MCP 服务器给 goose 新工具。Hooks 走另一个方向：它们给你一种方式，用你已经知道的任何语言，实时对 goose 正在做的事做出反应。Bash、Python、一个 Go 二进制、一行 `curl`。它不过是 stdin 上的一条命令。

插件模型有意做得很小：一个文件夹、一个 JSON 文件、一个脚本。没有注册步骤，没有守护进程，没有重新构建。放进去，启动 goose，它就工作。拿出来，goose 也不会注意到它没了。

如果你做出了有趣的东西，分享它。`examples/plugins/` 目录是社区插件的好去处，而 [Open Plugins 规范](https://open-plugins.com) 意味着你在这里构建的任何东西，都能与采用它的其他智能体一起工作。

钩子愉快。🪝
