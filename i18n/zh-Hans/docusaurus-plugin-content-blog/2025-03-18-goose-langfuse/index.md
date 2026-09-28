---
title: "goose 如何借助 Langfuse 捕捉 AI 错误"
description: 用 Langfuse 的可观测性工具深入了解 goose 的行为。
authors: 
    - tania
---

![博客封面](goose_aierrors.png)

我们如何调试像 goose 这样的 AI 智能体？在 [Goosing Around](https://youtube.com/playlist?list=PLyMFt_U2IX4uFFhd_2TD9-tlJkgHMMb6F&feature=shared) 系列直播中，主持人 [Rizel Scarlett](https://www.linkedin.com/in/rizel-bobb-semple/) 邀请了 Langfuse 联合创始人 [Marc Klingen](https://www.linkedin.com/in/marcklingen/) 和 Block 机器学习工程师 [Alice Hau](https://www.linkedin.com/in/alice-hau/)，演示 Langfuse 如何让 goose 的行动变得可观测，让你追踪 LLM 行为并捕捉错误。

<!--truncate-->

## 什么是 Langfuse

[Langfuse](https://langfuse.com/) 是一个专为 LLM 驱动的应用设计的开源可观测性平台。Marc 在直播中透露，Langfuse 最初并不是可观测性平台，它诞生于早期尝试构建像 goose 这样的 AI 智能体的过程。

当时可用的模型限制了他们，尤其是在多文件编辑上。团队发现，他们为调试和监控自己的智能体而构建的工具，比智能体本身更有价值。

## Langfuse 如何与 goose 配合
传统可观测性工具在 AI 智能体上并不够用。Langfuse 引入 3 个核心概念，让 goose 的行为更容易观察，也让日志更容易解析：

### 追踪（Traces）

与 goose 的每次交互都会创建一条追踪，记录发生了什么的完整故事。这些追踪包含关键信息，从最初的提示和用户消息，到工具调用及其响应。它们还存储关于模型输出和耗时的有价值元数据，让开发者对每次交互有完整图景。

### 时间线视图
时间线视图把这些复杂交互转换成易于理解的形式。开发者可以实时看到并行任务的执行，理解不同行动之间的依赖，并测量每个操作的实际耗时。这在调试 goose 采取的一连串复杂行动时非常有帮助，也能帮助优化性能。

### 结构化数据
Alice 解释说：「goose 会话可能非常长……我们有日志文件，但你看到的只是一大段 JSON 日志。」

Langfuse 不会让你去硬啃原始 JSON 日志，而是帮你组织这些数据，让浏览较长会话及其数据更直接。这种方式能帮助开发者轻松分析工具使用模式、监控 token 消耗，并快速找出性能瓶颈以及它们可能出现的位置。

有了这次集成，你可以更好地理解 goose 采取的行动序列，并跨 LLM 分析 token 用量和模型行为。

## 实际收益
goose 与 Langfuse 集成带来的可观测性，对任何想清楚了解 goose 在幕后做什么的人都很有价值。Alice 和 Marc 讨论了这次集成如何帮助你更快地调试。

开发者可以深入详细的会话日志，找出已报告问题的根因，并确保 goose 尽可能高效地运行。比如检查某些命令为什么没有按预期工作，或确切看到 goose 如何用某个 LLM 处理给定任务的信息。

当开发者关注运行效率时，研究者可以用这次集成的分析能力，更好地理解哪些模型最适合自己的需求。通过全面的模型评估，他们可以分析不同模型如何处理工具调用，理解跨 LLM 的决策模式，并建立一套系统化的方法来理解和改进 AI 系统。

# AI 可观测性的未来
这些强大的调试和分析能力只是开始。goose 与 Langfuse 的这次集成，是让 AI 智能体像传统代码一样透明、可调试的重要一步。

要跟上它们发布时的进展，可以查看 GitHub 上的 [goose](https://github.com/aaif-goose/goose) 和 [Langfuse](https://github.com/langfuse/langfuse) 仓库。

你也可以观看[讨论 goose 与 Langfuse 集成的直播](https://www.youtube.com/live/W39BQjsTS9E?feature=shared)，并跟随[展示如何把 Langfuse 与 goose 集成的教程](/docs/tutorials/langfuse)。

也请订阅我们的[活动日历](https://calget.com/c/t7jszrie)，以便赶上即将到来的活动。

<head>
  <meta property="og:title" content="goose 如何借助 Langfuse 捕捉 AI 错误" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/03/18/goose-langfuse" />
  <meta property="og:description" content="用 Langfuse 的可观测性工具深入了解 goose 的行为。" />
  <meta property="og:image" content="http://goose-docs.ai/assets/images/goose_aierrors-22154af884db86789ce1a12a72897e8e.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="goose 如何借助 Langfuse 捕捉 AI 错误" />
  <meta name="twitter:description" content="用 Langfuse 的可观测性工具深入了解 goose 的行为。" />
  <meta name="twitter:image" content="http://goose-docs.ai/assets/images/goose_aierrors-22154af884db86789ce1a12a72897e8e.png" />
</head>
