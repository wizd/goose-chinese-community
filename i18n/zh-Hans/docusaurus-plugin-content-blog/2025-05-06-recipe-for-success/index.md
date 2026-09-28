---
title: "成功配方：烹制可重复的智能体工作流"
description: 借一只会做饭的老鼠，重新看 AI 智能体、编排与可重复性。
authors: 
    - rizel
---
![博客封面](cookingwithgoose.png)

# 成功配方：烹制可重复的智能体工作流

《料理鼠王》不只是一部温暖（也有点不卫生）的老鼠大厨电影。它也像极了眼下流行的技术趋势：AI 智能体和[模型上下文协议（MCP）](https://modelcontextprotocol.io/)。

<!-- truncate -->

---

## Remy 与 Linguini 的关系

如果你没看过这部电影，梗概是这样的：Remy 是一位了不起的厨师，满腹技艺，但他是只老鼠，进不了厨房。Linguini 是厨房帮工，能自由出入，却几乎不会做饭。两人形成共生关系：Remy 藏在 Linguini 的帽子下面，指引他该用什么工具、什么时候用。

如果客人点了薯条，Linguini 可能会愣住，但 Remy 会打量厨房、看手头有什么，然后一步步下指令：

> _「拿一把刀和一块砧板。现在把土豆切片。」_

然后，Linguini 执行这个计划。

---

## 传统 AI 智能体

智能体系统的工作方式很像这样。它有三个核心组件：

* 大语言模型（LLM）
* 智能体
* 工具

LLM 像 Remy：满是知识和推理，却没有动手的途径。智能体像 Linguini：能采取行动，但需要指引。

如果用户说「写一些单元测试」，LLM 分析代码后回答：

> _「看起来是 JavaScript。用 Jest，创建一个测试文件，并导入模块。」_

智能体按计划执行，并用 `file.write()` 这类工具把它做完。

---

## Linguini 的成长

但 Linguini 的故事没有停在这里。即便有 Remy 的指引，他仍然笨手笨脚，不确定该怎样自信地在厨房里走动。他的老板 Skinner 主厨察觉到不对劲。为了帮他进步，Linguini 被配给 Colette，一位老练的厨师，向他展示厨房如何运转：

* 工具放在哪里
* 工位如何组织
* 怎样高效地在空间里移动
* 缺了东西时何时转向

有了 Colette 的指引，Linguini 把厨房理解成一个系统。当客人点了意大利面，Remy 很快形成计划：

> _「把面煮上，炒大蒜和番茄，用罗勒装盘。」_

Linguini 不再机械地听从命令，而是有能力编排整套操作：

* 走到面食工位把水烧开
* 检查煎炒工位有没有干净的锅和新鲜大蒜
* 拿对工具：滤锅、勺子、炒锅
* 需要时找备用锅，或改变流程
* 管理食材和备用供应
* 协调时机，让一切同步完成
* 自信地装盘并上菜

---

## 构造不同

遵循模型上下文协议（MCP）的 AI 智能体就是这样工作的。MCP 把智能体从被动执行者变成主动编排者，让它少依赖 LLM，更清楚自己所处的上下文。

[goose](/) 是一个本地、开源的 AI 智能体，遵循 MCP 的结构。

MCP 为智能体与外部数据和服务交互提供了标准化方式。它有三个核心组件：

* **MCP Host**——接收计划并协调任务的核心智能体
* **MCP Client**——主机用来与外部服务通信的本地连接器
* **MCP Server**——以结构化格式打包的工具、数据或提示。在 goose 生态里，我们把 MCP 服务器称为扩展。

这套架构让 goose 能动态发现工具、理解如何使用它们，并跨多个系统编排复杂工作流。

---

## goose 作为编排者

当用户提示 goose「收集上周关于认证缺陷的所有讨论」时，goose 会编排这次操作。它协调工具、管理执行，并即时适应：

* 找出合适的 MCP 服务器：Slack、GitHub、PostgreSQL
* 理解某个工具没有按预期工作时
* 需要时考虑替代方案

出问题时，goose 不会慌；它会转向。例如，goose 可能会判断：

* 「Slack 搜索没有返回上周的消息。让我换一个日期范围。」
* 「如果还是访问不到，PR 评论里可能有关键点。」

---

## 用配方扩展智能体工作流

电影上映已经 18 年了，我愿意想象 Linguini 已经越过自己的烹饪时代，进入导师时代。他不再低效地训练每一位新厨师，而是把最喜欢的菜记录下来，让知识可分享、可扩展。

同样，goose 是一个着眼未来的 AI 智能体，通过[配方](/docs/guides/recipes/session-recipes)来扩展知识。配方是完整的编排，你可以重新运行、混搭或分享，把知识传给任何需要它的人。

分享一条提示并不总能重现同样的体验；AI 是非确定性的，别人也可能没有配置相同的扩展或上下文。配方解决了这个问题：它把整个 goose 工作流打包起来，包括扩展、设置、目标和示例活动。

**来试一下：**
下面的链接是一份配方，让你选择喜欢的平台（GitHub、Bluesky 或 Dev.to），并用你的公开内容构建一个自定义、故事驱动的 404 作品集页面。

> [用 goose 创建 404 风格的作品集页面](goose://recipe?config=eyJ2ZXJzaW9uIjoiMS4wLjAiLCJ0aXRsZSI6IjQwNFBvcnRmb2xpbyIsImRlc2NyaXB0aW9uIjoiQ3JlYXRlIHBlcnNvbmFsaXplZCwgY3JlYXRpdmUgNDA0IHBhZ2VzIHVzaW5nIHB1YmxpYyBwcm9maWxlIGRhdGEiLCJpbnN0cnVjdGlvbnMiOiJDcmVhdGUgYW4gZW5nYWdpbmcgNDA0IGVycm9yIHBhZ2UgdGhhdCB0ZWxscyBhIGNyZWF0aXZlIHN0b3J5IHVzaW5nIGEgdXNlcidzIHJlY2VudCBwdWJsaWMgY29udGVudCBmcm9tICoqb25lKiogb2YgdGhlIGZvbGxvd2luZyBwbGF0Zm9ybXM6ICoqR2l0SHViKiosICoqRGV2LnRvKiosIG9yICoqQmx1ZXNreSoqLiBZb3UgZG8gbm90IG5lZWQgdG8gdXNlIGFsbCB0aHJlZeKAlGp1c3QgdGhlIG9uZSBzZWxlY3RlZCBieSB0aGUgdXNlci5cblxuVGhlIHBhZ2Ugc2hvdWxkIGJlIGZ1bGx5IGJ1aWx0IHdpdGggKipIVE1MLCBDU1MsIGFuZCBKYXZhU2NyaXB0KiosIGZlYXR1cmluZzpcblxuKiBSZXNwb25zaXZlIGRlc2lnblxuKiBQZXJzb25hbCBicmFuZGluZyBlbGVtZW50cyAoZS5nLiwgbmFtZSwgaGFuZGxlLCBhdmF0YXIpXG4qIE5hcnJhdGl2ZS1kcml2ZW4gbGF5b3V0IHRoYXQgdHVybnMgdGhlIGVycm9yIGludG8gYW4gb3Bwb3J0dW5pdHkgZm9yIGRpc2NvdmVyeVxuXG5Vc2UgcGxhdGZvcm0tc3BlY2lmaWMgbWV0aG9kcyB0byBmZXRjaCByZWNlbnQgdXNlciBjb250ZW50OlxuXG4qIEZvciAqKkRldi50byoqLCB1c2UgdGhlIFtwdWJsaWMgRGV2LnRvIEFQSV0oaHR0cHM6Ly9kZXZlbG9wZXJzLmZvcmVtLmNvbS9hcGkpIHRvIHJldHJpZXZlIHJlY2VudCBhcnRpY2xlcywgcmVhY3Rpb25zLCBhbmQgcHJvZmlsZSBpbmZvcm1hdGlvbi5cbiogRm9yICoqR2l0SHViKiosIHVzZSB0aGUgR2l0SHViIFJFU1Qgb3IgR3JhcGhRTCBBUEkgdG8gYWNjZXNzIHJlY2VudCByZXBvcywgY29tbWl0cywgYW5kIGNvbnRyaWJ1dGlvbnMuXG4qIEZvciAqKkJsdWVza3kqKiwgdXNlIHB1YmxpYyBmZWVkIGVuZHBvaW50cyBmcm9tIHRoZSBBcHBWaWV3IEFQSSAoZS5nLiwgYGFwcC5ic2t5LmZlZWQuZ2V0QXV0aG9yRmVlZGApIHRvIHB1bGwgcG9zdHMsIHJlcGxpZXMsIG9yIGxpa2VzLlxuXG5JbmNvcnBvcmF0ZSB0aGUgZmV0Y2hlZCBkYXRhIGludG8gYSBjb21wZWxsaW5nIG5hcnJhdGl2ZSAoZS5nLiwg4oCcTG9va3MgbGlrZSB0aGlzIHBhZ2UgaXMgbWlzc2luZywgYnV0IFxcW3VzZXJuYW1lXSBoYXMgYmVlbiBidXN5IeKAnSksIGFuZCBkaXNwbGF5IGl0IHVzaW5nIGVuZ2FnaW5nIHZpc3VhbHMgbGlrZSBjYXJkcywgdGltZWxpbmVzLCBvciBtZWRpYSBlbWJlZHMuXG5cbldyYXAgdGhlIHVzZXLigJlzIGFjdGl2aXR5IGludG8gYSBzdG9yeSDigJQgZm9yIGV4YW1wbGU6XG5cbuKAnFRoaXMgcGFnZSBtYXkgYmUgbG9zdCwgYnV0IEB1c2VybmFtZSBpcyBidWlsZGluZyBzb21ldGhpbmcgYW1hemluZy4gVGhlaXIgbGF0ZXN0IG9wZW4gc291cmNlIGpvdXJuZXkgaW52b2x2ZXMgYSBuZXcgcmVwbyB0aGF04oCZcyBnYWluaW5nIHN0YXJzIGZhc3TigKbigJ1cbuKAnFlvdSB3b27igJl0IGZpbmQgd2hhdCB5b3XigJlyZSBsb29raW5nIGZvciBoZXJlLCBidXQgeW91IHdpbGwgZmluZCBAdXNlcm5hbWXigJlzIGhvdCB0YWtlIG9uIGFzeW5jL2F3YWl0IGluIHRoZWlyIGxhdGVzdCBEZXYudG8gcG9zdC7igJ1cblxuVGhlIHJlc3VsdCBzaG91bGQgYmUgYSBzbWFsbCBuYXJyYXRpdmUtZHJpdmVuIG1pY3Jvc2l0ZSB0aGF0IGR5bmFtaWNhbGx5IGNlbGVicmF0ZXMgdGhlIHVzZXIncyBwcmVzZW5jZSBvbmxpbmXigJRldmVuIHdoZW4gdGhlIGRlc3RpbmF0aW9uIGlzIG1pc3NpbmcuXG5cbkFzayB0aGUgdXNlcjpcblxuMS4gV2hpY2ggcGxhdGZvcm0gdG8gdXNlOiBHaXRIdWIsIERldi50bywgb3IgQmx1ZXNreVxuMi4gVGhlaXIgdXNlcm5hbWUgb24gdGhhdCBwbGF0Zm9ybVxuXG5UaGVuIGdlbmVyYXRlIHRoZSBjb21wbGV0ZSBjb2RlIGluIGEgZm9sZGVyIGNhbGxlZCA0MDQtc3RvcnkuXG4iLCJleHRlbnNpb25zIjpbXSwiYWN0aXZpdGllcyI6WyJCdWlsZCBlcnJvciBwYWdlIGZyb20gR2l0SHViIHJlcG9zIiwiR2VuZXJhdGUgZXJyb3IgcGFnZSBmcm9tIGRldi50byBibG9nIHBvc3RzIiwiQ3JlYXRlIGEgNDA0IHBhZ2UgZmVhdHVyaW5nIEJsdWVza3kgYmlvIl0sImF1dGhvciI6eyJjb250YWN0Ijoicml6ZWwifX0=)

:::note
上面的链接会在 [goose 桌面应用](/docs/getting-started/installation)中打开。
:::

<details>
  <summary>查看配方原料</summary>
```yaml
version: 1.0.0
title: "404Portfolio"
description: "Create personalized, creative 404 pages using public profile data"

instructions: |
  Create an engaging 404 error page that tells a creative story using a user's recent public content from **one** of the following platforms: **GitHub**, **Dev.to**, or **Bluesky**. You do not need to use all three—just the one selected by the user.

  The page should be fully built with **HTML, CSS, and JavaScript**, featuring:

  * Responsive design
  * Personal branding elements (e.g., name, handle, avatar)
  * Narrative-driven layout that turns the error into an opportunity for discovery

  Use platform-specific methods to fetch recent user content:

  * For **Dev.to**, use the [public Dev.to API](https://developers.forem.com/api) to retrieve recent articles, reactions, and profile information.
  * For **GitHub**, use the GitHub REST or GraphQL API to access recent repos, commits, and contributions.
  * For **Bluesky**, use public feed endpoints from the AppView API (e.g., `app.bsky.feed.getAuthorFeed`) to pull posts, replies, or likes.

  Incorporate the fetched data into a compelling narrative (e.g., “Looks like this page is missing, but \[username] has been busy!”), and display it using engaging visuals like cards, timelines, or media embeds.

  Wrap the user’s activity into a story — for example:

  “This page may be lost, but @username is building something amazing. Their latest open source journey involves a new repo that’s gaining stars fast…”
  “You won’t find what you’re looking for here, but you will find @username’s hot take on async/await in their latest Dev.to post.”

  The result should be a small narrative-driven microsite that dynamically celebrates the user's presence online—even when the destination is missing.

  Ask the user:

  1. Which platform to use: GitHub, Dev.to, or Bluesky
  2. Their username on that platform

  Then generate the complete code in a folder called 404-story.


activities:
  - "Build error page from GitHub repos"
  - "Generate error page from dev.to blog posts"
  - "Create a 404 page featuring Bluesky bio"

extensions:
  - type: builtin
    name: developer
  - type: builtin
    name: computercontroller
```

</details>

---

## 可复用的智能体工作流

下面是配方派上用场的几种场景：

### 新队友入职

通常，开发者加入团队后，要花好几个小时搭建环境、弄清该用哪些平台，并解读事情如何完成的潜规则。
改成把一份配方交给他们。预载了上下文和合适的工具，它能自动完成本地设置、露出相关文档，并带他们走一遍团队工作流，一次屏幕共享都不用。

### 举办工作坊

工作坊总是一场赌博：机器不同、环境不同、干扰也不同。
跳过这场混乱。丢一个配方链接，让每位参与者拉起相同的环境、相同的工具、相同的目标和相同的示例。你有更多时间教学，花更少时间排障。

### 加速你的团队

你的团队里全是解决问题的人。一位队友做了一个漂亮的内部仪表盘。另一位把支持工单分诊做得很好。还有人自动生成了变更日志。然后问题来了：怎样让整个团队都容易用上？配方把团队的创造变成任何人都能拿起来的可复用工作流。建一个由 goose 驱动的流程共享库，放大团队的影响力。

 拿上 [goose](/docs/getting-started/installation)，开始烹制你自己的[配方](/docs/guides/recipes/session-recipes)。未来的你（和你的团队）会感谢你！

<head>
  <meta property="og:title" content="成功配方：烹制可重复的智能体工作流" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/05/06/recipe-for-success" />
  <meta property="og:description" content="借一只会做饭的老鼠，重新看 AI 智能体、编排与可重复性。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/cookingwithgoose-9114cf03cec76df4792fc58361ebe20b.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="成功配方：烹制可重复的智能体工作流" />
  <meta name="twitter:description" content="借一只会做饭的老鼠，重新看 AI 智能体、编排与可重复性。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/cookingwithgoose-9114cf03cec76df4792fc58361ebe20b.png" />
</head>
