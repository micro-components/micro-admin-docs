# Spec: [组件名称] 组件规格

## 元信息

- **Spec ID**: COMP-[编号]
- **创建日期**: YYYY-MM-DD
- **负责人**: @username
- **优先级**: P1 (P0/P1/P2/P3)
- **状态**: Draft (Draft/Review/Approved/InProgress/Testing/Done)
- **组件类型**: 基础组件 / 业务组件 / 布局组件
- **预估工时**: X 人天
- **关联 Feature**: FEAT-[编号]

---

## 背景与目标

### 业务背景

描述组件的业务背景和使用场景。

**示例**:
当前系统中缺少一个通用的表格组件，各个业务模块都需要重复开发表格功能。为了提高开发效率和代码复用性，需要开发一个通用的表格组件。

### 技术目标

- [ ] 提供通用的表格展示功能
- [ ] 支持分页、排序、筛选
- [ ] 支持自定义列配置
- [ ] 支持自定义操作列
- [ ] 提供良好的类型提示

### 成功指标

| 指标 | 目标值 | 测量方式 |
|------|--------|----------|
| 复用性 | ≥ 3 个业务模块使用 | 代码审查 |
| 性能 | 渲染 1000 条数据 < 500ms | 性能测试 |
| 文档 | 覆盖率 100% | 文档检查 |

---

## 组件设计

### 2.1 组件概述

描述组件的基本功能和特点。

### 2.2 功能清单

| 功能 ID | 功能名称 | 优先级 | 状态 |
|---------|----------|--------|------|
| F-001 | 数据展示 | P0 | Todo |
| F-002 | 分页功能 | P0 | Todo |
| F-003 | 排序功能 | P1 | Todo |
| F-004 | 筛选功能 | P1 | Todo |
| F-005 | 选择功能 | P1 | Todo |
| F-006 | 自定义列 | P2 | Todo |

### 2.3 用户故事

#### 用户故事 1

```
作为 开发人员
我想要 使用通用表格组件展示数据
以便于 快速开发数据展示页面
```

**验收标准**:

- [ ] 支持传入表格数据
- [ ] 支持配置列定义
- [ ] 数据正确展示
- [ ] 样式符合设计规范

#### 用户故事 2

```
作为 开发人员
我想要 配置表格的操作列
以便于 自定义表格的操作按钮
```

**验收标准**:

- [ ] 支持配置操作列
- [ ] 支持多个操作按钮
- [ ] 操作按钮支持权限控制
- [ ] 操作按钮支持自定义样式

---

## 技术方案

### 3.1 技术选型

| 技术点 | 选型 | 原因 |
|--------|------|------|
| 框架 | Vue 3 + TypeScript | 项目技术栈一致 |
| 组件库 | Element Plus | 项目统一使用 |
| 虚拟滚动 | @tanstack/vue-table | 性能优秀 |

### 3.2 组件架构

```
BaseTable
├── BaseTableHeader      # 表头组件
├── BaseTableBody        # 表体组件
│   ├── TableRow         # 行组件
│   └── TableCell        # 单元格组件
├── BaseTablePagination  # 分页组件
└── BaseTableFilter      # 筛选组件
```

### 3.3 Props 定义

```typescript
interface BaseTableProps<T = any> {
  // 基础配置
  data: T[]                      // 表格数据
  columns: ColumnConfig[]        // 列配置
  loading?: boolean              // 加载状态

  // 分页配置
  pagination?: PaginationConfig   // 分页配置
  onPageChange?: (page: number, pageSize: number) => void

  // 排序配置
  sortable?: boolean              // 是否可排序
  defaultSort?: SortConfig        // 默认排序
  onSortChange?: (sort: SortConfig) => void

  // 筛选配置
  filterable?: boolean           // 是否可筛选
  onFilterChange?: (filters: FilterConfig) => void

  // 选择配置
  selectable?: boolean           // 是否可选择
  rowKey?: string                // 行唯一标识
  selectedKeys?: any[]            // 选中的行
  onSelectionChange?: (selectedKeys: any[], selectedRows: T[]) => void

  // 其他配置
  border?: boolean               // 是否显示边框
  stripe?: boolean               // 是否斑马纹
  size?: 'large' | 'default' | 'small'  // 表格尺寸
}
```

### 3.4 Events 定义

```typescript
interface BaseTableEmits {
  (e: 'row-click', row: any, index: number): void        // 行点击
  (e: 'row-dblclick', row: any, index: number): void     // 行双击
  (e: 'selection-change', selectedKeys: any[], rows: any[]): void  // 选择变化
  (e: 'page-change', page: number, pageSize: number): void        // 分页变化
  (e: 'sort-change', prop: string, order: string): void           // 排序变化
}
```

### 3.5 Slots 定义

```typescript
interface BaseTableSlots {
  // 表头插槽
  header?: (props: { column: ColumnConfig, index: number }) => VNode

  // 单元格插槽
  cell?: (props: { column: ColumnConfig, row: any, index: number }) => VNode

  // 操作列插槽
  action?: (props: { row: any, index: number }) => VNode

  // 空状态插槽
  empty?: () => VNode

  // 加载状态插槽
  loading?: () => VNode
}
```

### 3.6 列配置类型

```typescript
interface ColumnConfig {
  // 基础配置
  prop: string                  # 字段名
  label: string                 # 列标题
  width?: number | string       # 列宽度
  minWidth?: number             # 最小宽度
  fixed?: 'left' | 'right'      # 固定列

  # 功能配置
  sortable?: boolean            # 是否可排序
  filterable?: boolean          # 是否可筛选
  selectable?: boolean          # 是否可选择

  # 显示配置
  align?: 'left' | 'center' | 'right'  # 对齐方式
  showOverflowTooltip?: boolean        # 是否显示提示

  # 自定义渲染
  formatter?: (row: any, column: ColumnConfig, cellValue: any) => string | VNode

  # 嵌套列
  children?: ColumnConfig[]

  # 自定义类名
  className?: string | ((params: any) => string)
}
```

### 3.7 使用示例

#### 基础用法

```vue
<template>
  <base-table
    :data="tableData"
    :columns="columns"
    :loading="loading"
    :pagination="pagination"
    @page-change="handlePageChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface User {
  id: number
  name: string
  email: string
  status: number
}

const tableData = ref<User[]>([])
const loading = ref(false)
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0
})

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'email', label: '邮箱' },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    formatter: (row) => row.status === 1 ? '启用' : '禁用'
  },
  {
    prop: 'action',
    label: '操作',
    width: 200,
    fixed: 'right'
  }
]

const handlePageChange = (page: number, pageSize: number) => {
  pagination.value.current = page
  pagination.value.pageSize = pageSize
  fetchData()
}

const fetchData = async () => {
  loading.value = true
  try {
    // 调用 API 获取数据
  } finally {
    loading.value = false
  }
}
</script>
```

#### 自定义单元格

```vue
<template>
  <base-table :data="tableData" :columns="columns">
    <template #cell="{ row, column }">
      <template v-if="column.prop === 'status'">
        <el-tag :type="row.status === 1 ? 'success' : 'danger'">
          {{ row.status === 1 ? '启用' : '禁用' }}
        </el-tag>
      </template>
    </template>

    <template #action="{ row }">
      <el-button size="small" @click="handleEdit(row)">编辑</el-button>
      <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
    </template>
  </base-table>
</template>
```

---

## 实施计划

### 4.1 任务分解

| 任务 ID | 任务名称 | 负责人 | 预估工时 | 状态 |
|---------|----------|--------|----------|------|
| T-001 | 组件架构设计 | @user1 | 0.5 天 | Todo |
| T-002 | 基础功能开发 | @user1 | 2 天 | Todo |
| T-003 | 分页功能开发 | @user1 | 1 天 | Todo |
| T-004 | 排序功能开发 | @user2 | 1 天 | Todo |
| T-005 | 筛选功能开发 | @user2 | 1 天 | Todo |
| T-006 | 选择功能开发 | @user3 | 1 天 | Todo |
| T-007 | 单元测试编写 | @user1 | 1 天 | Todo |
| T-008 | 文档编写 | @user3 | 0.5 天 | Todo |

### 4.2 里程碑

| 里程碑 | 目标 | 完成日期 |
|--------|------|----------|
| M1 | 组件架构设计完成 | YYYY-MM-DD |
| M2 | 基础功能开发完成 | YYYY-MM-DD |
| M3 | 高级功能开发完成 | YYYY-MM-DD |
| M4 | 测试通过 | YYYY-MM-DD |
| M5 | 文档编写完成 | YYYY-MM-DD |

---

## 测试计划

### 5.1 单元测试

```typescript
describe('BaseTable', () => {
  it('should render table data correctly', () => {
    const data = [{ id: 1, name: 'Test' }]
    const wrapper = mount(BaseTable, {
      props: { data, columns: [{ prop: 'id', label: 'ID' }] }
    })
    expect(wrapper.find('.table-row').exists()).toBe(true)
  })

  it('should handle pagination', async () => {
    const wrapper = mount(BaseTable, {
      props: {
        data: [],
        columns: [],
        pagination: { current: 1, pageSize: 10, total: 100 }
      }
    })
    await wrapper.find('.next-page').trigger('click')
    expect(wrapper.emitted('page-change')).toBeTruthy()
  })
})
```

### 5.2 测试用例

| 用例 ID | 测试场景 | 预期结果 |
|---------|----------|----------|
| TC-001 | 正常数据展示 | 数据正确渲染 |
| TC-002 | 空数据展示 | 显示空状态 |
| TC-003 | 加载状态 | 显示加载动画 |
| TC-004 | 分页切换 | 触发 page-change 事件 |
| TC-005 | 排序功能 | 数据按指定列排序 |
| TC-006 | 筛选功能 | 数据按条件筛选 |
| TC-007 | 多选功能 | 正确选中和取消选中 |
| TC-008 | 自定义单元格 | 自定义内容正确渲染 |

---

## 参考资料

### 相关文档

- [Element Plus Table 文档](https://element-plus.org/zh-CN/component/table.html)
- [Vue 3 组件开发指南](https://cn.vuejs.org/guide/components/registration.html)
- [TypeScript 类型定义](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)

### 设计稿

- [表格组件设计稿](./)
- [交互原型](./)

### 类似组件参考

- [Ant Design Table](https://ant.design/components/table-cn)
- [DevExtreme DataGrid](https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/Overview/Vue/)

---

## 变更记录

| 版本 | 日期 | 变更人 | 变更内容 |
|------|------|--------|----------|
| v1.0 | 2024-01-01 | @user1 | 初始版本 |

---

## 评审记录

### 评审 1

| 项目 | 内容 |
|------|------|
| 评审时间 | YYYY-MM-DD |
| 评审人员 | @user1, @user2 |
| 评审意见 | [意见内容] |
| 评审结果 | 通过 / 不通过 |

---

**文档创建**: YYYY-MM-DD
**文档状态**: Draft
**预计完成**: YYYY-MM-DD
