---
title: OpenMetadata 扩展
description: 把 OpenMetadata MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

[OpenMetadata MCP 服务器](https://open-metadata.org/mcp) 扩展让 goose 直接与 OpenMetadata 交互，可以操作资产、术语表和血缘。这样就能用自然语言处理存放在 OpenMetadata 里的元数据。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=mcp-remote&arg=http%3A%2F%2Flocalhost%3A8585%2Fmcp&arg=--auth-server-url%3Dhttp%3A%2F%2Flocalhost%3A8585%2Fmcp&arg=--client-id%3Dopenmetadata&arg=--verbose&arg=--clean&arg=--header&arg=Authorization%3A%24%7BAUTH_HEADER%7D&id=openmetadata&name=OpenMetadata&description=Intelligent%20data%20management%20and%20automated%20data%20operations&env=AUTH_HEADER%3DBearer%20YOUR_OPENMETADATA_PAT)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y mcp-remote http://localhost:8585/mcp --auth-server-url=http://localhost:8585/mcp --client-id=openmetadata --verbose --clean --header Authorization:${AUTH_HEADER}
  ```
  </TabItem>
</Tabs>
:::

## 自定义连接 {#customizing-your-connection}

OpenMetadata MCP 服务器通过 OpenMetadata 内置的 MCP 服务器连接到实例。这里用 `http://localhost:8585` 作为访问本地实例的示例，你可以按自己的环境修改。这里的 AUTH_HEADER 是 [OpenMetadata 个人访问令牌（PAT）](https://docs.open-metadata.org/latest/how-to-guides/mcp#adding-a-personal-access-token-to-your-mcp-client)。

## 配置

:::info
运行此命令需要系统已安装 [Node.js](https://nodejs.org/)，因为会用到 `npx`。你还需要一个正在运行的 OpenMetadata 实例，或能访问 [OpenMetadata 沙箱](https://sandbox.open-metadata.org/)。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="openmetadata"
      extensionName="OpenMetadata"
      description="Intelligent data management and automated data operations"
      command="npx"
      args={["-y", "mcp-remote", "http://localhost:8585/mcp", "--auth-server-url=http://localhost:8585/mcp", "--client-id=openmetadata", "--verbose", "--clean", "--header", "Authorization:${AUTH_HEADER}"]}
      envVars={[
        { name: "AUTH_HEADER", label: "Bearer YOUR_OPENMETADATA_PAT" }
      ]}
      apiKeyLink="https://docs.open-metadata.org/latest/how-to-guides/mcp#adding-a-personal-access-token-to-your-mcp-client"
      apiKeyLinkText="OpenMetadata Personal Access Token"
    />
    
    :::info 配置连接字符串
    如有需要，[更新扩展](/docs/getting-started/using-extensions#updating-extension-properties)，使其匹配你的 [OpenMetadata 环境](#customizing-your-connection)。
    :::

  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="OpenMetadata"
      description="Intelligent data management and automated data operations"
      command="npx -y mcp-remote http://localhost:8585/mcp --auth-server-url=http://localhost:8585/mcp --client-id=openmetadata --verbose --clean --header Authorization:${AUTH_HEADER}"
      envVars={[
        { key: "AUTH_HEADER", value: "Bearer YOUR_OPENMETADATA_PAT" }
      ]}
      commandNote={
        <>
          Replace <code>http://localhost:8585/mcp</code> with the actual OpenMetadata instance URL that matches your <a href="#customizing-your-connection">OpenMetadata environment</a>.
        </>
      }
      infoNote={
        <>
          Obtain your <a href="https://docs.open-metadata.org/latest/how-to-guides/mcp#adding-a-personal-access-token-to-your-mcp-client" target="_blank" rel="noopener noreferrer">OpenMetadata Personal Access Token</a> and paste it in as the <code>Bearer</code> token.
        </>
      }
    />
  </TabItem>
</Tabs>

## 可用操作

OpenMetadata 扩展通过自然语言提供完整的元数据管理能力。你可以执行多种操作，包括：

### OpenMetadata 操作
- **search_metadata** 在 OpenMetadata 目录中查找数据资产和业务术语。
- **get_entity_details** 用完全限定名获取某个实体的详细信息。
- **create_glossary** 新建术语表，用来组织业务术语和定义。
- **create_glossary_term** 在已有术语表中新建术语，支持层级关系。
- **get_entity_lineage** 获取任意实体的上下游血缘，用于理解数据依赖和影响分析。

用自然语言描述你想完成的事，goose 会帮你安全、高效地执行相应的 OpenMetadata 操作。

## 使用示例

这个示例里，goose 查看 OpenMetadata 中一张名为 `customers` 的 Redshift 表的元数据，尤其是血缘。如果血缘没有显示一张名为 `customerinfo` 的 Databricks 表被用来构建 `customers`，goose 会把它补上。

#### goose 提示词
```
哪些表被用来创建我在 redshift 里的 customers 表？如果 databricks 表 customerinfo 还没在血缘里，把它加到 customers 表的血缘中。
```

#### goose 输出
```
根据分析，你的 Redshift customers 表位于 `redshift prod.dev.dbt_jaffle.customers`。当前用来创建它的表如下：

##### Redshift Customers 表当前的上游表
###### 直接依赖：
1. `redshift prod.dev.dbt_jaffle.stg_customers`（客户暂存表）
2. `redshift prod.dev.dbt_jaffle.stg_payments`
3. `redshift prod.dev.dbt_jaffle.stg_orders`

######间接依赖（原始表）：
4. `redshift prod.dev.dbt_jaffle.raw_customers` → 流入 `stg_customers`
5. `redshift prod.dev.dbt_jaffle.raw_payments` → 流入 `stg_payments`
6. `redshift prod.dev.dbt_jaffle.raw_orders` → 流入 `stg_orders`

######缺少 Databricks CustomerInfo 表
我找到了你的 Databricks `customerinfo` 表：

`DatabricksBanking.demo.mssqlbanking_customer.customerinfo`
这张表目前没有连到 Redshift customers 表的血缘上。

我已经成功建立了 Databricks customerinfo 表和 Redshift customers 表之间的血缘。完成的内容如下：
######血缘已创建
源表（Databricks）：

名称：`customerinfo`
全名：`DatabricksBanking.demo.mssqlbanking_customer.customerinfo`
平台：Databricks
列：customerid、firstname、lastname、dateofbirth、email、phonenumber、_fivetran_deleted、_fivetran_synced

目标表（Redshift）：

名称：`customers`
全名：`redshift prod.dev.dbt_jaffle.customers`
平台：Redshift
列：customer_id、first_name、last_name、first_order、most_recent_order、number_of_orders、customer_lifetime_value

血缘关系现在表明，Databricks customerinfo 表是上游来源，其数据用于创建 Redshift customers 表。这个关系会显示在 OpenMetadata 的血缘视图中，帮助你追踪数据流，并理解 Databricks 与 Redshift 系统之间的依赖。
你可以在 OpenMetadata 界面中打开任意一张表，查看「Lineage」标签页，看到这些客户数据资产之间的连接。
```
