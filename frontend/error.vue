<script setup lang="ts">
  import HeaderFooterLayout from '@/components/wrappers/HeaderFooterLayout.vue';
  import SelectError from '@/components/organisms/SelectError.vue';
  import { onMounted, onUnmounted } from 'vue';
  import { useInitialConfig } from '@/composables/initial-config';
  const initialConfig = useInitialConfig();
  onMounted(async () => {
    await initialConfig.InitializeConfig();
  });
  onUnmounted(async () => {
    initialConfig.resetConfig();
  });
</script>

<template>
  <HeaderFooterLayout id="wrapper">
    <SelectError />
  </HeaderFooterLayout>
</template>

<style lang="scss" scoped></style>
