# 项目创建

## 创建vue3项目
1. vue脚手架
2. vite（推荐，也是尤大大团队研发）
创建Vue3项目有多种方法，以下是几种常见的创建方式及其详细教程：

### 1. 使用Vue CLI创建项目
Vue CLI是一个全局的命令行工具，用于快速搭建Vue.js项目。以下是使用Vue CLI创建Vue3项目的步骤：

1. **前置条件**：确保你的系统中安装了Node.js（版本18.3以上）和Vue CLI（版本4.5.0以上）。
   - 打开命令提示符，输入`vue --version`检查Vue CLI版本，输入`node -v`检查Node.js版本。
   - 如果未安装Vue CLI，可以通过命令`npm install -g @vue/cli`进行安装。

2. **项目创建**：在命令行中执行`vue create 项目名`来创建一个新的Vue项目，并选择Vue 3作为预设。

3. **项目启动**：创建完成后，进入项目目录（`cd 项目名`），然后运行`npm run serve`来启动项目。

### 2. 使用Vite创建项目
Vite是一个现代化的前端构建工具，提供了快速的冷服务器启动。以下是使用Vite创建Vue3项目的步骤：

1. **项目创建**：在命令行中执行`npm init vite@latest`，然后根据提示输入项目名称，选择Vue框架和TypeScript等选项。

2. **项目启动**：创建完成后，进入项目目录（`cd 项目名`），然后运行`npm install`安装依赖，接着运行`npm run dev`启动开发服务器。

### 3. 使用create-vue创建项目
create-vue是Vue官方推荐的项目脚手架工具，底层使用Vite构建。以下是使用create-vue创建Vue3项目的步骤：

1. **项目创建**：在命令行中执行`npm create vue@latest`，然后根据提示输入项目名称，并选择是否添加TypeScript、JSX支持、Vue Router、Pinia状态管理等特性。

2. **项目启动**：创建完成后，进入项目目录（`cd 项目名`），然后运行`npm install`安装依赖，接着运行`npm run dev`启动开发服务器。

以上是三种创建Vue3项目的方法，你可以根据个人喜好和项目需求选择合适的创建方式。每种方法都有详细的步骤和命令，可以帮助你快速开始Vue3项目的开发。
