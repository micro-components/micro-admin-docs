# SDD开发

## 概述

SDD（Sketch-Driven Design）设计驱动开发是一种创新的开发理念，通过设计稿直接驱动代码生成，大幅提升开发效率和代码质量。

## 核心理念

- **设计先行**: 以设计稿为起点，确保UI/UX的一致性
- **组件化思维**: 基于微组件库构建，提高代码复用率
- **规范统一**: 统一的设计规范和开发规范，降低维护成本
- **快速迭代**: 缩短从设计到上线的时间周期

## 组件库

MicroAdmin 提供完整的组件库支持：

### 基础组件
- 按钮、输入框、选择器等常用表单组件
- 表格、树形控件、标签页等数据展示组件
- 弹窗、抽屉、消息提示等交互组件

### 业务组件
- 表单生成器
- 搜索组件
- 操作按钮组
- 数据字典选择器

### 布局组件
- 页面容器
- 卡片容器
- 分割面板

## 开发流程

### 1. 设计稿准备

```bash
# 导出设计资源
- 图标资源
- 图片资源
- 配色方案
- 字体规范
```

### 2. 页面搭建

使用 Vue3 + Element-Plus + UnoCSS 快速搭建页面：

```vue
<template>
  <micro-page title="页面标题">
    <micro-card>
      <!-- 页面内容 -->
    </micro-card>
  </micro-page>
</template>

<script setup lang="ts">
// 页面逻辑
</script>
```

### 3. 组件使用

```typescript
import { MicroButton, MicroTable, MicroForm } from '@micro/components'

// 直接使用组件
```

## 代码生成

### 使用代码生成器

1. 配置数据表信息
2. 选择生成模板
3. 一键生成前后端代码

生成内容包括：
- Vue 页面组件
- API 接口
- 类型定义
- 路由配置

## 最佳实践

### 1. 命名规范

```typescript
// 组件命名
PascalCase: UserList.vue

// 文件命名
kebab-case: user-list.ts

// 变量命名
camelCase: userName
```

### 2. 组件封装

```vue
<script setup lang="ts">
// 使用 defineProps 定义接口
interface Props {
  data: User[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})
</script>
```

### 3. 类型安全

```typescript
// 使用 TypeScript 类型定义
interface User {
  id: number
  name: string
  email: string
}

// API 返回类型
type ApiResponse<T> = {
  code: number
  data: T
  message: string
}
```

## 规范文档

详见：
- [代码规范](./use-icons.md)
- [目录结构](./directory-structure.md)
- [权限控制](./permission-control.md)

## 相关链接

- [组件库文档](https://github.com/micro-components/micro-design-admin)
