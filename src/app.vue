<template>
  <v-app>
    <div>
      <NuxtLoadingIndicator color="rgba(var(--v-theme-primary))" />
      <themeHeader />
      <div style="height:64px" />
      <themeBody />
      <themeFooter />
    </div>
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
    {
      rel: "preload",
      href: "https://library.restent.win/images/profile.webp",
      as: "image"
    },
    {
      rel: "preload",
      href: "https://library.restent.win/images/icons/avatar.webp",
      as: "image"
    },
    {
      rel: "preload",
      href: "https://library.restent.win/images/bg.webp",
      as: "image"
    },
    {
      rel: "stylesheet",
      href: "https://cdn.staticfile.org/vuetify/3.3.23/vuetify.min.css"
    },
    {
      rel: "prefetch",
      href: "https://cdn.staticfile.org/vuetify/3.3.23/vuetify.min.js",
      as: "script"
    }
  ]
})
useSeoMeta({
  title: 'Restent\'s Notebook',
  ogTitle: 'Restent\'s Notebook',
  description: 'Blog of Restent Ou which belongs to Sliver Complex.',
  ogDescription: 'Blog of Restent Ou which belongs to Sliver Complex.',
  ogImage: 'https://library.restent.win/images/icons/avatar.webp',
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
