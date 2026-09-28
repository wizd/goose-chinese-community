---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { RateLimits } from '@site/src/components/RateLimits';
import { OnboardingProviderSetup } from '@site/src/components/OnboardingProviderSetup';
import { ModelSelectionTip } from '@site/src/components/ModelSelectionTip';
import MacDesktopInstallButtons from '@site/src/components/MacDesktopInstallButtons';
import WindowsDesktopInstallButtons from '@site/src/components/WindowsDesktopInstallButtons';
import LinuxDesktopInstallButtons from '@site/src/components/LinuxDesktopInstallButtons';
import { PanelLeft } from 'lucide-react';

# 安装 goose

桌面版和 CLI 请从[中文社区下载页](https://goose-update.vcorp.ai/)获取。

<Tabs>
  <TabItem value="mac" label="macOS" default>
    选择安装 goose 的桌面版和/或 CLI：

    <Tabs groupId="interface">
      <TabItem value="ui" label="goose Desktop" default>
        从浏览器直接安装 goose 桌面版。

        <h3 style={{ marginTop: '1rem' }}>方式一：下载安装</h3>
        <MacDesktopInstallButtons/>

        <div style={{ marginTop: '1rem' }}>
          1. 解压下载的 zip 文件。
          2. 运行可执行文件以启动 goose 桌面应用。

          :::tip 更新 goose
          最好定期[更新 goose](/docs/guides/updating-goose)。
          :::
        </div>
        <h3>上游官方安装方式</h3>
        下面的方式安装的是上游项目，不是中文社区构建。

        Homebrew 会下载[同一应用](https://github.com/Homebrew/homebrew-cask/blob/master/Casks/b/block-goose.rb)，也可以负责更新。
        ```bash
        brew install --cask block-goose
        ```
        ---
        <div style={{ marginTop: '1rem' }}>
          :::info 权限
          如果你使用 Apple Mac M3，且 goose 桌面应用启动后没有窗口，请检查并更新以下内容：

          确保 `~/.config` 目录具有读写权限。

          goose 需要此权限来创建日志目录和文件。授予权限后，应用应能正确加载。具体步骤见[已知问题指南](/docs/troubleshooting/known-issues#macos-permission-issues)。
          :::
        </div>
      </TabItem>
      <TabItem value="cli" label="goose CLI">
        从[中文社区下载页](https://goose-update.vcorp.ai/)获取 macOS 上的 goose CLI。

        <h3 style={{ marginTop: '1rem' }}>方式一：从中文社区下载</h3>
        打开 [goose-update.vcorp.ai](https://goose-update.vcorp.ai/) 下载并安装 CLI。

        <h3>上游官方安装方式</h3>
        下面的命令安装的是上游项目，不是中文社区构建。

        运行以下命令，在 macOS 上安装最新版 goose：

        ```sh
        curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash
        ```
        该脚本会获取最新版 goose 并在系统上完成设置。

        如果希望安装时不做交互式配置，请关闭 `CONFIGURE`：

        ```sh
        curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | CONFIGURE=false bash
        ```

        :::tip 更新 goose
        最好保持 goose 为最新版本。要更新 goose，运行：
        ```sh
        goose update
        ```
        :::

        Homebrew 会下载[预编译 CLI 工具](https://github.com/Homebrew/homebrew-core/blob/master/Formula/b/block-goose-cli.rb)，也可以负责更新。
        ```bash
        brew install block-goose-cli
        ```
      </TabItem>
    </Tabs>
  </TabItem>

  <TabItem value="linux" label="Linux">
    选择安装 goose 的桌面版和/或 CLI：

    <Tabs groupId="interface">
      <TabItem value="ui" label="goose Desktop" default>
        从浏览器直接安装 goose 桌面版。

        <h3 style={{ marginTop: '1rem' }}>下载安装</h3>
        <LinuxDesktopInstallButtons/>

        <div style={{ marginTop: '1rem' }}>
          **对于基于 Debian/Ubuntu 的发行版：**
          1. 下载 DEB 文件
          2. 在终端中进入保存该文件的目录
          3. 运行 `sudo dpkg -i (filename).deb`
          4. 从应用菜单启动 goose

          :::tip 更新 goose
          最好定期[更新 goose](/docs/guides/updating-goose)。
          :::
        </div>
      </TabItem>
      <TabItem value="cli" label="goose CLI">
        从[中文社区下载页](https://goose-update.vcorp.ai/)获取 Linux 上的 goose CLI。

        <h3>上游官方安装方式</h3>
        下面的命令安装的是上游项目，不是中文社区构建。

        运行以下命令在 Linux 上安装 goose CLI：

        ```sh
        curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash
        ```
        该脚本会获取最新版 goose 并在系统上完成设置。

        如果希望安装时不做交互式配置，请关闭 `CONFIGURE`：

        ```sh
        curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | CONFIGURE=false bash
        ```

        :::tip 更新 goose
        最好保持 goose 为最新版本。要更新 goose，运行：
        ```sh
        goose update
        ```
        :::
      </TabItem>
    </Tabs>
  </TabItem>

  <TabItem value="windows" label="Windows">
    选择安装 goose 的桌面版和/或 CLI：

    <Tabs groupId="interface">
      <TabItem value="ui" label="goose Desktop" default>
        从浏览器直接安装 goose 桌面版。

        <h3 style={{ marginTop: '1rem' }}>下载安装</h3>
        <WindowsDesktopInstallButtons/>

        <div style={{ marginTop: '1rem' }}>
          1. 解压下载的 zip 文件。
          2. 运行可执行文件以启动 goose 桌面应用。

          :::tip 更新 goose
          最好定期[更新 goose](/docs/guides/updating-goose)。
          :::
        </div>
      </TabItem>
      <TabItem value="cli" label="goose CLI">
        从[中文社区下载页](https://goose-update.vcorp.ai/)获取 Windows 上的 goose CLI。

        <h3>上游官方安装方式</h3>
        下面的命令安装的是上游项目，不是中文社区构建。

        要在 Windows 上原生安装 goose，需要以下环境之一：
        - **Git Bash**（推荐）：随 [Git for Windows](https://git-scm.com/download/win) 提供
        - **MSYS2**：可从 [msys2.org](https://www.msys2.org/) 获取
        - **PowerShell**：Windows 10/11 默认提供

        **Git Bash / MSYS2：标准方式**

        ```bash
        curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash
        ```

        要在不做交互式配置的情况下安装，请关闭 `CONFIGURE`：

        ```bash
        curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | CONFIGURE=false bash
        ```

        **PowerShell 安装：标准方式**
        把 PowerShell 安装脚本下载到当前目录。

        ```powershell
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/aaif-goose/goose/main/download_cli.ps1" -OutFile "download_cli.ps1";
        ```
        然后运行脚本以安装 goose：
        ```powershell
        .\download_cli.ps1
        ```

        :::info Windows PATH 设置
        如果看到 goose 不在 PATH 中的警告，需要把 goose 加入 PATH：

        <details>
          <summary>对于 Git Bash/MSYS2</summary>
          ```bash
          echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
          source ~/.bashrc
          ```
        </details>

        <details>
          <summary>对于 PowerShell</summary>
          ```powershell
          # Add to your PowerShell profile
          $profilePath = $PROFILE
          if (!(Test-Path $profilePath)) { New-Item -Path $profilePath -ItemType File -Force }
          Add-Content -Path $profilePath -Value '$env:PATH = "$env:USERPROFILE\.local\bin;$env:PATH"'
          # Reload profile or restart PowerShell
          . $PROFILE
          ```
        </details>

        更新 PATH 后，就可以在任意目录运行 `goose` 命令。
        :::

        <details>
        <summary>通过 Windows Subsystem for Linux (WSL) 安装</summary>

          我们建议在 Windows 上原生运行 goose CLI，但如果你更喜欢类 Linux 环境，也可以使用 WSL。

          1. 以管理员身份打开 [PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows)，安装 WSL 和默认的 Ubuntu 发行版：

          ```bash
          wsl --install
          ```

          2. 如果出现提示，重启计算机以完成 WSL 安装。重启后，或如果 WSL 已经安装，运行以下命令启动 Ubuntu shell：

          ```bash
          wsl -d Ubuntu
          ```

          3. 运行 goose 安装脚本：
          ```bash
          curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash
          ```
          :::tip
            如果下载时遇到问题，可能需要安装 `bzip2` 来解压下载的文件：

            ```bash
            sudo apt update && sudo apt install bzip2 -y
            ```
          :::

          如果希望安装时不做交互式配置，请关闭 `CONFIGURE`：

          ```sh
          curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | CONFIGURE=false bash
          ```

          如有需要，把 goose 加入 PATH：

          ```
          echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
          echo 'export OPENAI_API_KEY=your_api_key' >> ~/.bashrc
          source ~/.bashrc
          ```

        </details>
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

## 设置 LLM 提供商
goose 使用[受支持的 LLM 提供商][providers]，由它们提供 goose 理解你的请求所需的 AI 能力。首次使用时，系统会提示你配置偏好的提供商。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    第一次打开 goose 时，在欢迎屏幕上选择如何配置提供商：
    <OnboardingProviderSetup />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    CLI 会自动进入配置模式，你可以选择如何配置提供商：

    - **OpenRouter Login** - 使用 OpenRouter 登录，自动配置模型
    - **Tetrate Agent Router Service Login** - 使用 Tetrate Agent Router Service 登录，自动配置模型
    - **Manual Configuration** - 选择提供商并手动输入凭据

    配置流程示例：

    ```
    ┌   goose-configure
    │
    ◇ How would you like to set up your provider?
    │ Tetrate Agent Router Service Login
    │
    Opening browser for Tetrate Agent Router Service authentication...
    [goose opens the browser and prints details]

    Authentication complete!

    Configuring Tetrate Agent Router Service...
    ✓ Tetrate Agent Router Service configuration complete
    ✓ Models configured successfully

    Testing configuration...
    ✓ Configuration test passed!
    ✓ Developer extension enabled!
    └ Tetrate Agent Router Service setup complete! You can now use goose.
  ```

  :::info Windows 用户
  如果选择手动配置提供商，配置过程中出现提示时，请选择不要存入密钥环。如果设置 API 密钥时遇到密钥环错误，可以改为手动设置环境变量：

  ```bash
  export OPENAI_API_KEY={your_api_key}
  ```

  然后再次运行 `goose configure`。goose 会检测到环境变量并显示：

  ```
  ● OPENAI_API_KEY is set via environment variable
  ```

  要使 API 密钥在会话之间保持，把它们加入 shell 配置文件：
  ```bash
  echo 'export OPENAI_API_KEY=your_api_key' >> ~/.bashrc
  source ~/.bashrc
  ```
  :::
  </TabItem>
</Tabs>

:::tip
<ModelSelectionTip />
:::

:::info 免费额度
第一次通过 goose 自动向 Tetrate 进行身份验证时，你会获得 10 美元免费额度。新用户和现有 Tetrate 用户都可以获得此优惠。
:::

## 更新提供商
你可以随时更改 LLM 提供商和/或模型，或更新 API 密钥。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
    2. 在侧边栏中点击 `Settings` 按钮。
    3. 点击 `Models` 选项卡。
    4. 选择更新提供商、切换模型，或点击 `Reset Provider and Model` 清除设置并返回欢迎屏幕。这些[配置选项](/docs/getting-started/providers#configure-provider-and-model)的细节见相应文档。
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    1. 运行以下命令：
    ```sh
    goose configure
    ```
    2. 从菜单中选择 `Configure Providers`。
    3. 按照提示选择 LLM 提供商，并输入或更新 API 密钥。

    **示例：**

    配置过程中要选择某一项，用上下方向键高亮你的选择，然后按 Enter。

    ```
    ┌   goose-configure
    │
    ◇ What would you like to configure?
    │ Configure Providers
    │
    ◇ Which model provider should we use?
    │ Google Gemini
    │
    ◇ Provider Google Gemini requires GOOGLE_API_KEY, please enter a value
    │▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
    │
    ◇ Enter a model from that provider:
    │ gemini-2.0-flash-exp
    │
    ◇  Hello there! You're all set to use me, so please ask away!
    │
    └  Configuration saved successfully
    ```
  </TabItem>
</Tabs>

<RateLimits />

## 运行 goose

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
        在 goose 桌面版中开始会话很直接。选择提供商后，你会看到准备就绪的会话界面。

        把问题、任务或指令直接输入输入框，goose 会立刻开始工作。
    </TabItem>
    <TabItem value="cli" label="goose CLI">
        在终端中进入你想作为起点的目录，然后运行：
        ```sh
        goose session
        ```
    </TabItem>
</Tabs>

## 共享配置

goose CLI 和桌面 UI 共享所有核心配置，包括 LLM 提供商设置、模型选择和扩展配置。在任一界面安装或配置扩展时，设置会存储在中心位置，桌面应用和 CLI 都可以使用。这样在界面之间切换时仍能保持一致的设置。更多信息见[配置文件][config-files]指南。

:::info
虽然核心配置在界面之间共享，扩展在存储身份验证凭据的方式上有灵活性。有些扩展使用共享配置文件，另一些则实现自己的存储方法。
:::

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
        通过以下方式进入共享配置：
        1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
        2. 在侧边栏中点击 `Settings` 按钮。
    </TabItem>
    <TabItem value="cli" label="goose CLI">
        使用以下命令管理共享配置：
        ```sh
        goose configure
        ```
    </TabItem>
</Tabs>

## 在 CI/CD 中固定 goose 版本
在 CI/CD（以及其他自动化、非交互环境）中，用 `GOOSE_VERSION` 固定特定版本，使安装可复现，并避免在 `stable` 发布标签不包含 goose CLI 二进制资源时下载出现 404。

完整示例和用法见 [CI/CD 环境](/docs/tutorials/cicd)。

## 为 Linux 发行版生成 man 手册页

如果你在为 Linux 发行版打包 goose，或创建自定义构建，可以从 CLI 命令定义生成 Unix man 手册页：

```bash
just generate-manpages
```

这会在 `target/man/` 中创建 ROFF 格式的手册页（例如 `goose.1`、`goose-session.1`），可以安装到 `/usr/share/man/man1/`，以便通过 `man` 命令提供离线文档。

生成手册页需要 goose 源码仓库，面向为 Fedora、Debian 和其他 Linux 发行版准备软件包的发行版打包者。实现细节见 [generate_manpages.rs 源码](https://github.com/aaif-goose/goose/blob/main/crates/goose-cli/src/bin/generate_manpages.rs)。

## 更多资源

你也可以配置扩展来扩展 goose 的功能，包括添加新扩展或打开/关闭它们。详细说明见[使用扩展指南][using-extensions]。

[using-extensions]: /docs/getting-started/using-extensions
[providers]: /docs/getting-started/providers
[handling-rate-limits]: /docs/guides/handling-llm-rate-limits-with-goose
[mcp]: https://www.anthropic.com/news/model-context-protocol
[config-files]: /docs/guides/config-files
