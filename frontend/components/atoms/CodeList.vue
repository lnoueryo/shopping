<script setup lang="ts">
  const props = defineProps({
    htmlArray: Array,
  });
</script>

<template>
  <ul class="letter reset-ul">
    <li class="code flex" v-for="(html, i) in props.htmlArray" :key="i">
      <div class="number-color">{{ i + 1 }}&nbsp;&nbsp;</div>
      <div class="flex" v-html="html"></div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .code {
    font-size: 10px !important;
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
