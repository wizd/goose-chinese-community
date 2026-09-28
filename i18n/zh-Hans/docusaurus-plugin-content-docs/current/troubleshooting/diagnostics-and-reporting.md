---
title: 诊断与报告
sidebar_label: 诊断与报告
description: 使用内置诊断、报告缺陷，并通过 goose 集成的支持工具请求新功能。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PanelLeft, Bug, MessageSquarePlus, Download } from 'lucide-react';

goose 提供多项内置功能，帮助你获取支持、报告问题并请求新功能。本指南涵盖诊断系统、缺陷报告和功能请求工具。

| 功能 | 用途 | 位置 | 输出 |
|---------|---------|----------|---------|
| **诊断** | 生成故障排除数据 | 聊天输入工具栏 | 包含系统信息、日志和会话数据的 JSON 报告 |
| **报告缺陷** | 提交缺陷报告 | 聊天输入工具栏，或 设置 → 应用 → 帮助与反馈 | 打开 GitHub issue 模板 |
| **请求功能** | 建议新功能 | 设置 → 应用 → 帮助与反馈 | 打开 GitHub issue 模板 |

## 诊断系统

诊断功能会创建一份全面的故障排除 JSON 报告，包含系统信息、会话数据、配置文件和最近的日志。这对调试问题或获取技术支持非常有价值。

### 生成诊断

<Tabs groupId="interface">
  <TabItem value="ui" label="goose 桌面版" default>
    1. 在活跃的聊天会话中，在底部工具栏找到 <Bug className="inline" size={16} /> 图标
    2. 点击诊断按钮
    3. 在弹窗中查看将要收集哪些数据
    4. 点击 `Download` 生成并保存诊断报告
    5. JSON 文件将保存为 `diagnostics_{session_id}.json`

    可以使用 `scripts/diagnostics-viewer.py` 查看已下载的诊断报告；默认它会在 `~/Downloads` 中查找。

    :::tip
    诊断按钮仅在你有活跃会话时可用，因为它需要会话 ID 来生成诊断包。
    :::
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    使用会话诊断命令生成故障排除包。完整细节和所有可用选项见 [CLI 命令指南](/docs/guides/goose-cli-commands#session-diagnostics-options)。

    ```sh
    # Generate diagnostics for a specific session
    goose session diagnostics --session-id <session_id>

    # Interactive selection (prompts you to choose a session)
    goose session diagnostics

    # Save to a custom location
    goose session diagnostics --session-id <session_id> --output /path/to/diagnostics.json
    ```

    要找到会话 ID，先列出可用会话：

    ```sh
    goose session list
    ```

    示例输出：
    ```
    Available sessions:
    abc123def - My coding session - 2024-01-15 14:30:22
    xyz789ghi - Documentation work - 2024-01-15 10:15:45
    ```
  </TabItem>
</Tabs>

### 使用诊断数据

诊断 JSON 文件包含结构化的部分：

```json
{
  "system": {},
  "session": {},
  "config": {},
  "logs": {},
  "prompts": [],
  "schedule": {},
  "errors": []
}
```

**何时生成诊断：**
- 遇到崩溃或意外行为
- 收到你不理解的错误信息
- 性能问题或响应缓慢
- 在报告缺陷之前，以便附上技术细节

**诊断中包含什么：**
- **系统信息**：应用版本、操作系统、架构和时间戳
- **会话数据**：当前对话消息和历史
- **配置文件**：你的[配置文件](/docs/guides/config-files)（如果存在）
- **日志文件**：用于调试的最近应用日志

:::warning 隐私提示
诊断包包含你的会话消息和系统信息。如果会话包含敏感数据（API 密钥、个人信息、专有代码），在公开分享之前请先检查内容。
:::

## 缺陷报告

缺陷报告功能会打开一个结构化的 GitHub issue 模板，帮助你提供有效报告缺陷所需的全部信息。

### 创建缺陷报告

<Tabs groupId="interface">
  <TabItem value="ui" label="goose 桌面版" default>
    1. 在活跃的聊天会话中，在底部工具栏找到 <Bug className="inline" size={16} /> 图标
    2. 点击诊断按钮
    3. 点击 `File Bug on GitHub`
    4. 这会在浏览器中打开 GitHub，并预填缺陷报告模板
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    CLI 用户请直接前往 GitHub 仓库：

    ```
    https://github.com/aaif-goose/goose/issues/new?template=bug_report.md
    ```
  </TabItem>
</Tabs>

## 功能请求

功能请求系统帮助你为 goose 建议改进和新功能。

### 提交功能请求

<Tabs groupId="interface">
  <TabItem value="ui" label="goose 桌面版" default>
    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
    2. 在侧边栏中点击 `Settings`
    3. 点击 `App` 标签页
    4. 向下滚动到 `Help & feedback` 部分
    5. 点击 `Request a Feature`
    6. 这会在浏览器中打开 GitHub，并带有功能请求模板
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    直接前往 GitHub 仓库：

    ```
    https://github.com/aaif-goose/goose/issues/new?template=feature_request.md
    ```
  </TabItem>
</Tabs>

## 用 “Ask goose” 恢复错误

当 goose 桌面版中发生某些类型的错误（例如扩展激活失败）时，你会在错误通知中看到 `Ask goose` 按钮。这个功能让你借助 goose 快速排查问题：

1. 错误发生时，错误通知中会出现 `Ask goose` 按钮
2. 点击该按钮，把错误详情作为聊天提示发送给 goose
3. goose 提供诊断建议和可能的解决方案

## 更多调试

对于诊断未能解决的问题：

- **[会话和系统日志](/docs/guides/logs)**：查看详细日志，以调试单个会话
- **[遥测导出](/docs/guides/environment-variables#observability)**：配置遥测，用于性能分析和生产监控
