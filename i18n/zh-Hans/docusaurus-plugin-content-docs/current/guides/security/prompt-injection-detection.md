---
sidebar_position: 1
title: 提示词注入检测
sidebar_label: 提示词注入检测
description: 在可能有害的命令运行之前检测它们，从而保护你的工作流。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PanelLeft, Settings } from 'lucide-react';

提示词注入是指恶意指令被藏在可执行内容里。在 AI 领域，提示词注入可以用来推动 AI 代理（如 goose）运行不安全的命令，从而危及你的环境或数据。

你可以启用提示词注入检测来帮助保护 goose 工作流。该功能使用模式匹配来检测常见攻击手法，包括：
- 试图删除系统文件或目录
- 下载并执行远程脚本的命令
- 试图访问或外泄 SSH 密钥等敏感数据
- 可能危及安全的系统修改

此外，你可以选择启用使用指定模型的[基于机器学习的扫描](#enhanced-detection-with-machine-learning)。

:::important
这些检查提供的是防护，不是保证。它们能检测已知模式，但无法捕获所有可能的威胁，尤其是新颖或复杂的攻击。
:::

## 检测如何工作

启用后，goose 使用多层方法在威胁运行前进行检测：

1. **拦截并分析工具调用** - 当 goose 准备执行工具时，安全系统会提取工具参数文本，并对照[威胁模式](https://github.com/aaif-goose/goose/blob/main/crates/goose/src/security/patterns.rs)进行检查。如果启用了基于机器学习的检测，它还会用机器学习分析工具调用和最近对话消息的语义内容，以便更好地理解上下文并减少误报。
2. **评估风险** - 检测到的威胁会被赋予置信度分数
3. **暂停执行** - 超过你所配置阈值的威胁需要你做决定
4. **出现安全警报** - 警报显示置信度、发现说明和唯一的发现 ID。例如：
   ```
   🔒 Security Alert: This tool call has been flagged as potentially dangerous.
   
   Confidence: 95%
   Explanation: Detected 1 security threat: Recursive file deletion with rm -rf
   Finding ID: SEC-abc123...
   
   [Allow Once] [Deny]
   ```
5. **你来选择**在查看警报细节后是继续还是取消。请注意：
   - 每个决定都会连同其发现 ID 记录在 [goose 系统日志](/docs/guides/logs#system-logs)中
   - 被允许的命令仍会以你的完整权限运行

**回应警报：**

- 阅读说明，理解是什么触发了检测
- 结合你的上下文考虑——这是否符合你想做的事？
- 尝试把请求说得更具体
- 检查来源，对未知来源的提示词要格外谨慎

有疑问时，选择拒绝。

## 启用检测

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    
    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
    2. 在侧边栏中点击 `Settings`
    3. 点击 `Chat` 选项卡
    4. 把 `Enable Prompt Injection Detection` 切换为开启
    5. 可选：调整 `Detection Threshold` 以[配置灵敏度](#configuring-detection-threshold)
    6. 可选：启用基于机器学习的检测：
       1. 把 `Enable ML-based Detection` 切换为开启
       2. 配置推理端点：
          - `Endpoint URL`：分类服务的 URL（例如 Hugging Face）
          - `API Token`：如果你的服务需要，填写身份验证令牌

  </TabItem>
  <TabItem value="config" label="goose config file">

    把安全提示设置加入 [`config.yaml`](/docs/guides/config-files)：

    ```yaml
    SECURITY_PROMPT_ENABLED: true
    SECURITY_PROMPT_THRESHOLD: 0.8  # Optional, default is 0.8

    # Optional: Enable ML-based detection (Hugging Face example)
    SECURITY_PROMPT_CLASSIFIER_ENABLED: true
    SECURITY_PROMPT_CLASSIFIER_ENDPOINT: "https://router.huggingface.co/hf-inference/models/protectai/deberta-v3-base-prompt-injection-v2"
    SECURITY_PROMPT_CLASSIFIER_TOKEN: "YOUR_HUGGING_FACE_TOKEN"
    ```

  </TabItem>
</Tabs>

:::info 其他安全功能
除提示词注入检测外，goose 还会自动：
- 在运行新的或更新过的配方之前警告你
- 在导入包含不可见 Unicode Tag Block 字符的配方时警告你
- 为本地运行的 MCP 服务器安装扩展时[检查已知恶意软件](/docs/troubleshooting/known-issues#malicious-package-detected)
:::

### 配置检测阈值

阈值（0.01–1.0）控制检测有多严格：

| 阈值 | 灵敏度 | 适用场景 |
|-----------|------------|----------|
| **0.01-0.50** | 非常宽松 | 你有经验并理解风险 |
| **0.50-0.70** | 平衡 | 一般开发工作（不错的默认值） |
| **0.70-0.90** | 严格 | 处理敏感数据或系统 |
| **0.90-1.00** | 最高 | 高安全环境 |

启用注入提示检测功能时，默认阈值为 0.8（推荐给大多数用户）。

较低的阈值意味着更少的警报，但可能漏掉威胁。较高的阈值能捕获更多潜在问题，但可能把合法操作也标记出来。你可以根据需要控制这种灵敏度与便利性的取舍。

## 用机器学习增强检测

默认情况下，提示词注入检测使用模式匹配，但你可以选择启用基于机器学习的检测，以提高准确度并减少误报。

基于机器学习的检测：
- 分析工具调用和最近消息的语义内容
- 检测模式可能遗漏的复杂攻击
- 通过理解对话上下文减少误报
- 需要提供分类端点 URL，以及 API 令牌（如需要）

:::warning 隐私考量
启用基于机器学习的检测后，工具调用内容和最近的消息会发送到所配置的端点进行分析。
:::

#### 自托管机器学习检测端点
如果想运行自己的分类端点，实现细节见[分类 API 规范](/docs/guides/security/classification-api-spec)。该 API 遵循 Hugging Face Inference API 格式。

## 另见

- [goose 权限模式](/docs/guides/managing-tools/goose-permissions) - 控制 goose 的自主程度
- [管理工具权限](/docs/guides/managing-tools/tool-permissions) - 细粒度的工具控制
