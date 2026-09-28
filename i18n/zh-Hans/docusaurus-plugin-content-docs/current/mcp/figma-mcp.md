---
title: Figma 扩展
description: 将 Figma Dev Mode MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import { PanelLeft } from 'lucide-react';

本教程介绍如何将 [Figma Dev Mode MCP 服务器](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server) 添加为 goose 扩展，以便与 Figma 文件、设计和组件交互。

:::info
MCP 服务器需要 Professional、Organization 或 Enterprise Figma 方案上的 Dev 或 Full 席位。
:::

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    [启动安装程序](goose://extension?type=streamable_http&url=http%3A%2F%2F127.0.0.1%3A3845%2Fmcp&id=figma&name=Figma&description=Convert%20Figma%20designs%20into%20code%20and%20extract%20design%20context)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    使用 `goose configure` 添加 `Remote Extension (Streamable HTTP)` 扩展类型，并填写：
    
    **端点 URL**
    
    ```
    http://127.0.0.1:3845/mcp
    ```
  </TabItem>
</Tabs>

**必要准备**

必须在 [Figma 桌面应用](https://www.figma.com/downloads/) 中启用 Dev Mode MCP 服务器
:::

## 配置

1. 按照 Figma 的 [Dev Mode MCP 服务器指南](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server) 启用 MCP 服务器。

   之后服务器将运行在 `http://127.0.0.1:3845/mcp`

   :::info 替代设置
   如果按说明在桌面应用中看不到 `Preferences` 菜单，可以试试：
   1. 点击设计文件底部的 `</>` 开关
   2. 在右侧面板中打开 `Enable MCP server`
   :::

2. 把 Figma 扩展添加到 goose：
   <Tabs groupId="interface">
     <TabItem value="ui" label="goose Desktop" default>
       <GooseDesktopInstaller
         extensionId="figma"
         extensionName="Figma"
         description="将 Figma 设计转换为代码并提取设计上下文"
         type="http"
         url="http://127.0.0.1:3845/mcp"
       />
     </TabItem>
     <TabItem value="cli" label="goose CLI">
       <CLIExtensionInstructions            
         name="figma"
         description="将 Figma 设计转换为代码并提取设计上下文"
         type="http"
         url="http://127.0.0.1:3845/mcp"
         timeout={300}
       />
     </TabItem>
   </Tabs>

## 使用示例

goose 中的 Figma 扩展与 Figma 桌面应用配合使用。你可以用该扩展：
- 把 Figma 设计转换成可用于生产的代码（React、Vue、HTML/CSS 等）
- 提取设计令牌、变量，并生成设计系统规则
- 捕获设计的视觉参考

让我们试着把一个 Figma 设计转换成 React 代码。先复制链接：
  1. 在已启用 MCP 服务器的 [Figma 桌面应用](https://www.figma.com/downloads/) 中打开设计文件
  2. 在图层面板中，右键任意画框或组件，选择 `Copy link to selection`

:::tip
你可以给 goose 一个 Figma 链接，或直接在 Figma 桌面应用中选中一个元素。
:::

### goose 提示词

```
把这个转换成 React：https://www.figma.com/design/B6IFM1qjwxJw5fOYJYKRl5/Buttons-?node-id=351-8&m=dev
```

### goose 输出

:::note 桌面版

我来帮你把这个 Figma 设计转换成 React。先查看 Figma 文件，了解设计结构和组件。

```
manage_extensions action, extension_name
```

我来帮你把这个 Figma 设计转换成 React。先从 URL 中提取节点 ID，然后为你生成 React 代码。

```
get_code nodeId, clientLanguages, clientFrameworks
```

```
get_image nodeId, clientLanguages, clientFrameworks
```

我已成功把你的 Figma 设计转换成 React！生成的组件如下：

```jsx
const imgImage1 = "http://localhost:3845/assets/e0e0f6accb741cb6cacec2697cef047a7eea7e30.png";

function Component1() {
  return (
    <div className="relative size-full" data-name="Component 1" data-node-id="351:8">
      <div className="absolute bg-[#d9d9d9] inset-0 rounded-lg" data-node-id="351:2" />
      <div
        className="absolute font-['Inter:Black',_sans-serif] font-black inset-[23.33%_2.56%_22.22%_56.41%] leading-[normal] not-italic text-[#333b43] text-[20px]"
        data-node-id="351:3"
      >
        <p className="block mb-0">ask</p>
        <p className="block">goose</p>
      </div>
      <div
        className="absolute aspect-[92/90] bg-center bg-cover bg-no-repeat left-0 right-[52.82%] rounded-lg top-0"
        data-name="image 1"
        data-node-id="351:6"
        style={{ backgroundImage: `url('${imgImage1}')` }}
      />
    </div>
  );
}

export default function Component2() {
  return (
    <div className="relative size-full" data-name="Component 1" data-node-id="351:8">
      <Component1 />
    </div>
  );
}
```

#### 生成组件的主要特点：

- **Tailwind CSS 样式**：使用 Tailwind 类实现响应式设计和样式
- **图片资源**：goose 标志作为背景图从 localhost 服务器加载
- **字体**：使用 Inter Black 字体显示 “ask goose” 文字
- **布局**：绝对定位，并用精确的 inset 值匹配 Figma 设计
- **响应式**：使用相对定位和基于百分比的 inset，便于缩放

#### 组件结构：
- **背景**：浅灰圆角容器（#d9d9d9）
- **标志**：goose 剪影图片位于左侧
- **文字**：右侧深灰色（#333b43）的 “ask goose” 文字

该组件保持了 Figma 设计中的确切视觉层级和样式，同时完全响应式，可以直接集成到使用 Tailwind CSS 的 React 应用中。

:::
