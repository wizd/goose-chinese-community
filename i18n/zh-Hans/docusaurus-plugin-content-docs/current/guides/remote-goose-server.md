---
sidebar_position: 90
title: 运行远程 goose 服务器
sidebar_label: 远程服务器
---

# 运行远程 goose 服务器

goose 桌面版通常会在同一台机器的后台运行自己的 `goose serve` ACP 服务器进程。你也可以单独运行 `goose serve`——例如在远程虚拟机或网络中的另一台机器上——并让 goose 桌面版指向它。

当你希望 goose 运行在计算资源更多、IP 更稳定或可以共享访问的地方，同时仍用本地桌面 UI 来驱动它时，这很有用。

本指南涵盖：

1. [在远程机器上启动 `goose serve` 服务器](#1-start-the-goose-serve-server)
2. [验证它可达](#2-verify-the-server-is-up)
3. [找到证书指纹](#3-find-the-certificate-fingerprint)
4. [配置 goose 桌面版连接到它](#4-configure-goose-desktop)
5. [在 macOS 上把 `goose serve` 作为后台服务运行](#running-goose-serve-as-a-background-service-macos)
6. [故障排除](#troubleshooting)

:::warning 远程服务器请使用 TLS
goose 桌面版接受 HTTP 和 HTTPS 外部后端 URL，但通过网络连接时强烈建议使用 TLS。证书指纹固定需要 HTTPS。
:::

## 初始设置

### 1. 启动 `goose serve` 服务器

在远程机器上，用主机、端口、TLS 和共享密钥启动 `goose serve`：

```bash
GOOSE_SERVER__SECRET_KEY='YOUR_SECRET' \
goose serve --platform desktop --enable-scheduler --host 0.0.0.0 --port 3000 --tls
```

如果使用 macOS 应用捆绑的二进制文件，命令路径是 `/Applications/Goose.app/Contents/Resources/bin/goose`。

| 设置 | 用途 |
|---------|---------|
| `--host` | 要绑定的接口。使用 `0.0.0.0` 以接受来自其他机器的连接。绑定到 `localhost` 或 `127.0.0.1` 只会接受本地连接。 |
| `--port` | 要监听的 TCP 端口。 |
| `--tls` / `GOOSE_TLS=true` | 启用 TLS。远程服务器强烈建议使用，证书指纹固定也需要它。 |
| `GOOSE_SERVER__SECRET_KEY` | 共享密钥。客户端必须把它发送到 ACP 端点。请把它当作密码。 |

:::tip
为 `GOOSE_SERVER__SECRET_KEY` 选择一个长的随机值，并保存在密码管理器中——稍后 goose 桌面版中要填入同一个值。
:::

### 2. 验证服务器已启动

首先确认 `goose serve` 确实在你期望的端口上监听：

```bash
lsof -nP -iTCP:3000 -sTCP:LISTEN
```

然后从服务器自身测试。`-k` 标志告诉 `curl` 接受 `goose serve` 生成的自签名 TLS 证书：

```bash
# Connectivity only
curl -i https://127.0.0.1:3000/status -k

# ACP endpoint auth check. A 401 means the secret was rejected.
curl -i https://127.0.0.1:3000/acp -k \
  -H 'X-Secret-Key: YOUR_SECRET'
```

成功的 `/status` 响应确认 TLS 已启用。密钥正确时，`/acp` 检查不应返回 `401`。

如果你打算从另一台机器访问该服务器，也要从那里用服务器的主机名或 VPN 地址测试——不要用 `127.0.0.1`。

### 3. 可选：找到证书指纹

当 `goose serve` 以 TLS 运行时，它会生成或加载 TLS 证书。goose 桌面版可以用 SHA-256 指纹固定该证书。如果把指纹字段留空，goose 桌面版会使用首次信任，并固定它为该后端看到的第一张证书。

启用 TLS 时，`goose serve` 会在启动时记录指纹。它看起来像：

```text
GOOSED_CERT_FINGERPRINT=AA:BB:CC:DD:EE:FF:...
```

要捕获它，可以：

- 交互式运行 `goose serve` 并从终端输出中读取，或
- 跟踪作为服务运行时重定向到的日志文件（见[把 `goose serve` 作为后台服务运行](#running-goose-serve-as-a-background-service-macos)）：

```bash
grep GOOSED_CERT_FINGERPRINT ~/Library/Logs/GooseExternal/goose-serve.out.log
```

如果想在 goose 桌面版中固定特定证书，请记下该指纹。

:::note
每当 `goose serve` 重新生成证书时（例如删除了证书文件），指纹都会改变。如果服务器重启后 goose 桌面版突然拒绝连接，请重新检查指纹。
:::

### 4. 配置 goose 桌面版

在客户端机器上，打开 goose 桌面版并前往 **设置 → goose 服务器**：

| 设置 | 值 |
|---------|-------|
| **使用外部服务器** | 已启用 |
| **URL** | `https://your-server-host:3000`（使用客户端能够到达的主机名或 IP——例如 VPN/tailnet 地址） |
| **密钥** | 与 `GOOSE_SERVER__SECRET_KEY` 相同的值 |
| **证书指纹** | 可选。使用服务器日志中的 `GOOSED_CERT_FINGERPRINT` 值来固定特定 TLS 证书。 |

保存后，goose 桌面版会把所有后端请求路由到远程 `goose serve` 进程。如果连接失败，见[故障排除](#troubleshooting)。

## 把 `goose serve` 作为后台服务运行（macOS）

在终端会话中运行 `goose serve` 适合测试，但日常使用时，你可能希望把它作为后台服务管理，以便登录时启动并在失败时重启。在 macOS 上，这通过 `launchd` 完成。

下面的示例使用 goose 桌面版捆绑的 CLI 二进制文件。如果你单独安装了 CLI，把 `/Applications/Goose.app/Contents/Resources/bin/goose` 替换为 `which goose` 返回的绝对路径。

因为密钥存储在 XML 中，请使用十六进制值，例如 `openssl rand -hex 32` 的输出，或转义值中的 XML 特殊字符。

在 `~/Library/LaunchAgents/com.goose.serve.external.plist` 创建 LaunchAgent plist：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>com.goose.serve.external</string>

    <key>ProgramArguments</key>
    <array>
      <string>/Applications/Goose.app/Contents/Resources/bin/goose</string>
      <string>serve</string>
      <string>--platform</string>
      <string>desktop</string>
      <string>--enable-scheduler</string>
      <string>--host</string>
      <string>0.0.0.0</string>
      <string>--port</string>
      <string>3000</string>
      <string>--tls</string>
    </array>

    <key>EnvironmentVariables</key>
    <dict>
      <key>GOOSE_SERVER__SECRET_KEY</key><string>YOUR_SECRET</string>
    </dict>

    <key>RunAtLoad</key><true/>
    <key>KeepAlive</key><true/>

    <key>StandardOutPath</key>
    <string>/Users/YOUR_USERNAME/Library/Logs/GooseExternal/goose-serve.out.log</string>
    <key>StandardErrorPath</key>
    <string>/Users/YOUR_USERNAME/Library/Logs/GooseExternal/goose-serve.err.log</string>
  </dict>
</plist>
```

把 `YOUR_SECRET` 和 `YOUR_USERNAME` 替换为适当的值。然后创建日志目录，并限制对包含密钥的 plist 的访问：

```bash
mkdir -p ~/Library/Logs/GooseExternal
chmod 600 ~/Library/LaunchAgents/com.goose.serve.external.plist
```

加载并启动服务：

```bash
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.goose.serve.external.plist
```

稍后重启服务：

```bash
launchctl kickstart -k gui/$(id -u)/com.goose.serve.external
```

停止并卸载服务：

```bash
launchctl bootout gui/$(id -u)/com.goose.serve.external
```

要移除服务配置，卸载后再删除该 plist。

## 故障排除

### 服务器只接受本地连接

如果 `curl` 在服务器上可用，但客户端机器超时或得到 “connection refused”，请检查 `goose serve` 绑定的接口。如果 `--host` 是 `localhost` 或 `127.0.0.1`，则只接受回环连接。

设置 `--host 0.0.0.0` 以接受所有接口上的连接，然后重启 `goose serve`。可以用以下命令验证：

```bash
lsof -nP -iTCP:3000 -sTCP:LISTEN
```

输出中的地址应为 `*:3000` 或具体的外部 IP，而不是 `127.0.0.1:3000`。

### 未启用 TLS

在服务器的启动日志中：

- 如果看到 `listening on http://...`，则**未**启用 TLS。goose 桌面版仍可通过 HTTP 连接，但不建议用于远程服务器。使用 `--tls` 或 `GOOSE_TLS=true` 启动并重启 `goose serve`。
- 如果看到 `listening on https://...`，则已启用 TLS，可以继续。

启动日志中也包含可用于在 goose 桌面版中固定证书的 `GOOSED_CERT_FINGERPRINT=...` 行。在服务器的标准输出（或在 `launchd` 下运行时的日志文件）中搜索 `GOOSED_CERT_FINGERPRINT` 即可找到它。

### 客户端无法通过身份验证（401 / Unauthorized）

服务器返回 `401`，或 goose 桌面版报错表明密钥被拒绝，几乎总是意味着服务器上的 `GOOSE_SERVER__SECRET_KEY` 与 goose 桌面版设置中的**密钥**不匹配。

要在不涉及 goose 桌面版的情况下端到端检查密钥，使用你在客户端配置的完全相同的值，运行[第 2 步](#2-verify-the-server-is-up)中经过身份验证的 `curl`。对于这个 `GET /acp` 探测，`406` 响应意味着身份验证已通过，但请求没有包含 ACP 流所需的 SSE 头。`401` 或 `403` 意味着服务器上的密钥与你发送的不同。

如果你在服务器上轮换密钥，也必须在 goose 桌面版的设置中更新它——它们不会自动同步。

### 证书指纹不匹配

如果 goose 桌面版因证书或指纹错误拒绝连接，最常见的原因是：

- 服务器重新生成了证书（例如删除证书文件之后）。查看最新启动日志中的当前 `GOOSED_CERT_FINGERPRINT` 并更新 goose 桌面版。
- 复制指纹时带了多余空白，或粘贴了错误的值。

## 相关

- [环境变量](/docs/guides/environment-variables) — 所有 `GOOSE_*` 变量的完整参考
- [配置文件](/docs/guides/config-files) — 持久的客户端配置
