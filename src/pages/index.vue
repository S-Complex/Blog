<template>
    <Head>
        <Title>Index</Title>
    </Head>
    <v-container style="max-width:900px;">
        <div v-for="{ _path: slug, title, date, description, banner } in blogPosts" :key="slug">
            <ContentList path="/posts" v-slot="{ list }">
                <v-row>
                    <v-col>
                        <v-card :to="slug">
                            <v-img lazy-src="https://library.restent.win/images/waitingImage.webp"
                                class="align-end text-white" width="100%" height="200"
                                gradient="rgba(0,0,0,.2), rgba(0,0,0,.2)"
                                v-bind:src="banner ?? 'https://library.restent.win/images/defaultBanner.webp'" cover>
                                <v-card-title style="white-space:normal;">{{ title }}</v-card-title>
                            </v-img>
                            <v-card-text>
                                <div class="text-body-1 mb-2">{{ description }}</div>
                                <v-chip :prepend-icon="mdiClockOutline" variant="text">{{ formatDate(date)
                                }}</v-chip>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </ContentList>
        </div>
    </v-container>
</template>
  
<script setup lang="ts">
import { mdiClockOutline } from '@mdi/js';

const blogPosts = await queryContent('/posts')
    .sort({ date: -1 }) // show latest articles first
    .where({ _partial: false }) // exclude the Partial files
    .find();

function formatDate(date?: string): string {
    if (!date) {
        return '';
    }

    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = formattedDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}
</script>