import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Restent's Notebook",
  description: "Notebook (Blog) of Restent.",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
