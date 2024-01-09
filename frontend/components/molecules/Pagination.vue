<script setup lang="ts">
  import { computed, ref, onMounted } from 'vue'
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiChevronRight } from '@mdi/js';
  import { mdiChevronLeft } from '@mdi/js';
  import { useSearchBooks } from '@/composables/search-books';
  import PageInfo from '@/components/atoms/PageInfo';
  import { deviceSize } from '@/assets/js/device-size.js';
  const props = defineProps({
    page: {
      type: Number,
      default: 1,
      required: true,
    },
    page_count: {
      type: Number,
      default: 1,
      required: true,
    },
    first: {
      type: Number,
      default: 1,
      required: true,
    },
    last: {
      type: Number,
      default: 1,
      required: true,
    },
    count: {
      type: Number,
      default: 1,
      required: true,
    },
    width: {
      type: Number,
      default: deviceSize.desktop
    },
  });
  const emit = defineEmits(['updatePage']);
  const MAX_DISPLAY_BUTTONS = 5;
  const EDGE_PAGE_BUTTONS = 4;
  const MIDDLE_PAGE_BUTTONS = 3;
  const searchBooks = useSearchBooks();
  const pageButtonsRef = ref(null);
  const updatePage = (nextPage) => emit('updatePage', nextPage);
  const totalPageButtons = computed(() => Array.from({length: props.page_count}, (_, i) => i + 1));
  const isUnderMaxDisplayButtons = computed(() => props.page_count <= MAX_DISPLAY_BUTTONS);
  const isMobile = computed(() => props.width < deviceSize.mobile);
  const isLeftEdge = computed(() => props.page < EDGE_PAGE_BUTTONS);
  const isRightEdge = computed(() => props.page_count - props.page < MIDDLE_PAGE_BUTTONS);
  const leftPage = computed(() => {
    const buttons = displayPageButtons();
    return buttons[0] - 2;
  });
  const rightPage = computed(() => {
    const buttons = displayPageButtons();
    return buttons[buttons.length - 1] + 2;
  });
  const displayPageButtons = () => {
    if (isUnderMaxDisplayButtons.value || isMobile.value) return totalPageButtons.value;
    else if (isLeftEdge.value) return totalPageButtons.value.slice(0, EDGE_PAGE_BUTTONS)
    else if (isRightEdge.value) return totalPageButtons.value.slice(props.page_count - EDGE_PAGE_BUTTONS, props.page_count)
    const buttonIndex = props.page - 1;
    return totalPageButtons.value.slice(buttonIndex - 1, buttonIndex + 2)
  }

  onMounted(() => {
    pageButtonsRef.value.scrollTo({
      left: props.page < MIDDLE_PAGE_BUTTONS ? 0 : 48 * (props.page - MIDDLE_PAGE_BUTTONS + 1),
      behavior: 'smooth'
    });
  })

</script>

<template>
  <div class="text-center w100">
    <div class="buttons-container center">
      <div class="flex">
        <button :class="{'adjust-bottom': isMobile}" @click="updatePage(props.page - 1)" :disabled="props.page === 1">
          <svg-icon type="mdi" :path="mdiChevronLeft"></svg-icon>
        </button>
        <div class="flex" v-if="!isMobile && !isLeftEdge">
          <button @click="updatePage(1)">1</button>
          <button @click="updatePage(leftPage)">...</button>
        </div>
        <div :class="[{'mobile': isMobile}, {'justify-center': isMobile && totalPageButtons.length < MIDDLE_PAGE_BUTTONS}, 'flex']" ref="pageButtonsRef">
          <div v-for="i in displayPageButtons()" :key="i">
            <button :class="{'active': props.page === i}" @click="updatePage(i)">{{i}}</button>
          </div>
        </div>
        <div class="flex" v-if="!isMobile && !isRightEdge">
          <button @click="updatePage(rightPage)">...</button>
          <button @click="updatePage(props.page_count)">{{ props.page_count }}</button>
        </div>
        <button :class="{'adjust-bottom': isMobile}" @click="updatePage(props.page + 1)" :disabled="props.page === props.page_count">
          <svg-icon type="mdi" :path="mdiChevronRight"></svg-icon>
        </button>
      </div>
    </div>
    <div class="page-info center">
      <PageInfo v-bind="props" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .page-info {
    height: var(--height-content);
  }

  .mobile {
    overflow: scroll;
    width: calc(var(--height-content) * 3);
    padding-bottom: 4px;
  }

  .adjust-bottom {
    margin-bottom: var(--space-sm);
  }

  .buttons-container {
    user-select: none;
    height: var(--height-content);
  }

  .buttons-container button {
    color: var(--color-bottom-bar-blue);
    border: solid 2px var(--color-bottom-bar-blue);
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.3s ease, box-shadow 0.2s ease;
    min-height: 40px;
    min-width: 40px;
    text-transform: uppercase;
    margin-left: var(--space-xs);
    margin-right: var(--space-xs);
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (hover: hover) and (pointer: fine) {
    .buttons-container button:not(:disabled):not(.active):hover {
      background-color: var(--color-bottom-bar-blue);
      color: var(--color-sub-white);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  }

  .buttons-container button:not(:disabled):not(.active):active {
    background-color: var(--color-bottom-bar-blue);
    color: var(--color-sub-white);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    opacity: var(--opacity-active);
    transition: var(--hover-transition);
  }

  .buttons-container button.active {
    background-color: var(--color-bottom-bar-blue);
    color: var(--color-sub-white);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .buttons-container button:disabled {
    background-color: var(--color-hover-white);
    color: var(--color-row-number);
    cursor: default;
    box-shadow: none;
    border: solid 2px var(--color-row-number);
  }

</style>