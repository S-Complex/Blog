import 'vuetify/styles'
import { createVuetify } from "vuetify";
import "@/assets/scss/style.scss";
import { aliases, md } from 'vuetify/iconsets/md';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    icons: {
      defaultSet: 'md',
      aliases,
      sets: {
        md,
      }
    },
    theme: {
      themes: {
        light: {
          colors: {
            background: "#ECEFF1",
            surface: "#FFFFFF",
            primary: "#2196F3",
            secondary: "#03A9F4",
            blockquote: "#ECEFF1",
            blockquoteBorder: "#039BE5"
          },
        },
        dark: {
          colors: {
            background: "#212121",
            surface: "#263238",
            primary: "#2196F3",
            secondary: "#03A9F4",
            blockquote: "#455A64",
            blockquoteBorder: "#0277BD"
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
