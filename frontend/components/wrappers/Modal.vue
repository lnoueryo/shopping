<script setup lang="ts">
  import TriSectionLayout from '@/components/wrappers/TriSectionLayout.vue';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { ref, watch, watchEffect, onMounted, onUnmounted } from 'vue';
  const props = defineProps({
    modelValue: {
      type: Boolean,
    },
    width: {
      type: Number,
    },
  });
  const emit = defineEmits(['update:modelValue']);
  const isOpen = ref(props.modelValue);
  const modalLayoutSwitch = ref({ left: false, center: true, right: false });
  const lockPage = () => {
    const { body } = document;
    body.style.overflow = 'hidden';
  };
  const unLockPage = () => {
    const { body } = document;
    body.style.overflow = 'initial';
  };
  watch(isOpen, newIsOpen => {
    if (newIsOpen) return lockPage();
    unLockPage();
  });
  onUnmounted(() => unLockPage());
  watchEffect(() => (isOpen.value = props.modelValue));
  watch(isOpen, newValue => emit('update:modelValue', newValue));
  watch(
    () => props.width,
    newWidth => {
      if (newWidth < deviceSize.smallDesktop) {
        modalLayoutSwitch.value = { left: false, center: true, right: false };
        return;
      }
      modalLayoutSwitch.value = { left: true, center: true, right: true };
    }
  );
  onMounted(() => {
    if (props.width < deviceSize.smallDesktop) {
      modalLayoutSwitch.value = { left: false, center: true, right: false };
      return;
    }
    modalLayoutSwitch.value = { left: true, center: true, right: true };
  });
</script>

<template>
  <div>
    <div class="modal-wrap">
      <input id="trigger" v-model="isOpen" type="checkbox" />
      <div class="modal-overlay">
        <label for="trigger" class="modal-trigger"></label>
        <div class="w100">
          <TriSectionLayout v-bind="modalLayoutSwitch" :width="props.width">
            <template #center>
              <div class="modal-content w100">
                <div
                  class="vertical-center justify-between modal-title margin-horizontal"
                >
                  <slot name="title" />
                  <label for="trigger" class="close-button">✕</label>
                </div>
                <div class="modal-message padding-vertical margin-horizontal">
                  <slot name="message" />
                </div>
              </div>
            </template>
          </TriSectionLayout>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .modal-wrap input {
    display: none;
  }

  .modal-overlay {
    display: flex;
    justify-content: center;
    overflow: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    transition:
      opacity 0.5s,
      transform 0s 0.5s;
    transform: scale(0);
  }

  .modal-trigger {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .modal-content {
    background: var(--color-base-secondary);
    color: #cccccc;
    border: 1px solid var(--color-base-tertiary);
    box-shadow: 0 4px 24px 4px rgba(0, 0, 0, 0.3);
    align-self: center;
    line-height: 1.4em;
    transition: all 0.5s;
    transform: translate(0%, -50%);
    border-radius: 3px;
  }

  .close-button {
    font-size: 100%;
    font-weight: bold;
    cursor: pointer;
    transition: var(--transition-primary);
  }

  .close-button:hover {
    opacity: var(--opacity-hover);
    transition: var(--transition-primary);
  }

  .modal-wrap input:checked ~ .modal-overlay {
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.5s;
  }

  .modal-wrap input:checked ~ .modal-overlay .modal-content {
    transform: translate(0%, 0%);
  }

  .close-button:active {
    -webkit-transform: translateY(2px);
    transform: translateY(2px);
  }

  .modal-wrap input {
    display: none;
  }

  .close-button {
    color: var(--color-tag);
  }

  .modal-title {
    height: var(--height-content);
    border-bottom: solid 1px var(--color-base-tertiary);
  }
</style>
