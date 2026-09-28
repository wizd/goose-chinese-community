---
title: Pieces for Developers 扩展
description: 把 Pieces for Developers MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/V8zp9m9__t4" />

本教程介绍如何把 [Pieces for Developers MCP 服务器](https://docs.pieces.app/products/mcp/get-started?utm_source=goose&utm_medium=collab&utm_campaign=mcp) 添加为 goose 扩展，以便与 Pieces Long-Term Memory 交互。

## 配置

1. 下载 [PiecesOS](https://pieces.app/)

2. 在 PiecesOS 中启用 [Long-Term Memory Context](https://docs.pieces.app/products/quick-guides/ltm-context)

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="pieces"
    extensionName="Pieces for Developers"
    description="Provides access to your Pieces Long-Term Memory. You need to have Pieces installed to use this."
    command="uvx"
    args={["--from", "pieces-cli", "pieces", "--ignore-onboarding", "mcp", "start"]}
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Pieces"
      description="Provides access to your Pieces Long-Term Memory"
      type="stdio"
      command="uvx --from pieces-cli pieces --ignore-onboarding mcp start"
    />
  </TabItem>
</Tabs>

## 使用示例

下面用 Pieces for Developers MCP 服务器，根据你前一天的活动生成一份站会状态更新。

### goose 提示词

```
我需要一份昨天我在做什么的状态更新。根据最重要的活动写一份包含 5 条要点的报告，每条附上简短说明。
```

### goose 输出

```
这是根据你昨天最重要的交互和应用整理的关键活动报告：

1. 用 goose 做代码开发：

    活动：你在把 MCP 服务器集成进 goose 命令行，并改进通过 schema URL 处理扩展的方式。
    说明：这项工作包括修改代码、测试新集成，以支持更高级的功能。你也在 Discord 上和 goose 社区交流反馈和排错。

2. 文档更新：

    活动：你更新并管理了与 goose 项目和 MCP 集成相关的文档。
    说明：包括为新功能准备文档、使用说明和技术细节，帮助改进使用体验和技术指引。

3. 在 Discord 上的社区互动：

  活动：参与 Block Open Source Community，讨论项目进展和可能的合作。
  说明：你积极参与社区讨论，交流项目改进的看法，并和其他开发者、贡献者探索合作机会。

4. 管理和测试扩展：

    活动：你通过 goose 平台测试并管理各种扩展。
    说明：包括配置和验证不同扩展，确认兼容性和功能，并吸收测试反馈。

5. 内容和集成规划：

    活动：规划 MCP 的集成工作流，并记录使用场景。
    说明：你在制定有效落地 MCP 集成的策略，通过规划让后续项目部署更顺，并与用户需求和项目目标对齐。

这些活动说明昨天很充实，重点在开发、协作，以及技术社区里的内容管理。
```


:::tip
更多可与 Pieces for Developers MCP 服务器搭配的提示词，见 [Pieces MCP 提示词指南](https://docs.pieces.app/products/mcp/prompting?utm_source=goose&utm_medium=collab&utm_campaign=mcp)。
:::
