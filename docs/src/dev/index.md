# 前置准备
## 环境搭建

- [Node.js](https://nodejs.org/) 18 及以上版本。

- 推荐 [VSCode](https://code.visualstudio.com/) 及其[官方 Vue 扩展](https://marketplace.visualstudio.com/items?itemName=Vue.volar)。
## 插件安装

Vetur 和 Volar 都是为 Vue.js 开发者提供的 VS Code 插件，它们各自有不同的特点和功能。以下是它们的一些主要区别和功能：

| 插件名称 | 功能                                                         | 安装                                                         |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Vetur    | Vetur 更适合 Vue 2 项目                                      | [安装]( https://marketplace.visualstudio.com/items?itemName=Vue.volar ) |
| Volar    | Volar 利用了 TypeScript 和 Vue.js 3 的新特性，对于使用 Vue.js 3 的项目提供更好的支持。 | [安装](https://marketplace.visualstudio.com/items?itemName=Vue.volar) |

  ### Vetur
  Vetur 是一个成熟且广泛使用的 Vue.js 开发插件，提供了以下功能：
  1. **语法高亮**：为 `.vue` 文件提供语法高亮，包括模板、脚本和样式部分。
  2. **智能代码补全**：帮助快速编写 Vue.js 代码，提供组件或属性的自动提示。
  3. **代码片段**：支持代码片段，快速生成常用的 Vue.js 代码结构。
  4. **代码导航**：便于导航和理解 Vue.js 项目结构，快速跳转到相关文件。
  5. **代码格式化**：包括代码格式化工具，保持代码风格一致。
  6. **语法检查**：集成 ESLint 和 TSLint，捕获潜在错误和不规范的代码风格。

  ### Volar
  Volar 是一个针对 Vue 3 的 VS Code 插件，提供了更为强大的功能：
  1. **不再需要唯一根标签**：Vue 3 去除了模板中唯一根标签的限制，Volar 支持这一特性。
  2. **编辑器快捷分割**：Volar 允许将 `.vue` 文件中的 `template`、`script`、`style` 部分分割成独立的视窗，方便编辑和管理。
  3. **`ref sugar` 语法快捷改动支持**：Volar 支持 Vue 3 的 `ref sugar` 语法，并提供图标进行快捷操作。
  4. **`lang` 语法提示**：Volar 提供 `lang` 属性的语法提示，支持选择不同的预处理器语言。
  5. **`template` 语法转换**：Volar 支持在 HTML 和 Pug 模板之间互相转换。

  ### 性能和兼容性
  - Volar 在性能方面进行了优化，使用了预编译技术和缓存机制来提高代码分析和语法检查的速度，适合大型项目。
  - Volar 利用了 TypeScript 和 Vue.js 3 的新特性，对于使用 Vue.js 3 的项目提供更好的支持。

  ### 社区支持
  - Vetur 由 Vue.js 核心团队开发和维护，在社区中有广泛的认可和支持。
  - Volar 由 Vue.js 核心团队成员开发，目前社区支持相对较少，但仍在快速发展中。

  ### 结论
  Vetur 和 Volar 都是 Vue.js 开发的重要工具，Vetur 更适合 Vue 2 项目，而 Volar 则是为 Vue 3 设计的，提供了更先进的功能和更好的性能。开发者可以根据自己项目的需求和 Vue 版本来选择合适的插件。