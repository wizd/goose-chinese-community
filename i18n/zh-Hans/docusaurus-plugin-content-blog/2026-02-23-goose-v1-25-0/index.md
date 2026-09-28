---
title: "goose v1.25.0：沙箱、精简，并且更安全"
description: "goose v1.25.0 带来 macOS 沙箱、统一的 summon 扩展、丰富的 MCP 应用 UI、智能体 CLI 升级，以及 SLSA 构建来源证明。"
authors:
  - debbie
image: /img/blog/goose-v1-25-0.png
---

![goose v1.25.0 发布的横幅图](/img/blog/goose-v1-25-0.png)

goose v1.25.0 来了，这是我们迄今最重要的发布之一。这个版本带来用于增强安全的 macOS 沙箱、统一 summon 扩展带来的重大架构简化、MCP 应用的丰富 UI 渲染，以及一波对智能体 CLI 提供商的改进。无论你跑的是 goose Desktop 还是 CLI，这次发布里都有给你的东西。

让我们拆开有什么新内容。

<!--truncate-->

<iframe class="aspect-ratio" src="https://www.youtube.com/embed/9tbYbUkvxW0" title="goose v1.25.0 发布要点" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## 🔒 macOS 沙箱

:::danger 已过时
本节描述的 macOS seatbelt 沙箱是实验性的，并且已被移除。`goose` 服务器进程（执行工具的那个）以与你的用户账号相同的权限运行，在操作系统层面**没有**被沙箱隔离。安全控制见 [`GOOSE_MODE`](/docs/guides/environment-variables#tool-configuration)（`approve`、`smart_approve`），用来限制哪些工具可以不经确认就运行。
:::

**v1.25.0 的头条功能，是 goose Desktop 在 macOS 上可选的安全沙箱。**

goose Desktop 增加了一个可选的 macOS 沙箱（通过 `GOOSE_SANDBOX=true` 启用），由 [seatbelt](https://github.com/michaelneale/agent-seatbelt-sandbox) 驱动，这是 Apple 用来沙箱化自己应用的同一底层技术。

它当时提供的是：

- **文件系统限制：** 可以限制 goose 读写哪些目录，防止它修改自己的配置，或访问项目之外的敏感区域。
- **网络可见性：** 你可以跟踪并限制 goose 访问哪些 URL。
- **零开销：** 沙箱使用 macOS 内置的 `sandbox-exec` 设施，所以没有性能惩罚。
- **适用于任何工具：** 因为沙箱发生在操作系统层面，无论 goose 使用哪些 MCP 扩展或工具，它都适用。

## 🧩 统一的 Summon 扩展

**我们用一个统一的 [“Summon” 扩展](https://goose-docs.ai/docs/mcp/summon-mcp) 取代了两套独立系统（子智能体和 Skills）。**

以前，goose 有两种不同的委托工作机制：[子智能体](https://goose-docs.ai/docs/tutorials/subagents)（用于拉起独立的子任务）和 Skills（用于加载预定义能力）。它们以令人困惑的方式重叠，让系统更难理解。

新的 **Summon** 扩展把两个概念统一成两个干净的工具：

- **`load`**：把 Skills 和配方加载进 goose 的上下文，取代旧的 Skills 系统。
- **`delegate`**：把任务委托给一个独立运行、有自己上下文的子智能体，取代旧的子智能体系统。支持临时指令、预定义的子配方，或两者结合。

这种简化意味着：
- 要理解的是一个扩展，而不是两个
- goose 如何处理委托的心智模型更干净
- 子配方和 skills 自然地一起工作
- 旧的 skills 扩展现已弃用，如果仍然配置着，会被优雅地忽略

## 🖼️ MCP Apps UI 集成

**MCP 扩展现在可以直接在 goose Desktop 内部渲染丰富的交互式 UI。**

这次发布集成了 [`@mcp-ui/client`](https://www.npmjs.com/package/@mcp-ui/client) SDK 的 `AppRenderer`，大幅升级了 [MCP 应用](https://goose-docs.ai/docs/tutorials/building-mcp-apps) 如何显示内容。MCP 扩展不再限于文本输出，现在可以提供完整的 HTML/JavaScript 界面，[在聊天里内联渲染](https://goose-docs.ai/docs/guides/interactive-chat/mcp-ui)。

关键改进包括：
- **回退请求处理器支持。** 应用可以向 MCP 服务器发回请求以获取动态数据。
- **把 rmcp 升级到 0.15.0。** goose 现在向服务器宣告 MCP Apps UI 扩展能力。
- **独立 goose Apps 过滤。** Apps 页面现在过滤为只显示独立的 goose Apps，让发现更干净。

这打开了全新一类 MCP 扩展，它们可以就在你的 goose 会话里提供仪表盘、可视化、表单和其他交互体验。

## 📝 从 GUI 编辑配方的模型和提供商

**你现在可以直接在 goose Desktop 里[编辑配方的](https://goose-docs.ai/docs/guides/recipes/session-recipes#edit-recipe)模型、提供商和扩展。不需要编辑 YAML。**

[配方](https://goose-docs.ai/docs/tutorials/recipes-tutorial)已经让你用特定指令、扩展和配置定义可复用的工作流，而且你一直可以编辑底层 YAML 文件。但为配方切换模型或提供商，意味着在配置文件里寻找正确的字段。

有了 v1.25.0，桌面应用让你按配方可视化配置这些设置：
- 更改配方使用的模型和提供商
- 添加或移除扩展
- 立即保存并运行更新后的配方

与此同时，配方详情视图现在会正确**显示配方自身配置里指定的提供商和模型**，而不是显示你的全局默认值。这意味着如果你有一个代码审查配方被设为始终在 Claude Sonnet 上运行，UI 会准确反映这一点，而不管你的默认提供商设置是什么。

![goose Desktop 中的配方编辑器，展示提供商和模型配置](recipe-editor.png)

## 🤖 智能体 CLI 提供商升级

**Claude Code、Codex 和 Gemini CLI 在这次发布中都得到了重大升级。**

goose 的[智能体 CLI 提供商](https://goose-docs.ai/docs/guides/cli-providers)把工作委托给其他 AI 编程智能体，这次得到一批改进，让它们明显更有能力：

### MCP 扩展现在能与智能体提供商一起工作

这是一件大事。以前，MCP 扩展只与基于标准 API 的提供商一起工作。现在，**Claude Code、Codex 和 Gemini CLI 都可以使用 MCP 扩展**。

在底层，goose 把你的扩展配置转换成每个 CLI 期望的原生格式：
- Claude Code 得到 `--mcp-config` JSON
- Codex 得到 `-c mcp_servers.*` TOML 覆盖

这意味着无论你用哪个提供商，都可以使用同样的 MCP 扩展。

### Claude Code 流式输出

Claude Code 现在实时流式输出，而不是等待完整回复。你会在 Claude Code 工作时看到结果出现，让长时间运行的任务感觉响应快得多。

### Claude Code 动态模型切换

使用 Claude Code 时，你现在可以列出可用模型，并在会话中途切换模型。不必只因为想为一个更简单的任务从 Sonnet 换到 Haiku 就重启会话。

### Gemini CLI 的 Stream-JSON 和会话复用

Gemini CLI 提供商现在使用 stream-json 输出以获得更好的实时反馈，并复用会话，以提高多次交互的效率。

## ✨ CLI 中的流式 Markdown

**CLI 中的 Markdown 渲染现在智能地流式进行，而不是渲染不完整、破损的输出。**

如果你曾经在 goose 流式回复时，看见半个粗体标签或一个破掉的代码块在屏幕上闪过，这个修复就是给你的。新的 `MarkdownBuffer` 引入一个状态机解析器，跟踪未闭合的 markdown 结构（粗体、代码块、链接等），并且只在结构完整时才把内容刷新到终端。

结果是：平滑、格式正确的 markdown，逐步渲染，没有视觉故障。

## 🛡️ SLSA 构建来源证明

**每一个 goose 发布产物现在都带有签名的来源证明。**

供应链安全很重要。从 v1.25.0 开始，每一个 CLI 二进制、桌面捆绑包、Linux 包和 Docker 镜像都通过 [Sigstore](https://www.sigstore.dev/) 获得一份 [SLSA](https://slsa.dev/)（软件产物的供应链级别）构建来源证明。

这意味着你可以**用密码学验证**任何 goose 产物都是由官方 CI 流水线从官方仓库构建的：

```bash
gh attestation verify <artifact> --repo aaif-goose/goose
```

实现覆盖所有发布工作流，包括稳定版、金丝雀构建、夜间构建和 Docker 镜像，并且正确固定了 action、划定了权限范围。

## 开始使用

准备好试用 v1.25.0 了吗？前往我们的[更新 goose](https://goose-docs.ai/docs/guides/updating-goose)指南，获取 Desktop 或 CLI 最新版本的逐步说明。

完整变更列表见完整的[发行说明](https://github.com/aaif-goose/goose/releases/tag/v1.25.0)，并在 [GitHub Discussions](https://github.com/aaif-goose/goose/discussions) 加入讨论。

*goose 是开源的。在 [GitHub](https://github.com/aaif-goose/goose) 上给我们加星，如果你用 goose 做出了很酷的东西，我们很想听到。*

<head>
  <meta property="og:title" content="goose v1.25.0：沙箱、精简，并且更安全" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2026/02/23/goose-v1-25-0" />
  <meta property="og:description" content="goose v1.25.0 带来 macOS 沙箱、统一的 summon 扩展、丰富的 MCP 应用 UI、智能体 CLI 升级，以及 SLSA 构建来源证明。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/banner-7288f9dab6214bbe6baef00cda590d27.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="goose v1.25.0：沙箱、精简，并且更安全" />
  <meta name="twitter:description" content="goose v1.25.0 带来 macOS 沙箱、统一的 summon 扩展、丰富的 MCP 应用 UI、智能体 CLI 升级，以及 SLSA 构建来源证明。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/banner-7288f9dab6214bbe6baef00cda590d27.png" />
</head>
