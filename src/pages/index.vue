<template>
    <Head>
        <Title>Index</Title>
    </Head>
    <v-card class="mx-auto" rounded="0" style="height:400px" color="#BDBDBD">
        <v-img height="100%" cover src="https://library.restent.win/images/bg.webp">
            <div class="text-h4 theme-text-white text">静寂に問う 答えを求めて</div>
        </v-img>
    </v-card>
    <v-container style="max-width:900px;">
        <div v-for="{ _path: slug, title, date, description } in blogPosts" :key="slug">
            <ContentList path="/posts" v-slot="{ list }">
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
            </ContentList>
        </div>
    </v-container>
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