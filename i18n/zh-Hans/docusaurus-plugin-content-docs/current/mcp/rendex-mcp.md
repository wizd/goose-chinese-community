---
title: Rendex 扩展
description: 把 Rendex MCP 服务器添加为 goose 扩展，用于截图、PDF 和 HTML 转图像渲染
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

本教程介绍如何把 [Rendex MCP 服务器](https://github.com/copperline-labs/rendex-mcp) 添加为 goose 扩展，用来截图、生成 PDF，以及把任意网页或原始 HTML 渲染成图像。它适合归档界面、生成发票和报告、制作 OG 图像，也能让 goose 可靠地「看见网页」，而不必拉起一整套浏览器自动化栈。

## 配置

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?type=streamable_http&url=https%3A%2F%2Fmcp.rendex.dev%2Fmcp&id=rendex-mcp&name=Rendex&description=Capture%20screenshots%2C%20generate%20PDFs%2C%20and%20render%20HTML%20to%20images%20via%20AI%20agents&header=Authorization%3DBearer%20YOUR_RENDEX_API_KEY)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  添加 `Remote Extension (Streamable HTTP)` 类型的扩展，并填写：

  **端点 URL**
  ```
  https://mcp.rendex.dev/mcp
  ```
  </TabItem>
</Tabs>

  **自定义请求头**
  ```
  Authorization: Bearer <YOUR_RENDEX_API_KEY>
  ```
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="rendex-mcp"
      extensionName="Rendex"
      description="Capture screenshots, generate PDFs, and render HTML to images via AI agents"
      type="http"
      url="https://mcp.rendex.dev/mcp"
      envVars={[
        { name: "Authorization", label: "Bearer YOUR_RENDEX_API_KEY" }
      ]}
      apiKeyLink="https://rendex.dev/dashboard/keys"
      apiKeyLinkText="Rendex API key"
    />
  </TabItem>

  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Rendex"
      description="Capture screenshots, generate PDFs, and render HTML to images via AI agents"
      type="http"
      url="https://mcp.rendex.dev/mcp"
      timeout={300}
      envVars={[
        { key: "Authorization", value: "Bearer rdx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }
      ]}
      infoNote={
        <>
          Obtain your <a href="https://rendex.dev/dashboard/keys" target="_blank" rel="noopener noreferrer">Rendex API key</a> and paste it in as the <code>Bearer</code> token. Free tier includes 500 calls/month, no credit card required.
        </>
      }
    />
  </TabItem>
</Tabs>

## 使用示例

下面用 Rendex 扩展，从原始 HTML 生成发票 PDF，并归档一个产品页。

### goose 提示词

```
1. 把这段 HTML 渲染成 A4 PDF，页边距 1cm：

   <!doctype html>
   <html>
     <body style="font-family: system-ui; padding: 40px;">
       <h1>Invoice #0042</h1>
       <p>Bill to: Acme Corp</p>
       <table>
         <tr><td>MCP server listing</td><td>$500.00</td></tr>
         <tr><td>Total</td><td><b>$500.00</b></td></tr>
       </table>
     </body>
   </html>

2. 然后对 https://news.ycombinator.com 截一张深色模式的整页图

3. 把两个结果都返回，方便我保存
```

### goose 输出

```
我先生成发票 PDF，再截取 HN 页面。

[rendex_screenshot: format=pdf, pdfFormat=A4, pdfMargin={top: 1cm, ...}, html=<invoice markup>]
✓ PDF 截取成功（12,344 字节）
  width: 1280  height: 800  capturedAt: 2026-04-15T12:34:56Z

[rendex_screenshot: url=https://news.ycombinator.com, fullPage=true, darkMode=true]
✓ 截图已完成（PNG，847KB）
  width: 1280  height: 4,321  waitStrategy: networkidle2

两次渲染都完成了。你得到了：
  1. 发票 PDF（A4，12.3KB），结果 1 中为 base64
  2. Hacker News 深色模式整页截图（PNG，847KB），结果 2 中为 base64
```

## 价格

Rendex 可以免费试用。免费档不需要信用卡。

| 方案 | 每月调用次数 | 速率限制 |
|---|---|---|
| Free | 500 | 10 次/分钟 |
| Starter | 10,000 | 60 次/分钟 |
| Pro | 100,000 | 300 次/分钟 |
| Enterprise | 定制 | 1,000 次/分钟 |

在 [rendex.dev](https://rendex.dev) 获取 API 密钥。

## 链接

- **网站**：[rendex.dev](https://rendex.dev)
- **GitHub**：[copperline-labs/rendex-mcp](https://github.com/copperline-labs/rendex-mcp)
- **npm**：[`@copperline/rendex-mcp`](https://www.npmjs.com/package/@copperline/rendex-mcp)
- **Smithery**：[smithery.ai/server/copperline/rendex-mcp](https://smithery.ai/server/copperline/rendex-mcp)
- **官方 MCP Registry**：`io.github.copperline-labs/rendex-mcp`
