<script setup lang="ts">
  import SocialMediaLink from '@/components/atoms/SocialMediaLink.vue';
  import { socialMediaData } from '@/assets/js/social-media';
</script>

<template>
  <SocialMediaLink
    v-for="sns in socialMediaData"
    :key="sns.name"
    v-bind="sns"
  />
</template>

<style lang="scss" scoped>

</style>