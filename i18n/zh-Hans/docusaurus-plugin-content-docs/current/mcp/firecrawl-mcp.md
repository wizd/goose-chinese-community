---
title: Firecrawl 扩展
description: 将 Firecrawl MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<YouTubeShortEmbed videoUrl="https://youtube.com/embed/_rKBFLREVcM" /> 


本教程帮助你开始使用 [Firecrawl MCP 服务器](https://github.com/firecrawl/firecrawl-mcp-server) 作为 goose 扩展，为 AI 代理提供强大的网页抓取、爬取和搜索能力。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=firecrawl-mcp&id=firecrawl&name=Firecrawl&description=Web%20scraping%20and%20crawling%20capabilities&env=FIRECRAWL_API_KEY%3DYour%20API%20Key)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y firecrawl-mcp
  ```
  </TabItem>
</Tabs>
  **环境变量**
  ```
  FIRECRAWL_API_KEY: <YOUR_API_KEY>
  ```
:::

## 配置

:::info
运行此命令需要在系统上安装 [Node.js](https://nodejs.org/)，因为它使用 `npx`。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="firecrawl"
    extensionName="Firecrawl"
    description="网页抓取与爬取能力"
    command="npx"
    args={["-y", "firecrawl-mcp"]}
    envVars={[{ name: "FIRECRAWL_API_KEY", label: "你的 Firecrawl API Key" }]}
    apiKeyLink="https://firecrawl.dev/app/api-keys"
    apiKeyLinkText="Firecrawl API Key"
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="firecrawl"
      description="网页抓取与爬取能力"
      type="stdio"
      command="npx -y firecrawl-mcp"
      timeout={300}
      envVars={[
        { key: "FIRECRAWL_API_KEY", value: "<Your Firecrawl API Key>" }
      ]}
      infoNote={
        <>
          获取你的 <a href="https://firecrawl.dev/app/api-keys" target="_blank" rel="noopener noreferrer">Firecrawl API Key</a> 并粘贴到此处。
        </>
      }
    />
    </TabItem>
</Tabs>

## 使用示例

Firecrawl MCP 服务器提供全面的网页抓取和爬取能力，包括：

- **单页抓取**：从单个网页提取干净、结构化的内容
- **批量处理**：用批量操作高效抓取多个 URL
- **站点爬取**：以可定制的深度爬取整个网站或特定栏目
- **搜索集成**：用高级过滤搜索已爬取的内容

### goose 提示词

```
我正在做一款多人游戏，想在 Photon 和 Unity Netcode 之间做选择。你能抓取它们的官方文档和近期对比文章，帮我理解两个平台在性能、定价、易用性和可扩展性方面的优缺点吗？
```

### goose 输出

```
我来抓取 Photon 和 Unity Netcode 的官方文档，并查找近期对比文章，帮你做研究。先从两个平台的官方网站收集信息，再查找对比文章。

──────────────  Firecrawl ─────────────────
Firecrawl Scrape url, formats, onlyMainContent

Firecrawl Scrape url, formats, onlyMainContent

Firecrawl Search query, limit, sources

Firecrawl Scrape url, formats, onlyMainContent

Firecrawl Scrape url, formats, onlyMainContent

Firecrawl Search query, limit, sources

Firecrawl Scrape url, formats, onlyMainContent

Firecrawl Search query, limit, sources

Firecrawl Scrape url, formats, onlyMainContent


根据我对官方文档和近期讨论的研究，我来提供 Photon 与 Unity Netcode 在多人游戏开发上的全面对比。


Photon 与 Unity Netcode：全面对比

概述

Photon 是成熟的第三方多人网络方案，包含多个产品（PUN、Fusion、Quantum），为游戏提供支持已超过十年。Unity Netcode 指 Unity 的第一方网络方案，主要是 Netcode for GameObjects 和 Netcode for Entities。


性能对比

Photon Fusion

带宽使用：比 Unity 的 MLAPI/Mirror 高效 6 倍
玩家数量：支持数百个客户端连接上的数千个网络对象
功能：基于 tick 的模拟、客户端预测、延迟补偿、快照插值
优化：高级复制算法（完全一致性与最终一致性）

Unity Netcode

Netcode for GameObjects：面向休闲合作游戏（较小规模）
Netcode for Entities：为采用 ECS 架构的竞技动作游戏而构建
性能：带宽使用上通常不如 Photon Fusion 优化
功能：客户端/服务器权威模型、预测、插值
胜出：原始性能和带宽效率方面是 Photon Fusion


定价对比

Photon 定价（2024）
  免费层：
  - 仅用于开发的 20 CCU
  - 已上线游戏 100 CCU（约 4 万 MAU）

  付费方案：
  - 500 CCU：每月 $95（约 20 万 MAU）
  - 1,000 CCU：每月 $195（约 40 万 MAU）
  - 2,000 CCU：每月 $395（约 80 万 MAU）
  - Premium Cloud：最低每月 $580（自动扩展至最多 5 万 CCU）

  一次性选项：
  - PUN Plus：一次性 $95，100 CCU（12 个月）

Unity Gaming Services 定价
  免费层：
  - Relay：每月前 50 个平均 CCU 免费
  - Lobby：每月 10 GiB 带宽免费
  - Multiplay：6 个月 $800 额度

  付费方案：
  - Relay：每增加一个平均 CCU $0.16

  Multiplay 托管：
  - CPU：每核每小时 $0.038
  - RAM：每 GiB 每小时 $0.0051
  - 网络：每 GiB $0.14

  额度用完后没有免费层

胜出：中小型游戏选 Photon；如果使用专用服务器、规模非常大，Unity 可能更便宜


易用性

Photon

优点：
- 成熟的文档和教程
- 庞大的社区和丰富的示例
- 开箱即用，设置极少
- 跨平台支持（包括无需自建服务器的 WebGL）
缺点：
- 第三方依赖
- 高级功能有学习曲线

Unity Netcode

优点：
- 第一方 Unity 集成
- 与 Unity 的开发模式一致
- Unity 直接支持
缺点：
- 较新的方案，文档仍在演进
- WebGL 需要更多设置（需要 Relay 服务）
- Netcode for Entities 的学习曲线更陡

胜出：如果要立刻产出并部署 WebGL，选 Photon


可扩展性

Photon
- 全球基础设施：全球 15 个以上区域
- DDoS 防护：较高层级内置
- 自动扩展：Premium Cloud 方案提供
- 上限：最多 5 万 CCU（Premium），无限制（Enterprise）

Unity Netcode
- 基础设施：利用 Google Cloud
- 扩展：需要手动管理服务器
- Distributed Authority：用于更好扩展的新拓扑
- 上限：取决于你对服务器基础设施的投入

胜出：托管扩展选 Photon；自定义基础设施控制选 Unity


平台支持

Photon
- 平台：包括 WebGL、移动端、主机、VR/AR 在内的所有主要平台
- WebGL：无需专用服务器即可无缝工作
- 跨平台游玩：所有平台完全支持

Unity Netcode
- 平台：Unity 支持的所有平台
- WebGL：多人游戏需要 Unity Relay 服务
- 跨平台游玩：支持，但需要额外设置

胜出：平手，两者都支持所有主要平台


决策时的关键考虑

在以下情况选择 Photon：
- 你希望快速部署，尤其是到 WebGL
- 你需要经过实战检验的网络方案
- 你更喜欢托管基础设施
- 你的游戏 CCU 适中（1 万以下）
- 你想要丰富的文档和社区支持

在以下情况选择 Unity Netcode：
- 你想要第一方 Unity 集成
- 你计划用自定义服务器扩展到非常高的 CCU
- 你需要对服务器基础设施的严格控制
- 你在构建需要 ECS 性能的竞技游戏
- 你想避免第三方依赖

近期社区见解

来自 Unity 论坛的讨论，开发者指出：
- Photon Fusion 为一个应用提供 100 CCU 免费额度，可与订阅组合
- Unity Multiplay 没有免费层，但提供 6 个月 $800 额度
- WebGL 部署用 Photon 更简单，因为它处理后端服务器
- 在框架之间迁移需要改动每一个网络脚本

建议

对大多数独立开发者和中小型工作室来说，Photon 在价值和易用性上更好，尤其是 WebGL 部署。对拥有专职基础设施团队、或需要在规模上获得最高性能的大型工作室来说，带自定义服务器管理的 Unity Netcode 长期可能更划算。

最终选择取决于你的具体需求：立刻部署的便利（Photon），还是长期的基础设施控制（Unity）。
```
