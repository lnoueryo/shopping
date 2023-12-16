<script setup lang="ts">
  import Spinner from '@/components/atoms/Spinner.vue';
  import GenreFloatingSideBar from '@/components/organisms/GenreFloatingSideBar.vue';
  import BookFilter from '@/components/organisms/BookFilter.vue';
  import FilterAccordion from '@/components/organisms/FilterAccordion.vue';
  import BookList from '@/components/organisms/BookList.vue';
  import FloatFilter from '@/components/wrappers/FloatFilter.vue';
  import ErrorBookResult from '@/components/organisms/ErrorBookResult.vue';
  import { useStore } from '@/stores';
  import { useBooksStore } from '@/stores/books';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { ref, watch, onMounted } from 'vue';

  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const sidebarSwitch = ref(false);
  const isOpen = ref(false);
  const selectedSkillLevels = ref(
    !route.query.levels
      ? []
      : Array.isArray(route.query.levels)
        ? route.query.levels
        : [route.query.levels]
  );
  const selectedGenre = ref(route.query.genre);
  const selectedRate = ref(Number(route.query.rate) || 0);
  watch(
    () => store.width,
    newWidth => {
      sidebarSwitch.value = deviceSize.smallDesktop <= newWidth;
    }
  );
  watch(isOpen, async newValue => {
    newValue || booksStore.fetchBooksData(route.query);
  });
  watch([selectedRate, selectedSkillLevels, selectedGenre], () => {
    const query = {
      ...route.query,
      rate: selectedRate.value,
      genre: selectedGenre.value,
      levels: selectedSkillLevels.value,
    };
    router.push({ path: '/books', query: query });
  });

  const selectGenre = async newGenre => {
    selectedGenre.value = newGenre;
  };

  const booksStore = useBooksStore();
  booksStore.fetchBooksData(route.query);

  watch(
    () => route.query,
    async newQuery => {
      if (sidebarSwitch.value) booksStore.fetchBooksData(newQuery);
    }
  );
  onMounted(async () => {
    sidebarSwitch.value = deviceSize.smallDesktop <= store.width.value;
  });
</script>

<template>
  <div class="flex w100">
    <FloatFilter v-if="!sidebarSwitch">
      <FilterAccordion
        :genreId="selectedGenre"
        :selectedRate="selectedRate"
        :selectedSkillLevels="selectedSkillLevels"
        @update:selectedRate="selectedRate = $event"
        @update:selectedSkillLevels="selectedSkillLevels = $event"
        @update:selectedGenre="selectGenre"
        @update:isOpen="isOpen = $event"
      />
    </FloatFilter>
    <div class="sidebar-container" v-if="sidebarSwitch">
      <GenreFloatingSideBar
        class="sidebar"
        :genreId="selectedGenre"
        @update:selectedGenre="selectGenre"
      />
    </div>
    <div class="w100 relative">
      <div class="content-container relative">
        <div
          class="card title-container flex align-center"
          v-if="sidebarSwitch"
        >
          <BookFilter
            :selectedRate="selectedRate"
            :selectedSkillLevels="selectedSkillLevels"
            @update:selectedRate="selectedRate = $event"
            @update:selectedSkillLevels="selectedSkillLevels = $event"
          />
        </div>
      </div>
      <ClientOnly>
        <template v-if="booksStore.isLoading">
          <div class="spinner-container">
            <Spinner />
          </div>
        </template>
        <template v-else>
          <template v-if="booksStore.booksData.length != 0">
            <div
              class="content-container"
              v-for="book in booksStore.booksData"
              :key="book.id"
            >
              <div class="card">
                <BookList v-bind="book" :key="book.id" />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="content-container">
              <div class="card">
                <ErrorBookResult
                  v-model="booksStore.errorType"
                  v-bind="route.query"
                />
              </div>
            </div>
          </template>
        </template>
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
