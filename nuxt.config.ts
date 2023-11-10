// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'
const baseUrl = 'https://blog.restent.win'

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
  feedme: {
    content: {
      feed: {
        defaults: {
          title: 'Restent \'s Notebook',
          description: 'Blog of Restent Ou which belongs to Sliver Complex.',
          copyright: 'Copyright © Restent Ou 2019 - present. Powered by Nuxt.js.',
          id: baseUrl,
          link: baseUrl,
          author: {
            name: 'Restent Ou',
            email: 'i@restent.win'
          },
        }
      }
    }
  },
  content: {
    highlight: {
      theme: "material-theme-ocean",
    },
  },
  srcDir: './src'
})
