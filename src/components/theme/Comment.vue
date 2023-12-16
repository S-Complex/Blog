<template>
    <v-card>
        <v-card-text>
            <themeHitokoto />
        </v-card-text>
        <v-lazy>
            <v-container fluid>
                <Waline :serverURL="serverURL" :path="path" :lang="lang" :emoji="emoji" :dark="dark" :login="login"
                    :wordLimit="wordLimit" :imageUploader="imageUploader" />
            </v-container>
        </v-lazy>
    </v-card>
</template>
<script setup>
import { Waline } from '@waline/client/component';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import '@/css/waline.scss';

const serverURL = 'https://waline.restent.win';
const path = computed(() => useRoute().path);
const lang = 'zh-CN';
const emoji = 'https://unpkg.com/@waline/emojis@1.2.0/bmoji';
const dark = 'div[class="v-application v-theme--dark v-layout v-layout--full-height v-locale--is-ltr"]';
const login = 'force';
const wordLimit = '100';
const imageUploader = false;
</script>
