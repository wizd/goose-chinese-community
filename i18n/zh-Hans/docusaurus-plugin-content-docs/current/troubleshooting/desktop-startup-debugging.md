---
title: 调试桌面版启动失败
sidebar_label: 调试桌面版启动失败
description: 找到桌面版启动诊断日志，理解关键字段，并在 goose 无法启动时分享正确的材料。
---

当 goose 桌面版在后端就绪之前就失败时，常规服务器日志可能为空或不完整。这时最有用的材料是桌面应用写出的启动诊断 JSON。

## 找到启动诊断日志

goose 桌面版每次尝试启动都会写一份启动诊断文件。

常见位置：

- macOS：`~/Library/Application Support/Goose/logs/startup/`
- Windows：`%APPDATA%\Goose\logs\startup\`
- Linux：`~/.config/Goose/logs/startup/`

文件名类似：

```text
goosed-startup-2026-04-21T01-24-03.149Z-23416.json
```

如果有多个文件，使用最新的那一份。

## 应该分享什么

报告桌面版启动失败时，请分享：

- 最新的 `goosed-startup-*.json`
- 你的 goose 版本
- 你的操作系统及版本

对于 Windows 原生崩溃，如果有的话，也请附上 `goosed.exe` 的 Windows 崩溃报告。

查找 Windows 崩溃报告的常见位置：

- 事件查看器：`Windows Logs` → `Application`
- 可靠性监视器：`View technical details`
- 磁盘上的 WER 文件：
  - `%LOCALAPPDATA%\Microsoft\Windows\WER\ReportArchive\`
  - `%LOCALAPPDATA%\Microsoft\Windows\WER\ReportQueue\`

查找与 `goosed.exe` 相关的 `Report.wer`。

如果要提交 GitHub issue 或寻求支持，通常这些就够了：

- 最新的 `goosed-startup-*.json`
- 你的 goose 版本
- 你的操作系统及版本
- 在 Windows 上，如果 Windows 生成了 `goosed.exe` 的 `Report.wer`，也一并附上

## 启动日志里有什么

大多数情况下，分享最新的启动日志就够了。

如果想快速看个大概，重点关注这些字段：

- `childExitCode` 或 `childExitSignal`
  表明后端进程在启动期间是否退出。
- `certFingerprintSeen`
  表明后端是否到达了 TLS 启动阶段。
- `healthCheckSucceeded`
  表明桌面应用是否曾经观察到后端就绪。
- `stderrTail`
  显示从后端捕获的最近启动输出，包括可用时的主要启动阶段标记。
- `events`
  显示主要启动步骤的顺序，例如进程生成、健康检查和子进程退出。

## 相关诊断

goose 已经启动之后的会话或应用内问题，请使用[诊断与报告](/docs/troubleshooting/diagnostics-and-reporting)中描述的常规诊断包。
