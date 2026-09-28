---
title: "你的 AI 智能体需要计划吗？"
description: 和 AI 一起做计划会得到好结果。知道何时以及如何和 AI 智能体一起做计划，会得到更好的结果。
authors:
    - rizel
---

![博客封面](blog-banner.png)

:::warning 已过时
本文描述的 CLI `/plan` 命令后来已从 goose 中移除，`GOOSE_PLANNER_PROVIDER` 和 `GOOSE_PLANNER_MODEL` 设置也一并移除。这里描述的其他做法仍然有效。
:::

# 你的 AI 智能体需要计划吗？

做计划还是不做计划，这是个错误的问题。计划不是非此即彼的是或否，它存在于一个光谱上。真正的问题是哪种做法适合你当前的任务和工作风格。

不同的开发者以不同方式做计划。有的构建者在碰键盘之前会起草详细的伪代码，有的则实践测试驱动开发，让架构有机地浮现。你会看到有的团队在白板上画复杂图表，有的则快速做出原型，以便“快速失败”，稍后再重构。

如果手工编码时计划是一个光谱，用智能体编码时为什么不也是一个光谱？

<!-- truncate -->

最近，业界对 AI 编程智能体中的计划有一场健康的辩论。有些人觉得专门的计划模式必不可少，另一些人则把它们看成不必要的开销。毕竟，你总是可以直接告诉智能体“先做个计划”。有人甚至认为，如果你需要一份持久的计划，就应该自己把它写进文件，这样你可以看见它、编辑它，并和代码一起做版本管理。

这揭示了一个有趣的事实：计划模式的价值不只在计划本身。它在于为使用它的开发者建立正确的心智模型和工作流。有时你想让智能体直接执行。另一些时候，你想看见它的思考，给出反馈，并在任何代码改动发生之前协作敲定做法。

[goose](https://github.com/aaif-goose/goose) 支持多种做法，因为不同情况需要不同方法，而不是选定一种哲学。

---

## 选择你的策略

### 给架构师
**`/plan` 模式**

当你在 goose CLI 中进入计划模式时，goose 转入交互式对话。它不会立刻执行，而是问澄清问题，以深入理解你的项目。它可能会问你的技术栈偏好、认证要求、部署目标，或你想如何处理错误情况。这种来回会持续到 goose 有足够上下文，能生成一份全面、可执行的计划。

计划模式使用一套你可以自定义的独立规划器配置。通过设置 **`GOOSE_PLANNER_PROVIDER`** 和 **`GOOSE_PLANNER_MODEL`** [环境变量](/docs/guides/environment-variables)，你可以用一个模型做战略规划，用另一个模型做执行。当你对计划满意时，goose 会问你是否要清空消息历史并据此行动，在任何代码改动发生之前给你一个明确的检查点。

我最近把一个静态的 Vite/React 项目迁到 Next.js 时用了这种方法。这是常见的迁移模式，我清楚范围，所以我让 goose 在开始任何工作之前做一份全面计划。它产出了一份 11 阶段的迁移计划，每一步都有具体的复选框，覆盖从依赖更新到路由变更再到组件边界的一切。我批准之后，说了“好，开始”，goose 就有条不紊地执行，每个阶段之后提交一次。

### 给导演
**指令文件**

有时你已经确切知道需要发生什么。你想过步骤，做过决定，只需要 goose 去干活。你不是通过对话解释计划，而是把它写下来交出去。

你可以把指令写成 markdown 文件，作为一份详细的执行计划，一份引导 goose 逐步实现的活文档。计划可以包含关于代码库的上下文、要修改的具体文件、预期结果和验证步骤。准备好之后，你用 `goose run -i plan.md` [运行它](/docs/guides/running-tasks)，goose 就会执行你指定的内容。

当你已经想清楚时，这种方法有效。也许你在白板上画过架构。也许你写过技术设计文档。也许你对这个代码库足够熟悉，不需要 goose 问澄清问题。你写规格，goose 执行它。

你也可以在[无头模式](/docs/tutorials/headless-goose)下运行指令文件，用于 CI/CD 流水线或自动化，但那只是一个用例。核心想法是：计划归你，执行归 goose。

[进一步了解运行任务 →](/docs/guides/running-tasks)


### 给探索者
**对话式上下文构建**

这种方法把三个协同工作的 goose 功能组合在一起：

**对话式规划**意味着把 goose 当作结对伙伴，而不是任务执行器。你让 goose 分析、解释和探索。你们一起建立共享的心智模型。然后，准备好时，你转入执行。

**[todo 扩展](/docs/mcp/todo-mcp)**在后台留意复杂度。当 goose 识别到一个任务有两个或更多步骤、涉及多个文件，或范围不确定时，它会自动创建一份清单。goose 工作时会更新进度，并勾掉已完成的项。计划从工作中浮现，而不是先于工作。

**项目规则**提供看不见的脚手架。使用 **[`goosehints`](/docs/guides/context-engineering/using-goosehints)** 或 **`agents.md`** 这样的文件，你编码持久的偏好、提交策略、测试要求和项目约定，自动把智能体导向正确方向。这给 goose 做出更好决定的上下文，而不必每次重复规则。

这些功能合在一起，让你可以有一场随意、探索性的对话，同时底层保持结构。你有意地限定提示范围。复杂度出现时，todo 扩展创建组织。项目规则确保你的偏好始终生效。

我通常就是这样工作的。当我把一个遗留的 LLM 额度配置应用迁到 Next.js 时，很多人对我的做法皱眉。但就上下文而言，我回到的是八个月前自己建的代码库，已经记不清了。应用拆在两个仓库里，我不知道哪一个负责什么。事先写一份 plan.md 会是在猜。

所以我让 goose 分析两个项目，并解释它们如何通信。我有意地限定提示：“只要前端，不要 API 调用。”我启用了 todo 扩展，知道一旦范围变清楚，它就会创建结构。我配置了项目规则来自动处理提交。

这种方法比事先计划需要更多来回。但那些提示不是浪费。它们在建立使真正的迁移成为可能的上下文。等到 goose 创建清单时，我们双方都明白需要发生什么。

[进一步了解 todo 扩展 →](/docs/mcp/todo-mcp)  
[用 goosehints 配置你的项目规则 →](/docs/guides/context-engineering/using-goosehints)

---

## 你是哪种风格？

goose 支持多种规划哲学，因为开发者不会只以一种模式工作。架构师想在代码之前有清晰度。导演想要控制。探索者通过工作发现计划。

这些做法没有哪一种更优越。每一种适合不同情况。同一个开发者可能周一用 `/plan` 模式做一次范围清楚的迁移，周二对一个不熟悉的代码库用对话式上下文构建。

问题不是要不要做计划。问题是今天哪种计划适合你的情况。

---

*准备好用 goose 尝试不同的规划做法了吗？从我们的[快速入门指南](/docs/quickstart)开始，或浏览[上下文工程文档](/docs/guides/context-engineering)来搭好你的脚手架。*

<head>
  <meta property="og:title" content="你的 AI 智能体需要计划吗？" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/12/19/does-your-ai-agent-need-a-plan" />
  <meta property="og:description" content="和 AI 一起做计划会得到好结果。知道何时以及如何和 AI 智能体一起做计划，会得到更好的结果。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/blog-banner-69252aa3455f8a3a303f102c530922f3.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="你的 AI 智能体需要计划吗？" />
  <meta name="twitter:description" content="和 AI 一起做计划会得到好结果。知道何时以及如何和 AI 智能体一起做计划，会得到更好的结果。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/blog-banner-69252aa3455f8a3a303f102c530922f3.png" />
  <meta name="keywords" content="goose, AI 规划, AI 智能体, plan 模式, 开发者工作流, 上下文工程, goosehints, todo 扩展, AI 编程助手, 软件开发" />
</head>
