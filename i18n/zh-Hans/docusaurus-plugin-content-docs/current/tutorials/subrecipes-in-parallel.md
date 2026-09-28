---
title: 并行运行子配方
sidebar_label: 并行子配方
description: 并发运行多个子配方实例，并实时跟踪进度
---

goose 配方可以使用隔离的工作进程，并发执行多个[子配方](/docs/guides/recipes/subrecipes)实例。此功能支持高效的批处理、不同任务的并行处理，以及更快完成复杂工作流。

:::warning 实验性功能
并行运行子配方是一项正在积极开发的实验性功能。行为和配置可能在后续版本中变化。
:::

以下是一些常见用例：

- **单体仓库构建失败**：当单体仓库构建中有 3 个服务失败时，对每个构建 URL 使用“诊断失败”子配方，并行诊断所有失败
- **文档摘要**：处理包含文档链接的 CSV 文件时，为每个链接同时运行“摘要文档”子配方
- **跨仓库代码分析**：同时对多个代码库运行安全、质量和性能分析

## 工作原理

并行子配方执行使用隔离的工作系统，自动管理并发任务执行。goose 为每个子配方实例创建单独的任务，并把它们分配到最多 10 个并发工作进程上。

| 场景 | 默认行为 | 覆盖选项 |
|----------|------------------|------------------|
| **不同的子配方** | 顺序执行 | 在提示中加上 “in parallel” |
| **同一子配方**，参数不同 | 并行执行 | • 设置 `sequential_when_repeated: true`<br />• 在提示中加上 “sequentially” |

### 不同的子配方

运行不同的子配方时，goose 根据以下因素决定执行模式：
1. **提示中的明确用户请求**（“in parallel”、“sequentially”）
2. **默认顺序执行**：除非明确要求并行运行，否则不同的子配方会一个接一个运行

在提示中调用不同的子配方时，只需提到 “in parallel”：

```yaml
prompt: |
  run the following subrecipes in parallel:
    - use weather subrecipe to get the weather for Sydney
    - use things-to-do subrecipe to find activities in Sydney
```

### 同一子配方

用不同参数运行同一子配方时，goose 根据以下因素决定执行模式：
1. **[配方级配置](#choosing-between-execution-modes)**（`sequential_when_repeated` 标志）——设为 true 时强制顺序执行
2. **提示中的用户请求**（用 “sequentially” 覆盖默认的并行行为）
3. **默认并行执行**：同一子配方的多个实例并发运行

如果提示暗示同一子配方要执行多次，goose 会自动创建并行实例：

```yaml
prompt: |
  get the weather for three biggest cities in Australia
```

在这个例子中，goose 识别出 “three biggest cities” 需要为不同城市多次运行天气子配方，因此会并行执行它们。

如果想顺序运行，直接告诉 goose 即可：

```yaml
prompt: |
  get the weather for three biggest cities in Australia one at a time
```

### 实时进度监控

从 CLI 并行运行多个任务时，可以通过执行期间自动出现的实时仪表板跟踪进度。仪表板提供：
- **实时进度跟踪**：用已完成、运行中、失败和待处理的统计实时监控任务完成情况
- **任务详情**：查看唯一任务 ID、参数集、执行耗时、输出预览和错误信息，任务会从 Pending → Running → Completed/Failed 推进

## 示例

### 并行运行不同的子配方

此示例并行运行 `weather` 和 `things-to-do` 子配方：

```yaml
# plan_trip.yaml
version: 1.0.0
title: Plan Your Trip
description: Get weather forecast and find things to do for your destination
instructions: You are a travel planning assistant that helps users prepare for their trips.
prompt: |
  run the following subrecipes in parallel to plan my trip:
    - use weather subrecipe to get the weather forecast for Sydney
    - use things-to-do subrecipe to find activities and attractions in Sydney
sub_recipes:
- name: weather
  path: "./subrecipes/weather.yaml"
  values:
    city: Sydney
- name: things-to-do
  path: "./subrecipes/things-to-do.yaml"
  values:
    city: Sydney
    duration: "3 days"
extensions:
- type: builtin
  name: developer
  timeout: 300
  bundled: true
```

### 并行运行同一子配方（参数不同）

此示例为不同城市并行运行三个 `weather` 子配方实例：

```yaml
# multi_city_weather.yaml
version: 1.0.0
title: Multi-City Weather Comparison
description: Compare weather across multiple cities for trip planning
instructions: You are a travel weather specialist helping users compare conditions across cities.
prompt: |
  get the weather forecast for the three biggest cities in Australia 
  to help me decide where to visit
sub_recipes:
- name: weather
  path: "./subrecipes/weather.yaml"
extensions:
- type: builtin
  name: developer
  timeout: 300
  bundled: true
```

**子配方：**

<details>
  <summary>weather</summary>
    ```yaml
    # subrecipes/weather.yaml
    version: 1.0.0
    title: Find weather
    description: Get weather data for a city
    instructions: You are a weather expert. You will be given a city and you will need to return the weather data for that city.
    prompt: |
      Get the weather forecast for {{ city }} for today and the next few days.
    parameters:
      - key: city
        input_type: string
        requirement: required
        description: city name
    extensions:
      - type: stdio
        name: weather
        cmd: uvx
        args:
          - mcp_weather@latest
        timeout: 300
    ```
</details>

<details>
  <summary>things-to-do</summary>
    ```yaml
    # subrecipes/things-to-do.yaml
    version: 1.0.0
    title: Things to do in a city
    description: Find activities and attractions for travelers
    instructions: You are a local travel expert who knows the best activities, attractions, and experiences in cities around the world.
    prompt: |
      Suggest the best things to do in {{ city }} for a {{ duration }} trip. 
      Include a mix of popular attractions, local experiences, and hidden gems.
      {% if weather_context %}
      Consider the weather conditions: {{ weather_context }}
      {% endif %}
    parameters:
      - key: city
        input_type: string
        requirement: required
        description: city name
      - key: duration
        input_type: string
        requirement: required
        description: trip duration (e.g., "2 days", "1 week")
      - key: weather_context
        input_type: string
        requirement: optional
        default: ""
        description: weather conditions to consider for activity recommendations
    ```
</details>

## 在执行模式之间选择 {#choosing-between-execution-modes}

并行执行能加快速度，但有时必须或更适合顺序执行。可以这样决定：

**在以下情况使用顺序执行：**
- 任务会修改共享资源
- 执行顺序很重要
- 存在内存或 CPU 限制
- 需要调试并行模式下的复杂失败

**在以下情况使用并行执行：**
- 任务彼此独立
- 希望更快完成
- 系统资源能够承受最多 10 个并行工作进程的并发执行
- 处理大型数据集或多个文件

**配方级配置：**

对于绝不应该并行运行的子配方，设置 `sequential_when_repeated: true` 以覆盖用户请求：

```yaml
sub_recipes:
  - name: database-migration
    path: "./subrecipes/migrate.yaml"
    sequential_when_repeated: true  # Always sequential
```

## 了解更多
查看[配方](/docs/guides/recipes)指南，获取更多文档、工具和资源，帮助你掌握 goose 配方。
