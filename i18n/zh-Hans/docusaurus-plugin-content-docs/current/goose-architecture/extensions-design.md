---
sidebar_position: 2
---

# 扩展设计

本文描述 goose 中[扩展框架](/docs/getting-started/using-extensions)的设计与实现。该框架让 AI 智能体通过统一的、基于工具的接口与不同扩展交互。

## 核心概念

### 扩展
扩展（Extension）表示任何可以由 AI 智能体操作的组件。扩展通过工具暴露能力，并维护自己的状态。核心接口由 `Extension` trait 定义：

```rust
#[async_trait]
pub trait Extension: Send + Sync {
    fn name(&self) -> &str;
    fn description(&self) -> &str;
    fn instructions(&self) -> &str;
    fn tools(&self) -> &[Tool];
    async fn status(&self) -> AnyhowResult<HashMap<String, Value>>;
    async fn call_tool(&self, tool_name: &str, parameters: HashMap<String, Value>) -> ToolResult<Value>;
}
```

### 工具 {#tools}
工具是扩展向智能体暴露功能的主要方式。每个工具都有：
- 名称
- 描述
- 一组参数
- 执行该工具功能的实现

工具必须接受一个 Value 并返回 `AgentResult<Value>`（并且必须是 async）。这使它与智能体的工具调用框架兼容。

```rust
async fn echo(&self, params: Value) -> AgentResult<Value>
```

## 架构

### 组件概览

1. **Extension trait**：所有扩展都必须实现的核心接口
2. **错误处理**：用于工具执行的专门错误类型
3. **过程宏**：简化工具定义和注册 [*尚未实现*]

### 错误处理

系统使用两种主要错误类型：
- `ErrorData`：与工具执行相关的特定错误
- `anyhow::Error`：用于扩展状态和其他操作的通用错误

这种划分让工具执行可以精确处理错误，同时为一般的扩展操作保留灵活性。

## 最佳实践

### 工具设计

1. **清晰的名称**：工具使用清晰、面向动作的名称（例如用 "create_user"，不用 "user"）
2. **有描述的参数**：每个参数都应有清晰的描述
3. **错误处理**：尽可能返回具体错误，这些错误会变成“提示”
4. **状态管理**：明确说明状态修改

### 扩展实现

1. **状态封装**：扩展状态保持私有并受控
2. **错误传播**：工具执行时配合 `ErrorData` 使用 `?` 运算符
3. **状态清晰**：提供清晰、结构化的状态信息
4. **文档**：为所有工具及其效果编写文档

### 示例实现

下面是一个简单扩展的完整示例：

```rust
use goose_macros::tool;

struct FileSystem {
    registry: ToolRegistry,
    root_path: PathBuf,
}

impl FileSystem {
    #[tool(
        name = "read_file",
        description = "Read contents of a file"
    )]
    async fn read_file(&self, path: String) -> ToolResult<Value> {
        let full_path = self.root_path.join(path);
        let content = tokio::fs::read_to_string(full_path)
            .await
            .map_err(|e| ErrorData {
                code: ErrorCode::INTERNAL_ERROR,
                message: Cow::from(e.to_string(),
                data: None,
            }))?;
            
        Ok(json!({ "content": content }))
    }
}

#[async_trait]
impl Extension for FileSystem {
    // ... implement trait methods ...
}
```

## 测试

扩展应在多个层面测试：
1. 单个工具的单元测试
2. 扩展行为的集成测试
3. 工具不变量的属性测试

测试示例：
```rust
#[tokio::test]
async fn test_echo_tool() {
    let extension = TestExtension::new();
    let result = extension.call_tool(
        "echo",
        hashmap!{ "message" => json!("hello") }
    ).await;
    
    assert_eq!(result.unwrap(), json!({ "response": "hello" }));
}
```
