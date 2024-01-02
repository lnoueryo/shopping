<script setup lang="ts">
  import Modal from '@/components/atoms/Modal.vue';
  import MainSearchBar from '@/components/molecules/MainSearchBar.vue';
  import NavigationBar from '@/components/molecules/NavigationBar.vue';
  import Logo from '@/components/atoms/Logo.vue';
  import TriSectionLayout from '@/components/wrappers/TriSectionLayout.vue';
  import { ref, watch, computed } from 'vue';
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

  const searchBooks = async() => {
    const query = { ...route.query, keyword: searchKeyword.value };
    if (!searchKeyword.value && route.path !== '/books') return;
    if (searchKeyword.value.length > 100) return (isOpen.value = true);
    delete query['genre'];
    await setTimeout(async() => {

      if (route.path === '/books') await booksStore.updateQuery(query);
      router.push({ path: '/books', query });
    }, 1500)
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
          <div class="flex align-center">
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
                @onSearchClicked="searchBooks"
                :width="store.width"
              />
            </div>
          </template>
        </TriSectionLayout>
      </div>
    </div>
    <div class="nav-container">
      <TriSectionLayout v-bind="headerMiddleSwitch" :width="store.width">
        <template #center>
          <NavigationBar class="margin-horizontal" :navHeight="48" />
        </template>
      </TriSectionLayout>
    </div>
    <Modal v-model="isOpen" :width="store.width">
      <template #title>
        <h4 class="error-title">{{ errorTitle }}</h4>
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

  .error-title {
    font-size: 24px;
    color: var(--color-error);
  }

  .error-message {
    color: var(--color-comment-out);
  }
</style>
