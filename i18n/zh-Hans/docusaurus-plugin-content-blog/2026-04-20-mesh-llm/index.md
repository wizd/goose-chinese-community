---
title: "goose 中的 Mesh LLM：跨模型路由"
description: "Mesh LLM 现已作为 goose 中的提供商设置提供。"
authors:
    - mic
---

简讯：[Mesh LLM](https://github.com/Mesh-LLM/mesh-llm/) 现已进入 goose，可作为访问并与亲友共享（开放）LLM 的一个选项。

它使用与本地模式相同的 llama.cpp 基础设施来运行模型，但多了一个变化。

<!--truncate-->

## 什么是 Mesh LLM？

Mesh LLM 是我们正在尝试的一个关联项目，让人们可以把自己的算力（可能只是一台笔记本）点对点连起来，从而访问他们原本可能无法自行托管的模型。

有一个公开演示用的 “mesh”，里面随时会有一些算力；你也可以建立自己的私有网络，把算力汇集起来。mesh 会尽量找出运行模型的最佳位置（按需下载模型），甚至可以用多种方式拆分计算。

这是一个相当早期的项目，我们非常希望听到任何反馈。

请查看[项目文档](https://docs.anarchai.org/)和[实时公共 mesh](https://meshllm.cloud/dashboard)。

<head>
  <meta property="og:title" content="goose 中的 Mesh LLM：跨模型路由" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2026/04/20/mesh-llm" />
  <meta property="og:description" content="Mesh LLM 现已作为 goose 中的提供商设置提供。" />
</head>
