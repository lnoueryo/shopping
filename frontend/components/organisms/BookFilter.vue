<script setup lang="ts">
  import Rating from '@/components/molecules/Rating.vue';
  import SkillLevelChips from '@/components/molecules/SkillLevelChips.vue';
  import { ref, watch } from 'vue';
  import { useBooksStore } from '@/stores/books';

  const booksStore = useBooksStore();
  const route = useRoute();
  const router = useRouter();
  const localRate = ref(Number(booksStore.query.rate));
  const localSkillLevels = ref(booksStore.query.levels);

  watch([localRate, localSkillLevels], () => {
    const query = { ...route.query };
    if (localRate.value) query['rate'] = localRate.value;
    else delete query['rate'];
    if (localSkillLevels.value) query['levels'] = localSkillLevels.value;
    router.push({ path: '/books', query: query });
  });
</script>

<template>
  <div class="w100">
    <div class="flex align-center wrap">
      <div class="title padding-horizontal"> Filter </div>
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
