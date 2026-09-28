---
description: 用 ClawMetry 在本地观察 goose 会话，无需配置
---

# 使用 ClawMetry 做可观测性

本教程介绍如何用 ClawMetry 查看 goose 会话做了什么、用了哪些模型，以及花费了多少。与追踪集成不同，这里无需任何配置：ClawMetry 读取 goose 已经写入的会话存储。

## 什么是 ClawMetry

[ClawMetry](https://clawmetry.com/) 是一个面向 AI 智能体的[开源](https://github.com/vivekchand/clawmetry)（MIT）可观测性仪表板。它在你的机器上运行，读取智能体已经产生的本地文件，并在 `http://localhost:8900` 提供仪表板。goose 是开源应用中的免费运行时，goose 适配器随包一起提供。

## 为什么 goose 适合用 ClawMetry

- **无需埋点**：没有环境变量、没有导出器、没有 SDK。ClawMetry 直接读取 `sessions.db`，因此过去的会话也会显示。
- **默认本地**：仪表板在你的机器上运行，不会把任何内容发送到别处。云同步存在，但是可选的，除非你打开，否则处于关闭状态。
- **只读**：会话存储归 goose 所有。ClawMetry 始终以只读方式打开它，从不写入。
- **真实的 token 计数**：goose 把用量记录在磁盘上，因此 token 总量来自你的会话，而不是估算。
- **开源**：采用 MIT 许可，goose 适配器就在你可以阅读的仓库中。

## 设置 ClawMetry

```bash
pip install clawmetry
clawmetry
```

然后打开 `http://localhost:8900`。

这就是全部设置。没有 goose 侧的配置步骤，因为 ClawMetry 不处在请求路径上。

## 运行 goose

像平常一样使用 goose：

```bash
goose session
```

ClawMetry 以与 goose 相同的方式解析 goose 的数据目录，从而自动检测[会话存储](/docs/guides/logs#session-records)：

| 平台 | 会话存储 |
| --- | --- |
| macOS 和 Linux | `$XDG_DATA_HOME/goose/sessions/sessions.db`，默认为 `~/.local/share/goose/sessions/sessions.db` |
| Windows | `%APPDATA%\Block\goose\data\sessions\sessions.db` |

如果设置了 [`GOOSE_PATH_ROOT`](/docs/guides/environment-variables)，ClawMetry 会在所有平台上改为读取 `$GOOSE_PATH_ROOT/data/sessions/sessions.db`。在 macOS 上，它最后还会检查 `~/Library/Application Support/Block/goose/`，因此仍把数据放在那里的旧安装也会被找到。

安装 ClawMetry 之前运行过的会话同样会出现。

## 你会看到什么

- **会话**：每个 goose 会话及其开始时间、消息数量和工作目录。
- **记录**：完整的逐轮对话，包括工具调用及其结果。
- **模型**：每个会话使用了哪个模型，以及用量如何在它们之间分配。
- **Token 与费用**：每个会话的输入、输出和总 token，以及 goose 记录了费用时的费用。

:::note
goose 只为会报告费用的 provider 填写费用数字。使用 Ollama 这类本地 provider 时没有费用可记录，因此 ClawMetry 显示 token 计数，并把费用留空，而不是编造一个数字。
:::

:::tip
如果你运行多个智能体，仪表板顶部的运行时切换器可以把每个视图都限定为仅 goose。
:::

## 了解更多

- [ClawMetry 仓库](https://github.com/vivekchand/clawmetry)
- [goose 适配器源码](https://github.com/vivekchand/clawmetry/blob/main/clawmetry/adapters/goose.py)
- [ClawMetry 文档](https://clawmetry.com/docs)
