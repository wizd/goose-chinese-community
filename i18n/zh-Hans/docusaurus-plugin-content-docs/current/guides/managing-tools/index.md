---
title: 管理工具
hide_title: true
description: 控制并配置为 goose 工作流提供能力的工具和扩展
---

import Card from '@site/src/components/Card';
import styles from '@site/src/components/Card/styles.module.css';

<h1 className={styles.pageTitle}>管理工具</h1>
<p className={styles.pageDescription}>
  工具是<a href="/docs/getting-started/using-extensions">扩展</a>中的具体功能，它们赋予 goose 各项能力。了解如何控制并自定义这些工具为你工作的方式。
</p>

<div className={styles.categorySection}>
  <h2 className={styles.categoryTitle}>📚 文档与指南</h2>
  <div className={styles.cardGrid}>
    <Card 
      title="goose 权限"
      description="选择 goose 在使用工具、编辑文件以及在会话中采取行动时拥有多少自主权。"
      link="/docs/guides/managing-tools/goose-permissions"
    />
    <Card 
      title="工具权限"
      description="配置细粒度权限，控制 goose 可以使用哪些工具以及何时使用，确保自动化安全可控。"
      link="/docs/guides/managing-tools/tool-permissions"
    />
    <Card 
      title="调整工具输出"
      description="自定义工具交互的显示方式，从详细冗长的输出到简洁的摘要。"
      link="/docs/guides/managing-tools/adjust-tool-output"
    />
    <Card 
      title="Code Mode"
      description="按需发现并调用 MCP 工具的编程式方法。"
      link="/docs/guides/managing-tools/code-mode"
    />
    <Card 
      title="Ollama Tool Shim"
      description="通过实验性的本地解释器模型设置，为本身不支持工具调用的模型启用工具调用。"
      link="/docs/experimental/ollama"
    />
  </div>
</div>

<div className={styles.categorySection}>
  <h2 className={styles.categoryTitle}>📝 精选博客</h2>
  <div className={styles.cardGrid}>
    <Card
      title="智能体 AI 与 MCP 生态"
      description="AI 代理、工具调用入门，以及工具如何与 LLM 配合以实现强大的自动化。"
      link="/blog/2025/02/17/agentic-ai-mcp"
    />
    <Card
      title="MCP 生态视觉指南"
      description="用图示和类比拆解 MCP：你的 AI 代理、工具和模型如何协同工作。"
      link="/blog/2025/04/10/visual-guide-mcp"
    />
    <Card
      title="为工具调用微调 Toolshim 模型"
      description="深入探讨开源模型工具调用的挑战，以及 toolshim 方案背后的研究。"
      link="/blog/2025/04/11/finetuning-toolshim"
    />

  </div>
</div>
