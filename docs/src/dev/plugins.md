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
这些插件组合在一起，构建了一个高效的Vue 3开发环境，涵盖了组件处理、自动导入、资源压缩、调试工具等多个方面，能够显著提升开发效率并优化生产环境的构建结果。