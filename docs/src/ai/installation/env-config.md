# 环境变量配置

通过环境变量，您可以灵活配置 Claude Code 的行为和功能。

## 基本环境变量

### ANTHROPIC_API_KEY

**必需**：您的 Anthropic API 密钥

**设置方式**：

```bash
# Linux/macOS
export ANTHROPIC_API_KEY="your-api-key-here"

# Windows (PowerShell)
$env:ANTHROPIC_API_KEY="your-api-key-here"

# Windows (CMD)
set ANTHROPIC_API_KEY=your-api-key-here
```

**获取 API 密钥**：
访问 [Anthropic 控制台](https://console.anthropic.com/) 获取您的 API 密钥。

详细说明请参考 [API密钥配置](api-key)。

### CLAUDE_CODE_HOME

**可选**：Claude Code 的主目录，用于存储配置和缓存

**默认值**：
- Windows: `%USERPROFILE%\.claude-code`
- macOS/Linux: `~/.claude-code`

**设置示例**：
```bash
export CLAUDE_CODE_HOME="/custom/path/.claude-code"
```

### CLAUDE_CODE_LOG_LEVEL

**可选**：日志级别

**可选值**：
- `error`：仅错误
- `warn`：警告及以上
- `info`：信息及以上（默认）
- `debug`：调试信息
- `trace`：详细追踪

**设置示例**：
```bash
export CLAUDE_CODE_LOG_LEVEL="debug"
```

## 网络配置

### HTTP_PROXY / HTTPS_PROXY

**可选**：配置 HTTP/HTTPS 代理

**设置方式**：

```bash
export HTTP_PROXY="http://proxy.example.com:8080"
export HTTPS_PROXY="http://proxy.example.com:8080"

# 带认证
export HTTP_PROXY="http://username:password@proxy.example.com:8080"
export HTTPS_PROXY="http://username:password@proxy.example.com:8080"

# SOCKS5 代理
export HTTP_PROXY="socks5://proxy.example.com:1080"
```

### NO_PROXY

**可选**：代理绕过列表

**设置示例**：
```bash
export NO_PROXY="localhost,127.0.0.1,*.example.com"
```

### CLAUDE_CODE_TIMEOUT

**可选**：API 请求超时时间（秒）

**默认值**：`120`

**设置示例**：
```bash
export CLAUDE_CODE_TIMEOUT="300"
```

### CLAUDE_CODE_MAX_RETRIES

**可选**：API 请求最大重试次数

**默认值**：`3`

**设置示例**：
```bash
export CLAUDE_CODE_MAX_RETRIES="5"
```

## 编辑器配置

### CLAUDE_CODE_EDITOR

**可选**：默认代码编辑器

**可选值**：
- `vscode`：Visual Studio Code（默认）
- `vim`
- `nano`
- `code`
- `custom`

**设置示例**：
```bash
export CLAUDE_CODE_EDITOR="vim"
```

### CLAUDE_CODE_EDITOR_CMD

**可选**：自定义编辑器命令

**设置示例**：
```bash
export CLAUDE_CODE_EDITOR_CMD="/usr/bin/code --wait"
```

## Git 配置

### CLAUDE_CODE_GIT_ENABLED

**可选**：是否启用 Git 集成

**默认值**：`true`

**设置示例**：
```bash
export CLAUDE_CODE_GIT_ENABLED="false"
```

### CLAUDE_CODE_GIT_AUTO_COMMIT

**可选**：是否自动提交

**默认值**：`false`

**设置示例**：
```bash
export CLAUDE_CODE_GIT_AUTO_COMMIT="true"
```

## 缓存配置

### CLAUDE_CODE_CACHE_ENABLED

**可选**：是否启用缓存

**默认值**：`true`

**设置示例**：
```bash
export CLAUDE_CODE_CACHE_ENABLED="false"
```

### CLAUDE_CODE_CACHE_DIR

**可选**：缓存目录

**默认值**：`$CLAUDE_CODE_HOME/cache`

**设置示例**：
```bash
export CLAUDE_CODE_CACHE_DIR="/path/to/cache"
```

### CLAUDE_CODE_CACHE_SIZE

**可选**：缓存大小限制（MB）

**默认值**：`1024`（1GB）

**设置示例**：
```bash
export CLAUDE_CODE_CACHE_SIZE="2048"
```

## 项目配置

### CLAUDE_CODE_DEFAULT_LANGUAGE

**可选**：默认编程语言

**默认值**：`typescript`

**设置示例**：
```bash
export CLAUDE_CODE_DEFAULT_LANGUAGE="python"
```

### CLAUDE_CODE_WORKSPACE

**可选**：默认工作空间目录

**设置示例**：
```bash
export CLAUDE_CODE_WORKSPACE="/path/to/workspace"
```

## AI 行为配置

### CLAUDE_CODE_MODEL

**可选**：使用的 AI 模型

**可选值**：
- `claude-3-sonnet-20240229`（默认）
- `claude-3-opus-20240229`
- `claude-3-haiku-20240307`

**设置示例**：
```bash
export CLAUDE_CODE_MODEL="claude-3-opus-20240229"
```

### CLAUDE_CODE_TEMPERATURE

**可选**：AI 响应的温度（0-1）

**默认值**：`0.7`

**设置示例**：
```bash
export CLAUDE_CODE_TEMPERATURE="0.5"
```

### CLAUDE_CODE_MAX_TOKENS

**可选**：最大响应 token 数

**默认值**：`4096`

**设置示例**：
```bash
export CLAUDE_CODE_MAX_TOKENS="8192"
```

## 安全配置

### CLAUDE_CODE_DISABLE_TELEMETRY

**可选**：禁用遥测数据收集

**默认值**：`false`

**设置示例**：
```bash
export CLAUDE_CODE_DISABLE_TELEMETRY="true"
```

### CLAUDE_CODE_ENCRYPT_CACHE

**可选**：加密缓存数据

**默认值**：`false`

**设置示例**：
```bash
export CLAUDE_CODE_ENCRYPT_CACHE="true"
```

## 持久化环境变量

### Linux/macOS

将环境变量添加到 shell 配置文件：

```bash
# ~/.bashrc 或 ~/.zshrc
export ANTHROPIC_API_KEY="your-api-key-here"
export CLAUDE_CODE_HOME="$HOME/.claude-code"
export CLAUDE_CODE_LOG_LEVEL="info"

# 重新加载配置
source ~/.bashrc  # 或 source ~/.zshrc
```

### Windows

#### PowerShell（当前用户）
```powershell
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', 'your-api-key-here', 'User')
```

#### PowerShell（系统级，需要管理员权限）
```powershell
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', 'your-api-key-here', 'Machine')
```

#### CMD
```cmd
setx ANTHROPIC_API_KEY "your-api-key-here"
```

#### 系统环境变量
1. 右键"此电脑" > "属性"
2. 点击"高级系统设置"
3. 点击"环境变量"
4. 添加或编辑变量

## 项目级别配置

您可以在项目根目录创建 `.env` 文件来覆盖环境变量：

```env
# .env
ANTHROPIC_API_KEY=your-project-api-key
CLAUDE_CODE_MODEL=claude-3-opus-20240229
CLAUDE_CODE_LOG_LEVEL=debug
```

**注意**：确保将 `.env` 添加到 `.gitignore` 以避免泄露敏感信息。

## 验证配置

验证环境变量是否正确设置：

```bash
# Linux/macOS
echo $ANTHROPIC_API_KEY

# Windows (PowerShell)
echo $env:ANTHROPIC_API_KEY

# Windows (CMD)
echo %ANTHROPIC_API_KEY%

# 使用 Claude Code 检查配置
claude-code config --list
```

## 配置优先级

配置的优先级从高到低为：

1. 命令行参数
2. 项目 `.env` 文件
3. 用户环境变量
4. 全局配置文件
5. 默认值

## 常见配置场景

### 开发环境配置
```bash
export CLAUDE_CODE_LOG_LEVEL="debug"
export CLAUDE_CODE_CACHE_ENABLED="true"
export CLAUDE_CODE_GIT_AUTO_COMMIT="false"
```

### 生产环境配置
```bash
export CLAUDE_CODE_LOG_LEVEL="error"
export CLAUDE_CODE_CACHE_ENABLED="true"
export CLAUDE_CODE_GIT_AUTO_COMMIT="true"
```

### 高性能配置
```bash
export CLAUDE_CODE_CACHE_ENABLED="true"
export CLAUDE_CODE_CACHE_SIZE="4096"
export CLAUDE_CODE_TIMEOUT="600"
```

### 安全配置
```bash
export CLAUDE_CODE_DISABLE_TELEMETRY="true"
export CLAUDE_CODE_ENCRYPT_CACHE="true"
```

---

下一步：[API密钥配置](api-key)
