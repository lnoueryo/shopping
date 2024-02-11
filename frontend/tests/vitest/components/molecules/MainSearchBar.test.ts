import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { deviceSize } from '@/assets/js/device-size.js';
import SearchButton from '@/components/atoms/SearchButton.vue';
import MainSearchBar from '@/components/molecules/MainSearchBar.vue';

describe('MainSearchBar', () => {
  describe('Display SkillLevelChips', () => {
    const mainSearchBar = { modelValue: 'test', width: deviceSize.tablet };
    it('Render Correctly', () => {
      const wrapper = createMainSearchBar(mainSearchBar);
      expect(wrapper.vm.searchKeyword).toBe(mainSearchBar.modelValue);
    });

    it('Verify Tablet Size', async () => {
      const wrapperLeft = 100;
      const propmptLeft = 120;
      const wrapper = createMainSearchBar(mainSearchBar);
      const changeWidth = async (newWidth: number) => {
        wrapper.setProps({ width: newWidth });
        return wrapper.vm.$nextTick();
      };
      expect(wrapper.vm.promptWidth).toBe(0);
      expect(wrapper.vm.isInputSizeBelowLimit).toBeFalsy();
      wrapper.vm.wrapperRef = { getBoundingClientRect: () => ({ left: wrapperLeft }) };
      wrapper.vm.promptRef = {
        getBoundingClientRect: () => ({ left: propmptLeft, width: 100 }),
      };

      // <transition @after-enter="afterEnter">を手動で実行
      wrapper.vm.afterEnter();
      wrapper.vm.adjustPromptVisibility(changeWidth(deviceSize.tablet));
      await nextTick();
      expect(wrapper.vm.isInputSizeBelowLimit).toBeFalsy();
      expect(wrapper.vm.promptPadding).toBe(140);
    });

    it('Verify Below Tablet Size', async () => {
      const wrapperLeft = 100;
      const propmptLeft = 120;
      const wrapper = createMainSearchBar(mainSearchBar);
      const changeWidth = async (newWidth: number) => {
        wrapper.setProps({ width: newWidth });
        return wrapper.vm.$nextTick();
      };
      expect(wrapper.vm.promptWidth).toBe(0);
      expect(wrapper.vm.isInputSizeBelowLimit).toBeFalsy();
      wrapper.vm.wrapperRef = { getBoundingClientRect: () => ({ left: wrapperLeft }) };
      wrapper.vm.promptRef = {
        getBoundingClientRect: () => ({ left: propmptLeft, width: 100 }),
      };

      wrapper.vm.updateRefSize();
      wrapper.vm.adjustPromptVisibility(changeWidth(deviceSize.tablet - 1));
      await nextTick();
      expect(wrapper.vm.isInputSizeBelowLimit).toBeTruthy();
      expect(wrapper.vm.promptPadding).toBe(propmptLeft - wrapperLeft);
    });

    it('Verify Magnify Size', async () => {
      const wrapper = createMainSearchBar(mainSearchBar);
      expect(wrapper.vm.magnifyPadding).toBe(0);
      wrapper.vm.wrapperRef = { getBoundingClientRect: () => ({ right: 300 }) };
      const searchButtonComponent = wrapper.findComponent(SearchButton);
      const button = searchButtonComponent.find('button');
      button.element.getBoundingClientRect = () => ({ right: 280, width: 40 });
      wrapper.vm.adjustMagnifyVisibility();
      await nextTick();
      expect(wrapper.vm.magnifyPadding).toBe(80);
    });
  });

  describe('Behavior', () => {
    const mainSearchBar = { modelValue: '' };

    it('Verify v-model', async () => {
      const wrapper = createMainSearchBar(mainSearchBar);
      const input = wrapper.find('input');

      const text = 'test text';
      await input.setValue(text);
      await input.trigger('change');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([text]);
    });

    it('Verify Enter', async () => {
      const wrapper = createMainSearchBar(mainSearchBar);
      const input = wrapper.find('input');
      const text = 'test text';
      await input.setValue(text);
      await input.trigger('keyup.enter');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([text]);
    });

    it('Verify Click Search Button', async () => {
      const wrapper = createMainSearchBar(mainSearchBar);
      const input = wrapper.find('input');
      const searchButton = wrapper.findComponent({ name: 'SearchButton' });
      const text = 'test text';
      await input.setValue(text);
      await searchButton.trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([text]);
    });
  });
});

interface MainSearchBarData {
  modelValue?: string;
}

const createMainSearchBar = (mainSearchBarData: MainSearchBarData) => {
  return mount(MainSearchBar, {
    props: mainSearchBarData,
  });
};
