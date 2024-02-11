<script setup lang="ts">
  import { ref, watch, defineEmits, defineProps, onUnmounted } from 'vue';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
    labelStyle: Object,
    contentStyle: Object,
    clickOutside: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const isOpen = ref(props.modelValue);

  const uuid = ref(
    new Date().getTime().toString(16) +
      Math.floor(1000 * Math.random()).toString(16)
  );

  watch(isOpen, newValue => {
    emit('update:modelValue', newValue);
    if (newValue && props.clickOutside) {
      document.addEventListener('click', closeAccordion);
    }
  });

  watch(
    () => props.modelValue,
    newValue => {
      isOpen.value = newValue;
      if (newValue) contentRef.value.scrollTop = 0;
    }
  );
  const contentRef = ref(null);
  const uniqueId = `ac-${Math.random().toString(36).substr(2, 9)}`;
  const closeAccordion = event => {
    if (!event.target.closest(`#${uniqueId}`)) isOpen.value = false;
    document.removeEventListener('click', closeAccordion);
  };

  onUnmounted(() => {
    if (props.clickOutside) {
      document.removeEventListener('click', closeAccordion);
    }
  });
</script>

<template>
  <div :id="uniqueId" class="w100">
    <label
      class="label"
      :for="uuid"
      :style="props.labelStyle"
      @keyup.enter="isOpen = !isOpen"
      @click="$event.target.blur()"
    >
      <input
        :id="uuid"
        type="checkbox"
        class="visually-hidden"
        v-model="isOpen"
      />
      <slot name="label"></slot>
    </label>
    <div ref="contentRef" class="content" :style="props.contentStyle">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .label {
    display: block;
    color: #fff;
    cursor: pointer;
    transition: var(--transition-primary);
  }

  .label,
  .content {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: var(--transition-primary);
  }
  .content {
    max-height: 0;
    overflow-y: scroll;
  }
  .toggle:checked + .label + .content {
    transition: var(--transition-primary);
    box-shadow: 0px 10px 10px -6px rgba(0, 0, 0, 0.3);
  }
  .toggle:checked + .label::before {
    transform: rotate(-45deg) !important;
  }

  @media (hover: hover) and (pointer: fine) {
    .label:hover {
      opacity: var(--opacity-hover);
      transition: var(--transition-primary);
    }
  }
  label:focus-within {
    border: 2px solid #000;
    background: #000;
  }
</style>
