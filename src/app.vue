<template>
  <v-app>
    <v-main>
      <Header />
      <Body />
      <Footer />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Header from './theme/components/Header.vue'
import Body from './theme/components/Body.vue'
import Footer from './theme/components/Footer.vue'
useHead({
  titleTemplate: (productCategory) => {
    return productCategory
      ? `${productCategory} - Restent's Notebook`
      : "Restent's Notebook";
  },
});
</script>
