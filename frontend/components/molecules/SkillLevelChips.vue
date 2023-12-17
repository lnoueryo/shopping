<script setup lang="ts">
  import SkillLevelChip from '@/components/atoms/SkillLevelChip.vue';
  import { skillLevelsData } from '@/assets/js/skill-levels'
  import { ref, defineEmits, watch } from 'vue';
  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => [],
    },
    fontSize: Number,
    width: Number,
  });
  const emit = defineEmits(['update:modelValue']);
  const skillLevels = ref(skillLevelsData);

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
  <div class="skill-level-form flex monospace-font bold">
    <div
      v-for="level in skillLevels"
      :key="level.title"
      class="chip text-center"
    >
      <SkillLevelChip
        v-model="selectedSkillLevels"
        v-bind="level"
        :width="props.width"
        :fontSize="props.fontSize"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
