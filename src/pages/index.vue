<template>
    <Head>
        <Title>Index</Title>
    </Head>
    <ContentList path="/posts" v-slot="{ list }">
        <div v-for="{ _path: slug, title, date, description } in blogPosts" :key="slug">
            <v-row>
                <v-col>
                    <v-card :to="slug">
                        <v-card-text>
                            <div class="text-h5 mb-1">{{ title }}</div>
                            <p class="text-body-1 mb-3">{{ description }}</p>
                            <div class="text-body-2">
                                <v-icon icon="mdi:mdi-clock-time-four" />&nbsp;{{ formatDate(date) }}
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </ContentList>
</template>
  
<script setup lang="ts">
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
  
<style>
.pagination>nav {
    margin-top: 20px;
}
</style>