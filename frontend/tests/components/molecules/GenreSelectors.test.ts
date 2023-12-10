import { describe, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import GenreSelector from '/components/atoms/GenreSelector.vue';
import GenreSelectors from '/components/molecules/GenreSelectors.vue';
import { genreData } from '@/assets/js/genres.js';
import { deviceSize } from '@/assets/js/device-size.js';
import { nextTick } from 'vue';

describe('GenreSelectors', () => {
  describe('Display GenreSelectors', () => {
    const firstGenreIndex = 0;
    const genreSelectors = {
      modelValue: genreData[firstGenreIndex].id,
      genreData: genreData,
    };
    it('Render Correctly', () => {
      const wrapper = createGenreSelectors(genreSelectors);
      const genreSelectorComponents = wrapper.findAllComponents(GenreSelector);
      expect(genreSelectorComponents.length).toBe(genreData.length);
      expect(wrapper.vm.localGenreId).toBe(genreSelectors.modelValue);
      expect(wrapper.find('.genre').exists()).toBeTruthy();
      for (const [index, genreSelectorComponent] of Object.entries(
        genreSelectorComponents
      )) {
        const typedComponent = genreSelectorComponent as VueWrapper<
          typeof GenreSelector
        >;
        if (Number(index) === firstGenreIndex) {
          expect(typedComponent.vm.isSelected).toBeTruthy();
        } else {
          expect(typedComponent.vm.isSelected).toBeFalsy();
        }
      }
    });

    it('Render Incorrectly', async () => {
      const noGenreSelectrors = {};
      const wrapper = createGenreSelectors(noGenreSelectrors);
      const genreSelectorComponents = wrapper.findAllComponents(GenreSelector);
      expect(genreSelectorComponents.length).toBe(0);
    });
  });

  describe('Behavior', () => {
    const lastGenreIndex = genreData.length - 1;
    const genreSelectors = {
      genreData: genreData,
      mobile: 1,
      tablet: 2,
      smallDesktop: 3,
      desktop: 4,
    };

    it('Verify v-model', async () => {
      const wrapper = createGenreSelectors(genreSelectors);
      const genreSelectorComponents = wrapper.findAllComponents(GenreSelector);
      expect(wrapper.emitted()['update:modelValue']).toBeFalsy();
      for (const genreSelectorComponent of genreSelectorComponents) {
        expect(genreSelectorComponent.vm.isSelected).toBeFalsy();
      }
      genreSelectorComponents[lastGenreIndex].trigger('click');
      await nextTick();

      expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
        genreData[lastGenreIndex].id,
      ]);
    });

    it('Verify size', async () => {
      const wrapper = createGenreSelectors(genreSelectors);

      const changeWidth = (newWidth: number) => {
        wrapper.vm.width = newWidth;
        return wrapper.vm.$nextTick();
      };

      await changeWidth(deviceSize.mobile - 1);
      expect(wrapper.vm.size).toBe(1);

      await changeWidth(deviceSize.tablet - 1);
      expect(wrapper.vm.size).toBe(2);

      await changeWidth(deviceSize.smallDesktop - 1);
      expect(wrapper.vm.size).toBe(3);

      await changeWidth(deviceSize.desktop - 1);
      expect(wrapper.vm.size).toBe(4);
    });
  });
});

interface GenreSelectorsData {
  modelValue?: string;
  genreData?: typeof genreData;
}

const createGenreSelectors = (genreSelectorsData: GenreSelectorsData) => {
  return mount(GenreSelectors, {
    props: genreSelectorsData,
  });
};
