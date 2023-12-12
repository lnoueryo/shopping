<script setup lang="ts">
  import { useViewport } from '@/composables/viewport';
  import { useDOMHeight } from '@/composables/dom-height';
  import { useScroll } from '@/composables/scroll';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { ref, onMounted, watch } from 'vue';
  const viewport = useViewport();
  const width = ref(viewport.width);

  const domHeight = useDOMHeight();
  const { heightContent, headerHeight } = domHeight;

  const isFixed = ref(true);
  const isOverMain = ref(true);
  const isScrollActive = ref(true);
  const isScrollingDown = ref(true);
  const menuTopPosition = ref(`calc(var(--height-content) * -1)`);
  const moveFloatMenu = () => {
    try {
      if (width.value > deviceSize.smallDesktop) return;
      isFixed.value = window.scrollY > headerHeight.value - heightContent.value;
      isOverMain.value = window.scrollY > headerHeight.value;
      isScrollActive.value = isScroll();
      isScrollingDown.value = isScrollDown();

      const applyStyle = () => {
        if (isFixed.value) {
          if (!isOverMain.value)
            menuTopPosition.value = `var(--height-content)`;
          return;
        } else {
          menuTopPosition.value = `calc(var(--height-content) * -1)`;
        }
      };
      applyStyle();

      if (isOverMain.value && isScrollActive.value)
        return isScrollingDown.value
          ? (menuTopPosition.value = `0`)
          : (menuTopPosition.value = `var(--height-content)`);
    } catch (error) {
      console.debug(error);
    }
  };
  const { isScroll, isScrollDown } = useScroll(moveFloatMenu);

  onMounted(() => {
    isFixed.value = window.scrollY > headerHeight.value - heightContent.value;
    isOverMain.value = window.scrollY > headerHeight.value;
  });
</script>

<template>
  <div
    class="float-menu content-container"
    :class="{
      fixed: isFixed,
      transition: isOverMain && (isFixed || isScrollActive),
    }"
    :style="{ top: menuTopPosition }"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .content-container:last-child {
    margin-bottom: 0;
  }

  .float-menu {
    position: absolute;
    top: calc(var(--height-content) * -1);
    width: 100vw;
    left: calc(var(--margin-horizontal) * -1);
    z-index: 1;
  }

  .float-menu.fixed {
    position: fixed;
    left: 0;
    right: 0;
  }

  .transition {
    transition: all 0.5s;
  }
</style>
