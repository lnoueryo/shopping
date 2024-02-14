<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  timeout: {
    type: Number || String,
    default: 1000
  }
})
const localLoading = ref(false)
watch(() => props.loading, (newValue) => {
  if (newValue) {
    localLoading.value = newValue;
    setInterval(() => {
      if (!props.loading) {
        localLoading.value = false;
      }
    }, props.timeout)
  }
})
</script>

<template>
  <progress v-if="localLoading" class="pure-material-progress-linear"/>
</template>

<style lang="scss" scoped>
.pure-material-progress-linear {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  height: 0.25em;
  color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
  background-color: rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.12);
  // font-size: 16px;
  width: 100%;
}

.pure-material-progress-linear::-webkit-progress-bar {
    background-color: transparent;
}

/* Determinate */
.pure-material-progress-linear::-webkit-progress-value {
    background-color: currentColor;
    transition: all 0.2s;
}

.pure-material-progress-linear::-moz-progress-bar {
    background-color: currentColor;
    transition: all 0.2s;
}

.pure-material-progress-linear::-ms-fill {
    border: none;
    background-color: currentColor;
    transition: all 0.2s;
}

/* Indeterminate */
.pure-material-progress-linear:indeterminate {
  background-image: linear-gradient(to right, var(--color-class) 30%, #33B8FF 50%, transparent 50%);
  background-size: 200% 100%;
  animation: codeEditing 0.8s infinite linear;
}

.pure-material-progress-linear:indeterminate::-moz-progress-bar {
    background-color: transparent;
}

.pure-material-progress-linear:indeterminate::-ms-fill {
    animation-name: none;
}

@keyframes codeEditing {
  0% { background-position: 100% 0; }
  100% { background-position: 0 0; }
}

@keyframes syntaxHighlight {
  0% { background-position: 100% 0; }
  100% { background-position: 0 0; }
}

@keyframes sourceBuild {
  0% { background-position: 100% 0; }
  100% { background-position: 0 0; }
}

@keyframes errorWarning {
  0% { background-position: 100% 0; }
  100% { background-position: 0 0; }
}

@keyframes darkTheme {
  0% { background-position: 100% 0; }
  100% { background-position: 0 0; }
}



</style>