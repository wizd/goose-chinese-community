---
title: goose 日志系统
sidebar_label: 日志系统
sidebar_position: 65
---


goose 使用统一的存储系统保存对话和交互。所有对话和交互（CLI 和桌面版）都**本地**存储在以下位置：

| **类型**            | **类 Unix（macOS、Linux）**              | **Windows**                              |
|---------------------|----------------------------------------|---------------------------------------------|
| **命令历史** | `~/.config/goose/history.txt`          | `%APPDATA%\Block\goose\data\history.txt`    |
| **会话记录** | `~/.local/share/goose/sessions/sessions.db` | `%APPDATA%\Block\goose\data\sessions\sessions.db` |
| **系统日志**     | `~/.local/state/goose/logs/`           | `%APPDATA%\Block\goose\data\logs\`          |

:::info 隐私
goose 是本地应用，所有 goose 日志文件都存储在本地。这些日志从不发送到外部服务器或第三方，确保所有 goose 数据保持私密并由你控制。
请注意，goose 代你使用的 LLM 和工具可能有自己的日志和隐私考量。
:::

## 命令历史

goose 会在聊天会话之间持久保存命令历史，以便回忆之前的命令。

命令历史日志存储在：

* 类 Unix：` ~/.config/goose/history.txt`
* Windows：`%APPDATA%\Block\goose\data\history.txt`

## 会话记录

goose 维护会话记录，跟踪每个会话的对话历史和交互。
会话存储在 SQLite 数据库中：
- **类 Unix**：`~/.local/share/goose/sessions/sessions.db`
- **Windows**：`%APPDATA%\Block\goose\data\sessions\sessions.db`

:::info 会话存储迁移
在 1.10.0 版本之前，goose 把会话记录存储为 `~/.local/share/goose/sessions/` 下的单独 `.jsonl` 文件。
升级到 v1.10.0 或更高版本时，现有会话会自动导入数据库。旧的 `.jsonl` 文件仍留在磁盘上，但不再由 goose 管理。
:::

该数据库包含所有已保存的会话数据，包括：
- 会话元数据（ID、名称、工作目录、时间戳）
- 对话消息（用户命令、助手回复、角色信息）
- 工具调用和结果（ID、参数、响应、成功/失败状态）
- Token 用量统计
- 扩展数据和配置

会话 ID 使用 `YYYYMMDD_<COUNT>` 格式命名，例如：`20250310_2`。goose CLI 会在每个会话开始时输出会话 ID。要获取会话 ID，使用 [`goose session list` 命令](/docs/guides/goose-cli-commands#session-list-options)查看所有可用会话。

另见[会话管理](/docs/guides/sessions/session-management)，了解搜索会话的细节。

## 系统日志

goose 为其各个组件存储日志。CLI 和服务器日志会自动按日期目录组织，并在两周后清理，以防止占用过多磁盘。

启用[提示词注入检测](/docs/guides/security/prompt-injection-detection)后，CLI 和服务器日志还会包括：
* 带有唯一 ID 的安全发现（格式：`SEC-{uuid}`）
* 与发现 ID 关联的用户决定（允许/拒绝）

:::info
扩展可以选择记录到 `~/.local/state/goose/logs/` 下的子目录。具体子目录结构由每个扩展的实现决定。
:::

### 桌面应用日志

桌面应用维护自己的日志：
* macOS：`~/Library/Application Support/Goose/logs/main.log`
* Windows：`%APPDATA%\Block\goose\logs\main.log`

桌面应用遵循平台约定存放自己的运行日志和状态数据，但实际对话和交互使用标准的 goose [会话记录](#session-records)。因此，无论你用哪种界面与 goose 交互，对话历史都是一致的。

### CLI 日志

CLI 日志存储在：
* 类 Unix：`~/.local/state/goose/logs/cli/`
* Windows：`%APPDATA%\Block\goose\data\logs\cli\`

日志按日期子目录组织（例如 `cli/2025-11-13/`），超过两周的子目录会自动删除。

CLI 会话日志包含：
* 工具调用和响应
* 命令执行细节
* 会话标识符
* 时间戳

CLI 日志也会捕获与扩展相关的活动，包括：
* 工具初始化
* 工具能力和模式
* 扩展特定操作
* 命令执行结果
* 错误消息和调试信息
* 扩展配置状态
* 扩展特定的协议信息

### 服务器日志

服务器日志存储在：
* 类 Unix：`~/.local/state/goose/logs/server/`
* Windows：`%APPDATA%\Block\goose\data\logs\server\`

日志按日期子目录组织（例如 `server/2025-11-13/`），超过两周的子目录会自动删除。

服务器日志包含关于 goose 守护进程（`goosed`）的信息。`goosed` 是运行在你计算机上的本地服务器进程。该服务器组件管理 CLI、扩展和 LLM 之间的通信。

服务器日志包括：
* 服务器初始化细节
* JSON-RPC 通信日志
* 服务器能力
* 协议版本信息
* 客户端与服务器的交互
* 扩展加载和初始化
* 工具定义和模式
* 扩展指令和能力
* 调试级别的传输信息
* 系统能力和配置
* 操作系统信息
* 工作目录信息
* 传输层通信细节
* 消息解析和处理信息
* 请求/响应周期
* 错误状态和处理
* 扩展初始化序列

### LLM 请求日志

LLM 请求日志捕获发送给语言模型提供商的原始请求和响应数据：
* 类 Unix：`~/.local/state/goose/logs/llm_request.*.jsonl`
* Windows：`%APPDATA%\Block\goose\data\logs\llm_request.*.jsonl`

这些日志使用编号轮转，保留最近 10 个已完成的请求（`llm_request.0.jsonl` 到 `llm_request.9.jsonl`）。每条日志包含模型配置、输入载荷、响应数据和 token 用量信息。
