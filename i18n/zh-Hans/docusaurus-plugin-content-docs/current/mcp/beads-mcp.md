---
title: Beads 扩展
description: 将 Beads MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';

<!-- <YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/VIDEO_ID" /> -->

本教程介绍如何将 [Beads MCP 服务器](https://github.com/steveyegge/beads) 添加为 goose 扩展。Beads 是为 AI 代理设计的分布式、以 git 为后端的议题跟踪器。它支持带依赖管理的持久任务跟踪，因此多个 goose 会话可以在复杂项目上协调工作。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=uvx&arg=beads-mcp&id=beads&name=Beads&description=Git-backed%20issue%20tracker%20for%20AI%20agent%20task%20management)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  uvx beads-mcp
  ```
  </TabItem>
</Tabs>
:::

## 配置

:::info
运行此命令需要在系统上安装 [uv](https://docs.astral.sh/uv/#installation)，因为它使用 `uvx`。
:::

:::note 故障排除
如果扩展启动失败并报 `ModuleNotFoundError: No module named 'packaging'`（已在 0.49.1 之后的版本中修复），请运行：
```sh
uv tool install beads-mcp --with packaging
```
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="beads"
      extensionName="Beads"
      description="面向 AI 代理任务管理、以 Git 为后端的议题跟踪器"
      type="stdio"
      command="uvx"
      args={["beads-mcp"]}
    />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="beads"
      description="面向 AI 代理任务管理、以 Git 为后端的议题跟踪器"
      type="stdio"
      command="uvx beads-mcp"
      timeout={300}
    />
  </TabItem>
</Tabs>

## 使用示例

在这个示例中，我们将用 Beads 在**多个并行会话**中协调构建一个支出跟踪 Web 应用。这展示了 Beads 如何让多个 goose 实例在同一项目上工作而不会冲突。

### 概览

我们将运行 **4 个 goose 会话**：
1. **第 1 步**：创建所有带依赖的任务
2. **第 2 步**：构建前端任务
3. **第 3 步**：构建后端任务（与第 2 步并行）
4. **第 4 步**：等待阻塞项，然后把一切接起来

---

### 第 1 步：规划项目

创建一个新目录并启动 goose 会话。

#### goose 提示词
```
我想构建一个支出跟踪 Web 应用。初始化 beads，并创建所有带依赖的任务：

前端任务：
- “HTML Structure” - 创建表单、支出列表、总额显示（无依赖）
- “CSS Styling” - 为应用添加样式（依赖于 “HTML Structure”）
- “Wire Up UI” - 把按钮连接到函数（依赖于 “CSS Styling” 以及所有后端任务）

后端任务：
- “Storage Setup” - 用于保存/加载支出的 localStorage 辅助函数（无依赖）
- “Add Expense” - 把支出添加到存储的函数（依赖于 “Storage Setup”）
- “Calculate Total” - 对所有支出求和的函数（依赖于 “Storage Setup”）
- “Delete Expense” - 删除支出的函数（依赖于 “Storage Setup”）

给我看所有任务，以及哪些已经可以开始做。
```

#### goose 输出
```
我将初始化 beads，并创建所有带依赖的任务。

─── context | beads ──────────────────────────
action: init

─── create | beads ──────────────────────────
title: HTML Structure
description: 为支出跟踪应用创建表单、支出列表和总额显示
labels: frontend

─── create | beads ──────────────────────────
title: Storage Setup
description: 创建用于保存/加载支出的 localStorage 辅助函数
labels: backend

─── create | beads ──────────────────────────
title: CSS Styling
deps: ultimate-beads-test-987
description: 用 CSS 为支出跟踪应用添加样式
labels: frontend

─── create | beads ──────────────────────────
title: Add Expense
deps: ultimate-beads-test-6gs
description: 把支出添加到存储的函数
labels: backend

─── create | beads ──────────────────────────
title: Calculate Total
deps: ultimate-beads-test-6gs
description: 对所有支出求和的函数
labels: backend

─── create | beads ──────────────────────────
title: Delete Expense
deps: ultimate-beads-test-6gs
description: 从存储中删除支出的函数
labels: backend

─── create | beads ──────────────────────────
title: Wire Up UI
deps: ultimate-beads-test-vt2, ultimate-beads-test-5x5, ultimate-beads-test-29u, ultimate-beads-test-ae4
description: 把按钮连接到函数，接好完整的 UI
labels: frontend

这是支出跟踪任务的完整概览：

## 📋 全部任务

### 前端任务
| ID | 任务 | 状态 | 被谁阻塞 |
|----|------|------|----------|
| `987` | **HTML Structure** | ✅ 就绪 | - |
| `vt2` | CSS Styling | 🚫 阻塞 | HTML Structure |
| `m7i` | Wire Up UI | 🚫 阻塞 | CSS Styling、Add Expense、Calculate Total、Delete Expense |

### 后端任务
| ID | 任务 | 状态 | 被谁阻塞 |
|----|------|------|----------|
| `6gs` | **Storage Setup** | ✅ 就绪 | - |
| `5x5` | Add Expense | 🚫 阻塞 | Storage Setup |
| `29u` | Calculate Total | 🚫 阻塞 | Storage Setup |
| `ae4` | Delete Expense | 🚫 阻塞 | Storage Setup |

## 📊 依赖图

HTML Structure (987)          Storage Setup (6gs)
       │                      /      |      \
       ▼                     ▼       ▼       ▼
  CSS Styling (vt2)    Add Expense  Calculate  Delete Expense
       │                  (5x5)    Total (29u)    (ae4)
       │                    \        |         /
       └────────────────────────────┼────────┘
                                    ▼
                            Wire Up UI (m7i)

## 🚀 可以开始做的

两个任务没有阻塞，可以立刻开始：

1. **HTML Structure**（前端）
2. **Storage Setup**（后端）

这两个基础任务彼此独立，可以**并行**进行！
```

---

### 第 2 步：构建前端

在同一目录打开一个**新终端**，并启动新的 goose 会话。

#### goose 提示词
```
查看 beads 中的支出跟踪项目。

构建 “HTML Structure” 任务。

完成后，在 beads 中把它标为完成，然后构建 “CSS Styling” 并标为完成。
```

#### goose 输出
```
─── ready | beads ──────────────────────────

📋 就绪的工作（2 个没有阻塞的议题）：
1. [● P2] [task] ultimate-beads-test-987: HTML Structure
2. [● P2] [task] ultimate-beads-test-6gs: Storage Setup

我先构建 HTML Structure 任务。

─── text_editor | developer ──────────────────────────
path: index.html
command: write

HTML Structure 已完成。现在在 beads 中把它标为完成：

─── shell | developer ──────────────────────────
command: bd close ultimate-beads-test-987 -m "Created index.html with expense form, expense list, and total display"

✓ 已关闭 ultimate-beads-test-987

现在构建 CSS Styling 任务：

─── text_editor | developer ──────────────────────────
path: styles.css
command: write

─── shell | developer ──────────────────────────
command: bd close ultimate-beads-test-vt2 -m "Created styles.css with responsive design"

✓ 已关闭 ultimate-beads-test-vt2

让我核实当前状态：

─── shell | developer ──────────────────────────
command: bd ready

📋 就绪的工作（2 个没有阻塞的议题）：
1. [● P2] [task] ultimate-beads-test-29u: Calculate Total
2. [● P2] [task] ultimate-beads-test-ae4: Delete Expense

## ✅ 已完成的任务

### 1. HTML Structure（`ultimate-beads-test-987`）
创建了 `index.html`，包含：
- **支出表单** - 支出名称、金额、类别和日期的输入字段
- **总额显示** - 显示支出总额的区域
- **支出列表** - 带名称、类别、日期、金额和操作表头的表格布局

### 2. CSS Styling（`ultimate-beads-test-vt2`）
创建了 `styles.css`，包含：
- 使用 CSS 自定义属性保持主题一致的**现代设计**
- 支出列表的**响应式网格布局**
- 带断点的**移动端响应式设计**

## 📋 接下来就绪的任务
依赖链已经解除了新工作的阻塞：
1. Calculate Total
2. Delete Expense
```

---

### 第 3 步：构建后端

在同一目录打开**第三个终端**，再启动一个 goose 会话。与第 2 步并行运行。

#### goose 提示词
```
查看 beads 中的支出跟踪项目。

构建 “Storage Setup” 任务并标为完成。

然后构建 “Add Expense”、“Calculate Total” 和 “Delete Expense”，每完成一个就标为完成。
```

#### goose 输出
```
─── ready | beads ──────────────────────────

📋 就绪的工作（2 个没有阻塞的议题）：
1. [● P2] [task] ultimate-beads-test-987: HTML Structure
2. [● P2] [task] ultimate-beads-test-6gs: Storage Setup

我从 Storage Setup 开始。

─── update | beads ──────────────────────────
issue_id: ultimate-beads-test-6gs
status: in_progress

─── text_editor | developer ──────────────────────────
path: storage.js
command: write

─── close | beads ──────────────────────────
issue_id: ultimate-beads-test-6gs
reason: Implemented localStorage helpers: getExpenses, saveExpenses, clearExpenses, generateId

现在构建 “Add Expense”：

─── text_editor | developer ──────────────────────────
path: addExpense.js
command: write

─── close | beads ──────────────────────────
issue_id: ultimate-beads-test-5x5
reason: Implemented addExpense() function

现在是 “Calculate Total”：

─── text_editor | developer ──────────────────────────
path: calculateTotal.js
command: write

─── close | beads ──────────────────────────
issue_id: ultimate-beads-test-29u
reason: Implemented calculateTotal() and calculateTotalByCategory()

最后是 “Delete Expense”：

─── text_editor | developer ──────────────────────────
path: deleteExpense.js
command: write

─── close | beads ──────────────────────────
issue_id: ultimate-beads-test-ae4
reason: Implemented deleteExpense() and deleteExpensesByCategory()

## ✅ 已完成的任务

| 任务 | ID | 创建的文件 |
|------|-----|--------------|
| **Storage Setup** | `6gs` | `storage.js` |
| **Add Expense** | `5x5` | `addExpense.js` |
| **Calculate Total** | `29u` | `calculateTotal.js` |
| **Delete Expense** | `ae4` | `deleteExpense.js` |

所有后端任务都完成了！“Wire Up UI” 任务现在应该已解除阻塞。
```

---

### 第 4 步：把一切接起来

在同一目录打开**第四个终端**。这个会话会等并行工作完成后再继续。

#### goose 提示词
```
查看 beads 中支出跟踪项目的 “Wire Up UI” 任务。

如果被阻塞，告诉我它在等什么，并每分钟再检查一次。

如果已就绪，就实现它：把 UI 按钮连接到后端函数。

完成后，在 beads 中把任务标为完成。
```

#### goose 输出
```
─── blocked | beads ──────────────────────────

找到了！**“Wire Up UI”** 任务（`ultimate-beads-test-m7i`）目前被 4 个依赖**阻塞**：

| 阻塞项 ID | 标题 | 状态 |
|-----------|------|------|
| `29u` | Calculate Total | blocked |
| `5x5` | Add Expense | blocked |
| `ae4` | Delete Expense | blocked |
| `vt2` | CSS Styling | blocked |

## 🔄 状态：阻塞

**“Wire Up UI”** 任务正在等待：
1. **Add Expense** - 把支出添加到存储的函数
2. **Calculate Total** - 对所有支出求和的函数
3. **Delete Expense** - 从存储中删除支出的函数
4. **CSS Styling** - 用 CSS 为支出跟踪应用添加样式

我会在 1 分钟后再次检查这些阻塞项是否已完成……

─── shell | developer ──────────────────────────
command: sleep 60

─── show | beads ──────────────────────────
issue_id: ultimate-beads-test-m7i

🎉 **所有阻塞项现已关闭！** “Wire Up UI” 任务现在**可以开始**了！

| 阻塞项 | 标题 | 状态 |
|--------|------|------|
| `29u` | Calculate Total | ✅ closed |
| `5x5` | Add Expense | ✅ closed |
| `ae4` | Delete Expense | ✅ closed |
| `vt2` | CSS Styling | ✅ closed |

─── update | beads ──────────────────────────
issue_id: ultimate-beads-test-m7i
status: in_progress

─── text_editor | developer ──────────────────────────
path: app.js
command: write

─── close | beads ──────────────────────────
issue_id: ultimate-beads-test-m7i
reason: Implemented app.js to wire up UI - connected form submission to addExpense, delete buttons to deleteExpense, total display to calculateTotal

## ✅ 任务完成：Wire Up UI

**已创建 `app.js`**，它会：
- 把表单提交连接到 `addExpense()`
- 页面加载时从存储渲染支出
- 把删除按钮连接到 `deleteExpense()`
- 用 `calculateTotal()` 更新总额显示

要测试它，运行：open index.html

或者启动本地服务器：python3 -m http.server 8000，然后访问 http://localhost:8000
```
