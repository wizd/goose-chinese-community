---
title: Dev.to 扩展
description: 将 Dev.to MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import { PanelLeft } from 'lucide-react';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/nkdksdxHxaQ" />  

本教程介绍如何将 [Dev.to MCP 服务器](https://github.com/nickytonline/dev-to-mcp) 添加为 goose 扩展，以访问 Dev.to 公共 API。有了这个扩展，goose 可以获取文章、标签、用户信息、评论等，无需身份验证。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?type=streamable_http&url=http%3A%2F%2Flocalhost%3A3000%2Fmcp&id=dev-to&name=Dev.to&description=Access%20Dev.to%20articles%20and%20content)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  使用 `goose configure` 添加 `Remote Extension (Streamable HTTP)` 扩展类型，并填写：

  **端点 URL**

  ```
  http://localhost:3000/mcp
  ```

</TabItem>
</Tabs>

**必要准备**

添加扩展之前，请确保 Dev.to MCP 服务器正在运行
:::

## 配置

:::info
请确保已安装 Node.js 和 npm。使用服务器之前，还需要运行一次 `npm install` 和 `npm run build`。
:::

1. 首先，克隆并设置 `Dev.to MCP server`：
```bash
git clone https://github.com/nickytonline/dev-to-mcp.git
cd dev-to-mcp
npm install
npm run build # one-time setup
```
```bash
npm start
```
服务器现在将运行在：
`http://localhost:3000/mcp`


<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="dev-to"
      extensionName="Dev.to"
      description="访问 Dev.to 文章和内容"
      type="http"
      url="http://localhost:3000/mcp"
    />

  </TabItem>
  <TabItem value="cli" label="goose CLI" default>
      <CLIExtensionInstructions
        name="dev.to"
        description="访问 Dev.to 文章和内容"
        type="http"
        url="http://localhost:3000/mcp"
        timeout={300}
      />
  </TabItem>
</Tabs>

## 使用示例

在这个示例中，goose 使用 `Dev.to MCP` 扩展获取最近 5 篇 JavaScript 文章，并立刻把它们变成个性化的学习中心。

### goose 提示词
```
嘿 goose，从 Dev.to 获取最近 5 篇 JavaScript 文章
创建一个简单的 HTML 落地页，要求：

1. 把每篇文章标题列为可点击链接

2. 在每个标题下包含作者和一句话摘要

3. 为每篇文章建议一个我可以做的小项目或代码片段，用来应用所学（如适用）

4. 如果我只有时间读一篇，标出应该先读哪篇，并解释原因

目标是通过快速展示哪些值得读来节省时间，并通过给出可执行的练习想法帮助我学得更快。
```

### goose 输出

:::note 桌面版

我来帮你从 Dev.to 获取最近的 JavaScript 文章，并创建一个不错的 HTML 学习页面。先获取文章。

`─── per_page state tag ──────────────────────────`

现在我将创建一个包含所有请求功能的精美 HTML 学习页面：

`─── writing /Users/ebonyl/... ──────────────────────────`

很好！我创建了一个精美的 HTML 落地页，展示 Dev.to 上最近 5 篇 JavaScript 文章。包含的内容如下：

🎯 主要功能
    - 📱 响应式设计，带现代渐变背景和卡片式布局
    - 🔗 可点击的文章标题，在新标签页中打开
    - 👤 每篇文章的作者姓名和阅读时间
    - 📝 一句话摘要，说明每篇文章讲什么
    - 🏷️ 标签展示相关技术
    - ⭐ 带视觉高亮的优先推荐
    - 可动手做的项目，以进一步学习
🎨 设计元素
    - 渐变背景和平滑的悬停效果
    - 使用系统字体的清晰排版
    - 颜色编码的推荐系统
    - 在所有设备上都能工作的响应式布局
    - 带阴影和动画的专业卡片式设计
📖 内容亮点

首要推荐：Oluwabusayo Jacobs 的 The Signal Clone 教程（第一部分）被标为必读文章，因为：

它是一次全面的 29 分钟深入讲解
涵盖真实世界的消息应用开发
包含身份验证和实时功能
使用 React Native 和 Stream（很容易迁移到 Web 开发）
提供实践性的动手学习体验

落地页已保存为 `javascript_articles_landing.html`，可以在浏览器中打开！每个文章链接都会直接带你到 Dev.to 上的全文，以便深入阅读。

![Dev.to Project Example](/img/dev.to-project.png)
:::
