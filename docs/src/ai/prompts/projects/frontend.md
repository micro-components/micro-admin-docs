# 前端开发提示词

前端开发中常用的提示词模板，涵盖 React、Vue、组件设计、样式处理等场景。

## React 组件开发

### 基础组件模板

```markdown
创建一个 React 函数组件，实现以下功能：

**组件名称**：&#123;&#123;componentName}}
**功能描述**：&#123;&#123;description}}

**技术栈要求**：
- React 18 + TypeScript
- 使用 Hooks（useState、useEffect 等）
- Props 使用 interface 定义

**功能要点**：
&#123;&#123;each features}}
- &#123;&#123;this}}
&#123;&#123;endeach}}

**状态管理**：
- 使用 useState 管理本地状态
- 如需全局状态，说明需要的 Context 或状态库

**样式要求**：
- 使用 Tailwind CSS 类名
- 响应式设计，适配 PC/移动端
- 考虑可访问性（ARIA 属性）

**代码规范**：
- 组件文件使用 PascalCase（如 UserCard.tsx）
- 导出方式：named export + default export
- 添加 JSDoc 注释

请提供：
1. 完整的 TypeScript 类型定义
2. 组件完整实现代码
3. 组件使用示例
```

### 表单组件模板

```markdown
创建一个表单组件，用于：&#123;&#123;purpose}}

**表单字段**：
&#123;&#123;each fields}}
- &#123;&#123;this.name}}（&#123;&#123;this.type}}）：&#123;&#123;this.description}}
  &#123;&#123;if this.validation}}
  验证规则：&#123;&#123;this.validation}}
  &#123;&#123;endif}}
&#123;&#123;endeach}}

**技术栈**：React 18 + TypeScript + Tailwind CSS

**功能要求**：
- 必填字段验证
- 实时输入验证
- 提交前完整校验
- 错误提示友好（显示字段名 + 具体错误）
- 支持重置表单

**状态管理**：
- 使用 useState 管理表单值
- 使用 useState 管理校验错误
- 使用 useState 管理提交状态（idle/loading/success/error）

**交互要求**：
- 输入获得焦点时显示边框高亮
- 错误状态显示红色边框和错误信息
- 提交按钮在 loading 时禁用
- 提交成功后显示成功提示

请提供完整的表单组件代码，包括类型定义和样式。
```

## Vue 组件开发

### 组合式 API 组件

```markdown
使用 Vue 3 Composition API 创建一个组件：

**组件名称**：&#123;&#123;componentName}}
**功能描述**：&#123;&#123;description}}

**技术栈**：Vue 3 + TypeScript + `<script setup>`

**功能要点**：
&#123;&#123;each features}}
- &#123;&#123;this}}
&#123;&#123;endeach}}

**响应式设计**：
- 使用 ref() 管理基本类型
- 使用 reactive() 管理对象类型
- 使用 computed() 处理派生状态

**样式要求**：
- 使用 scoped 样式
- 优先使用 CSS 变量
- 响应式布局

请提供：
1. 完整的 TypeScript 类型定义
2. 使用 `<script setup>` 的组件代码
3. 组件使用示例
```

## 状态管理

### Redux/Zustand Store

```markdown
创建一个状态管理 Store：

**Store 名称**：&#123;&#123;storeName}}
**功能描述**：&#123;&#123;description}}

**状态结构**：
```typescript
interface &#123;&#123;storeName}}State {
  // 状态字段
}
```

**Actions 要求**：
&#123;&#123;each actions}}
- &#123;&#123;this.name}}：&#123;&#123;this.description}}
&#123;&#123;endeach}}

**技术栈**：&#123;&#123;tool}}（Zustand/Redux Toolkit）

**规范要求**：
- 使用 TypeScript 泛型定义 State 和 Actions
- Actions 必须是纯函数
- 添加适当的 JSDoc 注释
- 导出类型化的 hook（如 use&#123;&#123;storeName}}Store）

请提供完整的 Store 代码。
```

## 样式处理

### CSS Modules 组件

```markdown
创建一个使用 CSS Modules 的组件：

**组件名称**：&#123;&#123;componentName}}
**功能描述**：&#123;&#123;description}}

**样式要求**：
- 使用 CSS Modules（`.module.css`）
- 遵循 BEM 命名规范（block__element--modifier）
- 主题变量使用 CSS 变量
- 响应式断点：768px（平板）、1024px（桌面）

**CSS 类结构**：
```css
.&#123;&#123;componentName}} { /* 主容器 */ }
.&#123;&#123;componentName}}__header { /* 头部 */ }
.&#123;&#123;componentName}}__content { /* 内容区 */ }
.&#123;&#123;componentName}}__footer { /* 底部 */ }
.&#123;&#123;componentName}}--active { /* 激活状态 */ }
```

请提供组件 JSX 代码和对应的 CSS Module 文件。
```

## 工具函数

### 工具函数模板

```markdown
创建一个工具函数：

**函数名称**：&#123;&#123;functionName}}
**功能描述**：&#123;&#123;description}}
**输入参数**：
&#123;&#123;each params}}
- &#123;&#123;this.name}}（&#123;&#123;this.type}}）：&#123;&#123;this.description}}
&#123;&#123;endeach}}
**返回值**：&#123;&#123;returnType}}

**实现要求**：
- 纯函数，无副作用
- 参数校验，非法参数抛出有意义的错误
- 完整的 TypeScript 类型定义
- 添加 JSDoc 注释（包含 @param、@returns、@throws）

**示例**：
```typescript
// 输入示例
&#123;&#123;example}}

// 期望输出
&#123;&#123;expected}}
```

请提供完整的 TypeScript 实现。
```
