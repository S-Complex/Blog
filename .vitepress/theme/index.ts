// https://vitepress.dev/guide/custom-theme
import Layout from "./Layout.vue";
import type { Theme } from "vitepress";
import "./css/style.scss";
import vuetify from "./vuetify";
import Artalk from "./components/theme/Artalk.vue";

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(vuetify);
    app.component("Artalk", Artalk);
  },
} satisfies Theme;
