---
title: Telegram 网关
sidebar_position: 2
sidebar_label: Telegram 网关
description: 在任意设备上通过 Telegram 与 goose 对话。
---

Telegram 网关让你通过 Telegram 与 goose 交互，从而在任何安装了 Telegram 的设备上远程访问。

:::warning 实验性功能
网关功能是实验性的，正在积极开发中。行为和配置可能在后续版本中变化。
:::

## 工作原理

网关通过安全的配对流程，把你的 Telegram 账号连接到 goose。配对完成后，你可以向 Telegram 机器人发送消息，机器人会把消息转发给 goose，并在 Telegram 中收到格式化的回复。

**要点：**
- 使用你自己创建并配置的 Telegram 机器人
- 用一次性验证码进行安全配对
- 支持带代码块和 markdown 的格式化回复
- 维持一个持久会话，长对话会自动压缩
- 可在任何安装了 Telegram 的设备上使用

## 前提条件

设置 Telegram 网关之前：

1. [配置 goose](/docs/getting-started/providers)，设置好 provider 和模型。
2. 打开 Telegram，搜索 [@BotFather](https://t.me/BotFather)。
3. 发送 `/newbot`，按提示创建你的机器人。
4. 复制 BotFather 提供的 **bot token**（形如 `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`）。

:::tip
妥善保管 bot token。任何持有该 token 的人都能控制你的机器人。
:::

## 设置

使用 goose CLI 启动网关并配对你的 Telegram 账号。

### 启动网关

在一个终端中导出 bot token 并启动网关：

```bash
export TELEGRAM_BOT_TOKEN="YOUR_BOT_TOKEN"
goose gateway start telegram --bot-token "$TELEGRAM_BOT_TOKEN"
```

让这条命令保持运行。电脑必须保持唤醒并在线，机器人才会回复。

### 配对你的 Telegram 账号

在第二个终端中生成配对码：

```bash
goose gateway pair telegram
```

在 Telegram 中打开你的机器人，并在五分钟内把六位配对码发给它。配对完成后机器人会确认，之后就可以通过 Telegram 与 goose 对话。

要停止网关，在运行它的终端中按 <kbd>Ctrl</kbd>+<kbd>C</kbd>。

## 你可以做什么

配对完成后，你可以：
- 向 goose 发送消息并收到回复
- 获得带语法高亮的格式化代码块
- 跨多个会话继续对话
- 使用你已配置的 goose 扩展

## 故障排除

### 机器人没有响应
- 确认 bot token 正确。
- 检查 `goose gateway start` 命令是否仍在运行。
- 确保电脑处于唤醒状态并在线。

### 配对码无效
- 配对码五分钟后过期。生成一个新的再试。
- 确认你把验证码发给了正确的机器人。

### 消息格式不正确
- 网关会把 goose 的 markdown 转换成 Telegram 兼容的格式。
- 为了兼容 Telegram，某些复杂格式可能会被简化。

## 更多资源

- [Telegram Bot API 文档](https://core.telegram.org/bots)
- [Gateway PR #7199](https://github.com/aaif-goose/goose/pull/7199)
