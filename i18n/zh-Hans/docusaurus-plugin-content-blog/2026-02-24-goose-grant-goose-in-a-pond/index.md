---
title: "资助获奖项目：goose In A Pond"
description: "介绍一个隐私优先、由边缘硬件上的 goose 驱动的本地 AI 家庭助手。"
authors:
  - angie
image: /img/blog/goose-grant-goose-in-a-pond.png
---

![博客横幅](/img/blog/goose-grant-goose-in-a-pond.png)

我们推出了 [goose 资助计划](/grants/)，为构建智能体 AI 未来的开发者提供 10 万美元资助。我们在寻找有雄心、把 goose 推进到新领域的开源项目。今天，我们很高兴介绍其中一位获奖者：**goose In A Pond**。这个项目把 goose 从桌面带进你的家。

<!--truncate-->

## 什么是 goose In A Pond？

goose In A Pond 是建立在 goose 之上的完全本地、隐私优先的智能家居助手。把它想成智能音箱*应该*成为的样子：一个真正跑在你硬件上的 AI 助手，离线理解你的声音，控制你的设备，并且从不把数据送到云端。

项目由 [Jarida](https://jarida-io.web.app/) 构建，这是一支位于肯尼亚内罗毕的五人开发团队，由 [Jerry Ochieng](https://linkedin.com/in/jerry-ochieng) 带领。他们把 goose 的开源智能体框架部署到边缘硬件上，具体是 NVIDIA Jetson Orin Nano，来创建一个模块化的、智能体式的家庭中枢，由你完全拥有和控制。

市面上的智能助手并不少，但它们大多有同一个问题：依赖供应商和云，并把你的数据当成属于别人的东西。goose In A Pond 把这一点完全反过来。

让它突出的是这些：

### 一切都在本地运行

所有计算——语音识别、语言建模、记忆、设备控制——都发生在设备上。没有云。没有外部服务器。没有数据离开你的家。团队选择 Jetson Orin Nano 作为主要平台，它可以以每秒 40–70 个 token 运行量化的 1–7B 参数语言模型。这足够快，可以在不需要互联网连接的情况下进行自然的对话式交互。

### 真正能用的离线语音

这个项目最酷的部分之一，是完全离线的语音流水线。以 goose 实验性的 [Perception 扩展](https://github.com/michaelneale/goose-perception) 为基础，系统监听唤醒词（自然是 “goose” 🪿），然后切换到更高质量的转写模式来捕捉你说的话。唤醒词检测、语音识别和文本转语音都使用 Whisper、Vosk 和 Coqui TTS 等开源模型在本地运行。

他们在 Raspberry Pi 5 上的早期基准显示，响应时间可用，只有几秒延迟，在低连通性环境中与商业云助手相当（有时更好）。

### 智能设备控制

对于有标准 API 的设备（智能灯泡、开关等），goose In A Pond 通过 zigbee2mqtt 和 HTTP/MQTT 等协议集成。但那些*没有*开放 API 的设备呢？

团队对此也有答案：

- **红外发射**，用连接到 GPIO 的红外 LED 控制电视和空调等老设备
- **Android 沙箱**，通过 ADB 和 UIAutomator 自动化不暴露 API 的专有应用
- **蓝牙和 USB 控制**，与传感器和外设直接通信

他们实质上是在把 goose 建成你整个家的万能遥控器——开放还是封闭生态，都没关系。

### 会自我改进的助手

goose In A Pond 不只是一个静态工具。通过 goose 的[记忆扩展](/docs/mcp/memory-mcp)和反馈回路系统，它学习你的偏好，调整自己的行为，并随时间打磨自己的提示。团队也在探索自我精炼技术，让系统分析自己的会话日志来优化自动化行为。这是那种你用得越多就越好的智能体。

### 移动伴侣

项目还包括一个叫 **goose On The Go** 的移动伴侣应用。想法是从手机控制你的家庭助手，无论你在沙发上还是出门在外。实时仪表盘、语音和文本输入、推送通知和远程命令执行，全部连回你的本地 goose 实例。

## 他们正在构建的 MCP

这个项目对更广泛的 goose 社区如此有价值，部分原因是 Jarida 团队计划开源的一组 MCP 服务器和扩展：

- **Moonbeam MCP** — 一个 Android UI 自动化服务器（可以想成给 Android 用的 Playwright），通过应用控制智能设备
- **Local Vision Event Detection MCP** — 在本地处理摄像头画面，用于运动检测、宠物检测、包裹到达等
- **Offline ASR / Voice Command MCP** — 完全本地的语音处理，带唤醒词检测和命令解析
- **Sensor Data Aggregator MCP** — 从本地传感器（温度、湿度、运动、电表）收集数据，并通过 MCP 暴露
- **Local Routine / Scheduler MCP** — 用自然语言定义自动化，比如“早上 7 点，打开灯和咖啡机”
- **Privacy Audit / Logs MCP** — 监控 goose 在做什么，跟踪设备活动，并标记潜在的隐私问题
- **Inter-Agent Coordination MCP** — 让多个 goose 智能体协调任务并共享上下文

这些扩展不只会驱动 goose In A Pond，也会提供给 goose 社区里的任何人使用和在其上构建。

## 认识 Jarida 团队

Jarida 团队是东非天主教大学的五位毕业生，他们围绕一个共同信念聚到一起：开源不只是构建软件的好方式，它是*正确*的方式。他们年轻、饥渴，并全身心投入这个项目。

- **Jerry Ochieng** — 团队负责人与设备端智能负责人。后端工程师、AI 爱好者，也是训练了肯尼亚手语到英语的设备端模型的人。
- **Liz Wangui** — 产品与开发者关系负责人。带来 Red Bull Kenya 的市场经验，以及后端工程的技术能力。
- **Emmanuel Charles** — 后端与安全负责人。持有 ISC² 认证，有网络云运维背景，确保一切保持私密和安全。
- **Africia Kerubo** — UI/UX 与 AI 负责人。把以人为本的设计与 AI 融合，做出感觉自然的界面。
- **Purity Wanjiru** — 移动、QA 与自动化负责人。持有 Cisco 道德黑客认证，负责 goose On The Go 的移动设计。

他们也由 Google 高级 UX 研究员 **Obinna Anya** 和 Google 肯尼亚 Android 增长负责人 **Harold Nyikal** 指导。

## 接下来

团队有一份为期一年、分成四个季度的路线图：

1. **第一季度** — 让 goose 在 Jetson 硬件上本地运行，具备语音输入和离线 LLM 响应，处理基本任务
2. **第二季度** — 通过原生和沙箱方法控制智能设备，加上移动伴侣应用
3. **第三季度** — 自我改进的智能体能力、家庭安防摄像头集成，以及记忆精炼
4. **第四季度** — 完整开源发布，带安装文档、开发套件、起步模板、演示视频和社区反馈系统

到结束时，goose In A Pond 应该是任何人都可以安装、定制和贡献的东西。

---

goose 资助计划的存在，是为了支持那些把 goose 推进到我们尚未想象之处的项目。goose In A Pond 正是如此。它把 goose 从你笔记本上的开发者工具，变成跑在边缘硬件上的完整家庭助手——完全本地，完全开放，完全属于你。

我们迫不及待想看到 Jarida 团队做出什么。如果你想跟随进展，加入 [goose 社区](https://discord.gg/n8R5VaWDAn)，并留意项目推进时的更新。

如果你*自己*对 goose 能做什么有一个大胆的想法？**[goose 资助计划](/grants/)** 也许适合你 🪿

<head>
  <meta property="og:title" content="认识 goose 资助获奖项目：goose In A Pond" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2026/02/24/goose-grant-goose-in-a-pond" />
  <meta property="og:description" content="介绍一个隐私优先、由边缘硬件上的 goose 驱动的本地 AI 家庭助手。" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/banner-ae6f66bdec317d7e20264c4a62ad0013.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="aaif-goose.github.io" />
  <meta name="twitter:title" content="认识 goose 资助获奖项目：goose In A Pond" />
  <meta name="twitter:description" content="介绍一个隐私优先、由边缘硬件上的 goose 驱动的本地 AI 家庭助手。" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/banner-ae6f66bdec317d7e20264c4a62ad0013.png" />
</head>
