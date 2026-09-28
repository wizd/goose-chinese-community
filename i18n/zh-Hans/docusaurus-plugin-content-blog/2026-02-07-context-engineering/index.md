---
title: "一次提示已死"
description: "构建上下文工程工作流、而不是聪明提示的实用步骤和心智模型。"
image: /img/blog/context-engineering-blogbanner.png
authors:
  - ebony
---

![一次提示已死](/img/blog/context-engineering-blogbanner.png)

我参加了一次提示的葬礼。

没有眼泪。只有一屋子开发者，安静地假装他们前一晚没有在喝。因为说实话，大家都看见这事要来，并且它结束了再高兴不过。

说“一次提示已死”并不革命。它只是赶上构建者几个月来一直在经历的事。

<!-- truncate -->

---

## 那篇比燕麦奶过期更快的博客

去年，我写了一篇关于[如何把提示写得更好](https://goose-docs.ai/blog/2025/03/19/better-ai-prompting)的文章。我分享了技巧、措辞建议，甚至说加上几个“请”和“谢谢”，你的 AI 智能体就会把世界给你。当时感觉很前沿，因为它确实是。有整场直播和会议演讲专门讲如何把提示写得更好。

不到一年后，它感觉……过时了。不是因为提示不再重要，而是因为提示不再是主角。

对话从：

> “我如何把模型教练得更好？”

变成

> “我把这个模型放进了什么样的环境？”

那是一个完全不同的问题，现在它有了名字。**[上下文工程](https://goose-docs.ai/docs/guides/context-engineering/)**。


---

## 破裂的抽象

一次提示在智能体还是派对把戏时是有效的。你精心写一条提示，得到一个聪明的答案，而我说的“聪明答案”是指一个完全“能跑”的应用，于是大家都鼓掌。但一旦我们要求智能体规划、记忆、调用工具，并跨多个步骤运作，“有效”的定义就散了。

单条提示不再是解决方案，而变成了瓶颈。现在重要的不是你打的那句话。而是围绕它的系统。提示没有消失，但它们被降级为更大流水线里的一步，这条流水线被设计来保持状态、提前规划并执行护栏。

正如我最近看到的一个帖子里有人说的：

> “上下文很差的最好模型，会输给上下文很好的普通模型。”

这句话解释了转变。上下文现在是优势。

这不是理论。你可以在严肃的智能体系统如何被构建中看到它。像 [OpenClaw](https://openclaw.ai/) 和 [Ralph Wiggum loop](https://ghuntley.com/loop/) 这样的项目不是在追逐聪明措辞。它们在设计环境，让上下文持续存在，决定不断累积，智能体可以跨时间运作，而不必每个会话都重置。

围绕这些系统的兴奋也不只是炒作。它是解脱。构建者一直渴望真正能随时间*可预测*地运作的工作示例。

这就引到唯一重要的问题……

---

## 我实际上怎么做？

当我开始构建我们的 skills 市场时，单靠一次提示不够用。我平常的工作流是在一个地方研究，在另一个地方实现，每次切换工具我都得重新解释同样的决定。上下文不活在系统里。它活在我脑子里。智能体会忘记，我会记住，整个会话变成补水练习，而不是进展。

实践中那个循环是这样的：

{/* Video Player */}
<div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
  <video
    controls
    playsInline
    style={{ width: '100%', height: 'auto', display: 'block' }}
  >
    <source src={require('@site/static/videos/contextBlog.mp4').default} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>



> *就连**这个**演示也由持久上下文驱动。*

那是我试验 [RPI](https://goose-docs.ai/docs/tutorials/rpi) 的时刻。不是因为它时髦，而是因为替代方案已经变得乏味。

你不必明天就采用 RPI 或任何新模式，也能从中受益。你可以在下一次会话里，用开始方式上的一个小改变来模拟这次转变。

在执行任何事之前，把智能体放在仅聊天模式，并运行这次交接。

**第 1 步：对齐终点线**

确切告诉智能体什么算完成。

> “我们要交付的是：___
> 成功看起来像：___”

如果终点线对你来说是模糊的，这就是和智能体把它写清楚的时候，否则你的会话会漂走。

**第 2 步：锁死不可协商的东西**

定义什么没有讨论余地。

> “约束：___
> 我们承诺的架构：___ ”

这防止经典的智能体螺旋：它不断试图过度设计项目，而不是去构建它。

**第 3 步：捕捉持久上下文**

写下必须在会话之后仍然存活的事实。

> “必须持续存在的上下文：
> – ___
> – ___
> – ___”

这是研究、假设、领域知识、边界情况、术语，任何你的智能体需要用来从它停下的地方精确接上的东西。

现在把它存到一个可访问的地方：

- 项目里的一个文件
- 一个上下文文件（goosehints、Cursor rules 等）
- 一个记忆扩展

任何比聊天窗口活得更久的东西。

规则很简单。上下文应该活在系统里，而不是你的脑子里。

---

## 这对思考超越代码的人是好消息

有趣的是，这次转变不只是技术上的。里面藏着一个安静的职业含义。AI 没有在取代工程师。它在取代停在“我的代码能跑，所以我做完了”的工作流。上下文工程奖励一种不同的心态：拿起所有这些不同模式并加以利用的能力，思考决定如何在系统中传播，什么会持续，以及随时间看下游效应是什么样。

那也是我正在积极锻炼的一块肌肉。我越往里靠，方向就越清楚。

---

## 真正的技能是编排

我们参加了它的葬礼，但如你所见，提示并没有真的消失。它只是不再是工作流。

一次提示对演示和探索仍然很好。但当目标是构建比单次会话活得更久的系统时，优势转向你把模型周围的环境设计得有多好。

在这个时代如鱼得水的人，不会是措辞最聪明的人。他们会是知道如何编排上下文，让智能累积而不是重置的人。

老实说，那是进步。


<head>
  <meta property="og:title" content="一次提示已死" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog//2026/02/07/context-engineering" />
  <meta property="og:description" content="构建上下文工程工作流、而不是聪明提示的实用步骤和心智模型。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/blogbanner-2fa90c93a49496447d38217739242dec.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="一次提示已死" />
  <meta name="twitter:description" content="构建上下文工程工作流、而不是聪明提示的实用步骤和心智模型。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/blogbanner-2fa90c93a49496447d38217739242dec.png" />
</head>
