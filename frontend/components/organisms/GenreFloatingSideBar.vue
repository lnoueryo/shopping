<script setup lang="ts">
  import GenreSelectors from '@/components/molecules/GenreSelectors.vue';
  import { genreData } from '@/assets/js/genres.js';
  import { ref, watch } from 'vue';
  import { useDOMHeight } from '@/composables/dom-height';
  import { useScroll } from '@/composables/scroll';
  const props = defineProps({
    genreId: String,
  });
  const localGenreId = ref(props.genreId);
  const isFixed = ref(false);
  const domHeight = useDOMHeight();
  const { headerHeight } = domHeight;
  const moveGenreContent = () =>
    (isFixed.value = window.scrollY > headerHeight.value);
  const emit = defineEmits(['update:selectedGenre']);
  useScroll(moveGenreContent);

  watch(
    () => props.genreId,
    newGenreId => {
      localGenreId.value = newGenreId;
    }
  );
  watch(localGenreId, newGenreId => {
    emit('update:selectedGenre', newGenreId);
  });
</script>

<template>
  <div class="floating-sidebar" :class="{ 'sidebar-fixed': isFixed }">
    <div class="card title-container flex align-center">
      <div class="title padding-horizontal"> Genres </div>
    </div>
    <div class="card">
      <GenreSelectors
        v-model="localGenreId"
        v-bind="{ desktop: 50 }"
        :genreData="genreData"
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
