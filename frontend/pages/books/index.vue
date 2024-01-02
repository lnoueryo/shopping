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
      if (sidebarSwitch.value)
        return booksStore.updateQuery(newQuery);
    }
  );
  const booksStore = useBooksStore();
  booksStore.updateStateQuery(route.query);
  booksStore.fetchBooksData();

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
      <div
        class="content-container relative"
        :class="{ loading: booksStore.isLoading }"
      >
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
  #main-content {
    display: grid;
    grid-template-rows: auto 1fr;

    .loading {
      margin-bottom: 0;
    }
  }

  #book-result {
    position: relative;
  }

  .spinner-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
