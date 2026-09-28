---
sidebar_position: 20
title: goose 权限模式
sidebar_label: goose 权限
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PanelLeft, Tornado } from 'lucide-react';

goose 的权限决定它在修改文件、使用扩展和执行自动化操作时有多少自主权。选择一种权限模式，你就能完全控制 goose 如何与开发环境交互。

<details>
  <summary>权限模式视频讲解</summary>
  <iframe
  class="aspect-ratio"
  src="https://www.youtube.com/embed/bMVFFnPS_Uk"
  title="goose 权限模式说明"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  ></iframe>
</details>

## 权限模式

| 模式 | 说明 | 最适合 |
|------|-------------|----------|
| **完全自主** | goose 可以修改文件、使用扩展和删除文件，**无需批准** | 希望**完全自动化**并无缝融入工作流的用户 |
| **手动批准** | goose 在使用任何工具或扩展之前**请求确认**（支持细粒度的[工具权限](/docs/guides/managing-tools/tool-permissions)） | 希望**审查并批准**每一次变更和工具使用的用户 |
| **智能批准** | goose 采用基于风险的方法，**自动批准低风险操作**，并**标记其他操作**以供批准（支持细粒度的[工具权限](/docs/guides/managing-tools/tool-permissions)） | 希望根据操作影响在**自主与监督之间取得平衡**的用户 |
| **仅聊天** | goose **只进行聊天**，不使用扩展，也不修改文件 | 希望获得**对话式 AI 体验**、用于分析、写作和推理而不要自动化的用户 |

:::warning
默认应用 `Autonomous Mode`。
:::

## 配置 goose 模式

配置方法如下：

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

    你可以在会话之前或期间更改模式，并立即生效。

     <Tabs groupId="method">
      <TabItem value="session" label="In Session" default>

      点击底部菜单中的 <Tornado className="inline" size={16} /> 模式按钮。
      </TabItem>
      <TabItem value="settings" label="From Settings">
        1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
        2. 在侧边栏中点击 `Settings` 按钮。
        3. 点击 `Chat`。
        4. 在 `Mode` 下选择你想要的模式。
      </TabItem>
    </Tabs>   
  </TabItem>
  <TabItem value="cli" label="goose CLI">

    <Tabs groupId="method">
      <TabItem value="session" label="In Session" default>
        要在会话中途更改模式，使用 `/mode` 命令。

        * 自主：`/mode auto`
        * 智能批准：`/mode smart_approve`
        * 批准：`/mode approve`
        * 聊天：`/mode chat`     
      </TabItem>
      <TabItem value="settings" label="From Settings">
        1. 运行以下命令：

        ```sh
        goose configure
        ```

        2. 从菜单中选择 `goose settings` 并按 Enter。

        ```sh
        ┌ goose-configure
        │
        ◆ What would you like to configure?
        | ○ Configure Providers
        | ○ Add Extension
        | ○ Toggle Extensions
        | ○ Remove Extension
        // highlight-start
        | ● goose settings (Set the goose mode, Tool Output, Tool Permissions, Experiment, goose recipe github repo and more)
        // highlight-end
        └
        ```

        3. 从菜单中选择 `goose mode` 并按 Enter。

        ```sh
        ┌   goose-configure
        │
        ◇  What would you like to configure?
        │  goose settings 
        │
        ◆  What setting would you like to configure?
        // highlight-start
        │  ● goose mode (Configure goose mode)
        // highlight-end
        │  ○ Router Tool Selection Strategy 
        │  ○ Tool Permission 
        │  ○ Tool Output 
        │  ○ Max Turns 
        │  ○ Toggle Experiment 
        │  ○ goose recipe github repo 
        │  ○ Scheduler Type 
        └
        ```

        4. 选择你想配置的 goose 模式。

        ```sh
        ┌   goose-configure
        │
        ◇  What would you like to configure?
        │  goose settings
        │
        ◇  What setting would you like to configure?
        │  goose mode
        │
        ◆  Which goose mode would you like to configure?
        // highlight-start
        │  ● Auto Mode (Full file modification, extension usage, edit, create and delete files freely)
        // highlight-end
        |  ○ Approve Mode
        |  ○ Smart Approve Mode    
        |  ○ Chat Mode
        |
        └  Set to Auto Mode - full file modification enabled
        ```     
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

  :::info
  在手动批准和智能批准模式下，工具调用期间会话窗口中会显示 “Allow” 和 “Deny” 按钮。
  goose 只会为它认为是“写入”的工具请求权限，例如任何 “text editor write”、“text editor edit”、“bash - rm, cp, mv” 命令。
  
  读/写批准会尽力把工具分类为读或写。这一判断由你的 LLM 提供商解释。
  :::

## 与 CLI 提供商的权限集成

使用 Claude Code 等 [CLI 提供商](/docs/guides/cli-providers)时，goose 会与提供商的原生权限系统集成。在批准模式下，来自 Claude Code 的权限请求会经过 goose 的确认界面，给你统一的体验。

例如，Claude Code 处于批准模式时：
- Claude Code 检测敏感操作（文件写入、shell 命令、工具调用）
- 权限提示出现在 goose 的界面中（CLI 或桌面版）
- 你的允许/拒绝决定会送回 Claude Code
- Claude Code 根据你的回应继续或调整

此集成使用与官方 Claude Agent SDK 相同的机制，以确保兼容性和一致的行为。

设置细节见 [CLI 提供商 - Claude Code 配置](/docs/guides/cli-providers#claude-code-configuration)。
