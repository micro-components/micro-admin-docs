# 安装 VS Code 扩展

Claude Code 的 VS Code 扩展提供了无缝的集成体验，让您无需离开编辑器就能使用 AI 辅助编程。

## 扩展简介

Claude Code VS Code 扩展提供以下功能：

- 💬 **内置聊天界面**：直接在 VS Code 中与 Claude 对话
- 🤖 **智能代码补全**：基于上下文的智能建议
- 🔍 **代码分析**：快速理解和探索代码
- ✏️ **实时编辑**：直接在编辑器中进行代码修改
- 📝 **文档生成**：自动生成代码文档
- 🧪 **测试生成**：自动创建测试用例

## 安装方法

### 方法 1：通过 VS Code 市场（推荐）

1. 打开 VS Code
2. 按 `Ctrl+Shift+X`（Windows/Linux）或 `Cmd+Shift+X`（macOS）打开扩展面板
3. 在搜索框中输入 "Claude Code" 或 "Anthropic"
4. 找到 "Claude Code - AI Coding Assistant"
5. 点击 "安装" 按钮

### 方法 2：通过命令行

```bash
code --install-extension anthropic.claude-code
```

### 方法 3：通过 VSIX 文件

1. 访问 [Claude Code 发布页面](https://github.com/anthropics/claude-code/releases)
2. 下载最新的 `.vsix` 文件
3. 在 VS Code 中，打开扩展面板（`Ctrl+Shift+X`）
4. 点击右上角的 "..." 菜单
5. 选择 "从 VSIX 安装..."
6. 选择下载的 `.vsix` 文件

## 验证安装

安装完成后，验证扩展是否正常工作：

1. 重新加载 VS Code 窗口（`Ctrl+Shift+P` → "Reload Window"）
2. 在左侧活动栏中应该能看到 Claude Code 图标
3. 点击图标打开聊天面板
4. 输入 "Hello" 测试连接

## 系统要求

### VS Code 版本
- **最低版本**：1.75.0
- **推荐版本**：最新稳定版

### 操作系统
- Windows 10/11
- macOS 10.15+
- Linux（主流发行版）

### 其他要求
- Node.js 16+（如果需要本地运行）
- 稳定的网络连接
- 有效的 Anthropic API 密钥

## 首次配置

安装扩展后，首次使用时需要进行配置：

### 1. 打开设置

按 `Ctrl+,`（Windows/Linux）或 `Cmd+,`（macOS）打开设置

### 2. 配置 API 密钥

搜索 "Claude Code API Key"，输入您的 API 密钥：

```json
{
  "claude-code.apiKey": "your-api-key-here"
}
```

### 3. 选择模型

选择要使用的 AI 模型：

```json
{
  "claude-code.model": "claude-3-sonnet-20240229"
}
```

可选模型：
- `claude-3-sonnet-20240229` - 平衡性能和质量
- `claude-3-opus-20240229` - 最高质量
- `claude-3-haiku-20240307` - 最快响应

### 4. 配置其他选项

```json
{
  "claude-code.temperature": 0.7,
  "claude-code.maxTokens": 4096,
  "claude-code.autoSave": true,
  "claude-code.showInlineSuggestion": true
}
```

## 界面概览

### 侧边栏

扩展会在左侧活动栏添加一个 Claude Code 图标。点击后可以看到：

- **聊天面板**：与 Claude 对话
- **历史记录**：查看之前的对话
- **规则和记忆**：管理项目规则和记忆
- **设置**：快速访问配置

### 编辑器集成

- **内联建议**：代码补全建议显示为灰色文字
- **代码操作**：右键菜单中的 Claude Code 选项
- **状态栏**：显示 Claude Code 的连接状态

### 命令面板

通过 `Ctrl+Shift+P`（或 `Cmd+Shift+P`）可以访问所有 Claude Code 命令：

- `Claude Code: Open Chat` - 打开聊天面板
- `Claude Code: Explain Code` - 解释选中的代码
- `Claude Code: Refactor Code` - 重构选中的代码
- `Claude Code: Generate Tests` - 生成测试
- `Claude Code: Generate Documentation` - 生成文档

## 故障排除

### 问题：扩展未显示

**解决方案**：
1. 确认已安装扩展
2. 重新加载 VS Code
3. 检查 VS Code 版本是否满足要求

### 问题：无法连接到 Claude

**解决方案**：
1. 检查 API 密钥是否正确
2. 检查网络连接
3. 查看状态栏的错误信息

### 问题：响应缓慢

**解决方案**：
1. 检查网络速度
2. 尝试切换到更快的模型（Haiku）
3. 减少 token 数量限制

### 问题：扩展崩溃

**解决方案**：
1. 查看 VS Code 输出面板的错误信息
2. 尝试禁用其他扩展
3. 重新安装扩展

## 更新扩展

### 自动更新

默认情况下，VS Code 会自动更新扩展。您可以在设置中配置：

```json
{
  "extensions.autoUpdate": true
}
```

### 手动更新

1. 打开扩展面板
2. 找到 Claude Code 扩展
3. 查看更新按钮
4. 点击更新

## 卸载扩展

如果需要卸载扩展：

1. 打开扩展面板
2. 找到 Claude Code 扩展
3. 点击齿轮图标
4. 选择"卸载"

## 相关资源

- [Claude Code 文档](https://docs.claude.ai)
- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)
- [GitHub Issues](https://github.com/anthropics/claude-code/issues)

---

下一步：[扩展设置](extension-settings)
