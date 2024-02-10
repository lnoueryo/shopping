<script setup lang="ts">
  import SvgIcon from '@jamescoyle/vue-icon';
  import RippleButton from '@/components/wrappers/RippleButton.vue';
  import { ref, onBeforeMount } from 'vue';
  import { mdiChevronLeft } from '@mdi/js';
  import { getImageFromCache } from '@/utils';
  const props = defineProps({
    imagePath: {
      type: String,
    },
    status: {
      type: Number,
    },
  });
  const route = useRoute();
  const imageSrc = ref(props.imagePath);
  const isReady = ref(false);
  const imageStyle = ref({});
  const path = ref(route.query.next || '/');
  onBeforeMount(async () => {
    const cache = await getImageFromCache(props.imagePath);
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
    <div class="center content-padding-horizontal">
      <RippleButton
        color="#0d2b45"
        change
        borderRadius="3px"
      >
        <NuxtLink class="button-padding" :to="path">
          <div class="button-content ripple-text">
            <SvgIcon type="mdi" :path="mdiChevronLeft" />
            <span>
              <template v-if="path !== '/'"> Go Back </template>
              <template v-else> Go To Home </template>
            </span>
          </div>
        </NuxtLink>
      </RippleButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .error-container {
    width: 100%;
    max-width: 720px;
  }

  a {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #fafaf0;
    background: linear-gradient(to left bottom, #36a1ff, #0d2b45);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
    -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);

    .button-content {
      display: flex;
      align-items: center;
      span {
        padding-right: var(--space-sm)
      }
    }

  }

  @media (hover: hover) and (pointer: fine) {
    a:hover {
      opacity: var(--opacity-hover);
      transition: var(--transition-primary);
    }
  }

  a:active {
    opacity: 1;
    transition: all 0s
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
