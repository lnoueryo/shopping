<script setup lang="ts">
  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false,
    },
  });
</script>

<template>
  <button :disabled="props.disabled">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
  button {
    color: var(--color-class);
    border: solid 2px var(--color-class);
    border-radius: 4px;
    background-color: var(--color-base-second);
    font-weight: bold;
    transition:
      background-color 0.3s ease,
      box-shadow 0.2s ease;
    min-height: 40px;
    min-width: 40px;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (hover: hover) and (pointer: fine) {
    button:not(:disabled):not(.active):hover {
      background-color: var(--color-class);
      color: var(--color-white);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  }

  button:not(:disabled):not(.active):active {
    background-color: var(--color-class);
    color: var(--color-white);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    opacity: var(--opacity-active);
    transition: var(--transition-primary);
  }

  button.active {
    background-color: var(--color-class);
    color: var(--color-white);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  button:disabled {
    background-color: var(--color-hover-white);
    color: var(--color-row-number);
    cursor: default;
    box-shadow: none;
    border: solid 2px var(--color-disabled);
    opacity: var(--opacity-disabled);
    border: solid 2px var(--color-row-number);
  }
</style>
