<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import SearchButton from '../atoms/SearchButton.vue';
  import { useViewport } from '@/composables/viewport';

  const wrapperRef = ref(null);
  const promptRef = ref(null);
  const promptWidth = ref(0);
  const searchButton = ref(null);
  const magnifyWidth = ref(0);
  const isInputSizeBelowLimit = ref(false);
  const user = ref('guest');
  const searchWord = ref('');
  const viewport = useViewport();
  const width = ref(viewport.width);

  watch(width, newWidth => {
    const { left: wrapperLeft } = wrapperRef.value.getBoundingClientRect();
    const { left: promptLeft, width: promptWidthValue } =
      promptRef.value.getBoundingClientRect();

    if (newWidth < 560) {
      const leftMargin = promptLeft - wrapperLeft;
      promptWidth.value = leftMargin;
      isInputSizeBelowLimit.value = true;
      return;
    }

    const bothSidesMargin = (promptLeft - wrapperLeft) * 2;
    promptWidth.value = promptWidthValue + bothSidesMargin;
    isInputSizeBelowLimit.value = false;
  });

  onMounted(() => {
    if (promptRef.value) {
      const { left: wrapperLeft } = wrapperRef.value.getBoundingClientRect();
      const { left: promptLeft, width: promptWidthValue } =
        promptRef.value.getBoundingClientRect();
      const bothSidesMargin = (promptLeft - wrapperLeft) * 2;
      promptWidth.value = promptWidthValue + bothSidesMargin;
    }

    if (searchButton.value) {
      const wrapperBound = wrapperRef.value.getBoundingClientRect();
      const magnifyBound =
        searchButton.value.children[0].getBoundingClientRect();
      const bothSidesMargin = (wrapperBound.right - magnifyBound.right) * 2;
      magnifyWidth.value = magnifyBound.width + bothSidesMargin;
    }
  });
</script>

<template>
  <div>
    <div class="input-wrapper letter" ref="wrapperRef">
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
        type="text"
        :style="{
          paddingLeft: promptWidth + 'px',
          paddingRight: magnifyWidth + 'px',
        }"
        autocomplete="off"
        v-model="searchWord"
        @keyup.enter="$emit('onSearchClicked', searchWord)"
      />
      <div class="search-button" ref="searchButton">
        <SearchButton @onSearchClicked="$emit('onSearchClicked', searchWord)" />
      </div>
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
    border: 2px solid #ddd;
    box-sizing: border-box;
    height: var(--height-content);
    width: 100%;
    padding: 0 16px;
    z-index: 0;
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
  }
</style>
