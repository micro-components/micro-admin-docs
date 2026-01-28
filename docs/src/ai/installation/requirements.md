# 系统要求

在使用 Claude Code 之前，请确保您的系统满足以下最低要求。

## 操作系统

Claude Code 支持以下操作系统：

### Windows
- **Windows 10** 或更高版本（推荐 Windows 11）
- Windows Server 2016 或更高版本

### macOS
- **macOS 10.15 (Catalina)** 或更高版本
- 推荐：macOS 12 (Monterey) 或更高版本

### Linux
- **Ubuntu 18.04** 或更高版本
- **Debian 10** 或更高版本
- **Fedora 29** 或更高版本
- **CentOS 7** 或更高版本
- 其他主流 Linux 发行版（需要支持 Node.js）

## 硬件要求

### 最低配置
- **CPU**: 双核处理器（Intel Core i5 / AMD Ryzen 3 或同等）
- **内存**: 4GB RAM
- **硬盘空间**: 500MB 可用空间
- **网络**: 稳定的互联网连接

### 推荐配置
- **CPU**: 四核处理器（Intel Core i7 / AMD Ryzen 5 或更高）
- **内存**: 8GB RAM 或更多
- **硬盘空间**: 2GB 或更多可用空间
- **网络**: 高速互联网连接（推荐 10Mbps 以上）

### 开发大型项目
- **CPU**: 六核以上处理器
- **内存**: 16GB RAM 或更多
- **硬盘空间**: 5GB 或更多可用空间（包含缓存）
- **网络**: 稳定高速连接

## 软件依赖

### Node.js
Claude Code 需要 Node.js 运行环境：

- **最低版本**: Node.js 16.x
- **推荐版本**: Node.js 18.x LTS 或 20.x LTS
- **包管理器**: npm、yarn 或 pnpm

检查 Node.js 版本：
```bash
node --version
```

如果未安装或版本过低，请访问 [Node.js 官网](https://nodejs.org/) 下载安装。

### npm / 包管理器
- **npm**（随 Node.js 安装）
- **yarn**（可选，推荐 1.22+）
- **pnpm**（可选，推荐 8.x+）

### Git
- **最低版本**: Git 2.x
- 用于代码版本控制和某些集成功能

检查 Git 版本：
```bash
git --version
```

### VS Code（可选但推荐）
- **最低版本**: VS Code 1.75+
- **推荐版本**: 最新稳定版

VS Code 扩展需要 VS Code 作为宿主环境。

## 浏览器要求（用于 Web 界面）

如果您使用 Claude Code 的 Web 界面：

- **Chrome**: 最新稳定版
- **Firefox**: 最新稳定版
- **Safari**: 14+
- **Edge**: 最新稳定版

## 网络要求

### API 访问
- **稳定连接**: 需要稳定的互联网连接访问 Claude API
- **带宽**: 推荐 1Mbps 以上
- **延迟**: 建议 < 200ms

### 防火墙和代理
如果您在公司网络或使用代理：

- 确保可以访问 `api.anthropic.com`
- 如需代理配置，请参考 [环境变量配置](env-config)
- 某些公司网络可能需要白名单配置

## 区域限制

Claude Code 在某些地区可能无法使用或功能受限：

- **完全支持**: 美国、欧洲大部分地区
- **部分支持**: 其他地区
- **不支持**: 请查看 Anthropic 的官方服务可用性文档

## 磁盘空间分配

### 安装空间
- 核心程序：约 50MB
- 依赖包：约 100-200MB

### 运行时空间
- 缓存文件：根据项目大小，50MB - 数 GB
- 临时文件：约 100MB
- 日志文件：约 50MB

### 建议
- 为 Claude Code 分配至少 2GB 空间
- 定期清理缓存以释放空间
- 将缓存目录设置到有足够空间的磁盘

## 权限要求

### Windows
- 标准/管理员权限（某些功能可能需要管理员权限）
- 安装目录的写入权限
- 环境变量修改权限（如需配置）

### macOS
- 标准/管理员权限
- `/usr/local` 或安装目录的写入权限
- 如果使用 Homebrew，需要相关权限

### Linux
- 标准/用户权限（推荐）
- 某些全局安装可能需要 sudo
- 安装目录的写入权限

## 虚拟化和容器

### 虚拟机
- **支持**: VMware、VirtualBox、Hyper-V 等
- **要求**: 足够分配的资源（参考硬件要求）
- **注意**: 共享文件夹的权限配置

### Docker
- **支持**: 是
- **要求**: Docker 19.03+
- **配置**: 需要映射必要的端口和卷

### WSL (Windows Subsystem for Linux)
- **支持**: WSL 2（推荐）和 WSL 1
- **要求**: Windows 10 version 2004 或更高
- **注意**: 某些功能可能需要额外配置

## 性能基准

### 小型项目（< 1000 文件）
- **响应时间**: < 2秒
- **内存占用**: 100-200MB

### 中型项目（1000-10000 文件）
- **响应时间**: 2-5秒
- **内存占用**: 200-500MB

### 大型项目（> 10000 文件）
- **响应时间**: 5-10秒
- **内存占用**: 500MB-2GB

## 兼容性问题

### 已知问题

1. **Windows Defender** 可能会影响性能
   - 解决：将安装目录添加到排除列表

2. **macOS Gatekeeper** 可能阻止某些功能
   - 解决：在"系统偏好设置 > 安全性与隐私"中允许

3. **Linux SELinux** 可能限制文件访问
   - 解决：适当配置 SELinux 策略

4. **老旧的 Node.js 版本** 可能导致兼容性问题
   - 解决：升级到推荐的 Node.js 版本

## 检查系统兼容性

运行以下命令检查您的系统是否满足要求：

```bash
# 检查 Node.js
node --version

# 检查 npm
npm --version

# 检查 Git
git --version

# 检查可用内存
# Linux/macOS
free -h
# Windows
systeminfo | findstr /C:"Available Physical Memory"

# 检查磁盘空间
# Linux/macOS
df -h
# Windows
wmic logicaldisk get size,freespace,caption
```

---

准备好开始安装了吗？继续阅读 [安装指南](install)。
