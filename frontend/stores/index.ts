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
    route: {
      from: {},
      to: {},
    },
    snackbar: initialSnackbar(),
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
      document.documentElement.className = '';
      document.documentElement.classList.add(`${theme}-mode`);
    },
    updateDimensions() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      // IOSのクローム用にボトムバーを計算
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
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
        const { scrollY } = window;
        let offset = 0;
        if (this.width < deviceSize.smallDesktop)
          // ヘッダーの手前で止める
          offset = this.topLayoutHeight - this.heightContent;
        const scroll = scrollY <= offset ? scrollY : offset;
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
    resetSnack() {
      this.snackbar = initialSnackbar();
    },
  },
});
const initialSnackbar = () => {
  return {
    show: false,
    message: '',
    color: 'var(--color-class)',
    position: 'bottom',
    timeout: 3000,
  };
};
