---
title: "今天我交给 AI 智能体的 5 件无聊任务（省了我好几个小时）"
description: 忘掉炫目的演示。这里是 AI 的日常用例。
authors:
    - angie
---

![博客封面](everyday-usage-of-ai.png)


每当人们谈论 AI，他们会突出最炫的用例，比如智能体完全写好的应用，或电影级的视频生成。那些当然很酷，但大多数日子里，我只是把平凡的任务交给机器人。

今天，我没有构建应用。我没有写剧本。我只是把事情做完了。

下面是我交给 AI 智能体 [goose](/) 的 5 件真实日常任务，它们省了我好几个小时。从提示到结果，没有一件超过一分钟。


<!-- truncate -->

:::info LLM
这些全部使用 Anthropic 的 Claude 4 Sonnet
:::

## 1️⃣ 把 GitHub 活动总结成可执行的洞察

**任务**

我让 goose 审阅我的组织这个月所有已关闭的 GitHub issue，并给我一份拆解。我想看到时间花在哪里、工作如何分配，以及项目之间的任何模式或依赖。

**结果**

不到一分钟，goose 给了我一份报告，包含生产力指标、工作量分布，以及 issue 线程之间值得注意的依赖（例如一个修复挡住了另一个）。

这种综合通常需要我手动扫一堆仓库，并交叉对照 PR 或 issue 评论。今天不用了。

**使用的 MCP**

- [GitHub](/docs/mcp/github-mcp)


## 2️⃣ 从一条很长的 Slack 线程里提取行动项

**任务**

你知道 Slack 线程一开始是快速头脑风暴，不知怎么就长成一部小说吗？我们今天有 169 条回复 😂，里面埋着一些重要想法。

所以我让 goose 分析整条线程，提取一份干净的行动项列表。

**结果**

一分钟内，我有了一份聚焦的待办清单，带有负责人、截止日期（有提到时）和主题。这些要点很可能会塑造我们的第三季度目标，而且等我准备好时，我甚至可以让 goose 为它们全部创建 GitHub issue！

**使用的 MCP**

- Slack


## 3️⃣ 从社区反馈创建路线图

**任务**

我们的 goose 社区活跃在 GitHub、Slack 和 Discord 上。反馈很多，但很分散。
我让 goose 拉取并分析这三个平台上的开放问题、bug 报告、功能请求和讨论线程。

**结果**

一份我们需要处理的前 10 项排名列表，包括每个问题的简短描述以及任务的估计工作量。这让我们的路线图规划有了一个不错的起点。

**使用的 MCP**

- [GitHub](/docs/mcp/github-mcp)
- Slack
- [Discord](https://github.com/hanweg/mcp-discord)


## 4️⃣ 修复我的 CSS 断点（因为我放弃了）

**任务**

坦白：CSS 和我不是朋友。和断点、间距、容器宽度斗争了 30 分钟之后，我把问题交给 goose，给它看了页面的截图。

**结果**

goose 立刻发现了问题，并重写了我的媒体查询逻辑，以及我漏掉的一些其他关键 CSS。


**使用的 MCP**

- [Developer](/docs/mcp/developer-mcp)

## 5️⃣ 在一次大的文档重组后修复坏链接

**任务**

我重组了一大套内部文档，需要更新所有内部链接、重定向旧路径，并确保没有东西坏掉。
重组是我手动做的（它很精细，所以我想自己来），然后让 goose 爬文档、找出坏掉或过时的链接、修好它们，并在需要的地方加跳转。

**结果**

没有死路。没有 404。只有整洁的文档。

**使用的 MCP**

- [Developer](/docs/mcp/developer-mcp)

---

大多数 AI 文章展示的是什么是可能的。我关注的是当初承诺的东西。
整个要点是卸下繁琐的事，这样我们才能专注于真正重要的工作，而这正是我使用 AI 的方式。

你把哪些日常任务交给 AI 智能体？在 [Discord](https://discord.gg/n8R5VaWDAn) 告诉我们。


<head>
  <meta property="og:title" content="今天我交给 AI 智能体的 5 件无聊任务（省了我好几个小时）" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/06/27/everyday-usecases-ai" />
  <meta property="og:description" content="忘掉炫目的演示。这里是 AI 的日常用例。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/everyday-usage-of-ai-69f4444328b28bdc945e5ff9fc92034d.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="今天我交给 AI 智能体的 5 件无聊任务（省了我好几个小时）" />
  <meta name="twitter:description" content="忘掉炫目的演示。这里是 AI 的日常用例。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/everyday-usage-of-ai-69f4444328b28bdc945e5ff9fc92034d.png" />
</head>
