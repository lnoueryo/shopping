<script setup lang="ts">
  import SkeltonScreen from '@/components/atoms/SkeltonScreen.vue';
  import Header from '@/components/organisms/Header.vue';
  import Footer from '@/components/organisms/Footer.vue';
  import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
  import { useNuxtApp } from '#app';
  import { useStore } from '@/stores';

  const headerRef = ref(null);
  const mainRef = ref(null);
  const footerRef = ref(null);
  const nuxtApp = useNuxtApp();
  const store = useStore();

  onMounted(async () => {
    window.pageYOffset = 0;
    store.updateDimensions();
    store.initializeLayoutDimensions();
    window.addEventListener('resize', store.updateDimensions);
    nuxtApp.$headerRef.value = headerRef.value;
    nuxtApp.$mainRef.value = mainRef.value;
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
      store.initializeLayoutDimensions();
    }
  );
</script>

<template>
  <div id="default-layout">
    <header class="header-footer-color">
      <SkeltonScreen
        width="100%"
        height="calc(var(--height-content) * 3)"
        v-if="!store.isReady"
      />
      <div class="container" ref="headerRef">
        <Header />
      </div>
    </header>
    <main class="container stretch-height">
      <div class="page-container margin-horizontal relative" ref="mainRef">
        <div class="card stretch-height" v-if="!store.isReady">
          <SkeltonScreen width="100%" height="100%" />
        </div>
        <NuxtPage class="w100" v-if="store.isReady" />
      </div>
    </main>
    <footer class="header-footer-color">
      <SkeltonScreen
        width="100%"
        height="calc(var(--height-content) * 2)"
        v-if="!store.isReady"
      />
      <div class="container" ref="footerRef" v-if="store.isReady">
        <Footer />
      </div>
    </footer>
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
