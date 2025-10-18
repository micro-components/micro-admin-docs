# 开始使用

## 环境准备

Micro-Admin是基于最新Vite版本开发，所以需要[Node.js](https://nodejs.org/en/) 20.x 版本来支持。
包管理器推荐使用 [pnpm](https://pnpm.io/) 8.x 版本

- [环境准备详细教程](/dev/nodejs)
## 开发环境推荐
为了获得最佳的开发体验，我们推荐使用以下工具：
- 代码编辑器：[VS Code](https://code.visualstudio.com/) - 最流行的代码编辑器之一，支持多种插件和扩展
- 代码编辑器：[Cursor](https://cursor.com/cn) - AI 驱动的智能编辑器，提供强大的代码提示和生成功能
- [Codeium](https://codeium.com/) - 免费的AI代码补全工具，支持多种语言和IDE插件
- [Tabnine](https://www.tabnine.com/) - 企业级AI代码助手，提供本地化模型部署选项
- [Sourcegraph Cody](https://about.sourcegraph.com/cody) - 基于代码库理解的智能编程助手
- [GitHub Copilot](https://github.com/features/copilot) - GitHub官方AI编程伙伴，深度集成VS Code等编辑器
- [Amazon CodeWhisperer](https://aws.amazon.com/codewhisperer/) - AWS提供的AI编程助手，支持多种编程语言
- [Replit Ghostwriter](https://replit.com/site/ghostwriter) - 在线IDE Replit内置的AI编程功能
- [Phind](https://www.phind.com/) - 面向开发者的AI搜索引擎和代码生成工具
- [Code Llama](https://ai.meta.com/llama/code-llama/) - Meta开源的代码生成AI模型
- [DeepSeek Coder](https://deepseek.com/) - 深度求索推出的智能编程助手
- [Bito AI](https://bito.ai/) - 基于GPT的代码生成和解释工具
- [CodeGeeX](https://codegeex.cn/) - 清华大学团队开发的AI编程助手
- 运行调试工具：[HBuilderX](https://www.dcloud.io/hbuilderx.html) - 专为 uni-app 优化的集成开发环境
- 数据库工具：[DBeaver](https://dbeaver.io/) - 免费开源的通用数据库管理工具，支持多种数据库类型
- API测试工具：[Postman](https://www.postman.com/) - 功能强大的API开发与测试平台
- 版本控制工具：[GitHub Desktop](https://desktop.github.com/) - 简单易用的Git图形化客户端
- 终端工具：[Windows Terminal](https://aka.ms/terminal) - 现代化的命令行终端，支持多标签和自定义配置
- 容器工具：[Docker Desktop](https://www.docker.com/products/docker-desktop/) - 本地容器化开发和部署解决方案
## 获取代码

### 下载产物

推荐直接下载[Releases](https://github.com/chansee97/micro-admin/releases)压缩包

### 仓库拉取

::: code-group

```shell [GitHub]
git clone https://github.com/chansee97/micro-admin.git

```

```shell [Gitee]
git clone https://gitee.com/chansee97/micro-admin.git

```

:::

::: tip
使用仓库拉取代码后，需要自行删除`.git`等目录，防止提交不必要的代码和记录
:::

## 本地启动

### 安装依赖

```bash
pnpm i
```

### 启动本地开发

```bash
pnpm dev
```

### 构建产物

```bash
pnpm build
```

## 脚本命令解释

```json
  "scripts": {
    // 启动本地开发模式，mode标识为dev，端口号9980
    "dev": "vite --mode dev --port 9980",
    // 启动本地开发模式，mode标识为test（端口vite默认5173）
    "dev:test": "vite --mode test",
    // 启动本地开发模式，mode标识为prod（端口vite默认5173）
    "dev:prod": "vite --mode prod",
    // 进行类型检查 并使用vite构建，mode标识为prod
    "build": "vue-tsc --noEmit && vite build --mode prod",
    // 进行类型检查 并使用vite构建，mode标识为dev
    "build:dev": "vue-tsc --noEmit && vite build --mode dev",
    // 进行类型检查 并使用vite构建，mode标识为test
    "build:test": "vue-tsc --noEmit && vite build --mode test",
    // 预览打包后的产物，端口号9981
    "preview": "vite preview --port 9981",
    // 使用eslint检查代码
    "lint": "eslint .",
    // 使用eslint检查并自动修复代码
    "lint:fix": "eslint . --fix",
    // 可视化查看eslint规则配置
    "lint:check": "npx @eslint/config-inspector",
    // 使用vite-bundle-visualizer插件分析打包产物
    "sizecheck": "npx vite-bundle-visualizer"
  }
```

- 关于`@eslint/config-inspector`，可查看这篇[Blog](https://eslint.org/blog/2024/04/eslint-config-inspector/)
