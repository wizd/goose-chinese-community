---
sidebar_position: 4
title: 用于专门任务的子配方
sidebar_label: 子配方
description: 了解配方如何使用子配方执行特定任务
---

子配方是被另一个配方用来执行特定任务的配方。它们可以实现：
- **多步工作流** - 把复杂任务拆成具有专门专长的不同阶段
- **可复用组件** - 创建可在各种工作流中使用的常见任务

:::warning 实验性功能
子配方是正在积极开发的实验性功能。行为和配置可能在未来版本中变化。
:::

## 子配方如何工作

“主配方”在 `sub_recipes` 字段中注册其子配方，该字段包含以下字段：

- `name`：子配方的唯一标识符，用于生成工具名称
- `path`：子配方文件的文件路径（相对或绝对）
- `values`：（可选）始终传给子配方的预配置参数值

运行主配方时，goose 会为每个子配方生成一个工具，该工具会：
- 接受子配方定义的参数
- 在具有独立上下文的单独会话中执行子配方
- 把输出返回给主配方

子配方会话隔离运行——它们不与主配方或其他子配方共享对话历史、记忆或状态。此外，子配方不能定义自己的子配方（不允许嵌套）。

:::note
定义了 `sub_recipes` 的配方会自动注入 `summon` 平台扩展，因此无需在 `extensions` 中列出即可使用 `delegate` 工具。
:::

### 参数处理

子配方收到的参数可以使用 `{{ parameter_name }}` 语法用在提示词和指令中。子配方通过两种方式接收参数：

1. **预设值**：在 `values` 字段中定义的固定参数值会自动提供，运行时不能覆盖
2. **基于上下文的参数**：AI 代理可以从对话上下文中提取参数值，包括先前子配方的结果

预设值优先于基于上下文的参数。如果对话上下文和 `values` 字段都提供了同一参数，则使用 `values` 中的版本。

:::tip
向子配方传递多行参数值时，使用 `indent()` 过滤器以保持有效的 YAML 格式，例如：`{{ content | indent(2) }}`。更多细节见[模板支持](/docs/guides/recipes/recipe-reference#template-support)。
:::

## 示例

### 顺序处理

这个代码审查流水线示例展示了一个主配方，它使用两个子配方执行全面的代码审查：

**用法：**
```bash
goose run --recipe code-review-pipeline.yaml --params repository_path=/path/to/repo
```

**主配方：**

```yaml
# code-review-pipeline.yaml
version: "1.0.0"
title: "Code Review Pipeline"
description: "Automated code review using subrecipes"
instructions: |
  Perform a code review using the available subrecipe tools.
  Run security analysis first, then code quality analysis.

parameters:
  - key: repository_path
    input_type: string
    requirement: required
    description: "Path to the repository to review"

sub_recipes:
  - name: "security_scan"
    path: "./subrecipes/security-analysis.yaml"
    values:
      scan_level: "comprehensive"
  
  - name: "quality_check"
    path: "./subrecipes/quality-analysis.yaml"

extensions:
  - type: builtin
    name: developer
    timeout: 300
    bundled: true

prompt: |
  Review the code at {{ repository_path }} using the subrecipe tools.
  Run security scan first, then quality analysis.
```

**子配方：**

<details>
  <summary>security_scan</summary>
  ```yaml
  # subrecipes/security-analysis.yaml
  version: "1.0.0"
  title: "Security Scanner"
  description: "Analyze code for security vulnerabilities"
  instructions: |
    You are a security expert. Analyze the provided code for security issues.
    Focus on common vulnerabilities like SQL injection, XSS, and authentication flaws.

  parameters:
    - key: repository_path
      input_type: string
      requirement: required
      description: "Path to the code to analyze"
    
    - key: scan_level
      input_type: string
      requirement: optional
      default: "standard"
      description: "Depth of security scan (basic, standard, comprehensive)"

  extensions:
    - type: builtin
      name: developer
      timeout: 300
      bundled: true

  prompt: |
    Perform a {{ scan_level }} security analysis on the code at {{ repository_path }}.
    Report any security vulnerabilities found with severity levels and recommendations.
  ```
</details>

<details>
  <summary>quality_check</summary>
  ```yaml
  # subrecipes/quality-analysis.yaml
  version: "1.0.0"
  title: "Code Quality Analyzer"
  description: "Analyze code quality and best practices"
  instructions: |
    You are a code quality expert. Review code for maintainability, 
    readability, and adherence to best practices.

  parameters:
    - key: repository_path
      input_type: string
      requirement: required
      description: "Path to the code to analyze"

  extensions:
    - type: builtin
      name: developer
      timeout: 300
      bundled: true

  prompt: |
    Analyze the code quality at {{ repository_path }}.
    Check for code smells, complexity issues, and suggest improvements.
  ```
</details>

:::tip
当子配方彼此独立、希望更快执行时，见[并行运行子配方](/docs/tutorials/subrecipes-in-parallel)，以并发执行多个子配方。
:::

### 条件处理

这个智能项目分析器示例展示了根据分析在不同子配方之间选择的条件逻辑：

**用法：**
```bash
goose run --recipe smart-analyzer.yaml --params repository_path=/path/to/project
```

**主配方：**

```yaml
# smart-analyzer.yaml
version: "1.0.0"
title: "Smart Project Analyzer"
description: "Analyze project and choose appropriate processing based on type"
instructions: |
  First examine the repository to determine the project type (web app, CLI tool, library, etc.).
  Based on what you find:
  - If it's a web application, use the web_security_audit subrecipe
  - If it's a CLI tool or library, use the api_documentation subrecipe
  Only run one subrecipe based on your analysis.

parameters:
  - key: repository_path
    input_type: string
    requirement: required
    description: "Path to the repository to analyze"

sub_recipes:
  - name: "web_security_audit"
    path: "./subrecipes/web-security.yaml"
    values:
      check_cors: "true"
      check_csrf: "true"
  
  - name: "api_documentation"
    path: "./subrecipes/api-docs.yaml"
    values:
      format: "markdown"

extensions:
  - type: builtin
    name: developer
    timeout: 300
    bundled: true

prompt: |
  Analyze the project at {{ repository_path }} and determine its type.
  Then run the appropriate subrecipe tool based on your findings.
```

**子配方：**

<details>
  <summary>web_security_audit</summary>
  ```yaml
  # subrecipes/web-security.yaml
  version: "1.0.0"
  title: "Web Security Auditor"
  description: "Security audit for web applications"
  instructions: |
    You are a web security specialist. Audit web applications for 
    security vulnerabilities specific to web technologies.

  parameters:
    - key: repository_path
      input_type: string
      requirement: required
      description: "Path to the web application code"
    
    - key: check_cors
      input_type: string
      requirement: optional
      default: "false"
      description: "Whether to check CORS configuration"
    
    - key: check_csrf
      input_type: string
      requirement: optional
      default: "false"
      description: "Whether to check CSRF protection"

  extensions:
    - type: builtin
      name: developer
      timeout: 300
      bundled: true

  prompt: |
    Perform a web security audit on {{ repository_path }}.
    {% if check_cors == "true" %}Check CORS configuration for security issues.{% endif %}
    {% if check_csrf == "true" %}Verify CSRF protection is properly implemented.{% endif %}
    Focus on web-specific vulnerabilities like XSS, authentication flaws, and session management.
  ```
</details>

<details>
  <summary>api_documentation</summary>
  ```yaml
  # subrecipes/api-docs.yaml
  version: "1.0.0"
  title: "API Documentation Generator"
  description: "Generate documentation for APIs and libraries"
  instructions: |
    You are a technical writer specializing in API documentation.
    Create comprehensive documentation for code libraries and APIs.

  parameters:
    - key: repository_path
      input_type: string
      requirement: required
      description: "Path to the code to document"
    
    - key: format
      input_type: string
      requirement: optional
      default: "markdown"
      description: "Output format for documentation (markdown, html, rst)"

  extensions:
    - type: builtin
      name: developer
      timeout: 300
      bundled: true

  prompt: |
    Generate {{ format }} documentation for the code at {{ repository_path }}.
    Include API endpoints, function signatures, usage examples, and installation instructions.
    Focus on making it easy for developers to understand and use this code.
  ```
</details>

### 基于上下文的参数传递

这个旅行规划器示例展示子配方如何从对话上下文接收参数，包括先前子配方的结果：

**用法：**
```bash
goose run --recipe travel-planner.yaml
```

**主配方：**

```yaml
# travel-planner.yaml
version: "1.0.0"
title: "Travel Activity Planner"
description: "Get weather data and suggest appropriate activities"
instructions: |
  Plan activities by first getting weather data, then suggesting activities based on conditions.

prompt: |
  Plan activities for Sydney by first getting weather data, then suggesting activities based on the weather conditions we receive.

sub_recipes:
  - name: weather_data
    path: "./subrecipes/weather-data.yaml"
    # No values - location parameter comes from prompt context
  
  - name: activity_suggestions
    path: "./subrecipes/activity-suggestions.yaml"
    # weather_conditions parameter comes from conversation context

extensions:
  - type: builtin
    name: developer
    timeout: 300
    bundled: true
```

**子配方：**

<details>
  <summary>weather_data</summary>
  ```yaml
  # subrecipes/weather-data.yaml
  version: "1.0.0"
  title: "Weather Data Collector"
  description: "Fetch current weather conditions for a location"
  instructions: |
    You are a weather data specialist. Gather current weather information
    including temperature, conditions, and seasonal context.

  parameters:
    - key: location
      input_type: string
      requirement: required
      description: "City or location to get weather data for"

  extensions:
    - type: stdio
      name: weather
      cmd: uvx
      args:
        - mcp_weather@latest
      timeout: 300
      description: "Weather data for trip planning"
    - type: builtin
      name: developer
      timeout: 300
      bundled: true

  prompt: |
    Get the current weather conditions for {{ location }}.
    Include temperature, weather conditions (sunny, rainy, etc.), 
    and any relevant seasonal information.
  ```
</details>

<details>
  <summary>activity_suggestions</summary>
  ```yaml
  # subrecipes/activity-suggestions.yaml
  version: "1.0.0"
  title: "Activity Recommender"
  description: "Suggest activities based on weather conditions"
  instructions: |
    You are a travel expert. Recommend appropriate activities and attractions
    based on current weather conditions.

  parameters:
    - key: weather_conditions
      input_type: string
      requirement: required
      description: "Current weather conditions to base recommendations on"

  extensions:
    - type: builtin
      name: developer
      timeout: 300
      bundled: true

  prompt: |
    Based on these weather conditions: {{ weather_conditions }}, 
    suggest appropriate activities, attractions, and travel tips.
    Include both indoor and outdoor options as relevant.
  ```
</details>

在此示例中：
- `weather_data` 子配方从提示词上下文获取地点（AI 从自然语言提示中提取 “Sydney”）
- `activity_suggestions` 子配方从对话上下文获取天气状况（AI 使用第一个子配方的天气结果）

## 最佳实践
- **单一职责**：每个子配方应有一个明确目的
- **清晰的参数**：使用描述性的名称和说明
- **预设固定值**：对不会变化的参数使用 `values`
- **独立测试**：组合之前先验证子配方单独可以工作

:::tip 控制子配方执行
每个子配方都可以指定自己的 `settings.max_turns` 值来控制执行限制。如果未指定，子配方继承父配方的 `max_turns` 设置。细节见[配方设置](/docs/guides/recipes/recipe-reference#settings)。

```yaml
# subrecipes/quick-scan.yaml
version: "1.0.0"
title: "Quick Security Scan"
settings:
  max_turns: 10  # Limit this subrecipe to 10 turns
instructions: "Perform a quick security scan"
prompt: "Scan for common vulnerabilities"
```
:::

## 了解更多
查看[配方](/docs/guides/recipes)指南，获取更多文档、工具和资源，帮助你掌握 goose 配方。
