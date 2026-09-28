---
title: Docker 中的 goose
sidebar_label: Docker 中的 goose
description: 在 Docker 容器内运行 goose，或在现有容器中运行扩展，以配合 devcontainer 工作流
---

本指南涵盖两种与 Docker 相关的场景：
1. **在 Docker 内运行 goose** - 在容器中构建并运行 goose 进程本身
2. **在 Docker 中运行扩展** - goose 在宿主机上运行，但在容器内执行扩展

## 在 Docker 内运行 goose

你可以在 Docker 容器内从源码构建 goose。这种方式通过创建隔离环境带来安全上的好处，也提高了一致性和可移植性。例如，如果你需要在平时不使用的平台（例如 Ubuntu）上排查错误，可以用 Docker 轻松调试。

开始之前，你需要修改 [`Dockerfile` 和 `docker-compose.yml` 文件](https://github.com/aaif-goose/goose/tree/main/documentation/docs/docker)以适应你的需求。可以考虑的一些改动包括：

- **必需：** 在 `docker-compose.yml` 文件中把 API 密钥、provider 和模型设为环境变量，因为 keyring 设置在 Docker 中的 Ubuntu 上不起作用。本示例使用 Google Gemini。

- **可选：** 在 `Dockerfile` 中把基础镜像换成其他 Linux 发行版。本示例使用 Ubuntu，但你可以换成 CentOS、Fedora 或 Alpine 等其他发行版。

- **可选：** 在 `docker-compose.yml` 文件中挂载你个人的 goose 设置和 hints 文件。这样就可以在 Docker 容器内使用个人设置和 hints 文件。

:::tip 自动化替代方案
若要以自动化方式在容器中运行 goose，见 [Container-Use MCP 扩展](/docs/mcp/container-use-mcp)，它可以通过对话为你创建和管理容器。
:::

设置好凭据后，用以下命令构建 Docker 镜像：

```bash
docker-compose -f documentation/docs/docker/docker-compose.yml build
```

接下来，用以下命令运行容器并连接到它：

```bash
docker-compose -f documentation/docs/docker/docker-compose.yml run --rm goose-cli
```

在容器内运行以下命令配置 goose：

```bash
goose configure
```

当提示是否把 API 密钥保存到 keyring 时，选择 `No`，因为你已经通过环境变量传递了 API 密钥。

再配置一次 goose，这次可以[添加你需要的任何扩展](/docs/getting-started/using-extensions)。

之后可以启动会话：

```bash
goose session
```

现在应该能够连接 goose，并且已启用你配置的扩展。

## 在 Docker 容器中运行扩展 {#running-extensions-in-docker-containers}

`--container` 标志让你可以在 Docker 容器内运行 goose 扩展。

### 用法

```bash
goose session --container <container-id-or-name>
```

`config.yaml` 中配置的扩展会自动在指定容器内运行。用 `docker ps` 查找容器 ID 或名称。

### 要求

- 扩展必须存在于容器中，并且可以通过扩展配置中使用的相同路径访问
- 要运行内置扩展，必须在容器内[安装](/docs/getting-started/installation) goose CLI

### 示例

```bash
# Start an interactive session with extensions from config.yaml
goose session --container my-dev-container

# Start a non-interactive session with instructions
goose run --container my-dev-container --text "your instructions here"

# Specify an extension to run in the container
goose session --container 4c76a1beed85 --with-extension "uvx mcp-server-fetch"

# Workaround: Use full path if container can't find the command
goose session --container 4c76a1beed85 --with-extension "/root/.local/bin/uvx mcp-server-fetch"
```
