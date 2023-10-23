<template>
    <v-navigation-drawer v-model="drawer" temporary>
        <v-card class="mx-auto" max-width="434" rounded="0">
            <v-img height="100%" cover src="https://library.restent.win/images/profile.webp" prefetch>
                <v-avatar color="grey" size="75" rounded="1" class="mt-8 ml-3">
                    <v-img cover src="https://library.restent.win/images/icons/avatar.webp" prefetch></v-img>
                </v-avatar>
                <v-list-item class="text-white mb-2" title="Restent Ou" subtitle="大废物"></v-list-item>
            </v-img>
        </v-card>

        <v-list density="compact" nav>
            <v-list-subheader>Pages</v-list-subheader>
            <v-list-item prepend-icon="mdi-home" title="Index" value="Index" nuxt to="/"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group" title="Friends" value="Friends"
                href="https://library.restent.win/links"></v-list-item>
            <v-list-item prepend-icon="mdi-cellphone-sound" title="Contact" value="Contact"
                href="https://library.restent.win/contact"></v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar>
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title class="text-h6">Restent's Notebook</v-app-bar-title>
        <v-btn icon="mdi-brightness-6" @click="toggleTheme"></v-btn>
    </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

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