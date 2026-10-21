---
title: "智能体状态机"
description: "goose 正在用可重入状态机替换经典的智能体循环：对话就是状态，每一种行为都是一个 Operation。"
image: /img/blog/agentic-state-machines.jpg
authors:
  - douwe
featured: true
---

![一只 goose 从缠成一团的智能体循环，走进一排整齐的机器](/img/blog/agentic-state-machines.jpg)

[goose 发布](https://github.com/aaif-goose/goose/blob/dd126afa6c73fe01ad4991a6b45a6d027cb02b29/README.md)已经很久了。狗年都比不上智能体年。goose 比通用的智能体式 AI 还稍微早一点。这一切背后最初的想法是：如果把一个 shell 会话的控制权交给 LLM，会发生什么？

结果，有意思的事发生了。模型写一条命令，命令跑起来，结果回到对话里，模型再决定下一步做什么。我们的工具调用从那场实验里自然长出来，如今坐在大多数编程智能体中心的智能体循环也是如此。

后来工具调用有了正式形态，[MCP 出现了](https://www.anthropic.com/news/model-context-protocol)。[批准](/docs/guides/managing-tools/tool-permissions)、[上下文管理](/docs/guides/sessions/smart-context-management)、[待办列表](/docs/mcp/todo-mcp)、Top of Mind、[子代理](/docs/guides/context-engineering/subagents)、重试、[钩子](/docs/guides/context-engineering/hooks)、[技能](/docs/guides/context-engineering/using-skills)、[配方](/docs/guides/recipes)和转向也跟着来了。最初的智能体循环却还在。每加一个功能，就多一个分支、一个局部变量，或一个特例。一轮之内可能同时有十几种不同的关切在起作用，而且彼此影响。取消必须知道当前在跑的是推理还是工具。压缩必须理解提供商错误和用量。工具可以改写提示词。停止钩子可以把一份已经完成的回答变回更多工作。循环开始缠成一团意大利面。

<!-- truncate -->

[插件系统](/docs/guides/context-engineering/plugins)看起来像自然的答案。它能帮到一定地步：加一个工具，或监听一个事件，都很合适。可一旦某个插件需要影响整一轮，中央循环仍然得决定它何时运行、它给提示词贡献什么、它能不能让这一轮继续，以及它的状态如何熬过一次重启。插件 API 渐渐为智能体循环的每一部分都长出一个钩子，循环却仍然负责把它们全部协调起来。

goose 走了另一条路。我们已经[用可重入状态机替换了经典的智能体循环](https://github.com/aaif-goose/goose/pull/9574)。持久化的对话是主要状态，每一段智能体行为都被编码成一个 [`Operation`](https://github.com/aaif-goose/goose/blob/main/crates/goose-agent/src/operation.rs)。状态机按顺序检查各个 Operation。每一个要么跳过，要么返回一组效果，第一个适用的赢得这一步。它的效果被持久化，状态机带着新状态从头再来。

看一次普通的工具调用。推理看到最后一条消息来自用户，于是产出一条请求工具的助手消息。下一步，批准 Operation 最先得到检查它的机会。如果需要批准，它往对话里加一条请求，然后把控制交还给客户端。用户做决定的时候，没有任何东西还在跑。客户端稍后存下回答，一台新构造的状态机从那里继续。如果不需要批准，这个 Operation 就跳过。然后工具执行 Operation 认出这个工具并运行它，把结果加进对话。推理看到工具响应，再问模型下一步做什么。当模型终于给出回答、不再请求另一个工具时，停止钩子 Operation 决定这一轮能不能结束。

这种可重入的意义不止于代码组织。服务器不必在等待输入时，让一个协程和它全部的局部变量一直活着。进程可以重启，并从最后一次持久化的步骤继续。另一个前端可以加载同一个会话，接着往下做。便利运行器仍然会重复步骤，直到状态机让出控制，但它只是包在一台状态机外面的小驱动器，而这台状态机可以一次只被调用一步。

各个 Operation 彼此独立，又互相配合。工具处理器只认领它知道如何执行的工具。如果它不认识某一个，它就跳过，把机会让给另一个 Operation。最后的未知工具 Operation 把剩下的任何东西变成给模型的错误。同样的归属不止于执行。技能 Operation 拥有列出技能的命令、加载某一个技能的工具，以及告诉模型有哪些技能的提示词文本。去掉这个 Operation，这三样会一起消失。

推理很特殊，但它仍然是一个 Operation。调用模型之前，它会从流水线里的每一个 Operation 收集工具、提示词片段和 Top of Mind。最大轮次 Operation 可以告诉模型，预算快用完了。配方 Operation 可以加上一个最终输出工具。技能 Operation 可以向模型说明有哪些可用技能。推理不需要知道这些贡献各自从哪来。

另一个有用的区分，是[效果](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/agents/state_machine/effects.rs)和[事件](https://github.com/aaif-goose/goose/blob/main/crates/goose-agent/src/events.rs)。事件是实时流：一段文本、一条工具通知，或客户端应该立刻看到的用量更新。效果是持久结果：追加这条消息，替换这段对话，更新这个工具请求，或记下这次用量。调用方可以让状态机只走一步，再决定如何应用这些效果；也可以用便利运行器持续应用步骤，直到状态机把控制交还给客户端。

测试因此容易得多。我们拿完整的一组 Operation，对着[一台行为像模型提供商的小型 HTTP 服务器](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/agents/state_machine/tests/dummy_api.rs)和[一个真正有状态的计算器扩展](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/agents/state_machine/tests/calculator_extension.rs)来测。我们还有[一个测试运行器，每应用一步就把整台状态机扔掉](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/agents/state_machine/tests/pipeline.rs)，再从持久化的会话构造一台新的。如果一次工具调用仍然能从请求走到响应，再走到最终回答，我们就知道进度真的记在状态里，而不是藏在某个局部变量中。

并不是所有状态都消失了。提供商、扩展管理器和钩子仍然是运行时依赖。待处理的转向仍然从内存队列开始。外部副作用也需要小心：如果工具成功了，进程却在它的响应被持久化之前崩溃，重建状态机并不会让这个工具可以安全地再跑一次。有用的变化是，这些边界现在看得见了，不再混在一个长时间运行的协程里。

结果是一个更容易测试、重构和试验的代码库。改变智能体的新想法可以表达成一个 Operation，加进流水线，而不必改状态机核心。最初的智能体循环把 goose 带得意外地远。现在我们可以改变智能体的行为方式，而不必再给它加一个分支。
