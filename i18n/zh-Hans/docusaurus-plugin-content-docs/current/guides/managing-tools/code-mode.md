---
sidebar_position: 3
title: Code Mode
sidebar_label: Code Mode
description: 了解 Code Mode 如何处理工具发现和工具调用
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Code Mode 是一种以编程方式与 MCP 工具交互的方法，而不是直接调用它们。启用了很多扩展时，Code Mode 尤其有用，因为它能更高效地管理上下文窗口用量。

:::info
此功能要求启用内置的 [Code Mode 扩展](/docs/mcp/code-mode-mcp)。
:::

Code Mode 控制工具如何被发现和调用：

- 已启用扩展中的工具按需发现，并在需要时加载进上下文
- 多次工具调用在一次执行中批量完成
- 中间结果会串联起来（一个工具的输出作为下一个工具的输入）

## Code Mode 如何工作

[Code Mode 扩展](/docs/mcp/code-mode-mcp)是一个 MCP 服务器，它用 MCP 协议暴露三个基础元工具。启用 Code Mode 后，goose 会切换到 Code Mode。对每个请求，LLM 会编写 JavaScript 代码，由 goose 使用 [pctx (Port of Context)](https://portofcontext.com/)（[GitHub](https://github.com/portofcontext/pctx)）执行。pctx 是基于 Deno 的自定义运行时，用于：

- 从已启用的扩展中发现可用工具（如有需要）
- 了解如何使用当前任务所需的工具
- 以编程方式调用这些工具来完成任务

### 传统工具调用与 Code Mode

传统 MCP 工具调用和 Code Mode 是达成同一目标的两种方式：让 goose 能够使用工具。

| 方面 | 传统方式 | Code Mode |
|--------|------------------|-----------|
| **工具发现** | 已启用扩展中的全部工具，例如：<br/>• `developer.shell`<br/>• `developer.text_editor`<br/>• `github.list_issues`<br/>• `github.get_pull_request`<br/>• `slack.send_message`<br/>• ……*可能还有很多* | Code Mode 扩展的元工具：<br/>• `list_functions`<br/>• `get_function_details`<br/>• `execute_typescript`<br/><br/>LLM 使用这些工具，按需发现其他已启用扩展中的工具 |
| **工具调用** | • 顺序调用工具<br/>• 每次结果先发给 LLM，再进行下一次调用 | • 可能需要先做工具发现调用<br/>• 多次工具调用在一次执行中批量完成<br/>• 中间结果在本地串联并处理 |
| **上下文窗口** | 每次 LLM 调用都包含已启用扩展的全部工具定义 | 每次 LLM 调用包含 3 个元工具定义，以及本会话中先前已发现的工具定义 |
| **最适合** | • 启用 1–3 个扩展<br/>• 使用 1–2 个工具的简单任务 | • 5 个以上扩展<br/>• 定义清晰的多步骤工作流 |

:::info 仅文本结果
Code Mode 只支持工具结果中的文本内容。图像、二进制数据和其他内容类型会被忽略。
:::

## 更多资源

import ContentCardCarousel from '@site/src/components/ContentCardCarousel';
import gooseCodeMode from '@site/blog/2025-12-15-code-mode-mcp/header-image.jpg';
import notMcpReplacement from '@site/blog/2025-12-21-code-mode-doesnt-replace-mcp/header-image.png';

<ContentCardCarousel
  items={[
    {
      type: 'blog',
      title: '面向 MCP 的 Code Mode',
      description: '了解以代码执行为途径的 MCP 工具调用。',
      thumbnailUrl: gooseCodeMode,
      linkUrl: '/blog/2025/12/15/code-mode-mcp',
      date: '2025-12-15',
      duration: '阅读 5 分钟'
    },
    {
      type: 'blog',
      title: 'Code Mode 并不能取代 MCP',
      description: '理解 Code Mode 与 MCP 如何协同工作。',
      thumbnailUrl: notMcpReplacement,
      linkUrl: '/blog/2025/12/21/code-mode-doesnt-replace-mcp',
      date: '2025-12-21',
      duration: '阅读 8 分钟'
    }
  ]}
/>
