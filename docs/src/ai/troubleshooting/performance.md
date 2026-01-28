# 性能优化

优化 Claude Code 的性能和响应速度。

## 响应速度优化

### 1. 减少上下文大小

```bash
# 只包含必要的文件
claude-code ask --context ./src/components/UserProfile.tsx "优化这个组件"

# 排除不必要的目录
# .claude-ignore
node_modules/
dist/
build/
```

### 2. 使用合适的模型

```bash
# 简单任务使用快速模型
export CLAUDE_CODE_MODEL="claude-3-haiku-20240307"

# 复杂任务使用高质量模型
export CLAUDE_CODE_MODEL="claude-3-opus-20240229"

# 默认使用平衡模型
export CLAUDE_CODE_MODEL="claude-3-sonnet-20240229"
```

### 3. 减少 Token 数量

```bash
# 限制响应长度
export CLAUDE_CODE_MAX_TOKENS="2048"

# 降低温度（更少的随机性）
export CLAUDE_CODE_TEMPERATURE="0.5"
```

## 缓存优化

### 1. 启用缓存

```bash
export CLAUDE_CODE_CACHE_ENABLED="true"
```

### 2. 配置缓存大小

```bash
# 设置缓存大小（MB）
export CLAUDE_CODE_CACHE_SIZE="512"
```

### 3. 清理缓存

```bash
# 手动清理缓存
claude-code cache --clear

# 查看缓存使用情况
claude-code cache --stats
```

## 并发控制

### 1. 限制并发请求数

```bash
export CLAUDE_CODE_MAX_CONCURRENT_REQUESTS="1"
```

### 2. 请求队列

Claude Code 会自动排队多个请求，避免过载。

## 网络优化

### 1. 配置超时

```bash
export CLAUDE_CODE_TIMEOUT="120000"
```

### 2. 重试策略

```bash
export CLAUDE_CODE_MAX_RETRIES="3"
```

### 3. 代理配置

```bash
export HTTP_PROXY="http://proxy.example.com:8080"
export HTTPS_PROXY="http://proxy.example.com:8080"
```

## 内存优化

### 1. 减少内存占用

```bash
# 限制并发请求
export CLAUDE_CODE_MAX_CONCURRENT_REQUESTS="1"

# 清理缓存
claude-code cache --clear
```

### 2. 监控内存使用

```bash
# 查看进程内存
ps aux | grep claude-code

# 或使用系统监控工具
```

## 大项目优化

### 1. 项目分块

将大型项目分成多个小的工作空间：

```bash
claude-code workspace create --name frontend
claude-code workspace create --name backend
```

### 2. 选择性分析

```bash
# 只分析特定目录
claude-code analyze --dir ./src/components
```

### 3. 增量更新

```bash
# 只处理变更的文件
claude-code analyze --changed
```

## VS Code 扩展优化

### 1. 禁用不必要的功能

```json
{
  "claude-code.inlineSuggestions.enabled": false,
  "claude-code.highlighting.enabled": false
}
```

### 2. 调整更新频率

```json
{
  "claude-code.updateInterval": 5000
}
```

## 性能监控

### 1. 查看性能统计

```bash
claude-code stats
```

### 2. 查看日志

```bash
# 查看详细日志
export CLAUDE_CODE_LOG_LEVEL="debug"

# 查看日志文件
cat ~/.claude-code/logs/latest.log
```

## 最佳实践

### 1. 合理使用

- 避免不必要的请求
- 使用缓存
- 选择合适的模型

### 2. 定期维护

- 清理缓存
- 更新版本
- 监控性能

### 3. 优化配置

- 根据硬件调整配置
- 根据项目大小调整策略
- 根据使用习惯调整设置

---

下一步：[网络问题](network)
