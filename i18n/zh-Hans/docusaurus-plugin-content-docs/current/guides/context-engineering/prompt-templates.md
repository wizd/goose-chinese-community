---
sidebar_position: 6
title: 自定义提示词模板
sidebar_label: 提示词模板
description: 了解如何自定义定义 goose 在不同情境下行为的提示词模板
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PanelLeft } from 'lucide-react';

goose 带有内置提示词模板，用于引导它在不同情境下的行为。你可以编辑这些模板，自定义 goose 如何回应、如何制定计划、在压缩时决定保留什么，等等。

## 工作方式

goose 的默认提示词模板定义在代码库中并嵌入应用。你可以在本地配置目录中创建自定义版本来覆盖任何默认模板（直接编辑，或通过 goose 桌面版）。

自定义模板时：

- 你的自定义会在 goose 更新后保留
- 代码库中默认模板的变更不会影响你已自定义的模板
- 你可以随时重置为默认模板
- 变更在新会话中生效

改动可以很大，也可以只是细微调整，例如：
- 编辑 `system.md`，加入“用荷兰语回复”的指令，让 goose 用荷兰语回应
- 编辑 `compaction.md`，加入“保留每一个文件路径和已运行的命令”的指令，以便摘要时保留更多细节

修改模板变量的重要信息见[模板变量语法](#template-variable-syntax)。

:::info 相关配置
其他 goose 设置和功能也会影响行为或提供上下文，例如[配置文件](/docs/guides/config-files)、[.goosehints](/docs/guides/context-engineering/using-goosehints)和[技能](/docs/guides/context-engineering/using-skills)。
:::

## 管理提示词模板

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  
  goose 桌面版用户可以从 `Settings` 页面管理模板。

  **自定义模板：**

  1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
  2. 在侧边栏中点击 `Settings`
  3. 点击 `Prompts` 选项卡
  4. 在要更改的模板旁点击 `Edit`
  5. 在编辑器中修改。你可以随时点击 `Restore Default`，从默认模板重新开始。
  6. 点击 `Save` 应用自定义

  已自定义的提示词模板会显示 `Customized` 徽章。

  **把模板重置为默认：**

  1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
  2. 在侧边栏中点击 `Settings`
  3. 点击 `Prompts` 选项卡
  4. 在要重置的模板旁点击 `Edit`
  5. 点击 `Reset to Default` 删除本地模板文件

  或者点击选项卡顶部的 `Reset All`，删除你的全部本地模板文件。

  </TabItem>
  <TabItem value="cli" label="goose CLI">

  goose CLI 用户可以直接在文件系统中编辑模板文件。

  自定义模板存储在：

  - **macOS/Linux：** `~/.config/goose/prompts/`
  - **Windows：** `%APPDATA%\Block\goose\config\prompts\`

  **自定义模板：**

  1. 如果 `prompts` 目录不存在，请创建它
  2. 从上方表格复制模板文件名（例如 `system.md`）
  3. 在 prompts 目录中创建同名文件
  4. 添加自定义内容并保存。建议先查看或复制默认模板（链接见上方[表格](#available-prompt-templates)）。

  **把模板重置为默认：**

  1. 从 `prompts` 目录中删除该模板文件

  </TabItem>
</Tabs>

### 可用的提示词模板

以下默认模板可以自定义。

| 模板 | 说明 | 适用于 |
|----------|-------------|------------|
| [system.md](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/prompts/system.md) | 定义 goose 角色、能力和回复格式的通用系统提示词 | 桌面版和 CLI |
| [apps_create.md](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/prompts/apps_create.md) | 用于生成新的独立应用的提示词（开发中） | 仅桌面版 |
| [apps_iterate.md](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/prompts/apps_iterate.md) | 用于更新现有独立应用的提示词（开发中） | 仅桌面版 |
| [compaction.md](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/prompts/compaction.md) | 在达到上下文限制时用于摘要对话历史的提示词 | 桌面版和 CLI |
| [permission_judge.md](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/prompts/permission_judge.md) | 用于分析工具操作以检测只读行为的提示词 | 桌面版和 CLI |
| [subagent_system.md](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/prompts/subagent_system.md) | 为处理特定任务而生成的子代理的系统提示词 | 桌面版和 CLI |
| [tiny_model_system.md](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/prompts/tiny_model_system.md) | 面向使用 shell 命令模拟的小型本地模型的系统提示词 | CLI |
| [session_name.md](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/prompts/session_name.md) | 用于根据对话历史生成简短会话名称的提示词 | 桌面版和 CLI |

可自定义模板列举在 [`prompt_template.rs`](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/prompt_template.rs) 的 `TEMPLATE_REGISTRY` 数组中。

### 模板变量语法

模板使用 [Jinja2](https://jinja.palletsprojects.com/) 语法表示动态内容：

- `{{ variable }}` - 插入一个值（例如 `{{ extensions }}` 列出已启用的扩展）
- `{% if condition %}...{% endif %}` - 条件段落
- `{% for item in list %}...{% endfor %}` - 遍历条目

查看默认模板（链接见上方[表格](#available-prompt-templates)）以找到常见变量，例如 `{{ extensions }}` 和 `{{ hints }}`。

#### 转义模板变量

如果需要在模板中包含字面变量语法而不进行替换，用单引号包起来：

```markdown
This will substitute: {{ variable }}
This will appear literally: {{'{{variable}}'}}
```

:::warning
修改模板变量时要小心，不正确的更改可能破坏功能。在新会话中测试你的更改，确保它们按预期工作。
:::

## 更多资源

import ContentCardCarousel from '@site/src/components/ContentCardCarousel';
import promptBanner from '@site/blog/2025-03-19-better-ai-prompting/prompt.png';

<ContentCardCarousel
  items={[
    {
      type: 'blog',
      title: 'AI 提示入门：如何从 AI 代理获得更好的回应',
      description: '了解不同的提示风格——从基于指令到思维链——并发现哪种方法最适合你的需求。',
      thumbnailUrl: promptBanner,
      linkUrl: '/blog/2025/03/19/better-ai-prompting',
      date: '2025-03-19',
      duration: '阅读 8 分钟'
    }
  ]}
/>
