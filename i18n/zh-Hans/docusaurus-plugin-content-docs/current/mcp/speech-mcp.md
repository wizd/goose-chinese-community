---
title: Speech 扩展
description: 把 Speech MCP 服务器添加为 goose 扩展
unlisted: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';

<YouTubeShortEmbed videoUrl="https://youtube.com/embed/rurAp_WzOiY" />


本教程介绍如何把 [Speech MCP 服务器](https://github.com/Kvadratni/speech-mcp) 添加为 goose 扩展，以实现实时语音交互、音视频转录、文字转语音，以及多说话人音频生成。

:::info 要求
PyAudio 从麦克风采集音频需要 [PortAudio](https://github.com/GoogleCloudPlatform/python-docs-samples/blob/main/scripts/readme-gen/templates/install_portaudio.tmpl.rst#install-portaudio)
:::

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=uvx&arg=-p&arg=3.10.14&arg=speech-mcp@latest&id=speech_mcp&name=Speech%20Interface&description=Voice%20interaction%20with%20audio%20visualization%20for%20goose)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  uvx -p 3.10.14 speech-mcp@latest
  ```
  </TabItem>
</Tabs>
:::

## 配置

:::info
运行此命令需要系统已安装 [uv](https://docs.astral.sh/uv/#installation)，因为会用到 `uvx`。

添加此扩展之前，请确认系统已安装 [PortAudio](https://github.com/GoogleCloudPlatform/python-docs-samples/blob/main/scripts/readme-gen/templates/install_portaudio.tmpl.rst#install-portaudio)。PyAudio 从麦克风采集音频**必须有 PortAudio**。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="speech_mcp"
    extensionName="Speech Interface"
    description="Voice interaction with audio visualization for goose"
    command="uvx"
    args={["-p", "3.10.14", "speech-mcp@latest"]}
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
    │  speech
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
    │  speech
    │
    // highlight-start
    ◆  What command should be run?
    │  uvx -p 3.10.14 speech-mcp@latest
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
    │  speech
    │
    ◇  What command should be run?
    │  uvx -p 3.10.14 speech-mcp@latest
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
    │  speech
    │
    ◇  What command should be run?
    │  uvx -p 3.10.14 speech-mcp@latest
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
    │  speech
    │
    ◇  What command should be run?
    │  uvx -p 3.10.14 speech-mcp@latest
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
    └  Added speech extension
  ```  

  </TabItem>
</Tabs>


## 使用示例
这个示例演示如何用 goose 和 Speech MCP 服务器扩展，把语音指令变成代码。你可以直接对 goose 说话，启动语音界面，给出口头提示，让 goose 根据请求生成并打开一个网页。

这样就可以解放双手来用 goose 构建，让开发更易用、更有互动性。

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
可以用这些话启动语音界面：

- 「goose，我今天不想打字。」
- 「我们用语音聊吧。」
- 「我们可以语音对话吗？」
- 「我想说话，不想打字。」
- 「goose，启动语音界面。」

```
goose 我今天不想说话
```
### goose 输出
```
明白。那我可以改用语音指令帮你。我会启动语音界面，这样你可以说出请求，而不必打字。

---- Launch Speech UI ----
```

### goose 语音 🎙️

**goose：**
>_我已经启动语音界面。你现在可以说出请求，而不必打字。听到我的声音、看到麦克风激活后再说。你需要什么帮助？_


**Max：**

>_goose，我们做一个简单页面，上面写着 vibes，再让它变色、在页面上移动，做完后在浏览器里打开这个页面_


<div style={{ width: "100%", height: 0, position: "relative", paddingBottom: "56.25%" }}>
  <iframe
    src="https://www.youtube.com/embed/vbD8IHwx-OY"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="YouTube 视频"
    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
  ></iframe>
</div>
