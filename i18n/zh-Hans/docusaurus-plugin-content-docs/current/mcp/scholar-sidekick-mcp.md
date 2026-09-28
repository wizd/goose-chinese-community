---
title: Scholar Sidekick 扩展
description: 把 Scholar Sidekick MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

本教程介绍如何把 [Scholar Sidekick MCP 服务器](https://github.com/mlava/scholar-sidekick-mcp) 添加为 goose 扩展，用来解析、格式化、导出和核验学术引用。它支持任意学术标识符：DOI、PMID、PMCID、ISBN、ISSN、arXiv ID、ADS bibcode 或 WHO IRIS URL，并提供撤稿检查（Crossref + Retraction Watch）和开放获取检查（Unpaywall）。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=scholar-sidekick-mcp%40latest&id=scholar-sidekick&name=Scholar%20Sidekick&description=Resolve%2C%20format%2C%20export%2C%20and%20verify%20academic%20citations%20plus%20retraction%20and%20open-access%20checks&timeout=300)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y scholar-sidekick-mcp@latest
  ```
  </TabItem>
</Tabs>
  **不需要 API 密钥**。服务器可以匿名使用，处于有速率限制的免费档。可选设置 `SCHOLAR_API_KEY`（来自 [scholar-sidekick.com/account](https://scholar-sidekick.com/account) 的免费 `ssk_` 密钥）以提高限额，或设置 `RAPIDAPI_KEY` 使用付费档。见[可选：提高速率限制](#optional-higher-rate-limits)。
:::

## 配置

:::info
需要已安装 [Node.js](https://nodejs.org/)（命令使用 `npx`）。**不需要 API 密钥**。Scholar Sidekick 可以匿名使用，处于有速率限制的免费档。若要提高限额，添加免费的一方密钥（`SCHOLAR_API_KEY`，即来自 [scholar-sidekick.com/account](https://scholar-sidekick.com/account) 的 `ssk_` 密钥）；若使用付费或托管档，添加 [RapidAPI 密钥](https://rapidapi.com/scholar-sidekick-scholar-sidekick-api/api/scholar-sidekick)（`RAPIDAPI_KEY`）。详见下方[可选：提高速率限制](#optional-higher-rate-limits)。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="scholar-sidekick"
      extensionName="Scholar Sidekick"
      description="Resolve, format, export, and verify academic citations plus retraction and open-access checks."
      type="stdio"
      command="npx"
      args={["-y", "scholar-sidekick-mcp@latest"]}
    />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Scholar Sidekick"
      description="Resolve, format, export, and verify academic citations plus retraction and open-access checks."
      type="stdio"
      command="npx -y scholar-sidekick-mcp@latest"
      timeout={300}
    />
  </TabItem>
</Tabs>

## 可选：提高速率限制 {#optional-higher-rate-limits}

Scholar Sidekick **不需要任何密钥**即可在有速率限制的免费档运行，日常交互使用足够。若要提高限额，给扩展添加一个环境变量（goose 桌面版：扩展设置 → Environment Variables；命令行：`goose configure` → 该扩展的环境变量）：

- **`SCHOLAR_API_KEY`**：一方**免费**密钥（前缀为 `ssk_`）。在 [scholar-sidekick.com/account](https://scholar-sidekick.com/account) 创建。以 `Authorization: Bearer` 发送；提高速率限制，并解锁核验器可选的 LLM 筛查。
- **`RAPIDAPI_KEY`**：通过 [RapidAPI 网关](https://rapidapi.com/scholar-sidekick-scholar-sidekick-api/api/scholar-sidekick) 使用付费或托管档。设置后，调用会走 RapidAPI，而不是匿名或一方端点。

两者都不是必需的，也不需要同时设置。如果都设置了，RapidAPI 优先。

## 你能做什么

Scholar Sidekick 提供六个工具，把任意学术标识符变成干净的引用、导出文件和完整性检查。内置五种引用格式（Vancouver、AMA、APA、IEEE、CSE），并支持完整 CSL 目录中的 10,000 多种格式。

### 用任意标识符格式化引用

粘贴 DOI、PMID、PMCID、ISBN、ISSN、arXiv ID、ADS bibcode 或 WHO IRIS URL，即可按所选格式得到参考文献。识别是自动的。标识符按原样传入即可，不必去掉 `PMID:`、`arXiv:` 或 `https://doi.org/` 前缀。

**提示词：**

```
把 10.1056/NEJMoa2033700 格式化成 Vancouver 风格的引用。
```

### 为文献管理器导出参考文献

传入一个或多个标识符，得到可直接导入的文件，格式包括 BibTeX、RIS、EndNote XML、RefWorks、NBIB、Zotero RDF、CSV 或 CSL-JSON。可以直接放进 Zotero、Mendeley、EndNote、JabRef 或 Citavi。

**提示词：**

```
把这三个 DOI 导出为 BibTeX：
10.1056/NEJMoa2033700
10.1038/s41586-020-2649-2
10.1016/S0140-6736(20)32661-1
```

### 检查论文是否已被撤稿

交叉核对 Crossref 和 Retraction Watch，查找撤稿、更正和关注声明。返回状态、原因和日期。

**提示词：**

```
10.1016/S0140-6736(97)11096-0 被撤稿了吗？
```

### 查找开放获取副本

查询 Unpaywall，找出论文最佳的合法免费版本：仓储副本、出版方开放获取或预印本，并附上许可和版本（已接收稿或已发表稿）。

**提示词：**

```
10.1371/journal.pone.0173664 有免费的开放获取副本吗？
```

### 核验引用是否真实

把一条*声称的*引用（标题，以及可选的作者和年份）与从其标识符实际解析出的元数据交叉核对。它能抓住大模型编造文献的主要模式：一个真实、可解析的 DOI，配上虚构的标题和作者。Topaz 等人（Lancet，2026）记录过这种情况。当 AI 生成的参考文献「看起来像那么回事，但是……」时，用这个功能。

**提示词：**

```
这条引用是真的吗？"A Unified Theory of Everything", Smith J, Nature, 2010, 10.1038/nphys1170
```
