<script setup lang="ts">
  import Accordion from '@/components/wrappers/Accordion.vue';
  import { useSearchBooks } from '@/composables/search-books';
  import { useScroll } from '@/composables/scroll';
  import { useStore } from '@/stores';
  import { useBooksStore } from '@/stores/books';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { skillLevelsData } from '@/assets/js/skill-levels';
  import { genreData } from '@/assets/js/genres.js';
  import {
    ref,
    watch,
    onMounted,
    onUnmounted,
    defineAsyncComponent,
  } from 'vue';

  const Rating = defineAsyncComponent(
    () => import('@/components/molecules/Rating.vue')
  );
  const SkillLevelChips = defineAsyncComponent(
    () => import('@/components/molecules/SkillLevelChips.vue')
  );
  const GenreSelectors = defineAsyncComponent(
    () => import('@/components/molecules/GenreSelectors.vue')
  );

  const store = useStore();
  const booksStore = useBooksStore();
  const route = useRoute();
  const searchBooks = useSearchBooks();
  const tabletSwitch = ref(deviceSize.tablet > store.width);
  const isAccordionOpen = ref(false);
  const skillLevelStyle = ref({});
  const labelStyle = ref({
    height: 'var(--height-content)',
    backgroundColor: 'var(--color-base-primary)',
    color: 'var(--color-primary)',
    fontSize: '16px',
    fontWeight: 'bold',
  });
  const localRate = ref(Number(booksStore.query.rate));
  const localSkillLevels = ref(booksStore.query.levels);
  const localGenre = ref(booksStore.query.genre);
  const filterContentHeight = ref({
    minHeight: 'calc(var(--height-content) + var(--height-content) / 2)',
  });

  watch(
    () => store.width,
    newWidth => {
      tabletSwitch.value = deviceSize.mobile > newWidth;
      skillLevelStyle.value = tabletSwitch.value
        ? { fontSize: 10, width: 104 }
        : {};
      filterContentHeight.value.minHeight = tabletSwitch.value
        ? 'calc(var(--height-content) + var(--height-content) / 2)'
        : 'var(--height-content)';
    }
  );

  const isFixed = ref(true);
  const updateIsFixed = () =>
    (isFixed.value = window.scrollY > store.topLayoutHeight);
  useScroll(updateIsFixed);
  const lockPage = () => {
    const { documentElement } = document;
    documentElement.style.overflowY = 'hidden';
  };
  const unLockPage = () => {
    const { documentElement } = document;
    documentElement.style.overflowY = 'scroll';
  };

  const contentStyle = ref({ maxHeight: '0' });
  const openAccordion = () => {
    contentStyle.value.maxHeight = isFixed.value
      ? `calc(100vh - ${store.topLayoutHeight}px + ${store.heightContent}px)`
      : `calc(var(--vh, 1vh) * 100 - ${store.topLayoutHeight}px - ${store.heightContent}px)`;
  };
  const closeAccordion = () => (contentStyle.value.maxHeight = '0');
  watch(isAccordionOpen, async newValue => {
    if (newValue) {
      openAccordion();
      return lockPage();
    }
    closeAccordion();
    unLockPage();
    await booksStore.updateQuery(route.query);
  });

  onMounted(() => {
    isFixed.value = window.scrollY > store.topLayoutHeight;
    tabletSwitch.value = deviceSize.mobile > store.width;
    skillLevelStyle.value = tabletSwitch.value ? { size: 10, width: 104 } : {};
  });

  onUnmounted(() => unLockPage());

  watch([localRate, localSkillLevels, localGenre], () => {
    searchBooks.searchOnAccordion(
      localRate.value,
      localSkillLevels.value,
      localGenre.value
    );
  });

  watch(
    () => booksStore.query.genre,
    newValue => {
      localGenre.value = newValue;
    }
  );
</script>

<template>
  <div class="card vertical-center relative card-shadow">
    <Accordion
      v-model="isAccordionOpen"
      :labelStyle="labelStyle"
      :contentStyle="contentStyle"
      click-outside
    >
      <template #label>
        <div class="h100 title-bottom">
          <div class="vertical-center justify-between h100 margin-horizontal">
            <p class="vertical-center h100">Filter</p>
            <div class="arrow-box" :class="{ toggle: isAccordionOpen }">
              <div
                :class="{
                  open: isAccordionOpen,
                  close: !isAccordionOpen,
                }"
                ><span v-if="isAccordionOpen">✕</span></div
              >
            </div>
          </div>
        </div>
      </template>
      <template #content>
        <div class="card flex justify-start wrap content-header ripple-text">
          <div
            class="vertical-center content-padding-horizontal"
            :style="filterContentHeight"
          >
            <div
              class="align-center content-padding-horizontal"
              :class="{ flex: !tabletSwitch }"
            >
              <span>Review:&ensp;</span>
              <div class="vertical-center">
                <Rating v-model="localRate" :size="24" last-star-only />
                <span>&ensp;or Higher</span>
              </div>
            </div>
          </div>
          <div
            class="vertical-center content-padding-horizontal"
            :style="filterContentHeight"
          >
            <div
              class="align-center content-padding-horizontal"
              :class="{ flex: !tabletSwitch }"
            >
              <span>Skill Level:&ensp;</span>
              <SkillLevelChips
                v-model="localSkillLevels"
                :skillLevelsData="skillLevelsData"
              />
            </div>
          </div>
        </div>
        <div class="card content-padding-horizontal">
          <GenreSelectors
            v-model="localGenre"
            v-bind="{ mobile: 50, tablet: 50 }"
            :genreData="genreData"
            :width="store.width"
            radio
            panel-line
          />
        </div>
      </template>
    </Accordion>
  </div>
</template>

<style lang="scss" scoped>
  .close {
    /*タイトル横の矢印*/
    width: 8px;
    height: 8px;
    border-top: 2px solid var(--color-text-primary);
    border-right: 2px solid var(--color-text-primary);
    -webkit-transform: rotate(135deg);
    transform: rotateZ(135deg);
    transform-origin: center;
    position: relative;
    right: 2px;
    transition: transform 0.5s;
  }

  .open {
    font-size: 100%; /*ボタンの大きさ*/
    font-weight: bold;
    color: var(--color-text-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.5s;
  }

  .title-bottom {
    border-bottom: 1px solid var(--color-base-secondary);
  }

  .arrow-box {
    transform: rotateX(0);
    transition: transform 0.5s;
  }

  .arrow-box.toggle {
    transform: rotateX(180deg);
    transform-origin: center;
    transition: all 0.5s;
  }

  .genre-selector {
    width: 33%;
  }

  .content-header {
    font-weight: bold;
    min-height: var(--height-content);
  }

  @media screen and (max-width: 768px) {
    .genre-selector {
      width: 50%;
    }
  }

  label:focus-within {
    border: 2px solid black;
  }
</style>
