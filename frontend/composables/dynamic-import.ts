export function useDynamicImport() {
  const route = useRoute();
  const router = useRouter();
  const isFailedImport = ref(false);

  const createOptions = (
    options = { lodingComponent: null, errorComponent: null, delay: 200 }
  ) => {
    const { lodingComponent, errorComponent, delay } = options;
    return {
      lodingComponent,
      errorComponent,
      delay,
    };
  };

  const loadDynamicComponent = (
    excutedImportFunc: Promise<typeof import('*.vue')>,
    timeout: number = 5000
  ) => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Loading timeout'));
      }, timeout);
      excutedImportFunc
        .then(module => {
          clearTimeout(timer);
          resolve(module);
        })
        .catch(error => {
          clearTimeout(timer); // エラーが発生したらタイムアウトをキャンセル
          reject(error);
        });
    });
  };

  const errorDynamicComponent = (errorFunc = goToErrorPage) => {
    return errorFunc;
  };

  const goToErrorPage = (
    error: Error,
    retry: () => void,
    fail: () => Error,
    attempts: number
  ) => {
    console.error('dynamic component');
    if (!navigator.onLine)
      throw createError({
        statusCode: 503,
        statusMessage: 'No Internet Connection',
      });
    if (isFailedImport.value) return (isFailedImport.value = false);
    const MAX_DELAY = 30000;
    const maxAttempts = 10;
    const baseDelay = 1000;

    if (error.message.includes('timeout') || attempts >= maxAttempts) {
      isFailedImport.value = true;
      return router.push({ path: '/error', query: { next: route.fullPath } });
    }
    const delay = Math.min(baseDelay * 2 ** (attempts - 1), MAX_DELAY);
    setTimeout(() => {
      retry();
    }, delay);
  };

  return { loadDynamicComponent, createOptions, errorDynamicComponent };
}
