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
    size: Number,
    radio: Boolean,
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
    if (isSelected.value && !props.radio) {
      selectedGenreId.value = '';
      return emit('genre', null);
    }
    emit('genre', props);
    selectedGenreId.value = props.id;
  };

  const isValidProps = computed(() => props.id && (props.title || props.icon));
  const isSelected = computed(() => selectedGenreId.value === props.id);
  const nuxtLinkStyle = computed(() => {
    return {
      minHeight: `${props.size}px`,
      minWidth: `${props.size}px`,
      border: props.panelLine ? '#00000008 1px solid' : 'initial',
    };
  });
  const nuxtLinkClass = computed(() => {
    return [
      { disabled: props.disabled },
      { [isSelected.value ? 'active' : 'inactive']: true },
    ];
  });
</script>

<template>
  <NuxtLink
    class="genre flex justify-center align-center"
    :class="nuxtLinkClass"
    :style="nuxtLinkStyle"
    @click.prevent="selectGenre"
    @keyup.enter="selectGenre"
    v-if="isValidProps"
    tabindex="0"
  >
    <div class="genre-content">
      <div class="text-center">
        <SvgIcon type="mdi" :path="props.icon"></SvgIcon>
      </div>
      <h3 class="genre-title text-center">
        {{ props.title }}
      </h3>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
  .genre-title {
    font-size: 10px;
    font-weight: bold;
    user-select: none;
  }

  .genre {
    min-height: 75px;
    min-width: 75px;
    border-radius: 3px;
    cursor: pointer;
  }

  .genre-content {
    transition: var(--hover-transition);
  }

  .active {
    background-color: var(--color-sub-black);
    color: var(--color-sub-white);
  }

  .inactive {
    background-color: var(--color-sub-white);
    color: var(--color-sub-black);
  }

  .disabled {
    background-color: var(--color-row-number);
    opacity: var(--opacity-disabled);
    cursor: default;
  }

  @media (hover: hover) and (pointer: fine) {
    .genre:not(.disabled):not(.active):hover {
      opacity: var(--opacity-hover);
      transition: var(--hover-transition);
      background-color: var(--color-hover-white);
    }
    .genre:not(.disabled):not(.active):hover .genre-content {
      transform: scale(1.15);
      transition: var(--hover-transition);
    }
  }
</style>
