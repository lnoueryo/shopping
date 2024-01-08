import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { mdiPencilRuler } from '@mdi/js';
import GenreSelector from '/components/atoms/GenreSelector.vue';
import { nextTick } from 'vue';

describe('GenreSelector', () => {
  describe('Display GenreSelector', () => {
    it('Render Correctly', () => {
      const genreSelector = {
        id: '1',
        title: 'Design',
        icon: mdiPencilRuler,
      };
      const wrapper = createGenreSelector(genreSelector);
      expect(wrapper.find('.genre').exists()).toBeTruthy();
      expect(wrapper.text()).toMatch(genreSelector.title);
      const path = wrapper.find('path');

      const dAttribute = path.attributes('d');
      expect(dAttribute).toBe(genreSelector.icon);
    });

    it('Render Incorrectly', async () => {
      const incompleteGenreSelector = {};
      const wrapper = createGenreSelector(incompleteGenreSelector);
      expect(wrapper.find('.genre').exists()).toBeFalsy();
      await wrapper.setProps({ id: '', title: 'Design', icon: '' });
      expect(wrapper.find('.genre').exists()).toBeFalsy();
      await wrapper.setProps({ id: '', title: '', icon: mdiPencilRuler });
      expect(wrapper.find('.genre').exists()).toBeFalsy();
      await wrapper.setProps({ id: '', title: '', icon: '' });
      expect(wrapper.find('.genre').exists()).toBeFalsy();
    });

    it('Verify GenreSelector Is Active', () => {
      const genreSelector = {
        id: '1',
        title: 'Design',
        icon: mdiPencilRuler,
        modelValue: '1',
      };
      const wrapper = createGenreSelector(genreSelector);
      expect(wrapper.vm.isSelected).toBeTruthy();
      const nuxtLink = wrapper.find('nuxtlink');
      expect(nuxtLink.classes()).toContain('active');
    });

    it('Verify GenreSelector Is Inactive', () => {
      const genreSelector = {
        id: '1',
        title: 'Design',
        icon: mdiPencilRuler,
        modelValue: '2',
      };
      const wrapper = createGenreSelector(genreSelector);
      expect(wrapper.vm.isSelected).toBeFalsy();
      const nuxtLink = wrapper.find('nuxtlink');
      expect(nuxtLink.classes()).toContain('inactive');
    });

    it('Verify Disabled', async () => {
      const genreSelector = {
        id: '1',
        title: 'Design',
        icon: mdiPencilRuler,
        modelValue: '2',
        disabled: true,
      };
      const wrapper = createGenreSelector(genreSelector);
      const nuxtLink = wrapper.find('nuxtlink');
      expect(nuxtLink.classes()).toContain('disabled');
    });
  });

  describe('Behavior', () => {
    const genreSelector = {
      id: '1',
      title: 'Design',
      icon: mdiPencilRuler,
      modelValue: '',
      disabled: false,
      size: 24,
      radio: false,
    };

    it('Verify v-model', async () => {
      const wrapper = createGenreSelector(genreSelector);
      const anchor = wrapper.find('.genre');
      expect(anchor.exists()).toBeTruthy();
      expect(wrapper.vm.isSelected).toBeFalsy();
      anchor.trigger('click');
      await nextTick();

      expect(wrapper.emitted()['genre']).toBeTruthy();
      expect(wrapper.emitted()['genre'][0]).toEqual([
        { ...genreSelector, panelLine: false },
      ]);
      expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
        genreSelector.id,
      ]);
      expect(wrapper.vm.isSelected).toBeTruthy();
    });

    it('Verify Disabled', async () => {
      const disabledGenreSelector = { ...genreSelector, disabled: true };
      const wrapper = createGenreSelector(disabledGenreSelector);
      const anchor = wrapper.find('.genre');
      expect(anchor.exists()).toBeTruthy();
      expect(wrapper.vm.isSelected).toBeFalsy();
      anchor.trigger('click');
      await nextTick();

      expect(wrapper.emitted()['genre']).toBeFalsy();
      expect(wrapper.emitted()['update:modelValue']).toBeFalsy();
      expect(wrapper.vm.isSelected).toBeFalsy();
    });

    it('Verify To Inactivate', async () => {
      const activeGenreSelector = {
        ...genreSelector,
        modelValue: genreSelector.id,
      };
      const wrapper = createGenreSelector(activeGenreSelector);
      expect(wrapper.vm.isSelected).toBeTruthy();
      const anchor = wrapper.find('.genre');
      anchor.trigger('click');
      await nextTick();

      expect(wrapper.vm.isSelected).toBeFalsy();
      expect(wrapper.emitted()['genre']).toBeTruthy();
      expect(wrapper.emitted()['genre'][0]).toEqual([null]);
      expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['']);
    });

    it('Verify To Panel Line', async () => {
      const wrapper = createGenreSelector(genreSelector);
      expect(wrapper.vm.nuxtLinkStyle.border).toBe('initial');
      wrapper.setProps({ panelLine: true });
      await nextTick();
      expect(wrapper.vm.nuxtLinkStyle.border).not.toBe('initial');
    });
  });
});

// 変数の初期状態
// グローバル変数・メンバ変数の更新・関数の戻り値
// データの受け渡し・イベントの取得

// selectGenreの分岐網羅
// isValidProps
// isSelected
// nuxtLinkStyle
// nuxtLinkClass

interface GenreData {
  id?: string;
  title?: string;
  icon?: string;
  disabled?: boolean;
  size?: number;
}

const createGenreSelector = (genreData: GenreData) => {
  return mount(GenreSelector, {
    props: genreData,
  });
};
