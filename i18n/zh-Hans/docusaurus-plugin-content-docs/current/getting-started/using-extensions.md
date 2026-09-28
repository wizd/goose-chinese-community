---
sidebar_position: 3
title: 使用扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PanelLeft, Settings, Puzzle } from 'lucide-react';

扩展是附加组件，通过连接你工作流中已经在用的应用和工具来扩展 goose 的功能。这些扩展可以用来添加新功能、访问数据和资源，或与其他系统集成。

扩展基于 [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol)，因此你可以把 goose 连接到广泛的能力生态。

goose 会在激活前自动检查外部扩展是否含有已知恶意软件。如果检测到恶意软件包，[扩展会被阻止](/docs/troubleshooting/known-issues#malicious-package-detected)，并给出清晰的错误消息。

:::tip 教程
查看添加和使用各种 goose 扩展的[分步教程](/docs/category/mcp-servers)
:::

## 内置扩展
goose 包含多个可以开箱即用的内置扩展：

- [Developer](/docs/mcp/developer-mcp)：提供一组对软件开发有用的通用开发工具。Developer 扩展**默认启用**。
- [Computer Controller](/docs/mcp/computer-controller-mcp)：提供用于网页抓取、文件缓存和自动化的通用计算机控制工具。
- [Memory](/docs/mcp/memory-mcp)：教 goose 在使用过程中记住你的偏好。
- [Tutorial](/docs/mcp/tutorial-mcp)：提供学习 goose 的交互式教程。
- [Auto Visualiser](/docs/mcp/autovisualiser-mcp)：在对话中自动生成图形化数据可视化。

:::warning 访问控制
goose 默认自主运行。结合 Developer 扩展的工具，这意味着 goose 可以在未经你批准的情况下执行命令和修改文件。如果你想对此有更多控制，可以配置 [goose 权限模式](/docs/guides/managing-tools/goose-permissions)和[工具权限](/docs/guides/managing-tools/tool-permissions)。简要概览见[配置访问控制](/docs/mcp/developer-mcp#configuring-access-controls)。
:::

### 内置平台扩展

平台扩展是提供全局功能的内置扩展，例如代码分析、对话搜索、任务跟踪和扩展管理。可以按需打开或关闭。

- [Analyze](/docs/guides/codebase-analysis)：分析代码结构、文件细节和符号调用图（默认启用）
- [Apps](/docs/mcp/apps-mcp)：在独立窗口中创建、管理和启动自定义 HTML 应用
- [Chat Recall](/docs/mcp/chatrecall-mcp)：在全部会话历史中搜索对话内容
- [Code Mode](/docs/mcp/code-mode-mcp)：当当前构建包含它时，执行 JavaScript 代码以进行工具发现和工具调用
- [Extension Manager](/docs/mcp/extension-manager-mcp)：在会话期间动态发现、启用和禁用扩展（默认启用）
- [Skills](/docs/guides/context-engineering/using-skills)：从内置技能和文件系统技能中发现并加载技能指令（默认启用）
- [Summon](/docs/mcp/summon-mcp)：加载知识来源并把任务委派给子代理（默认启用）
- [Todo](/docs/mcp/todo-mcp)：管理任务列表并跨会话跟踪进度
- [Top of Mind](/docs/mcp/tom-mcp)：每一轮都把持久指令注入 goose 的工作记忆

### 切换内置扩展

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
  2. 在侧边栏中点击 `Extensions` 按钮。
  3. 在 `Extensions` 下，可以打开或关闭内置扩展。
  </TabItem>

  <TabItem value="cli" label="goose CLI">
    
    如果你知道想添加的扩展的确切名称，运行：

    ```sh
    goose mcp {name}
    ```

    要浏览可用扩展：

    1. 运行以下命令：
        ```sh
        goose configure
        ```
    2. 从菜单中选择 `Add Extension`。用上下键高亮你的选择，然后按 `Enter`。
    3. 选择 `Built-In Extension`。
    4. 选择要启用的扩展。
    5. 为扩展提供超时（以秒为单位）。
    6. 按 `Enter`。

    **示例：添加内置扩展**

    ```
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension 
    │
    ◇  What type of extension would you like to add?
    │  Built-in Extension 
    │
    ◇  Which built-in extension would you like to enable?
    │  Auto Visualiser
    │        
    ◇  Please set the timeout for this tool (in secs):
    │  300
    │ 
    └  Enabled Auto Visualiser extension    
    ```
  </TabItem>
</Tabs>


:::info
goose 的内置扩展本身就是 MCP 服务器。如果你想把 goose 附带的 MCP 服务器用于任何其他代理，可以这样做。
:::

## 发现扩展

goose 提供一个可安装和使用的扩展[中心目录][extensions-directory]。

你也可以把任何其他 [MCP 服务器](#mcp-servers)添加为 goose 扩展，即使它不在我们的目录中。


## 添加扩展

扩展可以直接通过[扩展目录][extensions-directory]、CLI 或 UI 安装。

:::warning 隔离环境
如果你处于企业或隔离环境，且扩展无法激活，变通办法见[隔离/离线环境](/docs/troubleshooting/known-issues#airgappedoffline-environment-issues)。
:::

### MCP 服务器

你可以把任何 MCP 服务器安装为 goose 扩展。

许多 MCP 服务器在理解你的活动工作区时工作得更好。goose 支持 [MCP Roots](/docs/guides/mcp-roots)，让支持 roots 的扩展自动看到当前会话的工作目录。

:::tip MCP 服务器目录
在 **[MCP 服务器目录](https://www.pulsemcp.com/servers)** 中查看可用服务器。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
 
  1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
  2. 在侧边栏中点击 `Extensions` 按钮。
  3. 在 `Extensions` 下点击 `Add custom extension`。
  4. 在 `Add custom extension` 对话框中输入必要细节
     - 如果添加环境变量，点击变量右侧的 `Add` 按钮
     - `Timeout` 字段让你设置 goose 应等待该扩展的工具调用完成多久
  5. 点击 `Add` 按钮
  
  #### 添加 [Knowledge Graph Memory MCP 服务器](https://github.com/modelcontextprotocol/servers/tree/main/src/memory)的示例：
    * **类型**：`Standard IO`
    * **ID**：`kgm-mcp`（_可设为任意值_）
    * **名称**：`Knowledge Graph Memory`（_可设为任意值_）
    * **描述**：`maps and stores complex relationships between concepts`（_可设为任意值_）
    * **命令**：`npx -y @modelcontextprotocol/server-memory`
  </TabItem>

  <TabItem value="cli" label="goose CLI">
  
  1. 运行以下命令：

    ```sh
    goose configure
    ```

  2. 从菜单中选择 `Add Extension`。

  3. 选择你想添加的扩展类型：
      - `Built-In Extension`：使用随 goose 预装的扩展。
      - `Command-Line Extension`：添加要作为扩展运行的本地命令或脚本。
      - `Remote Extension (Streamable HTTP)`：通过 Streamable HTTP 连接到远程系统

  4. 根据所选扩展类型按照提示操作。

  #### 添加 [Knowledge Graph Memory MCP 服务器](https://github.com/modelcontextprotocol/servers/tree/main/src/memory)的示例：

<Tabs groupId="extensions">
   <TabItem value="node" label="Node">
  ```
 ┌   goose-configure 
 │
 ◇  What would you like to configure?
 │  Add Extension 
 │
 ◇  What type of extension would you like to add?
 │  Command-line Extension 
 │
 ◇  What would you like to call this extension?
 │  Knowledge Graph Memory
 │
 ◇  What command should be run?
 │  npx -y @modelcontextprotocol/server-memory
 │
 ◇  Please set the timeout for this tool (in secs):
 │  300
 │
 ◆  Would you like to add environment variables?
 │  No 
 │
 └  Added Knowledge Graph Memory extension
 ```

   </TabItem>
   <TabItem value="python" label="Python">

  ```
 ┌   goose-configure
 │
 ◇  What would you like to configure?
 │  Add Extension
 │
 ◇  What type of extension would you like to add?
 │  Command-line Extension
 │
 ◇  What would you like to call this extension?
 │  Wikipedia Reader
 │
 ◇  What command should be run?
 │  uvx mcp-wiki
 │
 ◇  Please set the timeout for this tool (in secs):
 │  300
 │
 ◆  Would you like to add environment variables?
 │  No
 │
 └  Added Wikipedia Reader extension
 ```

   </TabItem>
   <TabItem value="java" label="Java">

注意：Java 和 Kotlin 扩展仅在 Linux 和 macOS 上受支持

  ```
 ┌   goose-configure
 │
 ◇  What would you like to configure?
 │  Add Extension
 │
 ◇  What type of extension would you like to add?
 │  Command-line Extension
 │
 ◇  What would you like to call this extension?
 │  Spring Data Explorer
 │
 ◇  What command should be run?
 │  jbang -Dspring.profiles.active=dev org.example:spring-data-mcp:1.0.0
 │
 ◇  Please set the timeout for this tool (in secs):
 │  300
 │
 ◆  Would you like to add environment variables?
 │  Yes
 │
 ◇  Environment variable name:
 │  SPRING_DATASOURCE_URL
 │
 ◇  Environment variable value:
 │  jdbc:postgresql://localhost:5432/mydb
 │
 ◇  Add another environment variable?
 │  No
 │
 └  Added Spring Data Explorer extension
 ```

   </TabItem>
  </Tabs>

  </TabItem>
</Tabs>


### 深层链接

可以使用 goose 的深层链接协议安装扩展。URL 格式因扩展类型而异：

<Tabs groupId="interface">
  <TabItem value="stdio" label="StandardIO" default>
```
goose://extension?cmd=<command>&arg=<argument>&id=<id>&name=<name>&description=<description>
```

必需参数：
- `cmd`：要运行的基础命令，为 `jbang`、`npx`、`uvx`、`goosed` 或 `docker` 之一
- `arg`：（仅 cmd）命令参数（多个参数可以重复：`&arg=...&arg=...`）
- `timeout`：等待扩展响应的最长时间（秒）
- `id`：扩展的唯一标识符
- `name`：扩展的显示名称
- `description`：扩展功能的简短描述

像 `npx -y @modelcontextprotocol/server-github` 这样的命令会表示为：

```
goose://extension?cmd=npx&arg=-y&arg=%40modelcontextprotocol/server-github&timeout=<timeout>&id=<id>&name=<name>&description=<description>
```

请注意，`npx` 命令的每个参数在深层链接中都作为单独的 `arg` 参数传递。
  </TabItem>
  <TabItem value="streamable_http" label="Streamable HTTP">
```
goose://extension?url=<remote-streamable-http-url>&type=streamable_http&id=<id>&name=<n>&description=<description>
```

参数：
- `url`：远程 Streamable HTTP 服务器的 URL
- `type`：必须设为 `streamable_http` 以指定协议类型
- `timeout`：等待扩展响应的最长时间（秒）
- `id`：扩展的唯一标识符
- `name`：扩展的显示名称
- `description`：扩展功能的简短描述

例如，`https://example.com/streamable` 这样的 URL 在 URL 编码后的深层链接如下：

```
goose://extension?url=https%3A%2F%2Fexample.com%2Fstreamable&type=streamable_http&timeout=<timeout>&id=<id>&name=<n>&description=<description>
```

  </TabItem>
</Tabs>

:::note
深层链接中的所有参数都必须进行 URL 编码。例如，空格应替换为 `%20`，`@` 应替换为 `%40`。
:::


### 配置条目
高级用户也可以直接编辑配置文件（`~/.config/goose/config.yaml`）来添加、移除或更新扩展：

```yaml
extensions:
  github:
    name: GitHub
    cmd: npx
    args: [-y @modelcontextprotocol/server-github]
    enabled: true
    envs: { "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>" }
    type: stdio
    timeout: 300
```

#### 带有预先注册 OAuth 客户端的远程扩展

需要 OAuth 的远程（`streamable_http`）扩展通常会使用 Client ID Metadata Documents 或动态客户端注册自动获取客户端 ID。有些授权服务器两者都不支持，而是要求使用事先注册的客户端。对于这些服务器，在扩展上设置 `client_id`——对于机密客户端，还要设置 `client_secret_key`：

```yaml
extensions:
  remote-example:
    name: Remote Example
    type: streamable_http
    uri: https://example.com/mcp
    client_id: <YOUR_REGISTERED_CLIENT_ID>
    client_secret_key: REMOTE_EXAMPLE_OAUTH_SECRET
    scopes:
      - example.readonly
    enabled: true
    timeout: 300
```

- `client_id`：在服务器的授权服务器上注册的 OAuth 客户端 ID。设置后，它优先于 Client ID Metadata Documents 和动态客户端注册。支持 `$VAR`/`${VAR}` 替换。
- `client_secret_key`：保存客户端机密的环境变量/机密键名，从 `envs`/`env_keys` 或 goose 的机密存储（`goose configure` > 扩展机密）解析。机密值本身从不写入配置文件。对于仅用 PKCE 认证的公共客户端，省略它。
- `scopes`：要请求的 OAuth 范围。省略时，范围从服务器公布的元数据中选择，可能比扩展所需的更宽。

OAuth 回调在 `127.0.0.1` 上以临时端口提供；如果授权服务器只允许带固定端口的预先注册重定向 URI，请设置 `GOOSE_OAUTH_CALLBACK_PORT`。

## 启用/禁用扩展

你可以随时启用或禁用已安装的扩展，既可以作为新会话的默认值，也可以更改当前会话中正在使用的扩展。

### 为新会话设置默认扩展

对默认扩展所做的更改适用于未来的会话。这些设置的更新不会影响任何当前活动的会话。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

  1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
  2. 在侧边栏中点击 `Extensions` 按钮。
  3. 使用扩展旁边的开关来启用或禁用它。

  </TabItem>

  <TabItem value="cli" label="goose CLI">

  1. 运行以下命令打开 goose 的配置：
      ```sh
      goose configure
      ```
  2. 从菜单中选择 `Toggle Extensions`。
  3. 会列出已安装的扩展。
  4. 按 `space bar` 切换扩展。实心表示已启用。

  **示例：**

  ```
  ┌   goose-configure 
  │
  ◇  What would you like to configure?
  │  Toggle Extensions 
  │
  ◆  enable extensions: (use "space" to toggle and "enter" to submit)
  │  ◼ developer 
  │  ◻ fetch 
  └   
  ```
  </TabItem>
</Tabs>

### 在会话中途更改扩展

会话期间所做的更改会保留当前对话，而不必重新开始。中途更改只适用于当前聊天会话，不会改变新会话的默认扩展。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

  1. 点击应用底部的 <Puzzle className="inline" size={16} /> 按钮。
  2. 使用扩展旁边的开关来启用或禁用它。

  </TabItem>

  <TabItem value="cli" label="goose CLI">

  在交互式会话中用斜杠命令添加扩展：

  **添加 stdio 扩展：**
  ```bash
  /extension npx -y @modelcontextprotocol/server-memory
  ```

  **添加内置扩展：**
  ```bash
  /builtin developer
  ```
  </TabItem>
</Tabs>

## 自动启用的扩展

goose 中的智能扩展推荐系统会根据你的任务和需求自动识别并建议相关扩展。本节说明如何有效使用此功能，并理解它的能力和限制。

当你请求一项任务时，goose 会检查已启用的扩展及其工具，以判断能否完成请求。如果不能，它会按需建议或启用额外的扩展。你也可以按名称请求特定扩展。


:::warning
动态启用的任何扩展只对当前会话启用。要在会话之间保持扩展启用，见[启用/禁用扩展](#enablingdisabling-extensions)。
:::

### 自动检测

goose 会根据任务要求自动检测何时需要某个扩展。下面是 goose 在对话中识别并启用所需扩展的示例：

<Tabs groupId="interface">
<TabItem value="ui" label="goose Desktop" default>

#### goose 提示
```plaintext
Find all orders with pending status from our production database
```

#### goose 输出

```plaintext
I'll help you search for available extensions that might help us interact with PostgreSQL databases.

🔍 Search Available Extensions
└─ Output ▼

 I see there's a PostgreSQL extension available. Let me enable it so we can query your database.

🔧 Manage Extensions
└─ action           enable
   extension_name   postgresql

The extension 'postgresql' has been installed successfully

Great! Now I can help you query the database...
```

</TabItem>
<TabItem value="cli" label="goose CLI">

#### goose 提示
```plaintext
Find all orders with pending status from our production database
```

#### goose 输出

```sh
I apologize, but I notice that I don't currently have access to your database. Let me search if there are any database-related extensions available.
─── search_available_extensions | platform ──────────────────────────

I see that there is a "postgresql" extension available. Let me enable it so I can help you query your database.
─── enable_extension | platform ──────────────────────────
extension_name: postgresql


■  goose would like to enable the following extension, do you approve?
// highlight-start
| ● Yes, for this session 
// highlight-end
| ○ No
```

</TabItem>
</Tabs>

### 直接请求

goose 会回应明确的扩展请求，允许用户手动启用所需的特定工具。下面是 goose 处理直接启用扩展请求的示例：

<Tabs groupId="interface">
<TabItem value="ui" label="goose Desktop" default>

#### goose 提示

```plaintext
Use PostgreSQL extension
```

#### goose 输出

```plaintext
I'll help enable the PostgreSQL extension for you.

🔧 Manage Extensions
└─ action           enable
   extension_name   postgresql

The extension 'postgresql' has been installed successfully

The PostgreSQL extension is now ready to use. What would you like to do with it?
```

</TabItem>
<TabItem value="cli" label="goose CLI">

#### goose 提示

```sh
Use the PostgreSQL extension
```

#### goose 输出

```sh
I'll help enable the PostgreSQL extension for you.
─── enable_extension | platform ──────────────────────────
extension_name: postgresql


■  goose would like to enable the following extension, do you approve?
// highlight-start
| ● Yes, for this session 
// highlight-end
| ○ No
```

</TabItem>
</Tabs>

## 更新扩展属性

goose 依靠扩展属性来决定如何处理扩展。如果你想更改扩展的显示设置和行为，例如名称、超时或环境变量，可以编辑这些属性。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

  1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
  2. 在侧边栏中点击 `Extensions` 按钮。
  3. 在 `Extensions` 下，点击你想编辑的扩展上的 <Settings className="inline" size={16} /> 按钮。
  4. 在出现的对话框中按需编辑扩展属性。
  5. 点击 `Save Changes`。

  </TabItem>

  <TabItem value="cli" label="Config file">
  
  1. 前往 goose [配置文件](/docs/guides/config-files)。例如，在 macOS 上前往 `~/.config/goose/config.yaml`。
  2. 按需编辑扩展属性并保存更改。

  </TabItem>
</Tabs>

## 移除扩展

你可以移除已安装的扩展。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

  1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
  2. 在侧边栏中点击 `Extensions` 按钮。
  3. 在 `Extensions` 下，点击你想移除的扩展上的 <Settings className="inline" size={16} /> 按钮。
  4. 在出现的对话框中点击 `Remove Extension`。

  </TabItem>

  <TabItem value="cli" label="Config file">
  :::info
  要移除扩展，必须先[禁用](#enablingdisabling-extensions)它。
  :::

    1. 运行以下命令打开 goose 的配置：
    ```sh
    goose configure
    ```
    2. 从菜单中选择 `Remove`。会列出已禁用的扩展。
    3. 用方向键下移到你想移除的扩展。
    4. 按 `space bar` 选择该扩展。实心表示已选中。
    ```
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Remove Extension 
    │
    ◆  Select extensions to remove (note: you can only remove disabled extensions - use "space" to toggle and "enter" to submit)
    │  ◼ fetch 
    └  
    ```
    5. 按 Enter 保存
  </TabItem>
</Tabs>


## 带着扩展开始会话

你可以直接从 CLI 用特定扩展开始一次定制的 goose 会话。

:::info 说明
* 扩展不会被安装。它只对当前会话启用。
* 如果扩展已经启用，则不必这样做。
:::

### 内置扩展

要在开始会话时启用内置扩展，运行以下命令：

```bash
goose session --with-builtin "{extension_id}"
```

例如，要启用 Developer 和 Computer Controller 扩展并开始会话，运行：

```bash
goose session --with-builtin "developer,computercontroller"
```

或者：

```bash
goose session --with-builtin developer --with-builtin computercontroller
```


### 外部扩展

要在开始会话时启用扩展，运行以下命令：

```bash
goose session --with-extension "{extension command}" --with-extension "{another extension command}"
```

例如，要用 [Fetch 扩展](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch)开始会话，运行：

```bash
goose session --with-extension "uvx mcp-server-fetch"
```


#### 环境变量

有些扩展需要环境变量。你可以在命令中包含它们：

```bash
goose session --with-extension "VAR=value command arg1 arg2"
```

例如，要用 [GitHub 扩展](https://github.com/github/github-mcp-server)开始会话，运行：

```bash
goose session --with-extension "GITHUB_PERSONAL_ACCESS_TOKEN=<YOUR_TOKEN> npx -y @modelcontextprotocol/server-github"
```

:::info
请注意，运行此命令需要系统上安装 [Node.js](https://nodejs.org/)，因为它使用 `npx`。
:::


### 通过 Streamable HTTP 的远程扩展

要在开始会话时通过 Streamable HTTP 启用远程扩展，运行以下命令：

```bash
goose session --with-streamable-http-extension "{extension URL}" --with-streamable-http-extension "{another extension URL}"
```

例如，要用 Streamable HTTP 扩展开始会话，运行：

```bash
goose session --with-streamable-http-extension "https://example.com/streamable"
```

### 容器中的扩展

goose 可以使用 `--container` 标志在 Docker 容器内运行扩展，用于 devcontainer 工作流。细节见[在 Docker 容器中运行扩展](/docs/tutorials/goose-in-docker#running-extensions-in-docker-containers)。

## 开发扩展

goose 扩展用 MCP 实现。MCP 是一种标准协议，允许 AI 模型和代理安全地连接本地或远程资源。了解如何构建你自己的[作为 MCP 服务器的扩展](https://modelcontextprotocol.io/quickstart/server)。

**教程：**
- [构建自定义扩展](/docs/tutorials/custom-extensions) - 创建基于 Python 的 MCP 扩展
- [构建 MCP 应用](/docs/tutorials/building-mcp-apps) - 创建交互式 UI 应用

[extensions-directory]: /extensions
