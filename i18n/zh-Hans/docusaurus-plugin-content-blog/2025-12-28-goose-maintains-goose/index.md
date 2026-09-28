---
title: 我们如何用 goose 维护 goose
description: 了解嵌入 GitHub Actions 的 AI 智能体如何帮助维护者把 issue 变成 PR。
authors:
  - rizel
  - tyler
image: /img/blog/goose-maintains-goose.png
---

![博客封面](goose-maintains-goose.png)

随着 AI 智能体能力增长，更多人感到自己有能力写代码、为开源做贡献。天花板感觉比以往都高。这对生态是净收益，但也改变了维护者的日常现实。像 [goose](/) 团队这样的维护者面对着不断增长的拉取请求和 issue，速度往往快过他们现实中能处理的程度。

我们接受了这个现实，并让 goose 去处理它自己的积压。

<!--truncate-->

我们实际上在 1.0 之前就用 goose 来帮我们构建 goose 1.0。最初的 goose 是一个 Python CLI，但我们需要快速迁到 Rust、Electron 和 [MCP 原生](https://modelcontextprotocol.io)架构。goose 帮我们完成了这次过渡。用它来分流 issue、审阅改动，感觉是自然的延伸，所以我们把 goose 直接嵌进了一个 [GitHub Action](https://github.com/aaif-goose/goose/blob/main/.github/workflows/goose-issue-solver.yml)。

:::note 署名
那个 GitHub Action 工作流由 [Tyler Longwell](https://github.com/tlongwell-block) 构建。他把我们一直在手工探索的想法，变成了任何维护者用一条评论就能触发的东西。
:::

## 在 GitHub Action 之前

在 GitHub Action 存在之前，goose 团队已经在用 goose 加速我们的 issue 工作流。下面是一个真实例子。

一位用户在 Discord 上问，为什么一个 Ollama 模型在聊天模式里会抛错。我没有自己在代码库里翻，而是让 goose 探索代码、找出根因，并向我解释。然后我让 goose 用 GitHub CLI 开了一个 [issue](https://github.com/aaif-goose/goose/issues/6117)。

在同一次会话里，goose 说它有 95% 的把握知道怎么修。改动很小，所以我让 goose 开了一个 [PR](https://github.com/aaif-goose/goose/pull/6118)。当天就合并了。

这种工作流改变了我作为开发者倡导者的运作方式。在 goose 之前，用户报告问题时，过程是碎片化的。我会问澄清问题，在 GitHub 上查相关 issue，拉取最新代码，在文件里 grep，读逻辑，并试着形成出了什么问题的假设。

如果我弄明白了，有两个选择：
1. 我可以写一份详细的 issue，加到某位开发者的积压里，这意味着别人稍后得切换上下文进入这个问题。
2. 或者我自己尝试修复，如果我弄错了什么，这常常意味着花更多时间，并在代码审查中来回更多。

无论哪种，过程都会拉到几小时或几天。如果问题优先级不高，有时会从缝里漏掉。报告会待在 Discord 或 GitHub 评论里，直到滚出视野，用户会以为没人在听。

有了 goose，整个过程塌缩成一次对话。

本地工作流是有效的。但当我用 goose 在本地解决一个 issue 时，开车的仍然是我。我停下正在做的事，打开一个会话，粘贴 issue 上下文，引导 goose 完成修复，跑测试，并开 PR。

## 用 GitHub Action 扩展

GitHub Action 把整段序列压缩成一条评论。团队成员看到一个 issue，评论 `/goose`，然后继续做别的。goose 在容器里启动，阅读 issue，探索代码库，运行验证，并打开一个草稿 PR。维护者回来时面对的是一份提议的方案，而不是一张白纸。

我们在 [issue #6066](https://github.com/aaif-goose/goose/issues/6066) 上看到了这一点。用户报告 goose 一直默认到 2024 年，尽管上下文里有正确的日期时间。这个 issue 放了两天。然后 Tyler 看到了，在凌晨 1:59 评论 `/goose solve this minimally`，然后回去做他正在做的事（大概是睡觉）。十四分钟后，goose 打开了 [PR #6101](https://github.com/aaif-goose/goose/pull/6101)。

维护者的角色从实现转向审阅。开源的瓶颈很少是“有没有人能写下这段代码”。而是“有足够上下文的人能不能找到时间写下这段代码”。GitHub Action 把这两个约束拆开。任何维护者都可以触发一次修复尝试，而不必对代码库的那一部分非常熟悉。

这以手工分流做不到的方式扩展。积压里功能请求、复杂 bug 和快速修复的数量差不多。这个 Action 让你指向一个 issue 说“试试这个”，而不必搭上整个下午。如果 goose 失败，你损失的是几分钟计算。如果它成功，你省下几小时。

对贡献者来说，响应速度改变一切。当一位用户提交了关于斜杠命令不处理可选参数的 [issue #6232](https://github.com/aaif-goose/goose/issues/6232) 时，一位维护者很快评论 `/goose can you fix this`，一小时内就有了带修复和四个新测试的草稿 PR。即便 PR 不完美、需要调整，贡献者也看得到势头。

## 底层

维护者用 `/goose` 加上一条提示，作为 issue 上的评论来召唤 goose。GitHub Actions 启动一个装有 goose 的容器，传入 issue 元数据，让 goose 工作。如果 goose 产生了改动并且验证通过，工作流会打开一个**草稿**拉取请求。

但底层发生的事，比“/goose fix this”这样一条简单提示更多。

工作流使用一份[配方](https://github.com/aaif-goose/goose/blob/main/.github/workflows/goose-issue-solver.yml#L14-L78)，定义若干阶段，确保 goose 真正完成工作，并且不做我们没要求的事。

| 阶段 | goose 做什么 | 为什么重要 |
| ---------- | ----------------------------------------------------- | --------------------------------------------------------------------- |
| Understand | 阅读 issue，并把所有需求提取到一个文件 | 迫使 AI 在写代码之前识别“完成”长什么样 |
| Research | 用搜索和分析工具探索代码库 | 防止对不熟悉的代码盲目编辑 |
| Plan | 决定一种做法 | 在实现之前抓住架构错误 |
| Implement | 按需求做最小改动 | “这在需求里吗？如果不在，就不要加” |
| Verify | 运行测试和 linter | 在人看到 PR 之前抓住明显失败 |
| Confirm | 重读原始 issue 和需求 | 防止 AI 在忘掉一半任务时宣布胜利 |

这份[配方](https://github.com/aaif-goose/goose/blob/main/.github/workflows/goose-issue-solver.yml)也让 goose 可以使用 [TODO 扩展](/docs/mcp/todo-mcp)，一个充当外部记忆的内置工具。阶段告诉 goose *做什么*。TODO 帮助 goose *记住*它在做什么。当 goose 读过代码库并构建解决方案时，它的上下文窗口会填满，更早的指令可能被压缩或丢失。TODO 会持续存在，所以 goose 总能检查自己做了什么、还剩什么。

工作流也在谁可以调用 `/goose`、它被允许碰哪些文件，以及必须由维护者审阅并批准每一个 PR 这些方面设了护栏。

用 goose 来维护 goose，有点奇怪。但它让我们诚实。我们是自己的第一位客户，如果智能体在这里产不出可合并的 PR，我们会立刻感觉到。

我们瞄准的未来，不是 AI 取代维护者。而是维护者可以指向一个问题，说“试试这个”，然后回来看到一份具体提案，而不是一个空白编辑器。

如果那成为常态，开源的扩展方式就会不同。

[GitHub Action 工作流](https://github.com/aaif-goose/goose/blob/main/.github/workflows/goose-issue-solver.yml)是公开的，任何人如果想在自己的 CI 流水线里探索这种模式，都可以看。

<head>
  <meta property="og:title" content="我们如何用 goose 维护 goose" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/12/28/goose-maintains-goose" />
  <meta property="og:description" content="了解嵌入 GitHub Actions 的 AI 智能体如何帮助维护者分流 issue，并让开源继续前进。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/goose-maintains-goose-4b25a92b0dfd9a6acce8c8f8e9c954f7.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="我们如何用 goose 维护 goose" />
  <meta name="twitter:description" content="了解嵌入 GitHub Actions 的 AI 智能体如何帮助维护者分流 issue，并让开源继续前进。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/goose-maintains-goose-4b25a92b0dfd9a6acce8c8f8e9c954f7.png" />
</head>
