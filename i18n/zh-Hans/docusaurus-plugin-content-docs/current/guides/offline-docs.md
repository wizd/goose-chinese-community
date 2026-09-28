---
title: 离线 / 隔离环境文档
sidebar_position: 95
sidebar_label: 离线文档
---

# 离线 / 隔离环境文档

`goose-doc-guide` 技能在回答 goose 相关问题之前会先阅读官方 goose 文档。默认从 `https://goose-docs.ai` 读取。在离线或隔离环境中，设置 `GOOSE_DOCS_ROOT`，让 goose 改为指向一份**本地副本**。

- 如果设置了 `GOOSE_DOCS_ROOT`（在 `config.yaml` 或环境中），goose 会把它用作文档根——可以是本地文件系统路径，也可以是 HTTP(S) URL。
- 如果未设置，goose 会回退到 `https://goose-docs.ai`。

当根是本地路径时，goose 用自己的文件工具读取文档，不需要网络访问。

## 文档布局

文档根包含一份文档地图和一个 `docs/` 目录树：

```
<docs-root>/
├── goose-docs-map.md
└── docs/
    ├── getting-started/...
    └── guides/...
```

`goose-docs-map.md` 是该技能首先搜索的索引；它阅读的每一页都由其中列出的路径引用。

## 构建本地文档根

从与 goose 二进制版本相同的 goose 检出构建文档，使文档与运行时匹配。标准文档构建已经产出 goose 所需的全部内容——一份 `goose-docs-map.md` 索引和一棵 markdown 文件组成的 `docs/` 树——因此不需要自定义工具：

```bash
git checkout v1.41.0   # match your goose binary version
cd documentation
npm run build
```

这会把文档根写到 `documentation/build/`，其中包含：

```
build/
├── goose-docs-map.md
└── docs/
    ├── getting-started/...
    └── guides/...
```

`npm run build` 需要访问注册表，因此请在可联网的环境中运行。然后把生成的 `build/` 目录复制到隔离环境中的目标位置（例如 `/opt/goose-docs`），并把 `GOOSE_DOCS_ROOT` 指向它。

## 配置 goose

在 `config.yaml` 中设置 `GOOSE_DOCS_ROOT`：

```yaml
GOOSE_DOCS_ROOT: "/opt/goose-docs"
```

或通过环境变量：

```bash
export GOOSE_DOCS_ROOT=/opt/goose-docs
```

对于托管发行版，把文档树烘焙进镜像，并在随附的 `config.yaml` 或启动器环境中设置 `GOOSE_DOCS_ROOT`。

## 说明

- goose 回答中的文档链接始终渲染为规范的 `https://goose-docs.ai/...` URL，即使文档是在本地读取的。
- 自定义 HTTP(S) 镜像同样可用：把 `GOOSE_DOCS_ROOT` 设为该镜像的根 URL。
- 关于离线环境下 MCP 扩展的运行时问题，见[隔离/离线环境问题](/docs/troubleshooting/known-issues#airgappedoffline-environment-issues)。
