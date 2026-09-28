---
title: 管理工具权限
sidebar_position: 1
sidebar_label: 工具权限
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PanelLeft, Tornado, Settings } from 'lucide-react';

工具权限对 goose 如何使用扩展中的不同工具提供细粒度控制。本指南帮助你理解并有效配置这些权限。

## 理解工具和扩展

在深入权限之前，先明确关键组成部分：

- **扩展**是为 goose 增加功能的软件包（如 Developer、Google Drive 等）
- **工具**是每个扩展中 goose 可以使用的具体功能

例如，Developer 扩展包含多个工具：

- 用于编辑文件的文本编辑器工具
- 用于运行命令的 Shell 工具
- 用于截图的屏幕捕获工具
:::warning 性能优化
在所有扩展中启用的工具总数少于 25 个时，goose 表现最好。请考虑只启用当前任务所需的扩展。
:::

## 权限级别

工具权限与 [goose 权限模式](/docs/guides/managing-tools/goose-permissions)一起工作。模式设定默认行为，工具权限则让你覆盖特定工具的行为。

每个工具可以设为三种权限级别之一：

| 权限级别 | 说明 | 最适合 | 示例 |
|-----------------|-------------|-----------|----------|
| **始终允许** | 工具运行时不需要批准 | 安全的只读操作 | • 读取文件<br></br>• 列出目录<br></br>• 检索信息 |
| **事先询问** | 需要确认 | 会改变状态的操作 | • 写入/编辑文件<br></br>• 系统命令<br></br>• 创建资源 |
| **永不允许** | 不能使用该工具 | 敏感操作 | • 访问凭据<br></br>• 系统关键文件<br></br>• 删除资源 |

## 配置工具权限

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    使用 `Manual` 或 `Smart` 批准模式时，你可以为已启用的扩展配置细粒度工具权限。这些规则可以从模式开关或 `Settings` 页面访问。

    <Tabs>
      <TabItem value="toggle" label="Mode Toggle" default>
        1. 点击应用底部的 <Tornado className="inline" size={16} /> 按钮
        2. 点击所选 `Manual` 或 `Smart` 模式旁边的 <Settings className="inline" size={16} /> 按钮
        3. 点击要配置其工具的扩展
        4. 使用每个工具旁边的下拉菜单设置权限级别
        5. 点击 `Save Changes`
      </TabItem>
      <TabItem value="settings" label="Settings Page" default>
        1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
        2. 在侧边栏中点击 `Settings` 按钮
        3. 点击 `Chat`
        4. 在 `Mode` 下，点击所选 `Manual` 或 `Smart` 模式旁边的 <Settings className="inline" size={16} /> 按钮
        5. 点击要配置其工具的扩展
        6. 使用每个工具旁边的下拉菜单设置权限级别
        7. 点击 `Save Changes`
      </TabItem>
    </Tabs>
  
  </TabItem>
  <TabItem value="cli" label="goose CLI">

    1. 运行配置命令：
    ```sh
    goose configure
    ```

    2. 从菜单中选择 `goose settings`
    ```sh
    ┌ goose-configure
    │
    ◆ What would you like to configure?
    | ○ Configure Providers
    | ○ Add Extension
    | ○ Toggle Extensions
    | ○ Remove Extension
    // highlight-start
    | ● goose settings
    // highlight-end
    └
    ```

    3. 选择 `Tool Permission`
    ```sh
    ┌   goose-configure
    │
    ◇  What would you like to configure?
    │  goose settings
    │
    ◆  What setting would you like to configure?
    │  ○ goose mode
    // highlight-start
    │  ● Tool Permission
    // highlight-end
    |  ○ Tool Output
    └
    ```

    4. 选择一个扩展并配置其工具的权限：
    ```sh
    ┌   goose-configure
    │
    ◇  What setting would you like to configure?
    │  Tool Permission 
    │
    ◇  Choose an extension to configure tools
    │  developer 
    │
    ◇  Choose a tool to update permission
    │  read_image 
    │
    ◆  Set permission level for tool read_image, current permission level: Not Set
    │  ○ Always Allow 
     // highlight-start
    │  ● Ask Before (Prompt before executing this tool)
    // highlight-end
    │  ○ Never Allow 
    └
    ```
  </TabItem>
</Tabs>

## 权限管理的好处

:::tip
随着任务变化，复查并更新工具权限。你可以在会话期间随时修改权限。
:::

配置工具权限有几个原因：

1. **性能优化**
   - 为获得最佳性能，启用的工具总数保持在 25 个以下
   - 禁用当前任务不需要的工具
   - 减少上下文窗口用量并提高回复质量
   - 避免工具选择陷入犹豫

2. **安全控制**
   - 限制对敏感操作的访问
   - 防止意外修改文件
   - 控制系统资源使用

3. **聚焦任务**
   - 只启用当前任务所需的工具
   - 帮助 goose 做出更好的工具选择
   - 减少回复中的噪音

## 权限配置示例

### 基于任务的配置

根据当前任务配置权限：

```
Development Task:
✓ File reading → Always Allow
✓ Code editing → Ask Before
✓ Test running → Always Allow
✗ System commands → Ask Before

Documentation Task:
✓ File reading → Always Allow
✓ Markdown editing → Always Allow
✗ Code editing → Never Allow
✗ System commands → Never Allow
```
