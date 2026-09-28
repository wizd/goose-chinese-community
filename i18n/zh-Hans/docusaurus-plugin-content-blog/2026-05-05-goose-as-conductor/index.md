---
title: "用 goose 跨多个智能体编排复杂工作流"
description: "用 goose 协调多智能体工作流——拆解复杂任务，并行委托给专门的智能体，并综合结果。"
authors:
  - adewale
image: /img/blog/goose-conductor.png
---

![goose 像指挥一样编排多个智能体](/img/blog/goose-conductor.png)

很多人一次只给智能体一个任务——“做这个，现在做那个，现在做下一件”。这能用，但很慢。很多人也希望智能体同时做很多事：边写代码边研究，边测试边审阅，边重构边写文档。

这就是编排给你的东西。你不必一次喂给 goose 一个任务然后等待，而可以让它协调多个并行工作的智能体——每个专注拼图的一块，由 goose 让一切保持在轨道上。

<!-- truncate -->

## 什么是编排？

如果你用过[子智能体](/docs/guides/context-engineering/subagents)，你已经知道如何把工作委托给独立的 AI 实例。编排是那之上的一层——决定*谁*在*什么时候*做*什么*的部分。编排让你不必让一个 goose 会话按顺序做所有事，而是可以：

- **拆解**一个复杂任务为独立的子任务
- **委托**每个子任务给一个单独的智能体（子智能体、ACP 提供商，或另一个 goose 实例）
- **协调**结果——等待依赖、处理失败、合并输出

把它想成独立开发者和管理团队的技术负责人之间的差别。

## 自己试试

下面是你现在就可以运行、看到编排实际效果的东西。问 goose：

```
I need to understand this codebase. In parallel:
- Summarize the project structure and key dependencies
- Identify the main entry points and how data flows through them
- Find any TODO comments or known issues in the code
```

goose 会同时拉起三个子智能体——每个负责一项研究任务。你会在会话里看到它们同时工作，三份摘要大致一起回来，而不是一个接一个。原本三次顺序等待变成一次。

## 它如何建立在已有的东西之上

编排不取代子智能体或子配方——它建立在它们之上：

| 层 | 它做什么 |
|-------|-------------|
| [子智能体](/docs/guides/context-engineering/subagents)（delegate） | 拉起独立的子任务 |
| 异步委托 | 在后台运行子智能体，稍后再收集结果 |
| [ACP 提供商](/docs/guides/acp-providers) | 引入外部智能体（Claude Code、Codex、Amp） |
| **编排** | 把以上所有协调成结构化工作流 |

如果子智能体是你的队友，编排就是告诉他们做什么、何时做的项目计划。

## 分阶段工作流：研究 → 构建 → 验证

并非一切都能并行。有些工作流有自然的阶段，后面的步骤依赖前面的结果。你可以自然地向 goose 描述这一点：

```
Build a REST API for the inventory system:
1. First, research the existing data models in src/models/ and the API patterns in src/routes/ (do both at the same time)
2. Then implement the inventory API routes following those patterns
3. Finally, write integration tests and do a security review (both at the same time)
```

goose 理解这里的依赖结构。阶段 1 并行运行两项研究任务。阶段 2 等那些结果出来再构建。阶段 3 并行启动两项独立的验证任务。

关键洞察：**读取可以并行，写入应当顺序进行**（尤其是它们碰到同一批文件时）。

## 编排 + ACP：混用智能体

这里事情变得真正有趣。编排与 [ACP 提供商](/docs/guides/acp-providers) 一起工作，这意味着你可以把工作委托给完全不同的编程智能体——不只是 goose 子智能体。

要使用它们，你只要在提示里说出来，例如：

```
Refactor the auth module for clarity using Claude Code,
then write tests for it, and use Codex to generate the API docs.
```

goose 理解你想让不同的智能体处理工作流的不同部分。它把每个任务委托给合适的智能体，等待结果，并把一切带到一起。无论你在 CLI 还是桌面应用上，这都一样——你用自然语言提出即可。

唯一的前提是，为你想使用的智能体[配置好提供商](/docs/guides/acp-providers)。

## 最佳实践

开始编排时，重要的是用概念上分开、不太可能在共享文件上产生编辑冲突的任务来做。下面是一些提示：

### 把读取并行化

研究任务可以安全地并行运行。多个智能体可以同时阅读同一个代码库、文档或 API，而不会互相踩脚。

### 指令要明确

被委托者只知道你告诉它们的东西。它们彼此之间、以及与父会话之间不共享上下文。如果被委托者需要前一阶段的信息，就在指令里明确传过去。

### 从简单开始

你不需要编排一切。对直接的任务，单个子智能体就够了。当你有真正独立的工作流，或需要对同一问题的多个视角时，编排才会发光。

## 开始使用

如果你已经在用 goose，今天就可以开始编排。最简单的方式就是提出：

```
Do these three things in parallel: [task A], [task B], [task C]
```

其余的由 goose 处理——拉起被委托者，并发运行它们，并把结果带到一起。

对于可复用的工作流，查看[并行子配方教程](/docs/tutorials/subrecipes-in-parallel/)，构建可以和团队分享的配方。如果你想引入外部智能体，[ACP 提供商指南](/docs/guides/acp-providers) 会帮你配好 Claude Code、Codex 或 Amp。

<head>
  <meta property="og:title" content="用 goose 跨多个智能体编排复杂工作流" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2026/05/05/goose-as-conductor" />
  <meta property="og:description" content="用 goose 协调多智能体工作流——拆解复杂任务，并行委托给专门的智能体，并综合结果。" />
  <meta property="og:image" content="http://goose-docs.ai/assets/images/goose-conductor-c380f287a96196276ac7cb0a652e390c.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="用 goose 跨多个智能体编排复杂工作流" />
  <meta name="twitter:description" content="用 goose 协调多智能体工作流——拆解复杂任务，并行委托给专门的智能体，并综合结果。" />
  <meta name="twitter:image" content="http://goose-docs.ai/assets/images/goose-conductor-c380f287a96196276ac7cb0a652e390c.png" />
</head>
