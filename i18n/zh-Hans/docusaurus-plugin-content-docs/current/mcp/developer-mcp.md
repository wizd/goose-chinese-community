---
title: Developer 扩展
description: 将 Developer MCP 服务器用作 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseBuiltinInstaller from '@site/src/components/GooseBuiltinInstaller';
import { Tornado } from 'lucide-react';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/on_p-LeIrak" />

Developer 扩展让 goose 自动化以开发者为中心的任务，例如编辑文件、执行 shell 命令和搭建项目。它还提供[代码库分析](/docs/guides/codebase-analysis)工具。

本教程介绍如何启用并使用 Developer MCP 服务器。它是 goose 的内置扩展。


## 配置

:::info
安装 goose 后，Developer 扩展默认已启用。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseBuiltinInstaller
    extensionName="Developer"
    description="自动化以开发者为中心的任务，例如编辑文件和执行 shell 命令"
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
  │  ● developer
  // highlight-end  
  └  Extension settings updated successfully
  ```
  </TabItem>
</Tabs>

## 使用示例

在这个示例中，我将让 goose 自动搭建 JavaScript 开发环境，包含 Express、Mongoose、Nodemon、Dotenv，并初始化 Git。


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

### goose 提示词
```
搭建一个新的 JavaScript 项目，包含 Express、Mongoose、Nodemon 和 Dotenv。获取这些包的最新版本，用这些版本生成 README，并初始化 Git
```

大约 1 分钟后，goose 就搭好了我的整个开发环境！🎉

### goose 输出

```md
我来帮你搭建一个包含这些依赖的新 JavaScript 项目。步骤如下：

1. 首先创建一个新目录并初始化项目
2. 然后安装依赖
3. 创建详细的 README
4. 初始化 git
5. 创建一些起步文件
6. 开始：

[... shell 命令，已创建的文件 ...]

很好！我已经搭建了一个完整的 Express 项目，并集成了 MongoDB 和 Dotenv：

1. 创建了新项目目录并初始化了 npm
2. 安装了 Express、Mongoose 和 dotenv 依赖
3. 搭建了基本项目结构，目录包括：
    - config/
    - models/
    - routes/ 
    - controllers/
4. 创建了必要文件：
    - index.js（主服务器文件）
    - .env（环境变量）
    - .ignore（包含常见的 node.js 忽略项）
5. 添加了一个包含基本 name 和 email 字段的用户模型
6. 创建了带两个方法的用户控制器：
    - getUsers（GET 所有用户）
    - createUser（POST 新用户）
7. 在 `/api/routes` 下添加了用户路由
8. 在 package.json 中更新了启动脚本
9. 创建了全面的 README.md，包含：
    - 安装脚本
    - 项目结构
    - 可用脚本
    - 环境变量
    - 最新包版本

项目结构如下：

my-express-app/
├── config/         # Configuration files
├── models/        # MongoDB models
│   └── User.js    # User model
├── routes/        # API routes
│   └── userRoutes.js
├── controllers/   # Route controllers
│   └── userController.js
├── .env           # Environment variables
├── .gitignore     # Git ignore file
├── index.js       # Entry point
└── package.json   # Project dependencies and scripts

开始开发时你可以：

1. 运行 `npm install` 安装依赖
2. 用 `npm run dev` 启动服务器

API 将可在以下地址访问：
    - `http://localhost:3000/api/users`（GET 获取所有用户）
    - `http://localhost:3000/api/users`（POST 创建新用户）

你可以用 Postman 或 curl 等工具测试 API。例如，创建一个新用户：

curl x POST http://localhost:3000/api/users \
-H "Content-Type: application/json" \
-d '{"name": "Ebony Louis" , "email": "ebony@example.com"}'

需要我添加其他功能，或对这个搭建做进一步改进吗？
```

## Shell 命令中的环境变量

`shell` 工具执行的 shell 命令会继承正在运行的 goose 进程的环境。通常包括：
- `PATH`、`HOME`、`USER` 等系统变量
- 启动 goose 的进程中已有的环境变量（例如你从 shell 启动 goose 时终端的环境）
- goose 注入的会话特定变量，例如用于[会话隔离工作流](/docs/guides/environment-variables#using-session-ids-in-workflows)的 `AGENT_SESSION_ID`

这使得依赖环境配置的工作流成为可能，例如需要身份验证的 CLI 操作和构建过程。

:::info
goose Desktop 或通过启动器启动时，可能使用不同的环境，并且可能不会加载你的 shell 启动文件。
:::

:::warning 敏感信息
环境变量可能包含 API 密钥和令牌等敏感值（例如 `GITHUB_TOKEN`、`AWS_ACCESS_KEY_ID`）。
:::

## 配置访问控制

默认情况下，goose 可以用你的用户权限运行系统命令，并编辑任何可访问的文件，**无需你的批准**。这是因为 goose 默认运行在 Autonomous 权限模式，并且可以使用 Developer 扩展的 shell 和文件编辑工具。这种配置让 goose 能快速、独立地工作，但也有可能出现意外结果。了解可用的访问控制功能，有助于你按自己的舒适程度和具体需求配置 goose。

:::tip
下方的[快速配置示例](#quick-setup-example)介绍了几种加强对 goose 行为控制的方法。
:::

### Developer 扩展工具

Developer 扩展提供以下工具：

| 工具 | 说明 | 使用场景 | 风险等级 |
|------|------|----------|----------|
| `shell` | 执行 shell 命令 | 运行测试、安装包、git 操作 | ⚠️ 高<br />可以用你的用户权限运行任何系统命令 |
| `write` | 创建或覆盖文件 | 创建文件、更新生成的资源、写入配置 | ⚠️ 高<br />可以修改任何可访问的文件 |
| `edit` | 替换文件中的精确文本 | 代码重构、定向编辑、删除匹配文本 | ⚠️ 高<br />可以修改任何可访问的文件 |
| `tree` | 列出带行数的目录树 | 在读取文件之前了解项目结构 | ✅ 低<br />只读的文件列表 |
| `read_image` | 读取本地或远程图片供模型查看 | 查看截图、图表和视觉资源 | ✅ 低<br />只读的图片访问 |

代码结构分析请使用单独的 [Analyze 平台扩展](/docs/guides/codebase-analysis)。

### 访问控制功能

你可以叠加多种控制，以匹配你的风险承受能力和工作流：

- **[goose 权限模式](/docs/guides/managing-tools/goose-permissions)**控制 goose 何时请求批准：

  | 模式 | 说明 | 使用场景 |
  |------|------|----------|
  | Autonomous<br />CLI：`auto` | 无需批准 | 适合在安全环境中的有经验用户 |
  | Manual Approval<br />CLI：`approve` | 审阅每一个操作 | 建议用于敏感工作，或当你希望最大限度控制时 |
  | Smart Approval<br />CLI：`smart_approve` | 由 AI 决定哪些需要审阅 | 折中方案 |
  | Chat Only<br />CLI：`chat` | 禁用所有工具 | 用于最高安全性，以及不支持工具调用的模型 |

- **[工具权限](/docs/guides/managing-tools/tool-permissions)**让你在 Manual Approval 或 Smart Approval 模式下，为单个扩展工具设置 `Always allow`、`Ask before` 和 `Never allow`

:::tip 在会话中切换模式
你可以在会话中更改 goose 权限模式，无需重启：
- **CLI**：使用 `/mode` 命令（例如 `/mode approve`）
- **Desktop**：使用底部菜单中的 <Tornado className="inline" size={16} /> 模式选择按钮
:::

#### 快速配置示例 {#quick-setup-example}

在处理敏感系统、探索不熟悉的代码库、使用不受信任的模型，或只是希望在执行前审阅操作时，你可能希望对 goose 的操作有更多控制。

下面是一个启用监督的配置示例：

1. **将[权限模式](/docs/guides/managing-tools/goose-permissions)**设为 Smart Approval 或 Manual Approval：
   ```yaml
   # ~/.config/goose/config.yaml
   GOOSE_MODE: smart_approve  # or approve
   ```

2. **根据你的需求配置[工具权限](/docs/guides/managing-tools/tool-permissions)**

随着你对 goose 的行为更加熟悉，可以调整这些设置，在为环境保持适当防护的同时减少摩擦。

:::info
另见[安全指南](/docs/guides/security/)，了解如何安全使用 goose。
:::

## 更多资源

import ContentCardCarousel from '@site/src/components/ContentCardCarousel';

<ContentCardCarousel
  items={[
    {
      type: 'topic',
      title: '代码库分析',
      description: '通过语义分析和调用图理解代码库',
      linkUrl: '/docs/guides/codebase-analysis'
    }
  ]}
/>
