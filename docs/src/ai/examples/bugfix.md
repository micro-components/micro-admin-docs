# 修复 Bug

本示例演示如何使用 Claude Code 定位和修复 Bug。

## 场景描述

用户报告商品列表页面在滚动时性能下降，且有时会显示重复的商品。

## Bug 报告

**问题描述**：
- 商品列表滚动卡顿
- 偶尔出现重复的商品显示
- 列表超过 100 个商品时问题明显

**环境**：
- React 18
- Chrome 浏览器
- Windows 11

## 使用 Claude Code 调试

### 1. 理解问题

```bash
claude-code explain --file ./src/components/ProductList.tsx
```

### 2. 定位问题

```bash
claude-code ask "分析 ProductList 组件，找出可能导致以下问题的代码：
1. 滚动性能下降
2. 商品重复显示

可能的原因：
- 不必要的重渲染
- 缺少 key 属性或 key 不唯一
- 状态更新问题"
```

Claude Code 会识别出：

**问题 1**：没有使用虚拟滚动，大量 DOM 节点
**问题 2**：`key` 属性使用 index 而不是唯一 ID
**问题 3**：父组件状态变化导致所有子组件重渲染

### 3. 修复代码

```bash
claude-code ask "修复 ProductList 组件的问题：
1. 使用虚拟滚动（react-window 或 react-virtualized）
2. 修复 key 属性，使用商品 ID
3. 使用 React.memo 优化子组件
4. 使用 useCallback 稳定回调函数"
```

## 原始代码

```typescript
// src/components/ProductList.tsx
import React from 'react';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  onProductClick: (product: any) => void;
}

export function ProductList({ products, onProductClick }: ProductListProps) {
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
}
```

## 修复后的代码

```typescript
// src/components/ProductList.tsx
import React, { useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { ProductCard } from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

interface RowProps {
  index: number;
  style: React.CSSProperties;
  data: {
    products: Product[];
    onProductClick: (product: Product) => void;
  };
}

// 使用 React.memo 优化 ProductCard
const MemoizedProductCard = React.memo(ProductCard);

// 行渲染组件
function Row({ index, style, data }: RowProps) {
  const product = data.products[index];

  return (
    <div style={style}>
      <MemoizedProductCard
        key={product.id}  // 使用唯一 ID 作为 key
        product={product}
        onClick={() => data.onProductClick(product)}
      />
    </div>
  );
}

export function ProductList({ products, onProductClick }: ProductListProps) {
  // 使用 useCallback 稳定回调函数
  const handleProductClick = useCallback(
    (product: Product) => {
      onProductClick(product);
    },
    [onProductClick]
  );

  // 准备数据
  const listData = useMemo(
    () => ({
      products,
      onProductClick: handleProductClick,
    }),
    [products, handleProductClick]
  );

  return (
    <div className="product-list">
      <List
        height={600}  // 容器高度
        itemCount={products.length}
        itemSize={200}  // 每项高度
        width="100%"
        itemData={listData}
      >
        {Row}
      </List>
    </div>
  );
}
```

## 修复说明

### 1. 使用虚拟滚动

```typescript
import { FixedSizeList as List } from 'react-window';

<List
  height={600}
  itemCount={products.length}
  itemSize={200}
  width="100%"
>
  {Row}
</List>
```

**效果**：只渲染可见区域的商品，大幅减少 DOM 节点数量。

### 2. 修复 key 属性

```typescript
// ❌ 错误：使用 index
key={index}

// ✅ 正确：使用唯一 ID
key={product.id}
```

**效果**：避免 React 复用错误的 DOM 节点，防止重复显示。

### 3. 优化子组件

```typescript
const MemoizedProductCard = React.memo(ProductCard);
```

**效果**：避免不必要的子组件重渲染。

### 4. 稳定回调函数

```typescript
const handleProductClick = useCallback(
  (product: Product) => {
    onProductClick(product);
  },
  [onProductClick]
);
```

**效果**：避免每次渲染创建新的函数引用。

### 5. 使用 useMemo 缓存数据

```typescript
const listData = useMemo(
  () => ({
    products,
    onProductClick: handleProductClick,
  }),
  [products, handleProductClick]
);
```

**效果**：避免数据重复创建。

## 测试验证

```bash
# 运行测试
npm test

# 测试滚动性能
# 使用 Chrome DevTools Performance 面板分析
```

## 性能对比

### 修复前
- 渲染 100 个商品：~200ms
- 滚动到页面底部：有明显卡顿
- FPS：20-30

### 修复后
- 渲染 100 个商品：~50ms
- 滚动流畅
- FPS：55-60

## 关键点总结

### 1. Bug 定位

1. 理解问题现象
2. 分析可能原因
3. 使用 Claude Code 定位代码

### 2. 修复策略

1. 虚拟滚动优化大量数据
2. 正确的 key 属性
3. 避免不必要的重渲染
4. 稳定函数引用

### 3. 验证

1. 功能测试
2. 性能测试
3. 边缘情况测试

---

返回：[常见任务示例](../examples/react-component)
