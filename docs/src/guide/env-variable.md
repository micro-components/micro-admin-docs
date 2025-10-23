# 环境变量
在 Vite + TypeScript 项目中，`vite-env.d.ts`（有时也叫做 `env.d.ts` 或 `vite-client.d.ts`）是一个**类型声明文件**，它就像是 Vite 和 TypeScript 之间的一个翻译官，确保 TypeScript 能正确理解 Vite 提供的特殊功能和变量。

下面这个表格概括了它的核心职责：

| 核心作用 | 说明 |
| :--- | :--- |
| **提供 Vite 客户端类型** | 通过 `/// <reference types="vite/client" />` 指令，让 TypeScript 识别 Vite 注入到客户端（浏览器环境）的全局类型，例如 `import.meta.env` 。 |
| **定义环境变量类型** | 通过扩展 `ImportMetaEnv` 接口，为你自定义的以 `VITE_` 为前缀的环境变量提供 TypeScript **类型提示**和**类型检查** 。 |
| **声明模块类型** | 为特定类型的文件（如 `.vue` 组件）提供 TypeScript 模块声明，使其在 `import` 时能被正确识别 。 |

### 🔍 详解文件内容与配置

通常，这个文件会位于项目的 `src` 目录下。

1.  **引用 Vite 客户端类型**
    文件开头通常是这行指令，它告诉 TypeScript 编译器去包含 Vite 客户端环境（如 `import.meta`）的类型定义 。这是后续所有类型扩展的基础。
    ```typescript
    /// <reference types="vite/client" />
    ```

2.  **扩展环境变量类型（`ImportMetaEnv`）**
    这是该文件最常用和重要的功能之一。Vite 规定，只有以 `VITE_` 为前缀的环境变量才会暴露给客户端 。你可以在 `.env` 文件中定义这样的变量：
    ```bash
    # .env.development
    VITE_APP_TITLE='我的开发应用'
    VITE_API_BASE_URL='https://api.dev.example.com'
    ```
    为了让 TypeScript 知道这些变量的存在和类型，你需要在 `vite-env.d.ts` 中扩展 `ImportMetaEnv` 接口：
    ```typescript
    interface ImportMetaEnv {
      readonly VITE_APP_TITLE: string
      readonly VITE_API_BASE_URL: string
      // 你可以继续添加其他环境变量...
    }
    ```
    这样做之后，当你在代码中使用 `import.meta.env.VITE_APP_TITLE` 时，TypeScript 不仅能提供智能提示，还能进行类型检查。如果拼写错误，比如写成了 `import.meta.env.VITE_APP_TITLe`，TypeScript 会提示错误 。

3.  **声明 Vue 组件等模块类型**
    如果你在项目中使用 Vue 单文件组件，需要让 TypeScript 知道如何理解 `*.vue` 文件。这通过 `declare module` 实现 ：
    ```typescript
    declare module '*.vue' {
      import type { DefineComponent } from 'vue'
      const component: DefineComponent<{}, {}, any>
      export default component
    }
    ```
    这样，你就可以在 `.ts` 或 `.vue` 文件中使用 `import MyComponent from './MyComponent.vue'` 而不会出现类型错误。

### 💡 使用技巧与注意事项

*   **类型安全的保障**：务必确保在 `vite-env.d.ts` 中声明的环境变量与你在 `.env` 文件中的实际变量保持一致。这能有效避免因拼写错误或类型不匹配导致的运行时问题 。
*   **处理不同类型的值**：环境变量在 `import.meta.env` 上通常都是字符串类型 。如果你需要布尔值（如 `VITE_AUTO_OPEN='true'`）或数字，需要在代码中手动转换，或者使用一些构建工具方法进行转换 。
*   **确保 TypeScript 识别声明文件**：通常，TypeScript 会自动识别项目中的 `.d.ts` 文件。如果遇到类型提示不生效的情况，可以检查 `tsconfig.json` 中的 `include` 数组是否包含了该声明文件所在的目录。另外，确保 `tsconfig.json` 中的 `compilerOptions.types` 包含了 `"vite/client"`，这有助于 TypeScript 获取 Vite 的类型定义 。

### 🛠 关于环境变量处理的进阶用法

虽然在 `vite-env.d.ts` 中主要为环境变量提供类型，但有时你可能需要在 Vite 配置文件中（`vite.config.ts`）使用这些变量。注意，在 `vite.config.ts` 中你不能直接使用 `import.meta.env`，因为它是一个 Node.js 环境。

正确的做法是使用 Vite 提供的 `loadEnv` 函数来手动加载环境变量 ：

```typescript
// vite.config.ts
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // loadEnv 会从 .env 文件加载变量，并合并 process.env
  // 参数：当前模式，当前工作目录，环境变量前缀
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  // 现在你可以通过 env 对象访问环境变量
  console.log(env.VITE_APP_TITLE)

  return {
    // 你的 Vite 配置...
    define: {
      // 如果需要，你也可以将处理后的环境变量定义为全局常量
      __APP_ENV__: JSON.stringify(env.VITE_APP_TITLE)
    }
  }
})
```

总而言之，`vite-env.d.ts` 是你 Vite + TypeScript 项目中一个看似小巧但至关重要的文件。它通过提供精确的类型定义，极大地提升了代码的智能提示、类型安全性和开发体验。

希望这些解释能帮助你更好地理解和使用这个文件。如果你在配置过程中遇到其他具体问题，比如需要为更复杂的环境变量定义类型，我很乐意继续提供帮助。
## 通用变量

通用变量是所有环境都应该保持一致的变量，例如项目名称、项目根目录等。在`.env`文件中定义这些变量，以便在整个项目中使用。

### VITE_BASE_URL

- **类型：** `string`
- **默认：** `/`

如果你的项目是需要某个子路径下运行的，那么你可以使用`VITE_BASE_URL`变量来设置子路径。例如，如果你的项目运行在`https://example.com/my-app`，你可以设置`VITE_BASE_URL`为`/my-app`。项目中相关配置会自动修改

### VITE_APP_NAME

- **类型：** `string`
- **默认：** `micro - Admin`

如果你的项目需要设置一个名称，例如`micro-admin`，你可以设置该变量的值为你的项目名称。

### VITE_ROUTE_LOAD_MODE

- **类型：** `dynamic | static`
- **默认：** `dynamic`

项目中提供两种路由模式：`dynamic`和`static`。如果你不需要配合后端实现动态路由，你可以设置`VITE_AUTH_ROUTE_MODE`为`static`。

### VITE_HOME_PATH

- **类型：** `string`
- **默认：** `/dashboard/workbench`

设置登陆后跳转地址,这里应当配置你登录完成后立即跳转的地址，404返回首页的情况下也是优先使用该路径

### VITE_STORAGE_PREFIX

- **类型：** `string`
- **默认：** `null`

设置全局存储的前缀，例如`VITE_STORAGE_PREFIX=micro_`，那么使用`src\utils\storage.ts`在`localStorage`和`sessionStorage`中的数据都会加上`micro_`前缀，例如`micro_token`。

### VITE_COPYRIGHT_INFO

- **类型：** `string`
- **默认：** `Copyright © 2024 chansee97`

页面底部版权信息

### VITE_AUTO_REFRESH_TOKEN

- **类型：** `Y | N`
- **默认：** `Y`

是否使用自动刷新token，关闭后token过期将直接返回登录页面

### VITE_DEFAULT_LANG

- **类型：** `zhCN | enUS`
- **默认：** `enUS`

项目中默认使用的多语言配置，如果无效请清空浏览器本地缓存

## 开发环境

开发环境变量是只有在开发中才会切换的变量，例如是否开启代理等。在`.env.dev`文件中定义这些变量。

### VITE_HTTP_PROXY

- **类型：** `Y | N`
- **默认：** `N`

如果你的项目需要使用代理来访问后端接口，你可以设置`VITE_HTTP_PROXY`为`Y`来开启代理。
::: warning
该配置仅对开发环境有效，前端无法处理生产环境的跨域问题
:::

## 生产环境

生产环境变量是只有在生产或构建产物时才需要的变量，例如是否开启gzip压缩等。在`.env.prod`文件中定义这些变量。

### VITE_BUILD_COMPRESS

- **类型：** `Y | N`
- **默认：** `N`

如果你的项目需要开启产物压缩，你可以设置`VITE_BUILD_COMPRESS`和`VITE_COMPRESS_TYPE`来开启压缩

### VITE_COMPRESS_TYPE

- **类型：** `gzip | brotliCompress | deflate | deflateRaw`
- **默认：** `gzip`

设置压缩算法
