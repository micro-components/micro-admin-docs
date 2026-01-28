# 新建项目流程

本指南将指导您使用 Claude Code 从零开始创建一个新项目的完整流程。

## 快速开始

### 方法 1：交互式创建（推荐）

```bash
claude-code create
```

按照提示完成项目创建：

```
欢迎使用 Claude Code 项目创建向导！

? 项目名称: my-awesome-app
? 项目类型:
  ○ 前端应用
  ○ 后端服务
  ○ 全栈应用
  ○ 库/包
  ○ Monorepo

? 主要编程语言: TypeScript
? 使用框架:
  ○ React
  ○ Vue
  ○ Angular
  ○ Node.js (Express)
  ○ Next.js
  ○ Nuxt.js

? 包管理器: npm
? 是否初始化 Git: Yes
? 是否创建 README: Yes
```

### 方法 2：使用模板快速创建

```bash
# React + TypeScript + Vite
claude-code create --template react-vite-ts --name my-app

# Vue 3 + TypeScript
claude-code create --template vue3-ts --name my-vue-app

# Node.js + Express
claude-code create --template express-ts --name my-api

# Python + FastAPI
claude-code create --template python-fastapi --name my-backend

# Monorepo (Turborepo)
claude-code create --template turborepo --name my-monorepo
```

## 详细创建流程

### 步骤 1：项目规划

在开始之前，明确以下内容：

```bash
# 询问 Claude Code 帮助规划
claude-code ask "帮我规划一个电商前端项目，需要商品列表、购物车、用户认证功能"
```

### 步骤 2：创建项目骨架

```bash
# 创建项目
claude-code create \
  --name ecommerce-app \
  --type frontend \
  --language typescript \
  --framework react \
  --packageManager pnpm
```

生成的项目结构：

```
ecommerce-app/
├── .claude-code/        # Claude Code 配置
├── public/             # 静态资源
├── src/
│   ├── components/     # 可复用组件
│   ├── pages/         # 页面组件
│   ├── hooks/         # 自定义 Hooks
│   ├── utils/         # 工具函数
│   ├── api/           # API 调用
│   ├── types/         # TypeScript 类型
│   └── constants/     # 常量
├── tests/             # 测试文件
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### 步骤 3：配置项目规则

```bash
# 初始化项目规则
claude-code rules init

# 创建特定规则
claude-code rules create --name react-rules --category framework
claude-code rules create --name typescript-rules --category language
claude-code rules create --name git-rules --category workflow
```

编辑 `.claude-code/rules/react.md`:

```markdown
# React 编码规范

## 组件规则
- 使用函数组件和 Hooks
- Props 使用 interface 定义
- 组件文件名使用 PascalCase
- 一个组件一个文件

## Hooks 使用
- 自定义 Hooks 以 use 开头
- Hooks 在组件顶层调用
- 不在循环、条件或嵌套函数中调用 Hooks

## 性能优化
- 使用 React.memo 优化纯组件
- 使用 useMemo 缓存计算结果
- 使用 useCallback 缓存函数
```

### 步骤 4：设置项目记忆

```bash
# 添加项目记忆
claude-code memory add --key "project-description" --value "电商平台前端项目"
claude-code memory add --key "api-base-url" --value "https://api.ecommerce.com"
claude-code memory add --key "author" --value "团队名称"
```

编辑 `.claude-code/memory.md`:

```markdown
# 项目记忆

## 项目信息
- 名称: ecommerce-app
- 描述: 电商平台前端项目
- 类型: React + TypeScript 应用
- 团队: 5人前端团队

## 技术栈
- 框架: React 18
- 语言: TypeScript
- 构建工具: Vite
- UI 库: Tailwind CSS
- 状态管理: Zustand
- 路由: React Router
- HTTP 客户端: Axios

## API 信息
- 基础路径: https://api.ecommerce.com
- 版本: v1
- 认证方式: JWT

## 页面规划
- 首页: / (商品列表)
- 商品详情: /products/:id
- 购物车: /cart
- 结算: /checkout
- 用户中心: /user
```

### 步骤 5：安装依赖

```bash
cd ecommerce-app

# 安装核心依赖
npm install react react-dom react-router-dom
npm install axios zustand

# 安装开发依赖
npm install -D typescript @types/react @types/react-dom
npm install -D vite @vitejs/plugin-react

# 安装代码质量工具
npm install -D eslint prettier
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 步骤 6：配置开发工具

```bash
# 初始化 ESLint
npm init @eslint/config

# 初始化 Prettier
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
echo "{}" > .prettierrc

# 配置 Git hooks
npm install -D husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

### 步骤 7：创建基础组件

```bash
# 询问 Claude Code 生成基础组件
claude-code ask "创建一个 Header 组件，包含 Logo、导航菜单和用户信息"

# 使用模板生成
claude-code generate --template create-component \
  --componentName ProductList \
  --description "商品列表页面，支持筛选和排序"
```

### 步骤 8：设置路由

```bash
# 生成路由配置
claude-code ask "配置 React Router，包含首页、商品详情、购物车等页面"
```

### 步骤 9：创建 API 层

```bash
# 生成 API 客户端
claude-code ask "创建一个 Axios 客户端，配置 baseURL 和拦截器"

# 生成 API 函数
claude-code generate --template create-api-endpoint \
  --endpoint /api/v1/products \
  --method GET \
  --description "获取商品列表"
```

### 步骤 10：编写测试

```bash
# 初始化测试环境
npm install -D vitest @testing-library/react @testing-library/jest-dom

# 生成测试
claude-code generate --template write-test \
  --target ./src/components/ProductList.tsx \
  --framework vitest
```

### 步骤 11：配置构建和部署

```bash
# 配置构建
claude-code ask "配置 Vite 构建，包括环境变量、代码分割等"

# 生成部署配置
claude-code ask "创建 Dockerfile 用于部署"
```

## 项目创建检查清单

使用以下检查清单确保项目创建完整：

```bash
# 运行诊断
claude-code doctor --project
```

### 必须完成的项目

- [ ] 项目结构创建
- [ ] package.json 配置
- [ ] TypeScript 配置
- [ ] ESLint 和 Prettier 配置
- [ ] Git 初始化和 .gitignore
- [ ] README 文档
- [ ] 环境变量模板（.env.example）

### 可选但推荐的项目

- [ ] Claude Code 规则配置
- [ ] Claude Code 记忆配置
- [ ] 单元测试框架
- [ ] CI/CD 配置
- [ ] Docker 配置
- [ ] 部署配置

## 常见场景示例

### 场景 1：React 管理后台项目

```bash
claude-code create \
  --name admin-dashboard \
  --type frontend \
  --language typescript \
  --framework react \
  --template admin-dashboard

# 添加 UI 库
npm install antd

# 生成基础布局
claude-code ask "创建一个管理后台布局，包含侧边栏、顶部栏和内容区域"
```

### 场景 2：Next.js SSR 项目

```bash
claude-code create --template nextjs --name my-ssr-app

# 生成页面
claude-code ask "创建首页、关于页面和联系页面"

# 配置 API 路由
claude-code ask "创建 API 路由 /api/hello"
```

### 场景 3：微服务后端项目

```bash
claude-code create \
  --name user-service \
  --type backend \
  --language typescript \
  --framework express

# 添加数据库支持
npm install prisma
npx prisma init

# 生成服务代码
claude-code ask "创建用户 CRUD API，包括认证和授权"
```

### 场景 4：全栈应用

```bash
claude-code create \
  --name fullstack-app \
  --type fullstack \
  --language typescript

# 这会创建前后端两个项目
```

## 项目模板创建

如果您经常创建相似的项目，可以创建自己的模板：

```bash
# 创建模板
claude-code template create --name my-company-template

# 模板将包含当前项目的配置和结构

# 使用模板创建新项目
claude-code create --template my-company-template --name new-project
```

## 最佳实践

### 1. 命名规范

使用有意义的项目名称：

```bash
✅ 好的命名:
claude-code create --name user-management-api
claude-code create --name ecommerce-frontend

❌ 不好的命名:
claude-code create --name project1
claude-code create --name test-app
```

### 2. 依赖管理

在 package.json 中添加说明：

```json
{
  "description": "电商平台前端应用",
  "keywords": ["ecommerce", "react", "typescript"],
  "scripts": {
    "dev": "启动开发服务器",
    "build": "构建生产版本",
    "test": "运行测试",
    "lint": "代码检查"
  }
}
```

### 3. 文档化

创建完整的 README.md：

```markdown
# 项目名称

## 简介
项目简要描述

## 技术栈
- React 18
- TypeScript
- Vite

## 快速开始
\`\`\`bash
npm install
npm run dev
\`\`\`

## 项目结构
描述项目目录结构

## 开发指南
如何开发和测试

## 部署
部署说明
```

### 4. 版本控制

```bash
# 初始化 Git
git init

# 提交初始代码
git add .
git commit -m "feat: initial commit"

# 关联远程仓库
git remote add origin <repository-url>
git push -u origin main
```

---

下一步：[代码生成工作流](code-generation)
