---
title: 使用 Playwright CLI Skill 进行智能体测试
description: 使用 goose 与 Playwright CLI，用自然语言生成自动化测试
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GooseBuiltinInstaller from '@site/src/components/GooseBuiltinInstaller';

<iframe
  class="aspect-ratio"
  src="https://www.youtube.com/embed/_MpbmD_unnU?si=dpHvuLVkbONN_0Hk"
  title="使用 Playwright CLI skill 进行智能体测试的教程视频"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>

借助 [Playwright CLI](https://github.com/microsoft/playwright-cli)，goose 可以浏览网站、点击按钮、填写表单，并把这些交互变成 Playwright 测试，全部通过自然语言完成。与 Playwright MCP 不同——后者在每次请求时都把完整页面结构发送给大语言模型——Playwright CLI 把无障碍树保存在本地。这意味着响应更快、成本更低，也不会被大页面困扰。

## 为什么做成 Skill？

大语言模型可能没有在 Playwright 的 CLI 上训练过，因此当你让智能体使用它时，它可能会编造命令和参数，导致错误并浪费 token。 [Playwright CLI Skill](https://github.com/microsoft/playwright-cli/blob/main/skills/playwright-cli/SKILL.md) 会教 goose 如何使用 CLI，以及何时调用特定命令。

## 前提条件

- [Node.js](https://nodejs.org/) 18 或更高版本
- 全局安装 Playwright CLI：
  ```bash
  npm install -g @playwright/cli@latest
  ```
- （可选）如果你想运行生成的测试，安装 [Playwright](https://playwright.dev/)（`npm init playwright@latest`）

## 配置

### 安装 Skill

1. 在命令行中，于项目目录安装 Playwright skill：

```bash
npx skills add https://github.com/microsoft/playwright-cli --skill playwright-cli
```

2. 当询问是否安装 skills 包时，输入 `y`

3. 当询问安装到哪个智能体时，选择 `goose`

4. 选择 `Global` 作用域，以便在任何项目中使用该 skill；或选择 `Local`，仅在当前工作目录中可用

5. 选择 `Symlink`，这样所有智能体都可以引用同一份副本

6. 你会看到安装确认，选择 `Yes` 继续

### 启用 Summon 扩展
在 goose 中启用 [Summon 扩展](/docs/mcp/summon-mcp)，以便在会话中加载 Agent Skills。

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


## 生成带视频和追踪的测试

给 goose 一条描述你想测试什么的提示：

```
Using the Playwright CLI skill, open goose-docs.ai, click on the Docs menu, click on Context Engineering, 
then click on Using Skills and generate a test with video and traces
```

### 工作原理

每条 `playwright-cli` 命令都会自动输出对应的 Playwright 代码。例如，这条命令：

```bash
playwright-cli click e11
```

会执行以下 Playwright 代码：

```ts
await page.getByRole('link', { name: 'Docs' }).click();
```

### goose 会做什么

1. 打开浏览器：`playwright-cli open goose-docs.ai`
2. 开始录制：`playwright-cli video-start` 和 `playwright-cli tracing-start`
3. 拍摄快照以查找元素：`playwright-cli snapshot`
4. 执行点击：`playwright-cli click <ref>`
5. 停止录制：`playwright-cli video-stop` 和 `playwright-cli tracing-stop`
6. 把生成的代码组装成测试文件

### 生成的文件

| 文件 | 说明 |
|------|-------------|
| `tests/using-skills-navigation.spec.ts` | 你的 Playwright 测试 |
| `.playwright-cli/video-*.webm` | 会话的视频录制 |
| `.playwright-cli/traces/*.trace` | 用于调试的追踪文件 |

### 生成的测试代码

生成的测试可能如下：

```typescript
import { test, expect } from '@playwright/test';

test('navigate to Using Skills guide via docs menu', async ({ page }) => {
  await page.goto('https://goose-docs.ai');
  await expect(page).toHaveTitle(/goose/);
  
  // Click on Docs in the navigation
  await page.getByRole('link', { name: 'Docs' }).click();
  
  // Expand Context Engineering category
  await page.getByRole('button', { name: 'Expand sidebar category \'Context Engineering\'' }).click();
  
  // Click on Using Skills
  await page.getByRole('link', { name: 'Using Skills' }).click();
  
  // Verify navigation
  await expect(page).toHaveURL(/using-skills/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Using Skills');
});
```

### 运行测试

goose 甚至可以替你运行测试，确认它按预期工作。如果 Playwright 已经设置好，直接让它运行测试即可。如果还没有，goose 可以先为你安装 Playwright，然后再运行测试。

## 查看视频

要查看发生了什么的视频，提示 goose：

```
Show me the video
```

goose 会使用 CLI 打开录制的视频，这样你就能确切看到会话期间发生了什么。

## 查看追踪

要调试或回顾发生了什么，提示 goose：

```
Open the trace
```

追踪查看器会显示：
- 所有操作的时间线
- 每个操作前后的截图
- 控制台日志和错误
- 网络请求
- 使用的元素定位器

## 多会话的可视化仪表板

当 goose 同时运行多个浏览器任务时，很难掌握正在发生什么。可视化仪表板让你鸟瞰所有活跃的浏览器会话，可以实时观看进度，或在需要时介入并接管控制。

```
Show playwright dashboard
```

在这里你可以看到 goose 正在控制的每个浏览器的实时预览。点击任意会话可以全尺寸观看，或者如果 goose 需要帮忙，你自己接管鼠标和键盘。完成后按 `Escape`，goose 会从你离开的地方继续。

## 完整能力

想知道 Playwright skill 还能做什么？问问 goose：

```
What else can you do with the Playwright skill?
```

| 类别 | 能力 |
|----------|-------------|
| **浏览器控制** | open、goto、click、fill、close |
| **捕获与调试** | screenshot、snapshot、video、trace |
| **标签页管理** | 打开、切换、关闭标签页 |
| **存储与认证** | 保存/恢复 cookie，处理登录状态 |
| **网络** | 模拟 API，拦截请求 |
| **输入** | 输入文本、按键、鼠标操作 |

### 示例用例

- ✅ 用自然语言测试 Web 应用
- ✅ 自动填写表单
- ✅ 从网站抓取数据
- ✅ 用视频录制调试问题
- ✅ 测试认证流程
- ✅ 为文档录制演示
- ✅ 为隔离测试模拟 API

## 结语

上手 Playwright CLI agent skill 很简单，它通过自然语言提示直接打开了强大的浏览器自动化能力。无论你是在生成测试、用视频和追踪调试，还是在自动化复杂交互，Playwright CLI agent skill 都提供了一种节省 token 的方式，让你借助 goose 发挥 Playwright 的全部能力。

## 资源

- [Summon 扩展文档](/docs/mcp/summon-mcp)
- [使用 Skills 指南](/docs/guides/context-engineering/using-skills) - 了解如何用 goose 创建和使用 skills
- [Playwright CLI GitHub](https://github.com/microsoft/playwright-cli)
