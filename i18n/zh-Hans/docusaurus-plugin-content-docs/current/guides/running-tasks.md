---
sidebar_position: 75
title: 运行任务
sidebar_label: 运行任务
---

使用 goose CLI 时，可以把文件和指令传给 `goose run` 命令来执行任务和工作流。这可以是一条简单的一行命令，也可以是保存在文件中的一组复杂指令。

## 基本用法

`goose run` 命令会开始一个新会话，使用所提供的参数开始执行，并在任务完成后自动退出会话。

用 goose 运行任务有多种方式；请查看[选项列表](/docs/guides/goose-cli-commands#run-options)。

### 命令中的文本
```bash
goose run -t "your instructions here"
```

使用 `-t` 标志可以把文本指令直接传给命令。这适合快速、一次性的命令，此时不需要与 goose 进行交互式会话。指令会被执行，然后会话结束。例如可以用于 CI/CD 流水线，或与其他脚本一起运行。

### 使用指令文件
如果有一组复杂指令或想要自动化的工作流，可以把它们存在文件里，再传给 `goose run` 命令：

```bash
goose run -i instructions.md
```

下面是一个对项目依赖做安全审计的指令文件示例：

```md
# Dependency Security Audit

1. Analyze project dependencies:
   - Check package.json and requirements.txt files
   - List all dependencies with versions
   - Identify outdated packages

2. Security check:
   - Run npm audit (for JavaScript packages)
   - Check for known vulnerabilities in Python packages
   - Identify dependencies with critical security issues

3. Create an upgrade plan:
   - List packages requiring immediate updates
   - Note breaking changes in latest versions
   - Estimate impact of required updates

Save findings in 'security_audit.md' with severity levels highlighted.
```

### 使用标准输入
也可以通过 `-i -` 用标准输入把指令传给 goose。当你想把另一个工具或脚本的命令通过管道送入 goose 时，这很有用。

#### 简单的 echo 管道

```bash
echo "What is 2+2?" | goose run -i -
```

#### 多行指令
```bash
cat << EOF | goose run -i -
Please help me with these tasks:
1. Calculate 15% of 85
2. Convert 32°C to Fahrenheit
EOF
```

## 主要功能

### 交互模式

如果不希望 goose 在任务结束时退出，可以传入 `-s` 或 `--interactive` 标志，在处理完初始命令后进入交互式会话：

```bash
goose run -i instructions.txt -s
```

当你希望在初始命令处理完之后继续与 goose 协作时，这很有用。

### 会话管理

你可以为会话命名并管理它们：

```bash
# Start a new named session
goose run -n my-project -t "initial instructions"

# Resume a previous session
goose run -n my-project -r
```

也可以使用 `--no-session` 标志运行命令，而不创建或保存会话文件。这适合自动化脚本，或一次性任务，此时不需要保留对话历史或状态。该标志会把会话输出路由到临时的空路径（Unix 上为 `/dev/null`，Windows 上为 `NUL`），完成后丢弃。

```bash
# Run a command without creating a session file
goose run --no-session -t "your command here"
```
### 设置提供商和模型
可以用特定的提供商和模型运行 goose 会话，这会覆盖[环境变量](/docs/guides/environment-variables)中的提供商和模型设置。

```bash
goose run --provider anthropic --model claude-4-sonnet -t "initial prompt"
```

### 使用扩展

如果希望运行任务时确保特定扩展可用，可以用参数指明。可以使用 `--with-extension`、`--with-remote-extension`、`--with-streamable-http-extension` 或 `--with-builtin` 标志：

- 使用内置扩展，例如 developer 和 computercontroller 扩展

```bash
goose run --with-builtin "developer,computercontroller" -t "your instructions"
```

- 使用自定义扩展

```bash
goose run --with-extension "ENV1=value1 custom-extension-args" -t "your instructions"
```

- 使用可流式 HTTP 扩展

```bash
goose run --with-streamable-http-extension "https://example.com/streamable" -t "your instructions"
```

### 调试模式

排查问题或开发复杂工作流时，可以启用调试模式，获取关于工具执行的更详细信息。`--debug` 标志会提供：

- 完整的工具响应
- 详细的参数值
- 完整文件路径

调试模式在以下情况有用：
- 开发新的自动化脚本
- 排查扩展行为
- 核对工具参数和响应

```bash
# Run a task with debug output enabled
goose run --debug -t "your instructions"

# Debug a recipe execution
goose run --debug --recipe recipe.yaml
```

### JSON 输出格式

为了自动化、脚本和 CI/CD 集成，可以用 `--output-format` 标志从 `goose run` 获得结构化输出：

- `json` - 执行结束后的完整 JSON 输出（适合 CI 流水线、日志）
- `stream-json` - 事件发生时的实时结构化输出（适合进度监控、长时间任务）

```bash
# Run with JSON output for automation
goose run --output-format json -t "your instructions"

# Stream JSON events in real-time
goose run --output-format stream-json -t "your instructions"

# Run a recipe with JSON output
goose run --output-format json --recipe recipe.yaml

# Combine with other options
goose run --output-format json --no-session -t "automated task"
```

JSON 输出包括：
- 会话元数据和执行结果
- 工具输出以及任何错误
- 适合脚本和 CI/CD 流水线解析的结构化数据

## 常见用途

### 运行脚本文件

创建一个指令文件（例如 `build-script.txt`）：
```text
Check the current branch
Run the test suite
Build the documentation
```

然后运行它：
```bash
goose run -i build-script.txt
```

### 快速命令

对于一次性命令，使用文本选项：
```bash
goose run -t "Create a CHANGELOG.md entry comparing current git branch with main"
```

### 开发工作流

用特定扩展开始会话：
```bash
goose run --with-builtin "developer,git" -n dev-session -s
```

### 组合选项

可以组合多个选项来创建强大的工作流：

```bash
# Complex example combining multiple options
goose run \
  --with-builtin "developer,git" \
  --with-extension "API_KEY=xyz123 custom-tool" \
  -n project-setup \
  -t "Initialize project" 
```

此命令：
1. 加载 developer 和 git 内置扩展
2. 添加一个带 API 密钥的自定义扩展
3. 把会话命名为 "project-setup"
4. 以 "Initialize project" 指令开始
5. 处理完命令后自动退出。
