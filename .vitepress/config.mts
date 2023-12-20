import { defineConfig } from "vitepress";
import { createRssFile } from "./utils/rss";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Restent's Notebook",
  description:
    "Blog of Restent Ou (gxres042), lost in the nothingness and silence.",
  lang: "zh-CN",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://library.restent.win/images/icons/favicon.webp",
      },
    ],
  ],
  markdown: {
    theme: "material-theme-palenight",
  },
  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
  },
  sitemap: {
    hostname: 'https://blog.restent.win'
  },
  buildEnd: createRssFile,
});
