import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, md } from "vuetify/iconsets/md";

export default createVuetify({
    ssr: true,
    icons: {
      defaultSet: "md",
      aliases,
      sets: {
        md,
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
            customblockBG: "#ECEFF1",
          },
        },
        dark: {
          colors: {
            background: "#263238",
            surface: "#37474F",
            primary: "#039BE5",
            secondary: "#0288D1",
            blockquote: "#455A64",
            blockquoteBorder: "#039BE5",
            customblockBG: "#455A64",
          },
        },
      },
    },
})