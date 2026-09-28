---
title: goose 架构
sidebar_position: 1
---

# goose 架构

goose 是一个开源 AI 智能体，建立在大语言模型（LLM）的基本交互框架之上。大语言模型主要作为基于文本的对话界面：处理文本输入并生成文本输出。这种“文本进、文本出”的方式通过工具集成得到增强，使 AI 智能体能够完成任务，由此形成了 goose。

## goose 的组件
goose 通过三个主要组件运行：**界面**、**智能体**，以及**已连接的[扩展](/docs/getting-started/using-extensions)**。

* **界面**：用户用来运行 goose 的桌面应用或 CLI。它收集用户输入，并向用户展示输出。

* **智能体**：智能体运行 goose 的核心逻辑，管理交互循环。

* **扩展**：扩展是为智能体提供特定工具和能力的组件。这些工具让 goose 能够执行运行命令、管理文件等操作。

在一次典型会话中，界面会启动一个智能体实例，该实例随后同时连接到一个或多个扩展。界面也可以创建多个智能体，并发处理不同任务。扩展和交互循环是 goose 功能的重要部分。接下来说明 goose 如何连接扩展并处理用户请求。

## 与扩展的互操作
[模型上下文协议（MCP）](https://modelcontextprotocol.io/)是一项开放标准，使数据源与 AI 智能体之间能够互操作。goose 使用 MCP 连接到 [MCP 系统/服务器](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#model-context-protocol-servers)。在 goose 中，这些系统/服务器称为扩展。


扩展通过工具向 goose 暴露功能。工具是让扩展执行特定操作的函数，例如运行命令或执行文件操作。例如，Google Drive 扩展包含一个用于搜索文档的工具。正是这个工具让 goose 能够执行该操作。


goose 自带一组[内置扩展](/docs/getting-started/using-extensions#built-in-extensions)，各自用于增强你的交互。其中包括开发、网页抓取、自动化、记忆等方面的工具。goose 也支持[连接外部扩展](/docs/getting-started/using-extensions#adding-extensions)，或[创建自定义扩展](/docs/tutorials/custom-extensions)作为 MCP 服务器。

要进一步了解扩展和工具的设计与实现，请参阅[扩展设计指南](/docs/goose-architecture/extensions-design#tools)。

## Agent Client Protocol (ACP)

goose 以两种方式支持 [Agent Client Protocol (ACP)](https://agentclientprotocol.com/)：

### goose 作为 ACP 服务器

`goose acp` 通过 stdio 把 goose 启动为 ACP 服务器，让 JetBrains 和 Zed 等编辑器可以直接连接。见[在 ACP 客户端中使用 goose](/docs/gdk/acp)。

### 把 ACP 智能体用作 provider

goose 可以把外部 ACP 智能体（例如 Claude Code 或 Codex）委托为 [provider](/docs/guides/acp-providers)。ACP 智能体在内部处理工具执行。goose 把已配置的扩展作为 MCP 服务器传递过去。

## 交互循环
![交互循环](../assets/guides/interactive-loop.png)

下面更仔细地看上图中的交互循环。

1. **人类请求**：流程从你开始，也在你这里结束。一旦你给 goose 一个请求、问题、命令或待解决的问题，流程就开始了。

2. **Provider 对话**：goose 把你的请求连同一份可用工具列表，发送给你已连接的 [LLM provider](/docs/getting-started/providers)。provider 处理它，并在必要时在响应中创建一次工具调用。

3. **模型扩展调用**：大语言模型能够创建工具调用请求，但不能执行它，这时就由 goose 接手。goose 取得格式为 JSON 的工具调用，运行它，并收集结果。

4. **回复模型**：执行工具调用后，goose 把结果发回模型。如果还需要更多扩展，这些步骤会重复。

5. **上下文修订**：goose 会移除旧的或不相关的信息，确保大语言模型只关注最重要的信息。这有助于 token 管理。

6. **模型响应**：所有工具调用完成后，大语言模型把最终响应发回给你，并在你回复后重新开始循环。

## goose 中的错误处理

goose 不会让错误打断流程，而是捕获并处理传统错误以及执行错误。无效 JSON、缺少工具等错误会作为工具响应发回模型，从而给大语言模型解决错误并继续所需的信息。

关于 goose 如何处理错误的更多细节，请参阅 [goose 中的错误处理](/docs/goose-architecture/error-handling)指南。


## 上下文修订：Token 管理

goose 免费且开源，但大语言模型的 token 用量通常有成本。消息、工具请求、资源、文件内容、指令等一切都在争夺 token 用量。内容修订就在这里发挥作用，帮助降低其中一部分成本。为此会做几件事：
* goose 用更快、更小的大语言模型做摘要
* goose 纳入全部内容，而不是做语义搜索
* goose 用算法删除旧的或不相关的内容
* goose 会用查找替换而不是重写大文件，用 ripgrep 跳过系统文件，并对冗长的命令输出做摘要
