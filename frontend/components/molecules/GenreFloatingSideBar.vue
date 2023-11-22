<script setup lang="ts">
  import GenreSelector from '@/components/atoms/GenreSelector.vue';
  import { genreData } from '@/assets/js/genres.js';
  import { onMounted } from 'vue';
  const genreRef = ref(null);
  let heightContent = 0;
  let headerHeight = 0;
  onMounted(() => {
    window.addEventListener('scroll', moveGenreContent);
    const style = getComputedStyle(document.documentElement);
    heightContent = Number(
      style.getPropertyValue('--height-content').trim().replace('px', '')
    );
    const header = document.getElementById('header');
    headerHeight = header.getBoundingClientRect().height;
  });
  const moveGenreContent = () => {
    try {
      if (window.scrollY > headerHeight) {
        genreRef.value.style.top = window.scrollY + heightContent + 'px';
        return;
      }
      genreRef.value.style.top = headerHeight + heightContent + 'px';
    } catch (error) {
      console.debug(error);
    }
  };
</script>

<template>
  <div ref="genreRef" class="floating-sidebar">
    <div class="card title-container flex align-center">
      <div class="title"> Genres </div>
    </div>
    <div class="card flex justify-start align-center wrap">
      <GenreSelector
        class="genre-selector"
        v-for="genre in genreData"
        :key="genre.title"
        v-bind="genre"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .floating-sidebar {
    position: absolute;
  }
  .genre-selector {
    width: 50%;
  }
</style>
