# 第三方 API 集成

Claude Code 可以帮助您集成各种第三方服务和 API。

## 常见集成场景

### 支付集成

```bash
# Stripe 集成
claude-code ask "集成 Stripe 支付功能：
- 创建支付意图
- 处理 Webhook
- 订阅管理"

# PayPal 集成
claude-code ask "创建 PayPal 结账按钮和回调处理"
```

### 认证服务

```bash
# OAuth 集成
claude-code ask "集成 Google OAuth 登录"

# JWT 认证
claude-code ask "实现 JWT 认证，包含 token 生成和验证"

# 认证中间件
claude-code ask "创建认证中间件，保护 API 路由"
```

### 云服务

```bash
# AWS S3
claude-code ask "集成 AWS S3 文件上传功能"

# Cloudflare CDN
claude-code ask "集成 Cloudflare CDN 图片处理"

# Firebase
claude-code ask "集成 Firebase 实时数据库和认证"
```

### 消息服务

```bash
# SendGrid 邮件
claude-code ask "集成 SendGrid 发送邮件"

# Twilio 短信
claude-code ask "集成 Twilio 发送验证码短信"

# WebSocket
claude-code ask "实现 WebSocket 实时通信"
```

## API 客户端生成

```bash
# 生成 TypeScript API 客户端
claude-code ask "基于 OpenAPI 规范生成 TypeScript API 客户端"

# 生成 GraphQL 客户端
claude-code ask "生成 Apollo GraphQL 客户端配置和查询"
```

## 最佳实践

### 1. 错误处理

```bash
claude-code ask "为第三方 API 调用添加统一的错误处理和重试逻辑"
```

### 2. 配置管理

```bash
claude-code ask "创建第三方服务的配置管理系统"
```

### 3. 测试 Mock

```bash
claude-code ask "为第三方 API 创建 Mock 服务，用于测试"
```

---

返回：[AI 集成](../index.md#集成服务)
