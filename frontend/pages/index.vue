<script setup lang="ts">
  import GenreContent from '@/components/organisms/GenreContent.vue';
  import { useStore } from '@/stores';
  const store = useStore();
</script>

<template>
  <div>
    <section>
      <div class="content-container card-shadow">
        <div
          class="card title-container flex align-center padding-horizontal"
          v-if="store.isReady"
        >
          <div class="title padding-horizontal"> Genres </div>
        </div>
        <div class="card">
          <GenreContent v-if="store.isReady" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
