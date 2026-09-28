---
description: 通过涵盖提示、参数和 MCP 服务器的完整教程，学习如何创建和使用 goose 配方
---

# 配方

goose 配方是包含全部细节的文件，让 goose 完成一项特定任务。由于它们只包含在一个文件中，因此很容易通过我们平时分享文件的所有方式分享，包括 git 这类版本管理系统。让我们从最简单的配方开始。

## 最简单的配方

最简单的配方基本上就是一条提示。这看起来也许没那么有用——毕竟我可以直接在 Slack 或邮件里分享提示——但事实证明，用户无法让智能体按自己的意愿工作，最重要的原因是提示太短，而且他们在这些提示上迭代得不够。把提示放在文本文件里，对这两点都有帮助。

下面是一个规划欧洲旅行的配方：

```yaml
title: Trip planner
description: Plan your next trip
prompt: |
 Help the user plan a trip to Europe for 14 days.
 Create a detailed itinerary that includes:
  - places to visit
  - activities to do
  - local cuisine to try
  - a rough budget estimate
```

你可以从命令行运行它：

```sh
goose run --recipe trip.yaml
```

## 扩展

goose 配方有一个部分，可以指定执行期间 goose 可以使用哪些[扩展](/docs/guides/recipes/recipe-reference#extensions)。goose 只会使用你指定的那些。

假设我们想确保欧洲之行期间天气良好。我们可以在配方中加入一个天气扩展（本示例使用 TuanKiri 在 MIT 许可下的 [weather-mcp-server](https://github.com/TuanKiri/weather-mcp-server)），稍微修改提示，goose 就会在把城市加入行程之前检查天气。

```yaml
title: Trip planner
description: Plan your next trip
prompt: |
 Help the user plan a trip to Europe for 14 days. Create a detailed itinerary that includes:
  - places to visit
  - activities to do
  - local cuisine to try
  - a rough budget estimate
 Ensure that the user has good weather throughout their trip. Optimize their trip based on the forecast in potential locations.
extensions:
  - type: stdio
    name: weathermcpserver
    cmd: /Users/svega/Development/weather-mcp-server/weather-mcp-server
    args: []
    timeout: 300
    description: "Weather data for trip planning"
    env_keys:
      - WEATHER_API_KEY
```

## 参数

我们可以通过添加参数让配方动态化。参数是由配方使用者提供的变量。每个参数都有数据类型，以及一个需求字段，定义它们是必需、可选，还是由用户提供。我们可以通过为目的地和行程长度添加参数，把旅行配方泛化：

```yaml
parameters:
  - key: destination
    input_type: string
    requirement: required
    description: Destination for the trip. Should be a large region with multiple climates.
  - key: duration
    input_type: number
    requirement: required
    description: Number of days for the trip.
```

配方使用模板系统，让你可以插入 `{{ destination }}` 这类变量，它们会被你提供的实际值填充。用正确的细节更新提示后，可以这样运行新配方，得到一次 14 天非洲之行的计划：

```sh
goose run --recipe trip.yaml --params destination=Africa --params duration=14
```


## 设置

默认情况下，goose 使用你已经选择的 `temperature` 和 `model`，这通常就够了。但有时你可能想要更多控制。例如，在规划旅行这类主观任务中，调高 `temperature` 设置会有帮助。可以把 temperature 想象成创造力旋钮——越高，结果就越多样、越出乎意料。如果第一个建议不太对，用户只需再次运行配方就能得到一个新的。

你也可以为特定配方指定使用哪个 AI provider 和模型：

```yaml
settings:
  goose_provider: "anthropic"
  goose_model: "claude-sonnet-4-20250514"
  temperature: 0.8
```

可用的设置有：
- `goose_provider`：AI provider（例如 "anthropic"、"openai"）
- `goose_model`：具体模型名称
- `temperature`：控制创造力/随机性（0.0-1.0，越高越有创造性）

运行此配方时，这些设置会覆盖你的默认 goose 配置。

## 外部文件

有时你会希望给智能体额外信息，又不想把所有数据都塞进提示。不必把一切粘贴进去，你可以把数据放在单独的文件中，并让配方指向它。

为此，配方包含一个内置变量 `{{ recipe_dir }}`，让你可以引用与配方存放在一起的文件。例如，你可以从 [Kaggle](https://www.kaggle.com/datasets/ramjasmaurya/unesco-heritage-sites2021?resource=download) 下载联合国教科文组织名录，并在旅行规划配方中使用它。

然后我们在提示中这样引用该文件：

```yaml
prompt: |
 You can use the \{\{ recipe_dir \}\}/unesco.csv file to 
 check information on UNESCO world heritage sites to
 include in your travel plan.
```

我们还需要指定一个用于读取文件的扩展：

```yaml
extensions:
 - type: builtin
   name: developer
   display_name: Developer
   timeout: 300
   bundled: true
```

这里我们添加 [Developer 扩展](/docs/mcp/developer-mcp)，它提供读取文件以获取相关信息的能力。

:::info 配方输出示例

<details>
<summary>查看详细的 10 日欧洲行程</summary>

根据联合国教科文组织世界遗产信息以及当前天气预报，下面是一份详细的 10 日欧洲行程：

# 10 日欧洲探险行程

这份行程带你走遍欧洲三个最美丽、文化最丰富的国家：法国、意大利和捷克共和国。你将体验世界级博物馆、联合国教科文组织世界遗产、美味料理和充满活力的本地文化。

#### 第 1–3 天：法国巴黎 🇫🇷

**第 1 天：抵达巴黎**
- **上午**：抵达戴高乐机场，转往酒店
- **下午**：沿塞纳河悠闲散步，参观巴黎圣母院（因重建仅看外观）
- **晚上**：在拉丁区用餐（预算：30–40 欧元）
  - 试试经典的法式洋葱汤和红酒炖鸡

**天气预报**：气温宜人，约 27°C（81°F），局部多云

**第 2 天：巴黎亮点**
- **上午**：参观卢浮宫（预算：17 欧元）
- **下午**：探索杜乐丽花园和香榭丽舍大街
- **晚上**：在埃菲尔铁塔观看日落（预算：登顶 26.80 欧元）
  - 在特罗卡德罗附近用餐（预算：35–45 欧元）
  - 试试蜗牛和勃艮第红酒炖牛肉

**天气预报**：温暖，31°C（88°F），晴朗

**第 3 天：凡尔赛一日游**
- **上午**：前往凡尔赛宫一日游，联合国教科文组织世界遗产（预算：宫殿门票 21 欧元）
- **下午**：探索宏伟的花园
- **晚上**：返回巴黎，在蒙马特用餐（预算：30–40 欧元）
  - 试试可丽饼和油封鸭

**天气预报**：温暖，30°C（86°F），有小雨可能

#### 第 4–6 天：意大利罗马 🇮🇹

**第 4 天：前往罗马**
- **上午**：从巴黎飞往罗马（预算：100–150 欧元）
- **下午**：入住酒店，探索西班牙阶梯和特莱维喷泉
- **晚上**：在特拉斯提弗列街区用餐（预算：25–35 欧元）
  - 试试正宗的奶酪胡椒意面和卡波纳拉

**天气预报**：炎热，35°C（95°F），晴朗

**第 5 天：古罗马**
- **上午**：参观斗兽场和罗马广场（预算：联票 16 欧元）
- **下午**：帕拉蒂尼山和马克西穆斯竞技场
- **晚上**：在鲜花广场附近用餐（预算：30–40 欧元）
  - 试试罗马式披萨和罗马式盐渍小牛肉卷

**天气预报**：炎热，35°C（95°F），大体晴朗

**第 6 天：梵蒂冈**
- **上午**：梵蒂冈博物馆和西斯廷教堂（预算：17 欧元）
- **下午**：圣彼得大教堂和广场（联合国教科文组织世界遗产）
- **晚上**：在普拉蒂区用餐（预算：30–40 欧元）
  - 试试炸饭团和米兰式炖牛膝

**天气预报**：炎热，34°C（93°F），局部多云

#### 第 7–10 天：捷克共和国布拉格 🇨🇿

**第 7 天：前往布拉格**
- **上午**：从罗马飞往布拉格（预算：100–150 欧元）
- **下午**：入住酒店，探索老城广场
- **晚上**：在老城用餐（预算：20–30 欧元）
  - 试试传统炖牛肉和腌牛肉配奶油酱

**天气预报**：宜人，29°C（84°F），局部多云

**第 8 天：布拉格城堡和小城区**
- **上午**：参观布拉格城堡建筑群（联合国教科文组织世界遗产）（预算：250 捷克克朗/10 欧元）
- **下午**：探索小城区和查理大桥
- **晚上**：在伏尔塔瓦河景用餐（预算：25–35 欧元）
  - 试试烟囱卷和烤鸭配饺子

**天气预报**：较凉，22°C（72°F），可能有雷暴

**第 9 天：犹太区和文化景点**
- **上午**：参观犹太区（Josefov）和犹太会堂
- **下午**：市民会馆和火药塔
- **晚上**：带表演的传统捷克民俗晚餐（预算：35–45 欧元）
  - 试试捷克啤酒和可丽饼点心

**天气预报**：宜人，24°C（75°F），大体晴朗

**第 10 天：离开**
- **上午**：在布拉格精品店做最后购物
- **下午**：转往机场搭乘离境航班

**天气预报**：宜人，24°C（75°F），大体晴朗

#### 预算明细（每人）

**住宿（9 晚）**
- 巴黎：120 欧元/晚 × 3 晚 = 360 欧元
- 罗马：100 欧元/晚 × 3 晚 = 300 欧元
- 布拉格：80 欧元/晚 × 3 晚 = 240 欧元
- **住宿合计**：900 欧元

**交通**
- 往返欧洲的国际航班：600–800 欧元（因出发地而异）
- 巴黎到罗马航班：100–150 欧元
- 罗马到布拉格航班：100–150 欧元
- 当地交通（地铁、公交、有轨电车）：15 欧元/天 × 10 天 = 150 欧元
- **交通合计**：950–1,250 欧元

**景点与活动**
- 巴黎博物馆和景点：100 欧元
- 罗马博物馆和景点：80 欧元
- 布拉格博物馆和景点：70 欧元
- **景点合计**：250 欧元

**餐饮**
- 早餐：10 欧元/天 × 10 天 = 100 欧元
- 午餐：15 欧元/天 × 10 天 = 150 欧元
- 晚餐：35 欧元/天 × 10 天 = 350 欧元
- 零食和饮料：10 欧元/天 × 10 天 = 100 欧元
- **餐饮合计**：700 欧元

**杂项**
- 旅行保险：50 欧元
- 纪念品和购物：200 欧元
- 应急资金：150 欧元
- **杂项合计**：400 欧元

**总计**
- 每人 **3,200–3,500 欧元**（不含往返欧洲的国际航班）

#### 包含的联合国教科文组织世界遗产
- 凡尔赛宫及其园林（法国）
- 罗马历史中心（意大利）
- 梵蒂冈城（意大利）
- 布拉格历史中心（捷克共和国）

#### 旅行提示
1. **天气**：根据预报，所有目的地都按温暖天气打包，气温约 20–35°C（68–95°F）。布拉格较凉的夜晚带一件薄外套。
2. **货币**：法国和意大利用欧元（€），捷克共和国用捷克克朗（CZK）。
3. **交通**：在每个城市购买地铁/公共交通通票以省钱。
4. **预订**：提前预订主要景点以避免长队，尤其是卢浮宫、梵蒂冈博物馆和埃菲尔铁塔。
5. **饮水**：随身携带可重复灌装的水瓶，尤其是在气温很高的罗马。
6. **语言**：每种语言学几句基本用语，不过旅游区广泛使用英语。

这份行程在三个不同的欧洲地区提供了历史、文化和美食的完美结合。天气应该非常适合观光，大多是晴天和温暖的气温。祝你的欧洲探险愉快！

</details>

:::

## 了解更多
查看[配方](/docs/guides/recipes)指南，获取更多文档、工具和资源，帮助你掌握 goose 配方。
