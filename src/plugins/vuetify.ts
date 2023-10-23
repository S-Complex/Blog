import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@/assets/scss/style.scss";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      themes: {
        light: {
          colors: {
            background: "#FAFAFA",
            surface: "#FFFFFF",
            primary: "#1e90ff",
            secondary: "#87CEFA",
            blockquote: "#E0E0E0",
            blockquoteBorder: "#BDBDBD"
          },
        },
        dark: {
          colors: {
            background: "#000000",
            surface: "#212121",
            primary: "#1e90ff",
            secondary: "#87CEFA",
            blockquote: "#616161",
            blockquoteBorder: "#BDBDBD"
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
