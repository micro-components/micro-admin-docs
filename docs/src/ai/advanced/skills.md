# 技能包使用

技能包（Skills）是 Claude Code 的扩展功能，提供特定领域的专业知识和工作流。

## 什么是技能包

技能包包含：
- 领域特定的提示词模板
- 专业的代码生成规则
- 行业最佳实践
- 工作流自动化

## 可用技能包

### 前端开发技能包

**内容**：
- React/Vue/Angular 组件生成
- UI/UX 最佳实践
- 响应式设计模式
- 性能优化技巧

**安装**：
```bash
claude-code skills install frontend
```

**使用**：
```bash
# 使用前端技能包
claude-code ask --skill frontend "创建响应式导航栏"
```

### 后端开发技能包

**内容**：
- RESTful API 设计
- 数据库建模
- 认证授权
- 缓存策略

**安装**：
```bash
claude-code skills install backend
```

**使用**：
```bash
# 使用后端技能包
claude-code ask --skill backend "设计用户认证 API"
```

### DevOps 技能包

**内容**：
- Docker 配置
- Kubernetes 部署
- CI/CD 流水线
- 监控告警

**安装**：
```bash
claude-code skills install devops
```

**使用**：
```bash
# 使用 DevOps 技能包
claude-code ask --skill devops "创建 Dockerfile 和 docker-compose.yml"
```

### 数据工程技能包

**内容**：
- ETL 流程
- 数据清洗
- 数据管道
- 数据质量检查

**安装**：
```bash
claude-code skills install data-engineering
```

## 技能包管理

### 安装技能包

```bash
# 从官方仓库安装
claude-code skills install frontend

# 从 URL 安装
claude-code skills install https://github.com/user/skill-pack

# 从本地文件安装
claude-code skills install ./my-skill-pack
```

### 列出技能包

```bash
# 列出已安装的技能包
claude-code skills list

# 列出可用的技能包
claude-code skills list --available
```

### 更新技能包

```bash
# 更新所有技能包
claude-code skills update

# 更新特定技能包
claude-code skills update frontend
```

### 卸载技能包

```bash
claude-code skills uninstall frontend
```

## 创建自定义技能包

### 技能包结构

```
my-skill-pack/
├── skill.json          # 技能包元数据
├── prompts/            # 提示词模板
├── rules/              # 规则文件
├── examples/           # 示例代码
└── docs/               # 文档
```

### skill.json

```json
{
  "name": "my-skill-pack",
  "version": "1.0.0",
  "description": "我的自定义技能包",
  "author": "Your Name",
  "category": "custom",
  "keywords": ["custom", "development"],
  "prompts": ["prompts/*.md"],
  "rules": ["rules/*.md"]
}
```

### 创建技能包

```bash
# 初始化技能包
claude-code skills create --name my-skill

# 添加提示词模板
claude-code prompt create --skill my-skill --name my-template

# 添加规则
claude-code rules create --skill my-skill --name my-rule

# 打包技能包
claude-code skills package my-skill
```

## 使用技能包的最佳实践

### 1. 按需安装

只安装项目需要的技能包，避免资源浪费。

### 2. 定期更新

```bash
# 定期更新技能包
claude-code skills update
```

### 3. 团队共享

将技能包配置纳入版本控制：

```bash
# .claude-code/skills.json
{
  "required": ["frontend", "backend"],
  "optional": ["devops", "data-engineering"]
}
```

---

下一步：[子代理配置](agents)
