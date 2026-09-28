---
title: Apps 扩展
description: 创建、管理和启动在独立窗口中运行的自定义 HTML 应用
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PlatformExtensionNote } from '@site/src/components/PlatformExtensionNote';
import GooseBuiltinInstaller from '@site/src/components/GooseBuiltinInstaller';

Apps 扩展让你通过对话创建、管理和启动简单的自定义应用。它适合：
- 计算器、转换器这类快速工具
- 图表、仪表盘这类数据可视化
- 简单游戏和交互式小组件

自定义应用是包含 JavaScript、CSS 和 HTML 的单文件应用（没有外部依赖或 npm 包）。它们以 [MCP App 资源](/docs/guides/interactive-chat/mcp-ui) 的形式暴露，运行在独立的沙箱窗口中。你可以从 `Apps` 页面启动，也可以在对话中让 goose 启动。

你可以通过对话创建、修改和删除应用，无需直接编辑文件。在底层，Apps 扩展把每个应用存为一个 HTML 文件，位置是：

- **macOS/Linux：** `~/.local/share/goose/apps/`
- **Windows：** `%APPDATA%\Block\goose\data\apps\`

## 配置

<PlatformExtensionNote/>

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseBuiltinInstaller
    extensionName="Apps"
    description="通过对话创建和管理自定义 goose 应用。应用使用 HTML/CSS/JavaScript，并在沙箱窗口中运行。"
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">

  1. 运行 `configure` 命令：
  ```sh
  goose configure
  ```

  2. 选择 `Toggle Extensions`
  ```sh
  ┌   goose-configure 
  │
  ◇  What would you like to configure?
  │  Toggle Extensions 
  │
  ◆  Enable extensions: (use "space" to toggle and "enter" to submit)
  // highlight-start    
  │  ● apps
  // highlight-end  
  └  Extension settings updated successfully
  ```
  </TabItem>
</Tabs>

## 使用示例

让我们让 goose 创建一个实用工具应用。

:::info LLM
本示例使用了 Anthropic 的 Claude Sonnet 4.5。
:::

### goose 提示词

> _创建一个 JSON 格式化应用_

### goose 输出

:::note 桌面版
我来为你创建一个 JSON 格式化应用。它适合用来格式化、校验和美化 JSON 数据。

完成了！我创建了一个名为 “json-beautifier” 的 JSON 格式化应用，它应该已经在新窗口中打开。

应用包含：

✅ **输入与输出区域**：左右分栏，左侧输入，右侧显示格式化结果  
✅ **格式化按钮**：按正确缩进美化 JSON  
✅ **压缩按钮**：把 JSON 压成一行  
✅ **校验按钮**：检查 JSON 是否有效并显示错误  
✅ **复制按钮**：把格式化后的 JSON 复制到剪贴板  
✅ **清空按钮**：重置全部内容  
✅ **语法高亮**：为键、字符串、数字和布尔值着色  
✅ **缩进选项**：可在 2 空格和 4 空格之间选择  
✅ **错误显示**：用红色清晰展示错误信息  
✅ **字符/行数统计**：显示 JSON 的统计信息  
✅ **深色主题**：现代、护眼的设计

把 JSON 粘贴到左侧面板，再用按钮进行格式化、压缩、校验或复制。应用可以马上使用！
:::

### 结果

JSON 格式化应用的样子如下：

[![JSON Formatter App](/img/apps-extension-results.png)](/img/apps-extension-results.png)

第一版看起来和工作得都很好。你也可以直接让 goose 添加功能、调整样式，以及做更多改动！
