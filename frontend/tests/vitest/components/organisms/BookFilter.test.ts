import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import BookFilter from '/components/organisms/BookFilter.vue';
import { createTestingPinia } from '@pinia/testing';
import { skillLevelsData } from '@/assets/js/skill-levels';

describe('BookFilter', () => {
  const createPinia = state => {
    return createTestingPinia({
      initialState: {
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
  describe('Display BookFilter', () => {
    it('Render Correctly', async () => {
      const state = {};
      const wrapper = mount(BookFilter, {
        global: {
          plugins: [createRouterInstance(), createPinia(state)],
        },
      });
      const ratingComponent = wrapper.findComponent({ name: 'Rating' });
      expect(ratingComponent.exists()).toBeTruthy();
      const skillLevelChipsComponent = wrapper.findComponent({
        name: 'SkillLevelChips',
      });
      expect(skillLevelChipsComponent.exists()).toBeTruthy();
      const ratings = ratingComponent.findAll('input');
      expect(ratings.length).toBe(5);
      const skillLevelChips = skillLevelChipsComponent.findAll('input');
      expect(skillLevelChips.length).toBe(skillLevelsData.length);
    });
    it('Render with rating and skill levels Correctly', async () => {
      const rate = 3;
      const levels = ['beginner'];
      const state = { query: { rate, levels } };
      const router = createRouterInstance();
      const wrapper = mount(BookFilter, {
        global: {
          plugins: [router, createPinia(state)],
        },
      });
      expect(wrapper.vm.localRate).toBe(rate);
      expect(wrapper.vm.localSkillLevels).toStrictEqual(levels);
    });
  });

  describe('Search Book by Genre', () => {
    const calcurateRating = rate => {
      return 5 - rate;
    };

    it('Verify filter books by rating', async () => {
      const keyword = 'test';
      const page = 1;
      const query = { keyword, page };
      const state = { query };
      const router = createRouterInstance();
      await router.push('/books?keyword=test');
      const wrapper = mount(BookFilter, {
        global: {
          plugins: [router, createPinia(state)],
        },
      });
      expect(wrapper.vm.localRate).toBe(0);
      expect(wrapper.vm.localSkillLevels).toStrictEqual([]);
      const ratingComponent = wrapper.findComponent({ name: 'Rating' });
      expect(ratingComponent.exists()).toBeTruthy();
      const ratings = ratingComponent.findAll('input');

      const firstRating = ratings[calcurateRating(1)];
      await firstRating.trigger('click');
      await flushPromises();
      for (const key in query) {
        expect(
          Object.prototype.hasOwnProperty.call(wrapper.vm.route.query, key)
        ).toBeTruthy();
        expect(wrapper.vm.route.query[key]).toBe(String(query[key]));
      }
      expect(Number(wrapper.vm.route.query.rate)).toBe(1);

      const fourthRating = ratings[calcurateRating(4)];
      await fourthRating.trigger('click');
      await flushPromises();
      for (const key in query) {
        expect(
          Object.prototype.hasOwnProperty.call(wrapper.vm.route.query, key)
        ).toBeTruthy();
        expect(wrapper.vm.route.query[key]).toBe(String(query[key]));
      }
      expect(Number(wrapper.vm.route.query.rate)).toBe(4);

      const lastRating = ratings[calcurateRating(5)];
      await lastRating.trigger('click');
      await flushPromises();
      for (const key in query) {
        expect(
          Object.prototype.hasOwnProperty.call(wrapper.vm.route.query, key)
        ).toBeTruthy();
        expect(wrapper.vm.route.query[key]).toBe(String(query[key]));
      }
      expect(Number(wrapper.vm.route.query.rate)).toBe(4);

      await fourthRating.trigger('click');
      await flushPromises();
      for (const key in query) {
        expect(
          Object.prototype.hasOwnProperty.call(wrapper.vm.route.query, key)
        ).toBeTruthy();
        expect(wrapper.vm.route.query[key]).toBe(String(query[key]));
      }
      expect(
        Object.prototype.hasOwnProperty.call(wrapper.vm.route.query, 'rate')
      ).toBeFalsy();
    });
    it('Verify filter books by skill levels', async () => {
      const keyword = 'test';
      const page = 1;
      const query = { keyword, page };
      const state = { query };
      const router = createRouterInstance();
      const basePath = `/books?keyword=${keyword}&page=${page}`;
      await router.push({ path: '/books', query });
      const wrapper = mount(BookFilter, {
        global: {
          plugins: [router, createPinia(state)],
        },
      });

      const skillLevelChipsComponent = wrapper.findComponent({
        name: 'SkillLevelChips',
      });
      expect(skillLevelChipsComponent.exists()).toBeTruthy();

      const skillLevelChips = skillLevelChipsComponent.findAll('input');
      expect(skillLevelChips.length).toBe(skillLevelsData.length);

      let path = '';
      for (const skillLevelChip of skillLevelChips) {
        await skillLevelChip.setChecked(true);
        await flushPromises();
        path += `&levels=${skillLevelChip.element.value}`;
        expect(wrapper.vm.route.fullPath).toBe(basePath + path);
      }
      for (const skillLevelChip of skillLevelChips) {
        await skillLevelChip.setChecked(false);
        await flushPromises();
        path = path.replace(`&levels=${skillLevelChip.element.value}`, '');
        expect(wrapper.vm.route.fullPath).toBe(basePath + path);
      }
    });
  });
});
