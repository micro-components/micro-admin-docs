# AI 编程工具完全指南

本文档详细介绍如何使用 AI IDE 和 AI 编程助手来高效开发 MicroAdmin 项目。

---

## 工具概览

### AI 原生 IDE

| 工具 | 开发商 | 核心特点 | 定价 |
|------|--------|----------|------|
| **Cursor** | Cursor Inc. | 基于 VS Code，深度 AI 集成 | 免费版 + Pro $20/月 |
| **Windsurf** | Codeium | 智能体模式，自动化程度高 | 免费版 + Pro $15/月 |
| **Trae** | 字节跳动 | 中文友好，一键生成项目 | 免费 |
| **Claude Code** | Anthropic | 终端 AI 助手，深度代码理解 | Claude Pro $20/月 |

### AI 编程插件

| 工具 | 适用 IDE | 核心特点 | 定价 |
|------|----------|----------|------|
| **GitHub Copilot** | VS Code, JetBrains | 行业标杆，代码补全优秀 | $10/月 |
| **通义灵码** | VS Code, JetBrains | 企业级支持，数据安全 | 免费 |
| **CodeGeeX** | VS Code, JetBrains | 中文理解强，智谱 AI | 免费 |
| **Codeium** | 多平台 | 免费无限制补全 | 免费 |

---

## Cursor 使用教程

### 安装与配置

1. **下载安装**
   - 访问 [cursor.com](https://cursor.com) 下载
   - 支持 Windows、macOS、Linux

2. **导入 VS Code 配置**
   ```
   Cursor 启动后会自动检测并导入 VS Code 的：
   - 扩展插件
   - 主题设置
   - 快捷键配置
   ```

3. **配置 AI 模型**
   - 打开设置 `Ctrl + ,`
   - 搜索 "AI Model"
   - 推荐选择 `claude-3.5-sonnet` 或 `gpt-4o`

### 核心功能

#### Tab 智能补全

Cursor 的 Tab 补全会根据上下文预测下一步代码：

```typescript
// 输入函数名后按 Tab，自动补全整个函数
const fetchUserList = // 按 Tab 自动生成
```

#### Ctrl+K 行内编辑

选中代码后按 `Ctrl + K`，输入指令修改代码：

```typescript
// 选中以下代码，按 Ctrl+K 输入 "添加 loading 状态"
const [users, setUsers] = useState([])

// AI 自动修改为：
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(false)
```

#### Ctrl+L 侧边对话

按 `Ctrl + L` 打开 AI 对话窗口，可以：

- 询问代码问题
- 生成新代码
- 解释复杂逻辑
- Debug 错误

#### Composer 多文件编辑

按 `Ctrl + I` 打开 Composer，一次性修改多个文件：

```
提示词示例：
"为 MicroAdmin 添加一个用户管理模块，包含：
1. src/views/user/index.vue - 用户列表页面
2. src/api/user.ts - 用户相关 API
3. src/router/modules/user.ts - 路由配置"
```

### MicroAdmin 项目实战

#### 创建新页面

1. 按 `Ctrl + I` 打开 Composer
2. 输入提示词：

```
在 MicroAdmin 项目中创建一个订单管理页面：

1. 创建 src/views/order/index.vue
   - 使用 Element Plus 的 el-table 展示订单列表
   - 包含搜索、分页、新增、编辑、删除功能
   - 使用 UnoCSS 编写样式

2. 创建 src/api/order.ts
   - 包含 getOrderList, createOrder, updateOrder, deleteOrder

3. 更新 src/router/modules/order.ts
   - 添加订单管理路由
```

#### 修复 Bug

选中报错代码，按 `Ctrl + L` 并发送：

```
这段代码报错：TypeError: Cannot read property 'map' of undefined
请分析原因并修复
```

#### 代码重构

选中需要重构的代码，按 `Ctrl + K`：

```
将这个组件重构为 Composition API 写法，使用 setup 语法糖
```

---

## Windsurf 使用教程

### 安装配置

1. **下载安装**
   - 访问 [codeium.com/windsurf](https://codeium.com/windsurf)
   - 安装后登录 Codeium 账号

2. **项目设置**
   - 打开 MicroAdmin 项目文件夹
   - Windsurf 会自动分析项目结构

### 核心功能

#### Cascade 智能体模式

Windsurf 的 Cascade 是真正的 AI 智能体，可以：

- 自动读取相关文件
- 理解项目架构
- 执行终端命令
- 一次完成复杂任务

**使用方法**：按 `Ctrl + L` 打开 Cascade

```
提示词示例：
"分析 MicroAdmin 的权限系统实现，然后添加一个按钮级别的权限控制指令 v-permission"
```

Cascade 会自动：
1. 读取现有权限相关代码
2. 分析实现方式
3. 创建 v-permission 指令
4. 更新相关配置

#### Supercomplete 超级补全

比普通补全更智能，能预测多行代码：

```vue
<template>
  <el-table :data="tableData">
    <!-- 输入 el-table-column 后，Supercomplete 会预测整个表格结构 -->
  </el-table>
</template>
```

#### 终端命令集成

在 Cascade 中可以直接执行命令：

```
"安装 @vueuse/core 依赖并在 utils 中创建一个使用 useStorage 的示例"
```

Windsurf 会自动运行 `pnpm add @vueuse/core` 并创建代码。

### MicroAdmin 实战

#### 添加新功能模块

```
在 MicroAdmin 中添加一个完整的文章管理模块：

1. 分析现有模块的结构（如用户管理）
2. 创建文章管理的完整功能：
   - 文章列表（支持搜索、分页）
   - 文章详情
   - 文章编辑（富文本编辑器）
   - 文章分类管理
3. 添加相应的 API 接口
4. 配置路由和菜单
5. 遵循项目现有的代码风格
```

---

## Claude Code (终端 AI 助手)

### 安装配置

```bash
# 使用 npm 全局安装
npm install -g @anthropic-ai/claude-code

# 或使用 pnpm
pnpm add -g @anthropic-ai/claude-code

# 登录
claude login
```

### 核心命令

```bash
# 在项目目录启动
cd micro-admin
claude

# 常用指令
/help          # 查看帮助
/clear         # 清除对话
/compact       # 压缩上下文
/cost          # 查看 token 消耗
```

### 项目配置

在项目根目录创建 `CLAUDE.md` 文件（本项目已配置）：

```markdown
# CLAUDE.md

## 项目概述
MicroAdmin 是基于 Vue3 + Vite5 + TypeScript 的中后台模板...

## 开发命令
pnpm install  # 安装依赖
pnpm dev      # 启动开发服务器
...
```

Claude Code 会自动读取此文件了解项目上下文。

### MicroAdmin 开发实战

#### 初始化项目

```bash
# 启动 Claude Code
claude

# 让 AI 分析项目
> 分析这个项目的技术栈和目录结构，给我一个概览
```

#### 创建组件

```bash
> 创建一个通用的确认对话框组件 ConfirmDialog.vue，
  要求：
  - 使用 Element Plus 的 el-dialog
  - 支持自定义标题、内容、确认按钮文字
  - 支持 Promise 方式调用
  - 使用 TypeScript
```

#### 批量修改

```bash
> 将 src/api 目录下所有文件的请求方法从 axios 直接调用
  改为使用项目封装的 request 函数
```

#### 代码审查

```bash
> 审查 src/views/login/index.vue 的代码，
  指出潜在问题和优化建议
```

---

## Trae 使用教程

### 安装配置

1. **下载安装**
   - 访问 [trae.ai](https://trae.ai) 下载
   - 支持 Windows 和 macOS

2. **中文优化**
   - Trae 默认对中文支持友好
   - 可直接使用中文提示词

### 核心功能

#### Builder 模式

一键从描述生成完整项目：

```
创建一个 Vue3 + Element Plus 的后台管理系统，包含：
- 登录页面
- 仪表盘
- 用户管理 CRUD
- 权限控制
```

#### Chat 模式

在编辑器中直接对话：

```
帮我优化这个组件的性能，使用 computed 替代 watch
```

#### 代码解释

选中代码后右键选择"解释代码"：

```typescript
// Trae 会用中文详细解释这段代码的作用
const debouncedSearch = useDebounceFn(() => {
  fetchData()
}, 300)
```

### MicroAdmin 实战

#### 快速生成页面

```
参考 src/views/user/index.vue 的结构，
为我生成一个角色管理页面 src/views/role/index.vue，
包含角色列表、新增、编辑、删除、权限分配功能
```

---

## GitHub Copilot 使用教程

### 安装配置

1. **安装扩展**
   - VS Code 扩展商店搜索 "GitHub Copilot"
   - 安装并登录 GitHub 账号

2. **配置快捷键**
   ```json
   // settings.json
   {
     "github.copilot.enable": {
       "*": true,
       "markdown": true,
       "plaintext": false
     }
   }
   ```

### 核心功能

#### 行内补全

输入注释，Copilot 自动生成代码：

```typescript
// 获取用户列表，支持分页和搜索
// Copilot 会自动生成完整函数
```

#### Copilot Chat

按 `Ctrl + I` 打开对话框：

```
/explain 解释选中的代码
/fix 修复代码中的问题
/tests 生成单元测试
```

#### 代码建议

在编辑器中输入时，按 `Tab` 接受建议，`Esc` 拒绝。

### MicroAdmin 实战

#### 生成 API 函数

```typescript
// api/product.ts

// 获取商品列表，支持分页、搜索、分类筛选
// Copilot 自动补全 ↓

export function getProductList(params: ProductQueryParams) {
  return request<PageResult<Product>>({
    url: '/product/list',
    method: 'get',
    params
  })
}
```

#### 生成类型定义

```typescript
// types/product.ts

// 商品类型定义
// Copilot 自动生成 ↓

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  // ...
}
```

---

## 通义灵码使用教程

### 安装配置

1. **安装扩展**
   - VS Code 搜索 "TONGYI Lingma"
   - 或 JetBrains 插件市场安装

2. **登录账号**
   - 使用阿里云账号登录
   - 个人版免费使用

### 核心功能

#### 智能补全

```typescript
// 输入函数签名，通义灵码自动补全实现
function formatDate(date: Date, format: string): string {
  // 通义灵码自动生成实现代码
}
```

#### 代码生成

选中注释，右键选择"生成代码"：

```typescript
/**
 * 表单验证规则
 * - 用户名：必填，3-20个字符
 * - 密码：必填，至少8位，包含大小写字母和数字
 * - 邮箱：必填，有效邮箱格式
 */
// 生成代码 ↓
```

#### 单元测试生成

选中函数，右键选择"生成单元测试"：

```typescript
// 为这个函数自动生成 Jest 测试用例
export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}
```

### 企业版特性

- 私有化部署，数据不出企业
- 支持企业知识库训练
- 符合等保要求

---

## 最佳实践

### 提示词技巧

#### 1. 明确上下文

```
❌ 帮我写一个表格
✅ 在 MicroAdmin 项目中，使用 Element Plus 的 el-table
   创建一个用户列表组件，包含姓名、邮箱、角色、状态列，
   支持分页和多选删除
```

#### 2. 指定技术栈

```
❌ 创建一个登录页面
✅ 创建一个登录页面：
   - 使用 Vue3 Composition API + setup 语法糖
   - 使用 Element Plus 的 el-form 组件
   - 使用 UnoCSS 编写样式
   - 包含用户名密码登录和手机验证码登录切换
```

#### 3. 提供示例

```
参考以下代码风格创建新组件：
[粘贴现有组件代码]

新组件要求：
- 保持相同的代码风格
- 使用相同的命名规范
- ...
```

#### 4. 分步骤请求

```
第一步：创建 API 接口定义
第二步：创建类型定义
第三步：创建页面组件
第四步：添加路由配置
```

### 代码审查清单

使用 AI 工具生成代码后，请检查：

- [ ] 类型定义是否完整
- [ ] 错误处理是否充分
- [ ] 是否符合项目代码规范
- [ ] 是否有安全漏洞（XSS、SQL注入等）
- [ ] 是否有性能问题
- [ ] 是否需要添加注释

### 效率提升技巧

1. **创建项目专属提示词模板**
   ```
   保存常用提示词，如：
   - 创建 CRUD 页面模板
   - 创建 API 接口模板
   - 创建组件模板
   ```

2. **利用 @文件 引用**
   ```
   @src/components/BaseTable.vue 参考这个组件的结构，
   创建一个新的 TreeTable 组件
   ```

3. **使用代码片段**
   ```
   结合 AI 生成和 VS Code Snippets，提高开发效率
   ```

---

## 常见问题

### Q: AI 生成的代码质量如何保证？

A:
- 始终进行代码审查
- 运行测试确保功能正常
- 使用 ESLint 检查代码规范
- 对安全敏感代码人工检查

### Q: 如何选择合适的 AI 工具？

A:
- **日常开发**：GitHub Copilot / 通义灵码
- **复杂重构**：Cursor / Windsurf
- **中文项目**：Trae / CodeGeeX
- **命令行习惯**：Claude Code

### Q: 如何处理 AI 理解错误？

A:
- 提供更多上下文
- 分步骤描述需求
- 使用 @文件 引用相关代码
- 纠正后继续对话

### Q: 数据安全如何保障？

A:
- 敏感代码不要提交给云端 AI
- 企业项目考虑使用本地部署方案
- 使用通义灵码企业版等合规产品
- 关闭代码遥测功能

---

## Claude Code .claude 目录完整配置

### 目录结构总览

```
.claude/
├── settings.json              # 项目级配置文件（已存在）
├── mcp.json                   # MCP 服务器配置
├── skills/                    # 自定义 Skills 目录
│   └── skill-name/
│       ├── skill.json         # Skill 元数据
│       ├── index.js           # Skill 实现代码
│       ├── package.json       # npm 依赖（可选）
│       └── README.md          # 文档（可选）
├── hooks/                     # Hooks 脚本目录
│   ├── pre-command.sh         # 命令执行前
│   ├── post-command.sh        # 命令执行后
│   ├── pre-agent-execution.sh # Agent 执行前
│   ├── post-agent-execution.sh# Agent 执行后
│   ├── pre-file-edit.sh       # 文件编辑前
│   └── post-file-edit.sh      # 文件编辑后
├── logs/                      # 日志目录
│   ├── claude.log
│   └── mcp-server.log
└── cache/                     # 缓存目录
    ├── conversations/
    └── tokens/
```

---

## 一、settings.json（当前已配置）

### 当前配置
```json
{
  "permissions": {
    "allow": [
      "Bash(pnpm *)",
      "Bash(git *)",
      "Bash(ls *)",
      "Bash(mkdir *)"
    ]
  }
}
```

### 完整配置选项

```json
{
  // 模型选择
  "model": "claude-sonnet-4-5-20250929",

  // 权限配置
  "permissions": {
    "allow": [
      "Bash(npm *)",
      "Bash(git *)",
      "Bash(ls *)",
      "Bash(mkdir *)",
      "Read",           // 读取文件
      "Edit"            // 编辑文件
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)"
    ]
  },

  // 环境变量
  "env": {
    "ANTHROPIC_API_KEY": "your-api-key-here",
    "CUSTOM_VAR": "value"
  },

  // Hooks 配置
  "hooks": {
    "pre-command": ".claude/hooks/pre-command.sh",
    "post-command": ".claude/hooks/post-command.sh"
  },

  // 内存和上下文配置
  "memory": {
    "max_size_mb": 500,
    "persistence": true
  },
  "context": {
    "max_tokens": 200000,
    "cache_enabled": true
  },

  // 主题
  "theme": "dark"
}
```

### 权限说明

#### allow（允许的操作）
- `"Bash(npm *)"` - 允许执行 npm 命令
- `"Bash(git *)"` - 允许执行 git 命令
- `"Bash(ls *)"` - 允许执行 ls 命令
- `"Bash(mkdir *)"` - 允许执行 mkdir 命令
- `"Read"` - 允许读取文件
- `"Edit"` - 允许编辑文件
- `"Bash(*)"` - 允许所有 Bash 命令（不推荐）

#### deny（拒绝的操作）
- `"Bash(rm -rf *)"` - 禁止删除命令
- `"Bash(sudo *)"` - 禁止 sudo 命令
- `"Bash(dd *)"` - 禁止 dd 命令
- `"Bash(mkfs *)"` - 禁止格式化命令

---

## 二、mcp.json（MCP 服务器配置）

### 基本结构
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@anthropic-ai/mcp-server-filesystem", "/home/user/projects"],
      "env": {
        "API_KEY": "your-api-key"
      },
      "autoStart": true,
      "timeout": 5000,
      "description": "文件系统访问",
      "disabled": false
    },
    "postgres": {
      "command": "python",
      "args": ["-m", "mcp_postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/db"
      },
      "timeout": 10000
    },
    "github": {
      "command": "npx",
      "args": ["@anthropic-ai/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxx"
      }
    }
  },
  "enabledServers": ["filesystem", "postgres", "github"]
}
```

### 字段说明

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| command | string | ✅ | 启动命令（node、python、npx） |
| args | string[] | ✅ | 命令参数 |
| env | object | ❌ | 环境变量 |
| autoStart | boolean | ❌ | 自动启动（默认 true） |
| timeout | number | ❌ | 超时时间（ms，默认 5000） |
| description | string | ❌ | 服务器描述 |
| disabled | boolean | ❌ | 是否禁用 |

### 常用 MCP 服务器

#### 1. 文件系统服务器
```json
{
  "filesystem": {
    "command": "npx",
    "args": ["@anthropic-ai/mcp-server-filesystem", "e:/project/micro-admin-docs"]
  }
}
```

#### 2. PostgreSQL 数据库
```json
{
  "postgres": {
    "command": "python",
    "args": ["-m", "mcp_postgres"],
    "env": {
      "DATABASE_URL": "postgresql://user:pass@localhost:5432/dbname"
    }
  }
}
```

#### 3. GitHub 服务器
```json
{
  "github": {
    "command": "npx",
    "args": ["@anthropic-ai/mcp-server-github"],
    "env": {
      "GITHUB_TOKEN": "ghp_xxxxxxxxxxxx"
    }
  }
}
```

#### 4. SQLite 数据库
```json
{
  "sqlite": {
    "command": "npx",
    "args": ["@anthropic-ai/mcp-server-sqlite", "--db-path", "./data/app.db"]
  }
}
```

---

## 三、skills/（自定义 Skills）

### 目录结构
```
.claude/skills/
├── my-skill/
│   ├── skill.json          # 必需：元数据
│   ├── index.js            # 必需：实现代码
│   ├── package.json        # 可选：依赖
│   └── README.md           # 可选：文档
```

### skill.json 配置

```json
{
  "id": "my-custom-skill",
  "name": "My Custom Skill",
  "version": "1.0.0",
  "description": "Skill 功能详细描述",
  "author": "Your Name",
  "license": "MIT",
  "triggers": [
    {
      "type": "command",
      "pattern": "/my-command",
      "description": "触发器描述"
    },
    {
      "type": "keyword",
      "pattern": "生成文档",
      "description": "关键词触发"
    }
  ],
  "parameters": [
    {
      "name": "input",
      "type": "string",
      "description": "参数描述",
      "required": true,
      "default": "默认值"
    }
  ],
  "permissions": [
    "read:files",
    "write:files",
    "execute:bash"
  ],
  "dependencies": {
    "lodash": "^4.17.0",
    "axios": "^1.6.0"
  },
  "tags": ["productivity", "automation"],
  "enabledByDefault": true
}
```

### skill.json 字段说明

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| id | string | ✅ | 唯一标识符（kebab-case） |
| name | string | ✅ | 显示名称 |
| version | string | ✅ | 语义版本号 |
| description | string | ✅ | 功能描述 |
| triggers | array | ❌ | 触发器配置 |
| parameters | array | ❌ | 参数定义 |
| permissions | array | ❌ | 所需权限 |
| enabledByDefault | boolean | ❌ | 默认启用 |

### index.js 实现模板

```javascript
module.exports = {
  // 初始化（可选）
  async init(context) {
    console.log('Skill initialized');
    // 可以在这里加载配置、建立连接等
    return { status: 'ready' };
  },

  // 主处理函数（必需）
  async execute(input, context) {
    const { command, args, workingDir } = context;

    try {
      // 处理逻辑
      const result = await processData(input);

      return {
        success: true,
        output: result,
        metadata: {
          executedAt: new Date().toISOString(),
          executionTime: Date.now()
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        stack: error.stack
      };
    }
  },

  // 清理（可选）
  async cleanup() {
    console.log('Skill cleanup');
    // 关闭连接、释放资源等
  }
};

// 辅助函数
async function processData(input) {
  // 你的业务逻辑
  return `处理结果: ${input}`;
}
```

### 创建 Skill 步骤

```bash
# 1. 创建目录
mkdir -p .claude/skills/my-skill

# 2. 创建 skill.json
cat > .claude/skills/my-skill/skill.json << 'EOF'
{
  "id": "my-skill",
  "name": "My Skill",
  "version": "1.0.0",
  "description": "我的自定义技能"
}
EOF

# 3. 创建 index.js
cat > .claude/skills/my-skill/index.js << 'EOF'
module.exports = {
  async execute(input, context) {
    return { success: true, output: "执行成功" };
  }
};
EOF
```

### 实用 Skill 示例

#### 文档生成 Skill
```javascript
// .claude/skills/doc-generator/skill.json
{
  "id": "doc-generator",
  "name": "文档生成器",
  "version": "1.0.0",
  "description": "自动为代码生成文档",
  "triggers": [
    { "type": "command", "pattern": "/docs" }
  ]
}
```

```javascript
// .claude/skills/doc-generator/index.js
module.exports = {
  async execute(input, context) {
    const fs = require('fs');
    const path = require('path');

    // 读取代码文件
    const filePath = path.join(context.workingDir, input);
    const content = fs.readFileSync(filePath, 'utf-8');

    // 生成文档（这里简化处理）
    const docs = `# 文档\n\n自动生成于 ${new Date().toISOString()}\n\n\`\`\`${content}\n\`\`\``;

    return {
      success: true,
      output: docs
    };
  }
};
```

---

## 四、hooks/（Hooks 配置）

### 目录结构
```
.claude/hooks/
├── pre-command.sh              # 命令执行前
├── post-command.sh             # 命令执行后
├── pre-agent-execution.sh      # Agent 执行前
├── post-agent-execution.sh     # Agent 执行后
├── pre-file-edit.sh            # 文件编辑前
└── post-file-edit.sh           # 文件编辑后
```

### Hook 类型与环境变量

| Hook | 触发时机 | 环境变量 | 返回值 |
|------|----------|----------|--------|
| pre-command | 命令执行前 | CLAUDE_COMMAND, CLAUDE_ARGS, CLAUDE_WORKING_DIR | 0 继续，非0 中止 |
| post-command | 命令执行后 | CLAUDE_COMMAND, CLAUDE_EXIT_CODE, CLAUDE_OUTPUT, CLAUDE_DURATION | 可选 |
| pre-agent-execution | Agent 执行前 | CLAUDE_AGENT_ID, CLAUDE_TASK, CLAUDE_PARAMETERS | 0 继续，非0 中止 |
| post-agent-execution | Agent 执行后 | CLAUDE_AGENT_ID, CLAUDE_EXECUTION_STATUS, CLAUDE_RESULT, CLAUDE_DURATION | 可选 |
| pre-file-edit | 文件编辑前 | CLAUDE_FILE_PATH, CLAUDE_EDIT_TYPE, CLAUDE_NEW_CONTENT | 0 继续，非0 中止 |
| post-file-edit | 文件编辑后 | CLAUDE_FILE_PATH, CLAUDE_EDIT_TYPE | 可选 |

### Hook 脚本示例

#### pre-command.sh（命令前验证）

```bash
#!/bin/bash
set -e

LOG_FILE="$HOME/.claude/hooks.log"

log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $*" >> "$LOG_FILE"
}

log "Command: $CLAUDE_COMMAND"
log "Args: $CLAUDE_ARGS"
log "Working Dir: $CLAUDE_WORKING_DIR"

# 禁止危险命令
dangerous=("rm -rf /" "dd if=" "mkfs" "format")
for cmd in "${dangerous[@]}"; do
  if [[ "$CLAUDE_COMMAND" == *"$cmd"* ]]; then
    log "BLOCKED: Dangerous command detected"
    echo "Error: 危险命令已被阻止"
    exit 1
  fi
done

exit 0
```

#### post-command.sh（命令后处理）

```bash
#!/bin/bash

LOG_FILE="$HOME/.claude/hooks.log"

log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $*" >> "$LOG_FILE"
}

if [[ $CLAUDE_EXIT_CODE -eq 0 ]]; then
  log "✓ Command succeeded: $CLAUDE_COMMAND"
else
  log "✗ Command failed: $CLAUDE_COMMAND (exit code: $CLAUDE_EXIT_CODE)"
fi

# 如果是 git 命令，记录状态
if [[ "$CLAUDE_COMMAND" == git* ]]; then
  git status --short >> "$LOG_FILE" 2>&1
fi
```

#### pre-file-edit.sh（文件编辑前备份）

```bash
#!/bin/bash

FILE_PATH="$CLAUDE_FILE_PATH"
BACKUP_DIR="$HOME/.claude/backups"

mkdir -p "$BACKUP_DIR"

if [[ -f "$FILE_PATH" ]]; then
  BACKUP_FILE="$BACKUP_DIR/$(basename "$FILE_PATH").$(date +%Y%m%d%H%M%S).bak"
  cp "$FILE_PATH" "$BACKUP_FILE"
  echo "备份已创建: $BACKUP_FILE"
fi

exit 0
```

#### post-file-edit.sh（文件编辑后格式化）

```bash
#!/bin/bash

FILE_PATH="$CLAUDE_FILE_PATH"

# 如果是 TypeScript/JavaScript 文件，使用 prettier 格式化
if [[ "$FILE_PATH" =~ \.(ts|js|tsx|jsx)$ ]]; then
  if command -v prettier &> /dev/null; then
    prettier --write "$FILE_PATH"
  fi
fi

exit 0
```

### Windows 下使用 PowerShell Hook

#### pre-command.ps1

```powershell
$LogFile = "$env:USERPROFILE\.claude\hooks.log"

function Log {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "[$timestamp] $Message" | Out-File -FilePath $LogFile -Append
}

Log "Command: $env:CLAUDE_COMMAND"
Log "Args: $env:CLAUDE_ARGS"

# 禁止危险命令
$dangerous = @("rm -rf /", "dd if=", "mkfs", "format")
foreach ($cmd in $dangerous) {
    if ($env:CLAUDE_COMMAND -like "*$cmd*") {
        Log "BLOCKED: Dangerous command detected"
        Write-Error "危险命令已被阻止"
        exit 1
    }
}

exit 0
```

---

## 五、logs/（日志目录）

### 目录结构
```
.claude/logs/
├── claude.log              # Claude Code 主日志
├── mcp-server.log          # MCP 服务器日志
└── skills/                 # Skills 日志
    └── skill-name.log
```

### 日志配置

在 `settings.json` 中配置：

```json
{
  "logging": {
    "level": "debug",
    "directory": ".claude/logs",
    "max_size_mb": 100,
    "max_files": 10,
    "format": "json"
  }
}
```

### 日志级别

| 级别 | 说明 |
|------|------|
| debug | 最详细的调试信息 |
| info | 一般信息 |
| warn | 警告信息 |
| error | 错误信息 |

---

## 六、cache/（缓存目录）

### 目录结构
```
.claude/cache/
├── conversations/          # 对话历史缓存
│   ├── session-1.json
│   └── session-2.json
└── tokens/                 # Token 使用记录
    └── usage.json
```

### 缓存配置

```json
{
  "cache": {
    "enabled": true,
    "directory": ".claude/cache",
    "max_size_mb": 500,
    "ttl_seconds": 86400
  }
}
```

---

## 配置优先级

CLI 参数 > 环境变量 > 项目配置 > 全局配置 > 默认值

---

## 最佳实践

### 1. 安全性
- 将 `.claude/settings.json` 添加到 `.gitignore`
- 使用环境变量管理 API 密钥
- 限制危险命令的权限

### 2. 性能优化
- 合理配置缓存大小
- 使用 hooks 进行必要的验证和处理
- 定期清理日志和缓存

### 3. 开发效率
- 创建常用的 Skill 模板
- 配置合适的权限规则
- 使用 hooks 自动化重复任务

### 4. .gitignore 配置

```gitignore
.claude/settings.json
.claude/mcp.json
.claude/logs/
.claude/cache/
.claude/backups/
```

### 5. 初始化完整配置的脚本

```bash
#!/bin/bash

# 创建目录结构
mkdir -p .claude/{skills,hooks,logs,cache}

# 创建基本配置
cat > .claude/settings.json << 'EOF'
{
  "model": "claude-sonnet-4-5-20250929",
  "permissions": {
    "allow": ["Bash(pnpm *)", "Bash(git *)", "Bash(ls *)", "Bash(mkdir *)"],
    "deny": ["Bash(rm -rf *)", "Bash(sudo *)"]
  }
}
EOF

# 创建 MCP 配置
cat > .claude/mcp.json << 'EOF'
{
  "mcpServers": {},
  "enabledServers": []
}
EOF

echo "Claude Code 配置已初始化"
```
