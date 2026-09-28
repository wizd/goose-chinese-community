---
title: AgentQL 扩展
description: 将 AgentQL MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<!-- <YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/VIDEO_ID" /> -->

本教程介绍如何将 [AgentQL MCP 服务器](https://github.com/tinyfish-io/agentql-mcp) 添加为 goose 扩展，把非结构化网页内容提取并转换为结构化数据。

:::tip 快速安装

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=agentql-mcp&id=agentql-mcp&name=AgentQL&description=Transform%20unstructured%20web%20content%20into%20structured%20data&env=AGENTQL_API_KEY%3DAgentQL%20API%20Key)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y agentql-mcp
  ```
  </TabItem>
</Tabs>
  **环境变量**
  ```
  AGENTQL_API_KEY: <YOUR_API_KEY>
  ```
:::

## 配置

:::info
运行此命令需要在系统上安装 [Node.js](https://nodejs.org/)，因为它使用 `npx`。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="agentql-mcp"
    extensionName="AgentQL"
    description="将非结构化网页内容转换为结构化数据"
    command="npx"
    args={["-y", "agentql-mcp"]}
    envVars={[
      { name: "AGENTQL_API_KEY", label: "AgentQL API Key" }
    ]}
    apiKeyLink="https://dev.agentql.com/api-keys"
    apiKeyLinkText="AGENTQL_API_KEY"
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="agentql"
      description="将非结构化网页内容转换为结构化数据"
      command="npx -y agentql-mcp"
      envVars={[
        { key: "AGENTQL_API_KEY", value: "▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪" }
      ]}
      infoNote={
        <>
          获取你的 <a href="https://dev.agentql.com/api-keys" target="_blank" rel="noopener noreferrer">AgentQL API Key</a> 并粘贴到此处。
        </>
      }
    />

  </TabItem>
</Tabs>

## 使用示例

让我们用 AgentQL 扩展收集并结构化技术大会数据，帮助规划演讲投稿。


### goose 提示词

```
我是一名技术大会演讲者，正在规划 2025-2026 的投稿。

请提取 2022-2024 年间、参会人数超过 500 的开发者大会：
- 大会名称
- 大会日期
- CFP 时间线

以便识别：
- 稳定的月份规律
- 大会是否每年都在相同月份举行
- CFP 窗口是否逐年一致
- 传统时间是否有变化

请将结果组织为 JSON
```

### goose 输出

```
我来用网页数据提取工具帮你分析大会规律。我会拆成几次查询，以获得更完整的数据。

─── extract-web-data | agentql ──────────────────────────
prompt: ...
url: ...

让我再获取一些历史数据来比较规律：

─── extract-web-data | agentql ──────────────────────────
prompt: ....
url: ....

根据我的研究和现有数据，我来提供主要技术大会规律的分析。以下是结构化 JSON 及发现：

{
  "analysis": {
    "major_conference_patterns": {
      "timing_consistency": {
        "spring_events": {
          "typical_months": ["March", "April", "May"],
          "notable_conferences": [
            "Google I/O",
            "Microsoft Build",
            "DevOpsDays (various locations)"
          ],
          "cfp_patterns": "通常在活动前 4-6 个月开放，活动前 2-3 个月截止"
        },
        "fall_events": {
          "typical_months": ["September", "October", "November"],
          "notable_conferences": [
            "AWS re:Invent",
            "KubeCon + CloudNativeCon"
          ],
          "cfp_patterns": "通常在活动前 6-8 个月开放，活动前 4-5 个月截止"
        }
      },
      "observed_trends": {
        "timing_consistency": "高：大多数主要大会逐年保持相同月份",
        "cfp_windows": {
          "typical_duration": "6-12 周",
          "advance_notice": "活动前 4-8 个月",
          "variation": "地区性活动的 CFP 窗口往往更短（4-6 周）"
        },
        "recent_shifts": [
          "2022 年后混合/线上选项增加",
          "主要大会出现更多地区性场次",
          "大型活动的 CFP 截止日期更早"
        ]
      }
    },
    "recommendations_for_2025_2026": {
      "spring_submissions": {
        "prepare_by": "前一年的 9 月到 10 月",
        "submit_during": "前一年的 11 月到 12 月"
      },
      "fall_submissions": {
        "prepare_by": "2 月到 3 月",
        "submit_during": "3 月到 4 月"
      }
    }
  }
}


对你规划有用的要点：

1. **月份规律**：
   - 春季大会季：3 月到 5 月
   - 秋季大会季：9 月到 11 月
   - 夏季的主要技术大会通常较少
   - 12 月到 1 月通常较安静，地区性活动除外

2. **逐年一致性**：
   - 主要大会（AWS re:Invent、KubeCon、Google I/O）的时间非常稳定
   - 主要大会的地区性版本（如 DevOpsDays）日期更灵活
   - 大多数大会逐年保持同一季度/季节

3. **CFP 窗口**：
   - 大型大会：活动前 6-8 个月
   - 地区性大会：活动前 3-4 个月
   - 主要大会的评审周期有变长的趋势
   - 许多大会现在采用滚动或分阶段的 CFP 流程

4. **近期变化**：
   - 与 2022 年之前相比，CFP 截止日期更早
   - 更多混合/线上环节
   - 主要大会的地区性场次增加
   - 投稿评审周期更长

对 2025-2026 的规划，我建议：
- 2025 年 2 月到 3 月开始准备 2025 年秋季投稿
- 2025 年 9 月到 10 月开始准备 2026 年春季投稿
- 考虑主要大会的地区性版本，它们的截止日期往往更晚
- 留意多轨道大会，不同轨道的 CFP 截止日期可能不同

需要我聚焦这些规律的某个具体方面，或提供某些大会的更详细信息吗？
```
