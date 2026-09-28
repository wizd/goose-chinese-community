---
title: Playwright 扩展
description: 把 Playwright MCP 服务器添加为 goose 扩展，用于现代 Web 测试
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/iAxiFMlTE1Q" />

本教程介绍如何把 Playwright MCP 服务器添加为 goose 扩展，以便在 Chromium 和 WebKit 上进行跨浏览器测试和 Web 自动化。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=@playwright/mcp@latest&id=playwright&name=Playwright&description=Modern%20web%20testing%20and%20automation)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y @playwright/mcp@latest
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
    extensionId="playwright"
    extensionName="Playwright"
    description="Modern web testing and automation"
    command="npx"
    args={["-y", "@playwright/mcp@latest"]}
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Playwright"
      description="Modern web testing and automation"
      command="npx -y @playwright/mcp@latest"
    />
  </TabItem>
</Tabs>

## 使用示例

下面用 goose 和 Playwright 扩展创建一套跨浏览器测试。这个示例演示 goose 如何帮你：

1. 在多个浏览器中测试一个 Web 应用
2. 生成可维护的测试代码
3. 截图用于视觉对比

### goose 提示词
```
在 Chromium 和 WebKit 中测试随机改版生成器应用（https://blackgirlbytes.github.io/random-redesign-picker/）。
对每个浏览器：
1. 打开页面
2. 点击 "Pick My Combo" 按钮
3. 确认文本发生变化
4. 截一张图
然后生成一份能在所有浏览器中运行的 Playwright 测试。
```

### goose 输出
```
先从 Chromium 开始：

─── browser_navigate | playwright ──────────────────────────
url: https://blackgirlbytes.github....

现在等待并点击按钮：

─── browser_click | playwright ──────────────────────────
element: button with text "Pick My Combo"
ref: <button>

先记下第一组组合，再点一次，确认它会变化：

─── browser_click | playwright ──────────────────────────
element: button with text "Pick My Combo"
ref: <button>

截一张 Chromium 视图：

─── browser_take_screenshot | playwright ──────────────────────────
filename: chromium-redesign.png

现在在 Safari 里测试。我为 Safari 打开一个新标签页：

─── browser_tab_new | playwright ──────────────────────────
url: https://blackgirlbytes.github....

在 Safari 里点击按钮：

─── browser_click | playwright ──────────────────────────
element: button with text "Pick My Combo"
ref: <button>

再点一次，确认文本发生变化：

─── browser_click | playwright ──────────────────────────
element: button with text "Pick My Combo"
ref: <button>

截一张 Safari 视图：

─── browser_take_screenshot | playwright ──────────────────────────
filename: safari-redesign.png

现在生成一份在三种浏览器环境中都能运行的 Playwright 测试。测试会验证我们刚刚手动测过的核心功能：

─── browser_generate_playwright_test | playwright ──────────────────────────
name: Random Redesign Picker Test
description: Test the random redesign generator functionality across browsers
steps: [
  "Navigate to the application",
  "Verify initial page content",
  "Click button to generate first combination",
  "Click button again to generate second combination",
  "Verify combinations are different"
]

下面是生成的 Playwright 测试，它会在 Chromium、Firefox 和 Safari 中运行：

import { test, expect } from '@playwright/test';

test.describe('Random Redesign Picker', () => {
  test('should generate different random combinations', async ({ page }) => {
    // Navigate to the application
    await page.goto('https://blackgirlbytes.github.io/random-redesign-picker/');
    
    // Verify initial page content
    await expect(page).toHaveTitle('Redesign for the Ridiculous');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('🎲 Redesign for the Ridiculous');
    
    // Verify button is visible
    const comboButton = page.getByRole('button', { name: '🎉 Pick My Combo' });
    await expect(comboButton).toBeVisible();
    
    // Click button and get first combination
    await comboButton.click();
    
    // Wait for and store first combo
    const firstComboElement = page.locator('generic').filter({ hasText: /^(?!.*🎲).*$/ }).last();
    await expect(firstComboElement).toBeVisible();
    const firstComboText = await firstComboElement.textContent();
    
    // Generate second combination
    await comboButton.click();
    
    // Wait for and get second combo
    const secondComboElement = page.locator('generic').filter({ hasText: /^(?!.*🎲).*$/ }).last();
    await expect(secondComboElement).toBeVisible();
    const secondComboText = await secondComboElement.textContent();
    
    // Verify combos are different
    expect(secondComboText).not.toEqual(firstComboText);
  });
});

要使用这个测试，你需要：

1. 把它保存为 `tests/random-redesign.spec.ts`
2. 配置 `playwright.config.ts`，包含全部三种浏览器：

import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
};

export default config;

然后这样运行测试：

npx playwright test

这会在三种浏览器环境中执行测试。测试验证：
1. 页面正确加载
2. 标题和标题文字正确
3. 组合按钮可见
4. 点击按钮会生成一组组合
5. 再次点击会生成不同的组合

测试使用稳健的选择器和适当的等待机制，以便在不同浏览器和网络条件下保持可靠。
```
