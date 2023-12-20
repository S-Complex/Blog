<template>
    <v-navigation-drawer v-model="drawer" temporary>
        <v-card class="mx-auto" max-width="434" rounded="0">
            <v-img height="100%" cover lazy-src="https://library.restent.win/images/profile.webp" src="https://library.restent.win/images/profile.webp" prefetch alt="Restent Ou's profile image">
                <v-avatar color="grey" size="75" rounded="1" class="mt-8 ml-3">
                    <v-img cover lazy-src="https://library.restent.win/images/icons/avatar.webp" src="https://library.restent.win/images/icons/avatar.webp" prefetch alt="Restent Ou's avatar"></v-img>
                </v-avatar>
                <v-list-item class="text-white mb-2" title="Restent Ou" subtitle="大废物"></v-list-item>
            </v-img>
        </v-card>

        <v-list density="compact" nav>
            <v-list-item :prepend-icon="mdiBookmark" title="Index" value="Index" href="/"></v-list-item>
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
            <span v-if="frontmatter.home">{{ site.title }}</span>
            <span v-else>{{ frontmatter.title }}</span>
        </v-app-bar-title>
        <v-btn icon href="/feed.xml"><v-icon :icon="mdiRss" /></v-btn>
        <v-btn icon @click="toggleTheme"><v-icon :icon="mdiMoonLastQuarter" /></v-btn>
    </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';
import { mdiMenu, mdiBookmark, mdiHome, mdiLink, mdiContacts, mdiLibrary, mdiRss, mdiMoonLastQuarter } from '@mdi/js';
import { useData } from 'vitepress';

const theme = useTheme()
const { site, frontmatter } = useData()

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
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