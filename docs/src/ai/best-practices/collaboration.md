# 团队协作

Claude Code 可以帮助团队更好地协作，提高开发效率。

## 统一配置

### 共享规则

在工作空间级别创建共享规则：

```
workspace/
├── .claude-code/
│   ├── rules/           # 共享规则
│   │   ├── typescript.md
│   │   ├── react.md
│   │   └── git.md
│   ├── prompts/         # 共享提示词
│   └── memory.md        # 共享记忆
└── projects/
    ├── project-a/
    └── project-b/
```

### 共享配置文件

在项目根目录创建配置文件并提交到 Git：

```json
// .claude-code/workspace.json
{
  "name": "my-workspace",
  "sharedRules": [
    "rules/typescript.md",
    "rules/react.md"
  ],
  "sharedTools": ["eslint", "prettier", "husky"]
}
```

## Code Review 流程

### 自动化审查

```bash
# 创建 Git hook
# .git/hooks/pre-commit
#!/bin/sh

# 运行自动审查
claude-code agent code-reviewer --staged

# 运行测试
npm test

# 运行 lint
npm run lint
```

### Pull Request 审查

```bash
# 在 CI/CD 中运行代码审查
claude-code agent code-reviewer --pr $PR_NUMBER
```

## 统一工作流

### 开发流程

```markdown
# 团队开发流程

## 1. 创建功能分支
```bash
git checkout -b feature/new-feature
```

## 2. 使用 Claude Code 辅助开发
```bash
claude-code ask "创建新功能的代码框架"
```

## 3. 生成测试
```bash
claude-code generate --template write-test --target ./src/feature.ts
```

## 4. 自动审查
```bash
claude-code agent code-reviewer
```

## 5. 提交代码
```bash
git add .
git commit -m "feat: add new feature"
```

## 6. 创建 Pull Request
在 GitHub 上创建 PR

## 7. 人工审查 + Claude Code 辅助

## 8. 合并到主分支
```

## 知识共享

### 项目记忆

创建共享的项目记忆文件：

```markdown
# .claude-code/memory.md

## 项目信息
- 项目名称: My Project
- 技术栈: React, TypeScript, Node.js

## API 端点
- 基础路径: https://api.example.com
- 认证: JWT

## 数据库
- 类型: PostgreSQL
- 连接字符串: 见 .env

## 团队成员
- 前端: 张三
- 后端: 李四
- DevOps: 王五
```

### 代码注释规范

```bash
# 创建注释规范
claude-code rules create --name comments --category style

# 规则内容
## 注释规范
- 所有导出函数必须有 JSDoc
- 复杂逻辑需要行内注释
- TODO 必须包含负责人和日期
```

## 代码规范

### 统一编码风格

```bash
# 创建 ESLint 配置
claude-code ask "创建 ESLint 配置，统一团队编码风格"
```

### 统一 Git 提交规范

```bash
# 创建 Git 规则
claude-code rules create --name git-commit

# 规则内容
## Git 提交规范
- 类型: feat/fix/docs/style/refactor/test/chore
- 格式: type(scope): description
- 示例: feat(auth): add user login
```

### 统一命名约定

```bash
# 创建命名规范
claude-code rules create --name naming

# 规则内容
## 命名约定
- 组件: PascalCase
- 函数: camelCase
- 常量: UPPER_SNAKE_CASE
- 文件: kebab-case
```

## 文档

### API 文档

```bash
# 生成 API 文档
claude-code ask "为所有 API 端点生成文档"
```

### 组件文档

```bash
# 生成组件文档
claude-code ask "为所有 React 组件生成使用文档"
```

### 项目文档

```bash
# 生成项目文档
claude-code ask "创建完整的项目文档，包括：
- 项目简介
- 技术栈
- 安装说明
- 开发指南
- 部署说明"
```

## 培训和指导

### 新成员入职

```bash
# 创建新成员指南
claude-code ask "创建新成员入职指南，包括：
- 项目介绍
- 开发环境搭建
- 开发流程
- 常见问题"
```

### 代码示例

```bash
# 创建代码示例库
claude-code ask "创建代码示例库，展示常见功能的实现"
```

### 最佳实践文档

```bash
# 生成最佳实践文档
claude-code ask "生成团队最佳实践文档"
```

## 冲突解决

### 代码冲突

```bash
# 使用 Claude Code 帮助解决冲突
claude-code ask "帮助解决 Git 合并冲突"
```

### 规范冲突

```bash
# 统一规范
claude-code ask "统一团队的编码规范和命名约定"
```

## 质量保证

### 自动化测试

```bash
# 配置 CI/CD
claude-code ask "创建 CI/CD 配置，包含：
- 自动测试
- 代码检查
- 构建部署"
```

### 代码质量报告

```bash
# 生成质量报告
claude-code ask "生成代码质量报告，包括：
- 测试覆盖率
- 代码复杂度
- 技术债务
- 安全风险"
```

## 沟通

### Slack 集成

```bash
# 集成 Claude Code 到 Slack
claude-code ask "创建 Slack 集成，在团队频道使用 Claude Code"
```

### 邮件通知

```bash
# 配置邮件通知
claude-code ask "配置邮件通知，在代码审查和部署时通知团队"
```

## 最佳实践

### 1. 配置版本控制

将所有 Claude Code 配置纳入版本控制。

### 2. 定期同步

定期同步团队配置和规则。

### 3. 文档化

文档化所有配置和工作流程。

### 4. 培训

培训团队成员使用 Claude Code。

### 5. 反馈

收集团队反馈，持续改进。

---

返回：[最佳实践](../best-practices/prompting)
