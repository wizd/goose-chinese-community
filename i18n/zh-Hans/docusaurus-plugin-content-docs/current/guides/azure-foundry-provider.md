---
title: Azure AI Foundry
description: 使用 Azure AI Foundry 项目中的 OpenAI、Anthropic 和合作伙伴模型部署
---

# Azure AI Foundry

`azure_foundry` 提供商把 goose 连接到 Azure AI Foundry 部署。它支持两种端点类型：

| 端点 | 推理接口 |
|---|---|
| Foundry 项目：`https://<resource>.services.ai.azure.com/api/projects/<project>` | 部署发现，加上按发布者路由 |
| Foundry 资源：`https://<resource>.services.ai.azure.com` | OpenAI 模型走 Responses，Claude 走 Anthropic Messages，合作伙伴模型走 Chat Completions |
| MaaS/无服务器：`https://<deployment>.<region>.models.ai.azure.com` | 绑定到该端点的模型使用 Chat Completions |

对于项目端点，goose 通过 `GET /deployments` 发现部署。部署名称可以自定义；goose 使用返回的 `modelPublisher` 选择协议，使用 `modelName` 解析模型元数据，例如上下文窗口。

资源端点不提供项目部署发现。goose 按模型族路由可识别的模型或部署名称：`gpt-5*` 和支持的 o 系列模型使用 Responses，`claude-*` 使用 Anthropic Messages，其他名称使用 Chat Completions。当别名无法标识其底层模型族时，请使用项目端点。

## 配置

| 变量 | 是否必需 | 说明 |
|---|---:|---|
| `AZURE_FOUNDRY_ENDPOINT` | 是 | 完整的 Foundry 项目或 MaaS 端点 |
| `AZURE_FOUNDRY_API_KEY` | 否 | API 密钥；省略则使用 Azure CLI 凭据 |
| `AZURE_FOUNDRY_MODEL` | 仅 MaaS | 绑定到所配置 MaaS 端点的模型 |
| `AZURE_FOUNDRY_AD_TOKEN` | 否 | 预先获取的 Microsoft Entra 访问令牌；优先于 API 密钥 |
| `AZURE_FOUNDRY_API_VERSION` | 否 | 部署发现 API 版本；项目端点默认为 `v1` |

运行 `goose configure`，选择 **Configure Providers**，然后选择 **Azure AI Foundry**。也可以在启动 goose 之前设置这些变量：

```sh
export AZURE_FOUNDRY_ENDPOINT="https://my-resource.services.ai.azure.com/api/projects/my-project"
export AZURE_FOUNDRY_API_KEY="<key>"
goose session
```

对于 MaaS 端点：

```sh
export AZURE_FOUNDRY_ENDPOINT="https://my-deployment.eastus.models.ai.azure.com"
export AZURE_FOUNDRY_API_KEY="<key>"
export AZURE_FOUNDRY_MODEL="<model-bound-to-this-endpoint>"
goose session
```

MaaS 端点只暴露一个已部署的模型。这些端点必须设置 `AZURE_FOUNDRY_MODEL`。

## 身份验证

按以下顺序选择身份验证：

1. `AZURE_FOUNDRY_AD_TOKEN`
2. `AZURE_FOUNDRY_API_KEY`
3. Azure CLI 凭据

当既未配置令牌也未配置密钥时，请在启动 goose 之前用 Azure CLI 登录：

```sh
az login
```

项目和资源端点为 `https://ai.azure.com` 请求令牌。MaaS 端点为 `https://ml.azure.com` 请求令牌。

## 协议路由

对于项目端点，goose 使用 Azure 返回的元数据为每个部署选择路由：

- 发布者为 `OpenAI` 且模型兼容 Responses（`gpt-5*` 和支持的 o 系列）→ `/openai/v1/responses`
- 发布者为 `Anthropic` → `/anthropic/v1/messages`
- 较旧的 OpenAI 模型以及所有其他发布者 → `/openai/v1/chat/completions`

如果部署发现暂时不可用，可识别的、兼容 Responses 的 OpenAI 名称和 `claude-*` 名称会使用各自的原生接口。其他名称使用 Chat Completions。

资源端点使用相同的推理接口，但没有部署发现：可识别的模型族名称会选择原生协议。这样，自定义代理的 `model:` 声明可以选择诸如 `gpt-5.6-sol` 的部署，而不必通过规范模型解析重写名称。

MaaS 端点始终使用 `/v1/chat/completions` 以及由 `AZURE_FOUNDRY_MODEL` 配置的模型。

## 模型元数据与定价

部署 API 提供部署名称以及底层的 `modelName`、`modelVersion` 和 `modelPublisher`。goose 使用底层模型名称在其捆绑的模型目录中查找上下文窗口。显式的 `GOOSE_CONTEXT_LIMIT` 或会话覆盖仍然优先。

Azure 定价取决于区域、SKU、优惠、部署类型和合同。部署 API 不提供可靠的每 token 价格，因此该提供商不会为发现的部署附加价格。

## 故障排除

### 401 或 403

- 确认密钥属于所配置的端点。
- 对于 Entra 身份验证，再次运行 `az login`，并确认你的身份可以访问该 Foundry 项目。
- 不要把项目端点的密钥用于 MaaS 端点，反之亦然。

### 没有列出部署

- 确认端点包含 `/api/projects/<project>`。
- 确认项目中包含模型部署。
- 如果项目使用非默认的部署 API 版本，请设置 `AZURE_FOUNDRY_API_VERSION`。

### 自定义部署名称使用了错误的协议

刷新提供商模型列表，以便 goose 能获取 `modelPublisher`。没有部署元数据时，路由只能使用可识别的模型名称前缀。
