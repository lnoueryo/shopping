<script setup lang="ts">
  import HeaderFooterLayout from '@/components/wrappers/HeaderFooterLayout.vue';
  import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
  import { useNuxtApp } from '#app';
  import { useStore } from '@/stores';
  const headerRef = ref(null);
  const navRef = ref(null);
  const mainRef = ref(null);
  const footerRef = ref(null);
  const nuxtApp = useNuxtApp();
  const store = useStore();
  onMounted(async () => {
    window.addEventListener('resize', store.updateDimensions);
    window.pageYOffset = 0;
    store.updateDimensions();
    store.initializeLayoutDimensions();
    nuxtApp.$headerRef.value = headerRef.value;
    nuxtApp.$navRef.value = navRef.value;
    nuxtApp.$mainRef.value = mainRef.value;
    nuxtApp.$footerRef.value = footerRef.value;
    await nextTick();
    store.applyTheme();
  });

  onUnmounted(() => {
    if (nuxtApp.$headerRef.value === headerRef.value) {
      nuxtApp.$headerRef.value = null;
    }
    window.removeEventListener('resize', store.updateDimensions);
  });

  watch(
    () => store.isHeaderReady,
    () => {
      store.initializeLayoutDimensions();
    }
  );
  watch(
    () => store.theme,
    newTheme => store.updateTheme(newTheme)
  );
</script>

<template>
  <HeaderFooterLayout id="wrapper">
    <slot />
  </HeaderFooterLayout>
</template>

<style lang="scss" scoped>

</style>
