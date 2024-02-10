<script setup lang="ts">
  import GenreSelector from '@/components/atoms/GenreSelector.vue';
  import RippleButton from '@/components/wrappers/RippleButton.vue';
  import { ref, watch, watchEffect, onMounted } from 'vue';
  import { deviceSize } from '@/assets/js/device-size.js';
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
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
    radio: {
      type: Boolean,
      default: false,
    },
    panelLine: {
      type: Boolean,
      default: false,
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
  <fieldset
    class="vertical-center wrap"
    role="radiogroup"
    aria-label="search books by genre"
  >
    <legend class="visually-hidden">Genres</legend>
    <RippleButton
      :style="{ width: size + '%' }"
      class="genre-button"
      v-for="genre in genreData"
      :key="genre.title"
      color="var(--color-text-selection)"
      change
      :disabled="localGenreId == genre.id"
    >
      <GenreSelector
        v-bind="genre"
        v-model="localGenreId"
        :radio="props.radio"
        :panelLine="props.panelLine"
      />
    </RippleButton>
  </fieldset>
</template>

<style lang="scss" scoped></style>
