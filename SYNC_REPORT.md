# 上游变更 04ed836c8c..591edd47cf

## 说明

已同步到 `591edd47cf2cfea4957d720c607cf2a4def8673d`。
中文需要更新的篇目见下方。命令、环境变量和组件标签保持原文，只把英文 diff 的意思补进现有译文。

## 英文文件

- `M` `docs/guides/goose-cli-commands.md`
- `M` `docs/guides/managing-tools/goose-permissions.md`
- `M` `docs/guides/sessions/session-management.md`
- `M` `docs/guides/sessions/smart-context-management.md`
- `M` `src/data/gdk-api.json`

## 删除

无。

## 受保护文件冲突

无。

## 需要重译

- `docs/guides/goose-cli-commands.md` → `i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/goose-cli-commands.md`

```diff
diff --git a/4d8c6f81c0fee4f4ae4d35cd8dce1ef8d1df7a84 b/22b631966458380cd6e1277f5a38b75f9475c39e
index 4d8c6f81c..22b631966 100644
--- a/4d8c6f81c0fee4f4ae4d35cd8dce1ef8d1df7a84
+++ b/22b631966458380cd6e1277f5a38b75f9475c39e
@@ -326,2 +326,20 @@ Session removal is permanent and cannot be undone. goose will show which session
 
+#### session rename [options]
+Rename a saved session. If no session ID is provided, goose will prompt you to select a session interactively.
+
+**Options:**
+- **`--session-id <session_id>`**: Rename a specific session by its session ID (e.g., `20251108_3`)
+- **`-n, --new-name <name>`**: The new name for the session (required)
+
+**Usage:**
+```bash
+# Rename a specific session by ID
+goose session rename --session-id 20251108_3 --new-name my-project
+
+# Interactive selection (prompts you to choose a session)
+goose session rename --new-name my-project
+```
+
+---
+
 #### session export [options]
@@ -700,2 +718,12 @@ This command is automatically invoked by ACP-compatible clients and is not typic
 
+:::warning Unattended environments
+goose uses the system keyring by default. On macOS, reading a credential may display a Keychain authorization prompt. If your ACP client runs goose without a user available to respond, keyring access can block indefinitely.
+
+Disable keyring access for that process and provide provider credentials through environment variables:
+
+```bash
+GOOSE_DISABLE_KEYRING=1 OPENAI_API_KEY='...' goose acp
+```
+:::
+
 ---
```
- `docs/guides/managing-tools/goose-permissions.md` → `i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/managing-tools/goose-permissions.md`

```diff
diff --git a/bcb924472c1651bf6bb8975662f12a9446487284 b/f234314b6c9ec9d3d9439651367c5d00a91b35ab
index bcb924472..f234314b6 100644
--- a/bcb924472c1651bf6bb8975662f12a9446487284
+++ b/f234314b6c9ec9d3d9439651367c5d00a91b35ab
@@ -8,3 +8,3 @@ import Tabs from '@theme/Tabs';
 import TabItem from '@theme/TabItem';
-import { PanelLeft, Tornado } from 'lucide-react';
+import { PanelLeft } from 'lucide-react';
 
@@ -44,16 +44,8 @@ Here's how to configure:
 
-    You can change modes before or during a session and it will take effect immediately.
+    Each session has its own permission mode. Use Settings to choose the default mode for new sessions. Existing sessions keep their current mode when you change this default.
 
-     <Tabs groupId="method">
-      <TabItem value="session" label="In Session" default>
-
-      Click the <Tornado className="inline" size={16} /> mode button from the bottom menu. 
-      </TabItem>
-      <TabItem value="settings" label="From Settings">
-        1. Click the <PanelLeft className="inline" size={16} /> button on the top-left to open the sidebar.
-        2. Click the `Settings` button on the sidebar.
-        3. Click `Chat`.
-        4. Under `Mode`, choose the mode you'd like.
-      </TabItem>
-    </Tabs>   
+    1. Click the <PanelLeft className="inline" size={16} /> button on the top-left to open the sidebar.
+    2. Click the `Settings` button on the sidebar.
+    3. Click `Chat`.
+    4. Under `Default Mode`, choose the mode you'd like.
   </TabItem>
```
- `docs/guides/sessions/session-management.md` → `i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/sessions/session-management.md`

```diff
diff --git a/af8fae24e11c9f110ede4ce2fb9ef7128bfb19a7 b/87a29f29d3586855054ba594807e736221428308
index af8fae24e..87a29f29d 100644
--- a/af8fae24e11c9f110ede4ce2fb9ef7128bfb19a7
+++ b/87a29f29d3586855054ba594807e736221428308
@@ -109,2 +109,14 @@ In your first session, goose prompts you to [set up an LLM (Large Language Model
 
+        To rename an existing session, use the `session rename` subcommand:
+
+        ```sh
+        goose session rename --session-id 20260213_9 --new-name my-new-name
+        ```
+
+        If you omit the session ID, goose will prompt you to select a session interactively:
+
+        ```sh
+        goose session rename --new-name my-new-name
+        ```
+
         If you want to confirm the session name, run:
```
- `docs/guides/sessions/smart-context-management.md` → `i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/sessions/smart-context-management.md`

```diff
diff --git a/6e4ba7013093c382f93e08c87a8eb2663568f5f4 b/d6bc4834fbd0ed5b64a93c1aecf350c51e9f1374
index 6e4ba7013..d6bc4834f 100644
--- a/6e4ba7013093c382f93e08c87a8eb2663568f5f4
+++ b/d6bc4834fbd0ed5b64a93c1aecf350c51e9f1374
@@ -381,3 +381,3 @@ Pricing data is regularly fetched from the OpenRouter API and cached locally. Th
 
-These costs are estimates only, and not connected to your actual provider bill. The cost shown is an approximation based on token counts and public pricing data.
+These costs are public-price estimates only, not invoices or a view of your actual provider bill. The displayed amount approximates usage from token counts and public catalog rates; provider-reported costs take precedence when available.
 </TabItem>
```

## 尚无译文

无。
