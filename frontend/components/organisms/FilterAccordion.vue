<script setup lang="ts">
  import SkillLevelChips from '@/components/molecules/SkillLevelChips.vue';
  import Rating from '@/components/molecules/Rating.vue';
  import GenreSelectors from '@/components/molecules/GenreSelectors.vue';
  import Accordion from '@/components/wrappers/Accordion.vue';
  import { useScroll } from '@/composables/scroll';
  import { useStore } from '@/stores';
  import { useBooksStore } from '@/stores/books';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { genreData } from '@/assets/js/genres.js';
  import { ref, watch, onMounted, onUnmounted } from 'vue';

  const store = useStore();
  const booksStore = useBooksStore();
  const route = useRoute();
  const router = useRouter();
  const mobileSwitch = ref(deviceSize.mobile > store.width);
  const skillLevelStyle = ref({});
  const labelStyle = ref({
    height: 'var(--height-content)',
    backgroundColor: 'var(--color-sub-white)',
    color: 'var(--color-sub-black)',
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
      mobileSwitch.value = deviceSize.mobile > newWidth;
      skillLevelStyle.value = mobileSwitch.value
        ? { fontSize: 10, width: 88 }
        : {};
      filterContentHeight.value.minHeight = mobileSwitch.value
        ? 'calc(var(--height-content) + var(--height-content) / 2)'
        : 'var(--height-content)';
    }
  );

  const isFixed = ref(true);
  const updateIsFixed = () =>
    (isFixed.value = window.scrollY > store.headerHeight - store.heightContent);
  useScroll(updateIsFixed);
  const lockPage = () => {
    const { body } = document;
    body.style.overflow = 'hidden';
  };
  const unLockPage = () => {
    const { body } = document;
    body.style.overflow = 'initial';
  };

  const isOpen = ref(false);
  const contentStyle = ref({ maxHeight: '0' });
  const openAccordion = () => {
    contentStyle.value.maxHeight = isFixed.value
      ? `calc(100vh - ${store.headerHeight}px)`
      : `calc(100vh - ${store.headerHeight}px - ${store.heightContent}px)`;
  };
  const closeAccordion = () => (contentStyle.value.maxHeight = '0');
  watch(isOpen, newIsOpen => {
    if (newIsOpen) {
      openAccordion();
      return lockPage();
    }
    closeAccordion();
    unLockPage();
  });

  onMounted(() => {
    isFixed.value = window.scrollY > store.headerHeight - store.heightContent;
    mobileSwitch.value = deviceSize.mobile > store.width;
    skillLevelStyle.value = mobileSwitch.value ? { size: 10, width: 88 } : {};
  });

  onUnmounted(() => unLockPage());

  watch([localRate, localSkillLevels, localGenre], () => {
    const query = { ...route.query };
    if (localRate.value) query['rate'] = localRate.value;
    else delete query['rate'];
    if (localSkillLevels.value) query['levels'] = localSkillLevels.value;
    if (localGenre.value) {
      query['genre'] = localGenre.value;
      delete query['keyword'];
    } else {
      delete query['genre'];
    }
    router.push({ path: '/books', query: query });
  });

  watch(isOpen, async newValue => {
    if (!newValue) await booksStore.updateQuery(route.query);
  });

  watch(
    () => booksStore.query.genre,
    newValue => {
      localGenre.value = newValue;
    }
  );
</script>

<template>
  <div class="card flex align-center relative">
    <Accordion
      v-model="isOpen"
      :labelStyle="labelStyle"
      :contentStyle="contentStyle"
    >
      <template #label>
        <div class="h100 title-bottom">
          <div class="flex justify-between align-center h100 margin-horizontal">
            <div class="flex align-center h100">Filter</div>
            <div class="arrow-box" :class="{ toggle: isOpen }">
              <div :class="{ open: isOpen, close: !isOpen }"
                ><span v-if="isOpen">×</span></div
              >
            </div>
          </div>
        </div>
      </template>
      <template #content>
        <div class="card flex justify-start wrap content-header title-bottom">
          <div class="flex align-center" :style="filterContentHeight">
            <div
              class="align-center title padding-horizontal"
              :class="{ flex: !mobileSwitch }"
            >
              <div>Review:&ensp;</div>
              <div class="flex align-center">
                <Rating v-model="localRate" :size="24" last-star-only />
                <div>&ensp;or Higher</div>
              </div>
            </div>
          </div>
          <div class="flex align-center" :style="filterContentHeight">
            <div
              class="align-center title padding-horizontal"
              :class="{ flex: !mobileSwitch }"
            >
              <div>Skill Level:&ensp;</div>
              <SkillLevelChips
                v-bind="skillLevelStyle"
                v-model="localSkillLevels"
              />
            </div>
          </div>
        </div>
        <div class="card title padding-horizontal">
          <GenreSelectors
            v-model="localGenre"
            v-bind="{ mobile: 50, tablet: 50 }"
            :genreData="genreData"
            :width="store.width"
            radio
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
    border-top: 2px solid var(--color-sub-black);
    border-right: 2px solid var(--color-sub-black);
    -webkit-transform: rotate(135deg);
    transform: rotateZ(135deg);
    transform-origin: center;
    position: relative;
    right: 2px;
    transition: all 0.5s;
  }

  .open {
    font-size: 100%; /*ボタンの大きさ*/
    font-weight: bold;
    color: var(--color-sub-black);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.5s;
  }

  .arrow-box {
    transform: rotateX(0);
    transition: all 0.5s;
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
    min-height: var(--height-content);
  }

  @media screen and (max-width: 768px) {
    .genre-selector {
      width: 50%;
    }
  }
</style>
