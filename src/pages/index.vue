<template>
  <Head>
    <Title>Index</Title>
  </Head>
  <ContentList path="/posts" v-slot="{ list }">
    <div v-for="{ _path: slug, title, date, description } in paginatedBlogPosts" :key="slug">
      <v-row>
        <v-col>
          <v-card :to="slug">
            <v-card-text>
              <div class="text-h5 mb-2">{{ title }}</div>
              <p class="text-body-1 mb-1">{{ description }}</p>
              <div class="text-body-2">
                <v-icon icon="mdi:mdi-clock-time-four" />&nbsp;{{ formatDate(date) }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="pagination">
      <v-pagination v-model="currentPage" :length="totalPages" :total-visible="5" circle
        @input="handlePageChange"></v-pagination>
    </div>
  </ContentList>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const blogPosts = await queryContent('/posts')
  .sort({ date: -1 }) // show latest articles first
  .where({ _partial: false }) // exclude the Partial files
  .find();

const itemsPerPage = 7; // 每页显示的文章数量

const currentPage = ref(1); // 当前页码
const totalPages = computed(() => Math.ceil(blogPosts.length / itemsPerPage)); // 总页数

const paginatedBlogPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return blogPosts.slice(startIndex, endIndex);
});

function handlePageChange(newPage: number) {
  currentPage.value = newPage;
}

function formatDate(date?: string): string {
  if (!date) {
    return '';
  }

  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = formattedDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
</script>

<style>
.pagination > nav {
  margin-top: 20px;
}
</style>