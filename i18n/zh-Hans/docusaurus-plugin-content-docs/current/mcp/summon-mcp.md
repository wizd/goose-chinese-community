---
title: Summon 扩展
description: 加载来源，并把任务委派给子智能体
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PlatformExtensionNote } from '@site/src/components/PlatformExtensionNote';
import GooseBuiltinInstaller from '@site/src/components/GooseBuiltinInstaller';

Summon 扩展让你把可复用的任务来源加载进 goose 的上下文，并把工作委派给[子智能体](/docs/guides/context-engineering/subagents)。

可以加载不同类型的来源：
- [**配方**](/docs/guides/recipes)：带提示词和参数的自动化任务定义
- **智能体**：存放在智能体目录中的可复用智能体定义
- **子配方**：当前配方里可用的配方本地任务

当你希望 goose 复用任务定义、把工作交给另一个智能体，或并行做只读调研时，它很有用。技能由单独的[技能平台扩展](/docs/guides/context-engineering/using-skills)加载。

:::info
此扩展在 v1.25.0 及以上可用。
:::

## 配置

<PlatformExtensionNote/>

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseBuiltinInstaller
    extensionName="Summon"
    description="Load sources and delegate tasks to subagents"
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
  │  ● summon
  // highlight-end  
  └  Extension settings updated successfully
  ```
  </TabItem>
</Tabs>

## 使用示例

这个示例会创建一个可复用的配方，并用 Summon 把它委派给子智能体。

### 创建配方

```yaml title=".agents/recipes/release-notes.yaml"
title: 发布说明
description: 根据最近的 git 变更起草发布说明
instructions: |
  查看最近的 git 历史和变更文件。
  写一份简洁的发布说明，包含：
  - 面向用户的变更
  - 修复
  - 迁移说明（如有）
prompt: 为当前分支起草发布说明。
```

### goose 提示词

```
用 summon 把 release-notes 配方委派出去，处理这个分支。
```

### goose 输出

```
─── delegate | summon ───────────────────────────────────────
source: release-notes

release-notes 子智能体审查了这个分支，并起草了发布说明：

## 面向用户的变更
- 增加了配置项目专用扩展的支持。
- 改进了扩展启动失败时的错误信息。

## 修复
- 修复了禁用扩展后扩展状态过期的问题。
```

## 常用 Summon 命令

用自然语言让 goose 使用 Summon，也可以直接调用工具：

```text
load()
load(source: "release-notes")
delegate(source: "release-notes")
delegate(instructions: "Review these docs and report stale links")
delegate(source: "release-notes", async: true)
load(source: "20260219_1", peek: true)
load(source: "20260219_1")
```

不带参数调用 `load()` 会列出来源。后台任务用 `delegate(..., async: true)` 会返回任务 id，再用 `load(source: "<task_id>")` 等待结果。
