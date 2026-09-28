# VMware Tanzu Platform - CLI 测试指南

## 前提条件

- 从 `feat/tanzu-ai-provider` 分支构建的 goose CLI
- Tanzu AI Services 端点和 API 密钥（单模型或多模型方案）

## 定位 CLI 二进制文件

**macOS：**
```bash
# If built from source:
export GOOSE_CLI=~/claude/goose-fork/target/release/goose

# Verify:
$GOOSE_CLI --version
```

**Linux：**
```bash
# If installed via .deb:
export GOOSE_CLI=/usr/bin/goose

# If built from source:
export GOOSE_CLI=~/goose-fork/target/release/goose

# Verify:
$GOOSE_CLI --version
```

## 测试 1：配置 VMware Tanzu Platform 提供商

```bash
goose configure
```

1. 选择 **Configure Providers**
2. 滚动或搜索 **VMware Tanzu Platform**
3. 提示输入 **TANZU_AI_ENDPOINT** 时，输入你的端点 URL：
   - 单模型：`https://genai-proxy.sys.example.com/tanzu-my-model-abc1234`
   - 多模型：`https://genai-proxy.sys.example.com/tanzu-all-models-abc1234`
4. 提示输入 **TANZU_AI_API_KEY** 时，粘贴服务密钥中的 JWT 令牌
5. 从动态获取的列表中选择一个模型

**预期：** 模型从端点获取并显示供选择。

## 测试 2：开始会话（单模型方案）

```bash
export TANZU_AI_ENDPOINT="https://genai-proxy.sys.tas-tdc.kuhn-labs.com/tanzu-Qwen3-Coder-30B-A3B-vllm-v1-f3b0d18"
export TANZU_AI_API_KEY="<your-jwt-token>"

goose session
```

输入一条简单提示：
```
> What is 2 + 2?
```

**预期：** 模型给出回答。如果启用了流式输出，token 会逐步出现。

## 测试 3：开始会话（多模型方案）

```bash
export TANZU_AI_ENDPOINT="https://genai-proxy.sys.tas-tdc.kuhn-labs.com/tanzu-all-models-a8a9e22"
export TANZU_AI_API_KEY="<your-jwt-token>"

goose session
```

**预期：** 会话以 `goose configure` 期间所选的模型启动。

## 测试 4：验证流式输出

启用流式输出（`supports_streaming: true`）后，响应应逐个 token 出现，而不是一次全部显示。

```
> Write a short poem about clouds
```

**预期：** 文本逐步流出，而不是延迟后一次全部出现。

## 测试 5：验证动态获取模型

```bash
goose configure
```

选择 **Configure Providers** > **VMware Tanzu Platform**。

**单模型方案的预期：** 出现一个模型（例如 `Qwen/Qwen3-Coder-30B-A3B-Instruct-FP8`）
**多模型方案的预期：** 出现多个模型（例如 `Qwen3.5-122B`、`Qwen3-Coder-30B`、`gpt-oss-120b`）

## 测试 6：验证错误消息

### 缺少 API 密钥
```bash
unset TANZU_AI_API_KEY
goose session
```
**预期：** 清晰的错误消息："Required API key TANZU_AI_API_KEY is not set."

### 缺少端点
```bash
unset TANZU_AI_ENDPOINT
goose session
```
**预期：** 关于未设置 TANZU_AI_ENDPOINT 的清晰错误消息。

### 错误的端点
```bash
export TANZU_AI_ENDPOINT="https://genai-proxy.sys.example.com/nonexistent"
export TANZU_AI_API_KEY="invalid-key"
goose session
```
**预期：** 连接或身份验证错误，而不是崩溃。

## 测试 7：在方案之间切换

1. 用多模型端点配置，选择一个模型，开始会话，确认可用
2. 再次运行 `goose configure`
3. 把 TANZU_AI_ENDPOINT 改为单模型端点
4. 选择该单一模型
5. 开始新会话，确认可用

**预期：** 两种方案都能工作，无需重启 goose。

## 用 curl 快速验证

在用 goose 测试之前，可以直接验证端点：

```bash
# Test models endpoint
curl -s -H "Authorization: Bearer $TANZU_AI_API_KEY" \
  "$TANZU_AI_ENDPOINT/openai/v1/models" | python3 -m json.tool

# Test chat completions
curl -s -X POST "$TANZU_AI_ENDPOINT/openai/v1/chat/completions" \
  -H "Authorization: Bearer $TANZU_AI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"Qwen/Qwen3-Coder-30B-A3B-Instruct-FP8","messages":[{"role":"user","content":"hello"}],"max_tokens":10}'

# Test streaming
curl -s -N -X POST "$TANZU_AI_ENDPOINT/openai/v1/chat/completions" \
  -H "Authorization: Bearer $TANZU_AI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"Qwen/Qwen3-Coder-30B-A3B-Instruct-FP8","messages":[{"role":"user","content":"hello"}],"max_tokens":10,"stream":true}'
```
