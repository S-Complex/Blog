<template>
    <v-card>
        <v-container fluid>
            <Waline :serverURL="serverURL" :path="path" :lang="lang" :emoji="emoji" :dark="dark" :login="login"
                :wordLimit="wordLimit" :imageUploader="imageUploader" />
        </v-container>
    </v-card>
</template>
<script setup>
import { Waline } from '@waline/client/component';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import '@waline/client/dist/waline.css';

const serverURL = 'https://waline.restent.win';
const path = computed(() => useRoute().path);
const lang = 'zh-CN';
const emoji = 'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.1/bilibili';
const dark = 'div[v-theme--dark]';
const login = 'force';
const wordLimit = '100';
const imageUploader = false;
</script>
  