---
sidebar_position: 2
title: 配置 LLM 提供商
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PanelLeft } from 'lucide-react';
import { ModelSelectionTip } from '@site/src/components/ModelSelectionTip';
import { OnboardingProviderSetup } from '@site/src/components/OnboardingProviderSetup';

# 受支持的 LLM 提供商

goose 兼容多种 LLM 提供商，你可以选择并接入偏好的模型。

:::tip 模型选择
<ModelSelectionTip/>
[Berkeley Function-Calling Leaderboard][function-calling-leaderboard] 可以作为选择模型的参考。
:::

## 可用提供商

| Provider                                                                    | 说明                                                                                                                                                                                                               | 参数                                                                                                                                                                          |
|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [AI/ML API](https://aimlapi.com/)                                           | 一把 API 密钥即可使用来自多家提供商的 300 多个聊天、图像、视频、音频和嵌入模型，兼容 OpenAI。 | `AIMLAPI_API_KEY` |
| [Amazon Bedrock](https://aws.amazon.com/bedrock/)                           | 提供多种基础模型，包括 Claude、Jurassic-2 等。**AWS 环境变量必须事先设置，不能通过 `goose configure` 配置。**                                           | 凭据认证：`AWS_PROFILE`，或 `AWS_ACCESS_KEY_ID`、`AWS_SECRET_ACCESS_KEY`、`AWS_REGION`<br /><br />Bearer 令牌认证：`AWS_BEARER_TOKEN_BEDROCK` 以及 `AWS_REGION`、`AWS_DEFAULT_REGION` 或 `AWS_PROFILE` |
| [Amazon SageMaker TGI](https://docs.aws.amazon.com/sagemaker/latest/dg/realtime-endpoints.html) | 通过 Amazon SageMaker 端点运行 Text Generation Inference 模型。**AWS 凭据必须事先配置。** | `SAGEMAKER_ENDPOINT_NAME`、`AWS_REGION`（可选）、`AWS_PROFILE`（可选）  |
| [Anthropic](https://www.anthropic.com/)                                     | 提供 Claude，一种面向自然语言任务的先进 AI 模型。                                                                                                                                                           | `ANTHROPIC_API_KEY`、`ANTHROPIC_HOST`（可选）                                                                                                                                                                 |
| [Atomic Chat](https://github.com/AtomicBot-ai/Atomic-Chat)                | 用 Atomic Chat 的 OpenAI 兼容服务器运行本地模型。**因为该提供商在本地运行，你必须先[下载模型](#local-llms)。** | 无需填写。默认连接到本地服务器 `localhost:1337`。 |
| [Avian](https://avian.io/)                                                   | 高性价比推理 API，提供 DeepSeek、Kimi、GLM 和 MiniMax 模型。兼容 OpenAI，支持流式输出和函数调用。                                                                                  | `AVIAN_API_KEY`、`AVIAN_HOST`（可选）                                                                                                                                            |
| [Azure AI Foundry](/docs/guides/azure-foundry-provider) | 访问通过 Azure AI Foundry 项目或 MaaS 端点部署的 OpenAI、Anthropic、Microsoft、Meta、Mistral、DeepSeek、GLM、Kimi 等模型。 | `AZURE_FOUNDRY_ENDPOINT`、`AZURE_FOUNDRY_API_KEY`（可选）、`AZURE_FOUNDRY_AD_TOKEN`（可选）、`AZURE_FOUNDRY_API_VERSION`（可选） |
| [Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/) | 访问 Azure 托管的 OpenAI 模型，包括 GPT-4 和 GPT-3.5。支持 API 密钥、Entra ID bearer 令牌和 Azure 凭据链认证。                                                                                          | `AZURE_OPENAI_ENDPOINT`、`AZURE_OPENAI_DEPLOYMENT_NAME`、`AZURE_OPENAI_API_KEY`（可选）、`AZURE_OPENAI_AD_TOKEN`（可选）                                                                                           |
| [ChatGPT Codex](https://chatgpt.com/codex) | 访问为代码生成和理解优化的 GPT-5 Codex 模型。**需要 ChatGPT Plus/Pro 订阅。** | 无需手动密钥。CLI 和桌面版都使用基于浏览器的 OAuth 认证。 |
| [Databricks](https://www.databricks.com/)                                   | 用于构建和部署模型的统一数据分析与 AI 平台。                                                                                                                                                 | `DATABRICKS_HOST`、`DATABRICKS_TOKEN` |
| [Docker Model Runner](https://docs.docker.com/ai/model-runner/)                             | 在 Docker Desktop 或 Docker CE 中运行的本地模型，带有 OpenAI 兼容 API 端点。**因为该提供商在本地运行，你必须先[下载模型](#local-llms)。**                     | `OPENAI_HOST`、`OPENAI_BASE_PATH`   |
| [EmpirioLabs AI](https://empiriolabs.ai/)                                      | 通过一个兼容 OpenAI、支持流式输出的 API 使用前沿的开放与专有聊天模型（Qwen、DeepSeek、GLM、Kimi、MiniMax）。目录见 `https://api.empiriolabs.ai/v1/models`。        | `EMPIRIOLABS_API_KEY`                                                                                                                                                              |
| [Friendli AI](https://friendli.ai/)                                            | Friendli Model API 即时访问一组精选模型，由名为 [Friendli Engine](https://friendli.ai/why-friendliai) 的专有推理栈驱动，实现高性能、高性价比推理。               | `FRIENDLI_API_KEY`                                                                                                                                                                  |
| [FuturMix](https://futurmix.ai/)                                            | 统一 AI 网关，通过兼容 OpenAI 的 API 访问 Anthropic、Google、OpenAI 和 DeepSeek 的模型。                                                                          | `FUTURMIX_API_KEY`                                                                                                                                                                  |
| [Gemini](https://ai.google.dev/gemini-api/docs)                             | Google 的先进 LLM，具备多模态能力（文本、图像）。Gemini 3 模型支持可配置的[思考级别](#gemini-3-thinking-levels)。                                                                                                | `GOOGLE_API_KEY`、`GEMINI3_THINKING_LEVEL`（可选）                                                                                                                              |
| [GCP Vertex AI](https://cloud.google.com/vertex-ai)                         | Google Cloud 的 Vertex AI 平台，支持 Gemini 和 Claude 模型。**凭据必须[事先配置](https://cloud.google.com/vertex-ai/docs/authentication)。** 按组织策略过滤允许的模型（若已配置）。 | `GCP_PROJECT_ID`、`GCP_LOCATION`，以及可选的 `GCP_MAX_RATE_LIMIT_RETRIES`（5）、`GCP_MAX_OVERLOADED_RETRIES`（5）、`GCP_INITIAL_RETRY_INTERVAL_MS`（5000）、`GCP_BACKOFF_MULTIPLIER`（2.0）、`GCP_MAX_RETRY_INTERVAL_MS`（320_000）。 |
| [GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/ai-models) | 通过 GitHub 的 Copilot 基础设施访问 OpenAI、Anthropic、Google 等提供商的 AI 模型。**需要具有 Copilot 访问权限的 GitHub 账户。** | 无需手动密钥。CLI 和桌面版都使用[设备流认证](#github-copilot-authentication)。 |
| [Gondola](https://gondola-ai.com/guides)                                     | 通过 Venice AI 按请求付费推理，以 Base 上的 USDC 结算。没有订阅或最低消费。包含保护隐私的 TEE 模型（`e2ee-*`）。兼容 OpenAI。                                                      | `GONDOLA_API_KEY`、`GONDOLA_HOST`（可选）                                                                                                                                        |
| [Groq](https://groq.com/)                                                   | 面向 LLM 的高性能推理硬件和工具。                                                                                                                                                                   | `GROQ_API_KEY`                                                                                                                                                                      |
| [iFlytek Spark](https://www.xfyun.cn/doc/spark/HTTP%E8%B0%83%E7%94%A8%E6%96%87%E6%A1%A3.html) | 通过兼容 OpenAI 的 HTTP API 使用讯飞星火模型（4.0Ultra、generalv3.5、max-32k）。最适合聊天：星火需要 `tool_calls_switch=true`（此处无法注入）才能返回 OpenAI 风格的工具调用。 | `SPARK_API_PASSWORD` |
| [iFlytek Astron MaaS](https://maas.xfyun.cn/)                               | 讯飞星辰托管 Spark X2、DeepSeek、GLM、Kimi、MiniMax、Qwen 和星辰编程模型，通过兼容 OpenAI 的 API。设置 `ASTRON_BASE_URL` 可在 Token Plan 和 Coding Plan 端点之间切换。 | `ASTRON_API_KEY`、`ASTRON_BASE_URL`（可选） |
| [LiteLLM](https://docs.litellm.ai/docs/) | LiteLLM 代理，支持多种模型、自动提示缓存和统一 API 访问。 | `LITELLM_HOST`、`LITELLM_BASE_PATH`（可选）、`LITELLM_API_KEY`（可选）、`LITELLM_CUSTOM_HEADERS`（可选）、`LITELLM_TIMEOUT`（可选） |
| [LM Studio](https://lmstudio.ai/)                                          | 用 LM Studio 的 OpenAI 兼容服务器运行本地模型。**因为该提供商在本地运行，你必须先[下载模型](#local-llms)。**                                                           | 无需填写。默认连接到本地服务器 `localhost:1234`。                                                                                                             |
| [Meta](https://dev.meta.ai/)                                                | Meta 的 Model API，Muse Spark 模型的所在地。                                                                                                                                | `META_MODEL_API_KEY`                                                                                                                                                                |
| [Mistral AI](https://mistral.ai/)                                           | 提供 Mistral 模型，包括通用模型、专门的编程模型（Codestral）和多模态模型（Pixtral）。                                                                   | `MISTRAL_API_KEY`                                                                                                 |
| [NEAR AI Cloud](https://cloud.near.ai/)                                     | 通过兼容 OpenAI 的 API 进行由 TEE 支持的私有推理，并支持动态模型发现。                                                                                                                   | `NEARAI_API_KEY`                                                                                                                                                                  |
| [Novita AI](https://novita.ai/)                                             | 90 多个开源模型，兼容 OpenAI 的 API，价格有竞争力。支持 Kimi K2.5、DeepSeek、GLM、MiniMax、Qwen 等。                                                                       | `NOVITA_API_KEY`                                                                                                  |
| [Ollama](https://ollama.com/)                                               | 本地模型运行器，支持 Qwen、Llama、DeepSeek 和其他开源模型。**因为该提供商在本地运行，你必须先[下载并运行模型](#local-llms)。**  | `OLLAMA_HOST`                                                                                                                                                                       |
| [Ollama Cloud](https://ollama.com/)                                         | 通过兼容 OpenAI 的 API 访问 ollama.com 上的托管模型。需要 Ollama 账户和 API 密钥。  | `OLLAMA_CLOUD_API_KEY`                                                                                                                                                                       |
| [OpenAI](https://platform.openai.com/api-keys)                              | 提供 gpt-4o、o1 和其他先进语言模型。也支持兼容 OpenAI 的端点（例如自托管 LLaMA、vLLM、KServe）。**不支持 o1-mini 和 o1-preview，因为 goose 使用工具调用。** | `OPENAI_API_KEY`、`OPENAI_HOST`（可选）、`OPENAI_ORGANIZATION`（可选）、`OPENAI_PROJECT`（可选）、`OPENAI_CUSTOM_HEADERS`（可选）                                       |
| [OpenRouter](https://openrouter.ai/)                                        | 统一访问各种模型的 API 网关，具备速率限制管理等功能。                                                                                                                             | `OPENROUTER_API_KEY`、`OPENROUTER_HOST`（可选）、`OPENROUTER_PARAMETERS`（可选）                                                                                              |
| [Perplexity](https://www.perplexity.ai/)                                    | 带有内置实时网页搜索落地的聊天模型。兼容 OpenAI 的 chat completions API，地址为 `https://api.perplexity.ai`。                                                                                          | `PERPLEXITY_API_KEY`                                                                                                                                                                |
| [OVHcloud AI](https://www.ovhcloud.com/en/public-cloud/ai-endpoints/)       | 通过 AI Endpoints 服务访问开源模型，包括 Qwen、Llama、Mistral 和 DeepSeek。                                                       | `OVHCLOUD_API_KEY`                                                                                                                                                                  |
| [Ramalama](https://ramalama.ai/)                                            | 使用原生 [OCI](https://opencontainers.org/) 容器运行时和 [CNCF](https://www.cncf.io/) 工具的本地模型，并把模型作为 OCI 工件。Ramalama API 是 Ollama 的兼容替代，可以与 goose 的 Ollama 提供商一起使用。支持 Qwen、Llama、DeepSeek 和其他开源模型。**因为该提供商在本地运行，你必须先[下载并运行模型](#local-llms)。**  | `OLLAMA_HOST`                                                                                                                                                                       |
| [Routstr](https://routstr.com/)                                             | 兼容 OpenAI 的聚合器，在单一 API 后接入数十家上游提供商（Anthropic、OpenAI、Google、DeepSeek、Llama 等）。使用你的 Routstr 实例签发的 `sk-...` bearer 进行认证——付款在 goose 之外处理。                                                                                                                                                                       | `ROUTSTR_API_KEY`、`ROUTSTR_HOST`（可选，默认 `https://api.routstr.com`）                                                                                                     |
| [SayGM](https://saygm.com/)                                                 | 通过兼容 OpenAI 的 API 进行由 TEE 支持的私有推理，并带动态模型路由。价格在每次请求运行时确定。                                                                           | `SAYGM_API_KEY`                                                                                                   |
| [SaladCloud AI Gateway](https://salad.com/)                                 | 以兼容 OpenAI 的方式访问 SaladCloud 托管的开源模型，包括 Qwen、Gemma 等。                                                                                                          | `SALAD_CLOUD_API_KEY`                                                                                                                                                              |
| [Scaleway](https://www.scaleway.com/en/generative-apis/)                    | 欧洲云，以兼容 OpenAI 的方式访问 Mistral、Qwen 和开源权重等模型。确保数据驻留和 GDPR 合规。                                                                                                                                                                                                                                                                | `SCW_SECRET_KEY`      |
| [Snowflake](https://docs.snowflake.com/user-guide/snowflake-cortex/aisql#choosing-a-model) | 使用 Snowflake Cortex 服务访问最新模型，包括 Claude 模型。**需要 Snowflake 账户和编程访问令牌（PAT）。**                                                     | `SNOWFLAKE_HOST`、`SNOWFLAKE_TOKEN`                                                                                                                                                                 |
| [VMware Tanzu Platform](https://techdocs.broadcom.com/us/en/vmware-tanzu/platform/ai-services/10-3/ai/index.html) | 通过 VMware Tanzu Platform 上的 AI Services 获得企业托管的 LLM 访问。模型从端点动态获取。 | `TANZU_AI_API_KEY`、`TANZU_AI_ENDPOINT` |
| [Tetrate Agent Router Service](https://router.tetrate.ai)                   | 面向 AI 模型的统一 API 网关，包括 Claude、Gemini、GPT、开放权重模型等。支持 PKCE 认证流程以安全生成 API 密钥。                                                                                | `TETRATE_API_KEY`、`TETRATE_HOST`（可选）                                                                                                                                        |
| [TrustedRouter](https://trustedrouter.com)                                  | 通过 TrustedRouter 兼容 OpenAI 的 API 使用 OpenAI、Anthropic、Google、DeepSeek 等模型，支持按请求路由和故障转移。                                                                                                     | `TRUSTEDROUTER_API_KEY`                                                                                                                                                             |
| [Venice AI](https://venice.ai/home)                                         | 在优先保护用户隐私的同时，提供对 Llama、Mistral、Qwen 等开源模型的访问。**需要账户和 [API 密钥](https://docs.venice.ai/overview/guides/generating-api-key)。**                 | `VENICE_API_KEY`、`VENICE_HOST`（可选）、`VENICE_BASE_PATH`（可选）、`VENICE_MODELS_PATH`（可选）                                                                          |
| [Cerebras](https://cerebras.ai/)                                            | 在 Cerebras 晶圆级引擎上快速推理，模型包括 Llama、Qwen 等。                                                                                                                                  | `CEREBRAS_API_KEY`                                                                                                                                                                  |
| [xAI](https://x.ai/)                                                        | 访问 xAI 的 Grok 模型，包括 grok-3、grok-3-mini 和 grok-3-fast，上下文窗口为 131,072 token。                                                                                                            | `XAI_API_KEY`、`XAI_HOST`（可选）                                                                                                                                                |

:::tip Claude 模型的提示缓存
通过 Anthropic、Amazon Bedrock、Databricks、OpenRouter 和 LiteLLM 提供商使用 Claude 模型时，goose 会自动启用 Anthropic 的[提示缓存](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)。这会在请求中加入 `cache_control` 标记，通过缓存常用上下文来降低较长对话的成本。技术细节见[提供商实现](https://github.com/aaif-goose/goose/tree/main/crates/goose/src/providers)。
:::

### CLI 提供商

| Provider                                                                    | 说明                                                                                                                                                                                                               | 要求                                                                                                                                                                          |
|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Cursor Agent](https://docs.cursor.com/en/cli/overview) (`cursor-agent`)   | 使用 Cursor 的 AI CLI 工具和你的 Cursor 订阅。通过 cursor-agent 命令行界面访问 GPT-5、Claude 4 和其他模型。                                              | 已安装并完成身份验证的 cursor-agent CLI                                                                                                         |

### ACP 提供商

goose 支持把 [Agent Client Protocol (ACP)](https://agentclientprotocol.com/) 代理作为提供商。ACP 提供商会把 goose 扩展作为 MCP 服务器传递给该代理。

| Provider                                                                    | 说明                                                                                                                                                                                                               | 要求                                                                                                                                                                          |
|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Claude ACP](https://github.com/agentclientprotocol/claude-agent-acp) (`claude-acp`) | 通过 ACP 使用 Claude Code。把 goose 扩展作为 MCP 服务器传递给代理。 | `npm install -g @agentclientprotocol/claude-agent-acp`，有效的 Claude Code 订阅 |
| [Codex ACP](https://github.com/agentclientprotocol/codex-acp) (`codex-acp`) | 通过 ACP 使用 OpenAI Codex。把 goose 扩展作为 MCP 服务器传递给代理。 | `npm install -g @agentclientprotocol/codex-acp`，有效的 ChatGPT Plus/Pro 订阅或 OpenAI API 额度 |

:::tip ACP 提供商
详细设置说明见 [ACP 提供商指南](/docs/guides/acp-providers)。
:::

### Z.AI Coding Plan

在 goose 桌面版中，打开 **设置 → 模型**，选择 **Z.AI Coding Plan**，并输入你的 Coding Plan API 密钥。模型选择器会从你的 Coding Plan 端点发现可用模型；使用 **刷新** 更新列表。Z.AI 可能会列出你的订阅无法使用的模型；访问权限在你发送请求时检查。

在 CLI 中，于 `goose configure` 里选择 **Z.AI Coding Plan** 并提供 Coding Plan API 密钥，或设置 `GOOSE_PROVIDER=zai_coding_plan`、`GOOSE_MODEL=glm-5.3` 和 `ZAI_CODING_PLAN_API_KEY`。当端点不支持模型发现时，GLM-5.3 和 GLM-5.3-Flash 是回退选择。

该提供商使用专用的 OpenAI 兼容端点 `https://api.z.ai/api/coding/paas/v4`。它对流式请求同时启用 `stream` 和 `tool_stream`，包括新发现的模型，因此工具参数会逐步到达，并在工具结果轮次之间保留 `reasoning_content`。现有的 **Z.AI** 提供商继续使用兼容 Anthropic 的端点。

见 Z.AI 的 [Coding Plan 模型可用性](https://docs.z.ai/devpack/overview)、[工具流式传输](https://docs.z.ai/guides/capabilities/stream-tool)和[思考保留](https://docs.z.ai/guides/capabilities/thinking-mode)文档。

## 配置提供商和模型

要配置所选提供商、查看可用选项或选择模型，请访问 goose 桌面版的 `Models` 选项卡，或在 CLI 中运行 `goose configure`。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  **首次使用的用户：**

  第一次打开 goose 时，欢迎屏幕上有这些选项：

  <OnboardingProviderSetup />

  <Tabs groupId="setup">
    <TabItem value="apikey" label="Quick Setup" default>
    1. 选择 `Quick Setup with API Key`。
    2. 输入来自提供商的 API 密钥（例如 OpenAI、Anthropic 或 Google）。
    3. goose 会自动检测你的提供商并配置连接。
    4. 设置完成后，就可以开始第一次会话。
    </TabItem>

    <TabItem value="chatgpt" label="ChatGPT Subscription">
    1. 选择 `ChatGPT Subscription`。
    2. goose 会打开浏览器窗口，让你用有效的 ChatGPT Plus 或 Pro 订阅凭据登录。
    3. 授权 goose 访问你的 ChatGPT 订阅。
    4. 回到 goose 桌面版后，就可以开始第一次会话。
    </TabItem>
    <TabItem value="tetrate" label="Agent Router">
    我们建议新用户从 Tetrate 的 Agent Router 开始。Tetrate 提供多个 AI 模型的访问，并带有内置速率限制和自动故障转移。

    :::info 免费额度
    第一次通过 goose 自动向 Tetrate 进行身份验证时，你会获得 10 美元免费额度。新用户和现有 Tetrate 用户都可以获得此优惠。
    :::
    1. 选择 `Agent Router by Tetrate`。
    2. goose 会打开浏览器窗口，让你向 Tetrate 进行身份验证；如果还没有账户，可以创建一个。
    3. 回到 goose 桌面版后，就可以开始第一次会话。
    </TabItem>

    <TabItem value="openrouter" label="OpenRouter">
    1. 选择 `Automatic setup with OpenRouter`。
    2. goose 会打开浏览器窗口，让你向 OpenRouter 进行身份验证；如果还没有账户，可以创建一个。
    3. 回到 goose 桌面版后，就可以开始第一次会话。
    </TabItem>

    <TabItem value="others" label="Other Providers">
    1. 如果你有想与 goose 一起使用的特定提供商，以及该提供商的 API 密钥，请选择 `Other Providers`。
    2. 找到你选择的提供商并点击其 `Configure` 按钮。如果列表中没有你的提供商，点击窗口底部的 `Add Custom Provider` 以[配置自定义提供商](#configure-custom-provider)。
    3. 根据提供商，你需要输入 API 密钥、API 主机或其他可选[参数](#available-providers)。点击 `Submit` 按钮进行身份验证并开始第一次会话。

    :::info Ollama 模型检测
    对于 Ollama 用户，所有本地安装的模型都会自动显示在模型选择下拉菜单中。
    :::

    </TabItem>
  </Tabs>
  **更新 LLM 提供商和 API 密钥：**
  1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
  2. 在侧边栏中点击 `Settings` 按钮
  3. 点击 `Models` 选项卡
  4. 点击 `Configure providers`
  5. 在列表中点击你的提供商
  6. 添加 API 密钥和其他必需配置，然后点击 `Submit`

  **更改当前模型：**
  1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
  2. 在侧边栏中点击 `Settings` 按钮
  3. 点击 `Models` 选项卡
  4. 点击 `Switch models`
  5. 从下拉菜单中选择已配置的提供商，或选择 `Use other provider` 配置新的提供商
  6. 从可用选项中选择模型，或选择 `Use custom model` 输入特定模型名称
  7. 点击 `Select model` 确认选择

  :::tip 快捷方式
  为了更快访问，点击应用底部的当前模型名称并选择 `Change Model`。
  :::

  **重新开始提供商和模型配置：**
  1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
  2. 在侧边栏中点击 `Settings` 按钮
  3. 点击 `Models` 选项卡
  4. 点击 `Reset Provider and Model` 清除当前设置并返回欢迎屏幕
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    1. 在终端中运行以下命令：

       ```sh
       goose configure
       ```

    2. 从菜单中选择 `Configure Providers` 并按 `Enter`。

       ```
       ┌   goose-configure
       │
       ◆  What would you like to configure?
       // highlight-start
       │  ● Configure Providers (Change provider or update credentials)
       // highlight-end
       │  ○ Custom Providers
       │  ○ Add Extension
       │  ○ Toggle Extensions
       │  ○ Remove Extension
       │  ○ goose Settings
       └
       ```
    3. 选择模型提供商并按 `Enter`。用方向键（↑/↓）在选项间移动，或开始输入以筛选列表。

       ```
       ┌   goose-configure
       │
       ◇  What would you like to configure?
       │  Configure Providers
       │
       ◆  Which model provider should we use?
       │  ○ Amazon Bedrock
       │  ○ Amazon SageMaker TGI
       // highlight-start
       │  ● Anthropic (Claude and other models from Anthropic)
       // highlight-end
       │  ○ Azure OpenAI
       │  ○ Claude Code CLI
       │  ○ ...
       └
       ```
    4. 在提示时输入 API 密钥（以及任何其他配置细节）。

       ```
       ┌   goose-configure
       │
       ◇  What would you like to configure?
       │  Configure Providers
       │
       ◇  Which model provider should we use?
       │  Anthropic
       │
       ◆  Provider Anthropic requires ANTHROPIC_API_KEY, please enter a value
       // highlight-start
       │  ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
       // highlight-end
       └
       ```

       如果只是更换模型，跳过任何更新提供商配置的提示。

    5. 输入你想要的 `ANTHROPIC_HOST`，或按 `Enter` 使用默认值。

       ```
       ◆  Provider Anthropic requires ANTHROPIC_HOST, please enter a value
       // highlight-start
       │  https://api.anthropic.com (default)
       // highlight-end
       ```
    6. 选择你想使用的模型。根据提供商，你可以：
       - 从列表中选择模型
       - 按名称搜索模型
       - 直接输入模型名称

       ```
       │
       ◇  Model fetch complete
       │
       ◇  Select a model:
       // highlight-start
       │  claude-sonnet-4-5 (default)
       // highlight-end
       │
       ◒  Checking your configuration...
       └  Configuration saved successfully
       ```

       此更改在你下次开始会话时生效。

  :::note
  `goose configure` 不支持输入自定义模型名称。要使用不在提供商列表中的模型，请使用 goose 桌面版，或直接编辑 [`config.yaml`](/docs/guides/config-files) 中的 `GOOSE_MODEL` 变量。
  :::

  :::tip
  使用 [`run` 命令](/docs/guides/goose-cli-commands#run-options)为单次会话设置模型：

  ```bash
  goose run --model claude-sonnet-4-0 -t "initial prompt"
  ```
  :::

  </TabItem>
</Tabs>

### 使用自定义 OpenAI 端点

内置的 OpenAI 提供商可以连接到 OpenAI 官方 API（`api.openai.com`）或任何兼容 OpenAI 的端点，例如：
- 使用 vLLM 或 KServe 的自托管 LLM（例如 LLaMA、Mistral）
- 私有的兼容 OpenAI 的 API 服务器
- 需要数据治理和安全合规的企业部署
- OpenAI API 代理或网关

:::tip 自定义提供商选项
需要连接多个兼容 OpenAI 的端点？请改为[配置自定义提供商](#configure-custom-provider)，以便更容易切换、更好地组织，并支持自定义命名和可分享的配置。
:::

:::note 指向 LiteLLM 代理
你可以用两种方式之一到达 [LiteLLM](https://docs.litellm.ai/) 代理——选一种，不要混用：

- 使用 **OpenAI 提供商**：把 `OPENAI_HOST` 设为代理的根地址（不要带尾部路径），把 `OPENAI_BASE_PATH` 设为它提供服务的路径（通常是 `v1/chat/completions`）。`404` 通常意味着 `OPENAI_BASE_PATH` 与你的代理不匹配。带有 `No api key passed in` 的 `401` 是另一个问题——API 密钥没有被加载（例如密钥放在 `config.yaml` 中，而那里的密钥会被忽略）；见[提供商 API 密钥与 `config.yaml`](/docs/guides/config-files#security-considerations)。
- 使用专用的 **LiteLLM 提供商**，它用自己的 `LITELLM_HOST`、`LITELLM_BASE_PATH` 和 `LITELLM_API_KEY` 变量配置，而不是 `OPENAI_*`。
:::

#### 配置参数

| 参数 | 是否必需 | 说明 |
|-----------|----------|-------------|
| `OPENAI_API_KEY` | 是 | API 的认证密钥 |
| `OPENAI_HOST` | 否 | 自定义端点 URL（默认为 api.openai.com） |
| `OPENAI_BASE_PATH` | 否 | 追加到主机后的请求路径（默认为 `v1/chat/completions`）。当你的端点在不同路径上提供 chat completions API 时设置此项——大多数代理期望 `v1/chat/completions`，但有些挂载在 `chat/completions`（没有 `v1`）。 |
| `OPENAI_ORGANIZATION` | 否 | 用于用量跟踪和治理的组织 ID |
| `OPENAI_PROJECT` | 否 | 用于资源管理的项目标识符 |
| `OPENAI_CUSTOM_HEADERS` | 否 | 要包含在请求中的额外头。可以通过环境变量、配置文件或 CLI 设置，格式为 `HEADER_A=VALUE_A,HEADER_B=VALUE_B`。 |
| `OPENAI_STORE` | 否 | 是否持久保存生成的 Responses API 响应，以便稍后通过 API 检索。默认为 `false`。 |

#### 配置示例

<Tabs groupId="deployment">
  <TabItem value="vllm" label="vLLM Self-Hosted" default>
    如果你使用兼容 OpenAI 的 vLLM 运行 LLaMA 或其他模型：
    ```sh
    OPENAI_HOST=https://your-vllm-endpoint.internal
    OPENAI_API_KEY=your-internal-api-key
    ```
  </TabItem>
  <TabItem value="kserve" label="KServe Deployment">
    对于使用 KServe 部署在 Kubernetes 上的模型：
    ```sh
    OPENAI_HOST=https://kserve-gateway.your-cluster
    OPENAI_API_KEY=your-kserve-api-key
    OPENAI_ORGANIZATION=your-org-id
    OPENAI_PROJECT=ml-serving
    ```
  </TabItem>
  <TabItem value="enterprise" label="Enterprise OpenAI">
    对于带治理的企业 OpenAI 部署：
    ```sh
    OPENAI_API_KEY=your-api-key
    OPENAI_ORGANIZATION=org-id123
    OPENAI_PROJECT=compliance-approved
    ```
  </TabItem>
  <TabItem value="custom-headers" label="Custom Headers">
    对于需要自定义头的兼容 OpenAI 端点：
    ```sh
    OPENAI_API_KEY=your-api-key
    OPENAI_ORGANIZATION=org-id123
    OPENAI_PROJECT=compliance-approved
    OPENAI_CUSTOM_HEADERS="X-Header-A=abc,X-Header-B=def"
    ```
  </TabItem>
</Tabs>

#### 设置说明

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
    2. 在侧边栏中点击 `Settings` 按钮
    3. 点击 `Models` 选项卡
    4. 点击 `Configure providers`
    5. 在提供商列表中点击 `OpenAI`
    6. 填写配置细节：
       - API 密钥（必需）
       - 主机 URL（用于自定义端点）
       - 组织 ID（用于用量跟踪）
       - 项目（用于资源管理）
    7. 点击 `Submit`
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    1. 运行 `goose configure`
    2. 选择 `Configure Providers`
    3. 选择 `OpenAI` 作为提供商
    4. 在提示时输入配置：
       - API 密钥
       - 主机 URL（如果使用自定义端点）
       - 组织 ID（如果使用组织跟踪）
       - 项目标识符（如果使用项目管理）
  </TabItem>
</Tabs>

:::tip 企业部署
对于企业部署，你可以用环境变量或配置文件预先配置这些值，以确保整个组织的治理一致。
:::

## 配置自定义提供商

创建自定义提供商，以连接[尚未支持](#available-providers)的服务，或自定义连接方式。自定义提供商会出现在 goose 的提供商列表中，可以像其他提供商一样选择。

**好处：**
- **多个端点**：在不同服务之间切换（例如 vLLM、企业代理、OpenAI）
- **预配置模型**：保存一份偏好模型列表
- **可分享的配置**：JSON 文件可以在团队间分享或纳入仓库
- **自定义命名**：在 UI 中显示 “Corporate API” 而不是 “OpenAI”
- **分开的凭据**：为每个提供商分配自己的 API 密钥

自定义提供商必须使用兼容 OpenAI、Anthropic 或 Ollama 的 API 格式。它们可以包含用于额外认证、API 密钥、令牌或租户标识符的自定义头。每个自定义提供商对应一个 JSON 配置文件。

**添加自定义提供商：**
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
    2. 在侧边栏中点击 `Settings` 按钮
    3. 点击 `Models` 选项卡
    4. 点击 `Configure providers`
    5. 点击窗口底部的 `Add Custom Provider`
    6. 填写提供商细节：
       - **提供商类型**：
         - `OpenAI Compatible`（最常见）
         - `Anthropic Compatible`
         - `Ollama Compatible`
       - **显示名称**：提供商的友好名称
       - **API URL**：API 端点的基址 URL
       - **身份验证**：
         - **API 密钥**：通过自定义环境变量访问并存储在钥匙串中的 API 密钥（如果密钥环被禁用或无法访问，则存在 `secrets.yaml`）
            - 对于不需要授权的提供商（例如 Ollama、vLLM 等本地模型或内部 API），取消勾选 **“This provider requires an API key”**
       - **可用模型**：以逗号分隔的可用模型名称列表
       - **流式支持**：API 是否支持流式响应（点击切换）
    7. 点击 `Create Provider`

    :::info 自定义头
    目前无法在 goose 桌面版中定义自定义头。变通办法是创建后编辑提供商配置文件。
    :::

  </TabItem>
  <TabItem value="cli" label="goose CLI">
    1. 在终端中运行以下命令：

       ```sh
       goose configure
       ```

    2. 选择 `Custom Providers`。用方向键（↑/↓）在选项间移动。

       ```sh
       ┌   goose-configure
       │
       ◆  What would you like to configure?
       │  ○ Configure Providers
       // highlight-start
       │  ● Custom Providers (Add custom provider with compatible API)
       // highlight-end
       │  ○ Add Extension
       │  ○ Toggle Extensions
       │  ○ Remove Extension
       │  ○ goose Settings
       └
       ```

    3. 选择 `Add A Custom Provider`

       ```sh
       ┌   goose-configure
       │
       ◇  What would you like to configure?
       │  Custom Providers
       │
       ◆  What would you like to do?
       // highlight-start
       │  ● Add A Custom Provider (Add a new OpenAI/Anthropic/Ollama compatible Provider)
       // highlight-end
       │  ○ Remove Custom Provider
       └
       ```

    4. 按照提示输入提供商细节：
       - **API 类型**：
         - `OpenAI Compatible`（最常见）
         - `Anthropic Compatible`
         - `Ollama Compatible`
       - **名称**：提供商的友好名称
       - **API URL**：API 端点的基址 URL
       - **需要身份验证**：如果提供商需要 API 密钥，回答 “Yes”；如果不需要认证，回答 “No”
         - 如果是 Yes：选择 goose 应如何获取凭据：
           - **静态 API 密钥**：系统会提示你输入 **API 密钥**（安全存储在钥匙串中；如果密钥环被禁用或无法访问，则存在 `secrets.yaml`）
           - **命令（可刷新）**：系统会提示你输入 goose 用来获取凭据的**命令**（以及可选参数），再加上以秒为单位的**刷新间隔**。用于由 IdP 或密钥保管库签发的短生命周期凭据，这样 goose 可以自动刷新，而不是在过期时要求重启。见下方的[基于命令的身份验证](#command-based-authentication)。
         - 如果是 No：跳过 API 密钥提示
       - **可用模型**：以逗号分隔的可用模型名称列表
       - **流式支持**：API 是否支持流式响应
       - **自定义头**：任何额外的头名称和值

    :::info 自定义头
    目前，自定义头只能在 CLI 中为兼容 OpenAI 的提供商定义。对于兼容 Anthropic 或 Ollama 的提供商，请在创建后编辑提供商配置文件。
    :::

  </TabItem>
  <TabItem value="config" label="Config File">

    首先在 `custom_providers` 目录中创建 JSON 文件：
    - macOS/Linux：`~/.config/goose/custom_providers/`
    - Windows：`%APPDATA%\Block\goose\config\custom_providers\`

    示例 `custom_corp_api.json` 配置文件：
    ```json
    {
      "name": "custom_corp_api",
      "engine": "openai",
      "display_name": "Corporate API",
      "description": "Custom Corporate API provider",
      "api_key_env": "CUSTOM_CORP_API_API_KEY",
      "base_url": "https://api.company.com/v1/chat/completions",
      "models": [
        {
          "name": "gpt-4o",
          "context_limit": 128000
        },
        {
          "name": "gpt-3.5-turbo",
          "context_limit": 16385
        }
      ],
      "headers": {
        "x-origin-client-id": "YOUR_CLIENT_ID",
        "x-origin-secret": "YOUR_SECRET_VALUE"
      },
      "supports_streaming": true,
      "requires_auth": true
    }
    ```

    然后用 `api_key_env` 为会话设置密钥。例如：
    ```bash
    export CUSTOM_CORP_API_API_KEY="your-api-key"
    goose session start --provider custom_corp_api
    ```

    :::tip 钥匙串密钥存储
    如果想把 API 密钥存在 `goose` 钥匙串中，在 goose 桌面版中更新该提供商并输入密钥。这提供安全、持久的存储，并允许 goose 原生连接到该提供商。
    :::

  </TabItem>
</Tabs>

### 基于命令的身份验证

自定义提供商可以配置为运行一条命令来获取凭据，而不是使用静态的 `api_key_env`。这对由 IdP 或密钥保管库签发的短生命周期凭据很有用：goose 会重新运行命令来刷新凭据，而不是在过期时要求重启。

在提供商的 JSON 配置中加入 `auth` 对象以代替 `api_key_env`（二者互斥）：

```json
{
  "name": "custom_corp_api",
  "engine": "openai",
  "display_name": "Corporate API",
  "base_url": "https://api.company.com/v1/chat/completions",
  "models": [{ "name": "gpt-4o", "context_limit": 128000 }],
  "requires_auth": true,
  "auth": {
    "command": "/path/to/get-token.sh",
    "args": [],
    "refresh_interval": 3600,
    "timeout_seconds": 10
  }
}
```

- **`command`**：要运行的可执行文件。它被直接生成，不经过 shell——`command`/`args` 都不会被 shell 插值。如果你的脚本需要 shell 功能（管道、变量展开），请显式调用解释器，例如 `"command": "/bin/bash", "args": ["-c", "..."]`。裸名称（没有路径分隔符，例如 `"get-token"`）会在 `PATH` 上查找；相对路径（例如 `"./scripts/get-token.sh"`）相对 `cwd` 解析。
- **`args`**（可选）：传给 `command` 的参数。
- **`refresh_interval`**（可选，默认为 `3600`）：获取到的凭据在重新运行命令之前缓存多少秒。设为 `0` 可完全禁用主动刷新——此时命令只在提供商 API 因认证错误拒绝请求后被动重新运行。
- **`timeout_seconds`**（可选，默认为 `10`）：在把命令视为失败之前等待多久。
- **`cwd`**（可选）：命令的工作目录，也是相对 `command` 路径的解析基准。默认为 goose 的当前目录。

命令经过修剪的标准输出被用作凭据。它必须成功退出并打印非空值；失败时，goose 会显示错误，而不是静默复用过期凭据。命令继承 goose 的完整环境，因为配置 goose 和编写脚本的是同一用户。

<Tabs groupId="interface">
  <TabItem value="cli" label="goose CLI" default>

    在 `goose configure` 中，当提示如何为自定义提供商获取凭据时，选择 **Command (refreshable)**（见[上方](#configure-custom-provider)）。

  </TabItem>
  <TabItem value="config" label="Config File">

    把上面所示的 `auth` 对象加入提供商的 JSON 文件，而不是设置 `api_key_env`。

  </TabItem>
</Tabs>

**更新自定义提供商：**

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
    2. 在侧边栏中点击 `Settings` 按钮
    3. 点击 `Models` 选项卡
    4. 点击 `Configure providers`
    5. 在列表中点击你的自定义提供商
    6. 更新你想更改的字段
    7. 点击 `Update Provider`

  </TabItem>
  <TabItem value="cli" label="goose CLI">

    1. 在终端中运行以下命令：

       ```sh
       goose configure
       ```

    2. 从菜单中选择 `Configure Providers` 并按 `Enter`。

       ```sh
       ┌   goose-configure
       │
       ◆  What would you like to configure?
       // highlight-start
       │  ● Configure Providers (Change provider or update credentials)
       // highlight-end
       │  ○ Custom Providers
       │  ○ Add Extension
       │  ○ Toggle Extensions
       │  ○ Remove Extension
       │  ○ goose Settings
       └
       ```

    3. 选择你想更新的自定义提供商并按 `Enter`。用方向键（↑/↓）在选项间移动，或开始输入以筛选列表。

       ```sh
       ┌   goose-configure
       │
       ◇  What would you like to configure?
       │  Configure Providers
       │
       ◆  Which model provider should we use?
       │  ○ Amazon Bedrock
       │  ○ Amazon SageMaker TGI
       │  ○ Anthropic
       │  ○ Azure OpenAI
       │  ○ Claude Code CLI
       // highlight-start
       │  ● Corporate API (Custom Corporate API provider)
       // highlight-end
       │  ○ Cursor Agent
       │  ○ ...
       └
       ```

    4. 按照提示更新字段。

  </TabItem>
  <TabItem value="config" label="Config File">

    打开 `custom_providers` 目录中的自定义提供商配置文件：
    - macOS/Linux：`~/.config/goose/custom_providers/`
    - Windows：`%APPDATA%\Block\goose\config\custom_providers\`

    更新你想更改的字段并保存。
  </TabItem>
</Tabs>

你的更改在下一次 goose 会话中可用。

**移除自定义提供商：**

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
    2. 在侧边栏中点击 `Settings` 按钮
    3. 点击 `Models` 选项卡
    4. 点击 `Configure providers`
    5. 在列表中点击你的自定义提供商
    6. 点击 `Delete Provider`
    7. 点击 `Confirm Delete`，确认你要永久移除该自定义提供商及其已存储的 API 密钥（如适用）

  </TabItem>
  <TabItem value="cli" label="goose CLI">

    1. 在终端中运行以下命令：

       ```sh
       goose configure
       ```

    2. 选择 `Custom Providers`。用方向键（↑/↓）在选项间移动。

       ```sh
       ┌   goose-configure
       │
       ◆  What would you like to configure?
       │  ○ Configure Providers
       // highlight-start
       │  ● Custom Providers (Add custom provider with compatible API)
       // highlight-end
       │  ○ Add Extension
       │  ○ Toggle Extensions
       │  ○ Remove Extension
       │  ○ goose Settings
       └
       ```

    3. 选择 `Remove Custom Provider`。

       ```sh
       ┌   goose-configure
       │
       ◇  What would you like to configure?
       │  Custom Providers
       │
       ◆  What would you like to do?
       │  ○ Add A Custom Provider
       // highlight-start
       │  ● Remove Custom Provider (Remove an existing custom provider)
       // highlight-end
       └
       ```

    4. 选择你想移除的自定义提供商。

    提供商配置文件会从 `custom_providers` 目录中移除，密钥也会从钥匙串中移除。

  </TabItem>
  <TabItem value="config" label="Config File">

    :::tip
    如果提供商的 API 密钥存在钥匙串中，请使用 goose CLI 移除自定义提供商。这也会移除已存储的 API 密钥。
    :::

    删除 `custom_providers` 目录中的自定义提供商配置文件：
    - macOS/Linux：`~/.config/goose/custom_providers/`
    - Windows：`%APPDATA%\Block\goose\config\custom_providers\`

  </TabItem>
</Tabs>

## 免费使用 goose

goose 是免费开源的 AI 代理，你可以马上开始使用，但并非所有受支持的 [LLM 提供商][providers]都提供免费层级。

下面列出几种免费选项以及如何开始。

:::warning 限制
这些免费选项是开始使用 goose 并探索其能力的好办法。不过，你可能需要升级 LLM 以获得更好的性能。
:::


### Groq
Groq 提供对开源（开放权重）模型的免费访问，并具有高速推理。要在 goose 中使用 Groq，你需要来自 [Groq Console](https://console.groq.com/keys) 的 API 密钥。

Groq 提供多个支持工具调用的开源模型，包括：
- **moonshotai/kimi-k2-instruct-0905** - 具有 1 万亿参数的混合专家模型，为智能体智能和工具使用优化
- **qwen/qwen3-32b** - 具有 328 亿参数的模型，具备高级推理和多语言能力
- **llama-3.3-70b-versatile** - Meta 的 Llama 3.3 模型，适用于多种用途
- **llama-3.1-8b-instant** - Meta 的 Llama 3.1 模型，用于快速推理

支持的 Groq 模型完整列表见 [groq.json](https://github.com/aaif-goose/goose/blob/main/crates/goose-providers/src/declarative/definitions/groq.json)。

按以下步骤用 goose 设置 Groq：

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  **更新 LLM 提供商和 API 密钥：**

    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
    2. 在侧边栏中点击 `Settings` 按钮。
    3. 点击 `Models` 选项卡。
    4. 点击 `Configure Providers`
    5. 从列表中选择 `Groq` 作为提供商。
    6. 点击 `Configure`，输入 API 密钥，然后点击 `Submit`。
    7. 选择你想要的 Groq 模型。

  </TabItem>
  <TabItem value="cli" label="goose CLI">
    1. 运行：
    ```sh
    goose configure
    ```
    2. 从菜单中选择 `Configure Providers`。
    3. 按照提示选择 `Groq` 作为提供商。
    4. 在提示时输入 API 密钥。
    5. 选择你想要的 Groq 模型。
  </TabItem>
</Tabs>

### EmpirioLabs AI
[EmpirioLabs AI](https://empiriolabs.ai/) 通过单一的、兼容 OpenAI 并支持流式输出的 API，提供前沿的开放与专有聊天模型。要在 goose 中使用 EmpirioLabs，你需要来自 [EmpirioLabs](https://platform.empiriolabs.ai/dashboard/api-keys) 的 API 密钥。

EmpirioLabs 提供支持工具调用的模型，包括：
- **qwen3-7-plus** - 上下文窗口为 1M 的 Qwen3.7 Plus
- **qwen3-7-max** - 上下文窗口为 1M 的 Qwen3.7 Max
- **deepseek-v4-pro** - 上下文窗口为 1M 的 DeepSeek V4 Pro
- **deepseek-v4-flash** - 上下文窗口为 1M 的 DeepSeek V4 Flash
- **glm-5-1** - 上下文窗口为 202K 的 GLM-5.1
- **kimi-k2-7-code** - 上下文窗口为 256K 的 Kimi K2.7 Code
- **minimax-m3** - 上下文窗口为 524K 的 MiniMax M3

完整的实时目录见 `https://api.empiriolabs.ai/v1/models`。goose 中配置的 EmpirioLabs 模型完整列表见 [empiriolabs.json](https://github.com/aaif-goose/goose/blob/main/crates/goose-providers/src/declarative/definitions/empiriolabs.json)。更多细节见 [EmpirioLabs 文档](https://docs.empiriolabs.ai)。

按以下步骤用 goose 设置 EmpirioLabs：

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  **更新 LLM 提供商和 API 密钥：**

    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
    2. 在侧边栏中点击 `Settings` 按钮。
    3. 点击 `Models` 选项卡。
    4. 点击 `Configure Providers`
    5. 从列表中选择 `EmpirioLabs AI` 作为提供商。
    6. 点击 `Configure`，输入 API 密钥，然后点击 `Submit`。
    7. 选择你想要的 EmpirioLabs 模型。

  </TabItem>
  <TabItem value="cli" label="goose CLI">
    1. 运行：
    ```sh
    goose configure
    ```
    2. 从菜单中选择 `Configure Providers`。
    3. 按照提示选择 `EmpirioLabs AI` 作为提供商。
    4. 在提示时输入 API 密钥。
    5. 选择你想要的 EmpirioLabs 模型。
  </TabItem>
</Tabs>

### FuturMix
[FuturMix](https://futurmix.ai/) 是统一 AI 网关，通过兼容 OpenAI 的 API 访问 Anthropic、Google、OpenAI 和 DeepSeek 的模型。要在 goose 中使用 FuturMix，你需要来自 [FuturMix](https://futurmix.ai/) 的 API 密钥。

FuturMix 提供支持工具调用的模型，包括：
- **claude-sonnet-4-20250514** - 上下文为 200K 的 Anthropic Claude Sonnet 4
- **gpt-4o** - 上下文为 128K 的 OpenAI GPT-4o
- **gemini-2.5-pro** - 上下文为 1M 的 Google Gemini 2.5 Pro
- **deepseek-chat** - 上下文为 131K 的 DeepSeek V3
- **claude-haiku-4-20250514** - 上下文为 200K 的 Anthropic Claude Haiku 4

支持的 FuturMix 模型完整列表见 [futurmix.json](https://github.com/aaif-goose/goose/blob/main/crates/goose-providers/src/declarative/definitions/futurmix.json)。

按以下步骤用 goose 设置 FuturMix：

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  **更新 LLM 提供商和 API 密钥：**

    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
    2. 在侧边栏中点击 `Settings` 按钮。
    3. 点击 `Models` 选项卡。
    4. 点击 `Configure Providers`
    5. 从列表中选择 `FuturMix` 作为提供商。
    6. 点击 `Configure`，输入 API 密钥，然后点击 `Submit`。
    7. 选择你想要的 FuturMix 模型。

  </TabItem>
  <TabItem value="cli" label="goose CLI">
    1. 运行：
    ```sh
    goose configure
    ```
    2. 从菜单中选择 `Configure Providers`。
    3. 按照提示选择 `FuturMix` 作为提供商。
    4. 在提示时输入 API 密钥。
    5. 选择你想要的 FuturMix 模型。
  </TabItem>
</Tabs>

### Novita AI
[Novita AI](https://novita.ai/) 通过兼容 OpenAI 的 API、以有竞争力的价格提供 90 多个开源模型的访问。要在 goose 中使用 Novita AI，你需要来自 [Novita AI](https://novita.ai/settings#key-management) 的 API 密钥。

Novita AI 提供许多支持工具调用的模型，包括：
- **moonshotai/kimi-k2.5** - Moonshot 的最新模型，上下文窗口为 262K
- **minimax/minimax-m2.7** - 上下文为 205K 的 MiniMax M2.7
- **zai-org/glm-5.1** - 上下文为 205K 的智谱 GLM-5.1
- **deepseek/deepseek-v3.2** - 上下文为 164K 的 DeepSeek V3.2
- **google/gemma-4-31b-it** - 上下文为 262K 的 Google Gemma 4 31B

支持的 Novita AI 模型完整列表见 [novita.json](https://github.com/aaif-goose/goose/blob/main/crates/goose-providers/src/declarative/definitions/novita.json)。

按以下步骤用 goose 设置 Novita AI：

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  **更新 LLM 提供商和 API 密钥：**

    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
    2. 在侧边栏中点击 `Settings` 按钮。
    3. 点击 `Models` 选项卡。
    4. 点击 `Configure Providers`
    5. 从列表中选择 `Novita AI` 作为提供商。
    6. 点击 `Configure`，输入 API 密钥，然后点击 `Submit`。
    7. 选择你想要的 Novita AI 模型。

  </TabItem>
  <TabItem value="cli" label="goose CLI">
    1. 运行：
    ```sh
    goose configure
    ```
    2. 从菜单中选择 `Configure Providers`。
    3. 按照提示选择 `Novita AI` 作为提供商。
    4. 在提示时输入 API 密钥。
    5. 选择你想要的 Novita AI 模型。
  </TabItem>
</Tabs>

### Routstr
[Routstr](https://routstr.com/) 是兼容 OpenAI 的聚合器，在单一 API 后接入数十家上游提供商。付款由 Routstr 实例本身处理，因此 goose 只需要该实例签发给你的 `sk-...` bearer。要在 goose 中使用 Routstr，选择一个实例（默认是 `https://api.routstr.com`）并从它的付款流程获取 API 密钥。

Routstr 聚合来自许多上游提供商的模型，包括：
- **claude-opus-4.7** — Anthropic 的 Claude opus 4.7
- **deepseek-v4-pro** — DeepSeek V4 Pro
- **gemini-3.1-pro-preview** — gemini-3.1 Pro Preview

配置时会查询 `/v1/models`，因此你的 Routstr 实例暴露的完整目录会出现在模型选择器中。goose 附带的静态默认值见 [routstr.json](https://github.com/aaif-goose/goose/blob/main/crates/goose-providers/src/declarative/definitions/routstr.json)。

按以下步骤用 goose 设置 Routstr：

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  **更新 LLM 提供商和 API 密钥：**

    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
    2. 在侧边栏中点击 `Settings` 按钮。
    3. 点击 `Models` 选项卡。
    4. 点击 `Configure Providers`
    5. 从列表中选择 `Routstr` 作为提供商。
    6. 点击 `Configure`，输入 `ROUTSTR_API_KEY`（可选：覆盖 `ROUTSTR_HOST` 以指向另一个 Routstr 实例），然后点击 `Submit`。
    7. 选择你想要的 Routstr 模型。

  </TabItem>
  <TabItem value="cli" label="goose CLI">
    1. 运行：
    ```sh
    goose configure
    ```
    2. 从菜单中选择 `Configure Providers`。
    3. 按照提示选择 `Routstr` 作为提供商。
    4. 在提示时输入 API 密钥（可选：覆盖 `ROUTSTR_HOST`）。
    5. 选择你想要的 Routstr 模型。
  </TabItem>
</Tabs>

### SayGM
[SayGM](https://saygm.com/) 通过兼容 OpenAI 的 API 提供由 TEE 支持的私有推理。模型路由和价格在每次请求运行时确定。要在 goose 中使用 SayGM，你需要来自 [SayGM](https://saygm.com/) 的 API 密钥。

SayGM 支持许多模型，包括：
- **Qwen/Qwen3-235B-A22B-Thinking-2507-TEE** — Qwen3 235B 思考模型（TEE 支持）
- **deepseek-ai/DeepSeek-V3.2-TEE** — DeepSeek V3.2（TEE 支持）
- **moonshotai/Kimi-K3-TEE** — Kimi K3（TEE 支持）
- **zai-org/GLM-5.2-TEE** — GLM-5.2（TEE 支持）

配置时会查询 `/v1/models`，因此 SayGM 暴露的完整目录会出现在模型选择器中。

按以下步骤用 goose 设置 SayGM：

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  **更新 LLM 提供商和 API 密钥：**

    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
    2. 在侧边栏中点击 `Settings` 按钮。
    3. 点击 `Models` 选项卡。
    4. 点击 `Configure Providers`
    5. 从列表中选择 `SayGM` 作为提供商。
    6. 点击 `Configure`，输入 API 密钥，然后点击 `Submit`。
    7. 选择你想要的 SayGM 模型。

  </TabItem>
  <TabItem value="cli" label="goose CLI">
    1. 运行：
    ```sh
    goose configure
    ```
    2. 从菜单中选择 `Configure Providers`。
    3. 按照提示选择 `SayGM` 作为提供商。
    4. 在提示时输入 API 密钥。
    5. 选择你想要的 SayGM 模型。
  </TabItem>
</Tabs>

### Google Gemini
Google Gemini 提供免费层级。要开始在 goose 中使用 Gemini API，你需要来自 [Google AI studio](https://aistudio.google.com/app/apikey) 的 API 密钥。

按以下步骤用 goose 设置 Google Gemini：

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  **更新 LLM 提供商和 API 密钥：**

    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
    2. 在侧边栏中点击 `Settings` 按钮。
    3. 点击 `Models` 选项卡。
    4. 点击 `Configure Providers`
    5. 从列表中选择 `Google Gemini` 作为提供商。
    6. 点击 `Configure`，输入 API 密钥，然后点击 `Submit`。

  </TabItem>
  <TabItem value="cli" label="goose CLI">
    1. 运行：
    ```sh
    goose configure
    ```
    2. 从菜单中选择 `Configure Providers`。
    3. 按照提示选择 `Google Gemini` 作为提供商。
    4. 在提示时输入 API 密钥。
    5. 输入你选择的 Gemini 模型。

    ```
    ┌   goose-configure
    │
    ◇ What would you like to configure?
    │ Configure Providers
    │
    ◇ Which model provider should we use?
    │ Google Gemini
    │
    ◇ Provider Google Gemini requires GOOGLE_API_KEY, please enter a value
    │▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
    │
    ◇ Enter a model from that provider:
    │ gemini-2.0-flash-exp
    │
    ◇ Hello! You're all set and ready to go, feel free to ask me anything!
    │
    └ Configuration saved successfully
    ```
  </TabItem>
</Tabs>


### 本地 LLM

goose 是本地 AI 代理。使用本地 LLM 时，数据留在本地，你完全控制环境，并且可以完全离线工作，不依赖云访问。不过请注意，本地 LLM 在与 goose 一起使用之前需要多做一些设置。

:::warning 对不支持工具调用的模型支持有限
goose 大量使用工具调用，因此没有工具调用的模型只能做聊天补全。如果使用没有工具调用的模型，必须[禁用所有 goose 扩展](/docs/getting-started/using-extensions#enablingdisabling-extensions)。
:::

下面是我们支持的一些本地提供商：

<Tabs groupId="local-llms">
  <TabItem value="ollama" label="Ollama" default>
    <Tabs groupId="ollama-models">
      <TabItem value="ramalala" label="Ramalala">
        1. [下载 Ramalama](https://github.com/containers/ramalama?tab=readme-ov-file#install)。
        2. 在终端中运行任何支持工具调用的 Ollama [模型](https://ollama.com/search?c=tools)或 [GGUF 格式的 HuggingFace 模型](https://huggingface.co/search/full-text?q=%22tools+support%22+%2B+%22gguf%22&type=model)：

          `--runtime-args="--jinja"` 标志是 Ramalama 与 goose Ollama 提供商配合所必需的。

          示例：

          ```sh
          ramalama serve --runtime-args="--jinja" ollama://qwen2.5
          ```

          3. 在另一个终端窗口中用 goose 配置：

          ```sh
          goose configure
          ```

          4. 选择 `Configure Providers`

          ```
          ┌   goose-configure
          │
          ◆  What would you like to configure?
          │  ● Configure Providers (Change provider or update credentials)
          │  ○ Toggle Extensions
          │  ○ Add Extension
          └
          ```

          5. 选择 `Ollama` 作为模型提供商，因为 Ramalama 的 API 兼容，可以使用 goose 的 Ollama 提供商

          ```
          ┌   goose-configure
          │
          ◇  What would you like to configure?
          │  Configure Providers
          │
          ◆  Which model provider should we use?
          │  ○ Anthropic
          │  ○ Databricks
          │  ○ Google Gemini
          │  ○ Groq
          │  ● Ollama (Local open source models)
          │  ○ OpenAI
          │  ○ OpenRouter
          └
          ```

          6. 输入模型运行所在的主机

          :::info 端点
          对于 Ollama 提供商，如果你不提供主机，我们会把它设为 `localhost:11434`。构造 URL 时，如果方案不是 `http` 或 `https`，我们会在前面加上 `http://`。由于 Ramalama 默认服务端口是 8080，我们设置 `OLLAMA_HOST=http://0.0.0.0:8080`
          :::

          ```
          ┌   goose-configure
          │
          ◇  What would you like to configure?
          │  Configure Providers
          │
          ◇  Which model provider should we use?
          │  Ollama
          │
          ◆  Provider Ollama requires OLLAMA_HOST, please enter a value
          │  http://0.0.0.0:8080
          └
          ```


          7. 输入正在运行的模型

          ```
          ┌   goose-configure
          │
          ◇  What would you like to configure?
          │  Configure Providers
          │
          ◇  Which model provider should we use?
          │  Ollama
          │
          ◇  Provider Ollama requires OLLAMA_HOST, please enter a value
          │  http://0.0.0.0:8080
          │
          ◇  Enter a model from that provider:
          │  qwen2.5
          │
          ◇  Welcome! You're all set to explore and utilize my capabilities. Let's get started on solving your problems together!
          │
          └  Configuration saved successfully
          ```

          :::tip 上下文长度
          如果你注意到 goose 难以使用扩展，或忽略了 [.goosehints](/docs/guides/context-engineering/using-goosehints)，很可能是模型默认的 2048 token 上下文长度太低。使用 `ramalama serve` 把 `--ctx-size, -c` 选项设为[更高的值](https://github.com/containers/ramalama/blob/main/docs/ramalama-serve.1.md#--ctx-size--c)。
          :::

      </TabItem>
      <TabItem value="deepseek" label="DeepSeek-R1">
        原生的 `DeepSeek-r1` 模型不支持工具调用，不过我们有一个可以与 goose 一起使用的[自定义模型](https://ollama.com/michaelneale/deepseek-r1-goose)。

        :::warning
        请注意这是 70B 规模的模型，需要较强的设备才能流畅运行。
        :::


        1. [下载 Ollama](https://ollama.com/download)。
        2. 在终端窗口中运行以下命令，安装自定义 DeepSeek-r1 模型：

        ```sh
        ollama run michaelneale/deepseek-r1-goose
        ```

        3. 在另一个终端窗口中用 goose 配置：

        ```sh
        goose configure
        ```

        4. 选择 `Configure Providers`

        ```
        ┌   goose-configure
        │
        ◆  What would you like to configure?
        │  ● Configure Providers (Change provider or update credentials)
        │  ○ Toggle Extensions
        │  ○ Add Extension
        └
        ```

        5. 选择 `Ollama` 作为模型提供商

        ```
        ┌   goose-configure
        │
        ◇  What would you like to configure?
        │  Configure Providers
        │
        ◆  Which model provider should we use?
        │  ○ Anthropic
        │  ○ Databricks
        │  ○ Google Gemini
        │  ○ Groq
        │  ● Ollama (Local open source models)
        │  ○ OpenAI
        │  ○ OpenRouter
        └
        ```

        6. 输入模型运行所在的主机

        ```
        ┌   goose-configure
        │
        ◇  What would you like to configure?
        │  Configure Providers
        │
        ◇  Which model provider should we use?
        │  Ollama
        │
        ◆  Provider Ollama requires OLLAMA_HOST, please enter a value
        │  http://localhost:11434
        └
        ```

        7. 输入上面安装的模型

        ```
        ┌   goose-configure
        │
        ◇  What would you like to configure?
        │  Configure Providers
        │
        ◇  Which model provider should we use?
        │  Ollama
        │
        ◇   Provider Ollama requires OLLAMA_HOST, please enter a value
        │  http://localhost:11434
        │
        ◇  Enter a model from that provider:
        │  michaelneale/deepseek-r1-goose
        │
        ◇  Welcome! You're all set to explore and utilize my capabilities. Let's get started on solving your problems together!
        │
        └  Configuration saved successfully
        ```
      </TabItem>
      <TabItem value="others" label="Other Models" default>
        1. [下载 Ollama](https://ollama.com/download)。
        2. 在终端中运行任何[支持工具调用的模型](https://ollama.com/search?c=tools)

          示例：

          ```sh
          ollama run qwen2.5
          ```

        3. 在另一个终端窗口中用 goose 配置：

          ```sh
          goose configure
          ```

        4. 选择 `Configure Providers`

        ```
        ┌   goose-configure
        │
        ◆  What would you like to configure?
        │  ● Configure Providers (Change provider or update credentials)
        │  ○ Toggle Extensions
        │  ○ Add Extension
        └
        ```

        5. 选择 `Ollama` 作为模型提供商

        ```
        ┌   goose-configure
        │
        ◇  What would you like to configure?
        │  Configure Providers
        │
        ◆  Which model provider should we use?
        │  ○ Anthropic
        │  ○ Databricks
        │  ○ Google Gemini
        │  ○ Groq
        │  ● Ollama (Local open source models)
        │  ○ OpenAI
        │  ○ OpenRouter
        └
        ```

        6. 输入模型运行所在的主机

        :::info 端点
        对于 Ollama，如果你不提供主机，我们会把它设为 `localhost:11434`。
        构造 URL 时，如果方案不是 `http` 或 `https`，我们会在前面加上 `http://`。
        如果你在另一台服务器上运行 Ollama，必须设置 `OLLAMA_HOST=http://{host}:{port}`。
        对于 ollama.com 上的托管模型，请改用 **Ollama Cloud** 提供商。
        :::

        ```
        ┌   goose-configure
        │
        ◇  What would you like to configure?
        │  Configure Providers
        │
        ◇  Which model provider should we use?
        │  Ollama
        │
        ◆  Provider Ollama requires OLLAMA_HOST, please enter a value
        │  http://localhost:11434
        └
        ```


        7. 输入正在运行的模型

        ```
        ┌   goose-configure
        │
        ◇  What would you like to configure?
        │  Configure Providers
        │
        ◇  Which model provider should we use?
        │  Ollama
        │
        ◇  Provider Ollama requires OLLAMA_HOST, please enter a value
        │  http://localhost:11434
        │
        ◇  Enter a model from that provider:
        │  qwen2.5
        │
        ◇  Welcome! You're all set to explore and utilize my capabilities. Let's get started on solving your problems together!
        │
        └  Configuration saved successfully
        ```

        :::tip 上下文长度
        如果你注意到 goose 难以使用扩展，或忽略了 [.goosehints](/docs/guides/context-engineering/using-goosehints)，很可能是模型默认的 4096 token 上下文长度太低。把 `OLLAMA_CONTEXT_LENGTH` 环境变量设为[更高的值](https://github.com/ollama/ollama/blob/main/docs/faq.mdx#how-can-i-specify-the-context-window-size)。
        :::

      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="lmstudio" label="LM Studio">
    [LM Studio](https://lmstudio.ai/) 让你用兼容 OpenAI 的 API 服务器在本地运行开源模型。

    1. 下载并安装 LM Studio。
    2. 打开 LM Studio，下载支持工具调用的模型（例如 Qwen、Llama 或 Mistral 变体）。
    3. 在 LM Studio 中启动本地服务器。服务器默认运行在 `http://localhost:1234`

    4. 配置 goose 使用 LM Studio：

    <Tabs groupId="interface">
      <TabItem value="ui" label="goose Desktop" default>
        1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
        2. 在侧边栏中点击 `Settings` 按钮。
        3. 点击 `Models` 选项卡。
        4. 点击 `Configure providers`。
        5. 从提供商列表中选择 `LM Studio` 并点击 `Configure`。
        6. 点击 `Submit`（不需要 API 密钥）。
        7. 选择你在 LM Studio 中已加载的模型。
      </TabItem>
      <TabItem value="cli" label="goose CLI">
        1. 运行：
        ```sh
        goose configure
        ```
        2. 从菜单中选择 `Configure Providers`。
        3. 选择 `LM Studio` 作为提供商。
        4. 输入与 LM Studio 中已加载模型匹配的模型名称。

        ```
        ┌   goose-configure
        │
        ◇  What would you like to configure?
        │  Configure Providers
        │
        ◇  Which model provider should we use?
        │  LM Studio
        │
        ◇  Enter a model from that provider:
        │  qwen2.5-7b-instruct
        │
        └  Configuration saved successfully
        ```
      </TabItem>
    </Tabs>

    :::tip 模型名称
    确保你在 goose 中输入的模型名称与 LM Studio 服务器面板中显示的模型标识符一致。
    :::
  </TabItem>
  <TabItem value="atomic-chat" label="Atomic Chat">
    [Atomic Chat](https://github.com/AtomicBot-ai/Atomic-Chat) 让你用兼容 OpenAI 的 API 服务器在本地运行开源模型。

    1. 从 [atomic.chat](https://atomic.chat/) 或 [GitHub Releases](https://github.com/AtomicBot-ai/Atomic-Chat/releases) 下载并安装 Atomic Chat。
    2. 打开 Atomic Chat，下载支持工具调用的模型（例如 Qwen、Llama 或 Mistral 变体）。
    3. 在 Atomic Chat 中启动本地服务器。服务器默认运行在 `http://localhost:1337`

    4. 配置 goose 使用 Atomic Chat：

    <Tabs groupId="interface">
      <TabItem value="ui" label="goose Desktop" default>
        1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
        2. 在侧边栏中点击 `Settings` 按钮。
        3. 点击 `Models` 选项卡。
        4. 点击 `Configure providers`。
        5. 从提供商列表中选择 `Atomic Chat` 并点击 `Configure`。
        6. 点击 `Submit`（不需要 API 密钥）。
        7. 选择你在 Atomic Chat 中已加载的模型。
      </TabItem>
      <TabItem value="cli" label="goose CLI">
        1. 运行：
        ```sh
        goose configure
        ```
        2. 从菜单中选择 `Configure Providers`。
        3. 选择 `Atomic Chat` 作为提供商。
        4. 输入与 Atomic Chat 中已加载模型匹配的模型名称。

        ```
        ┌   goose-configure
        │
        ◇  What would you like to configure?
        │  Configure Providers
        │
        ◇  Which model provider should we use?
        │  Atomic Chat
        │
        ◇  Enter a model from that provider:
        │  qwen2.5-7b-instruct
        │
        └  Configuration saved successfully
        ```
      </TabItem>
    </Tabs>

    :::tip 模型名称
    确保你在 goose 中输入的模型名称与 Atomic Chat 中为服务器显示的模型标识符一致。如果 API 监听的源不是 `http://localhost:1337`，请在 goose 中设置 `ATOMIC_CHAT_HOST` 以匹配（仅方案、主机和端口）。
    :::
  </TabItem>
  <TabItem value="docker" label="Docker Model Runner" default>
    1. [获取 Docker](https://docs.docker.com/get-started/get-docker/)
    2. [启用 Docker Model Runner](https://docs.docker.com/ai/model-runner/#enable-dmr-in-docker-desktop)
    3. [拉取模型](https://docs.docker.com/ai/model-runner/#pull-a-model)，例如来自 Docker Hub 的 [AI 命名空间](https://hub.docker.com/u/ai)、[Unsloth](https://hub.docker.com/u/unsloth)，或[来自 HuggingFace](https://www.docker.com/blog/docker-model-runner-on-hugging-face/)

    示例：

    ```sh
    docker model pull hf.co/unsloth/gemma-3n-e4b-it-gguf:q6_k
    ```

    4. 配置 goose 使用 Docker Model Runner，采用兼容 OpenAI API 的端点：

    ```sh
    goose configure
    ```

    5. 选择 `Configure Providers`

    ```
    ┌   goose-configure
    │
    ◆  What would you like to configure?
    │  ● Configure Providers (Change provider or update credentials)
    │  ○ Toggle Extensions
    │  ○ Add Extension
    └
    ```

    6. 选择 `OpenAI` 作为模型提供商：

    ```
    ┌   goose-configure
    │
    ◇  What would you like to configure?
    │  Configure Providers
    │
    ◆  Which model provider should we use?
    │  ○ Anthropic
    │  ○ Amazon Bedrock
    │  ○ Claude Code
    │  ● OpenAI (GPT-4 and other OpenAI models, including OpenAI compatible ones)
    │  ○ OpenRouter
    ```

    7. 把 Docker Model Runner 端点配置为 `OPENAI_HOST`：

    ```
    ┌   goose-configure
    │
    ◇  What would you like to configure?
    │  Configure Providers
    │
    ◇  Which model provider should we use?
    │  OpenAI
    │
    ◆  Provider OpenAI requires OPENAI_HOST, please enter a value
    │  https://api.openai.com (default)
    └
    ```

    Docker Model Runner 主机侧端口的默认值是 12434，因此 `OPENAI_HOST` 的值可以是：
    `http://localhost:12434`。

    8. 配置基路径：

    ```
    ◆  Provider OpenAI requires OPENAI_BASE_PATH, please enter a value
    │  v1/chat/completions (default)
    └
    ```

    Docker Model Runner 的基路径使用 `/engines/llama.cpp/v1/chat/completions`。

    9. 最后配置 goose 要使用的、Docker Model Runner 中可用的模型：`hf.co/unsloth/gemma-3n-e4b-it-gguf:q6_k`

    ```
    │
    ◇  Enter a model from that provider:
    │  gpt-4o
    │
    ◒  Checking your configuration...
    └  Configuration saved successfully
    ```
  </TabItem>
</Tabs>



## OpenRouter 高级参数

OpenRouter 接受提供商特定的请求参数，例如 `verbosity`、`reasoning`、`plugins`、`require_parameters` 以及其他受支持的字段。在 `config.yaml` 中设置 `OPENROUTER_PARAMETERS`，以便把这些字段加入每一个 OpenRouter chat completion 请求。

你可以使用 YAML 对象：

```yaml
OPENROUTER_PARAMETERS:
  verbosity: xhigh
  reasoning:
    effort: high
  plugins:
    - id: web
```

或 JSON 字符串：

```yaml
OPENROUTER_PARAMETERS: '{"verbosity":"xhigh","plugins":[{"id":"web"}]}'
```

goose 会忽略它已经管理的保留请求字段，例如 `model`、`messages`、`stream` 和 `stream_options`。其他 OpenRouter 特定的顶层字段会通过共享的、兼容 OpenAI 的请求参数处理传递。

## GitHub Copilot 身份验证

GitHub Copilot 使用设备流进行身份验证，因此不需要 API 密钥：

1. 运行 [`goose configure`](#configure-provider-and-model) 并选择 **GitHub Copilot**
2. 一个八字符代码会自动复制到剪贴板
3. 浏览器会打开 GitHub 的设备激活页面
4. 粘贴代码以授权应用
5. 回到 goose 后，GitHub Copilot 会作为提供商在 CLI 和桌面版中都可用。

## Azure OpenAI 身份验证

goose 支持三种 Azure OpenAI 身份验证方法：

1. **Entra ID Bearer 令牌** - 使用来自 `AZURE_OPENAI_AD_TOKEN` 的预先获取的 Microsoft Entra 访问令牌，以 `Authorization: Bearer <token>` 发送。goose 完全跳过 Azure CLI 和令牌获取，这适合只向运行时暴露短生命周期令牌的企业部署（例如通过 `az account get-access-token --resource https://cognitiveservices.azure.com --query accessToken --output tsv` 获取）
2. **API 密钥认证** - 使用 `AZURE_OPENAI_API_KEY` 直接认证
3. **Azure 凭据链** - 自动使用 Azure CLI 凭据，不需要 API 密钥

当配置了不止一种时，`AZURE_OPENAI_AD_TOKEN` 优先于 `AZURE_OPENAI_API_KEY`，后者又优先于凭据链。

要使用 Azure 凭据链：
- 确保你已用 `az login` 登录
- 对 Azure OpenAI 服务具有适当的 Azure 角色分配
- 用 `goose configure` 配置并选择 Azure OpenAI，把 API 密钥字段留空

此方法简化了身份验证，并增强企业环境的安全性。

## 多模型配置

除了单模型设置，goose 还支持[多模型配置](/docs/guides/multi-model/)，可以为专门任务使用不同的模型和提供商：

- **子代理** - 把范围明确的任务委派给隔离会话，让主要工作流保持聚焦和高效

## Meta Muse Spark 推理强度

Meta 的 Muse Spark 模型支持可配置的推理强度，映射到 Meta 的 `reasoning_effort` 请求参数：
- **低** - 更快的响应，较轻的推理
- **中** - 推理深度与延迟的平衡
- **高** - 更深的推理，更高的延迟
- **最大** - 以 `xhigh` 发送，这是 Meta 支持的最深推理级别

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    选择 Muse Spark 模型时，会自动出现 “Thinking Effort” 下拉菜单。选择你的偏好，该设置会在会话之间保留。
  </TabItem>

  <TabItem value="cli" label="goose CLI">
    运行 `goose configure` 并选择 Muse Spark 模型时，系统会提示你选择思考强度：

    ```
    ◆  Select thinking effort:
    │  ● Off - No extended thinking
    │  ○ Low - Better latency, lighter reasoning
    │  ○ Medium - Moderate thinking
    │  ○ High - Deep reasoning
    │  ○ Max - No constraints on thinking depth
    ```

    你也可以用 `GOOSE_THINKING_EFFORT` 环境变量全局设置（`off`、`low`、`medium`、`high` 或 `max`）。
  </TabItem>
</Tabs>

:::note
Muse Spark 始终进行推理，无法关闭，因此选择 `off` 会被钳制为 `low`（Meta 支持的最轻级别），而不是省略 `reasoning_effort` 参数。
:::

## Gemini 3 思考级别

Gemini 3 模型支持可配置的思考级别，以平衡响应延迟和推理深度：
- **低**（默认）- 更快的响应，较轻的推理
- **高** - 更深的推理，更高的延迟

:::tip
启用思考后，你可以查看模型的推理过程。细节见[查看模型推理](#viewing-model-reasoning)。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    选择 Gemini 3 模型时，会自动出现 “Thinking Level” 下拉菜单。选择你的偏好，该设置会在会话之间保留。
  </TabItem>

  <TabItem value="cli" label="goose CLI">
    **交互式配置：**

    运行 `goose configure` 并选择 Gemini 3 模型时，系统会提示你选择思考级别：

    ```
    ◆  Select thinking level for Gemini 3:
    │  ● Low - Better latency, lighter reasoning
    │  ○ High - Deeper reasoning, higher latency
    ```
  </TabItem>
</Tabs>

:::info 优先级顺序
思考级别按以下顺序决定（从高到低）：
1. 模型配置中的 `request_params.thinking_level`
2. `GEMINI3_THINKING_LEVEL` 环境变量
3. 默认值：`low`
:::

## 查看模型推理

有些模型会把内部推理或“思维链”作为响应的一部分暴露出来。goose 会自动捕获这些推理输出并提供给你。以下模型和提供商支持推理输出：

| 提供商 / 模型 | 工作方式 |
|---|---|
| **DeepSeek-R1**（经由 OpenAI、Ollama、OpenRouter、OVHcloud 等） | 从 API 响应的 `reasoning_content` 字段捕获推理 |
| **Kimi**（经由 Groq 或其他兼容 OpenAI 的端点） | 从 API 响应的 `reasoning_content` 字段捕获推理 |
| **Gemini CLI**（启用了思考的 Google Gemini 模型） | 从流式响应中捕获思考块 |
| **Claude**（Anthropic，已启用 [Claude 思考](/docs/guides/environment-variables#claude-thinking-configuration)） | 从 API 响应中捕获思考块 |

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    推理输出会自动出现在模型回复上方可折叠的 **“Show reasoning”** 开关中。点击它即可展开并查看模型的思考过程。
  </TabItem>

  <TabItem value="cli" label="goose CLI">
    推理输出在 CLI 中**默认隐藏**。要显示它，设置 `GOOSE_CLI_SHOW_THINKING` 环境变量：

    ```bash
    export GOOSE_CLI_SHOW_THINKING=1
    ```

    启用后，推理会出现在模型主要回复之前、标题为 “Thinking:” 的淡色文本中。

    :::note
    这要求标准输出是终端（把输出通过管道送到文件或其他命令时，不会出现推理输出）。
    :::
  </TabItem>
</Tabs>

:::tip
推理输出有助于理解模型如何得出答案、调试意外行为，或学习模型的解题方式。不过它也可能很冗长——只在需要时打开。
:::

---

如果你有任何问题，或需要某个提供商的帮助，欢迎在 [Discord](https://discord.gg/n8R5VaWDAn) 或 [goose 仓库](https://github.com/aaif-goose/goose)上联系我们。


[providers]: /docs/getting-started/providers
[function-calling-leaderboard]: https://gorilla.cs.berkeley.edu/leaderboard.html

