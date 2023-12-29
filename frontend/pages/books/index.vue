<script setup lang="ts">
  import Spinner from '@/components/atoms/Spinner.vue';
  import GenreFloatingSideBar from '@/components/organisms/GenreFloatingSideBar.vue';
  import BookFilter from '@/components/organisms/BookFilter.vue';
  import FilterAccordion from '@/components/organisms/FilterAccordion.vue';
  import BookList from '@/components/organisms/BookList.vue';
  import FloatFilter from '@/components/wrappers/FloatFilter.vue';
  import { useStore } from '@/stores';
  import { useBooksStore } from '@/stores/books';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { ref, watch, onMounted } from 'vue';

  definePageMeta({
    middleware: ['books'],
  });
  const store = useStore();
  const route = useRoute();
  const sidebarSwitch = ref(false);
  watch(
    () => store.width,
    newWidth => {
      sidebarSwitch.value = deviceSize.smallDesktop <= newWidth;
    }
  );
  watch(
    () => route.query,
    async newQuery => {
      if (sidebarSwitch.value || 'keyword' in newQuery)
        return booksStore.updateQuery(newQuery);
    }
  );
  const booksStore = useBooksStore();
  booksStore.updateQuery(route.query);

  onMounted(async () => {
    sidebarSwitch.value = deviceSize.smallDesktop <= store.width;
  });
</script>

<template>
  <div class="flex w100">
    <FloatFilter v-if="!sidebarSwitch">
      <FilterAccordion />
    </FloatFilter>
    <div id="sidebar" class="sidebar-container" v-if="sidebarSwitch">
      <GenreFloatingSideBar class="sidebar" />
    </div>
    <div id="main-content" class="w100 relative">
      <div class="content-container relative">
        <div
          class="card title-container flex align-center"
          v-if="sidebarSwitch"
        >
          <BookFilter />
        </div>
      </div>
      <ClientOnly>
        <div id="book-result">
          <template v-if="booksStore.isLoading">
            <div class="spinner-container">
              <Spinner />
            </div>
          </template>
          <template v-else>
            <BookList />
          </template>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .spinner-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sidebar-container {
    min-width: 240px;
  }

  .sidebar {
    width: 200px;
  }

  .content-container:last-child {
    margin-bottom: 0;
  }
</style>
