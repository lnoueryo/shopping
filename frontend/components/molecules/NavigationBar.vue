<script setup lang="ts">
  import { ref } from 'vue';
  import { navigationData } from '@/assets/js/navigation.js';
  const props = defineProps({
    navHeight: Number,
  });
  const navigationLinks = ref(navigationData);
</script>

<template>
  <nav class="navigation">
    <ul class="flex">
      <li v-for="link in navigationLinks" :key="link.id">
        <NuxtLink
          :id="link.id"
          class="letter"
          :style="{ color: link.color, height: props.navHeight + 'px' }"
          :to="link.to"
          activeClass="nuxt-active-class"
          ><span>{{ link.title }}</span></NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  .nuxt-active-class {
    background-color: #004d40; /* ダークテーマに合う背景色 */
    transition: var(--hover-transition);
  }

  .nuxt-active-class:hover {
    opacity: var(--hover-opacity);
    transition: var(--hover-transition);
  }

  nav ul {
    padding: 0;
    margin: 0;
    li {
      width: 100%;
      max-width: 160px;
      text-align: center;
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px; /* コードのブロック風に丸みを帯びさせる */
        min-width: 80px;
      }
      @media (hover: hover) and (pointer: fine) {
        a:hover {
          transition: var(--hover-transition);
        }

        a:not(.nuxt-active-class):hover {
          background-color: var(--color-hover-green);
          text-decoration: underline; /* アンダーラインを追加 */
          transition: var(--hover-transition);
        }
      }
    }
  }
</style>
