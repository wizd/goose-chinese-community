# 上游变更 591edd47cf..7143dddf73

## 说明

已同步到 `7143dddf732be1b259f2fde83f225b44d10caf71`。
中文需要更新的篇目见下方。命令、环境变量和组件标签保持原文，只把英文 diff 的意思补进现有译文。

## 英文文件

- `A` `blog/2026-09-16-agentic-state-machines/index.md`
- `M` `docs/getting-started/providers.md`
- `M` `docs/guides/config-files.md`
- `M` `docs/guides/context-engineering/subagents.mdx`
- `M` `docs/guides/environment-variables.md`
- `M` `docs/guides/managing-tools/code-mode.md`
- `M` `docs/guides/recipes/recipe-reference.md`
- `M` `docs/guides/sessions/session-management.md`
- `M` `docs/guides/sessions/smart-context-management.md`
- `M` `docs/mcp/code-mode-mcp.md`
- `M` `docs/mcp/summon-mcp.md`
- `M` `src/data/gdk-api.json`
- `A` `static/img/blog/agentic-state-machines.jpg`

## 删除

无。

## 受保护文件冲突

- `src/pages/index.tsx` 上游有改动。本地补丁未覆盖。

```diff
diff --git a/documentation/src/pages/index.tsx b/documentation/src/pages/index.tsx
index dbecb72fc..e313f7b3a 100644
--- a/documentation/src/pages/index.tsx
+++ b/documentation/src/pages/index.tsx
@@ -38,3 +38,3 @@ function HeroSection() {
           <div className={styles.stat}>
-            <span className={styles.statNumber}>45k+</span>
+            <span className={styles.statNumber}>55k+</span>
             <span className={styles.statLabel}>GitHub stars</span>
@@ -43,3 +43,3 @@ function HeroSection() {
           <div className={styles.stat}>
-            <span className={styles.statNumber}>500+</span>
+            <span className={styles.statNumber}>600+</span>
             <span className={styles.statLabel}>Contributors</span>
```

## 需要重译

- `docs/getting-started/providers.md` → `i18n/zh-Hans/docusaurus-plugin-content-docs/current/getting-started/providers.md`

```diff
diff --git a/5312188d98e4a92731ffc8e714a75c4b283f382c b/175a70b9f158ed887851cd5d990369c625d2fa54
index 5312188d9..175a70b9f 100644
--- a/5312188d98e4a92731ffc8e714a75c4b283f382c
+++ b/175a70b9f158ed887851cd5d990369c625d2fa54
@@ -45,2 +45,3 @@ goose is compatible with a wide range of LLM providers, allowing you to choose a
 | [iFlytek Astron MaaS](https://maas.xfyun.cn/)                               | iFlytek Astron MaaS (讯飞星辰) hosting Spark X2, DeepSeek, GLM, Kimi, MiniMax, Qwen, and Astron coding models via an OpenAI-compatible API. Set `ASTRON_BASE_URL` to switch between the Token Plan and Coding Plan endpoints. | `ASTRON_API_KEY`, `ASTRON_BASE_URL` (optional) |
+| [IO Intelligence](https://io.net/) | Inference for open-weight models (DeepSeek, Qwen, Llama, GLM, Kimi, gpt-oss and more) through io.net's OpenAI-compatible API. | `IONET_API_KEY` |
 | [LiteLLM](https://docs.litellm.ai/docs/) | LiteLLM proxy supporting multiple models with automatic prompt caching and unified API access. | `LITELLM_HOST`, `LITELLM_BASE_PATH` (optional), `LITELLM_API_KEY` (optional), `LITELLM_CUSTOM_HEADERS` (optional), `LITELLM_TIMEOUT` (optional) |
@@ -551,2 +552,26 @@ Custom providers must use OpenAI, Anthropic, or Ollama compatible API formats. T
 
+### Custom Model Prices
+
+Each model in a custom provider's JSON file can declare prices in USD **per token**:
+
+```json
+{
+  "name": "my-model",
+  "input_token_cost": 0.00000242,
+  "output_token_cost": 0.00001,
+  "cache_read_token_cost": 0.000000242,
+  "cache_write_token_cost": 0.000003025
+}
+```
+
+Both `input_token_cost` and `output_token_cost` must be present for goose to
+use a model's configured pricing. If either is missing, goose falls back to
+catalog pricing for the model.
+
+Cache-read and cache-write prices are independently optional. Supplied cache
+prices, including `0`, override catalog cache rates. Omitted cache prices use
+catalog cache rates when available, otherwise the input price. Declaring both
+input and output prices as `0` keeps the model free unless you explicitly set
+a cache price. Provider-reported costs take precedence over estimates.
+
 ### Command-Based Authentication
```
- `docs/guides/config-files.md` → `i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/config-files.md`

```diff
diff --git a/7dceacb19166c6b2ff68eed72f3e4ff7731e2ddb b/6a845f26ad9283267e45de09b76db51084d5162d
index 7dceacb19..6a845f26a 100644
--- a/7dceacb19166c6b2ff68eed72f3e4ff7731e2ddb
+++ b/6a845f26ad9283267e45de09b76db51084d5162d
@@ -66,2 +66,3 @@ The following settings can be configured at the root level of your config.yaml f
 | `GOOSE_AUTO_COMPACT_THRESHOLD` | Set the percentage threshold at which goose [automatically compacts your session](/docs/guides/sessions/smart-context-management#automatic-compaction). | Float between 0.0 and 1.0 (disabled at 0.0)| 0.8 | No |
+| `GOOSE_AUTO_COMPACT_TOKEN_LIMIT` | Absolute auto-compaction trigger; the earlier of this and the percentage threshold applies while auto-compaction is enabled. Controls when compaction starts, not a guaranteed maximum request size. | Positive integer | 225000 | No |
 | `SECURITY_PROMPT_ENABLED` | Enable [prompt injection detection](/docs/guides/security/prompt-injection-detection) to identify potentially harmful commands | true/false | false | No |
```
- `docs/guides/context-engineering/subagents.mdx` → `i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/context-engineering/subagents.mdx`

```diff
diff --git a/a43ccd527bda02ae576d40114e90bef98e9775f1 b/189fca07966d6d97e5cb2b2ec7369858562e995f
index a43ccd527..189fca079 100644
--- a/a43ccd527bda02ae576d40114e90bef98e9775f1
+++ b/189fca07966d6d97e5cb2b2ec7369858562e995f
@@ -273,3 +273,4 @@ Subagents use the following pre-configured settings, but you can override any de
 |-----------|---------|------------------|
-| **Max Turns** | 25 | Use natural language, set `GOOSE_SUBAGENT_MAX_TURNS`, or configure `settings.max_turns` in [recipes](/docs/guides/recipes/recipe-reference#settings) or subagent tool calls |
+| **Maximum Concurrent Subagents** | 5 | Set `GOOSE_MAX_CONCURRENT_SUBAGENTS` to a positive integer. Additional tasks wait until a running subagent finishes. The limit applies per parent session. |
+| **Max Turns** | `GOOSE_MAX_TURNS`, otherwise 1000 | Use natural language, set `GOOSE_SUBAGENT_MAX_TURNS`, or configure `settings.max_turns` in [recipes](/docs/guides/recipes/recipe-reference#settings) or subagent tool calls |
 | **Timeout** | 5 minutes | Request longer timeout in your prompt |
@@ -295,3 +296,11 @@ You can override any default by including the setting in your natural language r
 
-**Environment variable:** Set `GOOSE_SUBAGENT_MAX_TURNS` to change the default max turns for all subagents. Similarly, `GOOSE_SUBAGENT_MODEL` and `GOOSE_SUBAGENT_PROVIDER` set defaults for the subagent model and provider; recipe [`settings`](/docs/guides/recipes/recipe-reference#settings) take precedence over both.
+Subagent turn limits use the first configured value below:
+
+1. The `delegate` tool's `max_turns` argument.
+2. The child recipe's `settings.max_turns`.
+3. `GOOSE_SUBAGENT_MAX_TURNS` in the environment or configuration file.
+4. `GOOSE_MAX_TURNS` in the environment or configuration file.
+5. The default of 1000.
+
+`GOOSE_SUBAGENT_MODEL` and `GOOSE_SUBAGENT_PROVIDER` set defaults for the subagent model and provider; recipe [`settings`](/docs/guides/recipes/recipe-reference#settings) take precedence over both.
```
- `docs/guides/environment-variables.md` → `i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/environment-variables.md`

```diff
diff --git a/fcd9ce5f74629330d6e12cd9d523538aac7a6194 b/8909686d1392c46265e916b33bcff4d7c362954e
index fcd9ce5f7..8909686d1 100644
--- a/fcd9ce5f74629330d6e12cd9d523538aac7a6194
+++ b/8909686d1392c46265e916b33bcff4d7c362954e
@@ -138,4 +138,4 @@ These variables control how goose manages conversation sessions and context.
 | `GOOSE_GATEWAY_MAX_TURNS` | Maximum number of turns for gateway sessions (e.g., Telegram). Overrides `GOOSE_MAX_TURNS` for gateway traffic only, so chat platforms can keep a stricter cap than CLI/desktop sessions. | Integer (e.g., 5, 10, 25) | Falls back to `GOOSE_MAX_TURNS`, then 5 |
-| `GOOSE_SUBAGENT_MAX_TURNS` | Sets the maximum turns allowed for a [subagent](/docs/guides/context-engineering/subagents) to complete before timeout. Can be overridden by [`settings.max_turns`](/docs/guides/recipes/recipe-reference#settings) in recipes or subagent tool calls. | Integer (e.g., 25) | 25 |
-| `GOOSE_MAX_BACKGROUND_TASKS` | Sets the maximum number of concurrent background [subagent](/docs/guides/context-engineering/subagents) tasks goose can run at once | Integer (e.g., 1, 5, 10) | 5 |
+| `GOOSE_MAX_CONCURRENT_SUBAGENTS` | Maximum number of subagents running at once per parent session. Additional tasks wait for a slot. Unset or invalid values use the default. | Positive integer (e.g., 2, 5, 10) | 5 |
+| `GOOSE_SUBAGENT_MAX_TURNS` | Overrides the turn budget for [subagents](/docs/guides/context-engineering/subagents). An explicit delegate `max_turns` or child recipe [`settings.max_turns`](/docs/guides/recipes/recipe-reference#settings) takes precedence. | Positive integer (e.g., 25) | Falls back to `GOOSE_MAX_TURNS`, then 1000 |
 | `CONTEXT_FILE_NAMES` | Specifies custom filenames for [hint/context files](/docs/guides/context-engineering/using-goosehints#custom-context-files) | JSON array of strings (e.g., `["CLAUDE.md", ".goosehints"]`) | `[".goosehints", "AGENTS.md"]` |
@@ -155,2 +155,3 @@ These variables control how goose manages conversation sessions and context.
 | `GOOSE_AUTO_COMPACT_THRESHOLD` | Set the percentage threshold at which goose [automatically compacts your session](/docs/guides/sessions/smart-context-management#automatic-compaction). | Float between 0.0 and 1.0 (disabled at 0.0) | 0.8 |
+| `GOOSE_AUTO_COMPACT_TOKEN_LIMIT` | Absolute auto-compaction trigger; the earlier of this and the percentage threshold applies while auto-compaction is enabled. Controls when compaction starts, not a guaranteed maximum request size. | Positive integer | 225000 |
 | `GOOSE_TOOL_CALL_CUTOFF` | Number of tool calls to keep in full detail before summarizing older tool outputs to help maintain efficient context usage | Integer (e.g., 5, 10, 20) | Computed from the model context limit and auto-compaction threshold |
```
- `docs/guides/managing-tools/code-mode.md` → `i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/managing-tools/code-mode.md`

```diff
diff --git a/c29480b12f4b1f58abc572904c8adfe1a5f38288 b/0a01e3b432dca1f9f15d8b03fd0047a0580d2dcf
index c29480b12..0a01e3b43 100644
--- a/c29480b12f4b1f58abc572904c8adfe1a5f38288
+++ b/0a01e3b432dca1f9f15d8b03fd0047a0580d2dcf
@@ -24,3 +24,3 @@ Code Mode controls how tools are discovered and called:
 
-The [Code Mode extension](/docs/mcp/code-mode-mcp) is an MCP server that uses the MCP protocol to expose three foundational meta-tools. When Code Mode is enabled, goose switches to Code Mode. For every request, the LLM writes JavaScript code that goose executes using [pctx (Port of Context)](https://portofcontext.com/) ([GitHub](https://github.com/portofcontext/pctx)), a custom Deno-based runtime, to:
+The [Code Mode extension](/docs/mcp/code-mode-mcp) is an MCP server that uses the MCP protocol to expose three foundational meta-tools. When Code Mode is enabled, goose switches to Code Mode. For every request, the LLM writes JavaScript code that goose executes in a fresh goose-owned [Boa](https://boajs.dev/) context to:
 
@@ -36,3 +36,3 @@ Traditional MCP tool calling and Code Mode are two different approaches to the s
 |--------|------------------|-----------|
-| **Tool Discovery** | All tools from enabled extensions, for example:<br/>• `developer.shell`<br/>• `developer.text_editor`<br/>• `github.list_issues`<br/>• `github.get_pull_request`<br/>• `slack.send_message`<br/>• ... *potentially many more* | Code Mode extension's meta-tools:<br/>• `list_functions`<br/>• `get_function_details`<br/>• `execute_typescript`<br/><br/>The LLM uses these tools to discover tools from other enabled extensions as needed |
+| **Tool Discovery** | All tools from enabled extensions, for example:<br/>• `shell`<br/>• `write`<br/>• `github__list_issues`<br/>• `github__get_pull_request`<br/>• `slack__send_message`<br/>• ... *potentially many more* | Code Mode extension's meta-tools:<br/>• `list_functions`<br/>• `get_function_details`<br/>• `execute_javascript`<br/><br/>The LLM uses these tools to discover tools from other enabled extensions as needed |
 | **Tool Calling** | • Sequential tool calls<br/>• Each result sent to the LLM before the next call | • May require tool discovery calls<br/>• Multiple tool calls batched in one execution<br/>• Intermediate results are chained and processed locally |
@@ -45,2 +45,38 @@ Code Mode only supports text content from tool results. Images, binary data, and
 
+## JavaScript interface
+
+Call `list_functions` to discover exact tool names and short descriptions, then
+`get_function_details` with `{"functions": ["extension__first_tool"]}` to inspect
+original JSON input and output schemas. Recursive schemas remain JSON data.
+Use the returned names exactly, including unprefixed names for first-class tools.
+
+Pass JavaScript to `execute_javascript` with an `async function run()` entry point:
+
+```javascript
+async function run() {
+  const results = await Promise.all([
+    tools.call("extension__first_tool", { query: "example" }),
+    tools.call("extension__second_tool", { limit: 5 })
+  ]);
+  return results.map(result => result.summary);
+}
+```
+
+Await tool calls and batch independent operations. Return or log only information
+needed for the next step. Tool arguments must be JSON objects; results must be
+JSON values or `undefined`. Cyclic objects, functions, symbols, and BigInt are
+unsupported. Console output, JSON depth and item counts, JavaScript instructions,
+loop iterations, and recursion are bounded.
+
+The runtime provides JavaScript built-ins, `tools.call`, and captured
+`console.log`, `info`, `warn`, `error`, and `debug` methods. It has no direct
+filesystem, shell, network, environment, or package access. Tool calls retain
+the extension lease, permission flow, cancellation, and mutation handling used
+by goose. Only assistant-visible text results reach the script.
+
+Each execution uses a separate worker and context. The extension timeout and
+cancellation stop execution and cancel in-flight too
```
- `docs/guides/recipes/recipe-reference.md` → `i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/recipes/recipe-reference.md`

```diff
diff --git a/1e93205d549e307cdda290f138f4b7b7b5219e0c b/257b25600b917dc236e3f9dedc3bb48c4c2656ca
index 1e93205d5..257b25600 100644
--- a/1e93205d549e307cdda290f138f4b7b7b5219e0c
+++ b/257b25600b917dc236e3f9dedc3bb48c4c2656ca
@@ -506,9 +506,11 @@ The `settings` field allows you to configure the AI model and provider settings
 
-The `max_turns` setting controls how many iterations an agent can perform before stopping. When set in a recipe's settings, it applies to that recipe's execution and any subagents or subrecipes it creates (unless they specify their own value).
+The `max_turns` setting controls how many iterations an agent can perform before stopping. When set in a recipe's settings, it applies to that recipe's execution.
 
-**Configuration precedence (highest to lowest):**
-1. Subagent tool call override
-2. Recipe `settings.max_turns`
-3. `GOOSE_SUBAGENT_MAX_TURNS` environment variable
-4. Default value (1000 for main recipes, 25 for subagents)
+**Subagent configuration precedence (highest to lowest):**
+
+1. The `delegate` tool's `max_turns` argument.
+2. The child recipe's `settings.max_turns`.
+3. `GOOSE_SUBAGENT_MAX_TURNS` in the environment or configuration file.
+4. `GOOSE_MAX_TURNS` in the environment or configuration file.
+5. The default of 1000.
```
- `docs/guides/sessions/session-management.md` → `i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/sessions/session-management.md`

```diff
diff --git a/87a29f29d3586855054ba594807e736221428308 b/ab82070e30e7b30bf9b551fd2ef8bd5e86efd02a
index 87a29f29d..ab82070e3 100644
--- a/87a29f29d3586855054ba594807e736221428308
+++ b/ab82070e30e7b30bf9b551fd2ef8bd5e86efd02a
@@ -50,3 +50,3 @@ In your first session, goose prompts you to [set up an LLM (Large Language Model
         | New Session in Different Directory | `Cmd+O` | `Ctrl+O` |
-        | Toggle Sidebar | `Cmd+B` | `Ctrl+B` |
+        | Toggle Sidebar | `Cmd+/` | `Ctrl+/` |
         | Open Settings | `Cmd+,` | `Ctrl+,` |
```
- `docs/guides/sessions/smart-context-management.md` → `i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/sessions/smart-context-management.md`

```diff
diff --git a/d6bc4834fbd0ed5b64a93c1aecf350c51e9f1374 b/ce4623d1acaa9875bc9e20fe70bd5313751199f7
index d6bc4834f..ce4623d1a 100644
--- a/d6bc4834fbd0ed5b64a93c1aecf350c51e9f1374
+++ b/ce4623d1acaa9875bc9e20fe70bd5313751199f7
@@ -28,6 +28,9 @@ This layered approach lets goose handle token and context limits gracefully.
 goose automatically compacts older parts of your conversation into a summary when approaching token limits, allowing you to maintain long-running sessions without manual intervention.
-Auto-compaction is triggered by default when you reach 80% of the token limit in goose Desktop and the goose CLI.
+Auto-compaction is triggered by default when you reach 80% of the token limit or 225,000 tokens, whichever comes first, in goose Desktop and the goose CLI.
+The effective trigger is `min(GOOSE_AUTO_COMPACT_THRESHOLD × model context window, GOOSE_AUTO_COMPACT_TOKEN_LIMIT)`. It is recalculated for the current model's context window. Change the token cap with `GOOSE_AUTO_COMPACT_TOKEN_LIMIT`.
+
+The default cap leaves headroom below OpenAI's long-context price tier (above 272,000 input tokens). It controls when compaction starts, not a guaranteed maximum request size: new messages, tool output, and the compaction request itself can exceed the trigger between checks.
 
 Control the auto-compaction behavior with the `GOOSE_AUTO_COMPACT_THRESHOLD` [environment variable](/docs/guides/environment-variables.md#session-management). 
-Disable this feature by setting the value to `0.0`.
+Disable this feature by setting the value to `0.0`; the token cap does not re-enable disabled auto-compaction.
```
- `docs/mcp/code-mode-mcp.md` → `i18n/zh-Hans/docusaurus-plugin-content-docs/current/mcp/code-mode-mcp.md`

```diff
diff --git a/c01cb22f23cba9d9ca3fec9e59d0b606460e8085 b/492ffa56aebd933bbbba6a8549d81fb6284a159c
index c01cb22f2..492ffa56a 100644
--- a/c01cb22f23cba9d9ca3fec9e59d0b606460e8085
+++ b/492ffa56aebd933bbbba6a8549d81fb6284a159c
@@ -12,3 +12,3 @@ The Code Mode extension enables [Code Mode](/docs/guides/managing-tools/code-mod
 
-The Code Mode extension is an MCP server that exposes three meta-tools. When Code Mode is enabled, the LLM writes JavaScript code that goose executes using a Deno-based runtime called [Port of Context](https://github.com/AdrianCole/pctx) to discover tools, learn their interfaces, and call them programmatically.
+The Code Mode extension is an MCP server that exposes three meta-tools. When Code Mode is enabled, the LLM writes JavaScript code that goose executes in a fresh goose-owned [Boa](https://boajs.dev/) JavaScript context to discover tools, learn their interfaces, and call them programmatically.
 
@@ -65,3 +65,3 @@ I'll help you create a LOG.md file with the git branch, last 3 commits, and vers
 
-`Execute Code code: import { shell, text_editor } from "developer" ...`
+`execute_javascript: async function run() { const result = await tools.call("shell", { command: "git branch --show-current" }); return result; }`
 
@@ -69,3 +69,3 @@ Let me check the package.json path first:
 
-`Execute Code code: import { shell, text_editor } from "developer" ...`
+`execute_javascript: async function run() { const result = await tools.call("shell", { command: "git branch --show-current" }); return result; }`
```
- `docs/mcp/summon-mcp.md` → `i18n/zh-Hans/docusaurus-plugin-content-docs/current/mcp/summon-mcp.md`

```diff
diff --git a/399897556349deca6c4471c76631cc0273ee52be b/076f49cf043789b838999e5c921ccd2d9a9c51e2
index 399897556..076f49cf0 100644
--- a/399897556349deca6c4471c76631cc0273ee52be
+++ b/076f49cf043789b838999e5c921ccd2d9a9c51e2
@@ -106,7 +106,4 @@ delegate(source: "release-notes")
 delegate(instructions: "Review these docs and report stale links")
-delegate(source: "release-notes", async: true)
-load(source: "20260219_1", peek: true)
-load(source: "20260219_1")
 ```
 
-Calling `load()` with no arguments lists available sources. For background tasks, `delegate(..., async: true)` returns a task id, and `load(source: "<task_id>")` waits for the result.
+Calling `load()` with no arguments lists available sources. `delegate` waits for the subagent to finish and returns its result.
```

## 尚无译文

- `blog/2026-09-16-agentic-state-machines/index.md` → `i18n/zh-Hans/docusaurus-plugin-content-blog/2026-09-16-agentic-state-machines/index.md`
