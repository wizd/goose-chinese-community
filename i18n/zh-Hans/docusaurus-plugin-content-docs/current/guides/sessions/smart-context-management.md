---
title: 智能上下文管理
sidebar_position: 3
sidebar_label: 智能上下文管理
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { ScrollText } from 'lucide-react';
import { PanelLeft } from 'lucide-react';

使用[大语言模型（LLM）](/docs/getting-started/providers)时，它们一次能处理的对话历史是有限的。goose 提供智能上下文管理功能，帮助处理上下文和对话限制，以便你维持高效的会话。以下是一些关键概念：

- **上下文长度**：LLM 能考虑的对话历史量，也称为上下文窗口
- **上下文限制**：模型能处理的最大 token 数
- **上下文管理**：goose 如何处理接近这些限制的对话
- **轮次**：goose 与 LLM 之间一次完整的提示-响应交互

## goose 如何管理上下文
goose 使用两层方法管理上下文：

1. **自动压缩**：接近 token 限制时主动压缩对话历史
2. **上下文策略**：自动压缩后仍超出上下文限制时使用的后备策略

这种分层方法让 goose 能优雅地处理 token 和上下文限制。

## 自动压缩
接近 token 限制时，goose 会自动把对话中较旧的部分压缩成摘要，让你无需手动干预即可维持长时间会话。
在 goose 桌面版和 goose CLI 中，默认在达到 token 限制的 80% 时触发自动压缩。

用 `GOOSE_AUTO_COMPACT_THRESHOLD` [环境变量](/docs/guides/environment-variables#session-management)控制自动压缩行为。
把该值设为 `0.0` 可禁用此功能。

```
# Automatically compact sessions when 60% of available tokens are used
export GOOSE_AUTO_COMPACT_THRESHOLD=0.6
```

达到自动压缩阈值时：
  1. goose 会自动开始压缩对话以腾出空间。
  2. 完成后，你会看到确认消息，说明对话已压缩并摘要。
  3. 继续会话。先前的对话仍然可见，但只有压缩后的对话会纳入 goose 的活动上下文。

:::tip 自定义压缩
你可以编辑 `compaction.md` [提示词模板](/docs/guides/context-engineering/prompt-templates)，自定义 goose 在压缩期间如何摘要对话。
:::

:::tip 工具输出摘要
为帮助维持高效的上下文使用，goose 会在后台摘要较旧的工具调用输出，同时完整保留最近的调用。默认情况下，goose 根据模型上下文限制和自动压缩阈值计算截断点。高级调优见 [`GOOSE_TOOL_CALL_CUTOFF`](/docs/guides/environment-variables#session-management)。
:::

### 手动压缩
你也可以在达到上下文或 token 限制之前手动触发压缩：

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

  1. 指向应用底部模型名称旁边的 token 用量指示点
  2. 在出现的上下文窗口中点击 <ScrollText className="inline" size={16} /> `Compact now`
  3. 完成后，你会看到确认消息，说明对话已压缩并摘要。
  4. 继续会话。先前的对话仍然可见，但只有压缩后的对话会纳入 goose 的活动上下文。

  :::info 
  必须在聊天中至少发送一条消息，`Compact now` 按钮才会启用。
  :::

</TabItem>
<TabItem value="cli" label="goose CLI" default>

要在达到上下文限制之前主动压缩对话，使用 `/compact` 命令：

```sh
( O)> /compact
◇  Are you sure you want to compact this conversation? This will condense the message history.
│  Yes 
│
Compacting conversation...
Conversation has been compacted.
Key information has been preserved while reducing context length.
```

`/summarize` 仍可作为 `/compact` 的已弃用别名工作，但在新文档和工作流中应使用 `/compact`。

</TabItem>
</Tabs>

## 上下文限制策略

当自动压缩被禁用，或对话仍超出上下文限制时，goose 提供不同的处理方式：

| 功能 | 说明 | 最适合 | 可用性 | 影响 |
|---------|-------------|-----------|-----------|---------|
| **摘要** | 在保留要点的同时压缩对话 | 长而复杂的对话 | 桌面版和 CLI | 保留大部分上下文 |
| **截断** | 移除最旧的消息以腾出空间 | 简单、线性的对话 | 仅 CLI | 丢失旧上下文 |
| **清除** | 在保持会话活动的同时重新开始 | 对话中的新方向 | 仅 CLI | 丢失全部上下文 |
| **提示** | 请用户从以上选项中选择 | 在交互式会话中控制每次决定 | 仅 CLI | 取决于所做选择 |

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

goose 桌面版专门通过压缩对话来使用摘要管理上下文，在减小体积的同时保留关键信息。

  </TabItem>
  <TabItem value="cli" label="goose CLI">

CLI 支持所有上下文限制策略：`summarize`、`truncate`、`clear` 和 `prompt`。

默认行为取决于你正在运行的模式：
- **交互模式**：提示用户选择（相当于 `prompt`）
- **无界面模式**（`goose run`）：自动摘要（相当于 `summarize`）

你可以通过设置 `GOOSE_CONTEXT_STRATEGY` 环境变量来配置 goose 如何处理上下文限制：

```bash
# Set automatic strategy (choose one)
export GOOSE_CONTEXT_STRATEGY=summarize  # Automatically summarize (recommended)
export GOOSE_CONTEXT_STRATEGY=truncate   # Automatically remove oldest messages
export GOOSE_CONTEXT_STRATEGY=clear      # Automatically clear session

# Set to prompt the user
export GOOSE_CONTEXT_STRATEGY=prompt
```

达到上下文限制时，行为取决于你的配置：

**使用默认设置（未设置 `GOOSE_CONTEXT_STRATEGY`）时**，你会看到此提示以选择管理选项：

```sh
◇  The model's context length is maxed out. You will need to reduce the # msgs. Do you want to?
│  ○ Clear Session   
│  ○ Truncate Message
// highlight-start
│  ● Summarize Session
// highlight-end

final_summary: [A summary of your conversation will appear here]

Context maxed out
--------------------------------------------------
goose summarized messages for you.
```

**配置了 `GOOSE_CONTEXT_STRATEGY` 时**，goose 会自动应用你选择的策略：

```sh
# Example with GOOSE_CONTEXT_STRATEGY=summarize
Context maxed out - automatically summarized messages.
--------------------------------------------------
goose automatically summarized messages for you.

# Example with GOOSE_CONTEXT_STRATEGY=truncate
Context maxed out - automatically truncated messages.
--------------------------------------------------
goose tried its best to truncate messages for you.

# Example with GOOSE_CONTEXT_STRATEGY=clear
Context maxed out - automatically cleared session.
--------------------------------------------------
```
  </TabItem>
</Tabs>

## 最大轮次
`Max Turns` 限制是 goose 在没有用户输入的情况下可以连续进行的最大轮次数（默认：1000）。达到限制时，goose 停止并提示：“I've reached the maximum number of actions I can do without user input. Would you like me to continue?” 如果用户肯定回答，goose 会继续，直到再次达到限制并再次提示。

此功能让你控制代理自主性，并防止无限循环和失控行为，这些行为在生产环境中可能带来显著成本后果或破坏性影响。可用于：

- 防止自动化任务中的无限循环以及过多的 API 调用或资源消耗
- 在自主操作期间启用人工监督或交互
- 在测试和调试代理行为时控制循环

此设置作为 `GOOSE_MAX_TURNS` 环境变量存储在你的 [config.yaml 文件](/docs/guides/config-files)中。你可以使用桌面应用或 CLI 配置它。

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>

      1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
      2. 在侧边栏中点击 `Settings` 按钮
      3. 点击 `Chat` 选项卡
      4. 滚动到 `Conversation Limits`，为 `Max Turns` 输入一个值
        
    </TabItem>
    <TabItem value="cli" label="goose CLI">

      1. 运行 `configuration` 命令：
      ```sh
      goose configure
      ```

      2. 选择 `goose settings`：
      ```sh
      ┌   goose-configure
      │
      ◆  What would you like to configure?
      │  ○ Configure Providers
      │  ○ Add Extension
      │  ○ Toggle Extensions
      │  ○ Remove Extension
      // highlight-start
      │  ● goose settings (Set the goose mode, Tool Output, Tool Permissions, Experiment, goose recipe github repo and more)
      // highlight-end
      └ 
      ```

      3. 选择 `Max Turns`：
      ```sh
      ┌   goose-configure
      │
      ◇  What would you like to configure?
      │  goose settings
      │
      ◆  What setting would you like to configure?
      │  ○ goose mode 
      │  ○ Router Tool Selection Strategy 
      │  ○ Tool Permission 
      │  ○ Tool Output 
      // highlight-start
      │  ● Max Turns (Set maximum number of turns without user input)
      // highlight-end
      │  ○ Toggle Experiment 
      │  ○ goose recipe github repo 
      │  ○ Scheduler Type 
      └ 
      ```

      4. 输入最大轮次数：
      ```sh
      ┌   goose-configure 
      │
      ◇  What would you like to configure?
      │  goose settings 
      │
      ◇  What setting would you like to configure?
      │  Max Turns 
      │
        // highlight-start
      ◆  Set maximum number of agent turns without user input:
      │  10
        // highlight-end
      │
      └  Set maximum turns to 10 - goose will ask for input after 10 consecutive actions
      ```

      :::tip
      除了持久的 `Max Turns` 设置，你还可以通过 `goose session --max-turns` 和 `goose run --max-turns` [CLI 命令](/docs/guides/goose-cli-commands)为特定会话或任务提供运行时覆盖。
      :::

    </TabItem>
    
</Tabs>

**选择合适的值**

合适的最大轮次数取决于你的用例以及对自动化的接受程度：

- **5-10 轮**：适合探索性任务、调试，或你希望频繁确认时。例如，“分析此代码库并提出改进建议”，你希望审查每一步
- **25-50 轮**：适合复杂度适中、定义明确的任务，例如“把此模块重构为使用新 API”或“搭建基本的 CI/CD 流水线”
- **100+ 轮**：更适合复杂的多步自动化，且你信任 goose 独立工作，例如“把整个项目从 React 16 迁移到 React 18”或“为此服务实现全面的测试覆盖”

请记住，即使看起来简单的任务也常常需要多轮。例如，让 goose “修复失败的测试”可能包括分析测试输出（1 轮）、找出根因（1 轮）、修改代码（1 轮）和验证修复（1 轮）。

## Token 用量
发送第一条消息后，goose 桌面版和 goose CLI 会显示 token 用量。

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
    桌面版在会话窗口底部的模型名称旁边显示一个彩色圆点。颜色直观表示该会话的 token 用量。
      - **绿色**：正常用量 - 仍有充足的上下文空间
      - **橙色**：警告状态 - 接近限制（容量的 80%）
      - **红色**：错误状态 - 已达到上下文限制
    
    悬停在此圆点上可显示：
      - 已使用的 token 数
      - 已使用的可用 token 百分比
      - 可用 token 总数
      - 显示当前 token 用量的进度条
        
    </TabItem>
    <TabItem value="cli" label="goose CLI">
    CLI 在每个命令提示上方显示上下文标签，展示：
      - 用圆点（●○）和颜色表示 token 用量的视觉指示：
        - **绿色**：用量低于 50%
        - **黄色**：用量在 50-85% 之间
        - **红色**：用量高于 85%
      - 用量百分比
      - 当前 token 数和上下文限制

    </TabItem>
</Tabs>

## 模型上下文限制覆盖

上下文限制会根据模型名称自动检测，但 goose 提供设置来覆盖默认限制：

| 模型 | 说明 | 最适合 | 设置 |
|-------|-------------|----------|---------|
| **主模型** | 为主模型设置上下文限制（也作为其他模型的后备） | LiteLLM 代理、名称不标准的自定义模型 | `GOOSE_CONTEXT_LIMIT` |

:::info
此设置只影响显示的 token 用量和进度指示。实际上下文管理由你的 LLM 处理，因此无论显示什么，你实际体验到的用量都可能多于或少于所设限制。
:::

此功能在以下情况特别有用：

- **LiteLLM 代理模型**：使用 LiteLLM 且自定义模型名称与 goose 的模式不匹配时
- **企业部署**：命名不标准的自定义模型部署
- **微调模型**：上下文限制与其基础版本不同的自定义模型
- **开发/测试**：为测试目的临时调整上下文限制

goose 按以下优先级解析上下文限制（从高到低）：

1. 全局环境变量（`GOOSE_CONTEXT_LIMIT`）
2. 显式的声明式或自定义提供商模型配置
3. 提供商运行时发现
4. 规范模型元数据
5. 全局默认值（128,000 tokens）

**配置**

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

     goose 桌面应用中尚不提供模型上下文限制覆盖。

  </TabItem>
  <TabItem value="cli" label="goose CLI">

    上下文限制覆盖只能作为[环境变量](/docs/guides/environment-variables#model-context-limit-overrides)使用，不能写在配置文件中。

    ```bash
    export GOOSE_CONTEXT_LIMIT=1000
    goose session
    ```

  </TabItem>
    
</Tabs>

**场景**

1. 使用自定义模型名称的 LiteLLM 代理

```bash
# LiteLLM proxy with custom model name
export GOOSE_PROVIDER="openai"
export GOOSE_MODEL="my-custom-gpt4-proxy"
export GOOSE_CONTEXT_LIMIT=200000  # Override the 32k default
```

## 额度余额监控

goose 会监控你的 API 提供商余额，并在额度即将用尽或已耗尽时警告你。发生这种情况时，你会看到 **Insufficient Credits** 通知。

对于支持它的提供商（例如 [Tetrate Agent Router Service](https://router.tetrate.ai)），通知包含一个 **Add credits** 按钮，可直接带你前往提供商的账单页面。

**该怎么做：**
1. 点击 **Add credits** 按钮（如果可用）为账户充值
2. 或手动访问提供商的仪表板添加额度
3. 添加额度后，重新发送消息以继续对话

:::tip
goose 会自动检测低余额状况，因此你不会丢失对话上下文——只需添加额度并从中断处继续。
:::

**支持的提供商：** Tetrate Agent Router Service、OpenRouter，以及其他通过 HTTP 402 响应报告余额信息的提供商。

## 成本跟踪
显示会话的实时估算成本。

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
要管理实时成本跟踪：
  1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
  2. 在侧边栏中点击 `Settings` 按钮
  3. 点击 `App` 选项卡
  4. 打开或关闭 `Cost Tracking`

会话成本显示在 goose 窗口底部，并随 token 消耗动态更新。悬停在成本上可查看 token 用量的详细分解。如果会话中使用了多个模型，这包括按模型的成本分解。Ollama 和本地部署始终显示 $0.00 的成本。

定价数据会定期从 OpenRouter API 获取并在本地缓存。`Advanced settings` 选项卡显示数据上次更新的时间，并允许你刷新。

这些成本只是公开价格估算，不是发票，也不能代表你实际的提供商账单。显示的金额根据 token 计数和公开目录费率近似用量；当提供商报告了成本时，以提供商报告的成本为准。
</TabItem>
    <TabItem value="cli" label="goose CLI">
    通过设置 `GOOSE_CLI_SHOW_COST` [环境变量](/docs/guides/environment-variables#session-management)，或把它写入[配置文件](/docs/guides/config-files)，在 goose CLI 中显示估算成本。

  ```
  # Set environment variable
  export GOOSE_CLI_SHOW_COST=true

  # config.yaml
  GOOSE_CLI_SHOW_COST: true
  ```
  </TabItem>
</Tabs>
