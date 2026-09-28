---
title: 钩子
sidebar_position: 5
sidebar_label: 钩子
---

# 钩子

钩子让你在 goose 会话的关键事件发生时运行自己的脚本。用钩子记录活动、发送通知、在编辑后格式化文件、在 shell 命令后运行检查，或在不编写自定义扩展的情况下把 goose 与本地工作流集成。

goose 遵循 [Open Plugins 钩子规范](https://open-plugins.com/agent-builders/components/hooks)。钩子从磁盘上的[插件](/docs/guides/context-engineering/plugins)中发现，并在匹配的生命周期事件触发时作为 shell 命令运行。

:::warning 只运行可信的钩子
钩子会在你的机器上执行本地命令。只安装或创建来自你信任来源的钩子，并在启用前审查钩子脚本。
:::

## 钩子位于何处

钩子属于一个[插件](/docs/guides/context-engineering/plugins)目录。goose 从这些位置发现插件：

| 范围 | 位置 |
|---|---|
| 用户 | `~/.agents/plugins/<plugin-name>/` |
| 项目 | `<project>/.agents/plugins/<plugin-name>/` |
| 已安装插件 | goose 的插件安装目录 |

每个定义钩子的插件都必须包含 `hooks/hooks.json` 文件：

```text
my-plugin/
├── plugin.json
├── hooks/
│   └── hooks.json
└── scripts/
    └── notify.sh
```

当 goose 从该项目启动时，会加载项目插件。用户插件在各项目中都可用。

## 创建钩子

要创建任何钩子，选择你想响应的事件，创建插件目录，添加把该事件映射到命令的 `hooks/hooks.json` 文件，然后编写应运行的脚本或命令。命令在 stdin 上以 JSON 接收事件载荷，因此它可以检查会话 ID、提示文本、工具名称、文件路径或 shell 命令等细节。

钩子插件需要这个基本结构：

```text
session-logger/
├── plugin.json
├── hooks/
│   └── hooks.json
└── scripts/
    └── log-session.sh
```

插件清单标识该插件：

```json title="plugin.json"
{
  "name": "session-logger",
  "version": "0.1.0",
  "description": "Log goose session events"
}
```

钩子配置把事件映射到命令。此示例在 `SessionEnd` 事件触发时运行脚本：

```json title="hooks/hooks.json"
{
  "hooks": {
    "SessionEnd": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "${PLUGIN_ROOT}/scripts/log-session.sh"
          }
        ]
      }
    ]
  }
}
```

脚本从 stdin 读取事件载荷并执行自动化：

```bash title="scripts/log-session.sh"
#!/usr/bin/env bash
payload="$(cat)"
session_id="$(printf '%s' "$payload" | jq -r .session_id)"
date_str="$(date '+%Y-%m-%d %H:%M')"

echo "- $date_str — session $session_id ended" >> ~/goose-session-log.md
```

把插件放在已发现的插件位置，例如 `~/.agents/plugins/session-logger/`，并在操作系统要求时把命令脚本设为可执行。

## 钩子配置

`hooks.json` 有一个顶层 `hooks` 对象。每个键是事件名称，每个事件包含一条或多条规则：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "^(shell|edit)$",
        "hooks": [
          {
            "type": "command",
            "command": "${PLUGIN_ROOT}/scripts/log-tool.sh",
            "timeout": 10
          }
        ]
      }
    ]
  }
}
```

| 字段 | 必需 | 说明 |
|---|---:|---|
| `matcher` | 否 | 用于决定规则是否针对该事件运行的正则表达式（不是 glob）。如果省略，规则会对该类型的每个事件运行。 |
| `hooks` | 是 | 当事件和匹配器适用时要运行的动作。 |
| `type` | 否 | 动作类型。goose 目前支持 `command`。如果省略，则使用 `command`。 |
| `command` | 对命令钩子为是 | 要运行的 shell 命令。goose 用 `sh -c` 运行它。 |
| `timeout` | 否 | 命令的超时（秒）。默认为 30 秒。 |
| `on_failure` | 否 | `PreToolUse` 钩子失败时做什么：无法执行、超时、未收到载荷、产生 goose 无法解码的输出，或在没有 goose 能识别的决定的情况下退出。`allow`（默认）继续工具调用，`block` 拒绝它。仅对选定的 `PreToolUse` 命令动作解释，对其他每个事件都忽略。见[阻止工具调用](#blocking-a-tool-call)。 |

在命令中使用 `${PLUGIN_ROOT}` 引用插件目录。goose 也会在钩子命令的环境中设置 `PLUGIN_ROOT`。

## 支持的事件

| 事件 | 何时运行 | 匹配器目标 |
|---|---|---|
| `SessionStart` | 会话开始 | 无 |
| `SessionEnd` | 会话结束 | 无 |
| `Stop` | goose 完成一轮或收到停止事件 | 无 |
| `UserPromptSubmit` | 用户提交提示 | 提示文本 |
| `PreToolUse` | goose 运行工具之前 | 工具名称 |
| `PreToolUseResult` | `PreToolUse` 链解析之后，对允许和拒绝的调用都一样，在工具运行或返回拒绝之前。仅观察 | 工具名称 |
| `PostToolUse` | 工具成功之后 | 工具名称 |
| `PostToolUseFailure` | 工具失败之后 | 工具名称 |
| `BeforeReadFile` | goose 读取文件之前 | 文件路径 |
| `AfterFileEdit` | goose 成功编辑文件之后 | 文件路径 |
| `BeforeShellExecution` | goose 运行 shell 命令之前 | Shell 命令 |
| `AfterShellExecution` | goose 成功运行 shell 命令之后 | Shell 命令 |

匹配器是针对该事件最相关字符串匹配的正则表达式。例如，在 `AfterFileEdit` 上用 `"\\.rs$"` 匹配 Rust 文件，或在 `AfterShellExecution` 上用 `"^(cargo test|pnpm test)"` 匹配测试命令。匹配是未锚定的，因此 `"shell"` 也会匹配另一个扩展的 `"remote__shell_exec"`；需要精确匹配时用 `^`/`$` 锚定。

:::warning 匹配一切时用 `.*`，不要用 `*`
匹配器是正则表达式，不是 glob。单独的 `"*"` 是无效正则，因此整条规则会被**静默跳过**（goose 记录警告并继续）。要让规则对每个事件运行，要么完全省略 `matcher`，要么使用 `".*"`。
:::

:::note
`AfterFileEdit` 和 `AfterShellExecution` 只在成功的工具调用之后运行。要响应失败的编辑、失败的 shell 命令或其他失败的工具调用，使用 `PostToolUseFailure`。
:::

`PreToolUseResult` 在权限上只是观察，在传递上并不是异步的。匹配的钩子会在 goose 继续到工具或返回拒绝之前运行并等待，因此慢的订阅者会把它的运行时间（直到其超时）加到工具调用上。传递是尽力而为且不持久：失败或缺失的订阅者不会改变决定，如果钩子没有运行，也不会保留记录。

## 钩子载荷

钩子运行时，goose 把 JSON 载荷写入命令的 stdin。每个载荷都包含事件名称和会话 ID。其余字段只在适用于该事件时出现，因此钩子应把它们视为可选。

| 字段 | 说明 |
|---|---|
| `event` | 触发的事件名称，例如 `PostToolUse` 或 `UserPromptSubmit`。 |
| `session_id` | 当前 goose 会话的 ID。 |
| `matcher_context` | 规则的 `matcher` 所测试的字符串（例如工具事件上的工具名称，或 `UserPromptSubmit` 上的提示文本）。 |
| `tool_name` | 工具名称，出现在工具事件上。 |
| `tool_input` | 传给工具的输入参数，出现在工具事件上。 |
| `message` | 用户提交的提示文本，出现在 `UserPromptSubmit` 上。 |
| `last_assistant_message` | 该轮的最终助手文本，出现在有助手输出的 `Stop` 上。 |
| `working_dir` | 会话的工作目录，出现在工具事件上。 |
| `tool_call_id` | 一次工具调用的稳定标识符，出现在 `PreToolUse`、`PreToolUseResult`、`PostToolUse` 和 `PostToolUseFailure` 上。关联单次调用的事件；当相同调用重复时，工具名称加输入做不到这一点。 |
| `decision` | `allow` 或 `deny`，出现在 `PreToolUseResult` 上。没有第三个值。 |
| `policy_evaluated` | 当至少一个匹配的 `PreToolUse` 钩子以 0 退出或返回了显式决定（退出 `2`，或在 stdout 上 `{"decision":"block"}`）时为 `true`，出现在 `PreToolUseResult` 上。没有决定就以非零退出、无法生成、超时，或载荷无法序列化的钩子不算，匹配钩子的缺失也不算。这是一个“至少一个”的值，如果稍后的钩子失败，它仍保持 `true`。它报告钩子运行到了结论，而不是结论可用：为此请阅读 `cause`。 |
| `blocked_by` | 其钩子拒绝了调用的插件，当 `decision` 为 `deny` 时出现在 `PreToolUseResult` 上。 |
| `reason` | 拒绝消息，当 `decision` 为 `deny` 时出现在 `PreToolUseResult` 上。对于显式策略拒绝，goose 从退出码 2 的 stderr 或 JSON `reason` 字段派生它。goose 不对钩子提供的原因设界或脱敏，因此钩子不得包含机密。对于 `on_failure: block` 下的钩子失败，goose 提供一条有界的、由框架生成的消息，其中不包含命令字符串、插件路径或载荷内容。 |
| `cause` | 链为何如此结束，出现在 `PreToolUseResult` 上。`policy_denial` 表示显式策略决定阻止了调用。`hook_failure` 表示至少一个钩子未能执行、未能接收载荷、未能产生可解码输出，或未能回答决定协议，并且该失败决定或限定了报告的结果。仅在没有钩子失败的允许时缺席。 |

工具事件的示例载荷：

```json
{
  "event": "PostToolUse",
  "session_id": "abc-123",
  "matcher_context": "shell",
  "tool_name": "shell",
  "tool_input": { "command": "rg TODO" },
  "working_dir": "/Users/you/project"
}
```

提示事件的示例载荷，提交的提示在 `message` 中：

```json
{
  "event": "UserPromptSubmit",
  "session_id": "abc-123",
  "matcher_context": "summarize this file",
  "message": "summarize this file"
}
```

助手回复之后 `Stop` 事件的示例载荷：

```json
{
  "event": "Stop",
  "session_id": "abc-123",
  "last_assistant_message": "Done. I updated the file and ran the tests."
}
```

读取载荷的示例脚本：

```bash
#!/usr/bin/env bash
set -euo pipefail

payload="$(cat)"
event="$(printf '%s' "$payload" | jq -r .event)"
tool="$(printf '%s' "$payload" | jq -r '.tool_name // "none"')"

echo "goose hook: event=$event tool=$tool" >> "${PLUGIN_ROOT}/hook.log"
```

### 工具输入键

`tool_name` 是 goose 发送给模型的名称，`tool_input` 保存该工具自己的参数。大多数扩展把工具命名为 `{extension}__{tool}`，例如 `todo__todo_write`。`developer`、`analyze`、`summon` 和 `code_execution` 扩展在暴露时没有该前缀，因此它们的工具以裸名称到达：shell 工具是 `shell`，不是 `developer__shell`。键是工具的 schema，因此因工具而异——检查文件路径的钩子必须读取它所匹配工具的正确字段。goose 内置 `developer` 工具的键是：

| `tool_name` | `tool_input` 键 |
|---|---|
| `shell` | `command`、`timeout_secs`（可选） |
| `write` | `path`、`content` |
| `edit` | `path`、`before`、`after` |
| `tree` | `path`、`depth` |
| `read_image` | `source`、`crop`（可选） |

对于 shell 和文件工具，`matcher_context` 已经携带 shell 命令（在 `BeforeShellExecution`/`AfterShellExecution` 上）或文件路径（在 `BeforeReadFile`/`AfterFileEdit` 上），因此这些钩子无需解析 `tool_input` 即可匹配。

## 阻止工具调用

大多数事件只用于观察：goose 运行钩子、记录结果，并无论钩子返回什么都继续。两个事件不同——**`PreToolUse` 和 `Stop` 可以阻止**。任何其他事件上的钩子（包括 `UserPromptSubmit`、`PostToolUse` 以及 `Before*`/`After*` 事件）都不能停止任何东西；来自这些事件的阻止决定会被忽略。

`PreToolUse` 钩子用以下两种信号之一拒绝工具调用：

- **退出码 `2`** — goose 阻止，并从 **stderr** 取得原因。
- **stdout 上的 `{"decision":"block","reason":"..."}`** — goose 阻止，并从 `reason` 字段取得原因。只要退出码不是 `2`，goose 就会检查 stdout，因此无论钩子以 `0` 还是非零退出，此信号都会被遵守。

对于 stdout 信号，stdout 必须以 `{` 开头，且 `decision` 必须恰好是 `"block"`。如果 `reason` 为空，goose 替换为 `denied by plugin hook`。

当 `PreToolUse` 钩子阻止时，goose 不运行工具，并向模型返回此消息：

```text
Tool call denied by policy hook `<plugin>`: <reason>. Do not retry; this is a policy denial, not a transient failure.
```

阻止的 `Stop` 钩子会迫使该轮继续，而不是结束。为防止行为不当的钩子永远循环，goose 限制连续 `Stop` 阻止的次数；一旦达到上限，goose 会覆盖钩子并结束该轮。用 `GOOSE_STOP_HOOK_BLOCK_CAP` 环境变量提高上限。

### stdout 是决定通道

对于可阻止的事件，goose 按此顺序从钩子的退出状态和 stdout 读取决定：

1. 退出 `2` 拒绝，原因来自 stderr。
2. stdout 上的 `{"decision":"block"}` 拒绝，无论退出状态如何。
3. 退出 `0` 且 stdout 为空则允许。
4. 退出 `0` 且 stdout 上有 `{"decision":"allow"}` 则允许。
5. 其他任何情况都意味着钩子没有返回决定。

规则 5 涵盖的不只是崩溃。stdout 上多余的日志行、截断或格式错误的 JSON、JSON 数组、没有 `decision` 的 `{}`、无法识别的 `decision` 值、与非零退出一起打印的允许 JSON、意外的退出状态，以及被信号终止，都会被读作没有决定，生成错误和超时也一样。把日志和诊断写到 stderr，把 stdout 留给决定。

还有两种情况会被读作没有决定：

- **stdout 不是有效的 UTF-8。** goose 严格读取 stdout，不会修复无效字节，因为修复它们可能把格式错误的输出变成可解析为允许的 JSON。stderr 被宽松解码，因为它只展示给人。
- **goose 无法送达请求。** 如果载荷无法写入钩子的 stdin，钩子是在没看到请求的情况下做出决定的，因此来自它的允许不算数。显式拒绝仍然算数：goose 在决定之前读取钩子的输出，它设法打印出的阻止会被遵守。

因为阻止信号的读取独立于退出码，打印 `{"decision":"block"}` *然后*以非零退出的钩子仍然会阻止。不要依赖非零退出来取消你已经打印的阻止。

### 选择钩子失败时发生什么

只有当 goose 送达了载荷，且进程以 0 退出、stdout 为空或带有有效允许决定时，钩子才算干净地允许。失败的送达、goose 无法使用的输出，或没有拒绝的非零退出，都是钩子失败，不是允许。

**默认情况下，钩子失败会被记录，工具调用继续进行。** 这是历史行为，并保持为默认，因此损坏的钩子永远不会卡住会话。

对于你确实依赖的策略，在动作上把 `on_failure` 设为 `block`。然后当该钩子失败时，goose 会拒绝工具调用：

```json title="hooks/hooks.json"
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "^shell$",
        "hooks": [
          {
            "type": "command",
            "command": "${PLUGIN_ROOT}/scripts/block-sudo.sh",
            "on_failure": "block"
          }
        ]
      }
    ]
  }
}
```

由失败引起的拒绝与策略拒绝措辞不同，因此模型和你的日志可以区分它们：

```text
Tool call blocked because policy hook `<plugin>` could not complete: <reason>. That hook is configured to block on failure.
```

有三个限制值得了解：

- `on_failure` 只适用于 `PreToolUse`。即使有 `on_failure: block`，`Stop` 钩子仍保持失败开放，因此损坏的钩子永远不能阻止已完成的轮次结束。
- `on_failure` 从不覆盖显式拒绝。显式阻止的钩子在任一模式下都会被遵守。它也不会改变干净的允许，即载荷已送达且进程以 0 退出、stdout 为空或带有有效允许决定的情况。
- 在选定的 `PreToolUse` 命令动作上，除 `allow` 或 `block` 以外的任何值都是配置错误，goose 会带着警告跳过该插件的整个 `hooks.json` 文件，而不是猜测策略。其他事件不解释该字段。`on_failure` 管理钩子运行并失败时发生什么，而不是如何处理配置加载错误。

### goose 在 `hooks.json` 中验证什么

未知的事件名称和不支持的字符串动作类型会被忽略，其载荷不会被解释，因此插件可以携带较新 goose 的配置，而不会在这一版上破坏。已识别的事件 schema 和选定的可运行命令动作会被验证。格式错误的选定配置会带着警告跳过该插件的 `hooks.json`，无效的匹配器正则会警告并只跳过该规则。`on_failure` 管理钩子在运行时失败时发生什么；它不会让配置加载或匹配器错误变成失败关闭。

`PreToolUseResult` 事件通过 `cause` 报告结果：显式阻止为 `policy_denial`，执行或协议失败为 `hook_failure`，干净允许则没有 `cause`。

### `PreToolUseResult` 报告什么

`PreToolUseResult` 承载 `PreToolUse` 链的结果。其字段在[钩子载荷](#hook-payload)中定义一次；本节只涵盖 `on_failure` 改变了什么。

`decision` 是实际应用于工具调用的结果，因此在 `on_failure: block` 下，钩子失败显示为 `deny`。`cause` 是订阅者区分两种拒绝的方式：钩子显式阻止时为 `policy_denial`，钩子无法执行、未收到载荷、产生 goose 无法解码的输出，或没有回答决定协议能识别的内容时为 `hook_failure`。

`policy_evaluated` 回答的问题与 `cause` 不同，二者独立变化。以 0 退出同时打印多余日志行的钩子已经运行到结论，因此 `policy_evaluated` 为 `true`，但它没有产生可用决定，因此 `cause` 为 `hook_failure`。未能生成的钩子根本没有运行，因此 `policy_evaluated` 保持 `false`。

在混合链中两种读法都会保留。如果较早的钩子干净地允许，较晚的一个失败，事件会报告来自较早钩子的 `policy_evaluated: true` 和来自较晚钩子的 `cause: hook_failure`，无论调用最终被允许还是拒绝。

在 `on_failure` 为 `allow` 时失败的钩子仍会发出 `decision: "allow"` 和 `cause: "hook_failure"`，因此监控插件可以看到钩子被跳过，即使工具调用继续进行。

### 阻止危险命令

此 `PreToolUse` 钩子阻止任何使用 `sudo` 的 shell 命令：

```json title="hooks/hooks.json"
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "^shell$",
        "hooks": [
          {
            "type": "command",
            "command": "${PLUGIN_ROOT}/scripts/block-sudo.sh"
          }
        ]
      }
    ]
  }
}
```

```bash title="scripts/block-sudo.sh"
#!/usr/bin/env bash
set -euo pipefail

payload="$(cat)"
command="$(printf '%s' "$payload" | jq -r '.tool_input.command // empty')"

if printf '%s' "$command" | grep -qE '(^|[[:space:]])sudo([[:space:]]|$)'; then
  printf '{"decision":"block","reason":"sudo is not allowed in this session"}'
fi
```

命令被允许时钩子不打印任何内容，因此 goose 正常运行它。

## 示例

### 工具失败时通知

```json
{
  "hooks": {
    "PostToolUseFailure": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "${PLUGIN_ROOT}/scripts/notify.sh"
          }
        ]
      }
    ]
  }
}
```

```bash title="scripts/notify.sh"
#!/usr/bin/env bash
payload="$(cat)"
tool="$(printf '%s' "$payload" | jq -r '.tool_name // "tool"')"

osascript -e "display notification \"$tool failed\" with title \"goose\""
```

### 在 goose 编辑文件后格式化它们

```json
{
  "hooks": {
    "AfterFileEdit": [
      {
        "matcher": "\\.(ts|tsx|js|jsx|json|md)$",
        "hooks": [
          {
            "type": "command",
            "command": "${PLUGIN_ROOT}/scripts/prettier.sh"
          }
        ]
      },
      {
        "matcher": "\\.rs$",
        "hooks": [
          {
            "type": "command",
            "command": "cargo fmt"
          }
        ]
      }
    ]
  }
}
```

```bash title="scripts/prettier.sh"
#!/usr/bin/env bash
set -euo pipefail

payload="$(cat)"
file="$(printf '%s' "$payload" | jq -r '.matcher_context // empty')"

if [ -n "$file" ]; then
  npx prettier --write "$file"
fi
```

### 响应长时间运行的命令

```json
{
  "hooks": {
    "AfterShellExecution": [
      {
        "matcher": "^(cargo (test|build|clippy)|pnpm (test|build)|just )",
        "hooks": [
          {
            "type": "command",
            "command": "say 'goose finished running your command'"
          }
        ]
      }
    ]
  }
}
```

## 试用示例插件

goose 在 `examples/plugins/hello-hooks` 包含一个示例插件。

```bash
mkdir -p ~/.agents/plugins
cp -R examples/plugins/hello-hooks ~/.agents/plugins/hello-hooks
chmod +x ~/.agents/plugins/hello-hooks/scripts/announce.sh

goose session
```

该示例把钩子事件打印到 stderr，并把完整载荷追加到：

```text
~/.agents/plugins/hello-hooks/last-event.log
```

## 禁用钩子插件

要禁用插件，把它的名称添加到 goose 设置文件的 `disabledPlugins` 中：

```json title="~/.config/goose/settings.json"
{
  "disabledPlugins": ["session-logger"]
}
```

对于项目特定设置，使用：

```text
<project>/.config/goose/settings.json
```

列在 `disabledPlugins` 中的插件在插件发现期间会被跳过，因此它的钩子不会运行。

## 故障排除

### 我的钩子没有运行

检查以下各项：

- 插件目录位于 `~/.agents/plugins/<name>/` 或 `<project>/.agents/plugins/<name>/` 下。
- 钩子配置位于插件目录内的 `hooks/hooks.json`。
- 事件名称与[支持的事件](#supported-events)之一匹配。
- `matcher` 正则表达式匹配事件的匹配器目标。
- 命令路径正确。对插件内的脚本使用 `${PLUGIN_ROOT}`。
- 如果你直接调用脚本，它是可执行的。
- 插件没有列在 `disabledPlugins` 中。
- 该事件不是子代理生命周期事件。goose 目前不发出 `SubagentStart` 和 `SubagentStop`，因此为它们注册的钩子永远不会运行。

### 我的钩子超时或失败

钩子失败会被记录，但不会使 goose 或触发钩子的工具崩溃。默认情况下，未能运行、超出超时、从未收到载荷，或在没有 goose 能识别的决定的情况下退出的钩子会被记录，工具调用继续进行。要有意停止工具调用，`PreToolUse` 钩子必须发出干净的阻止信号，而不仅仅是以非零退出。

有两种情况看起来像失败，但不是人们期望的那样：

- **钩子把日志行打印到了 stdout。** goose 把 stdout 读作决定通道，因此 `echo "checking policy"` 会让原本健康的钩子被读作没有决定。把诊断发送到 stderr。
- **钩子打印了 `{"decision":"allow"}` 然后以非零退出。** 退出状态与决定矛盾，因此 goose 把它当作没有决定。允许时应同时以 `0` 退出。

如果你希望失败的钩子停止工具调用而不是被忽略，在该动作上把 `on_failure` 设为 `block`。见[选择钩子失败时发生什么](#choose-what-happens-when-a-hook-fails)。

为长时间运行的钩子设置更大的超时：

```json
{
  "hooks": {
    "SessionEnd": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "${PLUGIN_ROOT}/scripts/archive.sh",
            "timeout": 120
          }
        ]
      }
    ]
  }
}
```

### 我的脚本找不到 `jq` 或其他命令

钩子作为本地 shell 命令运行。确保脚本使用的任何命令都已安装并在 shell `PATH` 上可用。为了可移植性，对可能并非到处都安装的工具优先使用绝对路径。

## 其他资源

import ContentCardCarousel from '@site/src/components/ContentCardCarousel';
import hooksBanner from '@site/static/img/blog/goose-hooks.jpg';

<ContentCardCarousel
  items={[
    {
      type: 'blog',
      title: '钩子：在每个 goose 事件上运行你自己的脚本',
      description: '了解生命周期钩子如何让你用自己的脚本响应会话、提示、工具、文件和 shell 事件。',
      thumbnailUrl: hooksBanner,
      linkUrl: '/blog/2026/05/14/goose-hooks',
      date: '2026-05-14',
      duration: '阅读 5 分钟'
    }
  ]}
/>
