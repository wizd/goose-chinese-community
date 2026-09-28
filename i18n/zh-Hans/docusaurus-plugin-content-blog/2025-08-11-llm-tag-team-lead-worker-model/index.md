---
title: "LLM 双打：谁规划，谁执行？"
description: 深入 goose 的 Lead/Worker 模型：一个 LLM 规划，另一个执行。这是一种能节省成本并提高效率的 AI 协作方法。
unlisted: true
authors: 
    - ebony
---

:::danger 已过时
Lead/Worker 模式已从 goose 中移除，取代它的规划模式也已移除。当前工作流见[多模型指南](/docs/guides/multi-model/)。
:::

![博客封面](header-image.png)

有没有想过，让两个 AI 模型像双打一样一起工作会发生什么？这正是我们在最新直播中测试的——让 goose 的 Lead/Worker 模型在一个真实项目上工作。剧透：它其实相当棒。

Lead/Worker 模型是那种纸面上看起来简单、实践中却带来惊人好处的功能。把它想成有一个项目经理和一个开发者完美和谐地工作——一个做战略思考，另一个亲手做实际实现。

<!-- truncate -->

## 这个 Lead/Worker 到底是什么？

不必让一个 LLM 做所有事，Lead/Worker 让你分担负荷。你的 lead 模型负责思考、决策和大局规划，而 worker 模型专注于执行——写代码、运行命令、让计划发生。魔力在于平衡：你可以把更强大（有时也更贵）的模型放在 lead 位置，让更快、更划算的那个承担重活。

人们喜欢的热门模型搭配：

  - GPT-4 + Claude Sonnet——平衡的智能和效率。
  - Claude Opus + GPT-3.5——有创意的规划加上快速执行。
  - GPT-4o + 本地模型——注重隐私的构建，数据留在内部。

## 为什么你会喜欢这种设置

- 💰 成本优化
用更便宜的模型做执行，把高级模型留给战略规划。你的钱包会感谢你。

- ⚡ 速度提升
从有能力的模型获得扎实的计划，然后让优化过的执行模型飞快完成实现。

- 🔄 混搭提供商
这才是真正酷的地方——你可以用 Claude 做推理、用 OpenAI 做执行，或任何适合你工作流的组合。

- 🏃‍♂️ 应对漫长的开发会话
非常适合那些马拉松式的编程会话，你需要持续的性能，又不想花光预算。

## 设置它

开始使用 Lead/Worker 模型出人意料地直接。在 goose 桌面应用中，你只需要：

1. **启用该功能**——在设置里找启用按钮
2. **选择你的 lead 模型**——选一个强大的来做规划（如 GPT-4）
3. **选择你的 worker 模型**——选一个高效的来做执行（如 Claude Sonnet）
4. **配置行为**——设置 worker 在咨询 lead 之前有多少轮

默认设置对大多数人很好用，但你可以自定义这些：
- **轮数**：worker 模型在拉入 lead 之前有多少次尝试
- **失败处理**：事情没有按计划进行时会发生什么
- **回退行为**：系统如何从问题中恢复

## 真实世界中的魔力

在我们的[直播](https://www.youtube.com/embed/IbBDBv9Chvg)中，我们处理了一个真实项目：给 MCP 服务器文档页面添加安装按钮。有趣的不只是最终结果，而是看两个模型如何协作。

lead 模型会分析需求、理解现有代码库结构并创建计划。然后 worker 模型会跳进来开始实现，做出实际的代码变更并处理技术细节。

### 项目：文档增强

我们想给我们的 MCP 服务器卡片添加安装按钮，类似于扩展页面上已有的。我们需要弄清如何添加这个功能，而不破坏现有工作流。

Lead/Worker 模型帮助我们完成了这些：
- **分析现有文档结构**
- **确定最佳方法**（创建自定义页面，还是修改现有页面）
- **实现解决方案**，带有正确的路由和样式
- **处理边界情况**，例如在添加安装功能的同时保留教程链接

## 开发者体验

真正突出的一点是交互感觉多么自然。你不必不断切换上下文或管理不同工具。你只要描述你想要什么，系统会找出划分工作的最佳方式。

lead 模型充当你的战略伙伴，worker 模型成为你的实现搭档。这就像结对编程，但 AI 模型从不会累，也不需要咖啡休息。

## 来自我们这场的专业技巧

### 从好的 goose hints 开始
我们总是建议设置你的 [goosehints](/docs/guides/context-engineering/using-goosehints)，以提供关于项目的上下文。这让你不必一遍又一遍重新解释同样的事。

### 不要微观管理
让 lead 模型去做它的规划。有时最好的结果来自给出高层方向，让系统自己弄清细节。

### 用 Git 保安全
试验时始终在分支上工作。模型很聪明，但有这张安全网意味着你可以对请求更大胆。

### 视觉反馈有帮助
虽然桌面 UI 不像 CLI 那样清楚地显示模型切换，你仍然可以通过展开工具输出来跟上，看看引擎盖下发生了什么。

## 结果自己说话

到我们这场结束时，我们：
- ✅ 成功给我们的 MCP 服务器文档添加了安装按钮
- ✅ 保留了所有现有功能（教程链接仍然有效）
- ✅ 用更好的视觉层次改善了用户体验
- ✅ 把内容组织成合乎逻辑的部分（社区服务器与内置服务器）

最好的部分？模型做出了我们甚至没想到的聪明决定，比如自动给服务器分类，并改善整体页面布局。

## 准备好试试多模型工作流了吗？

Lead/Worker 模式已被移除，但 goose 仍然支持[多模型工作流](/docs/guides/multi-model/)。无论你在做文档、构建功能，还是处理复杂重构，把一个强推理模型和一个快速执行模型搭配，都可以改变局面。

想看它实际运行？查看我们现场构建这个功能的完整直播：

<iframe class="aspect-ratio" width="560" height="315" src="https://www.youtube.com/embed/IbBDBv9Chvg" title="LLM 双打：谁规划，谁执行？" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

有问题，或想分享你自己的 Lead/Worker 成功故事？加入我们的 [Discord 社区](https://discord.gg/n8R5VaWDAn)——我们很想听听你在构建什么！


<head>
  <meta property="og:title" content="LLM 双打：谁规划，谁执行？" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/08/11/llm-tag-team-lead-worker-model" />
  <meta property="og:description" content="深入 goose 的 Lead/Worker 模型：一个 LLM 规划，另一个执行。这是一种能节省成本并提高效率的 AI 协作方法。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/header-image-bed3ed59a52ea231c1da0707b9b6d287.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="LLM 双打：谁规划，谁执行？" />
  <meta name="twitter:description" content="深入 goose 的 Lead/Worker 模型：一个 LLM 规划，另一个执行。这是一种能节省成本并提高效率的 AI 协作方法。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/header-image-bed3ed59a52ea231c1da0707b9b6d287.png" />
</head>
