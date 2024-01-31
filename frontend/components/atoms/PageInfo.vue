<script setup lang="ts">
  const props = defineProps({
    first: {
      type: Number,
      default: 1,
      required: true,
    },
    last: {
      type: Number,
      default: 1,
      required: true,
    },
    count: {
      type: Number,
      default: 1,
      required: true,
    },
  });
</script>

<template>
  <p class="hit-info">
    Showing {{ props.first }}-{{ props.last }} of {{ props.count }} results
  </p>
</template>

<style lang="scss" scoped>
  .hit-info {
    font-weight: bold;
  }
</style>
