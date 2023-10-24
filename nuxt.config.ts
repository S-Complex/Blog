// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },
  modules: ['@nuxt/content'],
  content: {
    highlight: {
      theme: "material-theme-ocean",
    },
  },
  srcDir: './src'
})
