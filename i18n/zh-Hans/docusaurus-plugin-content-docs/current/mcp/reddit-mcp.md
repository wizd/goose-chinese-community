---
title: Reddit 扩展

description: 把 Reddit MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/VBtFinHieHA" /> 


本教程介绍如何把 [Reddit MCP 服务器](https://github.com/adhikasp/mcp-reddit) 添加为 goose 扩展，用来获取热门帖子、分析 Reddit 帖子内容，并浏览子版块讨论。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=uvx&arg=--from&arg=git%2Bhttps%3A%2F%2Fgithub.com%2Fadhikasp%2Fmcp-reddit.git&arg=mcp-reddit&id=reddit-mcp&name=Reddit&description=Fetch%20and%20analyze%20Reddit%20content)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  uvx --from git+https://github.com/adhikasp/mcp-reddit.git mcp-reddit
  ```
  </TabItem>
</Tabs>
:::

## 配置

:::info
运行此命令需要系统已安装 [uv](https://docs.astral.sh/uv/#installation)，因为会用到 `uvx`。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="reddit-mcp"
      extensionName="Reddit"
      description="Fetch and analyze Reddit content"
      command="uvx"
      args={["--from", "git+https://github.com/adhikasp/mcp-reddit.git", "mcp-reddit"]}
    />
  </TabItem>

  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Reddit MCP"
      description="Fetch and analyze Reddit content"
      command="uvx --from git+https://github.com/adhikasp/mcp-reddit.git mcp-reddit"
      timeout={300}
    />
  </TabItem>

</Tabs>

## 使用示例

这个示例用 goose 和 Reddit MCP 服务器，为 AI 话题做一个定制新闻流。goose 会拉取 Reddit 上热门的 AI 帖子，并做成可滚动、带图片和要点的社交媒体风格信息流。

它像 Reddit，但只为你精选。

### goose 提示词

> goose，用 reddit MCP 服务器，把最新的 AI 帖子做成一份个性化社交信息流。加上图片，并排成真正的社交媒体应用那样。



### goose 输出

:::note 桌面版

我来用 Reddit 的帖子和子帖为你做一份个性化社交媒体信息流。先看我们要用的内容，再创建这个 Web 应用。

先从两个子版块取一些示例帖子，确认数据结构：


──────────────  Fetch Reddit Hot Threads ─────────────────

接下来用 JavaScript 创建这个 Web 应用：

──────────────  Text Editor ─────────────────

我已经在默认浏览器里打开了这个 Web 应用。你现在应该能看到个性化社交信息流。

页面默认会自动拉取 r/ProgrammerAIHumor 的最新帖子。点击顶部按钮可以切换到 r/AI。每条帖子都可以点击，并在新标签页打开原来的 Reddit 讨论串。

如果想调整这些方面，告诉我：

- 配色
- 布局
- 刷新频率
- 显示的帖子数量

以及其他功能。

如果页面打不开，也告诉我，我来帮你排查。
:::
