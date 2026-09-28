---
title: Asana 扩展
description: 将 Asana MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<!--<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/VIDEO_ID" />-->


本教程介绍如何将 [Asana MCP 服务器](https://github.com/roychri/mcp-server-asana) 添加为 goose 扩展，以实现任务自动化、项目跟踪和团队协作。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=%40roychri%2Fmcp-server-asana&id=asana-mcp&name=Asana&description=enable%20task%20automation%2C%20project%20tracking%2C%20and%20team%20collaboration&env=ASANA_ACCESS_TOKEN%3DAsana%20Access%20Token)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y @roychri/mcp-server-asana
  ```
  </TabItem>
</Tabs>
  **环境变量**
  ```
  ASANA_ACCESS_TOKEN: <YOUR_TOKEN>
  ```
:::

## 配置

:::info
运行此命令需要在系统上安装 [Node.js](https://nodejs.org/)，因为它使用 `npx`。
:::


<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="asana-mcp"
    extensionName="Asana"
    description="实现任务自动化、项目跟踪和团队协作"
    command="npx"
    args={["-y", "@roychri/mcp-server-asana"]}
    envVars={[
      { name: "ASANA_ACCESS_TOKEN", label: "Asana Access Token" }
    ]}
    apiKeyLink="https://app.asana.com/0/my-apps"
    apiKeyLinkText="Asana Access Token"
  />
  :::info
  如果需要创建访问令牌的详细步骤，请参阅 [Asana 开发者文档](https://developers.asana.com/docs/personal-access-token)。
  :::
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Asana"
      description="实现任务自动化、项目跟踪和团队协作"
      command="npx -y @roychri/mcp-server-asana"
      envVars={[
        { key: "ASANA_ACCESS_TOKEN", value: "▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪" }
      ]}
      infoNote={
        <>
          获取你的 <a href="https://app.asana.com/0/my-apps" target="_blank" rel="noopener noreferrer">Asana Access Token</a> 并粘贴到此处。如果需要创建访问令牌的详细步骤，请参阅 <a href="https://developers.asana.com/docs/personal-access-token" target="_blank" rel="noopener noreferrer">Asana 开发者文档</a>。
        </>
      }
    />
  </TabItem>
</Tabs>

## 使用示例

### goose 提示词

> _goose，我有一个小时。请查看 Asana 里分配给我且尚未完成的任务，找出你估计一小时以内能完成的那些，并按截止日期排序。_


### goose 输出

ID 已替换为通用占位符。

:::note CLI

<details>
    <summary>工具调用</summary>

    ─── asana_search_tasks | abcdefgh ──────────────────────────

    assignee.any: me

    completed: false

    workspace: 1234567890123



    ─── asana_get_task | abcdefgh ──────────────────────────

    opt_fields: due_on,estimated_hours

    task_id: 1100000000000001


    ─── asana_get_task | abcdefgh ──────────────────────────

    opt_fields: due_on,estimated_hours

    task_id: 1100000000000002


    ─── asana_get_task | abcdefgh ──────────────────────────

    opt_fields: due_on,estimated_hours

    task_id: 1100000000000003


    ─── asana_get_task | abcdefgh ──────────────────────────

    opt_fields: due_on,estimated_hours

    task_id: 1100000000000004


    ─── asana_get_task | abcdefgh ──────────────────────────

    opt_fields: due_on,estimated_hours

    task_id: 1100000000000005


    ─── asana_get_task | abcdefgh ──────────────────────────

    opt_fields: due_on,estimated_hours

    task_id: 1100000000000006


    ─── asana_get_task | abcdefgh ──────────────────────────

    opt_fields: due_on,estimated_hours

    task_id: 1100000000000007


    ─── asana_get_task | abcdefgh ──────────────────────────

    opt_fields: due_on,estimated_hours

    task_id: 1100000000000008


    ─── asana_get_task | abcdefgh ──────────────────────────

    opt_fields: due_on,estimated_hours

    task_id: 1100000000000009


    ─── asana_get_task | abcdefgh ──────────────────────────

    opt_fields: due_on,estimated_hours

    task_id: 1100000000000010
</details>



以下是 Asana 中估计一小时以内能完成、且尚未完成的任务，已按截止日期排序：

1. **任务：** 审阅团队会议纪要
   - **截止日期：** 2025-03-21

2. **任务：** 起草简短状态更新
   - **截止日期：** 2025-03-21

3. **任务：** 校对博客文章
   - **截止日期：** 2025-03-21

4. **任务：** 给合作伙伴发送提醒
   - **截止日期：** 2025-03-27

如果需要某个任务的更多信息或帮助，请告诉我！
:::
