<script setup lang="ts">
import Hitokoto from './Hitokoto.vue'
</script>

<template>
    <v-footer absolute border>
        <v-row no-gutters>
            <v-col class="pa-2 ma-2 text-center" cols="12">
                <v-sheet>
                    Copyright © Restent's Notebook 2019 - {{ new Date().getFullYear() }} · Powered by Nuxt.js × Vuetify
                </v-sheet>
            </v-col>
        </v-row>
    </v-footer>
</template>