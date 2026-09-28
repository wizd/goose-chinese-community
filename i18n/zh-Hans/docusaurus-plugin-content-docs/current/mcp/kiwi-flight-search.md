---
title: Kiwi Flight Search 扩展
description: 将 Kiwi Flight Search MCP 服务器添加为 goose 扩展
unlisted: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import GooseBuiltinInstaller from '@site/src/components/GooseBuiltinInstaller';
import { PanelLeft } from 'lucide-react';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/MhLU91zKE4M" />

服务器已迁移：https://apify.com/agentify/kiwi-mcp-server

本教程介绍如何将 [Kiwi Flight Search MCP 服务器](https://mcp.kiwi.com) 添加为 goose 扩展，以实现航班搜索和价格比较。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  在 Settings → Extensions 中使用 `Add custom extension`，添加 `Streamable HTTP` 扩展类型，并填写：
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  使用 `goose configure` 添加 `Remote Extension (Streamable HTTP)` 扩展类型，并填写：
  </TabItem>
</Tabs>

  **端点 URL**
  ```
  https://mcp.kiwi.com
  ```
:::

## 配置

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
    2. 点击 `Extensions`
    3. 点击 `Add custom extension`
    4. 在 `Add custom extension` 对话框中填写：
       - **扩展名称**：Kiwi Flight Search
       - **类型**：Streamable HTTP
       - **端点**：`https://mcp.kiwi.com`
    5. 点击 `Add Extension` 保存扩展
    6. 进入聊天

  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="kiwi-flight-search"
      type="http"
      url="https://mcp.kiwi.com"
      timeout={300}
    />

  </TabItem>
</Tabs>

## 使用示例

让我们搜索任意两个地点之间、特定日期的航班。你可以按城市名或机场代码搜索，扩展会找出可用航班及其价格、时长和预订链接。

### goose 提示词

```
能帮我搜索 8 月 9 日从巴黎到罗马的航班吗？
```

### goose 输出

```
我很乐意帮你搜索 8 月 9 日从巴黎到罗马的航班！我来查找可用选项。

## ✈️ 航班选项：巴黎 → 罗马（2025 年 8 月 9 日）

### 💰 **最佳价格**（最便宜的选项）

| 航线 | 出发 → 到达 | 舱位 | 价格 | 预订 |
|-------|-------------------|-------|-------|------|
| Paris ORY → Rome FCO | 09/08 22:10 → 00:10+1 (2h 0m) | Economy | €138 | [立即预订](https://on.kiwi.com/ZyIJ2r) |
| Paris ORY → Rome FCO | 09/08 09:05 → 11:10 (2h 5m) | Economy | €154 | [立即预订](https://on.kiwi.com/31IDMW) |
| Paris ORY → Rome FCO | 09/08 06:25 → 08:25 (2h 0m) | Economy | €157 | [立即预订](https://on.kiwi.com/2dNs3f) |

### ⚡ **最短航班**（飞行时间最短）

| 航线 | 出发 → 到达 | 舱位 | 价格 | 预订 |
|-------|-------------------|-------|-------|------|
| Paris ORY → Rome FCO | 09/08 06:25 → 08:25 (2h 0m) | Economy | €157 | [立即预订](https://on.kiwi.com/2dNs3f) |
| Paris ORY → Rome FCO | 09/08 22:10 → 00:10+1 (2h 0m) | Economy | €138 | [立即预订](https://on.kiwi.com/ZyIJ2r) |
| Paris CDG → Rome FCO | 09/08 21:10 → 23:10 (2h 0m) | Economy | €187 | [立即预订](https://on.kiwi.com/62jyt7) |

### 🕐 **其他不错的选项**

| 航线 | 出发 → 到达 | 舱位 | 价格 | 预订 |
|-------|-------------------|-------|-------|------|
| Paris ORY → Rome FCO | 09/08 12:00 → 14:05 (2h 5m) | Economy | €164 | [立即预订](https://on.kiwi.com/m55oIC) |
| Paris ORY → Rome FCO | 09/08 21:10 → 23:10 (2h 0m) | Economy | €165 | [立即预订](https://on.kiwi.com/tkAU0T) |

## 📋 **摘要与建议**

**🏆 综合最划算：** **€138 的晚班**（ORY 22:10 → FCO 00:10+1）价格最低、飞行时间也最短，但会在午夜后抵达。

**🌅 最佳早晨选项：** **€157 的早班**（ORY 06:25 → FCO 08:25）能让你一大早到达罗马，飞行只需 2 小时。

**⏰ 最佳日间航班：** **€154 的上午航班**（ORY 09:05 → FCO 11:10）性价比高，时间也方便。

所有直飞航班大约 2 小时，从巴黎奥利（ORY）或戴高乐（CDG）出发，抵达罗马菲乌米奇诺（FCO）。

祝你罗马之旅愉快！🇮🇹 有趣的事实：罗马的喷泉比世界上任何其他城市都多，超过 2000 座！别忘了往特莱维喷泉投一枚硬币，以确保你能再次回到永恒之城！⛲✨

```
