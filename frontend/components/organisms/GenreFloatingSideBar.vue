<script setup lang="ts">
  import GenreSelectors from '@/components/molecules/GenreSelectors.vue';
  import { genreData } from '@/assets/js/genres.js';
  import { ref, watch } from 'vue';
  import { useScroll } from '@/composables/scroll';
  import { useStore } from '@/stores';
  const props = defineProps({
    genreId: String,
  });
  const store = useStore();
  const localGenreId = ref(props.genreId);
  const isFixed = ref(false);
  const moveGenreContent = () => {
    isFixed.value = window.scrollY > store.headerHeight;
  };
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
        :width="store.width"
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
