---
title: "goose 落地 MCP Apps"
description: "goose 发布对 MCP Apps 草案规范的早期支持，与 MCP 中交互式 UI 的新兴标准对齐。"
authors:
  - aharvard
image: /img/blog/goose-lands-mcp-apps-header-image.png
---

![复古 1980 年代硬件实验室，三台 CRT 显示器以发光的绿色文字显示 “goose Lands MCP Apps”，桌上有一个小 goose 摆件](/img/blog/goose-lands-mcp-apps-header-image.png)

MCP 生态正在标准化服务器如何向宿主交付交互式 UI，而 goose 是早期采用者。今天我们发布对 MCP Apps 草案规范（[SEP-1865](https://github.com/modelcontextprotocol/ext-apps/blob/main/specification/draft/apps.mdx)）的支持，让 goose 与这一新兴标准对齐，而 Claude 和 ChatGPT 等其他宿主也在走向采用。

<!-- truncate -->

## 这次发布了什么

这次发布（[v1.19.0](https://github.com/aaif-goose/goose/releases/tag/v1.19.0)）带来 MCP Apps 的一个最小但可用的实现：

- 发现连接到工具的 MCP App 资源
- 在沙箱 iframe 中渲染 HTML 内容
- UI 与 MCP 服务器之间的基本消息中继

扩展作者现在可以构建在 goose 以及任何采用该标准的宿主上都能工作的 MCP Apps。

## 什么是 MCP Apps？

MCP Apps 让 MCP 服务器在宿主内部直接呈现交互式 HTML UI（表单、仪表盘、可视化）。构建一次，到处运行。

它是一份草案规范（[SEP-1865](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/1865)），建立在 [MCP-UI](https://mcpui.dev) 和 [OpenAI Apps SDK](https://developers.openai.com/apps-sdk/) 之上，由 [Ido Salomon](https://x.com/idosal1) 和 [Liad Yosef](https://x.com/liadyosef) 牵头，并有来自 Anthropic 和 OpenAI 的贡献。

goose 从早期就参与其中。我们[发布了 MCP-UI 支持](/blog/2025/08/11/mcp-ui-post-browser-world)，参与了规范讨论，现在正在实现 MCP Apps，这样在标准成熟的过程中，扩展作者就有一个真实的宿主可以对照着构建。

## 这是实验性的

MCP Apps 仍是草案。我们的实现有意保持最小，并且会变化。请预期会有粗糙之处和破坏性变更。我们现在发布，是为了让作者可以试用、给出反馈，并帮助社区在正确的原语上收敛。

**尚未包含的内容：**
- 与草案规范中每一项功能完全对齐
- 高级能力（摄像头、传感器）
- 对话之外的持久应用窗口

## MCP-UI 的过渡

MCP-UI 不会一夜之间消失。在社区敲定 MCP Apps 期间，我们会继续支持它，并且有一条[适配路径](https://mcpui.dev/guide/mcp-apps)来减轻迁移。一旦 MCP Apps 扩展被正式接受，我们会分享弃用时间表。

## 试用

- **开始：** 更新 goose，并把它指向一个返回 App 资源的 MCP 服务器
- **阅读规范：** [github.com/modelcontextprotocol/ext-apps](https://github.com/modelcontextprotocol/ext-apps)
- **加入讨论：** [goose GitHub 讨论](https://github.com/aaif-goose/goose/discussions/6069) · [MCP 贡献者 Discord](https://discord.gg/6CSzBmMkjX)

如果你构建或移植了一个应用，我们想听到你的声音。提交 issue，分享演示，告诉我们哪里坏了。早期反馈会塑造接下来发生的事。

<head>
  <meta property="og:title" content="goose 落地 MCP Apps" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2026/01/06/mcp-apps" />
  <meta property="og:description" content="goose 发布对 MCP Apps 草案规范的早期支持，与 MCP 中交互式 UI 的新兴标准对齐。" />
<meta property="og:image" content="http://goose-docs.ai/assets/images/goose-lands-mcp-apps-header-image-eb1f899d6de24f21cc2c45e46727f11d.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="goose 落地 MCP Apps" />
  <meta name="twitter:description" content="goose 发布对 MCP Apps 草案规范的早期支持，与 MCP 中交互式 UI 的新兴标准对齐。" />
  <meta name="twitter:image" content="http://goose-docs.ai/assets/images/goose-lands-mcp-apps-header-image-eb1f899d6de24f21cc2c45e46727f11d.png" />
</head>
