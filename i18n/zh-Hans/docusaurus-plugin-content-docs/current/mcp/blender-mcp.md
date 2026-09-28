---
title: Blender 扩展
description: 将 Blender MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/izoQatKtJ2I" />

本教程介绍如何将 [Blender MCP 服务器](https://github.com/ahujasid/blender-mcp) 添加为 goose 扩展，以便用自然语言创建 3D 场景、控制 Blender、生成模型、应用材质等。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=uvx&arg=blender-mcp&id=blender-mcp&name=Blender&description=Blender%203D%20scene%20creation%20integration)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  uvx blender-mcp
  ```
  </TabItem>
</Tabs>
:::

**要求**

下载 [Blender 应用](https://www.blender.org/download/) 和 [Blender MCP 插件文件](https://github.com/ahujasid/blender-mcp/blob/main/addon.py)

## 配置

:::info
运行此命令需要在系统上安装 [uv](https://docs.astral.sh/uv/#installation)，因为它使用 `uvx`。
:::

1. 下载 [Blender 应用](https://www.blender.org/download/)
2. 添加 Blender MCP 插件
    - 从 [Blender MCP 仓库](https://github.com/ahujasid/blender-mcp/blob/main/addon.py) 下载 `addon.py` 文件。
    - 打开 Blender
    - 进入 `Edit` > `Preferences` > `Add-ons`。
    - 点击向下箭头，选择 `install from disk`，添加你下载的 `addon.py` 文件。
    - 安装后勾选以启用 `Blender MCP`。
3. 启动 Blender MCP 服务器
    - 在 Blender 中按 N 打开侧边栏。
    - 进入 Blender MCP 标签页。
    - 点击 `connect to MCP server`

### 添加 Blender MCP 服务器

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="blender-mcp"
    extensionName="Blender"
    description="Blender 3D 场景创建集成"
    command="uvx"
    args={["blender-mcp"]}
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Blender"
      description="Blender 3D 场景创建集成"
      command="uvx blender-mcp"
    />
  </TabItem>
</Tabs>

## 使用示例

在这个示例中，我将展示如何用 goose 和 Blender 扩展从零搭建一整幅 3D 篝火场景。通过用自然语言自动化 Blender 操作，goose 可以创建木柴和火球等物体、应用真实材质、添加光照、为火花生成粒子、做出淡淡的烟雾，甚至让火焰随时间轻轻跳动。

在这个示例中，我将展示如何用 goose 和 Blender 扩展搭建完整的 3D 篝火场景，包括木柴、火球、光照和细微的火焰动画，你只需描述想要的效果。

### goose 提示词

> 搭建一个温馨的篝火场景。加一块地面，把几根木柴围成一圈，中间放一个发光的火球。把光照调成日落那样的暖色，并把相机调成有戏剧感的角度。给木柴粗糙的木质纹理，让火球发光。


### goose 输出

:::note CLI

我来帮你在 Blender 里创建一个温馨的篝火场景。我们分步进行，结合基础物体、来自 PolyHaven 的纹理和合适的光照。先看看当前场景里有什么。

─── **Get Scene Info** ───

我们一步步搭建场景：

先删除默认立方体，并设置地面：

─── **Execute Blender Code** ───

2. 现在把木柴围成一圈：

─── **Execute Blender Code** ───

3. 在中间创建发光的火球：

─── **Execute Blender Code** ───

让我修正火球材质：

─── **Execute Blender Code** ───

4. 最后设置光照和相机，拍出有戏剧感的日落镜头：

─── **Execute Blender Code** ───

我创建了一个温馨的篝火场景，包含以下元素：

1. 一块深棕色材质的大地面
2. 5 根围成一圈的木柴，带有粗糙木质材质
3. 中心一个带自发光材质的火球
4. 一盏点光源，用来做出火焰的辉光
5. 调整了主太阳光，营造温暖的日落氛围
6. 把相机摆在有戏剧感的角度
7. 用 Cycles 调整了场景以便更好地渲染

场景氛围温暖舒适，木柴自然地围在发光火球周围。光照模拟了暖色日落，相机从有趣的角度拍摄场景。

如果你还想调整，例如：

- 改变某些元素的大小或位置
- 调整光照强度
- 修改相机角度
- 添加小石块或更多木柴等细节

告诉我，我会继续帮你细化场景！
:::

#### Blender 图像

![Blender MCP Scene](/img/blender.png)
