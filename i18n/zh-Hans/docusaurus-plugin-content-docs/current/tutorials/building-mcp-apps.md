---
title: 构建 MCP 应用
description: 创建在 goose 桌面版内部渲染的交互式 UI 应用
---

import { PanelLeft } from 'lucide-react';

# 为 goose 构建 MCP 应用

MCP 应用让 MCP 服务器返回交互式界面，直接在 goose 聊天界面中渲染，而不是只用文本回复。这让用户通过交互表达意图，适合需要输入、迭代或视觉反馈的工作流。

:::warning 实验性
goose 对 MCP 应用的支持是实验性的，基于一份草案规范。实现是最小化的，可能会变化，并且尚不支持高级能力或持久应用窗口。
:::

在本教程中，你将用 JavaScript 和 Node.js 构建一个 MCP 应用。该应用包含一个交互式计数器，与宿主主题保持同步，并把消息发回聊天，展示用户意图如何从界面流向智能体。

:::info 前提条件
- 已安装 Node.js 18+
- 已安装 goose 桌面版 1.19.1+
:::

---

## 步骤 1：初始化项目

创建一个新目录并初始化 Node.js 项目：

```bash
mkdir mcp-app-demo
cd mcp-app-demo
npm init -y
```

安装 MCP SDK：

```bash
npm install @modelcontextprotocol/sdk
```

更新 `package.json`，通过添加 `"type": "module"` 使用 ES 模块：

```json5
{
  "name": "mcp-app-demo",
  "version": "1.0.0",
  // highlight-next-line
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"
  }
}
```

---

## 步骤 2：创建 MCP 服务器

创建 `server.js`——这是加载并提供 HTML 的 MCP 服务器：

<details>
<summary>server.js</summary>

```javascript
#!/usr/bin/env node

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Load HTML from file
const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_HTML = readFileSync(join(__dirname, "index.html"), "utf-8");

// Create the MCP server
const server = new Server(
  {
    name: "mcp-app-demo",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "show_demo_app",
        description: "Shows an interactive demo MCP App UI in the chat",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  if (name === "show_demo_app") {
    return {
      content: [
        {
          type: "text",
          text: "The demo app is now displayed!",
        },
      ],
      // This metadata tells goose to render the MCP App
      _meta: {
        ui: {
          resourceUri: "ui://mcp-app-demo/main",
        },
      },
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "ui://mcp-app-demo/main",
        name: "MCP App Demo",
        description: "An interactive demo",
        mimeType: "text/html;profile=mcp-app",
      },
    ],
  };
});

// Read resource content - returns the HTML
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === "ui://mcp-app-demo/main") {
    return {
      contents: [
        {
          uri: "ui://mcp-app-demo/main",
          mimeType: "text/html;profile=mcp-app",
          text: APP_HTML,
          _meta: {
            ui: {
              csp: {
                connectDomains: [],
                resourceDomains: [],
                frameDomains: [],
                baseUriDomains: [],
              },
              prefersBorder: true,
            },
          },
        },
      ],
    };
  }

  throw new Error(`Resource not found: ${uri}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP App Demo server running on stdio");
}

main().catch(console.error);
```

</details>

---

## 步骤 3：创建应用 HTML

创建 `index.html`——这是你的交互式界面：

<details>
<summary>index.html</summary>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>MCP App Demo</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 20px;
      min-height: 100vh;
      transition: background-color 0.3s, color 0.3s;
    }
    
    body.light { background: #f5f5f7; color: #1d1d1f; }
    body.dark { background: #1d1d1f; color: #f5f5f7; }
    
    .container {
      max-width: 500px;
      margin: 0 auto;
      padding: 24px;
      border-radius: 16px;
    }
    
    body.light .container { background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    body.dark .container { background: #2d2d2f; box-shadow: 0 1px 3px rgba(0,0,0,0.3); }
    
    h1 { font-size: 24px; margin-bottom: 8px; }
    .subtitle { opacity: 0.7; margin-bottom: 20px; font-size: 14px; }
    
    .counter-section {
      text-align: center;
      padding: 24px;
      border-radius: 12px;
      margin-bottom: 20px;
    }
    
    body.light .counter-section { background: #f5f5f7; }
    body.dark .counter-section { background: #1d1d1f; }
    
    .counter-value { font-size: 64px; font-weight: bold; color: #0071e3; }
    .counter-label { font-size: 14px; opacity: 0.6; margin-top: 4px; }
    
    .button-row { display: flex; gap: 12px; justify-content: center; margin-top: 16px; }
    
    button {
      padding: 12px 24px;
      font-size: 18px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      color: white;
      transition: opacity 0.2s;
    }
    
    button:hover { opacity: 0.85; }
    button:active { opacity: 0.7; }
    
    .btn-increment { background: #0071e3; }
    .btn-decrement { background: #ff3b30; }
    .btn-reset { background: #86868b; }
    .btn-send { background: #34c759; }
    
    .message-section { margin-top: 20px; }
    .message-section h3 { font-size: 16px; margin-bottom: 12px; }
    .message-input { display: flex; gap: 8px; }
    
    input[type="text"] {
      flex: 1;
      padding: 12px 16px;
      border-radius: 8px;
      border: 2px solid transparent;
      font-size: 14px;
      transition: border-color 0.2s;
    }
    
    body.light input { background: #f5f5f7; color: #1d1d1f; }
    body.dark input { background: #1d1d1f; color: #f5f5f7; }
    input:focus { outline: none; border-color: #0071e3; }
    
    .status {
      margin-top: 16px;
      padding: 12px;
      border-radius: 8px;
      font-size: 13px;
      display: none;
    }
    
    .status.show { display: block; }
    .status.success { background: rgba(52, 199, 89, 0.15); color: #34c759; }
    .status.error { background: rgba(255, 59, 48, 0.15); color: #ff3b30; }
    
    .info-section {
      margin-top: 20px;
      padding: 16px;
      border-radius: 8px;
      font-size: 12px;
      opacity: 0.8;
    }
    
    body.light .info-section { background: #f5f5f7; }
    body.dark .info-section { background: #1d1d1f; }
    
    .info-section code {
      background: rgba(0, 113, 227, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'SF Mono', Monaco, monospace;
    }
  </style>
</head>
<body class="light">
  <div class="container">
    <h1>🎮 MCP App Demo</h1>
    <p class="subtitle">An interactive UI running inside goose</p>
    
    <div class="counter-section">
      <div class="counter-value" id="counter">0</div>
      <div class="counter-label">Counter Value</div>
      <div class="button-row">
        <button class="btn-decrement" onclick="updateCounter(-1)">−</button>
        <button class="btn-reset" onclick="resetCounter()">Reset</button>
        <button class="btn-increment" onclick="updateCounter(1)">+</button>
      </div>
    </div>
    
    <div class="message-section">
      <h3>💬 Send a message to goose</h3>
      <div class="message-input">
        <input type="text" id="messageInput" placeholder="Type a message..." />
        <button class="btn-send" onclick="sendMessage()">Send</button>
      </div>
      <div class="status" id="status"></div>
    </div>
    
    <div class="info-section">
      <strong>How this works:</strong><br><br>
      This UI is served as an MCP resource with the <code>ui://</code> scheme. 
      It communicates with goose via JSON-RPC messages through the sandbox bridge.
      <br><br>
      • Counter uses local state<br>
      • "Send" calls <code>ui/message</code> to append text to chat<br>
      • Theme syncs with goose's theme setting
    </div>
  </div>

  <script>
    class McpAppClient {
      constructor() {
        this.pendingRequests = new Map();
        this.requestId = 0;
        this.initialized = false;
        this.hostContext = null;
        
        window.addEventListener('message', (e) => this.handleMessage(e));
        this.initialize();
      }
      
      async initialize() {
        try {
          const result = await this.request('ui/initialize', {});
          this.hostContext = result.hostContext;
          this.initialized = true;
          
          if (this.hostContext?.theme) {
            this.applyTheme(this.hostContext.theme);
          }
          
          this.notify('ui/notifications/initialized', {});
          this.reportSize();
        } catch (error) {
          console.error('Failed to initialize MCP App:', error);
        }
      }
      
      handleMessage(event) {
        const data = event.data;
        if (!data || typeof data !== 'object') return;
        
        if ('id' in data && this.pendingRequests.has(data.id)) {
          const { resolve, reject } = this.pendingRequests.get(data.id);
          this.pendingRequests.delete(data.id);
          data.error ? reject(new Error(data.error.message)) : resolve(data.result);
          return;
        }
        
        if (data.method === 'ui/notifications/host-context-changed') {
          if (data.params?.theme) {
            this.applyTheme(data.params.theme);
          }
        }
      }
      
      request(method, params) {
        return new Promise((resolve, reject) => {
          const id = ++this.requestId;
          this.pendingRequests.set(id, { resolve, reject });
          window.parent.postMessage({ jsonrpc: '2.0', id, method, params }, '*');
          
          setTimeout(() => {
            if (this.pendingRequests.has(id)) {
              this.pendingRequests.delete(id);
              reject(new Error('Request timed out'));
            }
          }, 30000);
        });
      }
      
      notify(method, params) {
        window.parent.postMessage({ jsonrpc: '2.0', method, params }, '*');
      }
      
      applyTheme(theme) {
        document.body.className = theme;
      }
      
      reportSize() {
        this.notify('ui/notifications/size-changed', { height: document.body.scrollHeight });
      }
      
      async sendMessageToChat(text) {
        return this.request('ui/message', { content: { type: 'text', text } });
      }
    }
    
    const mcpApp = new McpAppClient();
    
    let counter = 0;
    
    function updateCounter(delta) {
      counter += delta;
      document.getElementById('counter').textContent = counter;
      mcpApp.reportSize();
    }
    
    function resetCounter() {
      counter = 0;
      document.getElementById('counter').textContent = counter;
      mcpApp.reportSize();
    }
    
    async function sendMessage() {
      const input = document.getElementById('messageInput');
      const message = input.value.trim();
      
      if (!message) {
        showStatus('Please enter a message', 'error');
        return;
      }
      
      try {
        await mcpApp.sendMessageToChat(message);
        showStatus('Message sent to chat!', 'success');
        input.value = '';
      } catch (error) {
        showStatus('Failed to send: ' + error.message, 'error');
      }
    }
    
    function showStatus(message, type) {
      const status = document.getElementById('status');
      status.textContent = message;
      status.className = 'status show ' + type;
      setTimeout(() => { status.className = 'status'; }, 3000);
    }
    
    document.getElementById('messageInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  </script>
</body>
</html>
```

</details>

---

## 步骤 4：添加到 goose 桌面版

1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
2. 点击 `Extensions`
3. 点击 `Add custom extension`
4. 填写详情：
   - **Type**：`Standard IO`
   - **ID**：`mcp-app-demo`
   - **Name**：`MCP App Demo`
   - **Command**：`node /full/path/to/mcp-app-demo/server.js`
5. 点击 `Add`

更多选项见[添加扩展](/docs/getting-started/using-extensions#adding-extensions)。

---

## 步骤 5：测试你的应用

1. 重启 goose 以加载新扩展
2. 提示 goose：“Show me the demo app”
3. goose 会调用 `show_demo_app` 工具
4. 你的交互式应用会在聊天中渲染！

试试：
- 点击计数器按钮
- 输入一条消息并点击 “Send”
- 在 goose 的浅色/深色模式之间切换

---

## 工作原理

```
┌──────────────────────────────────────┐
│           Your MCP App               │  HTML/JS in sandboxed iframe
└──────────────────┬───────────────────┘
                   │ postMessage
┌──────────────────▼───────────────────┐
│          goose Desktop               │  Renders UI, routes messages
└──────────────────┬───────────────────┘
                   │ MCP Protocol
┌──────────────────▼───────────────────┐
│          Your MCP Server             │  Serves HTML via resources
└──────────────────────────────────────┘
```

你的服务器返回一个 `ui://` 资源 URI，goose 获取 HTML 并在 iframe 中渲染。应用通过 `postMessage` 回传通信——请求主题信息、向聊天发送消息，或调整自身大小。

MCP 应用运行在带有严格内容安全策略限制的沙箱 iframe 中。

### 内容安全策略配置

默认情况下，应用只能从自己的源加载资源。如果应用需要与外部域名交互——例如从 CDN 加载资源、发起 API 调用或嵌入地图——可以通过资源 `_meta.ui` 部分中的 `csp` 对象配置允许哪些域名。

```javascript
_meta: {
  ui: {
    csp: {
      connectDomains: [],      // Domains for fetch/XHR requests
      resourceDomains: [],     // Domains for scripts, styles, images, fonts, media
      frameDomains: [],        // Origins allowed for nested iframes
      baseUriDomains: [],      // Additional allowed base URIs
    },
  },
}
```

| 选项 | CSP 指令 | 用途 | 默认值 |
|--------|---------------|---------|---------|
| `connectDomains` | `connect-src` | 应用可以发起网络请求的域名 | 仅同源 |
| `resourceDomains` | `script-src`, `style-src`, `img-src`, `font-src`, `media-src` | 加载外部资源的域名 | 仅同源 |
| `frameDomains` | `frame-src` | 允许嵌套 `<iframe>` 元素的源 | `'none'`（不允许 iframe） |
| `baseUriDomains` | `base-uri` | 允许用于 `<base>` 元素的额外域名 | 仅 `'self'` |

<details>
<summary>示例</summary>

**嵌入地图：**

```javascript
csp: {
  frameDomains: ['https://www.openstreetmap.org'],
  resourceDomains: ['https://tile.openstreetmap.org'],
}
```

**从 CDN 加载资源：**

```javascript
csp: {
  resourceDomains: ['https://cdn.jsdelivr.net', 'https://unpkg.com'],
  connectDomains: ['https://api.example.com'],
}
```

</details>

:::warning 安全考虑
只添加你信任的域名。每增加一个域名，都会扩大可以在应用中加载或嵌入的外部内容范围。保持列表尽量小且具体，以降低安全风险。
:::

### 请求浏览器权限

MCP 应用可以使用 Permission Policy 请求特定的浏览器权限。这对需要访问摄像头、麦克风或定位服务等设备能力的应用很有用。这些只是请求——宿主可能不会授予，应用应使用特性检测来处理权限不可用的情况。

要为 MCP 应用声明权限，在资源的 `_meta.ui` 部分包含 `permissions` 对象：

```javascript
_meta: {
  ui: {
    permissions: {
      camera: true,           // Request camera access
      microphone: true,       // Request microphone access
      geolocation: true,      // Request geolocation access
      clipboardWrite: true,   // Request clipboard write access
    },
  },
}
```

| 权限 | Permission Policy 特性 | 用例 |
|------------|---------------------------|----------|
| `camera` | `camera` | 视频采集、二维码扫描 |
| `microphone` | `microphone` | 录音、语音输入 |
| `geolocation` | `geolocation` | 位置感知应用、地图 |
| `clipboardWrite` | `clipboard-write` | 复制到剪贴板 |

所有权限默认为 `false`。只请求应用真正需要的权限。

<details>
<summary>示例：视频录制应用</summary>

```javascript
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === "ui://my-video-app/recorder") {
    return {
      contents: [
        {
          uri: "ui://my-video-app/recorder",
          mimeType: "text/html;profile=mcp-app",
          text: VIDEO_RECORDER_HTML,
          _meta: {
            ui: {
              permissions: {
                camera: true,
                microphone: true,
              },
            },
          },
        },
      ],
    };
  }
});
```

</details>

:::info 需要用户同意
即使 MCP 应用请求了权限，浏览器在授予访问之前仍会提示用户同意。用户可以随时拒绝权限请求。
:::

安全细节和完整协议见 [MCP Apps 规范](https://github.com/modelcontextprotocol/ext-apps)。



