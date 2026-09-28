---
sidebar_position: 1
title: 可复用配方
description: "把工具、目标和指令打包成可复用配方，他人可一键启动"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PanelLeft, ChefHat, SquarePen, Link, Clock, Terminal, Share2 } from 'lucide-react';
import RecipeFields from '@site/src/components/RecipeFields';

配方把工具、目标和指令打包成可复用工作流，他人（或未来的你）可以一键启动。

## 创建配方

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

  1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
  2. 在侧边栏中点击 `Recipes`
  3. 点击 `Create Recipe`
  4. 在打开的对话框中按需填写配方字段：
     <RecipeFields />
  5. 完成后，你可以：
     - 复制配方链接以与他人分享配方
     - 点击 `Save Recipe` 把配方保存到配方库
     - 点击 `Save & Run Recipe` 保存并立即在新会话中运行配方

  </TabItem>

  <TabItem value="cli" label="goose CLI">
   在编辑器中使用下面的配方结构创建 JSON 或 YAML 文件。

   <details>
   <summary>配方文件结构</summary>

   ```yaml
   # Required fields
   version: 1.0.0
   title: $title
   description: $description
   instructions: $instructions    # Define the model's behavior

   # Optional fields
   prompt: $prompt                # Initial message to start with
   extensions:                    # Tools the recipe needs
   - $extensions
   activities:                    # Example prompts to display in the Desktop app
   - $activities
   settings:                      # Additional settings
     goose_provider: $provider    # Provider to use for this recipe
     goose_model: $model          # Specific model to use for this recipe
     temperature: $temperature    # Model temperature setting for this recipe (0.0 to 1.0)
   retry:                         # Automated retry logic with success validation
     max_retries: $max_retries    # Maximum number of retry attempts
     checks:                      # Success validation checks
     - type: shell
       command: $validation_command
     on_failure: $cleanup_command # Optional cleanup command on failure
   ```
   </details>

    所有配方字段的详细说明和示例配置，见[配方参考指南](/docs/guides/recipes/recipe-reference)。

   :::tip 验证你的配方
   你应该[验证配方](#validate-recipe)，以确认它完整且格式正确。
   :::

   #### 可选参数

   你可以为配方添加参数，运行配方时用户需要填写数据。参数可以添加到配方的任何部分（指令、提示词、活动等）。

   要使用参数：
   1. 在配方内容中使用 `{{ variable_name }}` 语法添加模板变量
   2. 在 YAML 文件的 `parameters` 部分定义每个参数

   <details>
   <summary>带参数的示例配方</summary>

   ```yaml
   version: 1.0.0
   title: "{{ project_name }} Code Review" # Wrap the value in quotes if it starts with template syntax to avoid YAML parsing errors
   description: Automated code review for {{ project_name }} with {{ language }} focus
   instructions: You are a code reviewer specialized in {{ language }} development.
   prompt: |
      Apply the following standards:
      - Complexity threshold: {{ complexity_threshold }}
      - Required test coverage: {{ test_coverage }}%
      - Style guide: {{ style_guide }}
   activities:
   - "Review {{ language }} code for complexity"
   - "Check test coverage against {{ test_coverage }}% requirement"
   - "Verify {{ style_guide }} compliance"
   settings:                     
     goose_provider: "anthropic"   
     goose_model: "claude-3-7-sonnet-latest"          
     temperature: 0.7 
   parameters:
   - key: project_name
     input_type: string
     requirement: required # could be required, optional or user_prompt
     description: name of the project
   - key: language
     input_type: string
     requirement: required
     description: language of the code
   - key: complexity_threshold
     input_type: number
     requirement: optional
     default: 20 # default is required for optional parameters
     description: a threshold that defines the maximum allowed complexity
   - key: test_coverage
     input_type: number
     requirement: optional
     default: 80
     description: the minimum test coverage threshold in percentage
   - key: style_guide
     input_type: string
     description: style guide name
     requirement: user_prompt
     # If style_guide param value is not specified in the command, user will be prompted to provide a value, even in non-interactive mode
   ```
   </details>

   关于配方字段的更多信息，见[配方参考指南](/docs/guides/recipes/recipe-reference)。

   </TabItem> 
</Tabs>

## 编辑配方
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

   1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
   2. 在侧边栏中点击 `Recipes`
   3. 找到你想编辑的配方并点击 <SquarePen className="inline" size={16} /> 按钮
   4. 在出现的对话框中编辑以下任何内容：
      <RecipeFields />
   5. 完成后，你可以：
      - 复制配方链接以与他人分享配方
      - 点击 `Save Recipe` 保存更改
      - 点击 `Save & Run Recipe` 保存并立即在新会话中运行配方

  :::tip 编辑正在使用的配方
  你也可以在会话中使用配方时访问编辑对话框：只需点击应用底部的 <ChefHat className="inline" size={16} /> 按钮。发送第一条消息后该按钮会出现。
  :::
   
  </TabItem>

  <TabItem value="cli" label="goose CLI">
  配方文件创建后，你可以用喜欢的文本编辑器打开它并修改任何字段的值。

</TabItem> 
</Tabs>

## 使用配方

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

  1. 使用直接链接或手动输入 URL，或从配方库打开配方：

     **直接链接：**

         1. 点击与你分享的配方链接

     **手动输入 URL：**

         1. 把配方链接粘贴到浏览器地址栏
         2. 按 `Enter` 并点击 `Open Goose.app` 提示
       
     **配方库：**

         1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
         2. 在侧边栏中点击 `Recipes`
         3. 在配方库中找到你的配方
         4. 点击你想打开的配方旁边的 `Use`

     **斜杠命令：**

         1. 在任何 goose 聊天会话中输入[自定义斜杠命令](/docs/guides/context-engineering/slash-commands)

  2. 首次运行配方时，警告对话框会显示配方的标题、描述和指令供你审查。如果你信任配方内容，点击 `Trust and Execute` 继续。除非配方发生变化，否则不会再次为同一配方提示你。

  3. 如果配方包含参数，在 `Recipe Parameters` 对话框中输入你的值并点击 `Start Recipe`。
  
     参数是配方中使用的动态值：

     - **必需参数**用红色星号（*）标记
     - **可选参数**显示可以更改的默认值

  4. 配方会自动提交，goose 开始执行。如果配方包含[提示词](#core-components)，它会作为第一条消息发送。如果没有，你可以点击活动气泡或发送提示来开始。

  :::info 隐私与隔离
  - 每个人都有自己的私有会话
  - 用户之间不共享数据
  - 你的会话不会影响原始配方创建者的会话
  :::
  </TabItem>

  <TabItem value="cli" label="goose CLI">

  使用 goose CLI 的配方可能涉及以下任务：
  - [配置配方位置](#configure-recipe-location)
  - [运行配方](#run-a-recipe)
  - [调度配方](#schedule-recipe)

   #### 配置配方位置

  配方可以存储在你设备的本地，或存储在 GitHub 仓库中。使用 `goose configure` 命令或[配置文件](/docs/guides/config-files#global-settings)配置你的配方仓库。

  :::tip 仓库结构
  - 每个配方应在自己的目录中
  - 目录名与你在命令中使用的配方名匹配
  - 配方文件可以是 recipe.yaml 或 recipe.json
  :::

   <Tabs>
     <TabItem value="configure" label="Using goose configure" default>

       运行配置命令：
       ```sh
       goose configure
       ```

       你会看到以下提示：

       ```sh
       ┌  goose-configure 
       │
       ◆  What would you like to configure?
       │  ○ Configure Providers 
       │  ○ Add Extension 
       │  ○ Toggle Extensions 
       │  ○ Remove Extension 
       // highlight-start
       │  ● goose settings (Set the goose mode, Tool Output, Tool Permissions, Experiment, goose recipe github repo and more)
       // highlight-end
       │
       ◇  What would you like to configure?
       │  goose settings 
       │
       ◆  What setting would you like to configure?
       │  ○ goose mode 
       │  ○ Tool Permission 
       │  ○ Tool Output 
       │  ○ Toggle Experiment 
       // highlight-start
       │  ● goose recipe github repo (goose will pull recipes from this repo if not found locally.)
       // highlight-end
       └  
       ┌  goose-configure 
       │
       ◇  What would you like to configure?
       │  goose settings 
       │
       ◇  What setting would you like to configure?
       │  goose recipe github repo 
       │
       ◆  Enter your goose recipe GitHub repo (owner/repo): eg: my_org/goose-recipes
       // highlight-start
       │  squareup/goose-recipes (default)
       // highlight-end
       └  
       ```

     </TabItem>

     <TabItem value="config" label="Using config file">

       添加到你的配置文件：
       ```yaml title="~/.config/goose/config.yaml"
       GOOSE_RECIPE_GITHUB_REPO: "owner/repo"
       ```

     </TabItem>
   </Tabs>

   #### 运行配方

   <Tabs groupId="interface">
     <TabItem value="local" label="Local Recipe" default>

       **基本用法** - 运行一次并退出（更多内容见[运行选项](/docs/guides/goose-cli-commands#run-options)和[配方命令](/docs/guides/goose-cli-commands#recipe)）：
       ```sh
       # Using recipe file in current directory or [`GOOSE_RECIPE_PATH`](/docs/guides/environment-variables#recipe-configuration) directories
       goose run --recipe recipe.yaml

       # Using full path
       goose run --recipe ./recipes/my-recipe.yaml
       ```

       **预览配方** - 使用 [`explain`](/docs/guides/goose-cli-commands#run-options) 命令在运行前查看细节：
 
       **交互模式** - 开始交互式会话：
       ```sh
       goose run --recipe recipe.yaml --interactive
       ```
       交互模式会提示必需的值：
       ```sh
       ◆ Enter value for required parameter 'language':
       │ Python
       │
       ◆ Enter value for required parameter 'style_guide':
       │ PEP8
       ```

       **带参数** - 运行配方时提供参数值。详细示例和选项见 [`run` 命令文档](/docs/guides/goose-cli-commands#run-options)。

       基本示例：
       ```sh
       goose run --recipe recipe.yaml --params language=Python
       ```

       **斜杠命令** - 在任何 goose 聊天会话中输入[自定义斜杠命令](/docs/guides/context-engineering/slash-commands)

     </TabItem>

     <TabItem value="github" label="GitHub Recipe">

       配置 GitHub 仓库后，你可以按名称运行配方：

       **基本用法** - 使用与目录匹配的配方名从已配置的仓库运行配方（更多内容见[运行选项](/docs/guides/goose-cli-commands#run-options)和[配方命令](/docs/guides/goose-cli-commands#recipe)）：

       ```sh
       goose run --recipe recipe-name
       ```

       例如，如果你的仓库结构是：
       ```
       my-repo/
       ├── code-review/
       │   └── recipe.yaml
       └── setup-project/
           └── recipe.yaml
       ```
       
       你会运行以下命令来运行代码审查配方：
       ```sh
       goose run --recipe code-review
       ```

      **预览配方** - 使用 [`explain`](/docs/guides/goose-cli-commands#run-options) 命令在运行前查看细节：

       **交互模式** - 带参数提示：
       ```sh
       goose run --recipe code-review --interactive
       ```
       交互模式会提示必需的值：
       ```sh
       ◆ Enter value for required parameter 'project_name':
       │ MyProject
       │
       ◆ Enter value for required parameter 'language':
       │ Python
       ```

       **带参数** - 运行配方时提供参数值。详细示例和选项见 [`run` 命令文档](/docs/guides/goose-cli-commands#run-options)。

     </TabItem>
   </Tabs>
  :::info 隐私与隔离
  - 每个人都有自己的私有会话
  - 用户之间不共享数据
  - 你的会话不会影响原始配方创建者的会话
  :::

   </TabItem>
</Tabs>

## 验证配方

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    配方验证只能通过 CLI 使用。
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    验证你的配方文件以确保它配置正确。验证会确认：
    - 所有必需字段都存在
    - 参数格式正确
    - 引用的扩展存在且有效
    - YAML/JSON 语法正确

   ```sh
   goose recipe validate recipe.yaml
   ```

   :::info
   如果你想验证刚创建的配方，需要在运行 [`validate` 子命令](/docs/guides/goose-cli-commands#recipe)之前[退出会话](/docs/guides/sessions/session-management#exit-session)。
   :::

   配方验证可用于：
    - 排查未按预期工作的配方
    - 手动编辑后验证配方
    - CI/CD 流水线中的自动化测试

  </TabItem>
</Tabs>

## 分享配方
使用配方链接或配方文件与 goose 用户分享你的配方。

:::info 隐私与隔离
每个接收者在使用你分享的配方时都会获得自己的私有会话。用户之间不共享数据，你的原始会话和配方不受影响。
:::

### 通过配方链接分享
你可以通过配方链接与桌面版用户分享配方。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    从配方库复制深层链接以与他人分享：
    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
    2. 在侧边栏中点击 `Recipes`
    3. 找到你想分享的配方并点击 <Link className="inline" size={16} /> 按钮复制链接

  </TabItem>
  <TabItem value="cli" label="goose CLI">
    从配方文件生成深层链接以与他人分享：
    ```sh
    goose recipe deeplink <FILE>
    ```

    你也可以提供参数值以预填 `Recipe Parameters` 对话框：
    ```sh
    goose recipe deeplink <FILE> --param key1=value1 --param key2=value2
    ```
  </TabItem>
</Tabs>

有人点击链接时，它会用你的配方配置打开 goose 桌面版。他们也可以使用你的配方链接[导入配方](/docs/guides/recipes/storing-recipes#importing-recipes)以供将来使用。

### 通过配方文件分享
你可以通过直接发送配方文件与桌面版或 CLI 用户分享配方。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

  在 goose 桌面版中，你可以导出配方文件或复制其内容以与他人分享。

  1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
  2. 在侧边栏中点击 `Recipes`
  3. 找到你想分享的配方并点击 <Share2 className="inline" size={16} /> 按钮
  4. 选择分享方式：
     - 要把配方下载为 `.yaml` 文件：选择 `Export to File`，选择下载位置，然后点击 `Save`
     - 要把配方的 YAML 内容复制到剪贴板：选择 `Copy YAML`

  其他桌面版用户可以把[配方导入](/docs/guides/recipes/storing-recipes#importing-recipes)到他们的配方库。

  </TabItem>
  <TabItem value="cli" label="goose CLI">

  导出或复制配方内容只能通过桌面版使用，但你可以直接复制本地配方文件。

  CLI 用户可以使用 `goose run --recipe <FILE>` 运行分享的配方文件，或用 `goose recipe open <FILE>` 直接在 goose 桌面版中打开它。细节见 [CLI 命令指南](/docs/guides/goose-cli-commands#recipe)。

  </TabItem>
</Tabs>

## 调度配方
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
通过按计划运行来自动化 goose 配方。创建计划时，你会配置：
- **名称**：计划的描述性名称
- **来源**：要运行的配方
- **执行模式**：配方在后台运行（无窗口，保存结果）还是在前台运行（如果 goose 桌面版正在运行则打开窗口，否则在后台运行）
- **频率和时间**：何时运行配方（例如每 20 分钟，每周五上午 10 点）。你的选择会转换为 goose 使用的 [cron 表达式](https://en.wikipedia.org/wiki/Cron#Cron_expression)。

**从配方库调度：**

   1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
   2. 在侧边栏中点击 `Recipes`
   3. 找到你想调度的配方并点击 <Clock className="inline" size={16} /> 按钮
   4. 点击 `Create Schedule`
   5. 在出现的对话框中配置计划。对于 **Source**，你的配方链接已经提供。
   6. 点击 `Create Schedule`

**从调度器视图调度：**

   1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
   2. 点击 `Scheduler`
   3. 点击 `Create Schedule`
   4. 在出现的对话框中配置计划。对于 **Source**，选择 `.yaml` 或 `.yml` 文件，或提供[配方链接](#share-recipe)。
   5. 点击 `Create Schedule`

**管理已调度的配方**

你已调度的配方列在 `Scheduler` 页面中。
点击一个计划以查看细节、查看上次运行时间，并对已调度的配方执行操作：
- `Run Schedule Now` 手动触发配方
- `Edit Schedule` 更改调度频率
- `Pause Schedule` 停止配方自动运行

在 `Schedule Details` 页面底部，你可以查看由已调度配方创建的会话列表，并打开或恢复每个会话。

  </TabItem>
  <TabItem value="cli" label="goose CLI">
  通过用 [cron 表达式](https://en.wikipedia.org/wiki/Cron#Cron_expression)调度它们来自动化 goose 配方。

  ```bash
  # Add a new scheduled recipe which runs every day at 9 AM
  goose schedule add --schedule-id daily-report --cron "0 0 9 * * *" --recipe-source ./recipes/daily-report.yaml
  ```
  你可以使用 5、6 或 7 位 cron 表达式以获得完整的调度精度，格式为 “seconds minutes hours day-of-month month day-of-week year”。

  详细示例和选项见 [`schedule` 命令文档](/docs/guides/goose-cli-commands#schedule)。
</TabItem>
</Tabs>

## 核心组件

 配方需要这些核心组件：

   - **指令**：定义代理的行为和能力
      - 充当代理的使命声明
      - 让代理准备好执行任何相关任务
      - 如果没有提供提示词则为必需

   - **提示词**（可选）：自动开始对话
      - 没有提示词时，代理等待用户输入
      - 适用于特定的即时任务
      - 如果没有提供指令则为必需

   - **活动**：显示为可点击气泡的示例任务
      - 帮助用户理解配方能做什么
      - 让开始变得容易

## 高级功能

### 自动重试逻辑

配方可以包含重试逻辑，自动多次尝试完成任务，直到满足成功标准。这对以下情况特别有用：

- 需要确保成功完成的**自动化工作流**
- 可能需要多次尝试的**开发任务**，例如运行测试
- 需要验证和清理的**系统操作**

**基本重试配置：**
```yaml
retry:
  max_retries: 3
  checks:
    - type: shell
      command: "test -f output.txt"  # Check if output file exists
  on_failure: "rm -f temp_files*"   # Cleanup on failure
```

**工作原理：**
1. 配方按提供的指令正常执行
2. 完成后，成功检查验证结果
3. 如果验证失败且仍有重试次数：
   - 运行可选的清理命令
   - 代理状态重置为初始条件
   - 配方执行重新开始
4. 过程继续，直到成功或达到最大重试次数

完整的重试配置选项和示例见[配方参考指南](/docs/guides/recipes/recipe-reference#retry)。

### 用于自动化的结构化输出

配方可以强制[结构化 JSON 输出](/docs/guides/recipes/recipe-reference#response)，使它们非常适合需要可靠解析和处理代理响应的自动化工作流。主要好处包括：

- **可靠解析**：为脚本、自动化和 CI/CD 流水线提供一致的 JSON 格式
- **内置验证**：确保输出符合你的要求
- **易于提取**：最终输出显示为单行，便于简单解析

结构化输出特别适用于：
- **开发工作流**：代码分析报告、带通过/失败计数的测试结果，以及带部署就绪状态的构建状态
- **数据处理**：带计数和验证状态的结果，带结构化发现的内容分析
- **文档生成**：一致的元数据和结构化项目报告，供进一步处理

**结构化输出配置示例：**
```yaml
response:
  json_schema:
    type: object
    properties:
      build_status:
        type: string
        enum: ["success", "failed", "warning"]
        description: "Overall build result"
      tests_passed:
        type: number
        description: "Number of tests that passed"
      tests_failed:
        type: number
        description: "Number of tests that failed"
      artifacts:
        type: array
        items:
          type: string
        description: "Generated build artifacts"
      deployment_ready:
        type: boolean
        description: "Whether the build is ready for deployment"
    required:
      - build_status
      - tests_passed
      - tests_failed
      - deployment_ready
```

**工作原理：**
1. 配方按提供的指令正常运行
2. goose 用匹配你 schema 的 JSON 调用 `final_output` 工具
3. 输出对照 JSON schema 验证
4. 如果验证失败，goose 会收到错误细节并必须纠正输出
5. 最终验证过的 JSON 作为输出的最后一行出现，便于提取

**自动化用法示例：**
```bash
# Run recipe and extract JSON output
goose run --recipe analysis.yaml --params project_path=./src > output.log
RESULT=$(tail -n 1 output.log)
echo "Analysis Status: $(echo $RESULT | jq -r '.build_status')"
echo "Issues Found: $(echo $RESULT | jq -r '.tests_failed')"
```

:::info
结构化输出在 goose CLI 和 goose 桌面版中运行的配方上都受支持。但是，创建和编辑 `json_schema` 配置必须在配方文件中手动完成。
:::

## 包含的内容

配方捕获：

- AI 指令（目标/目的）
- 建议的活动（供用户点击的示例）
- 已启用的扩展及其配置
- 项目文件夹或文件上下文
- 初始设置（但不是完整对话历史）
- 运行配方时使用的模型和提供商（可选）
- 重试逻辑和成功验证配置（如果已配置）


为保护你的隐私和系统完整性，goose 排除：

- 全局和本地记忆
- API 密钥和个人凭据
- 系统级 goose 设置


这意味着如果配方依赖这些元素，其他人可能需要提供自己的凭据或记忆上下文。

## 了解更多
查看[配方](/docs/guides/recipes)指南，获取更多文档、工具和资源，帮助你掌握 goose 配方。
