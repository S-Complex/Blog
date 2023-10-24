<template>
  <v-app>
    <themeHeader />
    <v-main>
      <themeBody />
    </v-main>
    <themeFooter />
  </v-app>
</template>

<script setup lang="ts">
useHead({
  title: 'Restent\'s Notebook',
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Restent's Notebook` : 'Restent\'s Notebook';
  },
  meta: [
    { name: 'description', content: 'Blog of Restent Ou which belongs to Sliver Complex.' }
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
  ]
})
useSeoMeta({
  title: 'Restent\'s Notebook',
  ogTitle: 'Restent\'s Notebook',
  description: 'Blog of Restent Ou which belongs to Sliver Complex.',
  ogDescription: 'Blog of Restent Ou which belongs to Sliver Complex.',
  ogImage: 'https://library.restent.win/images/profile.webp',
})

import { useTheme } from 'vuetify'
const vuetifyTheme = useTheme()

function toggleTheme(themeName?: string) {
  vuetifyTheme.global.name.value = themeName ?? (vuetifyTheme.global.current.value.dark ? 'light' : 'dark')
}

onMounted(() => {
  const darkMatch = matchMedia('(prefers-color-scheme: dark)')
  toggleTheme(darkMatch.matches ? 'dark' : 'light')
  darkMatch.addEventListener('change', (event) =>
    toggleTheme(event.matches ? 'dark' : 'light')
  )
})
</script>