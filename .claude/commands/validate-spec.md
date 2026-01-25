# 命令: /project:validate-spec

验证 Spec 文档的完整性和规范性。

---

## 用法

```
/project:validate-spec [spec-id]
```

## 参数

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| spec-id | string | 否 | Spec ID（如 FEAT-001），不指定则验证所有 Spec |

## 示例

```bash
# 验证所有 Spec
/project:validate-spec

# 验证单个 Spec
/project:validate-spec FEAT-001

# 验证指定类型的 Spec
/project:validate-spec --type feature
```

## 验证项目

### 1. 元信息检查

- [ ] Spec ID 格式正确（FEAT-XXX, COMP-XXX, API-XXX, SKILL-XXX）
- [ ] 创建日期格式正确（YYYY-MM-DD）
- [ ] 负责人格式正确（@username）
- [ ] 优先级有效（P0/P1/P2/P3）
- [ ] 状态有效（Draft/Review/Approved/InProgress/Testing/Done/OnHold/Cancelled）

### 2. 文档结构检查

- [ ] 包含所有必需章节
- [ ] 章节顺序正确
- [ ] 标题层级正确

### 3. 内容完整性检查

- [ ] 背景与目标章节完整
- [ ] 功能需求清晰
- [ ] 技术方案详细
- [ ] 实施计划明确
- [ ] 风险评估全面

### 4. 规范性检查

- [ ] Markdown 格式正确
- [ ] 代码块指定语言
- [ ] 表格格式正确
- [ ] 链接有效

### 5. 质量检查

- [ ] 描述清晰无歧义
- [ ] 验收标准可测试
- [ ] 技术方案可行
- [ ] 任务分解合理

## 输出示例

### 验证成功

```
✓ 所有 Spec 验证通过

验证的 Spec:
- FEAT-001: 用户认证 ✓
- FEAT-002: 订单管理 ✓
- COMP-001: 表格组件 ✓

总计: 3 个 Spec 全部通过
```

### 验证失败

```
✗ 发现问题

FEAT-001: 用户认证
  ✗ 元信息: 创建日期格式错误
  ✗ 功能需求: 用户故事验收标准不完整
  ✗ 技术方案: 接口定义缺失

COMP-001: 表格组件
  ✗ 文档结构: 缺少测试计划章节

总计: 2 个 Spec，5 个问题
```

## 修复建议

根据验证结果，提供具体的修复建议：

```
FEAT-001 需要修复:

1. 元信息问题:
   - 将创建日期从 "2024/01/01" 改为 "2024-01-01"

2. 功能需求问题:
   - 为用户故事添加完整的验收标准
   - 示例: ✓ 标准 1
          ✓ 标准 2

3. 技术方案问题:
   - 补充完整的接口定义
   - 包括请求参数、响应格式、错误码

参考模板: docs/specs/templates/feature-spec.md
```

## 相关命令

- `/project:new-spec` - 创建新 Spec
- `/project:spec-status` - 查看 Spec 状态

## 配置文件

本命令的配置存储在: `.claude/commands/validate-spec.md`

## 相关文档

- [Spec 开发流程](../../docs/specs/SPEC_WORKFLOW.md)
- [Spec 快速参考](../../docs/specs/QUICK_REFERENCE.md)
- [Spec 状态看板](../../docs/specs/STATUS_BOARD.md)
- [Spec 模板](../../docs/specs/templates/)
