# 调试与重构

Claude Code 不仅是代码生成工具，也是强大的调试和重构助手。

## 调试工作流

### 1. 理解错误

当遇到错误时，让 Claude Code 帮助理解和诊断：

```bash
# 复制错误信息
TypeError: Cannot read property 'map' of undefined
    at ProductList (ProductList.tsx:25:15)

# 询问 Claude Code
claude-code ask "分析这个错误：TypeError: Cannot read property 'map' of undefined"
```

Claude Code 会：
- 解释错误原因
- 定位问题代码
- 提供修复方案

### 2. 定位问题

让 Claude Code 帮助定位问题：

```bash
# 定位特定问题
claude-code ask "找出导致登录失败的原因"

# 分析代码逻辑
claude-code explain --file ./src/components/LoginForm.tsx

# 检查数据流
claude-code ask "追踪从登录按钮点击到 API 调用的数据流"
```

### 3. 添加调试日志

```bash
# 让 Claude Code 添加调试日志
claude-code ask "在 ProductList 组件中添加 console.log 以调试数据流"

# 添加条件断点日志
claude-code ask "在 API 调用失败时添加错误日志"
```

### 4. 修复错误

```bash
# 请求修复
claude-code ask "修复登录表单的提交错误"

# 解释修复方案
请解释为什么会出现这个错误，以及如何修复
```

## 重构工作流

### 1. 代码审查

在重构前，先让 Claude Code 审查代码：

```bash
# 审查整个文件
claude-code explain --file ./src/utils/api.ts

# 审查特定功能
claude-code ask "审查 api.ts 中的错误处理逻辑"

# 检查代码质量
claude-code ask "检查这段代码是否存在性能问题或可改进之处"
```

### 2. 识别重构机会

```bash
# 识别代码异味
claude-code ask "找出 api.ts 中的代码异味"

# 识别重复代码
claude-code ask "识别项目中可以复用的重复代码"

# 识别复杂代码
claude-code ask "找出复杂度过高的函数，建议如何简化"
```

### 3. 提供重构建议

```bash
# 获取重构建议
claude-code ask "为这段代码提供重构建议"

# 比较不同方案
claude-code ask "提供两种重构方案，并比较优缺点"

# 评估影响
claude-code ask "评估重构 api.ts 对其他模块的影响"
```

### 4. 执行重构

```bash
# 简单重构
claude-code ask "将这个大函数拆分为多个小函数"

# 复杂重构
claude-code ask "重构 api.ts，改进代码结构和可维护性"

# 架构重构
claude-code ask "将状态管理从组件中提取到自定义 Hook"
```

## 常见重构场景

### 场景 1：提取函数

**原始代码**：
```typescript
function ProductList({ products }) {
  const filtered = products
    .filter(p => p.price > 100)
    .sort((a, b) => a.price - b.price)
    .map(p => ({ ...p, discounted: p.price * 0.9 }));

  return (
    <div>
      {filtered.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**重构命令**：
```bash
claude-code ask "将筛选和排序逻辑提取到独立的函数中"
```

**重构后**：
```typescript
function filterAndSortProducts(products: Product[]) {
  return products
    .filter(p => p.price > 100)
    .sort((a, b) => a.price - b.price)
    .map(p => ({ ...p, discounted: p.price * 0.9 }));
}

function ProductList({ products }) {
  const filtered = filterAndSortProducts(products);

  return (
    <div>
      {filtered.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### 场景 2：提取 Hook

**原始代码**：
```typescript
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchUser()
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return <div>{user?.name}</div>;
}
```

**重构命令**：
```bash
claude-code ask "将用户数据获取逻辑提取到自定义 Hook"
```

**重构后**：
```typescript
function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchUser()
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
}

function UserProfile() {
  const { user, loading, error } = useUser();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return <div>{user?.name}</div>;
}
```

### 场景 3：简化条件逻辑

**原始代码**：
```typescript
function getDiscount(product, user) {
  if (product.type === 'electronic') {
    if (user.vip) {
      return 0.15;
    } else {
      return 0.1;
    }
  } else if (product.type === 'clothing') {
    if (user.vip) {
      return 0.2;
    } else {
      return 0.15;
    }
  } else {
    if (user.vip) {
      return 0.1;
    } else {
      return 0.05;
    }
  }
}
```

**重构命令**：
```bash
claude-code ask "简化 getDiscount 函数的条件逻辑"
```

### 场景 4：改进错误处理

**原始代码**：
```typescript
async function fetchProducts() {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

**重构命令**：
```bash
claude-code ask "改进 fetchProducts 的错误处理，添加详细的错误类型和重试逻辑"
```

## 重构最佳实践

### 1. 小步重构

```bash
# 不要一次重构太多
❌ 一次性重构整个 api.ts 文件

✅ 分步重构：
1. 先提取常量
2. 再提取通用函数
3. 最后改进错误处理
```

### 2. 保留测试

```bash
# 确保有测试覆盖
claude-code generate --template write-test --target ./src/utils/api.ts

# 每次重构后运行测试
npm test
```

### 3. 版本控制

```bash
# 重构前创建分支
git checkout -b refactor/api-improvements

# 提交每个小的改进
git add .
git commit -m "refactor: extract common functions"

# 测试通过后合并
git checkout main
git merge refactor/api-improvements
```

### 4. 代码审查

```bash
# 让 Claude Code 审查重构后的代码
claude-code ask "审查重构后的代码，检查是否有问题"
```

## 性能优化

### 1. 识别性能问题

```bash
# 检查性能问题
claude-code ask "识别 ProductList 组件中可能导致性能问题的代码"

# 分析渲染次数
claude-code ask "分析为什么这个组件会频繁重渲染"
```

### 2. 优化建议

```bash
# 获取优化建议
claude-code ask "为这个组件提供性能优化建议"

# 实施优化
claude-code ask "使用 React.memo 和 useMemo 优化 ProductList"
```

### 3. 常见优化场景

#### 避免不必要的重渲染

```bash
claude-code ask "使用 React.memo 避免子组件不必要的重渲染"
```

#### 记忆计算结果

```bash
claude-code ask "使用 useMemo 记忆计算结果"
```

#### 记忆函数引用

```bash
claude-code ask "使用 useCallback 稳定函数引用"
```

#### 虚拟化长列表

```bash
claude-code ask "为商品列表实现虚拟滚动"
```

---

下一步：[测试工作流](testing)
