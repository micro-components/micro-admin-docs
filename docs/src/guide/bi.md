# BI数据可视化

## 概述

BI（Business Intelligence）数据可视化平台提供丰富的数据可视化组件和拖拽式报表设计功能，支持实时数据分析、多维数据展示和交互式数据探索。

## 核心功能

### 数据源管理

- 数据库连接
- API数据源
- Excel数据导入
- 数据预览
- 数据源测试

### 报表设计

- 拖拽式设计
- 丰富的图表组件
- 仪表盘布局
- 响应式设计
- 模板管理

### 数据分析

- 多维分析
- 下钻分析
- 联动分析
- 实时刷新
- 数据筛选

### 数据发布

- 报表发布
- 权限控制
- 嵌入分享
- 导出功能
- 定时刷新

## 功能特性

### 1. 数据源配置

#### 数据库数据源

```typescript
interface DatabaseDataSource {
  id: number
  name: string
  type: 'mysql' | 'postgresql' | 'oracle' | 'sqlserver'
  host: string
  port: number
  database: string
  username: string
  password: string
  ssl: boolean
  connectionTimeout: number
  status: 'connected' | 'disconnected'
  createdAt: Date
}

// 测试连接
POST /api/bi/datasources/:id/test

// 数据预览
POST /api/bi/datasources/:id/preview
Body: {
  sql: string
  limit: number
}
```

#### API数据源

```typescript
interface ApiDataSource {
  id: number
  name: string
  url: string
  method: 'GET' | 'POST'
  headers: Record<string, string>
  body?: Record<string, any>
  auth?: {
    type: 'basic' | 'bearer' | 'api_key'
    username?: string
    password?: string
    token?: string
    apiKey?: string
  }
  refreshInterval?: number  // 刷新间隔（秒）
}

// 数据转换
interface DataTransform {
  type: 'json_path' | 'javascript' | 'regex'
  config: Record<string, any>
}
```

### 2. 图表组件

#### 图表类型

```typescript
type ChartType =
  | 'line'           // 折线图
  | 'bar'            // 柱状图
  | 'pie'            // 饼图
  | 'area'           // 面积图
  | 'scatter'        // 散点图
  | 'gauge'          // 仪表盘
  | 'funnel'         // 漏斗图
  | 'radar'          // 雷达图
  | 'heatmap'        // 热力图
  | 'treemap'        // 矩形树图
  | 'wordcloud'      // 词云图
  | 'sankey'         // 桑基图
  | 'table'          // 表格
  | 'pivot_table'    // 透视表
  | 'map'            // 地图
```

#### 图表配置

```typescript
interface ChartConfig {
  id: string
  type: ChartType
  title: string
  position: {
    x: number
    y: number
    width: number
    height: number
  }
  dataSource: {
    type: 'sql' | 'api'
    config: Record<string, any>
  }
  dimensions: AxisConfig[]   // 维度（X轴）
  measures: AxisConfig[]     // 度量（Y轴）
  options: ChartOptions
}

interface AxisConfig {
  field: string
  label?: string
  aggregation?: 'sum' | 'avg' | 'count' | 'max' | 'min'
  format?: string
}

interface ChartOptions {
  // 通用配置
  legend?: boolean
  grid?: boolean
  tooltip?: boolean
  dataZoom?: boolean

  // 折线图/柱状图
  smooth?: boolean
  stack?: boolean
  areaStyle?: boolean
  barWidth?: number
  lineStyle?: {
    width?: number
    type?: 'solid' | 'dashed' | 'dotted'
  }

  // 饼图
  radius?: string | [string, string]
  roseType?: boolean

  // 仪表盘
  min?: number
  max?: number
  splitNumber?: number

  // 地图
  mapType?: string
  roam?: boolean
}
```

### 3. 仪表盘

```typescript
interface Dashboard {
  id: number
  name: string
  description?: string
  layout: {
    type: 'grid' | 'free'
    rows?: number
    columns?: number
    gap?: number
  }
  components: DashboardComponent[]
  filters: Filter[]
  refreshInterval?: number
  createdAt: Date
  updatedAt: Date
}

interface DashboardComponent {
  id: string
  type: 'chart' | 'text' | 'image' | 'iframe'
  position: {
    x: number
    y: number
    width: number
    height: number
  }
  config: ChartConfig | TextConfig | ImageConfig | IframeConfig
}

interface Filter {
  id: string
  name: string
  type: 'date_range' | 'select' | 'input' | 'checkbox'
  field: string
  defaultValue?: any
  options?: { label: string; value: any }[]
}
```

### 4. 数据透视

```typescript
interface PivotTable {
  id: number
  name: string
  dataSource: string
  rows: string[]      // 行维度
  columns: string[]   // 列维度
  values: PivotValue[]  // 值
  filters?: string[]  // 筛选器
  options: {
    showSubtotals: boolean
    showGrandTotals: boolean
    sort: string
  }
}

interface PivotValue {
  field: string
  aggregation: 'sum' | 'avg' | 'count' | 'max' | 'min'
  format?: string
  name?: string
}
```

## 技术实现

### 可视化库

基于 ECharts 构建：

```typescript
import * as echarts from 'echarts'

// 创建图表
const chart = echarts.init(document.getElementById('chart-container'))

// 配置选项
const option = {
  title: { text: '销售趋势' },
  xAxis: {
    type: 'category',
    data: ['一月', '二月', '三月', '四月', '五月', '六月']
  },
  yAxis: { type: 'value' },
  series: [{
    data: [120, 200, 150, 80, 70, 110],
    type: 'line',
    smooth: true,
    areaStyle: {}
  }]
}

// 设置选项
chart.setOption(option)

// 响应式
window.addEventListener('resize', () => {
  chart.resize()
})
```

### 拖拽式设计器

```vue
<template>
  <div class="report-designer">
    <!-- 组件面板 -->
    <div class="component-panel">
      <div v-for="chart in chartTypes" :key="chart.type"
           class="chart-item"
           draggable="true"
           @dragstart="onDragStart($event, chart)">
        <i :class="chart.icon"></i>
        <span>{{ chart.label }}</span>
      </div>
    </div>

    <!-- 画布区域 -->
    <div class="canvas-area"
         @drop="onDrop"
         @dragover="onDragOver">
      <grid-layout
        :layout="layout"
        :col-num="12"
        :row-height="60"
        :is-draggable="true"
        :is-resizable="true">
        <grid-item v-for="item in layout"
                   :key="item.i"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i">
          <chart-component
            :type="item.type"
            :config="item.config"
            @edit="onEditChart(item)" />
        </grid-item>
      </grid-layout>
    </div>

    <!-- 属性面板 -->
    <div class="property-panel">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="数据源" name="data">
          <el-form :model="chartConfig.dataSource">
            <el-form-item label="数据源类型">
              <el-select v-model="chartConfig.dataSource.type">
                <el-option label="SQL" value="sql" />
                <el-option label="API" value="api" />
              </el-select>
            </el-form-item>
            <el-form-item label="SQL语句">
              <el-input
                v-if="chartConfig.dataSource.type === 'sql'"
                v-model="chartConfig.dataSource.sql"
                type="textarea"
                :rows="6" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="样式" name="style">
          <!-- 样式配置 -->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
```

### 关键接口

```typescript
// 数据源列表
GET /api/bi/datasources
Query: { type, page, size }

// 创建数据源
POST /api/bi/datasources
Body: DatabaseDataSource | ApiDataSource

// 仪表盘列表
GET /api/bi/dashboards
Query: { keyword, page, size }

// 创建仪表盘
POST /api/bi/dashboards
Body: Dashboard

// 查询图表数据
POST /api/bi/charts/:id/data
Body: {
  filters?: Record<string, any>
  startTime?: string
  endTime?: string
}

// 导出报表
GET /api/bi/dashboards/:id/export
Query: { format: 'pdf' | 'excel' | 'image' }
```

## 图表示例

### 折线图

```yaml
chart:
  type: line
  title: 销售趋势
  x_axis:
    field: order_date
    label: 日期
  y_axis:
    - field: amount
      label: 销售额
      aggregation: sum
      format: ¥,0.00
  options:
    smooth: true
    area_style: true
```

### 柱状图

```yaml
chart:
  type: bar
  title: 产品销量排行
  x_axis:
    field: product_name
    label: 产品名称
  y_axis:
    - field: quantity
      label: 销量
      aggregation: sum
  options:
    bar_width: 40
```

### 饼图

```yaml
chart:
  type: pie
  title: 销售额占比
  measures:
    - field: amount
      label: 销售额
      aggregation: sum
  dimensions:
    - field: category
      label: 分类
  options:
    radius: ['40%', '70%']
```

### 仪表盘

```yaml
chart:
  type: gauge
  title: 销售目标完成率
  value: 75
  options:
    min: 0
    max: 100
    split_number: 10
```

## 报表模板

### 销售分析看板

```yaml
dashboard:
  name: 销售分析看板
  layout:
    type: grid
    columns: 4
  components:
    - type: chart
      chart:
        type: text
        position: { x: 0, y: 0, w: 1, h: 1 }
      content:
        title: 今日销售额
        value: 125,680
        trend: +12.5%

    - type: chart
      chart:
        type: line
        position: { x: 0, y: 1, w: 2, h: 2 }
      title: 销售趋势
      data_source: daily_sales

    - type: chart
      chart:
        type: pie
        position: { x: 2, y: 1, w: 2, h: 2 }
      title: 产品占比

    - type: chart
      chart:
        type: bar
        position: { x: 0, y: 3, w: 4, h: 2 }
      title: 地区销售排行
  filters:
    - type: date_range
      name: 日期范围
      field: order_date
      default_value: [today-30d, today]
```

## 快速开始

### 1. 创建数据源

```bash
# 进入数据源管理
BI > 数据源管理 > 新建数据源

# 选择数据源类型
- 数据库连接
- API接口

# 配置连接信息
- 数据库：主机、端口、数据库名、用户名、密码
- API：URL、请求方式、参数配置

# 测试连接
点击"测试连接"按钮验证配置
```

### 2. 创建图表

```bash
# 进入报表设计
BI > 报表设计 > 新建报表

# 选择图表类型
从左侧组件面板拖拽图表到画布

# 配置数据源
选择数据源，编写SQL或配置API

# 配置维度和度量
设置X轴维度和Y轴度量

# 配置样式
调整图表标题、颜色、图例等样式
```

### 3. 创建仪表盘

```bash
# 新建仪表盘
BI > 仪表盘管理 > 新建仪表盘

# 添加组件
拖拽多个图表到仪表盘

# 调整布局
拖拽调整组件位置和大小

# 设置筛选器
添加时间范围、下拉选择等筛选器

# 保存发布
点击保存，发布仪表盘
```

## 最佳实践

1. **数据准备**: 确保数据质量和数据结构的合理性
2. **图表选择**: 根据数据特点选择合适的图表类型
3. **布局设计**: 合理布局，突出关键指标
4. **颜色使用**: 使用专业的配色方案，提高可读性
5. **交互设计**: 添加联动、筛选等交互功能，增强体验

## 扩展功能

### 高级功能

- 数据建模
- 联动分析
- 下钻分析
- 实时刷新
- 告警提示
- 数据权限
- 多租户支持

### 导出功能

- PDF导出
- Excel导出
- 图片导出
- 邮件订阅
- 定时报送

### 移动端适配

- 响应式布局
- 触摸交互
- 离线查看
- 推送通知
