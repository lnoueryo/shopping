<script setup lang="ts">
  import { ref, watch } from 'vue';
  import SvgIcon from '@jamescoyle/vue-icon';
  const genre = defineProps({
    title: String,
    to: String,
    icon: String,
  });
  const route = useRoute();
  const selectedGenre = ref('genre' in route.query && route.query.genre);
  watch(
    () => route.query.genre,
    newGenre => {
      selectedGenre.value = newGenre;
    }
  );
</script>

<template>
  <NuxtLink
    :to="{ path: '/books', query: { genre: genre.to } }"
    class="genre flex justify-center align-center"
    :style="{
      backgroundColor:
        selectedGenre === genre.to
          ? 'var(--color-sub-black)'
          : 'var(--color-sub-white)',
    }"
  >
    <div
      class="genre-content"
      :style="{
        color:
          selectedGenre === genre.to
            ? 'var(--color-sub-white)'
            : 'var(--color-sub-black)',
      }"
    >
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
    font-weight: bold;
  }

  .genre {
    min-height: 75px;
    min-width: 75px;
    transition: var(--hover-transition);
    border-radius: 3px;
  }

  .genre-content {
    transition: var(--hover-transition);
  }

  @media (hover: hover) and (pointer: fine) {
    .genre:hover {
      opacity: var(--hover-opacity);
      transition: var(--hover-transition);
      background-color: var(--color-hover-white);
    }
    .genre:hover .genre-content {
      transform: scale(1.15);
      transition: var(--hover-transition);
    }
  }
</style>
