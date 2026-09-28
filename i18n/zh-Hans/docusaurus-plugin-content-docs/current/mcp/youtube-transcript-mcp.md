---
title: YouTube Transcript 扩展
description: 把 YouTube Transcript MCP 服务器添加为 goose 扩展，用于获取 YouTube 视频字幕
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/N38u7hZqZJg" />

本教程介绍如何把 [YouTube Transcript MCP 服务器](https://github.com/jkawamoto/mcp-youtube-transcript) 添加为 goose 扩展，以便获取并处理 YouTube 视频字幕。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=uvx&arg=--from&arg=git%2Bhttps%3A%2F%2Fgithub.com%2Fjkawamoto%2Fmcp-youtube-transcript&arg=mcp-youtube-transcript&id=youtube-transcript-mcp&name=YouTube%20Transcript&description=Access%20YouTube%20video%20transcripts)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  uvx --from git+https://github.com/jkawamoto/mcp-youtube-transcript mcp-youtube-transcript
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
    extensionId="youtube-transcript-mcp"
    extensionName="YouTube Transcript"
    description="Access YouTube video transcripts"
    command="uvx"
    args={["--from", "git+https://github.com/jkawamoto/mcp-youtube-transcript", "mcp-youtube-transcript"]}
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="YouTube Transcript"
      description="Access YouTube video transcripts"
      command="uvx --from git+https://github.com/jkawamoto/mcp-youtube-transcript mcp-youtube-transcript"
    />
  </TabItem>
</Tabs>

## 使用示例

YouTube Transcript 扩展可以获取并处理 YouTube 视频字幕。你需要从目标视频 URL 中取出视频 ID。

### goose 提示词

```
帮我获取这个 YouTube 视频的字幕：https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### goose 输出

:::note 命令行
我来帮你获取这个视频的字幕。视频 ID 是 "dQw4w9WgXcQ"。正在拉取字幕。

字幕如下：

[字幕内容会显示在这里，包含时间戳和文本]

我已经拿到 Rick Astley 的《Never Gonna Give You Up》音乐视频字幕。字幕是歌词，由于系统是自动转录，会有一些小错误。其中包含这首 1987 年名曲的副歌和主歌。它后来成为互联网上最有名的梗之一，常被用来「rickroll」。

还需要我帮你处理这个视频或它的字幕吗？
:::
