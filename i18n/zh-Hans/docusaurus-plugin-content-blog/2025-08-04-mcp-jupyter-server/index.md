---
title: "MCP Jupyter：由 AI 驱动的机器学习和数据科学"
description: 让 AI 智能体直接与你的 Jupyter 笔记本一起工作，利用持久记忆和有状态协作，增强机器学习和数据科学工作流
date: 2025-08-05
authors:
  - damien
  - dean
  - harrison
---

![MCP Jupyter 服务器](data-goose.png)

机器学习和数据科学工作流本质上是迭代的。你加载数据、探索模式、构建模型，并根据结果细化方法。但传统 AI 助手在交互之间丢失上下文，迫使你反复重新加载数据并重新建立上下文——让数据密集的开发又慢又贵。

[**MCP Jupyter 服务器**](https://github.com/block/mcp-jupyter)通过让像 goose 这样的 AI 智能体直接与你的 Jupyter 笔记本一起工作来解决这个问题，在交互之间保持持久记忆和状态，同时让 AI 通过代码执行而不是原始数据传输与你的数据交互。

<!--truncate-->

<iframe class="aspect-ratio" src="https://www.youtube.com/embed/0i6gB_mWaRM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## 记忆和上下文问题

传统 AI 编程助手面临一个根本限制：它们在交互之间丢失上下文。这部分源于它们的设计是完成描述清楚的单项任务，比如重构一段代码、编译并运行测试，并把结果提交到版本控制。相比之下，数据科学工作流往往是开放式的，需要大量探索和交互。这为把 AI 用于数据密集的机器学习工作流制造了几个挑战：

- **不断重新加载数据**：每次交互都需要重新加载或描述你的数据集
- **昂贵的迭代**：大型数据集反复处理又慢又贵
- **上下文大小**：原始数据可能太大，放不进上下文
- **不是为交互式工作设计的**：更难让助手做一些步骤，然后把控制交回给人，或反过来

为了应对这些挑战，我们创建了 MCP Jupyter 服务器。

## 更好的方法：持久状态

MCP Jupyter 服务器采取不同的方法。它不是在交互之间丢失上下文，而是保持持久记忆，并让 AI 通过 Jupyter 代码单元执行与你的数据交互。这创造了一个强大的范式：

- **持久记忆**：变量和状态在所有交互中保持
- **高效迭代**：不必重新加载数据或重新建立上下文
- **基于代码的数据交互**：AI 通过执行探索数据，而不是在上下文中拿到原始数据
- **真正的结对编程**：在同一个笔记本上下文中无缝协作

## 改变机器学习工作流

### 探索性数据分析

不必描述你的数据集，让 AI 直接探索它：

> <span style={{color: '#2563eb', fontWeight: 'bold'}}>用户：</span> 「帮我理解这个客户数据集」
> 
> <span style={{color: '#059669', fontWeight: 'bold'}}>AI：</span> 「让我先探索你的数据结构」
> 
> *<span style={{color: '#6b7280', fontStyle: 'italic'}}>［AI 执行：df.info()、df.describe()、df.head()］</span>*
> 
> <span style={{color: '#059669', fontWeight: 'bold'}}>AI：</span> 「我看到你有 50,000 名客户和 12 个特征。数据包括人口统计（年龄、收入）、行为指标（purchase_frequency、avg_order_value），以及『phone_number』列中的一些缺失值。你想让我为关键关系创建可视化吗，比如年龄与收入，或购买模式？」
> 
> <span style={{color: '#2563eb', fontWeight: 'bold'}}>用户：</span> 「是的，给我看年龄和收入分布，以及任何相关性」
> 
> <span style={{color: '#059669', fontWeight: 'bold'}}>AI：</span> 「好！我会为年龄和收入创建直方图，再加上一张相关性热力图」
> 
> *<span style={{color: '#6b7280', fontStyle: 'italic'}}>［AI 生成并显示可视化］</span>*

AI 能看到你实际的列名、数据类型和分布——从而给出相关得多的建议。

### 交互式模型开发

AI 成为你建模过程中的真正协作者：

> <span style={{color: '#2563eb', fontWeight: 'bold'}}>用户：</span> 「这个模型表现不好」
> 
> <span style={{color: '#059669', fontWeight: 'bold'}}>AI：</span> 「让我检查当前指标和特征重要性」
> 
> *<span style={{color: '#6b7280', fontStyle: 'italic'}}>［AI 执行你现有的模型评估代码］</span>*
> 
> <span style={{color: '#059669', fontWeight: 'bold'}}>AI：</span> 「我看到准确率是 72%，最重要的特征是『price』和『location』。模型似乎过拟合了——你想让我试试正则化，还是减少特征集？」
> 
> <span style={{color: '#2563eb', fontWeight: 'bold'}}>用户：</span> 「先试正则化」
> 
> <span style={{color: '#059669', fontWeight: 'bold'}}>AI：</span> 「我会加 L2 正则化，并测试不同的 alpha 值」
> 
> *<span style={{color: '#6b7280', fontStyle: 'italic'}}>［AI 迭代地实现并测试更改］</span>*
> 
> <span style={{color: '#059669', fontWeight: 'bold'}}>AI：</span> 「太好了！alpha=0.1 时，准确率提高到 78%，验证曲线看起来好得多。我应该进一步调它，还是试试集成方法？」

### 实时调试

当错误发生时，助手有完整上下文：

> <span style={{color: '#2563eb', fontWeight: 'bold'}}>用户：</span> 「我在第 5 个单元遇到 KeyError」
> 
> <span style={{color: '#059669', fontWeight: 'bold'}}>AI：</span> 「让我检查你的 dataframe 里有哪些列」
> 
> *<span style={{color: '#6b7280', fontStyle: 'italic'}}>［AI 执行：df.columns、df.info()］</span>*
> 
> <span style={{color: '#059669', fontWeight: 'bold'}}>AI：</span> 「我看到问题了——你在访问『customer_id』，但实际列名是大写的『CustomerID』。另外，我注意到你的『purchase_date』是字符串——我在修复 KeyError 的同时，要把它转换成 datetime 吗？」
> 
> <span style={{color: '#2563eb', fontWeight: 'bold'}}>用户：</span> 「是的，两个问题都修」
> 
> <span style={{color: '#059669', fontWeight: 'bold'}}>AI：</span> 「完成了！我更新了列引用，并把 purchase_date 转换成 datetime。这个单元现在应该能正常运行。」

### 持续协作

想象你在处理一个新数据集的场景：

> <span style={{color: '#2563eb', fontWeight: 'bold'}}>用户：</span> *<span style={{color: '#6b7280', fontStyle: 'italic'}}>［执行：df = pd.read_csv('sales_data.csv')］</span>*
> 
> <span style={{color: '#2563eb', fontWeight: 'bold'}}>用户：</span> 「让我检查数据类型，并寻找任何异常」
> 
> <span style={{color: '#059669', fontWeight: 'bold'}}>AI：</span> 「我会分析你的销售数据结构」
> 
> *<span style={{color: '#6b7280', fontStyle: 'italic'}}>［AI 执行：df.info()、df.describe(include='all')］</span>*
> 
> <span style={{color: '#059669', fontWeight: 'bold'}}>AI：</span> 「我发现几个问题：『CustomerID』存成了文本，但应该是数值，而且『SalesAmount』有 847 个缺失值。你想让我把『CustomerID』转换成数值，并用中位数填充缺失的『SalesAmount』值吗？」
> 
> <span style={{color: '#2563eb', fontWeight: 'bold'}}>用户：</span> 「是的，请这么做，并给我看更新后的信息」
> 
> <span style={{color: '#059669', fontWeight: 'bold'}}>AI：</span> 「完成了！CustomerID 现在是数值，SalesAmount 的空缺已填充。你的数据集干净了，可以建模。」

*<span style={{color: '#6b7280', fontStyle: 'italic'}}>［会话稍后，在你训练了一个模型之后……］</span>*

> <span style={{color: '#2563eb', fontWeight: 'bold'}}>用户：</span> 「我的模型表现如何？」
> 
> <span style={{color: '#059669', fontWeight: 'bold'}}>AI：</span> 「让我为你训练好的模型生成关键指标」
> 
> *<span style={{color: '#6b7280', fontStyle: 'italic'}}>［AI 访问现有的模型变量并生成评估指标］</span>*
> 
> <span style={{color: '#059669', fontWeight: 'bold'}}>AI：</span> 「你的随机森林达到了 0.84 的精确率和 0.81 的召回率。混淆矩阵显示高价值销售类别中有一些假阳性。你想让我调整决策阈值，还是试试特征工程？」

这种流畅的来回——助手理解并建立在现有笔记本状态之上——允许无缝协作，而不必不断重新建立上下文或重新加载数据。

## 示例笔记本

这里你可以看到一个由 MCP Jupyter 服务器处理的示例笔记本。服务器

**[📓 查看完整演示笔记本](https://github.com/block/mcp-jupyter/blob/main/demos/demo.ipynb)**

演示走过一个典型的数据科学工作流：
- **安装缺失的库**：为笔记本安装缺失的库
- **数据生成**：创建用于分析的合成数据
- **模型训练**：用 scikit-learn 拟合线性回归模型
- **结果分析**：提取模型系数和性能指标
- **可视化**：用 seaborn 创建图表

## 开始使用

MCP Jupyter 服务器与现有工作流无缝集成，也可以与基于 VS Code 的 IDE 中的笔记本查看器一起使用。

详细的设置和配置，查看[完整文档](https://aaif-goose.github.io/mcp-jupyter/)。


<head>
  <meta property="og:title" content="MCP Jupyter 服务器：把笔记本智能带给 AI 智能体" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/06/24/mcp-jupyter-server" />
  <meta property="og:description" content="一台强大的 MCP 服务器，让 AI 智能体能与 Jupyter 笔记本交互，同时保留内核状态和变量上下文" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/data-goose-7fc60ab0a13a9e9b6c22172d6ac166ab.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="MCP Jupyter 服务器：把笔记本智能带给 AI 智能体" />
  <meta name="twitter:description" content="一台强大的 MCP 服务器，让 AI 智能体能与 Jupyter 笔记本交互，同时保留内核状态和变量上下文" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/data-goose-7fc60ab0a13a9e9b6c22172d6ac166ab.png" />
</head>
