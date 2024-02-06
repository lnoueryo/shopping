<script setup lang="ts">
  import { useStore } from '@/stores';
  import { useBooksStore } from '@/stores/books';
  import { useSearchBooks } from '@/composables/search-books';
  import BookItem from '@/components/molecules/BookItem.vue';
  import ErrorBookResult from '@/components/molecules/ErrorBookResult.vue';
  import PaginationWrapper from '@/components/wrappers/PaginationWrapper.vue';

  const store = useStore();
  const booksStore = useBooksStore();
  const searchBooks = useSearchBooks();
  const searchNextBooks = async nextPage => {
    const query = searchBooks.searchNextBooks(nextPage);
    await booksStore.updateQuery(query);
  };
</script>

<template>
  <PaginationWrapper v-bind="booksStore.bookList" @updatePage="searchNextBooks">
    <template #list>
      <template v-if="booksStore.isBooksData">
        <div
          class="content-container"
          v-for="book in booksStore.bookList.books"
          :key="book.id"
        >
          <div class="card card-shadow">
            <BookItem v-bind="book" :width="store.width" :key="book.id" />
          </div>
        </div>
      </template>
      <template v-else>
        <div id="error-book-result" class="content-container">
          <div class="card card-shadow">
            <ErrorBookResult
              :errorType="booksStore.errorType"
              :query="booksStore.query"
            />
          </div>
        </div>
      </template>
    </template>
  </PaginationWrapper>
</template>

<style lang="scss" scoped>
  .content-container:last-child {
    margin-bottom: 0;
  }
</style>
