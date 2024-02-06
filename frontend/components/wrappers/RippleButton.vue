<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import { selectRightColor } from '@/utils/style.ts';
  const props = defineProps({
    color: {
      type: String,
      default: 'var(--color-base-quaternary)',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    change: {
      type: Boolean,
      default: false,
    },
  });

  const isActive = ref(false);
  const rippleStyle = ref({});

  const applyRippleEffect = e => {
    if (props.disabled) return;
    if (e.type === 'mousedown') e.preventDefault();
    window.addEventListener('mouseup', clearRippleEffect);
    window.addEventListener('touchend', clearRippleEffect);
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const size = Math.max(target.offsetWidth, target.offsetHeight);

    const x = (e.clientX || e.touches[0].clientX) - rect.left - size / 2;
    const y = (e.clientY || e.touches[0].clientY) - rect.top - size / 2;

    rippleStyle.value['--color-ripple'] = props.change
      ? selectRightColor(props.color)
      : props.color;
    rippleStyle.value.width = rippleStyle.value.height = `${size}px`;
    rippleStyle.value.left = `${x}px`;
    rippleStyle.value.top = `${y}px`;

    isActive.value = true;
  };

  const clearRippleEffect = () => {
    window.removeEventListener('mouseup', clearRippleEffect);
    window.removeEventListener('touchend', clearRippleEffect);
    isActive.value = false;
  };

  const rippleStyleClass = computed(() => ({
    'ripple-effect': true,
    animate: isActive.value,
  }));

  onMounted(() => {
    rippleStyle.value = {
      '--color-ripple': props.change
        ? selectRightColor(props.color)
        : props.color,
      width: 0,
      height: 0,
      top: 0,
    };
  });
</script>

<template>
  <div
    :class="['ripple-wrapper', { 'overflow-hidden': isActive }]"
    @mousedown="applyRippleEffect"
    @touchstart.passive="applyRippleEffect"
  >
    <div class="h100">
      <slot></slot>
    </div>
    <span :class="rippleStyleClass" :style="rippleStyle"></span>
  </div>
</template>

<style lang="scss" scoped>
  .ripple-wrapper {
    background-color: var(--color-ripple);
    position: relative;
    .ripple-effect {
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      pointer-events: none;
      opacity: 0;
      transition:
        var(--transition-primary),
        transform 0s ease-out 0.3s;
    }
    .ripple-effect.animate {
      opacity: 1;
      transform: scale(4);
      transition: transform 0.3s ease-in;
      background: radial-gradient(
        var(--color-ripple) 50%,
        transparent 70%,
        rgb(0, 0, 0) 100%
      );
    }
  }
  .ripple-wrapper.overflow-hidden {
    overflow: hidden;
  }
</style>
