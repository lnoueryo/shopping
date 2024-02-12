import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        // presets
        'vue',
        'vue-router',
      ],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/vitest/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    setupFiles: ['tests/vitest/setup.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '/'),
      // '#app': resolve(__dirname, './.nuxt/nuxt.d.ts'),
      '#app': resolve(__dirname, 'node_modules/.pnpm/nuxt@3.8.2_@types+node@20.10.4_eslint@8.55.0_sass@1.69.5_typescript@5.3.3_vite@5.0.6/node_modules/nuxt/dist/app'),
    },
  },
});
