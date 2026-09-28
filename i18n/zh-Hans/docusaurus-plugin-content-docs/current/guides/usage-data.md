---
title: 匿名使用数据
sidebar_label: 使用数据
sidebar_position: 66
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PanelLeft } from 'lucide-react';

首次使用时，goose 会请求许可，收集匿名使用数据以帮助改进产品。你可以随时更改此设置。

## 收集的使用数据

为尊重你的隐私，只有在你选择加入时，goose 才会收集匿名使用指标。启用后会收集以下数据：

- 操作系统、版本和架构
- goose 版本和安装方式
- 使用的提供商和模型
- 扩展和工具的使用次数（仅名称）
- 会话指标（时长、交互次数、token 用量）
- 错误类型（例如 "rate_limit"、"auth"，不含细节）

收集的使用数据不包括你的对话、代码、工具参数、错误消息或任何个人数据。

:::info 提供商的数据处理
取决于你与 goose 一起使用的 [LLM](/docs/getting-started/providers)，你的对话、提示词以及 goose 访问的信息可能会发送给提供商，并受其数据保留和隐私政策约束。
:::

## 更改偏好

要更改使用数据收集偏好：

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏
    2. 在侧边栏中点击 `Settings`
    3. 点击 `App` 选项卡
    4. 在 `Privacy` 部分，打开或关闭 `Anonymous usage data`
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    用方向键在选项间移动，按 `Enter` 选择。实心圆点表示当前选择。
    1. 运行 `goose configure`
    2. 选择 `goose settings`
    3. 选择 `Telemetry`
    4. 会显示当前遥测状态。选择 `Yes` 启用匿名使用数据收集，或选择 `No` 关闭。
    
    ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  goose settings 
    │
    ◇  What setting would you like to configure?
    │  Telemetry 
    │
    ●  Current telemetry status: Disabled
    │  
    ◇  Share anonymous usage data to help improve goose?
    │  Yes 
    │
    └  Telemetry enabled - thank you for helping improve goose!
    └  Configuration saved successfully to /Users/julesv/.config/goose/config.yaml
    ```
  </TabItem>
</Tabs>

你也可以直接在 [`config.yaml` 文件](/docs/guides/config-files)中设置 `GOOSE_TELEMETRY_ENABLED`，或把它当作[环境变量](/docs/guides/environment-variables#security-and-privacy)，为某一次会话设置遥测状态。
