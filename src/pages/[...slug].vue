<template>
    <ContentDoc v-slot="{ doc }">
        <v-card>
            <v-card-title>
                <div class="text-h4 mb-1">{{ doc.title }}</div>
                <p class="text-body-1"><v-icon icon="mdi:mdi-clock-time-four" />&nbsp;{{ formatDate(doc.date) }}</p>
                <br>
            </v-card-title>
            <v-card-text>
                <ContentRenderer class="markdown" :value="doc" />
            </v-card-text>
            <v-alert type="info" title="版权声明" variant="tonal">本文作者：Restent Ou<br>本文链接：<a v-bind:href="path">{{ path
            }}</a><br>除含有特别声明的文章外，站内所有文章均采用 <a
                    href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans">CC BY-NC-SA 4.0</a>
                协议进行许可。</v-alert>
        </v-card>
    </ContentDoc>
    <br>
    <v-lazy>
        <Comment />
    </v-lazy>
</template>

<script setup lang="ts">
const Comment = defineAsyncComponent(() => import('../theme/components/comment.vue'))
const blogPosts = await queryContent('/posts')
    .sort({ date: -1 })
    .where({ _partial: false })
    .find();

const formatDate = (date: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
};

const postPath = computed(() => useRoute().path);
const path = 'https://blog.restent.win' + (postPath.value as string);
</script>

<style>
.markdown > ul,li {
    margin: .8rem 1.3rem;
}
</style>