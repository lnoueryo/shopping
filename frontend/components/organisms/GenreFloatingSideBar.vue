<script setup lang="ts">
  import GenreSelectors from '@/components/molecules/GenreSelectors.vue';
  import { genreData } from '@/assets/js/genres.js';
  import { ref, watch } from 'vue';
  import { useScroll } from '@/composables/scroll';
  import { useStore } from '@/stores';

  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const localGenre = ref(route.query.genre);
  const isFixed = ref(false);
  const moveGenreContent = () => {
    isFixed.value = window.scrollY > store.headerHeight;
  };
  useScroll(moveGenreContent);
  watch(localGenre, () => {
    const query = { ...route.query };
    query['genre'] = localGenre.value;
    delete query['keyword'];
    router.push({ path: '/books', query });
  });
</script>

<template>
  <div class="floating-sidebar" :class="{ 'sidebar-fixed': isFixed }">
    <div class="card title-container flex align-center">
      <div class="title padding-horizontal"> Genres </div>
    </div>
    <div class="card">
      <GenreSelectors
        v-model="localGenre"
        v-bind="{ desktop: 50 }"
        :genreData="genreData"
        :width="store.width"
        radio
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
