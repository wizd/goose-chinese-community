---
title: PDF Reader 扩展
description: 把 PDF Reader MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/EJf2_iZfaWk" />

本教程介绍如何把 [PDF Reader MCP 服务器](https://github.com/michaelneale/mcp-read-pdf) 添加为 goose 扩展，让 goose 能够读取并提取受保护和未受保护 PDF 中的文本。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=uvx&arg=mcp-read-pdf&id=pdf_read&name=PDF%20Reader&description=Read%20large%20and%20complex%20PDF%20documents)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  uvx mcp-read-pdf
  ```
  </TabItem>
</Tabs>
:::

## 配置

:::info
运行此命令需要系统已安装 [uv](https://docs.astral.sh/uv/#installation)，因为会用到 `uvx`。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="pdf_read"
    extensionName="PDF Reader"
    description="Read large and complex PDF documents"
    command="uvx"
    args={["mcp-read-pdf"]}
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="PDF Reader"
      description="Read large and complex PDF documents"
      command="uvx mcp-read-pdf"
    />
  </TabItem>
</Tabs>

## 使用示例

这个示例演示如何用 PDF Reader 扩展，按特定条件评估一份求职者简历。有了 PDF Reader 扩展，goose 可以读取指定页面或整份文档，也能从大型、复杂的 PDF 中提取文本。

### goose 提示词

```
阅读 ~/Downloads/resume.pdf 这份简历，评估候选人与以下岗位要求的匹配程度：

  - 5 年以上后端开发经验
  - 扎实的系统设计与分布式系统知识
  - 云基础设施经验（优先 AWS）
  - 曾带领技术项目或团队
  - 加分项：熟悉 LLM 或 AI/ML 工具

每项要求给出 5 分制评分和支持证据，最后用优点、缺点和结论做总结：非常匹配 / 中等匹配 / 匹配较弱。
```

### goose 输出

:::note 命令行

我来对照这些要求分析简历。先读取 PDF。

─── read_pdf | pdf ──────────────────

file_path: ~/Downloads/resume.pdf

接下来根据简历内容，逐项评估候选人：

**1. 后端开发经验（5 年以上）**

**评分：5/5**

- 在多家公司担任软件工程师超过 7 年
- 大量使用 Java、Python 和 Go 做后端开发
- 构建并维护多个后端服务和 API
- 深入掌握微服务架构和 RESTful API

**2. 系统设计与分布式系统知识**

**评分：4.5/5**

- 设计并实现分布式缓存系统
- 有高吞吐消息队列系统经验
- 为微服务实现过服务网格架构
- 对可扩展性和可靠性模式理解扎实
- 做过每天处理数百万笔交易的系统

**3. 云基础设施经验（优先 AWS）**

**评分：4/5**

- 有丰富的 AWS 经验，包括：
  - EC2、ECS 和 Lambda
  - S3 和 DynamoDB
  - CloudWatch 和 CloudFormation
- 有基础设施即代码经验
- 有 Kubernetes 部署和管理经验
- 在云环境中实现过 CI/CD 流水线

**4. 曾带领技术项目或团队**

**评分：4.5/5**

- 带领 5 名工程师开发新的支付处理系统
- 指导初级开发者并参与技术面试
- 从立项到交付管理过多个关键项目
- 成功协调跨职能团队
- 在架构决策中展现了技术领导力

**5. 加分项：熟悉 LLM 或 AI/ML 工具**

**评分：3.5/5**

- 近期实现过 ML 模型部署流水线
- 做过自然语言处理系统
- 对 ML 概念和框架有基础理解
- 接触过 LLM 集成，但并不深入

**总结**

**优点：**

- 后端开发年限超过要求
- 多个领域的技术深度扎实
- 有经证实的领导和项目管理能力
- 云基础设施经验全面
- 现代 AI/ML 技术有良好基础

**缺点：**

- 虽有 AWS 经验，但对一些较新云服务的经验会更有帮助
- AI/ML 经验不错，但在 LLM 上不够专深
- 特定云原生模式的经验还可以再多一些

**结论：非常匹配**

候选人在核心要求上表现突出，尤其是后端开发和系统设计。领导经验和云基础设施知识也很扎实。AI/ML 经验不算丰富，但该岗位把它列为加分项，现有水平已经足够。技术经验的广度和深度，加上已展现的领导力，使这个人非常适合该职位。

整体画像表明，此人可以立刻做出贡献，并有能力在需要补强的领域继续成长。分布式系统的扎实基础和带队记录，对技术领导岗位尤其有价值。

**评分汇总：**

1. 后端开发：5/5
2. 系统设计：4.5/5
3. 云基础设施：4/5
4. 领导经验：4.5/5
5. AI/ML（加分）：3.5/5

**总分：21.5/25**（不含加分项）

:::
