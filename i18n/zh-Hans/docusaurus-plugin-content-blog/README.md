---
unlisted: true
---
# 为 goose 撰写博客

本指南说明如何为 goose 文档站点撰写和组织结构博客文章。

## 开始

1. 克隆 goose 仓库：
```bash
git clone https://github.com/aaif-goose/goose.git
cd goose
```

2. 安装依赖：
```bash
cd documentation
npm install
```

## 目录结构

博客文章按日期组织，使用以下格式：
```
YYYY-MM-DD-post-title/
├── index.md
└── images/
```

示例：
```
2025-05-22-llm-agent-readiness/
├── index.md
└── llm-agent-test.png
```

## Frontmatter

每篇博客必须以包含以下内容的 YAML frontmatter 开头：

```yaml
---
title: Your Blog Post Title
description: A brief description of your post (1-2 sentences)
authors: 
    - your_author_id
---
```

`authors` 字段应与 `authors.yml` 文件中的 ID 匹配。可以列出多位作者。[关于作者的更多信息](#作者信息)。

## 页眉图片

frontmatter 之后，用 Markdown 包含一张页眉图片：

```markdown
![blog cover](your-image.png)
```

页眉图片应当：
- 与文章内容相关
- 高质量（推荐尺寸：1200 x 600 像素）
- 存放在文章目录中
- 命名有描述性

## 内容结构

### 引言
在截断标签之前，用 1–2 段介绍主题。这就是博客索引页上显示的内容。

### 截断标签
在引言之后添加截断标签，以创建「阅读更多」的分隔：

```markdown
<!-- truncate -->
```

### 标题
用标题按层次组织内容：
- `#`（H1）——只用于 frontmatter 中的文章标题
- `##`（H2）——主要章节
- `###`（H3）——子章节
- `####`（H4）——次要章节（这些不会显示在右侧导航栏）

### 代码块
使用带语言说明的围栏代码块：

````markdown
```javascript
// Your code here
```
````

### 图片
用 Markdown 包含额外图片：
```markdown
![descriptive alt text](image-name.png)
```

## 社交媒体标签

在文章末尾，包含以下用于社交媒体分享的 meta 标签：

```html
<head>
  <meta property="og:title" content="Your Blog Post Title" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://goose-docs.ai/blog/YYYY/MM/DD/post-slug" />
  <meta property="og:description" content="Your blog post description" />
  <meta property="og:image" content="https://goose-docs.ai/assets/images/your-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="goose-docs.ai" />
  <meta name="twitter:title" content="Your Blog Post Title" />
  <meta name="twitter:description" content="Your blog post description" />
  <meta name="twitter:image" content="https://goose-docs.ai/assets/images/your-image.png" />
</head>
```

## 作者信息

要把自己添加为作者：

1. 编辑博客目录中的 `authors.yml`
2. 按以下格式添加你的信息：

```yaml
your_author_id:
  name: Your Full Name
  title: Your Title
  image_url: https://avatars.githubusercontent.com/u/your_github_id?v=4
  url: https://your-website.com  # Optional
  page: true
  socials:
    linkedin: your_linkedin_username
    github: your_github_username
    x: your_twitter_handle
    bluesky: your_bluesky_handle  # Optional
```

## 最佳实践

1. **写作风格**
   - 使用清楚、简洁的语言
   - 拆开长段落
   - 在相关处包含代码示例
   - 用图片说明复杂概念

2. **技术内容**
   - 包含能运行的代码示例
   - 说明前置条件
   - 链接到相关文档
   - 发布前测试代码片段

3. **格式**
   - 使用一致的间距
   - 为图片包含替代文本
   - 用小标题拆开内容
   - 在合适时使用列表和表格

4. **审阅流程**
   - 校对拼写和语法
   - 验证所有链接可用
   - 检查图片路径
   - 测试代码示例
   - 验证 frontmatter 语法

## 预览你的博客

要在本地预览博客：

1. 确保你在 documentation 目录中：
```bash
cd documentation
```

2. 启动开发服务器：
```bash
npm start
```

3. 打开浏览器并访问：
```
http://localhost:3000/blog
```

开发服务器的特点：
- 热重载（更改立即出现）
- 预览完整站点导航
- 移动端响应式测试
- 社交媒体预览测试

如果服务器运行时你修改了博客，页面会自动刷新以显示更新。

### 预览故障排除

如果遇到问题：

1. 确保所有依赖已安装：
```bash
npm install
```

2. 清除缓存并重启：
```bash
npm run clear
npm start
```

3. 验证 frontmatter 语法正确（没有制表符，缩进正确）
4. 检查所有图片路径相对于文章目录是否正确
