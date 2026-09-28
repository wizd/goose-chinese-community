---
title: Excalidraw 扩展
description: 将 Excalidraw MCP App 添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/REc5IvWvI5s" />

本教程介绍如何将 [Excalidraw MCP App](https://github.com/excalidraw/excalidraw-mcp) 添加为 goose 扩展，让 goose 能实时绘制手绘风格的 Excalidraw 图表。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
   [启动安装程序](goose://extension?cmd=http&id=excalidraw&name=Excalidraw&url=https%3A%2F%2Fexcalidraw-mcp-app.vercel.app%2Fmcp&description=Excalidraw%20MCP%20App%20for%20AI-powered%20diagramming)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  添加 `Remote Extension (Streamable HTTP)` 扩展类型，并填写：

  **端点 URL**
  ```
  https://excalidraw-mcp-app.vercel.app/mcp
  ```
  </TabItem>
</Tabs>
:::

## 配置
这些步骤配置远程 MCP 服务器。其他部署方式见 [Excalidraw MCP App 文档](https://github.com/excalidraw/excalidraw-mcp)。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="Excalidraw"
      extensionName="Excalidraw MCP App"
      description="用于绘图的 Excalidraw MCP App"
      type="http"
      url="https://excalidraw-mcp-app.vercel.app/mcp"
      envVars={[]}
    />

  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Excalidraw"
      description="用于绘图的 Excalidraw MCP App"
      type="http"
      url="https://excalidraw-mcp-app.vercel.app/mcp"
      timeout={300}
    />

  </TabItem>
</Tabs>

## 使用示例

在这个示例中，我们用 Excalidraw MCP App 让 goose 实时可视化它自己的自动化流水线。这展示了 goose 如何连接实时工具、推理工作流，并逐个元素生成结构化图表。

### goose 提示词
```
嘿 goose，请查看我的视频自动化配方，并为我创建自动化流水线的可视化图。我希望线条干净、标签清晰。
```

### goose 输出

```

─── reading /Users/ebonyl/Desktop/plug-and-play-video.yaml ──────────────────────────

─── Create View elements: [ {"type":"cameraUpdate","width":600}, ...] ──────────────────────────

```
![excalidraw image](/img/excalidrawImage.png)
