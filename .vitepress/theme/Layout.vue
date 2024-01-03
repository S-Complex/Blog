<script setup lang="ts">
import Header from './components/theme/Header.vue';
import Banner from './components/theme/Banner.vue';
import Body from './components/theme/Body.vue';
import Footer from './components/theme/Footer.vue';
import { useTheme } from 'vuetify'
import { onMounted } from 'vue';
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

<template>
  <v-app>
    <v-theme-provider>
      <Header />
      <div class="headerSpace" />
      <Banner />
      <Body class="main" />
      <Footer />
    </v-theme-provider>
  </v-app>
</template>
