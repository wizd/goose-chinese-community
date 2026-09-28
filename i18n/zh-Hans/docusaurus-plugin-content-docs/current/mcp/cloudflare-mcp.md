---
title: Cloudflare 扩展
description: 将 Cloudflare MCP 服务器添加为 goose 扩展
unlisted: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

本教程介绍如何将 [Cloudflare 的 MCP 服务器](https://github.com/cloudflare/mcp-server-cloudflare) 添加为 goose 扩展，以便用自然语言管理 Cloudflare 基础设施、调试应用、分析流量等。

Cloudflare 为平台的不同方面提供多个专用 MCP 服务器，让你可以与 Workers、DNS、安全功能、分析和开发工具交互。

:::tip 快速安装

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=mcp-remote&arg=https%3A%2F%2Fobservability.mcp.cloudflare.com%2Fmcp&id=cloudflare-observability&name=Cloudflare%20Observability&description=Debug%20and%20get%20insight%20into%20your%20application%27s%20logs%20and%20analytics&env=CLOUDFLARE_API_TOKEN%3DCloudflare%20API%20Token)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx mcp-remote https://observability.mcp.cloudflare.com/mcp
  ```
  </TabItem>
</Tabs>
  **环境变量**
  ```
  CLOUDFLARE_API_TOKEN: Your Cloudflare API token with appropriate permissions
  ```
:::

## 可用的 Cloudflare MCP 服务器

Cloudflare 为不同用例提供多个专用 MCP 服务器：

| 服务器 | 说明 | 使用场景 |
|--------|------|----------|
| **Documentation** | 获取 Cloudflare 的最新参考信息 | API 参考、功能文档、故障排查指南 |
| **Workers Bindings** | 用存储、AI 和计算原语构建 Workers 应用 | KV 存储、R2 存储桶、AI 模型、Durable Objects |
| **Workers Builds** | 洞察并管理 Cloudflare Workers 构建 | 部署状态、构建日志、版本管理 |
| **Observability** | 调试并洞察应用的日志和分析 | 错误跟踪、性能监控、请求分析 |
| **Radar** | 全球互联网流量洞察、趋势、URL 扫描和实用工具 | 流量分析、威胁情报、URL 扫描 |
| **Container** | 启动沙箱开发环境 | 隔离测试、开发容器 |
| **Browser Rendering** | 获取网页、转换为 markdown、截图 | 网页抓取、内容分析、视觉测试 |
| **Logpush** | 快速了解 Logpush 作业健康状况 | 日志管理、数据管道监控 |
| **AI Gateway** | 搜索日志，获取提示词和响应的详情 | AI 使用分析、提示词优化 |
| **AutoRAG** | 列出并搜索 AutoRAG 上的文档 | 文档检索、知识库管理 |
| **Audit Logs** | 查询审计日志并生成供审阅的报告 | 安全监控、合规报告 |
| **DNS Analytics** | 优化 DNS 性能并调试问题 | DNS 故障排查、性能优化 |
| **Digital Experience Monitoring** | 洞察组织的关键应用 | 应用性能、用户体验监控 |
| **Cloudflare One CASB** | 识别 SaaS 应用的安全配置错误 | 安全态势、合规检查 |
| **GraphQL** | 使用 Cloudflare 的 GraphQL API 获取分析数据 | 自定义分析、数据可视化 |

## 前提条件

- 一个 [Cloudflare 账号](https://dash.cloudflare.com/sign-up)
- 具有适当权限的 [Cloudflare API Token](https://dash.cloudflare.com/profile/api-tokens)
- 已安装 Node.js（用于 `npx` 命令）

## 配置

### 第 1 步：创建 API 令牌

1. 前往 [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. 点击 **“Create Token”**
3. 选择 **“Custom token”** 以获得特定权限，或选择 **“Global API Key”** 以获得完整访问
4. 根据你计划使用的 MCP 服务器配置权限：
   - **Zone:Read** - 用于 DNS、分析和一般区域信息
   - **Zone:Edit** - 用于进行配置更改
   - **Account:Read** - 用于账号级资源
   - **Workers:Read/Edit** - 用于与 Workers 相关的服务器
   - **Logs:Read** - 用于可观测性和审计日志

### 第 2 步：把 MCP 服务器添加到 goose

根据需要选择一个或多个服务器。以下是最常用的配置：

#### Observability 服务器（建议用于调试）

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  1. [启动安装程序](goose://extension?cmd=npx&arg=mcp-remote&arg=https%3A%2F%2Fobservability.mcp.cloudflare.com%2Fsse&id=cloudflare-observability&name=Cloudflare%20Observability&description=Debug%20and%20get%20insight%20into%20your%20application%27s%20logs%20and%20analytics&env=CLOUDFLARE_API_TOKEN%3DCloudflare%20API%20Token)
  2. 按 `Yes` 确认安装
  3. 输入你的 Cloudflare API Token
  4. 点击 `Save Configuration`
  5. 滚动到顶部，点击左上角的 `Exit`
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  1. 运行 `configure` 命令：
  ```sh
  goose configure
  ```

  2. 选择添加 `Command-line Extension`
  3. 为扩展命名：`cloudflare-observability`
  4. 输入命令：`npx mcp-remote https://observability.mcp.cloudflare.com/mcp`
  5. 设置超时：`300` 秒
  6. 添加环境变量：
     - 名称：`CLOUDFLARE_API_TOKEN`
     - 值：你的 Cloudflare API 令牌

  </TabItem>
</Tabs>

#### Workers Bindings 服务器（用于 Workers 开发）

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=mcp-remote&arg=https%3A%2F%2Fbindings.mcp.cloudflare.com%2Fmcp&id=cloudflare-bindings&name=Cloudflare%20Workers%20Bindings&description=Build%20Workers%20applications%20with%20storage%2C%20AI%2C%20and%20compute%20primitives&env=CLOUDFLARE_API_TOKEN%3DCloudflare%20API%20Token)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  命令：`npx mcp-remote https://bindings.mcp.cloudflare.com/mcp`
  </TabItem>
</Tabs>

#### Radar 服务器（用于流量洞察）

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=mcp-remote&arg=https%3A%2F%2Fradar.mcp.cloudflare.com%2Fmcp&id=cloudflare-radar&name=Cloudflare%20Radar&description=Get%20global%20Internet%20traffic%20insights%2C%20trends%2C%20URL%20scans%2C%20and%20other%20utilities&env=CLOUDFLARE_API_TOKEN%3DCloudflare%20API%20Token)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  命令：`npx mcp-remote https://radar.mcp.cloudflare.com/mcp`
  </TabItem>
</Tabs>

## 使用示例

### 调试应用问题

让我们用 Observability 服务器调试 Workers 应用的性能问题：

#### goose 提示词
```
我的 Workers 应用 “my-api-worker” 错误率很高。你能帮我：
1. 查看最近的错误日志
2. 找出最常见的错误类型
3. 分析性能指标
4. 根据数据提出优化建议
```

#### 预期的 goose 输出
```
我来帮你调试 “my-api-worker” 应用的问题。我先收集可观测性数据以定位问题。

首先，查看该 worker 最近的错误日志：

[goose 使用 observability MCP 服务器获取错误日志]

我发现你的 worker 有几个问题：

**错误分析：**
- 45% 的错误是 500 Internal Server Error
- 30% 是超时错误（超过 30 秒 CPU 限制）
- 25% 是超出内存限制的错误

**性能指标：**
- 平均响应时间：2.3 秒（比上周上升 150%）
- CPU 使用率：平均 85%（临界阈值）
- 内存使用率：平均 92%（接近上限）

**已识别的根因：**
1. 数据库连接池问题导致超时
2. 解析大型 payload 的 JSON 时存在内存泄漏
3. 请求校验中的正则表达式效率低

**建议的优化：**
1. 实现带正确清理的连接池
2. 流式处理大型 JSON payload，而不是全部载入内存
3. 用更高效的字符串操作替换正则表达式
4. 为频繁访问的数据添加缓存

需要我帮你实现其中任何修复吗？
```

### 管理 Workers Bindings

使用 Workers Bindings 服务器设置存储和 AI 能力：

#### goose 提示词
```
我需要搭建一个新的 Workers 项目，包含：
1. 用于缓存的 KV 存储
2. 用于文件上传的 R2 存储桶
3. 用于文本分析的 AI binding
4. 用于实时功能的 Durable Object

你能帮我配置这些 binding 吗？
```

### 用 Radar 分析流量

使用 Radar 服务器进行安全和流量分析：

#### goose 提示词
```
你能帮我分析域名 example.com 的安全态势吗？我想：
1. 检查是否有安全威胁或恶意流量
2. 分析全球流量模式
3. 扫描漏洞
4. 获取改进安全性的建议
```

## 常见用例

### 1. 应用调试
- **Observability 服务器**：监控错误、性能和用户体验
- **Logpush 服务器**：分析日志模式和数据管道健康状况
- **DNS Analytics**：调试 DNS 解析问题

### 2. 开发与部署
- **Workers Bindings**：配置存储、AI 和计算资源
- **Workers Builds**：监控部署状态和构建健康状况
- **Container 服务器**：搭建隔离的开发环境

### 3. 安全与合规
- **Audit Logs**：跟踪配置更改和访问模式
- **Cloudflare One CASB**：监控 SaaS 应用安全
- **Radar 服务器**：威胁情报和 URL 扫描

### 4. 分析与洞察
- **GraphQL 服务器**：自定义分析和报告
- **Digital Experience Monitoring**：应用性能洞察
- **AI Gateway**：AI 使用分析与优化

### 5. 内容与 Web 管理
- **Browser Rendering**：网页抓取和内容分析
- **AutoRAG**：文档管理与检索
- **Documentation 服务器**：API 参考和故障排查

## 最佳实践

### 安全
- 使用权限范围最小的 API 令牌
- 定期轮换 API 令牌
- 通过审计日志监控 API 使用
- 为异常活动设置告警

### 性能
- 为不同操作使用合适的超时值
- 尽可能缓存频繁访问的数据
- 监控速率限制和使用配额
- 实现正确的错误处理和重试

### 开发工作流
- 从 Documentation 服务器开始，查阅 API 参考
- 用 Container 服务器做隔离测试
- 开发期间用 Observability 服务器监控
- 上线前用 Radar 服务器分析

## 故障排除

### 常见问题

**身份验证错误：**
- 核实 API 令牌具有正确权限
- 检查令牌是否已过期
- 确保令牌已正确设置在环境变量中

**速率限制：**
- 在 Cloudflare 控制台监控 API 使用
- 重试时实现指数退避
- 考虑升级方案以获得更高限额

**连接问题：**
- 核实到 Cloudflare API 的网络连通性
- 检查防火墙设置
- 确保 DNS 解析正常

### 获取帮助

如果遇到问题：

1. 查看 [Cloudflare MCP 服务器仓库](https://github.com/cloudflare/mcp-server-cloudflare) 中的文档
2. 查阅 [Cloudflare API 文档](https://developers.cloudflare.com/api/)
3. 加入我们的 [Discord 社区](https://discord.gg/n8R5VaWDAn) 寻求支持
4. 在 [Cloudflare Community](https://community.cloudflare.com/) 查找平台相关帮助

## 后续步骤

在 goose 中启用 Cloudflare MCP 服务器后，你可以：

- 用自然语言查询**监控和调试**应用
- 通过对话式命令**管理基础设施**
- 轻松**分析安全**和性能数据
- 在 Cloudflare 整个平台上**自动化工作流**

可以先从 Observability 服务器开始，了解当前应用的情况，再根据具体需求扩展到其他服务器。
