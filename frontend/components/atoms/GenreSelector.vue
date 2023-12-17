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

  const isSelected = computed(() => selectedGenreId.value === props.id);
</script>

<template>
  <NuxtLink
    class="genre flex justify-center align-center"
    :class="[{ disabled: props.disabled }, isSelected ? 'active' : 'inactive']"
    :style="{
      minHeight: size + 'px',
      minWidth: size + 'px',
    }"
    @click.prevent="selectGenre"
    v-if="props.id && (props.title || props.icon)"
  >
    <div class="genre-content">
      <div class="text-center">
        <SvgIcon type="mdi" :path="props.icon"></SvgIcon>
      </div>
      <div class="genre-title text-center">
        {{ props.title }}
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
  .genre-title {
    font-size: 10px;
    font-weight: bold;
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
    background-color: var(var(--color-sub-white));
    color: var(--color-sub-black);
  }

  .disabled {
    background-color: var(--color-row-number);
    opacity: var(--opacity-disabled);
    cursor: default;
  }

  @media (hover: hover) and (pointer: fine) {
    .genre:not(.disabled):not(.active):hover {
      opacity: var(--opacity-light);
      transition: var(--hover-transition);
      background-color: var(--color-hover-white);
    }
    .genre:not(.disabled):hover .genre-content {
      transform: scale(1.15);
      transition: var(--hover-transition);
    }
  }
</style>
