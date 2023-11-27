<script setup lang="ts">
  import MainSearchBar from '../molecules/MainSearchBar.vue';
  import NavigationBar from '../molecules/NavigationBar.vue';
  import Logo from '../atoms/Logo.vue';
  import TriSectionLayout from '../wrappers/TriSectionLayout.vue';
  import { ref, watch, onMounted, onUnmounted } from 'vue';
  import { useNuxtApp } from '#app';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { useViewport } from '@/composables/viewport';
  import { useDOMHeight } from '@/composables/dom-height';
  import { useScroll } from '@/composables/scroll';

  const router = useRouter();
  const route = useRoute();
  const headerMiddleSwitch = ref({ right: true, center: true, left: true });
  const headerTopSwitch = ref({ right: false, center: false, left: false });
  const viewport = useViewport();
  const width = ref(viewport.width);
  watch(width, newWidth => {
    if (newWidth < deviceSize.smallDesktop) {
      headerTopSwitch.value = { left: true, center: false, right: false };
      headerMiddleSwitch.value = { left: false, center: true, right: false };
      return;
    }
    headerTopSwitch.value = { left: false, center: false, right: false };
    headerMiddleSwitch.value = { left: true, center: true, right: true };
  });

  const searchBooks = word => {
    router.push({ path: '/books', query: { ...route.query, keyword: word } });
  };

  const isFixed = ref(false);
  const domHeight = useDOMHeight();
  const { heightContent } = domHeight;
  const moveSearchBar = () => {
    if (width.value > deviceSize.smallDesktop) return;
    isFixed.value = window.scrollY > heightContent.value;
  };
  useScroll(moveSearchBar);
  const headerRef = ref(null);
  const nuxtApp = useNuxtApp();

  onMounted(() => {
    nuxtApp.$headerRef.value = headerRef.value;
  });

  onUnmounted(() => {
    if (nuxtApp.$headerRef.value === headerRef.value) {
      nuxtApp.$headerRef.value = null;
    }
  });
</script>

<template>
  <header id="header" ref="headerRef">
    <div class="header-top-container flex">
      <TriSectionLayout v-bind="headerTopSwitch">
        <template #left>
          <Logo class="margin-side" />
        </template>
      </TriSectionLayout>
    </div>
    <div class="header-middle-container">
      <div class="h100 float-header" :class="{ fixed: isFixed }">
        <TriSectionLayout v-bind="headerMiddleSwitch">
          <template #left>
            <Logo class="margin-side" />
          </template>
          <template #center>
            <div class="margin-side h100">
              <MainSearchBar class="h100" @onSearchClicked="searchBooks" />
            </div>
          </template>
        </TriSectionLayout>
      </div>
    </div>
    <div class="nav-container">
      <TriSectionLayout v-bind="headerMiddleSwitch">
        <template #center>
          <NavigationBar class="margin-side" :navHeight="48" />
        </template>
      </TriSectionLayout>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  #header {
    background-color: var(--color-base-black);
  }

  .header-top-container {
    height: var(--height-content);
  }

  .header-middle-container {
    height: var(--height-content);
    .float-header {
      position: relative;
      height: 100%;
      width: initial;
    }
    .float-header.fixed {
      background-color: var(--color-base-black);
      top: 0;
      position: fixed;
      height: var(--height-content);
      width: 100%;
      z-index: 2;
    }
  }

  .nav-container {
    height: var(--height-content);
  }
</style>
