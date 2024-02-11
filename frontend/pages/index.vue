<script setup lang="ts">
  import SkeltonScreen from '@/components/wrappers/SkeltonScreen.vue';
  import GenreContent from '@/components/organisms/GenreContent.vue';
  import { useStore } from '@/stores';
  const store = useStore();
</script>

<template>
  <div>
    <section id="genre-content">
      <div class="content-container card-shadow">
        <SkeltonScreen
          :condition="store.isReady"
          width="100%"
          height="calc(var(--height-content) * 1)"
        >
          <div
            class="card title-container vertical-center content-padding-horizontal"
          >
            <h2 class="content-padding-horizontal"> Genres </h2>
          </div>
        </SkeltonScreen>
        <SkeltonScreen
          :condition="store.isReady"
          width="100%"
          height="calc(var(--height-content) * 4)"
        >
          <div class="card">
            <GenreContent />
          </div>
        </SkeltonScreen>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
