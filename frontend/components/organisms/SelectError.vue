<script setup lang="ts">
  import SkeltonScreen from '@/components/wrappers/SkeltonScreen.vue';
  import { useStore } from '@/stores';
  import { ref, computed, onMounted } from 'vue';
  const store = useStore();
  const router = useRouter();
  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();
  const next = ref(route.query.next);
  const errorTypes = {
    '404': {
      imagePath: `${runtimeConfig.public.BASE_IMAGE_PATH}/errors/404.webp`,
      status: 404,
      message: 'the requested document is not found',
      next: next.value,
    },
    '429': {
      imagePath: `${runtimeConfig.public.BASE_IMAGE_PATH}/errors/connection-error.webp`,
      status: 503,
      message: 'unstable internet connection detected',
      next: next.value,
    },
    '503': {
      imagePath: `${runtimeConfig.public.BASE_IMAGE_PATH}/errors/connection-error.webp`,
      status: 503,
      message: 'unstable internet connection detected',
      next: next.value,
    },
  };
  const errorType = ref(404);
  onMounted(async() => {
    const is404FromPage = store.route.from && !route.query.next;
    if (is404FromPage) {
      router.replace({
        path: store.route.to.path,
        query: { next: store.route.from.fullPath, status: 404 },
      });
    }

    if (!navigator.onLine) errorType.value = '503';
    if (route.query.status) {
      errorType.value = route.query.status;
    } else {
      const err = useError();
      if (!err.value) return (errorType.value = 404);
      errorType.value = err.value.statusCode;
    }
    next.value = route.query.next;
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

<style lang="scss" scoped></style>
