<script setup lang="ts">
  import { computed } from 'vue';
  const props = defineProps({
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    to: {
      type: String,
    },
    color: {
      type: String,
      default: 'var(--color-primary)',
    },
    navHeight: {
      type: String,
    },
  });
  const navStyle = computed(() => {
    return {
      height: props.navHeight,
      color: props.color,
    };
  });
</script>

<template>
  <div :style="navStyle">
    <template v-if="props.to">
      <NuxtLink
        :id="props.id"
        class="monospace-font h100"
        :style="{ color: props.color }"
        :to="props.to"
        activeClass="nuxt-active-class"
      >
        <span class="ripple-text">{{ props.title }}</span>
      </NuxtLink>
    </template>
    <template v-else>
      <p class="h100" aria-hidden="true">
        <span>//&nbsp;</span>
        <span>{{ props.title }}</span>
      </p>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .nuxt-active-class {
    background-color: var(--color-base-quinary);
    transition: var(--transition-primary);
  }

  a,
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px; /* コードのブロック風に丸みを帯びさせる */
    min-width: 80px;
    transition: var(--transition-primary);
    position: relative;
    overflow: hidden;
  }

  p {
    cursor: default;
    user-select: none;
    pointer-events: none;
    color: var(--color-comment-out);
  }

  @media (hover: hover) and (pointer: fine) {
    a:hover {
      transition: var(--transition-primary);
    }

    a:not(.nuxt-active-class):not(.disabled):hover {
      background-color: var(--color-base-quaternary);
      text-decoration: underline; /* アンダーラインを追加 */
      transition: var(--transition-primary);
    }
  }

  a:not(.nuxt-active-class):not(.disabled):active {
    background-color: var(--color-base-quaternary);
    text-decoration: underline; /* アンダーラインを追加 */
    transition: var(--transition-primary);
  }
  @media screen and (max-width: 768px) {
    a,
    p {
      min-width: 96px;
    }
  }

  a:focus-within {
    border: 2px solid black;
  }
</style>
