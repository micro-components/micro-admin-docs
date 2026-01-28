# 测试工作流

Claude Code 可以显著提升测试开发效率，自动生成高质量的测试代码。

## 测试类型

### 1. 单元测试

测试单个函数、组件或类的功能：

```bash
# 为函数生成单元测试
claude-code generate --template write-test \
  --target ./src/utils/format.ts \
  --testType unit \
  --framework jest

# 为组件生成单元测试
claude-code generate --template write-test \
  --target ./src/components/Button.tsx \
  --testType unit \
  --framework vitest
```

### 2. 集成测试

测试多个模块协同工作的功能：

```bash
claude-code ask "为登录功能编写集成测试，
包括表单提交、API 调用、状态更新和页面跳转"
```

### 3. E2E 测试

测试完整的用户流程：

```bash
claude-code ask "编写 E2E 测试，测试用户从登录到购买商品的完整流程"
```

## 测试框架支持

Claude Code 支持主流测试框架：

### Jest

```bash
claude-code generate --template write-test \
  --target ./src/utils/api.ts \
  --framework jest
```

### Vitest

```bash
claude-code generate --template write-test \
  --target ./src/components/Card.tsx \
  --framework vitest
```

### React Testing Library

```bash
claude-code generate --template write-test \
  --target ./src/components/UserProfile.tsx \
  --framework rtl \
  --coverage 80
```

### Cypress (E2E)

```bash
claude-code ask "使用 Cypress 编写登录页面的 E2E 测试"
```

## 生成测试用例

### 组件测试

```bash
# 生成完整测试
claude-code generate --template write-test \
  --target ./src/components/ProductList.tsx \
  --framework rtl

# 测试用例包括：
# - 组件渲染
# - Props 传递
# - 用户交互
# - 状态变化
# - 错误处理
```

生成的测试示例：

```typescript
describe('ProductList', () => {
  it('renders correctly', () => {
    render(<ProductList products={mockProducts} />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });

  it('handles empty list', () => {
    render(<ProductList products={[]} />);
    expect(screen.getByText('No products')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    render(<ProductList products={[]} loading={true} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('calls callback on product click', () => {
    const onProductClick = jest.fn();
    render(<ProductList products={mockProducts} onProductClick={onProductClick} />);

    fireEvent.click(screen.getByText('Product 1'));
    expect(onProductClick).toHaveBeenCalledWith(mockProducts[0]);
  });
});
```

### 函数测试

```bash
claude-code generate --template write-test \
  --target ./src/utils/validator.ts \
  --framework jest
```

生成的测试示例：

```typescript
describe('validateEmail', () => {
  it('returns true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('returns false for invalid email', () => {
    expect(validateEmail('invalid')).toBe(false);
  });

  it('handles edge cases', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail(null)).toBe(false);
    expect(validateEmail(undefined)).toBe(false);
  });
});
```

### API 测试

```bash
claude-code ask "为 fetchProducts API 函数编写测试，
包括成功、失败和网络错误场景"
```

## 测试覆盖

### 检查覆盖率

```bash
# 运行测试并生成覆盖率报告
npm test -- --coverage

# 查看覆盖率
claude-code ask "分析测试覆盖率，找出未覆盖的代码"
```

### 提高覆盖率

```bash
# 为未覆盖的代码生成测试
claude-code ask "为 api.ts 中未覆盖的分支生成测试用例"

# 目标覆盖率
claude-code generate --template write-test \
  --target ./src/utils/helper.ts \
  --coverage 90
```

## Mock 和 Stub

### Mock API 调用

```bash
# 在测试中 Mock API
claude-code ask "为组件测试 Mock API 调用，
使用 jest.mock 和模拟响应数据"
```

生成的代码：

```typescript
import { fetchProducts } from './api';
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('./api');

describe('ProductList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays products after fetch', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' }
    ];

    (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
  });
});
```

### Mock 第三方库

```bash
claude-code ask "Mock localStorage 用于组件测试"
```

## 测试最佳实践

### 1. 测试用户行为，而非实现

```typescript
// ❌ 不好：测试实现细节
it('calls setState with new value', () => {
  // ...
});

// ✅ 好：测试用户行为
it('updates display when user clicks button', () => {
  // ...
});
```

### 2. 使用描述性的测试名称

```typescript
// ❌ 不好
it('works', () => {});

// ✅ 好
it('displays error message when login fails', () => {});
```

### 3. 保持测试独立

```typescript
// 每个测试应该独立运行
beforeEach(() => {
  // 清理状态
});

// 避免测试之间的依赖
```

### 4. 使用 Arrage-Act-Assert 模式

```typescript
it('updates user profile', () => {
  // Arrange - 准备
  render(<UserProfile user={mockUser} />);

  // Act - 执行
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'New Name' } });
  fireEvent.click(screen.getByText('Save'));

  // Assert - 断言
  expect(screen.getByText('New Name')).toBeInTheDocument();
});
```

## 测试工作流集成

### 开发新功能时

```bash
# 1. 生成组件
claude-code ask "创建 ShoppingCart 组件"

# 2. 生成测试
claude-code generate --template write-test \
  --target ./src/components/ShoppingCart.tsx \
  --framework rtl

# 3. 运行测试
npm test ShoppingCart

# 4. 修复失败的测试
claude-code ask "修复测试失败的问题"
```

### 重构代码时

```bash
# 1. 运行测试确保现有功能正常
npm test

# 2. 执行重构
claude-code ask "重构 ShoppingCart 组件"

# 3. 运行测试验证重构
npm test

# 4. 为新功能添加测试
claude-code ask "为新增功能添加测试"
```

### Bug 修复时

```bash
# 1. 添加重现 Bug 的测试
claude-code ask "添加测试用例重现登录失败 Bug"

# 2. 修复 Bug
claude-code ask "修复登录失败的问题"

# 3. 验证测试通过
npm test
```

## 持续集成

### GitHub Actions

```bash
claude-code ask "创建 GitHub Actions 工作流，
在每次 PR 时自动运行测试"
```

生成的配置：

```yaml
name: Tests

on: [pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm test
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
```

---

下一步：[高级配置 - 自定义提示词模板](../advanced/custom-prompts)
