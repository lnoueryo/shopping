<script setup lang="ts">
  import MainSearchBar from '@/components/molecules/MainSearchBar.vue';
  import Logo from '@/components/atoms/Logo.vue';
  import TriSectionLayout from '@/components/wrappers/TriSectionLayout.vue';
  import { ref, watch, computed, defineAsyncComponent } from 'vue';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { useSearchBooks } from '@/composables/search-books';
  import { useScroll } from '@/composables/scroll';
  import { useStore } from '@/stores';
  import { useBooksStore } from '@/stores/books';

  const Modal = defineAsyncComponent(
    () => import('@/components/wrappers/Modal.vue')
  );
  const store = useStore();
  const booksStore = useBooksStore();
  const route = useRoute();
  const searchBooks = useSearchBooks();
  const headerMiddleSwitch = ref({ right: true, center: true, left: true });
  const headerTopSwitch = ref({ right: false, center: false, left: false });
  const searchKeyword = ref(route.query.keyword || '');
  const isOpen = ref(false);
  const errorTitle = ref('Input Error');
  const errorMessage = computed(
    () =>
      `The input exceeds the maximum allowed character limit of 100. Please shorten your input.You have currently entered ${searchKeyword.value.length} characters.`
  );

  watch(
    () => store.width,
    newWidth => {
      store.isHeaderReady = true;
      if (newWidth < deviceSize.smallDesktop) {
        headerTopSwitch.value = { left: false, center: true, right: false };
        headerMiddleSwitch.value = { left: false, center: true, right: false };
        return;
      }
      headerTopSwitch.value = { left: false, center: false, right: false };
      headerMiddleSwitch.value = { left: true, center: true, right: true };
      isFixed.value = false;
    }
  );

  const searchBooksByKeyword = async () => {
    if (!searchKeyword.value && route.path !== '/books') return;
    if (searchKeyword.value.length > 100) return (isOpen.value = true);
    const query = await searchBooks.searchByKeyword(searchKeyword.value);
    if (route.path === '/books') {
      booksStore.isAccordionOpen = false;
      setTimeout(async () => {
        await store.scrollToTop();
        await booksStore.updateQuery(query);
      }, 100);
    }
  };

  const isFixed = ref(false);
  const moveSearchBar = () => {
    if (store.width > deviceSize.smallDesktop) return;
    isFixed.value = window.scrollY > store.heightContent;
  };
  useScroll(moveSearchBar);
</script>

<template>
  <div id="header" class="w100" v-if="store.isHeaderReady">
    <div class="header-top-container flex">
      <TriSectionLayout v-bind="headerTopSwitch" :width="store.width">
        <template #center>
          <div class="flex align-center logo-frame">
            <Logo class="margin-horizontal" />
          </div>
        </template>
      </TriSectionLayout>
    </div>
    <div class="header-middle-container">
      <div class="h100 float-header" :class="{ fixed: isFixed }">
        <TriSectionLayout v-bind="headerMiddleSwitch" :width="store.width">
          <template #left>
            <Logo class="margin-horizontal" />
          </template>
          <template #center>
            <div class="margin-horizontal w100 h100">
              <MainSearchBar
                v-model="searchKeyword"
                class="h100 w100"
                @onSearchClicked="searchBooksByKeyword"
                :width="store.width"
              />
            </div>
          </template>
        </TriSectionLayout>
      </div>
    </div>
    <Modal v-model="isOpen" :width="store.width">
      <template #title>
        <p class="error-title">{{ errorTitle }}</p>
      </template>
      <template #message>
        <p class="error-message">{{ errorMessage }}</p>
      </template>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
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
      background-color: var(--color-base-tertiary);
      top: 0;
      position: fixed;
      height: var(--height-content);
      width: 100%;
      z-index: 2;
    }
  }

  .error-title {
    color: var(--color-error);
  }

  .error-message {
    color: var(--color-comment-out);
  }

  .logo-frame {
    max-width: 220px;
  }
</style>
