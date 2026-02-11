import { defineConfig, type DefaultTheme } from "vitepress";

export const zh = defineConfig({
  lang: "zh-Hans",
  description: "一个简洁、干净的中后台框架",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/guide/": { base: "/guide/", items: sidebarGuide() },
      "/other/": { base: "/other/", items: sidebarReference() },
      "/dev/": { base: "/dev/", items: sidebarEnv() },
      "/docs/": { base: "/docs/", items: sidebarDocs() },
      "/ai/": { base: "/ai/", items: sidebarAi() },
    },

    editLink: {
      pattern:
        "https://github.com/chansee97/micro-admin-docs/edit/main/src/:path",
      text: "在 GitHub 上编辑此页面",
    },

    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 ©2022-present MicroDesign UI`,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "指南",
      link: "/guide/introduction",
      activeMatch: " /guide/",
    },
    {
      text: "开发配置",
      link: "/dev/",
      activeMatch: " /dev/",
    },
    {
      text: "产品/文档",
      items: [
        {
          text: "在线预览",
          link: "https://micro-admin-site.netlify.app/",
        },
        {
          text: "micro-design-admin",
          link: "/docs/admin",
        },
        {
          text: "micro-design-next",
          link: "/docs/next",
        },
        {
          text: "micro-design-uniapp",
          link: "/docs/uniapp",
        },
        // {
        //   text: "更新日志",
        //   link: "https://github.com/chansee97/micro-admin/releases",
        // },
      ],
    },
    {
      text: "其他问题",
      link: "/other/FAQ",
      activeMatch: " /other/",
    },
    {
      text: "AI编程",
      link: "/ai/",
      activeMatch: " /ai/",
    },
    {
      text: "捐助",
      link: "/donate",
      activeMatch: " /donate/",
    },
    {
      text: "关于",
      items: [
        {
          text: "在线预览",
          link: "https://micro-admin-site.netlify.app/",
        },
        {
          text: "Github",
          link: "https://github.com/chansee97/micro-admin",
        },
        {
          text: "Gitee",
          link: "https://gitee.com/chansee97/micro-admin",
        },
        {
          text: "文档仓库",
          link: "https://github.com/chansee97/micro-admin-docs",
        },
        {
          text: "更新日志",
          link: "https://github.com/chansee97/micro-admin/releases",
        },
      ],
    },
  ];
}
function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "指南",
      items: [
        { text: "项目介绍", link: "introduction" },
        { text: "快速开始", link: "get-start" },
        { text: "目录结构", link: "directory-structure" },
      ],
    },
    {
      text: "基本配置",
      items: [
        { text: "服务配置", link: "service" },
        { text: "路由菜单", link: "modify-routers" },
        { text: "权限控制", link: "permission-control" },
        { text: "环境变量", link: "env-variable" },
        { text: "自定义主题", link: "custom-theme" },
      ],
    },
    {
      text: "SDD开发配置",
      items: [
        { text: "SDD开发指南", link: "sdd-development" },
      ],
    },
    {
      text: "系统业务模块",
      items: [
        { text: "CRM客户管理", link: "crm" },
        { text: "ERP企业资源", link: "erp" },
        { text: "商城系统", link: "mall" },
        { text: "工作流引擎", link: "workflow" },
        { text: "IoT物联网", link: "iot" },
        { text: "BI数据可视化", link: "bi" },
        { text: "互联网医院", link: "hospital" },
      ],
    },
    {
      text: "扩展使用",
      items: [
        { text: "使用图标", link: "use-icons" },
        { text: "国际化(i18n)", link: "i18n" },
        { text: "UnoCSS", link: "unocss" },
      ],
    },
    {
      text: "相关内容",
      items: [{ text: "配套后端项目", link: "backend-project" }],
    },
  ];
}
function sidebarDocs(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "介绍",
      items: [
        { text: "第一章 入门", link: "Chapter1" },
        { text: "第二章 开发", link: "Chapter2" },
        { text: "目录结构", link: "directory-structure" },
      ],
    },
    {
      text: "数据库集成",
      items: [
        { text: "介绍", link: "introduction" },
        { text: "快速开始", link: "get-start" },
        { text: "目录结构", link: "directory-structure" },
      ],
    },
    {
      text: "项目部署",
      items: [
        { text: "介绍", link: "deploy" },
      ],
    },
  ];
}
function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "其他问题",
      items: [{ text: "FAQ", link: "FAQ" }],
    },
  ];
}
function sidebarEnv(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "项目配置",
      items: [
        { text: "项目创建", link: "create" },
        { text: "环境变量", link: "env" },
        { text: "项目插件", link: "plugins"}
      ],
    },
    {
      text: "开发工具",
      items: [
        { text: "VSCode插件", link: "vc-plugins" },
        { text: "便利工具", link: "awesome-tools" }
      ],
    },
    {
      text: "开发环境",
      items: [
        { text: "Git", link: "git" },
        { text: "NodeJs", link: "nodejs" },
        { text: "MySql", link: "mysql" },
      ],
    },
  ];
}
function sidebarAi(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Claude Code 简介",
      items: [
        { text: "什么是 Claude Code", link: "index" },
        { text: "核心特性", link: "features" },
        { text: "适用场景", link: "use-cases" },
      ],
    },
    {
      text: "安装与配置",
      items: [
        { text: "系统要求", link: "installation/requirements" },
        { text: "安装指南", link: "installation/install" },
        { text: "环境变量配置", link: "installation/env-config" },
        { text: "API密钥配置", link: "installation/api-key" },
        { text: "常见安装问题", link: "installation/troubleshooting" },
      ],
    },
    {
      text: "基础配置",
      items: [
        { text: "项目初始化", link: "basic/project-init" },
        { text: "工作空间配置", link: "basic/workspace" },
        { text: "提示词配置", link: "basic/prompt-config" },
        { text: "规则与记忆管理", link: "basic/rules-memory" },
      ],
    },
    {
      text: "VS Code 集成",
      items: [
        { text: "安装 VS Code 扩展", link: "vscode/install-extension" },
        { text: "配置扩展设置", link: "vscode/extension-settings" },
        { text: "快捷键配置", link: "vscode/keybindings" },
        { text: "工作区设置", link: "vscode/workspace-settings" },
      ],
    },
    {
      text: "开发工作流",
      items: [
        { text: "新建项目流程", link: "workflow/new-project" },
        { text: "代码生成工作流", link: "workflow/code-generation" },
        { text: "调试与重构", link: "workflow/debug-refactor" },
        { text: "测试工作流", link: "workflow/testing" },
      ],
    },
    {
      text: "高级配置",
      items: [
        { text: "自定义提示词模板", link: "advanced/custom-prompts" },
        { text: "创建自定义规则", link: "advanced/custom-rules" },
        { text: "工具配置", link: "advanced/tools-config" },
        { text: "技能包使用", link: "advanced/skills" },
        { text: "子代理配置", link: "advanced/agents" },
      ],
    },
    {
      text: "最佳实践",
      items: [
        { text: "提示词编写技巧", link: "best-practices/prompting" },
        { text: "代码质量保证", link: "best-practices/code-quality" },
        { text: "效率提升技巧", link: "best-practices/efficiency" },
        { text: "团队协作", link: "best-practices/collaboration" },
      ],
    },
    {
      text: "常见任务示例",
      items: [
        { text: "创建 React 组件", link: "examples/react-component" },
        { text: "编写测试用例", link: "examples/test-cases" },
        { text: "重构代码", link: "examples/refactor" },
        { text: "添加新功能", link: "examples/feature" },
        { text: "修复 Bug", link: "examples/bugfix" },
      ],
    },
    {
      text: "集成服务",
      items: [
        { text: "数据库集成", link: "integration/database" },
        { text: "部署服务集成", link: "integration/deploy" },
        { text: "第三方 API 集成", link: "integration/third-party" },
      ],
    },
    {
      text: "故障排除",
      items: [
        { text: "常见错误", link: "troubleshooting/common-errors" },
        { text: "性能优化", link: "troubleshooting/performance" },
        { text: "网络问题", link: "troubleshooting/network" },
        { text: "调试技巧", link: "troubleshooting/debugging" },
      ],
    },
  ];
}
export const search: DefaultTheme.AlgoliaSearchOptions["locales"] = {
  zh: {
    placeholder: "搜索文档",
    translations: {
      button: {
        buttonText: "搜索文档",
        buttonAriaLabel: "搜索文档",
      },
      modal: {
        searchBox: {
          resetButtonTitle: "清除查询条件",
          resetButtonAriaLabel: "清除查询条件",
          cancelButtonText: "取消",
          cancelButtonAriaLabel: "取消",
        },
        startScreen: {
          recentSearchesTitle: "搜索历史",
          noRecentSearchesText: "没有搜索历史",
          saveRecentSearchButtonTitle: "保存至搜索历史",
          removeRecentSearchButtonTitle: "从搜索历史中移除",
          favoriteSearchesTitle: "收藏",
          removeFavoriteSearchButtonTitle: "从收藏中移除",
        },
        errorScreen: {
          titleText: "无法获取结果",
          helpText: "你可能需要检查你的网络连接",
        },
        footer: {
          selectText: "选择",
          navigateText: "切换",
          closeText: "关闭",
          searchByText: "搜索提供者",
        },
        noResultsScreen: {
          noResultsText: "无法找到相关结果",
          suggestedQueryText: "你可以尝试查询",
          reportMissingResultsText: "你认为该查询应该有结果？",
          reportMissingResultsLinkText: "点击反馈",
        },
      },
    },
  },
};
