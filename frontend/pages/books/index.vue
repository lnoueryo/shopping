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
  import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

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
  booksStore.updateStateQuery(route.query);
  booksStore.fetchBooksData();

  onMounted(async () => {
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
  <div id="books" class="flex w100">
    <section id="float-filter">
      <template v-if="store.isReady">
        <FloatFilter>
          <FilterAccordion />
        </FloatFilter>
      </template>
      <template v-else>
        <SkeltonScreen
          style="
            position: absolute;
            top: calc(var(--height-content) * -1);
            left: calc(var(--margin-horizontal) * -1);
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
          :condition="store.isReady"
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
          <template v-if="booksStore.isLoading">
            <div class="spinner-container">
              <Spinner />
            </div>
          </template>
          <template v-else>
            <BookList />
          </template>
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
  }
</style>
