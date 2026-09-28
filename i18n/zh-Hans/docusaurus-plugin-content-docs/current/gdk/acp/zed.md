---
title: 在 Zed 中设置 goose
sidebar_position: 3
description: 了解 Zed 如何把 goose 安装并配置为 ACP 智能体。
---

# 在 Zed 中设置 goose

Zed 可以把 goose 作为 ACP 智能体运行。从 ACP Registry 安装 goose 是最简单的方式；也可以手动配置，使用你自己的 goose 二进制文件和环境变量覆盖。

## 从 ACP Registry 安装 goose

Zed 内置 ACP Registry 支持，因此它可以下载并运行 goose，无需手动配置。

1. 打开 Zed
2. 打开 Agent Settings
3. 点击 `Add Agent`，然后选择 `Install from Registry`
4. 选择 `goose`

从注册表安装的 goose 运行的是同一个 `goose acp` 服务器，并读取你现有的 goose 配置，因此 provider、模型和扩展都会沿用。Zed 会帮你把已安装的版本保持为最新。

## 手动配置 goose

如果要运行自己的 goose 二进制文件（例如本地开发构建），或传入环境变量覆盖，请使用自定义智能体。

### 前提条件

确保已安装 Zed 和 goose CLI：

- **Zed**：从 [zed.dev](https://zed.dev/) 下载
- **goose CLI**：按照[安装指南](/docs/getting-started/installation)操作

验证 goose 已安装：

```bash
goose --version
```

### 把 goose 加入 Zed 设置

1. 打开 Zed
2. 打开 Agent Settings，点击 `Add Agent`，然后选择 `Add Custom Agent`。Zed 会生成一个 `agent_servers` 条目并打开你的设置文件
3. 编辑该条目，使其运行 goose：

```json
{
  "agent_servers": {
    "goose": {
      "type": "custom",
      "command": "goose",
      "args": ["acp"]
    }
  }
}
```

现在可以直接在 Zed 中与 goose 交互。ACP 会话使用 goose 配置中已启用的扩展，因此这些工具在 Zed 中也同样可用。

## 覆盖 provider 和模型

默认情况下，goose 使用[配置文件](/docs/guides/config-files)中定义的 provider 和模型。可以用 `GOOSE_PROVIDER` 和 `GOOSE_MODEL` 环境变量，为特定智能体配置覆盖它们。

下面的示例配置了两个模型设置不同的 goose 智能体：

```json
{
  "agent_servers": {
    "goose": {
      "type": "custom",
      "command": "goose",
      "args": ["acp"]
    },
    "goose (GPT-4o)": {
      "type": "custom",
      "command": "goose",
      "args": ["acp"],
      "env": {
        "GOOSE_PROVIDER": "openai",
        "GOOSE_MODEL": "gpt-4o"
      }
    }
  }
}
```

## 在 goose 中使用 Zed 的 MCP 服务器

Zed 的 `context_servers` 配置中的 MCP 服务器会自动对 goose 可用。这样 Zed 的原生功能和 goose 智能体可以使用同一批 MCP 服务器。

```json
{
  "context_servers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/allowed/dir"
      ]
    }
  },
  "agent_servers": {
    "goose": {
      "type": "custom",
      "command": "goose",
      "args": ["acp"]
    }
  }
}
```

`context_servers` 中使用 stdio（基于命令）或 HTTP 传输的所有 MCP 服务器都对 goose 可用。goose 不支持使用已弃用的 SSE 传输的服务器。

如果 `context_servers` 中的某个服务器与 goose 扩展同名，goose 会使用它自己的[配置](/docs/guides/config-files)。
