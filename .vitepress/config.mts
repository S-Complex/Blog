import { defineConfig } from "vitepress";
import { createAtomFile } from "./utils/rss";
import vuetify from "vite-plugin-vuetify";

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
        href: "https://library.gxres.net/images/icons/favicon.webp",
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
    plugins: [vuetify()],
  },
  sitemap: {
    hostname: "https://blog.gxres.net",
  },
  buildEnd: createAtomFile,
});
