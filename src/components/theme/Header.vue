<template>
    <v-navigation-drawer v-model="drawer" temporary>
        <v-card class="mx-auto" max-width="434" rounded="0">
            <v-img height="100%" cover lazy-src="https://library.restent.win/images/profile.webp" src="https://library.restent.win/images/profile.webp" prefetch>
                <v-avatar color="grey" size="75" rounded="1" class="mt-8 ml-3">
                    <v-img cover lazy-src="https://library.restent.win/images/icons/avatar.webp" src="https://library.restent.win/images/icons/avatar.webp" prefetch></v-img>
                </v-avatar>
                <v-list-item class="text-white mb-2" title="Restent Ou" subtitle="大废物"></v-list-item>
            </v-img>
        </v-card>

        <v-list density="compact" nav>
            <v-list-item link :prepend-icon="mdiBookmark" title="Index" value="Index" nuxt to="/"></v-list-item>
            <v-list-item :prepend-icon="mdiLink" title="Friends" value="Friends"
                href="https://library.restent.win/links"></v-list-item>
            <v-list-item :prepend-icon="mdiContacts" title="Contact" value="Contact"
                href="https://library.restent.win/contact"></v-list-item>
            <v-list-item :prepend-icon="mdiHome" title="Back to HomePage" value="Back2Home" href="https://www.restent.win"></v-list-item>
            <v-list-item :prepend-icon="mdiLibrary" title="SliverRiver's Library" value="Go2Library"
                href="https://library.restent.win"></v-list-item>
        </v-list>

    </v-navigation-drawer>

    <v-app-bar scroll-behavior="hide">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"><v-icon :icon="mdiMenu" /></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title class="text-h6">
            <span v-if="path.includes('posts')">
                <ContentDoc v-slot="{ doc }">{{ doc.title }}</ContentDoc>
            </span>
            <span v-else>Restent's Notebook</span>
        </v-app-bar-title>
        <v-btn icon @click="dialog = true"><v-icon :icon="mdiRss" /></v-btn>
        <v-btn icon @click="toggleTheme"><v-icon :icon="mdiMoonLastQuarter" /></v-btn>
    </v-app-bar>

    <v-dialog v-model="dialog" width="auto">
        <v-card title="通过 RSS 订阅本站">
            <v-card-text>
                您可以通过下述三种类型的 RSS 订阅本站。
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" href="/feed.xml" @click="dialog = false">RSS 2</v-btn>
                <v-btn color="primary" href="/feed.atom" @click="dialog = false">Atom</v-btn>
                <v-btn color="primary" href="/feed.json" @click="dialog = false">Json</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';
import { mdiMenu, mdiBookmark, mdiHome, mdiLink, mdiContacts, mdiLibrary, mdiRss, mdiMoonLastQuarter } from '@mdi/js';

const theme = useTheme()

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const path = computed(() => useRoute().path);
</script>

<script lang="ts">
export default {
    data() {
        return {
            drawer: false,
            dialog: false,
        }
    },
}
</script>