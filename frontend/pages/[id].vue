<script setup lang="ts">
const route = useRoute();
const imageSrc = `/images/roadmaps/${route.params.id}.svg`; // 画像のパス

</script>


<template>
  <img :src="imageSrc" :alt="`roadmap of ${route.params.id}`" />
</template>


<style lang="scss" scoped>

</style>
