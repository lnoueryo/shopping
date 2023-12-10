<script setup lang="ts">
  import SkillLevelChips from '@/components/molecules/SkillLevelChips.vue';
  import Rating from '@/components/molecules/Rating.vue';
  import GenreSelectors from '@/components/molecules/GenreSelectors.vue';
  import Accordion from '@/components/wrappers/Accordion.vue';
  import { useViewport } from '@/composables/viewport';
  import { useDOMHeight } from '@/composables/dom-height';
  import { useScroll } from '@/composables/scroll';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { genreData } from '@/assets/js/genres.js';
  import { ref, watch, onMounted, onUnmounted } from 'vue';
  const props = defineProps({
    selectedRate: Number,
    selectedSkillLevels: Array,
    genreId: String,
  });
  const viewport = useViewport();
  const width = ref(viewport.width);
  const mobileSwitch = ref(true);
  const skillLevelStyle = ref({});
  const labelStyle = ref({
    height: 'var(--height-content)',
    backgroundColor: 'var(--color-sub-white)',
    color: 'var(--color-sub-black)',
    fontSize: '16px',
    fontWeight: 'bold',
  });
  const localSelectedSkillLevels = ref(props.selectedSkillLevels);
  const localRate = ref(props.selectedRate || 0);
  const localGenreId = ref(props.genreId);
  const filterContentHeight = ref({
    minHeight: 'calc(var(--height-content) + var(--height-content) / 2)',
  });
  watch(width, newWidth => {
    mobileSwitch.value = deviceSize.mobile > newWidth;
    skillLevelStyle.value = mobileSwitch.value
      ? { fontSize: 10, width: 88 }
      : {};
    filterContentHeight.value.minHeight = mobileSwitch.value
      ? 'calc(var(--height-content) + var(--height-content) / 2)'
      : 'var(--height-content)';
  });

  const domHeight = useDOMHeight();
  const { heightContent, headerHeight } = domHeight;

  const isFixed = ref(true);
  const updateIsFixed = () =>
    (isFixed.value = window.scrollY > headerHeight.value - heightContent.value);
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
      ? `calc(100vh - ${headerHeight.value}px)`
      : `calc(100vh - ${headerHeight.value}px - ${heightContent.value}px)`;
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
    isFixed.value = window.scrollY > headerHeight.value - heightContent.value;
    mobileSwitch.value = deviceSize.mobile > width.value;
    skillLevelStyle.value = mobileSwitch.value ? { size: 10, width: 88 } : {};
  });

  onUnmounted(() => unLockPage());
  const emit = defineEmits([
    'update:selectedRate',
    'update:selectedSkillLevels',
    'update:selectedGenre',
    'update:genreId',
  ]);
  watch(
    () => props.genreId,
    newGenreId => {
      localGenreId.value = newGenreId;
    }
  );
  watch(
    () => props.selectedRate,
    newRate => {
      localRate.value = Math.round(newRate);
    }
  );
  watch(
    () => props.selectedSkillLevels,
    newSelectedSkillLevels => {
      localSelectedSkillLevels.value = newSelectedSkillLevels;
    }
  );
  watch(localGenreId, newGenreId => {
    emit('update:genreId', newGenreId);
    emit('update:selectedGenre', newGenreId);
  });
  watch(localRate, newRate => {
    emit('update:selectedRate', newRate);
  });
  watch(localSelectedSkillLevels, newSelectedSkillLevels => {
    emit('update:selectedSkillLevels', newSelectedSkillLevels);
  });
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
                v-model="localSelectedSkillLevels"
              />
            </div>
          </div>
        </div>
        <div class="card title padding-horizontal">
          <GenreSelectors
            v-model="localGenreId"
            v-bind="{ mobile: 50, tablet: 50 }"
            :genreData="genreData"
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
