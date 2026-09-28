---
title: Linux MCP Server 扩展
description: 将 Linux MCP Server 添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import GooseBuiltinInstaller from '@site/src/components/GooseBuiltinInstaller';

本教程介绍如何将 [Linux MCP Server](https://github.com/rhel-lightspeed/linux-mcp-server) 添加为 goose 扩展，让 AI 助手能够在 Linux 系统上运行、发现并排查复杂问题。

:::tip TLDR
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [安装 Linux MCP Server](https://rhel-lightspeed.github.io/linux-mcp-server/install/)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  # Using uv (recommended)
  uvx linux-mcp-server
  ```
  </TabItem>
</Tabs>
:::

## 配置

:::info
运行此命令需要在系统上安装 [uv](https://docs.astral.sh/uv/#installation)，因为它使用 *uvx*。
:::


<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

    <GooseDesktopInstaller
      extensionId="linux-mcp-server"
      extensionName="Linux MCP server"
      description="用于 Linux 系统发现与故障排查的工具"
      type="stdio"
      command="uvx"
      args={["linux-mcp-server"]}
    />

 
  </TabItem>
  <TabItem value="cli" label="goose CLI">

    <CLIExtensionInstructions
      name="Linux MCP Server"
      description="用于 Linux 系统发现与故障排查的工具"
      type="stdio"
      command="uvx linux-mcp-server"
      timeout={300}
    />
    
  </TabItem>
</Tabs>

## 使用示例

按照说明，使用 Linux MCP Server 进行系统诊断和故障排查。

### goose 提示词

> _我的 Wi-Fi 连接不太稳定。请在系统日志中找出错误信息，诊断问题并帮我修复。_


### goose 输出

:::note 桌面版

🤖 LLM 输出 🤖
我来帮你诊断 Wi-Fi 连接问题。我会查看与网络接口和无线连接相关的系统日志错误信息。先收集系统信息，并检查相关日志。

:::
