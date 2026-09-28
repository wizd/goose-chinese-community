---
title: Ophis 扩展
description: 把 Ophis 添加为 goose 扩展，用自然语言意图兑换代币
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';

本教程介绍如何把 [Ophis](https://ophis.fi) 添加为 goose 扩展，让 goose 把自然语言兑换请求变成可在支持的链上执行的订单。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    [启动安装程序](goose://extension?type=streamable_http&url=https%3A%2F%2Fmcp.ophis.fi%2Fmcp&id=ophis&name=Ophis&description=Natural-language%20intent%20DEX%20aggregator%20with%20a%20keyless%20MCP%20server%20for%20AI%20agents)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    使用 `goose configure` 添加 `Remote Extension (Streamable HTTP)` 类型的扩展，并填写：

    **端点 URL**
    ```
    https://mcp.ophis.fi/mcp
    ```
  </TabItem>
</Tabs>
:::

## Ophis 是什么？

Ophis 是一个基于意图的 DEX 聚合器，带有自然语言层，以及面向 AI 智能体的无密钥 MCP 服务器。它非托管、免 gas、有 MEV 保护，并把兑换盈余返还给交易者。Ophis 是 CoW Protocol 的一个分叉。它在 Optimism 和 Unichain 上部署了自己的结算合约，并在其他支持的链上通过 CoW Protocol 路由：Ethereum、Base、Arbitrum、Polygon、BNB Chain、Gnosis、Avalanche、Linea、Plasma 和 Ink。

MCP 服务器无密钥，不需要 API 密钥或环境变量。它提供十四个工具：`parse_intent`、`resolve_token`、`list_chains`、`get_quote`、`expected_surplus`、`build_order`、`validate_order`、`submit_order`、`lookup_tier`、`get_integrator_earnings`、`get_balances`、`get_portfolio`、`get_gas` 和 `get_token_chart`。交易由用户自己的钱包签名，因此服务器从不持有密钥或资金。

## 配置

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="ophis"
      extensionName="Ophis"
      description="Natural-language intent DEX aggregator with a keyless MCP server for AI agents"
      type="http"
      url="https://mcp.ophis.fi/mcp"
    />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Ophis"
      description="Natural-language intent DEX aggregator with a keyless MCP server for AI agents"
      type="http"
      url="https://mcp.ophis.fi/mcp"
    />
  </TabItem>
</Tabs>

## 使用示例

配置好 Ophis 之后，可以用自然语言描述一笔兑换，并让 goose 准备订单。例如：

**解析意图**
```
解析这个兑换意图：「在 Base 上把 100 USDC 换成 ETH」。
```

**获取报价**
```
获取在 Arbitrum 上把 0.5 WETH 换成 USDC 的报价。
```

**列出支持的链**
```
Ophis 支持哪些链？
```

服务器会返回报价和未签名订单。实际交易由你自己的钱包签名，密钥和资金不会交给扩展。

## 资源

- 网站：[ophis.fi](https://ophis.fi)
- 应用：[swap.ophis.fi](https://swap.ophis.fi)
- 文档：[docs.ophis.fi](https://docs.ophis.fi)
- 面向具备 shell 能力的智能体的技能：[ophis.fi/.well-known/agent-skills](https://ophis.fi/.well-known/agent-skills/index.json)
- 源码：[github.com/ophis-fi/ophis](https://github.com/ophis-fi/ophis)
