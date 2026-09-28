---
title: Skills 扩展
description: 加载可复用的指令集，教 goose 完成特定工作流
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PlatformExtensionNote } from '@site/src/components/PlatformExtensionNote';
import GooseBuiltinInstaller from '@site/src/components/GooseBuiltinInstaller';

:::caution 已弃用
此扩展已弃用，仅在 v1.16.0 到 v1.24.0 中可用。v1.25.0 及以上请看 [Summon 扩展](/docs/mcp/summon-mcp)。
:::

Skills 扩展加载*技能*，也就是可复用的指令集，用来教 goose 如何完成特定任务或遵循特定工作流。

goose 在启动时自动发现技能，并在与你的请求相关时使用它们。技能从项目目录的 `.agents/skills/` 以及全局的 `~/.agents/skills/` 加载，因此可以在不同的 AI 编程智能体之间携带。了解如何创建技能以及 goose 如何使用它们，见[使用技能](/docs/guides/context-engineering/using-skills)。

## 配置

<PlatformExtensionNote/>

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseBuiltinInstaller
    extensionName="Skills"
    description="Load and use skills from the .agents/skills directory"
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
  │  ● skills
  // highlight-end  
  └  Extension settings updated successfully
  ```
  </TabItem>
</Tabs>

## 使用示例

假设 goose 启动时在 `~/.agents/skills/deploy/SKILL.md` 发现了这样一个技能：

```markdown
---
name: production-deploy
description: 生产环境的安全部署流程
---

# 生产部署

## 部署前检查清单
1. 确认所有测试通过
2. 检查预发环境是否稳定
3. 通知 #deployments 频道

## 部署步骤
1. 从 main 创建发布分支
2. 运行 `npm run build:prod`
3. 先部署到预发，再部署到生产
4. 监控错误率 30 分钟
```

### goose 提示词

```
把当前分支部署到生产环境
```

### goose 输出

:::note 桌面版
我来帮你把当前分支部署到生产环境。先加载生产部署技能，按安全部署流程来做。

你当前在 **`my-feature-branch`** 分支上，还有一些未跟踪文件。继续生产部署之前，我需要遵循安全部署流程。

#### ⚠️ 需要先确认部署前事项

根据生产部署技能，我需要完成下面的检查清单：

**部署前检查清单**
1. **确认所有测试通过**：测试跑过了吗？
2. **检查预发环境是否稳定**：是否已经先部署到预发？
3. **通知 #deployments 频道**：要通知团队吗？

**部署步骤（确认后）**
1. 从 main 创建发布分支
2. 运行 `npm run build:prod`
3. 先部署到预发，再部署到生产
4. 监控错误率 30 分钟

---

**继续之前，请确认：**

1. ✅ `my-feature-branch` 分支的测试都通过了吗？
2. ✅ 已经在预发上测试过了吗？
3. ✅ 要通知 #deployments 频道吗？
4. ✅ 确定要把 `my-feature-branch` 分支（不是 `main`）部署到生产吗？

请确认这些事项，我再继续部署。
:::
