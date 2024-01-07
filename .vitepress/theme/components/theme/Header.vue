<template>
    <v-navigation-drawer v-model="drawer" temporary>
        <v-card class="mx-auto" max-width="434" rounded="0">
            <v-img height="100%" cover src="https://library.gxres.net/images/profile.webp" prefetch
                alt="Restent Ou's profile image">
                <v-avatar color="grey" size="75" rounded="1" class="mt-8 ml-3">
                    <v-img cover src="https://library.gxres.net/images/icons/avatar.webp" prefetch
                        alt="Restent Ou's avatar"></v-img>
                </v-avatar>
                <v-list-item class="text-white mb-2" title="Restent Ou" subtitle="大废物"></v-list-item>
            </v-img>
        </v-card>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="bookmark" title="Index" value="Index" href="/"></v-list-item>
            <v-list-item prepend-icon="link" title="Friends" value="Friends"
                href="https://library.gxres.net/links"></v-list-item>
            <v-list-item prepend-icon="contacts" title="Contact" value="Contact"
                href="https://library.gxres.net/contact"></v-list-item>
            <v-list-item prepend-icon="home" title="Back to HomePage" value="Back2Home"
                href="https://www.gxres.net"></v-list-item>
            <v-list-item prepend-icon="library_books" title="SliverRiver's Library" value="Go2Library"
                href="https://library.gxres.net"></v-list-item>
            <v-list-item prepend-icon="analytics" title="Site Status" value="SiteStatus"
                href="https://status.slirv.vip"></v-list-item>
        </v-list>

    </v-navigation-drawer>

    <v-app-bar scroll-behavior="hide">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"><v-icon icon="menu" /></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title class="text-h6">
            <span v-if="frontmatter.home">{{ site.title }}</span>
            <span v-else-if="page.isNotFound">404</span>
            <span v-else>{{ frontmatter.title }}</span>
        </v-app-bar-title>
        <v-btn icon href="/atom.xml"><v-icon icon="rss_feed" /></v-btn>
        <v-btn icon @click="toggleTheme"><v-icon icon="contrast" /></v-btn>
    </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';
import { useData } from 'vitepress';

const theme = useTheme()
const { site, frontmatter, page } = useData()

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<script lang="ts">
export default {
    data() {
        return {
            drawer: false,
        }
    },
}
</script>