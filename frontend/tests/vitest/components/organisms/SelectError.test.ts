import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import SelectError from '/components/organisms/SelectError.vue';
import { createTestingPinia } from '@pinia/testing';

describe('SelectError', () => {
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
      routes: [
        {
          path: '/error',
          name: 'error',
        },
        {
          path: '/books',
          name: 'books',
        },
      ],
    });
  };
  const notFoundPagePath = '/123/123';
  describe('Display SelectError', () => {
    it('not found page from another page', async () => {
      const currentPath = '/books';
      const state = {
        route: {
          from: {
            fullPath: currentPath,
          },
          to: {
            path: notFoundPagePath,
          },
        },
        isReady: true,
      };
      const router = createRouterInstance();
      router.push(notFoundPagePath);
      await flushPromises();
      const wrapper = mount(SelectError, {
        global: {
          plugins: [router, createPinia(state)],
        },
      });

      await flushPromises();
      expect(wrapper.vm.route.fullPath).toBe(
        `${notFoundPagePath}?next=${currentPath}&status=404`
      );
    });
    it('not found page by URL', async () => {
      const state = {
        route: {
          from: null,
          to: null,
        },
        isReady: true,
      };
      const router = createRouterInstance();
      router.push(notFoundPagePath);
      await flushPromises();
      const wrapper = mount(SelectError, {
        global: {
          plugins: [router, createPinia(state)],
        },
      });

      await flushPromises();
      expect(wrapper.vm.route.fullPath).toBe(notFoundPagePath);
      expect(wrapper.vm.errorType).toBe(404);
    });
  });
});
