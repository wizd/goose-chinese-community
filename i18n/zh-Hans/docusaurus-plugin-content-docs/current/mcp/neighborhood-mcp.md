---
title: Neighborhood 扩展
description: 把 Neighborhood 添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/qY2i83l6dCQ" />

直接在 goose 对话里向附近餐厅点餐。目前商家位于美国。

本教程介绍如何配置 Neighborhood 扩展，并用它发现附近餐厅、浏览菜单、组建购物车并结账。全程通过和 goose 的自然对话完成。

## 快速安装

:::tip
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [安装 Neighborhood 扩展](goose://extension?type=streamable_http&url=https%3A%2F%2Fconnect.squareup.com%2Fv2%2Fmcp%2Fneighborhood&id=neighborhood&name=Neighborhood&description=Discover%20nearby%20restaurants%2C%20browse%20menus%2C%20and%20place%20takeout%20orders%20through%20natural%20conversation.)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  使用 `goose configure` 添加 `Remote Extension (Streamable HTTP)`，并填写：

  **端点 URL**

  ```
  https://connect.squareup.com/v2/mcp/neighborhood
  ```
  </TabItem>
</Tabs>
:::

## 配置

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="neighborhood"
      extensionName="Neighborhood"
      description="Discover nearby restaurants, browse menus, and place takeout orders through natural conversation."
      type="http"
      url="https://connect.squareup.com/v2/mcp/neighborhood"
    />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Neighborhood"
      description="Discover nearby restaurants, browse menus, and place takeout orders through natural conversation."
      type="http"
      url="https://connect.squareup.com/v2/mcp/neighborhood"
    />
  </TabItem>
</Tabs>

## 使用示例

Neighborhood 最有用的时候，是 goose 把它和你当天的上下文结合起来：日程、目标和饮食需求。你可以让 goose 根据你正在做的事来判断该吃什么，而不只是搜餐厅。

:::info 大模型
本示例使用了 Anthropic 的 Claude 4 Opus。
:::

### 第 1 步：找附近的餐厅

让 goose 找附近的午餐选择。可以带上位置、饮食限制，以及你接下来要做什么。goose 会把这些都考虑进去。

**提示词：**
```
用 neighborhood 扩展来处理。我今天想吃午饭。
我在纽约 375 W Broadway。今晚稍后要打网球。
能不能推荐一些让我打得更好的选择？
```

<details>
<summary>goose 输出</summary>

```
我来找找你附近的餐厅。

375 W Broadway（SoHo）附近有这些餐厅。赛前补充能量，我推荐：

适合清淡、无麸质的选择：

Ba'al Falafel（71 Sullivan St）：地中海菜，有法拉费、鹰嘴豆泥和新鲜蔬菜，碳水加蛋白质都不错

Kale & Things：适合营养密度高的一餐，绿叶菜和瘦蛋白能持续供能，又不会吃得太撑

运动前进食建议：

- 开打前 2–3 小时吃，留出消化时间
- 以复合碳水和瘦蛋白为主，避开油腻厚重的食物
- 注意补水，可以考虑从 Steam & Sip 或 Drip Drop Café 买一杯饮料

需要我打开其中某家的菜单吗？
```

</details>

goose 会用 Neighborhood 扩展的交互界面，在对话里直接展示餐厅卡片。每张卡片包含名称、品类和地址，以及 **View menu** 按钮。

[![goose 中以交互卡片展示的附近餐厅](/img/neighborhood-restaurants-1.png)](/img/neighborhood-restaurants-1.png)

goose 不会只罗列餐厅，还会按你的情况调整推荐。因为你提到稍后要打网球，它会建议有能量但不太油腻的餐食，并附上赛前进食时间的建议。

[![针对赛前用餐的餐厅推荐回复](/img/neighborhood-restaurants-2.png)](/img/neighborhood-restaurants-2.png)

点击任意餐厅即可查看菜单。

### 第 2 步：浏览菜单

让 goose 打开某一家餐厅的菜单。交互式 MCP 应用会在对话里直接渲染完整可浏览的菜单，包括分类标签、菜品照片、价格和描述。

**提示词：**
```
我想看 Ba'al Falafel 的菜单。
```

[![goose 中展示的 Ba'al Falafel 菜单，含分类标签、照片、价格和描述](/img/neighborhood-menu.png)](/img/neighborhood-menu.png)

可以浏览全部菜品：Sandwiches、Salads、Combo platters、Soups、Pastries、Sides、Drinks 等。看到想点的，让 goose 加进购物车。

### 第 3 步：加入购物车并结账

告诉 goose 你想点什么，它会把商品加进购物车。推荐时也会考虑你的饮食偏好。

**提示词：**
```
帮我把 Beets Apple Salad、Lentil Soup 和 Ginger Lemonade 加进购物车。
```

[![含商品、小计和结账按钮的订单摘要](/img/neighborhood-cart.png)](/img/neighborhood-cart.png)

购物车已经准备好。点击 **Check out** 按钮，会直接进入由 Cash App 提供的支付页面。完成付款后，去取午餐就行。🎉

### 更多提示词思路

可以把 Neighborhood 和其他 goose 扩展搭配，做出更实用的工作流：

- **配合日历：** *「看一下我今天的日历，在下午 1 点的会议之前，找个我能快速取餐的地方。我在 Union Square 附近。」*
- **记录饮食：** *「从 Sullivan St 那家店给我点一份鸡肉碗，并把宏量营养素记到我的饮食日记里。」*
- **为聚会做计划：** *「今晚我要在 Bryant Park 附近见 3 个朋友。找个素食选择不错、又不太吵的地方。」*

## 视频演示

观看 Neighborhood 扩展的完整演示：

<iframe
  class="aspect-ratio"
  src="https://www.youtube.com/embed/DG1HUFsekyc"
  title="Neighborhood 扩展"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
