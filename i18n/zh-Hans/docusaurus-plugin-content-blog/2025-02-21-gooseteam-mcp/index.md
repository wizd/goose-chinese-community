---
title: 让一支 AI 智能体团队替你完成
description: 社区聚焦：Cliff Hall 的 gooseTeam MCP 服务器。
authors: 
    - tania
---

![博客横幅](gooseteam-mcp.png)

在我们[上一场直播](https://youtu.be/9tq-QUnE29U)中，Cash App 基础设施运维工程师 Aaron Goldsmith 展示了一支 goose AI 智能体团队实时协作，共同创建一个网站。社区非常喜欢这个演示，Cliff Hall 因此受到启发，在这个想法上继续迭代，做出了 gooseTeam MCP 服务器。

<!--truncate-->

## 最初的协议

Aaron Goldsmith 用他轻量的 [Agent Communication Protocol](https://gist.github.com/AaronGoldsmith/114c439ae67e4f4c47cc33e829c82fac) 把由多个 goose 实例组成的 AI 智能体团队变成了现实。借助它，每个 goose 智能体进入聊天，被分配一个角色（例如项目协调员、研究员、Web 开发者），并完成给定任务中属于自己的部分。协议规定了智能体应当如何交谈和行为，从而让多个 goose 智能体能够协作。它还规定智能体之间的通信通过基于 Python 的 websocket 服务器以 text/markdown 进行。

## gooseTeam MCP 服务器

介绍 [gooseTeam](https://github.com/cliffhall/gooseTeam)。它由软件架构师、社区成员 Cliff Hall 创建。gooseTeam 在 Aaron 的协议基础上迭代，做成了面向 goose 智能体的 MCP 服务器和协作协议。借助任务管理、消息存储和智能体等待等功能，你可以让一整支 goose 智能体团队一起为你完成一项任务或一个项目。

担任项目协调员角色的 goose 智能体会给其他智能体分配角色，已连接的智能体会发送可以随时取回的消息，你的智能体团队会连接到同一台 MCP 服务器上一起协作。

![goose 智能体](gooseteam-agents.png)

## 使用 goose 的新方式

让一支 AI 智能体团队一起做任务，会彻底改变工作方式。你不必自己纠结如何改进提示词工程，也不必手动跨会话操作。像 Cliff 的 gooseTeam 或 Aaron 的 Agent Communication Protocol 这样的工具，能帮助我们确保像 goose 这样的 AI 智能体尽可能高效地替我们干活。可能性感觉没有尽头！

## 让你的贡献被介绍
希望这份贡献激励了你，就像它激励了我们的社区一样。如果你有想和社区分享的 goose 贡献或项目，加入我们的 [Discord](https://discord.gg/n8R5VaWDAn)，在 **#share-your-work** 频道分享你的作品。你可能会出现在我们的直播里，或拿到一份不错的奖品。👀 你也可以在 GitHub 上给 goose 加星，或在社交媒体上关注我们，这样就不会错过我们的更新。下次见！


<head>
  <meta property="og:title" content="让一支 AI 智能体团队替你完成" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/02/17/gooseteam-mcp" />
  <meta property="og:description" content="社区聚焦：Cliff Hall 的 gooseTeam MCP 服务器。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/gooseteam-mcp-082fa2890c313519c2a1637ca979c219.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="让一支 AI 智能体团队替你完成" />
  <meta name="twitter:description" content="社区聚焦：Cliff Hall 的 gooseTeam MCP 服务器。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/gooseteam-mcp-082fa2890c313519c2a1637ca979c219.png" />
</head>
