# 添加新功能

本示例演示如何使用 Claude Code 添加新功能。

## 场景描述

为用户管理功能添加"批量导出用户数据"功能。

## 需求分析

功能要求：
- 支持导出为 CSV 和 Excel 格式
- 支持筛选条件导出
- 支持选择字段导出
- 支持分页导出大量数据
- 显示导出进度
- 下载导出文件

## 使用 Claude Code 开发

### 1. 设计数据结构

```bash
claude-code ask "设计批量导出功能的数据结构，包括：
- 导出配置（格式、字段、筛选条件）
- 导出任务（任务ID、状态、进度）
- 导出结果（文件URL、文件大小、创建时间）"
```

### 2. 创建类型定义

```bash
claude-code ask "创建 TypeScript 类型定义：
- ExportConfig
- ExportTask
- ExportResult
- ExportFormat"
```

生成的类型：

```typescript
// src/types/export.ts

export enum ExportFormat {
  CSV = 'csv',
  EXCEL = 'excel',
}

export interface ExportField {
  key: string;
  label: string;
  width?: number;
}

export interface ExportFilter {
  key: string;
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'like';
  value: string | number | boolean;
}

export interface ExportConfig {
  format: ExportFormat;
  fields: ExportField[];
  filters?: ExportFilter[];
  pageSize?: number;
}

export enum ExportTaskStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface ExportTask {
  id: string;
  status: ExportTaskStatus;
  progress: number;
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}

export interface ExportResult {
  taskId: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  createdAt: Date;
}
```

### 3. 创建导出服务

```bash
claude-code ask "创建导出服务 ExportService，包含以下方法：
- exportUsers(config: ExportConfig): 创建导出任务
- getTask(taskId: string): 获取任务状态
- downloadResult(taskId: string): 下载导出文件"
```

生成的服务：

```typescript
// src/services/export.ts
import { ExportConfig, ExportTask, ExportTaskStatus } from '../types/export';

class ExportService {
  private baseUrl = '/api/v1/exports';

  async exportUsers(config: ExportConfig): Promise<string> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error('Failed to create export task');
    }

    const { taskId } = await response.json();
    return taskId;
  }

  async getTask(taskId: string): Promise<ExportTask> {
    const response = await fetch(`${this.baseUrl}/${taskId}`);

    if (!response.ok) {
      throw new Error('Failed to get task status');
    }

    return await response.json();
  }

  async pollTask(taskId: string, interval = 2000): Promise<ExportTask> {
    while (true) {
      const task = await this.getTask(taskId);

      if (task.status !== ExportTaskStatus.PROCESSING) {
        return task;
      }

      await new Promise(resolve => setTimeout(resolve, interval));
    }
  }

  async downloadResult(taskId: string): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/${taskId}/download`);

    if (!response.ok) {
      throw new Error('Failed to download export');
    }

    return await response.blob();
  }
}

export const exportService = new ExportService();
```

### 4. 创建 React Hook

```bash
claude-code ask "创建 useExport Hook，管理导出流程：
- 创建导出任务
- 轮询任务状态
- 处理导出进度
- 下载文件"
```

生成的 Hook：

```typescript
// src/hooks/useExport.ts
import { useState, useCallback } from 'react';
import { ExportConfig, ExportTask } from '../types/export';
import { exportService } from '../services/export';

interface UseExportReturn {
  export: (config: ExportConfig) => Promise<void>;
  task: ExportTask | null;
  isExporting: boolean;
  error: Error | null;
}

export function useExport(): UseExportReturn {
  const [task, setTask] = useState<ExportTask | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const export = useCallback(async (config: ExportConfig) => {
    try {
      setIsExporting(true);
      setError(null);

      // 创建导出任务
      const taskId = await exportService.exportUsers(config);

      // 轮询任务状态
      const completedTask = await exportService.pollTask(taskId);

      setTask(completedTask);

      // 下载文件
      if (completedTask.status === ExportTaskStatus.COMPLETED) {
        const blob = await exportService.downloadResult(taskId);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `export-${taskId}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsExporting(false);
    }
  }, []);

  return { export, task, isExporting, error };
}
```

### 5. 创建导出组件

```bash
claude-code ask "创建 ExportDialog 组件，包含：
- 导出格式选择
- 字段选择（多选）
- 筛选条件设置
- 导出按钮
- 进度显示"
```

生成的组件：

```typescript
// src/components/ExportDialog.tsx
import React, { useState } from 'react';
import { useExport } from '../hooks/useExport';
import { ExportConfig, ExportFormat, ExportField } from '../types/export';

interface ExportDialogProps {
  onClose: () => void;
}

const AVAILABLE_FIELDS: ExportField[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: '姓名' },
  { key: 'email', label: '邮箱' },
  { key: 'role', label: '角色' },
  { key: 'createdAt', label: '创建时间' },
];

export function ExportDialog({ onClose }: ExportDialogProps) {
  const { export, task, isExporting, error } = useExport();
  const [format, setFormat] = useState<ExportFormat>(ExportFormat.CSV);
  const [selectedFields, setSelectedFields] = useState<string[]>(
    AVAILABLE_FIELDS.map(f => f.key)
  );

  const handleExport = async () => {
    const config: ExportConfig = {
      format,
      fields: AVAILABLE_FIELDS.filter(f => selectedFields.includes(f.key)),
    };

    await export(config);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">导出用户数据</h2>

        {/* 格式选择 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">导出格式</label>
          <select
            value={format}
            onChange={e => setFormat(e.target.value as ExportFormat)}
            className="w-full border rounded px-3 py-2"
          >
            <option value={ExportFormat.CSV}>CSV</option>
            <option value={ExportFormat.EXCEL}>Excel</option>
          </select>
        </div>

        {/* 字段选择 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">选择字段</label>
          <div className="space-y-2">
            {AVAILABLE_FIELDS.map(field => (
              <label key={field.key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFields.includes(field.key)}
                  onChange={e => {
                    if (e.target.checked) {
                      setSelectedFields([...selectedFields, field.key]);
                    } else {
                      setSelectedFields(selectedFields.filter(f => f !== field.key));
                    }
                  }}
                  className="mr-2"
                />
                {field.label}
              </label>
            ))}
          </div>
        </div>

        {/* 进度 */}
        {task && (
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">
              导出进度: {task.progress}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* 错误 */}
        {error && (
          <div className="mb-4 text-red-600 text-sm">{error.message}</div>
        )}

        {/* 按钮 */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isExporting}
            className="px-4 py-2 border rounded"
          >
            取消
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting || selectedFields.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {isExporting ? '导出中...' : '导出'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 6. 生成测试

```bash
claude-code generate --template write-test \
  --target ./src/components/ExportDialog.tsx \
  --framework vitest
```

### 7. 生成文档

```bash
claude-code ask "为导出功能生成使用文档"
```

## 关键点总结

### 1. 开发流程

1. 需求分析
2. 设计数据结构
3. 创建类型定义
4. 实现服务层
5. 创建 Hook
6. 创建组件
7. 编写测试
8. 生成文档

### 2. 最佳实践

- 类型安全
- 错误处理
- 用户反馈
- 进度显示

---

返回：[常见任务示例](../examples/react-component)
