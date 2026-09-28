---
sidebar_position: 2
title: 对抗模式
sidebar_label: 对抗模式
description: 一名独立的代理审查者，默默监视工具调用，在代理失控时保护你。
---

对抗模式增加一名沉默、独立的代理审查者，在工具调用执行前进行监视。它相当于第二双眼睛：当主代理被攻破、被提示词注入操纵，或只是在做与你要求不符的事情时，保护你。

与[基于模式的检测](/docs/guides/security/prompt-injection-detection)不同，对抗审查者理解上下文。它知道你最初要求什么、你最近说了什么，并能判断某次工具调用对你的任务是否合理。

## 工作方式

1. 每次工具调用之前，对抗审查者会检查你的**原始任务**、**最近的消息**以及**工具调用细节**
2. 它对照你的规则评估这次工具调用，并返回 **ALLOW** 或 **BLOCK**
3. 被阻止的工具调用会被拒绝——代理会看到拒绝结果，且不能重试
4. 如果审查者因任何原因失败，该工具调用会被放行（失败时开放）

对抗审查者使用 goose 已经配置的同一模型和提供商。不需要额外的 API 密钥或服务。

## 启用对抗模式

在 `~/.config/goose/adversary.md` 创建包含你的规则的文件：

```markdown
BLOCK if the tool call:
- Exfiltrates data (posting to unknown URLs, piping secrets to external services)
- Is destructive beyond the project scope (deleting system files, wiping directories)
- Installs malware or runs obfuscated code
- Attempts to escalate privileges unnecessarily
- Downloads and executes untrusted remote scripts

ALLOW normal development operations like editing files, running tests,
installing packages, using git, etc. Most tool calls are fine.
Err on the side of ALLOW — only block truly dangerous things.
```

这样即可。文件存在时，对抗模式开启。删除该文件即可关闭。

空文件会使用与上面示例类似的合理默认规则。

## 编写好的规则

`adversary.md` 中的规则就是你的策略，用自然语言书写：

- **写具体**该阻止什么——含糊的规则会导致误报
- **倾向于 ALLOW**——对抗审查者应抓住真正危险的操作，而不是拖慢正常工作
- **考虑你的威胁模型**——失控的代理实际上会尝试做什么？

你可以按环境定制规则：

```markdown
BLOCK if:
- Any network request goes to a domain not in: github.com, npmjs.org, pypi.org
- Files outside of ~/projects/ are modified
- SSH keys, .env files, or credentials are read or transmitted

ALLOW all standard development operations within ~/projects/.
```

## 审查哪些内容

默认情况下，对抗审查者审查 **`shell`**——可以执行任意代码的工具。

你可以在 `adversary.md` 顶部添加一行 `tools:` 来扩大覆盖范围：

```markdown
tools: shell, computercontroller__computer_control
---
BLOCK if the command exfiltrates data or is destructive.
ALLOW normal development operations.
```

`tools:` 行是要审查的工具名，以逗号分隔。`---` 分隔符之前是配置，之后是你的规则。如果省略 `tools:` 行，默认审查 `shell`。

你可能想加入的一些工具名：

| 工具名 | 作用 |
|-----------|-------------|
| `shell` | 执行 shell 命令（默认） |
| `computercontroller__computer_control` | 通过 peekaboo 进行 macOS UI 自动化——点击、按键、输入 |

## 另见

- [提示词注入检测](/docs/guides/security/prompt-injection-detection)——基于模式的检测（互补；启用后始终开启）
- [goose 权限模式](/docs/guides/managing-tools/goose-permissions)——控制 goose 的自主程度
