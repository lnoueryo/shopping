import { test } from '@playwright/test';
import * as utils from '../utils';
const { BASE_IMAGE_PATH, waitAnimation, createFileName } = utils;
const SEARCHBAR_SELECTOR = '#main-search-bar';
let browserName: string;
let fileName: string;
test.describe('Books', () => {
  const waitInitialDisplay = async(page) => {
    await page.goto('/books?keyword=ノーコードでつくるWebサイト　ツール選定・デザイン・制作・運用が全部わかる！');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.skeleton', { state: 'hidden' });
    await page.waitForSelector('.spinner-border', { state: 'hidden' });
  }
  test.beforeEach(async ({ page }, testInfo) => {
    browserName = testInfo.project.name;
    fileName = createFileName(testInfo);
    await page.waitForTimeout(3000);
    // await page.on('console', msg => {
    //   console.log(`Browser console: ${msg.text()}`);
    // });
  });

  test('01_page', async ({ page }) => {
    await page.goto('/books?keyword=ノーコードでつくるWebサイト　ツール選定・デザイン・制作・運用が全部わかる！');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.skeleton', { state: 'hidden' });
    await page.waitForSelector('.spinner-border', { state: 'hidden' });
    await page.waitForSelector('#server-error', {state: 'hidden'});
    await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}` });
  });

  test('02_book_list_spinner', async ({ page }) => {
    await waitInitialDisplay(page)
    await page.fill(SEARCHBAR_SELECTOR, 'javascript');
    await page.press(SEARCHBAR_SELECTOR, 'Enter');
    await page.waitForSelector('#book-result .spinner-container .spinner-border', { state: 'visible' });
    await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}` });
  });

  test('03_offline', async ({ page, context }) => {
    await waitInitialDisplay(page)
    await context.setOffline(true);
    if (browserName === 'firefox') {
      await page.locator('#snackbar').check();
    }
    await waitAnimation(page, `#snackbar:checked ~ label`, 'opacity', '1');
    await page.fill(SEARCHBAR_SELECTOR, 'Web開発者のための大規模サービス技術入門');
    await page.press(SEARCHBAR_SELECTOR, 'Enter');
    await page.waitForSelector('#error-book-result');
    await page.waitForSelector('.spinner-border', { state: 'hidden' });
    await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}` });
    await context.setOffline(false);
  });
});
