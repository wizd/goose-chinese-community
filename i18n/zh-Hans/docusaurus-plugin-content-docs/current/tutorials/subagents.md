---
title: 使用子智能体
description: 组建一支子智能体团队，构建一个功能完整的应用
image: /img/tutorial-using-subagents.png
---

本教程带你组建一支 AI [子智能体](/docs/guides/context-engineering/subagents/)团队，并引导它们构建一个功能完整的应用。

你将构建 **AI BriefMe**，一个根据任意主题生成结构化高管风格简报的应用。

你将使用 goose 编排一支完整的软件子智能体团队：

- 🧠 **规划者** – 定义产品和 MVP 范围
- 📋 **项目经理** – 拆解任务并协调执行
- 🏗️ **架构师** – 搭建项目结构和技术栈
- 💻 **前端和后端开发者** – 构建界面和 API 逻辑
- 🧪 **QA** – 编写测试，并标出缺陷或上线阻碍
- 📝 **技术写作者** – 记录安装、用法和 API 细节

会话结束时，你会得到一个可运行的原型，并清楚了解如何把 AI 智能体用于真实工作流。

## 设置

1. [安装 goose](/docs/getting-started/installation)
2. 在 goose 中选择工作目录。建议在新建目录中工作。
3. 把以下内容加入 [.goosehints](/docs/guides/context-engineering/using-goosehints/#local-hints-file)
```plaintext
Create apps in html, javascript, and css when possible.
NEVER run blocking server commands (node server.js, npm start, etc.) - provide commands for user to run separately.
```
4. （可选）安装 [goose 文档扩展](/docs/mcp/goose-docs-mcp)，以便在需要时向 goose 询问它自己

## 任务

你将组建一支子智能体团队来帮忙，构建一个由 AI 驱动的简报应用。每个智能体都有明确角色。你的工作是想清楚如何提示 goose 委派工作。

> 🛟 如果卡住了，可以偷看提示示例。

---

### 1. 🧠 规划者

让规划者定义产品愿景和范围。规划者应该决定：
- 这个应用是什么
- 它为谁服务
- 它解决什么问题
- MVP 的核心功能

这份输出应该是清晰的产品定义，而不是代码。

<details>
  <summary>规划者智能体提示</summary>
  
  ```md
  You're the Planner agent for a hands-on AI app building session using goose and subagents. We are building the MVP *right now*.

  The app is called **AI BriefMe**. It generates a daily briefing on any given topic. A user inputs a topic like “Apple earnings” or “AI in DevOps,” and the app returns:
  - A title
  - Today's date
  - 2–3 bullet-point takeaways
  - (Optional) a code snippet or chart, if the topic is technical

  You're working with a team of subagents — PM, Architect, Frontend Dev, Backend Dev, QA, and Tech Writer — who will immediately begin executing your plan.

  Write a short, focused **Markdown file (`plan.md`)** that outlines:
  - The goals of the MVP
  - Only the features that can be built in a 40 minute session
  - Any helpful design considerations

  ✅ DO: Keep it lean and actionable  
  ❌ DON'T: Include long-term features like email delivery, user accounts, dashboards, analytics, personalization, mobile optimization, or 8-week timelines
  ```
</details>

---

### 2. 📋 项目经理

让项目经理把产品拆成开发任务。输出应该：
- 定义需要哪些角色（例如前端、后端）
- 列出具体任务并分配
- 标明哪些任务可以并行，哪些必须顺序进行

<details>
  <summary>项目经理智能体提示</summary>
  
  ```md
  You're the PM agent. A Planner has just created `plan.md` for a 1-hour build session of an app called "AI BriefMe."

  Your job is to:
  - Break the work into tasks for each subagent: Architect, Backend Dev, Frontend Dev, QA, Tech Writer
  - Group tasks by agent
  - Decide what work can be done in parallel vs what must be sequential
  - Output the task breakdown in Markdown and save it as `project_board.md`

  Be realistic and concise — this is a sprint, not a roadmap.
  ```
</details>

---

### 3. 🏗️ 架构师

让架构师规划技术搭建。他们应该：
- 选择技术栈（前端 + 后端框架，以及任何库）
- 描述文件夹结构和文件组织
- 标出你需要安装的内容（并可选择提供安装命令）

<details>
  <summary>架构师智能体提示</summary>
  
  ```md
  You are the Architect. Based on the project plan and `project_board.md`, set up the project scaffolding.

  Do the following:
  - Create the folder structure and all placeholder files (e.g. `index.html`, `server.js`, `style.css`, etc.)
  - Generate a `package.json` file that includes `express`, `cors`, and `child_process` as dependencies
  - Add a `.gitignore` that excludes `node_modules` and any temporary files
  - Define the API contract for the `/api/briefing` endpoint in Markdown

  ✅ Do NOT include or reference any API keys  
  ✅ Do NOT install packages — just scaffold the structure  
  ✅ DO list the output files and folders at the end

  ```
</details>

---

### 4. 💻 前端 + 后端开发者（并行）

并行启动两个开发子智能体来构建核心应用。一个处理 Express 服务器和后端逻辑，另一个构建界面并接上表单。goose 应该同时执行两个智能体，而不是一个接一个。

- 使用架构师给出的文件结构和 API 约定
- 后端使用无头 goose 编写 API 逻辑
- 前端构建调用 API 的响应式界面
- 确保智能体避免写入相同的文件

<details>
  <summary>开发智能体提示</summary>
  
  ```md
  Use **parallel execution** to run two subagents:

  - A 🛠️ Backend Developer
  - A 💻 Frontend Developer

  Both should work simultaneously — not sequentially — to build the AI BriefMe MVP.

  🛠️ **Backend Developer** should:
  - Implement `server.js` with Express
  - Add POST `/api/briefing` endpoint accepting `{ "topic": "string" }`
  - Use **Headless goose** to generate the summary:
    - `goose run -t "YOUR_PROMPT_HERE" --quiet --no-session --max-turns 1`
  - Use `child_process.spawn()` instead of `exec()`
  - Clean response: remove ANSI codes, markdown blocks, and extract JSON
  - Handle timeouts (max 60s) and errors
  - Serve frontend files from `express.static`
  - Add CORS
  - Do not require any API keys

  💻 **Frontend Developer** should:
  - Create `index.html`, `style.css`, and `script.js`
  - Build a form for entering a topic
  - Call the `/api/briefing` endpoint and display the result
  - Handle loading states and errors
  - Include a copy-to-clipboard button
  - Make it mobile-friendly
  - Do not interfere with backend files

  ⚠️ Important: These agents must not write to the same files. Keep their work isolated.

  ```
</details>

---

### 5. 🧪📝 QA + 技术写作者（并行）

开发完成后，启动最后两个子智能体：**QA 工程师**和**技术写作者**。他们会一起评估应用质量，并记录如何使用它。你的工作是用一种方式提示 goose，让两个智能体协作，而不重叠或重复劳动。

#### QA 智能体任务：
- 使用 Jest 之类的框架，为 `/api/briefing` 端点编写单元测试套件
- 创建 `QA_NOTES.md` 文件：
  - 标出缺陷或边界情况
  - 识别上线就绪的阻碍（例如安全、错误处理）
  - 建议提高可靠性的下一步

#### 技术写作者任务：
- 与 QA 协作，了解应用的当前状态
- 创建 `README.md` 文件，包含：
  - 应用做什么（用通俗语言）
  - 如何安装和运行
  - API 使用示例

⚠️ 重要：
- **QA 不应手动启动服务器**——只编写测试文件并模拟交互


<details>
  <summary>QA 智能体 + 📝 技术写作者智能体提示（并行）</summary>
  
  ```md
  The development phase is complete. Now it's time for quality assurance and documentation.

  Use **parallel execution** to run two subagents simultaneously:

  - 🧪 A **QA Agent** who will:
    - Write a unit test for the `/api/briefing` endpoint in `tests/briefing.test.js` using Jest
    - **Mock the child_process module** using `jest.mock('child_process')` at the top of the test file
    - Create a simple mock that returns fake data instead of calling the real goose CLI
    - Assert that the response includes: `title`, `date`, and 2–3 `takeaways`
    - Include tests for:
      - Valid topic input
      - Missing or invalid input
      - goose CLI timeout or error
    - **Do not start or run the server manually.** Only write test files.
    - **Do not execute `npm test` or run any tests.** Only create the test file.
    - Save a full QA analysis report in `QA_NOTES.md` with:
      - Critical issues
      - Security or performance gaps
      - Recommendations for production readiness
    - **When all files are created, immediately state: "QA Agent Sign-off: ✅ COMPLETE" and finish.**

  - 📝 A **Tech Writer Agent** who will:
    - Create a `README.md` that includes:
      - Project overview
      - How to run the app locally
      - API endpoint documentation
      - Example request/response
      - Troubleshooting section
    - **When documentation is complete, immediately state: "Tech Writer Sign-off: ✅ COMPLETE" and finish.**

  Both agents should work in parallel, not sequentially.
  ```
</details>

---

## 测试你完成的应用

所有智能体完成工作后，你应该有一个可运行的原型。下面是如何看到它实际运行：

### 步骤 1：安装依赖
```bash
cd your-project-folder
npm install
```

### 步骤 2：启动服务器
**重要**：在**单独的终端窗口**中运行（不要在 goose 中运行）：
```bash
npm start
```

你应该看到：
```
AI BriefMe server running on port 3000
Health check: http://localhost:3000/health
Briefing endpoint: http://localhost:3000/api/briefing
```

### 步骤 3：打开应用
打开浏览器并前往：
```
http://localhost:3000/
```

**注意**：使用根 URL（`/`），不要用 `/ai-briefme/`

### 步骤 4：测试它
1. 输入一个主题，例如 “JavaScript frameworks” 或 “climate change”
2. 点击 “Get Briefing”
3. 看着 AI 生成你的简报！

你应该看到：
- 干净、响应式的界面
- AI 生成的简报，包含标题、日期和要点
- 技术主题的代码示例
- 复制到剪贴板的功能

:::tip 让服务器保持运行
- **不要关闭**正在运行服务器的终端
- **不要在 goose 中运行服务器**——它会卡住
- 如果需要停止：在服务器终端中按 `Ctrl+C`
- 如果需要 goose 修复或添加内容，告诉它！完成后重启服务器
:::

**恭喜！你已经用 goose 子智能体构建了一个全栈 AI 应用！** 🎉

:::warning
不要指望你的应用已经可以上线。这个工作坊展示了用 goose 进行氛围编程如何加速原型制作，但判断和打磨仍然由人负责。
:::

---

## 故障排除

### Cannot POST /api/briefing（404 错误）
**原因**：路由未注册，或服务器未重启
**解决方案**：
1. **停止服务器**（在终端中按 Ctrl+C）
2. **重启服务器**：`node server.js`
3. **用 curl 测试**：
   ```bash
   curl -X POST http://localhost:3000/api/briefing -H "Content-Type: application/json" -d '{"topic":"test"}'
   ```
4. **应该返回 JSON，而不是 HTML**

---

### Unexpected token

**原因**：前端收到的是 HTML 而不是 JSON（通常是 404 页面）
**解决方案**：
1. **首先直接测试 API**：
   ```bash
   curl -X POST http://localhost:3000/api/briefing -H "Content-Type: application/json" -d '{"topic":"test"}'
   ```
2. **如果返回的是 HTML**：你的 API 路由没有工作（见问题 1）
3. **如果返回的是 JSON**：查看浏览器 Network 标签页，看前端实际调用的是哪个 URL
4. **常见修复**：确保你在 `http://localhost:3000/` 访问应用，而不是 `/ai-briefme/`

---

### 进程超时
**原因**：goose 耗时过长或挂起
**解决方案**：
1. **检查 goose 命令标志**：
   ```javascript
   ['run', '-t', prompt, '--quiet', '--no-session', '--max-turns', '1']
   ```
2. **手动测试 goose**：
   ```bash
   goose run -t "Return JSON: {\"test\": \"value\"}" --quiet --no-session --max-turns 1
   ```
3. **如果手动测试成功**：检查你的 spawn() 实现
4. **如果手动测试挂起**：先试一条更简单的提示

---

### JSON 解析错误
**原因**：goose 返回带颜色代码的格式化输出
**解决方案**：
1. **在 JSON.parse() 之前加入这段清理代码**：
   ```javascript
   // Remove ANSI color codes
   jsonString = jsonString.replace(/\x1b\[[0-9;]*m/g, '');
   // Remove markdown formatting
   jsonString = jsonString.replace(/```json\s*/, '').replace(/```\s*$/, '');
   jsonString = jsonString.replace(/```\s*/, '');
   ```
2. **加入调试日志**，看看你实际得到了什么：
   ```javascript
   console.log('Raw goose response:', aiResponse);
   console.log('Cleaned JSON string:', jsonString);
   ```

---

### 端口已被占用（EADDRINUSE）
**解决方案**：
1. **找出谁在使用端口 3000**：
   ```bash
   lsof -ti:3000
   ```
2. **结束该进程**：
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```
3. **或使用其他端口**：
   ```javascript
   const PORT = process.env.PORT || 3001;
   ```
---

### 应用显示空白页
**解决方案**：
1. **确认你在正确的 URL**：`http://localhost:3000/`（不是 `/ai-briefme/`）
2. **检查浏览器控制台**中的 JavaScript 错误
3. **验证静态文件已被提供**：
   ```javascript
   app.use(express.static(__dirname));
   ```
4. **测试各个文件**：
   - `http://localhost:3000/index.html`
   - `http://localhost:3000/style.css`
   - `http://localhost:3000/script.js`
