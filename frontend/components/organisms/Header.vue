<script setup lang="ts">
  import MainSearchBar from '../molecules/MainSearchBar.vue';
  import NavigationBar from '../molecules/NavigationBar.vue';
  import Logo from '../atoms/Logo.vue';
  import TriSectionLayout from '../wrappers/TriSectionLayout.vue';
  import { ref, watch } from 'vue';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { useViewport } from '@/composables/viewport';
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
</script>

<template>
  <header id="header">
    <div class="header-top-container flex">
      <TriSectionLayout
        :left="headerTopSwitch.left"
        :center="headerTopSwitch.center"
        :right="headerTopSwitch.right"
      >
        <template #left>
          <Logo />
        </template>
      </TriSectionLayout>
    </div>
    <div class="header-middle-container">
      <TriSectionLayout
        :left="headerMiddleSwitch.left"
        :center="headerMiddleSwitch.center"
        :right="headerMiddleSwitch.right"
      >
        <template #left>
          <Logo />
        </template>
        <template #center>
          <MainSearchBar class="margin-adjust" />
        </template>
      </TriSectionLayout>
    </div>
    <div class="nav-container">
      <TriSectionLayout
        :left="headerMiddleSwitch.left"
        :center="headerMiddleSwitch.center"
        :right="headerMiddleSwitch.right"
      >
        <template #center>
          <NavigationBar
            class="margin-adjust scrollbar-adjust"
            :navHeight="48"
          />
        </template>
      </TriSectionLayout>
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
    margin: auto 0;
  }

  .header-middle-container {
    height: 48px;
    padding: 4px 0;
  }

  .nav-container {
    height: 48px;
    padding-top: 4px;
  }

  .scrollbar-adjust {
    padding-bottom: 6px;
  }
</style>
