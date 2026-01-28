# 项目初始化

本指南将帮助您使用 Claude Code 初始化新项目或为现有项目添加 Claude Code 支持。

## 创建新项目

### 1. 使用 Claude Code 创建项目

Claude Code 提供了交互式项目创建向导：

```bash
claude-code init
```

您将被询问以下问题：

```
欢迎使用 Claude Code 项目初始化向导！

? 项目名称: my-awesome-project
? 项目类型:
  - 前端应用
  - 后端服务
  - 全栈应用
  - 库/包
  - 其他
? 主要编程语言: TypeScript
? 使用框架:
  - React
  - Vue
  - Angular
  - Node.js
  - 无框架
? 包管理器: npm
? 初始化 Git: Yes
? 创建 README: Yes
```

### 2. 快速创建（使用模板）

使用预设模板快速创建项目：

```bash
# React + TypeScript + Vite
claude-code create react-ts --name my-app

# Vue 3 + TypeScript
claude-code create vue-ts --name my-vue-app

# Node.js + Express
claude-code create express --name my-server

# Python + FastAPI
claude-code create python-fastapi --name my-api
```

### 3. 交互式生成项目结构

生成完整的项目结构：

```bash
claude-code generate-structure --name my-project --type full-stack
```

这将创建：
```
my-project/
├── frontend/          # 前端代码
├── backend/           # 后端代码
├── shared/            # 共享代码
├── docs/              # 文档
├── scripts/           # 脚本
├── tests/             # 测试
├── .gitignore
├── README.md
└── package.json
```

## 为现有项目添加 Claude Code

### 1. 初始化配置

在现有项目根目录运行：

```bash
claude-code init --existing
```

这将创建：
- `.claude-code.json` - Claude Code 项目配置
- `.claude-code/` - Claude Code 工作目录
- `.claude-ignore` - 忽略规则（类似 .gitignore）

### 2. 配置项目

编辑 `.claude-code.json`：

```json
{
  "name": "my-existing-project",
  "type": "frontend",
  "language": "typescript",
  "framework": "react",
  "features": [
    "routing",
    "state-management",
    "api-integration"
  ],
  "paths": {
    "source": "./src",
    "tests": "./tests",
    "docs": "./docs"
  },
  "rules": {
    "codeStyle": "prettier",
    "linting": "eslint"
  }
}
```

### 3. 创建项目规则

项目规则帮助 Claude Code 更好地理解您的项目：

```bash
# 创建规则文件
claude-code rules init
```

生成的规则文件模板：

```markdown
<!-- .claude-code/rules.md -->

# 项目规则

## 编码规范
- 使用 TypeScript 严格模式
- 遵循 ESLint 和 Prettier 配置
- 组件使用函数式组件和 Hooks
- 使用 PascalCase 命名组件
- 使用 camelCase 命名函数和变量

## 架构原则
- 单一职责原则
- 关注点分离
- 组件组合优于继承
- 优先使用纯函数

## Git 规范
- 分支命名: feature/description, fix/description
- 提交信息: type(scope): description
- 示例: feat(auth): add user login
```

## 配置工作空间

### 1. 工作空间概念

工作空间是 Claude Code 管理项目的容器。一个工作空间可以包含：

- 单个项目
- 多个相关项目（monorepo）
- 特定功能模块

### 2. 创建工作空间

```bash
# 创建新工作空间
claude-code workspace create --name my-workspace

# 添加项目到工作空间
claude-code workspace add --workspace my-workspace --project ./my-project

# 列出工作空间
claude-code workspace list
```

### 3. 工作空间配置

工作空间配置文件：`~/.claude-code/workspaces/my-workspace.json`

```json
{
  "name": "my-workspace",
  "projects": [
    {
      "name": "frontend",
      "path": "./frontend",
      "type": "frontend"
    },
    {
      "name": "backend",
      "path": "./backend",
      "type": "backend"
    }
  ],
  "sharedRules": ["rules/base.md"],
  "sharedTools": []
}
```

## 配置提示词模板

### 1. 创建提示词模板

提示词模板定义了 Claude Code 与您交互的方式：

```bash
claude-code prompt-template init
```

### 2. 自定义提示词模板

编辑 `.claude-code/prompts/` 目录下的模板文件：

**新建组件模板**：`create-component.md`
```markdown
创建一个名为 {{componentName}} 的 {{framework}} 组件

要求：
- 使用 TypeScript
- 包含 TypeScript 类型定义
- 导出为默认导出
- 添加基本的 JSDoc 注释
- 遵循项目编码规范

组件功能：
{{componentDescription}}
```

### 3. 使用提示词模板

```bash
claude-code generate --template create-component --componentName UserProfile --componentDescription "用户个人资料页面"
```

## 设置规则和记忆

### 1. 规则（Rules）

规则是 Claude Code 必须遵循的指导原则：

**创建规则**：
```bash
claude-code rules create --name code-style
```

**示例规则**：
```markdown
# 代码风格规则

## 命名约定
- 组件: PascalCase (UserProfile)
- 变量: camelCase (userName)
- 常量: UPPER_SNAKE_CASE (MAX_RETRY)
- 文件: kebab-case (user-profile.ts)

## 注释要求
- 所有导出的函数必须有 JSDoc
- 复杂逻辑必须有行内注释
- TODO 必须包含负责人和日期

## TypeScript 严格性
- 禁止使用 any
- 必须显式类型声明
- 优先使用 interface 而不是 type
```

**规则优先级**：
1. 项目规则（`.claude-code/rules.md`）
2. 工作空间共享规则
3. 全局规则（`~/.claude-code/rules/`）

### 2. 记忆（Memory）

记忆让 Claude Code 记住项目的重要信息：

**添加记忆**：
```bash
claude-code memory add --key "api-base-url" --value "https://api.example.com"
claude-code memory add --key "database-schema" --file ./docs/schema.md
```

**查看记忆**：
```bash
claude-code memory list
claude-code memory get --key "api-base-url"
```

**记忆文件示例**：`.claude-code/memory.md`
```markdown
# 项目记忆

## 项目信息
- 项目名称: My Project
- 团队规模: 5 人
- 技术栈: React, TypeScript, Node.js

## 重要约定
- API 基础路径: https://api.example.com
- 数据库: PostgreSQL
- 认证方式: JWT

## 常见问题
- 登录接口: /api/v1/auth/login
- 用户信息接口: /api/v1/users/:id
```

## 配置工具集成

### 1. Git 集成

```bash
# 启用 Git 集成
claude-code config set git.enabled true

# 配置自动提交
claude-code config set git.autoCommit false

# 配置提交信息模板
claude-code config set git.commitMessageTemplate "type(scope): message"
```

### 2. 包管理器集成

```bash
# 自动选择包管理器
claude-code config set packageManager "auto"

# 指定包管理器
claude-code config set packageManager "pnpm"
```

### 3. 测试框架集成

```bash
# 配置测试框架
claude-code config set testing.framework "jest"

# 配置测试覆盖率
claude-code config set testing.coverageThreshold 80
```

## 验证配置

验证项目配置是否正确：

```bash
# 检查项目配置
claude-code doctor --project

# 测试配置
claude-code test-config

# 预览规则
claude-code rules list

# 预览记忆
claude-code memory list
```

## 常见初始化场景

### 场景 1：React + TypeScript 项目

```bash
# 创建项目
claude-code create react-ts --name my-react-app

# 配置 ESLint 和 Prettier
claude-code add-tool --tool eslint
claude-code add-tool --tool prettier

# 添加 Git hooks
claude-code add-tool --tool husky
```

### 场景 2：Node.js + Express API

```bash
# 创建项目
claude-code create express --name my-api

# 添加数据库支持
claude-code add-tool --tool prisma

# 添加测试工具
claude-code add-tool --tool jest
```

### 场景 3：为现有项目添加 Claude Code

```bash
# 初始化
claude-code init --existing

# 分析项目
claude-code analyze

# 生成规则建议
claude-code suggest-rules

# 应用建议的规则
claude-code rules apply --from-suggestions
```

---

下一步：[工作空间配置](workspace)
