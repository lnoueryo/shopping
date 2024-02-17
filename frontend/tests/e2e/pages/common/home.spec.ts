import { test } from '@playwright/test';
import * as utils from '../utils';
const {
  BASE_IMAGE_PATH,
  hexToRgb,
  getStyleFromRoot,
  waitAnimation,
  createFileName,
} = utils;
const SEARCHBAR_SELECTOR = '#main-search-bar';
let browserName: string;
let fileName: string;
test.describe('Home', () => {
  const oneHundredOneStrings =
    'Ii4st7JwoSRjHHNahGp3XBW6oIdb9n4XXpx3LSsIrLhJ6Za6OWRGweL5ENXUmqGei4WiZQqSzFivVK6uZrk4UfEpPz8msYwIJ7I8R';
  const waitInitialDisplay = async page => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.skeleton', { state: 'hidden' });
    await page.waitForSelector('#genre-content');
  };
  test.beforeEach(async (_, testInfo) => {
    browserName = testInfo.project.name;
    fileName = createFileName(testInfo);
    // await page.on('console', msg => {
    //   console.log(`Browser console: ${msg.text()}`);
    // });
  });
  test('01_page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('.skeleton', { state: 'hidden' });
    await page.waitForSelector('#genre-content');
    await page.screenshot({
      path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}`,
    });
  });
  test('02_focus_search_bar', async ({ page }) => {
    await waitInitialDisplay(page);

    await page.locator(SEARCHBAR_SELECTOR).focus();
    const expectedColor = hexToRgb(
      await getStyleFromRoot(page, '--color-class')
    );
    await waitAnimation(page, SEARCHBAR_SELECTOR, 'borderColor', expectedColor);
    await page.screenshot({
      path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}`,
    });
  });
  test('03_search_bar_error_modal', async ({ page }) => {
    await waitInitialDisplay(page);

    await page.fill(SEARCHBAR_SELECTOR, oneHundredOneStrings);
    await page.press(SEARCHBAR_SELECTOR, 'Enter');
    await page.waitForSelector('.modal-wrap input:checked ~ .modal-overlay');
    await waitAnimation(page, '.modal-overlay', 'opacity', '1');
    await page.screenshot({
      path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}`,
    });
    await page.locator('.close-button').click();
    await page.waitForSelector('.modal-wrap input ~ .modal-overlay', {
      hidden: true,
    });
  });
});
