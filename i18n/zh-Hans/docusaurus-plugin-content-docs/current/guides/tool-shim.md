---
sidebar_position: 31
title: Tool Shim
sidebar_label: Tool Shim
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning 实验功能
Tool shim 是实验功能。配置选项和行为可能在后续版本中变化。
:::

有些语言模型本身不支持工具/函数调用，或者会间歇地把工具调用以纯文本输出，而不是结构化的 API 响应。Tool shim 会检测这些基于文本的工具调用格式，并把它们转换成 goose 可以执行的正规工具调用。

## 何时启用

在以下情况启用 tool shim：

- 工具在会话中途停止工作——模型调用了工具，但 goose 没有执行
- 模型输出类似 `functions.shell:0 <|tool_call_argument_begin|> {...}` 的纯文本，而不是使用工具 API
- 你使用的本地模型（Ollama、llama.cpp）没有原生工具调用支持
- 你的 OpenAI 兼容提供商路由到的模型把推理标签（`<think>`）和工具调用混在一起，导致解析失败

大多数本地托管模型，以及一些没有为结构化工具调用做过微调的云模型，都需要 shim。

## 工作方式

Shim 拦截模型响应，把任何基于文本的工具调用格式转换成 goose 可以执行的结构化工具调用。它需要一个单独的**解释器模型**——默认情况下，goose 为此使用 Ollama。解释器模型独立于你主对话所使用的提供商。

## 配置

### 启用 shim

```bash
export GOOSE_TOOLSHIM=true
```

### Ollama 后端（默认）

必须安装并运行 Ollama。默认解释器模型是 `mistral-nemo`。

```bash
# Pull the default interpreter model
ollama pull mistral-nemo

# Optional: use a different interpreter model
export GOOSE_TOOLSHIM_OLLAMA_MODEL=llama3.2
```

### 本地后端（llama.cpp / 内置推理）

如果你用内置本地推理后端运行 goose，可以把它当作解释器，而不必另开一个 Ollama 实例。必须提供模型名称——设置 `GOOSE_TOOLSHIM_MODEL` 或配置项 `LOCAL_LLM_MODEL`，否则 goose 会在启动时报错：

```bash
export GOOSE_TOOLSHIM_BACKEND=local
export GOOSE_TOOLSHIM_MODEL=my-model-name
```

`GOOSE_TOOLSHIM_BACKEND` 的有效值：`ollama`（默认）、`local`、`llama.cpp`。

## 使用示例

<Tabs>
  <TabItem value="ollama-primary" label="Ollama as primary provider" default>

  ```bash
  GOOSE_TOOLSHIM=true goose session
  ```

  使用 `mistral-nemo` 作为解释器。如有需要，用 `GOOSE_TOOLSHIM_OLLAMA_MODEL` 覆盖。

  </TabItem>
  <TabItem value="custom-provider" label="Custom OpenAI-compatible provider">

  ```bash
  GOOSE_TOOLSHIM=true \
  GOOSE_TOOLSHIM_OLLAMA_MODEL=llama3.2 \
  goose session
  ```

  你的主提供商可以是任何服务（Bedrock、自定义路由器等）。无论你在和哪家提供商对话，shim 都在本地使用 Ollama 作为解释器。

  </TabItem>
  <TabItem value="local-backend" label="Built-in local inference">

  ```bash
  GOOSE_TOOLSHIM=true \
  GOOSE_TOOLSHIM_BACKEND=local \
  GOOSE_TOOLSHIM_MODEL=my-model-name \
  goose session
  ```

  使用 goose 内置的 llama.cpp 后端作为解释器。必须设置 `GOOSE_TOOLSHIM_MODEL`（或配置中的 `LOCAL_LLM_MODEL`）——两者都未设置时启动会失败。

  </TabItem>
</Tabs>

## 环境变量参考

| 变量 | 说明 | 默认值 |
|----------|-------------|---------|
| `GOOSE_TOOLSHIM` | 启用 tool shim（`true` 或 `1`） | `false` |
| `GOOSE_TOOLSHIM_BACKEND` | 解释器后端：`ollama`、`local` 或 `llama.cpp` | `ollama` |
| `GOOSE_TOOLSHIM_OLLAMA_MODEL` | 用作解释器的 Ollama 模型 | `mistral-nemo` |
| `GOOSE_TOOLSHIM_MODEL` | 本地解释器后端的模型名称（使用 `local` 后端且未设置 `LOCAL_LLM_MODEL` 配置时必需） | — |

## 故障排除

**工具在会话中途突然停止工作**

模型可能从原生工具调用切换成了基于文本的格式。启用 `GOOSE_TOOLSHIM=true` 并重启。

**已启用 shim，但工具仍然不执行**

检查解释器后端是否可达：
- Ollama：运行 `ollama list`，确认它在运行且已拉取解释器模型。
- 本地：确认已配置本地推理并设置了模型。

**解释器调用很慢**

换一个更小、更快的 Ollama 模型：
```bash
export GOOSE_TOOLSHIM_OLLAMA_MODEL=qwen2.5:3b
```

**模型在工具调用之前输出推理内容（`<think>` 标签）**

有些推理模型把思考标签和工具调用混在一起，导致解析失败。Shim 会自动处理——启用后，推理内容会从最终消息中剥离。
