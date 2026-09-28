---
title: Netlify 扩展
description: 把 Netlify MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/iSUNmxOf6gw" />

本教程介绍如何把 [Netlify MCP 服务器](https://github.com/netlify/netlify-mcp) 添加为 goose 扩展，用来构建、部署和管理 Netlify 站点。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=%40netlify%2Fmcp&id=netlify-mcp&name=Netlify&description=Build%2C%20deploy%2C%20and%20manage%20sites%20with%20Netlify%27s%20official%20MCP%20server.)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y @netlify/mcp
  ```
  </TabItem>
</Tabs>
:::

## 配置

先确认已经登录 Netlify 账号：

```bash
netlify login
```

### 添加 Netlify MCP 服务器

:::info
运行此命令需要系统已安装 [Node.js](https://nodejs.org/)，因为会用到 `npx`。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="netlify-mcp"
    extensionName="Netlify"
    description="Build, deploy, and manage sites with Netlify's official MCP server."
    command="npx"
    args={["-y", "@netlify/mcp"]}
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Netlify"
      description="Build, deploy, and manage sites with Netlify's official MCP server"
      command="npx -y @netlify/mcp"
    />
  </TabItem>
</Tabs>

## 使用示例

这个示例演示如何用 goose 和 Netlify 扩展部署一个 Web 应用。

### goose 提示词

> 能通过我的 GitHub 仓库把应用部署到 Netlify 吗？

### goose 输出

:::note 命令行

<details>
    <summary>工具调用</summary>
    我来帮你把井字棋应用从 GitHub 仓库部署到 Netlify。先查看你的 Netlify 账号，再配置部署。

    ─── netlify-user-services | netlify ──────────────────────────

    selectSchema: <br/>
        &nbsp;&nbsp;&nbsp;&nbsp;operation: get-user <br/>
        &nbsp;&nbsp;&nbsp;&nbsp;params:

    很好。你已经登录 Netlify，并且连上了 GitHub 账号。接下来我会新建一个 Netlify 站点，并从 GitHub 仓库部署井字棋应用。

    ─── netlify-project-services | netlify ──────────────────────────

    selectSchema:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;operation: create-new-project<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;params:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: tic-tac-toe-game

    换一个项目名再试一次：

    ─── netlify-project-services | netlify ──────────────────────────

    selectSchema:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;operation: create-new-project<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;params:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: janedoe-tic-tac-toe

    完成。我已经创建了名为 "janedoe-tic-tac-toe" 的 Netlify 站点。接下来从 GitHub 仓库部署代码：

    ─── netlify-deploy-services | netlify ──────────────────────────

    selectSchema:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;operation: deploy-site<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;params:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deployDirectory: /Users/janedoe/Development/tic-tac-toe<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;siteId: 1731e49e-1d0a-49a3-ad95-975b550f324a

    我来查看部署状态，并拿到站点的线上地址：

    ─── netlify-project-services | netlify ──────────────────────────

    selectSchema:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;operation: get-project<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;params:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;siteId: 1731e49e-1d0a-49a3-ad95-975b550f324a
</details>
:::

🎉 **成功！井字棋游戏已经部署到 Netlify。**

## 部署详情：

- **线上地址**：http://janedoe-tic-tac-toe.netlify.app
- **Netlify 项目控制台**：https://app.netlify.com/projects/janedoe-tic-tac-toe
- **站点 ID**：1731e49e-1d0a-49a3-ad95-975b550f324a

## 部署了哪些内容：

✅ **HTML**：游戏主界面

✅ **CSS**：带动画和响应式布局的现代样式

✅ **JavaScript**：完整的游戏逻辑和交互

✅ **README**：项目文档

## 下一步：

1. **访问线上站点**：http://janedoe-tic-tac-toe.netlify.app
2. **试玩游戏**：确认一切符合预期
3. **分享给别人**：游戏已经在网上可访问

## 以后如何更新：

代码是从本地目录部署的。如果要改动：

1. 更新本地文件
2. 把改动推送到 GitHub 仓库
3. 然后可以：
   - 用同样的命令手动重新部署
   - 配置从 GitHub 持续部署（推送后自动部署）

需要我帮你配置从 GitHub 仓库持续部署，让以后的改动自动上线吗？

井字棋游戏已经上线，可以开始玩了。🎮
