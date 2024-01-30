<script setup lang="ts">
  import { computed } from 'vue';
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
    <div class="page-info flex align-center">
      <PageInfo v-bind="props" v-if="isBooks" />
    </div>
    <div class="list">
      <slot name="list" />
    </div>
    <template v-if="isBooks">
      <div>
        <Pagination
          v-bind="props"
          :width="store.width"
          @updatePage="$emit('updatePage', $event)"
        />
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
    padding: 0 16px;
  }

  @media screen and (max-width: 1060px) {
    .page-info {
      padding: 0;
    }
  }
</style>
