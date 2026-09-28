---
title: "goose 移动应用与智能体客户端"
description: 整合 iOS 与 Android 的智能体应用以及 ACP
image: /img/blog/goose-mobile-apps-banner.png
authors:
    - mic
---

![goose 移动应用](/img/blog/goose-mobile-apps-banner.png)


2025 年，我们用 Android 做了一次相当前沿的整机自动化尝试（代号 gosling）。它是一个设备端智能体，会接管你的设备（mic 甚至用它买过东西——直到一些东西送到门口，他才意识到那是一封邮件触发的自动购买，所以它被标成了 PoC / 实验性！）

最近我们整合了 [goose 移动应用](https://github.com/aaif-goose/goose-mobile)。

[goose iOS 客户端](/blog/2025/12/19/goose-mobile-terminal/) 更接近可用于生产，并且已经上架 App Store（仍处于早期）。我们希望把它移植到 Android，那将严格只是连接到你远程智能体的客户端（不会接管你的设备！）。客户端（相对于设备端智能体）的目标，是让你把工作随身带走。

这对长时间运行的任务、查看进展，或者随手抛出一个想法都很合适，同时仍然安全地留在你的个人智能体里（你的东西都在那里）。

<!-- truncate -->

## 移动客户端路线图

### ACP

随着 [ACP](https://agentclientprotocol.com/overview/introduction) 演进并成熟，让移动客户端通过隧道用它与 goose 服务器（它实现了 ACP）通信是合理的。附带的好处是，客户端可以与任何兼容 ACP 的智能体一起工作。可以合理地设想，由于开放标准，许多客户端和智能体服务器会混在一起，就像 MCP 服务器（以及现在的 skills）可以在不同智能体实现之间使用一样。这对所有人都是好结果。

### 隧道技术

要让移动客户端用于个人场景（也就是桌面、笔记本、PC 上的智能体，而不是真正的服务器），需要允许入站流量。现有方案很多，从打洞（STUN/TURN 等）、Tor、类似 ngrok/cloudflared 的服务，到 VPN。为了让大家先试用，我们有[这个方案](https://github.com/michaelneale/lapstone-tunnel)，也就是你在 goose 里启用隧道时所用的方案：用 Cloudflare 的 WebSocket、Workers 和 Durable Objects，把事情做得轻量而高效（当然，在一些企业环境里你会有 VPN，可以把方案适配到那里）。

<head>
  <meta property="og:title" content="goose 移动应用与智能体客户端" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2026/01/20/goose-mobile-apps" />
  <meta property="og:description" content="整合 iOS 与 Android 的智能体应用以及 ACP" />
  <meta property="og:image" content="https://goose-docs.ai/blog/2026/01/20/goose-mobile-apps-banner-38cbd490610895a6c2781c74a34cb9c5.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="goose 移动应用与智能体客户端" />
  <meta name="twitter:description" content="整合 iOS 与 Android 的智能体应用以及 ACP" />
  <meta name="twitter:image" content="https://goose-docs.ai/blog/2026/01/20/goose-mobile-apps-banner-38cbd490610895a6c2781c74a34cb9c5.png" />
</head>
