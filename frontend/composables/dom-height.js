import { ref, onMounted } from 'vue';

export function useDOMHeight() {
  const heightContent = ref(0);
  const headerHeight = ref(0);
  onMounted(() => {
    const style = getComputedStyle(document.documentElement);
    heightContent.value = Number(
      style.getPropertyValue('--height-content').trim().replace('px', '')
    );
    const header = document.getElementById('header');
    headerHeight.value = header.getBoundingClientRect().height;
  });

  return { heightContent, headerHeight };
}
