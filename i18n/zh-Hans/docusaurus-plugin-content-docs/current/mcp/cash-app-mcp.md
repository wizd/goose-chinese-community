---
title: Cash App 扩展
description: 将 Cash App 添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

Cash App 把本地餐饮点单带进 AI 时代。发现附近商家、浏览带热量和过敏原信息的菜单、定制订单并完成结账，全程用对话完成。真正的魔力在于把它和其他工具结合起来：查看日历里的会议时间、把餐食记录到健康应用，或找出符合饮食目标的选项。试试这样的提示词：“点一份不含坚果、能在我下午 2 点航班前送到的午餐”，获得真正连通的体验。

## 快速安装

:::tip
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [安装 Cash App 扩展](goose://extension?type=streamable_http&url=https%3A%2F%2Fconnect.squareup.com%2Fv2%2Fmcp%2Fcash-app&id=cash-app&name=Cash%20App&description=Cash%20App%20brings%20local%20food%20ordering%20into%20the%20AI%20era.)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  使用 `goose configure` 添加 `Remote Extension (Streamable HTTP)`，并填写：

  **端点 URL**

  ```
  https://connect.squareup.com/v2/mcp/cash-app
  ```
  </TabItem>
</Tabs>
:::

## 配置

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="cash-app"
      extensionName="Cash App"
      description="Cash App 把本地餐饮点单带进 AI 时代。发现附近商家、浏览菜单、定制订单并完成结账，全程用对话完成。"
      type="http"
      url="https://connect.squareup.com/v2/mcp/cash-app"
    />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Cash App"
      description="Cash App 把本地餐饮点单带进 AI 时代。发现附近商家、浏览菜单、定制订单并完成结账，全程用对话完成。"
      type="http"
      url="https://connect.squareup.com/v2/mcp/cash-app"
    />
  </TabItem>
</Tabs>

## 你能做什么

### 发现附近餐厅

查找任意位置附近的餐厅。可以按菜系偏好、品牌名称、当前是否营业筛选，或直接描述你想吃什么。

**提示词：**
```
帮我找纽约 375 W Broadway 附近、现在营业的餐厅。
我想吃点快捷又健康的。
```

<details>
<summary>goose 输出</summary>

```
以下是 375 W Broadway 附近的餐厅：

1. Ba'al Falafel - 71 Sullivan St — 地中海菜。新鲜沙拉三明治、
   鹰嘴豆泥和沙拉。（营业时间：上午 10:00 - 晚上 10:00）
2. Kale & Things - 284 Lafayette St — 健康碗和沙拉，
   配瘦蛋白。（营业时间：上午 9:00 - 晚上 9:00）
3. Simply Natural Grill House NY - 684 Broadway — 烤制蛋白质
   和营养餐。（营业时间：上午 11:00 - 晚上 10:00）
4. Steam & Sip - 112 Spring St — 咖啡和小食。
   （营业时间：上午 7:00 - 晚上 7:00）

如果想吃一顿快捷健康的午餐，我推荐 Ba'al Falafel 或 Kale & Things。
两家都很近，轻食选择也很好。要我展示其中一家的菜单吗？
```

</details>

### 浏览带价格和推荐的菜单

获取完整菜单概览，包括分类、价格、描述和推荐菜品。这些都是 goose 可以据此推理的纯文本。

**提示词：**
```
给我看 71 Sullivan St 的 Ba'al Falafel 完整菜单。
```

<details>
<summary>goose 输出</summary>

```
# Ba'al Falafel

## 推荐
- **Classic Falafel Sandwich** — $9.99：脆炸鹰嘴豆球配芝麻酱、
  腌菜和新鲜蔬菜，夹在温热皮塔饼中
- **Mediterranean Bowl** — $12.99：鹰嘴豆球、鹰嘴豆泥、塔布勒沙拉和混合
  蔬菜，配芝麻酱

## 三明治
- **Classic Falafel Sandwich** — $9.99：脆炸鹰嘴豆球配芝麻酱
- **Shawarma Wrap** — $11.99：调味鸡肉沙威玛配蒜酱
- **Sabich** — $10.99：炸茄子、水煮蛋和芒果酱

## 沙拉
- **Beets Apple Salad** — $11.99：烤甜菜、苹果、核桃、山羊奶酪
- **Fattoush Salad** — $10.99：脆皮塔饼片配新鲜蔬菜

## 汤
- **Lentil Soup** — $6.99：传统红扁豆汤，带孜然

## 饮品
- **Ginger Lemonade** — $4.99：鲜榨，加姜
- **Mint Tea** — $3.99：新鲜薄荷叶用热水冲泡
```

</details>

因为菜单以结构化文本返回，goose 可以回答后续问题，例如 *“哪些菜品低于 10 美元？”* 或 *“哪些是素食？”*，无需再次调用工具。

### 组建购物车并结账

找到想要的之后，告诉 goose 组建订单。它会处理菜品选择、定制项和数量，然后给你一个结账链接，通过 Cash App 完成支付。

**提示词：**
```
往我的购物车里加一份 Classic Falafel Sandwich 和一杯 Ginger Lemonade。
```

## 示例提示词

当 goose 把 Cash App 与你的其他工具以及当天的情境结合起来时，它最有用：

- **按时间点单：** *“点一份不含坚果、能在我下午 2 点航班前送到的午餐。”*
- **配合日历：** *“查看我今天的日历，在我下午 1 点的会议前，找一个能快速自取午餐的地方。我在联合广场附近。”*
- **注重健康的选择：** *“找我附近有 500 卡路里以下沙拉的餐厅，并展示选项。”*
- **为多人计划：** *“我今晚要在 Bryant Park 附近见 3 个朋友。找一家素食选择不错的地方，并展示菜单。”*
- **探索新社区：** *“我刚搬到 Williamsburg。Bedford Ave 步行范围内最好的餐厅有哪些？”*
- **注重预算的点单：** *“找时代广场附近 12 美元以下的午餐特价。”*
