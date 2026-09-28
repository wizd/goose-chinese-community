---
title: "越过终端：goose 用 Peekaboo 控制你的桌面"
description: "Computer Controller 扩展用 Peekaboo 重建，让 goose 能够看见、点击、输入，并与 Mac 上的任何应用交互。"
authors:
  - adewale
image: /img/blog/computer-controller-peekaboo.png
---

![goose 控制一台 Mac 桌面，UI 元素带有标注](/img/blog/computer-controller-peekaboo.png)

大多数 AI 智能体住在终端里。它们能读文件、跑命令、写代码——但如果你让它们在网页应用里点一个按钮或填一张表单，它们就卡住了。它们看不见屏幕上有什么，当然也不能与之交互。

在 v1.26，goose 冲出了终端。Computer Controller 扩展用 [Peekaboo](https://github.com/steipete/Peekaboo) 从头重建。Peekaboo 是一个用于屏幕捕获和 GUI 自动化的 macOS CLI 工具。这给了 goose 桌面上的眼睛和手——它能看见带标注的截图，识别 UI 元素，点击按钮，输入文字，滚动，拖拽，并在 Mac 上的任何应用里导航菜单。

<!-- truncate -->

## 看见 → 点击 → 输入的循环

核心工作流简单得要命，而且出奇地可靠：

1. **看见** — goose 对一个应用拍一张带标注的截图。每个可点击元素得到一个标签 ID，比如 `B1`、`B2`、`T1`。
2. **点击** — goose 按 ID 点击一个元素。没有脆弱的像素坐标。
3. **输入** — goose 输入文字、按键，或使用键盘快捷键。

因为元素 ID 绑定的是实际 UI 组件（不是屏幕位置），这种方法能适应不同的窗口大小和位置。goose 不需要知道按钮在屏幕上*哪里*——只需要知道它*是什么*。

实践中是这样：

```
goose: Let me see what's on screen...
→ see --app Safari --annotate

goose: I can see the form. Clicking on the email field...
→ click --on T3
→ type "hello@example.com" --return
```

`see` 命令既返回一张带标注的截图（临时存在内存里），也返回带有元素 ID、标签和类型的结构化 JSON 数据。视觉和结构的这种组合，让交互变得可靠。

## goose 实际能用它做什么？

一旦 goose 能看见并与你的屏幕交互，它能处理的任务范围就急剧扩大。下面是一些真实例子：

### 填写表单

> “去 HR 门户，提交我下周五的请假申请”

goose 打开浏览器，导航到页面，识别表单字段，填进去，并点击提交——全部通过看见 UI 并一步步与之交互来完成。

### 导航复杂 UI

> “打开 Figma，找到叫 ‘Homepage Redesign’ 的设计，并导出为 PNG”

跨没有 API 的应用的多步工作流成为可能。goose 可以点过菜单，在应用内搜索，并跟随多屏流程。

### 控制系统设置

> “打开勿扰模式，并把显示器亮度设为 50%”

系统偏好、菜单栏项目和 macOS 设置都可以通过 Peekaboo 的 `menu`、`menubar` 和 `dialog` 命令访问。

### 自动化重复的 GUI 任务

> “对我 Downloads 文件夹里的每个 PDF，在 Preview 里打开并打印”

goose 可以把已有的文件系统和 shell 能力与 GUI 自动化结合起来——读取目录列表，然后以视觉方式打开并与每个文件交互。

## 完整的命令工具箱

Peekaboo 给 goose 一套全面的命令，用于在视觉、交互和系统控制各方面与 macOS 交互。完整列表见 [Peekaboo 文档](https://github.com/steipete/Peekaboo)。一些要点：
- `see` — 捕获带标注的截图并获得结构化 UI 数据
- `click` — 按 ID 点击一个元素
- `type` — 输入文字或按键
- `scroll` — 在一个元素内滚动
- `drag` — 从一个元素点击并拖到另一个
- `menu` — 与菜单栏项目交互
- `dialog` — 与系统对话框和通知交互


## 获得最佳结果的提示

大量使用 Computer Controller 之后，下面几件事有帮助：

- **goose 工作时不要动鼠标。** goose 根据它看见的东西截图和点击。如果你在任务中途挪东西，它会困惑。
- **提示要具体。** “点击表单底部那个蓝色的提交按钮”比“提交它”给 goose 的信息多得多。
- **让 goose 先看。** goose 会自然地先用 `see` 命令理解当前 UI 状态，然后再行动。如果你在调试一次交互，让 goose 重新拍一张截图。
- **长文本走粘贴。** 为了可靠，输入较长内容时 goose 用 `paste` 而不是 `type`。这避免特殊字符和打字速度的问题。

## 当前限制

Computer Controller 很强，但值得知道边界：

- **目前仅 macOS** — Peekaboo 建立在 macOS 辅助功能 API 上。在 Windows 和 Linux 上，Computer Controller 回退到基于 shell 的自动化（Windows 上的 PowerShell 脚本，Linux 上的 xdotool/wmctrl）。
- **变化很快的 UI 会棘手** — 视频、动画和快速更新的内容会让 goose 看到过时的状态。静态或变化慢的 UI 效果最好。
- **标准 UI 元素效果最好** — 自定义渲染的画布（比如某些游戏 UI 或重度定制的网页应用）可能不暴露 Peekaboo 能识别的辅助功能标签。
- **一次一个屏幕** — goose 每次 `see` 命令处理一张截图，不过在多显示器设置里你可以用 `--screen-index` 指定特定屏幕。

## 试试看

Computer Controller 扩展内置于 goose——只要在扩展里启用它，并开始让 goose 做视觉任务。如果你在 macOS 上，其余的由 Peekaboo 处理。

在 goose Desktop 里，前往 **Extensions**，打开 **Computer Controller**。在 CLI 里：

```sh
goose configure
# → Toggle Extensions → enable computercontroller
```

然后试一件简单的事：

```
Take a screenshot of my current screen and describe what you see.
```

或者更有野心一点：

```
Open System Settings, go to Displays, and set the resolution to "More Space."
```

其余的 goose 会弄清楚——看见 UI，识别正确的元素，并点过去把它做完。


<head>
  <meta property="og:title" content="越过终端：goose 用 Peekaboo 控制你的桌面" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://block.github.io/goose/blog/2026/04/29/computer-controller-peekaboo" />
  <meta property="og:description" content="Computer Controller 扩展用 Peekaboo 重建，让 goose 能够看见、点击、输入，并与 Mac 上的任何应用交互。" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="block.github.io/goose" />
  <meta name="twitter:title" content="越过终端：goose 用 Peekaboo 控制你的桌面" />
  <meta name="twitter:description" content="Computer Controller 扩展用 Peekaboo 重建，让 goose 能够看见、点击、输入，并与 Mac 上的任何应用交互。" />
</head>
