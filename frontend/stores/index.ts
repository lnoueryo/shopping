import { defineStore } from 'pinia';
import { deviceSize } from '@/assets/js/device-size';

export const useStore = defineStore('index', {
  state: () => ({
    width: 0,
    height: 0,
    heightContent: 0,
    headerHeight: 0,
    navHeight: 0,
    isHeaderReady: false,
    theme: 'standard',
  }),
  getters: {
    isReady: state => state.isHeaderReady,
    topLayoutHeight: state => state.headerHeight + state.navHeight,
  },
  actions: {
    applyTheme() {
      this.theme = sessionStorage.getItem('theme') || 'standard';
      this.updateTheme(this.theme);
    },
    async updateTheme(theme: string) {
      sessionStorage.setItem('theme', theme);
      document.body.className = '';
      document.body.classList.add(`${theme}-mode`);
    },
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
      const nav = document.getElementById('nav');
      if (header && nav) {
        this.headerHeight = header.getBoundingClientRect().height;
        this.navHeight = nav.getBoundingClientRect().height;
      } else {
        setTimeout(this.checkForHeader, 100); // 100ミリ秒後に再試行
      }
    },
    scrollToTop() {
      return new Promise(resolve => {
        let { scrollY } = window;
        let offset = 0;
        if (this.width < deviceSize.smallDesktop)
          offset = this.heightContent * 2;
        const scroll = window.scrollY <= offset ? window.scrollY : offset;
        this.scrollPage(scroll);

        const onScroll = () => {
          if (scrollY === window.scrollY) {
            this.scrollPage(scroll);
          }
          if (window.scrollY <= offset) {
            window.removeEventListener('scroll', onScroll);
            resolve(true);
          }
          scrollY = window.scrollY;
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
