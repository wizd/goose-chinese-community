---
title: Neon 扩展
description: 把 Neon MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import { PanelLeft } from 'lucide-react';

本教程介绍如何把 [Neon MCP 服务器](https://github.com/neondatabase/mcp-server-neon) 添加为 goose 扩展，以便操作 Neon Postgres 数据库，并管理项目、分支等资源。

Neon 提供两个版本的 MCP 服务器：

1. **远程 MCP 服务器**，由 Neon 托管。它会把你重定向到 neon.com，登录 Neon 账号。
2. **本地 MCP 服务器**，可以在自己的机器上运行，用 API 密钥连接指定组织或个人账号。

:::warning 安全提示
Neon MCP 服务器提供很强的数据库管理能力，仅适用于本地开发。执行前务必检查大模型请求的操作，不要在生产环境中使用。
:::

## 配置

<Tabs groupId="remote-or-local">
  <TabItem value="remote" label="Neon Remote MCP" default>
  :::tip 快速安装
  <Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
    [启动安装程序](goose://extension?type=streamable_http&url=https%3A%2F%2Fmcp.neon.tech%2Fmcp&id=neon&name=Neon&description=Manage%20Neon%20Postgres%20databases%2C%20projects%2C%20and%20branches)
    </TabItem>
    <TabItem value="cli" label="goose CLI">
    使用 `goose configure` 添加 `Remote Extension (Streamable HTTP)` 类型的扩展，并填写：

    **端点 URL**
    ```
    https://mcp.neon.tech/mcp
    ```
    </TabItem>
  </Tabs>
  :::

  :::info OAuth 流程
  浏览器会打开一个 OAuth 窗口。按提示授权访问你的 Neon 账号。
  :::

  <Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
      <GooseDesktopInstaller
        extensionId="neon"
        extensionName="Neon"
        description="Manage Neon Postgres databases, projects, and branches"
        type="http"
        url="https://mcp.neon.tech/mcp"
      />
    </TabItem>
    <TabItem value="cli" label="goose CLI">
      <CLIExtensionInstructions
        name="neon-mcp-remote"
        description="Manage Neon Postgres databases, projects, and branches"
        type="http"
        url="https://mcp.neon.tech/mcp"
        timeout={300}
      />
      </TabItem>
  </Tabs>

  </TabItem>

  <TabItem value="local" label="Neon Local MCP">
  :::tip 快速安装
  <Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
      [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=%40neondatabase%2Fmcp-server-neon&arg=start&arg=%3CYOUR_NEON_API_KEY%3E&id=neon&name=Neon&description=Manage%20your%20Neon%20Postgres%20databases%2C%20projects%2C%20and%20branches)
    </TabItem>
    <TabItem value="cli" label="goose CLI">
      **命令**
      ```sh
      npx -y @neondatabase/mcp-server-neon start <YOUR_NEON_API_KEY>
      ```
      
      不需要环境变量。
    </TabItem>
  </Tabs>
  :::

  :::info 前置条件

  - 系统已安装 [Node.js](https://nodejs.org/)（v18.0.0 或更高版本）。此命令使用 `npx`
  - 需要 Neon API 密钥，以便 Neon MCP 服务器向你的 Neon 账号认证。可以在 [Neon Console](https://console.neon.tech) 的个人资料设置里创建。详细步骤见 [Neon API 密钥文档](https://neon.com/docs/manage/api-keys#creating-api-keys)
  :::

  <Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="neon"
      extensionName="Neon"
      description="Manage your Neon Postgres databases, projects, and branches"
      command="npx"
      args={["-y", "@neondatabase/mcp-server-neon", "start", "<YOUR_NEON_API_KEY>"]}
    />
    </TabItem>

    <TabItem value="cli" label="goose CLI">
      <CLIExtensionInstructions
        name="Neon MCP"
        description="Manage Neon Postgres databases, projects, and branches"
        command="npx -y @neondatabase/mcp-server-neon start <YOUR_NEON_API_KEY>"
        timeout={300}
      />
    </TabItem>
  </Tabs>

  </TabItem>
</Tabs>

完整的安装和配置选项见 [Neon MCP 服务器官方文档](https://neon.com/docs/ai/neon-mcp-server)。

## 使用示例 1

查看所有 Neon 数据库项目及其配置概览。

### goose 提示词

```
列出我的 Neon 项目
```

### goose 输出

```
我用 neon__list_projects 工具列出你的 Neon 项目。默认显示前 10 个。

你的 Neon 项目如下：

1. laravel-test（ID：mute-mountain-08595850）
- 区域：AWS US East 2
- 创建时间：2025 年 7 月 23 日
- PostgreSQL：v17

2. rls-test（ID：noisy-hill-99207787）
- 区域：AWS US East 2
- 创建时间：2025 年 7 月 20 日
- PostgreSQL：v17

3. neon-auth-test（ID：rapid-pond-81053507）
- 区域：Azure East US 2
- 创建时间：2025 年 7 月 7 日
- PostgreSQL：v17

4. saas-starter-kit-nextjs（ID：misty-poetry-78149700）
- 区域：AWS US West 2
- 创建时间：2025 年 6 月 23 日
- PostgreSQL：v17
- 备注：已启用逻辑复制

5. neon-auth-mcp-oauth（ID：gentle-base-21700263）
- 区域：AWS US West 2
- 创建时间：2025 年 6 月 4 日
- PostgreSQL：v17

所有项目都在运行 PostgreSQL 17，并配置了 1–2 个计算单元的自动扩缩容。需要查看某个项目的更多细节吗？
```

## 使用示例 2

查看某个项目里有哪些表和 schema。

### goose 提示词

```
我的 neon-auth-mcp-oauth 项目里有哪些表？
```

### goose 输出

```
在 neon-auth-mcp-oauth 项目中有一张表：

neon_auth schema 中的 users_sync
```

## 使用示例 3

对数据库表运行查询，检索并分析数据。

### goose 提示词

```
统计 users_sync 表的行数。
```

### goose 输出

```
我用 COUNT 查询统计 neon_auth.users_sync 表的行数。

记录总数：1 行
表位置：schema neon_auth，表 users_sync
项目：neon-auth-mcp-oauth（项目 ID：gentle-base-21700263）
内容：包含一条用户记录
```
