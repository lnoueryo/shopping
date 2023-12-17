import { defineConfig, devices } from '@playwright/test';
import path from 'path'

const PORT = process.env.PORT || 3000
const baseURL = `http://127.0.0.1:${PORT}`
console.log(baseURL)
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // CI環境ではtest.onlyを禁止
  retries: process.env.CI ? 2 : 1, // CI環境では2回リトライ
  workers: process.env.CI ? 1 : 3, // CI環境ではワーカー数を2に制限

  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm build && node ./.output/server/index.mjs',
    url: baseURL,
    timeout: 150000, // タイムアウトを60秒に延長
    reuseExistingServer: !process.env.CI,
  },
});
