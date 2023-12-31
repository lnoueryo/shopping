// - 絞り込み条件に変更がない場合書籍一覧を取得する通信は行われない
// E2Eで行うテストの設計（スタイル、組み合わせテスト）
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import FilterAccordion from '/components/organisms/FilterAccordion.vue';
import { createTestingPinia } from '@pinia/testing';
import { genreData } from '/assets/js/genres';
import { useStore } from '@/stores';
import { useBooksStore } from '@/stores/books';

describe('FilterAccordion', () => {
  const createPinia = state => {
    return createTestingPinia({
      initialState: {
        index: {
          headerHeight: 48 * 3,
          heightContent: 48,
        },
        books: state,
      },
    });
  };
  const createRouterInstance = () => {
    return createRouter({
      history: createWebHistory(),
      routes: [],
    });
  };
  describe('Display FilterAccordion', () => {
    it('Render Correctly', async () => {
      const state = {
        booksData: [],
        query: {
          rate: 0,
          levels: [],
          genre: '',
        },
      };
      const wrapper = mount(FilterAccordion, {
        global: {
          plugins: [createRouterInstance(), createPinia(state)],
        },
      });
      expect(wrapper.vm.isOpen).toBeFalsy();
      const rating = wrapper.findComponent({ name: 'Rating' });
      expect(rating.vm.rate).toBe(state.query.rate);
      const skillLevelChips = wrapper.findComponent({
        name: 'SkillLevelChips',
      });
      expect(skillLevelChips.vm.selectedSkillLevels).toStrictEqual(
        state.query.levels
      );
      const genreSelectors = wrapper.findComponent({ name: 'GenreSelectors' });
      expect(genreSelectors.vm.localGenreId).toBe(state.query.genre);
    });
    it('Render with rate, levels and genre correctly', async () => {
      const state = {
        query: {
          rate: 3,
          levels: ['advanced'],
          genre: genreData[0].id,
        },
      };
      const wrapper = mount(FilterAccordion, {
        global: {
          plugins: [createRouterInstance(), createPinia(state)],
        },
      });
      expect(wrapper.vm.isOpen).toBeFalsy();
      const rating = wrapper.findComponent({ name: 'Rating' });
      expect(rating.vm.rate).toBe(state.query.rate);
      const skillLevelChips = wrapper.findComponent({
        name: 'SkillLevelChips',
      });
      expect(skillLevelChips.vm.selectedSkillLevels).toStrictEqual(
        state.query.levels
      );
      const genreSelectors = wrapper.findComponent({ name: 'GenreSelectors' });
      expect(genreSelectors.vm.localGenreId).toBe(state.query.genre);
    });
  });
  describe('Behavior', () => {
    let originalScrollY;

    beforeEach(() => {
      // 元の scrollY の値を保存
      originalScrollY = window.scrollY;
      // window.scrollY のモックを設定
      Object.defineProperty(window, 'scrollY', {
        value: 100,
        configurable: true,
      });
    });

    afterEach(() => {
      // モックをクリーンアップして元に戻す
      Object.defineProperty(window, 'scrollY', {
        value: originalScrollY,
        configurable: true,
      });
    });

    it('Verify Open and Close Accordion', async () => {
      const state = {
        query: {
          rate: 3,
          levels: ['advanced'],
          genre: genreData[0].id,
        },
      };
      const router = createRouterInstance();
      const store = useStore();
      const wrapper = mount(FilterAccordion, {
        global: {
          plugins: [router, createPinia(state)],
        },
      });
      expect(wrapper.vm.isOpen).toBeFalsy();
      expect(document.body.style.overflow).not.toBe('hidden');
      expect(wrapper.vm.contentStyle.maxHeight).toBe(`0`);

      const accordion = wrapper.findComponent({ name: 'Accordion' });
      const accordionSwitch = accordion.find('input');
      accordionSwitch.setChecked(true);
      await flushPromises();
      expect(wrapper.vm.isOpen).toBeTruthy();
      expect(document.body.style.overflow).toBe('hidden');
      expect(wrapper.vm.isFixed).toBeTruthy();
      expect(wrapper.vm.contentStyle.maxHeight).toBe(
        `calc(100vh - ${store.headerHeight}px)`
      );

      accordionSwitch.setChecked(false);
      wrapper.vm.updateIsFixed();
      await flushPromises();
      expect(wrapper.vm.isOpen).toBeFalsy();
      expect(document.body.style.overflow).not.toBe('hidden');
      expect(wrapper.vm.isFixed).toBeTruthy();
      expect(wrapper.vm.contentStyle.maxHeight).toBe(`0`);

      Object.defineProperty(window, 'scrollY', {
        value: 0,
        configurable: true,
      });
      wrapper.vm.updateIsFixed();
      accordionSwitch.setChecked(true);
      await flushPromises();
      expect(wrapper.vm.isOpen).toBeTruthy();
      expect(document.body.style.overflow).toBe('hidden');
      expect(wrapper.vm.isFixed).toBeFalsy();
      expect(wrapper.vm.contentStyle.maxHeight).toBe(
        `calc(100vh - ${store.headerHeight}px - ${store.heightContent}px)`
      );
    });

    it('Verify update query', async () => {
      const state = {
        query: {
          rate: 3,
          levels: ['advanced'],
          genre: genreData[0].id,
        },
      };
      const router = createRouterInstance();
      const wrapper = mount(FilterAccordion, {
        global: {
          plugins: [router, createPinia(state)],
        },
      });
      expect(wrapper.vm.isOpen).toBeFalsy();
      const accordion = wrapper.findComponent({ name: 'Accordion' });
      const accordionSwitch = accordion.find('input');
      accordionSwitch.setChecked(true);
      await flushPromises();
      expect(wrapper.vm.isOpen).toBeTruthy();

      const ratingComponent = wrapper.findComponent({ name: 'Rating' });
      const ratings = ratingComponent.findAll('input');
      await ratings[3].trigger('click');
      await flushPromises();
      expect(wrapper.vm.localRate).toBe(5 - 3);

      const skillLevelChipsComponent = wrapper.findComponent({
        name: 'SkillLevelChips',
      });
      const skillLevelChips = skillLevelChipsComponent.findAll('input');
      await skillLevelChips[0].setChecked(true);
      await nextTick();
      await flushPromises();
      expect(wrapper.vm.localSkillLevels).toStrictEqual([
        ...state.query.levels,
        skillLevelChips[0].element.value,
      ]);

      const genreSelectorsComponent = wrapper.findComponent({
        name: 'GenreSelectors',
      });
      const genreSelectors = genreSelectorsComponent.findAll('nuxtlink');
      await genreSelectors[1].trigger('click');
      await nextTick();
      await flushPromises();
      expect(wrapper.vm.localGenre).toBe(genreData[1].id);

      const booksStore = useBooksStore();
      expect(booksStore.updateQuery).toHaveBeenCalledTimes(0);

      accordionSwitch.setChecked(false);
      await flushPromises();
      expect(wrapper.vm.isOpen).toBeFalsy();
      expect(booksStore.updateQuery).toHaveBeenCalledTimes(1);
    });
  });
});
