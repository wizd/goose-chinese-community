---
sidebar_position: 1
title: 快速开始
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from "@docusaurus/Link";
import { IconDownload } from "@site/src/components/icons/download";
import { RateLimits } from '@site/src/components/RateLimits';
import { ModelSelectionTip } from '@site/src/components/ModelSelectionTip';
import { OnboardingProviderSetup } from '@site/src/components/OnboardingProviderSetup';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import MacDesktopInstallButtons from '@site/src/components/MacDesktopInstallButtons';
import WindowsDesktopInstallButtons from '@site/src/components/WindowsDesktopInstallButtons';
import LinuxDesktopInstallButtons from '@site/src/components/LinuxDesktopInstallButtons';
import { PanelLeft } from 'lucide-react';

# 5 分钟上手 goose

goose 是一个可扩展的开源 AI 代理，通过自动化编码任务来增强你的软件开发。

这篇快速教程将带你完成：

- ✅ 安装 goose
- ✅ 配置 LLM
- ✅ 做一个小应用
- ✅ 添加 MCP 服务器

开始吧 🚀

## 安装 goose

桌面版和 CLI 请从[中文社区下载页](https://goose-update.vcorp.ai/)获取。

<Tabs>
  <TabItem value="mac" label="macOS" default>
    选择安装 goose 的桌面版和/或 CLI：

    <Tabs groupId="interface">
      <TabItem value="ui" label="goose Desktop" default>
        <MacDesktopInstallButtons/>
        <div style={{ marginTop: '1rem' }}>
          1. 解压下载的 zip 文件。
          2. 运行可执行文件以启动 goose 桌面应用。
        </div>
      </TabItem>
      <TabItem value="cli" label="goose CLI">
        从[中文社区下载页](https://goose-update.vcorp.ai/)获取 goose CLI。

        ### 上游官方安装方式

        下面的命令安装的是上游项目，不是中文社区构建。

        ```sh
        curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash
        ```
      </TabItem>
    </Tabs>
  </TabItem>

  <TabItem value="linux" label="Linux">
    选择安装 goose 的桌面版和/或 CLI：

    <Tabs groupId="interface">
      <TabItem value="ui" label="goose Desktop" default>
        <LinuxDesktopInstallButtons/>
        <div style={{ marginTop: '1rem' }}>
          **对于基于 Debian/Ubuntu 的发行版：**
          1. 下载 DEB 文件
          2. 在终端中进入保存该文件的目录
          3. 运行 `sudo dpkg -i (filename).deb`
          4. 从应用菜单启动 goose

        </div>
      </TabItem>
      <TabItem value="cli" label="goose CLI">
        从[中文社区下载页](https://goose-update.vcorp.ai/)获取 Linux 上的 goose CLI。

        ### 上游官方安装方式

        下面的命令安装的是上游项目，不是中文社区构建。

        ```sh
        curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash
        ```   
      </TabItem>
    </Tabs>
  </TabItem>

  <TabItem value="windows" label="Windows">
    选择安装 goose 的桌面版和/或 CLI：

    <Tabs groupId="interface">
      <TabItem value="ui" label="goose Desktop" default>
        <WindowsDesktopInstallButtons/>
        <div style={{ marginTop: '1rem' }}>
          1. 解压下载的 zip 文件。
          2. 运行可执行文件以启动 goose 桌面应用。
        </div>
      </TabItem>
      <TabItem value="cli" label="goose CLI">
        
        从[中文社区下载页](https://goose-update.vcorp.ai/)获取 Windows 上的 goose CLI。

        ### 上游官方安装方式

        下面的命令安装的是上游项目，不是中文社区构建。

        在 **Git Bash**、**MSYS2** 或 **PowerShell** 中运行以下命令，在 Windows 上原生安装 goose CLI：

        ```bash
        curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash
        ```
        
        前提条件见[安装指南](/docs/getting-started/installation)。

        :::info PATH 警告与密钥环
        如果安装后看到 PATH 警告，需要先把 goose 加入 PATH，再运行 `goose configure`。详细步骤见 [Windows CLI 安装说明](/docs/getting-started/installation)。

        如果配置过程中出现提示，请选择不要存入密钥环。如果遇到密钥环错误，更多信息见 [Windows 设置说明](/docs/getting-started/installation#set-llm-provider)。
        :::

      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

## 配置提供商

goose 使用[受支持的 LLM 提供商](/docs/getting-started/providers)，由它们提供 goose 理解你的请求所需的 AI 能力。首次使用时，系统会提示你配置偏好的提供商。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  在欢迎屏幕上，你有这些选项：
  
  <OnboardingProviderSetup />

  在本快速开始中，选择 **Agent Router by Tetrate**。Tetrate 提供多个 AI 模型的访问，并带有内置速率限制和自动故障转移。关于其他提供商的更多信息，见[配置 LLM 提供商](/docs/getting-started/providers)。
  
  goose 会打开浏览器，让你向 Tetrate 进行身份验证；如果还没有账户，可以创建一个。回到 goose 桌面应用后，就可以开始第一次会话。
      
  :::info 免费额度
  第一次通过 goose 自动向 Tetrate 进行身份验证时，你会获得 10 美元免费额度。新用户和现有 Tetrate 用户都可以获得此优惠。
  :::
    
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  1. 在终端中运行以下命令：

    ```sh
    goose configure
    ```

  2. 从菜单中选择 `Configure Providers` 并按 Enter。

    ```
   ┌   goose-configure 
   │
   ◆  What would you like to configure?
   │  ● Configure Providers (Change provider or update credentials)
   │  ○ Add Extension 
   │  ○ Toggle Extensions 
   │  ○ Remove Extension 
   │  ○ goose settings 
   └  
   ```
   3. 选择模型提供商。在本快速开始中，选择 `Tetrate Agent Router Service` 并按 Enter。Tetrate 提供多个 AI 模型的访问，并带有内置速率限制和自动故障转移。关于其他提供商的信息，见[配置 LLM 提供商](/docs/getting-started/providers)。

   ```
   ┌   goose-configure 
   │
   ◇  What would you like to configure?
   │  Configure Providers 
   │
   ◆  Which model provider should we use?
   │  ○ Amazon Bedrock 
   │  ○ Amazon SageMaker TGI 
   │  ○ Anthropic 
   │  ○ Azure OpenAI 
   │  ○ ChatGPT Codex 
   │  ○ Claude Code CLI 
   │  ○ ...
   |  ● Tetrate Agent Router Service (Enterprise router for AI models)
   │  ○ ...
   └  
   ```
    :::info 免费额度
    第一次通过 goose 自动向 Tetrate 进行身份验证时，你会获得 10 美元免费额度。新用户和现有 Tetrate 用户都可以获得此优惠。
    :::

   4. 在提示时输入 API 密钥（以及任何其他配置细节）。

   ```
   ┌   goose-configure 
   │
   ◇  What would you like to configure?
   │  Configure Providers 
   │
   ◇  Which model provider should we use?
   │  Tetrate Agent Router Service 
   │
   ◆  Provider Tetrate Agent Router Service requires TETRATE_API_KEY, please enter a value
   │  ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
   └  
   ```
    :::tip GitHub Copilot 身份验证
    GitHub Copilot 不使用 API 密钥。配置过程中会生成一个身份验证码。要生成该码，请选择 `GitHub Copilot` 作为提供商。身份验证码会复制到剪贴板，并打开浏览器窗口，你可以在其中粘贴以完成身份验证。

    更多细节见 [GitHub Copilot 身份验证](/docs/getting-started/providers#github-copilot-authentication)。
    :::

   5. 选择或搜索你想使用的模型。
   ```
   │
   ◇  Model fetch complete
   │
   ◆  Select a model:
   │  ○ Search all models...
   │  ○ gemini-2.5-pro
   │  ○ gemini-2.0-flash
   |  ○ gemini-2.0-flash-lite
   │  ● gpt-5 (Recommended)
   |  ○ gpt-5-mini
   |  ○ gpt-5-nano
   |  ○ gpt-4.1
   │
   ◓  Checking your configuration...
   └  Configuration saved successfully
   ```
  </TabItem>
</Tabs>

## 开始会话
会话是你与 goose 之间单次、连续的对话。让我们开始一个。

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
        选择 LLM 提供商后，点击侧边栏中的 `Home` 按钮。

        把问题、任务或指令直接输入输入框，goose 会立刻开始工作。
    </TabItem>
    <TabItem value="cli" label="goose CLI">
        1. 创建一个空目录（例如 `goose-demo`），并在终端中进入该目录。
        2. 要开始新会话，运行：
        ```sh
        goose session
        ```

    </TabItem>
</Tabs>

## 编写提示

在提示中，你可以像跟开发者说话一样输入指令，与 goose 交互。

让我们请 goose 做一个井字棋游戏！

```
create an interactive browser-based tic-tac-toe game in javascript where a player competes against a bot
```

goose 会制定计划，然后立刻着手实现。完成后，你的目录里应有一个 JavaScript 文件，以及一个用来玩游戏的 HTML 页面。


## 启用扩展

你可以手动进入工作目录并在浏览器中打开 HTML 文件，但如果让 goose 来做会更好。让我们启用 [`Computer Controller` 扩展](/docs/mcp/computer-controller-mcp)，赋予 goose 打开网页浏览器的能力。

<Tabs groupId="interface">

    <TabItem value="ui" label="goose Desktop" default>
        1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
        2. 在侧边栏菜单中点击 `Extensions`。
        3. 打开 `Computer Controller` 扩展的开关以启用它。该扩展支持网页抓取、文件缓存和自动化。
        4. 返回会话继续。
        5. 既然 goose 已具备浏览器能力，让它在浏览器中启动你的游戏：
    </TabItem>
    <TabItem value="cli" label="goose CLI">
        1. 输入 `Ctrl+C` 结束当前会话，以便回到终端命令提示符。
        2. 运行配置命令
        ```sh
        goose configure
        ```
        3. 选择 `Add Extension` > `Built-in Extension` > `Computer Controller`，并把超时设为 300 秒。该扩展支持网页抓取、文件缓存和自动化。
        ```
        ┌   goose-configure
        │
        ◇  What would you like to configure?
        │  Add Extension
        │
        ◇  What type of extension would you like to add?
        │  Built-in Extension
        │
        ◇  Which built-in extension would you like to enable?
        │  Computer Controller
        │
        ◇  Please set the timeout for this tool (in secs):
        │  300
        │
        └  Enabled computercontroller extension
        ```
        4. 既然 goose 已具备浏览器能力，恢复上一次会话：
        ```sh
         goose session -r
        ```
        5. 让 goose 在浏览器中启动你的游戏：
    </TabItem>
</Tabs>

```
open the tic-tac-toe game in a browser
```

去玩你的游戏吧，我知道你想玩 😂 ……祝你好运！


## 后续步骤
恭喜，你已经成功用 goose 开发了一个 Web 应用！🎉

接下来可以试试：
* 继续与 goose 的会话，改进你的游戏（样式、功能等）。
* 浏览其他可用[扩展](/extensions)，安装更多扩展以进一步增强 goose 的功能。
* 为 goose 提供一套可在会话中使用的[提示](/docs/guides/context-engineering/using-goosehints)。
* 如果你不希望 goose 自主工作，了解如何设置[访问控制](/docs/mcp/developer-mcp#configuring-access-controls)。
