# 自定义提示词模板

自定义提示词模板可以让 Claude Code 更好地理解您的需求，生成更符合预期的代码。

## 提示词工程基础

### 1. 清晰的角色定义

定义 Claude Code 的角色和专业领域：

```markdown
你是一个资深的前端工程师，专注于 React 和 TypeScript 开发。
你有 5 年以上的开发经验，熟悉 React 最佳实践和性能优化技巧。
```

### 2. 明确的输出格式

指定期望的输出格式：

```markdown
请按以下格式输出代码：

```typescript
// 1. 类型定义
interface Props {
  // ...
}

// 2. 组件定义
export const Component = ({ props }: Props) => {
  // ...
};

// 3. 样式定义
const styles = {
  // ...
};
```
```

### 3. 上下文提供

提供充分的上下文信息：

```markdown
项目技术栈：
- React 18 + TypeScript
- Tailwind CSS
- Zustand (状态管理)
- React Router v6

编码规范：
- 使用函数组件和 Hooks
- Props 使用 interface 定义
- 组件文件名使用 PascalCase
- 工具函数文件名使用 camelCase
```

## 创建自定义模板

### 方法 1：通过命令行

```bash
# 创建新模板
claude-code prompt create --name my-template

# 查看模板列表
claude-code prompt list

# 编辑模板
claude-code prompt edit --name my-template
```

### 方法 2：手动创建

在 `.claude-code/prompts/` 目录创建 `.md` 文件：

```bash
mkdir -p .claude-code/prompts
touch .claude-code/prompts/create-component.md
```

## 模板示例

### 示例 1：React 组件模板

**文件**：`create-react-component.md`

```markdown
你是一个专业的 React 开发者，专注于创建高质量的 React 组件。

## 角色
你是一位有 5 年 React 开发经验的资深工程师，
熟悉 React 18 的所有特性，包括 Hooks、Concurrent Mode 等。

## 技术栈
- React 18
- TypeScript (严格模式)
- Tailwind CSS
- 项目使用 ESLint + Prettier

## 任务
创建一个名为 {{componentName}} 的 React 组件

## 组件描述
{{componentDescription}}

## 要求

### TypeScript 类型
- 使用 interface 定义 Props
- 显式声明所有类型
- 禁止使用 any
- 复杂类型使用工具类型

### 组件实现
- 使用函数组件
- 合理使用 React Hooks
- Props 解构
- 设置默认值

### 样式
- 使用 Tailwind CSS 类名
- 响应式设计
- 可访问性 (ARIA)

### 最佳实践
- 组件单一职责
- 合理的组件拆分
- 性能优化 (React.memo 等)
- 错误边界处理

## 输出格式

请按以下结构输出代码：

```typescript
/**
 * {{componentName}} 组件
 *
 * {{componentDescription}}
 */

// 1. 类型定义
interface {{componentName}}Props {
  // props 定义
}

// 2. 组件定义
export const {{componentName}} = (props: {{componentName}}Props) => {
  // 组件实现
  return (
    // JSX
  );
};

// 3. 默认导出
export default {{componentName}};
```

## 额外要求
{{extraRequirements}}
```

### 示例 2：API 函数模板

**文件**：`create-api-function.md`

```markdown
你是一个后端 API 开发专家，擅长创建类型安全的 API 调用函数。

## 角色
TypeScript 后端开发工程师，熟悉 RESTful API 设计原则和错误处理最佳实践。

## 任务
创建 API 调用函数：{{functionName}}

## API 端点信息
- URL: {{endpoint}}
- 方法: {{method}}
- 描述: {{description}}

## 请求参数
{{requestParams}}

## 响应格式
{{responseFormat}}

## 要求

### 类型定义
- 定义 Request 接口
- 定义 Response 接口
- 定义错误类型

### 错误处理
- 处理网络错误
- 处理 HTTP 错误状态码
- 统一的错误返回格式

### 重试逻辑
- 可配置的重试次数
- 指数退避策略
- 只重试可重试的错误

### 类型安全
- 返回类型化的响应
- TypeScript 类型推导
- 泛型支持

## 输出格式

```typescript
/**
 * {{functionName}}
 *
 * {{description}}
 *
 * @param params - 请求参数
 * @returns Promise<ResponseType>
 */

// 1. 类型定义
interface {{functionName}}Request {
  // ...
}

interface {{functionName}}Response {
  // ...
}

interface {{functionName}}Error {
  message: string;
  code?: string;
  details?: unknown;
}

// 2. API 函数
export async function {{functionName}}(
  params: {{functionName}}Request
): Promise<{{functionName}}Response> {
  // 实现
}
```
```

### 示例 3：测试生成模板

**文件**：`generate-test.md`

```markdown
你是一个测试开发专家，专注于创建高质量的测试代码。

## 角色
测试工程师，熟悉单元测试、集成测试和 E2E 测试的最佳实践。

## 任务
为 {{targetFile}} 生成测试代码

## 测试框架
{{testFramework}}

## 目标覆盖率
{{coverage}}%

## 要求

### 测试策略
- 测试正常路径
- 测试边缘情况
- 测试错误处理
- 测试边界条件

### 测试组织
- 使用 describe 分组
- 使用有意义的测试名称
- 遵循 AAA 模式 (Arrange-Act-Assert)

### Mock 和 Stub
- Mock 外部依赖
- Stub 必要的函数
- 设置适当的返回值

### 断言
- 使用具体的断言
- 避免模糊的断言
- 验证关键行为

## 输出格式

```typescript
describe('{{targetName}}', () => {
  describe('正常功能', () => {
    it('应该...', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('边缘情况', () => {
    it('应该处理空输入', () => {
      // ...
    });

    it('应该处理无效输入', () => {
      // ...
    });
  });

  describe('错误处理', () => {
    it('应该正确处理错误', () => {
      // ...
    });
  });
});
```
```

## 高级特性

### 1. 条件逻辑

```markdown
{{if useTypeScript}}
使用 TypeScript 编写
添加完整的类型定义
{{endif}}

{{if not useTypeScript}}
使用 PropTypes 进行类型检查
{{endif}}

{{if useTests}}
同时生成测试代码
{{endif}}
```

### 2. 循环

```markdown
{{each features}}
- 实现功能：{{this.name}}
- 描述：{{this.description}}
{{endeach}}
```

### 3. 变量引用

```markdown
项目名称：{{projectName}}
组件名称：{{componentName}}
使用框架：{{framework}}
```

## 模板最佳实践

### 1. 保持模板简洁

```markdown
❌ 太长太复杂的模板：
[50+ 行的详细说明]

✅ 简洁明确的模板：
核心要求
关键约束
输出格式
```

### 2. 提供示例

```markdown
## 使用示例
```bash
claude-code generate --template create-component \
  --componentName UserProfile \
  --description "用户个人资料页面"
```
```

### 3. 文档化变量

```markdown
## 变量说明
- componentName: 组件名称 (PascalCase)
- description: 组件功能描述
- framework: 使用的框架
- useTypeScript: 是否使用 TypeScript (true/false)
```

### 4. 版本控制

将模板纳入版本控制：

```bash
# .gitignore
.claude-code/cache/
.claude-code/memory.md

# 但保留模板
! .claude-code/prompts/
```

## 模板管理

### 共享模板

在工作空间级别共享模板：

```
workspace/
├── .claude-code/
│   ├── prompts/           # 共享模板
│   │   ├── create-component.md
│   │   └── create-api.md
├── project-a/
│   └── .claude-code/
│       └── prompts/       # 项目特定模板
│           └── project-a-specific.md
```

### 模板继承

基础模板：

```markdown
<!-- base-component.md -->
创建一个 {{type}}

基本要求：
- 使用 TypeScript
- 遵循项目规范
- 添加注释

{{subtemplate common-requirements}}
```

继承模板：

```markdown
<!-- react-component.md -->
@extends base-component

特定要求：
- 使用函数组件
- 使用 Hooks
- Props 使用 interface
```

### 模板组合

```markdown
# 完整页面生成

{{subtemplate create-component}}
---
{{subtemplate create-store}}
---
{{subtemplate generate-test}}
---
{{subtemplate generate-docs}}
```

---

下一步：[创建自定义规则](custom-rules)
