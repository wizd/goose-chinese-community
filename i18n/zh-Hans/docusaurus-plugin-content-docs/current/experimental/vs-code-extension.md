---
title: goose for VS Code 扩展
sidebar_label: VS Code 扩展
sidebar_position: 4
---

import IconGoose from "@site/src/components/icons/goose";

[goose for VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=block.vscode-goose)让你在 VS Code 内直接与 goose 交互。

:::warning 实验性功能
goose for VS Code 正在积极开发中。行为和配置可能在后续版本中变化。
:::

该扩展使用 [Agent Client Protocol (ACP)](/docs/gdk/acp) 与 goose 通信。

## 安装扩展

:::info 前提条件
- [VS Code](https://code.visualstudio.com/) 1.95.0 或更高版本
- [goose CLI](/docs/getting-started/installation)
:::

1. 打开 [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=block.vscode-goose)
2. 点击 `Install`
3. 在弹出窗口中点击 `Open Visual Studio Code`
4. 在 Visual Studio Code 中点击 `Install`
5. 点击活动栏中的 <IconGoose className="inline" size={16} /> 图标，打开侧边面板并开始与 goose 对话

## 与 goose 共享上下文

有两种方式向 goose 提供上下文。

### 发送选中的代码

1. 在编辑器中选中你想讨论的代码
2. 把选区发送给 goose：
   - macOS：`Cmd+Shift+G`
   - Windows/Linux：`Ctrl+Shift+G`
   - 右键并选择 `Send to goose`

选中的代码会作为上下文芯片出现在聊天输入框上方。

### 用 @ 提及附加文件

1. 在聊天输入框中输入 `@`，然后开始输入文件名
2. 选择文件：
   - 用方向键（↑/↓）选中文件并按 `Enter`
   - 用鼠标选择文件

附加的文件会作为上下文芯片出现在聊天输入框上方。

## 使用示例

goose for VS Code 扩展直接连接到你的编辑器，让你用 AI 管理文件、项目和工作流。它包含以下功能：

- 带流式响应的交互式聊天界面
- 访问 goose 的 AI 能力和已启用的扩展
- 带历史回放的会话管理
- 上下文共享，以及聊天界面中的可视化上下文芯片
- 剪贴板工具，便于复制代码片段和回复并分享

### goose 提示

```
Update the contributing guide at /goose/CONTRIBUTING.md with instructions on how to start docusaurus dev server
```

### goose 输出

```

I'll help you update the CONTRIBUTING.md file with instructions for starting the Docusaurus dev server. First, let me check the current content of the file.

─── developer__text_editor | view ──────────────────────────

I'll now update the CONTRIBUTING.md file to include instructions for starting the Docusaurus dev server. I'll add this information in a new section under the Node section.

─── developer__text_editor | str_replace ──────────────────────────

I've successfully updated the CONTRIBUTING.md file to include instructions for starting the Docusaurus dev server. I added a new "Documentation" section right after the Node section, which provides clear step-by-step instructions for:

Navigating to the docs directory
Installing dependencies
Starting the development server
I also included helpful information about the hot-reloading feature and the local server URL. The formatting is consistent with the rest of the document, using proper markdown syntax for code blocks and headers.

Is there anything else you'd like me to add or modify in the contributing guide?

```
