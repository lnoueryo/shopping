import { test } from '@playwright/test';
import * as utils from '../utils';
const { BASE_IMAGE_PATH, createFileName } = utils;
let browserName: string;
let fileName: string;
test.describe('Error', () => {
  test.beforeEach(async (_, testInfo) => {
    browserName = testInfo.project.name;
    fileName = createFileName(testInfo);
    // await page.on('console', msg => {
    //   console.log(`Browser console: ${msg.text()}`);
    // });
  });
  test(`01_page`, async ({ page }) => {
    await page.goto('/123');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.skeleton', { state: 'hidden' });
    await page.screenshot({
      path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}`,
    });
  });
});
