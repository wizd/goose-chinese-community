---
title: Exa Search 扩展
description: 将 Exa MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

本教程介绍如何将 [Exa MCP 服务器](https://github.com/exa-labs/exa-mcp-server) 添加为 goose 扩展，以启用 AI 驱动的网页搜索。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=exa-mcp-server&id=exa&name=Exa%20Search&description=AI-powered%20web%20search&env=EXA_API_KEY%3DExa%20API%20Key)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y exa-mcp-server
  ```
  </TabItem>
</Tabs>
  **环境变量**
  ```
  EXA_API_KEY: <YOUR_API_KEY>
  ```
:::

## 配置

:::info
运行此命令需要在系统上安装 [Node.js](https://nodejs.org/)，因为它使用 `npx`。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="exa"
    extensionName="Exa Search"
    description="AI 驱动的网页搜索"
    command="npx"
    args={["-y", "exa-mcp-server"]}
    envVars={[
      { name: "EXA_API_KEY", label: "Exa API Key" }
    ]}
    apiKeyLink="https://dashboard.exa.ai/api-keys"
    apiKeyLinkText="Exa API Key"
  />
</TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Exa Search"
      description="AI 驱动的网页搜索"
      command="npx -y exa-mcp-server"
      envVars={[
        { key: "EXA_API_KEY", value: "▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪" }
      ]}
      infoNote={
        <>
          获取你的 <a href="https://dashboard.exa.ai/api-keys" target="_blank" rel="noopener noreferrer">Exa API Key</a> 并粘贴到此处。你可以在 <a href="https://exa.ai" target="_blank" rel="noopener noreferrer">exa.ai</a> 注册，然后在控制台的 API keys 页面获取 API 密钥。
        </>
      }
    />
  </TabItem>
</Tabs>

## 使用示例

Exa MCP 服务器让 goose 的交互具备 AI 驱动的网页搜索能力。Exa 提供的高级搜索能力包括：

1. 神经搜索、关键词搜索和自动搜索模式
2. 以全文、高亮或摘要形式检索内容
3. 按类别筛选（新闻、论文、公司等）
4. 按域名和日期范围筛选

### goose 提示词

```
查找关于大语言模型推理能力的近期研究论文，并总结主要发现。
```

### goose 输出

```
我将使用 Exa 搜索关于 LLM 推理的近期研究论文。

─── web_search_exa | exa ──────────────────────────
query: large language model reasoning capabilities research paper
category: research paper


以下是近期 LLM 推理研究的主要发现：

1. 思维链推理：
- 近期论文表明，显式的思维链提示能显著提升多步推理任务的表现
- 用推理轨迹训练的模型，对新型问题的泛化更好

2. 数学与逻辑推理：
- 新基准显示，LLM 在算术和形式逻辑上有所进步，但在组合推理上仍然困难
- 将神经方法与符号求解器结合的混合方法显示出前景

3. 常识推理：
- 研究表明，扩大模型规模仍能持续提升常识推理基准
- 但在需要物理直觉或日常事件时间推理的任务上，模型仍然会失败

4. 局限与未来方向：
- 多篇论文指出存在“推理捷径”：模型利用数据集模式，而不是进行真正的推断
- 检索增强推理的研究显示，有可能把模型输出锚定在已核实的事实上

需要我针对其中某个主题搜索更多细节吗？
```

:::tip
Exa 支持多种搜索类型，包括面向语义查询的神经搜索，以及智能组合多种策略的自动模式。你还可以按类别、域名和日期范围筛选结果，让检索更有针对性。
:::
