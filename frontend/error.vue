<script setup lang="ts">
  import SkeltonScreen from '@/components/wrappers/SkeltonScreen.vue';
  import ErrorLayout from '@/layouts/error.vue';
  import { ref, watch, computed, onMounted } from 'vue';
  import { useStore } from '@/stores';

  const runtimeConfig = useRuntimeConfig();
  const store = useStore();
  const route = useRoute();

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
    if (route.query.status) {
      errorType.value = route.query.status;
    } else {
      const err = useError();
      errorType.value = err.value.statusCode;
    }
  });
  const error = computed(() => errorTypes[errorType.value]);
</script>

<template>
  <ErrorLayout>
    <SkeltonScreen :condition="store.isReady">
      <div class="center">
        <Error v-bind="error" v-if="error" />
      </div>
    </SkeltonScreen>
  </ErrorLayout>
</template>

<style lang="scss" scoped>

</style>
