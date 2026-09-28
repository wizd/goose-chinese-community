---
title: ElevenLabs 扩展
description: 将 ElevenLabs MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/1Z8XtjQ9El0" />


本教程介绍如何将 [ElevenLabs MCP 服务器](https://github.com/elevenlabs/elevenlabs-mcp) 添加为 goose 扩展，以实现 AI 语音生成、声音克隆、音频编辑和语音转文字。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=uvx&arg=elevenlabs-mcp&id=elevenlabs-mcp&name=ElevenLabs&description=ElevenLabs%20voice%20synthesis%20server&env=ELEVENLABS_API_KEY)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  uvx elevenlabs-mcp
  ```
  </TabItem>
</Tabs>

  **环境变量**
  ```
  ELEVENLABS_API_KEY: <YOUR_API_KEY>
  ```
:::

## 配置

:::info
运行此命令需要在系统上安装 [uv](https://docs.astral.sh/uv/#installation)，因为它使用 `uvx`。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="elevenlabs-mcp"
      extensionName="ElevenLabs"
      description="ElevenLabs 语音合成服务器"
      command="uvx"
      args={["elevenlabs-mcp"]}
      envVars={[
        { name: "ELEVENLABS_API_KEY", label: "ElevenLabs API Key" }
      ]}
      apiKeyLink="https://elevenlabs.io/app/settings/api-keys"
      apiKeyLinkText="ElevenLabs API Key"
    />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="ElevenLabs"
      description="ElevenLabs 语音合成服务器"
      command="uvx elevenlabs-mcp"
      envVars={[
        { key: "ELEVENLABS_API_KEY", value: "▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪" }
      ]}
      infoNote={
        <>
          获取你的 <a href="https://elevenlabs.io/app/settings/api-keys" target="_blank" rel="noopener noreferrer">ElevenLabs API Key</a> 并粘贴到此处。
        </>
      }
    />
  </TabItem>
</Tabs>

## 使用示例

在这个示例中，我将展示如何用 goose 和 ElevenLabs 扩展为 YouTube Short 制作 AI 配音。goose 会根据我提供的示例脚本，用不同的 AI 声音生成旁白，并在脚本中途自然切换语气，以匹配内容节奏。

连接到 ElevenLabs MCP 服务器后，goose 可以把纯文本变成听起来自然的语音，提供多种声音风格和角色选项，无需任何手工录音或剪辑。

### goose 提示词

> 嘿 goose，帮我为 YouTube Short 写一段脚本，我希望有两种不同的声音。第一种声音应该打断我，采用人类旁白风格，然后在我读完提示词后切换成随意的 AI 语气。这是我以前做过的一段 YT Short 脚本示例：

等等……几秒之内，goose 就在多个项目上完成了安全审计？！ 🔥

来，即插即用，看看它是怎么做到的

让我们给 goose 连接 Filesystem MCP 服务器扩展所需的命令……

现在开始
提示词：“嘿 goose，我需要在多个项目上做安全审计。我们来检查……🔹 硬编码凭据 – 留在代码里的 API 密钥、密码和机密。🔹 SQL 注入风险 – 可能泄露数据的不安全查询。🔹 不安全的加密实践 – 让数据处于风险中的弱加密方法。以及🔹 暴露的配置文件 – 不该公开的敏感信息。🔹 过时的依赖 – 第三方库中的安全漏洞。”

加油 goose，加油 goose！

✅ goose 扫描了 3 个不同项目的整个代码库，识别出安全风险，生成了带修复方案的详细报告，并给我提供了逐步说明，告诉我如何测试和验证这些代码修复！

如果这还不厉害，我不知道什么才算厉害……

🚀 开始使用请访问 goose-docs.ai_


### goose 输出

:::note 桌面版

我会以给定脚本为参考，为你创建 YouTube 脚本。

───────────── Text To Speech ─────────────

───────────── Text To Speech ─────────────

───────────── Text To Speech ─────────────

───────────── Text To Speech ─────────────

───────────── Text To Speech ─────────────

───────────── Play Audio  ────────────────

───────────── Play Audio  ────────────────

脚本已创建，并已用指定的声音和风格朗读。音频文件已保存到你的桌面。

按下播放，亲自听一听！🔊

<audio controls>
  <source src="/audio/elevenlabs-mcp-demo.mp3" type="audio/mpeg" />
  你的浏览器不支持 audio 元素。
</audio>

:::
