import { test } from '@playwright/test';
import * as utils from '../utils';
const {
  BASE_IMAGE_PATH,
  forceChangeStyle,
  waitAnimation,
  getStyleFromRoot,
  createFileName,
} = utils;
let browserName: string;
let fileName: string;
const waitInitialDisplay = async page => {
  await page.goto('/123');
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('.skeleton', { state: 'hidden' });
};
test.describe('Error', () => {
  test.beforeEach(async (_, testInfo) => {
    browserName = testInfo.project.name;
    fileName = createFileName(testInfo);
    // await page.on('console', msg => {
    //   console.log(`Browser console: ${msg.text()}`);
    // });
  });
  test(`01_hover_home_button`, async ({ page }) => {
    await waitInitialDisplay(page);
    await page
      .locator('.error-container .content-padding-horizontal a')
      .hover();
    const expectedOpacity = await getStyleFromRoot(page, '--opacity-hover');
    if (browserName === 'firefox') {
      forceChangeStyle(
        page,
        'main .error-container .content-padding-horizontal a',
        'opacity',
        expectedOpacity
      );
    }
    console.log(expectedOpacity);
    await waitAnimation(
      page,
      '.error-container .content-padding-horizontal a',
      'opacity',
      expectedOpacity
    );
    await page.screenshot({
      path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}`,
    });
  });
});
