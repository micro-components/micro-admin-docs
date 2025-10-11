# Uni-app 实战指南：从入门到上线（含最佳实践与示例）

uni-app 是基于 Vue 技术栈的跨端框架，一套代码可同时构建 H5、各类小程序、App（App Plus）等多平台应用。本文面向工程落地，聚焦“如何高质量地做一个可上线的项目”。

## 为什么选 uni-app
- 生态成熟：Vue3 + Vite 版本性能更好，Pinia、TypeScript 支持完善
- 跨端统一：页面、组件、样式基本统一，差异通过条件编译与平台 API 处理
- 工程友好：HBuilderX 可视化、CLI/Vite 脚手架、内置 pages.json 配置式路由

---

## 快速开始

两种主流方式：
1) HBuilderX（适合快速多端预览与打包）
2) Vite 脚手架（适合前端工程流程、CI/CD）

脚手架示例（推荐 Vue3 + Vite 预设）：
```bash
# 创建项目（使用 degit 拉取官方预设）
npx degit dcloudio/uni-preset-vue#vite my-uniapp
cd my-uniapp

# 安装依赖（推荐 pnpm）
pnpm i

# 开发预览（H5）
pnpm dev:h5

# 小程序（以微信为例，生成 dist，导入微信开发者工具预览）
pnpm build:mp-weixin

# App（HBuilderX 打包更友好，或使用 CLI + 云打包）
# HBuilderX：运行到手机或模拟器，打包生成 APK/IPA
```

---

## 目录结构与关键文件

典型结构（Vite 预设）：
```
my-uniapp/
├─ src/
│  ├─ pages/           # 页面
│  ├─ components/      # 自定义组件
│  ├─ store/           # Pinia 状态管理
│  ├─ utils/           # 工具函数/请求封装
│  ├─ static/          # 静态资源
│  ├─ App.vue          # 应用入口
│  └─ main.ts          # 入口初始化
├─ pages.json          # 路由、tabBar、分包等配置
├─ manifest.json       # 应用信息、App权限配置
├─ uni.scss            # 全局样式变量
└─ vite.config.ts
```

---

## 页面与路由：pages.json

uni-app 使用配置式路由（非前端路由库），通过 `pages.json` 声明页面、tabBar、分包等：

```json
{
  "pages": [
    {
      "path": "pages/home/index",
      "style": {
        "navigationBarTitleText": "首页",
        "enablePullDownRefresh": true
      }
    },
    {
      "path": "pages/user/index",
      "style": {
        "navigationBarTitleText": "我的"
      }
    }
  ],
  "tabBar": {
    "color": "#7A7E83",
    "selectedColor": "#3cc51f",
    "borderStyle": "black",
    "backgroundColor": "#ffffff",
    "list": [
      { "pagePath": "pages/home/index", "text": "首页", "iconPath": "static/home.png", "selectedIconPath": "static/home-active.png" },
      { "pagePath": "pages/user/index", "text": "我的", "iconPath": "static/user.png", "selectedIconPath": "static/user-active.png" }
    ]
  },
  "subPackages": [
    {
      "root": "package-user",
      "pages": [
        { "path": "pages/detail/index" }
      ]
    }
  ]
}
```

页面跳转：
```ts
// 跳转到非 tabBar 页面
uni.navigateTo({ url: '/pages/user/index' });
// 切换 tab
uni.switchTab({ url: '/pages/home/index' });
```

---

## 组件与样式

- 组件：使用 `Vue3 SFC` 与内置组件 `<view> <text> <image> <scroll-view>` 等
- 样式：推荐使用 `uni.scss` 定义全局变量；注意小程序端不支持某些 CSS 特性

示例组件：
```vue
<template>
  <view class="card">
    <text class="title">{{ title }}</text>
    <slot />
  </view>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<style scoped>
.card { padding: 16rpx; border-radius: 12rpx; background: #fff; }
.title { font-size: 32rpx; font-weight: 600; }
</style>
```

---

## 网络请求封装（含拦截与错误兜底）

统一封装 `uni.request`，处理 BaseURL、Token、错误码映射：

```ts
// src/utils/request.ts
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
const BASE_URL = import.meta.env.VITE_API_BASE || 'https://api.example.com';

function getToken() {
  return uni.getStorageSync('token') || '';
}

export interface HttpOptions<T = any> {
  url: string;
  method?: HttpMethod;
  data?: Record<string, any>;
  header?: Record<string, string>;
  timeout?: number;
}

export function http<T = any>(options: HttpOptions): Promise<T> {
  const { url, method = 'GET', data = {}, header = {}, timeout = 15000 } = options;
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      timeout,
      header: {
        'Content-Type': 'application/json',
        Authorization: getToken() ? `Bearer ${getToken()}` : '',
        ...header,
      },
      success: (res) => {
        const { statusCode, data } = res;
        // 后端约定：200-299 为成功
        if (statusCode >= 200 && statusCode < 300) {
          resolve(data as T);
        } else {
          // 统一错误兜底
          uni.showToast({ title: `错误：${statusCode}`, icon: 'none' });
          reject(res);
        }
      },
      fail: (err) => {
        uni.showToast({ title: '网络异常', icon: 'none' });
        reject(err);
      }
    });
  });
}

// 使用示例
// const user = await http<{ name: string }>({ url: '/user/profile', method: 'GET' });
```

建议：
- 接口分模块：`src/api/user.ts`、`src/api/order.ts`
- 加入重试与取消：通过 `AbortController` 或手动管理请求队列（H5/小程序差异注意）

---

## 状态管理：Pinia

使用 Pinia 管理跨页面状态（用户信息、购物车等）。在 `main.ts` 中注册，然后在各页面使用：

```ts
// src/store/user.ts
import { defineStore } from 'pinia';

interface UserState {
  token: string;
  profile: { name?: string; avatar?: string } | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({ token: '', profile: null }),
  actions: {
    setToken(t: string) {
      this.token = t;
      uni.setStorageSync('token', t);
    },
    clear() {
      this.token = '';
      this.profile = null;
      uni.removeStorageSync('token');
    }
  },
});
```

页面使用：
```ts
import { useUserStore } from '@/store/user';
const user = useUserStore();
user.setToken('xxx');
```

---

## 平台差异与条件编译

处理平台差异的推荐方式：
- 条件编译指令：
```ts
// #ifdef H5
console.log('仅在 H5 执行');
// #endif

// #ifdef MP-WEIXIN
console.log('仅在微信小程序执行');
// #endif
```

- 运行时判断：
```ts
const sys = uni.getSystemInfoSync();
if (sys.platform === 'android') {
  // Android 特定逻辑
}
```

---

## 生命周期与常用 API

- App.vue：`onLaunch`、`onShow` 适合初始化、权限检查
- 页面：`onLoad`、`onShow`、`onPullDownRefresh`、`onReachBottom`

示例：
```ts
// App.vue
onLaunch(() => {
  // 初始化，如读取本地缓存、检查更新
});
onShow(() => {
  // 统计埋点
});
```

常用 API：
- 本地存储：`uni.setStorageSync / uni.getStorageSync`
- 导航：`uni.navigateTo / uni.switchTab / uni.redirectTo / uni.reLaunch`
- 交互：`uni.showToast / uni.showModal / uni.showLoading`

---

## 性能优化与体积控制

- 分包加载：在 `pages.json` 使用 `subPackages` 减少首包体积
- 资源优化：图片压缩、雪碧图、不必要的字体与大图
- 列表优化：`scroll-view`、`virtual-list`（H5），避免在小程序端渲染过多节点
- 条件编译移除平台无关代码
- 合理使用 `v-if` 与 `v-show`（切换频繁用 `v-show`）

---

## UI 组件库与 nvue

- 组件库：`uni-ui`、`uView` 等，注意选择与目标平台兼容的版本
- nvue：更接近原生渲染（App端），适合复杂高性能页面；与 Vue 语法略有差异，需单独学习

---

## 登录与权限（示例流程）

- Token 登录：后端返回 Token，存储于 `uniStorage`
- 小程序登录：结合 `wx.login` 获取 `code`，后端换取会话

示例（简化）：
```ts
// src/api/auth.ts
import { http } from '@/utils/request';
import { useUserStore } from '@/store/user';

export async function loginByPassword(username: string, password: string) {
  const res = await http<{ token: string }>({ url: '/auth/login', method: 'POST', data: { username, password } });
  useUserStore().setToken(res.token);
}
```

---

## 构建与发布

- H5：
```bash
pnpm build:h5
# 输出 dist/build/h5，部署到静态服务器或 CDN
```

- 小程序（微信为例）：
```bash
pnpm build:mp-weixin
# 用微信开发者工具导入 dist/build/mp-weixin 目录，上传审核
```

- App：
  - HBuilderX：可视化打包，云打包 iOS/Android
  - 证书与权限在 `manifest.json` 中配置；调试用真机 USB + 运行到手机

CI/CD 提示：
- 使用 `node 18+` 与 `pnpm` 缓存
- 按平台拆分构建任务，产物分别上传到对应平台

---

## 调试与排错

- 日志：`console.log` + 统一日志上报（H5/小程序分别处理）
- 网络：抓包工具（charles/whistle），H5 直接浏览器 devtools，小程序用平台工具
- 真机测试：重要交互与性能必须真机验证

常见坑：
- 平台差异导致样式异常（设置 reset、注意 rpx 与 px 的差异）
- 小程序不支持部分 DOM/CSS 特性（避免使用不兼容属性）
- 条件编译漏写导致某平台报错
- 路由路径必须与 `pages.json` 一致（区分大小写）

---

## 最佳实践清单

- 代码组织：API 模块化、组件原子化、状态最小化
- 多端差异：统一封装平台能力，条件编译集中管理
- 错误处理：请求兜底 + 全局 Toast/Modal；关键错误上报
- 性能：首屏轻量、分包、图片/字体优化
- 安全：Token 存储与过期处理、敏感信息不入仓
- 发布：多平台流水线与灰度策略，版本号管理

---

## 结语

uni-app 适合快速交付多端应用。按照上文的工程化思路与示例代码，你可以在保持跨端一致性的同时，兼顾性能与可维护性。建议结合目标平台的开发者工具与真机测试，把发布与回归流程跑通，即可稳健上线。