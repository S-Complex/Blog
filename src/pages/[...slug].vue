<template>
    <ContentDoc v-slot="{ doc }">
        <v-card class="mx-auto" rounded="0" style="height:400px" color="#BDBDBD">
            <v-img height="100%" cover src="https://library.restent.win/images/bg.webp">
                <div class="theme-text-white text">
                    <p class="text-h4 mb-2">{{ doc.title }}</p>
                    <div class="text-body-1"><v-icon icon="mdi-clock-outline" />&nbsp;{{
                        formatDate(doc.date)
                    }}</div>
                </div>
            </v-img>
        </v-card>
        <v-container style="max-width:900px">
            <v-card class="mt-n16">
                <v-card-title class="text-body-1"></v-card-title>
                <v-card-text>
                    <ContentRenderer class="markdown" :value="doc" />
                </v-card-text>
                <v-alert rounded="0" type="info" title="版权声明" variant="tonal">本文作者：Restent Ou<br>本文链接：<a
                        class="text-decoration-none" v-bind:href="path">{{ path
                        }}</a><br>除含有特别声明的文章外，站内所有文章均采用 <a class="text-decoration-none"
                        href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans">CC BY-NC-SA 4.0</a>
                    协议进行许可。</v-alert>
            </v-card>
            <br>
            <v-lazy>
                <Comment />
            </v-lazy>
        </v-container>
    </ContentDoc>
</template>

<script setup lang="ts">
const Comment = defineAsyncComponent(() => import('@/components/theme/Comment.vue'))
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
.markdown {
    font-size: 1rem;
}

.markdown>p {
    line-height: 1.5rem;
    margin-bottom: 0.7rem;
}

.markdown>ul,
li {
    margin: .8rem 1.3rem;
}

.text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #ffffff;
}

.markdown>blockquote {
    margin: 1em;
    padding: 0.5em 1em;
    border-left: 3.5px solid rgba(var(--v-theme-blockquoteBorder));
    background-color: rgba(var(--v-theme-blockquote));
}

.markdown>blockquote p {
    line-height: 1.5rem;
    margin: 0;
}

.markdown > hr {
  margin: 20px 0px;
}
</style>