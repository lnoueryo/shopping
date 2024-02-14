<script setup lang="ts">
  import SocialMediaLinks from '@/components/molecules/SocialMediaLinks.vue';
</script>

<template>
  <div class="w100">
    <div class="center links">
      <SocialMediaLinks />
    </div>
    <div class="center">
      <div class="copy-right"
        >© 2023 Webtech Bookstore. All Rights Reserved .</div
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .links {
    height: calc(var(--height-content) * 1.5);
  }

  .copy-right {
    font-size: var(--font-size-caption);
    color: #737373;
    height: calc(var(--height-content) * 0.5);
  }
</style>
