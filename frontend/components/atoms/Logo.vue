<script setup lang="ts"></script>

<template>
  <NuxtLink id="logo" to="/">
    <span id="webtech" class="letter">Webtech </span>
    <span id="bookstore" class="letter">Bookstore </span>
    <span id="parentheses" class="parentheses">{}</span>
  </NuxtLink>
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
