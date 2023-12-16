<script setup lang="ts">
  import GenreSelector from '@/components/atoms/GenreSelector.vue';
  import { ref, watch, watchEffect, onMounted } from 'vue';
  import { deviceSize } from '@/assets/js/device-size.js';
  const props = defineProps({
    modelValue: String,
    genreData: {
      type: Array,
      default: () => [],
    },
    mobile: {
      type: Number,
      default: 50,
    },
    tablet: {
      type: Number,
      default: 50,
    },
    smallDesktop: {
      type: Number,
      default: 33,
    },
    desktop: {
      type: Number,
      default: 33,
    },
    width: {
      type: Number,
      default: 0,
    },
  });
  const size = ref(0);
  const updateSize = newWidth => {
    if (deviceSize.mobile > newWidth) {
      size.value = props.mobile;
    } else if (deviceSize.tablet > newWidth) {
      size.value = props.tablet;
    } else if (deviceSize.smallDesktop > newWidth) {
      size.value = props.smallDesktop;
    } else {
      size.value = props.desktop;
    }
  };
  watch(
    () => props.width,
    newWidth => {
      updateSize(newWidth);
    }
  );
  onMounted(() => {
    updateSize(props.width);
  });
  const localGenreId = ref(props.modelValue);

  const emit = defineEmits(['update:modelValue']);

  watchEffect(() => (localGenreId.value = props.modelValue));

  watch(localGenreId, newSelectedGenre => {
    emit('update:modelValue', newSelectedGenre);
  });
</script>

<template>
  <div class="flex justify-start align-center wrap">
    <GenreSelector
      v-for="genre in genreData"
      :key="genre.title"
      v-bind="genre"
      v-model="localGenreId"
      :style="{ width: `${size}%` }"
    />
  </div>
</template>

<style lang="scss" scoped>
  .genre-selector {
    width: 33%;
  }

  @media screen and (max-width: 768px) {
    .genre-selector {
      width: 50%;
    }
  }
</style>
