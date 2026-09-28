---
title: "解释 Gas Town：如何用 Goosetown 做并行的智能体工程"
description: "了解 Gas Town 和 Goosetown 如何通过教 AI 智能体作为团队一起工作，引领工业化编程革命。这份入门指南解释我们用来从和一个 AI 说话，转向同时协调许多智能体的基础设施。"
image: /img/blog/goosetown.png
authors:
  - rizel
  - tyler
---

![Goosetown](/img/blog/goosetown.png)

2026 年元旦，当许多人还在从前一晚恢复时，另一种宿醉抓住了每一个被 AI 浸透、长期在线的软件工程师。Steve Yegge 发表了一篇新博客：[《欢迎来到 Gas Town》](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04)。有些人离开时受到激励，终于要最优地使用他们的智能体；另一些人则纯粹困惑。如果你像我一样，你会两者都有一点。

Yegge 那篇 34 分钟的文章是一幅铺开的愿景，充满未来想法、好玩的角色，以及足够让你头晕的旁支。但传说之下是一次巨大的架构转变。我想退一步，为所有人简化这个“大想法”：Gas Town 是一种哲学，也是一个概念验证，帮助人们协调多个一起工作的智能体。

<!-- truncate -->

## 智能体工程的范式转变

大多数人按顺序使用 AI 智能体。工作流可以是这样：

* **下午 1:00：** 你：“goose，构建 API 端点。”
* *[等 10 分钟，再回来看。]*
* **下午 1:10：** 你：“现在构建前端。”
* *[等 10 分钟，再回来看。]*
* **下午 1:20：** 你：“现在写测试。”
* *[等 10 分钟，再回来看。]*
* **下午 1:30：** 项目完成。

你在 30 分钟内建好了一个项目，这很快，但那段时间的大部分你只是在看进度条。有些工程师开始意识到，如果我们在跑一个智能体，就可以同时再跑五个。

例如，智能体 A 构建 API，智能体 B 可以开始前端，智能体 C 可以写测试，智能体 D 可以调查你一直在回避的那个遗留代码库里的 bug。

人们就是这样把时间买回来的。他们通过跑并行线程，在一小时内完成整个冲刺。（只是别告诉你的老板，因为完成工作的奖励永远是更多工作。）

然而，由于智能体彼此不通信，这种方法带来新问题：

* **合并冲突**：两个智能体改了同一文件的同一行，把一切弄坏。
* **丢失上下文**：会话崩溃，或者智能体因为说得太久开始幻觉，突然一小时的“工作”消失了。
* **人的瓶颈**：你最终在周末派对上或床上不停看手机，确认智能体是否仍在轨道上，让你变成智能体的保姆。

## 解释 Gas Town

Gas Town 被设计来停止保姆工作。它在并行智能体之间分配任务，这样你就不必自己做。系统使用：

* **Worktrees**：这些自动把每个智能体放进它自己独立的工作区，这样它们不会互相踩脚。
* **Beads**：它用 beads 跟踪进度。如果会话崩溃，下一个智能体会话可以从上一个智能体停下的地方精确接上。
* **通信**：每个智能体大声报告它在做什么或观察到什么，这样其他智能体获得必要的上下文。

这个系统也引入一组角色：

* **The Mayor**：你的主要智能体界面，协调所有其他智能体
* **The Polecat(s)**：这些是工人智能体。它们在独立的 work tree 上工作，并接受 Mayor 的指令。
* **The Witness**：观察工人智能体，在它们卡住时推一把，并升级问题以保持系统运行

我不会在这里列出每一个角色（它很深），但要点是：Gas Town 建立一条指挥链，并有共享的通信方式。

## 介绍 Goosetown

这正是我们在 [goose](https://goose-docs.ai) 正在构建的那种未来思考。所以 goose 团队，具体是 Tyler Longwell，做了我们自己的版本，叫 [Goosetown](https://github.com/aaif-goose/goosetown)。

Goosetown 是建立在 goose 之上的多智能体编排层。和 Gas Town 一样，它协调并行智能体。和 Gas Town 不同，它有意保持最小，并为研究优先的并行工作而构建。

当你给 Goosetown 一个任务时，主智能体充当 Orchestrator，把工作拆成阶段：研究、构建和审阅。然后它生成并行的被委托者来完成。每个被委托者通过共享的 Town Wall 通信，那是一份只追加的日志，每个智能体在上面发布自己在做什么、发现了什么。

下面是一次会话里真实的 Town Wall 片段，并行的研究者很快在一次转向上看齐：

* **[10:14] researcher-api-auth** - 🚨 潜在的拦路石：服务调用方的 capabilities 是空的。计划中的认证路径会静默拒绝每一个请求。这需要改代码，不只是改配置。
* **[10:14] researcher-endpoints** - 💡 发现：原生端点已经存在，依赖极少。替代路径可行。
* **[10:15] researcher-source** - ✅ 完成。已确认：原生路径不需要任何新依赖。建议转向。

Goosetown 在 4 个组件上运作：[skills](/docs/guides/context-engineering/using-skills)、[子智能体](/docs/guides/context-engineering/subagents)、[beads](https://github.com/steveyegge/beads) 和 [gtwall](https://github.com/aaif-goose/goosetown/blob/main/gtwall)。

### Skills

[Skills](/docs/guides/context-engineering/using-skills) 是描述如何做某事的 Markdown 文件，比如“如何部署到生产”。Goosetown 用这些来告诉每个 Delegate 如何做它的具体工作。当一个 Delegate 生成时，它被“预加载”了其角色的 skill（Orchestrator、Researcher、Writer、Reviewer）。

### 子智能体

Goosetown 不用一次最终会撞上“上下文悬崖”的长对话做所有事，而是使用[子智能体](/docs/guides/context-engineering/subagents)，即临时的智能体实例。它们由 [summon 扩展](/docs/mcp/summon-mcp) 触发，用 `delegate()` 把工作交给一个全新的智能体实例。它们在自己干净的上下文里干活，并返回一份摘要，让你的主会话保持快速和聚焦。

### Beads

Goosetown 使用 [Beads](https://github.com/steveyegge/beads) 跟踪进度，让工作在崩溃后仍能存活。它是基于 Git 的本地 issue 跟踪器。Orchestrator 创建 issue，被委托者更新它们，如果会话失败，下一个智能体捡起这颗 “bead” 并继续工作。

### gtwall

[gtwall](https://github.com/aaif-goose/goosetown/blob/main/gtwall) 是一份只追加的日志，被委托者用它来通信和协调。所有被委托者都会发布并阅读活动。

## 来自创造者的一句话

> *Goosetown 起初是一个有趣的实验，想把我正在为 goose 做的子智能体升级推到极限。我花了一些时间用 Gas Town，觉得一个远没那么铺张的变体，会是一种俏皮的方式，来展示后台子智能体，以及现代 goose 在非常高的层次上编排和管理项目有多好。当我开始把 Goosetown 当作日常主力时，它工作得有多好完全出乎我的意料。*
>
> *看着子智能体彼此闲聊，每一个都被编排者赋予个性和任务，令人大开眼界。而且好笑。它们像我和同事那样自言自语、来回讨论。即便只是让一个模型以不同上下文的不同智能体的形式，自动把自己的想法弹来弹去，也会让输出更好。*
>
> *跑一群（蜂群）智能体显然很贵，但工作的整体质量更高，而且要把事情做对我需要的时间少得多。这里肯定有取舍。goose 在这方面有帮助：你可以事先把默认子智能体模型设成更便宜的一个，也可以让主智能体明确、临时地选择它想用于子智能体的模型。*
>
> *goose 一直在加入新的、令人兴奋的功能。重构和打磨。对 Goosetown，我会继续让它的产物（记忆）系统更稳健，让 Goosetown 内部的通信更顺畅，并让它保持一点点傻气。*
>
> — Tyler

## 开始使用

准备好自己试试并行的智能体工程了吗？[Goosetown](https://github.com/aaif-goose/goosetown) 是开源的，可在 GitHub 上获得。克隆[仓库](https://github.com/aaif-goose/goosetown)，按 README 里的设置说明操作，你很快就能编排多个智能体。如果你对这种工作流还陌生，先看下面的视频，是在深入之前了解真实会话长什么样的好办法。

<iframe class="aspect-ratio" src="https://www.youtube.com/embed/H2hJjNmvEEA" title="Rizel 第一次使用 Goosetown" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<head>
  <meta property="og:title" content="解释 Gas Town：如何用 Goosetown 做并行的智能体工程" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2026/02/19/gastown-explained-goosetown" />
  <meta property="og:description" content="了解 Gas Town 和 Goosetown 如何通过教 AI 智能体作为团队一起工作，引领工业化编程革命。这份入门指南解释我们用来从和一个 AI 说话，转向同时协调许多智能体的基础设施。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/goosetown-6e1bda1a4bd160c0c01cfc58c118492e.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="解释 Gas Town：如何用 Goosetown 做并行的智能体工程" />
  <meta name="twitter:description" content="了解 Gas Town 和 Goosetown 如何通过教 AI 智能体作为团队一起工作，引领工业化编程革命。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/goosetown-6e1bda1a4bd160c0c01cfc58c118492e.png" />
</head>
