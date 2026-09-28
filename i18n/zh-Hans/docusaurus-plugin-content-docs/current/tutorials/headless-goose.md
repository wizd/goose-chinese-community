---
title: 使用无头模式自动化 goose
description: goose 无头模式
---

# 用 goose 无头模式自动化开发任务

*在 CI/CD 流水线、服务器和批处理场景中运行由 AI 驱动的工程工作流*

无需人工干预即可自动化复杂工程任务，这件事已经很重要，但让我们用 AI 再进一步。goose 的“无头”模式让开发者在服务器环境、CI/CD 流水线和批处理场景中发挥 AI 自动化的全部能力，这些场景里交互式会话根本不可行。

## 什么是无头模式？

无头模式是 goose 的非交互执行环境，为没有（或不想要）人工干预的自动化场景而设计。

与交互式桌面应用或 CLI 会话不同，无头模式处理指令后自动退出，因此非常适合集成到现有开发工作流中。

可以把它想成：与 AI 助手对话，和派它去执行一项支线任务并给出清晰指令、信任它自主完成任务，这两者之间的差别。

## 交互式与无头：理解差异

| 特性 | 交互模式 | 无头模式 |
|---------|------------------|---------------|
| **用户输入** | 提示用户做决定和澄清 | 使用默认行为和预先配置的设置 |
| **上下文管理** | 达到限制时提示用户选择策略 | 自动摘要对话 |
| **会话持久化** | 维持进行中的对话状态 | 执行任务后干净退出 |
| **错误处理** | 用户可以介入并提供指导 | 根据配置自动响应错误 |
| **工具权限** | 可以对有风险的操作提示批准 | 使用配置的默认值，或安全失败 |
| **执行流程** | 来回对话的风格 | 一次执行并给出完整输出 |

## 带命令示例的真实用例

### 1. 服务器环境和云部署

非常适合无头服务器、容器化环境，以及无法使用 GUI 的云部署。

```bash
# Automated server maintenance
goose run --with-builtin developer -t "Check system logs for errors in the last 24 hours, identify performance bottlenecks, and generate a maintenance report"

# Container optimization
goose run --no-session -t "Analyze the Dockerfile, optimize for smaller image size, and update the build process documentation"

# Cloud resource audit
goose run -t "Review our AWS infrastructure configuration, identify cost optimization opportunities, and create a migration plan for underutilized resources"
```

### 2. CI/CD 流水线集成

把由 AI 驱动的分析和修复无缝集成到持续集成工作流中。

```bash
# In your .github/workflows/ci.yml
- name: AI-Powered Code Review
  run: |
    goose run --with-builtin developer \
      -t "Analyze the code changes in this PR, check for security vulnerabilities, performance issues, and suggest improvements. Generate a detailed review report."

# Test failure analysis
goose run --debug -t "Examine the failing test suite, identify the root cause of failures, implement fixes, and ensure all tests pass"

# Automated documentation updates
goose run -t "Review code changes and update the README.md and API documentation to reflect new features and modifications"
```

### 3. 批处理与批量操作

处理跨多个文件、仓库或系统的大规模操作。

```bash
# Bulk code modernization
goose run --with-builtin developer \
  -t "Upgrade all Python files in the src/ directory from Python 3.8 to 3.11 syntax, update dependencies, and ensure compatibility"

# Multi-repository maintenance
for repo in repo1 repo2 repo3; do
  cd $repo
  goose run --no-session -t "Update all dependencies to latest stable versions, run tests, and create a PR if changes are needed"
  cd ..
done

# Database migration automation
goose run -t "Analyze the current database schema, generate migration scripts for the new requirements, and create rollback procedures"
```

### 4. 计划任务执行

与 cron 作业或任务调度器结合，进行定期自动维护。

```bash
# Daily security scan (add to crontab)
0 2 * * * /usr/local/bin/goose run --no-session -t "Run comprehensive security audit, check for vulnerabilities, and email report to security team"

# Weekly dependency updates
0 9 * * 1 /usr/local/bin/goose run -t "Check for outdated dependencies, create update PRs for non-breaking changes, and schedule review for major updates"
```

## 无头模式成功的最佳实践

那么我们如何把这些都设置好？

让我们谈谈成功的无头自动化的基础：

### 1. **写出极其清晰的指令**

你的指令是成功工具的蓝图。提示想法需要具体、详细且没有歧义。如果不确定，可以试试[氛围提示来起步](https://www.youtube.com/watch?v=IjXmT0W4f2Q)。

```bash
# Good: Specific and actionable
goose run -t "Analyze the test failures in the latest CI run, identify the root cause, and create a fix with appropriate unit tests"

# Better: Even more detailed
goose run -t "Review the failed tests in tests/integration/, identify why the authentication middleware is failing, implement a fix that maintains backward compatibility, and add regression tests"
```

### 2. **预先配置环境**
设置环境变量，以避免一些重复的运行时决策。

```bash
export GOOSE_CONTEXT_STRATEGY=summarize
export GOOSE_MAX_TURNS=50
export GOOSE_MODE=auto
export GOOSE_DISABLE_SESSION_NAMING=true
```

`CONTEXT_STRATEGY` 和 `MAX_TURNS` 设置帮助管理对话限制，而把 `GOOSE_MODE` 设为 `auto` 则允许非交互执行。`GOOSE_DISABLE_SESSION_NAMING` 避免为生成会话名称而额外进行的后台模型调用，并保留默认的 “CLI Session” 名称。

### 3. **实现稳健的错误处理**

在自动化脚本中始终检查退出码，并优雅地处理失败：

```bash
#!/bin/bash
if ! goose run --no-session -t "Run security audit and fix critical issues"; then
    echo "goose automation failed - manual intervention required"
    exit 1
fi
```

### 4. **选择合适的会话策略**
一次性任务使用 `--no-session`，以免弄乱会话历史；但对于复杂的多步工作流，如果之后可能需要调试（或第一次尝试时），请保留会话。


## 在无头模式中执行配方

[配方](/docs/guides/recipes/)是 goose 定义可复用、参数化工作流的强大方式。在无头模式中，配方更有价值，因为它们支持复杂的自动化场景。

### 无头模式的配方要求

配方要在无头模式中工作，**必须**包含 `prompt` 字段。这条提示作为启动自动执行的初始指令：

```yaml
# automation-recipe.yaml
title: "Automated Code Quality Check"
name: "Automated Code Quality Check"
description: "Comprehensive code quality analysis and improvement"
author:
  name: "DevOps Team"
  email: "devops@company.com"

# Required for headless mode
prompt: "Perform a comprehensive code quality analysis including linting, security scanning, test coverage analysis, and generate an improvement plan"

instructions: |
  You are an expert code quality engineer. Your task is to:
  1. Run static analysis tools (eslint, pylint, etc.)
  2. Perform security vulnerability scanning
  3. Analyze test coverage and identify gaps
  4. Check for code duplication and complexity issues
  5. Generate a prioritized improvement plan
  6. Create actionable tickets for the development team

parameters:
  - key: target_directory
    input_type: string
    requirement: required
    description: "Directory to analyze"
    default: "./src"
  - key: output_format
    input_type: string
    requirement: required
    description: "Report format (markdown, json, html)"
    default: "markdown"

extensions:
  - type: builtin
    name: developer
    display_name: Developer
    timeout: 300
    bundled: true
```

### 在无头模式中执行配方

```bash
# Basic recipe execution
goose run --recipe automation-recipe.yaml

# With custom parameters
goose run --recipe automation-recipe.yaml \
  --params target_directory=./backend \
  --params output_format=json

# Complex workflow with multiple recipes
goose run --recipe main-workflow.yaml \
  --sub-recipe security-audit.yaml \
  --sub-recipe performance-analysis.yaml \
  --params environment=production
```

## 理解限制

无头模式非常强大，但理解它的约束很重要，这样你才能对自动化想法设定合适的预期。

### 1. 没有用户交互能力

**这意味着什么**：执行期间 goose 不能请求澄清、批准或额外输入。如果它不确定该做什么，提示结果通常会显示类似 “How should I proceed?” 的问题。

**影响**：如果指令含糊，或出现意外情况，goose 会根据可用上下文做出最佳判断，这可能并不总是符合你的意图。

**缓解**：提供极其详细的指令，尤其是遇到问题时该怎么办，并且**先在非生产环境中彻底测试自动化**。

```bash
# Problematic: Too vague
goose run -t "Fix the issues"

# Better: Specific and actionable
goose run -t "Fix the TypeScript compilation errors in src/components/, ensure all imports are correct, and update any deprecated API calls to use the latest syntax"
```

### 2. 配方提示要求

**这意味着什么**：无头模式中使用的任何配方都必须包含 `prompt` 字段，否则执行会因错误而失败。

**影响**：现有的交互式配方在用于自动化场景之前可能需要修改。

**缓解**：始终在配方中包含有意义的提示，即使它们主要是为交互使用而设计的。

### 3. 工具权限依赖

**这意味着什么**：goose 不能提示是否允许使用可能有风险的工具或操作。

**影响**：需要批准的操作要么使用默认权限，要么失败，可能阻断自动化工作流。

**缓解**：用环境变量预先配置工具权限：

```bash
export GOOSE_MODE=auto  # Automatically approve safe operations
# or configure specific tool permissions in your config
```

### 4. 上下文决策自动化

**这意味着什么**：当对话上下文达到限制时，goose 会在没有用户输入的情况下自动应用已配置的策略。

**影响**：如果摘要不完美，重要上下文可能会丢失；如果上下文清理过于激进，执行可能会中断。

**缓解**：配置合适的上下文策略并监控 token 用量：

```bash
export GOOSE_CONTEXT_STRATEGY=summarize  # Usually the best choice for automation
export GOOSE_MAX_TURNS=100  # Prevent runaway execution
```

### 5. 错误恢复限制

**这意味着什么**：受益于人类洞察的复杂错误场景无法交互式解决。

**影响**：在人类通过对话很容易解决的边界情况下，自动化可能会失败。

**缓解**：在调用脚本中实现全面的错误处理，并准备回退流程：

```bash
#!/bin/bash
if ! goose run --recipe complex-deployment.yaml; then
    # Fallback to simpler approach or alert human operators
    echo "Complex deployment failed, initiating rollback procedure"
    goose run --recipe rollback.yaml
fi
```

## 配置与环境设置

### 必要的环境变量

```bash
# Context management
export GOOSE_CONTEXT_STRATEGY=summarize
export GOOSE_MAX_TURNS=50

# Tool behavior
export GOOSE_MODE=auto

# Model configuration
export GOOSE_PROVIDER=openai
export GOOSE_MODEL=gpt-4o

# Output control
export GOOSE_CLI_MIN_PRIORITY=0.2  # Reduce verbose output
```

### 高级配置

```bash
# Security and permissions
export GOOSE_ALLOWLIST=https://company.com/allowed-extensions.json
```

## 自动化开发的未来

goose 的无头模式不只是一项功能——它是朝着由 AI 驱动的真正自动化开发工作流的转变。我们可以把人工干预从日常任务中拿掉，让团队专注于高价值工作，而由 AI 处理拖慢我们的重复、耗时操作。

无论你是想简化 CI/CD 流水线、自动化服务器维护，还是处理跨多个仓库的批量操作，goose 的无头模式都为构建复杂、可靠的自动化工作流提供了基础。

**今天就开始你的自动化之旅：**

1. **安装 goose** 并配置环境变量
2. **创建你的第一个配方**，包含清晰的提示和详细指令
3. **在安全环境中测试**，然后再部署到生产
4. **集成到现有工作流**，看着生产力提升

在我们的 [Discord 社区](https://discord.gg/n8R5VaWDAn)与我们联系，分享你的无头模式成功故事、提出问题，并与其他想推动 AI 自动化边界的开发者协作。
