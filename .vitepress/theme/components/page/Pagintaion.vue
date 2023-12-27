<script setup lang="ts">
import { useData } from 'vitepress'
import { data as posts } from './posts.data';
import { computed } from 'vue';

const PAGE_SIZE = 10
const { params } = useData()
const totalPages = Math.ceil(posts.length / PAGE_SIZE)
const currentPage = computed(() => (params.value?.page || 1) as number)
</script>

<template>
<div class="d-flex justify-center">
  <div class="pa-2 ma-2">
    <v-btn v-if="currentPage === 2" :href="`/`">上一页</v-btn>
    <v-btn v-else :disabled="currentPage === 1" :href="`/page/${currentPage - 1}`">上一页</v-btn>
  </div>
  <div class="pa-2 ma-2 align-self-center">
    <p>第 {{ currentPage }} 页</p>
  </div>
  <div class="pa-2 ma-2">
    <v-btn :disabled="currentPage === totalPages" :href="`/page/${currentPage + 1}`">下一页</v-btn>
  </div>
</div>
</template>
