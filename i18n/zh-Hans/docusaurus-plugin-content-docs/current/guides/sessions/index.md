---
title: 管理会话
hide_title: true
description: 管理会话生命周期，以及与 goose 的持续交互
---

import Card from '@site/src/components/Card';
import styles from '@site/src/components/Card/styles.module.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<h1 className={styles.pageTitle}>管理会话</h1>
<p className={styles.pageDescription}>
  会话是你与 goose 的持续交互。每个会话都保留上下文和对话历史，使 goose 能理解你正在进行的工作并提供相关帮助。
</p>

<div className={styles.categorySection}>
  <h2 className={styles.categoryTitle}>📚 文档与指南</h2>
  <div className={styles.cardGrid}>
    <Card 
      title="会话管理"
      description="了解如何开始、恢复或搜索会话，以及执行其他会话管理任务。"
      link="/docs/guides/sessions/session-management"
    />
    <Card 
      title="会话内操作"
      description="了解会话期间可用于分享信息和与 goose 沟通的功能。"
      link="/docs/guides/sessions/in-session-actions"
    />
    <Card 
      title="智能上下文管理"
      description="使用有助于管理上下文和对话上限的功能，保持会话高效。"
      link="/docs/guides/sessions/smart-context-management"
    />
  </div>
</div>
<div className={styles.categorySection}>
  <h2 className={styles.categoryTitle}>📝 精选博客</h2>
  <div className={styles.cardGrid}>
    <Card
      title="使用 goose 的 6 条基本建议"
      description="了解聚焦的会话、逐步引导和打磨提示词如何带来更高效的会话。"
      link="/blog/2025/03/06/goose-tips"
    />
    <Card
      title="AI 提示入门：如何从 AI 代理获得更好的回应"
      description="为提示词加上结构，让会话更有效。"
      link="/blog/2025/03/19/better-ai-prompting"
    />
    <Card
      title="给 AI 怀疑者的上下文窗口指南"
      description="了解上下文窗口、token 和 goose 如何帮助你管理记忆与长对话。"
      link="/blog/2025/08/18/understanding-context-windows"
    />
  </div>
</div>
