---
title: 研究 → 规划 → 实现模式
description: 如何在复杂软件项目上使用 RPI 这种上下文工程技巧
---

import CodeBlock from '@theme/CodeBlock';
import researchDoc from '../../../../../static/files/thoughts/research/2025-12-22-llm-tool-selection-strategy.raw';
import planDoc from '../../../../../static/files/thoughts/plans/2025-12-23-remove-tool-selection-strategy.raw';


大多数人使用 AI 智能体时会直接进入执行：“重构这段代码”、“移除这个功能”、“添加这个新功能”。这有时效果很好，尤其是较小的改动或代码库，但在复杂改动上往往会垮掉。

**[RPI（Research、Plan、Implement）](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md)** 由 HumanLayer 提出，提供了另一种与 AI 智能体协作的方式。这种方法用速度换取清晰、可预测和正确性。

本教程通过一次真实演示说明 RPI 如何工作。读完之后，你应该能在自己的代码库上运行同样的工作流。

## 前提条件

<details>
<summary>1. 导入 RPI 配方</summary>

复制下面的片段并粘贴到终端。这会下载主要的 RPI 配方及其子配方，并保存到全局配方目录。

```sh
mkdir -p ~/.config/goose/recipes/subrecipes

curl -sL https://raw.githubusercontent.com/aaif-goose/goose/main/documentation/src/pages/recipes/data/recipes/rpi-research.yaml -o ~/.config/goose/recipes/rpi-research.yaml
curl -sL https://raw.githubusercontent.com/aaif-goose/goose/main/documentation/src/pages/recipes/data/recipes/rpi-plan.yaml -o ~/.config/goose/recipes/rpi-plan.yaml
curl -sL https://raw.githubusercontent.com/aaif-goose/goose/main/documentation/src/pages/recipes/data/recipes/rpi-implement.yaml -o ~/.config/goose/recipes/rpi-implement.yaml
curl -sL https://raw.githubusercontent.com/aaif-goose/goose/main/documentation/src/pages/recipes/data/recipes/rpi-iterate.yaml -o ~/.config/goose/recipes/rpi-iterate.yaml

curl -sL https://raw.githubusercontent.com/aaif-goose/goose/main/documentation/src/pages/recipes/data/recipes/subrecipes/rpi-codebase-locator.yaml -o ~/.config/goose/recipes/subrecipes/rpi-codebase-locator.yaml
curl -sL https://raw.githubusercontent.com/aaif-goose/goose/main/documentation/src/pages/recipes/data/recipes/subrecipes/rpi-codebase-analyzer.yaml -o ~/.config/goose/recipes/subrecipes/rpi-codebase-analyzer.yaml
curl -sL https://raw.githubusercontent.com/aaif-goose/goose/main/documentation/src/pages/recipes/data/recipes/subrecipes/rpi-pattern-finder.yaml -o ~/.config/goose/recipes/subrecipes/rpi-pattern-finder.yaml
```
</details>

<details>
<summary>2. 添加自定义斜杠命令</summary>

配方导入后，要在会话中快速调用它们，请为以下每个配方[添加自定义斜杠命令](/docs/guides/context-engineering/slash-commands)：

| 配方 | 斜杠命令 |
|--------|---------------|
| RPI Research Codebase | `research_codebase`|
| RPI Create Plan | `create_plan` |
| RPI Implement Plan | `implement_plan` |
| RPI Iterate | `iterate_plan` |
</details>

## RPI 工作流

在 goose 中，我们使用结构化的 RPI 工作流和配方，系统性地处理复杂的代码库变更。该工作流由斜杠命令组成，引导 goose 经过有纪律的工作阶段：

1. `research_codebase` – 记录今天存在的内容。不发表意见。
2. `create_plan` - 设计变更，包含清晰的阶段和成功标准。
3. `implement_plan` - 逐步执行计划并验证。
4. `iterate_plan` – （可选）必要时调整计划。

```md
┌─────────────────────────────────────────────────────────────────────────────-┐
│                           RPI WORKFLOW                                       │
├─────────────────────────────────────────────────────────────────────────────-┤
│                                                                              │
│  /research_codebase "topic"                                                  │
│       │                                                                      │
│       ├──► Spawns parallel sub-agents:                                       │
│       │    • find_files (rpi-codebase-locator)                               │
│       │    • analyze_code (rpi-codebase-analyzer)                            │
│       │    • find_patterns (rpi-pattern-finder)                              │
│       │                                                                      │
│       └──► Output: thoughts/research/YYYY-MM-DD-HHmm-topic.md                │
│                                                                              │
│  /create_plan "feature/task"                                                 │
│       │                                                                      │
│       ├──► Reads research docs                                               │
│       ├──► Asks clarifying questions                                         │
│       ├──► Proposes design options                                           │
│       │                                                                      │
│       └──► Output: thoughts/plans/YYYY-MM-DD-HHmm-description.md             │
│                                                                              │
│  /implement_plan "plan path"                                                 │
│       │                                                                      │
│       ├──► Executes phase by phase                                           │
│       ├──► Runs verification after each phase                                │
│       ├──► Updates checkboxes in plan                                        │
│       │                                                                      │
│       └──► Working code                                                      │
│                                                                              │
│  /iterate_plan "plan path" + feedback                                        │
│       │                                                                      │
│       ├──► Researches only what changed                                      │
│       ├──► Updates the plan surgically                                       │
│       │                                                                      │
│       └──► Updated plan                                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────-┘
```

所有 RPI 输出都放在可预测的位置：

```md
thoughts/
├── research/
│   └── YYYY-MM-DD-HHmm-topic.md
└── plans/
    └── YYYY-MM-DD-HHmm-description.md
```

## 任务

在本教程中，我想从一个大型代码库中移除一个现有功能。

这不是小改动。该功能涉及：

- 核心 Rust 代码
- TypeScript
- 配置
- 测试
- 文档

这正是智能体经常吃力的任务类型，不是因为它们做不到，而是因为工作跨越了太多上下文，无法安全地“直接去做”。

所以我们不直接跳到实现，而是使用 RPI。

## 会话 1：研究

实现之前先规划，已经成为广泛接受的做法。然而，没有研究的规划会导致事后反噬的假设。因此在 RPI 中，我们从研究开始。

我用 `/research_codebase` 命令开始提示，后面跟着用自然语言写出的主题

```
/research_codebase "look through the cloned goose repo and research how the LLM Tool Discovery is implemented"
```


这条命令调用 **[RPI Research Codebase](https://raw.githubusercontent.com/aaif-goose/goose/refs/heads/main/documentation/src/pages/recipes/data/recipes/rpi-research.yaml)** 配方，它的职责非常严格：

- 记录存在的内容
- 不建议改动
- 不批评
- 不规划

使用这个配方时，goose 会自动派生三个并行子智能体：

- `find_files`：使用代码库定位器找出相关文件所在的位置。
- `analyze_code`：完整阅读这些文件，并记录它们如何工作。
- `find_patterns`：在仓库其他地方寻找类似功能或约定。

这些子智能体独立运行并汇报。你不必自己编排。

:::info 一次方向修正
goose 开始研究后，我注意到它在研究泛泛的“工具发现”。但我只想移除一个叫做 Tool Selection Strategy 的特定功能。于是我停止了 goose，并用更准确的主题重新进行研究。

这不是失败。事实上，这正是研究存在的原因。如果我让 goose“移除 LLM Tool Discovery 功能”，它可能也会移除我们其他的工具发现方法。幸运的是，尽早发现这类错误代价很低，也容易恢复。
:::

`/research_codebase` 会话的输出是一份详细的研究文档：

<details>
<summary>./thoughts/research/2025-12-22-llm-tool-selection-strategy.md</summary>

<CodeBlock language="markdown">
{researchDoc}
</CodeBlock>

</details>

这是一个很大的结构化文件，包含：
- Git 元数据
- 文件和行号引用
- 流程描述
- 关键组件
- 未决问题

把它看作该功能今日面貌的技术地图。还没有任何改动，这是有意的。唯一目标是形成共同理解。

作为循环中的人，一定要审阅研究结果！它会为计划提供依据，所以你要确保它准确。

## 会话 2：规划

研究完成后，进入规划。

:::tip 会话
每个阶段都在新会话中进行很重要，这样大语言模型才能高度聚焦于手头的任务。每个会话一个目标！
:::

```
/create_plan a removal of the Tool Selection Strategy feature
```

**[RPI Create Plan](https://raw.githubusercontent.com/aaif-goose/goose/refs/heads/main/documentation/src/pages/recipes/data/recipes/rpi-plan.yaml)** 配方首先阅读 goose 创建的研究文档。

然后它做了三件关键的事：

1. **提出澄清问题**

    例如：
    - 完全移除还是弃用？
    - 配置清理应该如何表现？
    - 是否应该重新生成 OpenAPI 产物？
    - 相关测试在哪里？

2. **给出设计选项**
    
    在有多种合理做法时，goose 把它们列出来，并请我选择。

3. **产出分阶段的实现计划**


输出是一份详细计划：

<details>
<summary>thoughts/plans/2025-12-23-remove-tool-selection-strategy.md</summary>

<CodeBlock language="markdown">
{planDoc}
</CodeBlock>

</details>

该计划包括：
- 10 个明确阶段
- 确切的文件路径
- 展示要移除什么的代码片段
- 自动化成功标准
- 手动验证步骤
- 用于跟踪进度的复选框

此时，计划成为事实来源。这里的关键转变是，我们从理解走向决策，但仍然不碰代码。

计划足够明确，别人也可以执行它。这不是偶然。记住，实现会在一个全新的会话中进行，所以计划必须有足够的上下文才能真正执行。

同样，作为人，你需要在这里介入，审阅计划并确认它扎实。如果有任何不对的地方，不必从头开始，可以运行 **[RPI Iterate Plan](https://raw.githubusercontent.com/aaif-goose/goose/refs/heads/main/documentation/src/pages/recipes/data/recipes/rpi-iterate.yaml)** 计划（`/iterate_plan`），并说明哪里有问题。goose 随后会阅读现有计划，只研究需要重新思考的部分，提出有针对性的更新，并相应编辑计划。

## 会话 3：实现

只有在研究和规划都完成后，才应进入实现。传入计划文档。

```
/implement_plan thoughts/plans/2025-12-23-remove-tool-selection-strategy.md
```

**[RPI Implement Plan](https://raw.githubusercontent.com/aaif-goose/goose/refs/heads/main/documentation/src/pages/recipes/data/recipes/rpi-implement.yaml)** 配方故意很乏味。事实上，goose 运行它的时候我睡着了。实现应该感觉像机械操作。如果它感觉有创造性，说明上游缺了什么。但既然你有一份扎实的计划，我建议在 goose 工作时去做点别的（除非计划中有手动步骤）。

它会完整阅读计划，按顺序执行各阶段，每个阶段后运行验证，并在进行过程中直接更新计划文件中的复选框。

最后这一点非常有帮助，因为我的上下文窗口中途满了，而 goose 能够压缩上下文，并凭借计划中的状态更新从离开的地方继续。

## 最终结果

跨越 32 个文件的 10 个工作阶段中，研究阶段用了 9 分钟，规划阶段用了 4 分钟，实现阶段用了 39 分钟。所以总共不到一小时……确切地说是 52 分钟。这包括 goose 的工作和测试，以及我回答问题。

绝对不是一个快的过程。但是！当我提交[这个 PR](https://github.com/aaif-goose/goose/pull/6250)时，构建通过了，单独的代码审查智能体一条评论都没有。工作就是做得这么好。

如果没有 AI，我自己做很可能要花好几个小时，因为这个功能复杂且深度集成。而如果让 AI 直接跳到实现，我毫不怀疑它一定会偏离并搞砸某些东西。

所以，虽然 RPI 比让 AI 马上开工更慢，但质量是一流的。这是非常值得的交换。


## 何时使用 RPI

对于基本任务，RPI 可能过重。尤其因为它不是一个很快的过程。不过，如果你需要完成跨越多个文件的复杂任务，它是很好的选择。

你可以把 RPI 用于：
- 重构
- 迁移
- 功能添加
- 大型升级
- 事故清理
- 文档大修

亲自试试吧！
