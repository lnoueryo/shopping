<script setup lang="ts">
  import { ref, defineEmits, watch, watchEffect, onMounted } from 'vue';
  import { getCssVariableValue, isDarkColor, hexToRgb } from '@/utils';
  const MIN_RATING = 0;
  const MAX_RATING = 5;
  const props = defineProps({
    modelValue: {
      type: Number,
      default: 0,
    },
    size: Number,
    readOnly: Boolean,
    lastStarOnly: Boolean,
    mode: {
      type: String,
      default: 'standard',
    },
  });
  const emit = defineEmits(['update:modelValue']);

  const normalizeRating = () => {
    let rate = props.modelValue;
    if (props.modelValue <= MIN_RATING || MAX_RATING < props.modelValue) {
      rate = MIN_RATING;
    }
    if (props.lastStarOnly && rate === MAX_RATING) {
      rate = MIN_RATING;
    }
    emit('update:modelValue', rate);
    return Math.floor(rate);
  };
  const rate = ref(normalizeRating());
  const ratingInputId = Math.random().toString(36).substr(2, 9);
  watchEffect(() => (rate.value = normalizeRating()));
  watch(rate, newRate => {
    emit('update:modelValue', newRate);
  });

  const getRatingFromIndex = index => 1 + MAX_RATING - index;

  const isDisabled = index => {
    return (
      props.readOnly ||
      (props.lastStarOnly && getRatingFromIndex(index) === MAX_RATING)
    );
  };

  const setOrResetRate = newRate => {
    if (rate.value === newRate) return (rate.value = MIN_RATING);
    rate.value = newRate;
  };

  watch(
    () => props.mode,
    () => {
      ratingStyle.value = {
        '--color-rating': isBaseColorDark() ? '#757575' : '#bdbdbd',
        '--color-hover-rating': isBaseColorDark() ? '#8b6f23' : '#ffe390',
        fontSize: `${props.size || 18}px`,
      };
    }
  );
  const isBaseColorDark = () => {
    const hex = getCssVariableValue('--color-base-primary');
    return isDarkColor(hexToRgb(hex));
  };
  const ratingStyle = ref({});

  onMounted(() => {
    ratingStyle.value = {
      '--color-rating': isBaseColorDark() ? '#818181' : '#bdbdbd',
      '--color-hover-rating': isBaseColorDark() ? '#8b6f23' : '#ffe390',
      fontSize: `${props.size || 18}px`,
    };
  });
</script>

<template>
  <fieldset
    class="rate-form"
    role="radiogroup"
    aria-label="filter books by rating"
  >
    <legend class="visually-hidden">Ratings</legend>
    <label
      v-for="star in MAX_RATING"
      :key="`star${star}`"
      :for="`star-${ratingInputId}-${star}`"
      :class="[
        { 'read-only': isDisabled(star) },
        { checked: rate >= getRatingFromIndex(star) },
        { disabled: props.lastStarOnly && isDisabled(star) },
      ]"
      :style="ratingStyle"
      @keyup.enter="setOrResetRate(getRatingFromIndex(star))"
      @click="$event.target.blur()"
      :aria-label="`rate ${getRatingFromIndex(star)}`"
    >
      <span aria-hidden="true">★</span>
      <input
        :id="`star-${ratingInputId}-${star}`"
        :name="`star-${ratingInputId}-${star}`"
        class="visually-hidden"
        type="radio"
        :value="getRatingFromIndex(star)"
        v-model="rate"
        :disabled="isDisabled(star)"
        @click="setOrResetRate(getRatingFromIndex(star))"
      />
    </label>
  </fieldset>
</template>

<style lang="scss" scoped>
  .rate-form {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
    line-height: 1;
  }

  .rate-form label {
    position: relative;
    color: var(--color-rating);
    cursor: pointer;
    font-size: 18px;
    font-family: var(--font-family-consolas);
    transition:
      var(--transition-primary) cubic-bezier(0, 0, 0, 1),
      outline 0;
  }

  /* Apply hover styles only for devices that support hover */
  @media (hover: hover) and (pointer: fine) {
    .rate-form label:not(.read-only):not(.checked):hover,
    .rate-form label:not(.read-only):not(.checked):hover ~ label:not(.checked) {
      color: var(--color-hover-rating);
      transition: var(--transition-primary) cubic-bezier(0, 0, 0, 1);
    }
  }

  .rate-form label.checked {
    color: #ffd24c;
  }

  .rate-form label:not(.read-only):active,
  .rate-form label:not(.read-only):hover:active,
  .rate-form label:not(.read-only):active ~ label:not(.checked):not(:hover),
  .rate-form label:not(.read-only):active ~ label {
    color: #ffbf00;
    transition: var(--transition-primary) cubic-bezier(0, 0, 0, 1);
  }

  .rate-form .read-only {
    cursor: default;
  }

  .rate-form .read-only.disabled {
    color: var(--color-disabled);
  }

  label:focus-within {
    border: initial;
    outline: 2px solid black;
  }

  @media screen and (max-width: 768px) {
    .rate-form label:not(.read-only) {
      margin: 0 var(--space-xs);
    }
  }
</style>
