---
sidebar_position: 56
title: MCP Roots
sidebar_label: MCP Roots
description: goose 如何把工作目录分享给支持 roots 的 MCP 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PanelLeft } from 'lucide-react';

MCP Roots 让 goose 把会话工作目录分享给支持 roots 的 MCP 扩展。

这有助于扩展理解当前会话应把哪个文件夹当作活动工作区。

:::info
[MCP Roots](https://modelcontextprotocol.io/specification/2025-06-18/client/roots) 是 Model Context Protocol 中的一项能力。对于支持 roots 的 MCP 扩展，goose 会自动启用它。
:::

## MCP Roots 如何工作

goose 连接到 MCP 扩展时，会在 MCP 初始化期间声明支持 roots。

支持 roots 的扩展随后可以：

- 向 goose 请求当前的 root 列表
- 把该 root 当作活动工作区边界
- 在会话期间 root 发生变化时做出反应

在 goose 中，root 列表目前只包含一项：

- 你当前会话的工作目录

如果你更改会话工作目录，goose 会更新 root，并自动通知已连接的扩展。

## 使用 MCP Roots

goose 中没有单独的 “Roots” 设置界面。MCP Roots 跟随你已经在为该会话使用的工作目录。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

  在 goose 桌面版中，当前工作目录显示在聊天窗口底部。

  1. 点击目录显示以选择其他文件夹
  2. goose 更新会话工作目录
  3. 已连接的、支持 roots 的扩展会自动收到更新后的 root

  要更改目录：

  1. 如有需要，点击 <PanelLeft className="inline" size={16} /> 按钮并打开一个会话
  2. 使用聊天窗口底部显示的目录控件
  3. 选择希望 goose 和扩展在其中工作的文件夹

  </TabItem>
  <TabItem value="cli" label="goose CLI">

  在 goose CLI 中，会话 root 跟随你启动 goose 时所在的目录。

  - 从你想工作的项目文件夹启动 goose
  - 恢复会话时，goose 可能会提示你切换回该会话原来的工作目录

  因此，支持 roots 的扩展看到的工作区目录，与 goose 在 CLI 中已经使用的目录相同。

  </TabItem>
</Tabs>

## 扩展用它做什么

MCP Roots 适合需要处理本地文件或理解项目结构的扩展。

没有 roots 时，扩展可能需要猜测你指的是哪个文件夹，或依赖自定义配置。有了 roots，goose 可以告诉扩展当前会话范围内的目录是哪一个。

例如，扩展可以用 roots 来：

- 发现活动项目目录
- 把文件操作限定在当前工作区
- 避免猜测你指的是哪个仓库或文件夹
- 在你切换到另一个项目时更新自己的行为

## 当前限制

goose 目前每个会话只暴露一个 root，而不是多文件夹工作区。对大多数工作流来说，这与 goose 已有的方式一致：一次一个活动项目目录。

如果希望扩展在其他位置工作，请先更改会话工作目录。

## 面向扩展开发者

如果你在为 goose 构建 MCP 扩展，支持 roots 可以让扩展以标准方式发现活动工作区目录，而不必依赖自定义配置。

协议细节见 [MCP Roots 规范](https://modelcontextprotocol.io/specification/2025-06-18/client/roots)。
