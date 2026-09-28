---
title: Extension Manager
description: 在 goose 会话中动态发现、启用和禁用扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PlatformExtensionNote } from '@site/src/components/PlatformExtensionNote';
import GooseBuiltinInstaller from '@site/src/components/GooseBuiltinInstaller';

你并不总是需要手动管理扩展。Extension Manager 扩展让 goose 能在进行中的会话里动态发现、启用和禁用扩展。根据你给出的任务，goose 会识别何时需要某个扩展，在需要时启用它，并在未使用的扩展占用上下文窗口时建议禁用它们。

只需描述你的任务，goose 就会自动处理扩展管理。

## 配置

<PlatformExtensionNote/>

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseBuiltinInstaller
    extensionName="Extension Manager"
    description="在会话中动态发现、启用和禁用扩展"
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
  │  ● extensionmanager
  // highlight-end  
  └  Extension settings updated successfully
  ```
  </TabItem>
</Tabs>

## 为什么使用 Extension Manager？

goose 可以同时使用很多扩展，但一次启用太多会导致：
- 给 LLM 过多工具选择，造成干扰
- 降低工具选择的质量
- 拖慢响应速度
- 超出建议上限（5 个扩展或 50 个工具）

Extension Manager 通过让 goose 做到以下几点来解决这个问题：
- **发现**有哪些可用扩展
- 仅在特定任务需要时**启用**扩展
- 不再需要时**禁用**扩展

这样体验会更聚焦、更高效：goose 在需要时恰好拥有所需的工具。

:::tip 建议上限
为获得最佳性能，建议保持 **不超过 5 个活动扩展**，工具总数 **不超过 50 个**。Extension Manager 会在需要时才启用针对任务的扩展，帮助你保持在这些上限之内。
:::

## 可用工具

Extension Manager 提供以下工具：

| 工具 | 说明 | 使用场景 |
|------|------|----------|
| `search_available_extensions` | 发现可以启用或禁用的扩展 | 为任务找到合适的扩展 |
| `manage_extensions` | 按名称启用或禁用扩展 | 动态加载或卸载扩展 |
| `list_resources` | 列出扩展中的资源（若支持） | 发现可用的数据源 |
| `read_resource` | 读取特定资源内容（若支持） | 访问扩展提供的数据 |

:::tip
只有当至少一个已启用的扩展支持资源时，资源工具（`list_resources` 和 `read_resource`）才可用。
:::

## 使用示例

让我们在需要时启用一个扩展。在这个示例中，我们启用 GitHub 扩展来处理仓库。

### goose 提示词

```
列出我所有的 GitHub 仓库
```

### goose 输出

:::note 桌面版

```
我来为你启用 GitHub 扩展，这样我们就能操作仓库了。

MANAGE_EXTENSIONS
action: enable
extension_name: github

✅ 扩展 “github” 已成功安装

GitHub 扩展现已激活。

我将使用 GitHub 扩展列出你的 GitHub 仓库。

LIST_REPOSITORIES

以下是你的仓库：

...

你想处理其中某个仓库吗？
```

:::
