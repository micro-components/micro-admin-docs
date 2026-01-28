# API 密钥配置

API 密钥是使用 Claude Code 的必需配置，本指南将详细介绍如何获取、配置和管理您的 API 密钥。

## 获取 API 密钥

### 1. 注册 Anthropic 账户

如果您还没有 Anthropic 账户，需要先注册：

1. 访问 [Anthropic 控制台](https://console.anthropic.com/)
2. 点击"Sign up"或"创建账户"
3. 填写注册信息
4. 验证邮箱地址
5. 完成注册流程

### 2. 创建 API 密钥

登录后，创建您的 API 密钥：

1. 登录 [Anthropic 控制台](https://console.anthropic.com/)
2. 进入"API Keys"或"密钥"部分
3. 点击"Create Key"或"创建密钥"
4. 为密钥设置一个描述性名称（如"我的开发机"、"项目X"）
5. 选择密钥的权限范围（如适用）
6. 点击"Create"或"创建"
7. **重要**：立即复制生成的密钥，因为只会显示一次！

### 3. 选择合适的定价计划

在控制台中，您可以选择适合您的定价计划：

- **免费试用**：新用户通常有免费试用额度
- **按量付费**：根据使用量付费
- **企业方案**：联系销售获取定制方案

## 配置 API 密钥

### 方法 1：环境变量（推荐）

将 API 密钥设置为环境变量：

```bash
# Linux/macOS
export ANTHROPIC_API_KEY="your-api-key-here"

# Windows PowerShell
$env:ANTHROPIC_API_KEY="your-api-key-here"

# Windows CMD
set ANTHROPIC_API_KEY=your-api-key-here
```

**持久化配置**：

```bash
# Linux/macOS - 添加到 ~/.bashrc 或 ~/.zshrc
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc

# Windows PowerShell - 为当前用户设置
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', 'your-api-key-here', 'User')

# Windows CMD
setx ANTHROPIC_API_KEY "your-api-key-here"
```

详细说明请参考 [环境变量配置](env-config)。

### 方法 2：配置文件

Claude Code 也支持通过配置文件设置 API 密钥。

#### 全局配置文件

在 `~/.claude-code/config.json`（或 `%USERPROFILE%\.claude-code\config.json`）创建配置：

```json
{
  "apiKey": "your-api-key-here",
  "model": "claude-3-sonnet-20240229"
}
```

#### 项目配置文件

在项目根目录创建 `.claude-code.json`：

```json
{
  "apiKey": "your-project-api-key",
  "model": "claude-3-opus-20240229"
}
```

**注意**：不要将包含 API 密钥的配置文件提交到版本控制系统。

### 方法 3：命令行参数

某些操作支持直接通过命令行传递 API 密钥：

```bash
claude-code --api-key your-api-key-here
```

**安全提示**：这种方法不推荐用于日常使用，因为 API 密钥会出现在命令历史和进程列表中。

## API 密钥安全

### 安全最佳实践

1. **不要在代码中硬编码**
   ```javascript
   // ❌ 错误
   const apiKey = "sk-ant-api03-...";

   // ✅ 正确
   const apiKey = process.env.ANTHROPIC_API_KEY;
   ```

2. **使用环境变量或配置文件**
   - 环境变量是最安全的方式
   - 配置文件应添加到 `.gitignore`

3. **限制密钥权限**
   - 为不同的环境使用不同的密钥
   - 根据需要设置适当的权限范围
   - 定期轮换密钥

4. **监控使用情况**
   - 定期查看 API 使用统计
   - 设置用量警报
   - 监控异常使用模式

5. **定期轮换密钥**
   - 每隔一段时间更换密钥
   - 在怀疑密钥泄露时立即更换

### Git 安全

确保 API 密钥不会被提交到 Git：

```bash
# 添加到 .gitignore
echo ".claude-code.json" >> .gitignore
echo ".env" >> .gitignore
echo "claude-code.env" >> .gitignore

# 提交 .gitignore
git add .gitignore
git commit -m "Add Claude Code config to gitignore"
```

### 检查是否已泄露

如果担心密钥可能已泄露：

1. 立即在控制台中撤销该密钥
2. 生成新的密钥
3. 更新所有使用该密钥的位置
4. 使用工具检查代码历史是否包含密钥

## API 密钥管理

### 多环境配置

为不同的环境使用不同的密钥：

```bash
# 开发环境
export ANTHROPIC_API_KEY="dev-key-here"

# 测试环境
export ANTHROPIC_API_KEY="test-key-here"

# 生产环境
export ANTHROPIC_API_KEY="prod-key-here"
```

使用 `.env` 文件管理：

```env
# .env.development
ANTHROPIC_API_KEY=dev-key-here

# .env.production
ANTHROPIC_API_KEY=prod-key-here
```

### 团队共享

在团队中使用 API 密钥时：

1. **不要直接共享密钥**
   - 每个人应该有自己的账户和密钥
   - 使用组织账户进行统一管理

2. **使用密钥管理服务**
   - HashiCorp Vault
   - AWS Secrets Manager
   - Azure Key Vault
   - Google Secret Manager

3. **CI/CD 配置**
   - 在 CI/CD 平台的环境变量中配置
   - 不要在配置文件或脚本中硬编码
   - 使用加密 secrets 功能

### 密钥轮换

定期轮换 API 密钥：

1. 在控制台中创建新密钥
2. 更新所有使用该密钥的位置
3. 测试新密钥是否正常工作
4. 撤销旧密钥

```bash
# 验证新密钥
claude-code test-connection --api-key new-api-key

# 如果正常，更新环境变量
export ANTHROPIC_API_KEY="new-api-key"
```

## 验证配置

测试 API 密钥是否配置正确：

```bash
# 测试连接
claude-code test-connection

# 查看当前配置
claude-code config --list

# 验证 API 密钥
claude-code verify --api-key your-api-key-here
```

成功输出示例：
```
✓ API connection successful
✓ Authentication verified
✓ Model available: claude-3-sonnet-20240229
```

## 故障排除

### API 密钥无效

**错误信息**：
```
Error: Invalid API key
```

**解决方案**：
1. 检查密钥是否正确复制（没有多余的空格）
2. 确认密钥是否被撤销
3. 检查密钥是否已过期
4. 重新生成密钥并更新配置

### 配额已用尽

**错误信息**：
```
Error: Quota exceeded
```

**解决方案**：
1. 在控制台中检查使用情况
2. 升级定价计划
3. 等待配额重置

### 网络连接问题

**错误信息**：
```
Error: Connection timeout
```

**解决方案**：
1. 检查网络连接
2. 配置代理（参考 [环境变量配置](env-config)）
3. 检查防火墙设置

### 权限不足

**错误信息**：
```
Error: Permission denied
```

**解决方案**：
1. 检查密钥权限范围
2. 确认账户状态
3. 联系支持

## 成本管理

### 查看使用情况

在 [Anthropic 控制台](https://console.anthropic.com/) 查看：
- API 调用次数
- Token 使用量
- 费用统计
- 使用趋势

### 设置预算警报

在控制台中配置用量和费用警报：
- 每日/每月用量上限
- 费用阈值警报
- 异常使用通知

### 优化成本

1. **选择合适的模型**
   - Claude 3 Haiku 更便宜
   - Claude 3 Opus 更强大
   - 根据需求选择

2. **缓存结果**
   - 启用缓存减少重复请求
   - 配置缓存策略

3. **优化提示词**
   - 使用简洁的提示词
   - 限制响应长度
   - 批量处理请求

---

需要帮助？查看 [常见安装问题](troubleshooting)。

下一步：[项目初始化](../basic/project-init)
