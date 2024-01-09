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
      default: 'var(--color-sub-black)',
    },
    fontSize: Number,
    width: Number,
  });
  const defaultFonstSize = ref(12);
  const defaultWidth = ref(104);
  const defaultBackgroundColor = ref('transparent');
  const defaultColor = ref('white');
  const defaultBorderRadius = ref('10px');
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
      fontSize: `${props.fontSize || defaultFonstSize.value}px`,
      backgroundColor: isSelected.value
        ? props.color
        : defaultBackgroundColor.value,
      color: isSelected.value ? defaultColor.value : props.color,
      border: `2px solid  ${props.color}`,
      borderRadius: defaultBorderRadius.value,
      display: 'block',
      width: `${props.width || defaultWidth.value}px`,
    };
  });

  const isSelected = computed(() =>
    selectedSkillLevels.value.includes(props.title)
  );
</script>

<template>
  <div class="chip text-center" v-if="props.title">
    <input
      :id="uniqueId"
      type="checkbox"
      :value="props.title"
      v-model="selectedSkillLevels"
    />
    <label
      :for="uniqueId"
      :style="labelStyle"
      tabindex="0"
      @keyup.enter="enterSkillLevel"
    >
      {{ capitalizeFirstLetter }}
    </label>
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
      opacity: var(--opacity-hover);
      transition: var(--hover-transition);
    }
  }
</style>
