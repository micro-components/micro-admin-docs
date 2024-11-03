# 坏境变量

创建Vue3项目时配置环境变量，你可以根据不同的工具和构建系统选择不同的方法。以下是几种常见的配置环境变量的方法：

### 1. 使用Vue CLI配置环境变量

Vue CLI项目中有三个模式：development、test和production。你可以在项目根目录中创建不同的`.env`文件来配置环境变量：

- `.env`：所有环境下都会加载。
- `.env.local`：所有环境下都会加载，但会被git忽略。
- `.env.[mode]`：只在指定的模式下加载。
- `.env.[mode].local`：只在指定的模式下加载，但会被git忽略。

例如，你可以创建`.env.development`和`.env.production`文件来分别配置开发环境和生产环境的变量。在代码中，只有以`VUE_APP_`为前缀的变量会被webpack.DefinePlugin静态嵌入到客户端代码中，例如：

```javascript
console.log(process.env.VUE_APP_SECRET)
```

在`public/index.html`中，你也可以通过插值的方式使用环境变量：

```html
<title><%= VUE_APP_TITLE %></title>
```

[Vue CLI 环境变量和模式](https://cli.vuejs.org/zh/guide/mode-and-env.html)

### 2. 使用Vite配置环境变量

Vite同样支持`.env`文件来配置环境变量，并且遵循dotenv的规则：

- `.env`：所有情况下都会加载。
- `.env.local`：所有情况下都会加载，但会被git忽略。
- `.env.[mode]`：只在指定模式下加载。
- `.env.[mode].local`：只在指定模式下加载，但会被git忽略。

在Vite中，环境变量通过`import.meta.env`对象暴露给客户端源码，并且只有以`VITE_`为前缀的变量会被暴露。例如：

```javascript
console.log(import.meta.env.VITE_APP_TITLE)
```

在HTML文件中，你可以使用`%VITE_APP_TITLE%`语法来获取`import.meta.env`中的属性。

[Vite 环境变量和模式](https://cn.vitejs.dev/guide/env-and-mode.html)

### 3. TypeScript智能提示

如果你在使用TypeScript，你可能需要在`src`目录下创建一个`env.d.ts`文件来提供环境变量的类型定义，以便获得智能提示：

```typescript
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

这样，你就可以在TypeScript代码中获得环境变量的智能提示了。

[Vite TypeScript智能提示](https://cn.vitejs.dev/guide/env-and-mode.html#typescript-%E6%99%BA%E8%83%BD%E6%8F%90%E7%A4%BA)

通过上述方法，你可以根据不同的构建系统和工具来配置Vue3项目的环境变量，以适应不同的开发、测试和生产环境。