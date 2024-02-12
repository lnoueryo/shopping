<script setup lang="ts">
  import { defineEmits, computed, watch, watchEffect, ref } from 'vue';
  import SvgIcon from '@jamescoyle/vue-icon';
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    id: String,
    title: String,
    icon: String,
    disabled: Boolean,
    size: {
      type: String,
    },
    type: {
      type: String,
      default: 'radio'
    },
    panelLine: Boolean,
  });
  const selectedGenreId = ref(props.modelValue);
  const emit = defineEmits(['update:modelValue', 'genre']);

  watchEffect(() => (selectedGenreId.value = props.modelValue));

  watch(selectedGenreId, newValue => {
    emit('update:modelValue', newValue);
  });

  const selectGenre = () => {
    if (props.disabled) return;
    if (isSelected.value && props.type === 'checkbox') {
      selectedGenreId.value = '';
      return emit('genre', null);
    }
    emit('genre', props);
    selectedGenreId.value = props.id;
  };

  const isValidProps = computed(() => props.id && (props.title || props.icon));
  const isSelected = computed(() => selectedGenreId.value === props.id);
  const buttonStyle = computed(() => {
    return {
      minHeight: `${props.size}px`,
      minWidth: `${props.size}px`,
      '--button-border': props.panelLine
        ? 'var(--color-base-secondary) 1px solid'
        : 'initial',
    };
  });
  const buttonClass = computed(() => {
    return [
      { disabled: props.disabled },
      { [isSelected.value ? 'active' : 'inactive']: true },
    ];
  });
</script>

<template>
  <button
    class="genre center"
    :class="buttonClass"
    :style="buttonStyle"
    @click="selectGenre"
    @keyup.enter="selectGenre"
    :aria-label="`${props.title} genre`"
    :aria-checked="selectedGenreId === props.id"
    :role="props.type"
    v-if="isValidProps"
  >
    <div class="ripple-text">
      <div class="genre-content text-center">
        <SvgIcon type="mdi" :title="props.title" :path="props.icon"></SvgIcon>
      </div>
      <div class="caption text-center">
        <span>{{ props.title }}</span>
      </div>
    </div>
  </button>
</template>

<style lang="scss" scoped>
  .genre {
    width: 100%;
    min-height: calc(var(--height-content) * 2);
    min-width: calc(var(--height-content) * 2);
    cursor: pointer;
    border: var(--button-border);
  }

  .genre:focus-within {
    border: 2px solid black;
  }

  .genre-content {
    transition: var(--transition-primary);
  }

  .active {
    background-color: var(--color-text-selection);
    color: var(--color-primary);
    transition: var(--transition-primary);
  }

  .inactive {
    background-color: var(--color-base-primary);
    color: var(--color-base-primary-text);
    transition: var(--transition-primary);
  }

  .disabled {
    background-color: var(--color-row-number);
    opacity: var(--opacity-disabled);
    cursor: default;
    transition: var(--transition-primary);
  }

  @media (hover: hover) and (pointer: fine) {
    .genre:not(.disabled):not(.active):hover {
      transition: var(--transition-primary);
      background-color: var(--color-text-selection);

      .genre-content {
        transform: var(--hover-scale);
        transition: var(--transition-primary);
      }
    }
  }

  .genre:not(.disabled):not(.active):active {
    transition: var(--transition-primary);
    background-color: var(--color-text-selection);
    .genre-content {
      transform: scale(0.95);
      transition: var(--transition-primary);
    }
  }
</style>
