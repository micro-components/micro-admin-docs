# 创建 React 组件

本示例演示如何使用 Claude Code 创建一个完整的 React 组件。

## 场景描述

创建一个商品卡片（ProductCard）组件，用于电商网站显示商品信息。

## 需求

组件需要：
- 显示商品图片、标题、价格
- 显示折扣信息（如有）
- 添加购物车按钮
- 添加到收藏按钮
- 响应式设计
- 加载状态
- 悬停效果

## 使用 Claude Code 创建

### 方法 1：自然语言描述

```bash
claude-code ask
```

在聊天中输入：

```
创建一个商品卡片（ProductCard）组件：

需求：
- 显示商品图片、标题、价格
- 如果有折扣，显示折扣标签和折扣价
- 添加购物车按钮
- 添加到收藏按钮（心形图标）
- 响应式设计（移动端和桌面端）
- 悬停时有阴影和上浮效果
- 加载时显示骨架屏

技术栈：
- React 18
- TypeScript
- Tailwind CSS
- 使用 lucide-react 图标库

Props：
- id: string
- title: string
- image: string
- price: number
- discountPrice?: number
- onAddToCart: () => void
- onToggleFavorite: () => void
- isFavorite: boolean
- loading?: boolean
```

### 方法 2：使用模板

```bash
claude-code generate --template create-component \
  --componentName ProductCard \
  --framework react \
  --useTypeScript true
```

然后补充详细需求。

## 生成的组件代码

```typescript
import React from 'react';
import { ShoppingCart, Heart, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

/**
 * ProductCard 组件
 *
 * 显示商品信息的卡片组件
 */
export interface ProductCardProps {
  /** 商品 ID */
  id: string;
  /** 商品标题 */
  title: string;
  /** 商品图片 URL */
  image: string;
  /** 商品价格 */
  price: number;
  /** 折扣价格（可选） */
  discountPrice?: number;
  /** 添加到购物车回调 */
  onAddToCart: () => void;
  /** 切换收藏状态回调 */
  onToggleFavorite: () => void;
  /** 是否收藏 */
  isFavorite: boolean;
  /** 加载状态 */
  loading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  image,
  price,
  discountPrice,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  loading = false,
}) => {
  const hasDiscount = discountPrice && discountPrice < price;
  const displayPrice = hasDiscount ? discountPrice : price;

  return (
    <div
      className={clsx(
        'group relative overflow-hidden rounded-xl bg-white shadow-md',
        'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        loading && 'opacity-50'
      )}
    >
      {/* 商品图片 */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className={clsx(
            'h-full w-full object-cover transition-transform duration-300',
            'group-hover:scale-105'
          )}
          loading="lazy"
        />

        {/* 折扣标签 */}
        {hasDiscount && (
          <div className="absolute left-2 top-2 rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white">
            {Math.round(((price - discountPrice) / price) * 100)}% OFF
          </div>
        )}

        {/* 收藏按钮 */}
        <button
          onClick={onToggleFavorite}
          className={clsx(
            'absolute right-2 top-2 rounded-full p-2',
            'transition-colors duration-200',
            isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-600 hover:bg-white'
          )}
          aria-label={isFavorite ? '移除收藏' : '添加收藏'}
        >
          <Heart
            className={clsx('h-5 w-5', isFavorite && 'fill-current')}
          />
        </button>
      </div>

      {/* 商品信息 */}
      <div className="space-y-2 p-4">
        {/* 商品标题 */}
        <h3 className="truncate text-lg font-semibold text-gray-900">
          {title}
        </h3>

        {/* 价格 */}
        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-red-600">
                ¥{discountPrice}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ¥{price}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ¥{price}
            </span>
          )}
        </div>

        {/* 操作按钮 */}
        <button
          onClick={onAddToCart}
          disabled={loading}
          className={clsx(
            'flex w-full items-center justify-center gap-2',
            'rounded-lg bg-blue-600 px-4 py-2',
            'font-medium text-white transition-colors',
            'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCart className="h-4 w-4" />
          )}
          添加购物车
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
```

## 使用示例

```typescript
import React, { useState } from 'react';
import { ProductCard } from './components/ProductCard';

export default function App() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const products = [
    {
      id: '1',
      title: '无线蓝牙耳机',
      image: 'https://example.com/headphone.jpg',
      price: 299,
      discountPrice: 199,
    },
    {
      id: '2',
      title: '智能手表',
      image: 'https://example.com/watch.jpg',
      price: 599,
    },
  ];

  const handleAddToCart = (productId: string) => {
    setLoading(true);
    // 模拟 API 调用
    setTimeout(() => {
      setLoading(false);
      console.log('Added to cart:', productId);
    }, 1000);
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          isFavorite={favorites.has(product.id)}
          onAddToCart={() => handleAddToCart(product.id)}
          onToggleFavorite={() => handleToggleFavorite(product.id)}
          loading={loading}
        />
      ))}
    </div>
  );
}
```

## 生成的测试

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  const defaultProps = {
    id: '1',
    title: '测试商品',
    image: 'https://example.com/test.jpg',
    price: 100,
    onAddToCart: jest.fn(),
    onToggleFavorite: jest.fn(),
    isFavorite: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('渲染商品信息', () => {
    render(<ProductCard {...defaultProps} />);

    expect(screen.getByText('测试商品')).toBeInTheDocument();
    expect(screen.getByText('¥100')).toBeInTheDocument();
  });

  it('显示折扣信息', () => {
    render(
      <ProductCard {...defaultProps} price={100} discountPrice={80} />
    );

    expect(screen.getByText('¥80')).toBeInTheDocument();
    expect(screen.getByText('¥100')).toBeInTheDocument();
    expect(screen.getByText(/20% OFF/)).toBeInTheDocument();
  });

  it('点击添加购物车', async () => {
    render(<ProductCard {...defaultProps} />);

    const button = screen.getByRole('button', { name: /添加购物车/ });
    await userEvent.click(button);

    expect(defaultProps.onAddToCart).toHaveBeenCalledTimes(1);
  });

  it('点击收藏按钮', async () => {
    render(<ProductCard {...defaultProps} />);

    const favoriteButton = screen.getByLabelText('添加收藏');
    await userEvent.click(favoriteButton);

    expect(defaultProps.onToggleFavorite).toHaveBeenCalledTimes(1);
  });

  it('加载状态', () => {
    render(<ProductCard {...defaultProps} loading={true} />);

    const button = screen.getByRole('button', { name: /添加购物车/ });
    expect(button).toBeDisabled();
  });

  it('悬停效果', () => {
    const { container } = render(<ProductCard {...defaultProps} />);

    const card = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(card);

    expect(card).toHaveClass('group');
  });
});
```

## 关键点总结

### 1. TypeScript 类型定义
- 使用 `interface` 定义 Props
- 添加详细的 JSDoc 注释
- 设置合理的默认值

### 2. 可访问性
- 使用 `aria-label` 描述按钮功能
- 适当的 `alt` 文本
- 键盘导航支持

### 3. 响应式设计
- Tailwind CSS 响应式类
- 图片 `loading="lazy"`
- 合理的断点设置

### 4. 性能优化
- 使用 `clsx` 条件类名
- 过渡效果使用 GPU 属性
- 合理的重新渲染

### 5. 用户体验
- 加载状态
- 禁用按钮防止重复点击
- 视觉反馈

---

更多示例：[编写测试用例](test-cases)
