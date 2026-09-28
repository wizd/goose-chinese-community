---
title: GDK 概览
sidebar_label: 概览
description: 使用 SDK 和 ACP 在 goose 之上构建。
---

# GDK

goose 开发套件（GDK）提供开发者构建智能体应用所需的核心组件，包括智能体编排、模型访问、上下文管理、工具、记忆、远程执行、自动化和路由。使用方式有两种：

- [SDK](/docs/gdk/sdk) — 把 goose 的 provider 层当作进程内库，从 Rust、Python 或 Kotlin 调用。
- [ACP](/docs/gdk/acp) — 通过 stdio、HTTP 或 WebSocket，把 goose 作为独立的智能体进程连接。
