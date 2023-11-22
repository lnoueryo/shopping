<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { genreData } from '@/assets/js/genres.js';
  import TriSectionLayout from '../components/wrappers/TriSectionLayout.vue';
  import GenreSelector from '../components/atoms/GenreSelector.vue';
  import CodeList from '../components/atoms/CodeList.vue';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { selectGenreFunc, genreSelectorHTML } from '@/assets/js/codes.js';
  import { useViewport } from '@/composables/viewport';
  const SIX_CARD_GRID_WIDTH = '16.37%';
  const THREE_CARD_GRID_WIDTH = '33.333%';
  const viewport = useViewport();
  const width = ref(viewport.width);
  const genres = ref(genreData);
  const contentSwitch = ref({ right: true, center: true, left: true });
  watch(width, newWidth => {
    if (newWidth < deviceSize.smallDesktop)
      return (contentSwitch.value = {
        left: false,
        center: true,
        right: false,
      });
    contentSwitch.value = { left: true, center: true, right: true };
  });
  const selectGenreArr = ref(selectGenreFunc);
  const genreSelectorArr = ref(genreSelectorHTML);
</script>

<template>
  <TriSectionLayout v-bind="contentSwitch">
    <template #left>
      <div class="flex">
        <CodeList :htmlArray="selectGenreArr" />
      </div>
    </template>
    <template #center>
      <div class="flex justify-start align-center wrap">
        <GenreSelector
          v-for="genre in genres"
          :key="genre.title"
          v-bind="genre"
          :style="{
            width:
              width > deviceSize.smallDesktop
                ? SIX_CARD_GRID_WIDTH
                : THREE_CARD_GRID_WIDTH,
          }"
        />
      </div>
    </template>
    <template #right>
      <div class="flex">
        <CodeList :htmlArray="genreSelectorArr" />
      </div>
    </template>
  </TriSectionLayout>
</template>

<style lang="scss" scoped></style>
