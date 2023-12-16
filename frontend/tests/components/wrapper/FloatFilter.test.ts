import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FloatFilter from '@/components/wrappers/FloatFilter.vue';
import { setActivePinia, createPinia } from 'pinia';
import { useStore } from '@/stores';

setActivePinia(createPinia());
describe('FloatFilter', () => {
  describe('Behavior', () => {
    const heightContent = 48;
    const searchBarHeight = heightContent * 1;
    const logoAndNavHeight = heightContent * 2;
    const headerHeight = searchBarHeight + logoAndNavHeight;
    const store = useStore();
    store.width = 350;
    store.headerHeight = headerHeight;
    store.heightContent = searchBarHeight;
    const mockComputedStyle = {
      getPropertyValue: (propName: string) => {
        if (propName === '--height-content') {
          return `${searchBarHeight}px`;
        }
        return '';
      },
    };
    vi.stubGlobal('getComputedStyle', () => mockComputedStyle);

    const mockHeader = {
      getBoundingClientRect: () => ({ height: headerHeight }),
    };
    vi.spyOn(document, 'getElementById').mockImplementation(id => {
      if (id === 'header') {
        return mockHeader;
      }
      return null;
    });
    vi.mock('@/composables/useScroll', () => ({
      useScroll: () => ({
        currentScrollTop: ref(0),
        lastScrollTop: ref(0),
        isScroll: vi.fn(() => true),
        isScrollDown: vi.fn(() => true),
      }),
    }));
    it('Verify FloatFilter is not fixed', async () => {
      const wrapper = mount(FloatFilter);

      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      await wrapper.vm.moveFloatMenu();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isFixed).toBeFalsy();

      Object.defineProperty(window, 'scrollY', {
        value: logoAndNavHeight,
        writable: true,
      });
      await wrapper.vm.moveFloatMenu();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isFixed).toBeFalsy();

      expect(wrapper.vm.menuTopPosition).toBe(
        'calc(var(--height-content) * -1)'
      );
    });

    it('Verify FloatFilter is fixed', async () => {
      const wrapper = mount(FloatFilter);

      Object.defineProperty(window, 'scrollY', {
        value: logoAndNavHeight + 1,
        writable: true,
      });
      await wrapper.vm.moveFloatMenu();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isFixed).toBeTruthy();
      expect(wrapper.vm.menuTopPosition).toBe('var(--height-content)');
    });

    it('Verify FloatFilter is Before Header', async () => {
      const wrapper = mount(FloatFilter);

      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      await wrapper.vm.moveFloatMenu();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isOverMain).toBeFalsy();

      Object.defineProperty(window, 'scrollY', {
        value: headerHeight,
        writable: true,
      });
      await wrapper.vm.moveFloatMenu();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isOverMain).toBeFalsy();
      expect(wrapper.vm.menuTopPosition).toBe('var(--height-content)');
    });

    it('Verify FloatFilter is After Header', async () => {
      const wrapper = mount(FloatFilter);

      Object.defineProperty(window, 'scrollY', {
        value: headerHeight + 1,
        writable: true,
      });
      await wrapper.vm.moveFloatMenu();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isOverMain).toBeTruthy();
    });

    it('Verify Show FloatFilter After Header', async () => {
      const wrapper = mount(FloatFilter);

      Object.defineProperty(window, 'scrollY', {
        value: headerHeight + 1,
        writable: true,
      });
      window.pageYOffset = 10;
      await wrapper.vm.moveFloatMenu();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isOverMain).toBeTruthy();
      expect(wrapper.vm.menuTopPosition).toBe('0');
    });

    it('Verify Hide FloatFilter After Header', async () => {
      const wrapper = mount(FloatFilter);

      Object.defineProperty(window, 'scrollY', {
        value: headerHeight + 1,
        writable: true,
      });

      window.pageYOffset = 100;
      await wrapper.vm.moveFloatMenu();
      window.pageYOffset = 90;
      await wrapper.vm.moveFloatMenu();
      expect(wrapper.vm.isScrollActive).toBeTruthy();
      expect(wrapper.vm.isScrollingDown).toBeFalsy();
      expect(wrapper.vm.menuTopPosition).toBe('var(--height-content)');
    });
  });
});
