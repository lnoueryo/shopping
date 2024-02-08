<script setup lang="ts">
  import SkillLevelChip from '@/components/atoms/SkillLevelChip.vue';
  import RippleButton from '@/components/wrappers/RippleButton.vue';
  import { ref, defineEmits, watch } from 'vue';
  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => [],
    },
    skillLevelsData: {
      type: Array,
      default: () => [],
    },
    fontSize: Number,
    width: Number,
  });
  const emit = defineEmits(['update:modelValue']);

  const selectedSkillLevels = ref(props.modelValue);
  watch(
    () => props.selectedSkillLevels,
    newSelectedSkillLevels =>
      (selectedSkillLevels.value = newSelectedSkillLevels)
  );

  watch(selectedSkillLevels, newSelectedSkillLevels =>
    emit('update:modelValue', newSelectedSkillLevels)
  );
</script>

<template>
  <fieldset class="flex monospace-font bold">
    <legend class="visually-hidden">Skill Levels</legend>
    <RippleButton
      v-for="level in props.skillLevelsData"
      :key="level.title"
      class="next-space ripple-wrapper"
      :color="level.color"
      change
      :disabled="selectedSkillLevels.includes(level.title)"
    >
      <SkillLevelChip
        class="text-center"
        v-model="selectedSkillLevels"
        v-bind="level"
        :width="props.width"
        :fontSize="props.fontSize"
      />
    </RippleButton>
  </fieldset>
</template>

<style lang="scss" scoped>
  .ripple-wrapper {
    border-radius: 10px;
  }
</style>
