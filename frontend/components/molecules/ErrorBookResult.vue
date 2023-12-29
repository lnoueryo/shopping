<script setup lang="ts">
  import NoBookResult from '@/components/atoms/NoBookResult.vue';
  import OfflineBookResult from '@/components/atoms/OfflineBookResult.vue';
  import ConnectionErrorBookResult from '@/components/atoms/ConnectionErrorBookResult.vue';
  import ServerErrorBookResult from '@/components/atoms/ServerErrorBookResult.vue';
  import { ref, computed } from 'vue';

  const props = defineProps({
    errorType: {
      type: String,
    },
    query: {
      type: Object,
    },
  });

  const errorComponents = ref({
    offline: OfflineBookResult,
    timeout: ConnectionErrorBookResult,
    server: ServerErrorBookResult,
  });
  const errorComponent = computed(() =>
    !props.errorType ? NoBookResult : errorComponents.value[props.errorType]
  );
  const currentProps = computed(() => {
    if (!props.errorType) return props.query;
    return {};
  });
</script>

<template>
  <component :is="errorComponent" v-bind="currentProps"></component>
</template>

<style lang="scss" scoped></style>
