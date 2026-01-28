# 快捷键配置

合理的快捷键配置可以大幅提升使用 Claude Code 的效率。

## 默认快捷键

### Windows / Linux

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Shift+A` | 打开 Claude Code 聊天面板 |
| `Ctrl+Shift+X` | 解释选中的代码 |
| `Ctrl+Shift+R` | 重构选中的代码 |
| `Ctrl+Shift+T` | 为选中代码生成测试 |
| `Ctrl+Shift+D` | 生成文档 |
| `Ctrl+Space` | 触发内联建议 |
| `Alt+Enter` | 应用内联建议 |

### macOS

| 快捷键 | 功能 |
|--------|------|
| `Cmd+Shift+A` | 打开 Claude Code 聊天面板 |
| `Cmd+Shift+X` | 解释选中的代码 |
| `Cmd+Shift+R` | 重构选中的代码 |
| `Cmd+Shift+T` | 为选中代码生成测试 |
| `Cmd+Shift+D` | 生成文档 |
| `Ctrl+Space` | 触发内联建议 |
| `Alt+Enter` | 应用内联建议 |

## 自定义快捷键

### 方法 1：通过键盘快捷方式界面

1. 打开命令面板（`Ctrl+Shift+P`）
2. 输入 "Preferences: Open Keyboard Shortcuts"
3. 搜索 "claude-code"
4. 点击编辑图标修改快捷键

### 方法 2：通过 keybindings.json

1. 打开命令面板（`Ctrl+Shift+P`）
2. 输入 "Preferences: Open Keyboard Shortcuts (JSON)"
3. 添加自定义快捷键配置

## 推荐快捷键配置

### 常用操作

```json
{
  "key": "ctrl+alt+c",
  "command": "claude-code.openChat",
  "when": "!terminalFocus"
},
{
  "key": "ctrl+alt+e",
  "command": "claude-code.explainCode",
  "when": "editorTextFocus"
},
{
  "key": "ctrl+alt+r",
  "command": "claude-code.refactorCode",
  "when": "editorTextFocus"
},
{
  "key": "ctrl+alt+t",
  "command": "claude-code.generateTests",
  "when": "editorTextFocus"
}
```

### 快速访问

```json
{
  "key": "ctrl+k ctrl+1",
  "command": "claude-code.quickAction.explain"
},
{
  "key": "ctrl+k ctrl+2",
  "command": "claude-code.quickAction.refactor"
},
{
  "key": "ctrl+k ctrl+3",
  "command": "claude-code.quickAction.test"
},
{
  "key": "ctrl+k ctrl+4",
  "command": "claude-code.quickAction.document"
}
```

## 快捷键最佳实践

### 1. 使用容易记忆的快捷键

```json
{
  "key": "ctrl+alt+c",  // C for Claude
  "command": "claude-code.openChat"
}
```

### 2. 避免与常用快捷键冲突

避免使用：
- `Ctrl+S` (保存)
- `Ctrl+C/V/X` (复制/粘贴/剪切)
- `Ctrl+Z/Y` (撤销/重做)

### 3. 为不同操作使用相关快捷键

```json
{
  "key": "ctrl+alt+1",
  "command": "claude-code.quickAction.explain"
},
{
  "key": "ctrl+alt+2",
  "command": "claude-code.quickAction.refactor"
},
{
  "key": "ctrl+alt+3",
  "command": "claude-code.quickAction.test"
}
```

---

返回：[VS Code 集成](../vscode/install-extension)
