<script setup lang="ts">
  import SocialMediaLink from '@/components/atoms/SocialMediaLink.vue';
  import RippleButton from '@/components/wrappers/RippleButton.vue';
  import { socialMediaData } from '@/assets/js/social-media';
</script>

<template>
  <div class="flex">
    <div v-for="sns in socialMediaData" :key="sns.name">
      <RippleButton
        class="border-radius"
        color="var(--color-base-quaternary)"
        change
      >
        <SocialMediaLink v-bind="sns" />
      </RippleButton>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
