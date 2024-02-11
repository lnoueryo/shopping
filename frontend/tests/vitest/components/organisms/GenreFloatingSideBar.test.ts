import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import GenreFloatingSideBar from '/components/organisms/GenreFloatingSideBar.vue';
import { createTestingPinia } from '@pinia/testing';
import { genreData } from '/assets/js/genres';

describe('GenreFloatingSideBar', () => {
  const createPinia = state => {
    return createTestingPinia({
      initialState: {
        index: state,
      },
    });
  };
  const createRouterInstance = () => {
    return createRouter({
      history: createWebHistory(),
      routes: [],
    });
  };
  describe('Display GenreFloatingSideBar', () => {
    it('Render Correctly', async () => {
      const state = { isHeaderReady: false };
      const wrapper = mount(GenreFloatingSideBar, {
        global: {
          plugins: [createRouterInstance(), createPinia(state)],
        },
      });
      const genreButtons = wrapper.findAll('button.genre');

      expect(genreButtons.length).toBe(genreData.length);
    });
  });
  describe('Search Book by Genre', () => {
    it('Verify search books by genre', async () => {
      const state = { isHeaderReady: false };
      const router = createRouterInstance();
      const wrapper = mount(GenreFloatingSideBar, {
        global: {
          plugins: [router, createPinia(state)],
        },
      });
      const genreButtons = wrapper.findAll('button.genre');
      for (const [index, genre] of genreData.entries()) {
        await router.push('/books?keyword=test');
        await genreButtons[index].trigger('click');
        await flushPromises();
        expect(
          Object.prototype.hasOwnProperty.call(
            router.currentRoute.value.query,
            'keyword'
          )
        ).toBeFalsy();
        expect(
          Object.prototype.hasOwnProperty.call(
            router.currentRoute.value.query,
            'genre'
          )
        ).toBeTruthy();
        expect(router.currentRoute.value.query['genre']).toBe(genre.id);
        expect(router.currentRoute.value.query.keyword).toBeUndefined();
      }
    });
  });
});
