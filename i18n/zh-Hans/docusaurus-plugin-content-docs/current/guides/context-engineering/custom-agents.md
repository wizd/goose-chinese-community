---
title: 自定义代理
sidebar_position: 3
sidebar_label: 自定义代理
---

自定义代理是针对特定角色、行为或专业领域的可复用 goose 配置。每个代理打包了名称、描述、可选的模型偏好和指令，让你可以快速让 goose 以专门角色工作，例如代码审查者、文档作者、测试规划者或发布助手。

当你希望在多个会话中使用同一角色或行为，而不必反复输入相同指令时，使用自定义代理。

## 创建代理文件

代理以带 YAML frontmatter 的 Markdown 文件存储。你可以直接在编辑器中创建或编辑这些文件。

全局代理在各个 goose 会话中都可用：

```text
~/.agents/agents/
```

项目代理在 goose 于该项目中工作时可用：

```text
<project>/.agents/agents/
```

:::note 兼容路径
goose 也会从 `.goose/agents/`、`.claude/agents/`、`~/.goose/agents/`、`~/.claude/agents/`、goose 平台特定的配置代理目录，以及项目本地的 `.agents/agents/` 发现代理。新的共享代理应使用 `.agents/agents/` 作为项目代理，或使用 `~/.agents/agents/` 作为全局代理。
:::

如果目录尚不存在，请先创建，然后为你的代理添加一个 Markdown 文件：

```markdown title="~/.agents/agents/code-reviewer.md"
---
name: code-reviewer
description: Reviews code for correctness, maintainability, and risk
model: gpt-5.5
---

You are a senior code reviewer. Review changes for correctness, maintainability, security, and test coverage. Be direct, prioritize issues by severity, and suggest concrete fixes.
```

Frontmatter 支持：

| 字段 | 是否必需 | 说明 |
|---|---:|---|
| `name` | 是 | 用于列出、加载、提及或委派给该代理的名称。 |
| `description` | 否 | 列出代理时显示的简短摘要。 |
| `model` | 否 | 该代理偏好的模型。 |

Frontmatter 中只有 `name` 是必需的。`description` 和 `model` 可选。Markdown 正文是代理的指令；如果你希望该代理在聊天中作为可用来源出现，正文不应为空。

## 使用代理

创建代理文件后，从能够发现该代理的工作目录启动 goose。项目代理从当前工作目录发现，全局代理从你的主目录/配置目录发现。

### 列出可用代理

在 goose 聊天会话中，让 goose 列出可用来源：

```text
list available sources
```

这是给 goose 的提示，不是终端命令。当来源加载可用时，goose 会把可发现的代理与配方和子配方一起列出。

你可以通过提及名称来调用代理：

```text
@code-reviewer review the current diff
```

或者让 goose 使用它：

```text
Use the code-reviewer agent to review this pull request.
```

在带提及选择器的聊天界面中，输入 `@` 并按名称选择代理，例如 `code-reviewer`。

### 把工作委派给代理

当你希望由一个隔离的专家执行任务，并把结果返回当前对话时，使用自定义代理。

```text
Delegate to code-reviewer: review the current diff and identify the highest-risk issues.
```

或者，如果你在编写直接调用委派工具的提示，把代理的 `name` 用作来源：

```text
Use the code-reviewer agent to review this pull request.
```

被委派的代理在单独的会话中运行，使用代理文件中的指令。它可以使用代理 frontmatter 中指定的模型。有些界面还允许你在委派时覆盖模型、提供商、温度或最大轮次等设置。

### 把代理指令加载到当前对话

当你希望当前对话采用代理的指令，而不另开委派会话时，把代理作为已加载的上下文使用。

```text
Load the code-reviewer agent, then review this change.
```

加载代理会把它的指令加入当前对话上下文。委派给代理则会单独运行它并返回结果。

## 示例代理

### 代码审查者

```markdown title="~/.agents/agents/code-reviewer.md"
---
name: code-reviewer
description: Reviews code for correctness, maintainability, and risk
model: gpt-5.5
---

You are a senior code reviewer. Review changes for correctness, maintainability, security, and test coverage.

Prioritize:
- bugs and correctness issues
- security or privacy risks
- missing tests
- unnecessary complexity
- unclear naming or structure

Be direct. Group findings by severity and suggest concrete fixes.
```

### 文档作者

```markdown title="~/.agents/agents/docs-writer.md"
---
name: docs-writer
description: Writes clear developer documentation
---

You are a developer documentation writer. Explain features clearly, use practical examples, and avoid marketing language.

When writing docs:
- start with what the user can accomplish
- show the shortest working example
- explain important options after the example
- call out limitations and prerequisites
```

## 何时使用代理、技能或配方

| 用途 | 最适合 |
|---|---|
| 为某项任务改变 goose 的角色、语气或指令 | 自定义代理 |
| 教 goose 一套可复用的工作流或领域流程，供其按需加载 | [技能](/docs/guides/context-engineering/using-skills) |
| 把可重复的任务与提示词、设置、扩展和参数打包在一起 | [配方](/docs/guides/recipes) |
| 把工作委派给另一个隔离的 goose 实例 | [子代理](/docs/guides/context-engineering/subagents) |

代理定义 goose 在某项任务中应当成为谁。技能和配方定义 goose 应当知道或做什么。

### 自定义代理可以按计划运行吗？

不能直接做到。自定义代理是可复用的角色，不是计划任务。要按计划运行某件事，请创建[配方](/docs/guides/recipes)并调度该配方。如果希望计划任务表现得像自定义代理，把代理的指令放进配方，或让配方委派给该代理。

### 自定义代理有工作流吗？

没有。自定义代理定义 goose 在某项任务中应当成为谁：它的角色、行为、指令和可选的模型偏好。它不定义分步工作流。当你需要可重复的步骤、参数、扩展配置或计划执行时，使用配方。

### 自定义代理可以使用技能吗？

可以。自定义代理可以使用会话中可用的技能。技能仍通过 goose 的常规技能行为被发现和加载，因此当请求匹配某个技能，或你明确要求使用某个技能时，代理可以使用它。

### 自定义代理可以运行配方吗？

自定义代理本身不包含也不会自动运行配方。你可以用配方启动 goose，在相关工具可用时让 goose 加载或委派配方，或者创建一份把自定义代理指令作为工作流一部分的配方。

### 自定义代理可以使用 MCP 服务器吗？

可以。自定义代理可以使用当前会话中已启用的 MCP 服务器和扩展。代理文件本身不定义单独的 MCP 服务器列表。如果需要一套带特定扩展集合的可复用配置，请使用配方。

### 自定义代理可以调用子代理吗？

可以，只要会话中有委派工具。自定义代理可以像默认 goose 代理一样，让 goose 把工作委派给子代理。被委派的子代理在隔离会话中运行，不会自动继承完整的父对话。

### 一个自定义代理可以调用另一个自定义代理吗？

可以，通过委派。例如，一个自定义代理可以按名称把任务委派给另一个可发现的自定义代理。这适合专门代理之间的一次性协作。

对于可重复的链条，使用明确定义顺序的配方，例如先委派给审查代理，再委派给文档代理，然后合并结果。
