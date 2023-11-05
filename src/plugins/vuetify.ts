import 'vuetify/styles'
import { createVuetify } from "vuetify";
import "@/assets/scss/style.scss";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      themes: {
        light: {
          colors: {
            background: "#ECEFF1",
            surface: "#FFFFFF",
            primary: "#1e90ff",
            secondary: "#87CEFA",
            blockquote: "#ECEFF1",
            blockquoteBorder: "#039BE5"
          },
        },
        dark: {
          colors: {
            background: "#212121",
            surface: "#263238",
            primary: "#1e90ff",
            secondary: "#87CEFA",
            blockquote: "#455A64",
            blockquoteBorder: "#0277BD"
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
