# Spec 快速参考卡片

> 📋 可打印的 Spec 开发流程快速参考指南

---

## 🎯 Spec 状态标签

| 状态 | 标签 | 颜色 | 说明 |
|------|------|------|------|
| Draft | 🟨 | 黄色 | 草稿，待评审 |
| Review | 🟦 | 蓝色 | 评审中 |
| Approved | 🟩 | 绿色 | 已批准，待开发 |
| InProgress | 🟪 | 紫色 | 开发中 |
| Testing | 🟧 | 橙色 | 测试中 |
| Done | ✅ | 绿色 | 已完成 |
| OnHold | ⏸️ | 灰色 | 暂停 |
| Cancelled | ❌ | 红色 | 已取消 |

---

## 📊 Spec 优先级

| 优先级 | 标签 | 响应时间 | 示例 |
|--------|------|----------|------|
| P0 | 🔴 紧急 | 24 小时 | 生产环境 Bug |
| P1 | 🟠 高 | 1 周 | 核心功能 |
| P2 | 🟡 中 | 2 周 | 次要功能 |
| P3 | 🟢 低 | 1 月 | 优化改进 |

---

## 🔄 完整流程

```
需求收集 → 规格编写 → 评审确认 → 开发实现 → 验收检查 → 测试覆盖 → 发布上线 → 归档更新
```

### 快速检查清单

#### ✅ 需求收集
- [ ] 用户故事完整
- [ ] 验收标准明确
- [ ] 可行性评估通过

#### ✅ 规格编写
- [ ] Spec 文档符合模板
- [ ] 技术方案清晰
- [ ] 接口定义完整

#### ✅ 评审确认
- [ ] 内部评审通过
- [ ] 技术评审通过
- [ ] 产品评审通过

#### ✅ 开发实现
- [ ] 功能分支创建
- [ ] 代码实现完成
- [ ] 单元测试通过

#### ✅ 验收检查
- [ ] 代码评审通过
- [ ] 验收标准满足
- [ ] 文档已更新

#### ✅ 测试覆盖
- [ ] 单元测试 ≥ 80%
- [ ] 集成测试通过
- [ ] 性能测试达标

#### ✅ 发布上线
- [ ] 预发布验证通过
- [ ] 回滚方案准备
- [ ] 监控告警配置

#### ✅ 归档更新
- [ ] Spec 归档
- [ ] 文档更新
- [ ] 变更日志更新

---

## 📁 Spec 目录结构

```
docs/specs/
├── templates/        # 模板文件
│   ├── feature-spec.md
│   ├── component-spec.md
│   └── api-spec.md
├── features/         # 功能规格
│   └── FEAT-001-用户认证.md
├── components/       # 组件规格
│   └── COMP-001-表格组件.md
├── apis/             # API 规格
│   └── API-001-用户API.md
├── skills/           # 技能规格
│   └── SKILL-001-文档生成.md
└── backlog/          # 待处理需求
    └── BACKLOG-001-需求.md
```

---

## 🛠️ 常用命令

### Spec 生成

```bash
# 交互式生成
pnpm spec:generate

# 快速生成
pnpm spec:generate --name "用户认证" --type feature --priority P1
```

### Spec 验证

```bash
# 验证所有 Spec
pnpm spec:validate

# 验证单个 Spec
pnpm spec:validate --id FEAT-001
```

### Claude Code 命令

```bash
# 创建新 Spec
/project:new-spec user-auth

# 验证 Spec
/project:validate-spec

# 查看 Spec 状态
/project:spec-status
```

### Git 命令

```bash
# 创建功能分支
git checkout -b feat/FEAT-001-用户认证

# 提交变更
git commit -m "feat(FEAT-001): 实现用户认证功能"

# 推送到远程
git push origin feat/FEAT-001-用户认证
```

---

## 📋 Spec 文档模板结构

```markdown
# Spec: [功能名称]

## 元信息
- **Spec ID**: FEAT-001
- **状态**: Draft
- **优先级**: P1

## 背景与目标
[描述]

## 功能需求
[详细需求]

## 技术方案
[技术设计]

## 实施计划
[任务分解]

## 风险评估
[风险分析]
```

---

## 👥 角色速查

| 角色 | 主要职责 |
|------|----------|
| PM | 需求、用户故事、验收标准 |
| TL | 技术评审、架构指导 |
| DEV | Spec 编写、代码实现 |
| QA | 测试设计、功能验证 |
| CR | 代码评审、质量把控 |

---

## ⚡ 常见问题速查

| 问题 | 解决方案 |
|------|----------|
| 评审不通过 | 修改 Spec，重新评审 |
| 需求变更 | 更新 Spec，重新确认 |
| 状态查询 | 查看 STATUS_BOARD.md |
| 模板获取 | 查看 templates/ 目录 |

---

## 🔗 相关链接

- [完整流程文档](./SPEC_WORKFLOW.md)
- [状态看板](./STATUS_BOARD.md)
- [Claude Code 使用指南](../dev/ai.md)

---

## 📞 快速联系

| 问题类型 | 联系方式 |
|----------|----------|
| 技术问题 | tech-support@example.com |
| 流程问题 | process-team@example.com |
| 产品问题 | product-team@example.com |

---

## 📝 变更日志

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| v1.0.0 | 2024-01-01 | 初始版本 |

---

**打印建议**: 使用 A4 纸张，双面打印，方便携带和查阅。
