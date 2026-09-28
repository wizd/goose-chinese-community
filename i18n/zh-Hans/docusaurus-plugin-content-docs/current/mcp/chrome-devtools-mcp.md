---
title: Chrome DevTools 扩展
description: 将 Chrome DevTools MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/I9FwKbPvgvU" />

本教程介绍如何将 Chrome DevTools MCP 服务器添加为 goose 扩展，以便在 Chrome 浏览器中进行浏览器自动化、网页性能测试和交互式 Web 应用调试。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=chrome-devtools-mcp%40latest&id=chrome-devtools-mcp&name=Chrome%20DevTools&description=Browser%20automation%20and%20web%20performance%20testing%20capabilities)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y chrome-devtools-mcp@latest
  ```
  </TabItem>
</Tabs>
:::

## 配置

:::info
运行此命令需要在系统上安装 [Node.js](https://nodejs.org/)，因为它使用 `npx`。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="chrome-devtools-mcp"
      extensionName="Chrome DevTools"
      description="浏览器自动化与网页性能测试能力"
      command="npx"
      args={["-y", "chrome-devtools-mcp@latest"]}
    />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Chrome DevTools"
      description="浏览器自动化与网页性能测试能力"
      command="npx -y chrome-devtools-mcp@latest"
    />
  </TabItem>
</Tabs>

## 使用示例

在这个示例中，我将展示如何用 goose 和 Chrome DevTools 扩展，对一个演示网站做自动化性能测试。

### goose 提示词
```
使用 chrome dev tools 扩展打开 https://www.saucedemo.com
然后以 performance_glitch_user 登录，并测量该站点的性能
```
### goose 输出

```

我来帮你打开 Sauce Demo 站点，以 performance_glitch_user 登录，并测量性能影响。先看看当前打开了哪些页面，再导航到该站点。

很好！我看到了 Swag Labs 的登录页。`performance_glitch_user` 是接受的用户名之一，所有用户的密码都是 `secret_sauce`。我用这些凭据登录，然后测量性能。

我已成功打开 Saucedemo 网站，并以 `performance_glitch_user` 登录来测量站点性能。发现如下：

## performance_glitch_user 的性能分析结果

### 初步观察

1. **登录性能**：使用 performance_glitch_user 的初次登录明显比正常情况更慢。点击 Login 按钮实际上在 5 秒后超时，说明存在明显延迟。

2. **页面加载指标**：
   - **总加载时间**：约 5.03 秒（5030ms）
   - **First Paint**：5.08 秒
   - **First Contentful Paint**：5.08 秒
   - **响应时间**：2.5ms（服务器响应其实很快）
   - **DOM Content Loaded**：0.1ms

### 发现的性能问题

`performance_glitch_user` 账号的性能问题看起来是**客户端渲染延迟**，而不是网络或服务器问题：

- 服务器响应很快（响应时间 2.5ms）
- 主要延迟发生在渲染阶段（首次绘制超过 5 秒）
- 这表明性能故障是有意做进这个特定用户的客户端 JavaScript 执行中的

### 交互性能

- **按钮点击**：把商品加入购物车可以成功，但有明显延迟
- **DOM 查询**：标准 DOM 操作表现正常（约 0.1ms）
- **JavaScript 执行**：基础计算以正常速度运行（10 万次运算约 2ms）

### 购物车功能

我成功把多件商品加入购物车（购物车计数从 1 增加到 3），说明尽管有性能问题，核心功能仍然完好。

### 结论

`performance_glitch_user` 账号展示了**有意的性能下降**，主要影响：
- 初始页面渲染（超过 5 秒的延迟）
- 登录过程（超时）
- 视觉反馈延迟

这使它成为性能测试场景的优秀测试账号：它模拟用户在慢设备或较差网络下可能遇到的真实性能问题，同时保持功能正确。
```
