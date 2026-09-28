---
title: Cloudinary Asset Management 扩展
description: 将 Cloudinary Asset Management MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/4diEvoRFVrQ" />

本教程介绍如何将 [Cloudinary Asset Management MCP 服务器](https://github.com/cloudinary/asset-management-js) 添加为 goose 扩展，以自动化通常需要专业设计软件或手工编辑的复杂图像处理工作流。

:::tip 快速安装

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=--package&arg=@cloudinary/asset-management&arg=--&arg=mcp&arg=start&id=cloudinary-asset-management-mcp&name=Cloudinary%20Asset%20Management&description=Powerful%20media%20processing%20and%20transformation&env=CLOUDINARY_URL%3DCloudinary%20URL)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y --package @cloudinary/asset-management -- mcp start
  ```
  </TabItem>
</Tabs>
  **环境变量**
  ```
  CLOUDINARY_URL: cloudinary://<your_api_key>:<your_api_secret>@<your_cloud_name>
  ```
:::

## 配置

:::info
运行此命令需要在系统上安装 [Node.js](https://nodejs.org/)，因为它使用 `npx`。你还需要一个 [Cloudinary 账号](https://cloudinary.com/users/register/free)。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="cloudinary-asset-management-mcp"
    extensionName="Cloudinary Asset Management"
    description="强大的媒体处理与变换"
    command="npx"
    args={["-y", "--package", "@cloudinary/asset-management", "--", "mcp", "start"]}
    envVars={[{ name: "CLOUDINARY_URL", label: "Cloudinary URL (cloudinary://api_key:api_secret@cloud_name)" }]}
    apiKeyLink="https://console.cloudinary.com/settings/api-keys"
    apiKeyLinkText="Cloudinary URL"
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Cloudinary"
      description="强大的媒体处理与变换"
      command="npx -y --package @cloudinary/asset-management -- mcp start"
      envVars={[
        { key: "CLOUDINARY_URL", value: "▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪" }
      ]}
      infoNote={
        <>
          从控制台获取你的 <a href="https://console.cloudinary.com/settings/api-keys" target="_blank" rel="noopener noreferrer">Cloudinary URL</a> 并粘贴到此处。例如：<code>cloudinary://&lt;your_api_key&gt;:&lt;your_api_secret&gt;@&lt;your_cloud_name&gt;</code>
        </>
      }
    />
  </TabItem>
</Tabs>

## 使用示例

让我们用 Cloudinary 扩展查找并变换带有高级视觉效果的产品图片。在这个示例中，我们将演示 goose 如何帮你：

1. 在媒体库中搜索特定图片
2. 应用包括去背景在内的复杂变换
3. 添加精确定位的文字叠加

### goose 提示词
```
1. 在我的 Cloudinary samples 中查找文件名或 public ID 包含 “shoe” 的鞋子图片。
2. 变换第一个结果，只提取鞋子本身
3. 添加白色文字叠加，内容是 I love shoes。确保它在鞋子上方
4. 给图片加背景。背景应该是黑色
```

### goose 输出
```
我来帮你在 Cloudinary samples 中查找鞋子图片，并应用你要求的变换。先搜索文件名或 public ID 中包含 “shoe” 的图片。

─── list-images | cloudinaryassetmanagement ──────────────────────────
maxResults: 50
prefix: samples
type: upload

很好！我在你的 Cloudinary samples 中找到了鞋子图片。我看到：

1. **`samples/shoe`** - 单只鞋的图片（publicId：`samples/shoe`）
2. **`samples/ecommerce/shoes`** - 一双鞋（publicId：`samples/ecommerce/shoes`）

按你的要求，我使用第一个结果（`samples/shoe`）并应用所有变换：

1. 只提取鞋子（使用去背景）
2. 在鞋子上方添加白色文字叠加 “I love shoes”
3. 添加黑色背景

以下是包含你所要求的全部修改的变换后图片 URL：

https://res.cloudinary.com/dd8qwbjtv/image/upload/e_background_removal/b_black/l_text:Arial_60:I%20love%20shoes,co_white,g_north,y_50/samples/shoe

让我说明每项变换的作用：

- `e_background_removal` - 去除背景，只提取鞋子
- `b_black` - 添加黑色背景，替换被去除的背景
- `l_text:Arial_60:I%20love%20shoes,co_white,g_north,y_50` - 添加白色文字叠加：
  - `Arial_60` - Arial 字体，字号 60
  - `I%20love%20shoes` - 文字（URL 编码）
  - `co_white` - 白色
  - `g_north` - 位于顶部（北）
  - `y_50` - 距顶部偏移 50 像素

以下是文件名/public ID 中包含 “shoe” 的图片：

1. **第一个结果（用于变换）**：`samples/shoe`
   - 原图：https://res.cloudinary.com/dd8qwbjtv/image/upload/v1708364167/samples/shoe.jpg
   - **变换后**：https://res.cloudinary.com/dd8qwbjtv/image/upload/e_background_removal/b_black/l_text:Arial_60:I%20love%20shoes,co_white,g_north,y_50/samples/shoe

2. **第二个结果**：`samples/ecommerce/shoes`
   - 原图：https://res.cloudinary.com/dd8qwbjtv/image/upload/v1708364144/samples/ecommerce/shoes.png

变换后的图片现在具有：
✅ 只提取了鞋子（背景已去除）
✅ 白色文字 “I love shoes” 位于鞋子上方
✅ 已应用黑色背景

你可以点击变换后的 URL 查看最终结果！
```
