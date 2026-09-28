---
title: Square MCP 扩展
description: 把 Square API 添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<details>
  <summary> 🎥 Square MCP 服务器视频演示</summary>
  <iframe
  class="aspect-ratio"
  src="https://www.youtube.com/embed/y6pklrzhzNg"
  title="用 AI 经营业务 | Square MCP 服务器"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  ></iframe>
</details>


本教程帮助你开始使用 [Square MCP 服务器](https://developer.squareup.com/docs/mcp)，对 Square 商家账号进行交互式和自动化操作。Square MCP 服务器是一个开源项目，让你通过 goose 与 Square API 交互。

Square 提供两个版本的 MCP 服务器：

1. **远程 MCP 服务器**，由 Square 托管。它使用 OAuth 认证，并允许对 API 使用做细粒度权限控制。
2. **本地 MCP 服务器**，可以在自己的机器上运行。它使用访问令牌认证，并允许完整的 API 访问。

:::info
运行安装命令需要系统已安装 [Node.js](https://nodejs.org/)，这些命令会用到 `npx`。
:::

## 配置

<Tabs groupId="remote-or-local">
  <TabItem value="remote" label="Square Remote MCP" default>
  :::tip 快速安装
  <Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
    [启动安装程序](https://mcp.squareup.com/goose)
    </TabItem>
    <TabItem value="cli" label="goose CLI">
    **命令**
    ```sh
    npx mcp-remote https://mcp.squareup.com/sse
    ```
    </TabItem>
  </Tabs>
  :::

  <Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
     1. [启动安装程序](https://mcp.squareup.com/goose)
     2. 点击 `OK` 确认安装
     3. goose 应会打开一个浏览器标签页，进入 OAuth 权限页面。仔细核对你要允许的权限，然后点击 `Grant Access`。
     4. 系统会要求你登录或重新认证 Square，并可能要求你确认要允许的权限。
     5. 在 goose 中进入聊天

    </TabItem>
    <TabItem value="cli" label="goose CLI">
      <CLIExtensionInstructions
        name="square-mcp-remote"
        type="stdio"
        command="npx mcp-remote https://mcp.squareup.com/sse"
        timeout={300}
      />

      下次开始会话时，goose 会打开浏览器，让你授予权限并登录 Square 账号。
  
    </TabItem>
  </Tabs>
</TabItem>

  <TabItem value="local" label="Square Local MCP">
  :::tip 快速安装
  <Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
    [启动安装程序](goose://extension?cmd=npx&arg=square-mcp-server&arg=start&id=square-mcp&name=Square%20MCP%20Server&description=Square%20API%20MCP%20Server&env=ACCESS_TOKEN%3DYour%20Access%20Token&env=SANDBOX%3Dtrue)

    </TabItem>
    <TabItem value="cli" label="goose CLI">
    **命令**
    ```sh
    npx square-mcp-server start
    ```
    </TabItem>
  </Tabs>
    **环境变量**
    ```
    ACCESS_TOKEN: <YOUR_API_KEY>
    SANDBOX: <true/false>
    PRODUCTION: <true/false>
    ```

    注意：使用 `SANDBOX` 或 `PRODUCTION` 其中之一，不要同时使用。`ACCESS_TOKEN` 应是沙箱令牌或生产令牌，与你选择的环境一致。
  :::

  <Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="square-mcp"
      extensionName="Square MCP Server"
      description="Square API MCP Server"
      command="npx"
      args={["square-mcp-server", "start"]}
      envVars={[
        { name: "ACCESS_TOKEN", label: "Your Access Token" },
        { name: "SANDBOX", label: "true" }
      ]}
      appendToStep3="Set either SANDBOX or PRODUCTION to true (the access token must match the environment)"
      apiKeyLink="https://developer.squareup.com/apps"
      apiKeyLinkText="Square Access Token"
    />
    </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="square-mcp"
      type="stdio"
      command="npx square-mcp-server start"
      timeout={300}
      envVars={[
        { key: "ACCESS_TOKEN", value: "▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪" },
        { key: "SANDBOX", value: "true" }
      ]}
      infoNote={
        <>
          Obtain your <a href="https://developer.squareup.com/apps" target="_blank" rel="noopener noreferrer">Square Access Token</a> and paste it in. Set either <code>SANDBOX</code> or <code>PRODUCTION</code> to true (the access token must match the environment)
        </>
      }
    />
    </TabItem>
  </Tabs>

  </TabItem>
</Tabs>

## 使用示例

Square MCP 服务器让你通过庞大的[服务目录](https://github.com/square/square-mcp-server?tab=readme-ov-file#service-catalog)与 Square 的 Connect API 交互，从而访问 Square API 生态。

#### goose 提示词

```
( O)> 从下面这张图片找出我的食物菜单，并导入我的 Square 商家账号。"my-burger-menu.png"
```

[演示中使用的菜单图片在这里。](/img/guides/square-mcp-goosin-menu.png)

#### goose 输出

```
我来帮你把这些菜单项导入 Square 目录。我会用 Square API 为每个汉堡创建目录商品。步骤如下：

1. 先查看目录 API 的服务信息和类型
2. 再为每个汉堡创建目录商品

现在查看创建目录对象所需的类型信息

接下来用目录 API 逐个为菜单里的汉堡创建目录商品：

（输出已截断）

我已经成功把菜单里的所有汉堡创建到你的 Square 目录中。每个汉堡都包含：

- 菜单上的准确名称
- 完整描述
- 正确价格
- 用于下单的标准变体

创建内容摘要：
- The Classic - $10.00
- Cheeseburger - $11.00
- Primetime Burger - $12.00
- Double Bacon - $14.00
- Texas Meatlover - $12.50
- Buffalo Burger - $12.00
- The Atomic - $12.50
- Little Bird - $11.00
- Mushroom Burger - $10.00

所有商品现在都在你的 Square 目录中，可以在销售点系统里使用。每个汉堡都带有完整描述，并有一个价格已指定的 "Regular" 变体。商品默认既可销售也可库存管理，且在所有门店可用。
```
