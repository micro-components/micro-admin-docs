# Spec: [API 名称] API 规格

## 元信息

- **Spec ID**: API-[编号]
- **创建日期**: YYYY-MM-DD
- **负责人**: @username
- **优先级**: P1 (P0/P1/P2/P3)
- **状态**: Draft (Draft/Review/Approved/InProgress/Testing/Done)
- **API 类型**: REST / GraphQL / WebSocket
- **预估工时**: X 人天
- **关联 Feature**: FEAT-[编号]

---

## 背景与目标

### 业务背景

描述 API 的业务背景和使用场景。

**示例**:
当前系统需要提供用户管理相关的 API，包括用户列表查询、用户详情获取、用户创建、用户更新、用户删除等功能，为前端应用提供数据支持。

### 技术目标

- [ ] 提供完整的用户管理 API
- [ ] 支持分页、排序、筛选
- [ ] 支持批量操作
- [ ] 提供完善的错误处理
- [ ] 提供 API 文档

### 成功指标

| 指标 | 目标值 | 测量方式 |
|------|--------|----------|
| 响应时间 | < 200ms (P95) | 性能测试 |
| 可用性 | 99.9% | 监控系统 |
| 文档覆盖率 | 100% | 文档检查 |

---

## API 概览

### 2.1 API 列表

| API ID | 方法 | 路径 | 描述 | 优先级 |
|--------|------|------|------|--------|
| API-001 | GET | /api/users | 获取用户列表 | P0 |
| API-002 | GET | /api/users/:id | 获取用户详情 | P0 |
| API-003 | POST | /api/users | 创建用户 | P0 |
| API-004 | PUT | /api/users/:id | 更新用户 | P0 |
| API-005 | DELETE | /api/users/:id | 删除用户 | P0 |
| API-006 | POST | /api/users/batch | 批量删除用户 | P1 |
| API-007 | PATCH | /api/users/:id/status | 更新用户状态 | P1 |

### 2.2 通用规范

#### 请求头

| 名称 | 值 | 必需 | 说明 |
|------|---|------|------|
| Content-Type | application/json | 是 | 请求内容类型 |
| Authorization | Bearer {token} | 是 | 认证 Token |
| X-Request-ID | {uuid} | 否 | 请求追踪 ID |

#### 响应格式

所有 API 统一使用以下响应格式：

**成功响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    // 响应数据
  },
  "requestId": "uuid",
  "timestamp": 1234567890
}
```

**错误响应**:

```json
{
  "code": 400,
  "message": "参数错误",
  "errors": [
    {
      "field": "username",
      "message": "用户名不能为空"
    }
  ],
  "requestId": "uuid",
  "timestamp": 1234567890
}
```

#### 分页参数

| 参数 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| sortBy | string | 否 | - | 排序字段 |
| sortOrder | string | 否 | asc | 排序方向 (asc/desc) |

#### 分页响应

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [],
    "pagination": {
      "current": 1,
      "pageSize": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

---

## API 详细定义

### 3.1 获取用户列表

**API ID**: API-001
**方法**: GET
**路径**: `/api/users`

#### 请求参数

| 参数 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| keyword | string | 否 | - | 搜索关键词 |
| status | number | 否 | - | 用户状态筛选 |
| sortBy | string | 否 | id | 排序字段 |
| sortOrder | string | 否 | desc | 排序方向 |

**请求示例**:

```http
GET /api/users?page=1&pageSize=10&status=1 HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
Content-Type: application/json
```

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "username": "admin",
        "email": "admin@example.com",
        "status": 1,
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "current": 1,
      "pageSize": 10,
      "total": 100,
      "totalPages": 10
    }
  },
  "requestId": "uuid",
  "timestamp": 1234567890
}
```

#### 错误码

| 错误码 | 说明 | HTTP 状态码 |
|--------|------|-------------|
| 401 | 未授权 | 401 |
| 403 | 无权限 | 403 |
| 500 | 服务器错误 | 500 |

---

### 3.2 获取用户详情

**API ID**: API-002
**方法**: GET
**路径**: `/api/users/:id`

#### 路径参数

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| id | number | 是 | 用户 ID |

**请求示例**:

```http
GET /api/users/1 HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "status": 1,
    "profile": {
      "nickname": "管理员",
      "avatar": "https://example.com/avatar.jpg"
    },
    "roles": [
      {
        "id": 1,
        "name": "admin",
        "description": "管理员"
      }
    ],
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  "requestId": "uuid",
  "timestamp": 1234567890
}
```

#### 错误码

| 错误码 | 说明 | HTTP 状态码 |
|--------|------|-------------|
| 400 | 参数错误 | 400 |
| 401 | 未授权 | 401 |
| 404 | 用户不存在 | 404 |
| 500 | 服务器错误 | 500 |

---

### 3.3 创建用户

**API ID**: API-003
**方法**: POST
**路径**: `/api/users`

#### 请求体

```typescript
interface CreateUserRequest {
  username: string      // 用户名，必需，3-20 字符
  email: string         // 邮箱，必需，邮箱格式
  password: string      // 密码，必需，8-32 字符
  nickname?: string     // 昵称，可选
  status?: number       // 状态，可选，默认 1
  roleIds?: number[]    // 角色ID列表，可选
}
```

**请求示例**:

```http
POST /api/users HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
Content-Type: application/json

{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "nickname": "新用户",
  "status": 1,
  "roleIds": [2]
}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "用户创建成功",
  "data": {
    "id": 2,
    "username": "newuser",
    "email": "newuser@example.com",
    "nickname": "新用户",
    "status": 1,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  "requestId": "uuid",
  "timestamp": 1234567890
}
```

#### 错误码

| 错误码 | 说明 | HTTP 状态码 |
|--------|------|-------------|
| 400 | 参数错误 | 400 |
| 401 | 未授权 | 401 |
| 403 | 用户名已存在 | 403 |
| 500 | 服务器错误 | 500 |

#### 参数校验

| 参数 | 校验规则 | 错误信息 |
|------|----------|----------|
| username | 必需，3-20 字符，字母数字下划线 | 用户名格式不正确 |
| email | 必需，邮箱格式 | 邮箱格式不正确 |
| password | 必需，8-32 字符 | 密码格式不正确 |
| nickname | 可选，最多 50 字符 | 昵称过长 |

---

### 3.4 更新用户

**API ID**: API-004
**方法**: PUT
**路径**: `/api/users/:id`

#### 路径参数

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| id | number | 是 | 用户 ID |

#### 请求体

```typescript
interface UpdateUserRequest {
  email?: string         // 邮箱，可选
  nickname?: string      // 昵称，可选
  status?: number        // 状态，可选
  roleIds?: number[]    // 角色ID列表，可选
}
```

**请求示例**:

```http
PUT /api/users/2 HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
Content-Type: application/json

{
  "nickname": "更新后的昵称",
  "status": 0
}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "用户更新成功",
  "data": {
    "id": 2,
    "username": "newuser",
    "email": "newuser@example.com",
    "nickname": "更新后的昵称",
    "status": 0,
    "updatedAt": "2024-01-01T01:00:00Z"
  },
  "requestId": "uuid",
  "timestamp": 1234567890
}
```

#### 错误码

| 错误码 | 说明 | HTTP 状态码 |
|--------|------|-------------|
| 400 | 参数错误 | 400 |
| 401 | 未授权 | 401 |
| 403 | 无权限 | 403 |
| 404 | 用户不存在 | 404 |
| 500 | 服务器错误 | 500 |

---

### 3.5 删除用户

**API ID**: API-005
**方法**: DELETE
**路径**: `/api/users/:id`

#### 路径参数

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| id | number | 是 | 用户 ID |

**请求示例**:

```http
DELETE /api/users/2 HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "用户删除成功",
  "data": null,
  "requestId": "uuid",
  "timestamp": 1234567890
}
```

#### 错误码

| 错误码 | 说明 | HTTP 状态码 |
|--------|------|-------------|
| 401 | 未授权 | 401 |
| 403 | 无权限 | 403 |
| 404 | 用户不存在 | 404 |
| 500 | 服务器错误 | 500 |

---

### 3.6 批量删除用户

**API ID**: API-006
**方法**: POST
**路径**: `/api/users/batch`

#### 请求体

```typescript
interface BatchDeleteRequest {
  ids: number[]  // 用户ID列表，必需，最多 100 个
}
```

**请求示例**:

```http
POST /api/users/batch HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
Content-Type: application/json

{
  "ids": [1, 2, 3]
}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "批量删除成功",
  "data": {
    "successCount": 3,
    "failureCount": 0,
    "failedIds": []
  },
  "requestId": "uuid",
  "timestamp": 1234567890
}
```

#### 错误码

| 错误码 | 说明 | HTTP 状态码 |
|--------|------|-------------|
| 400 | 参数错误 | 400 |
| 401 | 未授权 | 401 |
| 403 | 无权限 | 403 |
| 500 | 服务器错误 | 500 |

---

## 数据模型

### 4.1 用户模型

```typescript
interface User {
  id: number                    // 用户 ID
  username: string              // 用户名
  email: string                 // 邮箱
  status: number                // 状态 (0-禁用, 1-启用)
  profile?: UserProfile         // 用户资料
  roles: Role[]                 // 角色列表
  permissions: Permission[]     // 权限列表
  createdAt: string             // 创建时间
  updatedAt: string             // 更新时间
}

interface UserProfile {
  nickname?: string             // 昵称
  avatar?: string               // 头像 URL
  phone?: string                // 手机号
  address?: string              // 地址
  bio?: string                  // 个人简介
}

interface Role {
  id: number                    // 角色 ID
  name: string                  // 角色名称
  description: string           // 角色描述
  createdAt: string             // 创建时间
}

interface Permission {
  id: number                    // 权限 ID
  name: string                  // 权限名称
  resource: string              // 资源标识
  action: string                // 操作标识
  description: string           // 权限描述
}
```

### 4.2 分页模型

```typescript
interface PaginationResponse {
  current: number               // 当前页
  pageSize: number              // 每页数量
  total: number                 // 总数
  totalPages: number            // 总页数
}

interface PageResult<T> {
  list: T[]                     // 数据列表
  pagination: PaginationResponse  // 分页信息
}
```

---

## 安全规范

### 5.1 认证

- 使用 JWT Token 进行认证
- Token 有效期: 1 小时
- 使用 Refresh Token 刷新
- Token 存储在 Authorization Header

### 5.2 授权

- 基于角色的访问控制 (RBAC)
- 每个接口定义所需权限
- 权限不足返回 403

### 5.3 数据加密

- 密码使用 bcrypt 加密
- 敏感数据传输使用 HTTPS
- Token 使用签名验证

### 5.4 限流

- 每个用户每分钟最多 100 次请求
- 超过限流返回 429
- 限流基于用户 ID

---

## 测试计划

### 6.1 单元测试

| API ID | 测试场景 | 预期结果 |
|--------|----------|----------|
| API-001 | 正常获取用户列表 | 返回用户列表 |
| API-001 | 分页参数测试 | 正确分页 |
| API-001 | 搜索关键词测试 | 返回匹配结果 |
| API-002 | 获取存在的用户 | 返回用户详情 |
| API-002 | 获取不存在的用户 | 返回 404 |
| API-003 | 创建正常用户 | 返回创建的用户 |
| API-003 | 重复用户名 | 返回 403 |
| API-004 | 更新存在的用户 | 返回更新后的用户 |
| API-004 | 更新不存在的用户 | 返回 404 |
| API-005 | 删除存在的用户 | 返回成功 |
| API-005 | 删除不存在的用户 | 返回 404 |

### 6.2 集成测试

- 测试完整的用户管理流程
- 测试权限控制
- 测试限流机制

### 6.3 性能测试

| API | 目标 QPS | 目标响应时间 (P95) |
|-----|----------|-------------------|
| GET /api/users | 1000 | 200ms |
| GET /api/users/:id | 2000 | 100ms |
| POST /api/users | 500 | 300ms |
| PUT /api/users/:id | 500 | 300ms |
| DELETE /api/users/:id | 500 | 200ms |

---

## 参考资料

### 相关文档

- [RESTful API 设计指南](./)
- [OpenAPI 规范](https://swagger.io/specification/)
- [JWT 规范](https://jwt.io/)

### 设计稿

- [API 文档设计稿](./)
- [数据模型图](./)

### 类似 API 参考

- [GitHub API](https://docs.github.com/en/rest)
- [Stripe API](https://stripe.com/docs/api)

---

## 变更记录

| 版本 | 日期 | 变更人 | 变更内容 |
|------|------|--------|----------|
| v1.0 | 2024-01-01 | @user1 | 初始版本 |

---

## 评审记录

### 评审 1

| 项目 | 内容 |
|------|------|
| 评审时间 | YYYY-MM-DD |
| 评审人员 | @user1, @user2, @user3 |
| 评审意见 | [意见内容] |
| 评审结果 | 通过 / 不通过 |

---

**文档创建**: YYYY-MM-DD
**文档状态**: Draft
**预计完成**: YYYY-MM-DD
