<script setup lang="ts">
import { useData } from 'vitepress'
import { data as posts } from './posts.data';
import { computed } from 'vue';
import Pagintaion from './Pagintaion.vue';

const PAGE_SIZE = 10
const { params } = useData()
const currentPosts = computed(() => {
    const { page } = params.value || { page: 1 }
    const start = (page - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE
    return posts.slice(start, end)
})
</script>

<template>
    <div v-for="post of currentPosts">
        <v-row>
            <v-col>
                <v-card :href="post.url">
                    <v-img lazy-src="https://library.gxres.net/images/defaultBanner.webp" class="align-end text-white"
                        width="100%" height="200" gradient="rgba(0,0,0,.2), rgba(0,0,0,.2)"
                        v-bind:src="post.banner ?? 'https://library.gxres.net/images/defaultBanner.webp'" cover
                        alt="Post banner image">
                        <v-card-title style="white-space: normal">{{ post.title }}</v-card-title>
                    </v-img>
                    <v-card-text>
                        <div class="text-body-1 mb-2">{{ post.description }}</div>
                        <v-chip prepend-icon="access_time_filled" variant="text">{{ post.date.string }}</v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
    <br />
    <Pagintaion />
</template>