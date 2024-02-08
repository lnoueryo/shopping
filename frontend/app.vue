<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue';
  import { useInitialConfig } from '@/composables/initial-config';
  const initialConfig = useInitialConfig();
  onMounted(async () => {
    await initialConfig.InitializeConfig();
  });
  onUnmounted(async () => {
    await initialConfig.resetConfig();
  });
</script>

<template>
  <div>
    <NuxtLayout />
  </div>
</template>
<style lang="scss" scoped></style>
