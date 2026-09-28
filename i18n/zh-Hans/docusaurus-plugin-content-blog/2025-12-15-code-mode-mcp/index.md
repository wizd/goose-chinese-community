---
title: "goose 中的 Code Mode MCP"
description: 一种新兴的 MCP 工具调用方法，在 goose 中有了开源实现
authors:
    - alexhancock
---

![goose 中的 code mode MCP！](header-image.jpg)

# Code Mode MCP

有一种新兴的 MCP 工具调用方法，被称为 “sandbox mode” 或 “code mode”。这些想法最初由 Cloudflare 在[《Code Mode：使用 MCP 的更好方式》](https://blog.cloudflare.com/code-mode/)一文中提出，Anthropic 则在[《使用 MCP 执行代码：构建更高效的智能体》](https://www.anthropic.com/engineering/code-execution-with-mcp)一文中提出。既然方法和收益在那些文章里已经讲得很清楚，我在这里做个总结。

<!-- truncate -->

## 这种方法

### 概要

* MCP 客户端应用可以不把工具直接暴露给模型，而是：
    * 为这些同样的工具生成一个编程接口（通常由 JS 或 TS 驱动）
    * 向模型提供有限的一组工具（搜索可用模块 / 工具源代码，读取某个工具的源代码，然后用一个工具执行一些代码）
    * 在沙箱环境中运行模型生成的代码来调用这个编程 API，以保证安全

### 收益

* 模型可以逐步发现相关工具，而不必从一开始就把所有服务器和工具定义放进上下文窗口
* 模型可以把工具调用的结果串联成后续工具调用的输入，中间结果不必流回模型——这节省 token，也避免把可能敏感的数据不必要地暴露给模型
* 模型的预训练数据集让它们非常擅长分析大型编程 API 并编写调用代码，相比之下，它们只在人为构造的 MCP 工具调用示例上受过训练

## 在 goose 中

在 goose 的 v1.17.0 中，我们以一个名为 Code Mode 的新平台扩展，引入了这个想法的开源实现。我们的实现会生成一个代表已连接 MCP 工具的 JavaScript 接口，然后让模型编写代码，在 [boa](https://github.com/boa-dev/boa) 中对着它运行。boa 是一个可嵌入的 JavaScript 引擎。我们能够利用的 boa 的一个巧妙特性，是 [NativeFunction](https://docs.rs/boa_engine/latest/boa_engine/native_function/struct.NativeFunction.html) 这个概念。

在 boa 中，`NativeFunction` 是在嵌入的 JavaScript 环境里暴露一个函数，并回调到用 Rust 原生实现的函数。这对从 JS 发起的调用、再把工具调用轻松路由到底层 MCP 服务器来说，再合适不过！

## 帮我们评估它

我们希望改进 goose 中的工具调用性能，以及处理大量工具的能力，同时也为这种新兴方法提供一个开源实现。

* 在 goose v1.17.0 或更高版本中，通过点击桌面应用左侧的扩展，或在 CLI 上运行 `goose configure`，启用 [“Code Mode” 扩展](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/agents/platform_extensions/code_execution.rs) 来试用这个功能
* 请加入我们的 [discord](https://discord.gg/n8R5VaWDAn)，告诉我们它在你那里的表现。

感谢我的同事 [Mic Neale](https://github.com/michaelneale) 与我一起完成实现！

<head>
  <meta property="og:title" content="goose 中的 Code Mode MCP" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/12/15/code-mode-mcp-in-goose" />
  <meta property="og:description" content="一种新兴的 MCP 工具调用方法，在 goose 中有了开源实现" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/header-image-1fa39f1d26aea7722e2c10fc424804f5.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="goose 中的 Code Mode MCP" />
  <meta name="twitter:description" content="一种新兴的 MCP 工具调用方法，在 goose 中有了开源实现" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/header-image-1fa39f1d26aea7722e2c10fc424804f5.jpg" />
</head>
