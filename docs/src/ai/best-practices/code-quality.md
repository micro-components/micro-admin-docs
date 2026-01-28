# 代码质量保证

使用 Claude Code 确保代码质量的最佳实践。

## 代码审查

### 自动代码审查

```bash
# 启动代码审查
claude-code agent code-reviewer

# 审查特定文件
claude-code agent code-reviewer --file ./src/components/UserProfile.tsx

# 审查整个项目
claude-code agent code-reviewer --project
```

### 审查检查清单

Claude Code 可以基于以下标准审查代码：

- **代码风格**：遵循项目编码规范
- **可读性**：代码清晰易懂
- **可维护性**：易于修改和扩展
- **性能**：高效的算法和数据结构
- **安全性**：没有安全漏洞
- **测试覆盖**：充分的单元测试

## 静态分析

### ESLint 集成

```bash
# 配置 ESLint
claude-code ask "配置 ESLint，包含：
- TypeScript 规则
- React 规则
- 安全规则"

# 自动修复
claude-code ask "运行 ESLint 并自动修复问题"
```

### TypeScript 类型检查

```bash
# 严格类型检查
claude-code ask "启用 TypeScript 严格模式并修复所有类型错误"

# 生成类型定义
claude-code ask "为现有代码添加完整的 TypeScript 类型定义"
```

## 测试

### 单元测试

```bash
# 生成单元测试
claude-code generate --template write-test \
  --target ./src/utils/api.ts \
  --framework vitest

# 提高测试覆盖率
claude-code ask "为未覆盖的代码生成测试，目标覆盖率 90%"
```

### 集成测试

```bash
# 生成集成测试
claude-code ask "为 API 端点生成集成测试"
```

### E2E 测试

```bash
# 生成 E2E 测试
claude-code ask "使用 Cypress 生成用户登录流程的 E2E 测试"
```

## 性能优化

### 代码性能分析

```bash
# 分析性能瓶颈
claude-code ask "分析这段代码的性能瓶颈"

# 提供优化建议
claude-code ask "提供性能优化建议和实现方案"
```

### React 性能优化

```bash
# 优化 React 组件
claude-code ask "使用 React.memo、useMemo 和 useCallback 优化组件性能"

# 虚拟化长列表
claude-code ask "为长列表实现虚拟滚动"
```

## 安全检查

### 安全漏洞扫描

```bash
# 检查安全漏洞
claude-code ask "扫描代码中的安全漏洞，包括：
- XSS 漏洞
- SQL 注入
- 命令注入
- 不安全的依赖"
```

### 敏感信息检查

```bash
# 检查敏感信息泄露
claude-code ask "检查代码中是否泄露了：
- API 密钥
- 密码
- 凭证
- 敏感数据"
```

## 代码重构

### 识别代码异味

```bash
# 检测代码异味
claude-code ask "识别代码中的异味，包括：
- 重复代码
- 过长函数
- 过长类
- 过度耦合"
```

### 重构建议

```bash
# 获取重构建议
claude-code ask "提供重构建议，包括：
- 提取函数
- 简化逻辑
- 改进结构"
```

## 文档质量

### 代码注释

```bash
# 添加 JSDoc 注释
claude-code ask "为所有导出函数添加完整的 JSDoc 注释"

# 添加行内注释
claude-code ask "为复杂逻辑添加解释性注释"
```

### API 文档

```bash
# 生成 API 文档
claude-code ask "为 API 端点生成完整的文档"
```

## 持续质量监控

### CI/CD 集成

```bash
# 创建 CI 配置
claude-code ask "创建 GitHub Actions，包含：
- Lint 检查
- 类型检查
- 测试运行
- 代码审查"
```

### 质量报告

```bash
# 生成质量报告
claude-code ask "生成代码质量报告，包括：
- 测试覆盖率
- 技术债务
- 代码复杂度
- 安全风险"
```

## 最佳实践

### 1. 持续集成

```bash
# 每次 commit 都运行检查
- Lint 检查
- 类型检查
- 单元测试
```

### 2. Code Review 流程

```bash
# 所有代码必须经过审查
1. 提交 PR
2. Claude Code 自动审查
3. 人工审查
4. 修复问题
5. 合并
```

### 3. 定期重构

```bash
# 定期重构代码
- 识别技术债务
- 制定重构计划
- 执行重构
- 测试验证
```

---

下一步：[效率提升技巧](efficiency)
