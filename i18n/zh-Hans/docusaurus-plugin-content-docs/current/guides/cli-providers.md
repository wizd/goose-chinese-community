---
sidebar_position: 8
title: CLI 提供商
sidebar_label: CLI 提供商
description: 在 goose 中使用 Claude Code、Codex、Cursor Agent 或 Gemini CLI 订阅
---

# CLI 提供商

:::warning 已弃用 — 请使用 ACP 提供商
Claude Code（`claude-code`）、Codex（`codex`）、Gemini CLI（`gemini-cli`）和 Gemini OAuth（`gemini_oauth`）提供商已弃用。Claude 和 Codex 请改用 [ACP 提供商](/docs/guides/acp-providers)（`claude-acp`、`codex-acp`）。Gemini 请使用带 Gemini API 密钥的 [Google 提供商](/docs/getting-started/providers#google-gemini)或 [Vertex AI](https://cloud.google.com/vertex-ai)。已弃用的提供商仅为向后兼容而保留。
:::

goose 可以使用透传提供商，与来自 Anthropic、OpenAI、Cursor 和 Google 的现有 CLI 工具集成。这些提供商让你通过 goose 的界面使用现有的 Claude Code、Codex、Cursor Agent 和 Google Gemini CLI 订阅，并为这些工具增加会话管理、持久化和工作流集成能力。Gemini OAuth 提供商已弃用，因为 Google 不再对某些账户类型支持底层的 Code Assist 登录流程。参见 Google 的[公告](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)和[弃用通知](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals)。

:::warning 限制
这些提供商并不完全支持 goose 的全部功能，可能存在平台或能力限制，出现问题时有时需要高级调试。把它们收录在这里只是为了方便。
:::

## 为什么使用 CLI 提供商？

CLI 提供商在以下情况有用：

- 你已经有 Claude Code、Codex、Cursor 或 Google Gemini CLI 订阅，希望通过 goose 使用它，而不是按 token 付费
- 需要会话持久化，以便保存、恢复和导出对话历史
- 想用 goose 配方和定时任务创建可重复的工作流
- 希望在不同 AI 提供商之间使用统一命令
- 想在任务中[一起使用多个模型](/docs/guides/multi-model)

### 好处

#### 会话管理
- **持久对话**：跨重启保存并恢复会话
- **导出能力**：导出对话历史和产物
- **会话组织**：管理多条对话线程

#### 工作流集成
- **配方兼容**：在自动化 goose 配方中使用 CLI 提供商
- **调度支持**：纳入定时任务和工作流
- **混合配置**：与子代理和特定模型的工作流结合

#### 界面一致性
- **统一命令**：在所有提供商上使用相同的 `goose session` 界面
- **一致的配置**：通过 goose 的配置系统管理所有提供商

:::warning 扩展
CLI 提供商**不会**让你使用 goose 的扩展生态（MCP 服务器、第三方集成等）。它们使用自己的内置工具以避免冲突。如果你需要 goose 的扩展，请改用标准 [API 提供商](/docs/getting-started/providers#available-providers)。
:::


## 可用的 CLI 提供商

### Claude Code

Claude Code 提供商与 Anthropic 的 [Claude CLI 工具](https://claude.ai/cli)集成，让你通过现有的 Claude Code 订阅使用 Claude 模型。

**功能：**
- 使用 Claude 的最新模型
- 200,000 token 上下文限制
- 自动从系统提示中过滤 goose 扩展（因为 Claude Code 有自己的工具生态）
- 用于持久、多轮会话的流式 JSON（NDJSON）协议

**要求：**
- 已安装并配置 Claude CLI 工具
- 有效的 Claude Code 订阅
- CLI 工具已用你的 Anthropic 账户认证

### OpenAI Codex

Codex 提供商与 OpenAI 的 [Codex CLI 工具](https://developers.openai.com/codex/cli)集成，让你通过现有的 ChatGPT Plus/Pro 订阅或 API 额度使用 OpenAI 模型。

**功能：**
- 使用 OpenAI 的 GPT-5 系列模型（gpt-5.2-codex、gpt-5.2、gpt-5.1-codex-max、gpt-5.1-codex-mini）
- 可配置的推理强度（`low`、`medium`、`high`、`xhigh`；`none` 仅在非 codex 模型如 `gpt-5.2` 上受支持）
- 可选的技能支持，以增强能力
- 用于结构化响应的 JSON 输出解析
- 自动从系统提示中过滤 goose 扩展

**要求：**
- 已安装 Codex CLI 工具（`npm i -g @openai/codex` 或 `brew install --cask codex`）
- 有效的 ChatGPT Plus/Pro 订阅或 OpenAI API 额度
- CLI 工具已用你的 OpenAI 账户认证
- 默认情况下，Codex 要求从 git 仓库中运行。设置 `CODEX_SKIP_GIT_CHECK=true` 可绕过此要求

### Cursor Agent

Cursor 提供商与 Cursor 的 [CLI agent](https://docs.cursor.com/en/cli/installation)集成，通过你现有的订阅提供访问。

**功能：**

- 与 Cursor Agent CLI 编码任务集成。
- 适合与代码相关的工作流和文件交互。

**要求：**

- 已安装并配置 cursor-agent 工具。
- CLI 工具已认证。

### Gemini CLI

Gemini CLI 提供商与 Google 的 [Gemini CLI 工具](https://ai.google.dev/gemini-api/docs)集成，通过你的 Google AI 订阅提供对 Gemini 模型的访问。

**功能：**
- 1,000,000 token 上下文限制

**要求：**
- 已安装并配置 Gemini CLI 工具
- CLI 工具已用你的 Google 账户认证

## 设置说明

### Claude Code

1. **安装 Claude CLI 工具**
   
   按照 [Claude Code 安装说明](https://docs.anthropic.com/en/docs/claude-code/overview)安装并配置 Claude CLI 工具。

2. **向 Claude 认证**
   
   确保你的 Claude CLI 已认证且可以工作

3. **配置 goose**
   
   设置提供商环境变量：
   ```bash
   export GOOSE_PROVIDER=claude-code
   ```
   
   或通过 goose CLI 使用 `goose configure` 配置：

   ```bash
   ┌   goose-configure 
   │
   ◇  What would you like to configure?
   │  Configure Providers 
   │
   ◇  Which model provider should we use?
   │  Claude Code 
   │
   ◇  Model fetch complete
   │
   ◇  Enter a model from that provider:
   │  default
   ```
### OpenAI Codex

1. **安装 Codex CLI 工具**

   使用 npm 或 Homebrew 安装 Codex CLI：
   ```bash
   npm i -g @openai/codex
   # or
   brew install --cask codex
   ```

2. **向 OpenAI 认证**

   运行 `codex` 并按照认证提示操作。你可以使用 ChatGPT 账户或 API 密钥。

3. **配置 goose**

   设置提供商环境变量：
   ```bash
   export GOOSE_PROVIDER=codex
   ```

   或通过 goose CLI 使用 `goose configure` 配置：

   ```bash
   ┌   goose-configure
   │
   ◇  What would you like to configure?
   │  Configure Providers
   │
   ◇  Which model provider should we use?
   │  OpenAI Codex CLI
   │
   ◇  Model fetch complete
   │
   ◇  Enter a model from that provider:
   │  gpt-5.2-codex
   ```

### Cursor Agent

1. **安装 Cursor agent 工具**

   按照 [Cursor Agent 安装说明](https://docs.cursor.com/en/cli/installation)安装并配置 cursor agent 工具。

2. **向 Cursor 认证**

   确保你的 Cursor Agent 已认证且可以工作

3. **配置 goose**

   设置提供商环境变量：

   ```bash
   export GOOSE_PROVIDER=cursor-agent
   ```

   或通过 goose CLI 使用 `goose configure` 配置：

   ```bash
   ┌   goose-configure
   │
   ◇  What would you like to configure?
   │  Configure Providers
   │
   ◇  Which model provider should we use?
   │  Cursor Agent
   │
   ◇  Model fetch complete
   │
   ◇  Enter a model from that provider:
   │  default
   ```

### Gemini CLI

1. **安装 Gemini CLI 工具**
   
   按照 [Gemini CLI 安装说明](https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/)安装并配置 Gemini CLI 工具。

2. **向 Google 认证**
   
   确保你的 Gemini CLI 已认证且可以工作。

3. **配置 goose**
   
   设置提供商环境变量：
   ```bash
   export GOOSE_PROVIDER=gemini-cli
   ```
   
   或通过 goose CLI 使用 `goose configure` 配置：

   ```bash
   ┌   goose-configure 
   │
   ◇  What would you like to configure?
   │  Configure Providers 
   │
   ◇  Which model provider should we use?
   │  Gemini CLI 
   │
   ◇  Model fetch complete
   │
   ◇  Enter a model from that provider:
   │  default
   ```

## 使用示例

### 基本用法

配置完成后，你可以像使用其他提供商一样用这些提供商开始 goose 会话：

```bash
goose session
```

## 配置选项

### Claude Code 配置

| 环境变量 | 说明 | 默认值 |
|---------------------|-------------|---------|
| `GOOSE_PROVIDER` | 设为 `claude-code` 以使用此提供商 | 无 |
| `GOOSE_MODEL` | 要使用的模型（只有 `sonnet` 或 `opus` 会传给 CLI） | `claude-sonnet-4-20250514` |
| `CLAUDE_CODE_COMMAND` | Claude CLI 命令的路径 | `claude` |

**已知模型：**

以下模型会被识别，并通过 `--model` 标志传给 Claude CLI。如果 `GOOSE_MODEL` 设为不在此列表中的值，则不会传递模型标志，Claude Code 使用其默认值：

- `default`（opus）
- `sonnet`
- `haiku`

**权限模式（`GOOSE_MODE`）：**

| 模式 | Claude Code 标志 | 行为 |
|------|------------------|----------|
| `auto` | `--dangerously-skip-permissions` | 绕过所有权限提示 |
| `smart-approve` | `--permission-prompt-tool stdio` | 通过控制协议路由权限检查（按需提示） |
| `approve` | `--permission-prompt-tool stdio` | 通过控制协议路由权限检查（按需提示） |
| `chat` | （无） | Claude Code 的默认行为 |

:::tip 批准模式集成
在 Claude Code 上使用 `approve` 或 `smart_approve` 模式时，goose 会把 Claude Code 的权限提示路由到 goose 的确认界面。这意味着：

- **敏感操作**（写文件、shell 命令等）会在 goose 中触发批准提示
- **你直接在 goose CLI 或桌面版界面中审查并批准/拒绝**
- **被拒绝的操作**会传回 Claude Code，它会相应调整

这在利用 Claude Code 内置安全检查的同时，为所有 goose 提供商提供一致的权限体验。

使用批准模式的示例：
```bash
GOOSE_PROVIDER=claude-code GOOSE_MODE=approve goose session
```
:::

### Cursor Agent 配置

| 环境变量 | 说明 | 默认值 |
|---------------------|-------------|---------|
| `GOOSE_PROVIDER` | 设为 `cursor-agent` 以使用此提供商 | 无 |
| `CURSOR_AGENT_COMMAND` | Cursor Agent 命令的路径 | `cursor-agent` |

### OpenAI Codex 配置

| 环境变量 | 说明 | 默认值 |
|---------------------|-------------|---------|
| `GOOSE_PROVIDER` | 设为 `codex` 以使用此提供商 | 无 |
| `GOOSE_MODEL` | 要使用的模型（只有已知模型会传给 CLI） | `gpt-5.2-codex` |
| `CODEX_COMMAND` | Codex CLI 命令的路径 | `codex` |
| `CODEX_REASONING_EFFORT` | 推理强度：`low`、`medium`、`high` 或 `xhigh`（`none` 仅在非 codex 模型如 `gpt-5.2` 上受支持） | `high` |
| `CODEX_ENABLE_SKILLS` | 启用 Codex 技能：`true` 或 `false` | `true` |
| `CODEX_SKIP_GIT_CHECK` | 跳过 git 仓库要求：`true` 或 `false` | `false` |

**已知模型：**

以下模型会被识别，并通过 `-m` 标志传给 Codex CLI。如果 `GOOSE_MODEL` 设为不在此列表中的值，则不会传递模型标志，Codex 使用其默认值：

- `gpt-5.2-codex`（400K 上下文，自动压缩）
- `gpt-5.2`（400K 上下文，自动压缩）
- `gpt-5.1-codex-max`（256K 上下文）
- `gpt-5.1-codex-mini`（256K 上下文）

:::note 旧版模型
这些是 Codex CLI v0.77.0 支持的默认模型。要访问更旧或遗留模型，可以直接运行 `codex -m <model_name>`，或在 Codex 的 `config.toml` 中配置。细节见 [Codex CLI 文档](https://developers.openai.com/codex/cli)。
:::

**权限模式（`GOOSE_MODE`）：**

| 模式 | Codex 标志 | 行为 |
|------|------------|----------|
| `auto` | `--yolo` | 绕过所有批准和沙箱限制 |
| `smart-approve` | `--full-auto` | 工作区写入沙箱，仅在失败时批准 |
| `approve` | （无） | 交互式批准（Codex 默认行为） |
| `chat` | `--sandbox read-only` | 只读沙箱模式 |

### Gemini CLI 配置

| 环境变量 | 说明 | 默认值 |
|---------------------|-------------|---------|
| `GOOSE_PROVIDER` | 设为 `gemini-cli` 以使用此提供商 | 无 |
| `GEMINI_CLI_COMMAND` | Gemini CLI 命令的路径 | `gemini` |

## 工作原理

### 系统提示过滤

CLI 提供商会自动从系统提示中过滤掉 goose 的扩展信息，因为这些 CLI 工具有自己的工具生态。这可以避免冲突，并确保与底层 CLI 工具的交互干净。

### 消息转换

- **Claude Code**：把 goose 消息转换为带角色前缀（Human:/Assistant:）的文本内容块，类似于 Codex 和 Gemini CLI
- **Codex**：把消息转换为带角色前缀（Human:/Assistant:）的简单文本提示，类似于 Gemini CLI
- **Cursor Agent**：把 goose 消息转换为 Cursor 的 JSON 消息格式，并适当处理工具调用和响应
- **Gemini CLI**：把消息转换为带角色前缀（Human:/Assistant:）的简单文本提示

### 响应处理

- **Claude Code**：解析流式 JSON 响应以提取文本内容和用量信息
- **Codex**：解析换行分隔的 JSON 事件以提取文本内容和用量信息
- **Cursor Agent**：解析 JSON 响应以提取文本内容和用量信息
- **Gemini CLI**：处理来自 CLI 工具的纯文本响应

## 错误处理

CLI 提供商依赖外部工具，因此请确保：

- CLI 工具已正确安装并位于 PATH 中
- 认证保持有效
- 未超出订阅限制
- 对于 Codex：你位于 git 仓库中，或设置了 `CODEX_SKIP_GIT_CHECK=true`


---

CLI 提供商提供了一种通过 goose 界面使用现有 AI 工具订阅的方式，并增加会话管理和工作流集成能力。对于已有 CLI 订阅、又希望获得统一会话管理和配方集成的用户，它们特别有价值。
