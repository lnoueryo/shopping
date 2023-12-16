<script setup lang="ts">
  import MainSearchBar from '../molecules/MainSearchBar.vue';
  import NavigationBar from '../molecules/NavigationBar.vue';
  import Logo from '../atoms/Logo.vue';
  import TriSectionLayout from '../wrappers/TriSectionLayout.vue';
  import { ref, watch } from 'vue';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { useScroll } from '@/composables/scroll';
  import { useStore } from '@/stores';
  import { useBooksStore } from '@/stores/books';

  const store = useStore();
  const booksStore = useBooksStore();
  const router = useRouter();
  const route = useRoute();
  const headerMiddleSwitch = ref({ right: true, center: true, left: true });
  const headerTopSwitch = ref({ right: false, center: false, left: false });
  const searchKeyword = ref(route.query.keyword);

  watch(
    () => store.width,
    newWidth => {
      store.isHeaderReady = true;
      if (newWidth < deviceSize.smallDesktop) {
        headerTopSwitch.value = { left: true, center: false, right: false };
        headerMiddleSwitch.value = { left: false, center: true, right: false };
        return;
      }
      headerTopSwitch.value = { left: false, center: false, right: false };
      headerMiddleSwitch.value = { left: true, center: true, right: true };
    }
  );

  const searchBooks = word => {
    const query = { ...route.query, keyword: word };
    if (!word && route.path !== '/books') return;
    if (route.path === '/books') booksStore.fetchBooksData(query);
    router.push({ path: '/books', query: query });
  };

  const isFixed = ref(false);
  const moveSearchBar = () => {
    if (store.width > deviceSize.smallDesktop) return;
    isFixed.value = window.scrollY > store.heightContent;
  };
  useScroll(moveSearchBar);
</script>

<template>
  <header id="header" v-if="store.isHeaderReady">
    <div class="header-top-container flex">
      <TriSectionLayout v-bind="headerTopSwitch" :width="store.wwidth">
        <template #left>
          <Logo class="margin-horizontal" />
        </template>
      </TriSectionLayout>
    </div>
    <div class="header-middle-container">
      <div class="h100 float-header" :class="{ fixed: isFixed }">
        <TriSectionLayout v-bind="headerMiddleSwitch" :width="store.wwidth">
          <template #left>
            <Logo class="margin-horizontal" />
          </template>
          <template #center>
            <div class="margin-horizontal h100">
              <MainSearchBar
                v-model="searchKeyword"
                class="h100"
                @onSearchClicked="searchBooks"
                :width="store.width"
              />
            </div>
          </template>
        </TriSectionLayout>
      </div>
    </div>
    <div class="nav-container">
      <TriSectionLayout v-bind="headerMiddleSwitch" :width="store.wwidth">
        <template #center>
          <NavigationBar class="margin-horizontal" :navHeight="48" />
        </template>
      </TriSectionLayout>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  #header {
    background-color: var(--color-base-black);
    width: 100%;
  }

  .header-top-container {
    height: var(--height-content);
  }

  .header-middle-container {
    height: var(--height-content);
    .float-header {
      position: relative;
      height: 100%;
      width: initial;
    }
    .float-header.fixed {
      background-color: var(--color-base-black);
      top: 0;
      position: fixed;
      height: var(--height-content);
      width: 100%;
      z-index: 2;
    }
  }

  .nav-container {
    height: var(--height-content);
  }
</style>
