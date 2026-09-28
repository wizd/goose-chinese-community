---
title: "以约三十分之一的成本接近前沿性能"
description: "在 Databricks OfficeQA 基准上使用 goose 与 MiniMax M2.5"
authors:
    - mic
---

简讯：[Sentient AGI](https://x.com/SentientAGI/status/2046967422004154739) 最近和我们分享了一项名为 “Grounded Reasoning” 的挑战结果。各团队使用 MiniMax（2.5）开放模型攻克 Databricks OfficeQA 基准。

<!-- truncate -->

所链文章中的要点：

> * 在 [Databricks 的 OfficeQA 基准](https://www.databricks.com/blog/officeqa)上，使用 goose 搭配 [MiniMax M2.5](https://www.minimax.io/)，我们看到的结果正以**约三十分之一的成本**接近前沿模型性能。
> * 闭源模型在准确率上领先（约 80% 对约 70%），但 MiniMax M2.5 每次运行平均花费 1.74 美元，而 Opus 4.5 为 56.53 美元。大约便宜 30 倍。
> * 换成 @goose_oss 这套运行框架后，准确率比其他方案高出约 10%，并且比次优选项便宜 8 倍。我们决定用独立测试进一步探究。在 Terminal Bench 2.0 上，情况类似：goose 的 token 效率（以及成本）比 OpenHands 高 20 倍，比 OpenCode 便宜 40 倍以上。

完整帖子和结果见这里：

> **[https://x.com/SentientAGI/status/2046967422004154739](https://x.com/SentientAGI/status/2046967422004154739)**

<head>
  <meta property="og:title" content="以约三十分之一的成本接近前沿性能" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2026/05/04/officeqa-minimax-m25" />
  <meta property="og:description" content="在 Databricks OfficeQA 基准上使用 goose 与 MiniMax M2.5，以极低成本接近前沿模型性能。" />
</head>
