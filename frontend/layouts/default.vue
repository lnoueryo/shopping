<script setup lang="ts">
  import HeaderFooterLayout from '@/components/wrappers/HeaderFooterLayout.vue';
  import { onMounted, onUnmounted, nextTick, watch } from 'vue';
  import { useStore } from '@/stores';

  const store = useStore();
  const router = useRouter();

  watch(
    () => store.isHeaderReady,
    () => {
      store.initializeLayoutDimensions();
      store.applyTheme();
    }
  );
  watch(
    () => store.theme,
    newTheme => store.updateTheme(newTheme)
  );

  onMounted(async () => {
    window.addEventListener('resize', store.updateDimensions);
    window.pageYOffset = 0;
    store.updateDimensions();
    await nextTick();
    const onConnectionChanged = (message, color) => {
      return () => {
        store.snackbar.show = true;
        store.snackbar.message = message;
        store.snackbar.color = color;
      };
    };
    window.addEventListener(
      'offline',
      onConnectionChanged(
        'The network connection has been lost',
        'var(--color-error)'
      )
    );
    window.addEventListener(
      'online',
      onConnectionChanged(
        'You are now connected to the network',
        'var(--color-class-name)'
      )
    );
  });

  onUnmounted(() => {
    window.removeEventListener('resize', store.updateDimensions);
  });
</script>

<template>
  <HeaderFooterLayout id="wrapper">
    <NuxtPage class="w100" />
  </HeaderFooterLayout>
</template>

<style lang="scss" scoped>

</style>
