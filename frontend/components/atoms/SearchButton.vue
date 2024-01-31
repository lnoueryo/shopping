<script setup lang="ts">
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiMagnify } from '@mdi/js';
  const props = defineProps({
    size: Number,
  });
</script>

<template>
  <button
    class="magnify h100 w100 center flex"
    @click="$emit('onSearchClicked')"
  >
    <SvgIcon
      class="magnify-icon"
      :size="props.size || 24"
      type="mdi"
      title="search button"
      :path="mdiMagnify"
      color="var(--color-text-primary)"
    ></SvgIcon>
  </button>
</template>

<style lang="scss" scoped>
  .magnify {
    text-decoration: none;
    background-image: linear-gradient(
      to top,
      var(--color-base-primary),
      var(--color-base-secondary)
    );
    background-size: 100% 200%;
    background-position: 0% 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: var(--transition-primary);
    border-radius: 3px;
    border: 2px solid var(--color-base-tertiary);
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-position: 0% 0%;
        transition: var(--transition-primary);
      }
      &:hover .magnify-icon {
        background-position: 0% 0%;
        transform: scale(1.1);
        transition: var(--transition-primary);
      }
    }

    &:active {
      background-position: 0% 100%;
      transition: var(--transition-primary);
    }

    &:active .magnify-icon {
      transform: scale(0.9);
      transition: var(--transition-primary);
    }
  }
</style>
