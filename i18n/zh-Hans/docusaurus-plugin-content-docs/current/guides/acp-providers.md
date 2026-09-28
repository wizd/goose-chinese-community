---
sidebar_position: 9
title: ACP 提供商
sidebar_label: ACP 提供商
description: 把 Claude Code 和 Codex 等 ACP 代理用作带扩展支持的 goose 提供商
---

# ACP 提供商

goose 支持把 [Agent Client Protocol (ACP)](https://agentclientprotocol.com/) 代理作为提供商。ACP 是与编程代理通信的标准协议，实现它的代理有一个不断增长的[注册表](https://github.com/agentclientprotocol/registry)。

ACP 提供商会把 goose [扩展](/docs/getting-started/using-extensions)作为 MCP 服务器传递给代理，因此代理可以直接调用你的扩展。

:::tip 使用你现有的订阅
ACP 提供商让你用现有的 Claude Code 或 ChatGPT Plus/Pro 订阅使用 goose——没有按 token 计费的 API 成本。它们是已弃用的 [CLI 提供商](/docs/guides/cli-providers)的推荐替代。
:::

:::warning 限制
- **不支持会话分叉或恢复**：你可以开始新会话，但尚不支持 `goose session resume` 和 `goose session fork`。
- **ACP 会话 ID 与 goose 会话 ID 不同**：遥测字段可能无法在两者之间关联。
:::

## 可用的 ACP 提供商

### Amp ACP

封装 [amp-acp](https://www.npmjs.com/package/amp-acp)，这是 [Amp](https://ampcode.com) 的 ACP 适配器。使用你现有的 Amp 订阅。

**要求：**
- Node.js 和 npm
- 已安装 Amp CLI（`curl -fsSL https://ampcode.com/install.sh | bash`）
- 已安装 ACP 适配器（`npm install -g amp-acp`）
- 已用 Amp 账户完成身份验证（`amp` CLI 可用）

### Claude ACP

封装 [claude-agent-acp](https://github.com/agentclientprotocol/claude-agent-acp)，这是 Anthropic Claude Code 的 ACP 适配器。使用与已弃用的 `claude-code` CLI 提供商相同的 Claude 订阅。

**要求：**
- Node.js 和 npm
- 有效的 Claude Code 订阅
- 已用 Anthropic 账户完成身份验证（`claude` CLI 可用）

### Codex ACP

通过 [codex-acp](https://github.com/agentclientprotocol/codex-acp) 适配器，用 ChatGPT Plus/Pro 或 OpenAI API 额度使用 goose。

**要求：**
- Node.js 和 npm
- 有效的 ChatGPT Plus/Pro 订阅或 OpenAI API 额度
- 已用 OpenAI 账户完成身份验证（`codex` CLI 可用）

### Pi ACP

封装 `pi-acp`，这是 Pi 的 ACP 适配器。使用你现有的 Pi 安装。

**要求：**
- 已安装 Pi CLI
- 已安装 ACP 适配器（`pi-acp` 二进制可用）
- 已用 Pi 账户完成身份验证（`pi` CLI 可用）

## 设置说明

### Amp ACP

1. **安装 Amp CLI**

   ```bash
   curl -fsSL https://ampcode.com/install.sh | bash
   ```

2. **安装 ACP 适配器**

   ```bash
   npm install -g amp-acp
   ```

3. **向 Amp 进行身份验证**

   运行 `amp` 并按照身份验证提示操作。

4. **配置 goose**

   设置提供商环境变量：
   ```bash
   export GOOSE_PROVIDER=amp-acp
   ```

   或通过 goose CLI 使用 `goose configure` 进行配置。

### Claude ACP

1. **安装 ACP 适配器**

   ```bash
   npm install -g @agentclientprotocol/claude-agent-acp
   ```

2. **向 Claude 进行身份验证**

   确保你的 Claude CLI 已完成身份验证并且可用

3. **配置 goose**

   设置提供商环境变量：
   ```bash
   export GOOSE_PROVIDER=claude-acp
   ```

   或通过 goose CLI 使用 `goose configure` 进行配置：

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

### Codex ACP

1. **检查已安装的软件包**

   ```bash
   codex-acp --version
   ```

   输出应以 `@agentclientprotocol/codex-acp` 开头。如果是这样，继续进行身份验证。

2. **仅在需要时安装或替换**

   如果 `--version` 被拒绝，移除 `@agentclientprotocol/codex-acp`：

   ```bash
   npm uninstall -g @agentclientprotocol/codex-acp
   ```

   如果缺少 `codex-acp` 或它已被移除，安装 `@agentclientprotocol/codex-acp`：

   ```bash
   npm install -g @agentclientprotocol/codex-acp
   ```

3. **向 OpenAI 进行身份验证**

   运行 `codex` 并按照身份验证提示操作。可以复用兼容的现有 Codex 登录。

4. **配置 goose**

   设置提供商，并使用 `current` 让 Codex 选择其默认模型：
   ```bash
   export GOOSE_PROVIDER=codex-acp
   export GOOSE_MODEL=current
   ```

   或通过 goose CLI 使用 `goose configure` 进行配置：

   ```bash
   ┌   goose-configure
   │
   ◇  What would you like to configure?
   │  Configure Providers
   │
   ◇  Which model provider should we use?
   │  Codex CLI
   │
   ◇  Model fetch complete
   │
   ◇  Enter a model from that provider:
   │  current
   ```

替换 npm 软件包不会更改 `~/.codex`，也不需要重新创建 goose 配置。goose 不会自动替换该软件包。

### Pi ACP

1. **安装 Pi CLI 和 ACP 适配器**

   按照项目的安装说明安装 `pi` CLI 和 `pi-acp` ACP 适配器。

2. **向 Pi 进行身份验证**

   运行 `pi` 并按照身份验证提示操作。

3. **配置 goose**

   设置提供商环境变量：
   ```bash
   export GOOSE_PROVIDER=pi-acp
   ```

   或通过 goose CLI 使用 `goose configure` 进行配置。

## 使用示例

### 基本用法

```bash
goose session
```

### 与扩展一起使用

通过 `--with-extension` 或 `--with-streamable-http-extension` 配置的扩展会传递给 ACP 代理：

```bash
GOOSE_PROVIDER=claude-acp goose run \
  --with-extension 'npx -y @modelcontextprotocol/server-everything' \
  -t 'Use the echo tool to say hello'
```

```bash
GOOSE_PROVIDER=codex-acp goose run \
  --with-streamable-http-extension 'https://mcp.kiwi.com' \
  -t 'Search for flights from BKI to SYD tomorrow'
```

## 配置选项

### Amp ACP 配置

| 环境变量 | 说明       | 默认值   |
|----------------------|-------------------|-----------|
| `GOOSE_PROVIDER`     | 设为 `amp-acp`  | 无      |
| `GOOSE_MODEL`        | 要使用的模型      | `current` |
| `GOOSE_MODE`         | 权限模式   | `auto`    |

### Claude ACP 配置

| 环境变量 | 说明         | 默认值   |
|----------------------|---------------------|-----------|
| `GOOSE_PROVIDER`     | 设为 `claude-acp` | 无      |
| `GOOSE_MODEL`        | 要使用的模型        | `default` |
| `GOOSE_MODE`         | 权限模式     | `auto`    |

**已知模型：**
- `default`（opus）
- `sonnet`
- `haiku`

**权限模式（`GOOSE_MODE`）：**

| 模式            | 会话模式        | 行为                                              |
|-----------------|---------------------|-------------------------------------------------------|
| `auto`          | `bypassPermissions` | 跳过所有权限检查                           |
| `smart-approve` | `acceptEdits`       | 自动接受文件编辑，对有风险的操作进行提示 |
| `approve`       | `default`           | 对所有需要权限的操作进行提示        |
| `chat`          | `plan`              | 仅规划，不执行工具                      |

会话模式细节见 [claude-agent-acp](https://github.com/agentclientprotocol/claude-agent-acp)。

### Codex ACP 配置

| 环境变量 | 说明        | 默认值   |
|----------------------|--------------------|-----------|
| `GOOSE_PROVIDER`     | 设为 `codex-acp` | 无      |
| `GOOSE_MODEL`        | 要使用的模型       | `current` |
| `GOOSE_MODE`         | 权限模式    | `auto`    |

Codex ACP 会动态报告可用模型。保留 `current` 以使用 Codex 的默认模型，或显式选择一个已发现的模型。

**权限模式（`GOOSE_MODE`）：**

| goose 模式      | Codex ACP 模式      |
|-----------------|---------------------|
| `auto`          | `agent-full-access` |
| `smart-approve` | `agent`             |
| `approve`       | `read-only`         |
| `chat`          | `read-only`         |

会话模式细节见 [codex-acp](https://github.com/agentclientprotocol/codex-acp)。

### Pi ACP 配置

| 环境变量 | 说明      | 默认值   |
|----------------------|------------------|-----------|
| `GOOSE_PROVIDER`     | 设为 `pi-acp`  | 无      |
| `GOOSE_MODEL`        | 要使用的模型     | `current` |
| `GOOSE_MODE`         | 权限模式  | `auto`    |

## 错误处理

ACP 提供商依赖外部二进制文件，因此请确保：

- ACP 代理二进制已安装并在 PATH 中（`amp-acp`、`claude-agent-acp`、`codex-acp`、`pi-acp` 或 `copilot`）
- 底层 CLI 工具已完成身份验证并且可用
- 未超出订阅限制
- 已安装 Node.js 和 npm（对于通过 npm 分发的适配器）

如果 goose 找不到二进制文件，会话启动会失败并报错。运行 `which <binary>` 以验证安装。
