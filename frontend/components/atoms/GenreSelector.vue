<script setup lang="ts">
  import { defineEmits, computed } from 'vue';
  import SvgIcon from '@jamescoyle/vue-icon';
  const genre = defineProps({
    id: String,
    title: String,
    to: String,
    icon: String,
    disabled: Boolean,
    size: Number,
  });
  const router = useRouter();
  const route = useRoute();
  const selectedGenre = computed(() => route.query.genre);
  const emit = defineEmits(['update:genre']);

  const selectGenre = () => {
    if (selectedGenre.value === genre.id) {
      const newQuery = { ...route.query };
      delete newQuery.genre;
      router.push({ path: '/books', query: newQuery });
      return emit('update:genre', null);
    }
    router.push({ path: '/books', query: { ...route.query, genre: genre.id } });
    emit('update:genre', genre);
  };
</script>

<template>
  <NuxtLink
    :to="{ path: '/books', query: { genre: genre.id } }"
    class="genre flex justify-center align-center"
    :style="{
      backgroundColor:
        selectedGenre === genre.id
          ? 'var(--color-sub-black)'
          : 'var(--color-sub-white)',
      minHeight: size + 'px',
      minWidth: size + 'px',
    }"
    @click.prevent="selectGenre"
  >
    <div
      class="genre-content"
      :style="{
        color:
          selectedGenre === genre.id
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
      opacity: var(--opacity-light);
      transition: var(--hover-transition);
      background-color: var(--color-hover-white);
    }
    .genre:hover .genre-content {
      transform: scale(1.15);
      transition: var(--hover-transition);
    }
  }
</style>
