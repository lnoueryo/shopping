<script setup lang="ts">
  import SvgIcon from '@jamescoyle/vue-icon';
  import { ref, onBeforeMount, onMounted } from 'vue';
  import { mdiChevronLeft } from '@mdi/js';
  import { useStore } from '@/stores';
  import { getImageFromCache } from '@/utils';
  const props = defineProps({
    path: {
      type: String,
    },
    status: {
      type: Number,
    },
  });
  const route = useRoute();
  const imageSrc = ref(props.path);
  const isReady = ref(false);
  const imageStyle = ref({});
  const path = ref(route.query.next || '/')
  onBeforeMount(async () => {
    const cache = await getImageFromCache(props.path);
    if (cache) {
      imageSrc.value = cache;
      imageStyle.value = {
        '--background-url': `url(${imageSrc.value})`,
      };
    }
    isReady.value = true;
  });

</script>

<template>
  <div class="error-container">
    <div class="content-container">
      <img width="100%" :src="imageSrc" alt="error image" v-if="isReady" />
    </div>
    <div class="center padding-horizontal">
      <NuxtLink :to="path">
        <SvgIcon type="mdi" :path="mdiChevronLeft" />
        <span class="button-text">
          <template v-if="path !== '/'"> Go Back </template>
          <template v-else> Go To Home </template>
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .error-container {
    width: 100%;
    max-width: 720px
  }

  a {
    display: flex;
    align-items: center;
    border-radius: 3px;
    font-size: 20px;
    padding: 8px;
    color: #fafaf0;
    background: #0d2b45; //#3e7ba2 #fafaf0 #0d2b45
    background: #3e7ba2; //#3e7ba2 #fafaf0 #0d2b45
    background: linear-gradient(to left bottom, #36a1ff, #0d2b45);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
    -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);

    .button-text {
      margin-left: 4px;
    }
  }

  img {
    padding-right: 16px;
    padding-left: 16px;
  }

  @media screen and (max-width: 768px) {
    img {
      position: fixed;
      top: 0;
      height: 100vh;
      z-index: -1;
      left: 0;
      right: 0;
      object-fit: cover;
      padding: 0;
    }

    a {
      position: fixed;
      bottom: 108px;
      left: 8px;
    }
  }
</style>
