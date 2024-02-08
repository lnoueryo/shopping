<script setup lang="ts">
  const props = defineProps({
    htmlArray: Array,
  });
</script>

<template>
  <ul class="monospace-font reset-ul" aria-hidden="true">
    <li class="code flex" v-for="(html, i) in props.htmlArray" :key="i">
      <div class="number-color">{{ i + 1 }}&nbsp;&nbsp;</div>
      <div class="flex" v-html="html"></div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .code {
    font-size: var(--font-size-caption);
    font-weight: bold;
  }

  .reset-ul {
    padding: 0;
    margin: auto;
  }

  .number-color {
    color: var(--color-row-number);
  }
</style>
