# 工作空间配置

工作空间是 Claude Code 组织和管理项目的核心概念。良好的工作空间配置可以显著提升开发效率。

## 工作空间概念

### 什么是工作空间

工作空间是一个逻辑容器，用于：

- 组织相关的项目
- 共享配置和规则
- 统一工具和插件
- 管理上下文和记忆

### 工作空间类型

#### 1. 单项目工作空间
最简单的工作空间，包含单个项目：

```
my-project/
├── src/
├── tests/
└── .claude-code/
    └── workspace.json
```

#### 2. 多项目工作空间
包含多个相关项目：

```
workspace/
├── frontend/
├── backend/
├── shared/
├── docs/
└── .claude-code/
    └── workspace.json
```

#### 3. Monorepo 工作空间
使用包管理器的 workspace 功能：

```
monorepo/
├── packages/
│   ├── app/
│   ├── components/
│   └── utils/
├── .claude-code/
│   └── workspace.json
└── package.json
```

## 创建工作空间

### 交互式创建

```bash
claude-code workspace create
```

按照提示完成创建：

```
? 工作空间名称: my-workspace
? 工作空间类型:
  - 单项目
  - 多项目
  - Monorepo
? 工作空间路径: ~/projects/my-workspace
? 启用全局规则: Yes
? 启用共享工具: Yes
```

### 命令行创建

```bash
# 创建空工作空间
claude-code workspace create --name my-workspace --path ~/projects

# 从现有项目创建
claude-code workspace create --name my-workspace --add ./my-project

# 创建多项目工作空间
claude-code workspace create \
  --name fullstack-app \
  --add ./frontend \
  --add ./backend \
  --add ./shared
```

## 工作空间配置

### 配置文件结构

工作空间配置文件：`.claude-code/workspace.json`

```json
{
  "name": "my-workspace",
  "type": "multi-project",
  "version": "1.0.0",
  "projects": [
    {
      "name": "frontend",
      "path": "./frontend",
      "type": "frontend",
      "language": "typescript",
      "framework": "react"
    },
    {
      "name": "backend",
      "path": "./backend",
      "type": "backend",
      "language": "typescript",
      "framework": "express"
    },
    {
      "name": "shared",
      "path": "./shared",
      "type": "library",
      "language": "typescript"
    }
  ],
  "sharedRules": [
    "rules/base.md",
    "rules/typescript.md"
  ],
  "sharedTools": [
    "eslint",
    "prettier",
    "jest"
  ],
  "memory": {
    "enabled": true,
    "file": ".claude-code/memory.md"
  },
  "exclude": [
    "node_modules",
    "dist",
    "build",
    ".git"
  ]
}
```

### 配置项说明

#### name
工作空间名称，用于标识工作空间。

#### type
工作空间类型：
- `single` - 单项目
- `multi` - 多项目
- `monorepo` - Monorepo

#### projects
项目列表，每个项目包含：
- `name`: 项目名称
- `path`: 项目相对路径
- `type`: 项目类型（frontend/backend/library）
- `language`: 主要编程语言
- `framework`: 使用的框架

#### sharedRules
共享规则文件列表，所有项目都会应用这些规则。

#### sharedTools
共享工具列表，确保所有项目使用相同的工具配置。

#### memory
记忆配置：
- `enabled`: 是否启用记忆功能
- `file`: 记忆文件路径

#### exclude
排除目录，这些目录不会被 Claude Code 分析。

## 管理工作空间

### 查看工作空间

```bash
# 列出所有工作空间
claude-code workspace list

# 查看工作空间详情
claude-code workspace info --name my-workspace

# 切换工作空间
claude-code workspace use --name my-workspace
```

### 添加项目

```bash
# 添加项目到工作空间
claude-code workspace add --workspace my-workspace --project ./new-project

# 批量添加
claude-code workspace add --workspace my-workspace --project ./frontend --project ./backend
```

### 移除项目

```bash
claude-code workspace remove --workspace my-workspace --project frontend
```

### 删除工作空间

```bash
# 仅删除工作空间配置
claude-code workspace delete --name my-workspace --keep-files

# 删除工作空间及其文件
claude-code workspace delete --name my-workspace
```

## 共享配置

### 共享规则

在工作空间中定义的规则会被所有项目继承：

**工作空间规则**：`.claude-code/rules/workspace.md`
```markdown
# 工作空间通用规则

## TypeScript 规则
- 所有项目必须使用 TypeScript
- 启用严格模式
- 禁止使用 any 类型

## Git 规则
- 分支命名规范: type/description
- 提交信息规范: type(scope): description
- 提交前必须通过 lint 检查

## 命名约定
- 文件名: kebab-case
- 组件名: PascalCase
- 函数名: camelCase
```

**项目特定规则**：`frontend/.claude-code/rules/project.md`
```markdown
# 前端项目特定规则

## React 规则
- 使用函数组件和 Hooks
- 组件必须有类型定义
- Props 使用 interface 定义

## 样式规范
- 优先使用 Tailwind CSS
- 组件样式使用 CSS Modules
```

规则优先级：项目规则 > 工作空间规则 > 全局规则

### 共享工具

统一工具配置确保所有项目使用相同的版本和配置：

**共享工具配置**：`.claude-code/tools.json`
```json
{
  "eslint": {
    "version": "^8.50.0",
    "config": "configs/eslint.js",
    "plugins": [
      "@typescript-eslint",
      "react",
      "react-hooks"
    ]
  },
  "prettier": {
    "version": "^3.0.0",
    "config": "configs/prettier.js"
  },
  "jest": {
    "version": "^29.7.0",
    "config": "configs/jest.js"
  }
}
```

### 共享记忆

记忆信息在工作空间级别共享：

**共享记忆**：`.claude-code/memory.md`
```markdown
# 工作空间记忆

## API 端点
- 基础路径: https://api.example.com
- 认证方式: Bearer Token

## 数据库
- 类型: PostgreSQL
- 连接字符串: 见 .env

## 常用命令
- 启动开发服务器: npm run dev
- 运行测试: npm test
- 构建生产版本: npm run build
```

项目特定记忆：`frontend/.claude-code/memory.md`
```markdown
# 前端项目记忆

## 路由
- 基础路径: /app
- 登录页面: /app/login
- 仪表板: /app/dashboard
```

## Monorepo 配置

### 支持的包管理器

Claude Code 支持主流包管理器的 monorepo 功能：

#### npm workspaces
```json
{
  "workspaces": [
    "packages/*"
  ]
}
```

#### yarn workspaces
```json
{
  "workspaces": [
    "packages/*"
  ]
}
```

#### pnpm workspaces
```json
{
  "workspaces": [
    "packages/*"
  ]
}
```

#### Turborepo
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```

### Monorepo 工作空间配置

```bash
# 创建 Monorepo 工作空间
claude-code workspace create \
  --name my-monorepo \
  --type monorepo \
  --packageManager pnpm

# Claude Code 会自动检测 packages/
```

配置示例：
```json
{
  "name": "my-monorepo",
  "type": "monorepo",
  "packageManager": "pnpm",
  "projects": [
    {
      "name": "app",
      "path": "packages/app",
      "type": "application"
    },
    {
      "name": "components",
      "path": "packages/components",
      "type": "library"
    },
    {
      "name": "utils",
      "path": "packages/utils",
      "type": "library"
    }
  ]
}
```

## 工作空间最佳实践

### 1. 合理规划工作空间结构

```
✅ 好的结构：
projects/
├── workspaces/
│   ├── company-name/
│   │   ├── frontend/
│   │   ├── backend/
│   │   └── shared/
│   └── another-product/
│       └── app/

❌ 不好的结构：
projects/
├── random-project-1/
├── another-project/
└── test-stuff/
```

### 2. 使用共享配置减少重复

```json
{
  "sharedRules": [
    "rules/typescript.md",
    "rules/git.md",
    "rules/testing.md"
  ],
  "sharedTools": [
    "eslint",
    "prettier",
    "husky"
  ]
}
```

### 3. 明确项目边界和职责

```json
{
  "projects": [
    {
      "name": "frontend",
      "type": "frontend",
      "responsibilities": [
        "用户界面",
        "用户交互",
        "状态管理"
      ]
    },
    {
      "name": "backend",
      "type": "backend",
      "responsibilities": [
        "API 服务",
        "数据处理",
        "业务逻辑"
      ]
    }
  ]
}
```

### 4. 定期清理工作空间

```bash
# 查看未使用的项目
claude-code workspace unused --name my-workspace

# 清理缓存
claude-code workspace clean --name my-workspace
```

### 5. 使用工作空间模板

```bash
# 创建工作空间模板
claude-code workspace template create --name fullstack

# 使用模板创建新工作空间
claude-code workspace create --template fullstack --name my-app
```

---

下一步：[提示词配置](prompt-config)
