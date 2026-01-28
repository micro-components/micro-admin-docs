# 常见错误

本节列出使用 Claude Code 时可能遇到的常见错误及其解决方案。

## API 相关错误

### 错误 1：API 密钥无效

**错误信息**：
```
Error: Invalid API key
```

**原因**：
- API 密钥不正确
- API 密钥已过期
- API 密钥被撤销

**解决方案**：
1. 检查 API 密钥是否正确复制
2. 在 [Anthropic 控制台](https://console.anthropic.com/) 检查密钥状态
3. 生成新的 API 密钥
4. 更新环境变量

```bash
# 重新设置 API 密钥
export ANTHROPIC_API_KEY="your-new-api-key"

# 验证
claude-code test-connection
```

### 错误 2：配额已用尽

**错误信息**：
```
Error: Quota exceeded
```

**原因**：
- API 使用量超过配额限制

**解决方案**：
1. 在控制台检查使用情况
2. 升级定价计划
3. 等待配额重置
4. 减少请求频率

```bash
# 检查使用情况
claude-code usage
```

### 错误 3：请求超时

**错误信息**：
```
Error: Request timeout
```

**原因**：
- 网络连接问题
- API 响应时间过长
- 请求过于复杂

**解决方案**：
```bash
# 增加超时时间
export CLAUDE_CODE_TIMEOUT="300"

# 检查网络连接
ping api.anthropic.com

# 简化请求
# 减少上下文大小
# 减少输出 token 数量
```

## 配置相关错误

### 错误 4：配置文件格式错误

**错误信息**：
```
Error: Invalid configuration file format
```

**原因**：
- JSON 格式错误
- 配置文件路径错误

**解决方案**：
```bash
# 验证 JSON 格式
cat ~/.claude-code/config.json | jq .

# 或使用在线 JSON 验证工具

# 检查文件路径
claude-code config --list
```

### 错误 5：环境变量未设置

**错误信息**：
```
Error: ANTHROPIC_API_KEY is not set
```

**解决方案**：
```bash
# 设置环境变量
export ANTHROPIC_API_KEY="your-api-key"

# 持久化（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export ANTHROPIC_API_KEY="your-api-key"' >> ~/.bashrc
source ~/.bashrc

# Windows PowerShell
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', 'your-api-key', 'User')
```

## VS Code 扩展错误

### 错误 6：扩展无法加载

**错误信息**：
```
Extension activation failed
```

**原因**：
- VS Code 版本不兼容
- 扩展文件损坏
- 依赖项缺失

**解决方案**：
```bash
# 检查 VS Code 版本
code --version

# 更新 VS Code
# 或重新安装扩展

code --uninstall-extension anthropic.claude-code
code --install-extension anthropic.claude-code
```

### 错误 7：无法连接到 Claude

**错误信息**：
```
Cannot connect to Claude API
```

**解决方案**：
1. 检查网络连接
2. 检查 API 密钥配置
3. 配置代理（如需要）
4. 查看扩展日志

```bash
# 查看 VS Code 输出日志
# 打开"查看 > 输出"
# 选择"Claude Code"通道
```

## 代码生成错误

### 错误 8：生成的代码不完整

**问题**：Claude Code 生成的代码缺少部分实现

**解决方案**：
```bash
# 请求完整的实现
请提供完整的代码实现，不要省略任何部分

# 分步生成
第一步：先创建类型定义
第二步：再实现组件逻辑
```

### 错误 9：生成的代码有语法错误

**问题**：生成代码无法编译或运行

**解决方案**：
```bash
# 检查代码
让 Claude Code 检查代码语法和错误

# 运行 lint
npm run lint

# 请求修复
请修复代码中的语法错误
```

### 错误 10：生成的代码不符合项目风格

**问题**：代码风格与项目不一致

**解决方案**：
```bash
# 在提示词中指定风格
请按照项目编码规范创建代码：
- 使用函数组件
- Props 使用 interface
- 遵循 ESLint 和 Prettier 配置

# 或配置项目规则
claude-code rules create --name style-guide
```

## 性能问题

### 问题 11：响应缓慢

**原因**：
- 网络速度慢
- 请求上下文过大
- API 负载高

**解决方案**：
```bash
# 减少上下文
只包含必要的文件

# 使用更快的模型
export CLAUDE_CODE_MODEL="claude-3-haiku-20240307"

# 减少 token 限制
export CLAUDE_CODE_MAX_TOKENS="2048"

# 启用缓存
export CLAUDE_CODE_CACHE_ENABLED="true"
```

### 问题 12：内存占用过高

**原因**：
- 缓存文件过大
- 同时处理多个大文件

**解决方案**：
```bash
# 清理缓存
claude-code cache --clear

# 限制缓存大小
export CLAUDE_CODE_CACHE_SIZE="256"

# 减少并发请求
export CLAUDE_CODE_MAX_CONCURRENT_REQUESTS="1"
```

## 项目相关错误

### 错误 13：无法识别项目类型

**错误信息**：
```
Error: Unable to detect project type
```

**解决方案**：
```bash
# 手动指定项目类型
claude-code init --type react

# 或在配置文件中指定
# .claude-code.json
{
  "type": "frontend",
  "framework": "react",
  "language": "typescript"
}
```

### 错误 14：规则应用失败

**错误信息**：
```
Error: Failed to apply rules
```

**解决方案**：
```bash
# 检查规则文件
claude-code rules list

# 验证规则格式
claude-code rules validate --name my-rule

# 重新加载规则
claude-code rules reload
```

## 网络问题

### 错误 15：代理连接失败

**错误信息**：
```
Error: Proxy connection failed
```

**解决方案**：
```bash
# 检查代理配置
echo $HTTP_PROXY
echo $HTTPS_PROXY

# 测试代理
curl -x http://proxy.example.com:8080 https://api.anthropic.com

# 重新配置代理
export HTTP_PROXY="http://proxy.example.com:8080"
export HTTPS_PROXY="http://proxy.example.com:8080"
```

### 错误 16：SSL 证书错误

**错误信息**：
```
Error: SSL certificate problem
```

**解决方案**：
```bash
# 更新证书（Linux）
sudo apt-get update && sudo apt-get install ca-certificates

# 临时禁用 SSL 验证（不推荐生产环境）
export NODE_TLS_REJECT_UNAUTHORIZED="0"

# 配置公司代理证书
export NODE_EXTRA_CA_CERTS="/path/to/cert.pem"
```

## 获取帮助

如果以上解决方案都无法解决问题：

### 1. 运行诊断

```bash
# 完整诊断
claude-code diagnose

# 检查配置
claude-code config --check

# 测试连接
claude-code test-connection
```

### 2. 查看日志

```bash
# 查看日志文件
cat ~/.claude-code/logs/latest.log

# 启用详细日志
export CLAUDE_CODE_LOG_LEVEL="debug"
```

### 3. 收集信息

在报告问题时，提供以下信息：

```bash
# 系统信息
claude-code --version
node --version
npm --version

# 操作系统
# Windows: systeminfo
# macOS: sw_vers
# Linux: cat /etc/os-release

# 配置信息
claude-code config --list

# 错误日志
cat ~/.claude-code/logs/latest.log
```

### 4. 获取支持

- [GitHub Issues](https://github.com/anthropics/claude-code/issues)
- [Anthropic 支持中心](https://support.anthropic.com/)
- [Discord 社区](https://discord.gg/anthropic)

---

下一步：[性能优化](performance)
