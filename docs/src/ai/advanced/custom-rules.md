# 创建自定义规则

自定义规则让 Claude Code 更好地理解您的项目约定和编码标准。

## 规则类型

### 1. 编码规范规则

定义代码风格和格式要求：

```markdown
# 编码规范规则

## 命名约定
- 组件: PascalCase (UserProfile)
- 变量/函数: camelCase (getUser)
- 常量: UPPER_SNAKE_CASE (MAX_RETRY)
- 文件: kebab-case (user-profile.ts)

## TypeScript 规则
- 启用严格模式
- 禁止使用 any
- 优先使用 interface
- 显式类型声明

## 注释要求
- 导出函数必须有 JSDoc
- 复杂逻辑需要行内注释
```

### 2. 架构规则

定义项目架构和设计原则：

```markdown
# 架构规则

## 目录结构
```
src/
├── components/    # 可复用组件
├── pages/        # 页面组件
├── hooks/        # 自定义 Hooks
├── utils/        # 工具函数
└── api/          # API 调用
```

## 设计原则
- 单一职责原则
- 关注点分离
- 组件组合优于继承
```

### 3. 安全规则

定义安全相关要求：

```markdown
# 安全规范

## 数据验证
- 所有用户输入必须验证
- 前后端双重验证

## 敏感信息
- API 密钥使用环境变量
- 不在代码中硬编码凭证

## 认证授权
- 所有 API 请求必须认证
- 实现 RBAC 权限控制
```

## 创建规则

### 命令行方式

```bash
# 创建规则
claude-code rules create --name typescript-rules

# 创建分类
claude-code rules create --name react-rules --category framework

# 创建项目特定规则
claude-code rules create --name my-project-rules --scope project
```

### 手动创建

在 `.claude-code/rules/` 创建规则文件：

```bash
touch .claude-code/rules/typescript.md
touch .claude-code/rules/react.md
touch .claude-code/rules/security.md
```

## 规则示例

### TypeScript 规则

**文件**：`.claude-code/rules/typescript.md`

```markdown
# TypeScript 编码规范

## 类型定义

### 优先使用 interface
```typescript
// ✅ 好
interface User {
  id: string;
  name: string;
}

// ❌ 不好
type User = {
  id: string;
  name: string;
};
```

### 禁止使用 any
```typescript
// ✅ 好
const data: unknown = fetchData();
if (typeof data === 'string') {
  console.log(data);
}

// ❌ 不好
const data: any = fetchData();
console.log(data);
```

### 显式类型声明
```typescript
// ✅ 好
function greet(name: string): string {
  return `Hello, ${name}`;
}

// ❌ 不好
function greet(name) {
  return `Hello, ${name}`;
}
```

## 泛型使用
- 泛型参数命名: T, U, V
- 泛型约束使用 extends
- 提供合理的默认类型

## 类型工具
- 使用 Partial 可选化属性
- 使用 Required 必选化属性
- 使用 Readonly 只读化属性
- 使用 Pick/Exclude/Omit 精确控制类型
```

### React 规则

**文件**：`.claude-code/rules/react.md`

```markdown
# React 编码规范

## 组件定义
- 使用函数组件
- 使用 Hooks
- Props 使用 interface 定义

## Hooks 使用规则
```typescript
// ✅ 正确
function MyComponent() {
  const [state, setState] = useState(0);
  const data = useSWR('/api/data');
  return <div>{state}</div>;
}

// ❌ 错误：在条件中使用 Hooks
function BadComponent() {
  if (condition) {
    const [state, setState] = useState();
  }
}
```

## 性能优化
- 使用 React.memo 优化纯组件
- 使用 useMemo 缓存计算结果
- 使用 useCallback 缓存函数
- 避免不必要的重渲染

## 事件处理
- 使用 useCallback 稳定回调函数
- 事件处理函数以 handle 开头
```

### Git 规则

**文件**：`.claude-code/rules/git.md`

```markdown
# Git 工作流规范

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

### Type 类型
- feat: 新功能
- fix: Bug 修复
- docs: 文档变更
- style: 代码格式
- refactor: 重构
- test: 测试
- chore: 构建/工具

### 示例
```
feat(auth): add user login functionality

- Add login form component
- Integrate with auth API
- Add JWT token management

Closes #123
```
```

## 规则优先级

规则按照以下优先级应用：

1. **项目规则** (最高优先级)
   - 位置：`project/.claude-code/rules/`

2. **工作空间规则**
   - 位置：`workspace/.claude-code/rules/`

3. **全局规则**
   - 位置：`~/.claude-code/rules/`

4. **默认规则**
   - Claude Code 内置规则

## 管理规则

### 查看规则

```bash
# 列出所有规则
claude-code rules list

# 查看规则详情
claude-code rules info --name typescript

# 预览规则内容
claude-code rules show --name typescript
```

### 编辑规则

```bash
# 在编辑器中打开
claude-code rules edit --name typescript

# 更新规则
claude-code rules update --name typescript --file ./new-rule.md
```

### 删除规则

```bash
claude-code rules delete --name old-rule
```

## 规则最佳实践

### 1. 具体明确

```markdown
✅ 好的规则：
所有组件必须使用 TypeScript interface 定义 Props

❌ 不好的规则：
组件要有类型
```

### 2. 提供示例

```markdown
## 组件命名

### 使用 PascalCase
✅ UserProfile
✅ ShoppingCart
❌ userProfile
❅ shopping_cart
```

### 3. 分类组织

```
.claude-code/rules/
├── language/
│   ├── typescript.md
│   └── python.md
├── framework/
│   ├── react.md
│   └── vue.md
└── workflow/
    ├── git.md
    └── code-review.md
```

---

下一步：[工具配置](tools-config)
