import { test } from '@playwright/test';
import * as utils from '../utils';
const {
  BASE_IMAGE_PATH,
  BASIC_SCALE_UP,
  hexToRgb,
  getStyleFromRoot,
  waitAnimation,
  forceChangeStyle,
  createFileName,
} = utils;
let browserName: string;
let fileName: string;
const waitInitialDisplay = async page => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('.skeleton', { state: 'hidden' });
  await page.waitForSelector('#genre-content');
};
test.describe('Home', () => {
  test.beforeEach(async ({}, testInfo) => {
    browserName = testInfo.project.name;
    fileName = createFileName(testInfo);
    // await page.on('console', msg => {
    //   console.log(`Browser console: ${msg.text()}`);
    // });
  });

  test('01_hover_nav_bar', async ({ page }) => {
    await waitInitialDisplay(page);

    await page.getByText('Frontend').hover();
    const expectedColor = hexToRgb(
      await getStyleFromRoot(page, '--color-base-quaternary')
    );
    if (browserName === 'firefox') {
      forceChangeStyle(page, '#frontend', 'backgroundColor', expectedColor);
    }
    await waitAnimation(page, '#frontend', 'backgroundColor', expectedColor);
    await page.screenshot({
      path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}`,
    });
  });

  test('02_hover_genre_selector', async ({ page }) => {
    await waitInitialDisplay(page);

    await page.getByText('design').hover();
    if (browserName === 'firefox') {
      forceChangeStyle(page, '.genre-content', 'transform', BASIC_SCALE_UP);
    }
    await waitAnimation(page, '.genre-content', 'transform', BASIC_SCALE_UP);
    await page.screenshot({
      path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}`,
    });
  });

  test('03_hover_search_button', async ({ page }) => {
    await waitInitialDisplay(page);

    await page.locator('button.magnify').hover();
    if (browserName === 'firefox') {
      forceChangeStyle(page, '.magnify-icon', 'transform', BASIC_SCALE_UP);
    }
    await waitAnimation(page, '.magnify-icon', 'transform', BASIC_SCALE_UP);
    await page.screenshot({
      path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}`,
    });
  });
});
