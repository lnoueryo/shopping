<script setup lang="ts">
  import { useStore } from '@/stores';
  import { ref, watch, onMounted } from 'vue';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { navigationData } from '@/assets/js/navigation.js';
  import TriSectionLayout from '@/components/wrappers/TriSectionLayout.vue';
  import NavigationBar from '@/components/molecules/NavigationBar.vue';

  const store = useStore();
  const navMarginSwitch = ref({ right: true, center: true, left: true });

  const changeLayout = newWidth => {
    if (newWidth < deviceSize.smallDesktop) {
      navMarginSwitch.value = { left: false, center: true, right: false };
      return;
    }
    navMarginSwitch.value = { left: true, center: true, right: true };
  };

  watch(
    () => store.width,
    newWidth => {
      changeLayout(newWidth);
    }
  );

  onMounted(() => {
    changeLayout(store.width);
  });
</script>

<template>
  <div id="nav" class="nav-container">
    <TriSectionLayout v-bind="navMarginSwitch" :width="store.width" scroll>
      <template #center>
        <NavigationBar
          class="margin-horizontal"
          :navigationData="navigationData"
          navHeight="var(--height-content)"
        />
      </template>
    </TriSectionLayout>
  </div>
</template>

<style lang="scss" scoped>
  .nav-container {
    height: var(--height-content);
  }
</style>
