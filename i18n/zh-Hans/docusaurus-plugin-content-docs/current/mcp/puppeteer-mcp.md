---
title: Puppeteer 扩展
description: 把 Puppeteer MCP 服务器添加为 goose 扩展
unlisted: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';

<YouTubeShortEmbed videoUrl="https://youtube.com/embed/rms0wVGnlXA" />

服务器已归档

本教程介绍如何把 [Puppeteer MCP 服务器](https://www.pulsemcp.com/servers/merajmehrabi-puppeteer) 添加为 goose 扩展，让 goose 在真实浏览器环境中与网站交互：打开页面、填写表单、点击按钮、截图，以及执行 JavaScript。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=%40modelcontextprotocol%2Fserver-puppeteer&id=puppeteer&name=Puppeteer&description=Headless%20browser%20automation)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y @modelcontextprotocol/server-puppeteer
  ```
  </TabItem>
</Tabs>
:::


## 配置

:::info
运行此命令需要系统已安装 [Node.js](https://nodejs.org/)，因为会用到 `npx`。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="puppeteer"
    extensionName="Puppeteer"
    description="Headless browser automation"
    command="npx"
    args={["-y", "@modelcontextprotocol/server-puppeteer"]}
  />
</TabItem>
  <TabItem value="cli" label="goose CLI">
  1. 运行 `configure` 命令：
  ```sh
  goose configure
  ```

  2. 选择添加 `Command-line Extension`
  ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◆  What type of extension would you like to add?
    │  ○ Built-in Extension 
    // highlight-start    
    │  ● Command-line Extension (Run a local command or script)
    // highlight-end
    │  ○ Remote Extension (Streamable HTTP) 
    └ 
  ```

  3. 为扩展命名
  ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What type of extension would you like to add?
    │  Command-line Extension 
    │
    // highlight-start
    ◆  What would you like to call this extension?
    │  Puppeteer
    // highlight-end
    └ 
  ```

  4. 输入命令
  ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What type of extension would you like to add?
    │  Command-line Extension 
    │
    ◇  What would you like to call this extension?
    │  Puppeteer
    │
    // highlight-start
    ◆  What command should be run?
    │  npx -y @modelcontextprotocol/server-puppeteer
    // highlight-end
    └ 
  ```  

  5. 输入 goose 在操作完成前等待的秒数。默认是 300 秒
   ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What type of extension would you like to add?
    │  Command-line Extension 
    │
    ◇  What would you like to call this extension?
    │  Puppeteer
    │
    ◇  What command should be run?
    │  npx -y @modelcontextprotocol/server-puppeteer
    │
    // highlight-start
    ◆  Please set the timeout for this tool (in secs):
    │  300
    // highlight-end
    └ 
  ``` 

  6. 选择是否添加描述。如果这里选 “Yes”，系统会提示你输入扩展描述。
   ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What type of extension would you like to add?
    │  Command-line Extension 
    │
    ◇  What would you like to call this extension?
    │  Puppeteer
    │
    ◇  What command should be run?
    │  npx -y @modelcontextprotocol/server-puppeteer
    │
    ◇  Please set the timeout for this tool (in secs):
    │  300
    │
    // highlight-start
    ◇  Would you like to add a description?
    │  No
    // highlight-end
    └ 
  ```

  7. 当询问是否添加环境变量时，选择 No

   ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What type of extension would you like to add?
    │  Command-line Extension 
    │
    ◇  What would you like to call this extension?
    │  Puppeteer
    │
    ◇  What command should be run?
    │  npx -y @modelcontextprotocol/server-puppeteer
    │
    ◇  Please set the timeout for this tool (in secs):
    │  300
    │
    ◇  Would you like to add a description?
    │  No
    │    
    // highlight-start
    ◆  Would you like to add environment variables?
    │  No 
    │
    // highlight-end
    └  Added puppeteer extension
  ```  

  </TabItem>
</Tabs>


## 使用示例
这个示例演示如何用 goose 和 Puppeteer 扩展对网站做无障碍审计。通过自动化浏览器操作，goose 可以浏览站点、测试键盘导航、检查颜色对比度、分析 ARIA 属性，并生成带建议和代码修复的详细报告。

这样你可以快速发现并解决无障碍问题，而不必手动检查每一页。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
   1. 在 goose 桌面版中打开一个新会话
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  1. 打开终端，启动一个新的 goose 会话：

  ```sh
  goose session
  ```

  </TabItem>
</Tabs>

### goose 提示词
```
能检查一下我的网站是否无障碍吗？请做一次完整的无障碍审计，重点包括：

1. 键盘导航：测试所有交互元素（链接、按钮、下拉菜单等），确保不用鼠标也能访问。

2. 颜色对比度分析：确认所有文本和界面元素符合 WCAG 对比度标准。

3. 屏幕阅读器兼容性：测试屏幕阅读器能否正确理解内容和导航。

4. ARIA 与语义化 HTML 校验：找出缺失或误用的 ARIA 属性，并确保语义结构正确。

5. 问题识别与截图：提供一份完整报告，列出发现的问题，必要时附上截图。

6. 修复与代码建议：建议用 HTML、CSS 或 JavaScript 修改来解决合规问题。

要测试的网站是：https://broken-workshop.dequelabs.com/。我希望文档符合无障碍标准。请生成一份详细报告，并给出修复步骤。

```

### goose 输出

:::note 桌面版
我来对这个网站做一次全面的无障碍审计。我会结合自动化和手动测试，评估不同的无障碍方面。

    1. 先打开站点
    2. 截图并进行键盘导航测试
    3. 运行无障碍审计，包括颜色对比度分析
    4. 记录发现

**开始：**

    `─── Puppeteer Navigate ──────────────────────────`

**先截一张首页作为参考：**

    `─── Puppeteer Screenshot ────────────────────────`


我来对这个食谱仪表盘网站做详细的无障碍审计。从最初的视图已经能看出几个无障碍问题。按类别拆开如下：

**1. 键盘导航问题：**
- 食谱的 "COOK" 按钮似乎缺少正确的焦点指示
- 食谱卡片上的编辑图标（铅笔图标）似乎没有键盘焦点状态
- 导航顺序可能不合理，没有清晰的 Tab 顺序

**2. 颜色对比度问题：**
- "Difficulty" 标签使用的浅灰文字可能不符合 WCAG 对比度要求
- 绿色的 "Beginner" 文字在白色背景上对比度似乎不足
- "YUMMINESS" 区域的柱状图使用的颜色可能难以区分

**3. 语义结构问题：**
- 标题层级不清晰。"RECIPE DASHBOARD" 似乎是 h1，但食谱标题似乎没有使用正确的标题标签
- 统计数字（9 EGGS USED、10 RECIPES MADE 等）似乎没有使用语义化列表结构
- 图表缺少供屏幕阅读器使用的 ARIA 标签

**4. ARIA 与屏幕阅读器问题：**
- 食谱卡片似乎没有正确的 aria-labelledby 关联
- 编辑按钮缺少描述用途的 aria-label
- 图表数据对屏幕阅读器不可正确访问
- 主导航区域看不到 ARIA 地标

我再跑一些测试来核实这些问题：

    `─── Puppeteer Evaluate ──────────────────────────`

截取几个具体区域做详细分析：

    `─── Puppeteer Screenshot ──────────────────────────`

根据分析，下面是带建议的详细报告：

**无障碍审计报告**

**1. 结构问题：**

```html
<!-- Current -->
<div class="recipe-title">Chocolate Cake</div>

<!-- Recommended -->
<h2 class="recipe-title">Chocolate Cake</h2>
```
**2. 交互元素：**

```html
<!-- Current -->
<button class="cook-button">COOK CHOCOLATE CAKE</button>

<!-- Recommended -->
<button 
  class="cook-button"
  aria-label="Cook Chocolate Cake recipe"
  tabindex="0">
  COOK CHOCOLATE CAKE
</button>
```
**3. 图像无障碍：**
```html
<!-- Current -->
<img src="chocolate-cake.jpg">

<!-- Recommended -->
<img 
  src="chocolate-cake.jpg" 
  alt="Chocolate cake with dark chocolate frosting"
  role="img">
```

**4. 图表无障碍：**

```html
<!-- Recommended addition -->
<div class="yumminess-chart" 
     role="region" 
     aria-label="Monthly yumminess ratings">
  <table class="sr-only">
    <!-- Add hidden table for screen readers -->
  </table>
</div>
```
**5. 颜色对比度修复：**

```css
/* Current */
.difficulty-beginner {
  color: #90EE90;
}

/* Recommended */
.difficulty-beginner {
  color: #2E7D32; /* Darker green for better contrast */
}
```
**6. 焦点管理：**

```css
/* Add to CSS */
:focus {
  outline: 3px solid #2196F3;
  outline-offset: 2px;
}

.cook-button:focus {
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.4);
}
```
**需要优先修复的问题：**

**1. 高优先级：**

- 用 h1–h6 标签建立正确的标题结构
- 实现键盘焦点指示
- 为所有食谱图片添加替代文本
- 修复难度标签的颜色对比度

**2. 中优先级：**

- 为交互元素添加 ARIA 标签
- 为统计数字实现正确的列表结构
- 为键盘导航添加跳过链接
- 让图表数据可被屏幕阅读器访问

**3. 低优先级：**

- 改进焦点顺序
- 添加 ARIA 地标
- 实现动态内容变化的播报

**其他建议：**

**1. 添加跳过链接：**

```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```
**2. 实现正确的表单标签：**

```html
<label for="prep-time">Preparation Time</label>
<input id="prep-time" type="text" value="20 min">
```
**3. 为动态更新添加 ARIA live 区域：**

```html
<div aria-live="polite" role="status">
  <!-- Dynamic content updates -->
</div>
```

**推荐的测试工具：**

1. WAVE Web Accessibility Evaluation Tool
2. axe DevTools
3. 仅键盘导航测试
4. 用 VoiceOver（Mac）做屏幕阅读器测试

这次审计发现了几个应处理的关键无障碍问题，以确保符合 WCAG 2.1。最紧迫的是缺少正确的语义结构、颜色对比度不足，以及缺少 ARIA 属性。需要我针对其中某项修复提供更具体的实现细节吗？
:::

### 结合 GitHub 扩展进一步自动化

可以把[GitHub 扩展](/docs/mcp/github-mcp)和 Puppeteer 扩展结合起来，把无障碍审计再推进一步。这样 goose 不只是发现问题并应用修复，还能帮你处理整个 Git 工作流。GitHub 扩展让 goose 提交更改、创建拉取请求，甚至生成 PR 描述，你只需要审查和合并。

1. 按 **[GitHub 扩展教程](/docs/mcp/github-mcp#configuration)** 中的步骤启用 GitHub 扩展。


:::tip 
使用这种组合方式时，请确认 GitHub 个人访问令牌具备仓库访问和创建拉取请求所需的权限。
:::

2. 让 goose：

   - 创建新分支
   - 提交无障碍改进
   - 打开拉取请求

### goose 提示词：

```
能创建一个名为 accessibility-improvements 的新分支，应用你建议的无障碍修复，并用这些更改打开一个拉取请求吗？
```
随后 goose 会：
   - ✅ 创建分支：`accessibility-improvements`
   - ✅ 应用建议的无障碍修复
   - ✅ 用描述性信息提交更改
   - ✅ 打开一个总结改进内容的拉取请求
