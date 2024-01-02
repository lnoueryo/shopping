import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import Header from '/components/organisms/Header.vue';
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';

describe('Header', () => {
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
  const generateRandomString = (length: number) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };
  describe('Display Header', () => {
    it('Render Correctly', async () => {
      const state = { isHeaderReady: false };
      const wrapper = mount(Header, {
        global: {
          plugins: [createRouterInstance(), createPinia(state)],
        },
      });
      expect(wrapper.find('#header').exists()).toBeFalsy();

      wrapper.vm.store.width = 1200;
      await nextTick();
      expect(wrapper.vm.store.isHeaderReady).toBeTruthy();

      expect(wrapper.find('#header').exists()).toBeTruthy();
    });
  });
  describe('Search Book by Keyword', () => {
    const search = async (wrapper, length) => {
      const keyword = generateRandomString(length);
      const input = wrapper.find('input');
      await input.trigger('focus');
      await input.setValue(keyword);
      input.element.dispatchEvent(new Event("blur"))
      await flushPromises();
      return keyword;
    };
    it('Verify Go To Book List Page.', async () => {
      const state = { isHeaderReady: true };
      const router = createRouterInstance();
      await router.push('/');
      const wrapper = mount(Header, {
        global: {
          plugins: [createRouterInstance(), createPinia(state)]
        },
      });
      const keyword = await search(wrapper, 1);
      expect(wrapper.vm.route.fullPath).toBe(`/books?keyword=${keyword}`);
      await router.push('/');
      const keywords = await search(wrapper, 100);
      expect(wrapper.vm.route.fullPath).toBe(`/books?keyword=${keywords}`);
    });
    it('Verify Stay Home Page.', async () => {
      const state = { isHeaderReady: true };
      const router = createRouterInstance();
      await router.push('/');
      const wrapper = mount(Header, {
        global: {
          plugins: [createRouterInstance(), createPinia(state)],
        },
      });
      await search(wrapper, 0);
      expect(wrapper.vm.route.fullPath).toBe(`/`);
    });
    it('Verify Show Up Error with Keyword More Than 100 Characters.', async () => {
      const state = { isHeaderReady: true };
      const router = createRouterInstance();
      await router.push('/');
      const wrapper = mount(Header, {
        global: {
          plugins: [router, createPinia(state)],
        },
      });

      await search(wrapper, 101);
      expect(wrapper.vm.route.fullPath).toBe(`/`);
      expect(wrapper.vm.isOpen).toBeTruthy();
    });
    it('Verify Rate and Level Parameters.', async () => {
      const state = { isHeaderReady: true };
      const router = createRouterInstance();
      await router.push('/books?rate=4&levels=advanced&genre=1234566789');
      const wrapper = mount(Header, {
        global: {
          plugins: [router, createPinia(state)],
        },
      });

      const keyword = await search(wrapper, 5);
      expect(wrapper.vm.route.fullPath).toBe(
        `/books?rate=4&levels=advanced&keyword=${keyword}`
      );
    });
  });
});
