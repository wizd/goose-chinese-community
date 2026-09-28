---
title: "我的 .goosehints 文件里有什么（以及为什么大概不该有）"
description: 深入比较 .goosehints 与 Memory 扩展，以及如何优化你的 goose 配置以获得更好的性能
authors:
    - ian
---

![博客封面](blog-banner.png)

# 我的 .goosehints 文件里有什么（以及为什么大概不该有）

作为 goose 用户，我们有两种主要方式向 AI 助手提供持久上下文：`.goosehints` 文件和 [Memory 扩展](/docs/mcp/memory-mcp) MCP 服务器。今天，我会分享我的 `.goosehints` 文件里有什么，为什么其中一些大概应该移到 Memory 扩展，以及你如何做这个选择。

<!-- truncate -->

## AI 智能体和记忆

想象在两家不同的咖啡馆点咖啡。在第一家，你是第一次来的顾客，仔细解释「中杯摩卡拿铁，脱脂牛奶，额外热，不要奶泡，加一泵香草」。但在你常去的那家，咖啡师看见你走过来就说「老样子？」

那份存储的知识——你的偏好、怪癖和惯例——让整个互动对每个人都更快、更愉快。

这正是我们面对 AI 助手时的挑战。默认情况下，它们每次对话（也就是「上下文窗口」）都从新开始——不记得你的编码标准、文档偏好，或你喜欢怎样组织拉取请求。就像你会对每天早上背诵详细的咖啡订单感到厌倦，反复向 AI 助手解释你偏好 Python 的 Black 格式化器、想要详细的提交信息，或你想如何构建发给全公司的简报，也是低效的。

这就是持久上下文的用武之地。通过 `.goosehints` 和 [Memory 扩展](/docs/mcp/memory-mcp) MCP 服务器这类工具，我们可以给 AI 助手相当于咖啡师「熟客」知识的东西。但正如你不会希望咖啡师为了做你的咖啡而记住你的整个人生故事，我们也需要慎重考虑让哪些上下文持久化。关键是在有足够上下文以高效工作，和不让系统被不必要的信息淹没之间找到平衡。

让我们探索如何取得这个平衡。

### 什么是 .goosehints？

`.goosehints` 是一个配置文件，位于你的 goose 目录（通常是 `~/.config/goose/`）。它可以包含你希望 goose 每次与你交互时都处理的任何信息，为它如何与你交互提供基础。

你可以在 [goose 文档](/docs/guides/context-engineering/using-goosehints)中阅读更多关于 `.goosehints` 的内容。

### 什么是 Memory 扩展？

[Memory 扩展](/docs/mcp/memory-mcp)是一个使用 Model Context Protocol 的动态存储系统，允许你用标签或关键词按需存储和检索上下文。它位于你的 `~/.goose/memory` 目录（本地）或 `~/.config/goose/memory`（全局）。

与 `.goosehints` 不同——它是静态的，每次请求都会完整加载——Memory 扩展可以按需要更新和访问，从而允许更灵活、更针对用户的配置。

## .goosehints 和 Memory 扩展在 goose 中如何使用？

在非常高的层面上，当你与 goose 对话时，它分两个主要步骤处理你的请求：

goose 解释你的请求，以检测可能用于 Memory 扩展查找的标签或关键词。然后它加载你的整个 `.goosehints` 文件，并把这些连同所有 Memory 扩展条目一起发送给 LLM 以生成回应。

为什么两者都发送？因为 LLM 交互是无状态的，需要 goosehints 和 Memory 扩展的完整上下文才能生成合适的回应。`.goosehints` 文件提供静态的、项目范围的上下文，而 Memory 扩展提供动态的、针对用户的上下文。


## .goosehints 与 Memory 扩展的含义

既然整个 `.goosehints` 文件和所有记忆都会随每次请求发送，为什么要有两种不同的方式来提供规则和上下文？

关键差异在于**范围**和**灵活性**：

- **.goosehints**：这个文件是你项目的静态上下文。它很适合定义适用于与 goose 所有交互的总体规则、标准和文档。然而，因为它是静态的，任何更改都需要编辑文件并重新加载。你可以创建一个适用于所有项目的全局 `.goosehints` 文件，也可以创建一个只适用于特定项目的项目级 `.goosehints` 文件。这对定义项目范围的编码标准、文档偏好，或其他你希望在所有交互中一致应用的静态规则很有用。

- **Memory 扩展**：这是你的动态上下文。它允许你即时存储和检索信息，非常适合用户特定的偏好、临时上下文，或经常变化的信息。你可以更新记忆而不修改 `.goosehints` 文件，从而提供更大的灵活性。记忆通常绑定到特定用户，不过如果你的团队选择分享也可以（但这不是常态）。

## 我的 .goosehints 哪里走错了

当我刚开始使用 goose 时，我把 `.goosehints` 当成我想让 goose 记住的一切的兜底，因为我不知道 Memory 扩展。我的 `.goosehints` 文件包括：
- 撰写博客大纲的规则
- 我喜欢如何编写和格式化 Python 代码
- 关于前端开发的笔记
- 等等

这个文件巨大，而且很难更新。

### 那么什么「属于」.goosehints？

下面是我几乎在每条 AI 提示末尾都会加的东西：

> 如果你对如何完成这些指令没有 95% 的把握，或者你不能至少 95% 事实准确，**不要猜测或编造**。停下来向我要更多信息或方向。如果你在网上找资源，给我 1 或 2 个为你的回应提供信息的 URL。

我也喜欢在许多提示的末尾问 goose 在做我试图做的工作之前是否有澄清问题：

> 根据我提供的信息，在做任何工作**之前**问我任何澄清问题，或者告诉我你准备好继续了。

由于这些是我肯定想加到对 goose 的每个请求里的东西，我把 .goosehints 文件简化为只包含这类规则和标准。

## 其他一切都移进了 Memory 扩展

Memory 扩展使用标签系统，根据关键词记住上下文。你可以给 goose 一条「记住」某事的命令，goose 会写一条带有适当标签的 Memory 条目。下次你让 goose 用 Python 做某事时，它会解析你的请求，寻找相关标签，并使用适当的 Memory 条目作为仅该请求上下文的一部分发送。

所以我所有的 Python 规则都可以写成给 goose 的这样一条命令：

```text
Remember that when I ask about Python, I want to conform to the following standards and guidelines:
- use Python 3.12+ syntax
- use type hints for all function signatures
- use f-strings for string formatting
- use the latest Python features and libraries
- use Flake8 for linting
- use black for formatting
- if I ask to build a CLI based tool, expect to take command line arguments and make a colorful interface using ANSI colors and the rich library
- if I ask to build an API, expect to build a RESTful API use FastAPI and to send back data in JSON format
```

现在，goose 只会在我让它用 Python 做某事时发送这些与 Python 相关的规则。这高效得多。

下面是 goose 做出的结果 Memory 文件：

```text
# python standards development formatting linting api cli
Python Development Standards:
- Python version: 3.12+
- Mandatory type hints for all function signatures
- Use f-strings for string formatting
- Use latest Python features and libraries
- Code formatting: black
- Linting: Flake8
- CLI tools: Use command line arguments and rich library for colorful interface
- APIs: Use FastAPI for RESTful APIs with JSON responses
```

第一行以井号 `#` 开头，后面是空格分隔的关键词和标签列表，它会用来判断何时或是否检索这些内容，随请求发送给我的 LLM。

## 提示，还是不提示？

既然 `.goosehints` 文件和 Memory 扩展文件都会随每次请求发送，用哪一个真正取决于你想如何管理上下文。因为你可以创建项目特定的 `.goosehints` 文件，你可以用它定义想在与 goose 的所有交互中一致应用的项目范围规则和标准。这对定义项目范围的编码标准、文档偏好，或其他你想在所有交互中一致应用的静态规则很有用。同时，你可以在 Memory 扩展中维护一套个人的写作和编码标准，按需要更新和更改，而不影响项目范围的规则。

在 [Discord 上的 goose 社区](http://discord.gg/n8R5VaWDAn)分享你自己的 `.goosehints` 优化故事！

<head>
  <meta property="og:title" content="我的 .goosehints 文件里有什么（以及为什么大概不该有）" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/06/05/whats-in-my-goosehints-file" />
  <meta property="og:description" content="了解何时使用 .goosehints、何时使用 Memory 扩展，从而优化你的 goose 配置，获得更好的性能和可维护性。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/blog-banner-7f0e5ed1cf875e64e3ebb3250932baaf.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="我的 .goosehints 文件里有什么（以及为什么大概不该有）" />
  <meta name="twitter:description" content="了解何时使用 .goosehints、何时使用 Memory 扩展，从而优化你的 goose 配置，获得更好的性能和可维护性。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/blog-banner-7f0e5ed1cf875e64e3ebb3250932baaf.png" />
  <meta name="keywords" content="Goose; .goosehints; Memory Extension MCP; AI configuration; performance optimization; developer productivity; context management; AI assistant; token costs; LLM efficiency" />
</head>
