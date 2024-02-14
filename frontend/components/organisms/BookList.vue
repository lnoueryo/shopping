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
        <ul
          class="content-container"
          v-for="book in booksStore.bookList.books"
          :key="book.id"
        >
          <li class="card card-shadow">
            <BookItem v-bind="book" :width="store.width" :key="book.id" />
          </li>
        </ul>
      </template>
      <template v-else-if="!booksStore.isBooksData && !booksStore.isLoading">
        <div id="error-book-result" class="content-container">
          <div class="card card-shadow">
            <ErrorBookResult
              :errorType="booksStore.errorType"
              :query="booksStore.query"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="spinner-container">
          <Spinner />
        </div>
      </template>
    </template>
  </PaginationWrapper>
</template>

<style lang="scss" scoped>
  .content-container:last-child {
    margin-bottom: 0;
  }
  .spinner-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
