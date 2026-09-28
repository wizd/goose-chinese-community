---
title: VMware Tanzu Platform
description: 把 goose 连接到 VMware Tanzu Platform AI Services
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# VMware Tanzu Platform

[VMware Tanzu Platform](https://techdocs.broadcom.com/us/en/vmware-tanzu/platform/ai-services/10-3/ai/index.html) 通过 AI Services 提供企业托管的 LLM 访问。goose 以 OpenAI 兼容提供商的身份连接到 VMware Tanzu Platform，支持**单模型**和**多模型**服务方案，并默认启用流式输出。

## 前提条件

- 已安装并配置 GenAI tile 的 VMware Tanzu Platform (TAS) 基础环境
- 可以访问某个 CF org/space，且市场中提供 `genai` 服务
- 已安装并完成身份验证的 CF CLI（`cf`）（`cf login`）
- goose v1.28.0 或更高版本

## 步骤 1：检查可用方案

首先确认市场中有 `genai` 服务，并查看可用方案：

```sh
cf marketplace -e genai
```

你会看到类似输出：

```
broker: genai-service
   plan                                description                                            free or paid
   tanzu-Qwen3-Coder-30B-A3B-vllm-v1  Access to: Qwen/Qwen3-Coder-30B-A3B-Instruct-FP8.    free
   tanzu-gpt-oss-120b-vllm-v1          Access to: openai/gpt-oss-120b.                        free
   tanzu-all-models                    Access to: Qwen3.5-122B, Qwen3-Coder-30B, gpt-oss...   free
```

每个方案对应不同的模型或一组模型。**单模型方案**提供对一个模型的访问。**多模型方案**（例如 `tanzu-all-models`）在单个端点后提供对多个模型的访问。

## 步骤 2：创建服务实例

### 选项 A：单模型方案

使用单模型方案创建服务实例：

```sh
cf create-service genai tanzu-Qwen3-Coder-30B-A3B-vllm-v1 my-qwen-coder --wait
```

### 选项 B：多模型方案

使用多模型方案创建服务实例：

```sh
cf create-service genai tanzu-all-models my-all-models --wait
```

确认实例已创建：

```sh
cf services
```

## 步骤 3：创建服务密钥

创建服务密钥以生成 API 凭据：

```sh
cf create-service-key my-qwen-coder my-goose-key --wait
```

然后获取凭据：

```sh
cf service-key my-qwen-coder my-goose-key
```

### 单模型方案的输出

对于单模型方案，输出在顶层包含模型元数据：

```json
{
  "credentials": {
    "api_base": "https://genai-proxy.sys.example.com/tanzu-my-model-abc1234/openai",
    "api_key": "eyJhbGciOi...",
    "endpoint": {
      "api_base": "https://genai-proxy.sys.example.com/tanzu-my-model-abc1234",
      "api_key": "eyJhbGciOi...",
      "config_url": "https://genai-proxy.sys.example.com/tanzu-my-model-abc1234/config/v1/endpoint",
      "name": "tanzu-my-model-abc1234"
    },
    "model_capabilities": ["chat", "tools"],
    "model_name": "Qwen/Qwen3-Coder-30B-A3B-Instruct-FP8",
    "wire_format": "openai"
  }
}
```

### 多模型方案的输出

对于多模型方案，输出只包含 endpoint 对象：

```json
{
  "credentials": {
    "endpoint": {
      "api_base": "https://genai-proxy.sys.example.com/tanzu-all-models-abc1234",
      "api_key": "eyJhbGciOi...",
      "config_url": "https://genai-proxy.sys.example.com/tanzu-all-models-abc1234/config/v1/endpoint",
      "name": "tanzu-all-models-abc1234"
    }
  }
}
```

## 步骤 4：确定端点和 API 密钥

从服务密钥输出中，你需要 **`credentials.endpoint`** 对象里的两个值：

| 值 | JSON 路径 | 示例 |
|-------|-----------|---------|
| **端点 URL** | `credentials.endpoint.api_base` | `https://genai-proxy.sys.example.com/tanzu-my-model-abc1234` |
| **API 密钥** | `credentials.endpoint.api_key` | `eyJhbGciOi...`（JWT 令牌） |

:::warning 使用 `credentials.endpoint.api_base`，不要使用 `credentials.api_base`
单模型方案包含带有 `/openai` 后缀的顶层 `credentials.api_base` 字段。**不要使用这个值。** 始终使用 `credentials.endpoint.api_base`（不含 `/openai`），因为 goose 会自动追加正确的路径。

使用错误的值会产生双重路径 URL，例如 `.../openai/openai/v1/chat/completions`。
:::

## 步骤 5：配置 goose

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

  1. 打开 goose 桌面版
  2. 点击侧边栏按钮，然后 **Settings** > **Models** > **Configure providers**
  3. 在提供商列表中找到 **VMware Tanzu Platform** 并点击 **Configure**
  4. 输入你的值：
     - **TANZU_AI_ENDPOINT**：粘贴 `credentials.endpoint.api_base` URL
     - **TANZU_AI_API_KEY**：粘贴 `credentials.endpoint.api_key` JWT 令牌
  5. 点击 **Submit**
  6. 从动态获取的列表中选择一个模型

  </TabItem>
  <TabItem value="cli" label="goose CLI">

  ### 选项 1：使用 `goose configure`

  ```sh
  goose configure
  ```

  1. 选择 **Configure Providers**
  2. 从列表中选择 **VMware Tanzu Platform**
  3. 在提示时输入 `TANZU_AI_ENDPOINT`
  4. 在提示时输入 `TANZU_AI_API_KEY`
  5. 从获取的列表中选择一个模型

  ### 选项 2：使用环境变量

  在启动 goose 之前设置以下环境变量：

  ```sh
  export TANZU_AI_ENDPOINT="https://genai-proxy.sys.example.com/tanzu-my-model-abc1234"
  export TANZU_AI_API_KEY="eyJhbGciOi..."
  ```

  然后启动 goose：

  ```sh
  goose session
  ```

  :::tip
  把这些 export 加入 shell 配置文件（`~/.bashrc`、`~/.zshrc` 等），以便在会话之间保持。
  :::

  </TabItem>
</Tabs>

## 步骤 6：选择模型

goose 会从你的 Tanzu 端点动态获取可用模型。配置提供商之后：

- **单模型方案**：会列出那一个可用模型（例如 `Qwen/Qwen3-Coder-30B-A3B-Instruct-FP8`）
- **多模型方案**：会列出该方案上的所有模型，你可以在它们之间切换

稍后要更换模型，在桌面版中使用 **Settings** > **Models** > **Switch models**，或在 CLI 中运行 `goose configure`。

:::note
仅用于嵌入的模型（例如 `nomic-ai/nomic-embed-text-v2-moe`）会出现在模型列表中，但不能用作聊天模型。
:::

## 故障排除

### “Could not contact provider” / 模型端点返回 401 Unauthorized

这意味着 API 密钥没有被正确发送。常见原因：

1. **未设置环境变量**：如果使用 goose 桌面版，shell 中的环境变量可能不会被继承。请改用设置界面配置提供商。
2. **错误的 `api_base`**：确保使用的是 `credentials.endpoint.api_base`（不含 `/openai`），而不是 `credentials.api_base`。
3. **API 密钥过期**：Tanzu API 密钥是可能过期的 JWT 令牌。用 `cf create-service-key` 生成新的服务密钥。

### 手动验证端点

可以用 curl 测试连通性：

```sh
# Test model discovery
curl -H "Authorization: Bearer $TANZU_AI_API_KEY" \
  "$TANZU_AI_ENDPOINT/openai/v1/models"

# Test chat completions
curl -X POST "$TANZU_AI_ENDPOINT/openai/v1/chat/completions" \
  -H "Authorization: Bearer $TANZU_AI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"YOUR_MODEL_NAME","messages":[{"role":"user","content":"hello"}]}'
```

### 流式输出

流式输出默认启用。如果你的端点不支持流式输出，可以在提供商配置界面取消勾选 **Streaming**，或把 `TANZU_AI_STREAMING` 环境变量设为 `false`。

### 找不到模型

如果所选模型返回错误，请验证方案上的可用模型：

```sh
curl -H "Authorization: Bearer $TANZU_AI_API_KEY" \
  "$TANZU_AI_ENDPOINT/openai/v1/models"
```

确保模型名称完全匹配（包括前缀，例如 `Qwen/Qwen3-Coder-30B-A3B-Instruct-FP8`）。

### 清理

要移除服务实例及其密钥：

```sh
cf delete-service-key my-qwen-coder my-goose-key -f
cf delete-service my-qwen-coder -f
```
