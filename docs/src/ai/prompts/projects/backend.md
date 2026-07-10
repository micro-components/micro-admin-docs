# 后端开发提示词

后端开发中常用的提示词模板，涵盖 API 设计、数据库操作、认证授权、微服务等场景。

## API 开发

### RESTful API 端点

```markdown
创建一个 RESTful API 端点：

**端点路径**：&#123;&#123;path}}
**HTTP 方法**：&#123;&#123;method}}
**功能描述**：&#123;&#123;description}}

**请求参数**：
&#123;&#123;if params.path}}
**路径参数**：
&#123;&#123;each params.path}}
- &#123;&#123;this.name}}（&#123;&#123;this.type}}）：&#123;&#123;this.description}}
&#123;&#123;endeach}}
&#123;&#123;endif}}
&#123;&#123;if params.query}}
**查询参数**：
&#123;&#123;each params.query}}
- &#123;&#123;this.name}}（&#123;&#123;this.type}}）：&#123;&#123;this.description}}
&#123;&#123;endif}}
&#123;&#123;if params.body}}
**请求体**：
```typescript
&#123;&#123;params.body}}
```
&#123;&#123;endif}}

**响应格式**：
```typescript
// 成功响应
interface SuccessResponse {
  code: 200;
  data: &#123;&#123;responseType}};
  message: "success";
}

// 错误响应
interface ErrorResponse {
  code: &#123;&#123;errorCode}};
  message: "&#123;&#123;errorMessage}}";
  errors?: &#123;&#123;errorDetail}};
}
```

**技术栈**：&#123;&#123;stack}}（Express/Koa/NestJS/FastAPI 等）

**实现要求**：
- 完整的类型定义
- 参数校验（使用 &#123;&#123;validator}}）
- 统一的错误处理
- 适当的日志记录
- 请求 ID 追踪

**认证要求**：&#123;&#123;auth}}（None/Bearer Token/JWT/API Key）

请提供：
1. 完整的路由/端点代码
2. 控制器逻辑
3. 请求验证逻辑
4. 错误处理
5. 测试用例
```

### GraphQL API

```markdown
创建一个 GraphQL 查询/变更：

**类型**：Query / Mutation / Subscription
**名称**：&#123;&#123;name}}
**功能描述**：&#123;&#123;description}}

**GraphQL Schema**：
```graphql
&#123;&#123;schema}}
```

**Resolver 实现要求**：
- TypeScript 类型定义
- 数据加载逻辑
- 错误处理
- 权限检查（如需要）
- 缓存策略（如需要）

请提供完整的 Resolver 实现代码。
```

## 数据库操作

### 数据库模型定义

```markdown
创建数据库模型：

**模型名称**：&#123;&#123;modelName}}
**数据库类型**：&#123;&#123;dbType}}（PostgreSQL/MySQL/MongoDB/Redis）

**字段定义**：
&#123;&#123;each fields}}
- &#123;&#123;this.name}}：&#123;&#123;this.type}}
  - 描述：&#123;&#123;this.description}}
  - 约束：&#123;&#123;this.constraints}}
  - 默认值：&#123;&#123;this.default}}
&#123;&#123;endeach}}

**索引**：
&#123;&#123;each indexes}}
- &#123;&#123;this.type}}：&#123;&#123;this.fields}}（&#123;&#123;this.description}}）
&#123;&#123;endeach}}

**关联关系**：
&#123;&#123;each relations}}
- &#123;&#123;this.type}}：&#123;&#123;this.target}}（通过 &#123;&#123;this.through}}）
&#123;&#123;endeach}}

**技术栈**：&#123;&#123;orm}}（Prisma/TypeORM/Sequelize/Drizzle）

**要求**：
- 完整的类型定义
- 迁移文件
- 种子数据（如需要）
- 软删除支持（如需要）

请提供模型定义和迁移代码。
```

### 数据库迁移

```markdown
创建数据库迁移：

**迁移类型**：&#123;&#123;type}}（Create/Alter/Drop）
**表名称**：&#123;&#123;tableName}}

**变更内容**：
&#123;&#123;each changes}}
- &#123;&#123;this.type}} &#123;&#123;this.field}}：&#123;&#123;this.details}}
&#123;&#123;endeach}}

**迁移要求**：
- 支持向上和向下迁移
- 事务包裹
- 回滚计划
- 零停机部署策略（如适用）

请提供迁移文件代码。
```

## 认证授权

### JWT 认证中间件

```markdown
创建 JWT 认证中间件：

**技术栈**：&#123;&#123;stack}}（Express/Koa/NestJS）

**功能要求**：
- 验证 JWT Token 有效性
- 检查 Token 过期时间
- 提取用户信息到请求上下文
- 处理 Token 刷新（如需要）

**配置项**：
- JWT 密钥来源
- Token 过期时间
- 刷新 Token 过期时间
- 白名单路径

**错误处理**：
- Token 无效
- Token 过期
- Token 已撤销
- 用户不存在

请提供完整的中间件代码和配置。
```

### RBAC 权限控制

```markdown
实现 RBAC 权限控制系统：

**角色定义**：
&#123;&#123;each roles}}
- &#123;&#123;this.name}}：&#123;&#123;this.description}}
  权限：&#123;&#123;this.permissions}}
&#123;&#123;endeach}}

**权限点定义**：
&#123;&#123;each permissions}}
- &#123;&#123;this.name}}：&#123;&#123;this.description}}
  资源：&#123;&#123;this.resource}}
  操作：&#123;&#123;this.actions}}
&#123;&#123;endeach}}

**功能要求**：
- 角色-权限映射表
- 用户-角色关联
- 权限检查中间件/装饰器
- 超级管理员支持

**数据库表**：
- users
- roles
- permissions
- user_roles
- role_permissions

请提供完整的实现代码。
```

## 微服务

### 服务间通信

```markdown
创建微服务通信模块：

**服务名称**：&#123;&#123;serviceName}}
**通信方式**：&#123;&#123;method}}（REST/gRPC/Message Queue/Event Bus）

**调用场景**：
&#123;&#123;each scenarios}}
- &#123;&#123;this.name}}：&#123;&#123;this.description}}
&#123;&#123;endeach}}

**技术栈**：&#123;&#123;stack}}（Axios/gRPC-js/Kafka/RabbitMQ/NATS）

**实现要求**：
- 服务发现集成
- 负载均衡策略
- 重试机制（指数退避）
- 超时控制
- 熔断器模式
- 请求/响应类型定义
- 日志和追踪

请提供完整的通信模块代码。
```

### 消息队列消费者

```markdown
创建消息队列消费者：

**队列/主题**：&#123;&#123;queue}}
**消息格式**：
```typescript
&#123;&#123;messageType}}
```

**消费者要求**：
- 消息反序列化
- 幂等性处理
- 错误重试机制
- 死信队列处理
- 并发控制
- 优雅关闭

**技术栈**：&#123;&#123;stack}}（RabbitMQ/Kafka/Redis Streams）

请提供完整的消费者代码。
```
