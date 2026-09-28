---
title: "用 container-use 在 goose 中获得隔离的开发环境"
description: 借助由 container-use 驱动的、容器化且按 git 分支隔离的开发环境，再也不用担心弄坏你的开发设置
authors:
    - mic
---

![博客封面](sandbox.png)

十多年前，Docker 登上舞台，把容器的概念和实践大规模介绍给开发者。这些容器帮助解决了部署和构建时的问题，在某些情况下也解决了开发环境的问题。它们很快成为主流。容器底层的技术包括写时复制文件系统，以及轻量、类似虚拟机的环境，帮助隔离进程并简化清理。

由 Docker 创建者 [Solomon Hykes](https://www.linkedin.com/in/solomonhykes) 创立的项目和公司 Dagger，进一步扩展了容器对开发者的触达。

这项工作中涌现的一个项目是 [Container Use](https://github.com/dagger/container-use)，一台 MCP 服务器，给智能体一个在隔离容器和 git 分支中工作的接口。它支持清晰的生命周期、容易的回滚和更安全的试验，同时不牺牲开发者对本地智能体所期望的人体工学。

Container Use 把容器化、按 git 分支隔离的开发直接带进你的 [goose](/) 工作流。虽然仍处于开发早期，它演进很快，并且已经为你在需要时提供轻量、特定于分支的隔离提供了有用的工具。

<!-- truncate -->

## 只在本地开发的问题

传统上，开发者直接在本地机器上构建，但这种方法有风险，例如：

- 依赖可能在项目之间冲突
- 系统更改可能弄坏其他工具
- 实验性代码危及你稳定的代码库
- 失败实验之后的清理很乏味
- 进程被留下运行，消耗的资源没有释放
- 做出的更改不容易撤销

## 更安全的替代：隔离的开发环境

Container Use 通过给 goose 在完全隔离的环境中工作的能力来解决这些问题。每次实验都有自己的沙箱，什么都不能影响你的主开发设置。

- **Git 分支隔离**：每次实验自动获得自己的 git 分支，让代码更改与主代码库分开。
- **容器隔离**：你的代码在干净、可复现的容器中运行，恰好有它需要的依赖——不多也不少。
- **容易重置**：实验结束时，只需退出环境。不需要清理，也不必担心残留更改。

## 开始使用

### 1. 安装 Container Use

**macOS（推荐）：**
```bash
brew install dagger/tap/container-use
```

**所有平台：**
```bash
curl -fsSL https://raw.githubusercontent.com/dagger/container-use/main/install.sh | bash
```

### 2. 添加到 goose

点击这个链接自动添加扩展：

**[🚀 把 Container Use 添加到 goose](goose://extension?cmd=cu&arg=stdio&id=container-use&name=container%20use&description=use%20containers%20with%20dagger%20and%20git%20for%20isolated%20environments)**

或手动添加到 `~/.config/goose/config.yaml`：

```yaml
extensions:
  container-use:
    name: container-use
    type: stdio
    enabled: true
    cmd: cu
    args:
    - stdio
    envs: {}
```

## 真实用例

### 试验新依赖

- **提示**：「我想试试给这个项目加 Redis，但不确定它是否合适。你能设置一个隔离环境吗？」

- **结果**：goose 创建一个新的 git 分支，启动一个带 Redis 的容器，让你试验。如果不行，只需退出——不需要清理。

### 有风险的重构

- **提示**：「我想完全重组这个代码库，但需要能轻松回滚。」

- **结果**：在隔离的分支和容器中工作，你可以放心做出大范围更改。彻底测试你的新架构。如果重构成功，把它合并回 main。如果失败，删除分支和容器。

### 学习新技术

- **提示**：「我想试试这个新框架，而不在主系统上安装依赖。」

- **结果**：在预先配置好、拥有你需要的所有工具的容器中试验。按自己的节奏学习，而不弄乱宿主系统，也不必担心版本冲突。

### 拆分测试功能

- **提示**：「我想测试这个功能的两种不同方法——一种用 REST API，另一种用 GraphQL。你能同时运行两个实验吗？」

- **结果**：goose 启动两个隔离环境，每个都有自己的 git 分支和容器。一个智能体做 REST 实现，另一个处理 GraphQL，两者并行运行，互不干扰，也不影响你的主代码库。比较结果，合并胜出的那个。

## 指南

**[从完整指南开始 →](/docs/tutorials/isolated-development-environments)**

---

*有问题？加入我们的 [GitHub discussions](https://github.com/aaif-goose/goose) 或 [Discord](https://discord.gg/n8R5VaWDAn)。在 [dagger.io](https://dagger.io/) 了解更多关于 Dagger 的信息。*

{/* Video Player */}
<div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
  <iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/pGce9T4E5Yw?si=1D3Aoa6oiFgJ0E5w" 
    title="YouTube video player" 
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerPolicy="strict-origin-when-cross-origin" 
    allowFullScreen>
  </iframe>
</div>

<head>
  <meta property="og:title" content="用 container-use 在 goose 中获得隔离的开发环境" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/06/19/isolated-development-environments" />
  <meta property="og:description" content="借助由 container-use 驱动的、容器化且按 git 分支隔离的开发环境，再也不用担心弄坏你的开发设置" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/sandbox-0b0f5e6f871cbf48ea1a0be243440aa1.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="用 container-use 在 goose 中获得隔离的开发环境" />
  <meta name="twitter:description" content="借助由 container-use 驱动的、容器化且按 git 分支隔离的开发环境，再也不用担心弄坏你的开发设置" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/sandbox-0b0f5e6f871cbf48ea1a0be243440aa1.png" />
</head>
