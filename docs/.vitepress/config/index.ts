/*
 * @Description:
 * @Author: xunzhaotech
 * @Email: luyb@xunzhaotech.com
 * @QQ: 1525572900
 * @Date: 2024-10-07 12:32:26
 * @LastEditTime: 2024-11-02 20:07:52
 * @LastEditors: xunzhaotech
 */
import { defineConfig } from 'vitepress';
import { en } from "./en";
import { shared } from './shared';
import { zh } from './zh';

export default defineConfig({
  ...shared,
  locales: {
    root: { label: "English", ...en },
    zh: { label: "简体中文", ...zh },
  },
});
