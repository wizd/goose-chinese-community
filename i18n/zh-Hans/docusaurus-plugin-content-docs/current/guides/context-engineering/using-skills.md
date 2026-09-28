---
title: 代理技能
sidebar_position: 3
sidebar_label: 代理技能
---

技能是可复用的指令和资源集合，用来教 goose 如何执行特定任务。技能可以是一份简单清单，也可以是带有领域专业知识的详细工作流，并可以包含脚本或模板等支持文件。示例用途包括部署流程、代码审查清单和 API 集成指南。

:::info
此功能使用内置的 Skills 平台扩展，默认启用。
:::

会话开始时，goose 会把已发现的技能名称和描述加入它的指令。会话期间，goose 可以在以下情况加载技能的完整指令：
- 你的请求明显匹配某个技能的用途
- 你明确要求使用某个技能，例如：
  - “用 code-review 技能审查这个 PR”
  - “按 new-service 技能搭建认证服务”
  - “应用 deployment 技能”

你也可以询问 goose 有哪些技能可用，运行 `goose skills list`，或使用 CLI 的 `/skills` 命令列出可用技能并按名称加载一个或多个：

```bash
/skills code-review edge-case-finder
```

:::info Claude 兼容
goose 技能与 Claude Desktop 以及其他[支持 Agent Skills 的代理](https://agentskills.io/home#adoption)兼容。
:::

## 内置技能

goose 附带一个内置技能，无需安装即可使用：

| 技能 | 说明 |
|-------|-------------|
| `web-search` | 使用 DuckDuckGo（无需 API 密钥）、Tavily 或 SearXNG 搜索网页，并提取页面内容。 |

对于浏览器自动化——浏览页面、点击、填写表单和截图——请安装上游维护的 browser-use 技能：

```bash
browser-use skill install
```

这会给你 browser-use 项目中完整、最新的技能，包括远程浏览器支持、AX-tree 元素选择策略和录制工具。

## 技能位置

技能可以全局存储、按项目存储，或放在已安装的插件中：

1. `~/.agents/skills/` — 全局技能，在所有会话中可用
2. `.agents/skills/` — 项目级技能，范围限定为当前项目
3. `~/.agents/plugins/<plugin-name>/` — 由已安装[插件](/docs/guides/context-engineering/plugins)提供的技能

把 `SKILL.md` 文件放在命名子目录中。例如，名为 `code-review` 的全局技能放在 `~/.agents/skills/code-review/SKILL.md`。

> **向后兼容：** goose 也会从 `.goose/skills/`、`.claude/skills/`、`~/.claude/skills/` 以及平台特定的配置目录发现技能，但推荐的标准是 `agents/skills/`。

## 创建技能

当你有涉及多个步骤、专门知识或支持文件的可重复工作流时，创建技能。

### 技能文件结构

每个技能位于自己的目录中，并带有 `SKILL.md` 文件：

```
~/.agents/skills/
└── code-review/
    └── SKILL.md
```

`SKILL.md` 文件需要带 `name` 和 `description` 的 YAML frontmatter，后面是技能内容：

```markdown
---
name: code-review
description: Comprehensive code review checklist for pull requests
---

# Code Review Checklist

When reviewing code, check each of these areas:

## Functionality
- [ ] Code does what the PR description claims
- [ ] Edge cases are handled
- [ ] Error handling is appropriate

## Code Quality
- [ ] Follows project style guide
- [ ] No hardcoded values that should be configurable
- [ ] Functions are focused and well-named

## Testing
- [ ] New functionality has tests
- [ ] Tests are meaningful, not just for coverage
- [ ] Existing tests still pass

## Security
- [ ] No credentials or secrets in code
- [ ] User input is validated
- [ ] SQL queries are parameterized
```

## 来自插件的技能

技能也可以来自已安装的[插件](/docs/guides/context-engineering/plugins)。插件提供的技能在会话启动时被发现，工作方式与其他技能相同。对于 Open Plugins，技能名会用插件名加命名空间，例如 `my-plugin:review`。明确加载插件提供的技能时，使用这个完整名称。

## 支持文件

技能可以包含脚本、模板或配置文件等支持文件。把它们放在技能目录中：

```
~/.agents/skills/
└── api-setup/
    ├── SKILL.md
    ├── setup.sh
    └── templates/
        └── config.template.json
```

goose 加载技能时会看到这些支持文件，并可以使用 [Developer 扩展](/docs/mcp/developer-mcp)的文件工具访问它们。

<details>
<summary>带支持文件的技能示例</summary>

**SKILL.md：**
```markdown
---
name: api-setup
description: Set up API integration with configuration and helper scripts
---

# API Setup

This skill helps you set up a new API integration with our standard configuration.

## Steps

1. Run `setup.sh <api-name>` to create the integration directory
2. Copy `templates/config.template.json` to your integration directory
3. Update the config with your API credentials
4. Test the connection

## Configuration

The config template includes:
- `api_key`: Your API key (get from the provider's dashboard)
- `endpoint`: API endpoint URL
- `timeout`: Request timeout in seconds (default: 30)

## Verification

After setup, verify:
- [ ] Config file is valid JSON
- [ ] API key is set and not a placeholder
- [ ] Test connection succeeds
```

**setup.sh：**
```bash
#!/bin/bash
API_NAME=$1
mkdir -p "integrations/$API_NAME"
cp templates/config.template.json "integrations/$API_NAME/config.json"
echo "Created integration directory for $API_NAME"
echo "Edit integrations/$API_NAME/config.json with your credentials"
```

**templates/config.template.json：**
```json
{
  "api_key": "YOUR_API_KEY_HERE",
  "endpoint": "https://api.example.com/v1",
  "timeout": 30,
  "retry_attempts": 3
}
```

</details>

## 常见用例示例

<details>
<summary>部署工作流</summary>

```markdown
---
name: production-deploy
description: Safe deployment procedure for production environment
---

# Production Deployment

## Pre-deployment
1. Ensure all tests pass
2. Get approval from at least 2 reviewers
3. Notify #deployments channel

## Deploy
1. Create release branch from main
2. Run `npm run build:prod`
3. Deploy to staging, verify, then production
4. Monitor error rates for 30 minutes

## Rollback
If error rate exceeds 1%:
1. Revert to previous deployment
2. Notify #incidents channel
3. Create incident report
```

</details>

<details>
<summary>测试策略</summary>

```markdown
---
name: testing-strategy
description: Guidelines for writing effective tests in this project
---

# Testing Guidelines

## Unit Tests
- Test one thing per test
- Use descriptive test names: `test_user_creation_fails_with_invalid_email`
- Mock external dependencies

## Integration Tests
- Test API endpoints with realistic data
- Verify database state changes
- Clean up test data after each test

## Running Tests
- `npm test` — Run all tests
- `npm test:unit` — Unit tests only
- `npm test:integration` — Integration tests (requires database)
```

</details>

<details>
<summary>API 集成指南</summary>

````markdown
---
name: square-integration
description: How to integrate with our Square account
---

# Square Integration

## Authentication
- Test key: Use `SQUARE_TEST_KEY` from `.env.test`
- Production key: In 1Password under "Square Production"

## Common Operations

### Create a customer
```javascript
const customer = await squareup.customers.create({
  email: user.email,
  metadata: { userId: user.id }
});
```

### Handle webhooks
Always verify webhook signatures. See `src/webhooks/square.js` for our handler pattern.

## Error Handling
- `card_declined`: Show user-friendly message, suggest different payment method
- `rate_limit`: Implement exponential backoff
- `invalid_request`: Log full error, likely a bug in our code
````

</details>

:::tip 其他支持复用的 goose 功能
- [.goosehints](/docs/guides/context-engineering/using-goosehints)：最适合一般偏好、项目上下文和重复指令，例如 “Always use TypeScript”
- [配方](/docs/guides/recipes/session-recipes)：可分享的配置，把指令、提示词和设置打包在一起
:::

## 最佳实践

- **保持技能聚焦** — 每个工作流或领域一个技能。如果技能变长，考虑拆分。
- **写清楚** — 技能是给 goose 的指令。使用清晰、直接的语言和编号步骤。
- **包含验证步骤** — 帮助 goose 确认工作流已成功完成。

## 更多资源

import ContentCardCarousel from '@site/src/components/ContentCardCarousel';
import skillsvsmcp from '@site/blog/2025-12-22-agent-skills-vs-mcp/skills-vs-mcp.png';

<ContentCardCarousel
  items={[
    {
      type: 'blog',
      title: '技能终结了 MCP 吗？',
      description: 'Agent Skills 与 MCP 概览',
      thumbnailUrl: skillsvsmcp,
      linkUrl: '/blog/2025/12/22/agent-skills-vs-mcp',
      date: '2025-12-22',
      duration: '阅读 4 分钟'
    }
  ]}
/>
