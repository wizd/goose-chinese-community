---
title: goose Docs 扩展

description: 将 goose Docs MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';


本教程介绍如何将 [goose Docs MCP 服务器](https://github.com/idosal/git-mcp) 添加为 goose 扩展，让 goose 能够回答关于自身的问题。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=mcp-remote&arg=https%3A%2F%2Fblock.gitmcp.io%2Fgoose%2F&id=goose-docs&name=goose%20Docs&description=gitmcp%20for%20goose%20documentation)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx mcp-remote https://block.gitmcp.io/goose/
  ```
  </TabItem>
</Tabs>
:::

## 配置

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="goose-docs"
      extensionName="goose Docs"
      description="用于 goose 文档的 GitMCP"
      command="npx"
      args={["mcp-remote", "https://block.gitmcp.io/goose/"]}
    />
 </TabItem>
  <TabItem value="cli" label="goose CLI">
      <CLIExtensionInstructions
        name="goose Docs"
        description="用于 goose 文档的 GitMCP"
        command="npx mcp-remote https://block.gitmcp.io/goose/"
        timeout={300}
      />
  </TabItem>
</Tabs>


## 使用示例
GitMCP 让你把任意 Git 仓库变成 goose 扩展。goose Docs MCP 服务器就是一个很好的例子：它让 goose 能够回答关于自身的问题。

让我们让 goose 为我们创建一个配方！它会使用 goose Docs MCP 服务器查找相关信息。


### goose 提示词

```
嘿 goose，我想创建一个自动化代码评审配方，供我的开发团队使用。你能查看 goose 文档以理解配方格式，然后创建一个配方，要求：


1. 评审 pull request，关注：

- 代码质量问题和最佳实践
- 安全漏洞
- 缺失的单元测试
- 性能问题

2. 应该参数化，以便团队可以自定义：

- 编程语言（Python、JavaScript 等）
- 最低测试覆盖率阈值
- 要强制执行的特定编码标准

3. 应该输出可供 CI/CD 系统解析的结构化结果

请先用 goose Docs 扩展研究配方格式，然后创建一个完整的配方文件，包含正确的 YAML 结构、参数和所需扩展。
让开发团队可以立刻在工作流中使用。
```


### goose 输出

:::note 桌面版

很好！我根据对 goose 文档的研究，创建了一个全面的自动化代码评审配方。以下是为你的开发团队构建的内容：

#### 📋 配方概览

**自动化代码评审**配方（`automated-code-review.yaml`）提供：

#### ✅ **核心评审领域**
1. **代码质量与最佳实践** - 架构、命名、复杂度、文档
2. **安全漏洞评估** - OWASP Top 10、输入校验、身份验证问题
3. **测试覆盖率分析** - 缺失的测试、覆盖率阈值、测试质量
4. **性能问题** - 瓶颈、算法复杂度、资源管理
5. **技术债务评估** - 重构需求、可维护性问题

#### 🔧 **参数化功能**
- **`programming_language`** - Python、JavaScript、Java、Go、Rust、TypeScript 等
- **`min_test_coverage`** - 可自定义阈值（默认：80%）
- **`coding_standards`** - PEP8、ESLint、Google Style Guide、公司特定标准
- **`security_focus`** - 基础、标准或全面的安全分析
- **`performance_analysis`** - 启用或禁用性能评审
- **`exclude_patterns`** - 跳过某些文件/目录

#### 📊 **结构化的 CI/CD 输出**
配方输出全面的 JSON 结构，包含：
- **总体质量分**和建议（批准/请求更改/拒绝）
- **分类问题**，带严重级别和具体文件位置
- **安全漏洞**，带 CWE ID 和修复步骤
- **测试覆盖率指标**和缺失测试的建议
- **性能问题**及优化建议
- **技术债务评估**及工作量估计
- 用于流水线集成的 **CI/CD 元数据**

#### 🚀 **使用示例**

#### 基本用法：
```bash
goose run automated-code-review.yaml \
  --repository_path ./my-project \
  --programming_language Python
```

#### 高级用法：
```bash
goose run automated-code-review.yaml \
  --repository_path ./my-project \
  --programming_language JavaScript \
  --min_test_coverage 85 \
  --coding_standards ESLint \
  --security_focus comprehensive \
  --exclude_patterns "*.test.js,dist/*,node_modules/*"
```

#### 🔧 **CI/CD 集成**

结构化 JSON 输出非常适合 CI/CD 流水线：

```yaml
# Example GitHub Actions integration
- name: Run Code Review
  run: |
    goose run automated-code-review.yaml \
      --repository_path . \
      --programming_language ${{ matrix.language }} \
      --output review-results.json

- name: Process Results
  run: |
    # Parse JSON results for pipeline decisions
    RECOMMENDATION=$(jq -r '.review_summary.recommendation' review-results.json)
    if [ "$RECOMMENDATION" = "reject" ]; then
      exit 1
    fi
```

#### 📁 **文件结构**

配方保存为当前目录中的 `automated-code-review.yaml`，包含：
- 遵循 goose 配方格式的正确 YAML 结构
- 带默认值的全面参数定义
- 用于文件系统访问的内置 developer 扩展
- 用于结构化输出的详细 JSON schema
- 用于参数替换的模板语法

你的开发团队可以立刻开始使用这个配方：把它放到项目仓库中，并按具体需求自定义参数！
:::

### 生成的配方文件
<details>
<summary>automated-code-review.yaml</summary>

```yaml
version: "1.0.0"
title: "Automated Code Review"
description: "Comprehensive automated code review for pull requests with customizable standards and structured CI/CD output"

instructions: |
  You are an expert code reviewer with deep knowledge of software engineering best practices, 
  security vulnerabilities, and testing methodologies. Your role is to perform a thorough 
  code review focusing on:
  
  1. Code Quality & Best Practices
  2. Security Vulnerabilities  
  3. Test Coverage Analysis
  4. Performance Concerns
  5. Maintainability Issues
  
  Always provide actionable feedback with specific examples and suggestions for improvement.
  Consider the specified programming language conventions and coding standards.

parameters:
  - key: repository_path
    input_type: string
    requirement: required
    description: "Path to the repository or pull request to review"
  
  - key: programming_language
    input_type: string
    requirement: required
    description: "Primary programming language (e.g., Python, JavaScript, Java, Go, Rust, TypeScript)"
  
  - key: min_test_coverage
    input_type: number
    requirement: optional
    default: 80
    description: "Minimum test coverage threshold percentage (0-100)"
  
  - key: coding_standards
    input_type: string
    requirement: optional
    default: "industry_standard"
    description: "Coding standards to enforce (e.g., PEP8, ESLint, Google Style Guide, company_specific)"
  
  - key: security_focus
    input_type: string
    requirement: optional
    default: "standard"
    description: "Security review depth (basic, standard, comprehensive)"
  
  - key: performance_analysis
    input_type: string
    requirement: optional
    default: "true"
    description: "Enable performance analysis (true/false)"
  
  - key: exclude_patterns
    input_type: string
    requirement: optional
    default: "*.md,*.txt,*.json,node_modules/*,vendor/*,.git/*"
    description: "Comma-separated patterns of files/directories to exclude from review"

extensions:
  - type: builtin
    name: developer
    timeout: 600
    bundled: true
    description: "Access to file system and shell commands for code analysis"

prompt: |
  Perform a comprehensive code review of the {{ programming_language }} codebase at {{ repository_path }}.
  
  ## Review Scope
  - Programming Language: {{ programming_language }}
  - Minimum Test Coverage: {{ min_test_coverage }}%
  - Coding Standards: {{ coding_standards }}
  - Security Focus: {{ security_focus }}
  - Performance Analysis: {{ performance_analysis }}
  - Exclude Patterns: {{ exclude_patterns }}
  
  ## Analysis Requirements
  
  ### 1. Code Quality & Best Practices
  - Review code structure, organization, and architecture
  - Check adherence to {{ coding_standards }} standards
  - Identify code smells, anti-patterns, and technical debt
  - Evaluate naming conventions, documentation, and readability
  - Check for proper error handling and logging
  
  ### 2. Security Vulnerability Assessment
  {% if security_focus == "comprehensive" %}
  Perform comprehensive security analysis including:
  - OWASP Top 10 vulnerabilities
  - Input validation and sanitization
  - Authentication and authorization flaws
  - Cryptographic implementations
  - Dependency vulnerabilities
  - Information disclosure risks
  {% elif security_focus == "standard" %}
  Perform standard security review:
  - Common vulnerability patterns
  - Input validation issues
  - Authentication/authorization problems
  - Basic cryptographic concerns
  {% else %}
  Perform basic security check:
  - Obvious security anti-patterns
  - Hardcoded credentials
  - Basic input validation
  {% endif %}
  
  ### 3. Test Coverage Analysis
  - Analyze existing test files and coverage
  - Identify missing unit tests for critical functions
  - Check for integration and end-to-end test gaps
  - Evaluate test quality and maintainability
  - Verify test coverage meets {{ min_test_coverage }}% threshold
  
  ### 4. Performance Concerns
  {% if performance_analysis == "true" %}
  - Identify potential performance bottlenecks
  - Review algorithm complexity and efficiency
  - Check for memory leaks and resource management
  - Analyze database queries and data access patterns
  - Review caching strategies and optimization opportunities
  {% endif %}
  
  ### 5. Maintainability & Technical Debt
  - Assess code complexity and maintainability
  - Identify areas needing refactoring
  - Check for proper separation of concerns
  - Evaluate dependency management
  - Review documentation completeness
  
  ## Output Requirements
  Provide structured analysis that can be parsed by CI/CD systems, including:
  - Overall quality score and recommendation
  - Categorized issues with severity levels
  - Specific file locations and line numbers
  - Actionable remediation steps
  - Test coverage metrics and missing test recommendations
  - Security findings with risk assessments

response:
  json_schema:
    type: object
    properties:
      review_summary:
        type: object
        properties:
          overall_score:
            type: number
            minimum: 0
            maximum: 100
            description: "Overall code quality score (0-100)"
          recommendation:
            type: string
            enum: ["approve", "approve_with_suggestions", "request_changes", "reject"]
            description: "Review recommendation for CI/CD pipeline"
          total_issues:
            type: number
            description: "Total number of issues found"
          critical_issues:
            type: number
            description: "Number of critical/blocking issues"
        required: ["overall_score", "recommendation", "total_issues", "critical_issues"]
      
      code_quality:
        type: object
        properties:
          score:
            type: number
            minimum: 0
            maximum: 100
            description: "Code quality score"
          issues:
            type: array
            items:
              type: object
              properties:
                severity:
                  type: string
                  enum: ["critical", "major", "minor", "info"]
                category:
                  type: string
                  enum: ["architecture", "naming", "complexity", "documentation", "best_practices"]
                file_path:
                  type: string
                  description: "Relative path to the file"
                line_number:
                  type: number
                  description: "Line number where issue occurs"
                description:
                  type: string
                  description: "Description of the issue"
                suggestion:
                  type: string
                  description: "Suggested fix or improvement"
              required: ["severity", "category", "file_path", "description", "suggestion"]
        required: ["score", "issues"]
      
      security_analysis:
        type: object
        properties:
          risk_score:
            type: number
            minimum: 0
            maximum: 100
            description: "Security risk score (0=low risk, 100=high risk)"
          vulnerabilities:
            type: array
            items:
              type: object
              properties:
                severity:
                  type: string
                  enum: ["critical", "high", "medium", "low"]
                type:
                  type: string
                  description: "Type of vulnerability (e.g., SQL Injection, XSS, etc.)"
                file_path:
                  type: string
                line_number:
                  type: number
                description:
                  type: string
                impact:
                  type: string
                  description: "Potential impact of the vulnerability"
                remediation:
                  type: string
                  description: "Steps to fix the vulnerability"
                cwe_id:
                  type: string
                  description: "Common Weakness Enumeration ID if applicable"
              required: ["severity", "type", "file_path", "description", "impact", "remediation"]
        required: ["risk_score", "vulnerabilities"]
      
      test_coverage:
        type: object
        properties:
          current_coverage:
            type: number
            minimum: 0
            maximum: 100
            description: "Current test coverage percentage"
          meets_threshold:
            type: boolean
            description: "Whether coverage meets the minimum threshold"
          missing_tests:
            type: array
            items:
              type: object
              properties:
                file_path:
                  type: string
                function_name:
                  type: string
                line_number:
                  type: number
                priority:
                  type: string
                  enum: ["critical", "high", "medium", "low"]
                test_type:
                  type: string
                  enum: ["unit", "integration", "end_to_end"]
                description:
                  type: string
                  description: "Description of what should be tested"
              required: ["file_path", "function_name", "priority", "test_type", "description"]
          test_quality_issues:
            type: array
            items:
              type: object
              properties:
                file_path:
                  type: string
                issue:
                  type: string
                suggestion:
                  type: string
              required: ["file_path", "issue", "suggestion"]
        required: ["current_coverage", "meets_threshold", "missing_tests", "test_quality_issues"]
      
      performance_analysis:
        type: object
        properties:
          concerns:
            type: array
            items:
              type: object
              properties:
                severity:
                  type: string
                  enum: ["critical", "major", "minor"]
                type:
                  type: string
                  enum: ["algorithm_complexity", "memory_leak", "database_query", "resource_management", "caching"]
                file_path:
                  type: string
                line_number:
                  type: number
                description:
                  type: string
                impact:
                  type: string
                  description: "Performance impact description"
                optimization:
                  type: string
                  description: "Suggested optimization"
              required: ["severity", "type", "file_path", "description", "impact", "optimization"]
        required: ["concerns"]
      
      technical_debt:
        type: object
        properties:
          debt_score:
            type: number
            minimum: 0
            maximum: 100
            description: "Technical debt score (0=low debt, 100=high debt)"
          refactoring_suggestions:
            type: array
            items:
              type: object
              properties:
                priority:
                  type: string
                  enum: ["critical", "high", "medium", "low"]
                area:
                  type: string
                  enum: ["architecture", "code_duplication", "complexity", "dependencies", "documentation"]
                file_path:
                  type: string
                description:
                  type: string
                effort_estimate:
                  type: string
                  enum: ["small", "medium", "large"]
                business_impact:
                  type: string
              required: ["priority", "area", "file_path", "description", "effort_estimate"]
        required: ["debt_score", "refactoring_suggestions"]
      
      ci_cd_metadata:
        type: object
        properties:
          review_timestamp:
            type: string
            description: "ISO timestamp of when review was performed"
          reviewer:
            type: string
            description: "goose automated code review"
          language:
            type: string
            description: "Programming language reviewed"
          standards_applied:
            type: string
            description: "Coding standards that were applied"
          files_reviewed:
            type: number
            description: "Number of files reviewed"
          lines_of_code:
            type: number
            description: "Total lines of code reviewed"
        required: ["review_timestamp", "reviewer", "language", "standards_applied", "files_reviewed"]
    
    required: [
      "review_summary", 
      "code_quality", 
      "security_analysis", 
      "test_coverage", 
      "performance_analysis", 
      "technical_debt", 
      "ci_cd_metadata"
    ]

```

</details>
