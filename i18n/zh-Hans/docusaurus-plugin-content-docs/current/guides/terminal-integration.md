# 终端集成

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

直接从 shell 提示符与 goose 交谈。不必切换到单独的 REPL 会话，留在终端里，需要时再调用 goose。

## 设置

<Tabs groupId="shells">
<TabItem value="zsh" label="zsh" default>

加入 `~/.zshrc`：
```bash
eval "$(goose term init zsh)"
```

</TabItem>
<TabItem value="bash" label="bash">

加入 `~/.bashrc`：
```bash
eval "$(goose term init bash)"
```

</TabItem>
<TabItem value="fish" label="fish">

加入 `~/.config/fish/config.fish`：
```fish
goose term init fish | source
```

</TabItem>
<TabItem value="nu" label="Nushell">

加入 `~/.config/nushell/config.nu`：
```nu
let goose_term_init = ($nu.cache-dir | path join "goose-term-init.nu")
^goose term init nu | save --force $goose_term_init
source $goose_term_init
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

加入 `$PROFILE`：
```powershell
Invoke-Expression (goose term init powershell)
```

</TabItem>
</Tabs>

重启终端或 source 配置文件，这样就完成了！

## 用法

只需输入 `@goose`（或简写 `@g`），后面跟上你的问题：

```bash
npm install express
    npm ERR! code EACCES
    npm ERR! permission denied

@goose "how do I fix this error?"
```

goose 会自动看到你自上一个问题以来运行的命令，因此不必解释你一直在做什么。如果提示包含 `?`、`*` 或 `'` 等特殊字符，请用引号包起来：

```bash
@goose "what's in this directory?"
@g "analyze the error: 'permission denied'"
```

## 命名会话
默认情况下，每个终端有自己的 goose 会话，一直持续到你关闭它。命名会话让你可以在终端重启后继续对话，并在窗口之间共享上下文。

<Tabs groupId="shells">
<TabItem value="zsh" label="zsh" default>

```bash
eval "$(goose term init zsh --name my-project)"
```

</TabItem>
<TabItem value="bash" label="bash">

```bash
eval "$(goose term init bash --name my-project)"
```

</TabItem>
<TabItem value="fish" label="fish">

```fish
goose term init fish --name my-project | source
```

</TabItem>
<TabItem value="nu" label="Nushell">

```nu
let goose_term_init = ($nu.cache-dir | path join "goose-term-init.nu")
^goose term init nu --name my-project | save --force $goose_term_init
source $goose_term_init
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
Invoke-Expression (goose term init powershell --name my-project)
```

</TabItem>
</Tabs>

命名会话持久保存在 goose 的数据库中，因此随时可用，即使重启计算机之后也是如此。稍后重新打开并运行同一命令即可继续：

```bash
# Start debugging
eval "$(goose term init zsh --name auth-bug)"
@goose help me debug this login timeout

# Close terminal, come back later
eval "$(goose term init zsh --name auth-bug)"
@goose "what was the solution we discussed?"
# Continues the same conversation with context
```

## 默认处理程序

如果你希望 goose 回答 shell 无法解析的命令，使用 `--default`。

<Tabs groupId="default-shells">
<TabItem value="zsh" label="zsh" default>

```bash
eval "$(goose term init zsh --default)"
```

</TabItem>
<TabItem value="bash" label="bash">

```bash
eval "$(goose term init bash --default)"
```

</TabItem>
<TabItem value="nu" label="Nushell">

```nu
let goose_term_init = ($nu.cache-dir | path join "goose-term-init.nu")
^goose term init nu --default | save --force $goose_term_init
source $goose_term_init
```

</TabItem>
</Tabs>

## 在提示符中显示上下文状态

把 `goose term info` 加到提示符中，以便在终端 goose 会话期间看到已使用多少上下文，以及哪个模型处于活动状态。

<Tabs groupId="shells">
<TabItem value="zsh" label="zsh" default>

```bash
PROMPT='$(goose term info) %~ $ '
```

</TabItem>
<TabItem value="bash" label="bash">

```bash
PS1='$(goose term info) \w $ '
```

</TabItem>
<TabItem value="fish" label="fish">

```fish
function fish_prompt
    goose term info
    echo -n ' '(prompt_pwd)' $ '
end
```

</TabItem>
<TabItem value="nu" label="Nushell">

```nu
$env.PROMPT_COMMAND = {|| $"(goose term info) (pwd)> " }
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell
function prompt {
    $gooseInfo = & goose term info
    "$gooseInfo $(Get-Location) PS> "
}
```

</TabItem>
</Tabs>

终端提示符现在会显示活动 goose 会话的上下文用量和模型名称（为便于阅读而缩短）。例如：

```bash
●●○○○ sonnet ~/projects $
```
## goose 命令的 shell 补全

`@goose` 根据你的命令历史提供感知上下文的协助。要启用 goose CLI 命令（如 `goose session`、`goose run` 等）的 Tab 补全，见 [shell 补全文档](/docs/guides/goose-cli-commands#completion)。

## 故障排除

**goose 看不到最近的命令：**
如果你运行了命令，但 goose 说它看不到任何最近活动，请检查终端集成是否已正确[设置在 shell 配置中](#setup)。
你也可以检查当前终端中 goose 会话的 id：
```bash
# Check if session ID exists
echo $AGENT_SESSION_ID
# Should show something like: 20251209_151730
```
```nu
# Nushell
$env.AGENT_SESSION_ID
# Should show something like: 20251209_151730
```
要在终端窗口之间共享上下文，请改用[命名会话](#named-sessions)。

**会话变得太满**（提示符显示 `●●●●●`）：
如果 goose 的回复变慢或触及上下文限制，在终端中开始一个新的 goose 会话。新的 goose 会话能看到你的命令历史，但看不到上一个会话的对话历史。
```bash
# Start a new goose session in the same shell
eval "$(goose term init zsh)"
```
```nu
# Nushell
let goose_term_init = ($nu.cache-dir | path join "goose-term-init.nu")
^goose term init nu | save --force $goose_term_init
source $goose_term_init
```
