---
draft: false
title: "用 goose 解决 CI 问题：一次实用演练"
description: "借助 goose 简化 CI 调试：直接从 GitHub 获取失败 CI 运行和注释的详细信息，甚至直接应用修复。"
date: 2024-12-11
authors:
  - dalton
---

![CI](goose-github-ci.png)

在拉取请求中碰到持续集成（CI）失败可能相当令人沮丧，但它们经常发生。本文借助 goose 使用 GitHub CLI（`gh`）来简化你的 CI 调试过程，直接从 GitHub 获取失败 CI 运行和注释的详细信息，甚至直接应用修复。

<!-- truncate -->

:::warning goose Beta 版本
本文写于 goose 的 beta 版本，命令和流程可能已经改变。
:::


## 开始

深入之前，确保你已经设置好必要的工具。

### 1. 安装并认证 GitHub CLI（`gh`）

你需要 [GitHub CLI](https://cli.github.com/) `gh`，以便 goose 访问 CI 检查运行的详情。

```bash
brew install gh
gh auth login
```

按照提示认证你的账号。


### 2. 配置 goose
确保 goose 已配置，并准备好与你的仓库和本地工具交互。具体来说，你需要配置一个带 GitHub 工具包的 goose 配置档。

用必要的工具包更新 `~/.config/goose` 中的 `profiles.yaml` 文件：

```yaml
my-profile:
  provider: anthropic
  processor: claude-3-5-sonnet
  accelerator: claude-3-5-sonnet
  moderator: truncate
  toolkits:
    - name: developer
      requires: {}
    - name: github
      requires: {}
```
用该配置档开始一个会话：

```bash
goose session start --profile my-profile
```
如果配置档的工具包没有正确配置，goose 可能无法访问 `gh` 命令。

## 用 goose 解决 CI 失败
一切设置好之后，我们可以用以下步骤让 goose 处理 CI 问题：

### 步骤 1：获取 CI 失败详情
让 goose 检索某个特定 PR 的 CI 失败信息。

**示例请求：**

```

Can you tell me about the CI failures on PR #11111 in the organization/repo repository? The check run ID is 123456.
```

你可以点击 PR 的 checks 标签并选择一次失败来访问检查运行 ID。ID 会在 URL 中。

**goose 的工作流：**

goose 会使用 `gh` CLI 检查运行信息，并提供问题的详细总结。goose 使用 GitHub CLI 来：

- 获取失败 CI 运行的详情，包括日志和注释。
- 提供清楚、可执行的问题总结。

**goose 运行的示例命令：**

```curl
gh api -H "Accept: application/vnd.github+json" /repos/<owner>/<repo>/check-runs/<check-run-id>/annotations
```

**goose 输出示例：**
```mathematica
Here are the details for Check Run ID 123456:

**Name**: CI-Build-All  
**Status**: completed  
**Conclusion**: failure  

**Annotations Summary:**  
1. **ModuleA Test Failure**  
   File: `ModuleATests`  
   Line: 35  
   Error: Mismatched parameter order in function call.  

2. **ModuleB Test Failure**  
   File: `ModuleBTests`  
   Line: 64  
   Error: Unexpected nil value encountered during initialization.  

3. **ModuleC Test Failure**  
   File: `ModuleCTests`  
   Line: 98  
   Error: Type mismatch in returned value. Expected 'String', found 'Int'.  
```
### 步骤 2：向 goose 请求修复
一旦 goose 提供了失败详情，让它直接解决问题。

示例请求：

```
Can you fix these issues and stage the changes so I can review them? Do not add unnecessary code comments.
```

**goose 做什么：**

- 根据错误信息应用修复。
- 暂存更改以供审阅。


**goose 回应示例：**
```markdown
I have fixed the following files and staged them:

- `ModuleATests`: Corrected the order of parameters in the function call.  
- `ModuleBTests`: Resolved the unexpected nil value encountered during initialization.  
- `ModuleCTests`: Adjusted the type mismatch in the returned value.  

You can now review the staged changes.
```


### 步骤 3：审阅更改
仔细审阅暂存的更改，确保它们正确解决问题，并避免意外修改。

**要检查的事情：**

- 没有不必要的注释（例如 // Fix xyz）。
- 没有改动代码中无关的部分。


如有需要，在提交前清理或重新暂存更改。

## 使用 goose 的好处
用 goose 解决 CI 问题，通过以下方式简化你的工作流：

- 以最少的手工努力识别问题并应用修复。
- 与 GitHub CLI 等工具集成以验证更改。
- 处理重复的 CI 调试任务，让你专注于代码质量。

goose 让你高效解决 CI 失败，在减少调试和测试所需努力的同时，确保你对工作流有信心。

试一试，让 goose 替你承担 CI 调试的重活！

<head>
  <meta property="og:title" content="用 goose 解决 CI 问题：一次实用演练" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2024/12/11/resolving-ci-issues-with-goose-a-practical-walkthrough" />
  <meta property="og:description" content="借助 goose 简化 CI 调试：直接从 GitHub 获取失败 CI 运行和注释的详细信息，甚至直接应用修复。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/goose-github-ci-30930008ab57b0aebae15a03c73a12b5.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="用 goose 解决 CI 问题：一次实用演练" />
  <meta name="twitter:description" content="借助 goose 简化 CI 调试：直接从 GitHub 获取失败 CI 运行和注释的详细信息，甚至直接应用修复。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/goose-github-ci-30930008ab57b0aebae15a03c73a12b5.png" />
</head>
