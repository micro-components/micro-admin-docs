# 命令: /project:new-spec

创建新的 Spec（功能规格）文档。

---

## 用法

```
/project:new-spec <spec-name>
```

## 参数

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| spec-name | string | 是 | Spec 名称，使用 kebab-case 命名 |

## 示例

```bash
# 创建用户认证 Spec
/project:new-spec user-auth

# 创建订单管理 Spec
/project:new-spec order-management

# 创建数据导出 Spec
/project:new-spec data-export
```

## 功能

1. **Spec ID 自动生成**: 根据类型和现有 Spec 自动分配 ID（如 FEAT-001）
2. **目录自动选择**: 根据类型选择合适的目录（features/, components/, apis/, skills/）
3. **模板应用**: 从 templates/ 目录复制对应的模板文件
4. **元信息填充**: 预填充创建日期、状态等基本信息

## 交互流程

1. 提示用户输入 Spec 名称
2. 提示用户选择 Spec 类型:
   - feature - 新功能规格
   - component - 组件规格
   - api - API 接口规格
   - skill - Claude Code 技能规格
3. 提示用户输入优先级（P0/P1/P2/P3）
4. 提示用户输入负责人
5. 提示用户输入关联 Feature（可选）
6. 自动创建 Spec 文件
7. 提示用户打开文件进行编辑

## 输出示例

```
✓ Spec 已创建: docs/specs/features/FEAT-001-用户认证.md

下一步:
1. 编辑 Spec 文档
2. 填写完整的需求和技术方案
3. 提交评审
```

## 注意事项

- Spec 名称使用 kebab-case（小写字母和连字符）
- Spec ID 自动生成，确保唯一性
- 创建后需要手动填写完整的 Spec 内容
- 记得更新 docs/specs/STATUS_BOARD.md 看板

## 相关命令

- `/project:validate-spec` - 验证 Spec 文档
- `/project:spec-status` - 查看 Spec 状态

## 配置文件

本命令的配置存储在: `.claude/commands/new-spec.md`

## 相关文档

- [Spec 开发流程](../../docs/specs/SPEC_WORKFLOW.md)
- [Spec 快速参考](../../docs/specs/QUICK_REFERENCE.md)
- [Spec 状态看板](../../docs/specs/STATUS_BOARD.md)
