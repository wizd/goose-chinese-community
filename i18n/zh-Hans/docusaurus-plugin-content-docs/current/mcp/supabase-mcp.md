---
title: Supabase 扩展
description: 把 Supabase MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';

本教程介绍如何把 [Supabase MCP 服务器](https://github.com/supabase-community/supabase-mcp) 添加为 goose 扩展，以便与 Supabase 项目交互、管理表、查询数据、部署 Edge Functions，并直接操作 Supabase 后端。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?type=streamable_http&url=https%3A%2F%2Fmcp.supabase.com%2Fmcp&id=supabase&name=Supabase&description=Connect%20your%20Supabase%20projects%20to%20AI%20assistants.%20Manage%20tables%2C%20query%20data%2C%20deploy%20Edge%20Functions%2C%20and%20interact%20with%20your%20Supabase%20backend%20directly%20from%20your%20MCP%20client.)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  使用 `goose configure` 添加 `Remote Extension (Streamable HTTP)` 类型的扩展，并填写：
  
  **端点 URL**
  ```
  https://mcp.supabase.com/mcp
  ```
  </TabItem>
</Tabs>
:::

## 配置

### Supabase 远程 MCP

Supabase MCP 服务器由 Supabase 托管，并提供基于 OAuth 的认证。连接时，你会被重定向到 supabase.com 登录账号。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

    <GooseDesktopInstaller
      extensionId="supabase"
      extensionName="Supabase"
      description="Connect your Supabase projects to AI assistants. Manage tables, query data, deploy Edge Functions, and interact with your Supabase backend directly from your MCP client."
      type="http"
      url="https://mcp.supabase.com/mcp"
      envVars={[]}
    />

  </TabItem>
  <TabItem value="cli" label="goose CLI">

    <CLIExtensionInstructions
      name="Supabase"
      description="Connect your Supabase projects to AI assistants. Manage tables, query data, deploy Edge Functions, and interact with your Supabase backend directly from your MCP client."
      type="http"
      url="https://mcp.supabase.com/mcp"
      timeout={300}
      envVars={[]}
    />
    
  </TabItem>
</Tabs>

#### OAuth 流程

第一次通过 goose 连接 Supabase MCP 服务器时，浏览器会打开一个 OAuth 窗口。按提示授权访问你的 Supabase 项目。

:::note 安全提示
Supabase MCP 服务器可以访问你的数据库和项目管理能力。执行前务必检查大模型请求的操作，并确认你处在合适的环境（开发、预发或生产）。
:::

## 使用示例

### 示例 1：列出 Supabase 项目

查看所有 Supabase 项目及其配置概览。

#### goose 提示词

```
列出我的全部 Supabase 项目
```

#### goose 输出

:::note 桌面版

```
你的 Supabase 项目如下：

1. my project（ID：abc123xyz789defg）
   - 区域：US West 1
   - 创建时间：2025 年 10 月 30 日
   - 状态：ACTIVE_HEALTHY
   - 数据库：PostgreSQL 17.6.1.031（引擎 v17）
   - 主机：db.abc123xyz789defg.supabase.co

2. new project（ID：jkl456mno012pqrs）
   - 区域：US West 1
   - 创建时间：2025 年 10 月 31 日
   - 状态：INACTIVE
   - 数据库：PostgreSQL 17.6.1.032（引擎 v17）
   - 主机：db.jkl456mno012pqrs.supabase.co

需要查看某个项目的更多细节吗？
```

:::

### 示例 2：查询数据库表

发现并查询 Supabase 项目中的表。

#### goose 提示词

```
我的项目里有哪些表？
```

#### goose 输出

:::note 桌面版

```
my project 中的表（public schema）：

1. users
   - 已启用 RLS：是
   - 行数：150
   - 列：id (uuid)、email (text)、name (text)、created_at (timestamptz)、role (text)
   - 主键：id
   - 外键：被 posts.user_id、profiles.user_id 引用

2. posts
   - 已启用 RLS：是
   - 行数：342
   - 列：id (uuid)、user_id (uuid)、title (text)、content (text)、created_at (timestamptz)
   - 主键：id
   - 外键：引用 users.id，被 comments.post_id 引用

3. comments
   - 已启用 RLS：是
   - 行数：1089
   - 列：id (uuid)、post_id (uuid)、user_id (uuid)、content (text)、created_at (timestamptz)
   - 主键：id
   - 外键：引用 posts.id，引用 users.id

4. profiles
   - 已启用 RLS：是
   - 行数：150
   - 列：id (uuid)、user_id (uuid)、bio (text)、avatar_url (text)、updated_at (timestamptz)
   - 主键：id
   - 外键：引用 users.id

5. categories
   - 已启用 RLS：否
   - 行数：12
   - 列：id (uuid)、name (text)、description (text)、created_at (timestamptz)
   - 主键：id

要从其中某张表查询数据吗？
```

:::

### 示例 3：部署 Edge Function

直接通过 goose 部署和管理 Supabase Edge Functions。

#### goose 提示词

```
部署一个名为 hello-world 的新 Edge Function，返回简单的 JSON 响应
```

#### goose 输出

:::note 桌面版

```
Edge Function 部署成功！

函数名称：hello-world
版本：1
状态：ACTIVE
函数 ID：c4e03748-3e72-45e2-bdca-03f7e4800874
项目：my project（tabowbdrhvtlvzvfyinw）
入口：index.ts
JWT 校验：已启用
创建时间：2025 年 11 月 8 日

函数代码：
~~~typescript
Deno.serve(async (req) => {
  return new Response(
    JSON.stringify({ message: "Hello World!" }),
    { headers: { "Content-Type": "application/json" } },
  )
})
~~~

端点：
https://tabowbdrhvtlvzvfyinw.supabase.co/functions/v1/hello-world

可以向上面的端点发请求来测试这个函数。
```

:::

## 更多资源

关于 Supabase MCP 服务器及其能力的更多信息：
- [Supabase MCP 服务器 GitHub 仓库](https://github.com/supabase-community/supabase-mcp)
- [Supabase 文档](https://supabase.com/docs)
- [Supabase 控制台](https://supabase.com/dashboard)
