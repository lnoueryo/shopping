<script setup lang="ts">
  import SkeltonScreen from '@/components/wrappers/SkeltonScreen.vue';
  import ErrorLayout from '@/layouts/error.vue';
  import { ref, watch, computed, onMounted } from 'vue';
  import { useStore } from '@/stores';
  definePageMeta({
    layout: "error",
  });
  const runtimeConfig = useRuntimeConfig();
  const store = useStore();
  const router = useRouter();
  const route = useRoute();
  // router.push(store.from)
  if (store.route.from && !route.query.next) {
    console.log(store.route.from, route.query.next)
    router.push({ ... route, query: {next: store.from.fullPath}})
  } else if (!store.route.from) {
    router.push({ ... route, query: {next: '/'}})
  }
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

  const errorTypes = {
    '404': {
      path: `${runtimeConfig.public.BASE_IMAGE_PATH}/errors/404.svg`,
      status: 404,
    },
    '429': {
      path: `${runtimeConfig.public.BASE_IMAGE_PATH}/errors/connection-error.svg`,
      status: 429,
    },
    '503': {
      path: `${runtimeConfig.public.BASE_IMAGE_PATH}/errors/connection-error.svg`,
      status: 503,
    },
  };
  const errorType = ref('');
  onMounted(() => {
    if (!navigator.onLine) errorType.value = '503';
    errorType.value = route.query.status;
  });
  const error = computed(() => errorTypes[errorType.value]);
</script>

<template>
  <SkeltonScreen :condition="store.isReady">
    <div class="center">
      <Error v-bind="error" v-if="error" />
    </div>
  </SkeltonScreen>
</template>

<style lang="scss" scoped>

</style>
