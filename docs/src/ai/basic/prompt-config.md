# 提示词配置

提示词模板是 Claude Code 理解您意图的关键。良好的提示词配置可以显著提升代码生成的质量和准确性。

## 提示词模板概述

### 什么是提示词模板

提示词模板是预定义的提示词结构，可以：

- 定义代码生成格式
- 规范输出风格
- 确保代码质量
- 提高一致性

### 模板位置

提示词模板存储在以下位置：

1. **全局模板**：`~/.claude-code/prompts/`
2. **工作空间模板**：`workspace/.claude-code/prompts/`
3. **项目模板**：`project/.claude-code/prompts/`

模板优先级：项目 > 工作空间 > 全局

## 创建提示词模板

### 初始化提示词系统

```bash
# 初始化提示词模板目录
claude-code prompt init

# 创建自定义模板
claude-code prompt create --name create-component
```

### 模板文件结构

```
.claude-code/
└── prompts/
    ├── create-component.md
    ├── generate-api.md
    ├── write-test.md
    ├── refactor-code.md
    └── docs/
        └── templates-guide.md
```

## 模板语法

### 基础语法

提示词模板使用简单的变量替换语法：

```markdown
创建一个名为 {{componentName}} 的 {{framework}} 组件

功能描述：
{{componentDescription}}

要求：
1. 使用 TypeScript
2. 导出为默认导出
3. 添加 PropTypes 类型定义
```

### 变量类型

#### 1. 必需变量
使用双花括号：
```markdown
创建一个 {{componentName}} 组件
```

#### 2. 可选变量
使用问号标记：
```markdown
测试框架: {{testFramework?}}

{{if testFramework}}
使用 {{testFramework}} 编写测试
{{endif}}
```

#### 3. 列表变量
```markdown
功能列表：
{{each functions}}
- {{this.name}}: {{this.description}}
{{endeach}}
```

#### 4. 条件逻辑
```markdown
{{if useTypeScript}}
使用 TypeScript 类型定义
{{endif}}

{{if not useTypeScript}}
添加 PropTypes 验证
{{endif}}
```

## 内置模板

Claude Code 提供了一些内置模板：

### 1. 创建组件模板

**模板名称**：`create-component`

**使用示例**：
```bash
claude-code generate --template create-component \
  --componentName UserProfile \
  --framework react \
  --useTypeScript true
```

**模板内容**：
```markdown
创建一个名为 {{componentName}} 的 {{framework}} 组件

{{if useTypeScript}}
要求：
- 使用 TypeScript
- 定义 Props interface
- 添加类型注释
{{endif}}

功能：
{{description}}

{{if features}}
额外功能：
{{each features}}
- {{this}}
{{endeach}}
{{endif}}

请提供完整的代码实现。
```

### 2. 创建 API 端点模板

**模板名称**：`create-api-endpoint`

**使用示例**：
```bash
claude-code generate --template create-api-endpoint \
  --endpoint /api/users \
  --method GET \
  --auth required
```

**模板内容**：
```markdown
创建一个 API 端点：

端点路径: {{endpoint}}
HTTP 方法: {{method}}
{{if auth}}
认证: {{auth}}
{{endif}}

响应格式: JSON

请提供：
1. 路由定义
2. 控制器逻辑
3. 验证中间件
4. 错误处理
```

### 3. 编写测试模板

**模板名称**：`write-test`

**使用示例**：
```bash
claude-code generate --template write-test \
  --target ./src/utils/format.ts \
  --testFramework jest \
  --coverage 80
```

**模板内容**：
```markdown
为以下文件编写测试：{{target}}

测试框架：{{testFramework}}
目标覆盖率：{{coverage}}%

要求：
1. 测试所有导出函数
2. 包含正常和异常情况
3. 使用有意义的测试名称
4. 添加必要的 mock

请提供完整的测试代码。
```

## 自定义模板

### 创建自定义模板

**方法 1：使用命令行**
```bash
claude-code prompt create --name my-template
```

**方法 2：手动创建**
```bash
# 创建模板文件
touch .claude-code/prompts/my-template.md
```

### 模板示例

#### 示例 1：创建 Redux Slice

**文件**：`create-redux-slice.md`
```markdown
创建一个 Redux slice

名称：{{sliceName}}
初始状态：{{initialState}}
Actions：
{{each actions}}
- {{this.name}}: {{this.description}}
{{endeach}}

要求：
1. 使用 createSlice
2. 定义 TypeScript 类型
3. 导出 actions 和 reducer
4. 添加 JSDoc 注释
```

**使用**：
```bash
claude-code generate --template create-redux-slice \
  --sliceName userSlice \
  --initialState '{"name": "", "email": ""}' \
  --actions '[{"name": "setUser", "description": "更新用户信息"}]'
```

#### 示例 2：生成数据库 Migration

**文件**：`create-migration.md`
```markdown
创建数据库迁移文件

表名：{{tableName}}
操作：{{operation}}
{{if operation == "create"}}
字段：
{{each columns}}
- {{this.name}}: {{this.type}} {{this.constraints}}
{{endeach}}
{{endif}}

要求：
1. 使用迁移框架（如 Prisma Migrate）
2. 包含向上和向下迁移
3. 添加注释
```

#### 示例 3：生成文档

**文件**：`generate-docs.md`
```markdown
为目标代码生成文档

文件：{{target}}
文档类型：{{docType}}
{{if docType == "README"}}
包含章节：
- 项目简介
- 安装说明
- 使用示例
- API 文档
- 开发指南
{{endif}}

{{if docType == "JSDoc"}}
为所有导出函数添加 JSDoc
{{endif}}

要求：
- 使用 Markdown 格式
- 包含代码示例
- 添加必要的图表
```

## 模板管理

### 列出所有模板

```bash
# 列出所有可用模板
claude-code prompt list

# 查看模板详情
claude-code prompt info --name create-component

# 预览模板内容
claude-code prompt preview --name create-component
```

### 编辑模板

```bash
# 在编辑器中打开模板
claude-code prompt edit --name my-template

# 更新模板
claude-code prompt update --name my-template --file ./new-template.md
```

### 删除模板

```bash
claude-code prompt delete --name my-template
```

### 复制和重命名

```bash
# 复制模板
claude-code prompt copy --source create-component --target create-page

# 重命名模板
claude-code prompt rename --old my-template --new better-template
```

## 高级功能

### 模板继承

模板可以继承其他模板：

```markdown
<!-- base-template.md -->
创建一个 {{type}}

基本要求：
- 使用 TypeScript
- 遵循项目规范
- 添加必要的注释

<!-- create-component.md 继承自 base-template.md -->
@extends base-template

组件名称：{{componentName}}
框架：{{framework}}

特定要求：
- 使用函数组件
- Props 使用 interface
```

### 模板组合

在模板中引用其他模板：

```markdown
# 主模板

创建一个完整的模块：

{{subtemplate create-component}}
---
{{subtemplate create-store}}
---
{{subtemplate write-test}}
```

### 条件包含

根据条件包含不同的内容：

```markdown
{{if framework == "react"}}
使用 React Hooks
{{endif}}

{{if framework == "vue"}}
使用 Composition API
{{endif}}

{{if framework == "angular"}}
使用 Services 和 Dependency Injection
{{endif}}
```

## 模板最佳实践

### 1. 保持模板简洁

```markdown
❌ 太复杂：
创建一个组件，要求使用 TypeScript、React、函数组件、Hooks、
必须有 PropTypes、JSDoc、单元测试、E2E 测试、性能优化...

✅ 简洁明确：
创建一个名为 {{name}} 的 React 组件

要求：
- TypeScript + 函数组件
- Hooks（如需要）
- JSDoc 注释
```

### 2. 提供清晰的示例

```markdown
使用示例：
claude-code generate --template my-template --name UserCard --props '{"name": "string", "age": "number"}'
```

### 3. 使用有意义的变量名

```markdown
❌ 模糊的变量名：
创建一个 {{x}}

✅ 清晰的变量名：
创建一个 {{componentName}} 组件
```

### 4. 添加使用说明

在每个模板文件顶部添加使用说明：

```markdown
<!--
使用说明：
claude-code generate --template create-component \
  --componentName MyComponent \
  --framework react \
  --useTypeScript true

变量说明：
- componentName: 组件名称
- framework: 框架类型（react/vue/angular）
- useTypeScript: 是否使用 TypeScript
-->
```

### 5. 版本控制模板

将提示词模板纳入版本控制：

```bash
# .gitignore
.claude-code/memory.md
.claude-code/cache/

# 但保留模板
! .claude-code/prompts/
```

---

下一步：[规则与记忆管理](rules-memory)
