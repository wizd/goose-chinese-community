---
title: "使用 goose 之前你需要知道的 4 件事"
description: "了解开始使用 goose 需要什么。它是一个本地开源 AI 智能体，由你选择的 LLM 驱动。"
authors: 
    - ebony
---
![博客封面](cover.png)

# 使用 goose 之前你*真正*需要知道的 4 件事

所以你听说了 goose。也许你看了一场直播，团队里有人提到它，或者你在试图自动化开发环境时偶然走进了我们这片互联网角落。不管怎样——很高兴你来了。

goose 是一个本地、开源的 AI 智能体，可以自动化任务、与你的代码库交互，并连接到一个不断增长的工具生态。但在你点击安装之前，有四件事能帮助你从中获得最多。


<!-- truncate -->

---

## 等一下——goose *到底*是什么？

goose 是一个 **MCP 客户端**。

这意味着它通过所谓的 [**Model Context Protocol（MCP）**](https://www.anthropic.com/news/model-context-protocol)连接工具和数据。MCP 是一项开放标准，让 AI 智能体能够通过自然语言与外部系统交互。如果你用过 Claude Desktop、Windsurf、VS Code 或 Cursor 里的 Agent 模式，你已经用过 MCP 客户端，即使你当时没意识到。

goose 的不同之处在于：

- 它在**本地**运行，不在别人的云里
- 你**自带 LLM**，可以使用最适合你的那一个
- 你可以用开源 MCP 服务器**添加新能力**

把它想成更像「你的个人自动化工具包」，而不是「一个 AI 助手」。你决定使用哪个 LLM、它应该访问哪些工具、它可以执行哪些任务。你没有被锁死；你说了算。

---

## 1. 选对 LLM

goose 不捆绑 LLM。你自带 LLM。这意味着你可以选择哪种模型最适合你，无论是 Claude 或 Gemini 这样精致的托管模型，还是 Ollama 这样更私密、更本地的东西。

但注意：并非每个模型都一样，尤其是在隐私、性能，或按 token 收费多少方面。如果你只是在探索，带免费额度的云托管 LLM 是很好的起点。但如果你在处理敏感数据，或不想把东西送到第三方服务器，本地就是正确的路。

无论哪种，goose 都给你灵活性。

话虽如此，如果你现在想要 goose 的最佳表现，推荐 Anthropic 的 Claude 3.5 Sonnet 和 OpenAI 的 GPT-4o（2024-11-20），因为它们目前对工具调用的支持最强。

好奇其他模型排得怎样？查看[社区启发的基准排行榜](https://goose-docs.ai/blog/2025/03/31/goose-benchmark/#leaderboard)，看看你喜欢的模型在 goose 上表现如何。

如果还在决定，这里是[可用 LLM 提供商](https://goose-docs.ai/docs/getting-started/providers#available-providers)的完整列表。

---

## 2. 理解 MCP 服务器是什么

有趣的部分从这里开始。goose 是一个会说 **MCP** 的客户端。MCP 让你能够*作为提示的一部分*与其他应用和工具交谈。想读邮件、查看 GitHub issue、运行自动化测试，或抓取网页？这就是 MCP 服务器的用武之地。

每台服务器给 goose 一种新能力。

真正的问题是：*你想让 goose 能做什么？* 如果有对应的服务器，你大概就能实现。而且是的，有一整份 [MCP 服务器目录](https://glama.ai/mcp/servers)，你可以按工具、下载量等来搜索。

---

## 3. *可能*有费用

goose 本身？完全免费且开源。🎉 但你的 LLM 提供商可能没那么慷慨。

大多数模型会给你一个免费额度来玩，但如果你做的事情比较重，或经常使用，最终会碰到速率限制或 token 费用。这很正常，但如果你没预料到，它可能会悄悄到来。

为了帮你管理这一点，可以查看[处理速率限制指南](https://goose-docs.ai/docs/guides/handling-llm-rate-limits-with-goose/)。

---

## 4. 融入社区

这一点比大多数人意识到的更重要。

goose 背后有整个社区——人们在构建、探索、搞坏东西（再修好），并分享一路上学到的一切。我们在 [Discord](https://discord.gg/n8R5VaWDAn) 上闲逛，在 [GitHub Discussions](https://github.com/aaif-goose/goose/discussions) 里回答问题，每周举办直播，展示 goose 能做什么，以及如何让它做得更多。

有这些：

- **Goosing Around**——随意的深度演示，我们公开构建
- **Wild Goose Case**——展示酷的社区项目
- **Great Goose Off**——同样的任务、同样的时限，但提示、MCP 服务器和策略不同

你会在我们的 [YouTube 频道](https://www.youtube.com/@goose-oss/streams)上找到这些直播，即将到来的场次在 Discord 日历上。另外，如果你更喜欢文档，[goose 文档](https://goose-docs.ai/)和[博客](https://goose-docs.ai/blog)一直在更新新的指南、技巧和教程。

---

如果你有这四样东西：一个性能不错的 LLM、合适的 MCP 服务器、对 LLM 成本的基本理解，以及一个可以提问的地方，你就已经准备好使用 goose 了。

现在，去[快速开始指南](https://goose-docs.ai/docs/quickstart)开始吧。

哦，当你走到[井字棋游戏](https://goose-docs.ai/docs/quickstart/#write-prompt)时，我赌 10 个 goose 币，你赢不了那个机器人。



<head>
  <meta property="og:title" content="使用 goose 之前你需要知道的 4 件事" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/04/23/things-need-to-know" />
  <meta property="og:description" content="了解开始使用 goose 需要什么。它是一个本地开源 AI 智能体，由你选择的 LLM 驱动。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/cover-2ba7c2e15786be2db6108c91d27dc1ec.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="使用 goose 之前你需要知道的 4 件事" />
  <meta name="twitter:description" content="了解开始使用 goose 需要什么。它是一个本地开源 AI 智能体，由你选择的 LLM 驱动。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/cover-2ba7c2e15786be2db6108c91d27dc1ec.png" />
</head>
