<script setup lang="ts">
  import NoBookResult from '@/components/atoms/NoBookResult.vue';
  import OfflineBookResult from '@/components/atoms/OfflineBookResult.vue';
  import ConnectionErrorBookResult from '@/components/atoms/ConnectionErrorBookResult.vue';
  import ServerErrorBookResult from '@/components/atoms/ServerErrorBookResult.vue';
  import { ref, watch, computed, watchEffect } from 'vue';
  const props = defineProps({
    modelValue: String,
    keyword: String,
    genre: String,
    rate: String,
    levels: Array || String,
  });
  const emit = defineEmits([
    'update:modelValue'
  ])
  const errorComponents = ref(
    {
      offline: OfflineBookResult,
      timeout: ConnectionErrorBookResult,
      server: ServerErrorBookResult,
    }
  )
  const errorType = ref(props.modelValue)
  const errorComponent = computed(() => !errorType.value ? NoBookResult : errorComponents.value[errorType.value])
  const currentProps = computed(() => {
    if (!errorType.value)
      return { keyword: props.keyword, genre: props.genre, rate: props.rate, levels: props.levels };
    return {};
  });
  watchEffect(() => errorType.value = props.modelValue)
  watch(errorType, newValue => emit('update:modelValue', newValue))
</script>

<template>
  <component :is="errorComponent" v-bind="currentProps"></component>
</template>

<style lang="scss" scoped>

</style>