# CRM客户管理

## 概述

CRM（Customer Relationship Management）客户关系管理系统，帮助企业有效管理客户信息、跟踪销售机会、提升客户满意度和忠诚度。

## 核心功能

### 客户管理

- 客户信息管理
- 客户分类分级
- 客户标签管理
- 客户跟进记录
- 客户360度视图

### 商机管理

- 商机创建与跟踪
- 销售阶段管理
- 预测成交金额
- 赢单/输单分析
- 商机漏斗视图

### 合同管理

- 合同创建与审批
- 合同款项跟踪
- 合同提醒与续签
- 合同模板管理
- 电子签章集成

### 销售管理

- 销售目标设定
- 销售业绩统计
- 销售团队管理
- 提成计算
- 销售预测

## 功能特性

### 1. 客户画像

通过多维数据构建完整的客户画像：

```typescript
interface CustomerProfile {
  // 基本信息
  basicInfo: {
    name: string
    company: string
    industry: string
    scale: string
  }
  // 联系信息
  contactInfo: {
    phone: string
    email: string
    address: string
  }
  // 交易记录
  transactions: Order[]
  // 行为数据
  behaviors: Behavior[]
  // 偏好标签
  tags: string[]
}
```

### 2. 销售漏斗

可视化的销售漏斗分析：

- 线索 → 商机 → 报价 → 谈判 → 成交
- 各阶段转化率分析
- 平均成交周期
- 流失原因统计

### 3. 智能提醒

- 跟进提醒
- 合同到期提醒
- 生日祝福
- 节日营销

## 技术实现

### 数据模型

```typescript
// 客户表
interface Customer {
  id: number
  name: string
  company: string
  level: 'A' | 'B' | 'C'
  status: 'active' | 'inactive'
  tags: string[]
  createdAt: Date
}

// 商机表
interface Opportunity {
  id: number
  customerId: number
  title: string
  amount: number
  stage: string
  probability: number
  expectedCloseDate: Date
}
```

### 权限控制

基于 RBAC 的数据权限：

```typescript
// 查看权限
- 自己的客户
- 部门的客户
- 全部客户

// 操作权限
- 新增客户
- 编辑客户
- 删除客户
- 导出数据
```

## 配置说明

### 客户等级配置

```yaml
customer_levels:
  - code: A
    name: 重点客户
    color: '#ff0000'
    priority: 1
  - code: B
    name: 普通客户
    color: '#00ff00'
    priority: 2
  - code: C
    name: 潜力客户
    color: '#0000ff'
    priority: 3
```

### 销售阶段配置

```yaml
sales_stages:
  - code: lead
    name: 线索
    probability: 10
  - code: opportunity
    name: 商机
    probability: 30
  - code: proposal
    name: 报价
    probability: 50
  - code: negotiation
    name: 谈判
    probability: 75
  - code: won
    name: 成交
    probability: 100
```

## 报表统计

### 销售报表

- 日报/周报/月报
- 销售趋势图
- 客户增长分析
- 产品销售排行

### 客户报表

- 客户分布统计
- 客户活跃度分析
- 客户价值分析
- 流失客户分析

## 快速开始

### 1. 配置客户字段

```bash
# 进入系统配置
设置 > 客户管理 > 字段配置

# 自定义客户字段
- 添加必填字段
- 设置字段类型
- 配置字段验证规则
```

### 2. 导入客户数据

```bash
# 使用Excel导入模板
数据管理 > 客户管理 > 导入客户

# 支持批量导入
- 下载导入模板
- 填写客户数据
- 上传文件导入
```

### 3. 设置销售目标

```bash
# 团队目标设置
销售管理 > 目标管理

# 个人目标设置
个人中心 > 销售目标
```

## 最佳实践

1. **客户分级管理**: 根据价值对客户进行分级，资源向高价值客户倾斜
2. **及时跟进**: 建立跟进提醒机制，确保及时响应客户需求
3. **数据准确性**: 定期维护客户信息，保持数据准确性
4. **团队协作**: 销售团队内部共享客户信息，避免重复联系

## 扩展功能

### 集成第三方服务

- 邮件营销集成
- 短信通知集成
- 社交媒体集成
- 呼叫中心集成

### AI 智能功能

- 客户智能分类
- 商机预测
- 推荐销售策略
- 智能话术生成
