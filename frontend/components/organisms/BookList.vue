<script setup lang="ts">
  import { useBooksStore } from '@/stores/books';
  import BookItem from '@/components/molecules/BookItem.vue'
  const booksStore = useBooksStore();
</script>

<template>
  <div>
    <div
      class="content-container"
      v-for="book in booksStore.booksData"
      :key="book.id"
    >
      <div class="card">
        <BookItem v-bind="book" :key="book.id" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .content-container:last-child {
    margin-bottom: 0;
  }
</style>