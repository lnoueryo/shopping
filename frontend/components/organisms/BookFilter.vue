<script setup lang="ts">
  import Rating from '@/components/molecules/Rating.vue';
  import SkillLevelChips from '@/components/molecules/SkillLevelChips.vue';
  import { skillLevelsData } from '@/assets/js/skill-levels';
  import { ref, watch } from 'vue';
  import { useStore } from '@/stores';
  import { useBooksStore } from '@/stores/books';
  import { useSearchBooks } from '@/composables/search-books';

  const store = useStore();
  const booksStore = useBooksStore();
  const route = useRoute();
  const searchBooks = useSearchBooks();
  const localRate = ref(Number(booksStore.query.rate));
  const localSkillLevels = ref(booksStore.query.levels);

  watch([localRate, localSkillLevels], () => {
    searchBooks.filterBooks(localRate.value, localSkillLevels.value);
  }, { deep: true });
  watch(() => route.query, newValue => {
    const { rate, levels } = newValue;
    if (Number(rate) !== localRate.value) {
      localRate.value = Number(rate || 0);
    }
    const newLevels = Array.isArray(levels) ? levels : !levels ? [] : [levels];
    if (JSON.stringify(newLevels) !== JSON.stringify(localSkillLevels.value)) {
      localSkillLevels.value = newLevels;
    }
  }, { deep: true });

</script>

<template>
  <div class="vertical-center wrap content-padding-horizontal">
    <h2 class="title content-padding-horizontal"> Filter </h2>
    <div class="vertical-center title">
      <span class="visually-hidden">Review:&ensp;</span>
      <Rating
        v-model="localRate"
        :size="24"
        last-star-only
        :mode="store.theme"
      />
      <div>&ensp;or Higher</div>
    </div>
    <div class="margin-horizontal">
      <span class="visually-hidden">Skill Level:&ensp;</span>
      <SkillLevelChips
        v-model="localSkillLevels"
        :skillLevelsData="skillLevelsData"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
