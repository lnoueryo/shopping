<script setup lang="ts">
  import { ref, watch, defineEmits, defineProps } from 'vue';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
    labelStyle: Object,
    contentStyle: Object,
  });

  const emit = defineEmits(['update:modelValue']);

  const isOpen = ref(props.modelValue);
  const labelStyle = ref(props.labelStyle);
  const contentStyle = ref(props.contentStyle);

  const uuid = ref(
    new Date().getTime().toString(16) +
      Math.floor(1000 * Math.random()).toString(16)
  );

  watch(isOpen, newValue => {
    emit('update:modelValue', newValue);
  });

  watch(
    () => props.modelValue,
    newValue => {
      isOpen.value = newValue;
      if (newValue) contentRef.value.scrollTop = 0;
    }
  );
  const contentRef = ref(null);
</script>

<template>
  <div class="w100">
    <input :id="uuid" type="checkbox" class="toggle" v-model="isOpen" />
    <label class="label" :for="uuid" :style="labelStyle">
      <slot name="label"></slot>
    </label>
    <div ref="contentRef" class="content" :style="contentStyle">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .toggle {
    display: none;
  }
  .label {
    display: block;
    color: #fff;
    background: #019ac6;
  }

  .label,
  .content {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: all 0.5s;
  }
  .content {
    max-height: 0;
    overflow-y: scroll;
  }
  .toggle:checked + .label + .content {
    transition: all 0.5s;
  }
  .toggle:checked + .label::before {
    transform: rotate(-45deg) !important;
  }
</style>
