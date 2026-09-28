---
sidebar_position: 1
title: 使用 MCP 应用
sidebar_label: 使用 MCP 应用
description: 了解 goose 如何渲染来自 MCP 应用扩展的交互式 UI 组件
---

import { PanelLeft } from 'lucide-react';

# 使用 MCP 应用

用 MCP 应用构建的扩展，让 goose 桌面版可以提供可交互、更投入的体验。你不必只读文本回复、再输入提示，而是可以操作图形化、可点击的界面。

:::info MCP 应用是官方规范
[MCP 应用](/docs/tutorials/building-mcp-apps)是交互式 UI 的官方 MCP 规范。新的交互式扩展请使用 MCP 应用。
:::

:::warning 实验功能
本主题描述的功能仍在实验阶段并积极开发中。行为和支持范围可能在后续版本中变化。
:::

MCP 应用通过官方 [MCP 应用规范](https://github.com/modelcontextprotocol/ext-apps)把交互界面带入 goose。根据扩展的不同，应用可以在独立的沙箱窗口中启动，也可以嵌入聊天窗口。

### 在独立窗口中启动应用

部分 MCP 应用可以在自己的窗口中启动，让你直接进入界面，而不必先给 goose 发消息。

1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
2. 在侧边栏中点击 `Apps`
3. 浏览可用的 MCP 应用
4. 点击 `Launch`，在新窗口中启动应用

:::info 应用扩展
要在侧边栏看到 `Apps` 页面，必须在 `Extensions` 页面启用[应用扩展](/docs/mcp/apps-mcp)。你也可以用它创建自定义的独立应用。
:::

`Apps` 页面会显示你用应用扩展创建的自定义 HTML 应用、导入的 HTML 应用，以及已启用的 MCP 应用扩展中的应用。应用界面可以点击按钮、填写表单或使用其他控件。应用可以通过 MCP 调用工具和读取资源（若通过 CORS 启用），但不能与 goose 通信（例如通过聊天）。

#### 导入 HTML 应用

导入用应用扩展创建并分享给你的应用。

1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
2. 在侧边栏中点击 `Apps`
3. 点击 `Import App`，在文件系统中找到应用的 `.html` 文件，然后点击 `Open`

### 在聊天窗口中使用应用

当 goose 调用的工具返回 UI 时，部分 MCP 应用会直接渲染在对话中。交互界面以内联方式出现在聊天里，你可以做选择、填表单或触发操作，而不必离开对话流程。

如果需要，可以直接问 goose 能否把 UI 加载到聊天窗口中。

<div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
  <video 
    controls 
    playsInline
    style={{ 
      width: '100%', 
      aspectRatio: '2876/2160',
      borderRadius: '8px'
    }}
  >
    <source src={require('@site/static/videos/plan-trip-demo.mp4').default} type="video/mp4" />
    你的浏览器不支持 video 标签。
  </video>
</div>

## 面向扩展开发者

为你自己的扩展增加交互能力：

- [构建 MCP 应用](/docs/tutorials/building-mcp-apps) - 分步教程（推荐）
- [MCP 应用 SDK 与规范](https://modelcontextprotocol.github.io/ext-apps/api/)
- [MCP 应用 SDK 指南](https://mcpui.dev/guide/introduction)
