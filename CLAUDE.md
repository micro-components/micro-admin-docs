# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 项目概述 (Project Overview)

**MicroAdmin Docs** 是 MicroAdmin 企业级中后台管理模板的官方文档站点。

### 关于 MicroAdmin

MicroAdmin 是一个基于现代前端技术栈构建的企业级中后台解决方案：

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.x | 渐进式 JavaScript 框架 |
| Vite | 5.x | 下一代前端构建工具 |
| TypeScript | 5.x | JavaScript 的超集 |
| Element-Plus | 2.x | Vue 3 组件库 |
| UnoCSS | - | 原子化 CSS 引擎 |

### 文档站点技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| VitePress | ^1.6.3 | Vue 驱动的静态站点生成器 |
| pnpm | 9.x | 快速、节省磁盘空间的包管理器 |
| Node.js | 20.x | JavaScript 运行时 |

### 在线资源

- **文档站点**: https://micro-admin-site.netlify.app/
- **GitHub**: https://github.com/micro-components/micro-design-admin
- **Gitee**: https://gitee.com/chansee97/micro-admin

---

## 开发命令 (Development Commands)

```bash
# 安装依赖
pnpm install

# 启动开发服务器 (热更新)
pnpm docs:dev

# 构建生产版本
pnpm docs:build

# 预览生产构建
pnpm docs:preview

# 本地服务构建产物
pnpm docs:serve
```

### 命令说明

| 命令 | 说明 | 输出目录 |
|------|------|----------|
| `docs:dev` | 启动开发服务器，支持热更新 | - |
| `docs:build` | 构建静态站点 | `docs/.vitepress/dist` |
| `docs:preview` | 预览构建产物 | - |
| `docs:serve` | 本地服务器运行构建产物 | - |

---

## 项目结构 (Project Structure)

```
micro-admin-docs/
├── .claude/                    # Claude Code 配置
│   └── settings.json           # 权限和项目设置
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages 自动部署
├── docs/                       # VitePress 文档根目录
│   ├── .vitepress/
│   │   ├── config/             # 配置文件目录
│   │   │   ├── index.ts        # 主配置入口
│   │   │   ├── shared.ts       # 共享配置 (base URL, 搜索, 社交链接)
│   │   │   ├── zh.ts           # 中文配置 (导航, 侧边栏)
│   │   │   ├── en.ts           # 英文配置 (导航, 侧边栏)
│   │   │   └── icon.ts         # 自定义图标 (QQ等)
│   │   ├── theme/
│   │   │   ├── index.ts        # 主题入口
│   │   │   └── custom.css      # 自定义样式 (赛博霓虹主题)
│   │   ├── cache/              # 构建缓存 (自动生成)
│   │   └── dist/               # 构建输出 (自动生成)
│   └── src/                    # Markdown 源文件
│       ├── index.md            # 首页
│       ├── donate.md           # 捐助页
│       ├── guide/              # 中文指南
│       ├── dev/                # 中文开发配置
│       ├── other/              # 中文其他文档
│       ├── en/                 # 英文文档 (镜像中文结构)
│       └── public/             # 静态资源
├── CLAUDE.md                   # Claude Code 指南 (本文件)
├── package.json                # 项目配置
├── pnpm-lock.yaml              # 依赖锁定文件
└── README.md                   # 项目说明
```

---

## 配置详情 (Configuration Details)

### VitePress 核心配置

**文件**: `docs/.vitepress/config/shared.ts`

```typescript
{
  title: "MicroAdmin",           // 站点标题
  lastUpdated: true,             // 显示最后更新时间
  cleanUrls: true,               // 移除 URL 中的 .html
  metaChunk: true,               // 元数据分块优化
  srcDir: "src",                 // 源文件目录
  base: '/micro-admin-docs/',    // 部署基础路径
}
```

### 多语言配置

| 语言 | 路径 | 配置文件 |
|------|------|----------|
| 简体中文 (默认) | `/` | `config/zh.ts` |
| English | `/en/` | `config/en.ts` |

**配置入口**: `docs/.vitepress/config/index.ts`

```typescript
locales: {
  root: { label: "简体中文", ...zh },
  en: { label: "English", ...en },
}
```

### Algolia 搜索配置

```typescript
search: {
  provider: "algolia",
  options: {
    appId: "XVJOMWXWDI",
    apiKey: "763016448ef3b797fc4ed0283c5046ca",
    indexName: "micro-admin-netlify",
  }
}
```

### 社交链接

- GitHub: https://github.com/micro-components/micro-design-admin
- QQ群: https://qm.qq.com/q/y7YXbq5WIo

### Google Analytics

已集成 Google Analytics，跟踪 ID: `G-JYHD4M2FMM`

---

## 主题定制 (Theme Customization)

### 当前主题: 赛博霓虹 (Cyber Neon)

**文件**: `docs/.vitepress/theme/custom.css`

#### 色彩系统

| 变量 | 颜色值 | 用途 |
|------|--------|------|
| `--neon-cyan` | `#00f5ff` | 主色调 |
| `--neon-purple` | `#bf00ff` | 强调色 |
| `--neon-pink` | `#ff00aa` | 点缀色 |
| `--neon-blue` | `#0066ff` | 信息色 |
| `--neon-green` | `#00ff88` | 成功色 |
| `--neon-orange` | `#ff6b00` | 警告色 |

#### 字体系统

| 用途 | 字体 |
|------|------|
| 标题 | Orbitron (科技感) |
| 正文 | Rajdhani + PingFang SC |
| 代码 | JetBrains Mono |

#### 动效特性

- **扫描线**: 页面顶部持续扫描的霓虹光线
- **渐变流动**: 标题、按钮的渐变色动态变化
- **悬浮发光**: 卡片、按钮 hover 时的霓虹发光
- **边框流光**: 特性卡片的流动边框动画
- **错开进场**: 卡片依次淡入上滑动画

#### 修改主题

编辑 `docs/.vitepress/theme/custom.css` 中的 CSS 变量即可自定义颜色和效果。

---

## 部署配置 (Deployment)

### GitHub Pages 自动部署

**配置文件**: `.github/workflows/deploy.yml`

#### 触发条件

- 推送到 `main` 分支
- 手动触发 (workflow_dispatch)

#### 部署流程

```
1. Checkout 代码 (fetch-depth: 0 用于 lastUpdated)
2. 安装 pnpm (v9.0.6)
3. 安装 Node.js (v20)
4. 安装依赖 (pnpm install)
5. 构建站点 (pnpm docs:build)
6. 上传构建产物 (docs/.vitepress/dist)
7. 部署到 GitHub Pages
```

#### 部署 URL

构建后自动部署到: `https://<username>.github.io/micro-admin-docs/`

---

## Claude Code 配置

### 权限设置

**文件**: `.claude/settings.json`

```json
{
  "permissions": {
    "allow": [
      "Bash(pnpm *)",    // 包管理命令
      "Bash(git *)",     // Git 版本控制
      "Bash(ls *)",      // 文件列表
      "Bash(mkdir *)"    // 创建目录
    ]
  }
}
```

### 推荐技能 (Recommended Skills)

| 技能 | 用途 |
|------|------|
| `/doc-coauthoring` | 协作编写和优化文档内容 |
| `/frontend-design` | 创建 Web 组件或 UI 设计 |
| `/skill-creator` | 创建项目专属的自定义技能 |

---

## 开发指南 (Development Guide)

### 添加新文档

1. 在 `docs/src/` 对应目录创建 `.md` 文件
2. 在 `docs/.vitepress/config/zh.ts` 中添加侧边栏配置
3. 如需英文版，在 `docs/src/en/` 创建对应文件并更新 `en.ts`

### 修改导航

编辑对应语言的配置文件中的 `nav()` 函数：
- 中文: `docs/.vitepress/config/zh.ts`
- 英文: `docs/.vitepress/config/en.ts`

### 修改侧边栏

编辑对应配置文件中的 `sidebar` 配置和相关的 `sidebarXxx()` 函数。

### 添加静态资源

将文件放入 `docs/src/public/` 目录，通过 `/文件名` 引用。
