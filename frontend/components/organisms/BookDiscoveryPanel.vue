<script setup lang="ts">
  import GenreFloatingSideBar from '@/components/molecules/GenreFloatingSideBar.vue';
  import { useViewport } from '@/composables/viewport';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { ref, watch } from 'vue';
  const viewport = useViewport();
  const width = ref(viewport.width);
  const sidebarSwitch = ref(true)
  watch(width, newWidth => {
    if (newWidth < deviceSize.smallDesktop)
      return (sidebarSwitch.value = false);
    sidebarSwitch.value = true;
  });
</script>

<template>
  <div class="flex" @scroll="moveGenreContent">
    <div class="sidebar-container" v-if="sidebarSwitch">
      <GenreFloatingSideBar class="sidebar" />
    </div>

  </div>
</template>

<style lang="scss" scoped>
  .sidebar-container {
    min-width: 240px;
  }
  .sidebar {
    width: 200px;
  }
</style>
