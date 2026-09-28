---
title: 错误处理
---
# goose 中的错误处理

错误处理是推动 goose 表现的关键部分。大语言模型的非确定性会以多种方式引入错误，而模型随后又可以自行恢复。在一次典型的 goose 会话中，预计会出现若干智能体错误，模型可以直接看到并纠正，这个过程甚至可能完全在幕后完成。

## 传统错误

智能体运行期间，网络、基础模型可用性等方面可能出现间歇性问题。这些问题会作为智能体 API 中的错误抛给调用方，由调用方决定如何处理。我们通常用 [anyhow::Error][anyhow-error] 处理这类错误。

## 智能体错误

还有几类错误：系统本身工作正常，但模型生成的内容导致了错误。例如生成了未知的工具名、不正确的参数，或者一次格式正确的工具调用在工具内部执行失败。这些都可以呈现给大语言模型，让它尝试恢复。

错误信息在某种意义上也是提示：它们告诉大语言模型可以如何恢复。我们用 [thiserror::Error][this-error] 处理这类错误，并谨慎维护这一组错误类型。

为覆盖这些情况，`ToolUse` 和 `ToolResult` 通常都作为 `Result<T, AgentError>` 的一部分通过 API 传递。`ToolUse` 中的错误会立即变成 `ToolResult` 中的错误，并传回大语言模型。一次有效的 `ToolUse` 仍可能得到错误的 `ToolResult`，同样会传回大语言模型。

随后由各个 provider 把智能体错误翻译成各 API 规范中的有效消息。


[anyhow-error]: https://docs.rs/anyhow/latest/anyhow/
[this-error]: https://docs.rs/thiserror/latest/thiserror/
