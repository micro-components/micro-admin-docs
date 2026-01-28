# 重构代码

本示例演示如何使用 Claude Code 重构现有代码，提高代码质量。

## 场景描述

重构一个复杂的用户数据获取函数，提高可读性和可维护性。

## 原始代码

```typescript
// src/services/user.ts
export async function getUser(id: string) {
  try {
    const response = await fetch(`https://api.example.com/users/${id}`);
    const data = await response.json();

    if (!response.ok) {
      if (data.code === 'USER_NOT_FOUND') {
        throw new Error('User not found');
      } else if (data.code === 'SERVER_ERROR') {
        throw new Error('Server error');
      } else {
        throw new Error('Unknown error');
      }
    }

    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };

    return user;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        console.error('Network error:', error);
        throw new Error('Network error');
      }
    }
    throw error;
  }
}
```

## 使用 Claude Code 重构

### 分析代码

```bash
claude-code explain --file ./src/services/user.ts
```

Claude Code 会指出：
- 错误处理可以改进
- 数据转换可以提取
- 网络错误检测不准确

### 获取重构建议

```bash
claude-code ask "分析这个函数并提供重构建议，改进：
1. 错误处理
2. 数据转换
3. 网络错误检测
4. 代码可读性"
```

### 执行重构

```bash
claude-code ask "重构 getUser 函数，应用以下改进：
1. 提取数据转换函数
2. 改进错误处理
3. 添加重试逻辑
4. 使用 TypeScript 类型"
```

## 重构后的代码

```typescript
// src/services/user.ts

// 类型定义
interface UserApiResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ApiError {
  code: string;
  message: string;
}

// 错误类型
class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
    this.name = 'UserNotFoundError';
  }
}

class ServerError extends Error {
  constructor() {
    super('Server error');
    this.name = 'ServerError';
  }
}

class NetworkError extends Error {
  constructor() {
    super('Network error');
    this.name = 'NetworkError';
  }
}

// 数据转换函数
function toUser(data: UserApiResponse): User {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
}

// 错误处理函数
function handleApiError(data: ApiError): void {
  switch (data.code) {
    case 'USER_NOT_FOUND':
      throw new UserNotFoundError();
    case 'SERVER_ERROR':
      throw new ServerError();
    default:
      throw new Error(`Unknown error: ${data.code}`);
  }
}

// 重试函数
async function retry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (maxRetries <= 0) throw error;

    console.warn(`Retrying... (${maxRetries} attempts left)`);
    await new Promise(resolve => setTimeout(resolve, delay));

    return retry(fn, maxRetries - 1, delay * 2);
  }
}

// 主函数
export async function getUser(id: string): Promise<User> {
  try {
    const response = await fetch(
      `https://api.example.com/users/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const data: ApiError = await response.json();
      handleApiError(data);
    }

    const data: UserApiResponse = await response.json();
    return toUser(data);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new NetworkError();
    }

    // 如果是我们自定义的错误，直接抛出
    if (
      error instanceof UserNotFoundError ||
      error instanceof ServerError ||
      error instanceof NetworkError
    ) {
      throw error;
    }

    // 其他错误重新抛出
    throw error;
  }
}

// 带重试的版本
export async function getUserWithRetry(id: string): Promise<User> {
  return retry(() => getUser(id));
}
```

## 重构改进点

### 1. 类型安全

- 添加了完整的 TypeScript 类型定义
- 使用接口定义 API 响应和用户数据

### 2. 错误处理

- 创建自定义错误类
- 更好的错误检测和处理
- 清晰的错误传播

### 3. 代码组织

- 提取数据转换函数
- 提取错误处理函数
- 主函数更简洁

### 4. 可维护性

- 单一职责原则
- 函数更小更专注
- 易于测试

### 5. 功能增强

- 添加重试逻辑
- 更好的网络错误检测
- 更完善的日志

## 测试

重构后编写测试：

```typescript
import { describe, it, expect, vi } from 'vitest';
import { getUser, getUserWithRetry } from './user';
import { UserNotFoundError, ServerError } from './user';

describe('getUser', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('应该返回用户数据', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        created_at: '2024-01-01',
        updated_at: '2024-01-15',
      }),
    });

    const user = await getUser('1');

    expect(user).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15'),
    });
  });

  it('应该抛出 UserNotFoundError', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        code: 'USER_NOT_FOUND',
      }),
    });

    await expect(getUser('999')).rejects.toThrow(UserNotFoundError);
  });

  it('应该抛出 ServerError', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        code: 'SERVER_ERROR',
      }),
    });

    await expect(getUser('1')).rejects.toThrow(ServerError);
  });
});
```

## 关键点总结

### 1. 重构原则

- 小步重构
- 保持功能不变
- 充分测试

### 2. 改进方向

- 提高可读性
- 提高可维护性
- 提高性能
- 增强功能

### 3. 重构步骤

1. 分析代码
2. 识别问题
3. 提出方案
4. 执行重构
5. 测试验证

---

更多示例：[添加新功能](feature)
