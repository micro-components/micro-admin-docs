# 工具类提示词

工具脚本、CI/CD、部署、监控等场景的提示词模板。

## 脚本开发

### Node.js 脚本模板

```markdown
创建一个 Node.js 脚本：

**脚本名称**：&#123;&#123;name}}
**功能描述**：&#123;&#123;description}}

**使用方式**：
```bash
node &#123;&#123;name}}.js [选项]
```

**命令行参数**：
&#123;&#123;each args}}
- --&#123;&#123;this.name}}：&#123;&#123;this.description}}
  类型：&#123;&#123;this.type}}
  默认值：&#123;&#123;this.default}}
&#123;&#123;endeach}}

**功能流程**：
&#123;&#123;each steps}}
1. &#123;&#123;this}}
&#123;&#123;endeach}}

**技术要求**：
- 使用 commander.js 解析参数
- 使用 chalk 做日志着色
- 使用 fs-extra 处理文件操作
- 添加进度显示（如处理大量数据）
- 错误处理和优雅退出

**代码规范**：
- 完整的 JSDoc 注释
- TypeScript 类型定义
- 模块化拆分（辅助函数独立文件）

请提供完整的脚本代码。
```

## CI/CD

### GitHub Actions 工作流

```markdown
创建 GitHub Actions 工作流：

**工作流名称**：&#123;&#123;name}}
**触发条件**：&#123;&#123;triggers}}

**任务步骤**：
&#123;&#123;each steps}}
- &#123;&#123;this.name}}：&#123;&#123;this.description}}
&#123;&#123;endeach}}

**环境变量**：
&#123;&#123;each envVars}}
- &#123;&#123;this.name}}：&#123;&#123;this.description}}
&#123;&#123;endeach}}

**机密配置**：
&#123;&#123;each secrets}}
- &#123;&#123;this.name}}：&#123;&#123;this.description}}
&#123;&#123;endeach}}

**技术要求**：
- 使用 Actions Checkout v3
- Node.js 版本矩阵测试
- 依赖缓存优化
- 构建产物缓存
- 条件执行（仅主分支）
- 通知集成（如 Slack）

请提供完整的工作流 YAML 文件。
```

### Docker 配置

```markdown
创建 Docker 配置：

**镜像名称**：&#123;&#123;imageName}}
**基础镜像**：&#123;&#123;baseImage}}
**应用入口**：&#123;&#123;entrypoint}}

**多阶段构建**：
```dockerfile
# 构建阶段
FROM &#123;&#123;buildImage}} AS builder
# 构建步骤...

# 运行阶段
FROM &#123;&#123;runImage}}
# 复制构建产物
# 配置
```

**优化要点**：
- 使用 alpine 基础镜像减小体积
- .dockerignore 排除不必要文件
- 层缓存优化（依赖先安装）
- 非 root 用户运行
- 健康检查配置

**环境变量**：
&#123;&#123;each envVars}}
- &#123;&#123;this.name}}：&#123;&#123;this.description}}
&#123;&#123;endeach}}

**端口映射**：&#123;&#123;ports}}

请提供完整的 Dockerfile 和 .dockerignore。
```

## 部署配置

### Nginx 配置

```markdown
创建 Nginx 配置：

**站点域名**：&#123;&#123;domain}}
**应用类型**：&#123;&#123;appType}}（API/静态站点/SSR）

**配置要点**：
- 监听端口：&#123;&#123;port}}
- Gzip 压缩
- 静态资源缓存策略
- 反向代理（如需要）
- SSL/TLS 配置
- 安全头配置

**代理场景**（如适用）：
```nginx
location /api/ {
    proxy_pass &#123;&#123;upstream}};
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

**静态资源**：
- 缓存策略：&#123;&#123;cacheStrategy}}
- 根目录：&#123;&#123;root}}

请提供完整的 Nginx 配置文件。
```

## 监控日志

### 日志配置

```markdown
创建日志系统：

**日志级别**：DEBUG / INFO / WARN / ERROR
**输出目标**：&#123;&#123;outputs}}（Console/File/Remote）

**日志格式**：
```json
{
  "timestamp": "ISO8601",
  "level": "INFO",
  "message": "日志内容",
  "context": {
    "userId": "xxx",
    "requestId": "xxx"
  }
}
```

**技术栈**：&#123;&#123;stack}}（winston/pino/log4js）

**功能要求**：
- 分级日志输出
- 日志轮转（按大小/时间）
- 错误堆栈追踪
- 请求 ID 串联
- 结构化日志字段

**敏感信息处理**：
- 自动过滤密码、Token 等敏感字段
- 配置化白名单

请提供完整的日志配置代码。
```
