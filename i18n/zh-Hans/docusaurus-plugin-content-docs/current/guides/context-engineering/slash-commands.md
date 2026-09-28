---
sidebar_position: 4
title: 自定义斜杠命令
sidebar_title: 斜杠命令
description: "创建自定义快捷方式，在任意 goose 聊天会话中快速应用可复用指令"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PanelLeft, Terminal } from 'lucide-react';

自定义斜杠命令是运行[配方](/docs/guides/recipes)的个性化快捷方式。如果你有一个生成每日报告的配方，可以创建自定义斜杠命令，在会话中调用它：

```
/daily-report
```


## 创建斜杠命令

为配方指定一条自定义命令。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
   1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
   2. 在侧边栏中点击 `Recipes`
   3. 找到要使用的配方，点击 <Terminal className="inline" size={16} /> 按钮
   4. 在弹出的对话框中输入自定义命令（不要带前导 `/`）
   5. 点击 `Save`
 
  该命令会显示在 `Recipes` 菜单中该配方的下方。对于不在配方库中的配方，请按 `goose CLI` 的步骤操作。

  </TabItem>
  <TabItem value="cli" label="goose CLI">

  在[配置文件](/docs/guides/config-files)中配置斜杠命令。列出命令（不要带前导 `/`）以及计算机上配方文件的路径：

```yaml title="~/.config/goose/config.yaml"
slash_commands:
  - command: "run-tests"
    recipe_path: "/path/to/recipe.yaml"
  - command: "daily-report"
    recipe_path: "/Users/me/.local/share/goose/recipes/report.yaml"
```

   </TabItem>
</Tabs>

## 使用斜杠命令

在任意聊天会话中，在消息开头输入带前导斜杠的自定义命令：

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>

```
/run-tests
```

:::tip 可用命令
在 goose 桌面版中输入 `/` 会弹出可用斜杠命令的菜单。
:::

  </TabItem>
  <TabItem value="cli" label="goose CLI">

```sh
Context: ●○○○○○○○○○ 5% (9695/200000 tokens)
( O)> /run-tests
```

  </TabItem>
</Tabs>

如有需要，可以在命令后传递一个参数。引号可选：

```
/translator where is the library
```

通过斜杠命令运行配方时，配方的 instructions 和 prompt 字段会发送给你的模型并载入对话，但不会显示在聊天中。模型会使用配方的上下文和指令做出回应，就像你直接打开该配方一样。

## 限制

- 斜杠命令只接受一个[参数](/docs/guides/recipes/recipe-reference#parameters)。配方中的其他参数必须有默认值。
- 命令名不区分大小写（`/Bug` 和 `/bug` 视为同一命令）。
- 命令名必须唯一，且不能包含空格。
- 不能使用与[内置 CLI 斜杠命令](/docs/guides/goose-cli-commands#slash-commands)冲突的名称，例如 `/compact` 或 `/help`。
- 如果配方文件缺失或无效，该命令会被当作发送给模型的普通文本。

## 更多资源

import ContentCardCarousel from '@site/src/components/ContentCardCarousel';

<ContentCardCarousel
  items={[
    {
      type: 'topic',
      title: '配方',
      description: '查看配方指南，获取更多文档、工具和资源，帮助你掌握 goose 配方。',
      linkUrl: '/docs/guides/recipes'
    },
    {
      type: 'topic',
      title: '研究 → 计划 → 实现模式',
      description: '了解斜杠命令如何让指令轻松融入交互式 RPI 工作流。',
      linkUrl: '/docs/tutorials/rpi'
    }
  ]}
/>
