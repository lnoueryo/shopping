<script setup lang="ts">
  import { deviceSize } from '@/assets/js/device-size.js';
  const props = defineProps({
    left: {
      type: Boolean,
      default: true,
    },
    center: {
      type: Boolean,
      default: true,
    },
    right: {
      type: Boolean,
      default: true,
    },
    width: Number,
    scroll: {
      type: Boolean,
      default: false,
    },
  });
</script>

<template>
  <div
    class="flex align-center h100"
    :class="{ container: props.width >= deviceSize.smallDesktop }"
  >
    <div class="align-left side-space" v-if="props.left">
      <slot name="left"></slot>
    </div>
    <div
      class="mr-a w100 h100 flex justify-center"
      :class="{ scroll: props.scroll }"
      v-if="props.center"
    >
      <slot name="center"></slot>
    </div>
    <div class="align-right side-space" v-if="props.right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @media screen and (max-width: 1060px) {
    .scroll {
      overflow-x: auto;
      overflow-y: hidden;
    }
  }
</style>
