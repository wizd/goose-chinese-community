---
title: "把 issue 当作新的 PR"
description: "我们正在改变人们为 goose 做贡献的方式：先在 issue 里完成设计和讨论，再由智能体把已就绪的 issue 写成代码。"
authors:
  - douwe
featured: true
image: /img/blog/issues-are-the-new-prs.png
---

![goose 的 GitHub 仓库显示有 184 个未合并的拉取请求，列表逐渐模糊](/img/blog/issues-are-the-new-prs.png)

从前，[向开源项目提交你的第一个 PR](https://opensource.guide/how-to-contribute/) 相当费事。即便说明写得很清楚，把项目构建起来、让应用跑起来、让测试通过，都需要实打实的工作。就算你清楚要修哪个 bug，也得大致理解项目架构，并对要改的代码有更细致的了解。

[编程智能体](https://block.xyz/inside/block-open-source-introduces-codename-goose)改变了这一切。问题不在代码质量。网上到处都是对 AI 注水代码的抱怨，但智能体写出的代码，往往比第一次贡献者交上来的更好。问题在于，智能体[改变了开源的经济账](https://github.blog/open-source/maintainers/how-pull-request-limits-are-cutting-down-the-noise/)。

<!-- truncate -->

PR 曾经是一份并不完美、但能说明有人做了功课的证据。如果没有理由相信维护者会想要这个功能，谁会费劲把它实现出来？修一个 bug 所需的工作，也会迫使你理解周围的代码。这并不能保证判断正确，但摩擦力会筛选出真正投入的人，并迫使贡献者在写代码之前先获得上下文。

今天，[做出一份看起来像样的功能实现或 bug 修复已经很便宜](https://github.blog/ai-and-ml/github-copilot/assigning-and-completing-issues-with-coding-agent-in-github-copilot/)。昂贵的是判断这项改动是否属于这个项目，以及正确的方案长什么样。一个 PR 到达时，这些问题看起来好像已经有了答案，但智能体往往只是做了一系列看似合理的选择。维护者必须把这些选择挖出来，判断哪些是对的，并说明其余的该怎么改。贡献者的智能体会迅速修改代码，但判断是维护者提供的。到了这一步，维护者何不干脆运行自己的智能体？

把这个逻辑推到底，开源项目会剩下公开的代码，却没有有意义的公众参与：项目由一个小核心团队及其智能体开发，其他人则变成被动用户或工单提交者。但[开源的价值](https://github.com/aaif-goose/goose/blob/main/GOVERNANCE.md#contributors)从来不只是外人写下的代码。外人带来新的眼光、新的想法、意料之外的使用场景和领域知识。他们会遇到核心团队从未见过的问题，并质疑核心团队已经不再注意的假设。

要保住这份价值，我们得放下把 PR 当作主要贡献机制的做法，把外部贡献前移。有价值的贡献地点，主要不再是写代码，而是提交好的 issue，更重要的是参与讨论，把这些 issue 变成经过慎重考虑的方案。

我们正在用一个公开的 [goose Issues 看板](https://github.com/orgs/aaif-goose/projects/1) 把 goose 迁到这个模式。和以前一样，如果你发现 bug 或想要新功能，就[提交一个 GitHub issue](https://github.com/aaif-goose/goose/issues/new/choose)。新 issue 进入 Inbox。分流时我们可能会要求补充信息，或在说明原因后关闭 issue。我们想解决的问题会进入 Accepted / design，贡献者和核心团队在这里敲定预期设计、架构约束，以及如何验证结果。

讨论定下来之后，issue 进入 Ready。此时智能体就可以写代码。实现进行中时，issue 进入 In progress；结果准备好让人确认是否有效时，进入 Verification。只有到那时才是 Done。没有实现已就绪 issue 的 PR 会被关闭，[反馈未处理](https://github.com/aaif-goose/goose/blob/main/CONTRIBUTING.md#ai-code-reviews)的 PR 也会被关闭。

这也改变了谁应该获得署名。报告问题、复现问题、贡献领域知识、塑造设计、实现方案和验证结果，都可以是有意义的工作。每个阶段有实质贡献的人，都应当被承认为[共同作者](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors)。开源贡献的单位不再是补丁，而是把一个问题一路带到经过验证的解决方案。如今，大部分贡献发生在 issue 里。
