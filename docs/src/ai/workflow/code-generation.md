# 代码生成工作流

Claude Code 可以显著加速代码开发过程。本指南介绍如何有效地使用 Claude Code 生成高质量代码。

## 代码生成方式

### 1. 自然语言描述

最简单的方式，用自然语言描述需求：

```bash
# 打开聊天面板
claude-code chat

# 输入需求
创建一个用户登录表单组件，包含邮箱和密码输入框，
使用 TypeScript，添加表单验证，点击登录后调用 API
```

### 2. 使用提示词模板

使用预定义的模板生成代码：

```bash
# 创建组件
claude-code generate --template create-component \
  --componentName LoginForm \
  --framework react \
  --useTypeScript true \
  --description "用户登录表单，包含邮箱和密码验证"

# 创建 API 端点
claude-code generate --template create-api-endpoint \
  --endpoint /api/v1/auth/login \
  --method POST \
  --auth required

# 生成测试
claude-code generate --template write-test \
  --target ./src/components/LoginForm.tsx \
  --framework jest
```

### 3. 基于现有代码扩展

基于现有代码生成相关代码：

```bash
# 选中代码并生成测试
claude-code explain --file ./src/utils/format.ts

# 基于现有组件创建相似组件
claude-code ask "基于 ProductList 组件创建一个 OrderList 组件"
```

## 常见代码生成场景

### 场景 1：创建 React 组件

**需求描述**：
```
创建一个 ProductCard 组件，显示商品图片、标题、价格
和购买按钮。使用 TypeScript，接受商品数据作为 props，
点击购买按钮时触发回调函数。
```

**生成命令**：
```bash
claude-code generate --template create-component \
  --componentName ProductCard \
  --framework react \
  --useTypeScript true
```

或在聊天中输入：
```
创建一个 ProductCard 组件，显示商品图片、标题、价格和购买按钮
```

### 场景 2：创建 API 调用函数

**需求描述**：
```
创建一个函数调用商品列表 API，支持分页和筛选参数，
返回类型化的响应数据。
```

**生成命令**：
```bash
claude-code ask "创建一个函数 fetchProducts，调用 /api/v1/products，
接受分页和筛选参数，返回类型化的商品列表"
```

### 场景 3：生成测试用例

**需求描述**：
```
为 UserProfile 组件生成完整的单元测试，包括：
- 组件渲染测试
- Props 正确传递测试
- 用户交互测试
- 错误处理测试
```

**生成命令**：
```bash
claude-code generate --template write-test \
  --target ./src/components/UserProfile.tsx \
  --framework jest \
  --coverage 80
```

### 场景 4：生成数据模型

**需求描述**：
```
创建用户数据模型，包含 id、email、name、role 等字段，
使用 TypeScript interface，添加 JSDoc 注释。
```

**生成命令**：
```bash
claude-code ask "创建 User 接口，包含用户相关信息字段"
```

### 场景 5：生成工具函数

**需求描述**：
```
创建一个日期格式化工具函数，支持多种格式输出，
处理时区转换，添加完整的 TypeScript 类型。
```

**生成命令**：
```bash
claude-code ask "创建 formatDate 工具函数，支持多种日期格式"
```

## 提高生成质量的方法

### 1. 提供清晰的需求

```bash
# ❌ 模糊的需求
创建一个登录表单

# ✅ 清晰的需求
创建一个登录表单组件，要求：
- 包含邮箱和密码输入框
- 邮箱需要格式验证
- 密码至少 8 个字符
- 点击登录按钮调用 /api/v1/auth/login
- 登录成功后保存 token 到 localStorage
- 显示加载状态
- 显示错误信息
- 使用 TypeScript
```

### 2. 提供上下文信息

```bash
# 在提示中提供项目上下文
我正在使用 React + TypeScript + Tailwind CSS 开发一个电商平台，
使用 Zustand 进行状态管理。请创建一个购物车组件。
```

### 3. 分步生成复杂功能

```bash
# 对于复杂功能，分步生成

# 第一步：创建基础组件
创建一个商品列表组件，显示商品卡片网格

# 第二步：添加筛选功能
在商品列表组件中添加分类筛选和搜索功能

# 第三步：添加排序功能
添加按价格、评分等维度的排序功能

# 第四步：添加加载和错误处理
添加加载状态和错误处理的 UI
```

### 4. 提供代码示例

```bash
# 提供期望的代码风格或示例
请按照以下风格创建组件：
```typescript
interface ComponentProps {
  // props 定义
}

export const Component = ({ props }: ComponentProps) => {
  // 组件逻辑
  return <div>{content}</div>;
};
```
```

## 代码生成最佳实践

### 1. 先定义类型

```bash
# 先生成 TypeScript 类型定义
创建 User、Product、Order 等类型定义

# 然后基于类型生成组件
基于 User 类型创建 UserProfile 组件
```

### 2. 使用项目规则

确保项目规则已配置，这样生成的代码会自动遵循规范：

```bash
# 检查规则
claude-code rules list

# 规则会影响生成的代码风格、命名约定等
```

### 3. 迭代改进

```bash
# 第一次生成
创建一个商品列表组件

# 检查生成结果，然后改进
给组件添加虚拟滚动，以支持大量数据

# 继续改进
添加骨架屏加载效果
```

### 4. 代码审查

生成后始终审查代码：

```bash
# 让 Claude Code 解释生成的代码
claude-code explain --file ./src/components/ProductList.tsx

# 请求改进建议
请审查 ProductList 组件，提供改进建议
```

## 批量代码生成

### 批量创建相似组件

```bash
# 创建组件模板
claude-code prompt create --name create-page-template

# 批量生成页面
claude-code generate --template create-page-template --pageName Home
claude-code generate --template create-page-template --pageName About
claude-code generate --template create-page-template --pageName Contact
```

### 批量生成 API 函数

```bash
# 定义 API 端点列表
[
  { "endpoint": "/products", "method": "GET", "description": "获取商品列表" },
  { "endpoint": "/products/:id", "method": "GET", "description": "获取商品详情" },
  { "endpoint": "/products", "method": "POST", "description": "创建商品" },
  { "endpoint": "/products/:id", "method": "PUT", "description": "更新商品" },
  { "endpoint": "/products/:id", "method": "DELETE", "description": "删除商品" }
]

# 批量生成
claude-code ask "为以上 API 端点创建对应的调用函数"
```

## 集成到开发流程

### 开发新功能

```bash
# 1. 创建组件
claude-code ask "创建商品详情页组件，显示商品信息和评论"

# 2. 生成测试
claude-code generate --template write-test --target ./src/pages/ProductDetail.tsx

# 3. 生成文档
claude-code generate --template generate-docs --target ./src/pages/ProductDetail.tsx

# 4. 添加到路由
claude-code ask "在路由配置中添加商品详情页路由"
```

### 重构现有代码

```bash
# 1. 让 Claude Code 分析代码
claude-code explain --file ./src/utils/api.ts

# 2. 请求重构建议
如何重构 api.ts 以提高可维护性？

# 3. 执行重构
请重构 api.ts，提取公共函数，改进错误处理
```

### 修复 Bug

```bash
# 1. 描述问题
用户登录后 token 没有正确保存到 localStorage

# 2. 让 Claude Code 检查代码
检查登录相关的代码，找出问题所在

# 3. 生成修复方案
请修复 token 保存的问题
```

## 代码质量检查

生成代码后，进行质量检查：

```bash
# 运行 lint 检查
npm run lint

# 运行测试
npm test

# 让 Claude Code 检查
claude-code ask "审查生成的代码，检查是否有问题"
```

---

下一步：[调试与重构](debug-refactor)
