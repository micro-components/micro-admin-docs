# 子代理配置

子代理（Agents）是 Claude Code 的高级功能，可以处理特定的、复杂的任务。

## 什么是子代理

子代理是专门化的 AI 助手，每个子代理专注于特定领域：

- **Code Explorer**: 代码探索和分析
- **Code Reviewer**: 代码审查
- **Test Generator**: 测试生成
- **Document Generator**: 文档生成

## 内置子代理

### Code Explorer

用于探索和理解代码库：

```bash
# 启动 Code Explorer 子代理
claude-code agent code-explorer

# 询问代码库结构
"项目的主要模块有哪些？"

# 查找特定功能
"用户认证功能在哪里实现的？"

# 分析依赖关系
"分析模块之间的依赖关系"
```

### Code Reviewer

用于代码审查：

```bash
# 启动 Code Reviewer 子代理
claude-code agent code-reviewer

# 审查代码
"审查这个 Pull Request，提供详细的反馈"

# 检查代码质量
"检查代码是否有安全和性能问题"

# 提供改进建议
"提供重构建议和最佳实践"
```

### Test Generator

用于生成测试：

```bash
# 启动 Test Generator 子代理
claude-code agent test-generator

# 生成单元测试
"为 utils.ts 生成完整的单元测试"

# 生成集成测试
"生成 API 端点的集成测试"

# 生成 E2E 测试
"生成用户登录流程的 E2E 测试"
```

### Document Generator

用于生成文档：

```bash
# 启动 Document Generator 子代理
claude-code agent document-generator

# 生成 API 文档
"为 API 端点生成完整的文档"

# 生成 README
"生成项目的 README 文件"

# 生成组件文档
"为 React 组件生成 JSDoc 注释和使用文档"
```

## 创建自定义子代理

### 子代理配置

在 `.claude-code/agents/` 创建子代理配置：

```json
{
  "name": "my-custom-agent",
  "description": "我的自定义子代理",
  "role": "你是一个专业的前端开发专家，专注于 React 性能优化",
  "capabilities": [
    "分析 React 组件性能",
    "提供优化建议",
    "生成优化后的代码"
  ],
  "tools": ["eslint", "profiler"],
  "prompts": ["analyze-performance.md", "optimize-code.md"]
}
```

### 子代理提示词

**analyze-performance.md**:
```markdown
你是一个 React 性能优化专家。

分析 React 组件的性能问题：
1. 识别不必要的重渲染
2. 找出性能瓶颈
3. 提供优化建议
4. 生成优化后的代码
```

**optimize-code.md**:
```markdown
优化 React 组件代码：
- 使用 React.memo
- 使用 useMemo 和 useCallback
- 优化列表渲染
- 减少组件层级
```

### 创建子代理

```bash
# 创建子代理
claude-code agent create --name performance-expert

# 配置子代理
claude-code agent config --name performance-expert \
  --role "React 性能优化专家" \
  --capabilities "分析性能,提供优化,生成代码"

# 启动子代理
claude-code agent performance-expert
```

## 使用子代理

### 命令行使用

```bash
# 直接启动子代理
claude-code agent <agent-name>

# 带参数启动
claude-code agent code-reviewer --file ./src/components/UserProfile.tsx

# 子代理完成任务
claude-code agent code-explorer --task "查找所有 API 调用"
```

### 在聊天中使用

```bash
# 在聊天中指定子代理
[agent: code-reviewer]
审查这段代码

[agent: test-generator]
为这个函数生成测试

[agent: document-generator]
生成 API 文档
```

### VS Code 扩展中使用

在 VS Code 中，可以通过命令面板或右键菜单调用子代理：

1. 选中代码
2. 右键点击
3. 选择"Claude Code" > "使用子代理"
4. 选择需要的子代理

## 子代理工作流

### Code Review 工作流

```bash
# 1. 启动 Code Reviewer
claude-code agent code-reviewer

# 2. 审查代码
"审查 Pull Request #123"

# 3. 获取反馈
子代理会提供：
- 代码质量评估
- 安全问题检查
- 性能问题识别
- 最佳实践建议

# 4. 应用建议
"应用建议的修复"
```

### 代码重构工作流

```bash
# 1. 启动 Code Explorer
claude-code agent code-explorer

# 2. 分析代码结构
"分析这个文件的结构"

# 3. 启动 Code Reviewer
claude-code agent code-reviewer

# 4. 获取重构建议
"提供重构建议"

# 5. 执行重构
"应用重构方案"
```

## 子代理最佳实践

### 1. 选择合适的子代理

根据任务类型选择最合适的子代理：
- 代码探索 → Code Explorer
- 代码审查 → Code Reviewer
- 测试生成 → Test Generator
- 文档生成 → Document Generator

### 2. 提供清晰的上下文

```bash
# 好的上下文
[agent: code-reviewer]
审查这个 React 组件，关注：
- 性能问题
- 安全问题
- 可维护性

组件代码：
```typescript
...
```
```

### 3. 迭代改进

```bash
# 第一轮：初步审查
[agent: code-reviewer]
审查代码

# 第二轮：应用反馈
[agent: code-reviewer]
应用审查反馈

# 第三轮：最终检查
[agent: code-reviewer]
最终检查代码
```

### 4. 结合使用多个子代理

```bash
# 使用 Code Explorer 理解代码
[agent: code-explorer]
分析代码结构

# 使用 Code Reviewer 审查代码
[agent: code-reviewer]
审查代码质量

# 使用 Test Generator 生成测试
[agent: test-generator]
生成测试
```

---

返回：[高级配置](../advanced/custom-prompts)
