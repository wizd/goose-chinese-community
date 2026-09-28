---
title: Tutorial 扩展
description: 了解如何使用 goose 内置的 Tutorial 扩展进行引导式学习
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GooseBuiltinInstaller from '@site/src/components/GooseBuiltinInstaller';

Tutorial 扩展是 goose 的内置功能，为学习 goose 的各个方面提供交互式、分步指导。它通过动手练习，帮助用户熟悉 goose 的功能。

Tutorial 扩展是一个交互式学习工具，它会：
- 提供结构化的分步教程
- 允许动手练习 goose 的功能
- 给出即时反馈和指导

## 配置

1. 确认 Tutorial 扩展已启用：

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseBuiltinInstaller
    extensionName="Tutorial"
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
  │  ● tutorial
  // highlight-end
  |
  └  Extension settings updated successfully
  ```
</TabItem>
</Tabs>

## 可用教程

目前提供以下教程：

- **build-mcp-extension**：学习如何用 Model Context Protocol（MCP）构建扩展
- **first-game**：用 goose 创建你的第一个游戏

还会持续加入更多教程，覆盖更多功能和场景。

## 使用 Tutorial 扩展

### 开始一个教程

和教程交互主要有两种方式：

1. **直接问 goose**：说出你感兴趣的主题，goose 会推荐相关教程。

```
( O)> 我想学习如何为 goose 构建扩展
```

2. **指定教程**：可以直接按名称请求某个教程。

```
( O)> 能带我走一遍 first-game 教程吗？
```

### 教程进行中

进行教程时：

1. goose 会一步步引导你
2. 采取任何操作之前，你会先收到清晰的说明
3. 你可以随时提问澄清
4. 你可以中途暂停，之后再继续

### 最佳实践

- **慢慢来**：不要赶进度。确认理解了当前步骤再继续。
- **提问**：有不清楚的地方，让 goose 再解释。
- **试一试**：可以在所学内容上做些变化。
- **做笔记**：记下有意思的发现或技巧。

## 使用示例

### 开始一次教程会话

下面是开始学习如何构建扩展的例子：

### goose 提示词
```
我想学习如何为 goose 构建扩展
```

### goose 输出
```
我来帮你学习如何构建扩展。「build-mcp-extension」教程很适合。我来加载它，并带你走一遍。

─── load_tutorial | tutorial ──────────────────────────
name: build-mcp-extension



开始构建扩展之前，我需要先了解几件事，以便更好地引导你：

1. 你想用哪个 SDK？有三个选项：
   - Python（对初学者友好，适合原型）
   - TypeScript（适合基于 Web 的工具）
   - Kotlin（稳健、类型安全，适合复杂应用）

2. 你想构建哪种扩展？例如：
   - 执行特定动作的工具
   - 向大模型提供数据的资源
   - 或者你已经有具体想法

告诉我你的偏好，我会帮你用合适的方式开始搭建和实现。

作为参考，我们会覆盖：
1. 搭建开发环境
2. 创建基本的 MCP 服务器
3. 实现你的具体功能
4. 测试和调试

你想用哪个 SDK 开始？
```

## 下一步

完成教程之后，你可以：
- 把学到的概念用到自己的项目里
- 分享经验，回馈 goose 社区
- 建议对其他人有帮助的新教程主题

### 还需要帮助？
如果有问题、遇到障碍，或只是想一起讨论想法，加入 [Discord 社区][discord]。

[discord]: https://discord.gg/n8R5VaWDAn
