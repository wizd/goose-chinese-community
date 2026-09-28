---
title: "goose 与 Qwen3 的本地执行"
description: "用 goose 和 Qwen3 在本地运行 AI 命令，实现快速、离线的工具执行"
authors: 
    - mic
---

:::warning 已过时
高级技巧中提到的 goose `/plan` 模式后来已被移除，独立的规划模型设置也一并去掉。本文其余内容仍然适用。
:::

![本地 AI 智能体](goose-qwen-local.png)


几周前，[Qwen 3](https://qwenlm.github.io/blog/qwen3/) 发布，带来了一系列能力和不同尺寸。这个模型表现出潜力：即便是非常紧凑的形态，例如 80 亿参数和 4 bit 量化，也能用 goose 成功进行工具调用，甚至是多轮工具调用。

我此前没见过缩小到这种程度的模型还能做到这一点，所以这真的令人印象深刻，对这个模型本身，以及对未来或大或小的开放权重模型，都是好兆头。我预计更大的 Qwen3 模型在各种任务上会表现得相当好，但即便是这个小模型，我也觉得有用。

<!-- truncate -->

## 本地工作流和本地智能体

有一段时间，我在 `~/.zshrc` 里放了一个小辅助函数，供命令行使用：

```zsh
# zsh helper to use goose if you make a typo or just want to yolo into the shell
command_not_found_handler() {
  local cmd="$*"
  echo "🪿:"
  goose run -t "can you try to run this command please: $cmd"
}
```

它利用了 zsh 的一个特性（zsh 现在是 macOS 的默认 shell）：如果命令行上没有别的东西说得通，就会交给这个函数。
这让我既可以打错字，也可以直接在命令行输入我想要的内容，例如 `$> can you kill whatever is listening on port 8000`，然后 goose 会去做。甚至不需要打开一个 goose 会话。

有了完全在本地运行的 Qwen3 + Ollama 和 goose，效果足够好，我把这个工作流整个换成了本地版本。离线时、在火车上时它也能工作：

```zsh
command_not_found_handler() {
  local cmd="$*"
  echo "🪿:"
  GOOSE_PROVIDER=ollama GOOSE_MODEL=michaelneale/qwen3 goose run -t "can you try to run this command please: $cmd"
}
```



## Qwen3 的推理


默认情况下，Qwen 3 模型会就问题进行「思考」（推理），因为它们是通用模型。但我发现跳过这个推理阶段更快，也更符合我的用途。

在系统提示里加上 `/no_think`，它通常会直接进入执行（这可能让它在更大的任务上不那么成功，但这里是一个小模型，只做几轮工具调用）。

我对[默认 Ollama 聊天模板做了一点小调整](https://ollama.com/michaelneale/qwen3)，可以像上面那样使用。如果你喜欢也可以用（Ollama 托管的默认 `qwen3` 模型开箱即用也没问题）。

## 高级技巧

你可以用 goose 的 `/plan` 模式配合另一个模型（也许是带推理的 Qwen3，或其他模型如 deepseek）来帮助规划行动，然后再切换到 Qwen3，通过工具调用执行。

如果你有硬件条件，试试更大的模型会很有意思（我只用过 80 亿参数的那个）。我目前的配置是 64G 的 M1 Pro MacBook（大约 2022 年的硬件），可用于 GPU/AI 的内存大概不到 48G，这限制了我能跑什么。但带「no think」模式的 qwen3 对我的用途来说已经可以接受。

<head>
  <meta property="og:title" content="goose 与 Qwen3 的本地执行" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/2025/05/12/local-goose-qwen3" />
  <meta property="og:description" content="用 goose 和 Qwen3 在本地运行 AI 命令，实现快速、离线的工具执行" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/goose-qwen-local-62d07cd240ff65cb99a6ef41a2c851a5.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="goose 与 Qwen3 的本地执行" />
  <meta name="twitter:description" content="用 goose 和 Qwen3 在本地运行 AI 命令，实现快速、离线的工具执行" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/goose-qwen-local-62d07cd240ff65cb99a6ef41a2c851a5.png" />
</head>
