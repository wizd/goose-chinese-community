---
sidebar_position: 90
title: goose 扩展允许列表
sidebar_label: 扩展允许列表
---

goose 是一个可扩展框架，默认允许你安装任何 MCP 服务器。不过，你可能希望更严格地控制哪些 MCP 服务器可以作为扩展安装（例如在企业环境中）。

本指南说明如何创建一份适用于 goose 桌面版和 CLI 的安全扩展**允许列表**。允许列表让管理员控制哪些 MCP 服务器可以作为 goose 扩展安装。启用后，goose 只会安装列表中的扩展，并阻止安装其他扩展。

## 工作方式

1. 允许列表是一个 YAML 文件，其中列出允许的扩展命令。
2. goose 从 `GOOSE_ALLOWLIST` 环境变量指定的 URL 获取允许列表。
3. 允许列表在首次需要时获取并缓存。每次重启 goose 时会重新获取。
4. 当用户尝试安装扩展时，goose 会把该 MCP 服务器的安装命令与允许列表比对。
5. 如果命令不在允许列表中，扩展安装会被拒绝。

## 配置

### 1. 创建并部署允许列表

允许列表必须是具有以下结构的 YAML 文件：

```yaml
extensions:
  - id: extension-id-1
    command: command-name-1
  - id: extension-id-2
    command: command-name-2
  # ... more extensions
```

#### 示例

在此示例中，只能安装 Slack、GitHub 和 Jira 扩展：

```yaml
extensions:
  - id: slack
    command: uvx mcp_slack
  - id: github
    command: uvx mcp_github
  - id: jira
    command: uvx mcp_jira
```


创建允许列表后，必须把它部署到一个 URL。


### 2. 设置环境变量

创建名为 `GOOSE_ALLOWLIST` 的环境变量，并将其值设为 YAML 文件的 URL：

```bash
export GOOSE_ALLOWLIST=https://example.com/goose-allowlist.yaml
```

你也可以把这条 export 加到 shell 配置文件中（在 Mac 上是 `~/.bashrc` 或 `~/.zshrc`）。

:::info
如果未设置该环境变量，则不应用允许列表限制。没有限制时，可以安装所有扩展。
:::


## 最佳实践

要让允许列表以精确匹配方式有效工作：

1. **写明命令**：定义你想允许的精确命令字符串。
2. **包含完整路径**：如果只允许来自特定路径的命令，请在允许列表中写上完整路径。
3. **定期审计**：经常复查允许列表，确保其中只有你打算允许的命令。
4. **使用 HTTPS**：允许列表使用 HTTPS URL，以防止中间人攻击。
5. **限制编辑权限**：确保只有授权用户可以编辑允许列表。
6. **校验条目**：仔细复查允许列表，确保只包含受信任的命令。
7. **监控安装**：留意扩展安装期间被拒绝的命令，这可能表明有人试图滥用。


## 故障排除

如果扩展被意外拒绝：

1. 检查 `GOOSE_ALLOWLIST` 环境变量是否设置正确。
2. 确认允许列表文件可以从服务器访问。
3. 确认允许列表文件是格式正确的 YAML。
4. 查看[服务器日志](/docs/guides/logs)中与获取或解析允许列表相关的错误。
5. 确认扩展安装中的命令与允许列表中的内容完全一致。
