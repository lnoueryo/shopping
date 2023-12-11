import { ref, onMounted, onUnmounted } from 'vue';

export function useViewport() {
  const width = ref(0);
  const height = ref(0);

  function handleResize() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }

  onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => window.removeEventListener('resize', handleResize));

  return { width, height };
}
