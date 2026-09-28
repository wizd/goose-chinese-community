---
sidebar_position: 2
title: 调整工具输出详细程度
sidebar_label: 调整工具输出
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { PanelLeft } from 'lucide-react';

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
回复样式用于自定义工具交互在 goose 桌面版聊天窗口中的显示方式。

要更改此设置：
1. 点击左上角的 <PanelLeft className="inline" size={16} /> 按钮打开侧边栏。
2. 在侧边栏中点击 `Settings` 按钮。
3. 点击 `Chat`。
4. 在 `Response Styles` 下，选择 `Detailed` 或 `Concise`。

- **简洁**（默认）
    - 工具调用默认折叠
    - 只显示 goose 使用了哪个工具
    - 适合关注结果而不是技术细节的用户

- **详细**
    - 工具调用默认展开
    - 显示工具调用及其响应的细节
    - 适合调试或了解 goose 如何工作

此设置只影响对话中工具调用的默认状态。无论选择哪种样式，你始终可以手动展开或折叠任意工具调用。

</TabItem>
  <TabItem value="cli" label="goose CLI">
使用 goose CLI 时，你可以控制工具输出的详细程度。

要调整工具输出，运行：

```sh
goose configure
```

然后选择 `Adjust Tool Output`

```sh
┌   goose-configure 
│
◆  What would you like to configure?
│  ○ Configure Providers 
│  ○ Add Extension 
│  ○ Toggle Extensions 
│  ○ Remove Extension
// highlight-next-line
│  ● Adjust Tool Output (Show more or less tool output)
└  
```

接下来，选择一种可用模式：

```sh
┌   goose-configure 
│
◇  What would you like to configure?
│  Adjust Tool Output 
│
// highlight-start
◆  Which tool output would you like to show?
│  ○ High Importance 
│  ○ Medium Importance 
│  ○ All 
// highlight-end
└  
```

- **高重要性**
    - 只显示最重要的工具输出
    - 最精简的输出级别

- **中等重要性**
    - 显示中等和高重要性输出
    - 例如：文件写入操作的结果

- **全部**
    - 显示所有工具输出
    - 例如：shell 命令输出
    - 最详细的级别

### 切换参数截断

在活动会话中，使用 `/r` 斜杠命令切换工具参数是截断显示还是完整显示：

```sh
Context: ●○○○○○○○○○ 5% (9695/200000 tokens)
( O)> /r
✓ Full tool output enabled - tool parameters will no longer be truncated
```

当你需要查看完整文件路径、URL 或命令参数时，这很有用。再次输入 `/r` 可恢复截断输出。
 </TabItem>
</Tabs>
