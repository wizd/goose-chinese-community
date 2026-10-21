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

[Code Mode 扩展](/docs/mcp/code-mode-mcp)是一个 MCP 服务器，它用 MCP 协议暴露三个基础元工具。启用 Code Mode 后，goose 会切换到 Code Mode。对每个请求，LLM 会编写 JavaScript 代码，由 goose 在全新的、goose 自有的 [Boa](https://boajs.dev/) 上下文中执行，用于：

- 从已启用的扩展中发现可用工具（如有需要）
- 了解如何使用当前任务所需的工具
- 以编程方式调用这些工具来完成任务

### 传统工具调用与 Code Mode

传统 MCP 工具调用和 Code Mode 是达成同一目标的两种方式：让 goose 能够使用工具。

| 方面 | 传统方式 | Code Mode |
|--------|------------------|-----------|
| **工具发现** | 已启用扩展中的全部工具，例如：<br/>• `shell`<br/>• `write`<br/>• `github__list_issues`<br/>• `github__get_pull_request`<br/>• `slack__send_message`<br/>• ……*可能还有很多* | Code Mode 扩展的元工具：<br/>• `list_functions`<br/>• `get_function_details`<br/>• `execute_javascript`<br/><br/>LLM 使用这些工具，按需发现其他已启用扩展中的工具 |
| **工具调用** | • 顺序调用工具<br/>• 每次结果先发给 LLM，再进行下一次调用 | • 可能需要先做工具发现调用<br/>• 多次工具调用在一次执行中批量完成<br/>• 中间结果在本地串联并处理 |
| **上下文窗口** | 每次 LLM 调用都包含已启用扩展的全部工具定义 | 每次 LLM 调用包含 3 个元工具定义，以及本会话中先前已发现的工具定义 |
| **最适合** | • 启用 1–3 个扩展<br/>• 使用 1–2 个工具的简单任务 | • 5 个以上扩展<br/>• 定义清晰的多步骤工作流 |

:::info 仅文本结果
Code Mode 只支持工具结果中的文本内容。图像、二进制数据和其他内容类型会被忽略。
:::

## JavaScript 接口

调用 `list_functions` 可以发现准确的工具名和简短描述，再用 `{"functions": ["extension__first_tool"]}` 调用 `get_function_details`，查看原始的 JSON 输入和输出 schema。递归 schema 仍然是 JSON 数据。返回的名称要原样使用，包括一等工具不带前缀的名称。

把 JavaScript 传给 `execute_javascript`，入口是 `async function run()`：

```javascript
async function run() {
  const results = await Promise.all([
    tools.call("extension__first_tool", { query: "example" }),
    tools.call("extension__second_tool", { limit: 5 })
  ]);
  return results.map(result => result.summary);
}
```

等待工具调用，并把彼此独立的操作放在一起批量执行。只返回或记录下一步需要的信息。工具参数必须是 JSON 对象；结果必须是 JSON 值或 `undefined`。循环引用的对象、函数、symbol 和 BigInt 不受支持。控制台输出、JSON 深度和条目数量、JavaScript 指令数、循环次数和递归深度都有上限。

运行时提供 JavaScript 内置对象、`tools.call`，以及被捕获的 `console.log`、`info`、`warn`、`error` 和 `debug`。它不能直接访问文件系统、shell、网络、环境或包。工具调用仍沿用 goose 的扩展租约、权限流程、取消和变更处理。只有助手可见的文本结果会进入脚本。

每次执行使用独立的 worker 和上下文。扩展超时和取消会停掉执行，并取消进行中的工具调用。JavaScript 状态在各次调用之间被丢弃。可选的 `tool_graph` 元数据仍可供桌面版显示；已保存的 TypeScript 调用也仍然可以显示。

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
