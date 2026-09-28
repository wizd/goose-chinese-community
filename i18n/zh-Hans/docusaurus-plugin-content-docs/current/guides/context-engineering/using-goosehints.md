---
title: 向 goose 提供提示
sidebar_position: 1
sidebar_label: 使用 goosehints
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Menu } from 'lucide-react';

`.goosehints` 是一个文本文件，用于提供关于项目的额外上下文，并改善与 goose 的沟通。使用 `.goosehints` 可以让 goose 更好地理解你的要求，并更有效地执行任务。

<details>
  <summary>goose 提示视频讲解</summary>
  <iframe
  class="aspect-ratio"
  src="https://www.youtube.com/embed/kWXJC5p0608"
  title="goose 提示"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  ></iframe>
</details>

当你发现自己在重复提示，或多次提供同类指令时，就适合添加 `.goosehints` 文件。它也是提供大量上下文的好办法，这些内容放在文件里往往更合适。

本指南将带你创建并使用 `.goosehints` 文件，用自定义指令和上下文简化工作流。

:::info 需要 Developer 扩展
要使用提示文件，需要[启用](/docs/getting-started/using-extensions) `Developer` 扩展。
:::

## 创建提示文件

goose 支持两种提示文件：
- **全局提示文件** - 这些提示适用于你与 goose 的所有会话，与目录无关。全局提示存储在 `~/.config/goose/.goosehints`。
- **本地提示文件** - 这些提示只在特定目录或目录层级中工作时适用。

你可以同时使用全局和本地提示。两者都存在时，goose 会同时考虑你的全局偏好和项目特定要求。如果本地提示文件中的指令与全局偏好冲突，goose 会优先采用本地提示。

:::tip 自定义上下文文件
你可以通过 [`CONTEXT_FILE_NAMES` 环境变量](#custom-context-files)让 goose 使用其他代理规则文件。
:::

<Tabs groupId="interface">
    <TabItem value="ui" label="goose Desktop" default>

    #### 全局提示文件
    1. 在 `~/.config/goose` 中创建 `.goosehints` 文件

    #### 本地提示文件

    1. 点击应用底部的目录路径，打开你想创建文件的目录
    2. 点击左上角的汉堡按钮 <Menu className="inline" size={16} /> 打开侧边栏
    3. 在侧边栏中点击 `Settings`
    4. 点击 `Chat`
    5. 向下滚动到 `Project Hints (.goosehints)` 部分并点击 `Configure`
    6. 在文本区域输入本地提示
    7. 点击 `Save`
    8. 重启会话，以便 goose 读取更新后的 `.goosehints`

    如果给定目录中已经有 `.goosehints` 文件，你可以编辑现有提示。

    </TabItem>
    <TabItem value="manual" label="Manual">
    
    - **全局提示文件** - 在 `~/.config/goose` 中创建 `.goosehints` 文件。
    - **本地提示文件** - 在项目根目录和/或层级中的任意目录创建 `.goosehints` 文件。

    </TabItem>
</Tabs>

`.goosehints` 文件可以包含与项目相关的任何指令或上下文细节。

## 设置提示

`.goosehints` 文件支持自然语言。用直接的语言写清楚、具体的指令，让 goose 容易理解和遵循。包含关于项目和工作流偏好的相关上下文，并把最重要的准则放在前面。

goose 在会话开始时加载提示。当它访问嵌套目录中的文件时，也会加载那些目录的提示文件。goose 会把提示加入每个请求的系统提示词。因为 `.goosehints` 内容会消耗 token，保持简洁可以降低成本并提高性能。

### 全局 `.goosehints` 文件示例

```
Always use TypeScript for new Next.js projects.

@coding-standards.md  # Contains our coding standards
docs/contributing.md  # Contains our pull request process

Follow the [Google Style Guide](https://google.github.io/styleguide/pyguide.html) for Python code.

Run unit tests before committing any changes.

Prefer functional programming patterns where applicable.
```

### 本地 `.goosehints` 文件示例

```
This is a simple example JavaScript web application that uses the Express.js framework. View [Express documentation](https://expressjs.com/) for extended guidance.

Go through the @README.md for information on how to build and test it as needed.

Make sure to confirm all changes with me before applying.

Run tests with `npm run test` ideally after each change.
```

这些示例展示了引用其他文件的两种方式：
- **`@` 语法**：自动把文件内容纳入 goose 的即时上下文
- **普通引用**：在需要时指引 goose 去查看文件（用于可选或非常大的文件）

### 嵌套的 `.goosehints` 文件

goose 支持 git 仓库中的分层本地提示。会话开始时，goose 从工作目录向上直到仓库根目录加载已配置的上下文文件。当 goose 读取或修改嵌套子目录中的文件时，也可以自动发现并加载那些目录中的额外提示文件。

这在 monorepo 或大型项目中特别有用，因为代码库的不同部分可能有不同约定。

默认情况下，goose 在每一层查找 `AGENTS.md` 和 `.goosehints`。如果你使用[自定义上下文文件](#custom-context-files)，goose 会对那些文件名应用相同的嵌套加载行为。

作为最佳实践，每一层的 `.goosehints` 应只包含与该范围相关的提示：
- **根级别**：包含项目范围的标准、构建流程和一般准则
- **模块/功能级别**：为代码库的该区域添加特定要求
- **目录级别**：包含非常具体的上下文，例如本地测试流程或组件模式

**示例项目结构：**
```sh
my-project/
├── .git/
├── .goosehints              # Project-wide hints
├── frontend/
│   ├── .goosehints          # Frontend-specific hints
│   └── components/
│       ├── .goosehints      # Component-specific hints
│       └── Button.tsx
└── backend/
    ├── .goosehints          # Backend-specific hints
    └── api/
        └── routes.py
```

如果你在 `my-project/` 中启动 goose，根级别提示会立即加载。稍后，当 goose 访问 `frontend/components/` 下的文件时，它会加载该路径的嵌套提示，并按以下顺序组合：
1. <details>
     <summary>`my-project/.goosehints`（项目根）</summary>
        ```
        This is a React + TypeScript project using Vite.

        @README.md                    # Project overview and setup instructions
        @docs/development-setup.md    # Development environment configuration

        Always run tests before committing: `npm test`
        Use conventional commits for all changes.
        ```
   </details>
2. <details>
     <summary>`frontend/.goosehints`</summary>
        ```
        This frontend uses React 18 with TypeScript and Tailwind CSS.

        @package.json                      # Dependencies and scripts
        @docs/frontend-architecture.md     # Frontend structure and patterns

        ## Development Standards
        - Use functional components with hooks (no class components)
        - Implement proper TypeScript interfaces for all props
        - Follow the component structure: /components/ComponentName/index.tsx
        - Use Tailwind classes instead of custom CSS when possible

        ## Testing Requirements  
        - Write unit tests for all components using React Testing Library
        - Test files should be co-located: ComponentName.test.tsx
        - Run `npm run test:frontend` before committing changes

        ## State Management
        - Use React Query for server state
        - Use Zustand for client state management
        - Avoid prop drilling - lift state appropriately

        Always confirm UI changes with design team before implementation.
        ```
   </details>
3. <details>
     <summary>`frontend/components/.goosehints`（当前目录）</summary>
        ```
        Components in this directory use our design system.

        @docs/component-api.md    # Component interface standards and examples

        All components must:
        - Export a default component
        - Include TypeScript props interface
        - Have corresponding .test.tsx file
        - Follow naming convention: PascalCase
        ```
   </details>

:::note
某个目录的嵌套提示加载后，会在会话剩余时间保持有效。如果你更新了提示文件并希望 goose 可靠地采用新内容，请重启会话。
:::

## 常见用途
人们用提示向 goose 提供额外上下文的一些方式：

- **决策**：指定 goose 应自主做出更改，还是先与你确认再行动。

- **验证流程**：提供 goose 应执行的测试用例或验证方法，以确保更改符合项目规格。

- **反馈循环**：包含让 goose 接收反馈并迭代改进建议的步骤。

- **指向更详细的文档**：指出 goose 应查阅的重要文件，如 `README.md`、`docs/setup-guide.md` 或其他需要详细说明的文件。

- **用 @ 提及来组织**：对于经常需要的文档，使用 `@filename.md` 或 `@relative/path/testing.md`，自动把文件内容纳入当前上下文，而不是仅仅引用。这确保 goose 能立即访问重要信息。
用 @ 提及纳入核心文档（如 API 模式或编码规范）以获得即时上下文，但对可选或非常大的文件使用普通引用（不带 `@`）。

和提示词一样，这并不是塑造 `.goosehints` 文件的完整清单。你可以按需要放入任意多的上下文。

## 最佳实践

- **保持文件更新**：定期更新 `.goosehints` 文件，以反映项目协议或优先级的变化。
- **保持简洁**：确保内容直接、切题，让 goose 能快速解析并据此行动。
- **从小处开始**：先创建一小套清晰、具体的提示，再根据需要逐步扩展。这样更容易理解 goose 如何解释和应用你的指令。
- **引用其他文件**：把 goose 指向相关文件，如 /docs/style.md 或 /scripts/validation.js，以减少重复并保持指令轻量。

## 自定义上下文文件

goose 默认查找 `AGENTS.md` 然后是 `.goosehints` 文件，但你可以用 `CONTEXT_FILE_NAMES` 环境变量配置不同的文件名或多个上下文文件。这在以下情况有用：

- **工具兼容**：使用其他 AI 工具的约定（例如 `CLAUDE.md`）
- **组织方式**：把常用规则拆到多个会自动加载的文件中
- **项目约定**：使用项目既有工具链中的上下文文件（`.cursorrules`）

工作方式如下：
1. goose 在全局（`~/.config/goose/`）和本地项目位置查找每个已配置的文件名
2. 会话开始时，goose 从工作目录层级加载匹配的文件
3. 会话期间，当 goose 访问嵌套子目录时，可以加载额外的匹配文件
4. 所有找到的文件都会被加载并合并进上下文

### 配置

把 `CONTEXT_FILE_NAMES` 环境变量设为文件名的 JSON 数组。默认是 `["AGENTS.md", ".goosehints"]`。

```bash
# Single custom file
export CONTEXT_FILE_NAMES='["AGENTS.md"]'

# Project toolchain files
export CONTEXT_FILE_NAMES='[".cursorrules", "AGENTS.md"]'

# Multiple files
export CONTEXT_FILE_NAMES='["CLAUDE.md", ".goosehints", "project_rules.txt"]'
```
