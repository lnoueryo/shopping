<script setup lang="ts">
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiMagnify } from '@mdi/js';
</script>

<template>
  <button class="magnify" @click="$emit('onSearchClicked')">
    <svg-icon type="mdi" :path="mdiMagnify" color="black"></svg-icon>
  </button>
</template>

<style lang="scss" scoped>
  .magnify {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 4px 20px;
    background: linear-gradient(to top, #e5e5e5, #ffffff);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: var(--hover-transition);
    border-radius: 3px;
    border: 2px solid #ddd;
    box-sizing: border-box;
    cursor: pointer;
  }

  .magnify:hover {
    opacity: var(--hover-opacity);
    transition: var(--hover-transition);
  }

  .magnify:active {
    opacity: 0.9;
    transition: var(--hover-transition);
  }
</style>
