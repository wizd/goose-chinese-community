---
title: Auto Visualiser 扩展
description: 为 goose 添加自动数据可视化
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseBuiltinInstaller from '@site/src/components/GooseBuiltinInstaller';
import ImageCarousel from '@site/src/components/ImageCarousel';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/txh6DlzPwNo" />

Auto Visualiser 扩展让 goose 能在对话中自动生成交互式数据可视化。这个内置扩展使用 MCP Apps，在 goose Desktop 中内联渲染图表、图形、地图和示意图。

本指南介绍如何启用并使用 Auto Visualiser MCP 服务器。

## 配置


<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseBuiltinInstaller
    extensionName="Auto Visualiser"
    description="自动生成交互式数据可视化"
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">

  1. 运行 `configure` 命令：
  ```sh
  goose configure
  ```

  2. 选择 `Toggle Extensions`
  ```sh
  ┌   goose-configure 
  │
  ◇  What would you like you configure?
  │  Toggle Extensions 
  │
  ◆  Enable extensions: (use "space" to toggle and "enter" to submit)
  // highlight-start    
  │  ● autovisualiser
  // highlight-end  
  └  Extension settings updated successfully
  ```
  </TabItem>
</Tabs>


:::info
Auto Visualiser 现在使用 [MCP Apps](/docs/tutorials/building-mcp-apps)，因此可视化可以在聊天中内联渲染，并在 goose Desktop 中展开为全屏或画中画模式。
:::

## 可视化类型

Auto Visualiser 会自动判断数据何时适合可视化，并选择最合适的图表或示意图类型。它把这些可视化作为交互式 MCP Apps 渲染在 goose Desktop 中。

| 图表类型 | 说明 | 当提示词暗示以下内容时会选用 |
|----------|------|------------------------------|
| **Sankey 图** | 展示关系和数量的流向数据可视化 | 流向或流程数据 <br/>（工作流、漏斗、流程数据集） |
| **雷达图** | 多维数据比较（蛛网图） | 多维比较 <br/>（性能指标、功能对比） |
| **环形图/饼图** | 分类数据可视化，支持多张图表 | 分类占比 <br/>（百分比拆分、类别分布） |
| **矩形树图** | 用面积比例表示的层级数据 | 层级数据 <br/>（嵌套类别、组织结构） |
| **弦图** | 实体之间的关系和流向可视化 | 关系矩阵 <br/>（网络连接、交叉引用） |
| **交互式地图** | 使用 Leaflet 带位置标记的地理数据可视化 | 地理信息 <br/>（位置数据、坐标、地址） |
| **Mermaid 图** | 使用 Mermaid 语法的流程图、时序图、甘特图和其他示意图 | 创建示意图 <br/>（流程图、时序图、架构图） |
| **折线图/柱状图/散点图** | 用于数据分析的传统图表类型 | 时间序列数据 <br/>（历史数据、随时间变化的趋势） |

### 可视化示例

<ImageCarousel id="flappy" width="40%" images={[

  require('/blog/2025-08-27-autovisualiser-with-mcp-ui/sankey.png').default,
  require('/blog/2025-08-27-autovisualiser-with-mcp-ui/treemap.png').default,
 ]}
 names={[
    "Sankey",
    "矩形树图"
  ]} />

### 功能

- **自动检测**：goose 会智能为你的数据选择最佳可视化类型
- **交互组件**：所有可视化都支持悬停效果、缩放和钻取
- **MCP Apps 渲染**：可视化作为 MCP Apps 直接在 goose Desktop 中渲染
- **多种显示模式**：可视化可以内联显示，并展开为全屏或画中画模式
- **多图表支持**：可以在一次回复中渲染多个可视化
- **可定制样式**：支持自定义颜色、标签和格式选项
- **导出能力**：可视化可以保存为 HTML 文件以便分享

## 工作原理

当 goose 判断你的数据应该被可视化时，Auto Visualiser 扩展会为所选图表类型返回一个 MCP App。goose Desktop 随后直接在对话中渲染该应用。

根据可视化类型，你可以：

- 在聊天中内联查看
- 展开为全屏，获得更大的工作区
- 在继续对话的同时把它移到画中画模式


## 使用示例

在这个示例中，我会让 goose 分析一些销售数据，并用 Auto Visualiser 扩展自动可视化。


### goose 提示词
```
我有不同产品类别的季度销售数据。你能帮我理解：
1. 收入在嵌套产品类别中的层级拆分
2. 我们的绩效指标在四个季度中如何比较
3. 客户在销售漏斗流程中的流向

数据如下：
- Electronics：Q1：$150k，Q2：$180k，Q3：$220k，Q4：$195k
- Clothing：Q1：$120k，Q2：$140k，Q3：$160k，Q4：$175k
- Home & Garden：Q1：$80k，Q2：$95k，Q3：$110k，Q4：$125k
```

### goose 输出

:::note 桌面版

我来用三种不同的可视化帮你分析季度销售数据，分别对应你的三个问题。我来创建这些可视化。

首先，可视化收入在产品类别中的层级拆分：

![](/img/autovisualiser-treemap.png)

![](/img/autovisualiser-radar.png)

![](/img/autovisualiser-sankey.png)


我创建了三个全面的可视化，从不同角度帮助你理解季度销售数据：

#### 1. 层级收入拆分（矩形树图）
**矩形树图**用面积比例展示收入层级，表示每个类别和季度的相对规模。主要洞察：
- **Electronics** 是最大的收入来源（合计 $745k）
- **Clothing** 位居第二（合计 $595k）
- **Home & Garden** 最小但在增长（合计 $410k）
- 你可以看到每个季度在各类别中的贡献

#### 2. 绩效指标比较（雷达图）
**雷达图**展示三个产品类别在四个季度中的表现，便于比较：
- **Electronics** 在 Q3 表现强劲（$220k），Q4 略有下降
- **Clothing** 全年持续增长
- **Home & Garden** 在所有季度都稳步上升
- 所有类别在 Q3-Q4 表现最强

#### 3. 销售漏斗流向（Sankey 图）
**Sankey 图**表示客户在销售流程中的流向，流的粗细与收入成比例：
- 展示市场机会如何流向各类别的潜在客户
- 展示从潜在客户到实际销售的转化
- **Electronics** 的流最粗（收入转化最高）
- **Home & Garden** 的流最细，但代表增长机会

#### 关键业务洞察：
- **总收入**：所有类别合计 $1.75M
- **增长模式**：所有类别都呈正增长趋势
- **类别表现**：Electronics（42.6%）、Clothing（34%）、Home & Garden（23.4%）
- **季节趋势**：Q3 总体上是最强的季度

需要我创建更多可视化，或深入销售数据的某个具体方面吗？
:::



## 故障排除

- **可视化没有出现**：确认 Auto Visualiser 扩展已启用，并且数据符合预期格式。

- **可视化打开了，但内联显示不合适**：在 goose Desktop 中尝试全屏模式以获得更多空间。

- **数据格式错误**：检查数据结构是否匹配该可视化类型所需的 schema。扩展会提供详细错误信息来引导你。

- **大数据集的性能**：对于非常大的数据集，可视化之前请考虑聚合或抽样。
