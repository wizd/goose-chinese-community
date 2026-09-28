---
title: "用你的 AI 订阅来使用 goose"
description: "关于使用 claude、gemini 和 codex 订阅的简要更新"
authors: 
    - mic
---

得益于 ACP（Agent Client Protocol），你现在可以用 codex、claude 和 gemini 的订阅来使用 goose。
Codex 还有一个特别之处：你可以直接登录 ChatGPT，不需要再安装别的东西。

Gemini 现在通过 OAuth 工作——用你的 Google 账号登录即可。在撰写本文时，claude 只需要安装一个小工具，而且只需安装一次。

<!--truncate-->

## 为什么用订阅？

因为你可以用已经在付费的东西。这很明显！会话等等仍然在 goose 里。
ACP 提供了比把 CLI 当作提供商更深的连接。在这个世界里，你可以把它想成一层智能体栈：
goose 通过 ACP 接入 gemini（以及其他东西，客户端也可以接入 goose！），但 gemini（以及 claude code）本身也在一定程度上充当智能体循环。
使用 ACP 时，你用的是底层智能体里（大部分）已有的工具。而 Codex 是完整能力的 LLM API，所以对它你可以在 goose 里原生使用扩展。

## Claude Code — 通过 ACP

如果你有 Claude Code 订阅，可以通过 [Agent Client Protocol（ACP）](https://agentclientprotocol.com/) 在 goose 里使用它。这需要安装一个小型适配器包：

```bash
npm install -g @agentclientprotocol/claude-agent-acp
```

然后通过 claude acp 扩展配置 goose 来使用它（CLI 或 GUI）


或者通过环境变量设置：

```bash
export GOOSE_PROVIDER=claude-acp
goose
```

goose 会通过 ACP 把你的 MCP 扩展传给 Claude，所以你在 goose 里配置的任何自定义 MCP 服务器，智能体都可以使用。

## ChatGPT — 用你的账号登录

如果你有 ChatGPT Plus 或 Pro，`chatgpt_codex` 提供商让你用现有账号使用 goose。首次设置 goose 应用时（或切换到该提供商时），选择 ChatGPT 即可。

第一次运行时，goose 会打开浏览器窗口，让你用 ChatGPT 账号登录。之后，会话会缓存在本地。

推荐模型是 `gpt-5.3-codex`，它也是默认模型。你也可以在模型选择器里选择 `gpt-5.4`（OpenAI 最新的 omni 模型）或 `gpt-5.2-codex`。

## Gemini — 通过 OAuth

如果你的 Google 账号可以访问 Gemini，`Gemini`（`gemini_oauth`）提供商让你用现有账号使用 goose。首次设置 goose 时（或更换提供商时），选择 Gemini 即可。

第一次运行时，goose 会打开浏览器窗口，让你用 Google 账号登录。之后，会话会缓存在本地。

## 旧的 CLI 提供商呢？

goose 以前支持把 `claude-code`、`codex` 和 `gemini-cli` 当作“透传”CLI 提供商。它们很快会被移除，因为 ACP 才是未来！

## 速查

| 订阅 | 提供商 | 安装 | 扩展 |
|---|---|---|---|
| Claude Code | `claude-acp` | `npm install -g @agentclientprotocol/claude-agent-acp` | ✅ 通过 MCP |
| ChatGPT Plus/Pro | `chatgpt_codex` | 无需安装 — OAuth 登录 | ✅ 通过 MCP |
| Gemini | `gemini_oauth` | 无需安装 — OAuth 登录 | ✅ 原生 |

选一个和你已经在付费的服务匹配的，就可以开始了。
