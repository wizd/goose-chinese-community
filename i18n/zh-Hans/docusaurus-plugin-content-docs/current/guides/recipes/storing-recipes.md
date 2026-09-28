---
title: 保存配方
sidebar_position: 4
sidebar_label: 保存配方
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PanelLeft, ChefHat } from 'lucide-react';

本指南说明如何存储、整理和查找 goose 配方，以便稍后再次访问。

:::info 桌面 UI 与 CLI
- **goose 桌面版**有可视化的配方库，用于浏览和管理已保存的配方
- **goose CLI** 把配方存为文件，你通过文件路径或环境变量来查找
:::

## 理解配方存储

保存配方之前，重要的是理解它们可以存在哪里，以及这如何影响可用性。

### 配方存储位置

| 类型 | 位置 | 可用性 | 最适合 |
|------|----------|-------------|----------|
| **全局** | `~/.config/goose/recipes/` | 所有项目和会话 | 个人工作流、通用配方 |
| **本地** | `YOUR_WORKING_DIRECTORY/.goose/recipes/` | 仅在该项目中工作时 | 项目特定工作流、团队配方 |

**在以下情况选择全局存储：**
- 你希望配方在所有项目中可用
- 它是个人工作流或通用配方
- 你是该配方的主要使用者

**在以下情况选择本地存储：**
- 配方针对特定项目
- 你与团队协作并希望分享该配方
- 配方依赖项目特定的文件或配置


## 存储配方

<Tabs groupId="interface">
  <TabItem value="desktop" label="goose Desktop" default>

**保存新配方：**

1. 从侧边栏打开 `Recipes` 并点击 `Create Recipe`
2. 完成配方编辑器，然后点击 `Save Recipe` 把它保存到配方库

**保存修改后的配方：**

如果你已经在使用某个配方，并想保存修改后的版本：
1. 点击应用底部的 <ChefHat className="inline" size={16}/> 按钮，它在你发送第一条消息后出现
2. 按需要编辑指令、提示词或其他字段
3. 点击 `Save Recipe`

:::info
当你用新名称修改并保存配方时，会生成新的配方和新链接。你仍可以从配方库或使用原始链接运行原始配方。如果你编辑配方但不更改名称，配方库中的版本会更新，但你仍可以通过链接运行原始配方。
:::

  </TabItem>
  <TabItem value="cli" label="goose CLI">

    用你喜欢的编辑器创建配方文件。把项目特定配方存在 `.goose/recipes/`，全局配方存在 `~/.config/goose/recipes/`。CLI 可以运行 YAML 或 JSON 格式的配方。

  </TabItem>
</Tabs>

### 导入配方

<Tabs groupId="interface">
  <TabItem value="desktop" label="goose Desktop" default>
    使用深层链接或配方文件导入配方：

    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
    2. 在侧边栏中点击 `Recipes`
    3. 点击 `Import Recipe`
    4. 选择导入方式：
       - 通过链接导入：在 `Recipe Deeplink` 下粘贴[配方链接](/docs/guides/recipes/session-recipes#share-via-recipe-link)
       - 通过文件导入：在 `Recipe File` 下点击 `Choose File`，选择配方文件，然后点击 `Open`
    5. 点击 `Import Recipe`，把配方的副本保存到配方库

  :::warning 配方文件格式
  goose 桌面版接受 `.yaml`、`.yml` 和 `.json` 文件，但 **CLI 只支持 `.yaml` 和 `.json`**。为了两个界面完全兼容，请避免使用 `.yml` 扩展名。

  所有配方格式都遵循相同的[模式结构](/docs/guides/recipes/recipe-reference#core-recipe-schema)。
  :::

  </TabItem>
  <TabItem value="cli" label="goose CLI">
    配方导入仅在 goose 桌面版中可用。
  </TabItem>
</Tabs>

## 查找可用配方

<Tabs groupId="interface">
  <TabItem value="desktop" label="goose Desktop" default>

**访问配方库：**
1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
2. 点击 `Recipes` 查看配方库
3. 浏览可用配方，它们会显示：
   - 配方标题和描述
   - 最后修改日期
   - 存储在全局还是本地

:::info 桌面版与 CLI 的配方发现
桌面版配方库显示你明确保存或导入的所有配方。它不会像 CLI 那样自动从文件系统发现配方文件。
:::

  </TabItem>
  <TabItem value="cli" label="goose CLI">

使用 `goose recipe list` 命令从多个来源查找所有可用配方：

**基本用法**

```bash
# List all available recipes
goose recipe list

# Show detailed information including titles and full paths
goose recipe list --verbose

# Output in JSON format for automation
goose recipe list --format json
```

**配方发现过程**

goose 按以下位置（按顺序）搜索配方：

1. **当前目录**：`.`（查找 `*.yaml` 和 `*.json` 文件）
2. **自定义路径**：[`GOOSE_RECIPE_PATH`](/docs/guides/environment-variables#recipe-configuration) 环境变量中指定的目录
3. **全局配方库**：`~/.config/goose/recipes/`（或你的操作系统上的等效位置）
4. **本地项目配方**：`./.goose/recipes/`
5. **GitHub 仓库**：如果配置了 [`GOOSE_RECIPE_GITHUB_REPO`](/docs/guides/environment-variables#recipe-configuration) 环境变量

**示例输出**

*默认文本格式：*
```bash
$ goose recipe list
Available recipes:
goose-self-test - A comprehensive meta-testing recipe - local: ./goose-self-test.yaml
hello-world - A sample recipe demonstrating basic usage - local: ~/.config/goose/recipes/hello-world.yaml
job-finder - Find software engineering positions - local: ~/.config/goose/recipes/job-finder.yaml
```

*详细模式：*
```bash
$ goose recipe list --verbose
Available recipes:
  goose-self-test - A comprehensive meta-testing recipe - local: ./goose-self-test.yaml
    Title: goose Self-Testing Integration Suite
    Path: ./goose-self-test.yaml
  hello-world - A sample recipe demonstrating basic usage - local: ~/.config/goose/recipes/hello-world.yaml
    Title: Hello World Recipe
    Path: /Users/username/.config/goose/recipes/hello-world.yaml
```

*用于自动化的 JSON 格式：*
```json
[
  {
    "name": "goose-self-test",
    "source": "Local",
    "path": "./goose-self-test.yaml",
    "title": "goose Self-Testing Integration Suite",
    "description": "A comprehensive meta-testing recipe"
  },
  {
    "name": "hello-world",
    "source": "GitHub",
    "path": "recipes/hello-world.yaml",
    "title": "Hello World Recipe",
    "description": "A sample recipe demonstrating basic usage"
  }
]
```

**配置配方来源**

添加自定义配方目录：
```bash
export GOOSE_RECIPE_PATH="/path/to/my/recipes:/path/to/team/recipes"
goose recipe list
```

配置 GitHub 配方仓库：
```bash
export GOOSE_RECIPE_GITHUB_REPO="myorg/goose-recipes"
goose recipe list
```

更多配置选项见[环境变量指南](/docs/guides/environment-variables#recipe-configuration)。

**手动浏览目录（高级）**

如果需要手动浏览配方目录：

```bash
# List recipes in default global location
ls ~/.config/goose/recipes/

# List recipes in current project
ls .goose/recipes/

# Search for all recipe files
find . -name "*.yaml" -path "*/recipes/*" -o -name "*.json" -path "*/recipes/*"
```

:::tip
`goose recipe list` 命令是查找配方的推荐方式，因为它会自动搜索所有已配置的来源，并提供一致的格式。
:::

  </TabItem>
</Tabs>

## 使用已保存的配方

<Tabs groupId="interface">
  <TabItem value="desktop" label="goose Desktop" default>

1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
2. 点击 `Recipes`
3. 在配方库中找到你的配方
4. 选择以下之一：
   - 点击 `Use` 立即运行
   - 点击 `Preview` 先查看配方细节，然后点击 **加载配方** 来运行

  </TabItem>
  <TabItem value="cli" label="goose CLI">

找到配方文件后，[运行配方](/docs/guides/recipes/session-recipes#run-a-recipe)或[在 goose 桌面版中打开它](/docs/guides/goose-cli-commands#recipe)。

:::tip 格式兼容
CLI 可以运行从 goose 桌面版保存的配方，无需任何转换。CLI 创建的配方和桌面版保存的配方都适用于所有配方命令。
:::

  </TabItem>
</Tabs>
