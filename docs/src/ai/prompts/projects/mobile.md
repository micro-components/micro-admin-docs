# 移动端开发提示词

移动端开发中常用的提示词模板，涵盖 UniApp、Flutter、响应式适配等场景。

## UniApp 开发

### 页面组件模板

```markdown
创建一个 UniApp 页面：

**页面路径**：&#123;&#123;path}}
**页面名称**：&#123;&#123;name}}
**功能描述**：&#123;&#123;description}}

**技术栈**：UniApp + Vue 3 + TypeScript

**页面结构**：
- 使用 `<template>` 定义页面结构
- 使用 `<script setup lang="ts">` 定义逻辑
- 使用 `<style lang="scss" scoped>` 定义样式

**功能要点**：
&#123;&#123;each features}}
- &#123;&#123;this}}
&#123;&#123;endeach}}

**生命周期**：
- onLoad：页面加载时获取数据
- onShow：页面显示时刷新（如需要）
- onPullDownRefresh：下拉刷新
- onReachBottom：上拉加载更多

**状态管理**：
- 使用 ref/reactive 管理本地状态
- 使用 pinia 管理全局状态（如需要）

**样式要求**：
- 使用 rpx 实现自适应
- 适配多端（微信小程序/H5/App）
- 考虑安全区域（safe-area-inset-*）

请提供完整的页面代码。
```

### 组件封装模板

```markdown
封装一个 UniApp 组件：

**组件名称**：&#123;&#123;componentName}}
**功能描述**：&#123;&#123;description}}
**适用平台**：&#123;&#123;platforms}}（微信小程序/H5/App）

**Props 定义**：
&#123;&#123;each props}}
- &#123;&#123;this.name}}：&#123;&#123;this.type}}
  默认值：&#123;&#123;this.default}}
  说明：&#123;&#123;this.description}}
&#123;&#123;endeach}}

**Events 定义**：
&#123;&#123;each events}}
- &#123;&#123;this.name}}：&#123;&#123;this.description}}
  参数：&#123;&#123;this.payload}}
&#123;&#123;endeach}}

**Slots 定义**：
&#123;&#123;each slots}}
- &#123;&#123;this.name}}：&#123;&#123;this.description}}
&#123;&#123;endeach}}

**技术要求**：
- 支持 props 校验
- 支持 v-model（如适用）
- 考虑可访问性
- 样式隔离

**平台兼容**：
- 条件编译处理平台差异（#ifdef / #ifndef）
- 统一封装，差异内部处理

请提供完整的组件代码。
```

## 响应式适配

### 多端适配模板

```markdown
实现多端适配：

**目标平台**：&#123;&#123;platforms}}
**适配策略**：&#123;&#123;strategy}}

**适配要点**：

1. **布局适配**
   - 使用 flex 弹性布局
   - 使用 rpx 处理尺寸
   - 媒体查询处理 PC 端

2. **交互适配**
   - 移动端：触摸事件、滑动
   - PC 端：鼠标悬停、键盘导航
   - 统一的交互抽象层

3. **样式适配**
   - CSS 变量统一主题
   - 平台特有样式使用条件编译

4. **功能适配**
   - API 能力差异处理
   - 权限申请差异

**代码组织**：
```
src/
├── pages/           # 页面（多端共享）
├── components/      # 组件
│   ├── platform/    # 平台特有实现
│   └── shared/      # 共享组件
├── styles/
│   ├── variables.scss
│   ├── mixins.scss
│   └── responsive.scss
└── utils/
    └── platform.ts  # 平台检测
```

请提供适配方案和关键代码。
```

## 原生能力调用

### 原生 API 封装

```markdown
封装原生 API：

**API 名称**：&#123;&#123;apiName}}
**功能描述**：&#123;&#123;description}}
**适用平台**：&#123;&#123;platforms}}

**API 签名**：
```typescript
interface &#123;&#123;apiName}}Options {
  &#123;&#123;each options}}
  &#123;&#123;this.name}}: &#123;&#123;this.type}};  // &#123;&#123;this.description}}
  &#123;&#123;endeach}}
}

interface &#123;&#123;apiName}}Result {
  &#123;&#123;each results}}
  &#123;&#123;this.name}}: &#123;&#123;this.type}};  // &#123;&#123;this.description}}
  &#123;&#123;endeach}}
}

function &#123;&#123;apiName}}(options: &#123;&#123;apiName}}Options): Promise<&#123;&#123;apiName}}Result>
```

**实现要求**：
- Promise 化封装
- 错误处理
- 类型完整
- 平台差异处理
- TypeScript 类型导出

请提供完整的封装代码和类型定义。
```
