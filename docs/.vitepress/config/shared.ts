/*
 * @Description: 
 * @Author: xunzhaotech
 * @Email: luyb@xunzhaotech.com
 * @QQ: 1525572900
 * @Date: 2024-10-06 11:40:39
 * @LastEditTime: 2024-10-07 13:17:30
 * @LastEditors: xunzhaotech
 */
import { defineConfig } from "vitepress";
import { search as zhSearch } from "./zh";
import { qq } from "./icon";

export const shared = defineConfig({
  title: "MicroAdmin",

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  srcDir: "src",
  base: '/micro-admin-docs/',
  // base: process.env.BASE || '/',
  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/micro-admin.svg' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-JYHD4M2FMM' }],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JYHD4M2FMM');`
    ]
  ],

  themeConfig: {
    logo: { src: "/micro-admin.svg", width: 24, height: 24 },

    search: {
      provider: "algolia",
      options: {
        appId: "XVJOMWXWDI",
        apiKey: "763016448ef3b797fc4ed0283c5046ca",
        indexName: "micro-admin-netlify",
        locales: { ...zhSearch },
      },
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/chansee97/micro-admin" },
      {
        icon: {
          svg: qq,
        },
        link: "https://qm.qq.com/q/y7YXbq5WIo",
      },
    ],
  },
});
