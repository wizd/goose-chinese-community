---
title: Memory 扩展
description: 将 Memory MCP 服务器用作 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseBuiltinInstaller from '@site/src/components/GooseBuiltinInstaller';

<YouTubeShortEmbed videoUrl="https://youtube.com/embed/BZ0yrSLXQwk" />

Memory 扩展把 goose 变成一个了解你的助手：你可以教它个性化的关键信息（例如命令、代码片段、偏好和配置），之后它能回忆并应用这些信息。无论是项目特定（本地）还是通用（全局）知识，goose 都会学习和记住对你最重要的内容。

本教程介绍如何启用并使用 Memory MCP 服务器。它是 goose 的内置扩展。

## 配置

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseBuiltinInstaller
    extensionName="Memory"
    description="存储并回忆个性化信息，以提供一致的帮助"
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">

 
  1. 运行 `configure` 命令：
  ```sh
  goose configure
  ```

  2. 选择 `Toggle Extensions`
  ```sh
  ┌   goose-configure 
  │
  ◇  What would you like to configure?
  │  Toggle Extensions 
  │
  ◆  Enable extensions: (use "space" to toggle and "enter" to submit)
  // highlight-start    
  │  ● memory
  // highlight-end
  |
  └  Extension settings updated successfully
  ```
  </TabItem>
</Tabs>

## 存储位置

记忆以文件形式存储在磁盘上的两个位置之一：

| 范围 | 路径 | 何时使用 |
|------|------|----------|
| 本地（项目） | 工作目录中的 `.goose/memory/` | 项目特定的偏好和配置 |
| 全局（用户） | `~/.config/goose/memory/` | 适用于所有项目的偏好 |

goose 在会话开始时加载所有已保存的记忆，并把它们包含在发送给 LLM 的每条提示中。

## 工具参考

| 工具 | 作用 |
|------|------|
| `remember_memory(category, data, tags, is_global)` | 按类别、可选标签和范围（本地/全局）存储信息 |
| `retrieve_memories(category, is_global)` | 按类别检索记忆。使用 `"*"` 检索全部。 |
| `remove_memory_category(category, is_global)` | 删除某个类别中的全部记忆。使用 `"*"` 清空全部。 |
| `remove_specific_memory(category, memory_content, is_global)` | 在某个类别中按内容匹配删除单条记忆 |

## 为什么使用 Memory？
有了 Memory 扩展，你存储的不只是静态笔记，而是在教 goose 如何更好地帮助你。想象一下告诉 goose：

> _了解关于 MCP 服务器的一切，并保存到记忆中。_

之后你可以问：
> _利用我们关于 MCP 服务器的知识，帮我构建一个 MCP 服务器。_

只要你指示它记住，goose 就会回忆你保存的一切。这让你与 goose 协作时更容易得到一致的结果。

对于大量或详细的说明，把它们存在文件里，并指示 goose 参考这些文件：

> _Remember that if I ask for help writing JavaScript, I want you to refer to "/path/to/javascript_notes.txt" and follow the instructions in that file._


## 触发词以及何时使用
goose 也能识别某些触发词，用来决定何时存储、检索或删除记忆。

| **触发词** | **何时使用** |
|------------|--------------|
| remember | 存储以后有用的信息 |
| forget | 删除一条已存储的记忆 |
| memory | 与记忆相关的一般操作 |
| save | 保存命令、配置或偏好 |
| remove memory | 删除特定的已存储数据 |
| clear memory | 清除所有已存储的记忆 |
| search memory | 查找以前存储的数据 |
| find memory | 定位特定的已保存信息 |

## 使用示例

在这个示例中，我将展示如何教 goose 你项目的 API 标准，让它成为一个了解情况的开发助手。借助 Memory 扩展，goose 可以存储结构化信息，并在需要时回忆，帮助你在工作中保持一致。

这意味着你不必反复说明。goose 会记住项目要求，并自动把它们应用到新任务上。

:::tip
如果你经常使用 API 标准或其他结构化知识，当 goose 在工作流中发现规律时，可能会自动建议把它们保存到记忆中。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
   1. 在 goose Desktop 中打开一个新会话
  </TabItem>
  <TabItem value="cli" label="goose CLI">

  1. 打开终端并启动一个新的 goose 会话：

  ```sh
  goose session
  ```

  </TabItem>
</Tabs>

### 第 1 步：把 API 标准教给 goose
    #### goose 提示词 #1
    ```
    goose，学习我们的 API 开发标准：

    - 所有端点必须使用 TypeScript 接口
    - 错误响应遵循 RFC 7807 Problem Details 规范
    - 必须包含速率限制头
    - 身份验证在 Authorization 头中使用 JWT
    - 所有端点都需要 OpenAPI 文档

    记住这些，以便帮我遵循这些实践。
    ```

    #### goose 输出

    ```
    我已经学习了你的 API 标准。在处理 API 端点时，我会帮助落实这些要求。

    存储位置：
        - 类别：development_standards
        - 标签：#api #typescript #security #documentation
        - 范围：全局（这些是通用标准）

    我现在可以帮助：
        - API 端点实现
        - 错误处理模式
        - 身份验证流程
        - 文档要求
    ```
### 第 2 步：用已存储的知识创建新的 API 端点
    #### goose 提示词 #2

    ```
    帮我创建一个用户偏好设置的新端点
    ```
    #### goose 输出
    ```
    我看到你需要一个新端点。根据我记忆中存储的 API 开发标准，我会确保它满足我们的全部要求。

    [.. 正在检查已存储的 API 标准 ...]

    我已包含所有必需元素：
    
    ✅ TypeScript 接口
    ✅ RFC 7807 错误响应格式
    ✅ 速率限制
    ✅ JWT 认证头
    ✅ OpenAPI 文档

    这是符合标准的端点：

    interface UserPreferences {
        userId: string;
        theme: 'light' | 'dark';
        notifications: boolean;
        timezone: string;
    }

    interface ErrorResponse { 
        type: string;
        title: string;
        status: number;
        detail: string;
        instance: string;
    }

    @Route('/api/users/:userId/preferences')
    class UserPreferencesController {
        @Get()
        @RateLimit(100)  // Adding required rate limiting
        @OpenAPI({ ... }) // Including mandatory OpenAPI docs
        async getUserPreferences(
            @Header('Authorization') token: string,  // JWT auth as per our standard
            @Param('userId') userId: string
        ): Promise<UserPreferences | ErrorResponse> {
            // Implementation following our error handling pattern
        }
    }

    需要我实现完整的端点逻辑吗？
    ```
