---
title: "Code Mode 不会取代 MCP（它实际做的是这些）"
description: Code Mode 没有杀死 MCP。它让 MCP 更好。实际看看 Code Mode 如何与 MCP 一起工作，解决智能体中的工具膨胀和性能问题。
authors:
    - rizel
---

![博客封面](header-image.png)

有一天，我们会告诉孩子，我们曾经得等智能体，但他们不会知道那个世界，因为他们那个时代的智能体会快得多。我和 OpenAI 的 MCP 指导委员会成员 Nick Cooper，以及 [goose](/) 的创造者 Bradley Axen 开过这个玩笑。他们都笑了，因为他们确切知道，我们当前这种智能体工作流的“拨号时代”有多笨拙、多实验。

[模型上下文协议（MCP）](https://modelcontextprotocol.io/) 通过引入一种新常态推动了进展：把智能体连接到日常应用的能力。然而体验并不完美。我们仍在弄清楚如何在这些工具的力量和模型自身的技术约束之间取得平衡。

<!-- truncate -->

---

## “扩展太多”的问题

（简注：在 [goose](/) 里，我们把 MCP 服务器叫作“扩展”。下文我都用“扩展”。）

很多人否定 MCP，是因为他们遇到延迟或不稳定，却常常没意识到自己掉进了“工具膨胀”的陷阱。诚然，为了有好体验，有很多“不要这样做”的建议。例如，goose 团队和重度用户遵循的一条最佳实践是：不要一次打开太多扩展。否则会话会更快退化，你会看到更多幻觉，任务执行也可能更慢。

我见过第一次使用的用户兴奋地打开一堆扩展。“这太酷了。我要让它访问 GitHub、Vercel、Slack、我的数据库……”他们实际上是在用价值几百 token 的工具定义淹没智能体的上下文窗口。每次工具调用都要求模型把所有这些定义放在“活动记忆”里，这会导致性能明显下降。智能体变慢，开始幻觉出并不存在的细节，最终开始抛错，让沮丧的用户得出结论：这个平台还没准备好上线。

## 让扩展变成动态的

goose 团队最初用增加[动态扩展](/docs/getting-started/using-extensions/#automatically-enabled-extensions)来应对这一点。系统可以把大多数工具保持休眠，直到智能体明确识别出需要它们。这是迈向效率的一大步，但它仍然是一个有些隐蔽的功能，许多普通用户很少发现。我花了很多时间看着人们带着一长串活动扩展操作，意识到他们在自己根本没用的扩展和工具上浪费 token 时，我会皱眉。

## 解释 Code Mode

[Code Mode](/blog/2025/12/15/code-mode-mcp) 把限制工具这个想法再推进一步，从而解决扩展膨胀的问题。我第一次了解这个概念是从一篇 [Cloudflare 博客](https://blog.cloudflare.com/code-mode/)来的。他们提议智能体应该写 JavaScript 或 TypeScript，决定调用哪些工具以及如何调用，然后在一次执行里运行这段逻辑，而不是一步一步调用工具。你不再强迫 LLM 记住一百个不同的工具定义，而是只给它三个基础工具：`search_modules`、`read_module` 和 `execute_code`。然后智能体学会即时找到它需要的东西，并写一段自定义脚本来把这些动作串在一次执行里。

## Code Mode 不会取代 MCP

当 Code Mode 的概念出现在社交网络上时，很多人声称它是 MCP 的替代品。实际上，Code Mode 在底层仍然使用 MCP。它发现并执行的工具仍然是 MCP 工具。把它想成 HTTP 和 REST：HTTP 是使通信成为可能的底层协议，REST 是建立在它之上的架构模式。类似地，MCP 是标准化智能体如何连接到工具的协议，Code Mode 是智能体如何更高效地与这些工具交互的一种模式。事实上，goose 生态把 Code Mode 本身当作一个 MCP 服务器（扩展）。

### goose 如何实现 Code Mode

[goose](/) 采取了一种独特做法，把 [Code Mode](/blog/2025/12/15/code-mode-mcp) 本身做成一个叫 Code Mode 扩展的扩展。激活时，它包装你的其他扩展，并把它们暴露为 JavaScript 模块，让 LLM 只看见三个工具，而不是八十个。

当智能体需要执行复杂任务时，它会写一段看起来大致如此的脚本：

```javascript
import { shell, text_editor } from "developer";

const branch = shell({ command: "git branch --show-current" });
const commits = shell({ command: "git log -3 --oneline" });
const packageJson = text_editor({ path: "package.json", command: "view" });
const version = JSON.parse(packageJson).version;

text_editor({ 
  path: "LOG.md", 
  command: "write", 
  file_text: `# Log\n\nBranch: ${branch}\n\nCommits:\n${commits}\n\nVersion: ${version}` 
});
```

## 有 Code Mode 与没有 Code Mode

除了阅读 Code Mode，我必须亲自试，才能真正理解它如何工作。所以我做了一个实验，比较有 Code Mode 和没有 Code Mode 时的体验。我使用 Claude Opus 4.5，启用了八个不同的扩展，并给智能体一个直接但多步骤的提示，看它如何承受负载：

> “创建一个 LOG.md 文件，包含当前 git 分支、最近 3 次提交，以及 package.json 里的版本”

### 没有 Code Mode

当我在禁用 Code Mode 的情况下跑这个测试时，goose 成功执行了五次独立的工具调用，来收集数据并写文件。然而，因为全部八个扩展的完整定义都加载进了上下文，这个相对简单的任务消耗了我总上下文窗口的 16%。这展示了标准工作流明显的可扩展性问题：不用 Code Mode 时，系统会越来越不稳定，也更容易失败。

### 有 Code Mode

当我打开 Code Mode 并运行完全相同的提示时，体验完全变了。智能体用它的发现工具找到必要的模块，并写了一段统一的 JavaScript 脚本，一次处理整个工作流。在这个场景里，只用了上下文窗口的 3%。

这意味着我可以有更长的会话，然后模型性能才会开始退化，或在太多工具的重压下开始幻觉。

## Code Mode 的价值

这个练习澄清了我对 Code Mode 在 goose 中行为的几个误解。

* **我以为它会让任务执行更快：** Code Mode 并不必然加快任务执行；事实上，我注意到额外的往返，因为 LLM 必须先发现工具并写 JavaScript，然后才能行动。
* **我以为它适合每个任务：** 如果你只用一两个工具，编写和执行代码的开销实际上可能比直接调用工具更多。

然而，当 goose 出现以下情况时，Code Mode 会发光：
- 启用了太多扩展
- 需要执行多步编排
- 需要在长时间运行的会话中保持连贯

因此，在以下情况使用 Code Mode 对我没有意义：
- 我只启用了 1–2 个扩展
- 任务是单步的
- 速度比上下文寿命更重要

---

## 改进 goose 中的 Code Mode 支持

酷的地方是 Code Mode 只会变得更好。团队目前正在打磨 Code Mode，它在 goose v1.17.0（2025 年 12 月）发布：

- [更好的体验](https://github.com/aaif-goose/goose/pull/6205) - 展示正在调用哪些工具，而不是原始 JavaScript
- [更好的可靠性](https://github.com/aaif-goose/goose/pull/6177) - 改进类型签名，让 LLM 第一次就把代码写对
- [更多能力](https://github.com/aaif-goose/goose/pull/6160) - 让子智能体能在 Code Mode 内部工作

Code Mode 帮助我们向前一步，构建能够扩展到处理你所有工具而不会散架的智能体。我喜欢看到 MCP 如何演进，也迫不及待想告诉孩子：智能体并非一直如此没有限制，我们实际上曾经得定量配给工具，才能完成一个简单任务。

---

*准备好试用 Code Mode 了吗？在 [goose](/docs/quickstart) v1.17.0 或更高版本中启用 “Code Mode” 扩展。加入我们的 [Discord](https://discord.gg/n8R5VaWDAn) 分享你的体验！*

<head>
  <meta property="og:title" content="Code Mode 不会取代 MCP（它实际做的是这些）" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/12/21/code-mode-doesnt-replace-mcp" />
  <meta property="og:description" content="Code Mode 没有杀死 MCP。它让 MCP 更好。实际看看 Code Mode 如何与 MCP 一起工作，解决智能体中的工具膨胀和性能问题。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/header-image-c7b1f3556c63058f53eeb740bdaffa3b.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="Code Mode 不会取代 MCP（它实际做的是这些）" />
  <meta name="twitter:description" content="Code Mode 没有杀死 MCP。它让 MCP 更好。实际看看 Code Mode 如何与 MCP 一起工作，解决智能体中的工具膨胀和性能问题。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/header-image-c7b1f3556c63058f53eeb740bdaffa3b.png" />
  <meta name="keywords" content="goose, MCP, 模型上下文协议, Code Mode, AI 智能体, 扩展, 工具膨胀, 上下文窗口, JavaScript, 开发者工具" />
</head>
