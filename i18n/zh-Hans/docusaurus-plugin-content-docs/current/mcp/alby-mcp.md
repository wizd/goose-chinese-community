---
title: Alby Bitcoin Payments 扩展

description: 将 goose 连接到你的 Bitcoin Lightning 钱包
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import { PanelLeft } from 'lucide-react';




本教程介绍如何将 [Alby Bitcoin Payments MCP 服务器](https://github.com/getalby/mcp) 添加为 goose 扩展，以便与 Lightning 钱包交互、收付款、列出交易、把法币金额换算为 sats、向 Lightning 地址请求发票，以及与付费 MCP 工具交互（例如用 [PaidMCP](https://github.com/getAlby/paidmcp) 构建的工具）。

:::info
你需要一个支持 [NWC](https://nwc.dev) 的 Lightning 钱包。如果还没有，可以试试 [Alby Hub](https://albyhub.com)。
:::

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=%40getalby%2Fmcp&id=alby-mcp&name=Alby&description=Connect%20goose%20to%20your%20Bitcoin%20Lightning%20Wallet&env=NWC_CONNECTION_STRING%3DNWC%20Connection%20Secret)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y @getalby/mcp
  ```
  </TabItem>
</Tabs>
  **环境变量**
  ```
  NWC_CONNECTION_STRING: nostr+walletconnect://...
  ```
:::

## 配置

:::info
运行此命令需要在系统上安装 [Node.js](https://nodejs.org/)，因为它使用 `npx`。

**或者**你可以使用 Alby 托管的 MCP（见下方远程选项）。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <Tabs>
      <TabItem value="local" label="本地" default>
        <GooseDesktopInstaller
          extensionId="alby-mcp"
          extensionName="Alby"
          description="将 goose 连接到你的 Bitcoin Lightning 钱包"
          command="npx"
          args={["-y", "@getalby/mcp"]}
          envVars={[
            { name: "NWC_CONNECTION_STRING", label: "NWC Connection Secret" }
          ]}
          customStep3="从你的 Lightning 钱包获取 NWC 连接密钥（nostr+walletconnect://...），并粘贴到 “NWC Connection Secret” 字段"
        />
      </TabItem>
      <TabItem value="remote" label="远程">
          <GooseDesktopInstaller
            extensionId="alby-remote"
            extensionName="Alby"
            description="将 goose 连接到你的 Bitcoin Lightning 钱包"
            type="http"
            url="https://mcp.getalby.com/mcp"
            envVars={[
              { name: "Authorization", label: "Bearer YOUR_NWC_CONNECTION_STRING" }
            ]}
            apiKeyLink="https://nwc.dev"
            apiKeyLinkText="NWC connection secret"
            customStep3="从你的 Lightning 钱包获取 NWC 连接密钥，并将其作为 Bearer 令牌粘贴（Bearer nostr+walletconnect://...）"
          />
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <Tabs>
      <TabItem value="local" label="本地" default>
        <CLIExtensionInstructions
          name="Alby"
          description="将 goose 连接到你的 Bitcoin Lightning 钱包"
          command="npx -y @getalby/mcp"
          envVars={[
            { key: "NWC_CONNECTION_STRING", value: "▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪" }
          ]}
          infoNote={
            <>
              从你的 Lightning 钱包获取 NWC 连接密钥（<code>nostr+walletconnect://...</code>）并粘贴到此处。
            </>
          }
        />
      </TabItem>
      <TabItem value="remote" label="远程">
        <CLIExtensionInstructions
          name="Alby"
          description="将 goose 连接到你的 Bitcoin Lightning 钱包"
          type="http"
          url="https://mcp.getalby.com/mcp"
          envVars={[
            { key: "Authorization", value: "Bearer nostr+walletconnect://..." }
          ]}
          infoNote={
            <>
              从你的 Lightning 钱包获取 NWC 连接密钥，并将其作为 <code>Bearer</code> 令牌粘贴。
            </>
          }
        />
      </TabItem>  
    </Tabs>
  </TabItem>
</Tabs>

## 使用示例

:::tip Memory 扩展
使用内置的 memory 扩展保存联系人。例如：“我朋友 Rene 的 Lightning 地址是 reneaaron@getalby.com。请把它保存到你的记忆里。”
:::

### goose 提示词

> _向 Rene 支付 1 美元，附言 “Hi Rene, it's Roland. I'm making a goose tutorial!”_

### goose 输出

:::note CLI

<details>
    <summary>工具调用</summary>

    ─── fiat_to_sats | alby ──────────────────────────

    fiat_amount: 1

    fiat_currency: USD



    ─── request_invoice | alby ──────────────────────────

    amount_in_sats: 935

    description: ...

    lightning_address: reneaaron@getalby.com



    ─── pay_invoice | alby ──────────────────────────

    invoice: ...



</details>


✅ **支付成功！**

我已成功向 Rene 的 `reneaaron@getalby.com` 发送 1 美元（935 sats），附言为：“Hi Rene, it's Roland. I'm making a goose tutorial!”

**交易详情：**
- 金额：935 sats（1 美元）
- 手续费：3 sats
- 总花费：938 sats
- 附言：“Hi Rene, it's Roland. I'm making a goose tutorial!”
- 支付哈希：`cd30642470d81c2e8eb04c9ac95e679c53778537aecdf5554b15288ac42fe129`

Rene 会收到确认消息 “Thanks, sats received!”。
:::
