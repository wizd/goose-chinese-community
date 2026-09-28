---
title: CI/CD 环境
description: 在 CI/CD 流水线中设置 goose 以自动化任务
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

goose 不只在你的本机上有用，它也可以简化 CI/CD 环境中的任务。把 goose 集成到流水线后，你可以自动化以下任务：

- 代码审查
- 文档检查
- 构建和部署工作流
- 基础设施和环境管理
- 回滚和恢复流程
- 智能测试执行

本指南带你在 CI/CD 流水线中设置 goose，重点是使用 GitHub Actions 做代码审查。


## 在 GitHub Actions 中使用 goose
你可以直接在 GitHub Actions 中运行 goose。按以下步骤设置工作流。

:::info 太长不看
<details>
   <summary>复制 GitHub 工作流</summary>
   
   ```yaml title="goose.yml"


name: goose

on:
   pull_request:
      types: [opened, synchronize, reopened, labeled]

permissions:
   contents: write
   pull-requests: write
   issues: write

env:
   PROVIDER_API_KEY: ${{ secrets.REPLACE_WITH_PROVIDER_API_KEY }}
   PR_NUMBER: ${{ github.event.pull_request.number }}
   GH_TOKEN: ${{ github.token }}

jobs:
   goose-comment:
      name: goose Comment
      runs-on: ubuntu-latest
      steps:
         - name: Check out repository
           uses: actions/checkout@v4
           with:
              fetch-depth: 0

         - name: Gather PR information
           run: |
              {
              echo "# Files Changed"
              gh pr view $PR_NUMBER --json files \
                 -q '.files[] | "* " + .path + " (" + (.additions|tostring) + " additions, " + (.deletions|tostring) + " deletions)"'
              echo ""
              echo "# Changes Summary"
              gh pr diff $PR_NUMBER
              } > changes.txt

         - name: Install goose CLI
           run: |
              mkdir -p /home/runner/.local/bin
              curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh \
                | GOOSE_VERSION=REPLACE_WITH_VERSION CONFIGURE=false GOOSE_BIN_DIR=/home/runner/.local/bin bash
              echo "/home/runner/.local/bin" >> $GITHUB_PATH

         - name: Configure goose
           run: |
              mkdir -p ~/.config/goose
              cat <<EOF > ~/.config/goose/config.yaml
              GOOSE_PROVIDER: REPLACE_WITH_PROVIDER
              GOOSE_MODEL: REPLACE_WITH_MODEL
              keyring: false
              EOF

         - name: Create instructions for goose
           run: |
              cat <<EOF > instructions.txt
              Create a summary of the changes provided. Don't provide any session or logging details.
              The summary for each file should be brief and structured as:
              <filename/path (wrapped in backticks)>
                 - dot points of changes
              You don't need any extensions, don't mention extensions at all.
              The changes to summarise are:
              $(cat changes.txt)
              EOF

         - name: Test
           run: cat instructions.txt

         - name: Run goose and filter output
           run: |
              goose run --instructions instructions.txt | \
              # Remove ANSI color codes
              sed -E 's/\x1B\[[0-9;]*[mK]//g' | \
              # Remove session/logging lines
              grep -v "logging to /home/runner/.config/goose/sessions/" | \
              grep -v "^starting session" | \
              grep -v "^Closing session" | \
              # Trim trailing whitespace
              sed 's/[[:space:]]*$//' \
              > pr_comment.txt

         - name: Post comment to PR
           run: |
              cat -A pr_comment.txt
              gh pr comment $PR_NUMBER --body-file pr_comment.txt

   ```
</details>

:::

### 1. 创建工作流文件

在仓库中创建 `.github/workflows/goose.yml`。它将包含你的 GitHub Actions 工作流。

### 2. 定义工作流触发条件和权限

配置该 action，使其：

- 在拉取请求被打开、更新、重新打开或打上标签时触发工作流
- 授予 goose 与仓库交互所需的权限
- 为你选择的大语言模型 provider 配置环境变量

```yaml
name: goose

on:
    pull_request:
        types: [opened, synchronize, reopened, labeled]

permissions:
    contents: write
    pull-requests: write
    issues: write

env:
   PROVIDER_API_KEY: ${{ secrets.REPLACE_WITH_PROVIDER_API_KEY }}
   PR_NUMBER: ${{ github.event.pull_request.number }}
```


### 3. 安装并配置 goose

要在工作流中安装并设置 goose，添加以下步骤：

```yaml
steps:
    - name: Install goose CLI
      run: |
          mkdir -p /home/runner/.local/bin
          curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh \
            | GOOSE_VERSION=REPLACE_WITH_VERSION CONFIGURE=false GOOSE_BIN_DIR=/home/runner/.local/bin bash
          echo "/home/runner/.local/bin" >> $GITHUB_PATH

    - name: Configure goose
      run: |
          mkdir -p ~/.config/goose
          cat <<EOF > ~/.config/goose/config.yaml
          GOOSE_PROVIDER: REPLACE_WITH_PROVIDER
          GOOSE_MODEL: REPLACE_WITH_MODEL
          keyring: false
          EOF
```

#### 在 CI/CD 中固定 goose 版本

在 CI/CD 中，我们建议用 `GOOSE_VERSION` 固定特定的 goose 版本，以便运行可复现。如果 `stable` 发布标签不包含 goose CLI 二进制资源，这样做也可以避免下载时出现 404 错误。

与 CI 相关的安装选项：
- `GOOSE_VERSION`：要固定安装的版本（支持 `1.21.1` 和 `v1.21.1` 两种格式）
- `GOOSE_BIN_DIR`：安装目录（确保该目录在 `PATH` 上）
- `CONFIGURE=false`：跳过交互式的 `goose configure` 流程

:::info 替换项
把 `REPLACE_WITH_VERSION`、`REPLACE_WITH_PROVIDER` 和 `REPLACE_WITH_MODEL` 替换为你想固定的 goose 版本，以及你的大语言模型 provider/模型名称。按需添加其他必要配置。
:::

### 4. 收集 PR 变更并准备指令

此步骤提取拉取请求详情，并把它们格式化为给 goose 的结构化指令。

```yaml
    - name: Create instructions for goose
      run: |
          cat <<EOF > instructions.txt
          Create a summary of the changes provided. Don't provide any session or logging details.
          The summary for each file should be brief and structured as:
            <filename/path (wrapped in backticks)>
              - dot points of changes
          You don't need any extensions, don't mention extensions at all.
          The changes to summarise are:
          $(cat changes.txt)
          EOF
```

### 5. 运行 goose 并清理输出

现在用格式化后的指令运行 goose，并通过移除 ANSI 颜色代码和不必要的日志消息来清理输出。

```yaml
    - name: Run goose and filter output
      run: |
          goose run --instructions instructions.txt | \
            # Remove ANSI color codes
            sed -E 's/\x1B\[[0-9;]*[mK]//g' | \
            # Remove session/logging lines
            grep -v "logging to /home/runner/.config/goose/sessions/" | \
            grep -v "^starting session" | \
            grep -v "^Closing session" | \
            # Trim trailing whitespace
            sed 's/[[:space:]]*$//' \
            > pr_comment.txt
```

### 6. 向 PR 发布评论

最后，把 goose 的输出作为评论发布到拉取请求上：

```yaml
    - name: Post comment to PR
      run: |
          cat -A pr_comment.txt
          gh pr comment $PR_NUMBER --body-file pr_comment.txt
```

有了这个工作流，goose 会在拉取请求上运行、分析变更，并把摘要作为评论发布到 PR 上。

这只是众多可能中的一个例子。请按你的需要修改 GitHub Action。

---

## 并行运行多个 goose 实例

goose 支持运行多个状态隔离的并发会话，因此在 CI/CD 流水线中并行运行作业是安全的。每个 goose 实例都维护自己的对话历史、智能体上下文和扩展配置，互不干扰。

这支持跨不同环境的矩阵构建，或同时处理多个组件等用例。

---

## 安全注意事项

在 CI/CD 环境中运行 goose 时，请记住这些安全实践：

1. **密钥管理**
      - 把敏感凭据（例如 API 密钥）存储为 GitHub Secrets。
      - 切勿在日志或 PR 评论中暴露这些凭据。

2. **最小权限原则**
      - 在工作流中只授予必要权限，并定期审计它们。

3. **输入校验**
      - 确保传给 goose 的任何输入都经过清理和校验，以防止意外行为。
