<script setup lang="ts">
  import Rating from '@/components/atoms/Rating.vue';
  import SkillLevelChips from '@/components/molecules/SkillLevelChips.vue';
  import { ref, watch } from 'vue';
  const props = defineProps({
    rate: Number,
    selectedSkillLevels: Array,
  });
  const rate = ref(props.rate);
  const selectedSkillLevels = ref(props.selectedSkillLevels);
  const isFixed = ref(true);
  const emit = defineEmits(['update:rate', 'update:selectedSkillLevels']);
  watch(
    () => props.rate,
    newRate => {
      rate.value = Math.round(newRate);
    }
  );
  watch(
    () => props.selectedSkillLevels,
    newSelectedSkillLevels => {
      selectedSkillLevels.value = newSelectedSkillLevels;
    }
  );
  watch(rate, newRate => {
    emit('update:rate', newRate);
  });
  watch(selectedSkillLevels, newSelectedSkillLevels => {
    emit('update:selectedSkillLevels', newSelectedSkillLevels);
  });
  console.log(props);
</script>

<template>
  <div class="w100" :class="{ fixed: isFixed }" style="z-index: 1">
    <div class="flex align-center wrap">
      <div class="title padding-side"> Filter </div>
      <div class="flex align-center title">
        <Rating
          v-model="rate"
          :size="24"
          @update:rate="newRate => (rate = newRate)"
          last-star-only
        />
        <div>&ensp;or Higher</div>
      </div>
      <div class="margin-side">
        <SkillLevelChips v-model="selectedSkillLevels" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
