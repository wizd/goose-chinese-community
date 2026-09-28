---
title: MongoDB 扩展
description: 将 MongoDB MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

[MongoDB MCP 服务器](https://github.com/mongodb-js/mongodb-mcp-server) 扩展让 goose 直接与你的 MongoDB 数据库交互，支持查询、文档操作、集合管理和数据库管理等全面的数据库操作。这样你就可以通过自然语言轻松使用 MongoDB 数据库。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=mongodb-mcp-server&arg=--connectionString&arg=mongodb://localhost:27017&id=mongodb&name=MongoDB&description=MongoDB%20database%20integration)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y mongodb-mcp-server --connectionString mongodb://localhost:27017
  ```
  </TabItem>
</Tabs>
:::

## 自定义连接 {#customizing-your-connection}

MongoDB MCP 服务器使用连接字符串连接到单个 MongoDB 数据库实例。连接字符串必须通过 `--connectionString` 标志指定。这里用 `mongodb://localhost:27017` 作为访问本地 MongoDB 实例的示例，你也可以按自己的环境进行配置。

MongoDB 连接字符串格式如下：
```
mongodb://username:password@hostname:27017/database
```

其中：
- `username`：你的 MongoDB 用户（本地开发可选）
- `password`：你的 MongoDB 密码（本地开发可选）
- `hostname`：MongoDB 运行的主机（例如 localhost、IP 地址或域名）
- `27017`：MongoDB 默认端口（使用其他端口时请修改）
- `database`：数据库名称（可选，将连接到默认数据库）

示例：
- 本地数据库：`mongodb://localhost:27017`
- 带凭据的本地连接：`mongodb://myuser:mypass@localhost:27017/mydb`
- MongoDB Atlas：`mongodb+srv://user:pass@cluster.mongodb.net/database`

:::caution
切勿把带凭据的连接字符串提交到版本控制！请使用环境变量或安全的配置管理。对于 MongoDB Atlas，请确保你的 IP 地址已加入白名单，并使用强密码。
:::

## 配置

:::info
运行此命令需要在系统上安装 [Node.js](https://nodejs.org/)，因为它使用 `npx`。你还需要一个正在运行的 MongoDB 实例，或对 MongoDB Atlas 的访问权限。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="mongodb"
      extensionName="MongoDB"
      description="MongoDB 数据库集成"
      command="npx"
      args={["-y", "mongodb-mcp-server", "--connectionString", "mongodb://localhost:27017"]}
    />
    
    :::info 配置连接字符串
    如有需要，请[更新扩展](/docs/getting-started/using-extensions#updating-extension-properties)，使其匹配你的 [MongoDB 环境](#customizing-your-connection)。例如，把 `command` 属性中的连接字符串改成 `mongodb://username:password@hostname:27017/database` 格式。
    :::

  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="MongoDB"
      description="MongoDB 数据库集成"
      command="npx -y mongodb-mcp-server --connectionString mongodb://localhost:27017"
      commandNote={
        <>
          将 <code>mongodb://localhost:27017</code> 替换为与你的 <a href="#customizing-your-connection">MongoDB 环境</a> 匹配的实际连接字符串。
        </>
      }
    />
  </TabItem>
</Tabs>

## 可用操作

MongoDB 扩展通过自然语言交互提供全面的数据库管理能力。你可以执行的操作包括：

### 查询操作
- 使用复杂过滤和排序**查找文档**
- 使用 MongoDB 强大的聚合管道**聚合数据**
- 对集合中的文档进行可选过滤的**计数**

### 文档管理
- **插入**单个或多个文档
- 按指定条件**更新**一个或多个文档
- **删除**特定文档或批量删除

### 集合与数据库管理
- **创建索引**以优化查询性能
- **重命名集合**以便更好地组织
- 不再需要时**删除集合**
- **删除整个数据库**（请谨慎使用！）

### Schema 与分析
- **分析集合 schema**以了解文档结构
- **列出数据库和集合**以便探索
- **查看集合索引**及其配置
- **检查数据库统计信息**和集合存储大小

只需用自然语言描述你想完成的事，goose 就会帮你安全、高效地执行相应的 MongoDB 操作。

## 使用示例

#### goose 提示词
```
更新所有超过 90 天未登录的 premium 层级用户：把他们的状态设为 “inactive”，并添加一条说明此次更改时间的备注。
```

#### goose 输出
```
我已使用 updateMany 成功更新了不活跃的 premium 用户：

db.users.updateMany(
  {
    subscriptionTier: "premium",
    lastLogin: { $lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) }
  },
  {
    $set: {
      status: "inactive",
      inactiveNote: "Auto-updated to inactive on 2025-05-25 due to 90+ days of inactivity",
      lastModified: new Date()
    }
  }
)

操作结果：
{
  acknowledged: true,
  matchedCount: 23,
  modifiedCount: 23,
  upsertedId: null,
  upsertedCount: 0
}

已更新 23 名自 2025 年 2 月 24 日以来未登录的 premium 层级用户。每个文档现在包含：
• status: "inactive"
• inactiveNote: 说明这次自动状态变更
• lastModified: 本次操作的时间戳

可以考虑向这些用户发送重新激活邮件，或复查他们的订阅状态。
```
