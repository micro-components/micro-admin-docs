# ERP企业资源

## 概述

ERP（Enterprise Resource Planning）企业资源计划系统，整合企业内部各种资源，实现采购、库存、销售、财务等业务的一体化管理。

## 核心模块

### 采购管理

- 供应商管理
- 采购计划
- 采购订单
- 采购入库
- 采购退货
- 供应商对账

### 库存管理

- 库存查询
- 库存盘点
- 库存调拨
- 库存预警
- 库存报表
- 批次管理

### 销售管理

- 客户管理
- 销售订单
- 销售发货
- 销售退货
- 价格管理
- 促销管理

### 财务管理

- 应收应付
- 费用报销
- 凭证管理
- 账簿查询
- 财务报表
- 税务管理

## 功能特性

### 1. 采购流程

```
采购申请 → 审批 → 生成订单 → 收货入库 → 入库单 → 付款
```

#### 采购申请

```typescript
interface PurchaseRequest {
  id: number
  requestNo: string
  requestDate: Date
  requester: string
  department: string
  items: PurchaseRequestItem[]
  totalAmount: number
  status: 'pending' | 'approved' | 'rejected'
}

interface PurchaseRequestItem {
  productId: number
  productName: string
  quantity: number
  unit: string
  unitPrice: number
  amount: number
}
```

### 2. 库存管理

#### 实时库存

```typescript
interface Inventory {
  id: number
  productId: number
  productName: string
  warehouse: string
  location: string
  quantity: number
  availableQuantity: number
  lockedQuantity: number
  minStock: number
  maxStock: number
}
```

#### 库存预警

```typescript
// 库存预警配置
interface StockAlert {
  productId: number
  productName: string
  currentStock: number
  minStock: number
  alertLevel: 'low' | 'medium' | 'high'
  alertType: 'insufficient' | 'overstock'
}
```

### 3. 销售流程

```
销售报价 → 销售订单 → 审批 → 发货 → 出库单 → 收款
```

#### 销售订单

```typescript
interface SalesOrder {
  id: number
  orderNo: string
  orderDate: Date
  customerId: number
  customerName: string
  items: SalesOrderItem[]
  totalAmount: number
  status: 'pending' | 'confirmed' | 'shipped' | 'completed' | 'cancelled'
}

interface SalesOrderItem {
  productId: number
  productName: string
  quantity: number
  unit: string
  unitPrice: number
  discount: number
  amount: number
}
```

### 4. 财务管理

#### 应收账款

```typescript
interface AccountsReceivable {
  id: number
  orderNo: string
  customerId: number
  customerName: string
  billAmount: number
  paidAmount: number
  balance: number
  dueDate: Date
  status: 'unpaid' | 'partial' | 'paid' | 'overdue'
}
```

## 技术实现

### 数据流转

```mermaid
graph LR
A[采购订单] --> B[入库单]
B --> C[库存增加]
C --> D[销售订单]
D --> E[出库单]
E --> F[库存减少]
F --> G[应收账款]
G --> H[收款]
```

### 关键接口

```typescript
// 库存查询
GET /api/erp/inventory/query
Query: { productId, warehouse, dateRange }
Response: Inventory[]

// 库存盘点
POST /api/erp/inventory/stocktake
Body: {
  warehouseId: number
  items: Array<{
    productId: number
    actualQuantity: number
  }>
}

// 采购入库
POST /api/erp/purchase/receive
Body: {
  purchaseOrderId: number
  items: Array<{
    productId: number
    receivedQuantity: number
    batchNo?: string
  }>
}
```

## 配置说明

### 仓库配置

```yaml
warehouses:
  - id: 1
    name: 主仓库
    code: WH001
    address: 北京市朝阳区
    manager: 张三
    type: main
  - id: 2
    name: 临时仓库
    code: WH002
    address: 北京市海淀区
    manager: 李四
    type: temporary
```

### 库存预警配置

```yaml
stock_alert:
  enabled: true
  check_frequency: daily
  alert_methods:
    - email
    - system
  rules:
    low_stock: quantity < minStock
    overstock: quantity > maxStock
    expired: batch.expiryDate < currentDate + 30
```

## 报表统计

### 采购报表

- 采购汇总表
- 供应商对账单
- 采购价格分析
- 采购员绩效

### 库存报表

- 库存明细表
- 库存流水账
- 库存周转分析
- 呆滞库存分析

### 销售报表

- 销售汇总表
- 客户对账单
- 产品销售排行
- 销售员绩效

### 财务报表

- 应收账款明细
- 应付账款明细
- 费用统计表
- 利润分析表

## 快速开始

### 1. 初始化基础数据

```bash
# 1. 添加仓库
库存管理 > 仓库管理 > 新增仓库

# 2. 添加供应商
采购管理 > 供应商管理 > 新增供应商

# 3. 添加产品档案
基础数据 > 产品管理 > 新增产品

# 4. 设置库存预警
库存管理 > 预警设置
```

### 2. 采购入库流程

```bash
# 1. 创建采购申请
采购管理 > 采购申请 > 新增

# 2. 审批通过后生成采购订单
采购管理 > 采购订单 > 生成订单

# 3. 收货入库
采购管理 > 入库单 > 新增入库单

# 4. 查询库存
库存管理 > 库存查询
```

### 3. 销售出库流程

```bash
# 1. 创建销售订单
销售管理 > 销售订单 > 新增

# 2. 审批通过后发货
销售管理 > 出库单 > 新增出库单

# 3. 收款登记
财务管理 > 收款单 > 新增
```

## 最佳实践

1. **规范编码**: 统一的产品编码、仓库编码、供应商编码规范
2. **及时盘点**: 定期进行库存盘点，确保账实相符
3. **流程规范**: 严格执行采购、销售、财务流程，确保数据准确性
4. **预警管理**: 合理设置库存预警阈值，避免缺货或积压
5. **数据分析**: 定期分析报表数据，优化库存结构

## 扩展功能

### 高级功能

- 批次管理
- 序列号管理
- 条码管理
- 多单位换算
- 价格策略
- 信用额度管理
- 多币种支持

### 集成功能

- 财务软件集成
- 税务系统对接
- 银行接口对接
- 电商平台同步
