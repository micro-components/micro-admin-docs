## 快速入门
Next.js应用可以部署到多种平台，包括Vercel（Next.js的创建者维护的平台）、Netlify、AWS、Google Cloud等，也可以部署到自己的服务器。
- 欢迎阅读 Next.js 文档！

- 如果你是初学 Next.js，我们建议你从 互动课程 开始。

- 通过这些带小测验的互动课程你将学到使用 Next.js 所需的全部知识。

- 如果你有任何与 Next.js 相关的问题，欢迎随时在 [GitHub Discussions](https://github.com/vercel/next.js/discussions) 上向我们的社区寻求帮助。
### 系统环境需求
- Node.js 12.22.0 或更高版本
- MacOS、Windows (包括 WSL) 和 Linux 都被支持
## 安装设置
```sh
npx create-next-app@latest
```
> 安装时，您将看到以下提示：
```sh
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to use Turbopack? (recommended) No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```
这个 `package.json` 显示了一个名为 `micro-design-nextjs` 的 Next.js 项目，集成了丰富的依赖项，涵盖了前端开发、UI 组件、数据处理、数据库交互、测试工具等多个方面。以下是对主要依赖的分类解析：

### 核心框架与基础库
- **Next.js 生态**：`next` (15.5.4) 作为核心框架，配合 `react` 和 `react-dom` (v19) 构建用户界面
- **TypeScript**：提供类型安全支持，是项目的主要开发语言
- **样式解决方案**：`tailwindcss` (v4) 作为主要样式框架，配合 `tailwind-merge`、`clsx` 处理类名，`class-variance-authority` 管理组件变体

### UI 组件与交互
- **Radix UI 组件**：引入了几乎全套的 `@radix-ui` 无样式组件（如 `@radix-ui/react-accordion`、`@radix-ui/react-dialog` 等），提供可访问性良好的基础组件
- **图标与视觉元素**：`lucide-react` 提供图标支持
- **动画与交互**：`framer-motion` 和 `motion` 处理动画效果，`embla-carousel-react` 提供轮播功能
- **表单与输入**：`react-hook-form` 处理表单逻辑，`input-otp` 提供验证码输入组件
- **其他UI工具**：`react-day-picker`（日期选择）、`react-resizable-panels`（可调整面板）、`vaul`（抽屉组件）等

### 数据处理与状态管理
- **数据验证**：`zod` 和 `arktype` 用于类型验证
- **数据获取**：`swr` 用于数据获取和缓存
- **日期处理**：`date-fns` (v4) 提供日期工具函数
- **图表与可视化**：`recharts` 用于数据可视化
- **文本处理**：`marked` 和 `react-markdown` 处理Markdown内容

### 数据库与存储解决方案
- 支持多种数据库：
  - PostgreSQL 相关：`pg`、`postgres`、`@neondatabase/serverless`
  - MySQL/PlanetScale：`@planetscale/database`
  - MongoDB：`mongoose`
  - SQLite 相关：`@libsql/client`、`@op-engineering/op-sqlite`
  - 其他：`@tidbcloud/serverless`、`@xata.io/client`、`@aws-sdk/client-rds-data`
- ORM 与查询构建器：`drizzle-orm` + `drizzle-kit`、`@prisma/client`、`knex`、`kysely`
- 缓存：`@upstash/redis` 提供Redis支持

### 开发工具与测试
- **组件文档**：`storybook` 及其相关插件，用于组件开发和文档生成
- **测试工具**：
  - 单元测试：`vitest` 及其相关插件
  - E2E测试：`@playwright/test`
- **代码质量**：`eslint` 及其插件、`prettier` 用于代码格式化
- **性能与分析**：`@next/bundle-analyzer`、`codehawk-cli`、`knip`（检测未使用代码）

### 国际化与主题
- `next-intl` 提供国际化支持
- `next-themes` 处理主题切换（明暗模式等）

### 其他功能
- **认证与安全**：`bcryptjs`（密码哈希）、`jose`（JWT处理）
- **API开发**：`hono` 用于构建API
- **邮件处理**：`@react-email/components` 用于构建邮件模板
- **富文本编辑**：`@tinymce/tinymce-react` 提供富文本编辑器
- **边缘计算**：`@edge-runtime/vm`、`@cloudflare/workers-types` 支持边缘环境

这个项目看起来是一个功能全面的企业级Next.js模板，支持多种数据库、完整的测试体系、组件文档和现代化UI开发，适合作为大型应用的基础架构。
Next.js 本身是基于 React 的框架，并不自带官方组件库，但生态中有大量与 Next.js 兼容的 React 组件库（支持 SSR/SSG 等 Next.js 特性）。以下是常用的组件库分类及推荐：


### **一、综合 UI 组件库（完整设计系统）**
这类库提供开箱即用的完整组件集，包含样式、交互和可访问性支持，适合快速开发。

1. **MUI (Material-UI)**  
   - 基于 Material Design 设计规范，组件丰富（按钮、卡片、表单、导航等）。  
   - 支持 TypeScript，可自定义主题，与 Next.js 兼容（需注意 SSR 配置）。  
   - 地址：https://mui.com/

2. **Chakra UI**  
   - 以简洁、可访问性为核心，组件轻量且易于定制。  
   - 内置响应式设计、主题切换（明暗模式），对 Next.js 友好。  
   - 地址：https://chakra-ui.com/

3. **Tailwind UI + Headless UI**  
   - Tailwind UI 提供基于 Tailwind CSS 的预制组件（需付费），搭配 Headless UI（无样式组件）使用。  
   - 高度可定制，适合需要自定义设计系统的项目，与 Next.js 无缝兼容。  
   - 地址：https://tailwindui.com/ + https://headlessui.com/

4. **Ant Design**  
   - 企业级 UI 设计语言，组件覆盖全面（表格、表单、弹窗等），适合中后台系统。  
   - 支持 Next.js，但需注意 SSR 场景下的样式加载问题（可通过 `next-transpile-modules` 解决）。  
   - 地址：https://ant.design/

5. **Shadcn UI**  
   - 基于 Radix UI 和 Tailwind CSS 的组件集合，强调“按需引入”和可定制性。  
   - 无依赖捆绑，组件代码可直接复制到项目中修改，非常适合 Next.js 项目（官方示例基于 Next.js）。  
   - 地址：https://ui.shadcn.com/


### **二、Headless 组件库（无样式，专注逻辑）**
这类库只提供组件逻辑和交互，不包含样式，适合需要完全自定义 UI 的场景，与任何样式方案（Tailwind、CSS Modules 等）兼容。

1. **Radix UI**  
   - 注重可访问性（ARIA 合规）和交互细节（如弹窗、下拉菜单的焦点管理）。  
   - 组件包括对话框、折叠面板、标签页等，被广泛用于 Next.js 生态（如 Shadcn UI 基于此封装）。  
   - 地址：https://radix-ui.com/

2. **Headless UI**  
   - 由 Tailwind CSS 团队开发，轻量且无依赖，专注于常见交互组件（如菜单、模态框、切换器）。  
   - 自动处理 SSR 场景下的状态同步，对 Next.js 友好。  
   - 地址：https://headlessui.com/

3. **React Aria (Adobe)**  
   - 提供底层可访问性逻辑，支持复杂组件（如日历、数据表格）的交互实现。  
   - 灵活性极高，适合构建自定义设计系统，与 Next.js 兼容。  
   - 地址：https://react-spectrum.adobe.com/react-aria/


### **三、表单组件库**
专注于表单处理（验证、状态管理、UI 组件）。

1. **React Hook Form**  
   - 高性能表单库，基于 React Hooks，支持表单验证（可配合 Zod/Yup）。  
   - 与 Next.js 完全兼容，常与 UI 组件库（如 MUI、Shadcn UI）结合使用。  
   - 地址：https://react-hook-form.com/

2. **Formik**  
   - 老牌表单库，提供完整的表单状态管理和验证能力，学习成本低。  
   - 支持 Next.js SSR 场景，可搭配任何 UI 组件。  
   - 地址：https://formik.org/

3. **React Final Form**  
   - 轻量且灵活的表单库，基于 Final Form 核心，适合复杂表单场景。  
   - 支持 SSR，与 Next.js 兼容。  
   - 地址：https://final-form.org/react


### **四、数据展示与可视化**
1. **Recharts**  
   - 基于 React 的图表库，支持折线图、柱状图、饼图等，API 简洁。  
   - 适合数据可视化场景，与 Next.js 兼容（注意 SSR 时的客户端渲染处理）。  
   - 地址：https://recharts.org/

2. **TanStack Table**  
   - 高性能数据表格库，支持排序、筛选、分页等功能，无 UI 依赖。  
   - 适合构建复杂表格，与 Next.js 及任何样式方案兼容。  
   - 地址：https://tanstack.com/table/latest

3. **React Table**  
   - 灵活的表格组件库，支持自定义渲染和复杂交互，适合中后台系统。  
   - 兼容 Next.js SSR。  
   - 地址：https://react-table.tanstack.com/


### **五、动画与交互组件**
1. **Framer Motion**  
   - 强大的动画库，支持组件过渡、手势交互、滚动动画等。  
   - 与 Next.js 兼容，常用于实现页面切换、元素动效。  
   - 地址：https://www.framer.com/motion/

2. **React Spring**  
   - 基于物理动画的库，适合实现自然流畅的过渡效果（如悬浮、拖拽）。  
   - 支持 Next.js SSR。  
   - 地址：https://react-spring.dev/

3. **Embla Carousel**  
   - 轻量的轮播组件库，支持触摸滑动、自定义导航，无依赖。  
   - 适合实现图片轮播、内容滑块，与 Next.js 兼容。  
   - 地址：https://www.embla-carousel.com/


### **六、图标与基础元素**
1. **Lucide React**  
   - 开源图标库，包含 2000+ 简洁图标，支持自定义尺寸、颜色。  
   - 完全兼容 Next.js，被广泛用于 Shadcn UI 等组件库。  
   - 地址：https://lucide.dev/

2. **React Icons**  
   - 聚合了 Font Awesome、Material Icons 等多个图标库，按需引入。  
   - 适合需要多样化图标场景，与 Next.js 兼容。  
   - 地址：https://react-icons.github.io/react-icons/


### **选择建议**
- 快速开发、需完整设计系统：优先 MUI、Chakra UI。  
- 高度自定义、注重性能：选择 Shadcn UI（基于 Radix UI）+ Tailwind CSS。  
- 企业级中后台：Ant Design 或 MUI。  
- 复杂表单：React Hook Form + Zod（验证）。  
- 动画交互：Framer Motion（通用）或 React Spring（物理动效）。

这些库均经过社区验证，与 Next.js 的 SSR/SSG 特性兼容，可根据项目需求灵活选择。