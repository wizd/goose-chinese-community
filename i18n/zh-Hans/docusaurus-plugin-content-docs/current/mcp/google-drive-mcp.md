---
title: Google Drive 扩展
description: 将 Google Drive MCP 服务器添加为 goose 扩展
unlisted: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/p9HGYbJk9wU" />

服务器已归档

本教程介绍如何将 [Google Drive MCP 服务器](https://www.pulsemcp.com/servers/modelcontextprotocol-gdrive) 添加为 goose 扩展，以便列出、读取和搜索 Google Drive 中的文件。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=%40modelcontextprotocol%2Fserver-gdrive&id=google-drive&name=Google%20Drive&description=Google%20Drive%20integration&env=GDRIVE_CREDENTIALS_PATH%3DPath%20to%20Google%20Drive%20credentials&env=GDRIVE_OAUTH_PATH%3DPath%20to%20OAuth%20token)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  GDRIVE_OAUTH_PATH=$USER_HOME/.config/gcp-oauth.keys.json \ 
  GDRIVE_CREDENTIALS_PATH=$USER_HOME/.config/.gdrive-server-credentials.json \ 
  npx -y @modelcontextprotocol/server-gdrive auth \
  npx -y @modelcontextprotocol/server-gdrive 
  ```
  </TabItem>
</Tabs>
  **环境变量**
  ```
  GDRIVE_CREDENTIALS_PATH: $USER_HOME/.config/.gdrive-server-credentials.json
  GDRIVE_OAUTH_PATH: $USER_HOME/.config/gcp-oauth.keys.json  
  ```
:::

:::info
环境变量中*必须*使用绝对路径。请务必将 `$USER_HOME` 替换为你的主目录。
:::

## 配置

:::info
运行此命令需要在系统上安装 [Node.js](https://nodejs.org/)，因为它使用 `npx`。
:::

要获取 Google Drive 服务器凭据和 OAuth 密钥，请按以下步骤操作：

  1. 设置 Google Cloud 凭据，以启用 API 访问：
        - 创建 Google Cloud 项目
            - 前往 [Google Cloud Console](https://console.cloud.google.com/projectcreate) 并创建新项目
            - `location` 可以保持为 `No organization`
        - 启用 Google Drive API
            - 在项目中前往 [API 产品库](https://console.cloud.google.com/workspace-api/products)
            - 查看左上角，确认你在正确的项目中
            - 搜索 `Google Drive API` 并启用它

  2. 配置 OAuth 同意屏幕
        - 前往 [OAuth 同意屏幕](https://console.cloud.google.com/auth/overview/create)
        - 填写必填信息：`project name`、`user support email`
        - `Audience` 选择 `Internal`，然后按 `create`
        - 如果无法选择 `Internal`，请选择 `External` 并执行以下额外步骤：
            - 前往 [Audience](https://console.cloud.google.com/auth/audience) 页面
            - 在 `Test users` 下点击 `Add Users`

 3. 创建 OAuth 凭据
        - 前往 [OAuth Clients](https://console.cloud.google.com/apis/credentials/oauthclient)
        - 点击 `Create Client`
        - 选择 **Application Type: Desktop App**
        - 下载 JSON 密钥文件
        - 将其重命名为 `gcp-oauth.keys.json`
        - 把它移到扩展可以访问的安全位置：
            ```sh
            mv ~/Downloads/gcp-oauth.keys.json ~/.config/gcp-oauth.keys.json
            ```
  4. 连接 Google 账号

     要连接 Google 账号，在终端中运行以下身份验证命令：
          ```sh
          GDRIVE_OAUTH_PATH=$USER_HOME/.config/gcp-oauth.keys.json \ 
          GDRIVE_CREDENTIALS_PATH=$USER_HOME/.config/.gdrive-server-credentials.json \ 
          npx -y @modelcontextprotocol/server-gdrive auth
          ```
         :::info
         将 `$USER_HOME` 替换为你的主目录。
         :::

      浏览器窗口会打开以进行身份验证。按照提示连接 Google 账号并完成 OAuth 流程。此时，环境变量 `GDRIVE_CREDENTIALS_PATH` 会被设为已保存的凭据。

:::tip
使用 Google Drive 扩展时，你需要每天重新身份验证一次。要重新验证，只需在终端中再次运行身份验证命令。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="google-drive"
    extensionName="Google Drive"
    description="Google Drive 集成"
    command="npx"
    args={["-y", "@modelcontextprotocol/server-gdrive"]}
    envVars={[
      { name: "GDRIVE_CREDENTIALS_PATH", label: "Google Drive 凭据路径" },
      { name: "GDRIVE_OAUTH_PATH", label: "OAuth 令牌路径" }
    ]}
  />

  :::info
  - 对于 `GDRIVE_CREDENTIALS_PATH`，输入 `$USER_HOME/.config/.gdrive-server-credentials.json`
  - 对于 `GDRIVE_OAUTH_PATH`，输入 `$USER_HOME/.config/gcp-oauth.keys.json`

  将 `$USER_HOME` 替换为你的主目录。必须指定绝对路径，此扩展才能工作。
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
    │  google drive
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
    │  google drive
    │
    // highlight-start
    ◆  What command should be run?
    │  npx -y @modelcontextprotocol/server-gdrive 
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
    │  google drive
    │
    ◇  What command should be run?
    │  npx -y @modelcontextprotocol/server-gdrive 
    │
    // highlight-start
    ◆  Please set the timeout for this tool (in secs):
    │  300
    // highlight-end
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
    │  google drive
    │
    ◇  What command should be run?
    │  npx -y @modelcontextprotocol/server-gdrive 
    │
    ◇  Please set the timeout for this tool (in secs):
    │  300
    │
    // highlight-start
    ◇  Would you like to add a description?
    │  No
    // highlight-end
    └ 
  ```

  7. 添加环境变量

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
    │  google drive
    │
    ◇  What command should be run?
    │  npx -y @modelcontextprotocol/server-gdrive 
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
    │  GDRIVE_CREDENTIALS_PATH
    │
    ◇  Environment variable value:
    │  ~/.config/.gdrive-server-credentials.json
    │
    ◇  Add another environment variable?
    │  yes 
    |
    ◇  Environment variable name:
    │  GDRIVE_OAUTH_PATH
    │
    ◇  Environment variable value:
    │  ~/.config/gcp-oauth.keys.json
    │
    // highlight-end
    └  Added google drive extension
  ```  

  </TabItem>
</Tabs>

## 使用示例

在这个示例中，我将用 goose 快速收集并总结 30 分钟后市场营销预算评审会议所需的重要信息。我会让 goose 从 Google Drive 找出相关文档，总结第一季度表现，突出市场营销自动化和视频制作方面的关键决策，并找出上次会议遗留的待办事项。

### goose 提示词
```
30 分钟后我有一场重要的市场营销预算评审会议，需要你帮我准备。Google Drive 里有我们先前会议和规划环节的几份文档。你能帮我：

1. 找出所有与市场营销预算和表现相关的文档
2. 快速总结我们的第一季度表现
3. 突出我们需要就市场营销自动化工具和视频制作做出的关键决策
4. 找出上次会议遗留的待办事项

我需要一份快速但全面的概览，以便有准备地走进这场会议。
```

### goose 输出

```
我来帮你准备会议。先列出 Google Drive 中的可用资源，确保我们访问的是正确的文件。

[... 列出资源 ...]

很好！我看到几份相关文档。我逐一访问它们，收集你需要的信息。

[... 读取资源 ...]

根据这些文档，这是你的会议全面概览：

第一季度表现摘要：

  - 总体比预算低 5%（花费 $104,200，预算 $107,000）
  - 数字营销表现良好，ROI 最高：
      - 邮件营销：ROI 3.2
      - Google Ads：ROI 2.4
      - 内容营销：ROI 2.1
  - 社交媒体互动比上一季度上升 23%
  - 内容营销博客文章带来的线索是预期的 2 倍

需要做出的关键决策：

  1. 市场营销自动化工具（许可证即将续期）：
    - 当前工具（BasicAutomation Pro）：每年 $12,000
    - 选项：
        - GrowthStack（每年 $15,000）- 推荐选项，功能与价格平衡
        - MarketingHub Enterprise（每年 $18,000）- 带 AI 功能的高端选项
        - 需要决定是升级还是维持当前方案
    - 如果更换供应商，实施需要 6 周

  2. 视频制作投入：
    - 三家供应商：
        - CreativeForce Media（$16,200）- 最全面，无限次修改
        - VisualCraft Studios（$14,500）- 稳妥的中间选项
        - Digital Narrative Pro（$12,800）- 基础套餐
    - 尽管成本更高，仍推荐 CreativeForce Media，因为交付物全面
    - 时间线视供应商而定，为 3 到 5 周

上次会议遗留的待办事项：

  1. Sarah 需要展示视频内容投入的 ROI 分析
  2. John 需要完成软件许可证审查
  3. Lisa 将展示新的 PPC 策略
  4. Mike 已完成视频制作机构的报价

第二季度规划考虑：

  - 建议第二季度预算增加 12%（合计 $120,000）
  - 可能需要根据新工具和视频制作的决策重新分配
  - PPC 策略审查仍待进行

需要我更详细地聚焦这份概览的某个方面吗？
```
