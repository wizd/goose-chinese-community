---
title: goose 速查提示
sidebar_position: 30
sidebar_label: 速查提示
description: 使用 goose 的最佳实践
---

### goose 替你干活
goose 是 AI 代理，你可以让它代为完成任务，例如打开应用、运行 shell 命令、自动化工作流、编写代码、浏览网页等。

### 用自然语言给 goose 下指令
不必使用花哨措辞或特殊语法。像跟朋友说话一样和 goose 交谈即可。俚语、请和谢谢都可以，goose 能理解。

### 把 goose 的能力扩展到任意应用
goose 的能力可以扩展。作为 [MCP](https://modelcontextprotocol.io/) 客户端，goose 能通过[扩展](/extensions)连接你的应用和服务，从而贯穿整个工作流。

### 选择 goose 拥有多少控制权
你可以自定义 goose 需要多少[监督](/docs/guides/managing-tools/goose-permissions)。可选完全自主、行动前需要批准，或只聊天、不执行任何操作。

### 选对 LLM
goose 的体验取决于你[选择的 LLM](/blog/2025/03/31/goose-benchmark)：模型负责规划，goose 负责执行。选择 LLM 时，请考虑工具支持、具体能力和相关成本。

### 保持会话简短
LLM 有上下文窗口，也就是能保留的对话历史上限。超出之后，它们可能会忘掉对话前面的内容。留意 token 用量，并在需要时[开始新会话](/docs/guides/sessions/session-management)。

### 用快速启动器更快开始会话
按 `Cmd+Option+Shift+G`（macOS）或 `Ctrl+Alt+Shift+G`（Windows/Linux），发送一条提示即可立刻开始新会话。

### 关掉不需要的扩展或工具
开启过多扩展会拖累性能。只启用必要的[扩展和工具](/docs/guides/managing-tools/tool-permissions)，可以提高工具选择准确度、节省上下文窗口，并留在提供商的工具数量限制之内。

:::tip 扩展很多时使用 Code Mode
可以考虑启用 [Code Mode](/docs/guides/managing-tools/code-mode)，这是另一种工具调用方式，会按需发现工具。
:::

### 让 goose 记住你的偏好
用 [`.goosehints` 或其他上下文文件](/docs/guides/context-engineering/using-goosehints)或[技能](/docs/guides/context-engineering/using-skills)记录长期的项目偏好，用 [Memory 扩展](/docs/mcp/memory-mcp)记录希望 goose 稍后动态回忆的内容。两者都能节省宝贵的上下文窗口，同时让偏好仍然可用。

### 保护敏感文件
在不希望 goose 改动的文件附近工作时，使用[权限模式](/docs/guides/managing-tools/goose-permissions)和[工具权限](/docs/guides/managing-tools/tool-permissions)。

### 版本控制
尽早、经常提交代码变更。这样可以回滚任何意外改动。

### 控制 goose 可以使用哪些扩展
管理员可以用[允许列表](/docs/guides/allowlist)把 goose 限制为仅使用已批准的扩展。这有助于防止从未知 MCP 服务器进行有风险的安装。

### 准备起步模板
为想要分享或稍后再次运行的工作流创建可复用的[配方](/docs/guides/recipes/session-recipes)。

### 保持试验心态
不必第一次就做对。反复打磨提示词和工具，本来就是工作流的一部分。

### 自定义侧边栏
goose 桌面版允许你[自定义侧边栏](/docs/guides/desktop-navigation)，以匹配你的工作方式。可以调整位置、外观，以及显示哪些条目。

### 保持 goose 为最新版本
定期[更新](/docs/guides/updating-goose) goose，以获得最新功能、缺陷修复和性能改进。

### 让配方可以安全地重复运行
编写[配方](/docs/guides/recipes/session-recipes)时，先检查当前状态再行动，这样多次运行也不会出错或产生重复。

### 为配方添加日志
在配方的每个主要步骤中加入有信息量的日志，方便在失败时调试和排查。
