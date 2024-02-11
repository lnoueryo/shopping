<script setup lang="ts">
  import Header from '@/components/organisms/Header.vue';
  import Navigation from '@/components/organisms/Navigation.vue';
  import Footer from '@/components/organisms/Footer.vue';
  import SkeltonScreen from '@/components/wrappers/SkeltonScreen.vue';
  import { useStore } from '@/stores';
  const store = useStore();
</script>

<template>
  <div id="wrapper">
    <header>
      <SkeltonScreen
        width="100%"
        height="calc(var(--height-content) * 2)"
        v-if="!store.isReady"
      />
      <div class="container">
        <Header />
      </div>
    </header>
    <nav>
      <SkeltonScreen
        width="100%"
        height="calc(var(--height-content) * 1)"
        v-if="!store.isReady"
      />
      <div class="container" v-if="store.isReady">
        <Navigation />
      </div>
    </nav>
    <main>
      <div class="container stretch-height">
        <div id="main" class="page-container margin-horizontal relative">
          <slot />
        </div>
      </div>
    </main>
    <footer>
      <SkeltonScreen
        width="100%"
        height="calc(var(--height-content) * 2)"
        v-if="!store.isReady"
      />
      <div class="container" v-if="store.isReady">
        <Footer />
      </div>
    </footer>
    <SnackBar
      class="fixed-center"
      style="top: 100%; transform: translate(-50%, -104px); z-index: 1"
      v-model="store.snackbar.show"
      v-bind="store.snackbar"
    />
  </div>
</template>

<style lang="scss" scoped>
  header {
    position: relative;
    z-index: 2;
  }

  header,
  nav,
  footer {
    background-color: var(--color-base-tertiary);
    width: 100%;
  }

  main {
    display: flex;
    flex: 1;
  }

  .stretch-height {
    display: flex;
    flex: 1;
    margin-top: var(--height-content);
    margin-bottom: var(--height-content);
  }

  .page-container {
    display: flex;
    flex: 1;
  }
</style>
