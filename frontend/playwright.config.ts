import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
const checkVersionFormat = version => {
  const versionPattern = /^release-\d+\.\d+\.\d+$/;
  return versionPattern.test(version);
};
const PORT = process.env.PORT || 3000;
const release = checkVersionFormat(process.env.GITHUB_REF_NAME);
const baseURL = `http://127.0.0.1:${PORT}`;
const mainBrowsers = [
  {
    name: 'Chrome',
    use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    testMatch: ['/common/*.spec.ts', '/pc/*.spec.ts'],
  },

  {
    name: 'Firefox',
    use: { ...devices['Desktop Firefox'] },
    testMatch: ['/common/*.spec.ts', '/pc/*.spec.ts'],
  },

  {
    name: 'Safari',
    use: { ...devices['Desktop Safari'] },
    testMatch: ['/common/*.spec.ts', '/pc/*.spec.ts'],
  },

  {
    name: 'Edge',
    use: { ...devices['Desktop Edge'], channel: 'msedge' },
    testMatch: ['/common/*.spec.ts', '/pc/*.spec.ts'],
  },

  /* Test against mobile viewports. */
  {
    name: 'Mobile Chrome',
    use: { ...devices['Pixel 5'] },
    testMatch: ['/common/*.spec.ts', '/sp/*.spec.ts'],
  },
  {
    name: 'Mobile Safari',
    use: { ...devices['iPhone 12'] },
    testMatch: ['/common/*.spec.ts', '/sp/*.spec.ts'],
  },

  {
    name: 'comparison',
    testMatch: '/*.comparison.ts',
  },
];

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: release ? `./tests/e2e/pages` : './tests/e2e/layouts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // CI環境ではtest.onlyを禁止
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 3,

  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: mainBrowsers,

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm build && node ./.output/server/index.mjs',
    url: baseURL,
    timeout: 150000, // タイムアウトを60秒に延長
    reuseExistingServer: !process.env.CI,
  },
});

const createPageScreenshotDir = () => {
  const screenshotDir = `./tests/e2e/pages/screenshots/${process.env.GITHUB_REF_NAME}`;
  const paths = [
    'home',
    'books',
    '[id]',
  ]
  if (!fs.existsSync(`${screenshotDir}/diff`)) {
    fs.mkdirSync(`${screenshotDir}/diff`, { recursive: true });
  }
  for (const browser of mainBrowsers) {
    if (browser.name === 'comparison') return;
    for (const path of paths) {
      if (!fs.existsSync(`${screenshotDir}/${browser.name}/${path}`)) {
        fs.mkdirSync(`${screenshotDir}/${browser.name}/${path}`, { recursive: true });
      }
    }
  }
};

createPageScreenshotDir();
