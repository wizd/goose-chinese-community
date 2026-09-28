---
title: Code Mode 扩展
description: 执行 JavaScript 代码以与多个 MCP 工具交互
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PlatformExtensionNote } from '@site/src/components/PlatformExtensionNote';
import GooseBuiltinInstaller from '@site/src/components/GooseBuiltinInstaller';

Code Mode 扩展启用 [Code Mode](/docs/guides/managing-tools/code-mode)，这是一种以编程方式与 MCP 工具交互的方法。

Code Mode 扩展是一个 MCP 服务器，会暴露三个元工具。启用 Code Mode 后，LLM 会编写 JavaScript 代码，由 goose 通过基于 Deno 的运行时 [Port of Context](https://github.com/AdrianCole/pctx) 执行，从而发现工具、了解其接口，并以编程方式调用它们。

当启用了多个扩展、或工作流需要多次工具调用时，这有助于更高效地管理上下文窗口占用。

## 配置

<PlatformExtensionNote defaultEnabled={false} />

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseBuiltinInstaller
    extensionName="Code Mode"
    description="执行 JavaScript 代码，高效地与 MCP 工具交互"
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
  ◇  What would you like to configure?
  │  Toggle Extensions 
  │
  ◆  Enable extensions: (use "space" to toggle and "enter" to submit)
  // highlight-start    
  │  ● code_execution
  // highlight-end  
  └  Extension settings updated successfully
  ```
  </TabItem>
</Tabs>

## 使用示例

在这个示例中，我们让 goose 汇总一份需要多次工具调用的报告。

### goose 提示词

```
创建一个 LOG.md 文件，包含当前 git 分支、最近 3 次提交，以及 package.json 中的版本
```

### goose 输出

:::note 桌面版
我来帮你创建 LOG.md，其中包含当前 git 分支、最近 3 次提交，以及 package.json 中的版本。我会在一次操作里收集这些信息。

`Execute Code code: import { shell, text_editor } from "developer" ...`

先确认 package.json 的路径：

`Execute Code code: import { shell, text_editor } from "developer" ...`

好了，我已经创建 **LOG.md**，其中包含：

- ✅ **当前 git 分支**
- ✅ **最近 3 次提交**（含哈希、说明、作者和相对时间）
- ✅ 来自 ui/desktop/package.json 的**版本**

文件已保存到根目录，文件名为 `LOG.md`。
:::
