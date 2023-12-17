import "vuetify/styles";
import { createVuetify } from "vuetify";
import "@/css/main.scss";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      themes: {
        light: {
          colors: {
            background: "#ECEFF1",
            surface: "#FFFFFF",
            primary: "#039BE5",
            secondary: "#0288D1",
            blockquote: "#ECEFF1",
            blockquoteBorder: "#039BE5",
          },
        },
        dark: {
          colors: {
            background: "#212121",
            surface: "#263238",
            primary: "#039BE5",
            secondary: "#0288D1",
            blockquote: "#455A64",
            blockquoteBorder: "#039BE5",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
