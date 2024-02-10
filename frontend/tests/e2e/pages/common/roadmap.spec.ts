import { test, expect } from '@playwright/test';
import { navigationData } from '/app/assets/js/navigation';
import * as utils from '../utils';
const { BASE_IMAGE_PATH } = utils;
test.describe('Roadmap', () => {
  test.describe('Screenshots', () => {
    let browserName: string;
    test.beforeEach(async ({ page }, testInfo) => {
      browserName = testInfo.project.name;
      // await page.on('console', msg => {
      //   console.log(`Browser console: ${msg.text()}`);
      // });
    });
    for (const navigation of navigationData) {
      if (!navigation.to) return;
      test(`initial display ${navigation.title}`, async ({ page }) => {
        await page.goto(navigation.to);
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('.skeleton', { state: 'hidden' });
        await page.screenshot({
          path: `${BASE_IMAGE_PATH}/${browserName}/[id]/${navigation.id}.png`,
        });
      })
    }
  });
});
