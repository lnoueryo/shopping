<script setup lang="ts">
  import { deviceSize } from '@/assets/js/device-size.js';
  import { ref } from 'vue';
  const props = defineProps({
    left: Boolean,
    center: Boolean,
    right: Boolean,
    width: Number,
  });
</script>

<template>
  <div
    class="flex align-center scroll h100"
    :class="{ container: props.width >= deviceSize.smallDesktop }"
  >
    <div class="align-left side-space" v-if="props.left">
      <slot name="left"></slot>
    </div>
    <div class="mr-a w100 h100" v-if="props.center">
      <slot name="center"></slot>
    </div>
    <div class="align-right side-space" v-if="props.right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .scroll {
    white-space: nowrap;
    overflow-x: auto;
  }
</style>
