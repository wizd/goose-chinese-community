---
title: Vercel 扩展
description: 把 Vercel MCP 服务器添加为 goose 扩展，用于管理部署
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/-Y-werFKtTw" />

本教程介绍如何把 [Vercel MCP 服务器](https://vercel.com/docs/mcp/vercel-mcp) 添加为 goose 扩展，以便直接在 goose 里管理 Vercel 项目和部署状态。

:::info
运行安装命令需要系统已安装 [Node.js](https://nodejs.org/)，这些命令会用到 `npx`。
:::

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?url=https%3A%2F%2Fmcp.vercel.com&type=streamable_http&id=vercel&name=Vercel&description=Access%20deployments%2C%20manage%20projects%2C%20and%20more%20with%20Vercel%E2%80%99s%20official%20MCP%20server)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    ```sh
    npx mcp-remote https://mcp.vercel.com
    ```
  </TabItem>
</Tabs>
:::

## 配置

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="Vercel"
      extensionName="Vercel"
      description="Access Vercel deployments and manage projects"
      type="http"
      url="https://mcp.vercel.com"
    />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Vercel"
      description="Access Vercel deployments and manage projects"
      type="http"
      url="https://mcp.vercel.com"
      timeout={300}
    />
  </TabItem>
</Tabs>

## 使用示例

### goose 提示词
```
通过 Vercel MCP 服务器列出我的 Vercel 项目，并做一张表，显示我上次部署每个项目的时间，以及其他我该知道的状态细节。
```

第一次使用 Vercel MCP 服务器时，系统会提示你通过 OAuth 向 Vercel 认证。

### goose 输出
```
我来获取你的 Vercel 项目，并做一张包含部署细节的表。先获取你的团队，以确定用哪个团队列出项目。

> List Teams

> teamId: team_p3hPvXImXmdkbZ36FoqhoyYo


现在获取每个项目的部署信息，查看最近的部署日期和状态：

> projectId, teamId

> projectId, teamId

> projectId, teamId

再获取每个项目的更多细节，以便给出完整的表：

> projectId, teamId

> projectId, teamId

> projectId, teamId

根据你的 Vercel 项目数据，下面是项目状态和部署信息的汇总表：

Vercel 项目概览
```
项目名称|框架|状态|最近部署|自定义域名|GitHub 仓库|备注
---|---|---|---|---|---|---
project1|Next.js|🟡 构建中|2025 年 9 月 8 日（今天）|无|about-me|正在构建，最新的项目
project2|Next.js|✅ 就绪|2025 年 5 月 12 日|example.com|starter-blog|站点 2 的备注
project3|Static|✅ 就绪|2024 年 10 月 25 日|无|sample.com|站点 3 的备注

```
关键细节与状态摘要

🟡 project1（正在构建）
创建时间：今天（2025 年 9 月 8 日）
状态：正在构建（部署进行中）
最近提交："first"（2025 年 9 月 8 日）
Node 版本：22.x
问题：这是你最新的项目，部署仍在进行

✅ project2（生产就绪）
创建时间：2024 年 8 月 21 日
状态：生产就绪并已上线
自定义域名：example.com（带 www 重定向）
最近更新："grammar fix"（2025 年 5 月 12 日）
Node 版本：20.x
活动：最活跃的项目，有 12 次部署
备注：3 月 12 日有一次失败部署，但已成功恢复

✅ project3（生产就绪）
创建时间：2024 年 10 月 25 日
状态：生产就绪
最近更新："updated public to remove localhost"（2024 年 10 月 25 日）
Node 版本：20.x
活动：一次成功部署

建议
- 关注正在构建的项目：project1 目前还在构建
- 作品集维护：project2 维护良好，使用活跃
- 域名设置：如有需要，考虑给其他项目加上自定义域名
- Node 版本：你混用了 20.x 和 22.x，可以考虑统一
- 所有项目都连到了 GitHub 仓库，并配置了自动部署。
```
