---
title: Council of Mine 扩展（已停用）
sidebar_label: Council of Mine（已停用）
description: Council of Mine 依赖 MCP sampling，与当前 goose 版本不兼容
---

:::warning Retired extension
Council of Mine 的辩论流程依赖 MCP sampling。[Sampling 已在 2026-07-28 MCP 规范中弃用](https://modelcontextprotocol.io/specification/2026-07-28/deprecated)，goose 不再通告或处理 `sampling/createMessage` 请求。请不要在当前 goose 版本中安装此扩展。
:::

Council of Mine 仍可作为围绕 sampling 构建的 MCP 服务器的[历史示例](https://github.com/block/mcp-council-of-mine)。需要模型推理的 MCP 服务器应直接接入 LLM 提供商 API。
