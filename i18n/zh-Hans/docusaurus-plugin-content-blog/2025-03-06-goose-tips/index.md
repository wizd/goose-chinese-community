---
title: 使用 goose 的 6 条必要技巧
description: 帮助你更有效、更高效地使用 goose 的实用技巧。
authors: 
    - angie
---

![goose 技巧](goose-tips.png)

和 AI 智能体一起工作有时会感觉难以预测。过去几个月大量使用 goose 之后，我整理了几条关键技巧，帮助你从这个工具中获得最多。无论你的工作流是什么，这些原则都会帮助你更高效地与 goose 协作。


<!--truncate-->

## 1. 让会话保持聚焦和简短

用户最常见的错误之一，是试图在单次会话里完成太多事。持续把对话进行下去看起来高效，但更长的会话实际上会拖累 goose 的表现。

每条消息都会加入上下文窗口，也就是 goose 在任一时刻能保留的对话历史量。这段历史由 token 组成，token 是 goose 为生成回应而处理的文本片段（词，甚至词的一部分）。更多 token 不只增加处理时间，也会增加 LLM 使用成本。一旦上下文窗口填满，更早的消息会被挤出去，这可能导致丢失重要细节，或出现意外行为。

把它想成开了太多浏览器标签。最终会影响性能。相反，为不同的任务开始新会话。不必担心丢失上下文；这正是 [Memory 扩展](/docs/mcp/memory-mcp) 的用途。让会话保持聚焦和简洁，能确保回应更准确、更相关，同时也把 LLM 成本控制住。


## 2. 尽量减少处于活动状态的扩展

说到 goose 扩展，少往往就是多。启用[每一个可用扩展](https://www.pulsemcp.com/servers)以防万一很诱人（我自己也犯过这个错！），但这种方式可能适得其反。每个活动扩展都会加入系统提示，增加复杂度，让 goose 更难决定使用哪些工具。

想想看：如果你在厨房做饭，把每一种可能的用具和电器都摊在台面上，并不会让你成为更好的厨师。它只会造成杂乱和困惑。同样的原则在这里也适用。

尽管去安装任何你感兴趣的扩展，但在需要之前[让它们保持禁用](/docs/getting-started/using-extensions#enablingdisabling-extensions)。先启用内置的 [Developer 扩展](/docs/mcp/developer-mcp)，它本身就已经出人意料地强大，只在需要特定能力时再启用其他扩展。这会带来更快的回应、更低的 token 用量，以及往往更聚焦的解决方案。

:::tip 额外技巧
开始复杂任务之前，先问问 goose 它当前的能力。一条简单提示，比如「你有可以处理［特定技术/服务］的工具吗？」可以节省时间，避免错误的开始。goose 可以告诉你它是否拥有完成任务所需的工具；如果没有，会建议你可能需要启用哪些扩展。这个快速检查能确保你在深入之前已经准备好合适的工具。
:::

## 3. 用 .goosehints 文件教 goose


goose 最强大的功能之一，是通过 [.goosehints](/docs/guides/context-engineering/using-goosehints) 文件理解上下文，它像一份「给 AI 的 README」。这些提示可以设在项目级和全局级，用来引导 goose 的回应。

在项目级，把 .goosehints 文件放在目录里，帮助 goose 理解你的结构、约定和特殊考虑。你甚至可以使用多个文件——根目录一份做总体指导，特定目录里再放其他文件做更细的说明（例如前端样式约定）。

除了项目，全局 .goosehints 文件（`~/.config/goose/.goosehints`）适用于所有会话，非常适合这些内容：

* 个人编码风格偏好
* 喜欢的工具和工作流
* 标准测试实践
* 文档约定
* Git 提交信息格式

## 4. 为你的工作流选择合适的模式

goose 提供[不同模式](/docs/guides/managing-tools/goose-permissions)，决定它在修改文件、使用扩展和执行自动化操作时有多少自主权。

* ⚡️ **自动模式（默认）：** goose 可以修改、创建和删除文件，以及使用扩展，无需批准。最适合想要无缝自动化的用户。

* ✅ **批准模式：** goose 在做出变更前会请求确认。启用 [Smart Approve](/docs/guides/managing-tools/goose-permissions#permission-modes) 后，它会评估风险等级，对高风险操作提示确认，同时自动执行安全操作。

* 💬 **聊天模式：** goose 只在聊天中运行，不修改文件，也不使用扩展。适合想要 AI 协助但不想要自动化的用户。

如果你是 goose 新手，或正在做关键项目，批准模式在自动化和监督之间提供了很好的平衡。对于放手的工作流，自动模式让事情继续推进；聊天模式则非常适合头脑风暴和一般的 AI 协助。

## 5. 用分步执行引导 goose

复杂任务最好分阶段处理，当你允许 goose 把问题拆成可管理的步骤时，它表现最好。不要期望立刻得到解决方案，先让 goose 生成一份分步计划。审阅计划，确保它与你的目标一致，然后让 goose 按顺序执行每一步。

这种结构化方法不仅提高准确度，也让你对过程有更多控制。你可以按需要暂停、调整或细化每一步，在确保更好结果的同时拥有更多控制。

## 6. 通过打磨和迭代获得更好的回应

goose 很强大，但像任何 AI 一样，它有时需要再过一遍才能做对。如果你没有得到需要的回应，试着细化提示，或让 goose 调整它的回答。

好的迭代技巧包括：

* 让 goose 在行动前解释它的推理
* 要求替代方案，以便比较不同做法
* 要求它逐步拆解思考过程
* 改写提示，加入更多细节或约束

例如，不要问「帮我调试这个错误」，试着说：「我的 Java 方法里出现了 NullPointerException。这是堆栈跟踪。可能是什么原因？」提问方式的一点小调整，就能大幅提高回应质量。

---

遵循这些技巧，你就能更有效地与 goose 协作，用更少的资源得到更好的结果。记住，目标是高效、有效地解决问题。无论你是在写代码、自动化任务，还是管理复杂项目，这些原则都会帮助你充分利用 goose 所能提供的一切。

<head>
  <meta property="og:title" content="使用 goose 的 6 条必要技巧" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/03/06/goose-tips" />
  <meta property="og:description" content="帮助你更有效、更高效地使用 goose 的实用技巧。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/goose-tips-4add28cc7201737dfb468ad11980f070.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="使用 goose 的 6 条必要技巧" />
  <meta name="twitter:description" content="帮助你更有效、更高效地使用 goose 的实用技巧。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/goose-tips-4add28cc7201737dfb468ad11980f070.png" />
</head>
