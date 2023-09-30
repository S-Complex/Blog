<template>
    {{ hitokotoText }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      hitokotoText: null,
    };
  },
  mounted() {
    fetch('https://v1.hitokoto.cn')
      .then((response) => response.json())
      .then((data) => {
        this.hitokotoText = data.hitokoto;
      })
      .catch(console.error);
  },
});
</script>