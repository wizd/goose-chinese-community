---
title: Chat Recall 扩展
description: 在所有 goose 会话中搜索对话历史并加载会话摘要
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PlatformExtensionNote } from '@site/src/components/PlatformExtensionNote';
import GooseBuiltinInstaller from '@site/src/components/GooseBuiltinInstaller';

Chat Recall 扩展通过搜索会话历史，帮助 goose 记起过去的对话。当你需要先前工作的上下文时，goose 可以搜索相关对话，或加载特定会话的摘要。

当你提到过去的工作，或提出需要历史上下文的问题时，goose 会自动使用 Chat Recall。

## 配置

<PlatformExtensionNote defaultEnabled={false} />

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseBuiltinInstaller
    extensionName="Chatrecall"
    description="在所有会话中搜索对话历史"
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
  │  ● chatrecall
  // highlight-end  
  └  Extension settings updated successfully
  ```
  </TabItem>
</Tabs>

## 使用示例

Chat Recall 可以用关键词搜索所有会话。结果按会话分组，并按时间新旧排序，也可以按日期筛选。你也可以提供[会话 ID](/docs/guides/goose-cli-commands#session-list-options) 来加载特定会话的摘要。

让我们让 goose 找出最近关于某个主题的对话：

### goose 提示词

```
上周我们讨论数据库迁移时说了什么？
```

### goose 输出

:::note 桌面版
我在你最近的会话里找到了关于数据库迁移的讨论。以下是我们谈到的内容：

**数据库迁移讨论 - 上周**

#### 会话：修复迁移脚本（2024 年 11 月 26 日）
**工作目录：** /projects/myapp

我们排查了一次失败的生产数据库迁移，错误是 “column already exists”。要点如下：

- 迁移试图添加一个在部分环境中已经存在的列
- 我们加入了条件逻辑，在添加列之前先检查它是否存在
- 在本地测试了修复并提交了更改

#### 会话：数据库 schema 更新（2024 年 11 月 27 日）
**工作目录：** /projects/myapp

我们讨论了添加邮箱验证功能：

- 计划在 users 表中新增 `email_verified` 列
- 讨论该列是可空，还是默认值为 false
- 为新列编写了迁移脚本

两次会话都聚焦于如何安全地在生产环境中更新数据库 schema。需要我加载其中任一会话的完整细节吗？
:::

:::info
goose v1.14.0 之前版本压缩过的会话，可能因对话历史存储方式的变化而无法搜索。
:::
