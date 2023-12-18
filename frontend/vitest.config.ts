import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'

// Vitestの設定を追加
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
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '/'), // ここを適切なソースディレクトリに置き換えてください
    },
  },
});
