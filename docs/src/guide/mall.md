# 商城系统

## 概述

商城系统提供完整的电子商务解决方案，支持商品管理、订单处理、营销活动、会员体系等电商核心功能。

## 核心功能

### 商品管理

- 商品分类
- 商品信息管理
- 商品规格管理
- 库存管理
- 商品评价

### 订单管理

- 订单创建
- 订单查询
- 订单处理
- 订单退款
- 订单统计

### 营销活动

- 优惠券
- 满减活动
- 限时秒杀
- 拼团活动
- 积分商城

### 会员管理

- 会员注册
- 会员等级
- 会员积分
- 会员钱包
- 会员行为分析

## 功能特性

### 1. 商品管理

#### 商品信息

```typescript
interface Product {
  id: number
  name: string
  categoryId: number
  brandId?: number
  mainImage: string
  images: string[]
  price: number
  originalPrice: number
  stock: number
  sales: number
  status: 'on_sale' | 'off_sale' | 'out_of_stock'
  specs: Spec[]
  attributes: Attribute[]
  description: string
  seoTitle?: string
  seoKeywords?: string
  seoDescription?: string
}

interface Spec {
  id: number
  name: string
  values: string[]
}

interface Attribute {
  name: string
  value: string
}
```

#### SKU管理

```typescript
interface Sku {
  id: number
  productId: number
  specValues: string[] // 如: ["红色", "XL"]
  price: number
  stock: number
  image?: string
  code?: string
}
```

### 2. 订单管理

#### 订单状态流转

```
待支付 → 待发货 → 待收货 → 已完成
                ↓
              已取消
                ↓
              退款中 → 已退款
```

#### 订单数据结构

```typescript
interface Order {
  id: number
  orderNo: string
  userId: number
  userName: string
  status: OrderStatus
  totalAmount: number
  payableAmount: number
  discountAmount: number
  freightAmount: number
  items: OrderItem[]
  address: OrderAddress
  payment: OrderPayment
  logistics?: OrderLogistics
  createdAt: Date
  updatedAt: Date
}

type OrderStatus =
  | 'pending_payment'    // 待支付
  | 'pending_shipment'   // 待发货
  | 'pending_receipt'    // 待收货
  | 'completed'          // 已完成
  | 'cancelled'          // 已取消
  | 'refunding'          // 退款中
  | 'refunded'           // 已退款

interface OrderItem {
  productId: number
  productName: string
  skuId: number
  skuSpecs: string
  price: number
  quantity: number
  totalAmount: number
  image: string
}

interface OrderAddress {
  receiver: string
  mobile: string
  province: string
  city: string
  district: string
  detail: string
}
```

### 3. 营销活动

#### 优惠券

```typescript
interface Coupon {
  id: number
  name: string
  type: 'fixed' | 'percent'  // 固定金额 / 百分比
  value: number
  minAmount?: number
  totalQuantity: number
  receivedQuantity: number
  usedQuantity: number
  validDays?: number
  validStartTime?: Date
  validEndTime?: Date
  status: 'active' | 'inactive' | 'expired'
}

interface UserCoupon {
  id: number
  userId: number
  couponId: number
  status: 'unused' | 'used' | 'expired'
  orderId?: number
  receivedAt: Date
  usedAt?: Date
}
```

#### 秒杀活动

```typescript
interface SeckillActivity {
  id: number
  name: string
  products: SeckillProduct[]
  startTime: Date
  endTime: Date
  status: 'upcoming' | 'active' | 'ended'
}

interface SeckillProduct {
  productId: number
  skuId: number
  seckillPrice: number
  originalPrice: number
  stock: number
  sold: number
  limitPerUser: number
}
```

### 4. 会员系统

#### 会员等级

```typescript
interface MemberLevel {
  id: number
  name: string
  level: number
  icon: string
  discount: number  // 折扣率，如 0.9 表示9折
  benefits: string[]
  upgradeCondition: {
    growthValue: number
  }
}

interface Member {
  id: number
  userId: number
  levelId: number
  growthValue: number
  points: number
  balance: number
}
```

## 技术实现

### 关键接口

```typescript
// 商品列表
GET /api/mall/products
Query: { categoryId, keyword, page, size, sort }

// 商品详情
GET /api/mall/products/:id

// 创建订单
POST /api/mall/orders
Body: {
  items: Array<{
    skuId: number
    quantity: number
  }>
  addressId: number
  couponId?: number
}

// 订单支付
POST /api/mall/orders/:id/pay
Body: { paymentMethod: string }

// 订单查询
GET /api/mall/orders
Query: { status, startDate, endDate, page, size }
```

### 购物车

```typescript
interface CartItem {
  id: number
  userId: number
  skuId: number
  quantity: number
  selected: boolean
  createdAt: Date
}

// 购物车操作
POST /api/mall/cart/add      // 添加商品
POST /api/mall/cart/update    // 更新数量
POST /api/mall/cart/delete    // 删除商品
POST /api/mall/cart/select    // 选中/取消
```

## 配置说明

### 支付配置

```yaml
payment:
  wechat:
    app_id: your_app_id
    mch_id: your_mch_id
    api_key: your_api_key
    notify_url: https://yourdomain.com/api/payment/wechat/notify

  alipay:
    app_id: your_app_id
    private_key: your_private_key
    public_key: your_public_key
    notify_url: https://yourdomain.com/api/payment/alipay/notify
```

### 物流配置

```yaml
logistics:
  providers:
    - name: 顺丰快递
      code: SF
      app_key: your_key
    - name: 圆通速递
      code: YTO
      app_key: your_key
    - name: 中通快递
      code: ZTO
      app_key: your_key
```

### 会员等级配置

```yaml
member_levels:
  - level: 1
    name: 普通会员
    icon: bronze
    discount: 1.0
    upgrade_growth: 0
    benefits:
      - 9.5折优惠
  - level: 2
    name: 银卡会员
    icon: silver
    discount: 0.95
    upgrade_growth: 1000
    benefits:
      - 9折优惠
      - 专属客服
  - level: 3
    name: 金卡会员
    icon: gold
    discount: 0.9
    upgrade_growth: 5000
    benefits:
      - 8.5折优惠
      - 免运费
      - 生日礼券
```

## 报表统计

### 销售报表

- 订单统计
- 销售额统计
- 商品销量排行
- 客户消费分析

### 商品报表

- 商品库存预警
- 商品点击率分析
- 转化率分析
- 复购率分析

### 会员报表

- 会员增长统计
- 会员活跃度分析
- 会员价值分析
- 会员留存率

## 快速开始

### 1. 配置商品分类

```bash
# 进入商品分类管理
商品管理 > 分类管理 > 新增分类

# 设置多级分类
一级分类: 服装、数码、家居
二级分类: 男装、女装、童装
```

### 2. 添加商品

```bash
# 1. 创建商品
商品管理 > 商品列表 > 新增商品

# 2. 填写商品信息
- 商品名称
- 商品分类
- 商品价格
- 库存数量
- 商品图片

# 3. 设置规格
- 选择规格类型
- 添加规格值
- 设置SKU价格
```

### 3. 创建营销活动

```bash
# 创建优惠券
营销中心 > 优惠券 > 新增优惠券

# 创建秒杀活动
营销中心 > 秒杀活动 > 新增活动
```

## 最佳实践

1. **商品优化**: 优化商品标题、图片、描述，提高搜索排名
2. **价格策略**: 合理定价，定期促销，提高转化率
3. **物流管理**: 及时发货，跟踪物流，提升用户体验
4. **会员运营**: 通过积分、等级、优惠券提升用户粘性
5. **数据分析**: 定期分析销售数据，优化运营策略

## 扩展功能

### 高级功能

- 多规格SKU
- 组合商品
- 预售商品
- 众筹商品
- 分销系统
- 积分商城
- 直播带货
- 社交电商

### 第三方集成

- 物流查询
- 支付网关
- 短信通知
- 消息推送
- 数据分析
