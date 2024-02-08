import { nextTick, watch } from 'vue';
import { useStore } from '@/stores';

export function useInitialConfig() {
  // cache pages
  preloadRouteComponents('/error');
  preloadRouteComponents('/books');

  const OFFLINE_MESSAGE = 'The network connection has been lost';
  const OFFLINE_COLOR = 'var(--color-error)';
  const ONLINE_MESSAGE = 'You are now connected to the network';
  const ONLINE_COLOR = 'var(--color-class-name)';

  const store = useStore();

  watch(
    () => store.isHeaderReady,
    () => {
      store.initializeLayoutDimensions();
      store.applyTheme();
    }
  );
  watch(
    () => store.theme,
    (newTheme: string) => store.updateTheme(newTheme)
  );

  const onConnectionChanged = (message: string, color: string) => {
    return () => {
      store.snackbar.show = true;
      store.snackbar.message = message;
      store.snackbar.color = color;
    };
  };

  const InitializeConfig = async () => {
    window.addEventListener('resize', store.updateDimensions);
    window.pageYOffset = 0;
    store.updateDimensions();
    window.addEventListener(
      'offline',
      onConnectionChanged(OFFLINE_MESSAGE, OFFLINE_COLOR)
    );
    window.addEventListener(
      'online',
      onConnectionChanged(ONLINE_MESSAGE, ONLINE_COLOR)
    );
    await nextTick();
  };

  const resetConfig = () => {
    window.removeEventListener('resize', store.updateDimensions);
    window.removeEventListener(
      'offline',
      onConnectionChanged(OFFLINE_MESSAGE, OFFLINE_COLOR)
    );
    window.removeEventListener(
      'online',
      onConnectionChanged(ONLINE_MESSAGE, ONLINE_COLOR)
    );
  };

  return { InitializeConfig, resetConfig };
}
