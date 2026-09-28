---
title: "给初学者的 WebMCP"
description: "WebMCP 让网站暴露结构化动作，AI 智能体可以直接调用。本指南解释它如何工作，它与 MCP 和浏览器自动化有何不同，以及如何构建你自己的支持 WebMCP 的站点。"
authors: 
    - rizel
image: /img/blog/webmcp-for-beginners.png
---

![博客封面](/img/blog/webmcp-for-beginners.png)

如果你以为 WebMCP 只是一个 MCP 服务器，请举手。我认罪。我也这么以为。事实证明它是一项 W3C 标准，使用与 MCP 相似的概念。下面是它实际是什么。

<!--truncate-->

## 什么是 WebMCP？

WebMCP 是网站定义动作、让 AI 智能体可以直接调用的一种方式。

通常，当智能体与网站交互时，它必须解释界面。它看着页面，试图找到输入框，点击按钮，并希望自己在与正确的元素交互。这个过程能用，但它是间接的，而且常常脆弱。

有了 WebMCP，网站去掉了那一层猜测。站点不再迫使智能体弄清 UI，而是暴露代表它支持的动作的函数。

所以智能体不必模拟用户流程，比如在输入框里打字再点按钮，而是可以调用类似这样的东西：

```javascript
set_background_color({ color: "coral" })
```

在这种情况下，智能体不是在试图理解页面布局或一步步导航。它在调用网站明确定义的函数，这让交互更直接、更可靠。

## WebMCP 不是 MCP

这是最重要的部分。MCP 和 WebMCP 解决相似的问题，但它们在完全不同的地方做这件事。

用 MCP 时，你运行一个暴露工具的服务器。你的智能体连接到那个服务器并调用那些工具。你负责构建它、托管它、处理认证，并随时间维护它。用 WebMCP 时，一切发生在浏览器里。网站自己定义工具，智能体通过访问页面发现它们。这次交互没有单独的服务器要部署。

另一种看法是：MCP 是你围绕想访问的系统构建的东西，而 WebMCP 是网站构建进自身的东西。

## 为什么存在 WebMCP

当你看到人们在规模上使用 MCP 时撞上的限制，WebMCP 背后的理由就更说得通。当团队试图构建大型 MCP 服务器时，他们往往最终得到太多工具，模型无法有效推理。除此之外，认证变得复杂，因为每个服务都有自己的要求，把这一切放在一个地方管理很困难。

浏览器已经解决了其中很多问题。当你登录一个网站时，你的会话、cookie 和认证状态已经就位。那套系统存在了多年，并且可靠地工作。WebMCP 建立在这个想法上，让网站在那个已认证的上下文里暴露自己的动作，而不要求一个单独的服务器来管理一切。

## WebMCP 不是 Playwright MCP 服务器

我直播了自己第一次探索 WebMCP，一个常见问题是：“这和 Chrome DevTools MCP 服务器或 Playwright MCP 服务器是一回事吗？”它们不是一回事。

这些 MCP 服务器启用浏览器自动化。浏览器自动化允许智能体通过与界面交互来控制浏览器。智能体可以截图、读取 DOM、点击元素、在输入框里打字并导航页面。这在任何网站上都能用，但智能体必须解释它看见的东西并决定如何行动。

WebMCP 采取不同做法。它只在实现了它的网站上工作，但当网站实现了它，智能体完全不需要解释 UI。网站提供结构化动作，智能体直接调用它们。

实践中，这个差别改变了交互模型。用浏览器自动化时，智能体跟随一串近似用户会做的步骤。用 WebMCP 时，智能体跳过那个过程，直接调用底层动作。

如果你在用 goose，Chrome DevTools MCP 仍然有用，因为它把 goose 连到浏览器。它充当桥梁。智能体与站点交互方式的改进来自 WebMCP 本身。

## 实践中的 WebMCP

为了更具体，想想从餐厅网站订餐。没有 WebMCP 时，你需要构建能理解那个站点如何工作的东西。这包括画出下单流程、处理登录、解析菜单和提交订单。每当站点变化，你也需要维护那套逻辑。如果你想支持多家餐厅，你得为每一家重复这个过程。

有了 WebMCP，餐厅定义一个像 `place_order` 这样的工具。站点已经知道自己的菜单结构、修改选项和结账流程。它也已经处理认证。智能体不必在外部重建这一切，只需调用站点提供的工具。

## 为什么它重要

这种做法突出有几个原因。网站已经比任何外部系统更理解自己的结构和逻辑。WebMCP 允许它们把那份知识编码一次，并提供给任何智能体。认证已经在浏览器内处理，这去掉了 MCP 服务器否则需要管理的大量复杂度。维护也转移到正确的地方。当网站变化时，拥有它的人更新他们的工具。你不再负责维护你不控制的系统的集成。

## 构建一个 WebMCP 站点

为了更好地理解这一点，我做了一个简单的取色器演示，暴露一个动作：改变页面的背景色。

结构看起来是这样：

```plaintext
my-webmcp-site/
├── index.html
├── style.css
└── webmcp.js
```

HTML 是一个基本页面：

```html
<!DOCTYPE html>
<html>
<head>
  <title>WebMCP Color Picker</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>🎨 Color Picker</h1>
    <p>Ask an AI to change my background!</p>
    <p>Current color: <span id="colorName">#6366f1</span></p>
  </div>
  <script src="webmcp.js"></script>
</body>
</html>
```

WebMCP 功能来自注册一个工具：

```javascript
if (window.navigator.modelContext) {
  window.navigator.modelContext.registerTool({
    name: "set_background_color",
    description: "Change the background color of the page",
    inputSchema: {
      type: "object",
      properties: {
        color: { type: "string" }
      },
      required: ["color"]
    },
    execute: ({ color }) => {
      document.body.style.backgroundColor = color;
      document.getElementById("colorName").textContent = color;

      return {
        content: [{
          type: "text",
          text: `Background color changed to ${color}`
        }]
      };
    }
  });
}
```

一旦注册，智能体访问页面时就可以发现并调用这个工具。让我印象深刻的一个细节是描述有多重要。模型用那个描述来决定何时调用工具、提供什么输入，所以具体会有差别。

## 定义工具的两种方式

你可以在 JavaScript 里定义工具，这对动态行为以及需要更多控制的应用很合适。还有一个更简单的选项，用表单属性直接在 HTML 里定义工具：

```html
<form 
  toolname="subscribe_newsletter"
  tooldescription="Subscribe an email address"
>
  <input 
    type="email" 
    name="email" 
    required
  />
  <button type="submit">Subscribe</button>
</form>
```

在这种情况下，浏览器自动把表单变成一个工具。这种方法适合你不需要自定义逻辑的简单用例。

## 把 goose 连到 WebMCP

因为 WebMCP 跑在浏览器里，你需要一种方式让 goose 与它交互。这就是 Chrome DevTools MCP 进来的地方。它充当 goose 和浏览器之间的桥梁，允许智能体访问 WebMCP 工具。

我测试时注意到的一件事是，单靠提示并不总是足以让智能体使用 WebMCP。我必须提供提示，解释如何发现和执行工具：

```markdown
const tools = await navigator.modelContextTesting.listTools();
const result = await navigator.modelContextTesting.executeTool("toolName", JSON.stringify({}));
```

没有那份指引，智能体会默认走浏览器自动化，因为那是当前模型更熟悉的。随着 WebMCP 变得更常见，这可能会变得不那么必要，但现在它有助于引导行为。

目前，WebMCP 只在选择实现它的站点上工作，这限制了它能被多广泛地使用。与此同时，方向很重要。网站可以定义自己的能力，让智能体以结构化方式与它们交互，而不是让智能体试图解释界面。这次转变减少猜测，简化集成，并把责任移到已经最理解自己的系统上。它仍然早期，但这个模型比试图自动化网上每一个界面更说得通。

## 资源

- [WebMCP 取色器演示](https://blackgirlbytes.github.io/webmcp-color-picker/)
- [WebMCP 航班演示](https://googlechromelabs.github.io/webmcp-tools/demos/react-flightsearch/)
- [WebMCP 披萨演示](http://googlechromelabs.github.io/webmcp-tools/demos/pizza-maker/)
- [逐步教程](https://blackgirlbytes.github.io/webmcp-color-picker/tutorial.html)
- [WebMCP 早期预览文档](https://docs.google.com/document/d/1rtU1fRPS0bMqd9abMG_hc6K9OAI6soUy3Kh00toAgyk/edit)
- [Chrome DevTools MCP](https://github.com/anthropics/anthropic-tools/tree/main/chrome-devtools-mcp)
- [WebMCP GitHub](https://github.com/anthropics/anthropic-tools/tree/main/chrome-devtools-mcp)

<iframe width="560" height="315" src="https://www.youtube.com/embed/4LfBsSWEitE" title="YouTube 视频播放器" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<head>
  <meta property="og:title" content="给初学者的 WebMCP" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2026/03/17/webmcp-for-beginners" />
  <meta property="og:description" content="WebMCP 让网站暴露结构化动作，AI 智能体可以直接调用。本指南解释它如何工作，它与 MCP 和浏览器自动化有何不同，以及如何构建你自己的支持 WebMCP 的站点。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/webmcp-for-beginners-f12da638fe0f49acf924c720a7d1243a.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="给初学者的 WebMCP" />
  <meta name="twitter:description" content="WebMCP 让网站暴露结构化动作，AI 智能体可以直接调用。本指南解释它如何工作，它与 MCP 和浏览器自动化有何不同，以及如何构建你自己的支持 WebMCP 的站点。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/webmcp-for-beginners-f12da638fe0f49acf924c720a7d1243a.png" />
</head>
