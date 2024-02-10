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
    test(`initial display`, async ({ page }) => {
      await page.goto('/123');
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('.skeleton', { state: 'hidden' });
      await page.screenshot({
        path: `${BASE_IMAGE_PATH}/${browserName}/error/page.png`,
      });
    })

  });
});
