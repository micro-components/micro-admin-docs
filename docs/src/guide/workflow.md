# 工作流引擎

## 概述

工作流引擎提供强大的流程设计和管理能力，支持可视化流程设计、流程实例管理、任务分配、流程监控等业务流程自动化功能。

## 核心功能

### 流程设计

- 可视化流程设计
- 流程节点配置
- 流程连线配置
- 表单字段配置
- 流程版本管理

### 流程定义

- 流程创建
- 流程发布
- 流程挂起
- 流程挂起恢复
- 流程删除

### 流程实例

- 流程发起
- 流程审批
- 流程撤回
- 流程转办
- 流程终止

### 任务管理

- 待办任务
- 已办任务
- 任务委派
- 任务加签
- 任务评论

## 功能特性

### 1. 流程节点

#### 节点类型

- **开始节点**: 流程的起点
- **结束节点**: 流程的终点
- **审批节点**: 需要人工审批
- **抄送节点**: 仅通知不审批
- **条件节点**: 根据条件判断流程走向
- **并行节点**: 多条并行线路
- **子流程节点**: 调用子流程

#### 节点配置

```typescript
interface FlowNode {
  id: string
  name: string
  type: NodeType
  x: number
  y: number
  properties: NodeProperties
}

type NodeType =
  | 'start'        // 开始节点
  | 'end'          // 结束节点
  | 'approval'     // 审批节点
  | 'cc'           // 抄送节点
  | 'condition'    // 条件节点
  | 'parallel'     // 并行节点
  | 'subprocess'   // 子流程节点

interface NodeProperties {
  // 审批节点
  assignType?: 'user' | 'role' | 'dept' | 'self' | 'leader' | 'initiator'
  assignValue?: string[]  // 指定的人员/角色/部门ID
  approvalType?: 'or' | 'and'  // 或签 / 会签
  timeout?: number  // 超时时间（小时）
  timeoutAction?: 'pass' | 'reject' | 'transfer'  // 超时处理

  // 条件节点
  conditions?: Condition[]

  // 抄送节点
  ccUsers?: string[]
  ccRoles?: string[]
}

interface Condition {
  field: string      // 字段名
  operator: string   // 操作符: eq, ne, gt, lt, in, contains
  value: any         // 值
}
```

### 2. 流程定义

```typescript
interface FlowDefinition {
  id: number
  name: string
  code: string
  category: string
  version: number
  status: 'draft' | 'published' | 'suspended'
  formData: FormField[]
  nodes: FlowNode[]
  edges: FlowEdge[]
  createdAt: Date
  updatedAt: Date
}

interface FlowEdge {
  id: string
  source: string  // 源节点ID
  target: string  // 目标节点ID
  label?: string
  condition?: Condition
}

interface FormField {
  id: string
  name: string
  label: string
  type: 'input' | 'textarea' | 'select' | 'date' | 'number' | 'file'
  required: boolean
  defaultValue?: any
  options?: Option[]
  props?: Record<string, any>
}
```

### 3. 流程实例

```typescript
interface FlowInstance {
  id: number
  definitionId: number
  businessKey: string  // 业务Key
  title: string
  status: 'running' | 'completed' | 'terminated' | 'rejected'
  initiator: string
  currentNodes: string[]
  formData: Record<string, any>
  tasks: Task[]
  history: TaskHistory[]
  createdAt: Date
  completedAt?: Date
}

interface Task {
  id: number
  instanceId: number
  nodeId: string
  nodeName: string
  assignee?: string
  status: 'pending' | 'completed' | 'rejected' | 'transferred'
  formData: Record<string, any>
  comment?: string
  createdAt: Date
  completedAt?: Date
}

interface TaskHistory {
  id: number
  instanceId: number
  nodeId: string
  nodeName: string
  assignee: string
  action: 'submit' | 'approve' | 'reject' | 'transfer'
  comment?: string
  createdAt: Date
}
```

## 技术实现

### 核心流程

```
1. 流程设计
   ↓
2. 流程发布
   ↓
3. 发起流程实例
   ↓
4. 生成待办任务
   ↓
5. 任务审批
   ↓
6. 判断是否结束
   ├─ 是 → 流程结束
   └─ 否 → 生成下一节点任务
```

### 关键接口

```typescript
// 流程列表
GET /api/workflow/definitions
Query: { category, status, page, size }

// 获取流程详情
GET /api/workflow/definitions/:id

// 发布流程
POST /api/workflow/definitions/:id/publish

// 发起流程
POST /api/workflow/instances
Body: {
  definitionId: number
  title: string
  businessKey: string
  formData: Record<string, any>
}

// 我的待办
GET /api/workflow/tasks/todo
Query: { keyword, page, size }

// 审批任务
POST /api/workflow/tasks/:id/approve
Body: {
  action: 'approve' | 'reject'
  comment?: string
  formData?: Record<string, any>
}

// 任务转办
POST /api/workflow/tasks/:id/transfer
Body: {
  targetUser: string
  comment?: string
}

// 流程撤回
POST /api/workflow/instances/:id/withdraw

// 流程查询
GET /api/workflow/instances
Query: { status, initiator, startDate, endDate, page, size }
```

### 流程设计器

使用拖拽式流程设计器：

```vue
<template>
  <div class="flow-designer">
    <!-- 节点工具栏 -->
    <div class="node-palette">
      <div v-for="nodeType in nodeTypes" :key="nodeType.type"
           class="node-item"
           draggable="true"
           @dragstart="onDragStart($event, nodeType)">
        <i :class="nodeType.icon"></i>
        <span>{{ nodeType.label }}</span>
      </div>
    </div>

    <!-- 画布区域 -->
    <div class="flow-canvas"
         @drop="onDrop"
         @dragover="onDragOver">
      <svg class="flow-svg">
        <path v-for="edge in edges" :key="edge.id" :d="getEdgePath(edge)" />
      </svg>
      <div v-for="node in nodes" :key="node.id"
           class="flow-node"
           :style="{ left: node.x + 'px', top: node.y + 'px' }"
           @click="selectNode(node)">
        <i :class="getNodeIcon(node.type)"></i>
        <span>{{ node.name }}</span>
      </div>
    </div>

    <!-- 属性面板 -->
    <div class="property-panel">
      <div v-if="selectedNode">
        <h3>{{ selectedNode.name }} 属性</h3>
        <el-form :model="selectedNode.properties">
          <el-form-item label="审批人类型">
            <el-select v-model="selectedNode.properties.assignType">
              <el-option label="指定人员" value="user" />
              <el-option label="指定角色" value="role" />
              <el-option label="部门负责人" value="leader" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
```

## 配置说明

### 流程分类

```yaml
flow_categories:
  - code: leave
    name: 请假流程
  - code: expense
    name: 报销流程
  - code: purchase
    name: 采购流程
  - code: contract
    name: 合同审批
```

### 审批规则

```yaml
approval_rules:
  # 或签：任一人审批通过即可
  or_approve:
    type: or
    description: 任一审批人通过即流转

  # 会签：所有审批人都需要通过
  and_approve:
    type: and
    description: 所有审批人都通过才流转

  # 顺序审批：依次审批
  sequence_approve:
    type: sequence
    description: 按顺序依次审批
```

### 超时配置

```yaml
timeout_config:
  enabled: true
  actions:
    - type: pass
      description: 自动通过
    - type: reject
      description: 自动拒绝
    - type: transfer
      description: 转办给上级
    - type: remind
      description: 发送提醒
```

## 使用场景

### 请假流程

```
开始 → 部门经理审批 → 人力资源审批 → 结束
       ↓（>3天）
     总经理审批
```

### 报销流程

```
开始 → 部门主管审批 → 财务审核 → 出纳付款 → 结束
                    ↓（>5000元）
                  财务经理审批
```

### 合同审批

```
开始 → 法务审核 → 业务总监审批 → 总经理审批 → 结束
        ↓                       ↓
      通过                    通过
        ↓                       ↓
    →→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→
```

## 快速开始

### 1. 设计流程

```bash
# 进入流程设计
工作流 > 流程定义 > 新建流程

# 拖拽节点到画布
- 添加开始节点
- 添加审批节点
- 添加结束节点

# 连接节点
- 拖拽连接线连接节点

# 配置节点属性
- 设置审批人
- 设置审批方式
- 设置表单字段
```

### 2. 发布流程

```bash
# 点击发布按钮
流程设计完成后，点击"发布"按钮

# 流程正式生效
发布后即可发起流程实例
```

### 3. 发起流程

```bash
# 进入发起页面
工作流 > 我的申请 > 发起申请

# 选择流程
从流程列表中选择要发起的流程

# 填写表单
根据流程定义填写表单数据

# 提交申请
点击提交，流程实例创建完成
```

### 4. 审批任务

```bash
# 查看待办任务
工作流 > 待办任务

# 审批操作
- 通过：点击通过，填写审批意见
- 拒绝：点击拒绝，填写拒绝原因
- 转办：转办给其他人审批
```

## 最佳实践

1. **流程简化**: 流程设计尽量简洁，避免过多审批节点
2. **权限合理**: 合理设置审批人，避免流程阻塞
3. **条件判断**: 使用条件节点实现复杂的业务逻辑
4. **超时处理**: 设置超时提醒和自动处理，提高效率
5. **版本管理**: 流程修改时创建新版本，避免影响进行中的流程

## 模板案例

### 1. 请假流程模板

#### 流程定义

```typescript
// 请假流程定义
const leaveFlowDefinition: FlowDefinition = {
  id: 1,
  name: '员工请假流程',
  code: 'leave_flow',
  category: 'leave',
  version: 1,
  status: 'published',
  formData: [
    {
      id: 'field_1',
      name: 'leaveType',
      label: '请假类型',
      type: 'select',
      required: true,
      options: [
        { label: '年假', value: 'annual' },
        { label: '事假', value: 'personal' },
        { label: '病假', value: 'sick' },
        { label: '调休', value: 'compensatory' }
      ]
    },
    {
      id: 'field_2',
      name: 'startDate',
      label: '开始日期',
      type: 'date',
      required: true
    },
    {
      id: 'field_3',
      name: 'endDate',
      label: '结束日期',
      type: 'date',
      required: true
    },
    {
      id: 'field_4',
      name: 'reason',
      label: '请假原因',
      type: 'textarea',
      required: true
    },
    {
      id: 'field_5',
      name: 'attachment',
      label: '附件',
      type: 'file',
      required: false
    }
  ],
  nodes: [
    {
      id: 'start_1',
      name: '开始',
      type: 'start',
      x: 100,
      y: 200,
      properties: {}
    },
    {
      id: 'node_1',
      name: '部门经理审批',
      type: 'approval',
      x: 300,
      y: 200,
      properties: {
        assignType: 'leader',
        assignValue: [],
        approvalType: 'or',
        timeout: 48,
        timeoutAction: 'remind'
      }
    },
    {
      id: 'node_2',
      name: '总经理审批',
      type: 'approval',
      x: 500,
      y: 200,
      properties: {
        assignType: 'role',
        assignValue: ['role_general_manager'],
        approvalType: 'or',
        timeout: 48,
        timeoutAction: 'remind'
      }
    },
    {
      id: 'node_3',
      name: '人力资源备案',
      type: 'approval',
      x: 700,
      y: 200,
      properties: {
        assignType: 'role',
        assignValue: ['role_hr'],
        approvalType: 'or',
        timeout: 24,
        timeoutAction: 'pass'
      }
    },
    {
      id: 'end_1',
      name: '结束',
      type: 'end',
      x: 900,
      y: 200,
      properties: {}
    }
  ],
  edges: [
    {
      id: 'edge_1',
      source: 'start_1',
      target: 'node_1'
    },
    {
      id: 'edge_2',
      source: 'node_1',
      target: 'node_2',
      condition: {
        field: 'leaveDays',
        operator: 'gt',
        value: 3
      },
      label: '超过3天'
    },
    {
      id: 'edge_3',
      source: 'node_1',
      target: 'node_3',
      condition: {
        field: 'leaveDays',
        operator: 'lte',
        value: 3
      },
      label: '3天及以下'
    },
    {
      id: 'edge_4',
      source: 'node_2',
      target: 'node_3'
    },
    {
      id: 'edge_5',
      source: 'node_3',
      target: 'end_1'
    }
  ],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01')
}
```

#### 发起流程实例

```typescript
// 发起请假流程
async function startLeaveFlow() {
  const response = await fetch('/api/workflow/instances', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      definitionId: 1,
      title: '张三的年假申请',
      businessKey: 'LEAVE_20240115_001',
      formData: {
        leaveType: 'annual',
        startDate: '2024-01-20',
        endDate: '2024-01-25',
        leaveDays: 5,
        reason: '春节回家探亲',
        attachment: 'file_id_12345'
      }
    })
  })

  const result = await response.json()
  console.log('流程实例ID:', result.data.id)
  return result.data
}
```

#### 审批任务

```typescript
// 审批请假申请
async function approveLeaveTask(taskId: number, action: 'approve' | 'reject') {
  const response = await fetch(`/api/workflow/tasks/${taskId}/approve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action,
      comment: action === 'approve' ? '同意请假，工作已安排好' : '理由不充分，请补充说明'
    })
  })

  return await response.json()
}
```

### 2. 报销流程模板

#### 流程定义

```typescript
const expenseFlowDefinition: FlowDefinition = {
  id: 2,
  name: '费用报销流程',
  code: 'expense_flow',
  category: 'expense',
  version: 1,
  status: 'published',
  formData: [
    {
      id: 'field_1',
      name: 'expenseType',
      label: '报销类型',
      type: 'select',
      required: true,
      options: [
        { label: '差旅费', value: 'travel' },
        { label: '业务招待', value: 'business' },
        { label: '办公用品', value: 'office' },
        { label: '培训费用', value: 'training' }
      ]
    },
    {
      id: 'field_2',
      name: 'amount',
      label: '报销金额',
      type: 'number',
      required: true,
      props: { min: 0, step: 0.01 }
    },
    {
      id: 'field_3',
      name: 'expenseDate',
      label: '发生日期',
      type: 'date',
      required: true
    },
    {
      id: 'field_4',
      name: 'description',
      label: '费用说明',
      type: 'textarea',
      required: true
    },
    {
      id: 'field_5',
      name: 'invoices',
      label: '发票附件',
      type: 'file',
      required: true
    }
  ],
  nodes: [
    {
      id: 'start_1',
      name: '开始',
      type: 'start',
      x: 100,
      y: 200,
      properties: {}
    },
    {
      id: 'node_1',
      name: '部门主管审批',
      type: 'approval',
      x: 300,
      y: 200,
      properties: {
        assignType: 'leader',
        approvalType: 'or',
        timeout: 48
      }
    },
    {
      id: 'node_2',
      name: '财务审核',
      type: 'approval',
      x: 500,
      y: 200,
      properties: {
        assignType: 'role',
        assignValue: ['role_finance'],
        approvalType: 'or',
        timeout: 24
      }
    },
    {
      id: 'node_3',
      name: '财务经理审批',
      type: 'approval',
      x: 500,
      y: 350,
      properties: {
        assignType: 'role',
        assignValue: ['role_finance_manager'],
        approvalType: 'or',
        timeout: 24
      }
    },
    {
      id: 'node_4',
      name: '出纳付款',
      type: 'approval',
      x: 700,
      y: 200,
      properties: {
        assignType: 'role',
        assignValue: ['role_cashier'],
        approvalType: 'or',
        timeout: 48
      }
    },
    {
      id: 'end_1',
      name: '结束',
      type: 'end',
      x: 900,
      y: 200,
      properties: {}
    }
  ],
  edges: [
    { id: 'edge_1', source: 'start_1', target: 'node_1' },
    {
      id: 'edge_2',
      source: 'node_1',
      target: 'node_2',
      label: '普通报销'
    },
    {
      id: 'edge_3',
      source: 'node_2',
      target: 'node_3',
      condition: { field: 'amount', operator: 'gt', value: 5000 },
      label: '超过5000元'
    },
    {
      id: 'edge_4',
      source: 'node_2',
      target: 'node_4',
      condition: { field: 'amount', operator: 'lte', value: 5000 },
      label: '5000元及以下'
    },
    { id: 'edge_5', source: 'node_3', target: 'node_4' },
    { id: 'edge_6', source: 'node_4', target: 'end_1' }
  ],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01')
}
```

### 3. 合同审批模板

#### 带并行审批的流程

```typescript
const contractFlowDefinition: FlowDefinition = {
  id: 3,
  name: '合同审批流程',
  code: 'contract_flow',
  category: 'contract',
  version: 1,
  status: 'published',
  formData: [
    {
      id: 'field_1',
      name: 'contractName',
      label: '合同名称',
      type: 'input',
      required: true
    },
    {
      id: 'field_2',
      name: 'contractAmount',
      label: '合同金额',
      type: 'number',
      required: true
    },
    {
      id: 'field_3',
      name: 'contractType',
      label: '合同类型',
      type: 'select',
      required: true,
      options: [
        { label: '采购合同', value: 'purchase' },
        { label: '销售合同', value: 'sales' },
        { label: '服务合同', value: 'service' },
        { label: '框架合同', value: 'framework' }
      ]
    },
    {
      id: 'field_4',
      name: 'contractFile',
      label: '合同文件',
      type: 'file',
      required: true
    }
  ],
  nodes: [
    {
      id: 'start_1',
      name: '开始',
      type: 'start',
      x: 100,
      y: 200,
      properties: {}
    },
    {
      id: 'node_1',
      name: '法务审核',
      type: 'approval',
      x: 300,
      y: 200,
      properties: {
        assignType: 'role',
        assignValue: ['role_legal'],
        approvalType: 'and',
        timeout: 72
      }
    },
    {
      id: 'node_2',
      name: '业务总监审批',
      type: 'approval',
      x: 500,
      y: 120,
      properties: {
        assignType: 'role',
        assignValue: ['role_business_director'],
        approvalType: 'or',
        timeout: 48
      }
    },
    {
      id: 'node_3',
      name: '财务总监审批',
      type: 'approval',
      x: 500,
      y: 280,
      properties: {
        assignType: 'role',
        assignValue: ['role_finance_director'],
        approvalType: 'or',
        timeout: 48
      }
    },
    {
      id: 'node_4',
      name: '总经理审批',
      type: 'approval',
      x: 700,
      y: 200,
      properties: {
        assignType: 'role',
        assignValue: ['role_general_manager'],
        approvalType: 'or',
        timeout: 48
      }
    },
    {
      id: 'node_5',
      name: '合同盖章',
      type: 'approval',
      x: 900,
      y: 200,
      properties: {
        assignType: 'role',
        assignValue: ['role_admin'],
        approvalType: 'or',
        timeout: 24
      }
    },
    {
      id: 'end_1',
      name: '结束',
      type: 'end',
      x: 1100,
      y: 200,
      properties: {}
    }
  ],
  edges: [
    { id: 'edge_1', source: 'start_1', target: 'node_1' },
    { id: 'edge_2', source: 'node_1', target: 'node_2' },
    { id: 'edge_3', source: 'node_1', target: 'node_3' },
    { id: 'edge_4', source: 'node_2', target: 'node_4' },
    { id: 'edge_5', source: 'node_3', target: 'node_4' },
    {
      id: 'edge_6',
      source: 'node_4',
      target: 'node_5',
      condition: { field: 'contractAmount', operator: 'lte', value: 1000000 }
    },
    {
      id: 'edge_7',
      source: 'node_4',
      target: 'end_1',
      condition: { field: 'contractAmount', operator: 'gt', value: 1000000 },
      label: '超过100万需董事会审批'
    },
    { id: 'edge_8', source: 'node_5', target: 'end_1' }
  ],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01')
}
```

### 4. 采购流程模板（含子流程）

```typescript
const purchaseFlowDefinition: FlowDefinition = {
  id: 4,
  name: '采购申请流程',
  code: 'purchase_flow',
  category: 'purchase',
  version: 1,
  status: 'published',
  formData: [
    {
      id: 'field_1',
      name: 'itemName',
      label: '采购物品',
      type: 'input',
      required: true
    },
    {
      id: 'field_2',
      name: 'quantity',
      label: '数量',
      type: 'number',
      required: true
    },
    {
      id: 'field_3',
      name: 'budget',
      label: '预算金额',
      type: 'number',
      required: true
    },
    {
      id: 'field_4',
      name: 'urgency',
      label: '紧急程度',
      type: 'select',
      required: true,
      options: [
        { label: '普通', value: 'normal' },
        { label: '紧急', value: 'urgent' },
        { label: '特急', value: 'critical' }
      ]
    }
  ],
  nodes: [
    {
      id: 'start_1',
      name: '开始',
      type: 'start',
      x: 100,
      y: 200,
      properties: {}
    },
    {
      id: 'node_1',
      name: '部门经理审批',
      type: 'approval',
      x: 300,
      y: 200,
      properties: {
        assignType: 'leader',
        approvalType: 'or'
      }
    },
    {
      id: 'node_2',
      name: '供应商比价',
      type: 'subprocess',
      x: 500,
      y: 200,
      properties: {
        subprocessId: 'price_comparison_flow'
      }
    },
    {
      id: 'node_3',
      name: '采购经理审批',
      type: 'approval',
      x: 700,
      y: 200,
      properties: {
        assignType: 'role',
        assignValue: ['role_purchase_manager'],
        approvalType: 'or'
      }
    },
    {
      id: 'node_4',
      name: '抄送财务',
      type: 'cc',
      x: 900,
      y: 200,
      properties: {
        ccRoles: ['role_finance']
      }
    },
    {
      id: 'end_1',
      name: '结束',
      type: 'end',
      x: 1100,
      y: 200,
      properties: {}
    }
  ],
  edges: [
    { id: 'edge_1', source: 'start_1', target: 'node_1' },
    { id: 'edge_2', source: 'node_1', target: 'node_2' },
    { id: 'edge_3', source: 'node_2', target: 'node_3' },
    { id: 'edge_4', source: 'node_3', target: 'node_4' },
    { id: 'edge_5', source: 'node_4', target: 'end_1' }
  ],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01')
}
```

### 5. 条件节点使用示例

```typescript
// 条件节点配置示例
const conditionNodes = [
  {
    id: 'node_condition',
    name: '条件判断',
    type: 'condition',
    x: 300,
    y: 200,
    properties: {
      conditions: [
        {
          field: 'amount',
          operator: 'lte',
          value: 1000,
          targetNode: 'node_a',
          label: '1000元以下'
        },
        {
          field: 'amount',
          operator: 'gt',
          value: 1000,
          field2: 'amount',
          operator2: 'lte',
          value2: 5000,
          logic: 'and',
          targetNode: 'node_b',
          label: '1000-5000元'
        },
        {
          field: 'amount',
          operator: 'gt',
          value: 5000,
          targetNode: 'node_c',
          label: '5000元以上'
        }
      ]
    }
  }
]

// 多条件组合示例
const complexCondition = {
  id: 'node_complex',
  name: '复杂条件',
  type: 'condition',
  x: 300,
  y: 200,
  properties: {
    conditions: [
      {
        // 部门=销售部 且 金额>10000
        field: 'department',
        operator: 'eq',
        value: 'sales',
        logic: 'and',
        field2: 'amount',
        operator2: 'gt',
        value2: 10000,
        targetNode: 'node_manager',
        label: '销售部大额'
      },
      {
        // 部门=技术部 或 紧急=是
        field: 'department',
        operator: 'eq',
        value: 'tech',
        logic: 'or',
        field2: 'urgency',
        operator2: 'eq',
        value2: true,
        targetNode: 'node_director',
        label: '技术部或紧急'
      },
      {
        // 其他情况
        targetNode: 'node_normal',
        label: '普通流程'
      }
    ]
  }
}
```

### 6. 常用API调用示例

```typescript
// 流程定义管理API

// 获取流程列表
async function getFlowDefinitions() {
  const response = await fetch('/api/workflow/definitions?category=leave&status=published&page=1&size=10')
  const result = await response.json()
  return result.data
}

// 创建新流程
async function createFlowDefinition(definition: Partial<FlowDefinition>) {
  const response = await fetch('/api/workflow/definitions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(definition)
  })
  return await response.json()
}

// 发布流程
async function publishFlowDefinition(definitionId: number) {
  const response = await fetch(`/api/workflow/definitions/${definitionId}/publish`, {
    method: 'POST'
  })
  return await response.json()
}

// 流程实例管理API

// 获取我的待办任务
async function getTodoTasks(params?: { keyword?: string, page?: number, size?: number }) {
  const query = new URLSearchParams(params as any).toString()
  const response = await fetch(`/api/workflow/tasks/todo?${query}`)
  const result = await response.json()
  return result.data
}

// 发起流程
async function startFlowInstance(data: {
  definitionId: number
  title: string
  businessKey: string
  formData: Record<string, any>
}) {
  const response = await fetch('/api/workflow/instances', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await response.json()
}

// 审批任务
async function approveTask(taskId: number, data: {
  action: 'approve' | 'reject'
  comment?: string
  formData?: Record<string, any>
}) {
  const response = await fetch(`/api/workflow/tasks/${taskId}/approve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await response.json()
}

// 转办任务
async function transferTask(taskId: number, data: {
  targetUser: string
  comment?: string
}) {
  const response = await fetch(`/api/workflow/tasks/${taskId}/transfer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await response.json()
}

// 撤回流程
async function withdrawInstance(instanceId: number) {
  const response = await fetch(`/api/workflow/instances/${instanceId}/withdraw`, {
    method: 'POST'
  })
  return await response.json()
}

// 查询流程实例
async function getFlowInstances(params?: {
  status?: string
  initiator?: string
  startDate?: string
  endDate?: string
  page?: number
  size?: number
}) {
  const query = new URLSearchParams(params as any).toString()
  const response = await fetch(`/api/workflow/instances?${query}`)
  const result = await response.json()
  return result.data
}

// 获取流程实例详情
async function getFlowInstanceDetail(instanceId: number) {
  const response = await fetch(`/api/workflow/instances/${instanceId}`)
  const result = await response.json()
  return result.data
}
```

### 7. Vue 组件示例

```vue
<template>
  <div class="flow-instance-form">
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="请假类型" prop="leaveType">
        <el-select v-model="formData.leaveType" placeholder="请选择">
          <el-option
            v-for="item in leaveTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="开始日期" prop="startDate">
        <el-date-picker
          v-model="formData.startDate"
          type="date"
          placeholder="选择开始日期"
        />
      </el-form-item>

      <el-form-item label="结束日期" prop="endDate">
        <el-date-picker
          v-model="formData.endDate"
          type="date"
          placeholder="选择结束日期"
        />
      </el-form-item>

      <el-form-item label="请假原因" prop="reason">
        <el-input
          v-model="formData.reason"
          type="textarea"
          :rows="4"
          placeholder="请输入请假原因"
        />
      </el-form-item>

      <el-form-item label="附件" prop="attachment">
        <el-upload
          :action="uploadUrl"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload"
        >
          <el-button type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit" :loading="submitting">
          提交申请
        </el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const formRef = ref()
const submitting = ref(false)
const uploadUrl = '/api/file/upload'

const leaveTypes = [
  { label: '年假', value: 'annual' },
  { label: '事假', value: 'personal' },
  { label: '病假', value: 'sick' },
  { label: '调休', value: 'compensatory' }
]

const formData = reactive({
  leaveType: '',
  startDate: '',
  endDate: '',
  reason: '',
  attachment: ''
})

const rules = {
  leaveType: [{ required: true, message: '请选择请假类型', trigger: 'change' }],
  startDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
  endDate: [{ required: true, message: '请选择结束日期', trigger: 'change' }],
  reason: [{ required: true, message: '请输入请假原因', trigger: 'blur' }]
}

const handleUploadSuccess = (response: any) => {
  formData.attachment = response.data.fileId
  ElMessage.success('上传成功')
}

const beforeUpload = (file: File) => {
  const isLt10M = file.size / 1024 / 1024 < 10
  if (!isLt10M) {
    ElMessage.error('文件大小不能超过 10MB!')
  }
  return isLt10M
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    submitting.value = true

    const startDate = new Date(formData.startDate)
    const endDate = new Date(formData.endDate)
    const leaveDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    const response = await fetch('/api/workflow/instances', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        definitionId: 1,
        title: '请假申请',
        businessKey: `LEAVE_${Date.now()}`,
        formData: {
          ...formData,
          leaveDays
        }
      })
    })

    const result = await response.json()
    if (result.success) {
      ElMessage.success('申请提交成功')
      handleReset()
    } else {
      ElMessage.error(result.message || '提交失败')
    }
  } catch (error) {
    console.error('提交失败:', error)
  } finally {
    submitting.value = false
  }
}

const handleReset = () => {
  formRef.value.resetFields()
}
</script>
```

## 扩展功能

### 高级功能

- 子流程调用
- 并行网关
- 事件监听
- 表单验证
- 流程监控
- 流程统计
- 流程优化建议

### 集成功能

- 消息通知
- 邮件提醒
- 短信通知
- 微信通知
- 钉钉集成
- 企业微信集成
