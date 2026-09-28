---
title: "我如何用 goose、Asana 和 Google Calendar MCP 规划一周"
description: 用 MCP 和 goose 自动化任务管理，提升生产力。
authors: 
    - angie
---

![博客封面](mcp-planner.png)

星期一总是让人喘不过气。上周没做完的任务堆在那里，新的优先级不断涌来，会议又散落在日历各处。真的很多 😩。我不再手动整理待办、琢磨每件事该放在哪里，而是用几个顺手的 MCP 服务器配合 goose，让它帮我把这一周安排好。

<!--truncate-->

外面有很多出色的 MCP 服务器能改善我的工作，其中包括 [Asana](https://github.com/roychri/mcp-server-asana) 和 [Google Calendar](https://www.pulsemcp.com/servers?q=google+calendar)。我把它们加为 goose 扩展，这样 goose 就能拉取我的任务、分析它们并排进日程，只需要一句简单的提示：

> _**goose，拉取 Asana 里分配给我且尚未完成的全部任务。按工作类型分组，以减少上下文切换。估计每项任务需要多长时间。然后在我的 Google Calendar 里相应地安排每项任务。确保不要重复预订，也不要让任何一天过载。**_


:::info
我用 GPT-4o 完成这项任务
:::

有了这条提示，goose 会查看我在 Asana 中未完成的任务（注意：我把工作区、项目和用户 ID 存在了 [memory](/docs/mcp/memory-mcp) 里）。

在不同类型的工作之间来回跳是生产力杀手。goose 会按上下文把任务分成类别。例如：

* 写作相关任务（博客、文档、邮件）
* 异步协作（PR 评审、提供反馈）
* 技术工作（写代码等）

把相似任务归在一起，我就能保持在合适的状态里，而不必不断切换。

然后 goose 会估计每项任务要花多久、任务的复杂度，以及有没有截止日期。如果我需要手动调整，也可以，但通常它估得相当准。

任务整理并估时之后，goose 会在我的 Google Calendar 里找到空档并自动排上。它会避开我的会议，并确保不会让任何一天过载。

一周刚开始的头几分钟，我的日程就已经排好，并且是为专注而优化的。

这对提高我的生产力帮助极大。谢谢你，goose！🚀



<head>
  <meta property="og:title" content="MCP 实战：我如何用 AI、goose、Asana 和 Google Calendar 规划一周" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/03/20/asana-calendar-mcp" />
  <meta property="og:description" content="用 MCP 和 goose 自动化任务管理，提升生产力。" />
  <meta property="og:image" content="http://goose-docs.ai/assets/images/mcp-planner-761303c5ddcd5c79ed853536e3f87bcf.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="MCP 实战：我如何用 AI、goose、Asana 和 Google Calendar 规划一周" />
  <meta name="twitter:description" content="用 MCP 和 goose 自动化任务管理，提升生产力。" />
  <meta name="twitter:image" content="http://goose-docs.ai/assets/images/mcp-planner-761303c5ddcd5c79ed853536e3f87bcf.png" />
</head>
