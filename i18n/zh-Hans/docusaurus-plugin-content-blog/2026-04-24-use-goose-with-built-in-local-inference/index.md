---
title: "默认私密：goose 内置的本地推理模型"
description: "goose 现在内置由 llama.cpp 驱动的本地推理——没有服务器，没有 API 密钥，没有费用。它如何工作，以及你可以期待什么。"
authors:
    - adewale
image: /img/blog/goose-built-in-inference.png
---

![博客封面](/img/blog/goose-built-in-inference.png)

你现在可以直接在自己的机器上用 goose 运行本地模型。没有 Ollama，没有 Docker，没有外部服务器——完全在 goose 内部。我们发布了由 [llama.cpp](https://github.com/ggml-org/llama.cpp) 驱动的内置本地推理，今天已经可以在桌面应用里使用。

这是使用 goose 的完全免费、零依赖路径。你的代码永远不会离开你的机器，没有要管理的 API 密钥，而且可以离线工作。下面是这种体验长什么样、该选哪些模型，以及粗糙之处还在哪里。

<!--truncate-->

## 它如何工作

goose 现在把 llama.cpp 直接嵌入运行时。当你选择 **Local** 提供商时，goose 会从 HuggingFace 下载一个量化的 [GGUF](https://huggingface.co/docs/hub/en/gguf) 模型，把它加载到 GPU（或 CPU）内存，并在进程内运行推理。

没有单独的服务器要启动，没有端口要配置，没有后台守护进程。

在桌面应用上这样做：

1. 打开 **Settings → Local Inference**
2. 在 Hugging Face 上搜索兼容的模型。
3. 点击下载——模型文件会落到共享的 Hugging Face 缓存里。
4. 开始构建。就这样。

细节由 goose 处理：GPU 卸载、内存管理、上下文窗口大小，以及在模型之间切换时自动卸载模型。

## 这和 Ollama 有什么不同

你可能已经熟悉通过 [Ollama 提供商](/blog/2025/03/14/goose-ollama) 使用 goose。两条路径都在本地运行模型，但架构不同：

| | 内置（llama.cpp） | Ollama |
|---|---|---|
| **设置** | 无需额外设置——内置于 goose | 单独安装 Ollama |
| **服务器** | 没有——进程内 | Ollama 作为后台服务运行 |
| **模型格式** | 来自 HuggingFace 的 GGUF | Ollama 自己的模型注册表 |
| **模型管理** | goose 的 Settings UI | `ollama pull` / `ollama list` |
| **工具调用** | 原生（Gemma 4）或模拟 | 通过 toolshim 解释器 |
| **视觉** | ✅ Gemma 4 模型 | 取决于模型 |
| **配置** | 零配置 | `OLLAMA_HOST`、超时等 |

内置路径是为想要尽可能简单的本地体验的人设计的——一个应用，一次下载，完成。如果你想要更多控制、更广的模型选择，或者已经在用它服务其他工具，Ollama 仍然很好。

## 可以期待什么

选择本地模型会带来一些代价，其中最大的是性能，取决于你的硬件能力。与云端模型相比：

**它更慢。** 第一次请求需要 30–120 秒，因为模型要加载进内存。之后，在 Apple Silicon（尤其是 M2/M3/M4）上 token 生成很快，但在只有 CPU 的机器上会明显更慢。

**上下文窗口更小。** 大多数本地模型使用 4K–8K token 的上下文，而 Claude 或 GPT 是 128K+。goose 会根据可用内存设置 `num_ctx`，但在长会话里你会更快碰到上限。[Code Mode](/blog/2026/02/06/8-things-you-didnt-know-about-code-mode) 在这里有帮助——它减少 token 用量和上下文腐烂。

**工具调用是差距所在。** 用 Gemma 4 时，它确实不错。用模拟模型时，它仅限于 shell 命令。这是与云端体验最大的单一差别。

**它完全私密。** 没有任何东西离开你的机器。没有遥测，没有 API 调用，没有数据共享。处理专有代码、凭证或敏感数据时，这很重要。

**它不花钱。** 初次下载模型之后，每次会话都是免费的。没有 token 要计，没有账单要担心。


## 充分利用它的提示

**从小开始。** 选择一个能舒适放进 goose 可用内存的量化模型。如果它对你的任务效果好，需要更强能力时再升级到更大的模型。

**使用 Code Mode。** 认真的。它就是为这种场景设计的——在更小的上下文窗口里保持会话有产出。

**使用推荐。** goose 会把你 Hugging Face 缓存里已有的模型，和当前可用于推理的内存进行比较。

**不要和模拟模式较劲。** 如果你用的模型没有原生工具调用，就顺着 shell 命令工作流走。让 goose 一步一步做事。它对“运行这个命令，检查输出，做下一件事”这种模式效果很好。

**为不同任务切换模型。** 你可以下载多个模型。用小而快的模型做快速 shell 任务，用更大的模型做复杂推理。goose 会自动卸载上一个模型。



<head>
  <meta property="og:title" content="默认私密：goose 内置的本地推理模型" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2026/04/24/use-goose-with-built-in-local-inference" />
  <meta property="og:description" content="goose 现在内置由 llama.cpp 驱动的本地推理——没有服务器，没有 API 密钥，没有费用。它如何工作，以及你可以期待什么。" />
  <meta property="og:image" content="https://goose-docs.ai/img/blog/goose-built-in-inference.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="默认私密：goose 内置的本地推理模型" />
  <meta name="twitter:description" content="goose 现在内置由 llama.cpp 驱动的本地推理——没有服务器，没有 API 密钥，没有费用。它如何工作，以及你可以期待什么。" />
  <meta name="twitter:image" content="https://goose-docs.ai/img/blog/goose-built-in-inference.png" />
</head>
