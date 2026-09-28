---
sidebar_position: 2
title: 配方参考指南
sidebar_label: 配方参考
description: 在 goose 中创建和自定义配方的完整技术参考
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

配方是可复用的 goose 配置，把指令和设置打包起来，以便设置可以轻松分享并由他人启动。

## 配方文件格式

配方可以定义在：
- `.yaml`（推荐）和 `.yml` 文件
- `.json` 文件

:::info
goose CLI 不支持 `.yml` 文件。
:::

了解如何创建、使用和管理配方，见[可复用配方](/docs/guides/recipes/session-recipes)。

## 配方位置

配方可以从以下位置加载：

1. 本地文件系统：
   - 当前目录
   - [`GOOSE_RECIPE_PATH`](/docs/guides/environment-variables#recipe-configuration) 环境变量中指定的目录
   
2. GitHub 仓库：
   - 使用 [`GOOSE_RECIPE_GITHUB_REPO`](/docs/guides/environment-variables#recipe-configuration) 配置键进行配置
   - 需要安装并认证 GitHub CLI（`gh`）

## 核心配方 schema

配方遵循此 schema 结构：

| 字段 | 类型 | 必需 | 说明 |
|-------|------|----------|-------------|
| `description` | String | ✅ | 配方做什么的详细描述 |
| `instructions` | String | ✅*  | 可以包含参数替换的模板指令 |
| `prompt` | String| ✅*   | 可以包含参数替换的模板提示。在[无界面](/docs/tutorials/headless-goose)（非交互）模式中必需。 |
| `title` | String | ✅ | 描述配方的短标题 |
| [`activities`](#activities) | Array | - | 可以包含参数替换的示例提示列表。活动在 goose 桌面版中显示为可点击气泡。 |
| [`extensions`](#extensions) | Array | - | 扩展配置列表 |
| [`parameters`](#parameters) | Array | - | 动态配方的参数定义列表 |
| [`response`](#response) | Object | - | 用于自动化工作流的结构化输出 schema |
| [`retry`](#retry) | Object | - | 带成功验证的自动重试逻辑配置 |
| [`settings`](#settings) | Object | - | 模型提供商、模型名称和其他设置的配置 |
| [`sub_recipes`](#subrecipes) | Array | - | 子配方列表 |
| `version` | String | - | 配方格式版本，省略时默认为 “1.0.0” |

*必须至少提供 `instructions` 或 `prompt` 之一。

## 字段规范

### 活动

`activities` 字段定义在 goose 桌面版中打开配方时出现的可选消息和可点击活动气泡（按钮）。

:::info 仅桌面版
活动是仅桌面版的功能。当带有活动的配方通过 CLI 或作为调度作业运行时，`activities` 字段会被忽略，对配方执行没有影响。
:::

#### 活动类型

活动可以用两种方式定义：

1. **消息活动**：在活动气泡上方的信息框中显示 markdown 格式的活动文本。例如：
   
   ```
   activities:
     - "message: **Welcome!** Here's what I can help with:\n\n• 📊 Data analysis\n• 🔍 Code review\n• 📝 Documentation\n\nSelect an option below to begin."
   ```
   
   只包含一个以 `message:` 为前缀的活动。额外的以 `message:` 为前缀的活动会变成普通的可点击气泡（并显示字面的 “message:” 文本）。

2. **按钮活动**：显示在活动气泡中的文本，点击时把活动文本作为提示发送

#### 参数替换

活动支持[参数替换](#parameters)，让你创建动态、个性化的活动气泡。用户在 **Recipe Parameters** 对话框中提供参数值后，这些值会在气泡显示之前替换到活动文本中。

#### 示例配置

<Tabs groupId="format">
  <TabItem value="yaml" label="YAML" default>
    ```yaml
    version: "1.0.0"
    title: "Code Review Assistant"
    description: "Review code with customizable focus areas"
    parameters:
      - key: language
        input_type: string
        requirement: required
        description: "Programming language to review"
      - key: focus
        input_type: string
        requirement: optional
        default: "best practices"
        description: "Review focus area"

    activities:
      - "message: Click an option below to start reviewing {{ language }} code with a focus on {{ focus }}."
      - "Review the current file for {{ focus }}"
      - "Suggest improvements for {{ language }} code quality"
      - "Check for security vulnerabilities"
      - "Generate unit tests"
    ```
  </TabItem>
  <TabItem value="json" label="JSON">
    ```json
    {
      "version": "1.0.0",
      "title": "Code Review Assistant",
      "description": "Review code with customizable focus areas",
      "parameters": [
        {
          "key": "language",
          "input_type": "string",
          "requirement": "required",
          "description": "Programming language to review"
        },
        {
          "key": "focus",
          "input_type": "string",
          "requirement": "optional",
          "default": "best practices",
          "description": "Review focus area"
        }
      ],
      "activities": [
        "message: Click an option below to start reviewing {{ language }} code with a focus on {{ focus }}.",
        "Review the current file for {{ focus }}",
        "Suggest improvements for {{ language }} code quality",
        "Check for security vulnerabilities",
        "Generate unit tests"
      ]
    }
    ```
  </TabItem>
</Tabs>

在此示例中：
- 消息活动显示带有已替换参数值的指令，例如：“Click an option below to start reviewing rust code with a focus on best practices.”
- 前两个活动气泡使用参数替换，例如：“Review the current file for best practices”
- 后两个活动气泡是静态提示，无论参数如何都能工作

### 扩展

`extensions` 字段让你指定配方正常工作所需的 Model Context Protocol (MCP) 服务器和其他扩展。`extensions` 数组中的每个扩展都有以下 schema：

#### 扩展 schema

| 字段 | 类型 | 说明 |
|-------|------|-------------|
| `type` | String | 扩展类型（例如 “stdio”） |
| `name` | String | 扩展的唯一名称 |
| `cmd` | String | 运行扩展的命令 |
| `args` | Array | 命令的参数列表 |
| `env_keys` | Array | （可选）扩展所需的环境变量名称 |
| `timeout` | Number | 超时（秒） |
| `bundled` | Boolean | （可选）扩展是否与 goose 捆绑 |
| `description` | String | 扩展做什么的描述 |
| `available_tools` | Array | 扩展内将可用的工具名称列表。未指定时全部可用 |

#### 扩展类型

- **`stdio`**：带命令和参数的标准 I/O 客户端
- **`builtin`**：作为捆绑 goose MCP 服务器一部分的内置扩展
- **`platform`**：在代理进程中运行的平台扩展
- **`streamable_http`**：带 URI 端点的 Streamable HTTP 客户端

:::note Summon 扩展与子代理
`delegate` 和 `load` 工具由 `summon` 平台扩展提供。当配方指定显式 `extensions` 块时，只有列出的扩展可用——`summon` 等默认平台扩展不会自动包含。如果你的配方需要子代理委派，把 `summon` 添加到扩展列表：

```yaml
extensions:
  - type: platform
    name: summon
```

定义了 [`sub_recipes`](/docs/guides/recipes/subrecipes) 的配方会自动注入 `summon`，不必显式列出它。
:::

#### 扩展示例配置

<Tabs groupId="format">
  <TabItem value="yaml" label="YAML" default>

```yaml
extensions:
  - type: stdio
    name: codesearch
    cmd: uvx
    args:
      - mcp_codesearch@latest
    timeout: 300
    bundled: true
    description: "Query https://codesearch.sqprod.co/ directly from goose"
  
  - type: stdio
    name: presidio
    timeout: 300
    cmd: uvx
    args:
      - 'mcp_presidio@latest'
    available_tools:
      - query_logs

  - type: stdio
    name: github-mcp
    cmd: github-mcp-server
    args: []
    env_keys:
      - GITHUB_PERSONAL_ACCESS_TOKEN
    timeout: 60
    description: "GitHub MCP extension for repository operations"
    
```

  </TabItem>
  <TabItem value="json" label="JSON">

```json
{
  "extensions": [
    {
      "type": "stdio",
      "name": "codesearch",
      "cmd": "uvx",
      "args": ["mcp_codesearch@latest"],
      "timeout": 300,
      "bundled": true,
      "description": "Query https://codesearch.sqprod.co/ directly from goose"
    },
    {
      "type": "stdio",
      "name": "presidio",
      "timeout": 300,
      "cmd": "uvx",
      "args": ["mcp_presidio@latest"],
      "available_tools": ["query_logs"]
    },
    {
      "type": "stdio",
      "name": "github-mcp",
      "cmd": "github-mcp-server",
      "args": [],
      "env_keys": ["GITHUB_PERSONAL_ACCESS_TOKEN"],
      "timeout": 60,
      "description": "GitHub MCP extension for repository operations"
    }
  ]
}
```

  </TabItem>
</Tabs>

#### 扩展环境变量

扩展可以在 `env_keys` 中声明所需环境变量的名称。goose 在扩展启动时解析这些值，先使用环境变量，然后使用 goose 机密存储（系统密钥环，或密钥环禁用时的 `secrets.yaml`）。

加载配方时不会提示缺失的值。在开始配方之前配置它们；如果必需值不可用，扩展会报告初始化错误。

:::info
`env_keys` 可以包含 API 密钥等机密，也可以包含 API 端点等非机密配置。
:::

### 参数

`parameters` 字段让你创建可以为不同上下文定制的动态、可复用配方。参数定义用户运行配方时填写的占位符，使配方更灵活、更可适应。

参数替换使用带 `{{ parameter_name }}` 占位符的 Jinja 风格模板语法。`parameters` 数组中的每个参数都有以下 schema：

#### 参数 schema

| 字段 | 类型 | 必需 | 说明 |
|-------|------|----------|-------------|
| `key` | String | ✅ | 参数的唯一标识符 |
| `input_type` | String | ✅ | 输入类型：`"string"`（默认）、`"number"`、`"boolean"`、`"date"`、`"file"` 或 `"select"` |
| `requirement` | String | ✅ | 之一：“required”、“optional” 或 “user_prompt” |
| `description` | String | ✅ | 参数的人类可读描述 |
| `default` | String | - | 可选参数的默认值 |
| `options` | Array | - | 可用选项列表（`select` 输入类型必需） |

#### 参数要求

- `required`：使用配方时必须提供参数
- `optional`：如果指定了默认值则可以省略
- `user_prompt`：如果未提供，会交互式提示用户输入

`required` 和 `optional` 参数最适合在 goose 桌面版中打开的配方。如果没有为 `user_prompt` 参数提供值，该参数不会被替换，可能在配方输出中显示为字面的 `{{ parameter_name }}` 文本。

#### 输入类型

- `string`：默认类型。参数值在模板替换中按原样使用
- `number`：数值。桌面 UI 提供数字输入验证
- `boolean`：真/假值。桌面 UI 显示带 “True”/“False” 选项的下拉菜单
- `date`：日期值。目前渲染为文本输入
- `file`：参数值应为文件路径。goose 读取文件内容，并把实际内容（不是路径）替换到模板中
- `select`：带预定义选项的下拉选择。需要 `options` 字段

**示例：**
```yaml
parameters:
  - key: max_files
    input_type: number
    requirement: optional
    default: "10"
    description: "Maximum files to process"
  
  - key: output_format
    input_type: select
    requirement: required
    description: "Choose output format"
    options:
      - json
      - markdown
      - csv
  
  - key: enable_debug
    input_type: boolean
    requirement: optional
    default: "false"
    description: "Enable debug mode"
  
  - key: source_code
    input_type: file
    requirement: required
    description: "Path to the source code file to analyze"

prompt: "Process {{ max_files }} files in {{ output_format }} format. Debug: {{ enable_debug }}. Code:\n\n{{ source_code }}"
```

:::important
- 可选参数必须指定默认值
- 必需参数不能有默认值
- 无论要求类型如何，文件参数都不能有默认值，以防止无意导入敏感文件
- 选择参数必须有带可用选项的 `options` 字段
- 参数键必须与指令、提示词或活动中使用的任何模板变量匹配
:::

#### 桌面版中的参数替换

当带参数的配方在 goose 桌面版中打开时，用户会看到 **Recipe Parameters** 对话框，他们可以：
- 为必需参数提供值
- 修改或接受可选参数的默认值
- 为 `user_prompt` 参数输入值

提交参数值后，它们会在配方开始之前替换到配方的 `instructions`、`prompt` 和 `activities` 字段中。

### 响应

`response` 字段使配方能够强制最终的结构化 JSON 输出。当你指定 `json_schema` 时，goose 会：

1. **验证输出**：用基本 JSON schema 验证对照你的 JSON schema 验证输出 JSON
2. **最终结构化输出**：确保代理的最终输出是匹配你 JSON 结构的响应

此功能为**非交互式自动化**而设计，以确保一致、可解析的输出。配方从 goose CLI 或 goose 桌面版运行时都可以产生结构化输出。见[自动化工作流的用例和想法](/docs/guides/recipes/session-recipes#structured-output-for-automation)。

#### 响应 schema

| 字段 | 类型 | 必需 | 说明 |
|-------|------|----------|-------------|
| `json_schema` | Object | ✅ | 用于输出验证的 [JSON schema](https://json-schema.org/) |

#### 基本结构

```yaml
response:
  json_schema:
    type: object
    properties:
      # Define your fields here, with their type and description
    required:
      # List required field names
```

#### 简单示例

```yaml
version: "1.0.0"
title: "Task Summary"
description: "Summarize completed tasks"
prompt: "Summarize the tasks you completed"
response:
  json_schema:
    type: object
    properties:
      summary:
        type: string
        description: "Brief summary of work done"
      tasks_completed:
        type: number
        description: "Number of tasks finished"
      next_steps:
        type: array
        items:
          type: string
        description: "Recommended next actions"
    required:
      - summary
      - tasks_completed
```

### 重试

`retry` 字段使配方能够在未满足成功标准时自动重试执行。这对可能需要多次尝试才能达到目标的配方，或实现自动验证和恢复工作流很有用。

#### 重试 schema

| 字段 | 类型 | 必需 | 说明 |
|-------|------|----------|-------------|
| `max_retries` | Number | ✅ | 最大重试次数 |
| `checks` | Array | ✅ | 成功检查配置列表 |
| `timeout_seconds` | Number | - | 成功检查命令的超时（默认：300 秒） |
| `on_failure_timeout_seconds` | Number | - | on_failure 命令的超时（默认：600 秒） |
| `on_failure` | String | - | 重试尝试失败时运行的 shell 命令 |

#### 成功检查配置

`checks` 数组中的每个成功检查都有以下 schema：

| 字段 | 类型 | 必需 | 说明 |
|-------|------|----------|-------------|
| `type` | String | ✅ | 检查类型——目前只支持 “shell” |
| `command` | String | ✅ | 用于验证的 shell 命令（成功必须以退出码 0 退出） |

#### 重试逻辑如何工作

1. **配方执行**：配方按提供的指令正常运行
2. **成功验证**：完成后，所有成功检查按顺序执行
3. **重试决定**：如果任何成功检查失败且仍有重试次数：
   - 执行 on_failure 命令（如果已配置）
   - 把代理的消息历史重置为初始状态
   - 增加重试计数器并重新开始执行
4. **完成**：过程在以下任一情况时停止：
   - 所有成功检查通过（成功）
   - 达到最大重试次数（失败）

#### 基本重试示例

```yaml
version: "1.0.0"
title: "Counter Increment Task"
description: "Increment a counter until it reaches target value"
prompt: "Increment the counter value in /tmp/counter.txt by 1."

retry:
  max_retries: 5
  timeout_seconds: 10
  checks:
    - type: shell
      command: "test $(cat /tmp/counter.txt 2>/dev/null || echo 0) -ge 3"
  on_failure: "echo 'Counter is at:' $(cat /tmp/counter.txt 2>/dev/null || echo 0) '(need 3 to succeed)'"
```

#### 高级重试示例

```yaml
version: "1.0.0"
title: "Service Health Check"
description: "Start service and verify it's running properly"
prompt: "Start the web service and verify it responds to health checks"

retry:
  max_retries: 3
  timeout_seconds: 30
  on_failure_timeout_seconds: 60
  checks:
    - type: shell
      command: "curl -f http://localhost:8080/health"
    - type: shell  
      command: "pgrep -f 'web-service' > /dev/null"
  on_failure: "systemctl stop web-service || killall web-service"
```

#### 环境变量

你可以使用环境变量全局配置重试行为：

- `GOOSE_RECIPE_RETRY_TIMEOUT_SECONDS`：成功检查命令的全局超时
- `GOOSE_RECIPE_ON_FAILURE_TIMEOUT_SECONDS`：on_failure 命令的全局超时

这些环境变量会被配方特定的超时配置覆盖。

### 设置

`settings` 字段让你为配方配置 AI 模型和提供商设置。这会在配方执行时覆盖默认配置。

#### 设置 schema

| 字段 | 类型 | 必需 | 说明 |
|-------|------|----------|-------------|
| `goose_provider` | String | - | 要使用的 AI 提供商（例如 “anthropic”、“openai”） |
| `goose_model` | String | - | 要使用的特定模型名称 |
| `temperature` | Number | - | 模型的温度设置（通常为 0.0-1.0） |
| `max_turns` | Number | - | 此配方创建的子代理任务的最大轮次数 |

#### 理解 max_turns

`max_turns` 设置控制代理在停止之前可以执行多少次迭代。在配方设置中设置时，它适用于该配方的执行以及它创建的任何子代理或子配方（除非它们指定自己的值）。

**配置优先级（从高到低）：**
1. 子代理工具调用覆盖
2. 配方 `settings.max_turns`
3. `GOOSE_SUBAGENT_MAX_TURNS` 环境变量
4. 默认值（主配方 1000，子代理 25）

**常见用例：** 限制自动化工作流的执行时间，防止失控的子代理，控制调度作业中的资源使用。

对于子代理，`settings` 中的 `goose_provider` 和 `goose_model` 优先于 `GOOSE_SUBAGENT_PROVIDER` 和 `GOOSE_SUBAGENT_MODEL` 环境变量。

#### 设置配置示例

```yaml
settings:
  goose_provider: "anthropic"
  goose_model: "claude-sonnet-4-20250514"
  temperature: 0.7
  max_turns: 50
```

```yaml
settings:
  goose_provider: "openai"
  goose_model: "gpt-4o"
  temperature: 0.3
```

:::note
配方中指定的设置会在该配方执行时覆盖你的默认 goose 配置。如果未指定设置，goose 将使用你配置的默认值。
:::

### 子配方

`sub_recipes` 字段指定主配方调用以执行特定任务的[子配方](/docs/guides/recipes/subrecipes)。`sub_recipes` 数组中的每个子配方都有以下 schema：

#### 子配方 schema

| 字段 | 类型 | 必需 | 说明 |
|-------|------|----------|-------------|
| `name` | String | ✅ | 子配方的唯一标识符 |
| `path` | String | ✅ | 子配方文件的相对或绝对路径 |
| `values` | Object | - | 传给子配方的预配置参数值 |
| `sequential_when_repeated` | Boolean | - | 强制多个子配方实例顺序执行。细节见[并行运行子配方](/docs/tutorials/subrecipes-in-parallel) |
| `description` | String | - | 子配方的可选描述 |

#### 子配方配置示例

```yaml
sub_recipes:
  - name: "security_scan"
    path: "./subrecipes/security-analysis.yaml"
    values:  # in key-value format: {parameter_name}: {parameter_value}
      scan_level: "comprehensive"
      include_dependencies: "true"
  
  - name: "quality_check"
    path: "./subrecipes/quality-analysis.yaml"
    description: "Performs code quality analysis"
```

## 桌面版元数据字段

从 goose 桌面版保存的配方包含额外的元数据字段。这些字段由桌面应用用于组织和管理，但被 CLI 操作忽略。

| 字段 | 类型 | 必需 | 说明 |
|-------|------|----------|-------------|
| `recipe` | Object | ✅ |  包含所有配方字段（`title`、`description`、`instructions` 等） |
| `name` | String | ✅ |  配方库中使用的显示名称 |
| `isGlobal` | Boolean | ✅ |  配方是全局可用还是仅对项目本地可用 |
| `lastModified` | String | ✅ |  配方上次修改时间的 ISO 时间戳 |
| `isArchived` | Boolean | ✅ |  配方是否在桌面界面中归档 |

<details>
<summary>CLI 与桌面版格式示例</summary>

**CLI 格式**

<Tabs groupId="format">
  <TabItem value="yaml" label="YAML" default>

```yaml
version: "1.0.0"
title: "Code Review Assistant"
description: "Automated code review with best practices"
instructions: "You are a code reviewer..."
prompt: "Review the code in this repository"
extensions: []
```

  </TabItem>
  <TabItem value="json" label="JSON">

```json
{
  "version": "1.0.0",
  "title": "Code Review Assistant",
  "description": "Automated code review with best practices",
  "instructions": "You are a code reviewer...",
  "prompt": "Review the code in this repository",
  "extensions": []
}
```

  </TabItem>
</Tabs>

**桌面版格式**

<Tabs groupId="format">
  <TabItem value="yaml" label="YAML" default>

```yaml
name: "Code Review Assistant"
recipe:
  version: "1.0.0"
  title: "Code Review Assistant"
  description: "Automated code review with best practices"
  instructions: "You are a code reviewer..."
  prompt: "Review the code in this repository"
  extensions: []
isGlobal: true
lastModified: 2025-07-02T03:46:46.778Z
isArchived: false
```

  </TabItem>
  <TabItem value="json" label="JSON">

```json
{
  "name": "Code Review Assistant",
  "recipe": {
    "version": "1.0.0",
    "title": "Code Review Assistant",
    "description": "Automated code review with best practices",
    "instructions": "You are a code reviewer...",
    "prompt": "Review the code in this repository",
    "extensions": []
  },
  "isGlobal": true,
  "lastModified": "2025-07-02T03:46:46.778Z",
  "isArchived": false
}
```

  </TabItem>
</Tabs>

</details>

## 模板支持

配方在 `instructions`、`prompt` 和 `activities` 字段中支持 Jinja 风格模板语法，用于参数替换：

```yaml
instructions: "Follow these steps with {{ parameter_name }}"
prompt: "Your task is to {{ action }}"
activities:
  - "Process {{ parameter_name }} with {{ action }}"
```

高级模板功能包括：
- [转义模板变量](#escaping-template-variables)以获得字面输出
- 使用 `{% extends "parent.yaml" %}` 的[模板继承](#template-inheritance)
- 可以定义和覆盖的块：
  ```yaml
  {% block content %}
  Default content
  {% endblock %}
  ```
- [`indent()` 模板过滤器](#indent-filter-for-multi-line-values)

### 转义模板变量

要在配方中包含字面模板语法（如 `{{ variable }}`）而不进行参数替换，用单引号包裹它：

```yaml
prompt: |
  This will be substituted: {{ actual_parameter }}
  This will appear literally: {{'{{example_variable}}'}}
```

**示例：** 生成配置文件模板

```yaml
version: "1.0.0"
title: "Generate Config Template"
description: "Generate a template with placeholder values"
parameters:
  - key: app_name
    input_type: string
    requirement: required
    description: "Application name"

prompt: |
  Create a config.yaml file for {{ app_name }} with these placeholder variables:
  - {{'{{API_KEY}}'}} for the API key
  - {{'{{DATABASE_URL}}'}} for the database connection
  - {{'{{PORT}}'}} for the server port
```

### 模板继承

使用 `{% extends "parent.yaml" %}` 进行模板继承：

**父配方（`parent.yaml`）：**
```yaml
version: "1.0.0"
title: "Parent Recipe"
description: "Base recipe template"
prompt: |
  {% block prompt %}
  Default prompt text
  {% endblock %}
```

**子配方：**
```yaml
{% extends "parent.yaml" %}
{% block prompt %}
Modified prompt text
{% endblock %}
```

### 用于多行值的 indent() 过滤器

使用 `indent()` 过滤器确保多行参数值正确缩进，并可以作为有效的 JSON 或 YAML 格式解析。此示例使用 `{{ raw_data | indent(2) }}` 指定向子配方传递数据时缩进两个空格：

```yaml
sub_recipes:
  - name: "analyze"
    path: "./analyze.yaml"
    values:
      content: |
        {{ raw_data | indent(2) }}
```

### 内置参数

内置模板参数自动受支持，不必在 `parameters` 数组中定义。

| 参数 | 说明 |
|-----------|-------------|
| `recipe_dir` | 自动设为包含配方文件的目录。用它引用配套文件，例如：`{{ recipe_dir }}/style-guide.md` |

## 验证规则

加载配方时会强制执行来自 [`validate_recipe.rs`](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/recipe/validate_recipe.rs) 的验证规则，并由 [`goose recipe validate`](/docs/guides/goose-cli-commands#recipe) 子命令使用：

### 配方级验证

- `validate_prompt_or_instructions` - 必须至少存在 `instructions` 或 `prompt` 之一
- `validate_json_schema` - 如果指定了 `response.json_schema`，JSON 响应 schema 必须有效

### 参数验证

- `validate_parameters_in_template` - 所有模板变量都必须有对应的参数定义，且所有已定义的参数都必须被使用（没有未使用的参数）
- `validate_optional_parameters` - 可选参数必须有默认值
- `validate_optional_parameters` - 文件参数不能有默认值，以防止导入敏感文件

:::info
基本字段要求（必需字段、类型、字符限制）记录在[核心配方 schema](#core-recipe-schema)表中。
:::

## 完整配方示例

<Tabs groupId="format">
  <TabItem value="yaml" label="YAML" default>

```yaml
version: "1.0.0"
title: "Example Recipe"
description: "A sample recipe demonstrating the format"
instructions: "Process {{ file_count }} files using {{ required_param }} and output in {{ output_format }} format. Configuration: {{ config_file }}"
prompt: "Start processing with the provided parameters"
parameters:
  - key: required_param
    input_type: string
    requirement: required
    description: "A required text parameter"
  
  - key: file_count
    input_type: number
    requirement: optional
    default: 10
    description: "Maximum number of files to process"
  
  - key: output_format
    input_type: select
    requirement: required
    description: "Choose the output format"
    options:
      - json
      - markdown
      - csv
  
  - key: config_file
    input_type: file
    requirement: required
    description: "Path to configuration file"

extensions:
  - type: stdio
    name: codesearch
    cmd: uvx
    args:
      - mcp_codesearch@latest
    timeout: 300
    bundled: true
    description: "Query codesearch directly from goose"

settings:
  goose_provider: "anthropic"
  goose_model: "claude-sonnet-4-20250514"
  temperature: 0.7
  max_turns: 100

retry:
  max_retries: 3
  timeout_seconds: 30
  checks:
    - type: shell
      command: "echo 'Task validation check passed'"
  on_failure: "echo 'Retry attempt failed, cleaning up...'"

response:
  json_schema:
    type: object
    properties:
      result:
        type: string
        description: "The main result of the task"
      details:
        type: array
        items:
          type: string
        description: "Additional details of steps taken"
    required:
      - result
      - details
```

  </TabItem>
  <TabItem value="json" label="JSON">

```json
{
  "version": "1.0.0",
  "title": "Example Recipe",
  "description": "A sample recipe demonstrating the format",
  "instructions": "Process {{ file_count }} files using {{ required_param }} and output in {{ output_format }} format. Configuration: {{ config_file }}",
  "prompt": "Start processing with the provided parameters",
  "parameters": [
    {
      "key": "required_param",
      "input_type": "string",
      "requirement": "required",
      "description": "A required text parameter"
    },
    {
      "key": "file_count",
      "input_type": "number",
      "requirement": "optional",
      "default": "10",
      "description": "Maximum number of files to process"
    },
    {
      "key": "output_format",
      "input_type": "select",
      "requirement": "required",
      "description": "Choose the output format",
      "options": ["json", "markdown", "csv"]
    },
    {
      "key": "config_file",
      "input_type": "file",
      "requirement": "required",
      "description": "Path to configuration file"
    }
  ],
  "extensions": [
    {
      "type": "stdio",
      "name": "codesearch",
      "cmd": "uvx",
      "args": ["mcp_codesearch@latest"],
      "timeout": 300,
      "bundled": true,
      "description": "Query codesearch directly from goose"
    }
  ],
  "settings": {
    "goose_provider": "anthropic",
    "goose_model": "claude-sonnet-4-20250514",
    "temperature": 0.7,
    "max_turns": 100
  },
  "retry": {
    "max_retries": 3,
    "timeout_seconds": 30,
    "checks": [
      {
        "type": "shell",
        "command": "echo 'Task validation check passed'"
      }
    ],
    "on_failure": "echo 'Retry attempt failed, cleaning up...'"
  },
  "response": {
    "json_schema": {
      "type": "object",
      "properties": {
        "result": {
          "type": "string",
          "description": "The main result of the task"
        },
        "details": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "Additional details of steps taken"
        }
      },
      "required": ["result", "details"]
    }
  }
}
```

  </TabItem>
</Tabs>

## 错误处理

需要注意的常见错误：

- 缺少必需参数
- 可选参数没有默认值
- 模板变量没有参数定义
- 无效的 YAML/JSON 语法
- 缺少必需字段
- 无效的扩展配置
- 无效的重试配置（缺少必需字段、无效的 shell 命令）

发生这些情况时，goose 会提供有帮助的错误消息，指出需要修复什么。

### 重试特定错误

- **无效的成功检查**：无法执行或有语法错误的 shell 命令
- **超时错误**：超出超时限制的成功检查或 on_failure 命令
- **超过最大重试次数**：所有重试尝试都用尽仍未成功
- **缺少必需的重试字段**：未指定 `max_retries` 或 `checks`

## 了解更多
查看[配方](/docs/guides/recipes)指南，获取更多文档、工具和资源，帮助你掌握 goose 配方。
