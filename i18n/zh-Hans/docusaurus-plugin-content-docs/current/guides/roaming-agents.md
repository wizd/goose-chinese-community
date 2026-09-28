---
sidebar_position: 95
title: 漫游代理
sidebar_label: 漫游代理
---

漫游代理让你通过点对点连接从另一台机器访问正在运行的 goose 代理——无需开放端口、无需 VPN、无需托管服务器。它基于 [iroh](https://iroh.computer)（QUIC），因此两台机器可以直接连接，或通过中继连接，通常不必更改防火墙。

:::warning 需要选择加入的构建
漫游是可选的实验性功能，**不包含在已发布的 goose 二进制文件中**。本指南中的每条命令都需要从源码构建并启用 `roaming` 功能的 goose：

```bash
cargo build --release -p goose-cli --features roaming
```

在默认构建上，`goose roam` 会报告无法识别的子命令。
:::

漫游被设计为**可嵌入**：传输层是一个独立的 Rust crate（`goose-roaming`），不依赖 goose 的代理内部实现；CLI 把它暴露为 `goose roam` 命令；还有供浏览器应用使用的 wasm 绑定。如果你基于 goose 构建——或者只想要经过认证的 p2p ACP 传输——可以直接使用同样的组件。Web 客户端（在接近文末处介绍）是完全构建在这个公开表面上的**参考客户端**。

用它从另一台设备驱动你笔记本上的代理，把一次性任务交给远程代理，把远程代理暴露给任何本地 ACP 客户端（例如编辑器），或把 p2p 代理访问接入你自己的应用。

## 核心想法：漫游是一种 ACP 传输

漫游只做一件事：提供经过**认证的点对点 [ACP](/docs/gdk/acp) 传输**。主机运行 goose 真正的 ACP 服务器；连接方是 ACP 客户端。仅此而已。

因此，所有感觉像“会话形态”的东西，都只是碰巧跑在漫游连接上的普通 ACP，而不是定制的漫游功能：

| 你想…… | 它只是 ACP…… | 命令 |
|--------------|----------------|---------|
| 列出远程的会话 | `session/list` | `roam delegate <target> --list-sessions` |
| 继续特定会话 | `session/load` | `roam delegate <target> --session <id> "…"` |
| 运行全新的一次性任务 | `session/new` + `session/prompt` | `roam delegate <target> "…"` |
| 从真正的 UI 驱动远程代理 | 完整的 ACP 表面 | `roam bridge` → Zed 或其他 ACP 编辑器 |
| 快速交互查看 | 内置 REPL | `roam connect` |

因为连接承载完整的 ACP 表面，连接方可以枚举、创建和恢复主机的会话，而不需要漫游专用协议。更高层的行为（已保存的对等方）位于传输层*之上*，下文会说明。

:::note
漫游是可选的实验性功能。当 goose 以 `roaming` 功能构建时可用（`cargo build -p goose-cli --features roaming`）。
:::

## 工作原理：卡片与相互接受

信任是一种**相互的公钥关系**——类似于 WireGuard 或 SSH known-hosts，并且刻意做成基础设施式的。每个节点有一个长期身份，并生成一张**连接卡片**：一个可分享的字符串，包含其公钥以及如何到达它（中继 URL）。*卡片中没有任何内容是机密*——持有一张卡片并不授予访问权限。

要让对等方到达你，双方各自：

1. **交换卡片**（`goose roam id` 打印你的卡片；通过任何渠道发送）。
2. **接受对方的密钥**（`goose roam peers accept …`）。

由于卡片只是一个字符串，它可以以任何方便的方式传递——包括二维码：`goose roam id --qr` 和 `goose roam share --qr` 也会在终端中把卡片渲染为二维码，你可以用手机摄像头扫描（或直接用 Web 客户端的摄像头扫描，见下文），而不必复制粘贴。

只有当**主机已接受拨号方的密钥**时，连接才会成功。传输层（iroh QUIC-TLS）证明每一方持有其卡片中身份对应的私钥，因此没人能冒充一个密钥，泄露的卡片也不会让任何人进入。不存在凭持有即可授予访问权限的 bearer token。

```
┌────────────┐    swap cards     ┌────────────┐
│  Machine A │ ◀───────────────▶ │  Machine B │
│            │  each accepts the │            │
│  roam share│  other's key      │ roam connect│
│  (agent)   │ ◀═══ ACP over ══▶ │ /delegate/ │
└────────────┘   iroh + relay    │  bridge    │
                                 └────────────┘
```

每个连接的客户端获得**自己的**代理，并在完整的 ACP 表面上驱动**自己的**会话。（同时由多个查看者“共同驾驶”一个实时会话是可能的未来功能，不属于此 ACP 传输模型。）

## 使用 CLI

### 快速开始

假设机器 B 想驱动机器 A 的代理。双方都运行 `goose roam id`，并把打印出的卡片发给对方。然后：

**在机器 A（主机）上：** 添加 B 的卡片并接受其密钥。

```bash
goose roam peers add 'goose+roam://…B…' laptop-b
goose roam peers accept laptop-b          # grants control by default
goose roam share                          # serve to accepted peers
```

`share` 会持续运行，并也打印 A 的卡片。代理在启动 `share` 的目录中运行（用 `--cwd <dir>` 覆盖）；连接方自己的目录始终被忽略。

**在机器 B（客户端）上：** 添加 A 的卡片并连接。

```bash
goose roam peers add 'goose+roam://…A…' laptop-a
goose roam connect laptop-a
```

你会得到一个交互式提示，用来驱动机器 A 上的代理。输入消息并按回车；用 `/quit` 或 Ctrl-D 离开。

`connect` 是一个最小的内置聊天循环——便于快速健全性检查。真正工作时，优先使用 `bridge`（从完整的 ACP 客户端驱动远程代理）或 `delegate`（可脚本化的一次性任务）。

对于常见的“配对新设备”场景，还有一个一步完成的辅助命令：`goose roam pair` 把此节点的卡片显示为二维码，从 stdin 读取设备的卡片，并一次完成保存和接受（相当于 `peers add` + `peers accept`）。

:::tip
在带外比较 `roam id` / `peers accept` 显示的短**指纹**（例如大声读出来），以确认你接受的是想要的密钥。
:::

### 一次性委派

发送单个任务并取回答案——没有交互式会话：

```bash
goose roam delegate 'goose+roam://…' "Summarize the last 5 commits in this repo."
```

远程代理用自己的工具运行任务并打印最终响应。`delegate` 是一个薄的 ACP 客户端，因此也可以使用远程现有的会话——底层都是普通 ACP：

```bash
# List the remote agent's sessions (session/list)
goose roam delegate 'goose+roam://…' --list-sessions

# Continue a specific session instead of starting fresh (session/load)
goose roam delegate 'goose+roam://…' --session <SESSION_ID> "Now fix the first failure."
```

### 桥接到任何 ACP 客户端

`connect` 和 `delegate` 嵌入 goose 自己的 ACP 客户端。`bridge` 做相反的事：它把远程代理暴露为**本地 ACP 端点**，因此任何 ACP 客户端——Zed 或其他编辑器——都可以像它在本地运行一样驱动它。它自己不运行 UI，也不运行自己的代理；它在本地客户端和远程代理之间透明地代理 ACP 字节。

通过 stdio 桥接（默认——适用于把 goose 作为子进程启动的客户端）：

```bash
goose roam bridge 'goose+roam://…'
```

把 ACP 客户端配置为运行 `goose roam bridge '<card>'` 作为其代理命令。它会在进程的 stdin/stdout 上使用 ACP，每个请求都会转发到远程代理。

或通过本地 TCP 端口桥接，适用于连接到地址的客户端：

```bash
goose roam bridge laptop --listen 127.0.0.1:8900 --allow-remote-clients
```

这会在该地址上接受单个 ACP 连接，并把它代理到远程代理。已保存的对等方名称在这里同样有效。需要显式选择加入，因为 TCP 监听器不会认证其客户端：即使在回环地址上，另一个本地用户或进程也可以连接并获得远程代理的 ACP 访问。仅在你能控制谁可以连接到监听器的可信主机上使用 TCP 桥接。

因为默认的 `share` 提供完整的 ACP 表面，桥接的客户端会得到一切——它可以列出、创建和加载主机的会话，而不仅仅是预先选定的一个。

:::note
桥接服务一个客户端连接。远程主机仍然运行代理，施加自己的工作目录，并授权该连接。
:::

## 把漫游嵌入你自己的应用

以上一切都构建在 **`goose-roaming` crate**（`crates/goose-roaming`）上，你可以直接使用它。该 crate 刻意**对 goose 核心零依赖**——它不了解代理或会话，只了解身份、信任和经过认证的字节流——因此你可以把它嵌入任何 Rust 应用，无论是否使用 goose。

消费者接触的表面：

- **`RoamingIdentity`** — 持久化的 ed25519 节点密钥，其公钥一半*就是* iroh 端点 id（临时身份用 `RoamingIdentity::generate()`，goose 使用的磁盘上身份用 `default_key_path`）。
- **`RoamingConfig`** — 节点的构建器：`RoamingConfig::new(identity)`，再加上 `.with_relay(RelaySettings::…)` 和 `.with_bind_addr(addr)` 这类链式方法。默认使用 iroh 的公共中继和**空允许列表**（不接受任何人），因此安全默认值是内置的。
- **`RoamingNode`** — 节点本身。`RoamingNode::bind(config)` 绑定端点；`node.share(server)` 向已接受的对等方托管代理；`node.connect(&card, label)` / `node.connect_with_addr(addr, label)` 拨号远程并返回 `RoamingClientStream`（用 `.into_futures_io()` 获取普通的异步读写半部）；`node.card()` 生成可分享的卡片。
- **`AcpStreamServer`** — 主机侧实现的 trait，用来接入“代理”。它有两个方法——`serve_stream`（在为已接受对等方授权的流上驱动你的协议）和 `agent_id`（在握手确认中发送的显示 id）——这就是整个集成接缝。goose-cli 的 `FullAcpBridge` 通过把流交给 goose 真正的 ACP `serve` 来实现它；你的应用可以提供任何内容。
- **`TrustBook`** — 已接受对等方密钥的相互允许列表，带有持久化存储和失败关闭的重新加载。`node.trust()` 给你一个句柄，以便在运行时接受或撤销密钥。
- **`ConnectionCard`** — 非机密的身份 + 可达性字符串（`goose+roam://…`），带有 `encode()` / 解析以及用于带外验证的短 `fingerprint()`。

一个最小的端到端示例（浓缩自 `crates/goose-roaming/examples/echo_roundtrip.rs`，它在一个进程中运行两端——`cargo run -p goose-roaming --example echo_roundtrip`）：

```rust
use std::sync::Arc;
use goose_roaming::{
    AcpStreamServer, EndpointId, RoamingConfig, RoamingIdentity, RoamingNode,
};

// Your "agent": anything that can serve an authorized byte stream.
struct EchoServer;
impl AcpStreamServer for EchoServer {
    fn serve_stream(
        &self,
        _client: EndpointId,
        recv: Box<dyn futures::io::AsyncRead + Send + Unpin>,
        send: Box<dyn futures::io::AsyncWrite + Send + Unpin>,
    ) -> futures::future::BoxFuture<'static, anyhow::Result<()>> {
        Box::pin(async move { /* echo recv back on send … */ Ok(()) })
    }
    fn agent_id(&self) -> String { "echo-agent".to_string() }
}

async fn demo() -> anyhow::Result<()> {
    // Host: bind a node and share the agent to accepted peers.
    let host = RoamingNode::bind(RoamingConfig::new(RoamingIdentity::generate())).await?;
    host.share(Arc::new(EchoServer)).await?;
    println!("share this card: {}", host.card().encode()?);

    // Client: a separate node dials the host's card.
    let client = RoamingNode::bind(RoamingConfig::new(RoamingIdentity::generate())).await?;

    // Trust step: the HOST must accept the client's key, or the dial is refused.
    host.trust().lock().await.accept(&client.endpoint_id());

    let stream = client.connect(&host.card(), Some("example".into())).await?;
    let (send, recv, _conn) = stream.into_futures_io();
    // … speak your protocol (ACP, or anything) over send/recv …
    Ok(())
}
```

给集成者的几点说明：

- **要暴露完整的 goose 后端**，你不必自己实现 `AcpStreamServer`：`goose serve --roam` 在一个进程中运行 goose 的常规代理服务器*并*通过 roam 暴露它。它可以无界面运行，把卡片写入 `<data-dir>/roam/serve.json`，并在启动时打印。
- **对于浏览器应用**，同样的传输可以编译为 WebAssembly。wasm 绑定（`@aaif/goose-roam-web`，由 [goose-mobile 仓库](https://github.com/aaif-goose/goose-mobile/tree/main/mobile-web)中的 `goose-roaming-web` crate 构建）向 JavaScript 暴露 `RoamClient`——生成身份、打印你的卡片、拨号主机的卡片，并在浏览器标签页内驱动 ACP，中间没有服务器。下面的 Web 客户端构建在这些绑定之上。
- 该 crate 的 [README](https://github.com/aaif-goose/goose/tree/main/crates/goose-roaming)更深入地涵盖设计决策（为什么主机控制工作目录、为什么信任是全有或全无，等等）。

## Web 客户端：参考浏览器客户端

托管在 [aaif-goose.github.io/goose-mobile](https://aaif-goose.github.io/goose-mobile/) 的 Web 客户端是**构建在上述组件上的参考客户端**：传输使用 `@aaif/goose-roam-web` wasm 绑定，ACP 协议层使用 goose 的 `ui/sdk` `GooseClient`。浏览器标签页本身就是一个 roam 对等方：编译为 WebAssembly 的 iroh 在标签页内运行，并通过相同的中继、以相同的相互密钥信任进行连接——中间没有服务器，也没有流量经过站点源站。它能做的任何事，你自己的应用都可以用同样的绑定做到。

配对方式与任何其他对等方完全相同。标签页生成自己的身份并显示其卡片；你在主机上接受一次：

```bash
goose roam peers accept 'goose+roam://…tab…' phone
```

要把主机的卡片送进浏览器，粘贴它——或运行 `goose roam share --qr`，用 Web 客户端的摄像头扫描二维码。

连接后，标签页可以列出并打开主机的会话、开始新会话、流式接收响应、引导正在进行的轮次，并按项目分组会话。你可以同时连接多台主机；它们的会话出现在一个合并列表中。

源码位于 [goose-mobile 仓库](https://github.com/aaif-goose/goose-mobile/tree/main/mobile-web)（`mobile-web/`）——如果你想自己托管，那里的 README 有构建细节（它构建为静态站点）。

## 已保存的对等方

把对等方的卡片保存在昵称下，这样你就不必每次都粘贴卡片。已保存的卡片只是通讯录条目——它**不会**让该对等方连接到你（为此请使用 `peers accept`）：

```bash
goose roam peers add 'goose+roam://…' laptop   # save to the address book
goose roam connect laptop
goose roam delegate laptop "run the tests and report failures"

goose roam peers list      # show saved peers + which keys you accept
goose roam connections     # show observed connections
goose roam id              # print this node's connection card
```

## 控制谁可以连接

访问权限**仅**通过接受对等方的公钥授予——不存在凭持有即可生效的 bearer token。你可以通过已保存的名称或内联卡片接受对等方：

```bash
goose roam peers accept laptop                    # accept a saved peer
goose roam peers accept 'goose+roam://…'          # accept an inline card (also saves it)
goose roam peers accept 'goose+roam://…' laptop   # accept + save under a nickname in one go

goose roam peers list                             # see who is accepted
goose roam peers revoke laptop                    # stop accepting (name, card, or raw id)
```

已接受的对等方获得 goose 的**完整 ACP 表面**——它可以在这台机器上驱动自己的会话（new/list/load/prompt），这实际上是远程 shell 访问。没有更细粒度的角色：接受是全有或全无。

接受是**持久的**且**实时的**：它存储在磁盘上，正在运行的 `share` 会在每次连接时重新读取它，*并*轮询信任文件（大约每两秒一次），以便对已经打开的连接强制执行。因此，即使对实时对等方，撤销也会在数秒内生效——share 会强制关闭它的任何打开连接。双方都无需重启。

因为信任以对等方的公钥为键，且传输层以密码学方式认证该密钥，卡片可以通过任何渠道分享——它不是机密，泄露的卡片也不会让任何人进入。

:::warning
接受对等方会授予**完全控制**——对等方可以运行代理的工具，包括其 shell。只接受你信任的机器和人，并在带外验证指纹。
:::

## 让代理到达其他代理

启用漫游功能后，goose 自己可以委派给其他代理。请它这样做，它就可以通过 shell 运行 `goose roam delegate <peer> "<task>"`——例如，“把这个委派给我的工作笔记本，并总结它发现了什么。”它发送一个自包含的任务并转发响应。

因为已保存的对等方只是通讯录，代理可以发现有哪些远程可用（`goose roam peers list`），并把工作路由到正确的那一台——例如在拥有工具链的机器上运行构建，然后把结果带回来。每次委派都是带有有界响应的自包含任务，因此这可以组合成多机器工作流，而无需任何共享状态。

## 说明与限制

- 当 NAT 打洞成功时，对等方直接连接，否则回退到中继。默认情况下，漫游使用一组由 goose 管理的 iroh 中继（每个区域一个——不是 iroh 的共享公共中继）；用 `GOOSE_ROAM_RELAYS` 配置键或环境变量覆盖它们，以指向你自己的部署。
- `connect`、`delegate` 和 `bridge` 都接受已保存的对等方名称或原始的 `goose+roam://…` 卡片。请记住，对等方也必须已接受你的密钥。
- 发送到**在 share 进程中**有正在进行的运行的会话的消息，会成为对该运行的引导。在主机上*另一个*进程中运行的循环（另一个 CLI，或未启用 roam 的主机）不能被远程引导——Web 客户端会检测到这一点，并在发送前警告。
- 撤销对等方会在数秒内强制关闭其连接，并在下一步丢弃任何进行中的轮次；不能开始新工作。有一个狭窄的残留情况：工具已经生成的操作系统进程（例如一条长时间的 shell 命令）可能会运行到完成——撤销停止的是代理，而不是它已经 fork 的进程。
- 在 macOS 上，如果会话在连接时似乎仍然挂起，设置 `GOOSE_DISABLE_KEYRING=1` 以完全跳过钥匙串。
