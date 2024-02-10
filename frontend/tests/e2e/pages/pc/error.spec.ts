import { test, expect } from '@playwright/test';
import * as utils from '../utils';
const { BASE_IMAGE_PATH, forceChangeStyle, waitAnimation, getStyleFromRoot } = utils;
test.describe('Error', () => {
  const waitInitialDisplay = async(page) => {
    await page.goto('/123');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.skeleton', { state: 'hidden' });
  }
  test.describe('Screenshots', () => {
    let browserName: string;
    test.beforeEach(async ({ page }, testInfo) => {
      browserName = testInfo.project.name;
      // await page.on('console', msg => {
      //   console.log(`Browser console: ${msg.text()}`);
      // });
    });
    test(`hover home button`, async ({ page }) => {
      await waitInitialDisplay(page)
      await page.locator('.error-container .content-padding-horizontal a').hover();
      const expectedOpacity = await getStyleFromRoot(page, '--opacity-hover');
      if (browserName === 'Firefox') {
        forceChangeStyle(page, 'main .error-container .content-padding-horizontal a', 'opacity', expectedOpacity)
      }
      console.log(expectedOpacity)
      await waitAnimation(page, '.error-container .content-padding-horizontal a', 'opacity', expectedOpacity);
      await page.screenshot({
        path: `${BASE_IMAGE_PATH}/${browserName}/error/home-button.png`,
      });
    })
  });
});
