import { config } from '@vue/test-utils';
import { readdirSync } from 'fs';
import path from 'path';
import { vi } from 'vitest';
import * as utils from '@/utils';
import { definePageMeta } from '@/node_modules/.pnpm/nuxt@3.8.2_@types+node@20.10.4_eslint@8.55.0_sass@1.69.5_typescript@5.3.3_vite@5.0.6/node_modules/nuxt/dist/pages/runtime/composables';
import { useError } from '#app/composables/error';

async function registerGlobalComponents() {
  const componentsDir = path.resolve(process.cwd(), 'components/global');
  const filenames = readdirSync(componentsDir);
  for (const filename of filenames) {
    const componentName = filename.replace(/\.\w+$/, '');
    const componentPath = path.resolve(componentsDir, filename);
    const componentConfig = await import(componentPath);
    config.global.components[componentName] = componentConfig.default;
  }
}

vi.stubGlobal('useError', () => {
  return useError;
});

vi.stubGlobal('definePageMeta', () => {
  return definePageMeta;
});

Object.keys(utils).forEach(functionName => {
  vi.stubGlobal(functionName, () => {
    return utils[functionName];
  });
});
vi.stubGlobal('useRuntimeConfig', () => {
  return {
    RAKUTEN_APP_ID: process.env.RAKUTEN_APP_ID,
    RAKUTEN_API_ENDPOINT: process.env.RAKUTEN_API_ENDPOINT,
    public: {
      BASE_IMAGE_PATH: process.env.BASE_IMAGE_PATH || '/images',
      MODE: process.env.MODE || 'development',
    },
  };
});
await registerGlobalComponents();
