// https://vitepress.dev/guide/custom-theme
import Layout from "./Layout.vue";
import type { Theme } from "vitepress";
import "./css/style.scss";
import vuetify from "./vuetify";

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(vuetify);
  },
} satisfies Theme;
