# 编写测试用例

本示例演示如何使用 Claude Code 为现有代码编写测试用例。

## 场景描述

为 `formatDate` 工具函数编写完整的测试用例。

## 原始代码

```typescript
// src/utils/format.ts
export function formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}
```

## 使用 Claude Code 生成测试

### 方法 1：使用模板

```bash
claude-code generate --template write-test \
  --target ./src/utils/format.ts \
  --framework vitest \
  --coverage 100
```

### 方法 2：自然语言描述

```bash
claude-code ask
```

在聊天中输入：

```
为 formatDate 函数编写完整的测试用例，包括：

1. 默认格式测试（YYYY-MM-DD）
2. 自定义格式测试（YYYY-MM-DD HH:mm:ss）
3. 字符串日期输入
4. Date 对象输入
5. 边缘情况：
   - 闰年日期（2024-02-29）
   - 月末日期（2024-01-31）
   - 年末日期（2024-12-31）
   - 年初日期（2024-01-01）
6. 无效日期处理

使用 Vitest 测试框架
```

## 生成的测试代码

```typescript
// src/utils/format.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate } from './format';

describe('formatDate', () => {
  describe('默认格式 (YYYY-MM-DD)', () => {
    it('应该格式化日期为 YYYY-MM-DD', () => {
      const date = new Date(2024, 0, 15);
      expect(formatDate(date)).toBe('2024-01-15');
    });

    it('应该正确格式化闰年日期', () => {
      const date = new Date(2024, 1, 29);
      expect(formatDate(date)).toBe('2024-02-29');
    });
  });

  describe('自定义格式', () => {
    it('应该支持完整日期时间格式', () => {
      const date = new Date(2024, 0, 15, 14, 30, 45);
      expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2024-01-15 14:30:45');
    });

    it('应该支持部分格式', () => {
      const date = new Date(2024, 0, 15, 14, 30, 45);
      expect(formatDate(date, 'HH:mm:ss')).toBe('14:30:45');
    });
  });

  describe('输入类型', () => {
    it('应该接受 Date 对象', () => {
      const date = new Date(2024, 0, 15);
      expect(formatDate(date)).toBe('2024-01-15');
    });

    it('应该接受字符串日期', () => {
      expect(formatDate('2024-01-15')).toBe('2024-01-15');
    });

    it('应该接受 ISO 字符串', () => {
      expect(formatDate('2024-01-15T14:30:00.000Z')).toBe('2024-01-15');
    });
  });

  describe('边缘情况', () => {
    it('应该正确处理闰年 2 月 29 日', () => {
      const date = new Date(2024, 1, 29);
      expect(formatDate(date)).toBe('2024-02-29');
    });

    it('应该正确处理月末日期', () => {
      expect(formatDate(new Date(2024, 0, 31))).toBe('2024-01-31');
      expect(formatDate(new Date(2024, 3, 30))).toBe('2024-04-30');
    });

    it('应该正确处理年末日期', () => {
      expect(formatDate(new Date(2024, 11, 31))).toBe('2024-12-31');
    });

    it('应该正确处理年初日期', () => {
      expect(formatDate(new Date(2024, 0, 1))).toBe('2024-01-01');
    });

    it('应该正确处理时间补零', () => {
      const date = new Date(2024, 0, 1, 9, 5, 3);
      expect(formatDate(date, 'HH:mm:ss')).toBe('09:05:03');
    });
  });

  describe('无效日期', () => {
    it('应该处理无效字符串日期', () => {
      expect(() => formatDate('invalid-date')).not.toThrow();
      const result = formatDate('invalid-date');
      expect(result).toBeDefined();
    });

    it('应该处理无效 Date 对象', () => {
      const result = formatDate(new Date(NaN));
      expect(result).toBeDefined();
    });
  });
});
```

## 测试覆盖率报告

运行测试并生成覆盖率报告：

```bash
npm run test:coverage
```

输出示例：

```
 % Coverage report from v8

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   100   |    100   |   100   |   100   |
 format.ts|   100   |    100   |   100   |   100   |
----------|---------|----------|---------|---------|-------------------
```

## 关键点总结

### 1. 测试组织

- 使用 `describe` 分组相关测试
- 使用有意义的测试名称
- 遵循 AAA 模式

### 2. 测试覆盖

- 正常路径测试
- 边缘情况测试
- 错误处理测试
- 不同输入类型测试

### 3. 断言

- 使用具体的断言
- 避免模糊的断言
- 验证关键行为

### 4. 可维护性

- 测试易于理解
- 测试易于修改
- 测试易于扩展

---

更多示例：[重构代码](refactor)
