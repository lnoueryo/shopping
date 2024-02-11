<script setup lang="ts">
  import { ref, watch, watchEffect, computed, onMounted } from 'vue';
  import { getCssVariableValue, calculateAdjacentColors } from '@/utils';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: true,
    },
    message: {
      type: String,
    },
    color: {
      type: String,
      default: 'var(--color-class)',
    },
    position: {
      type: String,
      default: 'bottom',
    },
    timeout: {
      type: Number,
      default: 3000,
    },
  });
  const emit = defineEmits(['update:modelValue']);
  const isSnackbarShowed = ref(props.modelValue);
  const timer = ref(null);
  const snackbarStyle = ref({});
  const snackbarTransform = computed(() => {
    const { position } = props;
    switch (position) {
      case 'top':
        return 'translateY(-100%)';
      case 'bottom':
        return 'translateY(100%)';
      case 'right':
        return 'translateX(100%)';
      case 'left':
        return 'translateX(-100%)';
      default:
        return 'translate(0, 0)';
    }
  });

  watchEffect(() => (isSnackbarShowed.value = props.modelValue));
  watch(isSnackbarShowed, newValue => {
    if (newValue) {
      clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        isSnackbarShowed.value = false;
        emit('update:modelValue', false);
      }, props.timeout);
    }
  });

  watch(
    () => props.color,
    newValue => {
    const { current, darker } = getDarkerAndLighterColor(newValue);
    snackbarStyle.value = {
      '--snackbar-background-color': current,
      '--snackbar-border-color': darker,
      '--snackbar-transform': snackbarTransform.value,
    };
    }
  );

  onMounted(() => {
    const { current, darker } = getDarkerAndLighterColor(props.color);
    snackbarStyle.value = {
      '--snackbar-background-color': current,
      '--snackbar-border-color': darker,
      '--snackbar-transform': snackbarTransform.value,
    };
  });
</script>

<template>
  <div>
    <input
      id="snackbar"
      v-model="isSnackbarShowed"
      type="checkbox"
      class="visually-hidden"
    />
    <label class="center card-shadow" for="snackbar" :style="snackbarStyle">
      <span class="snackbar-text content-padding">{{ props.message }}</span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
  .snackbar-text {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline;
    color: var(--color-text-secondary);
  }

  input[type='checkbox']:checked ~ label {
    height: var(--height-content);
    opacity: 1;
    transform: translate(0, 0);
    transition:
      var(--transition-secondary),
      width 0s,
      height 0s,
      background-color 0s,
      border 0s;
    pointer-events: initial;
  }

  input[type='checkbox'] ~ label {
    background-color: var(--snackbar-background-color);
    border-radius: 3px;
    border: solid 2px var(--snackbar-border-color);
    height: 0px;
    opacity: 0;
    transform: var(--snackbar-transform); /* 初期状態での変換を設定 */
    transition:
      var(--transition-secondary),
      height 0s 0.6s;
    pointer-events: none;
  }
</style>
