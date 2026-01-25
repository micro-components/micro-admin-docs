# Spec 开发文档

MicroAdmin 项目的 Spec（功能规格）开发文档中心。

---

## 📚 文档目录

| 文档 | 描述 | 适用场景 |
|------|------|----------|
| [SPEC_WORKFLOW.md](./SPEC_WORKFLOW.md) | 完整的 Spec 开发流程规范 | 首次使用、深入了解流程 |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | 快速参考卡片（可打印） | 日常开发、快速查阅 |
| [STATUS_BOARD.md](./STATUS_BOARD.md) | Spec 状态看板 | 追踪进度、团队协作 |

---

## 🚀 快速开始

### 1. 创建新 Spec

#### 方式一：使用命令行工具

```bash
# 交互式创建
pnpm spec:generate

# 快速创建
pnpm spec:generate --name "用户认证" --type feature --priority P1
```

#### 方式二：使用 Claude Code

```bash
/project:new-spec user-auth
```

#### 方式三：手动创建

1. 从 `templates/` 目录复制对应模板
2. 填写 Spec 内容
3. 保存到对应目录

### 2. 验证 Spec

```bash
# 验证所有 Spec
pnpm spec:validate

# 验证单个 Spec
pnpm spec:validate --id FEAT-001
```

### 3. 查看状态

```bash
# 查看状态看板
cat docs/specs/STATUS_BOARD.md

# 或使用 Claude Code
/project:spec-status
```

---

## 📁 目录结构

```
docs/specs/
├── README.md                  # 本文件
├── SPEC_WORKFLOW.md           # 完整流程规范
├── QUICK_REFERENCE.md         # 快速参考卡片
├── STATUS_BOARD.md            # 状态看板
├── templates/                 # 模板文件
│   ├── feature-spec.md       # 功能规格模板
│   ├── component-spec.md     # 组件规格模板
│   └── api-spec.md           # API 规格模板
├── features/                  # 功能规格
│   └── FEAT-001-用户认证.md
├── components/                # 组件规格
│   └── COMP-001-表格组件.md
├── apis/                      # API 规格
│   └── API-001-用户API.md
├── skills/                    # 技能规格
│   └── SKILL-001-文档生成.md
└── backlog/                   # 待处理需求
    └── BACKLOG-001-需求.md
```

---

## 🎯 Spec 类型

| 类型 | 目录 | 说明 | 示例 |
|------|------|------|------|
| feature | `features/` | 新功能规格 | FEAT-001-用户认证.md |
| component | `components/` | 组件规格 | COMP-001-表格组件.md |
| api | `apis/` | API 接口规格 | API-001-用户API.md |
| skill | `skills/` | Claude Code 技能规格 | SKILL-001-文档生成.md |
| backlog | `backlog/` | 待处理需求 | BACKLOG-001-需求.md |

---

## 🔄 Spec 开发流程

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

## 🏷️ Spec 状态

| 状态 | 标签 | 说明 |
|------|------|------|
| Draft | 🟨 | 草稿，待评审 |
| Review | 🟦 | 评审中 |
| Approved | 🟩 | 已批准，待开发 |
| InProgress | 🟪 | 开发中 |
| Testing | 🟧 | 测试中 |
| Done | ✅ | 已完成 |
| OnHold | ⏸️ | 暂停 |
| Cancelled | ❌ | 已取消 |

---

## 🛠️ 常用命令

### Spec 管理

```bash
# 生成新 Spec
pnpm spec:generate

# 验证 Spec
pnpm spec:validate

# 更新 Spec 状态
pnpm spec:update-status --id FEAT-001 --status InProgress
```

### Claude Code 命令

```bash
/project:new-spec user-auth
/project:validate-spec
/project:spec-status
```

### Git 工作流

```bash
# 创建功能分支
git checkout -b feat/FEAT-001-用户认证

# 提交变更
git add .
git commit -m "feat(FEAT-001): 添加用户认证功能"

# 推送到远程
git push origin feat/FEAT-001-用户认证

# 创建 Pull Request
gh pr create --title "FEAT-001: 用户认证功能" --body "关联 Spec: FEAT-001"
```

---

## 👥 团队协作

### 角色职责

| 角色 | 主要职责 |
|------|----------|
| 产品经理 | 需求收集、用户故事编写、验收标准定义 |
| 技术负责人 | 技术方案评审、架构设计指导 |
| 开发人员 | Spec 编写、代码实现、单元测试 |
| 测试人员 | 测试用例设计、功能测试、测试报告 |
| 代码评审者 | 代码质量审查、最佳实践指导 |

### 协作建议

1. **及时更新状态**: 完成 Spec 后立即更新状态看板
2. **使用关联**: 在 PR 和 Issue 中关联 Spec ID
3. **保持沟通**: 评审过程中及时讨论问题
4. **记录决策**: 重要决策记录在 Spec 文档中

---

## 📊 质量标准

### Spec 文档质量

- ✅ 需求描述清晰、完整
- ✅ 技术方案可行、合理
- ✅ 验收标准可测试
- ✅ 风险评估全面

### 代码质量

- ✅ 符合代码规范
- ✅ 单元测试覆盖率 ≥ 80%
- ✅ 代码评审通过
- ✅ 无严重安全问题

### 测试质量

- ✅ 测试用例覆盖充分
- ✅ 测试报告完整
- ✅ 严重 Bug 全部修复
- ✅ 性能指标达标

---

## ❓ 常见问题

### Q: 如何创建一个新 Spec?

A: 使用命令 `pnpm spec:generate` 交互式创建，或手动从 `templates/` 目录复制模板。

### Q: Spec 评审需要多长时间?

A: 通常 1-3 个工作日，具体取决于 Spec 的复杂度。

### Q: 开发过程中需求变更怎么办?

A: 更新 Spec 文档，说明变更原因，重新评审确认。

### Q: 如何追踪 Spec 的最新状态?

A: 查看 `STATUS_BOARD.md` 或使用命令 `/project:spec-status`。

### Q: Spec 可以跳过评审直接开发吗?

A: 不可以，所有 Spec 必须经过评审确认后才能进入开发阶段。

---

## 🔗 相关资源

### 内部文档

- [完整流程文档](./SPEC_WORKFLOW.md)
- [快速参考卡片](./QUICK_REFERENCE.md)
- [状态看板](./STATUS_BOARD.md)

### 外部资源

- [Claude Code 使用指南](../dev/ai.md)
- [项目开发指南](../guide/)
- [API 文档](../docs/)

### 工具链接

- [Spec 生成工具](../../scripts/spec-generator.js)
- [GitHub Actions 配置](../../.github/workflows/spec-validation.yml)

---

## 📞 获取帮助

| 问题类型 | 联系方式 |
|----------|----------|
| 流程问题 | process-team@example.com |
| 技术问题 | tech-support@example.com |
| 工具使用 | dev-tools@example.com |

---

## 📝 更新日志

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| v1.0.0 | 2024-01-01 | 初始版本，建立 Spec 开发文档体系 |

---

**文档维护**: MicroAdmin Team
**最后更新**: 2024-01-01
