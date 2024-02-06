<script setup lang="ts">
  import { computed, ref, onMounted } from 'vue';
  import SvgIcon from '@jamescoyle/vue-icon';
  import SquareButton from '@/components/atoms/SquareButton.vue';
  import { mdiChevronRight } from '@mdi/js';
  import { mdiChevronLeft } from '@mdi/js';
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
      default: deviceSize.desktop,
    },
  });
  const emit = defineEmits(['updatePage']);
  const MAX_DISPLAY_BUTTONS = 5;
  const EDGE_PAGE_BUTTONS = 4;
  const MIDDLE_PAGE_BUTTONS = 3;
  const BUTTON_WIDTH = Number(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--height-content')
      .replace('px', '')
  );

  const pageButtonsRef = ref(null);
  const updatePage = nextPage =>
    nextPage !== props.page && emit('updatePage', nextPage);
  const totalPageButtons = computed(() =>
    Array.from({ length: props.page_count }, (_, i) => i + 1)
  );
  const isUnderMaxDisplayButtons = computed(
    () => props.page_count <= MAX_DISPLAY_BUTTONS
  );
  const isMobile = computed(() => props.width < deviceSize.mobile);
  const isNearStartPage = computed(() => props.page < EDGE_PAGE_BUTTONS);
  const isNearEndPage = computed(
    () => props.page_count - props.page < MIDDLE_PAGE_BUTTONS
  );
  const jumpToLeftPageNum = computed(() => displayPageButtons.value[0] - 2);
  const isShownLeftPageButton = computed(
    () =>
      !isMobile.value &&
      !isNearStartPage.value &&
      !isUnderMaxDisplayButtons.value
  );
  const jumpToRightPageNum = computed(
    () => displayPageButtons.value[displayPageButtons.value.length - 1] + 2
  );
  const isShownRightPageButton = computed(
    () =>
      !isMobile.value && !isNearEndPage.value && !isUnderMaxDisplayButtons.value
  );
  const displayPageButtons = computed(() => {
    if (isUnderMaxDisplayButtons.value || isMobile.value)
      return totalPageButtons.value;
    else if (isNearStartPage.value)
      return totalPageButtons.value.slice(0, EDGE_PAGE_BUTTONS);
    else if (isNearEndPage.value)
      return totalPageButtons.value.slice(
        props.page_count - EDGE_PAGE_BUTTONS,
        props.page_count
      );
    const buttonIndex = props.page - 1;
    return totalPageButtons.value.slice(buttonIndex - 1, buttonIndex + 2);
  });
  const moveActivePageButtonToCenter = () => {
    if (pageButtonsRef.value) {
      pageButtonsRef.value.scrollTo({
        left:
          props.page < MIDDLE_PAGE_BUTTONS
            ? 0
            : (BUTTON_WIDTH + 4) * (props.page - MIDDLE_PAGE_BUTTONS + 1) +
              4 * (props.page - MIDDLE_PAGE_BUTTONS + 1),
        behavior: 'smooth',
      });
    }
  };

  onMounted(() => {
    moveActivePageButtonToCenter();
  });
</script>

<template>
  <nav>
    <ul class="buttons-container center w100">
      <li id="left-page-button">
        <SquareButton
          :class="{ 'adjust-bottom': isMobile }"
          @click.native="updatePage(props.page - 1)"
          :disabled="props.page === 1"
        >
          <SvgIcon type="mdi" :path="mdiChevronLeft" title="previous page" />
        </SquareButton>
      </li>
      <li v-if="isShownLeftPageButton">
        <ul class="flex">
          <li>
            <SquareButton
              id="jump-left-button"
              @click.native="updatePage(1)"
              :aria-label="`jump to first page`"
              >1</SquareButton
            >
          </li>
          <li>
            <SquareButton
              @click.native="updatePage(jumpToLeftPageNum)"
              :aria-label="`jump to left page`"
              >...</SquareButton
            >
          </li>
        </ul>
      </li>
      <li>
        <ul
          id="page-buttons"
          :class="[
            { mobile: isMobile },
            {
              'justify-center':
                isMobile && totalPageButtons.length < MIDDLE_PAGE_BUTTONS,
            },
            'flex',
          ]"
          ref="pageButtonsRef"
        >
          <li v-for="i in displayPageButtons" :key="i">
            <SquareButton
              :id="`button-${i}`"
              :class="{ active: props.page === i }"
              :aria-current="props.page === i && 'page'"
              @click.native="updatePage(i)"
              :aria-label="`go to ${i} page`"
              >{{ i }}</SquareButton
            >
          </li>
        </ul>
      </li>
      <li v-if="isShownRightPageButton">
        <ul class="flex">
          <li>
            <SquareButton
              @click.native="updatePage(jumpToRightPageNum)"
              :aria-label="`jump to right page`"
              >...</SquareButton
            >
          </li>
          <li>
            <SquareButton
              id="jump-right-button"
              @click.native="updatePage(props.page_count)"
              :aria-label="`jump to last page`"
              >{{ props.page_count }}</SquareButton
            >
          </li>
        </ul>
      </li>
      <li id="right-page-button">
        <SquareButton
          :class="{ 'adjust-bottom': isMobile }"
          @click.native="updatePage(props.page + 1)"
          :disabled="props.page === props.page_count"
        >
          <SvgIcon type="mdi" :path="mdiChevronRight" title="next page" />
        </SquareButton>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  nav ul li ul li {
    min-width: 40px;
    margin-left: var(--space-xs);
    margin-right: var(--space-xs);
  }
  nav ul li#right-page-button,
  nav ul li#left-page-button {
    margin-left: var(--space-xs);
    margin-right: var(--space-xs);
  }
  .mobile {
    overflow: scroll;
    width: calc(var(--height-content) * 3.6);
    padding-bottom: 4px;
  }

  .adjust-bottom {
    margin-bottom: var(--space-xs);
  }

  .buttons-container {
    user-select: none;
    height: var(--height-content);
  }
</style>
