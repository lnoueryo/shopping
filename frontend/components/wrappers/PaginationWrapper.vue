<script setup lang="ts">
  import { computed } from 'vue'
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiChevronRight } from '@mdi/js';
  import { mdiChevronLeft } from '@mdi/js';
  import { useSearchBooks } from '@/composables/search-books';
  import PageInfo from '@/components/atoms/PageInfo.vue';
  import Pagination from '@/components/molecules/Pagination.vue';
  import { useStore } from '@/stores';
  const store = useStore();
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
  });

  const isBooks = computed(() => props.count !== 0);

</script>

<template>
  <div>
    <div class="page-info flex align-center padding-horizontal">
      <PageInfo v-bind="props" v-if="isBooks" />
    </div>
    <div class="list">
      <slot name="list" />
    </div>
    <template v-if="isBooks">
      <div>
        <Pagination v-bind="props" :width="store.width" @updatePage="$emit('updatePage', $event)" />
      </div>
      <div class="page-info center">
        <PageInfo v-bind="props" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .list {
    margin-bottom: var(--height-content);
  }

  .page-info {
    height: var(--height-content);
  }

  @media screen and (max-width: 1060px) {
    .page-info {
      padding: 0;
    }
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
    margin: 0 4px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .buttons-container button:not(:disabled):not(.active):hover {
    background-color: var(--color-bottom-bar-blue);
    color: var(--color-sub-white);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
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