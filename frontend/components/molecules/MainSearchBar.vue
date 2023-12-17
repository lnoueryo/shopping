<script setup lang="ts">
  import {
    ref,
    watch,
    watchEffect,
    onMounted,
    computed,
    defineProps,
    defineEmits,
  } from 'vue';
  import SearchButton from '@/components/atoms/SearchButton.vue';
  import { deviceSize } from '@/assets/js/device-size';
  const props = defineProps({
    modelValue: {
      type: String,
    },
    userName: String,
    width: {
      type: Number,
      default: 0,
    },
  });
  const emit = defineEmits(['update:modelValue', 'onSearchClicked']);
  const wrapperRef = ref(null);
  const promptRef = ref(null);
  const promptPadding = ref(0);
  const searchButton = ref(null);
  const magnifyPadding = ref(0);
  const isInputSizeBelowLimit = ref(false);
  const user = ref(props.userName || 'guest');
  const searchKeyword = ref(props.modelValue);
  const wrapperLeft = ref(0);
  const promptLeft = ref(0);
  const promptWidth = ref(0);
  const leftMargin = computed(() => promptLeft.value - wrapperLeft.value);
  const promptBothSidesMargin = computed(
    () => (promptLeft.value - wrapperLeft.value) * 2
  );
  const hidePrompt = () => {
    promptPadding.value = leftMargin.value;
    isInputSizeBelowLimit.value = true;
  };
  const showPrompt = () => {
    promptPadding.value = promptWidth.value + promptBothSidesMargin.value;
  };
  const updateRefSize = () => {
    const { left: wrapperLeftValue } = wrapperRef.value.getBoundingClientRect();
    const { left: promptLeftValue, width: promptWidthValue } =
      promptRef.value.getBoundingClientRect();
    if (promptLeftValue === 0) return;
    wrapperLeft.value = wrapperLeftValue;
    promptLeft.value = promptLeftValue;
    promptWidth.value = promptWidthValue;
  };

  const adjustPromptVisibility = width => {
    isInputSizeBelowLimit.value = false;
    updateRefSize();
    if (width < deviceSize.tablet) return hidePrompt();
    showPrompt();
  };

  const adjustMagnifyVisibility = () => {
    const wrapperBound = wrapperRef.value.getBoundingClientRect();
    const magnifyBound = searchButton.value.children[0].getBoundingClientRect();
    const bothSidesMargin = (wrapperBound.right - magnifyBound.right) * 2;
    magnifyPadding.value = magnifyBound.width + bothSidesMargin;
  };

  watch(
    () => props.width,
    newWidth => adjustPromptVisibility(newWidth)
  );
  watchEffect(() => (searchKeyword.value = props.modelValue));
  watch(searchKeyword, newSearchKeyword =>
    emit('update:modelValue', newSearchKeyword)
  );
  onMounted(() => {
    if (promptRef.value) adjustPromptVisibility(props.width);
    if (searchButton.value) adjustMagnifyVisibility();
  });
</script>

<template>
  <div class="input-wrapper monospace-font h100" ref="wrapperRef">
    <label
      for="main-search-bar"
      class="prompt"
      ref="promptRef"
      v-show="!isInputSizeBelowLimit"
      ><span style="color: var(--color-ubuntu-terminal)"
        >WBstore@{{ user }}</span
      ><span>:~ $ </span></label
    >
    <input
      id="main-search-bar"
      class="h100"
      type="text"
      :style="{
        paddingLeft: promptPadding + 'px',
        paddingRight: magnifyPadding + 'px',
      }"
      autocomplete="off"
      v-model="searchKeyword"
      @keyup.enter="$emit('onSearchClicked', searchKeyword)"
    />
    <div class="search-button w100 h100" ref="searchButton">
      <SearchButton
        :size="24"
        @onSearchClicked="$emit('onSearchClicked', searchKeyword)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .input-wrapper {
    position: relative;
  }

  #main-search-bar {
    position: relative;
    background: black;
    color: yellow;
    caret-color: white;
    border-radius: 3px;
    border: 2px solid var(--color-base-white);
    width: 100%;
    padding: 0 var(--margin-horizontal);
    z-index: 0;
    transition: var(--hover-transition);
  }

  #main-search-bar:focus-visible {
    border: 2px solid var(--color-class);
    outline: 1px solid var(--color-class);
    transition: var(--hover-transition);
  }

  .prompt {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%) translateX(0%);
    pointer-events: none;
    color: white;
    z-index: 1;
  }

  .search-button {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%) translateX(0%);
    color: white;
    padding: 6px 0;
    max-width: 68px;
  }
</style>
