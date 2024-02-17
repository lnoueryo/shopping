<script setup lang="ts">
  import SkeltonScreen from '@/components/wrappers/SkeltonScreen.vue';
  import BookList from '@/components/organisms/BookList.vue';
  import GenreFloatingSideBar from '@/components/organisms/GenreFloatingSideBar.vue';
  import BookFilter from '@/components/organisms/BookFilter.vue';
  import FilterAccordion from '@/components/organisms/FilterAccordion.vue';
  import FloatFilter from '@/components/wrappers/FloatFilter.vue';
  import { useStore } from '@/stores';
  import { useBooksStore } from '@/stores/books';
  import { deviceSize } from '@/assets/js/device-size.js';
  import {
    ref,
    watch,
    onBeforeMount,
    onMounted,
    onBeforeUnmount,
    computed,
  } from 'vue';

  definePageMeta({
    middleware: ['books'],
  });

  const store = useStore();
  const route = useRoute();
  const sidebarSwitch = ref(true);
  const isClickedBrowerButton = ref(false);

  watch(
    () => store.width,
    newWidth => {
      sidebarSwitch.value = deviceSize.smallDesktop <= newWidth;
    },
    { immediate: true }
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

  onMounted(async () => {
    window.addEventListener('popstate', handleBrowserButton);
  });

  onBeforeMount(() => {
    booksStore.updateStateQuery(route.query);
    booksStore.fetchBooksData();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('popstate', handleBrowserButton);
    booksStore.resetBookList();
  });

  const handleBrowserButton = () => {
    isClickedBrowerButton.value = true;
  };

  const isMoreThanSmallDesktop = computed(
    () => deviceSize.smallDesktop <= store.width
  );
</script>

<template>
  <div id="books" class="flex w100">
    <Linear class="linear" :loading="booksStore.isLoading" :timeout="200" />
    <section id="float-filter">
      <template v-if="store.isReady && !isMoreThanSmallDesktop">
        <FloatFilter>
          <FilterAccordion />
        </FloatFilter>
      </template>
      <template v-else>
        <SkeltonScreen
          style="
            position: absolute;
            top: calc(var(--height-content) * -1);
            left: calc(var(--space-lg) * -1);
            width: calc(100% + 32px);
          "
          width="100%"
          height="calc(var(--height-content) * 1)"
        />
      </template>
    </section>
    <section id="sidebar">
      <div class="sidebar">
        <SkeltonScreen
          :condition="store.isReady && isMoreThanSmallDesktop"
          width="100%"
          height="calc(var(--height-content) * 9)"
        >
          <GenreFloatingSideBar class="sidebar" />
        </SkeltonScreen>
      </div>
    </section>
    <section id="main-content" class="w100 relative">
      <section>
        <div class="relative">
          <div class="bookfilter-container">
            <SkeltonScreen
              :condition="store.isReady"
              width="100%"
              height="calc(var(--height-content) * 1)"
            >
              <BookFilter class="card title-container card-shadow w100" />
            </SkeltonScreen>
          </div>
        </div>
      </section>
      <section id="book-result" class="content-container">
        <template v-if="store.isReady">
          <BookList id="book-list" />
        </template>
        <template v-else>
          <div v-for="i in 2" :key="i">
            <div
              class="content-container"
              style="margin-top: var(--height-content)"
            >
              <SkeltonScreen width="100%" height="var(--height-book)" />
            </div>
          </div>
        </template>
      </section>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .linear {
    position: absolute;
    width: 100vw;
    left: 50%;
    transform: translateX(-50%);
    top: -40px;
  }

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

  #float-filter {
    display: none;
  }

  #sidebar {
    display: block;
    min-width: 240px;
  }

  .sidebar {
    width: 200px;
  }

  .bookfilter-container {
    display: flex;
    align-items: center;
  }

  .content-container:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 1060px) {
    #float-filter {
      display: block;
    }
    #sidebar {
      display: none;
    }
    .bookfilter-container {
      display: none;
    }
    .linear {
      top: 0px;
    }
  }
</style>
