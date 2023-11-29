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
    <div ref="headerRef">
      <Header />
    </div>
    <div class="container">
      <div class="page-container margin-horizontal relative">
        <NuxtPage />
      </div>
    </div>
    <div ref="footerRef">
      <Footer />
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
    display: flex;
    flex: 1;
  }
  .page-container {
    display: flex;
    flex: 1;
    margin-top: var(--height-content);
    margin-bottom: var(--height-content);
  }
</style>
