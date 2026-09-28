---
sidebar_position: 1
title: SDK
sidebar_label: 概览
description: 在 Rust、Python 和 Kotlin 中使用 goose provider 构建。
---

# SDK

SDK 把它的 provider 层作为进程内库暴露出来，因此你可以在自己的应用中调用模型、流式获取补全，并压缩对话。

一个 Rust crate `goose-sdk` 是所有语言绑定的来源。Python 和 Kotlin 由它通过 [UniFFI](https://github.com/mozilla/uniffi-rs) 生成，因此三种语言共享相同的类型、行为和版本号。

完整接口见 [API 参考](/docs/gdk/sdk/api-reference)，按你选择的语言查看。

:::info Alpha
SDK 处于 alpha 阶段。接口可能在 `0.x` 版本之间变化。请固定确切版本，升级时查看 API 参考的版本选择器。
:::

## 你可以做什么

- 为 OpenAI、Anthropic、Groq、Databricks，或任何在 JSON 中定义的[声明式 provider](#declarative-providers)构造 provider
- 逐块流式获取补全，包括工具调用和推理输出
- 请求一次非流式的单次补全
- 把很长的对话压缩成摘要，以便在超出模型上下文窗口后继续
- 把 provider 请求日志捕获为 JSONL

## 安装

<!-- prettier-ignore-start -->

### Rust

```bash
cargo add goose-sdk --features uniffi
```

`uniffi` feature 启用本文档所述的进程内 provider API。

### Python

```bash
pip install goose-sdk
```

该包以 `goose-sdk` 安装，以 `goose` 导入。Wheel 捆绑了原生库，因此无需再构建其他内容。需要 Python 3.9+。

```python
import goose
```

### Kotlin / JVM

```kotlin
dependencies {
    implementation("io.github.aaif-goose:gdk:<version>")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.10.2")
}
```

构件版本与 Rust crate 版本一致。类位于 `io.github.aaif_goose` 包中。jar 捆绑了 macOS（arm64、x86-64）、Linux（arm64、x86-64）和 Windows（x86-64）的原生库。

在 JDK 24+ 上，请添加 `--enable-native-access=ALL-UNNAMED`，因为 GDK 通过 JNA 加载其原生库。

<!-- prettier-ignore-end -->

## 快速开始

每个示例都会构建一个 provider、发送一条消息，并打印流式响应。

### Python

```python
import asyncio
from goose import (
    MessageContent,
    MessageRole,
    ProviderMessage,
    ProviderModelConfig,
    StreamChunk,
    openai_default_model,
    openai_provider,
)


async def main() -> None:
    provider = openai_provider(api_key="...")
    model = ProviderModelConfig(model_name=openai_default_model())
    messages = [
        ProviderMessage(
            role=MessageRole.USER,
            content=[MessageContent.Text(text="What is the capital of France?")],
        )
    ]

    stream = await provider.stream(model, "You are a geography expert.", messages, [])
    while chunk := await stream.next_chunk():
        if isinstance(chunk, StreamChunk.TextChunk):
            print(chunk.text, end="")


asyncio.run(main())
```

### Kotlin

```kotlin
import io.github.aaif_goose.MessageContent
import io.github.aaif_goose.MessageRole
import io.github.aaif_goose.ProviderMessage
import io.github.aaif_goose.ProviderModelConfig
import io.github.aaif_goose.StreamChunk
import io.github.aaif_goose.streamFlow
import io.github.aaif_goose.providers.openai.defaultModel
import io.github.aaif_goose.providers.openai.provider as openAiProvider
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    val provider = openAiProvider(System.getenv("OPENAI_API_KEY"))
    val model = ProviderModelConfig(modelName = defaultModel())
    val messages = listOf(
        ProviderMessage(
            role = MessageRole.USER,
            content = listOf(MessageContent.Text(text = "What is the capital of France?")),
        ),
    )

    provider.streamFlow(model, "You are a geography expert.", messages)
        .collect { chunk ->
            if (chunk is StreamChunk.TextChunk) print(chunk.text)
        }
}
```

### Rust

```rust
use goose_sdk::bindings::{
    openai_default_model, openai_provider, MessageContent, MessageRole, ProviderMessage,
    ProviderModelConfig, StreamChunk,
};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let provider = openai_provider(std::env::var("OPENAI_API_KEY")?)?;
    let model = ProviderModelConfig {
        model_name: openai_default_model(),
        ..Default::default()
    };
    let messages = vec![ProviderMessage {
        role: MessageRole::User,
        content: vec![MessageContent::Text {
            text: "What is the capital of France?".to_string(),
        }],
    }];

    let stream = provider
        .stream(model, "You are a geography expert.".to_string(), messages, vec![])
        .await?;

    while let Some(chunk) = stream.next_chunk().await? {
        if let StreamChunk::TextChunk { text } = chunk {
            print!("{text}");
        }
    }
    Ok(())
}
```

## Kotlin 习惯用法

Kotlin 包在生成的绑定之上增加了一些便利：

| Kotlin API | 等价的生成调用 |
| --- | --- |
| `provider.streamFlow(model, system, messages, tools)` | `stream(...)` 加上 `nextChunk()` 循环，作为 `Flow<StreamChunk>` |
| `providers.openai.provider(apiKey)` | `openaiProvider(apiKey)` |
| `providers.openai.defaultModel()` | `openaiDefaultModel()` |
| `providers.anthropic.provider(apiKey, baseUrl, betaHeaders)` | `anthropicProvider(...)` |
| `providers.groq.provider(apiKey)` | `groqProvider(apiKey)` |
| `providers.databricks.provider(host, token)` | `databricksProvider(host, token)` |

在 Kotlin 辅助函数中，`tools` 默认为空列表，挂起函数映射为 Kotlin 协程。错误以 `GooseException` 子类的形式呈现。

## 声明式 provider {#declarative-providers}

任何使用 OpenAI 或 Anthropic 兼容 API 的 provider 都可以用 JSON 定义，并在不新增 Rust 代码的情况下加载：

```python
provider = goose.declarative_provider_from_json(open("deepseek.json").read())
```

JSON 中的 `${DEEPSEEK_API_KEY}` 这类环境变量占位符会在构造 provider 时解析。

## 流式模型

`stream()` 返回一个 `ProviderStream`。调用 `next_chunk()`，直到它返回 `None`，以消费响应：

| 块 | 含义 |
| --- | --- |
| `TextChunk` | 助手文本 |
| `ToolChunk` | 一次工具调用请求，带有 JSON 参数和 provider 的工具调用 `index` |
| `ThinkingChunk` / `RedactedThinkingChunk` | 推理输出 |
| `EndChunk` | 流结束，携带最终的 token `Usage` |
| `ErrorChunk` | 流中途失败，携带 `GooseStreamError` |

流开始之前抛出的错误会作为 `GooseError` 抛出（在 Kotlin 中为 `GooseException`）。流中途发生的错误则以 `ErrorChunk` 的形式到达。
