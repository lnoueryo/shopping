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

    test('hover nav bar', async ({ page }) => {

      await waitInitialDisplay(page)

      await page.getByText('Frontend').hover();
      const expectedColor = hexToRgb(await getStyleFromRoot(page, '--color-base-quaternary'));
      if (browserName === 'Firefox') {
        forceChangeStyle(page, '#frontend', 'backgroundColor', expectedColor)
      }
      await waitAnimation(page, '#frontend', 'backgroundColor', expectedColor);
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/home/nav-hover.png` });

    });

    test('hover genre selector', async ({ page }) => {

      await waitInitialDisplay(page);

      await page.getByText('design').hover();
      if (browserName === 'Firefox') {
        forceChangeStyle(page, '.genre-content', 'transform', BASIC_SCALE_UP)
      }
      await waitAnimation(page, '.genre-content', 'transform', BASIC_SCALE_UP);
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/home/genre-hover.png` });

    });

    test('hover search button', async ({ page }) => {

      await waitInitialDisplay(page);

      await page.locator('button.magnify').hover();
      if (browserName === 'Firefox') {
        forceChangeStyle(page, '.magnify-icon', 'transform', BASIC_SCALE_UP)
      }
      await waitAnimation(page, '.magnify-icon', 'transform', BASIC_SCALE_UP);
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/home/search-button-hover.png` });

    });

  });
});
