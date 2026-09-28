---
title: Knowledge Graph Memory 扩展
description: 将 Knowledge Graph Memory MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/PF6hpDaI9Mc" />


本教程介绍如何将 [Knowledge Graph Memory MCP 服务器](https://github.com/modelcontextprotocol/servers/tree/main/src/memory) 添加为 goose 扩展。这让 goose 能够分析关系、发现模式，并更深入地理解你的数据。知识图谱建立在[记忆扩展](/docs/mcp/memory-mcp)之上，映射概念之间的复杂关系，并在 goose 会话之间提供持久记忆。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=%40modelcontextprotocol%2Fserver-memory&id=knowledge_graph_memory&name=Knowledge%20Graph%20Memory&description=Graph-based%20memory%20system%20for%20persistent%20knowledge%20storage)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y @modelcontextprotocol/server-memory
  ```
  </TabItem>
</Tabs>
:::

## 配置

:::info
运行此命令需要在系统上安装 [Node.js](https://nodejs.org/)，因为它使用 `npx`。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="knowledge_graph_memory"
    extensionName="Knowledge Graph Memory"
    description="用于持久知识存储的基于图的记忆系统"
    command="npx"
    args={["-y", "@modelcontextprotocol/server-memory"]}
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Knowledge Graph Memory"
      description="用于持久知识存储的基于图的记忆系统"
      command="npx -y @modelcontextprotocol/server-memory"
    />
  </TabItem>
</Tabs>

## 使用示例

在这个示例中，我将展示 goose 如何利用相互关联的知识模式，成为智能的安全审查者，从而检测和分析漏洞。goose 将能够理解安全问题、其影响和缓解措施之间的关系。

这意味着 goose 不只是发现问题，它理解漏洞如何连接到现实世界的影响，并能提出全面的解决方案。

### 第 1 步：把安全模式教给 goose

#### goose 提示词 #1

```text
goose，学习这些安全漏洞模式及其关系：

1. SQL 注入关系到：

   - 未校验的数据库输入
   - 数据窃取风险
   - 参数化查询解决方案

2. XSS 漏洞连接到：

   - 未转义的用户输出
   - 会话劫持风险
   - 内容净化修复

3. 身份验证弱点关联到：

   - 会话管理
   - 账号被攻破
   - 基于 JWT 的解决方案
```

#### goose 输出

```text
我会把这些安全知识以正确的实体和关系存入 Knowledge Graph Memory

[.... Create Entities .....]

现在，让我们创建这些安全概念之间的关系：

[.... Create Relations .....]

让我核实已存储的内容：

[... Read Graph ...]

我已把你的安全知识存入图中，包括：

1. 漏洞实体：

   - SQL 注入（观察：未校验输入和数据窃取）
   - XSS 漏洞（观察：未转义输出和会话风险）
   - 身份验证弱点（观察：会话管理）

2. 解决方案实体：

   - 参数化查询
   - 内容净化
   - JWT 身份验证

3. 连接的关系：

   - 漏洞 -> 其潜在影响
   - 解决方案 -> 它们所缓解的漏洞

知识现在以如下方式组织，使我能够：

   - 追踪漏洞影响链
   - 为每个漏洞找出合适的解决方案
   - 理解不同安全问题如何相关联
```

### 第 2 步：用关联知识做代码审查

#### goose 提示词 #2

审查这个 API 端点的安全问题：

```js
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = '${username}'`;
    db.query(query, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.cookie('user', username);
            res.json({ success: true });
        }
    });
});
```

#### goose 输出

```text
我将使用我们关联的知识图谱分析这段代码，追踪安全漏洞及其影响：

[.... Search Nodes ... Open Nodes ...]

根据知识图谱分析，我发现了多个严重安全问题：

1. SQL 注入漏洞：
   - 问题：在查询中使用字符串拼接 WHERE username = '${username}'
   - 影响链：SQL 注入 -> 数据窃取
   - 风险等级：严重
   - 解决方案（来自 parameterized_queries）：改用参数化查询

2. 身份验证弱点：
   - 问题：使用基于 cookie 的简单会话 res.cookie('user', username)
   - 影响链：身份验证弱点 -> 账号被攻破
   - 风险等级：高
   - 解决方案（来自 jwt_auth）：实现带适当过期时间的 JWT
```

基于我们存储的模式，安全实现如下：

```js
app.post('/api/login', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                success: false,
                error: 'Username and password required'
            });
        }

        const query = 'SELECT * FROM users WHERE username = ?';
        const result = await db.query(query, [req.body.username]);

        if (!result.length) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { userId: result[0].id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            success: true,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
```

```text
这些修复针对知识图谱识别出的漏洞链：

1. SQL 注入 -> 数据窃取：由参数化查询缓解
2. 身份验证弱点 -> 账号被攻破：由 JWT 实现缓解

基于关联模式的其他安全改进：

- 添加了输入校验
- 正确的错误处理
- 不暴露内部错误
- 基于令牌而不是基于 cookie 的身份验证
- 身份验证设置了过期时间

需要我：

1. 更详细地解释这些安全关系吗？
2. 展示如何实现更多安全模式吗？
3. 分析另一个端点吗？
```
