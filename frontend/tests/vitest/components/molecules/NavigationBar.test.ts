import { describe, it, expect } from 'vitest';
import { mount, VueWrapper, RouterLinkStub } from '@vue/test-utils';
import NavigationButton from '/components/atoms/NavigationButton.vue';
import NavigationBar from '/components/molecules/NavigationBar.vue';
import { navigationData } from '@/assets/js/navigation.js';

describe('NavigationBar', () => {
  describe('Display NavigationBar', () => {
    const navigationBar = {
      navHeight: 48,
      navigationData,
    };
    it('Render Correctly', () => {
      const wrapper = createNavigationBar(navigationBar);
      expect(wrapper.find('nav').exists()).toBeTruthy();
      const navigationButtons = wrapper.findAllComponents(NavigationButton);
      expect(navigationButtons.length).toBe(navigationData.length);
      for (const [index, navigationButton] of Object.entries(
        navigationButtons
      )) {
        const typedComponent = navigationButton as VueWrapper<
          typeof NavigationButton
        >;
        expect(typedComponent.vm.title).toBe(
          navigationData[Number(index)].title
        );
        expect(typedComponent.vm.to).toBe(navigationData[Number(index)].to);
      }
    });

    it('Render Incorrectly', async () => {
      const noGenreSelectrors = {};
      const wrapper = createNavigationBar(noGenreSelectrors);
      expect(wrapper.find('nav').exists()).toBeFalsy();
      const navigationButtons = wrapper.findAllComponents(NavigationButton);
      expect(navigationButtons.length).toBe(0);
    });
  });

  describe('Behavior', () => {
    const navigationBar = {
      navigationData: navigationData,
    };

    it('Verify active and inactive buttons', async () => {
      const wrapper = createNavigationBar(navigationBar);
      const navigationButtons = wrapper.findAllComponents(NavigationButton);
      expect(navigationButtons.length).toBe(navigationData.length);
      navigationButtons.forEach((wrapper) => {
        const linkProps = wrapper.props();
        if (linkProps.to) {
          expect(wrapper.findComponent(RouterLinkStub).exists()).toBeTruthy();
        } else {
          expect(wrapper.find('p').exists()).toBeTruthy();
        }
      });
    });
  });
});

interface GenreSelectorsData {
  navHeight?: number;
  navigationData?: typeof navigationData;
}

const createNavigationBar = (navigationBarData: GenreSelectorsData) => {
  return mount(NavigationBar, {
    props: navigationBarData,
    global: {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    },
  });
};
