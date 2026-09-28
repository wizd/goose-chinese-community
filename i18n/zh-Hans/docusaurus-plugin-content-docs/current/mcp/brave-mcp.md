---
title: Brave Search 扩展
description: 将 Brave Search API 添加为 goose 扩展
unlisted: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/kD2YA61NTLU" />

服务器已迁移

本教程帮助你开始使用 [Brave Search MCP 服务器](https://www.pulsemcp.com/servers/brave-search) 作为 goose 扩展，以进行网页搜索和本地搜索。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=%40modelcontextprotocol%2Fserver-brave-search&id=brave-search&name=Brave%20Search&description=Brave%20Search%20API&env=BRAVE_API_KEY%3DYour%20API%20Key)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y @modelcontextprotocol/server-brave-search
  ```
  </TabItem>
</Tabs>
  **环境变量**
  ```
  BRAVE_API_KEY: <YOUR_API_KEY>
  ```
:::

## 配置

:::info
运行此命令需要在系统上安装 [Node.js](https://nodejs.org/)，因为它使用 `npx`。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="brave-search"
    extensionName="Brave Search"
    description="Brave Search API"
    command="npx"
    args={["-y", "@modelcontextprotocol/server-brave-search"]}
    envVars={[{ name: "BRAVE_API_KEY", label: "你的 Brave Search API Key" }]}
    apiKeyLink="https://api-dashboard.search.brave.com/app/keys"
    apiKeyLinkText="Brave Search API Key"
  />
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
    │  brave-search
    // highlight-end
    └ 
  ```

  4. 输入命令
  ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What type of extension would you like to add?
    │  Command-line Extension 
    │
    ◇  What would you like to call this extension?
    │  brave-search
    │
    // highlight-start
    ◆  What command should be run?
    │  npx -y @modelcontextprotocol/server-brave-search
    // highlight-end
    └ 
  ```  

  5. 输入 goose 在操作完成前应等待的秒数，超时后会中止。默认是 300 秒
   ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What type of extension would you like to add?
    │  Command-line Extension 
    │
    ◇  What would you like to call this extension?
    │  brave-search
    │
    ◇  What command should be run?
    │  npx -y @modelcontextprotocol/server-brave-search
    │
    // highlight-start
    ◆  Please set the timeout for this tool (in secs):
    │  300
    // highlight-end
    │
    └ 
  ```  

  6. 选择是否添加描述。如果这里选择 “Yes”，系统会提示你输入扩展描述。
   ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What type of extension would you like to add?
    │  Command-line Extension 
    │
    ◇  What would you like to call this extension?
    │  brave-search
    │
    ◇  What command should be run?
    │  npx -y @modelcontextprotocol/server-brave-search
    │
    ◆  Please set the timeout for this tool (in secs):
    │  300
    │
    // highlight-start
    ◇  Would you like to add a description?
    │  No
    // highlight-end
    │
    └ 
  ```  

  7. 获取 [Brave Search API Key](https://api-dashboard.search.brave.com/app/keys) 并粘贴到此处。
  :::info
  注册 [Brave Search API 账号](https://brave.com/search/api/)，选择一个方案（免费层每月提供 2000 次查询），然后从[开发者控制台](https://api-dashboard.search.brave.com/app/keys)生成 API 密钥。
  :::

   ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What type of extension would you like to add?
    │  Command-line Extension 
    │
    ◇  What would you like to call this extension?
    │  brave-search
    │
    ◇  What command should be run?
    │  npx -y @modelcontextprotocol/server-brave-search
    │
    ◇  Please set the timeout for this tool (in secs):
    │  300
    │
    ◇  Would you like to add a description?
    │  No
    │
    // highlight-start
    ◆  Would you like to add environment variables?
    │  Yes 
    │
    ◇  Environment variable name:
    │  BRAVE_API_KEY
    │
    ◇  Environment variable value:
    │  ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
    │
    ◇  Add another environment variable?
    │  No 
    // highlight-end
    └  Added brave-search extension
  ```  

  </TabItem>
</Tabs>

## 使用示例

Brave Search MCP 服务器让你访问 Brave Search API，同时提供网页搜索和本地搜索能力：

- **网页搜索**：一般查询、新闻、文章，支持分页和新鲜度控制
- **本地搜索**：查找商家、餐厅和服务及其详细信息（需要 Pro API 密钥）
- **灵活过滤**：控制结果类型、安全级别和内容新鲜度
- **智能回退**：本地搜索在没有结果时会自动回退到网页搜索


#### goose 提示词

```
( O)> 和 Ian、Rizel、Ace、Ebony 一起组织一场意大利晚餐聚会。找出 3 或 4 个面向初学者、专注意大利菜的 YouTube 烹饪频道（带 URL），然后为每个人找一份菜谱（带 URL）：一份沙拉、两道主菜和一份甜点。
```

#### goose 输出

```

我来帮你组织这场意大利晚餐聚会，并搜索合适的烹饪资源和菜谱。我把它分成几部分。

首先，搜索一些适合初学者的意大利烹饪 YouTube 频道：

Brave Web Search
query: best youtube channels italian cooking for beginners authenti...

让我搜索一些具体菜谱：

Brave Web Search
query: authentic italian salad recipes panzanella caprese insalata

Brave Web Search
query: authentic italian main course pasta recipes carbonara osso b...

Brave Web Search
query: authentic italian dessert recipes tiramisu panna cotta


根据研究，我来用推荐的 YouTube 频道和每个人的具体菜谱组织晚餐计划。计划如下：

推荐给初学者的意大利烹饪 YouTube 频道

1. Vincenzo's Plate (https://www.youtube.com/channel/UCcsSowAamCLJv-xeF9geXoA)
  - 正宗意大利菜谱，说明清晰
  - 由意大利人运营，面向初学者把技法讲得很清楚

2. Italia Squisita (https://www.youtube.com/c/ItaliaSquisita)
  - 呈现传统意大利菜谱
  - 经常展示经典菜的多种做法

3. Giallo Zafferano (https://www.youtube.com/user/GialloZafferano)
  - 意大利最受欢迎的烹饪频道
  - 正宗意大利菜谱的全面合集


菜谱分配

1. Rizel - 沙拉
  - 经典 Panzanella（托斯卡纳面包番茄沙拉）
  - 菜谱：https://www.themediterraneandish.com/tomato-panzanella-salad-recipe/
  - 适合夏天的沙拉，有硬面包、番茄和新鲜罗勒

2. Ian - 第一道主菜
  - 正宗 Spaghetti Carbonara
  - 菜谱：https://anitalianinmykitchen.com/spaghetti-carbonara/
  - 经典罗马面，用鸡蛋、佩科里诺奶酪和猪脸肉

3. Ace - 第二道主菜
  - Osso Buco alla Milanese
  - 菜谱：https://www.pastagrammar.com/post/osso-buco-authentic-italian-veal-recipe
  - 传统米兰式炖小牛膝，配 gremolata

4. Ebony - 甜点
  - 经典香草 Panna Cotta
  - 菜谱：https://www.recipesfromitaly.com/panna-cotta-recipe/
  - 优雅的奶油甜点，可以提前做好


成功小贴士

- 事先观看这些 YouTube 频道，熟悉意大利烹饪技法
- 开始前通读整份菜谱
- Panna Cotta 应至少提前 4 小时（或前一晚）制作，以便充分凝固
- Panzanella 最好在上桌前才拌好，口感最佳
- Osso Buco 可以稍早做好再加热，隔夜往往更好吃
- Carbonara 应在上桌前现做，趁热立刻食用

```
