import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import RoadMap from '/pages/[id].vue';
import Spinner from '/components/global/Spinner.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';
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
        path: '/:id',
        name: 'roadmap',
        props: route => ({id: route.params.id}),
      },
      {
        path: '/error',
        name: 'error',
      },
    ],
  });
};

describe.only('[id]', () => {
  describe('Visit', () => {
    it('Display roadmap', async() => {
      const id = 'frontend'
      const router = createRouterInstance();
      await router.push({
        path: `/${id}`,
        params: {id}
      });
      const wrapper =  mount(RoadMap, {
        global: {
          plugins: [router, createPinia({})],
        },
      });
      expect(wrapper.vm.isReady).toBeFalsy();
      expect(wrapper.findComponent(Spinner).exists()).toBeTruthy();
      expect(wrapper.vm.imgPath).contains(id);

      await nextTick();
      expect(wrapper.vm.isReady).toBeTruthy();
      const img = wrapper.find('img');
      expect(img.exists()).toBeTruthy();

      expect(wrapper.vm.isImageReady).toBeFalsy();
      img.trigger('load');
      expect(wrapper.vm.isImageReady).toBeTruthy();

    });

    it('Display 404', async() => {
      const id = '123456789'
      const router = createRouterInstance();
      await router.push({
        path: `/${id}`,
        params: {id}
      });
      const wrapper =  mount(RoadMap, {
        global: {
          plugins: [router, createPinia({})],
        },
      });

      await nextTick();
      const img = wrapper.find('img');
      expect(img.exists()).toBeTruthy();
      img.trigger('error');
      await flushPromises();
      expect(wrapper.vm.route.fullPath).toBe('/error?status=404');

    });

  });

});


interface GenreData {
  id?: string;
  title?: string;
  icon?: string;
  disabled?: boolean;
  size?: number;
}
