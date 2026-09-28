---
title: Apify 扩展
description: 将 Apify MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';

本教程介绍如何将 [Apify MCP 服务器](https://mcp.apify.com) 添加为 goose 扩展，让 goose 能够调用 [Apify Store](https://apify.com/store) 中的数千个工具，从社交媒体、电商网站、搜索引擎、在线地图或任何其他网站提取数据。

## 配置

<Tabs groupId="remote-or-local">
<!-- 远程设置 -->
<TabItem value="remote" label="Apify 远程 MCP" default>

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
   [启动安装程序](goose://extension?type=streamable_http&url=https%3A%2F%2Fmcp.apify.com&id=apify&name=Apify&description=Extract%20data%20from%20any%20website%20with%20thousands%20of%20scrapers%2C%20crawlers%2C%20and%20automations%20on%20Apify%20Store&header=Authorization%3DBearer%20YOUR_APIFY_TOKEN)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  添加 `Remote Extension (Streamable HTTP)` 扩展类型，并填写：

  **端点 URL**
  ```
  https://mcp.apify.com
  ```
  </TabItem>
</Tabs>

  **自定义请求头**
  ```
  Authorization: Bearer <YOUR_APIFY_TOKEN>
  ```
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="apify"
      extensionName="Apify"
      description="借助 Apify Store 上的数千个抓取器、爬虫和自动化，从任何网站提取数据"
      type="http"
      url="https://mcp.apify.com"
      envVars={[
        { name: "Authorization", label: "Bearer YOUR_APIFY_TOKEN" }
      ]}
      apiKeyLink="https://console.apify.com/settings/integrations"
      apiKeyLinkText="Apify Token"
    />
  </TabItem>

  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Apify"
      description="借助 Apify Store 上的数千个抓取器、爬虫和自动化，从任何网站提取数据"
      type="http"
      url="https://mcp.apify.com"
      timeout={300}
      envVars={[
        { key: "Authorization", value: "Bearer apify_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }
      ]}
      infoNote={
        <>
          获取你的 <a href="https://console.apify.com/settings/integrations" target="_blank" rel="noopener noreferrer">Apify Token</a>，并将其作为 <code>Bearer</code> 令牌粘贴。
        </>
      }
    />
  </TabItem>
</Tabs>

</TabItem>

<!-- 本地设置 -->
<TabItem value="local" label="Apify 本地 MCP">

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=@apify/actors-mcp-server&arg=start&id=mcp_apify_local&name=Apify%20Local%20MCP%20Server&description=Run%20Apify%20MCP%20server%20locally%20using%20your%20token&env=APIFY_TOKEN%3DYour%20Apify%20Token)
  </TabItem>

  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y @apify/actors-mcp-server
  ```
  </TabItem>
</Tabs>

**环境变量**
```
APIFY_TOKEN: <YOUR_APIFY_TOKEN>
```
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="mcp_apify_local"
      extensionName="Apify Local MCP Server"
      description="借助 Apify Store 上的数千个抓取器、爬虫和自动化，从任何网站提取数据"
      type="stdio"
      command="npx"
      args={["-y", "@apify/actors-mcp-server"]}
      envVars={[
        { name: "APIFY_TOKEN", label: "<YOUR_APIFY_TOKEN>" }
      ]}
      apiKeyLink="https://console.apify.com/settings/integrations"
      apiKeyLinkText="Apify Token"
    />
  </TabItem>

  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Apify Local MCP Server"
      description="借助 Apify Store 上的数千个抓取器、爬虫和自动化，从任何网站提取数据"
      type="stdio"
      command="npx -y @apify/actors-mcp-server"
      timeout={300}
      envVars={[
        { key: "APIFY_TOKEN", value: "apify_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }
      ]}
      infoNote={
        <>
          获取你的 <a href="https://console.apify.com/settings/integrations" target="_blank" rel="noopener noreferrer">Apify Token</a> 并粘贴到此处。
        </>
      }
    />
  </TabItem>
</Tabs>

</TabItem>
</Tabs>

## 使用示例

Apify MCP 服务器让你把 goose 连接到 [Apify Store](https://apify.com/store)。这是一个包含数千个现成工具（称为 _Actor_）的市场，覆盖各类网页抓取、爬取和数据提取场景。更多关于 Apify Actor 的内容见[官方文档](https://docs.apify.com/platform/actors)。

在这个示例中，goose 将使用 [Google Places Scraper](https://apify.com/compass/crawler-google-places) Actor，根据公开评分、评论和精致餐饮认可度，找出布拉格最可信、评分最高的意大利餐厅。

### goose 提示词

```

( O)> 找出布拉格评分最高、可信度可核实的意大利餐厅。使用 Apify MCP 找到 Google Maps 评论抓取 Actor，关注至少 200 条以上评论、在 Google、TripAdvisor 或 OpenTable 上平均评分 4.7 或更高，以及任何米其林或精致餐饮认可的地点。请包含餐厅名称、评分、评论总数、地址、菜系风格，以及它脱颖而出的简短原因（例如服务、氛围或招牌菜）。只返回评分与评论数之比最高的 1 家餐厅

```

### goose 输出

```

根据收集到的信息，布拉格评分最高、可信度可核实的意大利餐厅是：

### **Al Tagliere**

* **评分：** 4.7/5
* **评论总数：** 457
* **地址：** [TripAdvisor 上的 Al Tagliere](https://www.tripadvisor.com/Restaurant_Review-g274707-d6835155-Reviews-Al_Tagliere-Prague_Bohemia.html)
* **菜系风格：** 意大利菜
* **简介：** Al Tagliere 以其展现地方风味的正宗意大利菜而闻名。餐厅以愉悦的氛围、周到的服务，以及自制意面和传统甜点等招牌菜著称。顾客经常提到食材新鲜、气氛热情，因此它是本地人和游客都偏爱的选择。

这家餐厅声誉良好，符合你对品质和可信度的标准。

```
