---
title: 设置 LLM 速率限制
sidebar_label: LLM 速率限制
sidebar_position: 60
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PanelLeft } from 'lucide-react';


速率限制是指在特定时间窗口内，限制用户或应用向 LLM API 发送请求数量的机制。LLM 提供商用它来管理资源、防止滥用。

goose 会很快地推进你的任务，因此你可能需要应对提供商施加的速率限制。如果经常触达上限，可以升级 LLM 套餐以获得更高额度，或[配置一个提供商](/docs/getting-started/providers#configure-provider-and-model)，使用自带速率限制的服务：

:::info
goose 支持为这两家提供商自动完成设置，引导你走完 OAuth 账户创建和安全的 API 密钥生成。
:::

- **Tetrate Agent Router**：面向 AI 模型的统一 API 网关，覆盖 Claude、Gemini、GPT、开放权重模型等。它是开发者通往模型的最短路径，提供企业级路由、内置速率限制和自动故障转移。

  在 [router.tetrate.ai](https://router.tetrate.ai/dashboard) 管理账户。

- **OpenRouter**：为 LLM 提供统一接口，可以在单一账单下自动选择并切换不同提供商。通过 OpenRouter，你可以使用免费模型，或购买额度来使用付费模型。

  在 [openrouter.ai](https://openrouter.ai) 管理账户。

当 goose 经由这些提供商发送请求时，提供商会在必要时自动切换模型，避免因速率限制而中断。
