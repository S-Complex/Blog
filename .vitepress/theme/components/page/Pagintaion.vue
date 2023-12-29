<script setup lang="ts">
import { useData } from 'vitepress'
import { data as posts } from './posts.data';
import { computed } from 'vue';
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js'

const PAGE_SIZE = 10
const { params } = useData()
const totalPages = Math.ceil(posts.length / PAGE_SIZE)
const currentPage = computed(() => (params.value?.page || 1) as number)
</script>

<template>
  <div class="d-flex justify-space-between mb-6">
    <div class="pa-2 ma-2">
      <v-btn icon v-if="currentPage === 2" :href="`/`"><v-icon :icon="mdiArrowLeft" /></v-btn>
      <v-btn icon v-else :disabled="currentPage === 1" :href="`/page/${currentPage - 1}`"><v-icon :icon="mdiArrowLeft" /></v-btn>
    </div>
    <div class="pa-1 ma-1 align-self-center">
      <p class="text-body-2">第 {{ currentPage }} 页，共 {{ totalPages }} 页</p>
    </div>
    <div class="pa-2 ma-2">
      <v-btn icon :disabled="currentPage === totalPages" :href="`/page/${currentPage + 1}`"><v-icon :icon="mdiArrowRight" /></v-btn>
    </div>
  </div>
</template>
