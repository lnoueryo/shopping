<script setup lang="ts">
  import SkeltonScreen from '@/components/wrappers/SkeltonScreen.vue';
  import { useStore } from '@/stores';
  import { useError } from 'nuxt/app';
  import { ref, computed, onMounted } from 'vue';
  const store = useStore();
  const router = useRouter();
  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();
  const errorTypes = {
    '404': {
      imagePath: `${runtimeConfig.public.BASE_IMAGE_PATH}/errors/404.webp`,
      status: 404,
    },
    '429': {
      imagePath: `${runtimeConfig.public.BASE_IMAGE_PATH}/errors/connection-error.webp`,
      status: 503,
    },
    '503': {
      imagePath: `${runtimeConfig.public.BASE_IMAGE_PATH}/errors/connection-error.webp`,
      status: 503,
    },
  };
  const errorType = ref('');
  onMounted(() => {
    const is404FromPage = store.route.from && !route.query.next;
    const isDirect404 = !store.route.from;
    if (is404FromPage) {
      router.replace({
        path: '/error',
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
