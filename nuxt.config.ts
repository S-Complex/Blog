// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Restent's Notebook",
      meta: [
        {
          name: "description",
          content: "Blog of Restent which belongs to Sliver Complex.",
        },
      ],
      link: [
        {
          rel: "shortcut icon",
          href: "https://library.restent.win/images/icons/favicon.webp",
        },
        {
          rel: "apple-touch-icon",
          href: "https://library.restent.win/images/icons/favicon.webp",
        },
      ],
    },
  },
  css: ["@/assets/scss/style.scss"],
  build: {
    transpile: ["vuetify"],
  },
  srcDir: "src/",
  modules: ["@nuxt/content"],
  content: {
    highlight: {
      theme: 'github-dark'
    }
  }
});
