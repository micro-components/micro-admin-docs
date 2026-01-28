# 调试技巧

使用调试技巧解决 Claude Code 的问题。

## 启用调试模式

### 1. 设置日志级别

```bash
# 启用调试日志
export CLAUDE_CODE_LOG_LEVEL="debug"

# 启用详细日志
export CLAUDE_CODE_LOG_LEVEL="trace"
```

### 2. 查看日志

```bash
# 查看最新日志
cat ~/.claude-code/logs/latest.log

# 实时查看日志
tail -f ~/.claude-code/logs/latest.log

# 查看所有日志
ls ~/.claude-code/logs/
```

## 诊断工具

### 1. 系统诊断

```bash
# 运行完整诊断
claude-code diagnose

# 诊断输出示例：
System Information:
- OS: Windows 11
- Node.js: v18.16.0
- Claude Code: v1.2.3

Network:
- Connection: OK
- API Endpoint: api.anthropic.com
- Latency: 150ms

Configuration:
- API Key: ✓ Valid
- Model: claude-3-sonnet-20240229
- Cache: Enabled
```

### 2. 连接测试

```bash
# 测试 API 连接
claude-code test-connection

# 输出示例：
✓ API connection successful
✓ Authentication verified
✓ Model available: claude-3-sonnet-20240229
✓ Response time: 1.2s
```

### 3. 配置检查

```bash
# 检查配置
claude-code config --check

# 输出示例：
✓ API Key configured
✓ Model configured
✓ Cache enabled
✓ All configurations valid
```

## 常见问题调试

### 问题 1：API 调用失败

**调试步骤**：

```bash
# 1. 检查 API 密钥
echo $ANTHROPIC_API_KEY

# 2. 测试连接
claude-code test-connection

# 3. 查看日志
tail -f ~/.claude-code/logs/latest.log

# 4. 检查网络
ping api.anthropic.com
```

### 问题 2：代码生成不完整

**调试步骤**：

```bash
# 1. 检查 token 限制
echo $CLAUDE_CODE_MAX_TOKENS

# 2. 增加限制
export CLAUDE_CODE_MAX_TOKENS="8192"

# 3. 检查网络速度
ping api.anthropic.com

# 4. 查看日志查找中断原因
grep "timeout" ~/.claude-code/logs/latest.log
```

### 问题 3：性能问题

**调试步骤**：

```bash
# 1. 查看性能统计
claude-code stats

# 2. 检查缓存
claude-code cache --stats

# 3. 检查并发请求
echo $CLAUDE_CODE_MAX_CONCURRENT_REQUESTS

# 4. 查看系统资源
# Windows
tasklist

# macOS/Linux
top
```

## VS Code 扩展调试

### 1. 查看扩展日志

1. 打开 VS Code
2. 按 `Ctrl+Shift+P`（或 `Cmd+Shift+P`）
3. 输入 "Output: Show Output Channels"
4. 选择 "Claude Code"

### 2. 开发者工具

1. 按 `Ctrl+Shift+I`（或 `Cmd+Option+I`）
2. 打开开发者工具
3. 查看 Console 和 Network 标签

### 3. 扩展设置

```json
{
  "claude-code.advanced.debugMode": true,
  "claude-code.advanced.logLevel": "debug"
}
```

## 性能分析

### 1. 响应时间分析

```bash
# 查看响应时间
claude-code stats --detailed

# 输出示例：
Response Time:
- Average: 1.5s
- Median: 1.2s
- P95: 2.8s
- P99: 3.5s
```

### 2. 内存使用分析

```bash
# 查看内存使用
claude-code stats --memory

# 输出示例：
Memory Usage:
- Current: 256MB
- Peak: 512MB
- Cache: 128MB
```

### 3. 缓存效率

```bash
# 查看缓存效率
claude-code cache --efficiency

# 输出示例：
Cache Efficiency:
- Hit Rate: 85%
- Miss Rate: 15%
- Size: 256MB
- Entries: 1,234
```

## 日志分析

### 1. 搜索错误

```bash
# 搜索错误日志
grep "ERROR" ~/.claude-code/logs/latest.log

# 搜索警告
grep "WARN" ~/.claude-code/logs/latest.log

# 搜索特定错误
grep "timeout" ~/.claude-code/logs/latest.log
```

### 2. 日志模式分析

```bash
# 统计错误数量
grep -c "ERROR" ~/.claude-code/logs/latest.log

# 查看最近的错误
grep "ERROR" ~/.claude-code/logs/latest.log | tail -10
```

### 3. 日志导出

```bash
# 导出日志
claude-code logs --export logs.zip

# 分享日志用于支持
```

## 崩溃恢复

### 1. 检查崩溃日志

```bash
# 查看崩溃日志
cat ~/.claude-code/logs/crash.log
```

### 2. 重新初始化

```bash
# 重置配置
claude-code config --reset

# 重新初始化
claude-code init
```

### 3. 清理并重装

```bash
# 清理缓存
claude-code cache --clear

# 重新安装
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code
```

## 最佳实践

### 1. 定期检查

```bash
# 定期运行诊断
claude-code diagnose

# 定期清理缓存
claude-code cache --clear
```

### 2. 监控性能

```bash
# 监控响应时间
claude-code stats

# 监控资源使用
# 使用系统监控工具
```

### 3. 保留日志

```bash
# 导出重要日志
claude-code logs --export backup.zip
```

---

返回：[故障排除](../troubleshooting/common-errors)
