<script setup lang="ts">
import { useRoute } from 'vitepress';
import Comment from '../theme/Comment.vue';

const route = useRoute();
const currentRoute = 'https://blog.restent.win' + route.path;
</script>

<template>
  <v-card class="mt-n16">
    <v-card-text>
      <Content class="markdown" />
    </v-card-text>
    <v-alert rounded="0" type="info" title="版权声明" variant="tonal">本文作者：Restent Ou<br />本文链接：<a
        class="text-decoration-none" v-bind:href="currentRoute">{{ currentRoute
        }}</a><br />除含有特别声明的文章外，站内所有文章均采用
      <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans">CC BY-NC-SA 4.0</a>
      协议进行许可。
    </v-alert>
  </v-card>
  <br />
  <Comment />
</template>

<style type="scss">
@import "@fontsource/jetbrains-mono/400.css";

.markdown {
  font-size: 1rem;
}

.markdown p {
  line-height: 1.5rem;
  margin-bottom: 0.7rem;
}

.markdown ul,
li {
  margin: 0.5rem 1.2rem;
}

.markdown blockquote {
  margin: 1em 0em;
  padding: 0.5em 1em;
  border-left: 3.5px solid rgba(var(--v-theme-blockquoteBorder));
  background-color: rgba(var(--v-theme-blockquote));
}

.markdown blockquote p {
  line-height: 1.5rem;
  margin: 0.5rem 0rem;
}

.markdown hr {
  margin: 20px 0px;
}

.markdown pre {
  margin: 1em 1em;
  border-radius: 8px;
  padding: 1em;
  background-color: #363636;
  overflow: auto;
}

.markdown code {
  font-family: "Jetbrains Mono";
  background-color: #363636;
  color: #1e90ff;
  border-radius: 4px;
}
</style>