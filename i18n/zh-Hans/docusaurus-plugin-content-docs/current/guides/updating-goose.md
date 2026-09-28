---
sidebar_position: 6
title: 更新 goose
sidebar_label: 更新 goose
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { DesktopAutoUpdateSteps } from '@site/src/components/DesktopAutoUpdateSteps';
import MacDesktopInstallButtons from '@site/src/components/MacDesktopInstallButtons';
import WindowsDesktopInstallButtons from '@site/src/components/WindowsDesktopInstallButtons';
import LinuxDesktopInstallButtons from '@site/src/components/LinuxDesktopInstallButtons';

goose CLI 和桌面应用正在持续活跃开发中。要获得最新功能和修复，应按照以下说明定期更新 goose 客户端。

<Tabs>
  <TabItem value="mac" label="macOS" default>
    <Tabs groupId="interface">
      <TabItem value="ui" label="goose Desktop" default>
        把 goose 更新到最新稳定版。

        <DesktopAutoUpdateSteps />
        
        **手动下载并安装更新：**
        1. <MacDesktopInstallButtons/>
        2. 解压下载的 zip 文件
        3. 把解压出的 `Goose.app` 拖到 `Applications` 文件夹，覆盖当前版本
        4. 启动 goose 桌面版

      </TabItem>
      <TabItem value="cli" label="goose CLI">
        可以运行以下命令更新 goose：

        ```sh
        goose update
        ```

        其他[选项](/docs/guides/goose-cli-commands#update-options)：
        
        ```sh
        # Update to latest canary (development) version
        goose update --canary

        # Update and reconfigure settings
        goose update --reconfigure
        ```

        也可以再次运行[安装](/docs/getting-started/installation)脚本：

        ```sh
        curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | CONFIGURE=false bash
        ```

        用以下命令查看当前 goose 版本：

        ```sh
        goose --version
        ```
      </TabItem>
    </Tabs>
  </TabItem>

  <TabItem value="linux" label="Linux">
    <Tabs groupId="interface">
      <TabItem value="ui" label="goose Desktop" default>
        把 goose 更新到最新稳定版。

        <DesktopAutoUpdateSteps />
        
        **手动下载并安装更新：**
        1. <LinuxDesktopInstallButtons/>

        #### 对于基于 Debian/Ubuntu 的发行版
        2. 在终端中进入已下载的 DEB 文件所在目录
        3. 运行 `sudo dpkg -i (filename).deb`
        4. 从应用菜单启动 goose
      </TabItem>
      <TabItem value="cli" label="goose CLI">
        可以运行以下命令更新 goose：

        ```sh
        goose update
        ```

        其他[选项](/docs/guides/goose-cli-commands#update-options)：
        
        ```sh
        # Update to latest canary (development) version
        goose update --canary

        # Update and reconfigure settings
        goose update --reconfigure
        ```

        也可以再次运行[安装](/docs/getting-started/installation)脚本：

        ```sh
        curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | CONFIGURE=false bash
        ```

        用以下命令查看当前 goose 版本：

        ```sh
        goose --version
        ```
      </TabItem>
    </Tabs>
  </TabItem>

  <TabItem value="windows" label="Windows">
    <Tabs groupId="interface">
      <TabItem value="ui" label="goose Desktop" default>
        把 goose 更新到最新稳定版。

        <DesktopAutoUpdateSteps />
        
        **手动下载并安装更新：**
        1. <WindowsDesktopInstallButtons/>
        2. 解压下载的 zip 文件
        3. 运行可执行文件以启动 goose 桌面应用
      </TabItem>
      <TabItem value="cli" label="goose CLI">
        可以运行以下命令更新 goose：

        ```sh
        goose update
        ```

        其他[选项](/docs/guides/goose-cli-commands#update-options)：
        
        ```sh
        # Update to latest canary (development) version
        goose update --canary

        # Update and reconfigure settings
        goose update --reconfigure
        ```

        也可以在 **Git Bash**、**MSYS2** 或 **PowerShell** 中再次运行[安装](/docs/getting-started/installation)脚本，在 Windows 上原生更新 goose CLI：

        ```bash
        curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | CONFIGURE=false bash
        ```
        
        用以下命令查看当前 goose 版本：

        ```sh
        goose --version
        ```        

        <details>
        <summary>通过 Windows Subsystem for Linux (WSL) 更新</summary>

        要更新 WSL 安装，使用 `goose update`，或通过 WSL 再次运行安装脚本：

        ```sh
        curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | CONFIGURE=false bash
        ```

       </details>
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

:::info 在 CI/CD 中更新
如果在 CI 或其他非交互环境中运行 goose，用 `GOOSE_VERSION` 固定特定版本，以便安装可复现。完整示例和用法见 [CI/CD 环境](/docs/tutorials/cicd)。
:::
