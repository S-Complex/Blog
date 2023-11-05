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
        <div v-for="{ _path: slug, title, date, description, banner } in blogPosts" :key="slug">
            <ContentList path="/posts" v-slot="{ list }">
                <v-row>
                    <v-col>
                        <v-card :to="slug">
                            <v-img class="align-end text-white" height="200"
                                v-bind:src="banner ?? 'https://library.restent.win/images/defaultBanner.webp'" cover>
                                <v-card-title style="white-space:normal;">{{ title }}</v-card-title>
                            </v-img>
                            <v-card-text>
                                <div class="text-body-1 mb-2">{{ description }}</div>
                                <v-chip prepend-icon="mdi-calendar-month" variant="text">{{ formatDate(date)
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
.text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #ffffff;
}

hr {
    margin: 8px 0px;
}
</style>