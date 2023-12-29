<script setup lang="ts">
  import { useStore } from '@/stores';
  import { useBooksStore } from '@/stores/books';
  import BookItem from '@/components/molecules/BookItem.vue';
  import ErrorBookResult from '@/components/molecules/ErrorBookResult.vue';
  const store = useStore();
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
        <BookItem v-bind="book" :width="store.width" :key="book.id" />
      </div>
    </div>
    <div class="content-container" v-if="booksStore.booksData.length === 0">
      <div class="card">
        <ErrorBookResult
          :errorType="booksStore.errorType"
          :query="booksStore.query"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .content-container:last-child {
    margin-bottom: 0;
  }
</style>
