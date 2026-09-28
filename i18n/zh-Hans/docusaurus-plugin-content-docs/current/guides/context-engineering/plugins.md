---
title: 插件
sidebar_position: 6
sidebar_label: 插件
---

# 插件

插件是用可复用组件扩展 goose 的软件包。一个插件可以提供[技能](/docs/guides/context-engineering/using-skills)、[钩子](/docs/guides/context-engineering/hooks)，或两者都提供。

当你想安装、分享或更新一组 goose 功能，而不是把单个文件复制到本地技能或钩子目录时，使用插件。

:::warning 只安装受信任的插件
插件可以包含 goose 可能加载的指令，以及会执行本地命令的钩子。只安装来自你信任的来源的插件，并在启用前复查插件内容。
:::

## 插件可以提供什么

| 组件 | 作用 |
|---|---|
| 技能 | 可复用的指令和支持文件，教 goose 如何执行任务或遵循工作流。 |
| 钩子 | 在 goose 会话期间发生生命周期事件时运行的本地命令。 |

插件是容器。技能和钩子是容器内的组件。

## 插件结构

插件是一个包含插件清单和可选组件目录的目录。同时包含技能和钩子的插件可以像这样：

```text
my-plugin/
├── plugin.json
├── skills/
│   └── review/
│       └── SKILL.md
├── hooks/
│   └── hooks.json
└── scripts/
    └── notify.sh
```

插件清单标识该插件：

```json title="plugin.json"
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Reusable skills and hooks for my team"
}
```

### 向插件添加技能

要把技能加入插件，把技能目录放在插件的 `skills/` 目录下。每个技能目录包含一个 `SKILL.md` 文件：

```text
my-plugin/
└── skills/
    └── review/
        └── SKILL.md
```

```markdown title="skills/review/SKILL.md"
---
name: review
description: Review code changes for correctness, maintainability, and test coverage
---

Review the code changes. Prioritize correctness issues, security concerns, missing tests, and maintainability risks. Be direct and suggest concrete fixes.
```

对于 Open Plugins，goose 会用插件名为导入的技能名加命名空间。`my-plugin` 中的 `review` 技能会以 `my-plugin:review` 加载。

### 向插件添加钩子

要把钩子加入插件，创建 `hooks/hooks.json`，并把生命周期事件映射到命令：

```text
my-plugin/
├── hooks/
│   └── hooks.json
└── scripts/
    └── notify.sh
```

```json title="hooks/hooks.json"
{
  "hooks": {
    "SessionEnd": [
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

钩子命令通过 stdin 接收 JSON 形式的事件载荷。使用 `${PLUGIN_ROOT}` 引用插件目录内的文件。

支持的事件、载荷细节和更多钩子示例见[钩子指南](/docs/guides/context-engineering/hooks)。

## 插件位置

goose 从这些位置发现插件：

| 插件类型 | 位置 | 说明 |
|---|---|---|
| 用户插件 | `~/.agents/plugins/<plugin-name>/` | 包括用 `goose plugin install` 安装的插件，以及手动复制到用户插件目录的插件。 |
| 项目插件 | `<project>/.agents/plugins/<plugin-name>/` | 当 goose 在该项目中工作时可用。 |

已安装和手动放置的用户插件使用同一个用户插件目录。已安装的插件包含由 `goose plugin install` 创建的元数据；只有已安装的、以 git 为后端的插件才能用 `goose plugin update` 更新。

## 安装插件

从 git 仓库安装插件：

```bash
goose plugin install https://github.com/example/my-goose-plugin.git
```

安装命令会克隆仓库、检测插件格式、把它复制到插件目录，并报告导入的组件。

示例输出：

```text
✓ Installed open-plugins plugin 'my-plugin' (1.0.0)
  Source: https://github.com/example/my-goose-plugin.git
  Location: /Users/you/.agents/plugins/my-plugin
  Imported skills:
    - my-plugin:review
    - my-plugin:test-plan
```

## 自动更新插件

要让 goose 自动检查插件更新，安装时加上 `--auto-update`：

```bash
goose plugin install --auto-update https://github.com/example/my-goose-plugin.git
```

启用自动更新后，goose 会在加载插件技能之前检查该插件的更新。自动更新检查有速率限制，因此 goose 不会在每次会话开始时都克隆仓库。

如果自动更新失败，goose 会记录失败并继续使用当前已安装的插件。

:::note
自动更新适用于用 `goose plugin install --auto-update` 安装的、以 git 为后端的插件。手动复制到 `.agents/plugins/` 的插件会被发现，但不受插件更新命令管理。
:::

## 手动更新插件

要按需更新以 git 为后端的插件，运行：

```bash
goose plugin update <plugin-name>
```

例如：

```bash
goose plugin update my-plugin
```

更新命令会从原始 git 来源获取插件、替换已安装的副本，并保留该插件是否启用了自动更新。

## 禁用插件

要全局禁用插件，把它的名称加入用户 goose 设置文件中的 `disabledPlugins`：

```json title="~/.config/goose/settings.json"
{
  "disabledPlugins": ["my-plugin"]
}
```

对于项目特定设置，使用：

```text
<project>/.config/goose/settings.json
```

对于不应与队友共享的仅本地项目设置，使用：

```text
<project>/.config/goose/settings.local.json
```

被禁用的插件在插件发现时会被跳过，因此它的技能不会加载，钩子也不会运行。

## 插件格式

goose 支持这些插件格式：

| 格式 | 常见文件 | 说明 |
|---|---|---|
| Open Plugins | `plugin.json`、`.plugin/plugin.json`、`.goose-plugin/plugin.json`、`skills/`、`hooks/hooks.json` | 支持 Open Plugins 技能和钩子。 |
| Gemini 扩展 | `gemini-extension.json`、`skills/` | 支持来自 Gemini 风格扩展仓库的技能。 |

对于 Open Plugins，导入的技能名会用插件名加命名空间，例如 `my-plugin:review`。明确加载插件提供的技能时，使用这个完整名称。Gemini 扩展技能保留 `SKILL.md` 中的技能名；goose 不会用扩展名为它们加前缀。

Open Plugins 可以使用插件根目录的 `plugin.json`、`.plugin/plugin.json` 或 `.goose-plugin/plugin.json`。仅含钩子的 Open Plugins 可以从 `hooks/hooks.json` 被发现；如果没有清单，goose 会从来源或目录名推断插件名。

## 何时使用插件、技能或钩子

| 用途 | 最适合 |
|---|---|
| 打包并分发可复用的 goose 组件 | 插件 |
| 教 goose 一套可复用的流程或领域特定工作流 | 技能 |
| 在 goose 会话事件发生时运行本地命令 | 钩子 |

插件用于打包和分发。技能和钩子定义插件安装或被发现后 goose 可以使用的行为。
