---
title: Container Use 扩展
description: 将 Container-Use MCP 用作 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/X3tf61_Tak0" />

本教程介绍如何将 [Container Use MCP 服务器](https://container-use.com) 添加为 goose 扩展，让 goose 在隔离环境中工作。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=container-use&arg=stdio&id=container-use&name=container%20use&description=use%20containers%20with%20dagger%20and%20git%20for%20isolated%20environments)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  container-use stdio
  ```
  </TabItem>
</Tabs>
:::

## 配置

:::info
系统上需要安装 [Docker](https://www.docker.com/)。如果要使用远程 MCP 服务器，还需要安装 [Node.js](https://nodejs.org/)。
:::

<Tabs groupId="online_offline">
  <TabItem value="remote-mcp" label="远程 MCP" default>

    <Tabs groupId="interface">
      <TabItem value="ui" label="goose Desktop" default>
        <GooseDesktopInstaller
            extensionId="container-use"
            extensionName="Container Use"
            description="使用 container-use 运行容器自动化"
            command="npx"
            args={["-y", "mcp-remote", "https://container-use.com/mcp"]}
        />
    </TabItem>
      <TabItem value="cli" label="goose CLI">
          <CLIExtensionInstructions
            name="Container Use"
            description="使用 container-use 运行容器自动化"
            command="npx -y mcp-remote https://container-use.com/mcp"
            timeout={300}
          />
      </TabItem>
    </Tabs>

  </TabItem>
  <TabItem value="local-mcp" label="本地 MCP">

    <Tabs groupId="interface">
      <TabItem value="ui" label="goose Desktop" default>
        <GooseDesktopInstaller
            extensionId="container-use"
            extensionName="Container Use"
            description="使用 container-use 运行容器自动化"
            command="container-use"
            args={["stdio"]}
        />
    </TabItem>
      <TabItem value="cli" label="goose CLI">
          <CLIExtensionInstructions
            name="Container Use"
            description="使用 container-use 运行容器自动化"
            command="container-use stdio"
            timeout={300}
          />
      </TabItem>
    </Tabs>

  </TabItem>
</Tabs>

## 使用示例

下面是一个简单示例：把基于文件的待办应用改成使用 SQLite 数据库，并完成完整测试。这一切都在隔离的容器环境中进行。

:::info
更多示例、常见工作流和故障排查提示，见[隔离开发环境](/docs/tutorials/isolated-development-environments)。
:::

#### 提示词

```
运行一个容器代理，添加把待办列表数据保存到 sqlite 的功能，构建并运行测试，但使用单独的 Git 分支，这样我的主代码保持安全。
```

#### goose 输出

```
我来帮你创建一个容器环境，在单独的 Git 分支上为待办列表应用添加 SQLite 功能。先创建环境并查看当前代码结构。
─── environment_create | containeruse ──────────────────────────
environment_source: ./examples/todo-list
explanation: ...
title: ...

现在配置环境所需的工具，然后继续开发 SQLite 功能：
─── environment_config | containeruse ──────────────────────────
config:
    base_image: python:3.11-slim
    setup_commands:
        -
            [REDACTED: 63 chars]
        -
            pip install pytest pytest-cov

environment_id: thankful-whale
environment_source: ./examples/todo-list
explanation: ...

等环境运行后再安装 pytest：

---

很好！我已经创建了一个容器环境，可以安全地为待办列表应用添加 SQLite 功能。先探索当前代码结构，然后创建新的 Git 分支。

---

现在我会创建基于 SQLite 的存储实现。首先，创建一个支持 SQLite 的新版 TaskManager：

---

## ✅ SQLite 功能已成功添加！

我已成功创建容器环境，并为你的待办列表应用添加了 SQLite 功能！完成的内容如下：

### 🎯 **已实现的功能**

1. **SQLite 数据库存储**
   - 用 SQLite 数据库替换了纯文本文件存储
   - 创建了带自增 ID 的正确数据库 schema

2. **增强的任务管理**
   - 保留了全部原有功能（添加、列出、标记完成/未完成、删除、清空）
   - 新增**统计功能**，显示完成率
   - 用数据库 ID 改进了任务显示

3. **两个实现版本**
   - `taskman_sqlite.py` - 带 Rich UI 的完整功能版
   - `taskman_sqlite_simple.py` - 无外部依赖的简化版

### 🧪 **测试已完成**

- ✅ 创建了完整测试套件（`test_taskman_sqlite.py`）
- ✅ 构建了简单测试运行器（`test_simple.py`）
- ✅ 所有测试均通过
- ✅ 手动测试确认功能工作正常

### 📊 **现场演示结果**

  # 成功添加任务
  ✓ Added task: Buy groceries
  ✓ Added task: Walk the dog

  # 用 SQLite ID 列出任务
  📋 Task List (SQLite)
  #   ID   Status   Task
  1   1    ✓ Done   Buy groceries
  2   2    ○ Todo   Walk the dog

  # 统计功能正常
  Task Statistics:
  Total tasks: 2
  Completed: 1
  Pending: 1
  Completion rate: 50.0%

  # 数据库已验证
  sqlite3 tasks.db "SELECT * FROM tasks;"
  1|Buy groceries|1
  2|Walk the dog|0


### 🔒 **安全开发**

- ✅ 使用了单独的容器环境
- ✅ 所有更改都与主代码隔离
- ✅ 保留了原始实现
- ✅ 保持了向后兼容

### 📁 **创建的文件**

- `taskman_sqlite_simple.py` - 主要的 SQLite 实现
- `test_simple.py` - 测试套件
- `SQLITE_FEATURE_README.md` - 完整文档
- `tasks.db` - SQLite 数据库文件

SQLite 实现功能完整，可以立即使用！基于文件的原版本保持不变，因此你可以安全评估新的 SQLite 功能，而不会危及现有代码。

```
