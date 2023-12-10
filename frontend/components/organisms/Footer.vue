<script setup lang="ts">
  import SocialMediaLinks from '../atoms/SocialMediaLink.vue';
  import { socialMediaData } from '@/assets/js/social-media';
</script>

<template>
  <footer id="footer">
    <div class="footer-middle-container">
      <div class="flex justify-center">
        <SocialMediaLinks
          v-for="sns in socialMediaData"
          :key="sns.name"
          v-bind="sns"
        />
      </div>
      <div class="flex justify-center">
        <div class="copy-right"
          >© 2023 Webtech Bookstore. All Rights Reserved .</div
        >
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  #footer {
    background-color: var(--color-base-black);
    width: 100%;
  }
  .footer-middle-container {
    padding: 0 0 8px;
  }

  .copy-right {
    font-size: 12px;
    color: #737373;
  }
</style>
