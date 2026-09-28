---
title: Tavily Web Search 扩展
description: 把 Tavily MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<YouTubeShortEmbed videoUrl="https://youtube.com/embed/mxS2G9afGxE" />

本教程介绍如何把 [Tavily Web Search MCP 服务器](https://github.com/tavily-ai/tavily-mcp) 添加为 goose 扩展，以启用 AI 驱动的网页搜索。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=tavily-mcp&id=tavily&name=Tavily%20Web%20Search&description=Search%20the%20web%20with%20Tavily%20MCP&env=TAVILY_API_KEY%3DTavily%20API%20Key)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y tavily-mcp
  ```
  </TabItem>
</Tabs>
  **环境变量**
  ```
  TAVILY_API_KEY: <YOUR_API_KEY>
  ```
:::

## 配置

:::info
运行此命令需要系统已安装 [uv](https://docs.astral.sh/uv/#installation)，因为会用到 `uvx`。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="tavily"
    extensionName="Tavily Web Search"
    description="Search the web with Tavily MCP"
    command="npx"
    args={["-y", "tavily-mcp"]}
    envVars={[
      { name: "TAVILY_API_KEY", label: "Tavily API Key" }
    ]}
    apiKeyLink="https://tavily.com/"
    apiKeyLinkText="Tavily API Key"
  />
</TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Tavily Web Search"
      description="Search the web with Tavily MCP"
      command="npx -y tavily-mcp"
      envVars={[
        { key: "TAVILY_API_KEY", value: "▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪" }
      ]}
      infoNote={
        <>
          Obtain your <a href="https://tavily.com/" target="_blank" rel="noopener noreferrer">Tavily API Key</a> and paste it in. You can get your API key by signing up at <a href="https://app.tavily.com/" target="_blank" rel="noopener noreferrer">tavily.com</a> and navigating to your account settings.
        </>
      }
    />
  </TabItem>
</Tabs>

## 使用示例

Tavily MCP 服务器让 goose 的交互具备 AI 驱动的网页搜索。拿到 API 密钥后，可以使用 Tavily 的高级搜索能力，包括：

1. 实时网页搜索
2. 结构化数据提取
3. 内容分析
4. 按主题搜索

### goose 提示词

```
搜索人工智能在医学领域突破的近期新闻，并总结关键发现。
```

### goose 输出

```
我用 Tavily 新闻搜索工具查找人工智能在医学领域突破的近期新闻。

─── tavily_news_search | tavily ──────────────────────────
max_results: 5
query: ...



根据近期新闻，人工智能在医学领域的关键发现如下：

1. 个性化的 AI 驱动医疗：
- 开发充当「个人医生」的 AI 系统，与人类临床医生协作，而不是取代他们
- 重点是增强临床能力，同时保留人工监督

2. 医学影像的突破：
- Nature 报道了 CT 扫描分析的一项重要进展
- 开发了「统一全身 CT 图像」（Uni-CT）算法，它能够：
  - 自动生成单套全身 CT 图像序列
  - 用器官特定的窗位设置拼接多个分段器官图像
  - 在不牺牲准确度的情况下把诊断时间缩短 35%
  - 提高创伤病例的效率

3. 未来趋势：
- 医疗 AI 走向普及，可能缩小大型和小型医疗机构之间的差距
- 由 AI 驱动的超个性化医疗体验
- 集成能在医疗场景中进行类人推理的 AI 系统

最具体的突破出现在医学影像。Uni-CT 算法在提高创伤诊断的速度和准确度上都有不错的结果。这是 AI 的一项实际应用，可能立刻惠及急诊医学。

需要我针对其中某项进展再搜更具体的信息，或看看医学领域 AI 的其他方向吗？
```

:::tip
你可以针对不同类型的查询和信息深度调整[搜索参数](https://github.com/tavily-ai/tavily-mcp#tavily-search-examples)。该扩展同时支持快速搜索和全面调研。
:::
