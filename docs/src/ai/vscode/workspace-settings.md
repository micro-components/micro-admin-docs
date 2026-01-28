# 工作区设置

工作区设置允许您为特定项目配置 Claude Code，确保团队成员使用统一的配置。

## 工作区设置文件

工作区设置保存在 `.vscode/settings.json` 文件中，该文件应该提交到版本控制系统。

## 基本配置

### 项目标识

```json
{
  "claude-code.project.name": "my-project",
  "claude-code.project.type": "frontend",
  "claude-code.project.language": "typescript"
}
```

### 规则和记忆路径

```json
{
  "claude-code.project.rulesPath": ".claude-code/rules",
  "claude-code.project.memoryPath": ".claude-code/memory.md",
  "claude-code.project.templatesPath": ".claude-code/prompts"
}
```

## 团队协作配置

### 强制配置

确保所有团队成员使用相同的 Claude Code 配置：

```json
{
  // 团队统一模型
  "claude-code.model": "claude-3-sonnet-20240229",

  // 统一温度设置
  "claude-code.temperature": 0.7,

  // 统一最大 token 数
  "claude-code.maxTokens": 4096,

  // 强制启用缓存
  "claude-code.cache.enabled": true,

  // 禁用遥测（隐私考虑）
  "claude-code.telemetry.enabled": false
}
```

### 代码风格配置

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "typescript",
    "typescriptreact"
  ],
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 不同类型项目的配置

### 前端项目

```json
{
  "claude-code.project.type": "frontend",
  "claude-code.project.framework": "react",
  "claude-code.inlineSuggestions.enabled": true,
  "claude-code.quickFix.enabled": true,
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

### 后端项目

```json
{
  "claude-code.project.type": "backend",
  "claude-code.project.framework": "express",
  "claude-code.api.enabled": true,
  "claude-code.testing.framework": "jest",
  "editor.formatOnSave": true
}
```

### 全栈项目

```json
{
  "claude-code.project.type": "fullstack",
  "claude-code.workspace.enabled": true,
  "claude-code.workspace.projects": [
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
  ]
}
```

## 多环境配置

### 开发环境

`.vscode/settings.json`（开发）
```json
{
  "claude-code.model": "claude-3-opus-20240229",
  "claude-code.temperature": 0.8,
  "claude-code.maxTokens": 8192,
  "claude-code.advanced.logLevel": "debug"
}
```

### 生产环境

`.vscode/settings.json`（生产）
```json
{
  "claude-code.model": "claude-3-sonnet-20240229",
  "claude-code.temperature": 0.5,
  "claude-code.maxTokens": 4096,
  "claude-code.advanced.logLevel": "error"
}
```

## 推荐的工作区配置模板

### React + TypeScript 项目

```json
{
  // Claude Code 配置
  "claude-code.project.name": "${workspaceFolderBasename}",
  "claude-code.project.type": "frontend",
  "claude-code.project.framework": "react",
  "claude-code.project.language": "typescript",
  "claude-code.model": "claude-3-sonnet-20240229",
  "claude-code.temperature": 0.7,

  // 规则和记忆
  "claude-code.project.rulesPath": ".claude-code/rules",
  "claude-code.project.memoryPath": ".claude-code/memory.md",

  // 编辑器配置
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },

  // TypeScript
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,

  // ESLint
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],

  // 文件排除
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/node_modules": true,
    "**/dist": true,
    "**/build": true
  },

  // 搜索排除
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/build": true,
    "**/.git": true
  }
}
```

### Node.js + Express 项目

```json
{
  // Claude Code 配置
  "claude-code.project.name": "${workspaceFolderBasename}",
  "claude-code.project.type": "backend",
  "claude-code.project.framework": "express",
  "claude-code.project.language": "typescript",

  // API 相关
  "claude-code.api.enabled": true,
  "claude-code.testing.framework": "jest",

  // 编辑器配置
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // Node.js
  "node.cargo.enable": false,
  "npm.enableScriptExplorer": true,

  // 调试
  "debug.node.autoAttach": "on"
}
```

## 忽略文件配置

创建 `.claude-ignore` 文件来排除不需要 Claude Code 分析的文件：

```
# 依赖
node_modules/
vendor/
bower_components/

# 构建输出
dist/
build/
out/
.next/
.nuxt/

# 测试覆盖率
coverage/

# 日志
*.log
logs/

# 临时文件
*.tmp
*.temp
.cache/

# 敏感文件
.env
.env.local
*.key
*.pem

# IDE
.idea/
.vscode/
*.swp
*.swo
```

## 团队配置最佳实践

### 1. 提交工作区设置

```bash
# 确保提交 .vscode/settings.json
git add .vscode/settings.json
git commit -m "chore: add Claude Code workspace settings"
```

### 2. 使用配置模板

为团队创建配置模板，新项目直接复制使用。

### 3. 文档化配置

在工作区的 README 中记录配置说明：

```markdown
## Claude Code 配置

本项目使用统一的 Claude Code 配置：

- 模型: Claude 3 Sonnet
- 温度: 0.7
- 最大 Token: 4096

团队规则位于: `.claude-code/rules/`
项目记忆位于: `.claude-code/memory.md`
```

### 4. 定期更新配置

定期检查并更新配置，确保与项目发展同步。

---

下一步：[开发工作流 - 新建项目流程](../workflow/new-project)
