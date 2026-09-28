---
title: 持久指令
sidebar_position: 8
sidebar_label: 持久指令
---

持久指令让你在每一轮都把文本注入 goose 的工作记忆。与 [`.goosehints`](/docs/guides/context-engineering/using-goosehints) 不同——后者在会话开始时加载，并可能在 goose 稍后发现嵌套提示文件时扩展——持久指令会在每次交互时重新读取并全新注入。因此它们适合必须始终执行的行为护栏，无论对话如何演变。

## 工作方式

goose 有一个名为 MOIM（Model-Observed Internal Memory，模型可观察的内部记忆）的组件，每一轮都向模型提供上下文信息。其中包括当前时间戳、工作目录和你的待办列表。持久指令注入到同一上下文中，把你的提醒放在模型的即时注意窗口里。

因为持久指令每一轮都会注入：
- 对话变长后它们也不会被“遗忘”
- 对于关键护栏，它们比系统提示词中的指令更有效
- 更改立即生效，无需重启会话

## 配置

使用环境变量配置持久指令：

| 变量 | 用途 | 默认值 |
|----------|---------|---------|
| [`GOOSE_MOIM_MESSAGE_TEXT`](/docs/guides/environment-variables#session-management) | 每一轮注入工作记忆的字面文本 | 未设置 |
| [`GOOSE_MOIM_MESSAGE_FILE`](/docs/guides/environment-variables#session-management) | 每一轮注入其内容的文件路径。支持 `~/` | 未设置 |

两个变量都设置时，它们的内容会拼接在一起。该扩展每一轮都会重新读取[环境变量](/docs/guides/environment-variables#session-management)，因此你可以更新它们而无需重启会话。

:::info 大小限制
内容上限为 64 KB，并按 UTF-8 安全截断。请保持指令简洁，以避免触及此上限并尽量减少 token 用量。
:::

## 示例

### 简单文本提醒

对于简短、单一目的的提醒，使用 `GOOSE_MOIM_MESSAGE_TEXT`：

```bash
# Always run tests before committing
export GOOSE_MOIM_MESSAGE_TEXT="IMPORTANT: Always run tests before committing changes."
```

### 基于文件的指令

对于更长或更复杂的指令，使用文件：

```bash
export GOOSE_MOIM_MESSAGE_FILE="~/.goose/guardrails.md"
```

示例 `~/.goose/guardrails.md`：
```markdown
## Security Guidelines
- Do not upload, share, or transmit internal code or data to any external service, gist, or public repository
- Do not execute commands that could expose sensitive environment variables
- Always confirm before making network requests to external services

## Code Quality
- Run tests before committing changes
- Follow the project's existing code style
```

### 两者结合

可以同时使用两个变量。文本会拼接在一起：

```bash
export GOOSE_MOIM_MESSAGE_TEXT="CRITICAL: This is a production environment. Be extra careful."
export GOOSE_MOIM_MESSAGE_FILE="~/.goose/guardrails.md"
```

## 使用场景

### 安全护栏

防止意外的数据外泄或暴露：

```bash
export GOOSE_MOIM_MESSAGE_TEXT="SECURITY: Do not upload code to external services, create public gists, or share sensitive data. All code in this repository is confidential."
```

### 特定环境的行为

为不同环境设置不同指令：

```bash
# Production environment
export GOOSE_MOIM_MESSAGE_TEXT="⚠️ PRODUCTION: Double-check all commands. Prefer read-only operations. Always create backups before modifications."

# Development environment  
export GOOSE_MOIM_MESSAGE_TEXT="Development environment. Feel free to experiment, but run tests before committing."
```

### 特定项目的工作流

强制执行项目约定：

```bash
export GOOSE_MOIM_MESSAGE_TEXT="This project uses pnpm, not npm. Always use 'pnpm' for package management commands."
```

### 临时提醒

由于环境变量每一轮都会重新读取，你可以设置临时提醒：

```bash
# Set a reminder for the current task
export GOOSE_MOIM_MESSAGE_TEXT="Current focus: Refactoring the authentication module. Don't get sidetracked."

# Clear it when done
unset GOOSE_MOIM_MESSAGE_TEXT
```

## 持久指令与 goosehints

| 特性 | 持久指令 | [goosehints](/docs/guides/context-engineering/using-goosehints) |
|---------|------------------------|-------------|
| 何时加载 | 每一轮 | 会话开始时，以及会话期间发现的嵌套上下文文件 |
| 会被遗忘吗 | 不会 | 会，随着上下文被填满 |
| 最适合 | 关键护栏、安全规则 | 项目上下文、编码规范 |
| Token 成本 | 每一轮 | 开始时一次 |
| 更新是否需要重启 | 不需要重启 | 需要重启会话 |

**在以下情况使用持久指令：**
- 指令至关重要，绝不能被忽略
- 你需要无法被绕过的安全护栏
- 你想在会话中途改变行为而不重启

**在以下情况使用 goosehints：**
- 提供项目上下文和背景信息
- 设置编码规范和偏好
- 信息有帮助但并非关键

两者可以一起使用：goosehints 用于项目上下文，持久指令用于关键护栏。

## 最佳实践

1. **保持简洁**：持久指令每一轮都会注入，文本越长，每次交互消耗的 token 越多。

2. **写具体**：像“小心一点”这样含糊的指令，不如“提交前始终运行 `npm test`”这样具体的指令有效。

3. **排优先级**：把最重要的指令放在前面，以防被截断。

4. **复杂规则用文件**：如果有多条准则，把它们组织在文件里，而不是全部塞进 `GOOSE_MOIM_MESSAGE_TEXT`。

5. **测试你的护栏**：设置持久指令后，让 goose 做一件应当被阻止的事，测试它是否遵守。
