# 部署服务集成

Claude Code 可以帮助您配置各种部署平台和 CI/CD 流程。

## 支持的部署平台

### 静态站点部署

- **Vercel**
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**

### 容器部署

- **Docker**
- **Kubernetes**
- **AWS ECS**
- **Google Cloud Run**

### 传统部署

- **AWS EC2**
- **DigitalOcean**
- **Heroku**

## CI/CD 配置

### GitHub Actions

```bash
# 生成 GitHub Actions 工作流
claude-code ask "创建 GitHub Actions workflow，实现 CI/CD 流程：
- 运行测试
- 代码检查
- 构建项目
- 部署到 Vercel"
```

生成的配置：

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm test
      - run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### GitLab CI

```bash
claude-code ask "创建 .gitlab-ci.yml，实现自动化部署"
```

## Docker 配置

### Dockerfile

```bash
claude-code ask "创建多阶段 Dockerfile，优化镜像大小"
```

生成的 Dockerfile：

```dockerfile
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# 生产阶段
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

### Docker Compose

```bash
claude-code ask "创建 docker-compose.yml，包含应用和数据库服务"
```

生成的配置：

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb

volumes:
  postgres_data:
```

## 环境变量管理

```bash
# 生成 .env.example
claude-code ask "创建 .env.example 文件，列出所有环境变量"

# 生成环境变量验证
claude-code ask "创建环境变量验证函数，确保必需的变量已设置"
```

## 部署检查清单

- [ ] 环境变量配置
- [ ] 数据库迁移脚本
- [ ] 健康检查端点
- [ ] 日志配置
- [ ] 错误监控
- [ ] 备份策略

---

返回：[AI 集成](../index.md#集成服务)
