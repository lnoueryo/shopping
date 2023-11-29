<script setup lang="ts">
  import { ref, defineEmits, watch } from 'vue';
  const props = defineProps({
    modelValue: {
      type: Number,
      default: 0,
    },
    size: Number,
    readOnly: Boolean,
    lastStarOnly: Boolean,
  });
  const emit = defineEmits(['update:modelValue']);
  const ratingInputId = Math.random().toString(36).substr(2, 9);
  const rate = ref(Math.round(props.modelValue));

  watch(rate, newRate => {
    emit('update:modelValue', newRate);
  });

  const getRatingFromIndex = index => 6 - index;

  const isDisabled = index => {
    return (
      props.readOnly || (props.lastStarOnly && getRatingFromIndex(index) === 5)
    );
  };

  const setOrResetRate = newRate => {
    if (rate.value === newRate) return (rate.value = 0);
    rate.value = newRate;
  };
</script>

<template>
  <div class="rate-form">
    <template v-for="star in 5" :key="`star${star}`">
      <input
        :id="`star-${ratingInputId}-${star}`"
        type="radio"
        :value="getRatingFromIndex(star)"
        v-model="rate"
        :disabled="isDisabled(star)"
        @click="setOrResetRate(getRatingFromIndex(star))"
      />
      <label
        :for="`star-${ratingInputId}-${star}`"
        :class="[
          { 'read-only': isDisabled(star) },
          { disabled: props.lastStarOnly },
        ]"
        :style="{ fontSize: `${props.size || 18}px` }"
        >★</label
      >
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .rate-form {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
  }

  .rate-form input[type='radio'] {
    display: none;
  }

  .rate-form label {
    position: relative;
    color: var(--color-tag);
    cursor: pointer;
    font-size: 18px;
  }

  /* Apply hover styles only for devices that support hover */
  @media (hover: hover) and (pointer: fine) {
    .rate-form label:not(.read-only):hover,
    .rate-form label:not(.read-only):hover ~ label {
      color: #ffd9008b;
    }
  }

  .rate-form input[type='radio']:checked ~ label {
    color: var(--color-parentheses);
  }

  .rate-form .read-only {
    cursor: default;
  }

  .rate-form .read-only.disabled {
    color: var(--color-row-selected-number);
  }
</style>
