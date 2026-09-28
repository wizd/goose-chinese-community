---
title: Nostrbook 扩展
description: 把 Nostrbook MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';


本教程介绍如何把 [Nostrbook MCP 服务器](https://gitlab.com/soapbox-pub/nostrbook) 添加为 goose 扩展，以便访问一套完整的 Nostr 文档登记库。它帮助用户理解这个去中心化社交协议、实现方式和技术规范。


:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=%40nostrbook%2Fmcp%40latest&id=nostrbook-mcp&name=NostrBook&description=A%20comprehensive%20registry%20of%20Nostr%20documentation%20with%20structured%20knowledge)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    **命令**
    ```sh
    npx -y @nostrbook/mcp@latest
    ```
  </TabItem>
</Tabs>
:::

## 配置

:::info
运行此命令需要系统已安装 [Node.js](https://nodejs.org/)，因为会用到 `npx`。
:::


<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="nostrbook-mcp"
    extensionName="Nostrbook"
    description="A comprehensive registry of Nostr documentation with structured knowledge"
    command="npx"
    args={["-y", "@nostrbook/mcp@latest"]}
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Nostrbook"
      description="A comprehensive registry of Nostr documentation with structured knowledge"
      command="npx -y @nostrbook/mcp@latest"
    />
  </TabItem>
</Tabs>

## 使用示例

### goose 提示词

> _goose，什么是 NIP-61，我该如何实现它？_


### goose 输出

注意：示例中的 ID 已替换为通用占位符。

:::note 命令行

<details>
    <summary>工具调用</summary>

    ─── read_nip | nostrbook ──────────────────────────

    nip: 61

</details>


# NIP-61：实现 Nutzaps

NIP-61 定义了「Nutzaps」，即 P2PK Cashu 代币，支付本身就是收据。该协议允许通过 Nostr 生态，用 Cashu 代币进行比特币小额支付。

## 核心概念

Nutzaps 让用户通过 Nostr 事件互相发送小额比特币支付，代币锁定到接收方指定的公钥。

## 实现指南

### 前置条件

1. 熟悉 [Cashu](https://cashu.space/) 和 [P2PK 代币锁定](https://github.com/cashubtc/nuts/blob/main/11.md)
2. 理解 [NIP-60](https://github.com/nostr-protocol/nips/blob/master/60.md) 的钱包功能
3. 确保实现支持 NUT-11（P2PK）和 NUT-12（DLEQ 证明）

### 第 1 步：设置接收方信息（用于接收 Nutzaps）

创建并发布一个 `kind:10019` 事件，告诉别人如何给你打款：

```json
{
    "kind": 10019,
    "tags": [
        ["relay", "wss://your-relay1.com"],
        ["relay", "wss://your-relay2.com"],
        ["mint", "https://your-trusted-mint.com", "sat"],
        ["pubkey", "<your-p2pk-pubkey>"]
    ]
}
```

- `pubkey` 应是专用公钥（不要用你的 Nostr 身份密钥）
- 把对应的私钥安全地存放在 NIP-60 钱包事件中
- 只列出你信任并会监控的 mint

### 第 2 步：构建发送方功能

要实现 nutzap：

1. **查询接收方信息**：
   ```javascript
   // Fetch recipient's kind:10019 event
   const recipientInfo = await relay.get({
     kinds: [10019],
     authors: [recipientPubkey]
   });
   ```

2. **提取 mint 和 P2PK 信息**：
   ```javascript
   const recipientMints = recipientInfo.tags
     .filter(tag => tag[0] === 'mint')
     .map(tag => tag[1]);
   
   const recipientLockKey = recipientInfo.tags
     .find(tag => tag[0] === 'pubkey')?.[1];
   ```

3. **铸造或兑换代币**：在接收方信任的某个 mint 上操作，并用 P2PK 锁定到对方指定的密钥

4. **发布 nutzap 事件**：
   ```json
   {
       "kind": 9321,
       "content": "Thanks for your post!",
       "tags": [
           ["proof", "{\"amount\":1,\"C\":\"02...3f\",\"id\":\"000...\",\"secret\":\"[\\\"P2PK\\\",...]\"}"],
           ["u", "https://recipient-specified-mint.com"],
           ["e", "<event-being-zapped>", "<relay-hint>"],
           ["p", "<recipient-pubkey>"]
       ]
   }
   ```

### 第 3 步：构建接收方功能

要实现接收 nutzap：

1. **查询收到的 nutzap**：
   ```javascript
   // Subscribe to nutzap events
   relay.subscribe([
     {
       kinds: [9321],
       "#p": [myPubkey],
       "#u": myTrustedMints,
       since: lastCheckTimestamp
     }
   ]);
   ```

2. **校验收到的 nutzap**：
   - 确认代币来自你指定的 mint
   - 确认代币锁定到你的 P2PK 密钥
   - 校验 DLEQ 证明

3. **赎回代币**：
   - 把 P2PK 代币兑换进你的钱包
   - 创建 `kind:7376` 事件记录赎回：
   ```json
   {
       "kind": 7376,
       "content": "<encrypted-content>", 
       "tags": [
           ["e", "<nutzap-event-id>", "", "redeemed"],
           ["p", "<sender-pubkey>"]
       ]
   }
   ```

### 重要实现细节

1. **P2PK 密钥前缀**：始终给 P2PK 锁定公钥加上 "02" 前缀，以保证兼容
2. **代币校验**：在本地实现 DLEQ 证明校验
3. **Mint URL 规范化**：规范化 mint URL，避免细微 URL 差异带来的问题
4. **用户引导**：引导用户只使用兼容 NUT-11 和 NUT-12 的 mint
5. **发布位置**：把 nutzap 事件发布到接收方指定的 relay

## 测试

测试实现时：
1. 用小额创建测试 nutzap
2. 确认代币赎回正确
3. 检查赎回记录是否正确创建
4. 用多个 mint 测试兼容性

## 安全注意事项

- 不要用用户的主 Nostr 密钥做 P2PK 操作
- 确保敏感钱包数据得到正确加密
- 尝试赎回代币之前校验所有证明
- 只与明确信任的 mint 交互

按这些步骤，你可以实现完整的 nutzap 方案，让用户通过 Nostr 协议用 Cashu 代币收发比特币小额支付。

:::
