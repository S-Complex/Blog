<script setup lang="ts">
import { useData } from 'vitepress'
import Index from '../page/Index.vue';
import PostContent from '../page/PostContent.vue';
import NotFound from '../page/NotFound.vue';

const { frontmatter, page } = useData()
</script>

<template>
    <v-container style="max-width: 900px">
        <Index v-if="frontmatter.home" />
        <NotFound v-else-if="page.isNotFound">123</NotFound>
        <PostContent v-else />
    </v-container>
</template>