---
title: JetBrains 扩展
description: 将 JetBrains MCP 服务器用作 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import { PanelLeft } from 'lucide-react';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/1fP5elf9qQM" />

本教程介绍如何添加 JetBrains 扩展，以集成任意 JetBrains IDE。虽然 goose 可以用 [Developer 扩展](/docs/mcp/developer-mcp) 完成以开发者为中心的任务，但 JetBrains 扩展提供了一种更集成、更了解项目的代码工作方式。

## 配置

**重要**：配置步骤取决于你的 IDE 版本。版本可以在 `[IDE Name] > About`（macOS）或 `Help > About`（Windows/Linux）中查看。

<Tabs groupId="ideVersion">
  <TabItem value="2026.1" label="2026.1 及更高版本" default>

    2026.1 及更高版本直接暴露一个可流式传输的 HTTP 端点。无需安装插件或 npm。

    :::tip 快速安装
    <Tabs groupId="interface">
      <TabItem value="ui" label="goose Desktop" default>
      在 Settings → Extensions 中使用 `Add custom extension`，URL 来自 IDE 中的 `Copy HTTP Stream Config`。
      </TabItem>
      <TabItem value="cli" label="goose CLI">
      使用 `goose configure`，URL 来自 IDE 中的 `Copy HTTP Stream Config`。
      </TabItem>
    </Tabs>
    :::

    <br/>
    使用 IDE 内置的 HTTP 流端点配置扩展：

    1. 获取你的 IDE 专用 URL：

       1. 在 IDE 中进入 `Settings > Tools > MCP Server`
       2. 勾选 `Enable MCP Server`，如果出现权限对话框请确认
       3. 点击 `Copy HTTP Stream Config`
       4. 记下 `url` 的值（例如 `http://127.0.0.1:64344/stream`）。端口自动分配，并且每个 IDE 实例不同

    2. 使用配置中的 URL 把 JetBrains 扩展添加到 goose：

       <Tabs groupId="interface">
         <TabItem value="ui" label="goose Desktop" default>
           1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
           2. 在侧边栏点击 `Extensions`
           3. 点击 `Add custom extension`
           4. 在 `Add custom extension` 对话框中填写：
              - **扩展名称**：JetBrains
              - **类型**：Streamable HTTP
              - **描述**：将 goose 与任意 JetBrains IDE 集成
              - **URL**：粘贴 `Copy HTTP Stream Config` 中的 `url`
           5. 点击 `Add Extension` 保存扩展
           6. 进入聊天
         </TabItem>
         <TabItem value="cli" label="goose CLI">
           <CLIExtensionInstructions
             name="jetbrains"
             description="将 goose 与任意 JetBrains IDE 集成"
             type="http"
             url="http://127.0.0.1:<PORT>/stream"
             timeout={300}
             commandNote={
               <>
                 粘贴 <code>Copy HTTP Stream Config</code> 中的 <code>url</code>。端口因 IDE 实例而异。
               </>
             }
           />
         </TabItem>
       </Tabs>
  </TabItem>
  <TabItem value="2025.2" label="2025.2 – 2025.x">

    2025.2 到 2025.x 版本内置了使用 stdio 传输的 MCP 服务器支持。更多细节见你的 IDE 文档（例如 IntelliJ IDEA 的 [MCP Server](https://www.jetbrains.com/help/idea/mcp-server.html)）。

    :::tip 快速安装
    <Tabs groupId="interface">
      <TabItem value="ui" label="goose Desktop" default>
      在 Settings → Extensions 中使用 `Add custom extension`，命令来自 IDE 中的 `Copy Stdio Config`。
      </TabItem>
      <TabItem value="cli" label="goose CLI">
      使用 `goose configure`，命令来自 IDE 中的 `Copy Stdio Config`。
      </TabItem>
    </Tabs>
    :::

    <br/>
    使用 IDE 内置的 MCP 服务器支持配置扩展：

    1. 获取你的 IDE 专用配置：

       1. 在 IDE 中进入 `Settings > Tools > MCP Server`
       2. 如有需要，点击 `Enable MCP Server` 启用 MCP 服务器
       3. 点击 `Copy Stdio Config`
       4. 点击 `OK` 保存更改并启动服务器
       5. 从配置中复制 `command`、`args` 和 `env` 的值

    2. 使用配置中的命令把 JetBrains 扩展添加到 goose：

       <Tabs groupId="interface">
         <TabItem value="ui" label="goose Desktop" default>
           1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
           2. 在侧边栏点击 `Extensions`
           3. 点击 `Add custom extension`
           4. 在 `Add custom extension` 对话框中填写：
              - **扩展名称**：JetBrains
              - **类型**：STDIO
              - **描述**：将 goose 与任意 JetBrains IDE 集成
              - **命令**：把 IDE Stdio 配置中的 `command` 和 `args` 组合成一条命令字符串
              - **环境变量**：添加 `IJ_MCP_SERVER_PORT`，值为所复制 Stdio 配置 `env` 部分中的端口
           5. 点击 `Add Extension` 保存扩展
           6. 进入聊天
         </TabItem>
         <TabItem value="cli" label="goose CLI">
           <CLIExtensionInstructions
             name="jetbrains"
             description="将 goose 与任意 JetBrains IDE 集成"
             type="stdio"
             command="YOUR_COMMAND_AND_ARGS_FROM_IDE"
             timeout={300}
             envVars={[{ key: "IJ_MCP_SERVER_PORT", value: "YOUR_PORT_FROM_IDE" }]}
             commandNote={
               <>
                 把 <code>command</code> 和 <code>args</code> 组合成一条字符串。端口值来自所复制 Stdio 配置的 <code>env</code> 部分。
               </>
             }
           />
         </TabItem>
       </Tabs>
  </TabItem>
</Tabs>

## 使用示例

在这个示例中，我要把一个 Java 项目升级到最新的 LTS 版本。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
   1. 打开 [IntelliJ](https://www.jetbrains.com/idea/download)（JetBrains 的 Java 和 Kotlin IDE）
   2. 在 goose Desktop 中打开一个新会话
   :::note
   你将与两个独立的应用交互：goose Desktop 应用和 IntelliJ IDE。
   :::

  </TabItem>
  <TabItem value="cli" label="goose CLI">

  1. 打开 [IntelliJ](https://www.jetbrains.com/idea/download)（JetBrains 的 Java 和 Kotlin IDE）
  2. 在 IDE 中打开终端并启动一个新的 goose 会话：

  ```sh
  goose session
  ```

  </TabItem>
</Tabs>

:::tip
用 goose 重构代码时，建议在更改之前先把代码提交到版本控制。这样你就有一份干净的快照可以对比，便于审阅 goose 的修改、必要时回退，并跟踪改进。
:::

### goose 提示词
```
使用 JetBrains IDE 工具，把这个项目升级到最新的 Java LTS 版本，并在有益的地方把代码库重构为使用更新的 Java 特性。
```

大约 2 分钟后，goose 完成了升级！🎉

### goose 输出

```md
我会做几项改进，把这个代码库现代化为使用 Java 21（最新 LTS）特性。我将实现的更改如下：

1. 更新 `pom.xml` 以使用 Java 21
2. 使用更新的 Java 特性

[... 代码更改 ...]

现代化更改摘要如下：

1. `pom.xml`：
   - 将 Java 版本设为 21
   - 启用预览特性
   - 将所有依赖更新到最新稳定版本

2. `AccountsOverviewPage.java`：
   - 因为该类继承密封的 `Page` 类，所以把它设为 `final`
   - 把流收集更新为使用 `.toList()`，而不是 `collect(Collectors.toList())`
   - 把字段设为 final 以提高不可变性

3. `Page.java`：
   - 转换为密封类
   - 用 `permits` 限制哪些类可以继承它
   - 在适当的地方把字段设为 protected 和 final
   - 为异常处理添加模式匹配
   - 用 Optional 实现空安全
   - 用字符串模板生成错误消息
   - 用 Supplier 加入函数式编程概念
   - 用具体异常类型增强错误处理

4. `LoginComponent.java`：
   - 为凭据添加私有 record
   - 用 record 模式实现模式匹配
   - 把字段设为 final 以提高不可变性

5. `AccountTests.java`：
   - 用 `StructuredTaskScope` 实现结构化并发
   - 对 UI 和 API 任务使用并行执行
   - 用结构化任务管理改进错误处理
   - 用 `var` 进行模式匹配和类型推断

6. `BaseTests.java`：
   - 为设置任务实现结构化并发
   - 改进资源管理
   - 更好的异常处理
   - 使用现代 Duration API

7. `APIUtil.java`：
   - 实现字符串模板（Java 21 预览特性）
   - 使用现代文本块

8. `Customers.java`：
   - 为客户类型添加密封接口
   - 为 switch 表达式实现模式匹配
   - 为 instanceof 添加模式匹配
   - 用 record 增强类型安全

使用的关键现代 Java 特性：
- 字符串模板（Java 21 预览）
- switch 的模式匹配（Java 21）
- 密封类和接口（Java 17）
- Records（Java 16）
- instanceof 的模式匹配（Java 16）
- 文本块（Java 15）
- Switch 表达式（Java 14）

代码库现在使用最新的 Java LTS 版本（21），并纳入了许多现代 Java 特性，从而改进：
- 类型安全
- 空安全
- 代码可读性
- 错误处理
- 性能
```




使用 JetBrains 扩展有多项优势，让 goose 更容易：
- 在代码库中导航
- 跟踪更改
- 在多个文件中做一致的修改
- 在更改前后核实文件内容
