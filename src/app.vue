<template>
  <v-app>
    <div>
      <NuxtLoadingIndicator color="rgba(var(--v-theme-primary))" />
      <themeHeader />
      <div style="height:64px;" />
      <themeBanner />
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
    { name: 'description', content: 'Restent Ou (gxres042) 的个人博客，迷失于虚无与静寂之中。' }
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
      href: "https://library.restent.win/images/bg.webp",
      as: "image"
    },
    {
      rel: "preload",
      href: "https://library.restent.win/images/defaultBanner.webp",
      as: "image"
    },
    {
      rel: "preload",
      href: "https://library.restent.win/images/waitingImage.webp",
      as: "image"
    }
  ]
})
useSeoMeta({
  title: 'Restent\'s Notebook',
  ogTitle: 'Restent\'s Notebook',
  description: 'Restent Ou (gxres042) 的个人博客，迷失于虚无与静寂之中。',
  ogDescription: 'Restent Ou (gxres042) 的个人博客，迷失于虚无与静寂之中。',
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
