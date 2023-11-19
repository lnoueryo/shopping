<script setup lang="ts">
  import MainSearchBar from '../molecules/MainSearchBar.vue';
  import NavigationBar from '../molecules/NavigationBar.vue';
  import Logo from '../atoms/Logo.vue';
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { deviceSize } from '@/assets/js/device-size.js';
  const searchWord = ref('');
  const headerRef = ref(null);
  const isPCSize = ref(true);
  const observer = ref(null);

  onMounted(() => {
    if (headerRef.value) {
      observer.value = new ResizeObserver(entries => {
        for (const entry of entries) {
          const { width } = entry.contentRect;
          const { height } = entry.contentRect;
          console.log(
            `Element size changed: width: ${width}, height: ${height}`
          );
          if (width < deviceSize.smallDesktop) {
            isPCSize.value = false;
            return;
          }
          isPCSize.value = true;
        }
      });

      observer.value.observe(headerRef.value);
    }
  });

  onBeforeUnmount(() => observer.value && observer.value.disconnect());
</script>

<template>
  <header id="header" ref="headerRef">
    <div class="header-top-container container flex align-center">
      <div class="align-left side-space" v-if="!isPCSize">
        <Logo />
      </div>
      <div class="align-right side-space" v-if="!isPCSize"> </div>
    </div>
    <div class="header-middle-container container flex align-center">
      <div class="align-left side-space" v-if="isPCSize">
        <Logo />
      </div>
      <div class="mr-a w100">
        <MainSearchBar class="margin-adjust" v-model="searchWord" />
      </div>
      <div class="align-right side-space" v-if="isPCSize"> </div>
    </div>
    <div class="nav-container container flex align-center">
      <div class="align-left side-space" v-if="isPCSize"> </div>
      <div class="mr-a w100 scroll-nav">
        <NavigationBar class="margin-adjust" :navHeight="48" />
      </div>
      <div class="align-right side-space" v-if="isPCSize"> </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  #header {
    background-color: #222222;
  }

  .header-top-container {
    height: 48px;
    padding-bottom: 4px;
  }

  .header-middle-container {
    height: 48px;
    padding: 4px 0;
  }

  .nav-container {
    height: 48px;
    padding-top: 4px;
  }

  .scroll-nav {
    white-space: nowrap;
    overflow-x: auto;
    padding-bottom: 6px;
  }
</style>
