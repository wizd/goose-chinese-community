---
title: 介绍 codename goose
description: codename goose 是你的开源 AI 智能体，自动化工程任务并提升生产力。
authors: 
    - adewale
---

![介绍 codename goose](introducing-codename-goose.png)

我们非常高兴地宣布 **codename goose**：一个跑在你机器上的开源 AI 智能体，用来自动化你的任务。

它由你选择的[大语言模型（LLM）](/docs/getting-started/providers)、易用的桌面界面和 CLI，以及能与你现有工具和应用集成的[扩展](/docs/getting-started/using-extensions)驱动。goose 旨在增强你的生产力和工作流。

<!--truncate-->


你可以把 goose 想成一个随时准备接受你的指令、并替你把工作做完的助手。

虽然 goose 的首批用例聚焦工程，社区也一直在探索其他非工程用例。不用说，goose 是[开源](https://github.com/aaif-goose/goose)的 🎉。


## goose 如何工作

goose 作为一个智能、自主的智能体运行，通过对其核心能力的良好编排来处理复杂任务：

- **使用扩展**：[扩展](/docs/getting-started/using-extensions)是 goose 适应性的关键，让你能连接已经在用的应用和工具。无论是连接 GitHub、访问 Google Drive，还是与 JetBrains IDE 集成，可能性都很广。其中一些扩展已经收录在[扩展][extensions-directory]目录中。goose 扩展构建在 [Model Context Protocol（MCP）](https://www.anthropic.com/news/model-context-protocol)之上，让你可以为 goose 构建或带来自己的自定义集成。

- **LLM 提供商**：goose 兼容多种 [LLM 提供商](/docs/getting-started/providers)，让你选择并集成自己偏好的模型。

- **CLI 和桌面支持**：你可以把 goose 作为桌面应用运行，也可以通过命令行界面（CLI）运行，两边使用相同的配置。

## goose 实战

goose 能处理从简单到复杂的广泛任务，覆盖多个工程领域。下面是 goose 帮助人们完成的一些例子：

- 进行代码迁移，例如 Ember 到 React、Ruby 到 Kotlin、Prefect-1 到 Prefect-2 等
- 深入一个不熟悉编程语言的新项目
- 在依赖注入框架中，把代码库从字段注入迁移到构造函数注入
- 用构建自动化工具对构建命令做性能基准测试
- 把代码覆盖率提高到某个阈值以上
- 为数据保留搭建 API
- 创建 Datadog 监控
- 移除或添加功能开关等
- 为某个功能生成单元测试

## 开始使用

你现在就可以开始使用 goose！查看我们的[快速开始](/docs/quickstart)。


## 加入 goose 社区

对即将到来的功能和活动感到兴奋？一定要和我们联系！

- [GitHub](https://github.com/aaif-goose/goose)
- [Discord](https://discord.gg/n8R5VaWDAn)
- [YouTube](https://www.youtube.com/@goose-oss)
- [LinkedIn](https://www.linkedin.com/company/goose-oss)
- [X](https://x.com/goose_oss)
- [BlueSky](https://bsky.app/profile/opensource.block.xyz)


[extensions-directory]: https://goose-docs.ai/v1/extensions


<head>
  <meta property="og:title" content="介绍 codename goose" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2024/12/11/resolving-ci-issues-with-goose-a-practical-walkthrough" />
  <meta property="og:description" content="codename goose 是你的开源 AI 智能体，自动化工程任务并提升生产力。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/introducing-codename-goose-89cac25816e0ea215dd47d4b9768c8ab.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="介绍 codename goose" />
  <meta name="twitter:description" content="codename goose 是你的开源 AI 智能体，自动化工程任务并提升生产力。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/introducing-codename-goose-89cac25816e0ea215dd47d4b9768c8ab.png" />
</head>
