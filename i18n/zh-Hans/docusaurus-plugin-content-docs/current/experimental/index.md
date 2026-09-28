---
title: 实验性功能
hide_title: true
description: 实验性且非常不稳定，但很有意思。
---

import Card from '@site/src/components/Card';
import styles from '@site/src/components/Card/styles.module.css';

<h1 className={styles.pageTitle}>实验性功能</h1>
<p className={styles.pageDescription}>
  goose 是一个持续改进和扩展的开源项目。这些实验性功能和项目仍在开发中，可能还不完全稳定，也不适合生产使用，但它们展示了 AI 自动化未来的有趣可能。
</p>

:::note
随着 goose 开发推进，实验性功能列表可能会变化。有些功能可能晋升为稳定功能，另一些则可能被修改或移除。本节会在具体实验性功能可用时更新。
:::

<div className={styles.categorySection}>
  <h2 className={styles.categoryTitle}>🧪 实验性功能</h2>
  <div className={styles.cardGrid}>
    <Card 
      title="Ollama 工具垫片"
      description="通过实验性的本地解释器模型设置，为不原生支持工具调用的语言模型（例如 DeepSeek）启用工具调用能力。"
      link="/docs/experimental/ollama"
    />
    <Card 
      title="远程访问"
      description="通过 goose AI 移动应用，或 Telegram 等消息平台远程使用 goose。"
      link="/docs/experimental/remote-access"
    />
    <Card 
      title="goose for VS Code 扩展"
      description="通过 ACP 在 VS Code 中直接与 goose 交互。"
      link="/docs/experimental/vs-code-extension"
    />
  </div>
</div>

<div className={styles.categorySection}>
  <h2 className={styles.categoryTitle}>📝 精选博客</h2>
  <div className={styles.cardGrid}>
    <Card 
      title="为工具调用微调 Toolshim 模型"
      description="通过专门的 toolshim 模型开发，解决没有原生工具调用支持的模型的性能限制。"
      link="/blog/2025/04/11/finetuning-toolshim"
    />
    <Card 
      title="用 goose 和 Ollama 把 AI 留在本地"
      description="了解如何将 goose 与 Ollama 集成，获得完全本地的 AI 体验，包括结构化输出和工具调用能力。"
      link="/blog/2025/03/14/goose-ollama"
    />
    <Card 
      title="社区驱动的基准测试：goose Vibe Check"
      description="看看开源 AI 模型在我们首次 goose 智能体基准测试中的表现，包括 toolshim 性能分析。"
      link="/blog/2025/03/31/goose-benchmark"
    />
  </div>
</div>

<div className={styles.categorySection}>
  <h2 className={styles.categoryTitle}>💬 反馈与支持</h2>
  <div className={styles.cardGrid}>
    <Card 
      title="GitHub Issues"
      description="报告缺陷、请求功能，或为实验性功能的开发做贡献。"
      link="https://github.com/aaif-goose/goose/issues"
    />
    <Card 
      title="Discord 社区"
      description="加入社区，讨论实验性功能、分享反馈，并与其他用户交流。"
      link="https://discord.gg/n8R5VaWDAn"
    />
  </div>
</div>
