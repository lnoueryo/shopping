<script setup lang="ts">
  const runtimeConfig = useRuntimeConfig();
  const imagePath = `${runtimeConfig.public.BASE_IMAGE_PATH}/logo.svg`;
</script>

<template>
  <div>
    <NuxtLink id="logo" to="/">
      <h1><img width="100%" :src="imagePath" alt="Webtech Bookstore" /></h1>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
  a:focus-within {
    border: initial;
  }
</style>
