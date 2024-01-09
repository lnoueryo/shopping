<script setup lang="ts">
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiMagnify } from '@mdi/js';
  const props = defineProps({
    size: Number,
  });
</script>

<template>
  <button
    class="magnify h100 w100 flex justify-center"
    @click="$emit('onSearchClicked')"
  >
    <svg-icon
      :size="props.size || 24"
      type="mdi"
      :path="mdiMagnify"
      color="black"
    ></svg-icon>
  </button>
</template>

<style lang="scss" scoped>
  .magnify {
    display: flex;
    align-items: center;
    text-decoration: none;
    background: linear-gradient(
      to top,
      var(--color-base-white),
      var(--color-sub-white)
    );
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: var(--hover-transition);
    border-radius: 3px;
    border: 2px solid var(--color-row-selected-number);
    cursor: pointer;
  }

  .magnify:active {
    opacity: 0.9;
    transition: var(--hover-transition);
  }

  @media (hover: hover) and (pointer: fine) {
    .magnify:hover {
      opacity: var(--opacity-hover);
      transition: var(--hover-transition);
    }
  }
</style>
