---
title: "用 rp-why 提升你的 AI 水平"
description: "一个 goose skill，用 Gas Town × DOK 框架衡量你与 AI 协作的认知复杂度。"
date: 2026-02-06
image: /img/blog/rp-why-banner.png
authors:
  - dakota
---

![rp-why skill 横幅](/img/blog/rp-why-banner.png)

## 什么是 rp-why？

rp-why 是你的个人 AI 协作教练。它回答两个关键问题：

1. **你是否在为工作使用最有效的 AI 工具？**
2. **你问的问题是否体现出认知深度？**

把它想成你 AI 实践的健身追踪器——它显示你在哪里、你可以到哪里，以及如何到达。

**想要理论？** 看看[衡量人机协作的认知复杂度](https://engineering.block.xyz/blog/-gas-town-x-webbs-dok)。

**想用它？** 继续读。

<!-- truncate -->

## 问题

**没有 rp-why**

* 团队把强大的 AI 智能体用在简单任务上，浪费资源。
* 缺少使用可见性，造成盲点。
* 没有反馈回路，让人卡住、停滞。
* 精密工具被烧在琐碎工作上，毁掉投资回报。

**有了 rp-why**

* 团队把工具与任务复杂度匹配，推动真正的效率。
* 使用数据让模式可见、可行动。
* 聪明的轻推帮助人们持续升级。
* 进展随时间被跟踪，把努力变成可衡量的成长。

## 两个维度

### 维度 1：Gas Town 阶段（工具精密度）

你在 AI 采用阶梯的哪里？

| 阶段 | 级别 | 描述 |
|-------|-------|-------------|
| 1-2 | 对聊天机器人好奇 | 基本的网页聊天机器人，偶尔使用 |
| 3-4 | 集成进 IDE | Copilot，编辑器里的聊天 |
| 5 | 自主智能体 | 像 goose 这样独立运行的 CLI 工具 |
| 6-8 | 多智能体大师 | 编排多个 AI 智能体，智能体工作流 |

### 维度 2：DOK 级别（问题深度）

你的提示有多复杂？

| 级别 | 名称 | 示例提示 |
|-------|------|-----------------|
| DOK 1 | 回忆 | “X 是什么？”“列出 Y”“定义 Z” |
| DOK 2 | 应用 | “我会如何……？”“比较 A 和 B” |
| DOK 3 | 策略 | “为……设计一个系统”“分析权衡……” |
| DOK 4 | 延展 | “跨多个会话研究……”“创建一个框架……” |

---

## 象限图

在图上找到自己：

```
                      LOW DOK                    HIGH DOK
                 (Simple Questions)         (Complex Questions)
              ┌────────────────────────┬────────────────────────┐
   HIGH       │                        │                        │
   STAGE      │    UNDERUTILIZING      │       FRONTIER         │
  (Powerful   │                        │                        │
   Tools)     │  You have a Ferrari    │  You're pushing        │
              │  and you're driving    │  boundaries!           │
              │  to the mailbox.       │  Document what you     │
              │  → Level up your       │  learn.                │
              │    questions!          │  → Share your          │
              │                        │    discoveries!        │
              ├────────────────────────┼────────────────────────┤
   LOW        │                        │                        │
   STAGE      │    LEARNING ZONE       │    THINKING AHEAD      │
  (Basic      │                        │                        │
   Tools)     │  Natural starting      │  Your brain exceeds    │
              │  point. Focus on       │  your tools!           │
              │  learning the tools.   │  → Time to upgrade     │
              │  → Try one new         │    your AI toolkit!    │
              │    capability today!   │                        │
              └────────────────────────┴────────────────────────┘
```

**目标：** 走向 **FRONTIER** 象限（右上）

---

## 输出长什么样

```
╔══════════════════════════════════════════════════════════════════╗
║                    SESSION ANALYSIS                              ║
╚══════════════════════════════════════════════════════════════════╝

GAS TOWN STAGE: 5 (Agent Autonomous)

DOK DISTRIBUTION
────────────────────────────────────────────────────────────────────
DOK 1 (Recall):      ████░░░░░░░░░░░░░░░░  17%
DOK 2 (Apply):       ████████████░░░░░░░░  52%
DOK 3 (Strategic):   ██████░░░░░░░░░░░░░░  26%
DOK 4 (Extended):    █░░░░░░░░░░░░░░░░░░░   5%

QUADRANT: Underutilizing
────────────────────────────────────────────────────────────────────
You have a Ferrari and you're driving to the mailbox.
→ Level up your questions!

GROWTH NUDGES
────────────────────────────────────────────────────────────────────
1. Shift 2-3 DOK 2 prompts to DOK 3 by adding "analyze trade-offs"
2. Before simple queries, ask: "Can I make this more strategic?"
3. Try one DOK 4 extended investigation this week

🪞 REFLECTION
────────────────────────────────────────────────────────────────────
What's the most strategic question you could ask right now?
```

---

## 提示的即时升级

### 把 DOK 1 变成 DOK 2

| 之前 | 之后 |
|--------|-------|
| “什么是微服务？” | “对我的项目，我会如何在微服务和单体之间做决定？” |

### 把 DOK 2 变成 DOK 3

| 之前 | 之后 |
|--------|-------|
| “我如何设置 CI/CD？” | “为五人团队设计一套平衡速度、可靠性和团队工作流的 CI/CD 策略。” |

### 把 DOK 3 变成 DOK 4

| 之前 | 之后 |
|--------|-------|
| “设计一套缓存策略” | “在接下来的几个会话里，帮我研究、做原型并记录一套缓存架构。先从分析我们当前的瓶颈开始。” |



## 每周工作流集成

### 周一：重新开始
- 运行 `/rp-why init`（如果你已有基线，则运行 `/rp-why compare`）
- 设定意图：“这周我的目标是 30% 的提示达到 DOK 3+”

### 每天：快速检查
- 每次会话结束时运行 `/rp-why current`
- 30 秒看清你的模式

### 周五：反思
- 运行 `/rp-why compare`
- 庆祝进展，确定下周的焦点


## 把成长游戏化

### 可以解锁的成就

| 徽章 | 成就 | 标准 |
|-------|-------------|----------|
| 🥉 | 铜 | 把 DOK 1 提示降到 25% 以下 |
| 🥈 | 银 | 在一次会话中达到 35% 以上的 DOK 3 提示 |
| 🥇 | 金 | 完成一个 DOK 4 的多会话项目 |
| 💎 | 钻石 | 持续到达 Frontier 象限 |

### 个人挑战

| 挑战 | 描述 |
|-----------|-------------|
| “没有 DOK 1”日 | 每条提示都必须是 DOK 2+ |
| “策略会话” | 目标是 50% 以上的 DOK 3 提示 |
| “深潜周” | 一个跨 5 个会话的 DOK 4 项目 |


## 现在开始

### 安装

安装这个 skill：

```bash
npx skills add https://github.com/block/agent-skills --skill rp-why
```

确保你在 goose 里启用了内置的 [Skills 扩展](/docs/mcp/skills-mcp/)。

### 第 1 步：初始化你的基线

```
/rp-why init
```

这会分析你的对话历史并创建你的个人基线。大约需要 30 秒。

### 第 2 步：检查当前会话

```
/rp-why current
```

看看这次会话与你的典型模式相比如何。你是在伸展，还是在滑行？

### 第 3 步：跟踪进展

```
/rp-why compare
```

把今天和你的基线比较。并问自己：

> “我现在能问的最有策略的问题是什么？”

这就是 rp-why 的心态。


## 常见问题

**问：生成基线要多久？**
答：大约 30 秒。它分析你可用的对话历史。

**问：这会拖慢我的工作流吗？**
答：不会！命令只要几秒。把它想成瞥一眼健身追踪器。

**问：如果我在“利用不足”象限呢？**
答：那是 goose 用户最常见的位置！它意味着你有强大的工具——现在是问更大问题的时候。

**问：我应该多久检查一次？**
答：每天 `/rp-why current`，每周 `/rp-why compare`。总共不到一分钟。

**问：我能和团队分享进展吗？**
答：能！输出被设计成可分享的。截图或复制象限可视化。

---

## 署名

- **Gas Town 框架**：Steve Yegge，[《欢迎来到 Gas Town》](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04)（2026 年 1 月）
- **DOK 级别**：Norman Webb（1997）
- **完整框架深入**：[衡量人机协作的认知复杂度](#)（Block Engineering 博客）

<head>
  <meta property="og:title" content="用 rp-why 提升你的 AI 水平" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2026/02/06/rp-why-skill" />
  <meta property="og:description" content="一个 goose skill，用 Gas Town × DOK 框架衡量你与 AI 协作的认知复杂度。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/rp-why-banner-d3fdd6f674e8e308169e30efe6379735.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="aaif-goose.github.io" />
  <meta name="twitter:title" content="用 rp-why 提升你的 AI 水平" />
  <meta name="twitter:description" content="一个 goose skill，用 Gas Town × DOK 框架衡量你与 AI 协作的认知复杂度。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/rp-why-banner-d3fdd6f674e8e308169e30efe6379735.png" />
</head>
