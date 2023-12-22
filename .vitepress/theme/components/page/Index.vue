<script setup lang="ts">
import { data as posts } from './posts.data';

import { mdiClockOutline } from '@mdi/js';
</script>

<template>
    <div v-for="post of posts">
        <v-row>
            <v-col>
                <v-card :href="post.url">
                    <v-img lazy-src="https://library.gxres.net/images/waitingImage.webp" class="align-end text-white"
                        width="100%" height="200" gradient="rgba(0,0,0,.2), rgba(0,0,0,.2)"
                        v-bind:src="post.banner ?? 'https://library.gxres.net/images/defaultBanner.webp'" cover
                        alt="Post banner image">
                        <v-card-title style="white-space: normal">{{ post.title }}</v-card-title>
                    </v-img>
                    <v-card-text>
                        <div class="text-body-1 mb-2">{{ post.description }}</div>
                        <v-chip :prepend-icon="mdiClockOutline" variant="text">{{ post.date.string }}</v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>