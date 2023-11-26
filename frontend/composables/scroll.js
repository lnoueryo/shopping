import { ref, onMounted, onUnmounted } from 'vue';

export function useScroll(moveContent) {
  const currentScrollTop = ref(0);
  const lastScrollTop = ref(0);

  onMounted(() => {
    window.addEventListener('scroll', moveContent);
  });
  onUnmounted(() => window.removeEventListener('scroll', moveContent));

  const isScroll = () => {
    currentScrollTop.value =
      window.pageYOffset || document.documentElement.scrollTop;
    if (Math.abs(currentScrollTop.value - lastScrollTop.value) < 2) {
      lastScrollTop.value =
        currentScrollTop.value <= 0 ? 0 : currentScrollTop.value;
      return false;
    }
    return true;
  };

  const isScrollDown = () => {
    const isDown = currentScrollTop.value > lastScrollTop.value;
    lastScrollTop.value =
      currentScrollTop.value <= 0 ? 0 : currentScrollTop.value;
    return isDown;
  };

  return { currentScrollTop, lastScrollTop, isScroll, isScrollDown };
}
