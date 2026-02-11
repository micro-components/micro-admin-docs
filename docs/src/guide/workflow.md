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
