# 部署指南

本文介绍如何将项目部署到常见平台（Vercel、Netlify）以及自建服务器（Nginx、Docker）。请根据你的运行环境选择对应方案。

## 前置条件
- Node.js 18+（本地构建）
- 已配置好环境变量（.env/.env.production 等）
- 已完成生产构建所需配置

## 构建产物
项目通常基于 Vite 构建，生产构建命令如下：
- 使用 pnpm：pnpm build
- 使用 npm：npm run build
- 使用 yarn：yarn build

构建完成后，会在 dist 目录生成可部署的静态资源。

## 一、部署到 Vercel
适合快速上线与预览。

1) 代码托管
- 推送代码到 GitHub/GitLab/Bitbucket

2) 导入项目
- 登录 vercel.com，Import Project
- 选择你的仓库

3) 构建设置
- Framework Preset: Vite（或 Other）
- Build Command: npm run build（或 pnpm build/yarn build）
- Output Directory: dist
- 若使用自定义环境变量，添加到 Project Settings → Environment Variables

4) 部署
- 提交代码触发自动部署
- 绑定自定义域名（可选）

## 二、部署到 Netlify
1) 代码托管
- 推送代码到 Git 平台

2) 在 Netlify 创建站点
- New site from Git
- 选择仓库

3) 构建配置
- Build command: npm run build（或 pnpm/yarn）
- Publish directory: dist
- 在 Site settings → Environment 添加环境变量（如有）

4) 部署与域名
- 保存后自动构建部署
- 在 Domain settings 绑定自定义域名（可选）

## 三、部署到自建服务器（Nginx）
适用于传统服务器/云主机，将 dist 作为静态站点托管。

1) 上传构建产物
- 将本地 dist/ 上传到服务器指定目录（例如 /var/www/micro-admin）

2) Nginx 配置示例
在 /etc/nginx/conf.d/micro-admin.conf（或站点配置文件）中添加：
```sh
server {
  listen 80;
  server_name your-domain.com;

  root /var/www/micro-admin;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
```
  ### 如有后端接口反向代理，可示例：
  ```sh
  # location /api/ {
  #   proxy_pass http://127.0.0.1:8080/;
  #   proxy_set_header Host $host;
  #   proxy_set_header X-Real-IP $remote_addr;
  #   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  # }
}
```
- 检查配置并重启 Nginx：
```sh
sudo nginx -t
sudo systemctl reload nginx
```

3) HTTPS（可选）
- 使用 Certbot 或云厂商证书中心配置 SSL

## 四、使用 Docker 部署
将 dist 放入容器，通过 Nginx 提供静态服务。

1) Dockerfile 示例
### 基于 Nginx 提供静态资源
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
### 可按需覆盖默认配置
 `COPY nginx.conf /etc/nginx/conf.d/default.conf`

2) 构建与运行
```sh
docker build -t micro-admin-web:latest .
docker run -d --name micro-admin -p 80:80 micro-admin-web:latest
```
3) 反向代理与 HTTPS（可选）
- 使用 Caddy、Traefik 或云负载均衡实现 HTTPS 与多站点转发

## 五、常见问题
- 空白页/404：Nginx/静态托管需配置单页应用回退：try_files ... /index.html
- 资源路径错误：检查 Vite base 配置（vite.config.ts 中 base 字段），或确保部署目录与资源路径一致
- 环境变量不生效：确认构建时注入了正确环境变量；纯静态产物无法在运行时修改构建时写死的变量

如需针对特定平台（如阿里云 OSS、腾讯云 COS、GitHub Pages）提供详细步骤，请告知你的目标平台与部署方式。
我将为您详细介绍Next.js项目的多种部署方式。

## 1. Vercel 部署（推荐）

### 优势
- Next.js官方团队开发，完美支持所有功能
- 自动优化和CDN加速
- 简单的Git集成

### 部署步骤
```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel

# 或使用生产环境部署
vercel --prod
```

### 环境变量配置
在项目根目录创建 `.env` 文件：
```env
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```

在Vercel控制台添加相同的环境变量。

## 2. 静态导出部署

### 配置 next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### 构建和导出
```bash
# 构建静态文件
npm run build

# 导出到out目录
# 将out目录部署到任何静态托管服务
```

## 3. Node.js 服务器部署

### 构建应用
```bash
# 安装依赖
npm install

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### PM2 进程管理
创建 `ecosystem.config.js`：
```javascript
module.exports = {
  apps: [{
    name: 'next-app',
    script: 'npm',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

启动命令：
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 4. Docker 部署

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# 依赖阶段
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 运行阶段
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### next.config.js 配置
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
}

module.exports = nextConfig
```

### 构建和运行
```bash
# 构建镜像
docker build -t nextjs-app .

# 运行容器
docker run -p 3000:3000 nextjs-app
```

## 5. 其他云平台部署

### Netlify
```bash
# 安装Netlify CLI
npm install -g netlify-cli

# 部署
netlify deploy --prod --dir=out
```

### AWS Amplify
在项目根目录创建 `amplify.yml`：
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### GitHub Pages
创建 GitHub Actions 工作流 `.github/workflows/deploy.yml`：
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install and Build
        run: |
          npm install
          npm run build
          npm run export
          
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## 6. 部署最佳实践

### 环境配置
```javascript
// lib/env.js
const env = {
  isProduction: process.env.NODE_ENV === 'production',
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  databaseUrl: process.env.DATABASE_URL,
}

export default env
```

### 错误监控
```bash
# 安装Sentry
npm install @sentry/nextjs
```

配置 `sentry.properties`：
```ini
defaults.url=https://sentry.io/
defaults.org=your-org
defaults.project=your-project
auth.token=your-auth-token
```

### 性能优化
```javascript
// next.config.js
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
}
```

## 7. CI/CD 流水线示例

### GitHub Actions
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

选择适合您项目需求的部署方式，Vercel通常是最简单且功能最完整的选项。