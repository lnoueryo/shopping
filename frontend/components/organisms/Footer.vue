<script setup lang="ts">
  import SocialMediaLinks from '@/components/molecules/SocialMediaLinks.vue';
</script>

<template>
  <div class="w100">
    <div class="footer-middle-container">
      <div class="flex justify-center">
        <SocialMediaLinks />
      </div>
      <div class="flex justify-center">
        <div class="copy-right"
          >© 2023 Webtech Bookstore. All Rights Reserved .</div
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .footer-middle-container {
    padding: 0 0 8px;
  }

  .copy-right {
    font-size: 12px;
    color: #737373;
    padding-top: 8px;
  }
</style>
