<script setup lang="ts">
  import Rating from '@/components/atoms/Rating.vue';
  import SkillLevelChips from '@/components/molecules/SkillLevelChips.vue';
  import { ref, watch } from 'vue';
  const props = defineProps({
    selectedRate: Number,
    selectedSkillLevels: Array,
  });
  const localRate = ref(props.selectedRate);
  const selectedSkillLevels = ref(props.selectedSkillLevels);
  const isFixed = ref(true);
  const emit = defineEmits([
    'update:selectedRate',
    'update:selectedSkillLevels',
  ]);
  watch(
    () => props.selectedRate,
    newRate => {
      localRate.value = Math.round(newRate);
    }
  );
  watch(
    () => props.selectedSkillLevels,
    newSelectedSkillLevels => {
      selectedSkillLevels.value = newSelectedSkillLevels;
    }
  );
  watch(localRate, newRate => {
    emit('update:selectedRate', newRate);
  });
  watch(selectedSkillLevels, newSelectedSkillLevels => {
    emit('update:selectedSkillLevels', newSelectedSkillLevels);
  });
</script>

<template>
  <div class="w100" :class="{ fixed: isFixed }" style="z-index: 1">
    <div class="flex align-center wrap">
      <div class="title padding-side"> Filter </div>
      <div class="flex align-center title">
        <Rating v-model="localRate" :size="24" last-star-only />
        <div>&ensp;or Higher</div>
      </div>
      <div class="margin-side">
        <SkillLevelChips v-model="selectedSkillLevels" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
