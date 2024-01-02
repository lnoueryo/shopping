import { defineStore } from 'pinia';
import { deviceSize } from '@/assets/js/device-size';

export const useStore = defineStore('index', {
  state: () => ({
    width: 0,
    height: 0,
    heightContent: 0,
    headerHeight: 0,
    isHeaderReady: false,
  }),
  getters: {
    isReady: state => state.isHeaderReady,
  },
  actions: {
    updateDimensions() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    initializeLayoutDimensions() {
      const style = getComputedStyle(document.documentElement);
      this.heightContent = Number(
        style.getPropertyValue('--height-content').trim().replace('px', '')
      );
      this.checkForHeader();
    },
    checkForHeader() {
      const header = document.getElementById('header');
      if (header) {
        this.headerHeight = header.getBoundingClientRect().height;
      } else {
        setTimeout(this.checkForHeader, 100); // 100ミリ秒後に再試行
      }
    },
    scrollToTop() {
      return new Promise(resolve => {
        let offset = 0;
        if (this.width < deviceSize.smallDesktop)
          offset = this.heightContent * 2;
        const scroll = window.scrollY <= offset ? window.scrollY : offset;
        this.scrollPage(scroll);
    
        const onScroll = () => {
          if (window.scrollY <= offset) {
            window.removeEventListener('scroll', onScroll);
            resolve(true);
          }
        };
        window.addEventListener('scroll', onScroll);
        onScroll();
      });
    },
    scrollPage(scroll: number) {
      window.scrollTo({
        top: scroll,
        behavior: 'smooth',
      });
    },
  },
});
