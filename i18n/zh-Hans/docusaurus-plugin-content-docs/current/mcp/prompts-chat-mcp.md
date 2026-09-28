---
title: prompts.chat 扩展
description: 把 prompts.chat MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';

本教程介绍如何把 [prompts.chat MCP 服务器](https://prompts.chat) 添加为 goose 扩展，以便在 AI 助手里直接访问数千条 AI 提示词。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=@fkadev/prompts.chat-mcp@latest&id=prompts-chat-mcp&name=prompts.chat&description=Access%20thousands%20of%20AI%20prompts%20directly%20in%20your%20AI%20assistant&env=PROMPTS_API_KEY%3DAPI%20Key%20to%20save%20and%20list%20private%20prompts)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y @fkadev/prompts.chat-mcp@latest
  ```
  </TabItem>
</Tabs>
  **环境变量（可选）**
  ```
  PROMPTS_API_KEY: <YOUR_API_KEY>
  ```
:::

## 配置

:::info
运行此命令需要系统已安装 [Node.js](https://nodejs.org/)，因为会用到 `npx`。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="prompts-chat-mcp"
    extensionName="prompts.chat"
    description="Access thousands of AI prompts directly in your AI assistant"
    command="npx"
    args={["-y", "@fkadev/prompts.chat-mcp@latest"]}
    envVars={[
      { name: "PROMPTS_API_KEY", label: "API Key to save and list private prompts on prompts.chat (optional)" }
    ]}
    apiKeyLink="https://prompts.chat"
    apiKeyLinkText="prompts.chat API Key"
  />
</TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="prompts.chat"
      description="Access thousands of AI prompts directly in your AI assistant"
      command="npx -y @fkadev/prompts.chat-mcp@latest"
      envVars={[
        { key: "PROMPTS_API_KEY", value: "▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪" }
      ]}
      infoNote={
        <>
          The PROMPTS_API_KEY is optional. If you want to save and list private prompts, obtain your API key from{" "}
          <a href="https://prompts.chat" target="_blank" rel="noopener noreferrer">
            prompts.chat
          </a> and paste it in.
        </>
      }
    />
  </TabItem>
</Tabs>

## 使用示例

prompts.chat 扩展提供一套经过整理的 AI 提示词库，可以在 goose 里直接搜索和使用。需要灵感，或想借用经过验证的提示词模式来完成特定任务时，它很有用。

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

### 搜索提示词

#### goose 提示词

```
搜索和代码审查相关的提示词
```

#### goose 输出

```
我找到了几条和代码审查相关的提示词：

1. **Code Review Assistant**：一条全面的提示词，用于审查代码质量、安全性和最佳实践
2. **Pull Request Reviewer**：帮助分析拉取请求并提出改进建议
3. **Security Code Audit**：专注于找出安全漏洞

需要我取出其中某一条吗？
```

### 使用一条提示词

#### goose 提示词

```
取出 Code Review Assistant 提示词，并用它审查我当前的文件
```

#### goose 输出

```
我已经取出 Code Review Assistant 提示词。接下来按它来分析你的代码……

[正在按提示词准则审查你的代码]

基于该提示词框架的审查结果：

✅ 代码结构与组织
✅ 命名约定
⚠️ 建议为边界情况补充错误处理
⚠️ 公开方法的文档还可以改进

需要我帮你处理其中某些发现吗？
```
