import { describe, it, expect, beforeAll } from 'vitest';
import { mount } from '@vue/test-utils';
import { deviceSize } from '@/assets/js/device-size';
import Pagination from '/components/molecules/Pagination.vue';
import { nextTick } from 'vue';

describe('Pagination', () => {
  beforeAll(() => {
    Element.prototype.scrollTo = () => {};
  })
  describe('Display Pagination', () => {
    it('Render more than 6 pages and first index', () => {
      const pagenation = {
        page: 1,
        page_count: 6,
        first: 1,
        last: 30,
        count: 152,
        width: deviceSize.smallDesktop,
      }
      const wrapper = createPagination(pagenation);
      const leftPageButton = wrapper.find('#left-page-button')
      expect(leftPageButton.element.disabled).toBeTruthy();
      const rightPageButton = wrapper.find('#right-page-button')
      expect(rightPageButton.element.disabled).toBeFalsy();
      const button = wrapper.find(`#button-${pagenation.page}`);
      expect(button.classes()).toContain('active');
      expect(wrapper.vm.isShownLeftPageButton).toBeFalsy();
      expect(wrapper.vm.isShownRightPageButton).toBeTruthy();
      expect(wrapper.vm.totalPageButtons.length).toBe(pagenation.page_count);
      expect(wrapper.vm.displayPageButtons.length).toBe(wrapper.vm.EDGE_PAGE_BUTTONS);
      expect(wrapper.vm.totalPageButtons[0]).toBe(1);
      expect(wrapper.vm.totalPageButtons[wrapper.vm.totalPageButtons.length - 1]).toBe(pagenation.page_count);
    });

    it('Render less than 5 pages and last index', () => {
      const pagenation = {
        page: 5,
        page_count: 5,
        first: 120,
        last: 122,
        count: 122,
        width: deviceSize.smallDesktop,
      }
      const wrapper = createPagination(pagenation);
      const leftPageButton = wrapper.find('#left-page-button')
      expect(leftPageButton.element.disabled).toBeFalsy();
      const rightPageButton = wrapper.find('#right-page-button')
      expect(rightPageButton.element.disabled).toBeTruthy();
      const button = wrapper.find(`#button-${pagenation.page}`);
      expect(button.classes()).toContain('active');
      expect(wrapper.vm.isShownLeftPageButton).toBeFalsy();
      expect(wrapper.vm.isShownRightPageButton).toBeFalsy();
      expect(wrapper.vm.totalPageButtons.length).toBe(pagenation.page_count);
      expect(wrapper.vm.displayPageButtons.length).toBe(wrapper.vm.MAX_DISPLAY_BUTTONS);
      expect(wrapper.vm.totalPageButtons[0]).toBe(1);
      expect(wrapper.vm.totalPageButtons[wrapper.vm.totalPageButtons.length - 1]).toBe(pagenation.page_count);
    });

    it('Render 1 page', () => {
      const pagenation = {
        page: 1,
        page_count: 1,
        first: 1,
        last: 2,
        count: 2,
        width: deviceSize.smallDesktop,
      }
      const wrapper = createPagination(pagenation);
      const leftPageButton = wrapper.find('#left-page-button')
      expect(leftPageButton.element.disabled).toBeTruthy();
      const rightPageButton = wrapper.find('#right-page-button')
      expect(rightPageButton.element.disabled).toBeTruthy();
      const button = wrapper.find(`#button-${pagenation.page}`);
      expect(button.classes()).toContain('active');
      expect(wrapper.vm.isShownLeftPageButton).toBeFalsy();
      expect(wrapper.vm.isShownRightPageButton).toBeFalsy();
      expect(wrapper.vm.totalPageButtons.length).toBe(pagenation.page_count);
      expect(wrapper.vm.displayPageButtons.length).toBe(pagenation.page_count);
    });

    it('Render 6 pages and index 3', () => {
      const pagenation = {
        page: 3,
        page_count: 6,
        first: 61,
        last: 90,
        count: 152,
        width: deviceSize.smallDesktop,
      }
      const wrapper = createPagination(pagenation);
      const leftPageButton = wrapper.find('#left-page-button')
      expect(leftPageButton.element.disabled).toBeFalsy();
      const rightPageButton = wrapper.find('#right-page-button')
      expect(rightPageButton.element.disabled).toBeFalsy();
      const button = wrapper.find(`#button-${pagenation.page}`);
      expect(button.classes()).toContain('active');
      expect(wrapper.vm.isShownLeftPageButton).toBeFalsy();
      expect(wrapper.vm.isShownRightPageButton).toBeTruthy();
      expect(wrapper.vm.totalPageButtons.length).toBe(pagenation.page_count);
      expect(wrapper.vm.displayPageButtons.length).toBe(wrapper.vm.EDGE_PAGE_BUTTONS);
    });

    it('Render 6 pages and index 4', () => {
      const pagenation = {
        page: 4,
        page_count: 6,
        first: 91,
        last: 120,
        count: 152,
        width: deviceSize.smallDesktop,
      }
      const wrapper = createPagination(pagenation);
      const leftPageButton = wrapper.find('#left-page-button')
      expect(leftPageButton.element.disabled).toBeFalsy();
      const rightPageButton = wrapper.find('#right-page-button')
      expect(rightPageButton.element.disabled).toBeFalsy();
      const button = wrapper.find(`#button-${pagenation.page}`);
      expect(button.classes()).toContain('active');
      expect(wrapper.vm.isShownLeftPageButton).toBeTruthy();
      expect(wrapper.vm.isShownRightPageButton).toBeFalsy();
      expect(wrapper.vm.totalPageButtons.length).toBe(pagenation.page_count);
      expect(wrapper.vm.totalPageButtons[0]).toBe(1);
      expect(wrapper.vm.totalPageButtons[wrapper.vm.totalPageButtons.length - 1]).toBe(pagenation.page_count);
      expect(wrapper.vm.displayPageButtons.length).toBe(wrapper.vm.EDGE_PAGE_BUTTONS);
    });

    it('Render 7 pages and index 4', () => {
      const pagenation = {
        page: 4,
        page_count: 7,
        first: 91,
        last: 120,
        count: 182,
        width: deviceSize.smallDesktop,
      }
      const wrapper = createPagination(pagenation);
      const leftPageButton = wrapper.find('#left-page-button')
      expect(leftPageButton.element.disabled).toBeFalsy();
      const rightPageButton = wrapper.find('#right-page-button')
      expect(rightPageButton.element.disabled).toBeFalsy();
      const button = wrapper.find(`#button-${pagenation.page}`);
      expect(button.classes()).toContain('active');
      expect(wrapper.vm.isShownLeftPageButton).toBeTruthy();
      expect(wrapper.vm.isShownRightPageButton).toBeTruthy();
      expect(wrapper.vm.totalPageButtons.length).toBe(pagenation.page_count);
      expect(wrapper.vm.totalPageButtons[0]).toBe(1);
      expect(wrapper.vm.totalPageButtons[wrapper.vm.totalPageButtons.length - 1]).toBe(pagenation.page_count);
      expect(wrapper.vm.displayPageButtons.length).toBe(wrapper.vm.MIDDLE_PAGE_BUTTONS);
    });

    it('Render mobile', () => {
      const pagenation = {
        page: 4,
        page_count: 7,
        first: 91,
        last: 120,
        count: 182,
        width: deviceSize.mobile - 1,
      }
      const wrapper = createPagination(pagenation);
      const button = wrapper.find(`#button-${pagenation.page}`);
      expect(button.classes()).toContain('active');
      expect(wrapper.vm.isShownLeftPageButton).toBeFalsy();
      expect(wrapper.vm.isShownRightPageButton).toBeFalsy();
      expect(wrapper.vm.displayPageButtons.length).toBe(pagenation.page_count);
      expect(wrapper.vm.displayPageButtons[0]).toBe(1);
      expect(wrapper.vm.displayPageButtons[wrapper.vm.displayPageButtons.length - 1]).toBe(pagenation.page_count);
      const pageButtons = wrapper.find('#page-buttons');
      expect(pageButtons.classes()).toContain('mobile')
    });

  });

  describe('Behavior', () => {
    const pagenation = {
      page: 4,
      page_count: 7,
      first: 91,
      last: 120,
      count: 182,
      width: deviceSize.smallDesktop,
    }

    it('Verify Left Page', async () => {
      const wrapper = createPagination(pagenation);
      const leftPageButton = wrapper.find('#left-page-button')
      await leftPageButton.trigger('click');
      expect(wrapper.emitted('updatePage')).toBeTruthy();
      expect(wrapper.emitted()['updatePage'][0]).toEqual([pagenation.page - 1]);
    });

    it('Verify Right Page', async () => {
      const wrapper = createPagination(pagenation);
      const rightPageButton = wrapper.find('#right-page-button')
      await rightPageButton.trigger('click');
      expect(wrapper.emitted('updatePage')).toBeTruthy();
      expect(wrapper.emitted()['updatePage'][0]).toEqual([pagenation.page + 1]);
    });

    it('Verify Jump Left Page', async () => {
      const wrapper = createPagination(pagenation);
      const jumpLeftButton = wrapper.find('#jump-left-button')
      await jumpLeftButton.trigger('click');
      const buttons = wrapper.vm.displayPageButtons;
      expect(wrapper.emitted('updatePage')).toBeTruthy();
      expect(wrapper.emitted()['updatePage'][0]).toEqual([buttons[0] - 2]);
    });

    it('Verify Jump Right Page', async () => {
      const wrapper = createPagination(pagenation);
      const jumpRightButton = wrapper.find('#jump-right-button')
      await jumpRightButton.trigger('click');
      const buttons = wrapper.vm.displayPageButtons;
      expect(wrapper.emitted('updatePage')).toBeTruthy();
      expect(wrapper.emitted()['updatePage'][0]).toEqual([buttons[buttons.length - 1] + 2]);
    });

  });
});

interface PaginationData {
  page?: number;
  page_count?: number;
  first?: number;
  last?: number;
  count?: number;
  width?: number;
}

const createPagination = (paginationData: PaginationData) => {
  return mount(Pagination, {
    props: paginationData,
  });
};
