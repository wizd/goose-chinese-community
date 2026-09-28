---
title: Browserbase 扩展
description: 将 Browserbase MCP 服务器添加为 goose 扩展，用于网页自动化
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

本教程介绍如何将 Browserbase MCP 服务器添加为 goose 扩展，用于浏览器自动化，从而以编程方式控制导航、页面交互和内容捕获。

:::tip 快速安装

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=%40browserbasehq%2Fmcp&id=browserbase-mcp&name=Browserbase&description=Automate%20web%20browsing%20and%20data%20extraction&env=BROWSERBASE_PROJECT_ID%3DBrowserbase%20Project%20ID&env=BROWSERBASE_API_KEY%3DBrowserbase%20API%20Key&env=GEMINI_API_KEY%3DGemini%20API%20Key)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y @browserbasehq/mcp
  ```
  </TabItem>
</Tabs>
  **环境变量**
  ```
  BROWSERBASE_PROJECT_ID: <YOUR_PROJECT_ID>
  BROWSERBASE_API_KEY: <YOUR_API_KEY>
  GEMINI_API_KEY: <YOUR_GEMINI_API_KEY>
  ```
:::

## 配置

:::info
运行此命令需要在系统上安装 [Node.js](https://nodejs.org/)，因为它使用 `npx`。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="browserbase-mcp"
    extensionName="Browserbase"
    description="自动化网页浏览和数据提取"
    command="npx"
    args={["-y", "@browserbasehq/mcp"]}
    envVars={[
      { name: "BROWSERBASE_PROJECT_ID", label: "Browserbase Project ID" },
      { name: "BROWSERBASE_API_KEY", label: "Browserbase API Key" },
      { name: "GEMINI_API_KEY", label: "Gemini API Key" }
    ]}
    apiKeyLink="https://browserbase.io/dashboard"
    apiKeyLinkText="Browserbase 凭据"
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Browserbase"
      description="自动化网页浏览和数据提取"
      command="npx -y @browserbasehq/mcp"
      envVars={[
        { key: "BROWSERBASE_PROJECT_ID", value: "▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪" },
        { key: "BROWSERBASE_API_KEY", value: "▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪" },
        { key: "GEMINI_API_KEY", value: "▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪" }
      ]}
      infoNote={
        <>
          获取你的 <a href="https://browserbase.io/dashboard" target="_blank" rel="noopener noreferrer">Browserbase 凭据</a> 和 <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Gemini API 密钥</a> 并粘贴到此处。
        </>
      }
    />
  </TabItem>
</Tabs>

## 使用示例

让我们用 Browserbase 扩展收集 GitHub 上热门 MCP 相关仓库的信息。

### goose 提示词

```
1. 打开 https://github.com/trending

2. 搜索 “MCP server”，或滚动页面，找出标题或描述中包含 “MCP” 或 “Model Context Protocol” 的仓库

3. 对最相关的前 3 个仓库：
    • 进入仓库
    • 对仓库页面截图
    • 提取：
        - 仓库名称
        - 描述
        - 今日 star 数
        - README 的第一段
    • 返回上一页

- 关闭所有标签页

- 输出一份 Markdown 报告，包含：
    • 仓库名称（链接）
    • 截图
    • 描述 + star 数
    • README 摘录
```

### goose 输出

```
# MCP 仓库报告

## 1. [FastMCP](https://github.com/jlowin/fastmcp)

![FastMCP Repository Screenshot]

**描述**：用快速、符合 Python 风格的方式构建 MCP 服务器和客户端。  
**今日 Star**：10.2k stars

**README 摘录**：Model Context Protocol（MCP）是一种向 LLM 提供上下文和工具的新标准化方式，FastMCP 让构建 MCP 服务器和客户端变得简单直观。用干净、符合 Python 风格的代码创建工具、暴露资源、定义提示词，并把各个组件连接起来。

## 2. [GitHub MCP Server](https://github.com/github/github-mcp-server)

![GitHub MCP Server Screenshot]

**描述**：GitHub 官方 MCP 服务器，与 GitHub API 无缝集成，为开发者和工具提供高级自动化与交互能力。  
**今日 Star**：13.9k stars

**README 摘录**：GitHub MCP Server 是一个 Model Context Protocol（MCP）服务器，与 GitHub API 无缝集成，为开发者和工具提供高级自动化与交互能力。

## 3. [Playwright MCP](https://github.com/microsoft/playwright-mcp)

![Playwright MCP Screenshot]

**描述**：使用 Playwright 提供浏览器自动化能力的 Model Context Protocol（MCP）服务器。  
**今日 Star**：10.2k stars

**README 摘录**：这是一个使用 Playwright 提供浏览器自动化能力的 Model Context Protocol（MCP）服务器。它让 LLM 通过结构化的无障碍快照与网页交互，从而不必依赖截图或针对视觉调优的模型。
```
