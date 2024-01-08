<script setup lang="ts">
  const runtimeConfig = useRuntimeConfig();
  const imagePath = `${runtimeConfig.public.BASE_IMAGE_PATH}/logo.svg`;
</script>

<template>
  <div>
    <NuxtLink id="logo" to="/">
      <img width="100%" :src="imagePath" alt="Webtech Bookstore" />
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
  #title {
    font-size: 20px;
    text-align: center;
    display: block;
  }

  #webtech {
    color: var(--color-class);
  }

  #bookstore {
    color: var(--color-class-name);
  }

  #parentheses {
    color: var(--color-parentheses);
  }
</style>
