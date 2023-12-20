<script setup lang="ts">
import { useData } from 'vitepress'
import Index from '../page/Index.vue';
import PostContent from '../page/PostContent.vue';

const { frontmatter } = useData()
</script>

<template>
    <v-container style="max-width: 900px">
        <Index v-if="frontmatter.home" />
        <PostContent v-else />
    </v-container>
</template>