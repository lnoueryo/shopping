import { test, expect } from '@playwright/test';
import * as utils from '../utils';
const { BASE_IMAGE_PATH, BASIC_SCALE_UP, hexToRgb, getStyleFromRoot, waitAnimation, forceChangeStyle } = utils;
const SEARCHBAR_SELECTOR = '#main-search-bar';

test.describe('Home', () => {
  const oneHundredOneStrings =
    'Ii4st7JwoSRjHHNahGp3XBW6oIdb9n4XXpx3LSsIrLhJ6Za6OWRGweL5ENXUmqGei4WiZQqSzFivVK6uZrk4UfEpPz8msYwIJ7I8R';
  const waitInitialDisplay = async(page) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.skeleton', { state: 'hidden' });
    await page.waitForSelector('#genre-content');
  }
  test.describe('Screenshots', () => {
    let browserName: string;
    test.beforeEach(async ({ page }, testInfo) => {
      browserName = testInfo.project.name;
      // await page.on('console', msg => {
      //   console.log(`Browser console: ${msg.text()}`);
      // });
    });
    test('initial display', async ({ page }) => {

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.waitForSelector('.skeleton', { state: 'hidden' });
      await page.waitForSelector('#genre-content');
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/home/page.png` });

    });
    test('focus search bar', async ({ page }) => {

      await waitInitialDisplay(page);

      await page.locator(SEARCHBAR_SELECTOR).focus();
      const expectedColor = hexToRgb(await getStyleFromRoot(page, '--color-class'));
      await waitAnimation(page, SEARCHBAR_SELECTOR, 'borderColor', expectedColor);
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/home/input-focus.png` });

    });
    test('search bar error modal', async ({ page }) => {

      await waitInitialDisplay(page)

      await page.fill(SEARCHBAR_SELECTOR, oneHundredOneStrings);
      await page.press(SEARCHBAR_SELECTOR, 'Enter');
      await page.waitForSelector('.modal-wrap input:checked ~ .modal-overlay');
      await waitAnimation(page, '.modal-overlay', 'opacity', '1');
      await page.screenshot({
        path: `${BASE_IMAGE_PATH}/${browserName}/home/warn-search-words.png`,
      });
      await page.locator('.close-button').click();
      await page.waitForSelector('.modal-wrap input ~ .modal-overlay', {hidden: true});

    });
  });
});
