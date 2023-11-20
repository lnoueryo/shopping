<script setup lang="ts">
  import SvgIcon from '@jamescoyle/vue-icon';
  const genre = defineProps({
    title: String,
    to: String,
    icon: String,
  });
</script>

<template>
  <NuxtLink
    :to="{ path: '/books', query: { genre: genre.to } }"
    class="genre flex justify-center align-center"
  >
    <div class="genre-content">
      <div class="text-center">
        <svg-icon type="mdi" :path="genre.icon"></svg-icon>
      </div>
      <div class="genre-title text-center">
        {{ genre.title }}
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
  .genre-title {
    font-size: 10px;
    color: #333; // タイトルの色
    font-weight: bold;
  }

  .genre {
    min-height: 75px;
    min-width: 75px;
    transition: var(--hover-transition);
    border-radius: 3px; // 角丸デザイン
    color: #333; // 暗いグレー
  }

  .genre-content {
    transition: var(--hover-transition);
  }

  @media (hover: hover) and (pointer: fine) {
    .genre:hover {
      opacity: var(--hover-opacity);
      transition: var(--hover-transition);
      background-color: #ddd;
      // background-color: var(--color-row-selected-number);
    }
    .genre:hover .genre-content {
      transform: scale(1.15);
      transition: var(--hover-transition);
    }
  }
</style>
