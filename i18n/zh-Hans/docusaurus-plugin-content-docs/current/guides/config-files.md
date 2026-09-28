---
sidebar_position: 10
title: 配置文件
sidebar_label: 配置文件
---

# 配置概览

goose 使用 YAML [配置文件](#configuration-files)管理设置和扩展。主配置文件位于：

* macOS/Linux：`~/.config/goose/config.yaml`
* Windows：`%APPDATA%\Block\goose\config\config.yaml`

配置文件让你可以设置默认行为、配置语言模型、设置工具权限并管理扩展。虽然许多设置也可以用[环境变量](/docs/guides/environment-variables)设置，配置文件提供了保持偏好的持久方式。

## 配置文件

- **config.yaml** - 提供商、模型、扩展和常规设置
- **permission.yaml** - 通过 `goose configure` 配置的工具权限级别
- **secrets.yaml** - API 密钥和机密（当 goose 使用[基于文件的机密存储](#security-considerations)时）
- **permissions/tool_permissions.json** - 运行时权限决定（自动管理）
- **prompts/** - 自定义的[提示词模板](/docs/guides/context-engineering/prompt-templates)

除了直接编辑配置文件，许多设置也可以从 goose 桌面版和 goose CLI 管理：
- **goose 桌面版**：从 `Settings` 页面和底部工具栏
- **goose CLI**：运行 `goose configure` 命令

## 提供商配置

提供商设置存储在 `active_provider` 和 `providers` 键中：

```yaml
active_provider: anthropic
providers:
  anthropic:
    enabled: true
    model: claude-sonnet-4-5-20250929
    configured: true
```

`GOOSE_PROVIDER` 和 `GOOSE_MODEL` 仍作为环境变量受支持，并会为该进程覆盖配置文件。使用扁平 `GOOSE_PROVIDER` 和 `GOOSE_MODEL` 键的旧配置文件会被读取以保持兼容，并在 goose 更新提供商设置时迁移。

## 全局设置

以下设置可以在 config.yaml 文件的根级别配置：

| 设置 | 用途 | 取值 | 默认值 | 是否必需 |
|---------|---------|---------|---------|-----------|
| `GOOSE_TEMPERATURE` | 模型回复的随机性 | 0.0 到 1.0 之间的浮点数 | 依模型而定 | 否 |
| `GOOSE_MAX_TOKENS` | 每次模型回复的最大 token 数（截断更长的回复） | 正整数 | 依模型而定 | 否 |
| `GOOSE_CACHE_TTL` | Anthropic 提示缓存 TTL；`1h` 能让缓存前缀在空闲间隔中保持有效，但缓存写入费率更高。无头运行始终使用 `5m` | "5m"、"1h" | "5m" | 否 |
| `GOOSE_MODE` | [工具执行行为](/docs/guides/managing-tools/goose-permissions) | "auto"、"approve"、"chat"、"smart_approve" | "auto" | 否 |
| `GOOSE_MAX_TURNS` | 在没有用户输入的情况下允许的[最大轮次数](/docs/guides/sessions/smart-context-management#maximum-turns) | 整数（例如 10、50、100） | 1000 | 否 |
| `GOOSE_TOOLSHIM` | 启用工具解释 | true/false | false | 否 |
| `GOOSE_TOOLSHIM_OLLAMA_MODEL` | 用于工具解释的模型 | 模型名称（例如 "llama3.2"） | 系统默认 | 否 |
| `GOOSE_INPUT_LIMIT` | 覆盖 Ollama 的输入 token 限制（映射到 `num_ctx`） | 正整数 | 模型默认 | 否 |
| `GOOSE_CLI_MIN_PRIORITY` | 工具输出详细程度 | 0.0 到 1.0 之间的浮点数 | 0.0 | 否 |
| `GOOSE_CLI_THEME` | CLI 回复 markdown 的[主题](/docs/guides/goose-cli-commands#themes) | "light"、"dark"、"ansi" | "ansi" | 否 |
| `GOOSE_CLI_LIGHT_THEME` | 浅色模式的自定义语法高亮主题 | [bat 主题名](https://github.com/sharkdp/bat#adding-new-themes) | "GitHub" | 否 |
| `GOOSE_CLI_DARK_THEME` | 深色模式的自定义语法高亮主题 | [bat 主题名](https://github.com/sharkdp/bat#adding-new-themes) | "zenburn" | 否 |
| `GOOSE_CLI_SHOW_COST` | 在 CLI 中显示 token 使用的估计成本 | true/false | false | 否 |
| `GOOSE_CLI_BELL` | 交互轮次结束或需要工具批准时响铃 | true/false | false | 否 |
| `GOOSE_ALLOWLIST` | 允许扩展的 URL | 有效 URL | 无 | 否 |
| `GOOSE_DOCS_ROOT` | `goose-doc-guide` 使用的文档根（例如用于离线/隔离文档） | 包含 `goose-docs-map.md` 和 `docs/` 的本地路径或 HTTP(S) URL | `https://goose-docs.ai` | 否 |
| `GOOSE_RECIPE_GITHUB_REPO` | 配方的 GitHub 仓库 | 格式："org/repo" | 无 | 否 |
| `GOOSE_AUTO_COMPACT_THRESHOLD` | 设置 goose [自动压缩会话](/docs/guides/sessions/smart-context-management#automatic-compaction)的百分比阈值。 | 0.0 到 1.0 之间的浮点数（0.0 为禁用）| 0.8 | 否 |
| `SECURITY_PROMPT_ENABLED` | 启用[提示词注入检测](/docs/guides/security/prompt-injection-detection)以识别可能有害的命令 | true/false | false | 否 |
| `SECURITY_PROMPT_THRESHOLD` | 提示词注入检测的灵敏度阈值（越高越严格） | 0.01 到 1.0 之间的浮点数 | 0.8 | 否 |
| `SECURITY_PROMPT_CLASSIFIER_ENABLED` | 启用基于机器学习的提示词注入检测，用于高级威胁识别 | true/false | false | 否 |
| `SECURITY_PROMPT_CLASSIFIER_ENDPOINT` | 基于机器学习的提示词注入检测的分类端点 URL | URL（例如 "https://api.example.com/classify"） | 无 | 否 |
| `SECURITY_PROMPT_CLASSIFIER_TOKEN` | `SECURITY_PROMPT_CLASSIFIER_ENDPOINT` 的身份验证令牌 | 字符串 | 无 | 否 |
| `GOOSE_TELEMETRY_ENABLED` | 启用[匿名使用数据](/docs/guides/usage-data)收集 | true/false | false | 否 |

config.yaml 中也可能支持其他[环境变量](/docs/guides/environment-variables)。

## 配置示例

下面是 config.yaml 文件的基本示例：

```yaml
# Model Configuration
active_provider: anthropic
providers:
  anthropic:
    enabled: true
    model: claude-sonnet-4-5-20250929
    configured: true
GOOSE_TEMPERATURE: 0.7

# Tool Configuration
GOOSE_MODE: "smart_approve"
GOOSE_TOOLSHIM: true
GOOSE_CLI_MIN_PRIORITY: 0.2

# Recipe Configuration
GOOSE_RECIPE_GITHUB_REPO: "aaif-goose/goose-recipes"

# Documentation Configuration
GOOSE_DOCS_ROOT: "/path/to/goose-docs"

# Search Path Configuration
GOOSE_SEARCH_PATHS:
  - "/usr/local/bin"
  - "~/custom/tools"
  - "/opt/homebrew/bin"

# Security Configuration
SECURITY_PROMPT_ENABLED: true

# Extensions Configuration
extensions:
  developer:
    bundled: true
    enabled: true
    name: developer
    timeout: 300
    type: builtin
  
  memory:
    bundled: true
    enabled: true
    name: memory
    timeout: 300
    type: builtin
```

## 扩展配置

扩展在 `extensions` 键下配置。每个扩展可以有以下设置：

```yaml
extensions:
  extension_name:
    bundled: true/false       # Whether it's included with goose
    display_name: "Name"      # Human-readable name (optional)
    enabled: true/false       # Whether the extension is active
    name: "extension_name"    # Internal name
    timeout: 300              # Operation timeout in seconds
    type: "builtin"           # Extension type
    available_tools: []       # Filter to specific tools (empty = all)
```

支持的扩展类型是 `builtin`、`platform`、`stdio` 和 `streamable_http`。不支持 SSE；请把旧的 SSE 配置迁移到 `streamable_http`。

常见的扩展形态：

```yaml
extensions:
  developer:
    type: builtin
    name: developer
    enabled: true
    bundled: true
    timeout: 300

  computercontroller:
    type: platform
    name: computercontroller
    display_name: Computer Controller
    enabled: true
    bundled: true

  filesystem:
    type: stdio
    name: filesystem
    enabled: true
    cmd: npx
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"]
    env_keys: []
    envs: {}
    timeout: 300

  remote-tools:
    type: streamable_http
    name: remote-tools
    enabled: true
    uri: "https://example.com/mcp"
    headers: {}
    env_keys: []
    envs: {}
    timeout: 300
```

### 工具过滤

使用 `available_tools` 字段限制从扩展加载哪些工具。列出你想要的工具名——只有这些工具对 goose 可用。留空（默认）则加载全部工具。在你只需要扩展部分能力的会话中，这有助于减少 token 开销。

## 搜索路径配置

扩展可能需要执行外部命令或工具。goose 从任何 `GOOSE_SEARCH_PATHS` 条目、内置回退路径，然后是系统 PATH 构建命令搜索路径。你可以在配置文件中添加额外的搜索目录：

```yaml
GOOSE_SEARCH_PATHS:
  - "/usr/local/bin"
  - "~/custom/tools"
  - "/opt/homebrew/bin"
```

运行扩展命令时，这些路径会在内置回退路径和系统 PATH 之前被检查，从而在不修改全局 PATH 的情况下找到你的自定义工具。

## 可观测性配置

配置 goose 把遥测导出到兼容 [OpenTelemetry](https://opentelemetry.io/docs/) 的平台。环境变量会覆盖这些设置，并支持按信号配置等额外选项。细节见[环境变量指南](/docs/guides/environment-variables#observability-configuration)。

| 设置 | 用途 | 取值 | 默认值 |
|---------|---------|--------|---------|
| `otel_exporter_otlp_endpoint` | OTLP 端点 URL | URL（例如 `http://localhost:4318`） | 无 |
| `otel_exporter_otlp_timeout` | 导出超时（毫秒） | 整数（毫秒） | 10000 |

```yaml
otel_exporter_otlp_endpoint: "http://localhost:4318"
otel_exporter_otlp_timeout: 20000
```

## 配方命令配置
你可以选择设置[自定义斜杠命令](/docs/guides/context-engineering/slash-commands)来运行你创建的配方。列出命令（不要带前导 `/`）以及配方路径：

```yaml
slash_commands:
  - command: "run-tests"
    recipe_path: "/path/to/recipe.yaml"
  - command: "daily-standup"
    recipe_path: "/Users/me/.local/share/goose/recipes/standup.yaml"
```

## 配置优先级

设置按以下优先顺序应用：

1. 环境变量（最高优先级）
2. 配置文件设置
3. 默认值（最低优先级）

## 安全考量

:::warning 提供商 API 密钥不要放进 `config.yaml`
goose 不会从 `config.yaml` 读取提供商 API 密钥。放在那里的密钥会被忽略，通常表现为身份验证失败，例如 `No api key passed in`。把密钥存在系统密钥环中（通过 `goose configure`），或者——在使用基于文件的机密存储时——存在 `secrets.yaml` 中。也可以通过提供商的环境变量提供（例如 `OPENAI_API_KEY`），它优先于已存储的机密。
:::

- 避免在配置文件中存储敏感信息（API 密钥、令牌）
- 使用系统密钥环（macOS 上为钥匙串）存储机密。可用时，这是推荐选项。
- 如果 goose 使用基于文件的机密存储，机密会存储在单独的 `secrets.yaml` 文件中（明文）。这可能发生在：

  - 你的环境不提供桌面密钥环服务（例如：无头服务器、CI/CD、容器）
  - 你显式禁用密钥环（通过 [GOOSE_DISABLE_KEYRING](/docs/guides/environment-variables#security-and-privacy)）
  - goose 无法访问密钥环并回退到基于文件的机密存储

  关于密钥环失败和自动回退行为的排查，见[已知问题](/docs/troubleshooting/known-issues#keyring-cannot-be-accessed-automatic-fallback)。

## 更新配置

直接编辑配置文件通常需要重启 goose，才能对现有会话生效。通过设置进行的 goose2 提供商凭据/配置保存会使用 ACP/核心来更新存储并刷新提供商清单，而无需重启应用，但当前活动的聊天会话会继续使用它们启动时的提供商实例。你可以用以下命令验证当前配置：

```bash
goose info -v
```

这会显示所有活动设置及其当前值。

## 另见

- **[多模型配置](/docs/guides/multi-model/)** - 多种模型选择策略
- **[环境变量](./environment-variables.md)** - 环境变量配置
- **[使用扩展](/docs/getting-started/using-extensions)** - 扩展配置的更多细节
