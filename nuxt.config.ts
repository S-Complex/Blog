// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@nuxt/content',
    'nuxt-simple-sitemap',
    'nuxt-feedme',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(
        vuetify()
      ))
    },
  ],
  site: {
    url: 'https://blog.restent.win',
  },
  sitemap: {
    autoLastmod: false,
  },
  content: {
    highlight: {
      theme: "material-theme-ocean",
    },
  },
  srcDir: './src'
})
