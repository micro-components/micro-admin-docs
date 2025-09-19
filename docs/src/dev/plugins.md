# 项目插件
1. **vite 核心模块**
   - `defineConfig`：用于定义Vite配置对象，并提供类型提示
   - `loadEnv`：用于加载环境变量，方便在配置中使用.env文件中的变量

2. **@vitejs/plugin-vue**
   - Vite官方的Vue插件，用于解析和处理.vue单文件组件
   - 提供Vue 3的单文件组件支持，包括模板编译、样式处理等

3. **vite-plugin-compression**
   - 用于对打包后的资源进行压缩（如gzip、brotli）
   - 可以减小资源体积，提高页面加载速度
   - 通常可配置压缩算法、压缩阈值等参数

4. **unplugin-vue-components/vite**
   - 自动导入Vue组件的插件，无需手动编写import语句
   - 配合ElementPlusResolver可以自动导入Element Plus组件
   - 提高开发效率，减少样板代码

5. **unplugin-auto-import/vite**
   - 自动导入API的插件，如Vue的ref、reactive等
   - 无需在每个文件中手动导入常用API
   - 同样支持Element Plus等库的自动导入

6. **ElementPlusResolver**
   - 配合unplugin-vue-components使用的Element Plus解析器
   - 实现Element Plus组件的按需自动导入
   - 替代传统的手动导入方式，减小打包体积

7. **vite-plugin-vue-devtools**
   - 增强的Vue开发者工具插件
   - 提供比浏览器内置Vue DevTools更丰富的调试功能
   - 帮助开发者更好地调试Vue应用
## 配置文件
```typescript
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath } from 'url'
import vueDevTools from 'vite-plugin-vue-devtools'
// import { visualizer } from 'rollup-plugin-visualizer'

export default ({ mode }: { mode: string }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const { VITE_VERSION, VITE_PORT, VITE_BASE_URL, VITE_API_URL, VITE_API_PROXY_URL } = env

  console.log(`🚀 API_URL = ${VITE_API_URL}`)
  console.log(`🚀 VERSION = ${VITE_VERSION}`)

  return defineConfig({
    define: {
      __APP_VERSION__: JSON.stringify(VITE_VERSION)
    },
    base: VITE_BASE_URL,
    server: {
      port: Number(VITE_PORT),
      proxy: {
        '/api': {
          target: VITE_API_PROXY_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      host: true
    },
    // 路径别名
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@views': resolvePath('src/views'),
        '@imgs': resolvePath('src/assets/img'),
        '@icons': resolvePath('src/assets/icons'),
        '@utils': resolvePath('src/utils'),
        '@stores': resolvePath('src/store'),
        '@plugins': resolvePath('src/plugins'),
        '@styles': resolvePath('src/assets/styles')
      }
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      chunkSizeWarningLimit: 2000,
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境去除 console
          drop_console: true,
          // 生产环境去除 debugger
          drop_debugger: true
        }
      },
      dynamicImportVarsOptions: {
        warnOnError: true,
        exclude: [],
        include: ['src/views/**/*.vue']
      }
    },
    plugins: [
      vue(),
      // 自动导入 components 目录下的组件
      Components({
        deep: true,
        extensions: ['vue'],
        dirs: ['src/components'],
        resolvers: [ElementPlusResolver({ importStyle: false })],
        dts: 'src/types/components.d.ts'
      }),
      // 自动导入组件 Api
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
        resolvers: [ElementPlusResolver()],
        dts: 'src/types/auto-imports.d.ts',
        // ESLint 配置
        eslintrc: {
          // 首次运行时设置为 true 生成配置文件，之后改为 false
          enabled: true,
          // ESLint 配置文件路径
          filepath: './.auto-import.json',
          // 允许全局使用自动导入的 API
          globalsPropValue: true
        }
      }),
      // 压缩
      viteCompression({
        verbose: false, // 是否在控制台输出压缩结果
        disable: false, // 是否禁用
        algorithm: 'gzip', // 压缩算法
        ext: '.gz', // 压缩后的文件名后缀
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240B = 10KB
        deleteOriginFile: false // 压缩后是否删除原文件
      }),
      vueDevTools()
      // 打包分析
      // visualizer({
      //   open: true,
      //   gzipSize: true,
      //   brotliSize: true,
      //   filename: 'dist/stats.html' // 分析图生成的文件名及路径
      // }),
    ],
    css: {
      preprocessorOptions: {
        // sass variable and mixin
        scss: {
          api: 'modern-compiler',
          additionalData: `
            @use "@styles/variables.scss" as *; 
            @use "@styles/mixin.scss" as *;
          `
        }
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              }
            }
          }
        ]
      }
    }
  })
}

function resolvePath(paths: string) {
  return path.resolve(__dirname, paths)
}
```
##
```bash
在 Vite 中，由于其基于 ES 模块系统，默认不提供 Node.js 环境中的 `process` 全局变量，这与 Webpack 等工具的行为不同。如果需要在 Vite 项目中使用 `process`（例如访问 `process.env` 环境变量），需要进行额外配置。

以下是在 Vite 中配置 `process` 的常用方法：

### 1. 通过 `define` 配置模拟 `process.env`
Vite 提供了 `define` 选项，可以在构建时替换全局变量，从而模拟 `process.env`：

```ts
// vite.config.ts
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())
  
  return {
    define: {
      // 模拟 process.env 对象
      'process.env': {
        NODE_ENV: mode, // 环境模式（development/production）
        ...env // 导入 .env 文件中的变量
      }
    }
  }
})
```

### 2. 单独配置特定环境变量
如果只需要特定变量（如 `NODE_ENV`），可以更简洁地配置：

```ts
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode)
  }
}))
```

### 3. 使用 `vite-plugin-env-compatible` 插件
对于需要完整兼容 `process.env` 用法的场景，可以使用第三方插件：

1. 安装插件：
```bash
npm install vite-plugin-env-compatible --save-dev
# 或
yarn add vite-plugin-env-compatible -D
```

2. 配置插件：
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import envCompatible from 'vite-plugin-env-compatible'

export default defineConfig({
  plugins: [
    envCompatible({
      // 可选：将环境变量前缀为 VITE_ 的变量自动注入
      prefix: 'VITE_',
      // 可选：是否将变量添加到 window 对象
      mountedPath: 'process.env'
    })
  ]
})
```

### 注意事项：
- Vite 中默认暴露前缀为 `VITE_` 的环境变量（可通过 `import.meta.env` 访问），例如 `.env` 文件中的 `VITE_API_URL` 可直接通过 `import.meta.env.VITE_API_URL` 使用，无需额外配置 `process`。
- 避免过度依赖 `process`，推荐使用 Vite 原生的 `import.meta.env` 方式访问环境变量，更符合 ES 模块规范。

通过上述配置，即可在 Vite 项目中使用类似 `process.env` 的语法访问环境变量。
```
## SCSS配置
```bash
这段代码是 Vite 配置中针对 SCSS 预处理器的设置，主要用于全局注入 SCSS 变量和混合（mixin），避免在每个组件中重复导入。以下是详细解析：

### 配置说明
```javascript
css: {
  preprocessorOptions: {
    // 针对 SCSS 预处理器的配置
    scss: {
      // 使用现代编译器 API（Dart Sass）
      api: 'modern-compiler',
      // 全局注入的 SCSS 代码
      additionalData: `
        @use "@styles/variables.scss" as *; 
        @use "@styles/mixin.scss" as *;
      `
    }
  }
}
```

### 关键属性解析
1. **`api: 'modern-compiler'`**
   - 指定使用 Dart Sass 的现代编译器 API（替代旧的 `node-sass`）
   - 支持 SCSS 最新特性（如 `@use`、`@forward` 等模块系统）
   - 需确保已安装 `sass` 依赖（`npm install sass -D`）

2. **`additionalData`**
   - 向所有 SCSS 文件的开头自动注入指定代码
   - `@use "@styles/variables.scss" as *`：导入变量文件并全局暴露其内容
   - `@use "@styles/mixin.scss" as *`：导入混合文件并全局暴露其内容
   - 路径 `@styles` 通常是 `src/styles` 的别名（需在 Vite 中配置 `resolve.alias`）

### 作用与优势
- **全局可用**：变量和混合无需在每个 `.vue` 或 `.scss` 文件中手动导入
- **避免重复代码**：减少样板代码，保持项目整洁
- **统一管理**：样式变量和混合集中维护，便于主题切换和样式调整

### 注意事项
1. 确保路径正确：`@styles` 需对应实际的样式文件目录，可在 `vite.config.ts` 中配置别名：
   ```javascript
   resolve: {
     alias: {
       '@styles': path.resolve(__dirname, 'src/styles')
     }
   }
   ```

2. 与旧语法兼容：如果使用 `@import` 而非 `@use`，配置应改为：
   ```javascript
   additionalData: `
     @import "@styles/variables.scss";
     @import "@styles/mixin.scss";
   `
   ```

3. 性能考量：注入的内容不宜过多，避免增加编译时间

通过这个配置，你可以在项目的任何 SCSS 代码中直接使用 `variables.scss` 和 `mixin.scss` 中定义的变量和混合，提升开发效率。
```
这些插件组合在一起，构建了一个高效的Vue 3开发环境，涵盖了组件处理、自动导入、资源压缩、调试工具等多个方面，能够显著提升开发效率并优化生产环境的构建结果。