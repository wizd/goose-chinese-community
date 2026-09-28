---
title: PostgreSQL 扩展
description: 把 PostgreSQL MCP 服务器添加为 goose 扩展
unlisted: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/PZlYQ5IthYM" />

服务器已归档

PostgreSQL MCP 服务器扩展让 goose 直接与 PostgreSQL 数据库交互，可以进行数据库操作、查询和 schema 管理。这样就能用自然语言操作数据库。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=@modelcontextprotocol/server-postgres&arg=Your%20PostgreSQL%20connection%20URL&id=postgres&name=PostgreSQL&description=PostgreSQL%20database%20integration)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y @modelcontextprotocol/server-postgres postgresql://localhost/mydb
  ```
  </TabItem>
</Tabs>
:::

## 自定义连接 {#customizing-your-connection}

目前这个 MCP 服务器只能连接一个预先指定的数据库，连接 URL 必须写在命令里。这里用 `postgresql://localhost/mydb` 作为访问本地数据库的示例，你可以按自己的环境修改。

PostgreSQL 连接 URL 的格式如下：
```
postgresql://username:password@hostname:5432/database
```

其中：
- `username`：你的 PostgreSQL 用户名
- `password`：你的 PostgreSQL 密码
- `hostname`：PostgreSQL 所在主机（例如 localhost、IP 地址或域名）
- `5432`：PostgreSQL 默认端口（使用其他端口时请修改）
- `database`：数据库名称

示例：
- 本地数据库：`postgresql://localhost/mydb`
- 本地并带凭据：`postgresql://myuser:mypass@localhost/mydb`
- 远程数据库：`postgresql://user:pass@db.example.com:5432/production`

:::caution
不要把带凭据的连接字符串提交到版本控制。请使用环境变量或安全的配置管理。
:::



## 配置

:::info
运行此命令需要系统已安装 [Node.js](https://nodejs.org/)，因为会用到 `npx`。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="postgres"
    extensionName="PostgreSQL"
    description="PostgreSQL database integration"
    command="npx"
    args={["-y", "@modelcontextprotocol/server-postgres", "Your PostgreSQL connection URL"]}
  />

  :::info
  按以下格式输入 PostgreSQL 连接 URL：`postgresql://username:password@hostname:5432/database`
  :::

  </TabItem>
  <TabItem value="cli" label="goose CLI">
  1. 运行 `configure` 命令：
  ```sh
  goose configure
  ```

  2. 选择添加 `Command-line Extension`
  ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◆  What type of extension would you like to add?
    │  ○ Built-in Extension 
    // highlight-start    
    │  ● Command-line Extension (Run a local command or script)
    // highlight-end
    │  ○ Remote Extension (Streamable HTTP) 
    └ 
  ```

  3. 为扩展命名
  ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What type of extension would you like to add?
    │  Command-line Extension 
    │
    // highlight-start
    ◆  What would you like to call this extension?
    │  PostgreSQL
    // highlight-end
    └ 
  ```

  4. 输入带数据库连接 URL 的命令
  ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What would you like to call this extension?
    │  PostgreSQL
    │
    // highlight-start
    ◆  What command should be run?
    │  npx -y @modelcontextprotocol/server-postgres postgresql://localhost/mydb
    // highlight-end
    └ 
  ```  

  5. 设置超时（默认 300 秒通常足够）
  ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What would you like to call this extension?
    │  PostgreSQL
    │
    ◇  What command should be run?
    │  npx -y @modelcontextprotocol/server-postgres postgresql://localhost/mydb
    │
    // highlight-start
    ◆  Please set the timeout for this tool (in secs):
    │  300
    // highlight-end
    └ 
  ```

  6. 选择是否添加描述。如果这里选 “Yes”，系统会提示你输入扩展描述。
  ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What would you like to call this extension?
    │  PostgreSQL
    │
    ◇  What command should be run?
    │  npx -y @modelcontextprotocol/server-postgres postgresql://localhost/mydb
    │
    ◇  Please set the timeout for this tool (in secs):
    │  300
    │
    // highlight-start
    ◆  Would you like to add a description?
    │  No
    // highlight-end
    └ 
  ```

  7. 配置 PostgreSQL 连接 URL
  ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What would you like to call this extension?
    │  PostgreSQL
    │
    ◇  What command should be run?
    │  npx -y @modelcontextprotocol/server-postgres postgresql://localhost/mydb
    │     
    ◇  Please set the timeout for this tool (in secs):
    │  300
    │
    ◇  Would you like to add a description?
    │  No
    │    
    // highlight-start
    ◆  Would you like to add environment variables?
    │  No 
    // highlight-end
    └  Added PostgreSQL extension
  ```  

  </TabItem>
</Tabs>

## 使用示例

PostgreSQL 扩展可以用来查询和分析数据，或了解表结构。该扩展只能做*只读*操作，因此可以获取数据库信息，但不能修改数据库。

用自然语言描述你想做的事，goose 会用合适的 SQL 命令和 PostgreSQL 功能帮你完成。

#### goose 提示词
```
在我的数据库里找出当前 GPA 高于其所在年级平均 GPA 的学生。告诉我他们的姓名、年级、高出年级平均 GPA 多少，以及平均 GPA。
```

#### goose 输出
```
根据查询结果，成绩高于所在年级平均水平的学生如下：

11 年级
  Emma Johnson
    GPA：4.00
    年级平均：3.90
    高出平均：0.10 分

12 年级
  John Smith
    GPA：3.85
    年级平均：3.78
    高出平均：0.08 分

两名学生都明显高于各自年级的平均水平。11 年级的 Emma Johnson 高出年级平均最多，为 0.10 分；12 年级的 John Smith 高出年级平均 0.08 分。
```
