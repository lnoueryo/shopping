<script setup lang="ts">
  import SkeltonScreen from '@/components/atoms/SkeltonScreen.vue';
  import Header from '@/components/organisms/Header.vue';
  import Footer from '@/components/organisms/Footer.vue';
  import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
  import { useNuxtApp } from '#app';
  import { useStore } from '@/stores';
  const headerRef = ref(null);
  const footerRef = ref(null);
  const footerHeight = ref(0);
  const nuxtApp = useNuxtApp();
  const store = useStore();

  onMounted(async () => {
    store.updateDimensions();
    window.addEventListener('resize', store.updateDimensions);
    nuxtApp.$headerRef.value = headerRef.value;
    await nextTick();
  });

  onUnmounted(() => {
    if (nuxtApp.$headerRef.value === headerRef.value) {
      nuxtApp.$headerRef.value = null;
    }
  });

  watch(
    () => store.isHeaderReady,
    () => {
      store.initializeLayoutDimensions(headerRef.value);
    }
  );
</script>

<template>
  <div id="default-layout">
    <div class="header-footer-color">
      <SkeltonScreen
        width="100%"
        height="calc(var(--height-content) * 3)"
        v-if="!store.isReady"
      />
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
      <SkeltonScreen
        width="100%"
        height="calc(var(--height-content) * 2)"
        v-if="!store.isReady"
      />
      <div class="container" ref="footerRef" v-if="store.isReady">
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
