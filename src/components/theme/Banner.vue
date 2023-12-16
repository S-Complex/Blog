<template>
    <v-card v-if="path.includes('posts')" class="mx-auto" rounded="0" style="height:400px" color="#BDBDBD">
        <ContentDoc v-slot="{ doc }">
            <v-img height="100%" gradient="rgba(0,0,0,.2), rgba(0,0,0,.2)" cover v-bind:src="doc.banner ?? 'https://library.restent.win/images/bg.webp'">
                <div class="theme-text-white text">
                    <p class="text-h4 mb-2">{{ doc.title }}</p>
                    <v-chip :prepend-icon="mdiClockOutline" variant="text">{{ formatDate(doc.date)
                    }}</v-chip>
                </div>
            </v-img>
        </ContentDoc>
    </v-card>
    <v-card v-else class="mx-auto" rounded="0" width="100%" height="400" color="#BDBDBD">
        <v-img height="100%" cover src="https://library.restent.win/images/bg.webp">
            <div class="text-h4 theme-text-white text">静寂に問う 答えを求めて</div>
        </v-img>
    </v-card>
</template>

<script setup lang="ts">
import { mdiClockOutline } from '@mdi/js';
const path = computed(() => useRoute().path);

const formatDate = (date: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
};
</script>