---
title: Spraay x402 扩展
description: 将 Spraay x402 MCP Server 添加为 goose 扩展，用于批量加密货币支付、链上数据和 AI 模型访问
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

本教程介绍如何把 [Spraay x402 MCP Server](https://github.com/plagtech/spraay-x402-mcp) 添加为 goose 扩展，以便在 Base 上进行批量加密货币支付、查询链上数据并访问 AI 模型。

有了 Spraay 扩展，goose 可以在**单笔交易中向最多 200 个收款人**发送 ETH 和 ERC-20 代币，查询实时代币价格，检查钱包余额，解析 ENS 名称，获取兑换报价，并与 200 多个 AI 模型对话——全部通过 [x402 协议](https://x402.org)按次付费。

## 支持的工具

Spraay x402 MCP Server 提供以下工具：

| 工具 | 费用 | 说明 |
|------|------|-------------|
| `spraay_chat` | $0.005 | 通过 200 多个模型进行 AI 对话（GPT-4、Claude、Llama、Gemini） |
| `spraay_models` | $0.001 | 列出可用的 AI 模型及其定价 |
| `spraay_batch_execute` | $0.01 | 向多个收款人批量支付 USDC |
| `spraay_batch_estimate` | $0.001 | 估算批量支付的 gas |
| `spraay_swap_quote` | $0.002 | Base 上的 Uniswap V3 兑换报价 |
| `spraay_tokens` | $0.001 | 列出 Base 上支持的代币 |
| `spraay_prices` | $0.002 | 实时链上代币价格（Uniswap V3） |
| `spraay_balances` | $0.002 | 任意地址的 ETH + ERC-20 余额 |
| `spraay_resolve` | $0.001 | 把 ENS 名称和 Basenames 解析为地址 |

:::info
AI 智能体通过 x402 协议按请求用 USDC 付费。不需要 API 密钥或账号——只要有一个在 Base 上持有 USDC 的钱包。
:::

## 设置

### 前提条件

- 已安装 Git 和 Node.js
- 一个在 Base 上持有 USDC 的钱包私钥（用于 x402 微支付）

### 安装 MCP 服务器

```bash
git clone https://github.com/plagtech/spraay-x402-mcp.git
cd spraay-x402-mcp
npm install
npm run build
```

### 配置

<Tabs>
<TabItem value="ui" label="goose 桌面版">

1. 点击侧边栏中的 **Extensions** 图标
2. 点击 **Add custom extension**
3. 选择 **Command-line Extension**
4. 填写以下内容：
   - **Name**：`spraay`
   - **Command**：`node /absolute/path/to/spraay-x402-mcp/dist/index.js`
   - **Timeout**：`300`
5. 添加环境变量：
   - **Name**：`EVM_PRIVATE_KEY`
   - **Value**：你的钱包私钥（在 Base 上持有 USDC）

</TabItem>
<TabItem value="cli" label="goose CLI">

```
goose configure
```

选择 **Add Extension** → **Command-line Extension** 并配置：

```
┌   goose-configure
│
│   ◇  What would you like to call this extension?
│   spraay
│
│   ◇  What command should be run?
│   node /absolute/path/to/spraay-x402-mcp/dist/index.js
│
│   ◇  Please set the timeout for this tool (in secs):
│   300
│
│   ◇  Would you like to add environment variables?
│   Yes
│
│   ◇  Environment variable name:
│   EVM_PRIVATE_KEY
│
│   ◇  Environment variable value:
│   ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
│
│   └  Added spraay extension
```

</TabItem>
</Tabs>

## 使用示例

### 查询代币价格

```
What's the current price of ETH on Base?
```

goose 会使用 `spraay_prices` 工具从 Uniswap V3 获取实时链上价格。

### 查询钱包余额

```
Check the USDC balance of vitalik.eth
```

goose 会使用 `spraay_resolve` 解析 ENS 名称，然后用 `spraay_balances` 获取余额。

### 获取兑换报价

```
Get me a swap quote for 100 USDC to WETH on Base
```

goose 会使用 `spraay_swap_quote` 从 Uniswap V3 获取实时报价。

### 批量发送 USDC

```
Send 10 USDC each to these wallets:
0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18
0x53d284357ec70cE289D6D64134DfAc8E511c8a3D
0xFBb1b73C4f0BDa4f67dcA266ce6Ef42f520fBB98
```

goose 会使用 `spraay_batch_execute` 在单笔交易中处理所有付款。

### 与 AI 模型对话

```
Using spraay, ask GPT-4 to explain what x402 is
```

goose 会使用 `spraay_chat` 从 200 多个可用 AI 模型中查询。

## 工作原理

1. 你向 goose 提问 → goose 调用一个 Spraay 工具（例如 `spraay_prices`）
2. MCP 服务器向 `gateway.spraay.app` 发送请求
3. 网关返回 HTTP 402 和付款要求
4. x402 客户端在 Base 上自动签署 USDC 付款
5. 网关验证付款并返回数据

每次调用花费 0.001–0.01 美元的 USDC。无需 API 密钥，也无需账号。

## 资源

- [Spraay App](https://spraay.app) — 多链批量支付（10 条链）
- [Spraay x402 Gateway](https://gateway.spraay.app) — AI 智能体支付网关
- [GitHub](https://github.com/plagtech/spraay-x402-mcp) — MCP 服务器源码
- [x402 协议](https://x402.org) — 支付标准
- [BaseScan 上的智能合约](https://basescan.org/address/0x1646452F98E36A3c9Cfc3eDD8868221E207B5eEC)
