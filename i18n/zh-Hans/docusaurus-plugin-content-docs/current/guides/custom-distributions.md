---
title: 自定义发行版
sidebar_position: 60
sidebar_label: 自定义发行版
---

# 自定义发行版

goose 的设计便于派生和定制。你可以为组织或受众制作自己的 goose「发行版」，预先配置特定提供商、捆绑扩展、自定义品牌，以及量身定制的工作流。

## 可以定制什么

| 你想做的事 | 复杂度 |
|---------------|------------|
| 预配置模型/提供商 | 低 |
| 添加自定义 AI 提供商（声明式 JSON，无需写代码） | 低 |
| 捆绑自定义 MCP 扩展 | 中 |
| 修改系统提示词 | 低 |
| 自定义桌面品牌（图标、名称、颜色） | 中 |
| 通过 ACP 构建新 UI | 高 |
| 用配方创建引导式工作流 | 低 |

## 入门

完整指南在仓库根目录，因为构建自定义发行版需要在代码层面工作：

👉 **[CUSTOM_DISTROS.md](https://github.com/aaif-goose/goose/blob/main/CUSTOM_DISTROS.md)**

其中涵盖：

- **架构概览** — goose 各层（UI → 服务器 → 核心）如何配合
- **仅通过配置定制** — 环境变量、`config.yaml`、`init-config.yaml`
- **扩展捆绑** — 把 MCP 服务器作为内置扩展或通过配方加入
- **自定义品牌** — 替换图标、应用名称、系统提示词
- **构建新界面** — 通过 Agent Client Protocol (ACP) 集成 `goose serve` 或 `goose acp`
- **自定义 AI 提供商** — 声明式 JSON 提供商，或实现 Provider trait
- **配方与子代理** — 分发预先配置好的工作流
- **许可与贡献指引** — 保持符合 Apache 2.0

## 快速示例：附带本地模型交付 goose

最简单的自定义发行版只需设置环境默认值：

```bash
export GOOSE_PROVIDER=ollama
export GOOSE_MODEL=qwen3-coder:latest
```

或者创建一份在首次运行时应用的 `init-config.yaml`：

```yaml
GOOSE_PROVIDER: ollama
GOOSE_MODEL: qwen3-coder:latest
```

更多场景（包括企业 API 密钥分发、面向特定受众的构建，以及自定义 UI）见[完整指南](https://github.com/aaif-goose/goose/blob/main/CUSTOM_DISTROS.md)。
