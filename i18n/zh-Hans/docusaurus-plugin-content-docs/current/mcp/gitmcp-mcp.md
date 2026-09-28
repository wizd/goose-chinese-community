---
title: GitMCP 扩展
description: 将 Git MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';


<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/6aV8pinnUS8" /> 

本教程介绍如何将 [Git MCP 服务器](https://github.com/idosal/git-mcp) 添加为 goose 扩展，让 LLM 实时访问 GitHub 仓库，从而实现智能文档搜索、代码探索和准确的项目洞察。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=mcp-remote&arg=https%3A%2F%2Fgitmcp.io%2Fdocs&id=gitmcp&name=GitMCP&description=Remote%20MCP%20server%20from%20gitmcp.io)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y mcp-remote https://gitmcp.io/docs

  ```
  </TabItem>
</Tabs>
:::

## 配置

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
        extensionId="gitmcp"
        extensionName="GitMCP"
        description="提供最新文档和项目洞察的 Git MCP 服务器"
        command="npx"
        args={["-y", "mcp-remote" , "https://gitmcp.io/docs"]}
    />
 </TabItem>
  <TabItem value="cli" label="goose CLI">
      <CLIExtensionInstructions
        name="Git MCP"
        description="提供最新文档和项目洞察的 Git MCP 服务器"
        command="npx -y mcp-remote https://gitmcp.io/docs"
        timeout={300}
      />
  </TabItem>
</Tabs>

## 使用示例

在这个示例中，goose 使用 GitMCP 从 `openai/whisper` GitHub 仓库拉取实时文档，探索语音转文字模型的工作方式，并呈现准确的安装说明和命令行用法，全部直接来自源头。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
   1. 在 goose Desktop 中打开一个新会话
  </TabItem>
  <TabItem value="cli" label="goose CLI">

  1. 打开终端并启动一个新的 goose 会话：

  ```sh
  goose session
  ```

  </TabItem>
</Tabs>

### goose 提示词
```
  你能帮我理解 OpenAI Whisper 语音转文字模型是如何工作的吗？

  请使用 GitHub 仓库 `openai/whisper` 查找准确信息。

  请：
  - 总结模型的作用及其主要功能
  - 展示一个从命令行运行它的示例
  - 解释开始使用需要哪些文件或模型
  - 包含你在仓库中找到的有用代码片段或安装说明

  请用 Markdown 指南格式回复。
```
### goose 输出

:::note 桌面版

我来通过探索他们的 GitHub 仓库，帮你理解 OpenAI Whisper。我先获取文档和相关信息。

`─── owner | repo ──────────────────────────`

现在让我搜索一些具体的安装和使用信息：

`─── owner | query ──────── repo ────────────`

让我搜索更多技术细节和示例：

`─── owner | query ──────── repo ────────────`

很好！我已经从 OpenAI Whisper 仓库获得了所需的全部信息。我来为你创建一份全面的 Markdown 指南。

OpenAI Whisper 语音转文字模型指南

概述
Whisper 是 OpenAI 开发的通用语音识别模型。它是一个强大的多任务神经网络，可以执行：

- 多语言语音识别（99 种以上语言）
- 语音翻译（把外语语音转换成英文文本）
- 语言识别（检测正在说的语言）
- 语音活动检测（识别何时有语音）

主要功能：

- ✅ 稳健表现：在 68 万小时多样、多语言的音频数据上训练
- ✅ 零样本迁移：无需微调即可用于多种语言
- ✅ 多种模型大小：从 tiny（3900 万参数）到 large（15.5 亿参数）
- ✅ 易于使用：简单的命令行界面和 Python API
- ✅ 开源：MIT 许可，模型权重可自由获取

架构
Whisper 使用 Transformer 序列到序列模型，以 30 秒为块处理音频。它把音频转换为 log-Mel 频谱图，并用特殊 token 指定任务（转写、翻译、语言识别等）。

命令行用法
基本转写

## 入门检查清单

1. **✅ 安装 Python 3.8-3.11**
2. **✅ 为你的操作系统安装 FFmpeg**
3. **✅ 安装 Whisper**：`pip install -U openai-whisper`
4. **✅ 测试安装**：`whisper --help`
5. **✅ 尝试基本转写**：`whisper your_audio_file.mp3`

### 首次运行

首次运行时，Whisper 会自动下载模型权重：
- `tiny`：约 39 MB
- `base`：约 142 MB
- `small`：约 461 MB
- `medium`：约 1.42 GB
- `large`：约 2.87 GB
- `turbo`：约 1.5 GB

模型会缓存在本地，因此后续运行会快得多。


## 提示与最佳实践

### 🎯 **模型选择**
- **仅英语**：使用 `.en` 模型（`base.en`、`small.en` 等）
- **快速转写**：使用 `tiny` 或 `base` 模型
- **高准确度**：使用 `medium` 或 `large` 模型
- **翻译任务**：使用 `medium` 或 `large`（不要用 `turbo`）

### 🎵 **音频质量**
- 干净、清晰的音频效果更好
- Whisper 支持多种音频格式（MP3、WAV、FLAC、M4A 等）
- 背景噪音可能影响准确度

### 🌍 **语言支持**
- 支持 99 种以上语言
- 某些语言的表现优于其他语言
- 查看仓库中的[语言表现细分](https://github.com/openai/whisper#available-models-and-languages)

### 💾 **资源管理**
- 更大的模型需要更多 VRAM/RAM
- 选择模型时考虑硬件限制
- 实时应用使用较小的模型

Whisper 以 **MIT 许可证**发布，个人和商业项目都可以免费使用。

:::
