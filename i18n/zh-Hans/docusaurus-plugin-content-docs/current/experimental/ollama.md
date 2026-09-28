---
title: Ollama 工具垫片
sidebar_position: 2
sidebar_label: Ollama 工具垫片
---

:::warning 实验性功能
Ollama 工具垫片是一项实验性功能。行为和配置可能在后续版本中变化。
:::

Ollama 工具垫片让本身不原生支持工具调用的模型也能使用工具。完整的安装说明、配置选项和故障排除，见 **[工具垫片指南](/docs/guides/tool-shim)**。

#### 快速开始

1. 安装并启动 [Ollama](https://ollama.com/download)
2. 拉取默认的解释器模型：
   ```bash
   ollama pull mistral-nemo
   ```
3. 启用垫片后启动 goose：
   ```bash
   GOOSE_TOOLSHIM=true goose session
   ```
