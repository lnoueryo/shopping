<script setup lang="ts">
  import Rating from '@/components/molecules/Rating.vue';
  import SkillLevelChips from '@/components/molecules/SkillLevelChips.vue';
  import { ref, watch } from 'vue';
  import { useBooksStore } from '@/stores/books';
  import { useSearchBooks } from '@/composables/search-books';

  const booksStore = useBooksStore();
  const route = useRoute();
  const router = useRouter();
  const searchBooks = useSearchBooks();
  const localRate = ref(Number(booksStore.query.rate));
  const localSkillLevels = ref(booksStore.query.levels);

  watch([localRate, localSkillLevels], () => {
    searchBooks.filterBooks(localRate.value, localSkillLevels.value)
  });
</script>

<template>
  <div class="w100">
    <div class="flex align-center wrap">
      <h2 class="title padding-horizontal"> Filter </h2>
      <div class="flex align-center title">
        <Rating v-model="localRate" :size="24" last-star-only />
        <div>&ensp;or Higher</div>
      </div>
      <div class="margin-horizontal">
        <SkillLevelChips v-model="localSkillLevels" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
