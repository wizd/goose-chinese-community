---
title: GitHub 扩展
description: 将 GitHub MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/TbmQDv3SQOE" />

本教程介绍如何将 [GitHub MCP 服务器](https://github.com/github/github-mcp-server) 添加为 goose 扩展，以实现文件操作、仓库管理、搜索等功能。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
   [启动安装程序](goose://extension?type=streamable_http&url=https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F&id=github-mcp&name=GitHub&description=GitHub%20repository%20management%20and%20operations&header=Authorization%3DBearer%20YOUR_GITHUB_PERSONAL_ACCESS_TOKEN)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  添加 `Remote Extension (Streamable HTTP)` 扩展类型，并填写：

  **端点 URL**
  ```
  https://api.githubcopilot.com/mcp/
  ```
  </TabItem>
</Tabs>

  **自定义请求头**
  ```
  Authorization: Bearer <YOUR_GITHUB_PERSONAL_ACCESS_TOKEN>
  ```
:::

## 配置
这些步骤配置远程 MCP 服务器。其他部署方式见[官方 GitHub MCP 服务器文档](https://github.com/github/github-mcp-server)。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="github-mcp"
      extensionName="GitHub"
      description="GitHub 仓库管理与操作"
      type="http"
      url="https://api.githubcopilot.com/mcp/"
      envVars={[
        { name: "Authorization", label: "Bearer YOUR_GITHUB_PERSONAL_ACCESS_TOKEN" }
      ]}
      apiKeyLink="https://github.com/settings/personal-access-tokens"
      apiKeyLinkText="GitHub Personal Access Token"
    />

  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="github"
      description="GitHub 仓库管理与操作"
      type="http"
      url="https://api.githubcopilot.com/mcp/"
      timeout={300}
      envVars={[
        { key: "Authorization", value: "Bearer ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }
      ]}
      infoNote={
        <>
          获取你的 <a href="https://github.com/settings/personal-access-tokens" target="_blank" rel="noopener noreferrer">GitHub Personal Access Token</a>，并将其作为 <code>Bearer</code> 令牌粘贴。
        </>
      }
    />

  </TabItem>
</Tabs>

## 使用示例

创建 [GitHub Personal Access Token](https://github.com/settings/personal-access-tokens) 时，我授予了以下权限：
* 仓库：[goose-demo](https://github.com/angiejones/goose-demo)
* 元数据的读取权限
* 代码、提交状态、issue 和 pull request 的读写权限

### goose 提示词
```
在我的 angiejones/goose-demo 仓库中创建一个名为 hello-world 的新分支。把 README.md 改成 “this was written by goose” 并提交。用你的更改打开一个 pull request。
```

### goose 输出

```
我来帮你创建新分支、更新 README，并打开一个 pull request。步骤如下：

1. 首先，在你的仓库中创建名为 “hello-world” 的新分支
2. 然后更新 README.md 文件
3. 最后创建 pull request

开始执行：

1. 创建新分支：

─── create_branch | github ──────────────────────────
branch: hello-world
owner: angiejones
repo: goose-demo

2. 现在更新新分支中的 README.md：

─── create_or_update_file | github ──────────────────────────
branch: hello-world
content: this was written by goose
message: Update README.md with goose message
owner: angiejones
path: README.md
repo: goose-demo



3. 最后创建 pull request：

─── create_pull_request | github ──────────────────────────
base: main
body: ...
head: hello-world
owner: angiejones
repo: goose-demo
title: Update README.md



很好！我已完成所有请求的任务：
1. 创建了名为 “hello-world” 的新分支
2. 把 README.md 更新为 “this was written by goose”
3. 创建了 pull request，将这些更改合并到 main 分支

你可以在此查看 pull request：https://github.com/angiejones/goose-demo/pull/1

pull request 已可供你审阅。还需要我对它做些什么吗？
```
