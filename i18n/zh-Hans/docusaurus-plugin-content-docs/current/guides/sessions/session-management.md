---
sidebar_position: 1
title: 会话管理
sidebar_label: 会话管理
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { AppWindow, PanelLeft, FolderDot, Paperclip, Copy, Edit2, Trash2, Download, Upload, ChefHat, History } from 'lucide-react';


会话是你与 goose 之间的一次连续交互，提供提问和提示行动的空间。本指南介绍如何管理会话生命周期。

## 开始会话

:::info 首次设置
在你的第一个会话中，goose 会提示你[设置 LLM（大语言模型）提供商](/docs/getting-started/installation#set-llm-provider)。
:::

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
        打开 goose 时，你会看到已可使用的会话界面。只需在输入框中直接键入&mdash;[或说出](/docs/guides/sessions/in-session-actions#voice-dictation "了解如何启用语音听写")&mdash;你的问题、请求或指令，goose 会立即开始工作。

        要开始新的聊天会话：

        1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
        2. 在侧边栏中点击 `Home` 或 `Chat`
        3. 从聊天框发送你的第一条提示

        goose 桌面版支持在同一窗口中使用多个活动聊天会话。新会话会添加到侧边栏的 `Chat` 部分，因此你可以在最近的 10 个会话之间快速切换。只需点击一个会话即可在该会话中[继续工作](#resume-session)。
        
        要更改工作目录，点击应用底部的 <FolderDot className="inline" size={16} /> 目录切换器。

        :::info 在新窗口中开始会话
        要在新窗口中开始会话，点击左上角的 <AppWindow className="inline" size={16} /> 按钮。发送第一条提示后，新会话会添加到侧边栏的 `Chat` 部分。

        在 macOS 上，你也可以使用 goose 的程序坞图标快速开始会话：
            - **拖放**一个文件夹到 goose 图标上，以在该目录中打开新会话
            - **右键点击** goose 图标并选择 `New Window`，以在你最近的目录中打开新会话
        :::
        
        #### 键盘快捷键
        
        你也可以使用键盘快捷键开始新会话或管理 goose 窗口。
        
        | 操作 | macOS | Windows/Linux |
        |--------|-------|---------------|
        | 使用[快速启动器](#quick-launcher)的新会话 | `Cmd+Option+Shift+G` | `Ctrl+Alt+Shift+G` |
        | 当前目录中的新会话 | `Cmd+N` | `Ctrl+N` |
        | 当前目录中的新会话（同一窗口） | `Cmd+T` | `Ctrl+T` |
        | 不同目录中的新会话 | `Cmd+O` | `Ctrl+O` |
        | 切换侧边栏 | `Cmd+B` | `Ctrl+B` |
        | 打开设置 | `Cmd+,` | `Ctrl+,` |
        | 聚焦 goose 窗口 | `Cmd+Option+G` | `Ctrl+Alt+G` |
        | 保持 goose 窗口始终置顶 | `Cmd+Shift+T` | `Ctrl+Shift+T` |
        
        #### 自定义键盘快捷键
        
        你可以在 **Settings** 菜单中自定义这些键盘快捷键：
        1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
        2. 点击 `Settings`
        3. 点击 `Keyboard` 选项卡
        
        对全局快捷键（聚焦窗口、快速启动器）的更改立即生效。对应用快捷键（新聊天、设置等）的更改需要重启 goose。
        
        #### 快速启动器
        通过在弹出窗口中输入提示来开始新会话：
        1. 按 `Cmd+Option+Shift+G`（macOS）或 `Ctrl+Alt+Shift+G`（Windows/Linux）打开弹出窗口
        2. 输入提示并按 `Enter`

        会话会在新的 goose 窗口中打开到你最近打开的目录。

    </TabItem>
    <TabItem value="cli" label="goose CLI">
        从终端导航到你想开始的目录，并运行 [session](/docs/guides/goose-cli-commands#session-options) 命令：
        ```sh
        goose session 
        ```

    </TabItem>
</Tabs>

## 命名会话
<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
        会话的显示名称会根据初始提示的上下文自动生成。会话名称帮助你识别 goose 会话，以便在活动会话之间切换或[恢复会话](#resume-session)。

        创建后可以编辑会话名称：

        1. 在侧边栏中点击 <History className="inline" size={16} /> `Session History`
        2. 悬停在你想重命名的会话上
        3. 点击会话卡片上出现的 <Edit2 className="inline" size={16} /> 按钮
        4. 在打开的 “Edit Session Description” 对话框中：
           - 输入新的会话描述（最多 200 个字符）
           - 按 `Enter` 保存或按 `Escape` 取消
           - 或点击 `Save` 或 `Cancel` 按钮
        5. 成功的 toast 通知会确认更改

        会话名称出现在侧边栏的 `Chat` 部分、`Window` 菜单，以及程序坞（macOS）或任务栏（Windows）菜单中。

    </TabItem>
    <TabItem value="cli" label="goose CLI">
        goose 会话会根据初始提示的上下文获得自动生成的名称。

        如果你想提供特定的会话名称，可以在开始会话时这样做。例如，要把会话命名为 “react-migration”，运行：

        ```sh
        goose session --name react-migration
        ```

        要重命名已有会话，使用 `session rename` 子命令：

        ```sh
        goose session rename --session-id 20260213_9 --new-name my-new-name
        ```

        如果省略会话 ID，goose 会提示你交互式选择一个会话：

        ```sh
        goose session rename --new-name my-new-name
        ```

        如果你想确认会话名称，运行：

        ```sh
        goose session list -l 1
        ```

        示例结果：
        
        ```text
        Available sessions:
        20260213_9 - react-migration - 2026-02-13 16:20:37 UTC
        ```

        在上面的输出中，`20260213_9` 是会话 ID。会话 ID 使用格式 `YYYYMMDD_<COUNT>`。许多 [goose CLI 命令](/docs/guides/goose-cli-commands)让你用名称（`--name` / `-n`）标识会话，作为 `--session-id` 的替代。
    </TabItem>
</Tabs>

:::tip 禁用 AI 生成的会话命名
使用 [`GOOSE_DISABLE_SESSION_NAMING`](/docs/guides/environment-variables#session-management) 保留默认名称，而不是调用模型来生成一个（在 CI/无界面工作流中有用）。goose 桌面版的默认名称是 “New Chat”，goose CLI 的默认名称是 “CLI Session”。
:::

## 退出会话
请注意，退出时会话会自动保存。
<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
    要退出会话，只需关闭应用。
    </TabItem>    
    <TabItem value="cli" label="goose CLI">
        要退出会话，输入 `exit`。或者，按住 `Ctrl+C` 退出会话。

        你的会话会存储在 goose 的[本地 SQLite 数据库](/docs/guides/logs#session-records)中。
    </TabItem>
</Tabs>

## 搜索会话

搜索让你在会话中查找特定内容，或查找特定会话。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

    你可以使用键盘快捷键和搜索栏按钮在 goose 桌面版中搜索会话。

    | 操作 | macOS | Windows/Linux |
    |--------|-------|---------------|
    | 打开搜索 | `Cmd+F`  | `Ctrl+F`  |
    | 下一个匹配 | `Cmd+G` 或 `↓` | `Ctrl+G` 或 `↓` |
    | 上一个匹配 | `Shift+Cmd+G` 或 `↑` | `Shift+Ctrl+G` 或 `↑` |
    | 用选区查找 | `Cmd+E` | n/a |
    | 切换区分大小写 | `Aa` | `Aa` |
    | 关闭搜索 | `Esc` 或 `X` | `Esc` 或 `X` |

    :::tip 自定义搜索快捷键
    你可以在 **Settings** → **Keyboard** 选项卡中[自定义](#keyboard-shortcuts)查找、查找下一个和查找上一个键盘快捷键。
    :::

    :::info 不支持正则表达式或运算符
    在搜索文本中使用正则表达式或搜索运算符不受支持。
    :::

    支持以下场景：

    #### 在当前会话中搜索
    
    要在当前会话中查找特定内容：

    1. 使用 `Cmd+F` 打开搜索栏
    2. 输入搜索词
    3. 使用快捷键和搜索栏按钮浏览结果

    #### 跨会话搜索
    
    要在所有会话中搜索对话历史：

    1. 在侧边栏中点击 <History className="inline" size={16} /> `Session History`
    2. 使用 `Cmd+F`（或 `Ctrl+F`）打开搜索栏
    3. 输入搜索词
    4. 使用键盘快捷键和搜索栏按钮浏览结果（不支持 `Cmd+E`）

    这会搜索对话中消息的内容。搜索限于跨会话最近的 10 条匹配消息。如果搜索词出现在许多消息中，搜索只会返回一部分会话。

    :::tip 直接问 goose
    你也可以使用内置的 [Chat Recall 扩展](/docs/mcp/chatrecall-mcp)请 goose 搜索你的对话历史：
    - “查找我上周关于 React hooks 的较早对话”
    - “显示我处理数据库迁移的会话”
    :::

  </TabItem>
  <TabItem value="cli" label="goose CLI">

    #### 在当前会话中搜索

    搜索功能由你的终端界面提供。使用适合你环境的快捷键：

    | 终端 | 操作系统 | 快捷键 |
    |----------|-----------------|-----------|
    | iTerm2 | macOS | `Cmd+F` |
    | Terminal.app | macOS | `Cmd+F` |
    | Windows Terminal | Windows | `Ctrl+F` |
    | Linux Terminal | Linux | `Ctrl+F` |

    要在当前会话中查找特定内容：

    1. 使用快捷键打开搜索栏
    2. 输入搜索词
    3. 使用快捷键和搜索栏按钮浏览结果

    :::info
    你的特定终端模拟器可能使用不同的键盘快捷键。查看终端的文档或设置以了解搜索命令。
    :::

    #### 搜索所有会话内容
    
    要在所有会话中搜索对话内容，开始一个 goose 会话并直接询问：

    - “查找我上周关于 React hooks 的较早对话”
    - “显示我处理数据库迁移的会话”

    goose 会搜索你的会话历史，并显示来自匹配会话的相关对话及上下文。
    
    :::info
    此功能需要启用内置的 [Chatrecall 扩展](/docs/mcp/chatrecall-mcp)。
    :::

    #### 直接搜索会话数据
    
    带有受支持选项的 [`session list`](/docs/guides/goose-cli-commands#session-list-options) 子命令对某些搜索操作有用。

    你也可以直接查询 SQLite 数据库：

    ```bash
    # Search session descriptions
    sqlite3 ~/.local/share/goose/sessions/sessions.db \
      "SELECT id, description FROM sessions WHERE description LIKE '%your search term%';"

    # Search by working directory
    sqlite3 ~/.local/share/goose/sessions/sessions.db \
      "SELECT id, description, working_dir FROM sessions WHERE working_dir LIKE '%project-name%';"

    # List recent sessions
    sqlite3 ~/.local/share/goose/sessions/sessions.db \
      "SELECT id, description, created_at FROM sessions ORDER BY created_at DESC LIMIT 10;"
    ```

    :::info 会话存储迁移
    从版本 1.10.0 开始，goose 使用 SQLite 数据库（`sessions.db`）而不是单独的 `.jsonl` 文件。旧的 `.jsonl` 文件仍留在磁盘上，但不再由 goose 管理。
    :::

  </TabItem>
</Tabs>

## 恢复会话

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
    
    你可以在侧边栏中切换活动会话，或从历史中恢复任何会话。
    
    #### 在活动会话之间切换

    goose 桌面版允许你在同一窗口中的多个聊天会话之间切换。你可以在一个会话中开始任务，切换到另一个去做一些工作，并在任务完成时回到第一个会话。

    你最近的会话（最多 10 个）可在侧边栏中快速访问：

    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
    2. 在 `Chat` 部分，点击任何会话以切换到它
    
    视觉指示帮助你跟踪会话状态：
    - **蓝色旋转图标** - 会话正在积极处理请求
    - **绿点** - 你在查看其他会话时，该会话完成了一项任务
    - **红点** - 会话遇到错误

    此外，从配方开始的会话会显示 <ChefHat className="inline" size={16} /> 图标。

    :::tip
    你可以[重命名会话](#name-session)，以便更容易识别特定会话。
    :::

    #### 从会话历史恢复

    要查找并恢复超出最近 10 个的会话：

    1. 在侧边栏中点击 <History className="inline" size={16} /> `Session History`
    2. 找到你想恢复的会话。goose 提供[搜索功能](#search-sessions)帮助你找到会话。
    3. 选择如何恢复：
       - 点击 `Resume` 在当前窗口中继续
       - 点击 `New Window` 在新窗口中打开

    </TabItem>
    <TabItem value="cli" label="goose CLI">
        要恢复最近的会话，可以运行以下命令：

        ```
         goose session -r
        ```

        要恢复特定会话，运行以下命令：

        ```
        goose session -r --name <name>
        ```
        例如，要恢复名为 `react-migration` 的会话，运行：

        ```
        goose session -r --name react-migration
        ```
    </TabItem>
</Tabs>

在 goose 桌面版中创建的会话可以在 CLI 中恢复，反之亦然。所有会话都存储在[同一个数据库](/docs/guides/logs#session-records)中。

:::tip 为新任务创建新会话
虽然你可以恢复会话，但我们建议为新任务创建新会话，以降低[陷入循环或无响应](/docs/troubleshooting/known-issues#stuck-in-a-loop-or-unresponsive)的几率。
:::

## 复制会话

创建任何会话的完整副本，以复用配置、试验变体或保留重要工作。

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
        
        从会话列表复制会话：

        1. 在侧边栏中点击 <History className="inline" size={16} /> `Session History`
        2. 找到你想复制的会话
        3. 悬停在会话卡片上以显示操作按钮
        4. 点击右上角出现的 <Copy className="inline" size={16} /> 按钮

        复制的会话包括：
        - 完整的对话历史
        - 全部会话元数据和设置
        - 提供商和模型配置
        - 扩展数据与配置
        - 配方信息（如适用）

        新会话与原始会话同名，并出现在会话列表顶部。

        :::tip 复制与分叉会话
        - **复制**（会话列表中的 Copy 按钮）：创建整个会话的完整副本。用它保留一个可用的会话或复用其配置。
        - **[分叉会话](/docs/guides/sessions/in-session-actions#fork-session)**（消息上的 Edit 按钮）：创建一个新会话，对话历史截止到某条被编辑的消息。在编辑消息以从该点探索不同方法时使用。
        :::

    </TabItem>
    <TabItem value="cli" label="goose CLI">
        
        使用 `--fork` 标志以及 `--resume`，通过复制先前会话的全部消息来创建新会话。

        ```bash
        # Fork the most recent session
        goose session --resume --fork

        # Fork a specific session by name
        goose session --resume --fork --name my-project

        # Fork a specific session by ID
        goose session --resume --fork --session-id 20251108_3

        # Fork and show message history
        goose session --resume --fork --history
        ```

        分叉的会话包括：
        - 来自原始会话的完整对话历史
        - 全部会话元数据和设置
        - 提供商和模型配置
        - 扩展数据与配置
        - 配方信息（如适用）
    </TabItem>
</Tabs>

## 删除会话

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
        你可以直接从桌面应用删除会话：

        1. 在侧边栏中点击 <History className="inline" size={16} /> `Session History`
        2. 找到你想删除的会话
        3. 悬停在会话卡片上以显示操作按钮
        4. 点击出现的 <Trash2 className="inline" size={16} /> 按钮
        5. 在出现的对话框中确认删除

        :::warning 永久删除
        从 goose 桌面版删除会话也会从 CLI 中删除它。此操作无法撤销。
        :::

        会话会立即从会话历史中移除，底层会话记录会从本地存储中删除。
    </TabItem>
    <TabItem value="cli" label="goose CLI">
        你可以使用 CLI 命令移除会话。关于会话移除的详细说明，见 [CLI 命令文档](/docs/guides/goose-cli-commands#session-remove-options)。
    </TabItem>
</Tabs>

## 导入会话

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
        从 JSON 文件导入完整会话，以恢复、分享或在 goose 实例之间迁移会话。导入会创建一个带有新 ID 的新会话，而不是覆盖现有会话。

        1. 在侧边栏中点击 <History className="inline" size={16} /> `Session History`
        2. 点击右上角的 <Upload className="inline" size={16} /> `Import Session` 按钮
        3. 选择先前从 goose 导出的 `.json` 会话文件
        4. 会话会以新的会话 ID 导入
        5. 成功通知会确认导入

    </TabItem>
    <TabItem value="cli" label="goose CLI">
        会话导入目前只能通过桌面应用使用。
    </TabItem>
</Tabs>

## 导出会话

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>
        把完整会话导出为 JSON 文件，用于备份、分享、迁移或归档。导出的文件保留全部会话数据，包括对话历史、元数据和设置。

        1. 在侧边栏中点击 <History className="inline" size={16} /> `Session History`
        2. 找到你想导出的会话
        3. 悬停在会话卡片上以显示操作按钮
        4. 点击出现的 <Download className="inline" size={16} /> 按钮
        5. 会话会下载为以会话描述命名的 `.json` 文件

    </TabItem>
    <TabItem value="cli" label="goose CLI">
        导出会话用于备份、分享、迁移或文档目的。你可以导出为 JSON 文件以保留完整会话数据，包括对话历史、元数据和设置，或导出为 Markdown 文件以获得格式化、可读的对话版本。

        从终端运行 [`session export`](/docs/guides/goose-cli-commands#session-export-options) 子命令：
        
        ```bash
        goose session export
        ```

    </TabItem>
</Tabs>
