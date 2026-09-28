---
sidebar_position: 11
title: 环境变量
sidebar_label: 环境变量
---

goose 支持多种环境变量，让你可以自定义其行为。本指南按功能分组提供可用环境变量的完整列表。

## 模型配置

这些变量控制[语言模型](/docs/getting-started/providers)及其行为。

### 基本提供商配置

这些是开始使用 goose 所需的最少变量。

| 变量 | 用途 | 值 | 默认值 |
|----------|---------|---------|---------|
| `GOOSE_PROVIDER` | 指定要使用的 LLM 提供商 | [见可用提供商](/docs/getting-started/providers#available-providers) | 无（必须[配置](/docs/getting-started/providers#configure-provider-and-model)） |
| `GOOSE_MODEL` | 指定使用该提供商的哪个模型 | 模型名称（例如 “gpt-4”、“claude-sonnet-4-20250514”） | 无（必须[配置](/docs/getting-started/providers#configure-provider-and-model)） |
| `GOOSE_TEMPERATURE` | 设置模型响应的[温度](https://medium.com/@kelseyywang/a-comprehensive-guide-to-llm-temperature-%EF%B8%8F-363a40bbc91f) | 0.0 到 1.0 之间的浮点数 | 模型特定的默认值 |
| `GOOSE_MAX_TOKENS` | 设置每次模型响应的最大 token 数（截断更长的响应） | 正整数（例如 4096、8192） | 模型特定的默认值 |
| `GOOSE_CACHE_TTL` | 设置 Anthropic 提示缓存 TTL。`1h` 让缓存前缀在空闲间隔中保持存活（例如会话中途离开），但缓存写入按输入的 2 倍而不是 1.25 倍计费，因此只对确实会空闲的会话划算。无界面运行（`goose run`、子代理、定时配方）始终使用 `5m` | `5m`、`1h` | `5m` |

**示例**

```bash
# Basic model configuration
export GOOSE_PROVIDER="anthropic"
export GOOSE_MODEL="claude-sonnet-4-5-20250929"
export GOOSE_TEMPERATURE=0.7

# Set a lower limit for shorter interactions
export GOOSE_MAX_TOKENS=4096

# Set a higher limit for tasks requiring longer output (e.g. code generation)
export GOOSE_MAX_TOKENS=16000
```

### 高级提供商配置

使用自定义端点、企业部署或特定提供商实现时需要这些变量。

| 变量 | 用途 | 值 | 默认值 |
|----------|---------|---------|---------|
| `GOOSE_PROVIDER__TYPE` | 提供商的具体类型/实现 | [见可用提供商](/docs/getting-started/providers#available-providers) | 从 GOOSE_PROVIDER 派生 |
| `GOOSE_PROVIDER__HOST` | 提供商的自定义 API 端点 | URL（例如 “https://api.openai.com”） | 提供商特定的默认值 |
| `GOOSE_PROVIDER__API_KEY` | 提供商的认证密钥 | API 密钥字符串 | 无 |
| `GEMINI3_THINKING_LEVEL` | 全局设置 Gemini 3 模型的[思考级别](/docs/getting-started/providers#gemini-3-thinking-levels) | `low`、`high` | `low` |

**示例**

```bash
# Advanced provider configuration
export GOOSE_PROVIDER__TYPE="anthropic"
export GOOSE_PROVIDER__HOST="https://api.anthropic.com"
export GOOSE_PROVIDER__API_KEY="your-api-key-here"
```

### Claude 思考配置

这些变量控制 Claude 的推理行为。在 Anthropic 和 Databricks 提供商上受支持。

| 变量 | 用途 | 值 | 默认值 |
|----------|---------|---------|---------|
| `CLAUDE_THINKING_TYPE` | 控制 Claude 推理模式 | `adaptive`、`enabled`、`disabled` | Claude 4.6+ 模型为 `adaptive`，否则为 `disabled` |

**示例**

```bash
# Claude 4.6 adaptive thinking
export GOOSE_PROVIDER=anthropic
export GOOSE_MODEL=claude-sonnet-4-6
export CLAUDE_THINKING_TYPE=adaptive

# Explicit extended thinking with the default budget
export CLAUDE_THINKING_TYPE=enabled

# Explicit extended thinking with a larger budget for complex tasks
export CLAUDE_THINKING_TYPE=enabled

# Disable Claude thinking entirely
export CLAUDE_THINKING_TYPE=disabled
```

:::tip 查看思考输出
要在 **CLI** 中看到 Claude 的思考输出，你还需要设置 `GOOSE_CLI_SHOW_THINKING=1`。在 **goose 桌面版**中，思考输出会自动显示在可折叠的 “Show reasoning” 开关中。
:::

### 提供商重试

LLM 提供商的可配置重试参数。

#### AWS Bedrock

| 变量 | 用途 | 默认值 |
|---------------------|-------------|---------|
| `BEDROCK_MAX_RETRIES` | 放弃前的最大重试次数 | 6 |
| `BEDROCK_INITIAL_RETRY_INTERVAL_MS` | 第一次重试前等待多久（毫秒） | 2000 |
| `BEDROCK_BACKOFF_MULTIPLIER` | 每次尝试后重试间隔增加的倍数 | 2（每次翻倍） |
| `BEDROCK_MAX_RETRY_INTERVAL_MS` | 重试间隔的上限（毫秒） |  120000 |

**示例**

```bash
export BEDROCK_MAX_RETRIES=10                    # 10 retry attempts
export BEDROCK_INITIAL_RETRY_INTERVAL_MS=1000    # start with 1 second before first retry
export BEDROCK_BACKOFF_MULTIPLIER=3              # each retry waits 3x longer than the previous
export BEDROCK_MAX_RETRY_INTERVAL_MS=300000      # cap the maximum retry delay at 5 min
```

#### Databricks

| 变量 | 用途 | 默认值 |
|---------------------|-------------|---------|
| `DATABRICKS_MAX_RETRIES` | 放弃前的最大重试次数 | 3 |
| `DATABRICKS_INITIAL_RETRY_INTERVAL_MS` | 第一次重试前等待多久（毫秒） | 1000 |
| `DATABRICKS_BACKOFF_MULTIPLIER` | 每次尝试后重试间隔增加的倍数 | 2（每次翻倍） |
| `DATABRICKS_MAX_RETRY_INTERVAL_MS` | 重试间隔的上限（毫秒） |  30000 |

**示例**

```bash
export DATABRICKS_MAX_RETRIES=5                      # 5 retry attempts
export DATABRICKS_INITIAL_RETRY_INTERVAL_MS=500      # start with 0.5 second before first retry
export DATABRICKS_BACKOFF_MULTIPLIER=2               # each retry waits 2x longer than the previous
export DATABRICKS_MAX_RETRY_INTERVAL_MS=60000        # cap the maximum retry delay at 1 min
```


## 会话管理

这些变量控制 goose 如何管理对话会话和上下文。

| 变量 | 用途 | 值 | 默认值 |
|----------|---------|---------|---------|
| `GOOSE_MAX_TURNS` | 没有用户输入时允许的[最大轮次数](/docs/guides/sessions/smart-context-management#maximum-turns) | 整数（例如 10、50、100） | 1000 |
| `GOOSE_GATEWAY_MAX_TURNS` | 网关会话（例如 Telegram）的最大轮次数。仅对网关流量覆盖 `GOOSE_MAX_TURNS`，因此聊天平台可以保持比 CLI/桌面会话更严格的上限。 | 整数（例如 5、10、25） | 回退到 `GOOSE_MAX_TURNS`，然后是 5 |
| `GOOSE_SUBAGENT_MAX_TURNS` | 设置[子代理](/docs/guides/context-engineering/subagents)在超时前完成所允许的最大轮次。可被配方或子代理工具调用中的 [`settings.max_turns`](/docs/guides/recipes/recipe-reference#settings) 覆盖。 | 整数（例如 25） | 25 |
| `GOOSE_MAX_BACKGROUND_TASKS` | 设置 goose 一次可以运行的并发后台[子代理](/docs/guides/context-engineering/subagents)任务的最大数量 | 整数（例如 1、5、10） | 5 |
| `CONTEXT_FILE_NAMES` | 指定[提示/上下文文件](/docs/guides/context-engineering/using-goosehints#custom-context-files)的自定义文件名 | 字符串的 JSON 数组（例如 `["CLAUDE.md", ".goosehints"]`） | `[".goosehints", "AGENTS.md"]` |
| `GOOSE_DISABLE_SESSION_NAMING` | 禁用自动 AI 生成的会话命名；避免后台模型调用，并保留默认的 “CLI Session”（goose CLI）或 “New Chat”（goose 桌面版） | “1”、“true”（不区分大小写）以启用 | false |
| `GOOSE_PROMPT_EDITOR` | 用于撰写提示的[外部编辑器](/docs/guides/goose-cli-commands#external-editor-mode)，代替 CLI 输入 | 编辑器命令（例如 “vim”、“code --wait”） | 未设置（使用 CLI 输入） |
| `GOOSE_CLI_THEME` | CLI 响应 markdown 的[主题](/docs/guides/goose-cli-commands#themes) | “light”、“dark”、“ansi” | “ansi” |
| `GOOSE_CLI_LIGHT_THEME` | 使用浅色模式时用于语法高亮的自定义 [bat 主题](https://github.com/sharkdp/bat#adding-new-themes) | bat 主题名称（例如 “Solarized (light)”、“OneHalfLight”） | “GitHub” |
| `GOOSE_CLI_DARK_THEME` | 使用深色模式时用于语法高亮的自定义 [bat 主题](https://github.com/sharkdp/bat#adding-new-themes) | bat 主题名称（例如 “Dracula”、“Nord”） | “zenburn” |
| `GOOSE_CLI_NEWLINE_KEY` | 自定义[在 CLI 输入中插入换行](/docs/guides/goose-cli-commands#keyboard-shortcuts)的键盘快捷键 | 单个字符（例如 “n”、“m”） | “j”（Ctrl+J） |
| `GOOSE_CLI_BELL` | 交互轮次完成或需要工具批准时响终端铃 | “true”、“false” | false |
| `GOOSE_CLI_SHOW_THINKING` | 在 CLI 响应中显示模型推理/思考输出。有些模型（例如 DeepSeek-R1、Kimi、Gemini）暴露其内部推理过程——此变量使它在 CLI 中可见。 | 设为任意值以启用 | 禁用 |
| `GOOSE_RANDOM_THINKING_MESSAGES` | 控制处理期间是否显示有趣的随机消息 | “true”、“false” | “true” |
| `GOOSE_CLI_SHOW_COST` | 切换 CLI 输出中模型成本估算的显示 | “1”、“true”（不区分大小写）以启用 | false |
| `GOOSE_MAX_CODE_BLOCK_LINES` | CLI 输出中代码块被截断之前的行数阈值。完整内容会保存到临时文件。 | 正整数 | 50 |
| `GOOSE_TRUNCATED_SHOW_LINES` | 代码块被截断时，在 “… (N more lines)” 消息之前显示的行数 | 正整数 | 20 |
| `GOOSE_NO_CODE_TRUNCATION` | 完全禁用代码块截断——所有代码块都完整显示 | “1”、“true”（不区分大小写）以启用 | false |
| `GOOSE_AUTO_COMPACT_THRESHOLD` | 设置 goose [自动压缩会话](/docs/guides/sessions/smart-context-management#automatic-compaction)的百分比阈值。 | 0.0 到 1.0 之间的浮点数（0.0 时禁用） | 0.8 |
| `GOOSE_TOOL_CALL_CUTOFF` | 在摘要较旧工具输出之前完整保留的工具调用数量，以帮助维持高效的上下文使用 | 整数（例如 5、10、20） | 根据模型上下文限制和自动压缩阈值计算 |
| `GOOSE_MOIM_MESSAGE_TEXT` | 每一轮把持久文本注入 goose 的[工作记忆](/docs/guides/context-engineering/using-persistent-instructions)。适用于行为护栏或持久提醒。 | 任意文本字符串 | 未设置 |
| `GOOSE_MOIM_MESSAGE_FILE` | 其内容每一轮注入 goose [工作记忆](/docs/guides/context-engineering/using-persistent-instructions)的文件路径。支持 `~/`。每个文件最大 64 KB。 | 文件路径 | 未设置 |

对于子代理，配方 [`settings.goose_provider` 和 `settings.goose_model`](/docs/guides/recipes/recipe-reference#settings) 优先于 `GOOSE_SUBAGENT_PROVIDER` 和 `GOOSE_SUBAGENT_MODEL` 环境变量。

**示例**

```bash
# Set a low limit for step-by-step control
export GOOSE_MAX_TURNS=5

# Set a moderate limit for controlled automation
export GOOSE_MAX_TURNS=25

# Set a reasonable limit for production
export GOOSE_MAX_TURNS=100

# Raise the per-gateway cap without changing CLI/desktop limits
# (applies to Telegram and other gateway sessions only)
export GOOSE_GATEWAY_MAX_TURNS=15

# Customize the default subagent turn limit
# Note: This can be overridden per-recipe or per-subagent using the max_turns setting
export GOOSE_SUBAGENT_MAX_TURNS=50

# Use multiple context files
export CONTEXT_FILE_NAMES='["CLAUDE.md", ".goosehints", ".cursorrules", "project_rules.txt"]'

# Disable automatic AI-generated session naming (useful for CI/headless runs)
export GOOSE_DISABLE_SESSION_NAMING=true

# Use vim for composing prompts
export GOOSE_PROMPT_EDITOR=vim

# Set the ANSI theme for the session
export GOOSE_CLI_THEME=ansi

# Customize syntax highlighting themes (uses bat themes)
export GOOSE_CLI_LIGHT_THEME="Solarized (light)"
export GOOSE_CLI_DARK_THEME="Dracula"

# Use Ctrl+N instead of Ctrl+J for newline
export GOOSE_CLI_NEWLINE_KEY=n

# Disable random thinking messages for less distraction
export GOOSE_RANDOM_THINKING_MESSAGES=false

# Show reasoning/thinking output from models that support it (e.g., DeepSeek-R1, Kimi, Gemini)
export GOOSE_CLI_SHOW_THINKING=1

# Enable model cost display in CLI
export GOOSE_CLI_SHOW_COST=true

# Show code blocks up to 100 lines before truncating
export GOOSE_MAX_CODE_BLOCK_LINES=100

# Disable code block truncation entirely (show all lines inline)
export GOOSE_NO_CODE_TRUNCATION=true

# Automatically compact sessions when 60% of available tokens are used
export GOOSE_AUTO_COMPACT_THRESHOLD=0.6

# Keep more tool calls in full detail (useful for debugging or verbose workflows)
export GOOSE_TOOL_CALL_CUTOFF=20

# Inject a persistent reminder into goose's working memory every turn
export GOOSE_MOIM_MESSAGE_TEXT="IMPORTANT: Always run tests before committing changes."

# Load persistent instructions from a file (supports ~/)
export GOOSE_MOIM_MESSAGE_FILE="~/.goose/guardrails.md"
```

### 模型上下文限制覆盖

这些变量让你覆盖模型的默认上下文窗口大小（token 限制）。使用[LiteLLM 代理](https://docs.litellm.ai/docs/providers/litellm_proxy)或与 goose 预定义模型模式不匹配的自定义模型时特别有用。

| 变量 | 用途 | 值 | 默认值 |
|----------|---------|---------|---------|
| `GOOSE_CONTEXT_LIMIT` | 覆盖主模型的上下文限制 | 整数（token 数） | 模型特定的默认值或 128,000 |
| `GOOSE_INPUT_LIMIT` | 覆盖 ollama 请求的输入提示限制（映射到 `num_ctx`） | 整数（token 数） | 未设置；Ollama 使用其模型默认值 |

**示例**

```bash
# Set context limit for main model (useful for LiteLLM proxies)
export GOOSE_CONTEXT_LIMIT=200000
# Override ollama input prompt limit
export GOOSE_INPUT_LIMIT=32000
```

更多细节和示例见[模型上下文限制覆盖](/docs/guides/sessions/smart-context-management#model-context-limit-overrides)。

## 工具配置

这些变量控制 goose 如何处理[工具执行](/docs/guides/managing-tools/goose-permissions)和[工具管理](/docs/guides/managing-tools/)。

| 变量 | 用途 | 值 | 默认值 |
|----------|---------|---------|---------|
| `GOOSE_MODE` | 控制 goose 如何处理工具执行 | “auto”、“approve”、“chat”、“smart_approve” | “auto” |
| `GOOSE_TOOLSHIM` | 为输出基于文本的工具调用的模型启用[工具垫片](/docs/guides/tool-shim) | “1”、“true”（不区分大小写）以启用 | false |
| `GOOSE_TOOLSHIM_BACKEND` | 工具垫片的解释器后端 | “ollama”（默认）、“local”、“llama.cpp” | “ollama” |
| `GOOSE_TOOLSHIM_OLLAMA_MODEL` | 用作[工具垫片](/docs/guides/tool-shim)解释器的 Ollama 模型 | 模型名称（例如 llama3.2、mistral-nemo） | “mistral-nemo” |
| `GOOSE_TOOLSHIM_MODEL` | 本地工具垫片解释器后端的模型 | 模型名称 | 使用 `LOCAL_LLM_MODEL` 配置 |
| `GOOSE_CLI_MIN_PRIORITY` | 控制[工具输出](/docs/guides/managing-tools/adjust-tool-output)的详细程度 | 0.0 到 1.0 之间的浮点数 | 0.0 |
| `GOOSE_DEBUG` | 启用调试模式以显示完整工具参数而不截断。也可以在会话期间用 `/r` [斜杠命令](/docs/guides/goose-cli-commands#slash-commands)切换 | “1”、“true”（不区分大小写）以启用 | false |
| `GOOSE_SHOW_FULL_OUTPUT` | 在 CLI 输出中显示完整工具参数，而不是截断到终端宽度 | true/false | false |
| `GOOSE_SEARCH_PATHS` | 为扩展命令在 PATH 前附加额外目录 | 路径的 JSON 数组（例如 `["/usr/local/bin", "~/custom/bin"]`） | 内置搜索路径，然后是系统 PATH |
| `GOOSE_MAX_TOOL_RESPONSE_SIZE` | 单个工具响应在被写入临时文件而不是内联包含在对话中之前的最大字符数 | 正整数（例如 100000、200000） | 200000 |
| `GOOSE_SHELL` | 覆盖 Developer 扩展 shell 命令使用的 shell | shell 可执行文件路径或名称（例如 `/bin/zsh`、`pwsh`、`C:\cygwin64\bin\bash.exe`） | Unix：PATH 上找到则用 `bash`，否则 `sh`。Windows：`cmd` |

**示例**

```bash
# Enable tool interpretation
export GOOSE_TOOLSHIM=true
export GOOSE_TOOLSHIM_OLLAMA_MODEL=llama3.2
export GOOSE_MODE="auto"
export GOOSE_CLI_MIN_PRIORITY=0.2  # Show only medium and high importance output
export GOOSE_SHOW_FULL_OUTPUT=true  # Show full tool parameters in CLI output

# Add custom tool directories for extensions
export GOOSE_SEARCH_PATHS='["/usr/local/bin", "~/custom/tools", "/opt/homebrew/bin"]'

# These custom paths are checked before built-in fallback paths such as
# ~/.local/bin, /usr/local/bin on Unix, Homebrew/MacPorts paths on macOS,
# and finally the inherited system PATH.

# Lower the tool response size limit for smaller-context models
export GOOSE_MAX_TOOL_RESPONSE_SIZE=100000

# Use zsh for Developer extension shell commands
export GOOSE_SHELL=/bin/zsh
```

```bat
REM Windows: use a POSIX-like shell instead of cmd.exe
set GOOSE_SHELL=C:\cygwin64\bin\bash.exe
```

:::note
你只需把 `GOOSE_SHELL` 设为 shell 可执行文件路径或名称。goose 会根据 shell 自动注入命令行标志，因此你不必自己添加：

- **PowerShell**（`pwsh`、`powershell`）→ `-NoProfile -NonInteractive -Command`
- **cmd** → `/C`
- **POSIX shell**（Windows 上通过 Cygwin/MSYS2 的 bash、zsh 等）→ `-c`
- 在 Unix 上，默认 shell（`bash`，回退到 `sh`）以 `<shell> -c` 调用
:::

## 安全与隐私

这些变量控制安全功能、凭据存储和匿名使用数据收集。

| 变量 | 用途 | 值 | 默认值 |
|----------|---------|---------|---------|
| `GOOSE_ALLOWLIST` | 控制可以加载哪些扩展 | [允许的扩展](/docs/guides/allowlist)列表的 URL | 未设置 |
| `GOOSE_DISABLE_KEYRING` | 禁用用于机密存储的系统密钥环 | 设为任意值（例如 “1”、“true”、“yes”）以禁用。实际值不重要，只看变量是否被设置。 | 未设置（密钥环已启用） |
| `SECURITY_PROMPT_ENABLED` | 启用[提示注入检测](/docs/guides/security/prompt-injection-detection)以识别潜在有害命令 | true/false | false |
| `SECURITY_PROMPT_THRESHOLD` | 提示注入检测的敏感度阈值（越高越严格） | 0.01 到 1.0 之间的浮点数 | 0.8 |
| `SECURITY_PROMPT_CLASSIFIER_ENABLED` | 启用基于机器学习的提示注入检测以进行高级威胁识别 | true/false | false |
| `SECURITY_PROMPT_CLASSIFIER_ENDPOINT` | 基于机器学习的提示注入检测的分类端点 URL | URL（例如 “https://api.example.com/classify”） | 未设置 |
| `SECURITY_PROMPT_CLASSIFIER_TOKEN` | `SECURITY_PROMPT_CLASSIFIER_ENDPOINT` 的认证 token | 字符串 | 未设置 |
| `GOOSE_TELEMETRY_ENABLED` | 启用或禁用[匿名使用数据收集](/docs/guides/usage-data) | true/false | false |

**示例**

```bash
# Enable prompt injection detection with default threshold
export SECURITY_PROMPT_ENABLED=true

# Enable with custom threshold (stricter)
export SECURITY_PROMPT_ENABLED=true
export SECURITY_PROMPT_THRESHOLD=0.9

# Enable ML-based detection with external endpoint
export SECURITY_PROMPT_ENABLED=true
export SECURITY_PROMPT_CLASSIFIER_ENABLED=true
export SECURITY_PROMPT_CLASSIFIER_ENDPOINT="https://your-endpoint.com/classify"
export SECURITY_PROMPT_CLASSIFIER_TOKEN="your-auth-token"

# Control anonymous usage data collection
export GOOSE_TELEMETRY_ENABLED=false  # Disable telemetry
export GOOSE_TELEMETRY_ENABLED=true   # Enable telemetry
```

:::tip
当密钥环被禁用（或无法访问且 goose [回退到基于文件的存储](/docs/troubleshooting/known-issues#keyring-cannot-be-accessed-automatic-fallback)）时，机密存储在这里：

* macOS/Linux：`~/.config/goose/secrets.yaml`
* Windows：`%APPDATA%\Block\goose\config\secrets.yaml`
:::

## 网络配置

这些变量为 goose 配置网络代理设置。

### OAuth 回调端口

默认情况下，goose 在随机端口上启动临时本地服务器以接收 OAuth 回调。要求 `redirect_uri` 精确匹配（并禁止通配端口）的企业身份提供商会拒绝该回调。设置此变量以改用固定端口。

| 变量 | 用途 | 值 | 默认值 |
|----------|---------|---------|---------|
| `GOOSE_OAUTH_CALLBACK_PORT` | 本地 OAuth 回调服务器的固定端口 | 端口号（例如 8080、9999） | 随机（操作系统分配） |

**示例**

```bash
# Use a fixed port so your IdP's redirect_uri whitelist can match exactly
export GOOSE_OAUTH_CALLBACK_PORT=8080
```

然后在身份提供商中注册相应的重定向 URI：
- 对于 MCP 服务器 OAuth：`http://127.0.0.1:8080/oauth_callback`
- 对于 Databricks OAuth：`http://localhost:8080`

### HTTP 代理

goose 支持标准 HTTP 代理环境变量，供位于企业防火墙或代理服务器之后的用户使用。

| 变量 | 用途 | 值 | 默认值 |
|----------|---------|---------|---------|
| `HTTP_PROXY` | HTTP 连接的代理 URL | URL（例如 `http://proxy.company.com:8080`） | 无 |
| `HTTPS_PROXY` | HTTPS 连接的代理 URL（两者都设置时优先于 `HTTP_PROXY`） | URL（例如 `http://proxy.company.com:8080`） | 无 |
| `NO_PROXY` | 绕过代理的主机 | 逗号分隔列表（例如 `localhost,127.0.0.1,.internal.com`） | 无 |

**示例**

```bash
# Configure proxy for all connections
export HTTPS_PROXY="http://proxy.company.com:8080"
export NO_PROXY="localhost,127.0.0.1,.internal,.local,10.0.0.0/8"

# Or with authentication
export HTTPS_PROXY="http://username:password@proxy.company.com:8080"
export NO_PROXY="localhost,127.0.0.1,.internal"
```

或者，可以通过操作系统的网络设置配置代理。如果遇到连接问题，故障排除步骤见[企业代理或防火墙问题](/docs/troubleshooting/known-issues#corporate-proxy-or-firewall-issues)。

## 可观测性

除了 goose 内置的[日志系统](/docs/guides/logs)，你还可以把遥测导出到外部可观测性平台，以进行高级监控、性能分析和生产洞察。

### 可观测性配置

配置 goose 把遥测导出到任何兼容 [OpenTelemetry](https://opentelemetry.io/docs/) 的平台。

要启用导出，设置收集器端点：

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
```

你可以用 `OTEL_{SIGNAL}_EXPORTER` 独立控制每个信号（追踪、指标、日志）：

| 变量模式 | 用途 | 值 |
|---|---|---|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | 基础 OTLP 端点（应用 `/v1/traces` 等） | URL |
| `OTEL_EXPORTER_OTLP_{SIGNAL}_ENDPOINT` | 覆盖特定信号的端点 | URL |
| `OTEL_{SIGNAL}_EXPORTER` | 每个信号的导出器类型 | `otlp`、`console`、`none` |
| `OTEL_SDK_DISABLED` | 禁用所有 OTel 导出 | `true` |
| `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` | 在导出的追踪中包含模型消息和工具参数/结果 | `true`、`false`（默认） |

也支持 `OTEL_SERVICE_NAME`、`OTEL_RESOURCE_ATTRIBUTES` 和 `OTEL_EXPORTER_OTLP_TIMEOUT` 等额外变量。
完整列表见 [OTel 环境变量规范][otel-env]。

**示例：**
```bash
# Export everything to a local collector
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"

# Export only traces, disable metrics and logs
export OTEL_TRACES_EXPORTER="otlp"
export OTEL_METRICS_EXPORTER="none"
export OTEL_LOGS_EXPORTER="none"
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"

# Debug traces to console (no collector needed)
export OTEL_TRACES_EXPORTER="console"

# Sample 10% of traces (reduce volume in production)
export OTEL_TRACES_SAMPLER="parentbased_traceidratio"
export OTEL_TRACES_SAMPLER_ARG="0.1"
```

[otel-env]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/

### Langfuse 集成

这些变量配置[用于可观测性的 Langfuse 集成](/docs/tutorials/langfuse)。

| 变量 | 用途 | 值 | 默认值 |
|----------|---------|---------|---------|
| `LANGFUSE_PUBLIC_KEY` | Langfuse 集成的公钥 | 字符串 | 无 |
| `LANGFUSE_SECRET_KEY` | Langfuse 集成的密钥 | 字符串 | 无 |
| `LANGFUSE_URL` | Langfuse 服务的自定义 URL | URL 字符串 | 默认 Langfuse URL |
| `LANGFUSE_INIT_PROJECT_PUBLIC_KEY` | Langfuse 的替代公钥 | 字符串 | 无 |
| `LANGFUSE_INIT_PROJECT_SECRET_KEY` | Langfuse 的替代密钥 | 字符串 | 无 |

## goose ACP 服务器

这些变量配置 `goose serve` ACP 服务器进程。它们是等效 `goose serve` 标志的替代，最常用于[运行远程 goose 服务器](/docs/guides/remote-goose-server)并把 goose 桌面版连接到它。

| 变量 | 用途 | 值 | 默认值 |
|----------|---------|---------|---------|
| `GOOSE_TLS` | 等效于 `goose serve --tls`。推荐用于远程服务器。 | `true`、`false` | `false` |
| `GOOSE_TLS_CERT_PATH` | 等效于 `goose serve --tls-cert-path`。必须与 `GOOSE_TLS_KEY_PATH` 一起使用；设置它会启用 TLS。 | 文件路径 | 无 |
| `GOOSE_TLS_KEY_PATH` | 等效于 `goose serve --tls-key-path`。必须与 `GOOSE_TLS_CERT_PATH` 一起使用；设置它会启用 TLS。 | 文件路径 | 无 |
| `GOOSE_SERVER__SECRET_KEY` | ACP 端点所需的共享机密，除非使用 `--dangerously-unauthenticated`。 | 机密字符串 | 必需 |

**示例**

```bash
# Start a goose ACP server reachable on the local network over TLS
GOOSE_SERVER__SECRET_KEY='a-long-random-secret' \
goose serve --platform desktop --enable-scheduler --host 0.0.0.0 --port 3000 --tls
```

启用 TLS 时，`goose serve` 在启动时打印一行 `GOOSED_CERT_FINGERPRINT=...`。goose 桌面版可以使用此指纹固定服务器证书。完整设置见[运行远程 goose 服务器](/docs/guides/remote-goose-server)。

## 配方配置

这些变量控制配方发现和管理。

| 变量 | 用途 | 值 | 默认值 |
|----------|---------|---------|---------|
| `GOOSE_RECIPE_PATH` | 搜索配方的额外目录 | Unix 上以冒号分隔的路径，Windows 上以分号分隔 | 无 |
| `GOOSE_RECIPE_GITHUB_REPO` | 搜索配方的 GitHub 仓库 | 格式：“owner/repo”（例如 “aaif-goose/goose-recipes”） | 无 |
| `GOOSE_RECIPE_RETRY_TIMEOUT_SECONDS` | 配方成功检查命令的全局超时 | 整数（秒） | 配方特定的默认值 |
| `GOOSE_RECIPE_ON_FAILURE_TIMEOUT_SECONDS` | 配方 on_failure 命令的全局超时 | 整数（秒） | 配方特定的默认值 |

**示例**

```bash
# Add custom recipe directories
export GOOSE_RECIPE_PATH="/path/to/my/recipes:/path/to/team/recipes"

# Configure GitHub recipe repository
export GOOSE_RECIPE_GITHUB_REPO="myorg/goose-recipes"

# Set global recipe timeouts
export GOOSE_RECIPE_RETRY_TIMEOUT_SECONDS=300
export GOOSE_RECIPE_ON_FAILURE_TIMEOUT_SECONDS=60
```

## 文档配置

此变量控制 `goose-doc-guide` 技能从何处读取 goose 文档。

| 变量 | 用途 | 值 | 默认值 |
|----------|---------|---------|---------|
| `GOOSE_DOCS_ROOT` | `goose-doc-guide` 技能的文档根，用于[离线/隔离文档](/docs/guides/offline-docs) | 包含 `goose-docs-map.md` 和 `docs/` 的本地路径或 HTTP(S) URL | `https://goose-docs.ai` |

## 开发与测试

这些变量主要用于开发、测试和调试 goose 本身。

| 变量 | 用途 | 值 | 默认值 |
|----------|---------|---------|---------|
| `GOOSE_PATH_ROOT` | 覆盖所有 goose 数据、配置和状态文件的根目录 | 目录的绝对路径 | 平台特定的默认值 |

**默认位置：**
- macOS：`~/Library/Application Support/Block/goose/`
- Linux：`~/.local/share/goose/`
- Windows：`%APPDATA%\Block\goose\`

设置后，goose 会在指定路径下创建 `config/`、`data/` 和 `state/` 子目录。适用于隔离测试环境、运行多种配置或 CI/CD 流水线。

**示例**

```bash
# Temporary test environment
export GOOSE_PATH_ROOT="/tmp/goose-test"

# Isolated environment for a single command
GOOSE_PATH_ROOT="/tmp/goose-isolated" goose run --recipe my-recipe.yaml

# CI/CD usage
GOOSE_PATH_ROOT="$(mktemp -d)" goose run --recipe integration-test.yaml

# Use with developer tools
GOOSE_PATH_ROOT="/tmp/goose-test" ./scripts/goose-db-helper.sh status
```

## 由 goose 控制的变量

这些变量在命令执行期间由 goose 自动设置。

| 变量 | 用途 | 值 | 默认值 |
|----------|---------|---------|---------|
| `GOOSE_TERMINAL` | 表示命令正在由 goose 执行，启用[自定义 shell 行为](#customizing-shell-behavior) | 设置时为 “1” | 未设置 |
| `AGENT` | 用于跨工具兼容的通用代理标识符，使工具和脚本能够检测它们正由 goose 运行 | 设置时为 “goose” | 未设置 |
| `AGENT_SESSION_ID` | 当前会话 ID，用于[工作流中的会话隔离](#using-session-ids-in-workflows)，自动提供给 STDIO 扩展和 Developer 扩展的 shell 命令 | 会话 ID 字符串（例如 `20260217_5`） | 未设置（仅在扩展/shell 上下文中设置） |

### 自定义 shell 行为

有时你希望 goose 使用与正常终端用法不同的命令或 shell 行为。常见用例包括：
- 跳过昂贵的 shell 初始化（例如语法高亮、自定义提示符）
- 阻止会挂起代理的交互式命令（例如 `git commit`）
- 重定向到对代理友好的工具（例如用 `rg` 代替 `find`）
- 构建检测 AI 代理执行的跨代理工具和脚本
- 与 MCP 服务器和 LLM 网关集成

这在使用 goose CLI 时最有用，因为 shell 命令直接在你的终端环境中执行。

**工作原理：**

goose 提供 `GOOSE_TERMINAL` 和 `AGENT` 变量，你可以用它们检测 goose 是否是执行代理。

1. 当 goose 运行命令时：
   - `GOOSE_TERMINAL` 自动设为 “1”
   - `AGENT` 自动设为 “goose”
2. 你的 shell 配置可以检测到这一点并改变行为，同时保持正常终端用法不变

**示例：**

```bash
# In ~/.zshenv (for zsh users) or ~/.bashrc (for bash users)

# Block git commit when run by goose
if [[ -n "$GOOSE_TERMINAL" ]]; then
  git() {
    if [[ "$1" == "commit" ]]; then
      echo "❌ BLOCKED: git commit is not allowed when run by goose"
      return 1
    fi
    command git "$@"
  }
fi
```

```bash
# Guide goose toward better tool choices
if [[ -n "$GOOSE_TERMINAL" ]]; then
  alias find="echo 'Use rg instead: rg --files | rg <pattern> for filenames, or rg <pattern> for content search'"
fi
```

```bash
# Detect AI agent execution using standard naming convention
if [[ -n "$AGENT" ]]; then
  echo "Running under AI agent: $AGENT"
  # Apply agent-specific behavior if needed
  if [[ "$AGENT" == "goose" ]]; then
    echo "Detected goose - applying goose-specific settings"
  fi
fi
```

### 在工作流中使用会话 ID

STDIO 扩展（通过标准输入/输出通信的本地扩展）和 Developer 扩展的 shell 命令会自动接收 `AGENT_SESSION_ID` 环境变量。这使你能够创建会话隔离的工作流，并更容易：
- 使用会话隔离的交接路径在多次工具调用之间协调工作
- 按会话隔离工作树或临时文件
- 调试产物与会话历史之间的关联

下面的示例展示配方如何使用会话 ID 在步骤之间交接信息：

```bash
# Create session-specific handoff directory
mkdir -p ~/Desktop/${AGENT_SESSION_ID}/handoff
echo "Results from step 1" > ~/Desktop/${AGENT_SESSION_ID}/handoff/output.txt

# Later steps in the recipe can read from the same location
cat ~/Desktop/${AGENT_SESSION_ID}/handoff/output.txt
```

## 环境变量传递

Developer 扩展的 `shell` 工具从你的会话继承环境变量。这支持依赖环境配置的工作流，例如经过认证的 CLI 操作和构建过程。

细节见[shell 命令中的环境变量](/docs/mcp/developer-mcp#environment-variables-in-shell-commands)。

## 企业环境

在企业环境中部署 goose 时，管理员可能需要控制行为和基础设施，或在团队之间强制一致的设置。以下环境变量很常用：

**网络与基础设施** - 控制 goose 如何连接到外部服务和内部基础设施：
- [网络配置](#network-configuration) - 代理配置和网络设置
- [高级提供商配置](#advanced-provider-configuration) - 指向内部 LLM 端点（例如 Databricks、自定义部署）
- [模型上下文限制覆盖](#model-context-limit-overrides) - 为 LiteLLM 代理和自定义模型配置上下文限制

**安全与隐私** - 控制安全和隐私功能：
- [安全与隐私](#security-and-privacy) - 管理安全和隐私设置，例如扩展加载、机密存储和使用数据收集

**合规与监控** - 跟踪使用情况并导出遥测以供审计：

- [可观测性](#observability) - 把遥测导出到监控平台（OTLP、Langfuse）

## 说明

- 环境变量优先于配置文件。
- 对于安全敏感的变量（如 API 密钥），考虑使用系统密钥环而不是环境变量。
- 有些变量可能需要重启 goose 才能生效。
