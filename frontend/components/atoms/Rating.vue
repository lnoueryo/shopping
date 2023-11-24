<script setup lang="ts">
  import { ref, defineEmits, watch } from 'vue';
  const props = defineProps({
    rate: Number,
    size: Number,
    readOnly: Boolean,
    lastStarOnly: Boolean,
  });
  const emit = defineEmits(['update:rate']);
  const uniqueId = Math.random().toString(36).substr(2, 9);
  const rate = ref(Math.round(props.rate));

  watch(
    () => props.rate,
    newRate => {
      rate.value = Math.round(newRate);
    }
  );

  watch(rate, newRate => {
    emit('update:rate', newRate);
  });

  const calculateRate = index => 6 - index;

  const isDisabled = index => {
    return props.readOnly || (props.lastStarOnly && calculateRate(index) === 5);
  };

  const toggleRate = newRate => {
    if (rate.value === newRate) return (rate.value = 0);
    rate.value = newRate;
  };
</script>

<template>
  <div class="rate-form">
    <template v-for="star in 5" :key="`star${star}`">
      <input
        :id="`star-${uniqueId}-${star}`"
        type="radio"
        :value="calculateRate(star)"
        v-model="rate"
        :disabled="isDisabled(star)"
        @click="toggleRate(calculateRate(star))"
      />
      <label
        :for="`star-${uniqueId}-${star}`"
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
      color: var(--color-parentheses);
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
