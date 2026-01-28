# 安装指南

本指南将帮助您在不同平台上安装 Claude Code。

## 快速安装

### 通过 npm 安装（推荐）

这是最简单和推荐的安装方式：

```bash
# 全局安装 Claude Code CLI
npm install -g @anthropic-ai/claude-code

# 或使用 yarn
yarn global add @anthropic-ai/claude-code

# 或使用 pnpm
pnpm add -g @anthropic-ai/claude-code
```

### 验证安装

安装完成后，验证安装是否成功：

```bash
claude-code --version
```

如果看到版本号输出，说明安装成功！

## 分步安装指南

### Windows 安装

#### 方法 1：使用 npm（推荐）
1. 打开 PowerShell 或命令提示符
2. 运行安装命令：
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
3. 验证安装：
   ```bash
   claude-code --version
   ```

#### 方法 2：使用安装包
1. 访问 [Claude Code 发布页面](https://github.com/anthropics/claude-code/releases)
2. 下载最新的 Windows 安装包（`.exe` 文件）
3. 双击安装包，按照向导完成安装
4. 重启终端或打开新的终端窗口

#### 方法 3：使用 Chocolatey
```bash
choco install claude-code
```

### macOS 安装

#### 方法 1：使用 npm（推荐）
```bash
npm install -g @anthropic-ai/claude-code
```

#### 方法 2：使用 Homebrew
```bash
# 添加 tap
brew tap anthropic/claude

# 安装
brew install claude-code
```

#### 方法 3：手动安装
1. 下载最新的 macOS 安装包（`.dmg` 文件）
2. 双击打开并拖拽到 Applications 文件夹
3. 添加到 PATH：
   ```bash
   echo 'export PATH="/Applications/Claude Code.app/Contents/Resources:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

### Linux 安装

#### Ubuntu / Debian
```bash
# 使用 npm
npm install -g @anthropic-ai/claude-code

# 或下载 .deb 包
wget https://github.com/anthropics/claude-code/releases/latest/download/claude-code_amd64.deb
sudo dpkg -i claude-code_amd64.deb
sudo apt-get install -f  # 修复依赖
```

#### Fedora / CentOS / RHEL
```bash
# 使用 npm
npm install -g @anthropic-ai/claude-code

# 或下载 .rpm 包
wget https://github.com/anthropics/claude-code/releases/latest/download/claude-code.x86_64.rpm
sudo rpm -i claude-code.x86_64.rpm
```

#### 通用 Linux（二进制包）
```bash
# 下载二进制包
wget https://github.com/anthropics/claude-code/releases/latest/download/claude-code-linux-amd64

# 添加执行权限
chmod +x claude-code-linux-amd64

# 移动到 PATH
sudo mv claude-code-linux-amd64 /usr/local/bin/claude-code

# 验证
claude-code --version
```

## VS Code 扩展安装

如果您使用 VS Code，可以安装官方扩展以获得更好的集成体验。

### 通过 VS Code 市场
1. 打开 VS Code
2. 按 `Ctrl+Shift+X`（或 `Cmd+Shift+X`）打开扩展面板
3. 搜索 "Claude Code"
4. 点击 "安装"

### 通过命令行
```bash
code --install-extension anthropic.claude-code
```

## 配置初始设置

首次运行时，Claude Code 会引导您完成初始配置：

```bash
claude-code init
```

您将被询问以下信息：

1. **API 密钥**：您的 Anthropic API 密钥
2. **编辑器偏好**：首选的代码编辑器
3. **默认语言**：默认编程语言
4. **项目目录**：默认工作目录

详细配置说明请参考 [环境变量配置](env-config) 和 [API密钥配置](api-key)。

## 验证安装

完成安装后，运行以下命令进行全面验证：

```bash
# 检查版本
claude-code --version

# 检查系统信息
claude-code doctor

# 测试连接
claude-code test-connection
```

## 卸载

如果需要卸载 Claude Code：

### npm 安装的包
```bash
npm uninstall -g @anthropic-ai/claude-code
# 或
yarn global remove @anthropic-ai/claude-code
# 或
pnpm remove -g @anthropic-ai/claude-code
```

### Windows 安装包
1. 打开"控制面板" > "程序和功能"
2. 找到 "Claude Code"
3. 点击"卸载"

### macOS Homebrew
```bash
brew uninstall claude-code
```

### Linux .deb / .rpm
```bash
# .deb
sudo apt-get remove claude-code

# .rpm
sudo rpm -e claude-code
```

## 更新

### npm 安装
```bash
npm update -g @anthropic-ai/claude-code
```

### Homebrew
```bash
brew upgrade claude-code
```

### 二进制包
重复下载和安装步骤即可。

## 安装故障排除

如果遇到安装问题，请参考 [常见安装问题](troubleshooting)。

## 下一步

安装完成后，继续配置：

1. [环境变量配置](env-config)
2. [API密钥配置](api-key)
3. [项目初始化](../basic/project-init)

---

需要帮助？查看 [常见安装问题](troubleshooting)。
