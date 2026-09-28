---
title: 用 Remotion Skills 制作视频
description: 使用 goose 与 Remotion agent skills，用 React 生成程序化视频
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GooseBuiltinInstaller from '@site/src/components/GooseBuiltinInstaller';

goose 可以使用 [Remotion](https://www.remotion.dev/) 制作程序化视频。Remotion 是一个用 React 制作视频的框架。加载 [Remotion Agent Skills](https://www.remotion.dev/docs/ai/skills) 后，goose 会掌握动画、合成、文字效果和视频渲染的最佳实践。

### 前提条件

- [Node.js](https://nodejs.org/) 18 或更高版本
- 在终端运行 `npx skills add remotion-dev/skills`，安装 [Remotion Agent Skills](https://www.remotion.dev/docs/ai/skills)

:::note Remotion 许可
Remotion 对个人和小团队免费，但员工人数达到 3 人及以上的公司需要[商业许可](https://www.remotion.dev/license)。
:::

## 配置

启用 [Summon 扩展](/docs/mcp/summon-mcp)，以便 goose 加载并使用 Agent Skills。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose 桌面版" default>
  <GooseBuiltinInstaller
    extensionName="Summon"
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">

  1. 运行 `configure` 命令：
  ```sh
  goose configure
  ```

  2. 选择 `Toggle Extensions`
  ```sh
  ┌   goose-configure 
  │
  ◇  What would you like to configure?
  │  Toggle Extensions 
  │
  ◆  Enable extensions: (use "space" to toggle and "enter" to submit)
  // highlight-start    
  │  ● summon
  // highlight-end
  |
  └  Extension settings updated successfully
  ```
  </TabItem>
</Tabs>

## 使用示例

在这个示例中，我们让 goose 制作一段终端风格的视频，演示 git 工作流。视频将包含打字机效果、逼真的终端输出，以及结尾的庆祝动画。

:::info 大语言模型
本示例使用了 Anthropic 的 Claude Opus 4.5。
:::

### goose 提示

```
Create a terminal-style video showing a git workflow: type out git add ., 
then git commit -m 'feat: add new feature', then git push origin main. 
Each command should appear with a typewriter effect, followed by realistic output. 
End with 'Deployed to production 🚀'
```

### goose 输出

```
─── load | summon ───────────────────────────────────────
source: remotion-best-practices

reading ~/.agents/skills/remotion-best-practices/rules/animations.md

─── shell | developer ─────────────────────────────────────────
mkdir -p git-terminal-video && cd git-terminal-video && npm init -y

─── shell | developer ─────────────────────────────────────────
npm install remotion @remotion/cli react react-dom typescript @types/react

─── text_editor | developer ───────────────────────────────────
writing git-terminal-video/src/GitTerminal.tsx

─── text_editor | developer ───────────────────────────────────
writing git-terminal-video/src/Root.tsx

─── text_editor | developer ───────────────────────────────────
writing git-terminal-video/remotion.config.ts

─── shell | developer ─────────────────────────────────────────
npx remotion render GitTerminal out/git-workflow.mp4

✓ Video rendered successfully

✅ Git Terminal Video Created
Location: git-terminal-video/out/git-workflow.mp4

Video Details
├── Duration: 14 seconds (420 frames @ 30fps)
├── Resolution: 1280x720 (HD)
├── Size: ~875 KB
└── Codec: H.264

What the Video Shows
├── Terminal Window - macOS-style with traffic light buttons
├── Command Sequence with Typewriter Effect:
│   ├── ~/my-project ❯ git add .
│   ├── ~/my-project ❯ git commit -m 'feat: add new feature'
│   │   └── Shows realistic output with files changed
│   └── ~/my-project ❯ git push origin main
│       └── Shows push output (enumerating, compressing, writing)
└── Final Message - "Deployed to production 🚀" with bounce animation

Features
├── Blinking cursor while typing
├── Staggered output reveal (each line appears with delay)
├── Color-coded syntax (prompts, commands, output)
├── Spring animations for success message
└── Animated rocket that floats and bounces
```
