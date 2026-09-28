---
title: 代码库分析
sidebar_label: 代码库分析
description: 通过语义分析和调用图理解代码库
sidebar_position: 111
---

Analyze 平台扩展提供 `analyze` 工具，帮助你理解代码结构、跟踪符号用法，并探索整个代码库的调用图。它默认启用，并支持[多种编程语言](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/agents/platform_extensions/analyze/languages.rs)的文件类型。

<details>
<summary>分析示例：跨文件跟踪一个函数</summary>

**提示词：**

“给我看 authenticate 函数的调用图”

**输出：**

:::info 桌面版
我将分析 `authenticate` 函数在你的代码库中是如何被使用的。

根据分析，`authenticate` 函数在代码库中的使用情况如下：

#### 函数定义
`authenticate` 函数定义在 `auth.py` 第 15 行。它接受用户名和密码参数，并处理用户身份验证。

#### 传入调用（调用 authenticate 的函数）
- `api.py:25` 中的 **login_handler()** — 处理登录请求的 API 端点
- `admin.py:102` 中的 **admin_login()** — 管理员用户的特殊身份验证流程
- `tests/test_auth.py:45` 中的 **test_auth()** — 身份验证测试用例

#### 传出调用（authenticate 调用的函数）
- `db.py:102` 中的 **validate_credentials()** — 对照数据库检查凭据
- `logger.py:45` 中的 **log_attempt()** — 记录身份验证尝试
- `security.py:78` 中的 **check_rate_limit()** — 防止暴力破解

这说明 `authenticate` 是身份验证流程中的核心函数，被多个入口调用，并依赖数据库校验、日志和安全检查。
:::

</details>

## 分析模式

`analyze` 工具有三种模式——结构、语义和聚焦——取决于你分析的是目录、文件还是符号。通过自然语言或带[参数](#common-parameters)的直接命令来调用它。

### 理解项目组织

通过分析目录获得代码库的结构概览——理解项目组织、找出大文件，并查看代码库指标。

**自然语言：**
- “能分析一下我的 src/ 目录结构吗？”
- “给我这个项目代码结构的概览”
- “这个 Python 项目的主入口是什么？”

**直接命令：**
```bash
# Get overview with default depth (3 levels)
analyze path="src/"

# Get overview limited to 2 subdirectory levels
analyze path="." max_depth=2
```

### 检查单个文件

获取单个文件的语义细节——查看它的函数、类和导入，以理解结构并找到具体实现。

**自然语言：**
- “main.py 里有哪些函数？”
- “给我看 src/utils.py 的结构”

**直接命令：**
```bash
# Get file details
analyze path="main.py"

# Analyze specific file
analyze path="src/utils.py"
```

### 跨文件跟踪符号

聚焦某个函数、类或方法，查看它在何处定义、如何被跨文件调用——对重构和调试很有用。

**自然语言：**
- “追踪 authenticate 函数的依赖”
- “给我看 UserClass 的调用图”

**直接命令：**
```bash
# Track function usage
analyze path="src/" focus="authenticate"

# Track with deeper call chains
analyze path="." focus="UserClass" follow_depth=3
```

## 常用参数

| 参数 | 默认值 | 说明 |
|-----------|---------|-------------|
| `path` | 无（必需） | 要分析的文件或目录的绝对或相对路径 |
| `focus` | 无 | 要跟踪的符号名称。跨文件跟踪时，`path` 必须是目录。 |
| `follow_depth` | 2 | 从聚焦符号向外追踪多少步（0=定义位置，1=直接调用者/被调用者，2=它们的调用者/被调用者，依此类推）。与 `focus` 参数一起使用。 |
| `max_depth` | 3 | 当 `path` 是目录时，分析多少层子目录（0=不限制） |
| `force` | false | 接收完整分析结果（否则，当结果超过 50,000 个字符时只显示警告消息） |

## 最佳实践

### 处理过大的输出

如果分析结果超过 50,000 个字符，工具会返回警告消息而不是分析结果。管理大输出的办法：

- **使用 `force=true`** 绕过警告并查看完整输出（可能占用大量对话上下文）
- **缩小范围**，分析特定子目录或文件
- **降低深度**，对目录使用 `max_depth=1` 或 `max_depth=2`
- **委派给[子代理](/docs/guides/context-engineering/subagents)** 进行分析和摘要，而不填满对话历史，例如：“用一个子代理分析整个 src/ 目录，并总结主要组件”

### 性能建议

- 先从较小范围（特定文件或子目录）开始，再分析整个项目
- 使用 `max_depth=1` 或 `max_depth=2` 限制目录遍历深度
- 使用 `.gitignore` 文件把不需要的文件排除在分析之外，例如 `node_modules/` 和构建产物
