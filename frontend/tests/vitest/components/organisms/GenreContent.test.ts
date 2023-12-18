import { describe, it, expect, beforeEach } from 'vitest';
import { mount, flushPromises  } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import GenreContent from '/components/organisms/GenreContent.vue';
import { createTestingPinia } from '@pinia/testing';
import { genreData } from '/assets/js/genres';

describe('GenreContent', () => {
  const createPinia = (state) => {
    return createTestingPinia({
      initialState: {
        index: state,
      },
    })
  }
  const createRouterInstance = () => {
    return createRouter({
      history: createWebHistory(),
      routes: [],
    });
  }
  describe('Display GenreContent', () => {
    it('Render Correctly', async() => {
      const state = { isHeaderReady: false }
      const wrapper = mount(GenreContent, {
        global: {
          plugins: [createRouterInstance(), createPinia(state)],
        },
      });
      const nuxtlinks = wrapper.findAll('nuxtlink');

      expect(nuxtlinks.length).toBe(genreData.length);
    });
  });
  describe('Search Book by Genre', () => {
    it('Verify Go To Book List Page', async() => {
      const state = { isHeaderReady: false }
      const router = createRouterInstance()
      const wrapper = mount(GenreContent, {
        global: {
          plugins: [router, createPinia(state)],
        },
      });
      const nuxtlinks = wrapper.findAll('nuxtlink');
      for (const [index, genre] of genreData.entries()) {
        await router.push('/')
        await nuxtlinks[index].trigger('click');
        await flushPromises();
        expect(wrapper.vm.router.currentRoute.value.fullPath).toBe(`/books?genre=${genre.id}`);
      }
    });
  });
});
