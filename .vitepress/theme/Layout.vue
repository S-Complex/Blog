<script setup lang="ts">
import Header from './components/theme/Header.vue';
import Banner from './components/theme/Banner.vue';
import Body from './components/theme/Body.vue';
import Footer from './components/theme/Footer.vue';
</script>

<template>
  <v-app>
    <Header />
    <div class="headerSpace" />
      <Banner />
      <Body />
    <Footer />
  </v-app>
</template>
