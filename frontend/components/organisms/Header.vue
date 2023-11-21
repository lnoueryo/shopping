<script setup lang="ts">
  import MainSearchBar from '../molecules/MainSearchBar.vue';
  import NavigationBar from '../molecules/NavigationBar.vue';
  import Logo from '../atoms/Logo.vue';
  import TriSectionLayout from '../wrappers/TriSectionLayout.vue';
  import { ref, watch } from 'vue';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { useViewport } from '@/composables/viewport';
  const router = useRouter();
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
    router.push({ path: '/books', query: { keyword: word } });
  };
</script>

<template>
  <header id="header">
    <div class="header-top-container flex">
      <TriSectionLayout v-bind="headerTopSwitch">
        <template #left>
          <Logo />
        </template>
      </TriSectionLayout>
    </div>
    <div class="header-middle-container">
      <TriSectionLayout v-bind="headerMiddleSwitch">
        <template #left>
          <Logo />
        </template>
        <template #center>
          <MainSearchBar class="margin-adjust" @onSearchClicked="searchBooks" />
        </template>
      </TriSectionLayout>
    </div>
    <div class="nav-container">
      <TriSectionLayout v-bind="headerMiddleSwitch">
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
    background-color: var(--color-base-black);
  }

  .header-top-container {
    height: var(--height-content);
    padding-bottom: 4px;
    margin: auto 0;
  }

  .header-middle-container {
    height: var(--height-content);
    padding: 4px 0;
  }

  .nav-container {
    height: var(--height-content);
    padding-top: 4px;
  }

  .scrollbar-adjust {
    padding-bottom: 6px;
  }
</style>
