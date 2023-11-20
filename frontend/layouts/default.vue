<script setup lang="ts">
  import Header from '@/components/organisms/Header.vue';
</script>

<template>
  <div>
    <Header />
    <div class="container">
      <div class="page-container margin-adjust">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .page-container {
    margin-top: var(--height-content);
    margin-bottom: var(--height-content);
  }
</style>
