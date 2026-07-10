# 文档生成提示词

README、API 文档、代码注释等文档生成的提示词模板。

## README 文档

### 项目 README 模板

```markdown
为项目生成 README 文档：

**项目名称**：&#123;&#123;projectName}}
**项目描述**：&#123;&#123;description}}
**技术栈**：&#123;&#123;stack}}

**文档结构要求**：

```markdown
# &#123;&#123;projectName}}

> &#123;&#123;tagline}}

## 项目介绍

## 特性

- ✅ &#123;&#123;feature1}}
- ✅ &#123;&#123;feature2}}
- ✅ &#123;&#123;feature3}}

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| &#123;&#123;tech1}} | &#123;&#123;version1}} | &#123;&#123;desc1}} |

## 快速开始

### 环境要求

- Node.js &#123;&#123;nodeVersion}}
- pnpm &#123;&#123;pnpmVersion}}

### 安装

\`\`\`bash
pnpm install
\`\`\`

### 开发

\`\`\`bash
pnpm dev
\`\`\`

### 构建

\`\`\`bash
pnpm build
\`\`\`

## 目录结构

\`\`\`
&#123;&#123;directoryStructure}}
\`\`\`

## API 文档

## 配置说明

## 常见问题

## 更新日志

## License
\`\`\`
```

**要求**：
- 徽章（Badge）使用 shields.io
- 代码块标注语言
- 表格对齐
- 链接可点击
- 中文排版规范（标点、间距）

请生成完整的中文 README。
```

### API 文档模板

```markdown
生成 API 文档：

**API 基础信息**：
- 基础路径：&#123;&#123;baseUrl}}
- 认证方式：&#123;&#123;auth}}
- 统一响应格式：

```typescript
interface ApiResponse<T> {
  code: number;      // 状态码
  message: string;   // 信息
  data: T;          // 数据
}
```

**接口列表**：
&#123;&#123;each endpoints}}
### &#123;&#123;this.method}} &#123;&#123;this.path}}
**功能**：&#123;&#123;this.description}}
**认证**：&#123;&#123;this.auth}}

**请求参数**：
&#123;&#123;if this.params.path}}
路径参数：&#123;&#123;this.params.path}}
&#123;&#123;endif}}
&#123;&#123;if this.params.query}}
查询参数：&#123;&#123;this.params.query}}
&#123;&#123;endif}}
&#123;&#123;if this.params.body}}
请求体：
\`\`\`json
&#123;&#123;this.params.body}}
\`\`\`
&#123;&#123;endif}}

**响应示例**：
成功：
\`\`\`json
{
  "code": 200,
  "message": "success",
  "data": &#123;&#123;this.responseExample}}
}
\`\`\`

错误码：
&#123;&#123;each this.errors}}
- &#123;&#123;this.code}}：&#123;&#123;this.message}}
&#123;&#123;endeach}}
&#123;&#123;endeach}}

请按此格式生成完整的 API 文档。
```

## 代码注释

### JSDoc 注释模板

```markdown
为代码生成 JSDoc 注释：

**代码类型**：&#123;&#123;type}}（函数/类/接口/类型）

**代码内容**：
\`\`\`typescript
&#123;&#123;code}}
\`\`\`

**注释要求**：
- 使用 JSDoc 规范
- @description 说明功能
- @param 说明参数（名称、类型、描述）
- @returns 说明返回值
- @throws 说明可能抛出的异常
- @example 提供使用示例
- @see 参考链接（如有）

**示例格式**：
\`\`\`typescript
/**
 * &#123;&#123;description}}
 *
 * @param &#123;&#123;paramName}} - &#123;&#123;paramDescription}}
 * @returns &#123;&#123;returnDescription}}
 * @throws &#123;&#123;errorType}} - &#123;&#123;errorDescription}}
 * @example
 * \`\`\`typescript
 * &#123;&#123;example}}
 * \`\`\`
 */
\`\`\`

请生成完整的 JSDoc 注释。
```
