<script setup lang="ts">
  import { defineProps } from 'vue';

  const props = defineProps({
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
    radius: {
      type: String,
      default: '0px',
    },
  });
</script>

<template>
  <div
    class="skeleton js-skeleton w100 h100"
    :style="{
      '--skeleton-width': props.width,
      '--skeleton-height': props.height,
      '--skeleton-radius': props.radius,
    }"
    tabindex="0"
    role="progressbar"
    aria-busy="true"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuetext="Please wait..."
  >
    <div class="skeleton__title"></div>
  </div>
</template>

<style lang="scss" scoped>
  $skeletonBaseColor: #e2e2e2;
  $skeletonMaskColor: rgba(0, 0, 0, 1);
  $skeletonTime: 1.2s;
  $skeletonEase: linear;

  @keyframes skeleton-animation {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @mixin skeleton-mixin() {
    position: relative;
    width: var(--skeleton-width, 100%);
    height: var(--skeleton-height, 0px);
    overflow: hidden;
    background-color: $skeletonBaseColor;
    border-radius: var(--skeleton-radius, 0px);
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        $skeletonMaskColor,
        transparent
      );
      animation: skeleton-animation $skeletonTime $skeletonEase infinite;
    }
  }

  .skeleton__title {
    @include skeleton-mixin();
  }
</style>
