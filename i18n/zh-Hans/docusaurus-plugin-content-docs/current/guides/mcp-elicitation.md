---
sidebar_position: 55
title: MCP Elicitation
sidebar_label: MCP Elicitation
description: 扩展如何在任务进行中向你请求结构化信息
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

MCP Elicitation 让 goose 在扩展需要特定信息时暂停并询问你。goose 不会猜测或自行假设，而是给出一张表单，只请求继续执行所必需的内容。

该功能在 goose 中默认启用。当支持 elicitation 的扩展需要你的信息时，会话里会出现一张表单。

:::info
[MCP Elicitation](https://modelcontextprotocol.io/specification/draft/client/elicitation) 是 Model Context Protocol 中的一项能力。goose 支持表单模式请求。
:::

## MCP Elicitation 如何工作

扩展需要信息时，goose 会暂停并展示一张表单供你填写。你可以提交回答，也可以取消请求。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

    聊天中会内联出现一张表单，包含：
    - 所请求数据的字段
    - 必填字段以星号（*）标出
    - 可以接受或修改的默认值
    - 用于发送回答的 **提交** 按钮

    提交后，你会看到一条确认消息。

  </TabItem>
  <TabItem value="cli" label="goose CLI">

    终端中会出现提示，包含：
    - 说明需要哪些信息的消息（青色）
    - 字段名（黄色）及其说明
    - 必填字段以红色星号（*）标出
    - 方括号中的默认值，例如 `[default]`

    为每个字段输入回答并按 Enter。是/否问题会显示可交互的切换控件。

    要取消请求，按 `Ctrl+C`。

  </TabItem>
</Tabs>

:::info 超时
Elicitation 请求会在 5 分钟后超时。若未及时回应，请求会被取消，goose 会在没有这些信息的情况下继续。
:::

## 面向扩展开发者

想在自己的扩展里加入 elicitation？请参阅 [MCP Elicitation 规范](https://modelcontextprotocol.io/specification/draft/client/elicitation)，了解 MCP 服务器如何向用户请求结构化输入。
