---
title: "如何和你的智能体分手"
description: "ACP 让你保留喜欢的编辑器并更换 AI 智能体，或者保留智能体并从任何编辑器使用它。这是今天在 goose 里真正能用的做法。"
authors:
    - codefromthecrypt
image: /img/blog/how-to-break-up-with-your-agent.png
---

![编辑器通过 ACP 连接到 goose，goose 再连接到多个智能体](/img/blog/how-to-break-up-with-your-agent.png)

过去一年开发者工具最大的转变，不是智能体的兴起，而是智能体订阅的兴起。我们不再挑选 LLM 平台、计算 token。我们开始选择一个智能体 CLI，并支付固定的月费。

这能用，直到你意识到每个智能体都隐含一个特定的前端。Cursor 是它自己的编辑器（VS Code 的一个分支）。Claude Code 起步时只是终端工具。许多智能体只在某一个特定环境里好用。即便像 Copilot 这样有广泛 IDE 支持的智能体，也会把更深的功能绑在自己的生态里。如果你想在喜欢的编辑器里用另一个智能体，往往没办法。

[Agent Client Protocol（ACP）](https://agentclientprotocol.com/) 是由 [Zed Industries](https://zed.dev/) 牵头的社区规范，把智能体和编辑器解耦。goose 在两个方向上实现了 ACP：编辑器可以接入 goose，goose 也可以接入其他智能体。这篇文章走过今天在实践中那是什么样子。

<!-- truncate -->

## 集成问题

存在几十个智能体。存在几十个编辑器。每一种组合都需要一套自定义集成，并且必须在两边发布更新时跟上。goose 是吃过苦头才明白的。多位社区维护者做了 VS Code 扩展，甚至一个 IntelliJ 插件，但[没有一个能跟上](/blog/2025/10/24/intro-to-agent-client-protocol-acp) goose 的发布节奏。goose 的每一次改动都意味着更新每一个插件，而插件落在了后面。

ACP 绕开了这一点。和 [MCP](https://modelcontextprotocol.io/) 一样，ACP 定义了基于 stdio 的 JSON-RPC 协议，但用于智能体与编辑器的通信。编辑器实现客户端接口，智能体实现服务器。模型选择、斜杠命令、文件 I/O 和终端执行这类能力都在 ACP 协议里，不再需要为每个智能体写自定义代码。

## 用任何编辑器配合 goose

goose 列在 [ACP Agent Registry](https://zed.dev/blog/acp-registry) 里，所以 [Zed](https://zed.dev/) 和 [JetBrains](https://blog.jetbrains.com/ai/2025/12/bring-your-own-ai-agent-to-jetbrains-ides/) 可以自动发现并安装它。对于还不会读取注册表的编辑器，比如带 [avante.nvim](https://github.com/yetone/avante.nvim) 的 Neovim，配置很直接：

```lua
acp_providers = {
  ["goose"] = {
    command = "goose",
    args = { "acp", "--with-builtin", "developer" },
  },
},
```

流过 ACP 的不只是提示。编辑器可以委托文件读取（包括你还没保存的文件）、运行终端命令，并以原生方式呈现权限对话框。你在编辑器里配置的任何 MCP 服务器，都会自动作为该 goose 会话的扩展加入，所以你不必在两个地方配置它们。

更多内容见 [ACP 客户端指南](/docs/gdk/acp)。

## 用任何智能体配合 goose

goose 也作为客户端说 ACP。它可以把其他智能体编排为 ACP 提供商。你保留 goose 的 UI 和扩展，但底层的 LLM 和 MCP 调用经过另一个智能体。今天这包括 [Claude Code](https://github.com/agentclientprotocol/claude-agent-acp)、[Codex](https://github.com/agentclientprotocol/codex-acp)、[Copilot](https://docs.github.com/en/copilot/reference/copilot-cli-reference/acp-server)、[Gemini](https://github.com/google-gemini/gemini-cli)、[Amp](https://www.npmjs.com/package/amp-acp) 和 [Pi](https://github.com/svkozak/pi-acp)。

有些智能体如 Gemini 和 Copilot 原生说 ACP。另一些如 Claude 需要先安装一个小适配器：

```bash
npm install -g @agentclientprotocol/claude-agent-acp  # one-time adapter install
GOOSE_PROVIDER=claude-acp GOOSE_MODEL=current goose
```

把模型设为 `current` 的意思是“使用底层智能体里配置的任何模型”。

完整列表和设置说明见 [ACP 提供商指南](/docs/guides/acp-providers)。

## ACP 今天停在哪里

ACP 还在 1.0 之前。有些事情已经很好用，有些还没有：

- 权限对话框的渲染因编辑器而异。在 Zed 里看起来原生的东西，在 Neovim 里可能渲染得不同。
- 并非每个智能体都会尊重客户端传来的 MCP 服务器配置。覆盖范围取决于智能体。
- 模型和模式切换的支持各不相同。有些智能体暴露完整的模型列表，有些只暴露别名。
- 协议仍在稳定。随着实现成熟，功能会在稳定性层级之间移动。

这些是真实的边界。协议还年轻。方向是对的。

## 接下来去哪里

goose 目前为桌面应用、CLI 和 ACP 服务器各有独立的代码路径。这正在收敛。goose 守护进程正在把 ACP 作为它的协议来过渡，于是每个前端都变成一个薄的 ACP 客户端，与同一个后端对话。提供商选择和配置变更通过 ACP 自定义请求发生，而不是每个前端各写一套逻辑。

在提供商一侧，今天要给 goose 加一个新的 ACP 智能体，意味着写一个 Rust 文件。声明式 ACP 提供商会用 JSON 配置取代这些文件，从而可以在不重新编译 goose 的情况下添加智能体。再加上对 [ACP Agent Registry](https://github.com/agentclientprotocol/registry) 的原生支持，goose 可以在新智能体出现在注册表时发现并提供它们，不需要一次发布。

## 试试看

goose 最近被捐赠给了 Linux 基金会内的[智能体 AI 基金会（AAIF）](https://aaif.io/)。互操作性是论点：goose 不该把你锁进一个智能体或一个编辑器。

我会在 [AI Native DevCon](https://tessl.io/speaker/adriancole/) 走过这套架构，每一张幻灯片都链到背后的 PR 或 GitHub 讨论。

选你喜欢的 UI。选你喜欢的智能体。它们不必是同一件事。

- [ACP 客户端指南](/docs/gdk/acp)
- [ACP 提供商指南](/docs/guides/acp-providers)
- [GitHub 上的 goose](https://github.com/aaif-goose/goose)
- [Discord 社区](https://discord.gg/n8R5VaWDAn)

<head>
  <meta property="og:title" content="如何和你的智能体分手" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2026/04/08/how-to-break-up-with-your-agent" />
  <meta property="og:description" content="ACP 让你保留喜欢的编辑器并更换 AI 智能体，或者保留智能体并从任何编辑器使用它。这是今天在 goose 里真正能用的做法。" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="block.github.io/goose" />
  <meta name="twitter:title" content="如何和你的智能体分手" />
  <meta name="twitter:description" content="ACP 让你保留喜欢的编辑器并更换 AI 智能体，或者保留智能体并从任何编辑器使用它。这是今天在 goose 里真正能用的做法。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/header-f8e0e7e5dfa082ad8d33c0fdf84163d4.png" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/header-f8e0e7e5dfa082ad8d33c0fdf84163d4.png" />
  
</head>
