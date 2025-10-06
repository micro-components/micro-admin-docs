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