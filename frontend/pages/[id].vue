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
  const isImageReady = ref(false);
  onBeforeMount(async () => {
    isReady.value = false;
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
  <div>
    <template v-if="isReady">
      <picture>
        <img
          width="100%"
          ref="imgRef"
          :src="imageSrc"
          :alt="`roadmap of ${route.params.id}`"
          @load="isImageReady = true"
          @error="handleError"
          style=""
        />
      </picture>
    </template>
    <template v-else-if="!isReady || !isImageReady">
      <div class="absolute-center center">
        <Spinner />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  img {
    background-color: var(--color-white);
  }
</style>
