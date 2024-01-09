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
  <div class="hit-info">
    <div>
      Showing {{ props.first }}-{{ props.last }} of {{ props.count }} results
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .hit-info {
    font-weight: bold;
    color: var(--color-sub-black);
  }
</style>