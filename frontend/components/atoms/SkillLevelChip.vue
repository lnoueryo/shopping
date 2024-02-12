<script setup lang="ts">
  import { ref, defineEmits, watch, watchEffect, computed } from 'vue';
  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'var(--color-base-tertiary)',
    },
    fontSize: {
      type: String,
      default: 'var(--font-size-caption)',
    },
    width: {
      type: String,
      default: '104px',
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['update:modelValue']);
  const uniqueId = Math.random().toString(36).substr(2, 9) + props.title;
  const selectedSkillLevels = ref(props.modelValue);
  const capitalizeFirstLetter = computed(
    () => props.title.charAt(0).toUpperCase() + props.title.slice(1)
  );
  watchEffect(() => (selectedSkillLevels.value = props.modelValue));

  const enterSkillLevel = () => {
    const newValue = selectedSkillLevels.value.includes(props.title)
      ? selectedSkillLevels.value.filter(item => item !== props.title)
      : [...selectedSkillLevels.value, props.title];
    emit('update:modelValue', newValue);
  };
  watch(selectedSkillLevels, newSelectedSkillLevels =>
    emit('update:modelValue', newSelectedSkillLevels)
  );

  const labelStyle = computed(() => {
    return {
      '--label-color': props.color,
      fontSize: props.fontSize,
      width: props.width,
    };
  });

  const isSelected = computed(() =>
    selectedSkillLevels.value.includes(props.title)
  );
</script>

<template>
  <label
    class="chip-padding text-center monospace-font chip-border-radius"
    :class="{ checked: isSelected }"
    :for="uniqueId"
    :style="labelStyle"
    @keyup.enter="enterSkillLevel"
    @click="$event.target.blur()"
    v-if="props.title"
  >
    <input
      :id="uniqueId"
      :name="uniqueId"
      class="visually-hidden"
      type="checkbox"
      :value="props.title"
      v-model="selectedSkillLevels"
    />
    <p class="ripple-text">{{ capitalizeFirstLetter }}</p>
  </label>
</template>

<style lang="scss" scoped>
  .chip-border-radius {
    border-radius: 10px;
  }

  label {
    display: block;
    position: relative;
    font-weight: bold;
    border: 2px solid var(--label-color);
    color: var(--label-color);
    cursor: pointer;
    transition: var(--transition-primary);
    background-color: transparent;
  }

  label.checked {
    color: var(--color-white);
    background-color: var(--label-color);
  }

  @media (hover: hover) and (pointer: fine) {
    label:hover {
      opacity: var(--opacity-hover);
      transition: var(--transition-primary);
    }
  }

  label:active {
    color: var(--color-white);
    opacity: 1;
    transition: initial;
  }

  label:focus-within {
    border: 2px solid black;
  }
</style>
