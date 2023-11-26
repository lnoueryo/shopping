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
  const selectedSkillLevels = ref(props.modelValue);
  const uniqueId = Math.random().toString(36).substr(2, 9);
  const skillLevels = ref([
    {
      id: 1,
      name: 'Beginner',
      color: 'var(--color-class)',
    },
    {
      id: 2,
      name: 'Intermediate',
      color: 'var(--color-class-name)',
    },
    {
      id: 3,
      name: 'Advanced',
      color: 'var(--color-import)',
    },
  ]);

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
      backgroundColor: isSelected(level.id) ? level.color : 'transparent',
      color: isSelected(level.id) ? 'white' : level.color,
      border: `2px solid  ${level.color}`,
      borderRadius: '10px',
      display: 'block',
      width: `${props.width || 100}px`,
    };
  };

  const isSelected = id =>
    selectedSkillLevels.value.some(level => level.id === id);
</script>

<template>
  <div class="skill-level-form flex letter bold">
    <div
      v-for="level in skillLevels"
      :key="level.name"
      class="chip text-center"
    >
      <input
        :id="uniqueId + level.name"
        type="checkbox"
        :value="level"
        v-model="selectedSkillLevels"
      />
      <label
        :for="uniqueId + level.name"
        :style="labelStyle(level)"
        :class="{ selected: isSelected(level.id) }"
      >
        {{ level.name }}
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
