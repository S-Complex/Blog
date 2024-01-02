<script setup lang="ts">
import { useRoute, useData } from 'vitepress';

const { frontmatter } = useData()

const route = useRoute();
const currentRoute = 'https://blog.gxres.net' + route.path;
</script>

<template>
  <v-card class="mt-n16">
    <v-card-text>
      <div class="markdown">
        <p>{{ frontmatter.description }}</p>
        <Content />
      </div>
    </v-card-text>
    <v-alert rounded="0" type="info" variant="tonal">本文作者：Restent Ou<br />本文链接：<a class="text-decoration-none"
        v-bind:href="currentRoute">{{ currentRoute
        }}</a><br />版权协议：<span v-if="frontmatter.license === 'nd'">CC BY-NC-ND 4.0</span><span
        v-else-if="frontmatter.license === 'disallow'">禁止转载</span><span v-else>CC BY-NC-SA
        4.0</span><br />除含有特别声明的文章外，站内所有文章均采用
      <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans">CC BY-NC-SA 4.0</a>
      协议进行许可。
    </v-alert>
    <v-alert rounded="0" type="success" variant="tonal">如果你觉得文章真的很有作用的话，欢迎在 <a
        href="https://afdian.net/a/gxres042">爱发电</a> 上打赏我喔。
    </v-alert>
  </v-card>
  <br />
  <Artalk />
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
  border-radius: 4px;
  border-left: 5px solid rgba(var(--v-theme-blockquoteBorder));
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
  background-color: #546E7A;
  overflow: auto;
}

.markdown code {
  font-family: "Jetbrains Mono";
  background-color: #546E7A;
  color: #CFD8DC;
  border-radius: 4px;
}
</style>