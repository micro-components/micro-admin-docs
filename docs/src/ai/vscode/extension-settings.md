# 扩展设置

Claude Code VS Code 扩展提供了丰富的配置选项，让您可以定制化使用体验。

## 访问设置

### 方法 1：通过设置界面

1. 按 `Ctrl+,`（Windows/Linux）或 `Cmd+,`（macOS）打开设置
2. 搜索 "claude-code"
3. 浏览和修改各项设置

### 方法 2：通过设置 JSON

1. 打开命令面板（`Ctrl+Shift+P`）
2. 输入 "Preferences: Open Settings (JSON)"
3. 添加或修改配置

### 方法 3：通过工作区设置

在项目根目录创建 `.vscode/settings.json`：

```json
{
  "claude-code.apiKey": "your-api-key",
  "claude-code.model": "claude-3-sonnet-20240229"
}
```

## API 配置

### API 密钥

```json
{
  "claude-code.apiKey": "sk-ant-api03-..."
}
```

**说明**：您的 Anthropic API 密钥

**安全提示**：不要将 API 密钥提交到版本控制

### API 端点

```json
{
  "claude-code.apiEndpoint": "https://api.anthropic.com"
}
```

**说明**：Claude API 端点地址

**默认值**：`https://api.anthropic.com`

### 代理配置

```json
{
  "claude-code.proxy": "http://proxy.example.com:8080"
}
```

**说明**：使用代理访问 API

## 模型配置

### 模型选择

```json
{
  "claude-code.model": "claude-3-sonnet-20240229"
}
```

**可选值**：
- `claude-3-sonnet-20240229` - 推荐，平衡性能和质量
- `claude-3-opus-20240229` - 最高质量，较慢
- `claude-3-haiku-20240307` - 最快响应，质量略低

### Temperature

```json
{
  "claude-code.temperature": 0.7
}
```

**说明**：控制响应的随机性（0-1）

- 0：确定性，适合代码生成
- 1：创造性，适合头脑风暴
- 0.7：平衡的默认值

### 最大 Tokens

```json
{
  "claude-code.maxTokens": 4096
}
```

**说明**：最大响应 token 数

**范围**：1 - 8192

### 超时设置

```json
{
  "claude-code.timeout": 120000
}
```

**说明**：API 请求超时时间（毫秒）

**默认值**：120000（2分钟）

## 编辑器集成

### 内联建议

```json
{
  "claude-code.inlineSuggestions.enabled": true
}
```

**说明**：是否显示内联代码建议

### 建议触发

```json
{
  "claude-code.inlineSuggestions.triggerMode": "auto"
}
```

**可选值**：
- `auto` - 自动触发
- `manual` - 仅手动触发
- `disabled` - 禁用

### 代码高亮

```json
{
  "claude-code.highlighting.enabled": true,
  "claude-code.highlighting.color": "#00ff00"
}
```

### 快速修复

```json
{
  "claude-code.quickFix.enabled": true
}
```

**说明**：在问题面板中提供 AI 建议

## 聊天面板

### 面板位置

```json
{
  "claude-code.chat.location": "sidebar"
}
```

**可选值**：
- `sidebar` - 侧边栏
- `panel` - 底部面板

### 自动保存

```json
{
  "claude-code.chat.autoSaveHistory": true
}
```

**说明**：自动保存聊天历史

### 历史记录限制

```json
{
  "claude-code.chat.maxHistory": 50
}
```

**说明**：保存的历史记录数量

### Markdown 渲染

```json
{
  "claude-code.chat.renderMarkdown": true
}
```

**说明**：渲染 Markdown 格式

## 项目配置

### 项目规则

```json
{
  "claude-code.project.rulesPath": ".claude-code/rules",
  "claude-code.project.memoryPath": ".claude-code/memory.md"
}
```

### 自动检测项目类型

```json
{
  "claude-code.project.autoDetectType": true
}
```

### 工作区配置

```json
{
  "claude-code.workspace.enabled": true,
  "claude-code.workspace.configPath": ".claude-code/workspace.json"
}
```

## 性能优化

### 缓存启用

```json
{
  "claude-code.cache.enabled": true
}
```

### 缓存大小

```json
{
  "claude-code.cache.maxSize": 512
}
```

**说明**：缓存大小限制（MB）

### 并发请求

```json
{
  "claude-code.maxConcurrentRequests": 3
}
```

**说明**：最大并发请求数

### 流式响应

```json
{
  "claude-code.stream.enabled": true
}
```

**说明**：启用流式响应（更快的显示）

## 用户界面

### 主题

```json
{
  "claude-code.ui.theme": "auto"
}
```

**可选值**：
- `auto` - 跟随 VS Code 主题
- `light` - 浅色主题
- `dark` - 深色主题

### 字体大小

```json
{
  "claude-code.ui.fontSize": 14
}
```

### 图标样式

```json
{
  "claude-code.ui.iconStyle": "filled"
}
```

**可选值**：
- `filled` - 填充图标
- `outline` - 轮廓图标

### 状态栏显示

```json
{
  "claude-code.ui.showStatusBar": true
}
```

## 隐私和安全

### 数据收集

```json
{
  "claude-code.telemetry.enabled": false
}
```

**说明**：是否启用遥测数据收集

### 代码扫描

```json
{
  "claude-code.privacy.scanCode": true
}
```

**说明**：在发送前扫描敏感信息

### 记忆加密

```json
{
  "claude-code.privacy.encryptMemory": false
}
```

**说明**：加密记忆文件

## 高级设置

### 自定义提示词前缀

```json
{
  "claude-code.advanced.promptPrefix": "你是一个专业的 TypeScript 开发者..."
}
```

### 自定义提示词后缀

```json
{
  "claude-code.advanced.promptSuffix": "请提供完整的代码实现。"
}
```

### 调试模式

```json
{
  "claude-code.advanced.debugMode": false
}
```

**说明**：启用调试日志

### 日志级别

```json
{
  "claude-code.advanced.logLevel": "info"
}
```

**可选值**：
- `error` - 仅错误
- `warn` - 警告及以上
- `info` - 信息及以上（默认）
- `debug` - 调试信息

## 完整配置示例

```json
{
  // API 配置
  "claude-code.apiKey": "your-api-key-here",
  "claude-code.model": "claude-3-sonnet-20240229",
  "claude-code.temperature": 0.7,
  "claude-code.maxTokens": 4096,
  "claude-code.timeout": 120000,

  // 编辑器集成
  "claude-code.inlineSuggestions.enabled": true,
  "claude-code.inlineSuggestions.triggerMode": "auto",
  "claude-code.highlighting.enabled": true,

  // 聊天面板
  "claude-code.chat.location": "sidebar",
  "claude-code.chat.autoSaveHistory": true,
  "claude-code.chat.maxHistory": 50,
  "claude-code.chat.renderMarkdown": true,

  // 项目配置
  "claude-code.project.rulesPath": ".claude-code/rules",
  "claude-code.project.memoryPath": ".claude-code/memory.md",

  // 性能优化
  "claude-code.cache.enabled": true,
  "claude-code.cache.maxSize": 512,
  "claude-code.stream.enabled": true,

  // 用户界面
  "claude-code.ui.theme": "auto",
  "claude-code.ui.fontSize": 14,
  "claude-code.ui.showStatusBar": true,

  // 隐私和安全
  "claude-code.telemetry.enabled": false,
  "claude-code.privacy.scanCode": true
}
```

## 工作区特定配置

在不同工作区使用不同配置：

**项目 A** (`.vscode/settings.json`)
```json
{
  "claude-code.model": "claude-3-opus-20240229",
  "claude-code.temperature": 0.5
}
```

**项目 B** (`.vscode/settings.json`)
```json
{
  "claude-code.model": "claude-3-sonnet-20240229",
  "claude-code.temperature": 0.7
}
```

## 配置优先级

配置的优先级（从高到低）：

1. 工作区设置（`.vscode/settings.json`）
2. 用户设置（用户设置 JSON）
3. 默认设置

---

下一步：[快捷键配置](keybindings)
