# 数据库集成

Claude Code 可以帮助您集成和管理数据库操作。

## 支持的数据库

Claude Code 支持主流数据库：

- PostgreSQL
- MySQL / MariaDB
- SQLite
- MongoDB
- Redis

## ORM 集成

### Prisma (PostgreSQL, MySQL, SQLite)

```bash
# 生成 Prisma 模型
claude-code ask "创建 Prisma schema，定义 User、Post、Comment 模型，包含关系"

# 生成迁移
claude-code ask "创建 Prisma migration，添加用户表"

# 生成查询函数
claude-code ask "创建 User CRUD 函数，使用 Prisma Client"
```

### TypeORM (PostgreSQL, MySQL)

```bash
# 生成 Entity
claude-code ask "创建 User Entity，包含字段和关系"

# 生成 Repository
claude-code ask "创建 UserRepository，包含基本 CRUD 操作"
```

### Mongoose (MongoDB)

```bash
# 生成 Schema
claude-code ask "创建 User Schema，定义字段和验证规则"

# 生成 Model 方法
claude-code ask "为 User Model 添加自定义方法"
```

## 数据库操作示例

### 创建连接

```bash
claude-code ask "创建数据库连接配置，使用 connection pool 和错误重试"
```

### 查询构建

```bash
# 复杂查询
claude-code ask "创建一个查询，获取过去 30 天内发布的前 10 篇文章，包含作者信息"

# 聚合查询
claude-code ask "创建聚合查询，统计每个分类的文章数量"
```

### 事务处理

```bash
claude-code ask "创建事务处理函数，实现转账功能，涉及账户余额更新和交易记录"
```

## 最佳实践

### 1. 查询优化

```bash
claude-code ask "优化这个查询，避免 N+1 问题"
```

### 2. 连接池配置

```bash
claude-code ask "配置数据库连接池，优化并发性能"
```

### 3. 错误处理

```bash
claude-code ask "添加数据库操作的错误处理和重试逻辑"
```

---

下一步：[部署服务集成](deploy)
