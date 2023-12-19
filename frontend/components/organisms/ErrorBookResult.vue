<script setup lang="ts">
  import NoBookResult from '@/components/atoms/NoBookResult.vue';
  import OfflineBookResult from '@/components/atoms/OfflineBookResult.vue';
  import ConnectionErrorBookResult from '@/components/atoms/ConnectionErrorBookResult.vue';
  import ServerErrorBookResult from '@/components/atoms/ServerErrorBookResult.vue';
  import { ref, watch, computed, watchEffect } from 'vue';
  import { useBooksStore } from '@/stores/books';

  const booksStore = useBooksStore()
  const errorComponents = ref({
    offline: OfflineBookResult,
    timeout: ConnectionErrorBookResult,
    server: ServerErrorBookResult,
  });
  const errorComponent = computed(() =>
    !booksStore.errorType ? NoBookResult : errorComponents.value[booksStore.errorType]
  );
  const currentProps = computed(() => {
    if (!booksStore.errorType)
      return booksStore.query;
    return {};
  });
</script>

<template>
  <div class="content-container">
    <div class="card">
      <component :is="errorComponent" v-bind="currentProps"></component>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
