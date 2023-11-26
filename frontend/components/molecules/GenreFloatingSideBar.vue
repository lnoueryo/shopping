<script setup lang="ts">
  import GenreSelector from '@/components/atoms/GenreSelector.vue';
  import { genreData } from '@/assets/js/genres.js';
  import { ref } from 'vue';
  import { useDOMHeight } from '@/composables/dom-height';
  import { useScroll } from '@/composables/scroll';
  const isFixed = ref(false);
  const domHeight = useDOMHeight();
  const { headerHeight } = domHeight;
  const moveGenreContent = () =>
    (isFixed.value = window.scrollY > headerHeight.value);
  useScroll(moveGenreContent);
</script>

<template>
  <div class="floating-sidebar" :class="{ fixed: isFixed }">
    <div class="card title-container flex align-center">
      <div class="title padding-side"> Genres </div>
    </div>
    <div class="card flex justify-start align-center wrap">
      <GenreSelector
        class="genre-selector"
        v-for="genre in genreData"
        :key="genre.title"
        v-bind="genre"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .floating-sidebar {
    position: absolute;
    top: 0;
  }
  .floating-sidebar.fixed {
    position: fixed;
    top: var(--height-content);
  }
  .genre-selector {
    width: 50%;
  }
</style>
