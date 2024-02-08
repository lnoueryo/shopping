<script setup lang="ts">
  import { ref, onBeforeMount } from 'vue';
  import { useStore } from '@/stores';
  import { getImageFromCache } from '@/utils';
  definePageMeta({
    middleware: ['roadmaps'],
  });
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const imgRef = ref(null);
  const imgPath = `/images/roadmaps/${route.params.id}.webp`;
  const imageSrc = ref(imgPath);
  const isReady = ref(false);
  onBeforeMount(async () => {
    const cache = await getImageFromCache(imgPath);
    if (cache) imageSrc.value = cache;
    isReady.value = true;
  });
  const handleError = async () => {
    router.replace({
      path: '/error',
      query: { next: store.route.from.fullPath, status: 404 },
    });
  };
</script>

<template>
  <picture>
    <img
      width="100%"
      ref="imgRef"
      :src="imageSrc"
      :alt="`roadmap of ${route.params.id}`"
      @error="handleError"
      v-if="isReady"
      style=""
    />
  </picture>
</template>

<style lang="scss" scoped>
  img {
    background-color: var(--color-white);
  }
</style>
