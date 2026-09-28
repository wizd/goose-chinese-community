---
sidebar_position: 2
title: 会话内操作
sidebar_label: 会话内操作
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PanelLeft, Paperclip, Edit2, Send, GripVertical, X, ChevronUp, ChevronDown, FolderDot, Puzzle, Bot, Tornado } from 'lucide-react';

goose 提供可在会话期间用来管理对话和分享信息的功能。

## 编辑消息

编辑你先前发送的消息，以打磨对话、纠正方向或尝试不同方法。

**示例消息流：**

你原来的对话有五条消息。编辑消息 3 之后，消息 4 和 5 的全部消息与响应上下文都会被删除。

```
┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐
│  1  │ → │  2  │ → │  3  │ → │  4  │ → │  5  │
└─────┘   └─────┘   └─────┘   └─────┘   └─────┘
           
                   Edit here
                       ↓
┌─────┐   ┌─────┐   ┌─────┐    continue from here in
│  1  │ → │  2  │ → │  3  │ →  current session, or
└─────┘   └─────┘   └─────┘    copy to new session
```

你可以选择在当前会话中继续工作，或在新会话中创建分叉：

- [原地编辑](#edit-in-place)会更新当前会话，并删除被编辑消息之后的全部消息与响应上下文。这让你从某个点重新开始对话。
- [分叉会话](#fork-session)会创建一个新会话，包含被编辑消息之前及该消息本身的全部对话历史。这让你在保留原始对话的同时探索不同方法。

### 原地编辑

原地编辑通过覆盖被编辑消息之后的全部上下文，让你完全控制对话历史。你的更改可以简单到修正上一条消息中的路径，也可以从某个点完全重新开始。

原地编辑在以下情况有用：

- 你发现发送的提示词不清楚或不完整
- goose 误解了你的意图，走向了错误方向

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>

        1. 悬停在你先前的任何消息上
        2. 点击出现的 <Edit2 className="inline" size={16} /> `Edit` 按钮
        3. 在内联编辑器中进行更改
        4. 点击 `Edit in Place` 保存更改并重新提示 goose

        goose 会移除被编辑消息之后的全部对话历史，并从该点根据上下文做出响应。

        :::warning 已删除的上下文
        使用原地编辑时，后续对话历史会从会话中永久删除，并从 goose 的上下文中移除。仅在你不需要 goose 记住被编辑消息之后的上下文时使用此选项。
        :::

    </TabItem>
    <TabItem value="cli" label="goose CLI">
        对 `goose session` 使用 `--edit` 标志，在编辑器中以 YAML 打开会话对话：

        ```bash
        goose session --resume <session-id> --edit
        ```

        这会用 `$VISUAL` / `$EDITOR` / `vi` 打开序列化为 YAML 的对话。编辑并保存后，goose 从编辑后的对话继续会话。你留在 YAML 中的任何后续消息仍保留在会话和 goose 的上下文中；如果你希望 goose 忘记它们，请从 YAML 中移除这些消息。

    </TabItem>
</Tabs>

### 分叉会话

分叉会话会用你编辑后的消息创建一个新会话，同时保留原始对话。你可以试验变体并比较结果，同时把原始会话作为参考点。

分叉会话有助于：
- 并排比较同一问题的不同方法
- 测试不同提示词如何影响 goose 的响应

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
        1. 悬停在你先前的任何消息上
        2. 点击出现的 <Edit2 className="inline" size={16} /> `Edit` 按钮
        3. 在内联编辑器中进行更改
        4. 点击 `Fork Session` 保存更改并开始新会话（或使用 `Cmd+Enter`（macOS）或 `Ctrl+Enter`（Windows/Linux））

        goose 会创建一个新会话，其对话历史截止到并包括你编辑后的消息。新会话名为 “(edited)”，原始会话保持不变。

        :::tip 分叉与复制
        - **分叉会话**（消息上的 Edit 按钮）：创建一个新会话，历史截止到某条被编辑的消息。用它从对话中的某个点探索不同方法。
        - **[复制会话](/docs/guides/sessions/session-management#duplicate-sessions)**（会话列表中的 Copy 按钮）：创建整个会话的完整副本。用它保留一个可用的会话或复用其配置。
        :::
</TabItem>
    <TabItem value="cli" label="goose CLI">
        同时使用 `--edit` 和 `--fork` 标志来编辑会话对话，并从结果创建新会话：

        ```bash
        goose session --resume <session-id> --fork --edit
        ```

        这会用 `$VISUAL` / `$EDITOR` / `vi` 打开序列化为 YAML 的对话。编辑并保存后，goose 用编辑后的对话创建一个新会话并从那里恢复。原始会话保持不变。

        你也可以在不使用 `--edit` 的情况下用 `--fork` [复制整个会话](/docs/guides/sessions/session-management#duplicate-sessions)。
    </TabItem>
</Tabs>

### 编辑场景提示

- **迭代打磨提示词**：从基本提示词开始，然后根据 goose 的响应进行编辑和打磨。这通常比一开始就试图写出完美提示词效果更好。
- **何时编辑与何时中断**：当对话偏离轨道时，编辑较早的消息可能比用新消息或[中断](#interrupt-task)来纠正方向更有效。编辑消息会改写历史。中断只影响从当前消息往后的对话。
- **保留进展**：当你已经取得良好进展但想尝试不同方法时，使用分叉会话。这样如果新方向行不通，你始终可以回到原始会话。

## 排队消息

在 goose 处理任务时把消息排队，以管理你的工作流。这在以下情况有用：

- 你想在 goose 工作时准备下一步
- 你有一系列相关任务要完成
- 你正在使用[语音听写](#voice-dictation)，需要快速捕捉想法

:::tip
当复杂任务被拆成子任务时，goose 可能表现更好，这种技术称为[*提示词链*](https://www.promptingguide.ai/techniques/prompt_chaining)。这种结构化方法既能提高准确性，也能让你对过程有更多控制。
:::

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
      把消息加入队列：
      1. 在 goose 处理响应时，输入你的下一条消息
      2. 按 `Enter` 把它加入队列（如果使用[中断关键词](#interrupt-task)则会中断）
      
      排队的消息显示为带编号的卡片，表示队列顺序。goose 每完成一次响应，队列中的第一条消息会自动发送。
      
      :::info 相关功能
      - 一般来说，在 goose 处理任务时按 `Enter` 会把消息排队，但点击 `Send` 会立即发送任务并[中断任务](#interrupt-task)
      - 当你在排队消息中输入常见中断关键词，如 “stop”、“wait” 或 “hold on” 时，goose 会暂停，直到你输入或发送下一条消息，然后继续处理队列
      :::

      #### 队列管理控件
    
      排队的消息会在 goose 完成每个任务时按顺序自动运行，但你可以管理队列：
      - **编辑消息**：点击消息文本以显示编辑控件，然后输入更改并点击 `Save`
      - **重新排序消息**：悬停在消息卡片上以显示 <GripVertical className="inline" size={16} /> 按钮，然后抓住它并上下拖动消息
      - **发送消息**：点击 <Send className="inline" size={16} /> 按钮立即发送消息并中断当前任务
      - **删除消息**：点击 <X className="inline" size={16} /> 按钮删除消息
      - **清空队列**：在 **Message Queue** 卡片上点击 `Clear All`
      - **折叠或展开队列**：在 **Message Queue** 卡片上点击 <ChevronUp className="inline" size={16} /> 或 <ChevronDown className="inline" size={16} /> 按钮

      #### 示例消息流

      **不排队：**

      你发送：“能否重构我们的认证代码以支持 OAuth 2.0 并添加适当的错误处理？同时为 OAuth 流程包含单元测试，更新 API 文档以反映这些更改，并创建迁移脚本帮助现有用户过渡到新系统。”

      这种方法可能导致回应过于庞杂，重要细节被遗漏，或任务被表面化处理。即使发送一条带有清晰顺序步骤的提示词，也无法让 goose 分别聚焦每个任务或逐步建立上下文。

      **排队时：**

      1. 你发送：“重构认证代码以支持 OAuth 2.0”
      2. 在 goose 工作时，你把以下消息排队：
         - “并添加适当的错误处理”
         - “为 OAuth 流程添加单元测试”
         - “更新 API 文档”
         - “为现有用户创建迁移脚本”
      
      每个任务都建立在前一个之上。

    </TabItem>
    <TabItem value="cli" label="goose CLI">
        goose CLI 中不提供消息排队。
    </TabItem>
</Tabs>

## 中断任务

在 goose 处理任务时中断它，以接管对话。这在以下情况有用：

- goose 正在走向错误方向
- 你发现需要补充重要上下文
- 你想切换到完全不同的任务

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
        
        有两种方式中断任务：

        #### 发送中断关键词
        1. 输入包含常见中断关键词的提示，如 `stop`、`wait`、`hold on`、`actually` 或 `instead`。单独使用关键词或放在句子开头，检测最可靠。
        2. 点击 `Send`
        
        goose 停止处理当前任务并询问更多信息。
        
        #### 立即重定向
        1. 输入带有更多上下文和澄清、或改变方向的提示。例如：
           - “我忘了说这是给移动应用的”
           - “让我们聚焦 React 而不是 TypeScript”
        2. 点击 `Send`
        
        goose 停止处理当前任务，并转向新的请求上下文。
        
        :::info 相关功能
        - 在 goose 处理任务时点击 `Send` 会中断任务，但按 `Enter` 会[把消息排队](#queue-messages)
        - 在排队消息中输入停止或暂停关键词也会让 goose 停止处理当前任务
        - 你也可以[编辑已发送的消息](#edit-message)，在会话期间提供更多上下文和澄清或改变方向
        :::

        <details>
          <summary>中断关键词列表</summary>

          **高优先级关键词**（在任何上下文中中断）：
          ```
          stop, halt, cease, quit, end, abort, cancel, wait, hold, pause, hold on, wait up, hold up
          ```

          **中优先级关键词**（仅在精确匹配或位于句子开头时中断）：
          ```
          no, nope, nah, wrong, incorrect, not right, actually, instead, rather, better idea, change of plans, nevermind, never mind, forget it, ignore that, disregard
          ```

          **检测规则**：
          - **精确匹配**（100% 置信度）：词/短语完全匹配，始终中断
          - **句子开头**（非常高的置信度）：词/短语位于消息开头，始终中断
          - **仅短消息**（高置信度）：在 ≤20 个字符的消息中，只有高优先级关键词会中断
          - **不区分大小写**：所有检测都不区分大小写

          **示例**：
          - ✅ “stop” 会中断（精确匹配）
          - ✅ “Wait, I meant something else” 会中断（句子开头）
          - ✅ “no” 会中断（短消息，高优先级）
          - ❌ 短消息中的 “actually” 不会中断（短消息中的中优先级）
          - ✅ “Actually, let's try React instead” 会中断（句子开头）

        </details>

    </TabItem>
    <TabItem value="cli" label="goose CLI">
        1. 按 `Ctrl+C` 中断当前任务
        2. 输入提供更多上下文或改变方向的提示
        3. 按 `Enter`

        goose 会根据你的新请求做出上下文相关的响应。
        
    </TabItem>
</Tabs>

## 语音听写
直接对 goose 说话，而不是输入提示词。

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
    要启用语音听写：
        1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
        2. 在侧边栏中点击 `Settings`
        3. 点击 `Chat` 选项卡
        4. 对于 `Voice Dictation Provider`，从下拉菜单中选择你的提供商：
           - Local — 使用本地 whisper 模型在设备上转录，不需要 API 密钥。首次使用时，系统会提示你下载模型。
           - [Elevenlabs](https://elevenlabs.io/)
           - [Groq](https://groq.com/)
           - [OpenAI](https://platform.openai.com/api-keys)
        5. 如果出现提示，输入你所选提供商的 API 密钥

    要使用语音听写：
        1. 在侧边栏的 `Chat` 下点击你的聊天会话
        2. 点击聊天框右侧的麦克风按钮并开始说话
        3. 要发送消息，执行以下操作之一：
           - 说 “submit” 以发送消息并继续录制下一条。要停止录制，点击麦克风按钮。
           - 点击麦克风按钮停止录制，然后点击 `Send` 或按 `Enter`。此选项允许你在发送前编辑消息。
        
        首次使用语音听写时，goose 会请求访问你的麦克风。录制时，你会看到 `Listening` 和 `Transcribing` 状态指示。goose 会在自然停顿期间转录你的语音，并把文本添加到聊天框。

        **如果你看不到麦克风**，检查[你已配置的模型](/docs/getting-started/providers)。例如，使用 OpenAI 作为语音听写提供商时，即使聊天使用另一个 LLM 提供商，也需要在 goose 中配置 OpenAI 模型。

       #### 重要说明
        * 你最多可以录制 50MB 音频
        * ElevenLabs、Groq 和 OpenAI 会把录音发送到它们的服务器进行处理。本地提供商完全在你的设备上处理音频——没有数据离开你的计算机。
        * 语音输入会附加到文本输入框中已有的任何文本之后
        * 转录后录音不会在本地存储
        * 要禁用语音听写，从提供商下拉菜单中选择 `Disabled`

  </TabItem>
    <TabItem value="cli" label="goose CLI">
        goose CLI 中不提供语音听写。
    </TabItem>
</Tabs>

## 拼写检查

goose 桌面版聊天输入框默认启用拼写检查。

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
    要禁用或重新启用拼写检查：
        1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
        2. 在侧边栏中点击 `Settings`
        3. 点击 `Chat`
        4. 向下滚动到 `Enable Spellcheck` 并打开或关闭它
        5. 重启 goose 以使更改生效
        
    </TabItem>
    <TabItem value="cli" label="goose CLI">
        goose CLI 中不提供拼写检查。
    </TabItem>
</Tabs>

## 在会话中分享文件

向 goose 提供来自代码库、文档和其他文件的上下文，以获得更相关、更准确的帮助。

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
        可以用几种方式与 goose 分享文件：

        1. **拖放**：只需从计算机的文件资源管理器/访达中拖动文件，并放到聊天窗口的任意位置。文件路径会自动添加到你的消息中。

        2. **文件浏览器**：点击应用底部的 <Paperclip className="inline" size={16} /> 按钮，打开系统文件浏览器并选择文件

        3. **手动路径**：直接在聊天输入中键入或粘贴文件路径

        4. **快速文件搜索**：使用 [`@` 快捷键](/docs/guides/file-management#quick-file-search-in-goose-desktop)快速查找并包含文件
    </TabItem>
    <TabItem value="cli" label="goose CLI">
        你可以在消息中直接用路径引用文件。由于你已经在终端中，可以使用标准 shell 命令帮助处理文件路径：

        ```bash
        # Reference a specific file
        What does this code do? ./src/main.rs

        # Use tab completion
        Can you explain the function in ./src/lib<tab>

        # Use shell expansion
        Review these test files: ./tests/*.rs
        ```
    </TabItem>
</Tabs>

## 会话中途更改

你可以在会话期间更改某些设置，它们会立即生效，而不需要你开始新会话。这让你在与 goose 交互时对上下文和能力有更多控制。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

  使用应用底部的工具栏在会话中途更改受支持的设置：

  | 设置 | 工具栏项 | 持久性* |
  |---------|--------------|-------------|
  | **工作目录** | <FolderDot className="inline" size={16} /> 目录切换器 | 新会话（重启后） |
  | [**已启用的扩展**](/docs/getting-started/using-extensions#change-extensions-mid-session) | <Puzzle className="inline" size={16} /> 图标 | 仅当前会话 |
  | [**模型**](/docs/getting-started/providers#configure-provider-and-model) | <Bot className="inline" size={16} /> 模型切换器 | 新会话 |
  | [**goose 模式**](/docs/guides/managing-tools/goose-permissions#configuring-goose-mode) | <Tornado className="inline" size={16} /> 模式切换器 | 新会话 |

  </TabItem>
  <TabItem value="cli" label="goose CLI">

  使用斜杠命令在会话中途更改受支持的设置：

  | 设置 | 斜杠命令 | 持久性* |
  |---------|--------------|-------------|
  | [**已启用的扩展**](/docs/getting-started/using-extensions#change-extensions-mid-session) | `/extension` 或 `/builtin` | 仅当前会话 |
  | [**goose 模式**](/docs/guides/managing-tools/goose-permissions#configuring-goose-mode) | `/mode [options]` | 新会话 |

  :::info
  CLI 支持[更多斜杠命令](/docs/guides/goose-cli-commands#slash-commands)，但不支持在会话中途更改工作目录或模型。
  :::

  </TabItem>
</Tabs>

*持久性表示更改是仅适用于当前会话，还是也会带到新会话
