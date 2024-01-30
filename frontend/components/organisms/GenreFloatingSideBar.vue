<script setup lang="ts">
  import GenreSelectors from '@/components/molecules/GenreSelectors.vue';
  import { genreData } from '@/assets/js/genres.js';
  import { ref, watch, watchEffect } from 'vue';
  import { useSearchBooks } from '@/composables/search-books';
  import { useScroll } from '@/composables/scroll';
  import { useStore } from '@/stores';
  import { useBooksStore } from '@/stores/books';

  const store = useStore();
  const booksStore = useBooksStore();
  const route = useRoute();
  const searchBooks = useSearchBooks();
  const localGenre = ref(route.query.genre);
  const isFixed = ref(false);
  const moveGenreContent = () => {
    isFixed.value = window.scrollY > store.topLayoutHeight;
  };
  useScroll(moveGenreContent);
  watch(localGenre, newValue => {
    if (!newValue) return;
    searchBooks.searchByGenre(localGenre.value);
  });
  watch(
    () => booksStore.query.genre,
    newValue => {
      localGenre.value = newValue;
    }
  );
  watchEffect(() => {
    moveGenreContent();
  });
</script>

<template>
  <div
    class="floating-sidebar card-shadow"
    :class="{ 'sidebar-fixed': isFixed }"
  >
    <div class="card title-container flex align-center padding-horizontal">
      <h2 class="title padding-horizontal"> Genres </h2>
    </div>
    <div class="card">
      <GenreSelectors
        v-model="localGenre"
        v-bind="{ desktop: 50 }"
        :genreData="genreData"
        :width="store.width"
        radio
        panel-line
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .floating-sidebar {
    position: absolute;
    top: 0;
  }
  .floating-sidebar.sidebar-fixed {
    position: fixed;
    top: var(--height-content);
  }
  .genre-selector {
    width: 50%;
  }
</style>
