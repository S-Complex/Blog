<template>
    <v-card v-if="frontmatter.home" class="mx-auto" rounded="0" width="100%" height="400" color="#BDBDBD">
        <v-img height="100%" cover lazy-src="https://library.gxres.net/images/bg.webp"
            src="https://library.gxres.net/images/bg.webp" alt="Site banner image">
            <div class="text-h4 theme-text-white text">静寂に問う 答えを求めて</div>
        </v-img>
    </v-card>
    <v-card v-else-if="page.isNotFound" class="mx-auto" rounded="0" width="100%" height="400" color="#BDBDBD">
        <v-img height="100%" cover lazy-src="https://library.gxres.net/images/bg.webp"
            src="https://library.gxres.net/images/bg.webp" alt="Site banner image">
            <div class="text-h4 theme-text-white text">呜呜，页面好像不存在</div>
        </v-img>
    </v-card>
    <v-card v-else class="mx-auto" rounded="0" width="100%" height="400" color="#BDBDBD">
        <v-img height="100%" cover v-bind:lazy-src="frontmatter.banner ?? 'https://library.gxres.net/images/bg.webp'"
            v-bind:src="frontmatter.banner ?? 'https://library.gxres.net/images/bg.webp'" gradient="rgba(0,0,0,.2), rgba(0,0,0,.2)" alt="Site banner image">
            <div class="text-h4 theme-text-white text">
                {{ frontmatter.title }}<br>
                <v-chip prepend-icon="access_time_filled" variant="text">{{ formatDate(frontmatter.date)
                }}</v-chip>
            </div>
        </v-img>
    </v-card>
</template>

<script setup lang="ts">
import { useData } from 'vitepress';

const { frontmatter, page } = useData()

const formatDate = (date: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
};
</script>