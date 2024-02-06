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
      '#app': resolve(__dirname, './.nuxt/nuxt.d.ts'),
    },
  },
});
