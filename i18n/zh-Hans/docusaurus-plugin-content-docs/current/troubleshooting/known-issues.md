---
title: 已知问题
sidebar_label: 已知问题
description: 针对 goose 常见问题的全面故障排除指南，附带分步解决方案。
---

goose 和任何系统一样，偶尔会遇到问题。本指南为常见问题提供解决方案。

:::tip 这里没列出的问题需要帮助？
我们的 [Discord 社区](https://discord.gg/n8R5VaWDAn)随时帮忙！为了最快获得支持，考虑生成一份[诊断报告](/docs/troubleshooting/diagnostics-and-reporting)——它能帮助我们快速了解你的环境。
:::

### goose 会编辑文件
goose 可以并且会在工作流中编辑文件。为避免丢失个人改动，用版本控制暂存你的个人编辑。在审阅之前，不要暂存 goose 的编辑。考虑把 goose 的编辑单独提交，这样需要时可以轻松还原。

---

### 中断 goose
如果 goose 走错了方向或卡住了，你可以[中断它](/docs/guides/sessions/in-session-actions#interrupt-task)，以纠正它的操作或提供额外信息。

---

### 陷入循环或无响应
在罕见情况下，goose 可能在长会话中进入“末日螺旋”或变得无响应。结束当前会话并开始新会话通常可以解决。

1. 按住 `Ctrl+C` 取消
2. 开始新会话：
  ```sh
  goose session
  ```
:::tip
对于特别大或复杂的任务，考虑拆成更小的会话。
:::

---

### 防止长时间运行的命令

如果你使用 goose CLI 并从事 Web 开发项目，可能会遇到让 goose 无限挂起的命令。`npm run dev`、`python -m http.server` 或 `webpack serve` 这类命令会启动开发服务器，它们自己不会退出。

你可以通过自定义 shell，让 goose 运行这些命令时以不同方式处理，从而避免这些问题。关于使用 `GOOSE_TERMINAL` 环境变量的细节，见[自定义 Shell 行为](/docs/guides/environment-variables#customizing-shell-behavior)。

---



### 上下文长度超出错误

当提供给 goose 的输入超过所用大语言模型的最大 token 限制时，会出现此错误。要解决它，试着把输入拆成更小的部分。你也可以用 [`.goosehints`][goosehints] 向 goose 提供详细上下文，并在 goose 桌面版中使用[消息队列](/docs/guides/sessions/in-session-actions#queue-messages)。

---

### 使用 Ollama Provider

Ollama 提供本地大语言模型，这意味着在尝试把这个 provider 用于 goose 之前，必须先[下载 Ollama 并运行一个模型](/docs/getting-started/providers#local-llms)。如果没有下载模型，你会遇到以下错误：

> ExecutionError("error sending request for url (http://localhost:11434/v1/chat/completions)")


还要注意，DeepSeek 模型不支持工具调用，因此要使用这些模型，必须[禁用所有 goose 扩展](/docs/getting-started/using-extensions#enablingdisabling-extensions)。不幸的是，不用工具的话，使用 DeepSeek 时 goose 能自主完成的事情不多。不过，Ollama 的其他模型（例如 `qwen2.5`）支持工具调用，可以与 goose 扩展一起使用。

---

### 处理速率限制错误
goose 与大语言模型 provider 交互时可能遇到 `429 error`（超出速率限制）。建议的解决方案是使用提供内置速率限制的 provider。更多信息见[处理大语言模型速率限制][handling-rate-limits]。

---

### Hermit 错误

如果在应用中安装扩展时看到写着 “hermit:fatal” 的问题，你可能需要重置 hermit 缓存。我们使用一份 hermit 副本来确保 npx 和 uvx 始终可用。如果你已经用过较旧版本的 hermit，可能需要清理缓存——在 Mac 上，该缓存位于

```
sudo rm -rf ~/Library/Caches/hermit
```

---

### API 错误

当大语言模型 API token 出现问题（例如额度用尽或配置不正确）时，用户可能会遇到类似下面的错误：

```sh
Traceback (most recent call last):
  File "/Users/admin/.local/pipx/venvs/goose-ai/lib/python3.13/site-packages/exchange/providers/utils.py",
line 30, in raise_for_status
    response.raise_for_status()
    ~~~~~~~~~~~~~~~~~~~~~~~~~^^
  File "/Users/admin/.local/pipx/venvs/goose-ai/lib/python3.13/site-packages/httpx/_models.py",
line 829, in raise_for_status
    raise HTTPStatusError(message, request=request, response=self)
httpx.HTTPStatusError: Client error '404 Not Found' for url
'https://api.openai.com/v1/chat/completions'

...
```
此错误通常发生在大语言模型 API 额度耗尽或 API 密钥无效时。要解决此问题：

1. 检查你的 API 额度：
    - 登录你的大语言模型 provider 控制台
    - 确认你有足够额度。如果没有，请充值
2. 验证 API 密钥：
    - 运行以下命令重新配置 API 密钥：
    ```sh
    goose configure
    ```
更新大语言模型 provider 的详细步骤见[安装][installation]指南。

---

### GitHub Copilot Provider 配置

如果把 GitHub Copilot 配置为 provider 时遇到错误，可以试试这些常见场景的变通办法。

#### 容器和 Keyring 问题

goose 会尝试使用系统 keyring（通常通过 DBus 上的 Secret Service）安全存储你的 GitHub Copilot token。在容器化或无头环境中，DBus 和/或桌面 keyring 服务可能不可用（有些环境会因基于 X11 的 DBus 自动启动错误而失败），因此 keyring 访问可能失败。

如果你在没有 keyring 支持的 Docker 容器或 Linux 环境中运行 goose，goose 可能会自动回退到[基于文件的密钥存储](#keyring-cannot-be-accessed-automatic-fallback)。

如果仍然收到如下认证/keyring 错误，说明 goose 未能自动回退。如果 goose 没有把 keyring 失败识别为访问问题，或者错误与 keyring 访问无关，就会发生这种情况。
```
Failed to save token: Failed to access keyring: <error message>
```

要解决此问题（或主动强制使用基于文件的密钥存储），把 `GOOSE_DISABLE_KEYRING` 设为任意值。此示例仅在运行 `goose configure` 时设置它：

```bash
GOOSE_DISABLE_KEYRING=1 goose configure
```

如果你不想把密钥存在 `secrets.yaml` 中，改为通过环境变量设置 token。

关于 keyring 替代方案的更多细节，见 [钥匙串/Keyring 错误](#keychainkeyring-errors)。

---

### 新配方警告

第一次在 goose 桌面版中运行某个配方时，你会看到 `New Recipe Warning` 对话框，可以审阅配方的标题、描述和指令。如果你信任该配方，点击 `Trust and Execute` 继续。除非该配方发生变化，否则不会再对同一配方提示。

此警告有助于防止无意中执行可能有害的配方代码。

---
### 卸载 goose 或移除缓存数据

重新安装之前，你可能需要卸载 goose 或清除现有数据。goose 根据操作系统把数据存在不同位置。API 密钥等密钥默认存在系统钥匙串/keyring 中（使用基于文件的密钥存储时则在 `secrets.yaml` 中）。

#### macOS

**数据位置**

- **日志和配置**：`~/.config/goose`
- **应用数据**：`~/Library/Application Support/Goose`
- **密钥**：macOS 钥匙串（凭据名为 “goose”）。

#### 移除步骤

1. 停止所有正在运行的 goose（CLI 或 GUI）

  - 考虑通过活动监视器确认已经全部停止

2. 打开钥匙串访问，删除名为 “goose” 的凭据，其中包含 goose 存储的所有密钥
3. 移除数据目录：

```
rm -rf ~/.config/goose
rm -rf ~/Library/Application\ Support/goose
```
4. 从“应用程序”文件夹删除 “goose” 应用（如果使用 goose 桌面版）。

#### Linux
**数据位置**

- **数据/会话**：`~/.local/share/goose/`
- **日志**：`~/.local/state/goose/`
- **配置**：`~/.config/goose/`
- **密钥**：系统 keyring（如果可用）

#### 移除步骤

- 停止所有正在运行的 goose（CLI 或 GUI）
- 从系统 keyring 清除密钥（如适用）
- 移除数据目录：

```
rm -rf ~/.local/share/goose/
rm -rf ~/.local/state/goose/
rm -rf ~/.config/goose/
```
#### Windows

**数据位置**
- **配置和数据**：`%APPDATA%\Block\goose\`
- **本地应用数据**：`%LOCALAPPDATA%\Block\goose\`
- **密钥**：Windows 凭据管理器

#### 移除步骤

1. 停止所有正在运行的 goose（CLI 或 GUI）

  - 检查任务管理器，确认所有实例都已关闭

2. 打开 Windows 凭据管理器，删除与 “goose” 相关的凭据
3. 移除数据目录：
```
rmdir /s /q "%APPDATA%\Block\goose"
rmdir /s /q "%LOCALAPPDATA%\Block\goose"
```
4. 从“设置 > 应用”卸载 goose 桌面版应用（如适用）

> 清理之后，如果你想全新安装 goose，现在可以从通常的安装说明开始。
---

### 钥匙串/Keyring 错误 {#keychainkeyring-errors}

goose 默认尝试使用系统 keyring（macOS 上为钥匙串）存储密钥。在无法访问 keyring（或没有 keyring 支持）的环境中，你可能会看到类似这样的错误：

```bash
Error Failed to access secure storage (keyring): Platform secure storage failure: DBus error: The name org.freedesktop.secrets was not provided by any .service files
Please check your system keychain and run 'goose configure' again.
If your system is unable to use the keyring, please try setting secret key(s) via environment variables.
```

在某些情况下，goose 可能会自动回退到基于文件的密钥存储。见[无法访问 Keyring（自动回退）](#keyring-cannot-be-accessed-automatic-fallback)。

如果仍然收到 keyring 错误，使用以下选项之一：

- **设置特定于 provider 的环境变量**，可在[支持的大语言模型 Provider][configure-llm-provider]中找到。
  - 仅当前会话：`export GOOGLE_API_KEY=$YOUR_KEY_HERE`
  - 在新 shell 中持久化：把它加到 `~/.bashrc` 或 `~/.zshrc`（或等效文件）

    然后在提示是否把该值保存到 keyring 时选择 `No`。

  ```bash
  $ goose configure

  Welcome to goose! Let's get you set up with a provider.
    you can rerun this command later to update your configuration

  ┌   goose-configure
  │
  ◇  Which model provider should we use?
  │  Google Gemini
  │
  ◇  GOOGLE_API_KEY is set via environment variable
  │
  ◇  Would you like to save this value to your keyring?
  │  No
  │
  ◇  Enter a model from that provider:
  │  gemini-2.0-flash-exp
  ```

- **如果需要禁用 keyring**，把 `GOOSE_DISABLE_KEYRING` 设为任意值，以强制使用基于文件的密钥存储。实际值无关紧要，只要变量已设置即可。

  此示例仅在运行 `goose configure` 时设置它：

  ```bash
  GOOSE_DISABLE_KEYRING=1 goose configure
  ```

当 keyring 被禁用（或无法访问且 goose 回退到基于文件的密钥存储）时，密钥存放在这里：

- macOS/Linux：`~/.config/goose/secrets.yaml`
- Windows：`%APPDATA%\Block\goose\config\secrets.yaml`

详情见[配置文件](/docs/guides/config-files)。

---

### 无法访问 Keyring（自动回退） {#keyring-cannot-be-accessed-automatic-fallback}

goose 默认使用系统 keyring（macOS 上为钥匙串）存储密钥。如果无法访问 keyring，goose 可能会回退到基于文件的密钥存储。

在这种情况下，你可能会在日志中看到类似下面的警告：

```text
Keyring unavailable. Using file storage for secrets.
```

自动回退只适用于当前 goose 进程。开始新会话时，goose 会再次尝试使用 keyring。

如果需要强制使用基于文件的密钥存储（例如在容器或无头环境中），把 `GOOSE_DISABLE_KEYRING` 设为任意值：

```bash
GOOSE_DISABLE_KEYRING=1 goose configure
```

`secrets.yaml` 的细节见[配置文件](/docs/guides/config-files)。

### 包运行器

许多外部扩展需要包运行器。例如，如果你遇到类似这样的错误：

```
Failed to start extension `{extension name}`: Could not run extension command (`{extension command}`): No such file or directory (os error 2)
Please check extension configuration for {extension name}.
```

……这表明扩展可能尚未安装，你需要包运行器才能安装它。

一个例子是 GitHub 扩展，其命令是 `npx -y @modelcontextprotocol/server-github`。你需要在系统上安装 [Node.js](https://nodejs.org/) 才能运行此命令，因为它使用 `npx`。

---

### Windows 上 Node.js 扩展无法激活

如果在 Windows 上尝试激活基于 Node.js 的扩展时遇到错误 `Node.js installer script not found`，这很可能是因为 goose 没有在预期的系统路径中找到 Node.js。

#### 症状：
- Node.js 已安装且可用（已用 `node -v` 和 `npm -v` 验证）
- 其他扩展（例如基于 Python 的）工作正常
- 错误专门发生在激活 Node.js 扩展时

#### 解决方案：
此问题通常发生在 Node.js 安装在非标准位置时。goose 期望在 `C:\Program Files\nodejs\` 找到 Node.js，但它可能安装在别处（例如 `D:\Program Files\nodejs\`）。

1. **检查你的 Node.js 安装路径：**
   ```powershell
   where.exe node
   ```

2. **如果 Node.js 不在 `C:\Program Files\nodejs\`，创建一个符号链接：**
   - 以管理员身份打开 PowerShell
   - 创建符号链接，把 goose 重定向到你实际的 Node.js 安装位置：
   ```powershell
   mklink /D "C:\Program Files\nodejs" "D:\Program Files\nodejs"
   ```
   （把 `D:\Program Files\nodejs` 替换为你实际的 Node.js 安装路径）

3. **重启 goose**，然后再次尝试激活扩展。

这会创建一个符号链接，让 goose 能在预期位置找到 Node.js，同时保持你的实际安装不变。

---

### 检测到恶意包

如果在尝试使用扩展时看到关于 “blocked malicious package” 的错误，意味着该扩展被阻止，因为在扩展使用的某个包中检测到了恶意软件。错误信息会包含该包的细节，例如：

```
Blocked malicious package: package-name@1.0.0 (npm). OSV MAL advisories: MAL-2024-1234
```

解决步骤：
1. **寻找替代方案**：在[扩展目录][extensions-directory]或 [PulseMCP](https://www.pulsemcp.com/servers) 中寻找类似扩展
2. **可选验证**：验证被阻止扩展的来源，或包名/发布者
3. **报告误报**：如果你认为这是错误，请[提交 issue](https://github.com/aaif-goose/goose/issues)

此安全检查仅适用于使用 PyPI（`uvx`）或 NPM（`npx`）的本地执行外部扩展。检查使用来自 OSV 数据库的实时数据；如果安全服务不可用，扩展仍会正常安装。

作为最佳实践，只从受信任的官方来源安装扩展。

---

### macOS 权限问题

如果遇到 goose 桌面版应用启动时不显示窗口的问题，可能是文件和文件夹权限导致的。这通常是因为 goose 需要对 `~/.config` 目录的读写权限，以创建日志目录和文件。
同样，如果工具在使用期间无法创建文件或目录，也可能是同一权限问题引起的。

#### 如何检查并修复权限：

1. 打开终端。
2. 运行以下命令检查 ~/.config 的当前权限：
  ```sh
  ls -ld ~/.config
  ```
**示例输出：**
  ```sh
  drwx------  7 yourusername  staff  224 Jan 15 12:00 /Users/yourusername/.config
  ```
`rwx` 表示你的用户拥有读（r）、写（w）和执行（x）权限。如果你的用户没有看到 `rwx`，请按以下步骤操作。

#### 如何授予读写权限：

1. 要添加正确的权限，运行以下命令：
    ```sh
    chmod u+rw ~/.config
    ```
    如果 ~/.config 目录不存在，先创建它再分配权限：
      ```sh
      mkdir -p ~/.config
      chmod u+rw ~/.config
      ```
2. 验证更改：
    ```sh
    ls -ld ~/.config
    ```

如果修复权限后仍有问题，试着用超级用户（管理员）权限启动 goose：
```sh
sudo /Applications/Goose.app/Contents/MacOS/Goose
```

:::note
用 sudo 运行 goose 可能会创建归 root 所有的文件，从而带来进一步的权限问题。把这当作故障排除步骤，而不是永久修复。
:::

#### 在系统设置中更新权限（macOS）
1. 前往 `System Settings` -> `Privacy & Security` -> `Files & Folders`
2. 授予 goose 访问权限

---

### WSL 上 Ollama Provider 的连接错误

如果在 goose 中把 Ollama 设置为 provider 时遇到类似这样的错误：
    ```
    Execution error: error sending request for url (http://localhost:11434/v1/chat/completions)
    ```
这很可能意味着从 WSL 无法访问本地主机地址。
1. 检查服务是否在运行：
    ```
    curl http://localhost:11434/api/tags
    ```
    如果收到 `failed to connect` 错误，可能是 WSL 对 localhost 使用了不同的 IP。在这种情况下，运行以下命令找出 WSL 的正确 IP 地址：
    ```
    ip route show | grep -i default | awk '{ print $3 }'
    ```
2. 得到 IP 地址后，在 goose 配置中用它代替 localhost。例如：
    ```
    http://172.24.80.1:11434
    ```
    
如果仍然遇到 `failed to connect` 错误，并且你使用的是 Windows 11 22H2 或更高版本，可以尝试使用 WSL 的[镜像网络](https://learn.microsoft.com/en-us/windows/wsl/networking#mirrored-mode-networking)设置。

---

### 企业代理或防火墙问题

如果你位于企业代理或防火墙之后，并且 goose 无法连接到大语言模型 provider，你可能会看到类似这样的错误：

```
error sending request for url (https://api.openai.com/...)
failed to connect to api.openai.com
```

goose 通过标准环境变量和系统代理设置支持 HTTP/HTTPS 代理配置。两者都配置时，环境变量优先。

**解决方案：**

1. **配置[代理环境变量](/docs/guides/environment-variables#network-configuration)：**
   ```bash
   export HTTPS_PROXY="http://proxy.company.com:8080"
   export NO_PROXY="localhost,127.0.0.1,.internal"
   ```

2. **或使用系统代理设置：**
   - **macOS**：系统设置 → 网络 →［选择连接］→ 详细信息 → 代理
   - **Windows**：设置 → 网络和 Internet → 代理

3. 配置代理设置后**重启 goose**

如果仍然遇到连接问题，请验证：
- 代理 URL 和端口正确
- 如需认证，你拥有凭据（格式：`http://username:password@proxy:port`）
- 你的代理允许到大语言模型 provider 域名的 HTTPS 连接

---

### 隔离/离线环境问题

如果你在隔离、离线或受企业限制的环境中工作，可能会遇到 MCP 服务器扩展无法激活或无法下载运行时依赖的问题。

#### 症状：
- 扩展激活失败，错误信息涉及缺少运行时环境
- 错误包含 “hermit:fatal” 或互联网下载失败
- 扩展在个人电脑上可用，但在企业/受限网络中失败
- 错误信息类似：`Failed to start extension: Could not run extension command`

#### 解决方案：
goose 桌面版使用 **“shims”**（打包版的 `npx` 和 `uvx`），它们会通过 Hermit 自动下载运行时环境。在受限网络中，这些下载会失败。

**变通办法——使用自定义命令名：**

1. **在系统上创建包运行器的替代名称版本：**
   ```bash
   # For uvx (Python packages)
   ln -s /usr/local/bin/uvx /usr/local/bin/runuv
   
   # For npx (Node.js packages)  
   ln -s /usr/local/bin/npx /usr/local/bin/runnpx
   ```

2. **更新 MCP 服务器配置以使用自定义名称：**
   
   不要用：
   ```yaml
   extensions:
     example:
       cmd: uvx
       args: [mcp-server-example]
   ```
   
   改用：
   ```yaml
   extensions:
     example:
       cmd: runuv  # This bypasses goose's shims
       args: [mcp-server-example]
   ```

3. **为什么这样有效：** goose 只会把已知命令名（`npx`、`uvx`、`jbang` 等）替换为其打包的 shim。自定义名称会原样传给你系统上的实际可执行文件。

4. **需要更多改动**：在企业代理环境或隔离环境中，如果上述方法不起作用，建议你根据自己的网络限制（例如 TLS 证书限制、[代理配置](/docs/guides/environment-variables#network-configuration)、无法下载所需内容等）定制并打包带有可用 shim/配置的 goose 桌面版。

#### 文档访问：
`goose-doc-guide` skill 默认从 `https://goose-docs.ai` 读取 goose 文档，离线时不可用。要让 goose 改为读取本地文档副本，见[离线 / 隔离环境文档](/docs/guides/offline-docs)。

---
### 还需要帮助？

仍然遇到问题？我们在这里帮忙！加入我们的 [Discord 社区][discord]，goose 团队和社区成员很乐意协助。

:::tip
如果你能连同问题一起分享一份[诊断报告](/docs/troubleshooting/diagnostics-and-reporting#diagnostics-system)，它能帮助我们了解你的环境并提供更有针对性的解决方案。
:::



[handling-rate-limits]: /docs/guides/handling-llm-rate-limits-with-goose
[installation]: /docs/getting-started/installation
[discord]: https://discord.gg/n8R5VaWDAn
[goosehints]: /docs/guides/context-engineering/using-goosehints
[configure-llm-provider]: /docs/getting-started/providers
[extensions-directory]: /extensions
