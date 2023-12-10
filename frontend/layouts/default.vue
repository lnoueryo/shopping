<script setup lang="ts">
  import Header from '@/components/organisms/Header.vue';
  import Footer from '@/components/organisms/Footer.vue';
  import { ref, onMounted, onUnmounted, nextTick } from 'vue';
  import { useNuxtApp } from '#app';
  const headerRef = ref(null);
  const footerRef = ref(null);
  const footerHeight = ref(0);
  const nuxtApp = useNuxtApp();

  onMounted(async () => {
    nuxtApp.$headerRef.value = headerRef.value;
    await nextTick();
    const { height } = footerRef.value.getBoundingClientRect();
    footerHeight.value = height;
  });

  onUnmounted(() => {
    if (nuxtApp.$headerRef.value === headerRef.value) {
      nuxtApp.$headerRef.value = null;
    }
  });
</script>

<template>
  <div id="default-layout">
    <div class="header-footer-color">
      <div class="container" ref="headerRef">
        <Header />
      </div>
    </div>
    <div class="container stretch-height">
      <div class="page-container margin-horizontal relative">
        <NuxtPage class="w100" />
      </div>
    </div>
    <div class="header-footer-color">
      <div class="container" ref="footerRef">
        <Footer />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  #default-layout {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .container {
    max-width: 1200px;
    width: 100%;
    margin: auto;
  }
  .stretch-height {
    display: flex;
    flex: 1;
  }
  .header-footer-color {
    background-color: var(--color-base-black);
    width: 100%;
  }
  .page-container {
    display: flex;
    flex: 1;
    margin-top: var(--height-content);
    margin-bottom: var(--height-content);
  }
</style>
