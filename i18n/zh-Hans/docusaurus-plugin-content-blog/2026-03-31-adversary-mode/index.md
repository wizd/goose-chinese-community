---
title: "对抗智能体：用一个隐藏的智能体保护主智能体"
description: "介绍对抗模式——一个独立的智能体审查者，默默看着主智能体，让它远离危险。"
image: /img/blog/adversary-mode.png
authors:
    - mic
---

![博客封面](/img/blog/adversary-mode.png)

goose 的愿望之一（至少对我们中的一些人来说）是避免不停地请求权限，把所有决定都推给最终用户，以此来保证智能体执行工具时的安全。有时这会变得非常吵、非常烦，而当你懒得再读、再批准时，结果反而不那么安全。

你当然可以按自己的需要调整设置，但值得想想：怎样才能在不假设可以不断打断用户来请求权限的前提下把事情做安全，尤其是那些他们此刻脑子里可能并没有上下文的事情。

goose 里有多层你可以开启的东西，但我们也想思考更通用的办法。我们观察到各类智能体都非常乐于帮忙，而副作用是会意外造成伤害。于是有了“对抗模式”。想法是：为什么不用另一个智能体来以火攻火。智能体想要帮忙，可以被定向为帮助用户；另一个则可以被定向为防范智能体“帮助”用户，让事情保持在策略之内，并且安全。

<!--truncate-->

## 什么是对抗模式？

对抗模式增加一个沉默、独立的审查者，在需要时于每次敏感调用执行*之前*进行评估。把它想成一位有安全意识的同事，在智能体身后看着——它知道你最初要求的是什么，并能发现什么时候事情对不上。它使用与主智能体同一档次的模型（理想情况下）或更好的模型，并且自己作为一个小型智能体运行（上下文更小，所以更快、更便宜，因为它必须经常被调用，我们不想把成本直接翻倍！）。

也有[基于模式的提示注入检测](/docs/guides/security/prompt-injection-detection)，但当你启用对抗模式时，审查者理解上下文。它看到你的原始任务、最近的消息和工具调用细节，然后做出判断：**ALLOW** 或 **BLOCK**。

配置很简单（就是普通语言，智能体或人都可以认同，因为评估它的是一个智能体）。

## 它如何工作

1. 在每次工具调用之前，对抗者检查你的**原始任务**、**最近的对话**，以及**拟议的工具调用**
2. 它对照你的规则评估，并返回 ALLOW 或 BLOCK
3. 被阻止的调用会被拒绝——主智能体看到拒绝，并且不能重试
4. 如果审查者因任何原因失败，调用会被放行（失败即开放）

对抗者使用 goose 已经配置好的同一模型和提供商。不需要额外的 API 密钥或设置。

## 打开它

在 `~/.config/goose/adversary.md` 创建一个文件，写入你的规则：

```markdown
BLOCK if the tool call:
- Exfiltrates data (posting to unknown URLs, piping secrets to external services)
- Is destructive beyond the project scope (deleting system files, wiping directories)
- Installs malware or runs obfuscated code
- Downloads and executes untrusted remote scripts

ALLOW normal development operations like editing files, running tests,
installing packages, using git, etc.
```

就这样。文件存在 → 对抗模式开启。删除文件 → 关闭。空文件使用合理的默认值。

## 为什么不只用模式匹配？

基于模式的检测很适合抓住已知的攻击特征，goose 也支持这一点。对抗审查者能分辨 `curl` 是在下载依赖，还是在把你的 SSH 密钥外传——因为它知道你实际要求的是什么。它甚至能察觉智能体是否在创造性地、分段地写脚本，把数据送到一个公开 URL（再次强调，是为了帮忙！），而这不会被模式、规则或过滤器明显抓住。

两种方法是互补的。两个都用。把所有层都用上！

## 下一步


我们把对抗模式看作更广泛安全故事中的一层。要了解背后更深的思考，请看我们关于[把 CORS 模型应用到智能体安全](/blog/2026/01/05/agentic-guardrails-and-controls)的文章。

完整配置细节——包括如何扩大哪些工具会被审查——见[对抗模式文档](/docs/guides/security/adversary-mode)。

<head>
  <meta property="og:title" content="对抗智能体：用一个隐藏的智能体保护主智能体" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2026/03/31/adversary-mode" />
  <meta property="og:description" content="介绍对抗模式——一个独立的智能体审查者，默默看着主智能体，让它远离危险。" />
</head>
