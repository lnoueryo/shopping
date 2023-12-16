<script setup lang="ts">
  import { ref, watch } from 'vue';
  import TriSectionLayout from '../components/wrappers/TriSectionLayout.vue';
  import GenreSelectors from '@/components/molecules/GenreSelectors.vue';
  import CodeList from '../components/atoms/CodeList.vue';
  import { genreData } from '@/assets/js/genres.js';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { selectGenreFunc, genreSelectorHTML } from '@/assets/js/codes.js';
  import { useStore } from '@/stores';

  const store = useStore();
  const SIX_CARD_GRID_WIDTH = 16.37;
  const router = useRouter();
  const contentSwitch = ref({ right: true, center: true, left: true });
  watch(
    () => store.width,
    newWidth => {
      if (newWidth < deviceSize.smallDesktop)
        return (contentSwitch.value = {
          left: false,
          center: true,
          right: false,
        });
      contentSwitch.value = { left: true, center: true, right: true };
    }
  );
  const selectGenreArr = ref(selectGenreFunc);
  const genreSelectorArr = ref(genreSelectorHTML);
  const localGenreId = ref('');
  watch(localGenreId, newValue => {
    router.push({ path: '/books', query: { genre: newValue } });
  });
</script>

<template>
  <TriSectionLayout v-bind="contentSwitch" :width="store.width">
    <template #left>
      <div class="flex">
        <CodeList :htmlArray="selectGenreArr" />
      </div>
    </template>
    <template #center>
      <GenreSelectors
        v-model="localGenreId"
        v-bind="{ desktop: SIX_CARD_GRID_WIDTH }"
        :genreData="genreData"
        :width="store.width"
      />
    </template>
    <template #right>
      <div class="flex">
        <CodeList :htmlArray="genreSelectorArr" />
      </div>
    </template>
  </TriSectionLayout>
</template>

<style lang="scss" scoped></style>
