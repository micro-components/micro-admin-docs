# 常见安装问题

本节列出安装 Claude Code 时可能遇到的问题及其解决方案。

## 安装失败

### 问题：npm 安装失败

**错误信息**：
```
npm ERR! code EACCES
npm ERR! errno -13
```

**解决方案**：

1. **使用 sudo（Linux/macOS）**：
   ```bash
   sudo npm install -g @anthropic-ai/claude-code
   ```

2. **修复 npm 权限**：
   ```bash
   # 创建全局安装目录
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'

   # 添加到 PATH
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
   source ~/.bashrc

   # 重新安装
   npm install -g @anthropic-ai/claude-code
   ```

3. **使用 nvm（推荐）**：
   ```bash
   # 安装 nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

   # 重新加载 shell
   source ~/.bashrc

   # 安装 Node.js
   nvm install --lts

   # 安装 Claude Code
   npm install -g @anthropic-ai/claude-code
   ```

### 问题：网络连接错误

**错误信息**：
```
npm ERR! network request failed
```

**解决方案**：

1. **检查网络连接**：
   ```bash
   ping registry.npmjs.org
   ```

2. **配置代理**：
   ```bash
   npm config set proxy http://proxy.example.com:8080
   npm config set https-proxy http://proxy.example.com:8080
   ```

3. **使用国内镜像（中国用户）**：
   ```bash
   npm config set registry https://registry.npmmirror.com
   npm install -g @anthropic-ai/claude-code
   ```

4. **使用 VPN**：
   ```bash
   # 临时禁用代理
   npm config delete proxy
   npm config delete https-proxy

   # 安装
   npm install -g @anthropic-ai/claude-code
   ```

### 问题：版本冲突

**错误信息**：
```
npm ERR! peer dep missing
```

**解决方案**：

1. **升级 Node.js**：
   ```bash
   # 使用 nvm
   nvm install --lts
   nvm use --lts

   # 或直接从官网下载安装
   # https://nodejs.org/
   ```

2. **清理缓存**：
   ```bash
   npm cache clean --force
   npm install -g @anthropic-ai/claude-code
   ```

3. **强制安装**：
   ```bash
   npm install -g @anthropic-ai/claude-code --force
   ```

## 配置问题

### 问题：命令未找到

**错误信息**：
```
claude-code: command not found
```

**解决方案**：

1. **检查安装**：
   ```bash
   npm list -g @anthropic-ai/claude-code
   ```

2. **检查 PATH**：
   ```bash
   # 查看 npm 全局安装路径
   npm config get prefix

   # 检查是否在 PATH 中
   echo $PATH | grep -o "[^:]*npm[^:]*"
   ```

3. **添加到 PATH**：

   **Linux/macOS**：
   ```bash
   # 添加到 ~/.bashrc 或 ~/.zshrc
   export PATH=$(npm config get prefix)/bin:$PATH
   source ~/.bashrc
   ```

   **Windows PowerShell**：
   ```powershell
   $env:Path += ";" + (npm config get prefix) + "\node_modules\.bin"
   ```

4. **重新安装**：
   ```bash
   npm uninstall -g @anthropic-ai/claude-code
   npm install -g @anthropic-ai/claude-code
   ```

### 问题：API 密钥未配置

**错误信息**：
```
Error: ANTHROPIC_API_KEY is not set
```

**解决方案**：

```bash
# 设置 API 密钥
export ANTHROPIC_API_KEY="your-api-key-here"

# 验证
echo $ANTHROPIC_API_KEY

# 持久化（添加到 ~/.bashrc）
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.bashrc
```

详细说明请参考 [API密钥配置](api-key)。

### 问题：权限错误

**错误信息**：
```
Error: EACCES: permission denied
```

**解决方案**：

1. **修改目录权限**：
   ```bash
   # Linux/macOS
   sudo chown -R $USER ~/.claude-code
   ```

2. **使用不同目录**：
   ```bash
   export CLAUDE_CODE_HOME="/tmp/claude-code"
   ```

3. **以管理员身份运行（Windows）**：
   - 右键"命令提示符"或"PowerShell"
   - 选择"以管理员身份运行"

## 运行时问题

### 问题：连接超时

**错误信息**：
```
Error: Connection timeout
```

**解决方案**：

1. **检查网络连接**：
   ```bash
   ping api.anthropic.com
   ```

2. **增加超时时间**：
   ```bash
   export CLAUDE_CODE_TIMEOUT="300"
   ```

3. **配置代理**：
   ```bash
   export HTTP_PROXY="http://proxy.example.com:8080"
   export HTTPS_PROXY="http://proxy.example.com:8080"
   ```

4. **使用 VPN 或代理服务**

### 问题：SSL 证书错误

**错误信息**：
```
Error: SSL certificate problem
```

**解决方案**：

1. **更新证书**：
   ```bash
   # macOS
   brew install ca-certificates

   # Linux (Ubuntu/Debian)
   sudo apt-get update
   sudo apt-get install ca-certificates

   # CentOS/RHEL
   sudo yum update ca-certificates
   ```

2. **临时禁用 SSL 验证（不推荐）**：
   ```bash
   export NODE_TLS_REJECT_UNAUTHORIZED="0"
   ```

3. **配置公司代理证书**：
   ```bash
   export NODE_EXTRA_CA_CERTS="/path/to/cert.pem"
   ```

### 问题：内存不足

**错误信息**：
```
Error: JavaScript heap out of memory
```

**解决方案**：

1. **增加 Node.js 内存限制**：
   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096"
   ```

2. **清理缓存**：
   ```bash
   claude-code cache --clear
   ```

3. **减少并发请求**：
   ```bash
   export CLAUDE_CODE_MAX_CONCURRENT_REQUESTS="1"
   ```

## 平台特定问题

### Windows

#### 问题：PowerShell 执行策略

**错误信息**：
```
无法加载文件，因为在此系统上禁止运行脚本
```

**解决方案**：

```powershell
# 临时允许
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# 为当前用户允许
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

#### 问题：路径过长

**错误信息**：
```
Error: ENAMETOOLONG
```

**解决方案**：

1. **启用长路径支持**：
   - 以管理员身份运行 PowerShell
   - 执行：
     ```powershell
     New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
     ```

2. **使用短路径**：
   ```powershell
   npm config set cache "C:\npm-cache"
   ```

#### 问题：杀毒软件阻止

**解决方案**：

1. 将 Claude Code 添加到杀毒软件排除列表
2. 或临时禁用杀毒软件进行安装

### macOS

#### 问题：Gatekeeper 阻止

**错误信息**：
```
"claude-code"已损坏，无法打开
```

**解决方案**：

```bash
# 允许运行
xattr -cr /path/to/claude-code
```

或：

1. 打开"系统偏好设置" > "安全性与隐私"
2. 点击"仍要打开"

#### 问题：Rosetta 转换

**错误信息**（M1/M2 Mac）：
```
Error: bad CPU type in executable
```

**解决方案**：

1. **安装 Rosetta 2**：
   ```bash
   softwareupdate --install-rosetta
   ```

2. **使用 ARM 版本**：
   ```bash
   # 确保使用 ARM 版本的 Node.js
   arch -arm64 node --version
   ```

### Linux

#### 问题：缺少依赖

**错误信息**：
```
Error: libgconf-2.so.4: cannot open shared object file
```

**解决方案**：

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install libgconf-2-4 libxss1 libxtst6 libxrandr2 libasound2 libpangocairo-1.0-0 libatk1.0-0 libcairo2 libgtk-3-0

# CentOS/RHEL
sudo yum install libXScrnSaver GConf2 libXrandr libasoundatk cairo gtk3 pango
```

#### 问题：SELinux 阻止

**错误信息**：
```
Error: Permission denied
```

**解决方案**：

1. **临时禁用 SELinux**：
   ```bash
   sudo setenforce 0
   ```

2. **配置 SELinux 策略**（长期方案）：
   ```bash
   # 检查 SELinux 状态
   getenforce

   # 为 Claude Code 创建策略
   sudo chcon -R -t bin_t ~/.claude-code
   ```

## 获取帮助

如果以上解决方案都无法解决问题：

1. **检查系统诊断**：
   ```bash
   claude-code doctor
   ```

2. **查看日志**：
   ```bash
   # Linux/macOS
   cat ~/.claude-code/logs/latest.log

   # Windows
   type %USERPROFILE%\.claude-code\logs\latest.log
   ```

3. **收集诊断信息**：
   ```bash
   claude-code diagnose > diagnosis.txt
   ```

4. **获取支持**：
   - 查看 [GitHub Issues](https://github.com/anthropics/claude-code/issues)
   - 访问 [Anthropic 支持中心](https://support.anthropic.com/)
   - 联系技术支持

---

下一步：[项目初始化](../basic/project-init)
