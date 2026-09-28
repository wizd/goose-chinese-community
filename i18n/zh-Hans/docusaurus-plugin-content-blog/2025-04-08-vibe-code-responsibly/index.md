---
title: "如何负责任地 vibe code（用 goose）"
description: vibe coding 在失效之前感觉很神奇。了解如何跟着 goose 流动，同时保护你的代码、你的团队和未来的自己。
authors:
    - rizel
---

# 如何负责任地 vibe code（用 goose）

:::warning 已过时
第 1 步中描述的 CLI `/plan` 命令后来已从 goose 中移除。本文的其他实践仍然适用；用自然语言向 goose 要一份计划即可。
:::

![博客封面](responsible-vibe-code.png)

2025 年 2 月 2 日，Andrej Karpathy 创造了「[vibe coding](https://x.com/karpathy/status/1886192184808149383)」这个说法。vibe coding 代表一种新的编程方法：开发者让 AI 智能体构建某样东西，然后跟着流动走。

[Model Context Protocol（MCP）](https://modelcontextprotocol.io/introduction)使这种实践成为可能。在 MCP 之前，开发者在应用之间复制粘贴上下文。这种工作流达不到人人声称的 AI 智能体自动化。今天，AI 智能体可以用 MCP 自主工作，并与任何应用集成，从 GitHub 到 Cloudflare、YouTube 和 Figma。

这一转变让编程民主化。例如，它赋能了：

* Web 开发者用 Unity 创建电子游戏
* 设计师和产品经理原型化全栈应用
* 企业主把愿景变成能用的产品

这是一种解放的体验。但我们太经常像拿着键盘的[伊卡洛斯](https://www.britannica.com/topic/Icarus-Greek-mythology)，vibe coding 飞得离太阳太近。

<!--truncate-->

## vibe coding 的阴暗面

这种创作自由伴随着显著风险。许多开发者在 vibe coding 时遇到过严重问题：

* 提交带有安全漏洞的代码
* 在「意大利面」代码之上引入难以修复的 bug
* 因为缺少版本控制而丢失数周或数月的工作
* 在生产中意外暴露环境变量和 API 密钥等敏感信息

<blockquote className="twitter-tweet" data-dnt="true" align="center"><p lang="en" dir="ltr">Today was the worst day ever☹️<br />The project I had been working on for the last two weeks got corrupted, and everything was lost. Just like that, my SaaS was gone. Two weeks of hard work, completely ruined.<br />But!!!<br />I started from scratch and have already completed 50% of the work…</p>&mdash; CC Anuj (@vid_anuj) <a href="https://twitter.com/vid_anuj/status/1902379748501880934?ref_src=twsrc%5Etfw">March 19, 2025</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>


## 用 goose 更好地 vibe code

[goose](https://goose-docs.ai) 是一个在你机器上本地运行的开源 AI 智能体，内置了安全 vibe coding 的功能。

:::note
大多数人把「vibe coding」定义为纯粹混乱、没有规则的开发。我把它重新定义为：跟着 AI 流动，同时保护你的项目、团队和未来的自己。
:::

### 1. 创建一份计划

goose 的 `/plan` 命令帮助你在任何代码被触碰之前与智能体对齐，让你清楚理解它打算做什么、以及如何做。

这对跨越多个文件、涉及副作用，或可能影响代码库关键区域的任务特别有用。不再猜测——只有一份你可以审阅和批准的结构化拆解。

### 2. 为工作选择合适的模式

让 AI 智能体领路很有趣，但不是每个时刻都需要完全自主。有时你需要在任何代码更改之前暂停、审阅或计划。goose 提供几种[模式](https://goose-docs.ai/docs/guides/managing-tools/goose-permissions)，帮助你保持控制而不打断势头。下面是如何在会话中有意地使用它们：

* **聊天模式**
  goose 只会用文本回应，这样你们可以一起头脑风暴。

* **批准模式**
  在 goose 执行行动之前，它会请求你的批准。当你想继续快速构建，但仍想在事情发生之前知道将要发生什么时，这很有帮助。

* **智能批准**
  在这个模式中，goose 对有风险的行动请求你的批准。这个模式有助于快速原型，同时保留护栏。

* **自主模式**
  在这个模式中，goose 向前推进而不请求批准。如果你对方向有信心并且有安全网，使用这个模式最好。

### 3. 虔诚地使用版本控制

有些时候，AI 智能体改了太多文件和行，Control + Z 修不好。最好对你或 goose 做出的每一项更改都提交，以获得恢复点、清晰的 diff，以及快速回退的能力。

### 4. 提问并批判性思考

即使你在 vibe coding，也不要关掉大脑。

问 goose：

* 你为什么做这个更改？
* 这安全吗？
* 我们如何处理密钥？
* 这是组织数据库的最佳方式吗？

通过推动智能体解释自己，你会构建更好的产品，并在过程中学到更多。

### 5. 定义 .goosehints 以获得更好的上下文

[.goosehints](/docs/guides/context-engineering/using-goosehints) 文件给 goose 关于你项目的编码标准、架构偏好和安全实践的额外上下文。

下面是几个例子：

* 「永远不要暴露 API 密钥。」
* 「数据库查询使用预处理语句。」
* 「避免使用 eval 或不安全的动态代码。」

### 6. 把 goose 集成进你的 CI/CD

在问题进入生产之前，把 [goose 加到你的 CI/CD 流水线](/docs/tutorials/cicd)以：
- 自动化代码评审
- 验证文档
- 运行安全检查

### 7. 用允许列表阻止不安全的 MCP 服务器

有些 MCP 服务器可能引入安全风险，尤其是在被入侵时。

使用 goose 的[允许列表](https://github.com/aaif-goose/goose/blob/main/crates/goose-server/ALLOWLIST.md)功能，防止 goose 调用不安全或不可信的工具。

Block 的团队是这样思考[保护 MCP](/blog/2025/03/31/securing-mcp)的。

### 8. 选择高性能的 LLM

并非所有 LLM 都一样。goose 与这些配合最好：

* Claude Sonnet 3.5
* GPT-4o

性能较低的模型也许能用，但它们更可能幻觉或误解你的目标。阅读更多关于[不同 LLM 在 goose 上的表现](https://goose-docs.ai/blog/2025/03/31/goose-benchmark/)。

## 观看 vibe coding 实战
人们如何用 goose 做 vibe coding：

<iframe width="560" height="315" src="https://www.youtube.com/embed/xZo3aA-vFi4?si=14bVczrCUwdKBZyg" title="The Great goose Off" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## 最后的想法

vibe coding 本身并没有错。它标志着我们构建方式的新篇章，并为每个人打开了门。但有经验的开发者有责任定义聪明、安全的 vibe coding 是什么样子。goose 给我们设定这个标准的工具，这样整个社区都可以有创意地编程，而不牺牲质量。

下载 [goose](https://goose-docs.ai/docs/getting-started/installation/)，今天就有意图地开始 vibe coding！

<head>
  <meta property="og:title" content="如何负责任地 vibe code（用 goose）" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/04/08/vibe-code-responsibly" />
  <meta property="og:description" content="vibe coding 在失效之前感觉很神奇。了解如何跟着 goose 流动，同时保护你的代码、你的团队和未来的自己。" />
  <meta property="og:image" content="http://goose-docs.ai/assets/images/responsible-vibe-code-a77f5e24a879edda943cc76f1fc0bd2a.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="如何负责任地 vibe code（用 goose）" />
  <meta name="twitter:description" content="vibe coding 在失效之前感觉很神奇。了解如何跟着 goose 流动，同时保护你的代码、你的团队和未来的自己。" />
  <meta name="twitter:image" content="http://goose-docs.ai/assets/images/responsible-vibe-code-a77f5e24a879edda943cc76f1fc0bd2a.png" />
</head>
