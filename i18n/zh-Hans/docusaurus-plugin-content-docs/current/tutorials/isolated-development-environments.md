---
title: 隔离的开发环境
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

本指南介绍如何使用 **[Container Use MCP](https://github.com/dagger/container-use)** 与 goose 搭建隔离的开发环境。在这种设置下，开发工作会被隔离到 git 分支和容器中，你可以自由试验，而不影响主系统状态。
Container Use MCP 提供了强大的隔离开发方式，对智能体非常友好（建立在 Docker、写时复制文件系统等工具之上）。

## 概览

**[Container Use MCP](https://github.com/dagger/container-use)** 服务器提供容器化开发环境，并与 goose 无缝集成。这让你可以：

- 在隔离到 git 分支的变更上工作
- 在容器中运行代码，而不影响本机
- 在需要时轻松重置并重新开始
- 在不同项目和实验之间保持清晰分离
- 并行处理多项工作

:::info 已经在用 Devcontainers？
如果你在 Docker 容器内开发（例如 VS Code Remote-Containers），请看如何[在现有容器中运行扩展](/docs/tutorials/goose-in-docker#running-extensions-in-docker-containers)。
:::

## 前提条件

- 系统上已安装并运行 Docker（[Podman](https://docs.dagger.io/ci/integrations/podman)、[NerdCtl](https://docs.dagger.io/ci/integrations/nerdctl/) 或 [Container](https://docs.dagger.io/ci/integrations/apple-container/)）
- 已安装并配置 Git
- 已安装并配置 goose

## 设置

安装和配置说明见 [Container Use 扩展](/docs/mcp/container-use-mcp)教程。

## 用法

在 goose 中启用该扩展后，你可以：

### 开始隔离开发

只需在与 goose 的对话中说明你想在隔离环境中工作：

```
"I want to experiment with adding a new feature, but I want to do it in an isolated environment so I don't affect my main codebase."
```

goose 会自动：
1. 为你的工作创建新的 git 分支
2. 搭建容器化环境
3. 确保所有变更都与宿主机系统隔离

### 进行实验

```
"Let me try a completely different approach to this algorithm. Can you set up an isolated environment where I can experiment?"
```

### 学习新技术

```
"I want to try out this new framework, but I don't want to install all its dependencies on my main system."
```

## 好处

- **安全**：可以试验，而不用担心破坏主开发环境
- **可复现**：在不同机器和团队成员之间保持一致的环境
- **隔离**：多个项目可以同时运行而不冲突
- **易于清理**：完成后移除容器和分支
- **版本控制**：所有变更都记录在隔离的 git 分支中
- **可回滚**：轻松丢弃失败的实验

## 常见工作流

### 功能开发

1. 与 goose 开始关于新功能的对话
2. 请求隔离的开发环境
3. goose 创建分支和容器
4. 开发并测试该功能
5. 成功则合并分支；否则丢弃它

### 依赖探索

1. 让 goose 探索一个新的库或工具
2. 在带有该依赖的隔离容器中工作
3. 测试兼容性和功能
4. 决定是否集成到主项目

### 重构

1. 为大规模重构请求隔离环境
2. 在容器和分支的安全范围内进行修改
3. 合并前充分测试
4. 出现问题时易于回滚

## 故障排除

### 常见问题

**Docker 没有运行：**
- 确保已安装并运行 Docker Desktop
- 检查 Docker 守护进程状态：`docker info`

**权限问题：**
- 确保你的用户有权限运行 Docker 命令
- 在 Linux 上，把用户加入 docker 组：`sudo usermod -aG docker $USER`

**Git 问题：**
- 确保 Git 已正确配置用户名和邮箱
- 开始隔离工作时，确认你位于一个 Git 仓库中

### 获取帮助

如果遇到问题：

1. 查看 **[Container Use GitHub 仓库](https://github.com/dagger/container-use)** 中的文档
2. 确认所有前提条件都已安装并正常工作
3. 加入我们的 [Discord 社区](https://discord.gg/n8R5VaWDAn)寻求支持

## 下一步

在 goose 中启用 container-use 后，你就可以放心开发了。试着开始一段关于你一直犹豫要不要试验的项目的对话，让 goose 为你的探索搭建一个安全、隔离的环境。

记住：有了隔离环境，就不存在失败的实验——只有不影响主代码库的学习机会。
