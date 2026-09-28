---
sidebar_position: 7
title: CLI 命令
sidebar_label: CLI 命令
toc_max_heading_level: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

goose 提供命令行界面（CLI），包含管理会话、配置和扩展的命令。本指南涵盖主要 CLI 命令和交互式会话功能。

## 标志命名约定

goose CLI 对标志命名遵循一致的模式，使命令直观且可预测：

- **`--session-id`**：用于会话标识符（例如 `20251108_1`）
- **`--schedule-id`**：用于调度作业标识符（例如 `daily-report`）
- **`-n, --name`**：用于人类可读的名称
- **`--path`**：用于文件路径（遗留支持）
- **`-o, --output`**：用于输出文件路径
- **`-r, --resume` 或 `-r, --regex`**：取决于上下文（会话用 resume，过滤器用 regex）
- **`-v, --verbose`**：用于详细输出
- **`-l, --limit`**：用于限制结果数量
- **`-f, --format`**：用于指定输出格式
- **`-w, --working_dir`**：用于工作目录过滤器

### 核心命令

#### help
显示帮助菜单。

**用法：**
```bash
goose --help
```

---

#### configure
配置 goose 设置——提供商、扩展等。

**用法：**
```bash
goose configure
```

:::tip 输入以过滤
在 `goose configure` 的菜单中选择时，开始输入即可实时过滤选项。这适用于提供商、扩展和工具列表。
:::

---

#### info [options]
显示 goose 信息，包括版本、配置文件位置、会话存储和日志。

**选项：**
- **`-v, --verbose`**：显示详细配置设置，包括环境变量和已启用的扩展

**用法：**
```bash
goose info
```

---

#### version
检查你已安装的当前 goose 版本。

**用法：**
```bash
goose --version
```

---

#### update [options]
把 goose CLI 更新到较新版本。

**选项：**
- **`--canary, -c`**：更新到 canary（开发）版本，而不是稳定版本
- **`--reconfigure, -r`**：强制 goose 在更新过程中重置配置设置

**用法：**
```bash
# Update to latest stable version
goose update

# Update to latest canary version
goose update --canary

# Update and reconfigure settings
goose update --reconfigure
```

---

#### completion
生成特定 shell 的脚本，以启用 goose 命令、子命令和选项的 Tab 补全。脚本打印到 stdout，因此你需要把它重定向到适合你 shell 的位置，然后重新加载或 source 你的 shell 配置。

安装后，你可以：
- 按 Tab 查看可用命令和子命令
- 自动补全命令名称和标志
- 无需查看 `--help` 即可发现选项

**参数：**
- **`<SHELL>`**：要为其生成补全的 shell。支持的 shell：`bash`、`elvish`、`fish`、`nu`、`powershell`、`zsh`

**用法：**
```bash
# Generate completion script for your shell (outputs to stdout)
goose completion bash
goose completion zsh
goose completion fish
goose completion nu
```

**按 shell 安装：**

<Tabs groupId="shells">
<TabItem value="zsh" label="Zsh" default>

把这一行添加到你的 `~/.zshrc`：

```bash
eval "$(goose completion zsh)"
```

然后重新加载 shell：
```bash
source ~/.zshrc
```

</TabItem>
<TabItem value="bash" label="Bash">

把这一行添加到你的 `~/.bashrc` 或 `~/.bash_profile`：

```bash
eval "$(goose completion bash)"
```

然后重新加载 shell：
```bash
source ~/.bashrc
```

</TabItem>
<TabItem value="fish" label="Fish">

```bash
goose completion fish > ~/.config/fish/completions/goose.fish
```

然后重启终端或运行 `exec fish`。

</TabItem>
<TabItem value="nu" label="Nushell">

```nu
let autoload_dir = ($nu.user-autoload-dirs | first)
mkdir $autoload_dir
goose completion nu | save --force ($autoload_dir | path join "goose.nu")
```

然后重启 Nushell 或运行：
```nu
source (($nu.user-autoload-dirs | first) | path join "goose.nu")
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

把这一行添加到你的 PowerShell 配置文件：

```powershell
goose completion powershell | Out-String | Invoke-Expression
```

然后重新加载配置文件：
```powershell
. $PROFILE
```

</TabItem>
</Tabs>

:::tip 测试
安装并重新加载 shell 后，输入 `goose ` 并按 Tab 查看可用命令，或输入 `goose session --` 并按 Tab 查看可用选项，以测试补全。
:::

---

### 会话管理

:::info 会话存储迁移
从版本 1.10.0 开始，goose 使用 SQLite 数据库（`sessions.db`）而不是单独的 `.jsonl` 文件。
你现有的会话会自动导入数据库。旧的 `.jsonl` 文件仍留在磁盘上，但不再由 goose 管理。
:::

#### session [options]
开始或恢复交互式聊天会话。

**基本选项：**
- **`--session-id <session_id>`**：按 ID 指定会话（例如 ‘20251108_1’）
- **`-n, --name <name>`**：给会话一个名称
- **`--path <path>`**：按文件路径指定会话的遗留参数
- **`-r, --resume`**：恢复先前的会话
- **`--edit`**：在编辑器（`$VISUAL` / `$EDITOR` / `vi`）中以 YAML 打开会话对话。编辑、修剪或改写消息，然后保存并关闭，以用编辑后的对话继续会话。必须与 `--resume` 一起使用。可以与 `--fork` 组合，从编辑结果创建新会话。
- **`--fork`**：创建带有复制历史的新重复会话。必须与 `--resume` 一起使用。提供 `--name` 或 `--session-id` 以分叉特定会话。否则分叉最近的会话。
- **`--history`**：恢复会话时显示先前消息
- **`--container <container_id>`**：在 [Docker 容器](/docs/tutorials/goose-in-docker#running-extensions-in-docker-containers)内运行扩展。
- **`--debug`**：启用调试模式以输出完整工具响应、详细参数值和完整文件路径
- **`--max-tool-repetitions <NUMBER>`**：设置同一工具可以用相同参数连续调用的最大次数。有助于防止无限循环。
- **`--max-turns <NUMBER>`**：设置没有用户输入时允许的最大轮次数（默认：1000）

**扩展选项：**
- **`--with-extension <command>`**：添加 stdio 扩展。格式：`[name:]ENV1=val1 command args...`。没有可选的 `name:` 时，扩展以命令命名——对于通过启动器启动的任何东西（`npx`、`python -m ...`、`uvx`），这是启动器而不是服务器。该名称会作为服务器暴露的每个工具的前缀（`npx__search`），由同一启动器启动的扩展否则会冲突，因此 goose 改为用完整命令行为冲突的扩展命名。给出显式名称来控制它：`--with-extension "memory:npx -y @modelcontextprotocol/server-memory"` 暴露 `memory__search`。
- **`--with-streamable-http-extension <url>`**：通过 Streamable HTTP 添加远程扩展
- **`--with-builtin <id>`**：启用内置扩展（例如 ‘developer’、‘computercontroller’）

**用法：**
```bash
# Start a basic session
goose session -n my-project

# Resume a previous session
goose session --resume -n my-project
goose session --resume --session-id 20251108_2
goose session --resume --path ./session.json    # exported session
goose session --resume --path ./session.jsonl   # legacy session storage

# Fork a specific session by name
goose session --resume --fork --name my-project

# Fork the most recent session and show message history
goose session --resume --fork --history

# Edit a session's conversation in your editor
goose session --resume --session-id 20251108_2 --edit

# Edit and fork — create a new session from the edited conversation
goose session --resume --session-id 20251108_2 --fork --edit --history

# Start with extensions
goose session --with-extension "npx -y @modelcontextprotocol/server-memory"

# Name an extension explicitly (tools become memory__*, not npx__*)
goose session --with-extension "memory:npx -y @modelcontextprotocol/server-memory"
goose session --with-builtin developer
goose session --with-streamable-http-extension "http://localhost:8080/mcp"

# Advanced: Mix multiple extension types
goose session \
  --with-extension "echo hello" \
  --with-streamable-http-extension "http://localhost:8080/mcp" \
  --with-builtin "developer"

# Control session behavior
goose session -n my-session --debug --max-turns 25
```

---

#### session list [options]
列出所有已保存的会话。

**选项：**
- **`-f, --format <format>`**：指定输出格式（`text` 或 `json`）。默认为 `text`
- **`--ascending`**：按日期升序排序会话（最旧的在前）
- **`-w, --working_dir <path>`**：按工作目录过滤会话
- **`-l, --limit <number>`**：限制结果数量

**用法：**
```bash
# List all sessions in text format (default)
goose session list

# List sessions in JSON format
goose session list --format json

# Sort sessions by date in ascending order
goose session list --ascending

# Filter sessions by working directory
goose session list -w ~/projects/myapp

# List only the 10 most recent sessions
goose session list --limit 10
```

---

#### session remove [options]
移除一个或多个已保存的会话。

**选项：**
- **`--session-id <session_id>`**：按会话 ID 移除特定会话
- **`-n, --name <name>`**：按名称移除特定会话
- **`-r, --regex <pattern>`**：移除匹配正则模式的会话
- **`--path <path>`**：按文件路径移除特定会话（遗留）

**用法：**
```bash
# Interactive removal (prompts you to choose sessions)
goose session remove

# Remove a specific session by ID
goose session remove --session-id 20251108_3

# Remove a specific session by name
goose session remove -n my-project

# Remove all sessions starting with "project-"
goose session remove -r "project-.*"

# Remove all sessions containing "migration"
goose session remove -r ".*migration.*"
```

:::caution
会话移除是永久的，无法撤销。goose 会显示哪些会话将被移除，并在删除前请求确认。
:::

---

#### session export [options]
以不同格式导出会话，用于备份、分享、迁移或文档目的。

**选项：**
- **`--session-id <session_id>`**：按 ID 导出特定会话
- **`-n, --name <name>`**：按名称导出特定会话
- **`--path <path>`**：按文件路径导出特定会话（遗留）
- **`-o, --output <file>`**：把导出内容保存到文件（默认：stdout）
- **`--format <format>`**：输出格式：`markdown`、`json`、`yaml`。默认为 `markdown`

**导出格式：**
- **`json`**：完整会话备份，保留全部数据，包括对话历史、元数据和设置
- **`yaml`**：YAML 格式的完整会话备份
- **`markdown`**：默认格式，创建格式化、可读的对话版本，用于文档和分享

**用法：**
```bash
# Interactive export
goose session export

# Export specific session as JSON for backup
goose session export -n my-session --format json -o session-backup.json

# Export specific session as readable markdown
goose session export -n my-session -o session.md

# Export to stdout in different formats
goose session export --session-id 20251108_4 --format json
goose session export -n my-session --format yaml

# Export session by path (legacy)
goose session export --path ./my-session.jsonl -o exported.md
```

---

#### session diagnostics [options]
为特定会话生成全面的诊断 JSON 报告，以排查问题。

**选项：**
- **`--session-id <session_id>`**：按 ID 为特定会话生成诊断
- **`-n, --name <name>`**：按名称为特定会话生成诊断
- **`--path <path>`**：按文件路径为特定会话生成诊断（遗留）
- **`-o, --output <file>`**：把诊断报告保存到特定文件路径（默认：`diagnostics_{session_id}.json`）

**包含的内容：**
- **系统信息**：应用版本、操作系统、架构和时间戳
- **会话数据**：指定会话的完整对话消息和历史
- **配置文件**：你的[配置文件](/docs/guides/config-files)（如果存在）
- **日志文件**：用于调试的近期应用日志

**用法：**
```bash
# Generate diagnostics for a specific session by ID
goose session diagnostics --session-id 20251108_5

# Generate diagnostics for a session by name
goose session diagnostics -n my-project-session

# Save diagnostics to a custom location
goose session diagnostics --session-id 20251108_5 -o /path/to/my-diagnostics.json

# Interactive selection (prompts you to choose a session)
goose session diagnostics
```

:::warning 隐私提示
诊断报告包含你的会话消息和系统信息。如果会话包含敏感数据（API 密钥、个人信息、专有代码），在公开分享前请审查内容。
:::

:::tip
在报告缺陷之前生成诊断，以提供有助于更快解决的技术细节。JSON 文件可以附加到 GitHub issue 或与支持人员分享。
:::

---

### 任务执行

#### run [options]
从指令文件或 stdin 执行命令。更多信息见[完整指南](/docs/guides/running-tasks)。

**输入选项：**
- **`-i, --instructions <FILE>`**：包含命令的指令文件路径。用 `-` 表示 stdin
- **`-t, --text <TEXT>`**：直接提供给 goose 的输入文本
- **`--system <TEXT>`**：提供额外系统指令以自定义代理行为
- **`--recipe <RECIPE_FILE_NAME> <OPTIONS>`**：在当前会话中加载自定义配方
- **`--params <KEY=VALUE>`**：传给配方文件的键值参数。可以指定多次
- **`--sub-recipe <RECIPE>`**：指定要与主配方一起包含的子配方。可以指定多次

**会话选项：**
- **`-s, --interactive`**：处理初始输入后继续进入交互模式
- **`-n, --name <name>`**：此次运行会话的名称（例如 `daily-tasks`）
- **`-r, --resume`**：从先前的运行恢复
- **`--path <PATH>`**：此次运行会话的路径（例如 `./playground.jsonl`）。用于遗留的基于文件的会话存储。
- **`--container <container_id>`**：在 [Docker 容器内](/docs/tutorials/goose-in-docker#running-extensions-in-docker-containers)运行扩展。
- **`--no-session`**：运行 goose 命令而不创建或存储会话文件

**扩展选项：**
- **`--with-extension <COMMAND>`**：添加 stdio 扩展（可多次使用）
- **`--with-streamable-http-extension <URL>`**：通过 Streamable HTTP 添加远程扩展（可多次使用）
- **`--with-builtin <name>`**：按名称添加内置扩展（例如 ‘developer’，或多个：‘developer,github’）

**控制选项：**
- **`--debug`**：输出完整工具响应、详细参数值和完整文件路径
- **`--max-tool-repetitions <NUMBER>`**：同一工具可以用相同参数连续调用的最大次数。有助于防止无限循环
- **`--max-turns <NUMBER>`**：没有用户输入时允许的最大轮次数（默认：1000）
- **`--explain`**：显示配方的标题、描述和参数
- **`--render-recipe`**：打印渲染后的配方而不是运行它
- **`-q, --quiet`**：安静模式。抑制非响应输出，只把模型响应打印到 stdout
- **`--output-format <FORMAT>`**：输出格式（`text`、`json` 或 `stream-json`）。默认为 `text`。对自动化和脚本使用 JSON 结构化输出：`json` 用于完成后的结果，`stream-json` 用于事件发生时
- **`--provider`**：指定此会话使用的提供商（覆盖环境变量）
- **`--model`**：指定此会话使用的模型（覆盖环境变量）

**用法：**
```bash
# Run from instruction file
goose run --instructions plan.md

# Load a recipe with a prompt that goose executes and then exits  
goose run --recipe recipe.yaml

# Load a recipe and stay in an interactive session
goose run --recipe recipe.yaml --interactive

# Load a recipe in debug mode
goose run --recipe recipe.yaml --debug

# Show recipe details
goose run --recipe recipe.yaml --explain

# Run a recipe with parameters
goose run --recipe recipe.yaml --params environment=production --params region=us-west-2

# Run instructions from a file without session storage
goose run --no-session -i instructions.txt

# Run with a specified provider and model
goose run --provider anthropic --model claude-4-sonnet -t "initial prompt"

# Run with limited turns before prompting user
goose run --recipe recipe.yaml --max-turns 10
```

---

#### review [options] [range]
使用 goose 审查当前 git diff。默认情况下，`goose review` 对照 `HEAD` 审查工作树；传入 `main...HEAD` 这样的范围以审查特定 diff。

`goose review` 可以从 `.agents/checks/*.md` 发现审查检查，并从 `.agents/REVIEW.md` 发现限定范围的审查指令。

**选项：**
- **`--prompt <FILE>`**：使用自定义基础审查提示
- **`--model <MODEL>`**：为主审查代理和未声明自己模型的检查设置默认模型
- **`--provider <PROVIDER>`**：为主审查代理设置提供商
- **`--override-model <MODEL>`**：强制每个已发现的检查使用此模型
- **`--turn-limit <N>`**：为编排的审查子进程和检查设置默认轮次限制
- **`--dry-run`**：打印组装好的审查提示和已发现的检查，而不运行审查
- **`-q, --quiet`**：抑制底层代理的非结果输出
- **`--no-orchestrate`**：禁用默认的 Rust 驱动并行编排器，并使用单提示路径。声明 `tools` 的检查会被拒绝，因为此路径无法强制每个检查的工具允许列表。
- **`-i, --instructions <TEXT>`**：添加自由形式的审查指令
- **`-f, --files <FILE>...`**：把审查限制到特定文件
- **`-c, --check-filter <NAME>...`**：只运行名称匹配的检查
- **`-s, --check-scope <DIR>`**：在特定目录中搜索 `.agents/checks/*.md`
- **`--checks-only`**：跳过主正确性检查，只运行检查子代理
- **`--summary-only`**：只打印 diff 摘要
- **`--severity <LEVEL>`**：要显示的最低严重程度。默认为 `medium`；用 `low` 显示每个发现

**用法：**
```bash
# Review the working tree against HEAD
goose review

# Review a branch range
goose review main...HEAD

# Add review intent
goose review --instructions "This is a refactor; flag behavior changes"

# Review only selected files
goose review --files crates/goose/src/agents/agent.rs documentation/docs/guides/goose-cli-commands.md

# Preview the assembled prompt and discovered checks
goose review --dry-run

# Run only named checks
goose review --check-filter security performance --checks-only
```

---

#### recipe
用于验证配方文件、管理配方分享、列出可用配方，以及在 goose 桌面版中打开配方。

**命令：**
- **`deeplink <RECIPE_NAME>`**：为配方文件生成可分享链接
  - **`-p, --param <KEY=VALUE>`**：预填配方参数（可以指定多次）
- **`list [OPTIONS]`**：列出来自本地目录和已配置 GitHub 仓库的所有可用配方
  - **`--format <FORMAT>`**：输出格式（`text` 或 `json`）。默认为 `text`
  - **`-v, --verbose`**：显示详细信息，包括配方标题和完整文件路径
- **`open <RECIPE_NAME>`**：直接在 goose 桌面版中打开配方文件
  - **`-p, --param <KEY=VALUE>`**：预填配方参数（可以指定多次）
- **`validate <RECIPE_NAME>`**：验证配方文件

**用法：**
```bash
# Generate a shareable link
goose recipe deeplink my-recipe.yaml

# Generate a deeplink and provide parameter values
goose recipe deeplink my-recipe.yaml -p environment=production -p region=us-west-2

# List all available recipes
goose recipe list

# List recipes with detailed information
goose recipe list --verbose

# List recipes in JSON format for automation
goose recipe list --format json

# Open a recipe in goose desktop
goose recipe open my-recipe.yaml

# Open a recipe by name
goose recipe open my-recipe

# Open a recipe and provide parameter value
goose recipe open my-recipe --param name=myproject

# Validate a recipe file
goose recipe validate my-recipe.yaml

# Get help about recipe commands
goose recipe help
```

---

#### plugin
安装和更新提供技能或其他 Open Plugins 组件的 git 支持插件。

**命令：**
- **`install [OPTIONS] <URL>`**：从 git 仓库 URL 安装插件
  - **`--auto-update`**：在加载插件技能之前自动检查更新
- **`update <NAME>`**：按名称更新已安装的 git 支持插件

**用法：**
```bash
# Install a plugin from a git repository
goose plugin install https://github.com/example/my-goose-plugin.git

# Install a plugin and enable automatic update checks
goose plugin install --auto-update https://github.com/example/my-goose-plugin.git

# Update an installed plugin manually
goose plugin update my-plugin
```

已安装的插件存储在 `~/.agents/plugins/<plugin-name>/` 下。关于插件提供的技能、钩子和更新行为的更多内容，见[插件指南](/docs/guides/context-engineering/plugins)。

---

#### skills
列出 goose 代理可用的技能。

**命令：**
- **`list`**：列出已安装和可发现的技能，包括 token 计数和来源位置

**用法：**
```bash
goose skills list
```

---

#### local-models
搜索、下载、列出和删除本地推理模型。

:::info
此命令在包含本地推理支持的 goose 构建中可用。
:::

**命令：**
- **`search <QUERY>`**：在 Hugging Face 上搜索兼容的 GGUF 和 MLX 模型
  - **`-l, --limit <NUMBER>`**：要显示的最大结果数。默认为 `10`
- **`download <SPEC>`**：从搜索结果下载并注册模型，例如 `user/repo:Q4_K_M`
- **`list`**：列出已下载的本地模型
- **`delete <ID>`**：删除已下载的本地模型

**别名：** `lm`

**用法：**
```bash
# Search for local models
goose local-models search qwen --limit 5

# Download a model from a search result
goose local-models download 'user/repo:Q4_K_M'

# List downloaded models
goose local-models list

# Delete a downloaded model
goose local-models delete user/repo:Q4_K_M
```

---

#### schedule
通过按[计划](/docs/guides/recipes/session-recipes#schedule-recipe)运行来自动化配方。

**命令：**
- `add <OPTIONS>`：创建新的调度作业。把配方的当前版本复制到 `~/.local/share/goose/scheduled_recipes`
- `list`：查看所有调度作业
- `remove`：删除调度作业
- `sessions`：列出由已调度配方创建的会话
- `run-now`：立即运行已调度的配方
- `cron-help`：显示 cron 表达式示例和帮助

**选项：**
- `--schedule-id <NAME>`：调度作业的唯一 ID（例如 `daily-report`）
- `--cron "* * * * * *"`：使用 [cron 表达式](https://en.wikipedia.org/wiki/Cron#Cron_expression)指定作业应何时运行
- `--recipe-source <PATH>`：配方 YAML 文件的路径
- `-l, --limit <NUMBER>`：使用 `sessions` 命令时要显示的最大会话数

**用法：**
```bash
goose schedule <COMMAND>

# Add a new scheduled recipe which runs every day at 9 AM
goose schedule add --schedule-id daily-report --cron "0 0 9 * * *" --recipe-source ./recipes/daily-report.yaml

# List all scheduled jobs
goose schedule list

# List the 10 most recent goose sessions created by a scheduled job
goose schedule sessions --schedule-id daily-report -l 10

# Run a recipe immediately
goose schedule run-now --schedule-id daily-report

# Remove a scheduled job
goose schedule remove --schedule-id daily-report
```

---

#### mcp
运行由 `<name>` 指定的已启用 MCP 服务器（例如 `'Google Drive'`）。

**用法：**
```bash
goose mcp <name>
```

---

#### acp
通过 stdio 把 goose 作为 Agent Client Protocol (ACP) 代理服务器运行。这使 goose 能够与 Zed 等兼容 ACP 的客户端一起工作。

ACP 是一项新兴协议规范，标准化 AI 代理与客户端应用之间的通信，使客户端更容易与各种 AI 代理集成。

**选项：**
- **`--enable-scheduler`**：启用已调度配方的执行。默认禁用。

**用法：**
```bash
goose acp
```

:::info
此命令由兼容 ACP 的客户端自动调用，通常不由用户直接运行。客户端管理 `goose acp` 进程的生命周期。细节见[在 ACP 客户端中使用 goose](/docs/gdk/acp)。
:::

---

#### serve [options]
通过 HTTP 和 WebSocket 把 goose 作为 Agent Client Protocol (ACP) 服务器启动。

**选项：**
- **`--host <HOST>`**：要绑定的主机。默认为 `127.0.0.1`
- **`--port <PORT>`**：要监听的端口。默认为 `3284`
- **`--with-builtin <NAME>`**：按名称启用内置扩展。可以多次传递，或作为逗号分隔列表。省略时默认为 `developer`。
- **`--dangerously-unauthenticated`**：在没有 ACP 认证的情况下运行。仅用于本地可信客户端。
- **`--enable-scheduler`**：启用已调度配方的执行。默认禁用。

**用法：**
```bash
# Set a secret before starting the server
export GOOSE_SERVER__SECRET_KEY=$(openssl rand -hex 32)

# Start the ACP server on localhost:3284
goose serve

# Bind to a different host and port
goose serve --host 0.0.0.0 --port 3284

# Start with specific built-in extensions
goose serve --with-builtin developer,memory
```

:::warning
除非你传递 `--dangerously-unauthenticated`，否则 `goose serve` 需要 `GOOSE_SERVER__SECRET_KEY`。仅对本地可信客户端使用 `--dangerously-unauthenticated`。
:::

---

### 终端集成

#### term
设置并使用终端集成会话。终端集成为每个 shell 通过 `AGENT_SESSION_ID` 提供持久的 goose 会话，并可以创建 `@goose` 和 `@g` 别名。

**命令：**
- **`init <SHELL>`** - 为 `bash`、`zsh`、`fish`、`nu` 或 `powershell` 打印 shell 集成脚本
- **`run <PROMPT...>`** - 向终端集成会话发送提示
- **`info`** - 打印用于 shell 提示集成的紧凑会话信息

**选项：**
- **`-n, --name <NAME>`** - 运行 `init` 时设置终端会话名称
- **`--default`** - 在受支持的 shell 中请 goose 处理未知命令

**用法：**
```bash
# Set up zsh integration
eval "$(goose term init zsh)"

# Set up zsh integration and ask goose about unknown commands
eval "$(goose term init zsh --default)"

# Set up nushell integration
let init = ($nu.cache-dir | path join "goose-term-init.nu")
goose term init nu | save --force $init
source $init

# Send a prompt to the current terminal session
goose term run why did the last command fail

# Print session info for prompt integration
goose term info
```

---

#### @goose / @g
直接从 shell 提示向 goose 提问，命令历史包含在上下文中。设置[终端集成](/docs/guides/terminal-integration)时，这些别名由 `goose term init` 创建。

**示例：**
```bash
# Ask questions with command history context
@goose create a python script to process these files
@goose create a PR description summarizing these changes
@g how do I fix these permission denied errors?
```

---

## 交互式会话功能

### 斜杠命令

一旦你进入交互式会话（通过 `goose session` 或 `goose run --interactive`），就可以使用这些斜杠命令。所有命令都支持 Tab 补全。按 `/ + <Tab>` 循环浏览可用命令。

**可用命令：**
- **`/?` 或 `/help`** - 显示帮助菜单
- **`/builtin <names>`** - 按名称添加内置扩展（逗号分隔）
- **`/clear`** - 清除当前聊天历史
- **`/exit` 或 `/quit`** - 退出会话
- **`/extension <command>`** - 添加 stdio 扩展（格式：ENV1=val1 command args...）
- **`/mode <name>`** - 设置要使用的 goose 模式（‘auto’、‘approve’、‘chat’、‘smart_approve’）
- **`/model [name]`** - 显示当前模型，或为此会话切换模型同时保持同一提供商
- **`/model --provider <name> [model]`** - 切换到不同提供商，可选地指定模型
- **`/prompt <n> [--info] [key=value...]`** - 获取提示信息或执行提示
- **`/prompts [--extension <name>]`** - 列出所有可用提示，可选按扩展过滤
- **`/compact`** - 压缩并摘要当前对话，以在保留关键信息的同时减小上下文长度
- **`/r`** - 切换完整工具输出显示（显示完整工具参数而不截断）
- **`/skills [<name>...]`** - 列出可用技能，或按名称加载一个或多个技能
- **`/t`** - 在 `light`、`dark` 和 `ansi` 主题之间切换。[更多信息](#themes)。
- **`/t <name>`** - 直接设置主题（light、dark、ansi）

**示例：**
```bash
# List all prompts from the developer extension
/prompts --extension developer

# Switch to chat mode
/mode chat

# Add a builtin extension during the session
/builtin developer

# Clear the current conversation history
/clear
```
你也可以在 goose 桌面版或 CLI 中创建[用于运行配方的自定义斜杠命令](/docs/guides/context-engineering/slash-commands)。

---

### 主题

`/t` 命令控制 goose CLI 响应中 markdown 内容的语法高亮主题。这影响响应输出中标题、代码块、粗体/斜体文本和其他 markdown 元素使用的样式。

**命令：**
- `/t` - 循环主题：`light` → `dark` → `ansi` → `light`
- `/t light` - 设置 `light` 主题（柔和的浅色）
- `/t dark` - 设置 `dark` 主题（柔和的较深颜色）
- `/t ansi` - 设置 `ansi` 主题（颜色更亮、视觉上最鲜明的选项）

**配置：**
- 默认主题是 `dark`
- 主题设置作为 `GOOSE_CLI_THEME` 保存到[配置文件](/docs/guides/config-files)，并在会话之间持久
- 已保存的配置可以在会话中用 `GOOSE_CLI_THEME` [环境变量](/docs/guides/environment-variables#session-management)覆盖

**自定义语法高亮：**

你可以通过设置以下变量来自定义代码块使用的底层语法高亮主题：
- `GOOSE_CLI_LIGHT_THEME` - 浅色模式使用的主题（默认：“GitHub”）
- `GOOSE_CLI_DARK_THEME` - 深色模式使用的主题（默认：“zenburn”）

这些接受任何 [bat 主题名称](https://github.com/sharkdp/bat#adding-new-themes)。流行选项包括 “Dracula”、“Nord”、“Solarized (light)”、“Solarized (dark)”、“OneHalfDark” 和 “Monokai Extended”。运行 `bat --list-themes` 查看所有可用主题。

:::info
语法高亮样式只影响字体，不影响整体终端界面。`light` 和 `dark` 主题在字体颜色和粗细上有细微差异。

goose CLI 主题独立于 goose 桌面版主题。
:::

**示例：**
```bash
# Set ANSI theme for the session via environment variable
export GOOSE_CLI_THEME=ansi
goose session --name use-custom-theme

# Toggle theme during a session
/t

# Set the light theme during a session
/t light
```

---

## 导航与控件

### 键盘快捷键

**会话控制：**
- **`Ctrl+C`** - 如果已输入文本则清除当前行，如果正在处理则中断当前请求，如果行为空则退出会话
- **`Ctrl+J`** - 添加换行。可以通过[配置文件](/docs/guides/config-files)中的 `GOOSE_CLI_NEWLINE_KEY`（例如 `GOOSE_CLI_NEWLINE_KEY: n`）或[环境变量](/docs/guides/environment-variables#session-management)自定义字符。避免 “c” 以及 “r”、“w”、“z” 等常见终端快捷键。

**导航：**
- **`Cmd+Up/Down arrows`** - 在命令历史中导航
- **`Ctrl+R`** - 交互式命令历史搜索（反向搜索）。[更多信息](#command-history-search)。

---

### 外部编辑器模式

要撰写较长的提示或处理复杂代码片段，你可以配置 goose 使用你喜欢的文本编辑器，而不是 CLI 输入。这会在整个会话中替换标准 CLI 输入和键盘快捷键。

**工作原理：**
1. goose 用模板文件打开你配置的编辑器
2. 在 `# Your prompt:` 标题之后输入你的提示（下方显示对话历史作为上下文）
3. 保存文件并关闭/退出编辑器，把提示发送给 goose
4. goose 处理你的提示，并重新打开编辑器，把响应添加到对话历史
5. 对对话中的每条消息重复步骤 2-4

你可以使用任何接受文件路径参数的编辑器，例如 vim、nano、emacs 和 VS Code。

**配置：**

<Tabs>
  <TabItem value="envvar" label="Environment Variable" default>

  仅适用于当前会话。

  ```bash
  # For terminal editors like vim or nano
  export GOOSE_PROMPT_EDITOR=vim

  # Or for GUI editors like VS Code (use --wait flag)
  export GOOSE_PROMPT_EDITOR="code --wait"
  ```

  </TabItem>
  <TabItem value="config" label="Config File">

  在所有会话中持久，除非被环境变量覆盖。
  
  1. 前往 goose [配置文件](/docs/guides/config-files)。例如，在 macOS 上前往 `~/.config/goose/config.yaml`。
  2. 添加 `GOOSE_PROMPT_EDITOR` 并把它设为你喜欢的编辑器：
  
  ```yaml
  # For terminal editors like vim or nano
  GOOSE_PROMPT_EDITOR: vim

  # Or for GUI editors like VS Code (use --wait flag)
  GOOSE_PROMPT_EDITOR: code --wait
  ```

  </TabItem>
</Tabs>

**使用 GUI 编辑器：**

GUI 编辑器需要 `--wait` 或等效标志，以确保 goose 等待你完成编辑后再继续。没有此标志时，编辑器会打开，但 goose 会立即当作你已完成而继续。vim 和 nano 等终端编辑器不需要此标志。

---

### 命令历史搜索

`Ctrl+R` 快捷键提供对已存储 CLI [命令历史](/docs/guides/logs#command-history)的交互式搜索。此功能让你无需重新输入即可轻松查找并复用近期命令。当你输入搜索词时，goose 会在历史中向后搜索匹配项。

**工作原理：**
1. 在 goose CLI 会话中按 `Ctrl+R`
2. 输入搜索词
3. 使用以下方式浏览结果：
   - `Ctrl+R` 向后循环较早的匹配
   - `Ctrl+S` 向前循环较新的匹配
4. 按 `Return`（或 `Enter`）运行找到的命令，或按 `Esc` 取消

例如，不必重新输入这条长命令：

```
analyze the performance issues in the sales database queries and suggest optimizations
```

使用 `"sales database"` 或 `"optimization"` 搜索词来找到并重新运行它。

**搜索提示：**
- **独特的词效果最好**：选择独特的词或短语以帮助过滤结果
- **支持部分匹配和多个词**：你可以搜索 `"gith"` 和 `"run the unit test"` 这样的短语
