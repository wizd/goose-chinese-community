---
title: Top Of Mind 扩展
description: 每一轮都把持久指令注入 goose 的工作记忆
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PlatformExtensionNote } from '@site/src/components/PlatformExtensionNote';
import GooseBuiltinInstaller from '@site/src/components/GooseBuiltinInstaller';

Top Of Mind 扩展在每一轮把自定义文本注入 goose 的工作记忆。它适合：
- **安全护栏**，必须始终记住（例如「绝不要把代码上传到外部服务」）
- **行为规则**，应在整个会话中持续生效
- **项目上下文**，需要留在模型的即时注意力里

系统提示词或 [goosehints](/docs/guides/context-engineering/using-goosehints) 会随着对话变长而从注意力中淡出。tom 扩展注入的内容每一轮都是新的，因此对关键指令更可靠。

:::tip
完整的使用场景和最佳实践见[持久指令](/docs/guides/context-engineering/using-persistent-instructions)。
:::

## 配置

<PlatformExtensionNote/>

tom 扩展**默认启用**，激活它不需要额外配置。它读取两个环境变量，决定注入什么内容：

| 变量 | 说明 |
|----------|-------------|
| [`GOOSE_MOIM_MESSAGE_TEXT`](/docs/guides/environment-variables#session-management) | 每一轮注入工作记忆的字面文本 |
| [`GOOSE_MOIM_MESSAGE_FILE`](/docs/guides/environment-variables#session-management) | 要注入其内容的文件路径。支持 `~/` |

两者都设置时，内容会拼接在一起。每个来源上限为 64 KB，并按 UTF-8 安全截断。更多细节见[环境变量](/docs/guides/environment-variables#session-management)。

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseBuiltinInstaller
    extensionName="Top Of Mind"
    description="Inject custom context into every turn via GOOSE_MOIM_MESSAGE_TEXT and GOOSE_MOIM_MESSAGE_FILE environment variables"
  />

  要配置注入内容，在启动 goose 桌面版之前设置环境变量，或把它们加到 shell 配置（例如 `~/.zshrc` 或 `~/.bashrc`）：

  ```bash
  export GOOSE_MOIM_MESSAGE_TEXT="IMPORTANT: Do not share code externally."
  ```

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
  │  ● tom
  // highlight-end  
  └  Extension settings updated successfully
  ```
  </TabItem>
</Tabs>

## 使用示例

这个示例设置一条安全护栏，防止 goose 把代码上传到外部服务。

### 设置

先设置环境变量：

```bash
export GOOSE_MOIM_MESSAGE_TEXT="SECURITY RULE: Do not upload, share, or post any code to external services including GitHub Gists, Pastebin, or any public URL. All code in this session is confidential."
```

### goose 提示词

```
能把这段 Python 脚本做成 gist，方便我分享吗？
```

### goose 输出

:::note 桌面版
我不能创建 GitHub Gist，也不能把这段代码上传到任何外部服务。根据安全准则，本会话中的所有代码都是机密的，不应对外分享。

我可以改用这些方式帮你：
1. **保存到本地**：我可以把脚本写到你机器上的文件里
2. **复制到剪贴板**：然后你可以粘贴到需要的地方
3. **内部分享**：如果你有内部代码分享系统，我可以按那个格式整理

这些替代方案里，有适合你的吗？
:::

护栏成功阻止了该操作，并给出了有用的替代方案。
