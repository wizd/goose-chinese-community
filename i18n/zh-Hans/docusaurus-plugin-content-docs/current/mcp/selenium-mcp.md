---
title: Selenium 扩展
description: 把 Selenium MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/PLqPOEeGPLc" />


本教程介绍如何把 [Selenium MCP 服务器](https://github.com/angiejones/mcp-selenium) 添加为 goose 扩展，用来自动化浏览器操作，例如打开网页和填写表单。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=%40angiejones%2Fmcp-selenium&id=selenium-mcp&name=Selenium%20MCP&description=automates%20browser%20interactions)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y @angiejones/mcp-selenium
  ```
  </TabItem>
</Tabs>
:::

## 配置

:::info
运行此命令需要系统已安装 [Node.js](https://nodejs.org/)，因为会用到 `npx`。
:::


<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="selenium-mcp"
    extensionName="Selenium MCP"
    description="automates browser interactions"
    command="npx"
    args={["-y", "@angiejones/mcp-selenium"]}
  />
</TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Selenium"
      description="Automates browser interactions"
      command="npx -y @angiejones/mcp-selenium"
    />
  </TabItem>
</Tabs>

## 使用示例

下面用 goose 从零做一个测试自动化项目。我们用 Selenium MCP 自动填写网页表单，再让 goose 生成一份 Selenium 项目代码，方便以后再次运行这些测试。


### goose 提示词

> 用 selenium 打开 heroku formy 站点，用通用数据填写表单页。然后把你做的事情变成一份自动化脚本。我希望用 Java，并使用 Page Object Model 模式。


### goose 输出

<iframe class="aspect-ratio" src="https://www.youtube.com/embed/mRV0N8hcgYA?start=28&end=152" title="YouTube 视频播放器" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
