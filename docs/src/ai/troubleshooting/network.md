# 网络问题

解决 Claude Code 的网络连接问题。

## 连接测试

### 1. 测试 API 连接

```bash
claude-code test-connection
```

### 2. 测试网络

```bash
# 测试 API 端点
ping api.anthropic.com

# 测试端口连通性
telnet api.anthropic.com 443

# 测试 HTTP 连接
curl -I https://api.anthropic.com
```

## 常见网络问题

### 问题 1：连接超时

**错误信息**：
```
Error: Connection timeout
```

**解决方案**：

```bash
# 1. 检查网络连接
ping api.anthropic.com

# 2. 增加超时时间
export CLAUDE_CODE_TIMEOUT="300000"

# 3. 配置代理
export HTTP_PROXY="http://proxy.example.com:8080"
export HTTPS_PROXY="http://proxy.example.com:8080"

# 4. 检查防火墙
# 确保允许访问 api.anthropic.com
```

### 问题 2：DNS 解析失败

**错误信息**：
```
Error: getaddrinfo ENOTFOUND
```

**解决方案**：

```bash
# 1. 检查 DNS 配置
cat /etc/resolv.conf

# 2. 使用公共 DNS
# Linux
echo "nameserver 8.8.8.8" > /etc/resolv.conf

# Windows
netsh interface ip set dns "Ethernet" static 8.8.8.8

# 3. 清除 DNS 缓存
# Windows
ipconfig /flushdns

# macOS
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Linux
sudo systemd-resolve --flush-caches
```

### 问题 3：代理配置问题

**错误信息**：
```
Error: Proxy connection failed
```

**解决方案**：

```bash
# 1. 检查代理设置
echo $HTTP_PROXY
echo $HTTPS_PROXY

# 2. 测试代理
curl -x http://proxy.example.com:8080 https://api.anthropic.com

# 3. 配置代理
export HTTP_PROXY="http://username:password@proxy.example.com:8080"
export HTTPS_PROXY="http://username:password@proxy.example.com:8080"

# 4. 配置 NO_PROXY
export NO_PROXY="localhost,127.0.0.1"
```

### 问题 4：SSL 证书错误

**错误信息**：
```
Error: SSL certificate problem
```

**解决方案**：

```bash
# 1. 更新证书
# macOS
brew install ca-certificates

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install ca-certificates

# CentOS/RHEL
sudo yum update ca-certificates

# 2. 配置公司证书
export NODE_EXTRA_CA_CERTS="/path/to/cert.pem"

# 3. 临时禁用 SSL 验证（不推荐）
export NODE_TLS_REJECT_UNAUTHORIZED="0"
```

### 问题 5：公司防火墙

**问题**：公司防火墙阻止访问

**解决方案**：

```bash
# 1. 配置公司代理
export HTTP_PROXY="http://company-proxy:port"
export HTTPS_PROXY="http://company-proxy:port"

# 2. 使用 VPN

# 3. 联系 IT 部门
# 将 api.anthropic.com 加入白名单
```

## 网络配置优化

### 1. 环境变量配置

```bash
# .bashrc 或 .zshrc
export HTTP_PROXY="http://proxy.example.com:8080"
export HTTPS_PROXY="http://proxy.example.com:8080"
export NO_PROXY="localhost,127.0.0.1,.local"
export CLAUDE_CODE_TIMEOUT="300000"
export CLAUDE_CODE_MAX_RETRIES="5"
```

### 2. 配置文件

```json
// .claude-code/config.json
{
  "proxy": "http://proxy.example.com:8080",
  "timeout": 300000,
  "maxRetries": 5
}
```

### 3. VPN 配置

如果需要使用 VPN：

```bash
# 1. 连接 VPN
# 2. 配置代理（如需要）
# 3. 测试连接
claude-code test-connection
```

## 性能优化

### 1. 减少延迟

```bash
# 使用离你最近的 API 端点
# Claude Code 会自动选择最优端点

# 启用 HTTP/2
# 自动支持
```

### 2. 压缩传输

```bash
# Claude Code 自动使用压缩
# 无需配置
```

## 故障排除流程

### 1. 诊断步骤

```bash
# 1. 测试基础连接
ping api.anthropic.com

# 2. 测试 HTTP 连接
curl -I https://api.anthropic.com

# 3. 测试 Claude Code 连接
claude-code test-connection

# 4. 查看详细日志
export CLAUDE_CODE_LOG_LEVEL="debug"
```

### 2. 收集信息

```bash
# 收集诊断信息
claude-code diagnose

# 查看网络配置
ipconfig /all  # Windows
ifconfig       # macOS/Linux
```

### 3. 获取帮助

如果以上方法都无法解决问题：

1. 查看日志文件
2. 收集诊断信息
3. 联系支持

---

下一步：[调试技巧](debugging)
