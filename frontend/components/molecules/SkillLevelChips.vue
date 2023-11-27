<script setup lang="ts">
  import { ref, defineEmits, watch } from 'vue';
  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => [],
    },
    size: Number,
    width: Number,
  });
  const emit = defineEmits(['update:modelValue']);
  const uniqueId = Math.random().toString(36).substr(2, 9);
  const skillLevels = ref(['beginner', 'intermediate', 'advanced']);
  const selectedSkillLevels = ref(props.modelValue);
  const capitalizeFirstLetter = string =>
    string.charAt(0).toUpperCase() + string.slice(1);
  watch(
    () => props.selectedSkillLevels,
    newSelectedSkillLevels =>
      (selectedSkillLevels.value = newSelectedSkillLevels)
  );

  watch(selectedSkillLevels, newSelectedSkillLevels =>
    emit('update:modelValue', newSelectedSkillLevels)
  );

  const labelStyle = level => {
    return {
      fontSize: `${props.size || 12}px`,
      backgroundColor: isSelected(level) ? selectColor(level) : 'transparent',
      color: isSelected(level) ? 'white' : selectColor(level),
      border: `2px solid  ${selectColor(level)}`,
      borderRadius: '10px',
      display: 'block',
      width: `${props.width || 100}px`,
    };
  };

  const selectColor = level =>
    level === 'beginner'
      ? 'var(--color-class)'
      : level === 'intermediate'
        ? 'var(--color-class-name)'
        : 'var(--color-import)';

  const isSelected = level => selectedSkillLevels.value.includes(level);
</script>

<template>
  <div class="skill-level-form flex letter bold">
    <div v-for="level in skillLevels" :key="level" class="chip text-center">
      <input
        :id="uniqueId + level"
        type="checkbox"
        :value="level"
        v-model="selectedSkillLevels"
      />
      <label
        :for="uniqueId + level"
        :style="labelStyle(level)"
        :class="{ selected: isSelected(level) }"
      >
        {{ capitalizeFirstLetter(level) }}
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .skill-level-form {
    .chip {
      margin: 4px;
    }
    input[type='checkbox'] {
      display: none;
    }
    label {
      position: relative;
      color: #fff;
      cursor: pointer;
      padding: 5px;
      transition: var(--hover-transition);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .skill-level-form label:hover {
      opacity: var(--hover-opacity);
      transition: var(--hover-transition);
    }
  }
</style>
