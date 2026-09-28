---
title: Todo 扩展
description: 把复杂工作拆成可跟踪的步骤，帮助 goose 保持条理
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PlatformExtensionNote } from '@site/src/components/PlatformExtensionNote';
import GooseBuiltinInstaller from '@site/src/components/GooseBuiltinInstaller';

Todo 扩展帮助 goose 保持条理：把复杂工作拆成一系列步骤，并在每完成一步时让你知道进展。

Todo 扩展默认不启用。启用后，goose 可以为多步任务记下简短计划，并在计划变化时更新。这些笔记每轮都会展示给 goose，并且能在上下文压缩后保留，但 goose 不会被要求勾掉条目或重新核验已完成的工作。

:::tip
你可以随时让 goose「把当前的待办清单给我看」，了解正在跟踪什么。
:::

本教程介绍如何启用并使用 Todo 扩展。

## 配置

<PlatformExtensionNote defaultEnabled={false}/>

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseBuiltinInstaller
    extensionName="Todo"
    description="Manage complex tasks with structured checklists and progress tracking"
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
  │  ● todo
  // highlight-end  
  └  Extension settings updated successfully
  ```
  </TabItem>
</Tabs>

## 使用示例

这个示例让 goose 帮忙修复文档文件中的格式不一致。它展示 Todo 扩展如何帮助 goose 在系统性改进中保持条理。

### goose 提示词

```
我需要更新文档，修复两个教程文件之间的格式不一致。有几个章节不符合预期模式。你能帮我系统地处理这些问题，并跟踪进度吗？
```

### goose 输出

```md
我来系统地修复文档不一致。先把工作拆成有条理的任务，并跟踪进度。

## 修复文档教程的不一致

### 缺少的组件（相对参考模式）
- [x] 在顶部加入视频嵌入
- [x] 在使用示例章节加入大模型信息框
- [x] 去掉参考模式中没有的多余章节

### 配置章节的问题
- [x] 把术语改成与参考格式一致
- [x] 修正命令行配置章节的格式
  - [x] 展示确切的命令流程
  - [x] 包含带语法高亮的菜单输出
  - [x] 去掉含糊的说明

### 引言和描述的问题
- [x] 把引言段落简化成参考风格
- [x] 修正教程描述行以匹配模式
- [x] 全文统一大小写

### 示例结构的问题
- [x] 把示例简化成参考格式
  - [x] 使用清晰的「提示词」和「输出」章节
  - [x] 加入耗时信息
  - [x] 在合适的代码块中展示实际回复
- [x] 使用聚焦、可完成的示例
- [x] 展示清晰的前后状态

### 格式一致性
- [x] 确保代码块使用正确的语法高亮
- [x] 语气和结构与参考一致
- [x] 全文术语一致
- [x] 修正大小写问题

## 文档更新完成！✅

所有教程不一致都已解决：

✅ **结构已对齐**：与参考模式完全一致
✅ **组件已加入**：视频嵌入、信息框、正确的标签页
✅ **术语已修正**：全文用语一致
✅ **示例已更新**：简单、聚焦，并有清晰的耗时
✅ **命令行说明**：带高亮的确切命令流程
✅ **格式一致**：代码块和语法正确

文档现在遵循一致的模式，为用户提供清晰、有条理的体验。
```
