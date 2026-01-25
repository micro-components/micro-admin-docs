# Claude Code 配置目录

本目录包含 Claude Code 的配置文件和自定义命令。

---

## 目录结构

```
.claude/
├── settings.json              # 项目主配置文件
├── README.md                  # 本文件
├── commands/                  # 自定义命令
│   ├── new-spec.md           # 创建新 Spec 命令
│   └── validate-spec.md      # 验证 Spec 命令
├── skills/                    # 自定义 Skills（可选）
├── hooks/                     # Hooks 脚本（可选）
├── logs/                      # 日志目录（自动生成）
└── cache/                     # 缓存目录（自动生成）
```

---

## 配置文件

### settings.json

项目级配置文件，定义权限、环境变量、模型等设置。

```json
{
  "permissions": {
    "allow": [
      "Bash(pnpm *)",
      "Bash(git *)",
      "Bash(ls *)",
      "Bash(mkdir *)"
    ]
  }
}
```

详细配置说明参见: [docs/src/dev/ai.md#claude-code-claude-目录完整配置](../docs/src/dev/ai.md#claude-code-claude-目录完整配置)

---

## 自定义命令

### /project:new-spec

创建新的 Spec 文档。

**用法**:
```
/project:new-spec <spec-name>
```

**示例**:
```
/project:new-spec user-auth
```

**参数**:
- `spec-name`: Spec 名称（使用 kebab-case）

**配置文件**: `.claude/commands/new-spec.md`

---

### /project:validate-spec

验证 Spec 文档的完整性和规范性。

**用法**:
```
/project:validate-spec [spec-id]
```

**示例**:
```
# 验证所有 Spec
/project:validate-spec

# 验证指定 Spec
/project:validate-spec FEAT-001
```

**参数**:
- `spec-id`: Spec ID（可选，不指定则验证所有）

**配置文件**: `.claude/commands/validate-spec.md`

---

## Skills（待添加）

Skills 是自定义的功能扩展，可以增强 Claude Code 的能力。

**目录**: `.claude/skills/`

**添加 Skill 步骤**:
1. 在 `.claude/skills/` 创建新目录
2. 创建 `skill.json` 元数据文件
3. 创建 `index.js` 实现文件

详细说明参见: [docs/src/dev/ai.md#skills-自定义-skills](../docs/src/dev/ai.md#skills-自定义-skills)

---

## Hooks（待添加）

Hooks 是在特定事件触发的脚本，用于自动化工作流程。

**目录**: `.claude/hooks/`

**Hook 类型**:
- `pre-command.sh` - 命令执行前
- `post-command.sh` - 命令执行后
- `pre-agent-execution.sh` - Agent 执行前
- `post-agent-execution.sh` - Agent 执行后
- `pre-file-edit.sh` - 文件编辑前
- `post-file-edit.sh` - 文件编辑后

详细说明参见: [docs/src/dev/ai.md#hooks-hooks-配置](../docs/src/dev/ai.md#hooks-hooks-配置)

---

## MCP 服务器（待添加）

MCP（Model Context Protocol）服务器用于扩展 Claude Code 的功能。

**配置文件**: `.claude/mcp.json`

**常用 MCP 服务器**:
- 文件系统服务器
- PostgreSQL 数据库
- GitHub 集成
- SQLite 数据库

详细说明参见: [docs/src/dev/ai.md#mcp-mcp-服务器配置](../docs/src/dev/ai.md#mcp-mcp-服务器配置)

---

## 日志和缓存

### 日志目录

**路径**: `.claude/logs/`

**日志文件**:
- `claude.log` - Claude Code 主日志
- `mcp-server.log` - MCP 服务器日志

### 缓存目录

**路径**: `.claude/cache/`

**缓存内容**:
- 对话历史
- Token 使用记录

---

## 常用命令

### Spec 相关

```bash
# 创建新 Spec
/project:new-spec user-auth

# 验证 Spec
/project:validate-spec

# 查看 Spec 状态
/project:spec-status
```

### 项目相关

```bash
# 分析项目结构
> 分析这个项目的技术栈和目录结构

# 查看开发命令
> 列出所有可用的开发命令

# 代码审查
> 审查 src/views/login/index.vue 的代码
```

---

## 故障排除

### 问题：命令未找到

**解决**:
1. 检查 `.claude/commands/` 目录是否存在命令文件
2. 检查命令文件格式是否正确
3. 重启 Claude Code

### 问题：权限被拒绝

**解决**:
1. 检查 `.claude/settings.json` 中的权限配置
2. 确认需要的命令在 `allow` 列表中

### 问题：MCP 服务器连接失败

**解决**:
1. 检查 `.claude/mcp.json` 配置是否正确
2. 确认 MCP 服务器是否正常运行
3. 查看日志文件获取详细错误信息

---

## 相关资源

### 文档

- [Claude Code 使用指南](../docs/src/dev/ai.md)
- [Spec 开发流程](../docs/specs/README.md)
- [Claude Code 官方文档](https://docs.anthropic.com/claude/code)

### 配置说明

- [settings.json 配置](../docs/src/dev/ai.md#settingsjson当前已配置)
- [mcp.json 配置](../docs/src/dev/ai.md#mcp-mcp-服务器配置)
- [skills/ 配置](../docs/src/dev/ai.md#skills-自定义-skills)
- [hooks/ 配置](../docs/src/dev/ai.md#hooks-hooks-配置)

---

## 更新日志

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| v1.0.0 | 2024-01-01 | 初始版本，添加基本配置和 Spec 命令 |

---

**文档维护**: MicroAdmin Team
**最后更新**: 2024-01-01
