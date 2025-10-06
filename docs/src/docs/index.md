# 欢迎来到 Learn Next.js 中文教程
本系列面向 Next.js 15.5.4（App Router）的官方学习教程，通过构建全栈 Web 应用更好地掌握 Next.js 的核心功能。
翻译与整理基于官方教程：[Learn Next.js](https://nextjs.org/learn)。
所有章节的 Example 代码均已测试与修正，参见 GitHub 项目：[micro-nextjs-app/](https://github.com/chansee97/nextjs-learn-example)。
## 技术栈架构
- [Next.js 15.5.4](https://nextjs.org/) (App Router)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) (云数据库)
- [Mongoose](https://mongoosejs.com/) ODM
- [NextAuth.js](https://authjs.dev/) (认证)
- [Tailwind CSS](https://tailwindcss.com/) (样式)
- [TypeScript](https://www.typescriptlang.org/)
## 教程目录
```sh
micro-nextjs-app/
├── lib/
│   ├── prisma.ts              # Prisma Client
│   ├── mongodb.ts             # MongoDB 连接
│   ├── db-utils.ts            # 数据库工具函数
│   └── db-operations.ts       # 安全操作封装
├── models/                    # 数据模型
│   ├── User.ts               # Mongoose 模型
│   └── Post.ts
├── app/
│   ├── api/
│   │   ├── users/
│   │   │   └── route.ts
│   │   ├── posts/
│   │   │   └── route.ts
│   │   └── health/
│   │       └── route.ts
│   ├── users/
│   │   └── page.tsx          # Server Component
│   └── posts/
│       └── page.tsx
├── components/
│   └── UserList.tsx          # Client Component
├── hooks/
│   └── useUsers.ts           # SWR Hook
└── prisma/
    └── schema.prisma         # Prisma Schema
```
## 官方地址
- [Github](https://github.com/chansee97/nextjs-learn-example)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js Showcase](https://nextjs.org/showcase)
- [Awesome Next.js](https://github.com/unicodeveloper/awesome-nextjs)