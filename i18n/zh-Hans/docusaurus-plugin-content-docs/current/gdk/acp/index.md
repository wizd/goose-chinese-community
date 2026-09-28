---
sidebar_position: 1
title: 把 goose 用作 ACP 智能体
sidebar_label: 概览
description: 构建通过 stdio、HTTP 或 WebSocket 连接 goose 的客户端。
---

# 把 goose 用作 ACP 智能体

使用 [Agent Client Protocol (ACP)](https://agentclientprotocol.com/) 构建客户端，连接到 goose 的智能体运行时、工具、扩展和已配置的模型。这些客户端可以是代码编辑器、桌面、Web 或移动应用、自动化服务，或其他自定义集成。

goose 在标准 ACP 方法之外额外提供的方法，见 [goose ACP 参考](/docs/gdk/acp/reference)。

## 安装

根据 ACP 客户端如何运行 goose，选择一种安装方式。

### 安装 goose CLI

安装 [goose CLI](/docs/getting-started/installation)，以便配置客户端启动 `goose acp`，或自行运行 `goose serve`。

### 从 ACP Registry 安装

支持的 ACP 客户端可以通过 [ACP Registry 中的 goose 条目](https://agentclientprotocol.com/get-started/registry#goose) 代为安装和管理 goose。这不需要单独安装 goose CLI。

## 运行智能体

### 通过 stdio 连接

把 ACP 客户端配置为用以下命令把 goose 作为子进程启动：

```bash
goose acp
```

客户端通过 stdin 和 stdout 与 goose 通信，并在连接存续期间管理该进程。

### 通过 HTTP 或 WebSocket 连接

当 ACP 客户端通过 HTTP 或 WebSocket 连接时，运行 `goose serve`：

```bash
GOOSE_SERVER__SECRET_KEY='a-long-random-secret' goose serve
```

`GOOSE_SERVER__SECRET_KEY` 设置客户端用于认证的密钥。直接运行 `goose serve` 时，它监听 `127.0.0.1:3284`，并在 `/acp` 暴露 ACP 端点。要使用其他地址，传入 `--host` 和 `--port`。

#### 认证

HTTP 客户端使用 `X-Secret-Key` 头进行认证。WebSocket 客户端也可以使用同一请求头，但基于浏览器的 WebSocket 客户端必须在 `?token=` 查询参数中传递密钥。没有正确密钥的请求会收到 `401 Unauthorized` 响应。

:::warning 仅限本地开发
传入 `--dangerously-unauthenticated` 会在不认证的情况下启动 `goose serve`。仅在服务器与不可信流量隔离时使用。
:::

#### 浏览器来源

大多数客户端不需要配置来源。从非回环来源提供的基于浏览器的客户端，在启动 goose 时必须允许该来源。要同时允许本地开发客户端和已部署的 Web 客户端，请同时指定两个来源：

```bash
GOOSE_SERVER__SECRET_KEY='a-long-random-secret' goose serve \
  --allowed-origin 'http://localhost:5173' \
  --allowed-origin 'https://app.example'
```

指定任何 `--allowed-origin` 值都会替换默认的回环来源，因此请包含客户端需要的每一个来源，包括用于开发的 localhost 来源。来源必须完全匹配，包括协议和端口。

远程部署、TLS 和证书设置见[运行远程 goose 服务器](/docs/guides/remote-goose-server)。运行 `goose serve --help` 可查看完整选项列表。

## ACP 客户端示例

### 通过 stdio 的客户端

浏览[官方 ACP 客户端目录](https://agentclientprotocol.com/get-started/clients)，查找可以运行本地 ACP 智能体的客户端。把 goose 安装并配置为 stdio 智能体的完整示例，见 [Zed 设置示例](/docs/gdk/acp/zed)。

### 通过 WebSocket 的 goose 桌面版

[goose 桌面版](https://github.com/aaif-goose/goose/tree/main/ui/desktop)是使用 WebSocket 的 ACP 客户端。它在可用的回环端口上本地启动 `goose serve`，并通过 WebSocket 连接到其 `/acp` 端点。
