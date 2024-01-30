<script setup lang="ts">
  import Spinner from '@/components/atoms/Spinner.vue';
  import BookList from '@/components/organisms/BookList.vue';
  import { useStore } from '@/stores';
  import { useBooksStore } from '@/stores/books';
  import { deviceSize } from '@/assets/js/device-size.js';
  import {
    ref,
    watch,
    onMounted,
    onBeforeUnmount,
    defineAsyncComponent,
  } from 'vue';

  const GenreFloatingSideBar = defineAsyncComponent(
    () => import('@/components/organisms/GenreFloatingSideBar.vue')
  );
  const BookFilter = defineAsyncComponent(
    () => import('@/components/organisms/BookFilter.vue')
  );
  const FilterAccordion = defineAsyncComponent(
    () => import('@/components/organisms/FilterAccordion.vue')
  );
  const FloatFilter = defineAsyncComponent(
    () => import('@/components/wrappers/FloatFilter.vue')
  );

  definePageMeta({
    middleware: ['books'],
  });
  const store = useStore();
  const route = useRoute();
  const sidebarSwitch = ref(false);
  const isClickedBrowerButton = ref(false);

  watch(
    () => store.width,
    newWidth => {
      sidebarSwitch.value = deviceSize.smallDesktop <= newWidth;
    }
  );
  watch(
    () => route.query,
    async newQuery => {
      if (sidebarSwitch.value) return booksStore.updateQuery(newQuery);
      else if (isClickedBrowerButton.value)
        return booksStore.updateQuery(newQuery);
      isClickedBrowerButton.value = false;
    }
  );
  const booksStore = useBooksStore();
  booksStore.updateStateQuery(route.query);
  booksStore.fetchBooksData();

  onMounted(async () => {
    sidebarSwitch.value = deviceSize.smallDesktop <= store.width;
    window.addEventListener('popstate', handleBrowserButton);
  });
  onBeforeUnmount(() =>
    window.removeEventListener('popstate', handleBrowserButton)
  );

  const handleBrowserButton = () => {
    isClickedBrowerButton.value = true;
  };
</script>

<template>
  <div class="flex w100">
    <section>
      <FloatFilter v-if="!sidebarSwitch">
        <FilterAccordion />
      </FloatFilter>
    </section>
    <section id="sidebar" class="sidebar-container" v-if="sidebarSwitch">
      <GenreFloatingSideBar class="sidebar" />
    </section>
    <section id="main-content" class="w100 relative">
      <section
        class="relative card-shadow"
        :class="{ loading: booksStore.isLoading }"
      >
        <div
          class="card title-container flex align-center"
          v-if="sidebarSwitch"
        >
          <BookFilter />
        </div>
      </section>
      <ClientOnly>
        <section id="book-result" class="content-container">
          <template v-if="booksStore.isLoading">
            <div class="spinner-container">
              <Spinner />
            </div>
          </template>
          <template v-else>
            <BookList />
          </template>
        </section>
      </ClientOnly>
    </section>
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
