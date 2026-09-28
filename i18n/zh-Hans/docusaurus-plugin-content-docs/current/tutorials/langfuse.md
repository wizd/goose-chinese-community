---
description: 将 goose 与 Langfuse 集成以观察性能
---

# 使用 Langfuse 做可观测性

本教程介绍如何将 goose 与 Langfuse 集成，从而监控 goose 请求，并了解智能体的表现。

## 什么是 Langfuse

[Langfuse](https://langfuse.com/) 是一个[开源](https://github.com/langfuse/langfuse)的大语言模型工程平台，让团队可以协作监控、评估和调试他们的大语言模型应用。


## 设置 Langfuse

[注册 Langfuse Cloud](https://cloud.langfuse.com)，或使用 [Docker Compose](https://langfuse.com/self-hosting/local) 自行托管 Langfuse，以获取 Langfuse API 密钥。

## 配置 goose 连接 Langfuse

设置环境变量，让 goose（用 Rust 编写）能够连接到 Langfuse 服务器。

```bash
export LANGFUSE_INIT_PROJECT_PUBLIC_KEY=pk-lf-...
export LANGFUSE_INIT_PROJECT_SECRET_KEY=sk-lf-...
export LANGFUSE_URL=https://cloud.langfuse.com # EU data region 🇪🇺

# https://us.cloud.langfuse.com if you're using the US region 🇺🇸
# https://localhost:3000 if you're self-hosting
```

默认情况下，追踪不包含模型消息以及工具参数和结果。要包含这些内容，请显式启用内容捕获：

```bash
export OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true
```

只有在遥测存储适合存放可能敏感的内容时，才启用内容捕获。

## 在集成 Langfuse 的情况下运行 goose

现在可以运行 goose，并通过 Langfuse 监控你的 AI 请求和操作。

goose 正在运行且环境变量已设置时，Langfuse 会开始捕获 goose 活动的追踪。

_[Langfuse 中的示例追踪（公开）](https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/cea4ed38-0c44-4b0a-8c20-4b0b6b9e8d73?timestamp=2025-01-31T15%3A52%3A30.362Z&observation=7c8e5807-3c29-4c28-9c6f-7d7427be401f)_

![Langfuse 中的 goose 追踪](https://langfuse.com//images/docs/goose-integration/goose-example-trace.png)
