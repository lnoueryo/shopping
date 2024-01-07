<script setup lang="ts"></script>

<template>
<div>
  <NuxtLink id="logo" to="/">
    <img width="100%" src="@/assets/images/logo.svg" alt="" srcset="">
  </NuxtLink>
</div>
</template>

<style lang="scss" scoped>
  #title {
    font-size: 20px;
    text-align: center;
    display: block;
  }

  #webtech {
    color: var(--color-class);
  }

  #bookstore {
    color: var(--color-class-name);
  }

  #parentheses {
    color: var(--color-parentheses);
  }
</style>
