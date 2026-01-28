# 规则与记忆管理

规则和记忆是 Claude Code 理解项目上下文和遵循团队规范的关键功能。

## 规则（Rules）

### 什么是规则

规则是 Claude Code 在生成代码、重构、审查等操作时必须遵循的指导原则。规则确保：

- 代码风格一致性
- 遵循项目约定
- 符合团队标准
- 保持代码质量

### 规则类型

#### 1. 编码规范规则
定义代码风格和格式：

```markdown
# 编码规范

## TypeScript 规则
- 启用严格模式
- 禁止使用 `any` 类型
- 优先使用 `interface` 而不是 `type`
- 显式类型声明

## 命名约定
- 组件：PascalCase (UserProfile)
- 变量/函数：camelCase (getUser)
- 常量：UPPER_SNAKE_CASE (MAX_RETRY)
- 文件：kebab-case (user-profile.ts)
- 私有成员：_prefix (_privateMethod)

## 注释要求
- 所有导出函数必须有 JSDoc
- 复杂逻辑必须有行内注释
- TODO 必须包含负责人和日期
```

#### 2. 架构规则
定义项目架构和设计原则：

```markdown
# 架构原则

## 目录结构
```
src/
├── components/    # 可复用组件
├── pages/        # 页面组件
├── hooks/        # 自定义 Hooks
├── utils/        # 工具函数
├── api/          # API 调用
├── types/        # TypeScript 类型
└── constants/    # 常量
```

## 设计原则
- 单一职责原则
- 关注点分离
- 组件组合优于继承
- 优先使用纯函数
```

#### 3. Git 规则
定义 Git 工作流和提交规范：

```markdown
# Git 规范

## 分支命名
- feature/xxx: 新功能
- fix/xxx: Bug 修复
- refactor/xxx: 重构
- docs/xxx: 文档更新
- test/xxx: 测试相关
- chore/xxx: 构建/工具更新

## 提交信息格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

Type 类型：
- feat: 新功能
- fix: Bug 修复
- docs: 文档变更
- style: 代码格式
- refactor: 重构
- test: 测试
- chore: 构建/工具

示例：
```
feat(auth): add user login functionality

- Add login form component
- Integrate with auth API
- Add JWT token management

Closes #123
```
```

#### 4. 安全规则
定义安全相关要求：

```markdown
# 安全规范

## 数据验证
- 所有用户输入必须验证
- 使用 TypeScript 类型系统
- 前端验证 + 后端验证

## 敏感信息
- API 密钥使用环境变量
- 不在代码中硬编码凭证
- 使用 .gitignore 忽略敏感文件

## 认证授权
- 所有 API 请求必须认证
- 实现权限检查
- 使用 HTTPS
```

### 创建规则

#### 方法 1：使用命令行

```bash
# 初始化规则系统
claude-code rules init

# 创建新规则
claude-code rules create --name code-style

# 创建规则分类
claude-code rules create --name typescript --category language
```

#### 方法 2：手动创建

创建规则文件：`.claude-code/rules/`

```bash
# 创建规则文件
touch .claude-code/rules/typescript.md
touch .claude-code/rules/react.md
touch .claude-code/rules/git.md
```

### 规则优先级

规则按照以下优先级应用：

1. **项目规则**（最高优先级）
   - 位置：`project/.claude-code/rules/`

2. **工作空间规则**
   - 位置：`workspace/.claude-code/rules/`

3. **全局规则**
   - 位置：`~/.claude-code/rules/`

4. **默认规则**
   - Claude Code 内置规则

### 规则管理

#### 查看规则

```bash
# 列出所有规则
claude-code rules list

# 查看规则详情
claude-code rules info --name typescript

# 预览规则内容
claude-code rules show --name typescript

# 检查规则应用情况
claude-code rules check --file ./src/utils.ts
```

#### 编辑规则

```bash
# 在编辑器中打开规则
claude-code rules edit --name typescript

# 更新规则
claude-code rules update --name typescript --file ./new-rule.md
```

#### 删除规则

```bash
claude-code rules delete --name old-rule
```

#### 规则导入导出

```bash
# 导出规则
claude-code rules export --output rules-backup.md

# 导入规则
claude-code rules import --source rules-backup.md

# 从 URL 导入规则
claude-code rules import --source https://example.com/rules.md
```

### 规则示例

#### TypeScript 规则

```markdown
# TypeScript 编码规范

## 类型定义
- ✅ 使用 interface 定义对象类型
- ✅ 使用 type 定义联合类型、元组
- ❌ 禁止使用 any
- ❌ 避免使用 as 类型断言

## 函数定义
```typescript
// ✅ 好
function greet(name: string): string {
  return `Hello, ${name}`;
}

// ❌ 不好
function greet(name: any): any {
  return `Hello, ${name}`;
}
```

## 组件 Props
```typescript
// ✅ 使用 interface
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

// ❌ 使用 type
type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};
```

## 泛型使用
- 泛型参数命名: T, U, V
- 泛型约束使用 extends
```

#### React 规则

```markdown
# React 编码规范

## 组件定义
- 使用函数组件
- 使用 Hooks
- Props 使用 interface 定义

## Hooks 使用
```typescript
// ✅ 正确
function MyComponent() {
  const [count, setCount] = useState(0);
  const data = useSWR('/api/data');

  return <div>{count}</div>;
}

// ❌ 错误：在条件中使用 Hooks
function BadComponent() {
  if (condition) {
    const [state, setState] = useState();
  }
}
```

## 性能优化
- 使用 useMemo 缓存计算结果
- 使用 useCallback 缓存函数
- 使用 React.memo 避免不必要的重渲染
```

## 记忆（Memory）

### 什么是记忆

记忆是 Claude Code 持久化的项目知识，包括：

- 项目结构和约定
- API 端点和数据模型
- 常用命令和脚本
- 重要配置和凭证
- 团队成员和联系方式

### 创建记忆

#### 方法 1：使用命令行

```bash
# 添加键值对记忆
claude-code memory add --key "api-url" --value "https://api.example.com"

# 添加文件记忆
claude-code memory add --key "schema" --file ./docs/database-schema.md

# 添加 URL 记忆
claude-code memory add --key "docs" --url "https://docs.example.com"
```

#### 方法 2：编辑记忆文件

编辑记忆文件：`.claude-code/memory.md`

```markdown
# 项目记忆

## 项目信息
- 名称: My Project
- 描述: 一个全栈 Web 应用
- 技术栈: React, TypeScript, Node.js, PostgreSQL
- 团队规模: 5 人

## API 信息
- 基础路径: https://api.example.com
- 认证方式: Bearer Token
- 版本: v1

### 端点列表
| 端点 | 方法 | 描述 |
|------|------|------|
| /api/v1/auth/login | POST | 用户登录 |
| /api/v1/users | GET | 获取用户列表 |
| /api/v1/users/:id | GET | 获取单个用户 |
| /api/v1/users | POST | 创建用户 |

## 数据库
- 类型: PostgreSQL
- 连接字符串: 见 .env
- 主要表: users, posts, comments

## 常用命令
```bash
# 开发
npm run dev          # 启动开发服务器
npm run test         # 运行测试
npm run lint         # 代码检查
npm run build        # 构建生产版本

# 数据库
npm run db:migrate   # 运行迁移
npm run db:seed      # 填充数据
```

## 团队信息
- 项目负责人: 张三 (zhangsan@example.com)
- 前端负责人: 李四 (lisi@example.com)
- 后端负责人: 王五 (wangwu@example.com)
- DevOps: 赵六 (zhaoliu@example.com)
```

### 记忆类型

#### 1. 项目信息记忆
```markdown
## 项目信息
- 名称: My Project
- 版本: 1.0.0
- 描述: 项目描述
- 技术栈: React, TypeScript...
```

#### 2. API 记忆
```markdown
## API 端点
### 登录接口
- 路径: /api/v1/auth/login
- 方法: POST
- 请求体: { email, password }
- 响应: { token, user }
```

#### 3. 数据库记忆
```markdown
## 数据库表: users
| 字段 | 类型 | 描述 |
|------|------|------|
| id | UUID | 主键 |
| email | VARCHAR(255) | 邮箱 |
| name | VARCHAR(100) | 姓名 |
```

#### 4. 命令记忆
```markdown
## 常用命令
- 启动: npm run dev
- 测试: npm test
- 构建: npm run build
```

### 记忆管理

#### 查看记忆

```bash
# 列出所有记忆
claude-code memory list

# 查看特定记忆
claude-code memory get --key api-url

# 搜索记忆
claude-code memory search --query "api"

# 预览记忆文件
claude-code memory show
```

#### 编辑记忆

```bash
# 在编辑器中打开记忆文件
claude-code memory edit

# 更新记忆
claude-code memory update --key api-url --value "https://new-api.example.com"

# 删除记忆
claude-code memory delete --key old-key
```

#### 记忆同步

```bash
# 导出记忆
claude-code memory export --output memory-backup.md

# 导入记忆
claude-code memory import --source memory-backup.md

# 与工作空间共享记忆
claude-code memory sync --workspace my-workspace
```

### 记忆最佳实践

#### 1. 结构化记忆内容

```markdown
✅ 好的结构：
## API 端点

### 用户相关
| 端点 | 方法 | 描述 |
|------|------|------|
| /users | GET | 获取用户列表 |
| /users/:id | GET | 获取单个用户 |

❌ 不好：
用户接口有 /users 和 /users/:id，还有 /auth/login
```

#### 2. 保持记忆更新

```bash
# 定期更新记忆
claude-code memory update --key version --value "2.0.0"
```

#### 3. 使用有意义的键名

```bash
✅ 好的键名：
claude-code memory add --key "api-base-url" --value "..."
claude-code memory add --key "database-connection-string" --value "..."

❌ 不好的键名：
claude-code memory add --key "url" --value "..."
claude-code memory add --key "db" --value "..."
```

#### 4. 分类管理记忆

```markdown
<!-- .claude-code/memory.md -->

# API 相关
...

# 数据库相关
...

# 部署相关
...

# 团队相关
...
```

## 规则和记忆的配合使用

规则和记忆相辅相成，帮助 Claude Code 更好地理解项目：

```markdown
# 记忆文件
<!-- .claude-code/memory.md -->
## API 信息
- 基础路径: https://api.example.com
- 认证方式: Bearer Token

# 规则文件
<!-- .claude-code/rules/api.md -->
## API 调用规范
- 使用 axios 进行 API 调用
- 所有请求必须包含认证头
- 错误处理使用统一的错误处理函数

配合使用时，Claude Code 会：
1. 从记忆中读取 API 信息
2. 根据规则生成符合规范的 API 调用代码
```

---

下一步：[VS Code 集成 - 安装扩展](../vscode/install-extension)
