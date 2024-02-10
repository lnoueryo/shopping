import { test, expect } from '@playwright/test';
import * as utils from '../utils';
const { BASE_IMAGE_PATH, BASIC_SCALE_UP, waitAnimation, getStyleFromRoot, forceChangeStyle, hexToRgb } = utils;
const SEARCHBAR_SELECTOR = '#main-search-bar';
const SEARCHBAR_BUTTON_SELECTOR = SEARCHBAR_SELECTOR + ' ~ div button'
test.describe('Books', () => {
  const waitInitialDisplay = async(page) => {
    await page.goto('/books?keyword=ノーコードでつくるWebサイト　ツール選定・デザイン・制作・運用が全部わかる！');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.skeleton', { state: 'hidden' });
    await page.waitForSelector('.spinner-border', { state: 'hidden' });
  }
  test.describe('Screenshots', () => {
    let browserName: string;
    test.beforeEach(async ({ page }, testInfo) => {
      browserName = testInfo.project.name;
      await page.waitForTimeout(3000);
      // await page.on('console', msg => {
      //   console.log(`Browser console: ${msg.text()}`);
      // });
    });
    test('initial display', async ({ page }) => {
      await page.goto('/books?keyword=ノーコードでつくるWebサイト　ツール選定・デザイン・制作・運用が全部わかる！');
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('.skeleton', { state: 'hidden' });
      await page.waitForSelector('.spinner-border', { state: 'hidden' });
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/books/page.png` });
    });

    test('display loading indicator', async ({ page }) => {
      await waitInitialDisplay(page)
      await page.fill(SEARCHBAR_SELECTOR, 'javascript');
      await page.press(SEARCHBAR_SELECTOR, 'Enter');
      await page.waitForSelector('.spinner-border', { state: 'visible' });
      await page.waitForSelector('#book-list', { state: 'hidden' });
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/books/spinner.png` });
    });

    test('display offline content', async ({ page, context }) => {
      await waitInitialDisplay(page)
      await context.setOffline(true);
      if (browserName === 'Firefox') {
        await page.locator('#snackbar').check();
      }
      await waitAnimation(page, `#snackbar:checked ~ label`, 'opacity', '1');
      await page.fill(SEARCHBAR_SELECTOR, 'Web開発者のための大規模サービス技術入門');
      await page.press(SEARCHBAR_SELECTOR, 'Enter');
      await page.waitForSelector('.spinner-border', { state: 'hidden' });
      await page.waitForSelector('#error-book-result');
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/books/offline.png` });
      await context.setOffline(false);
    });

  });
});
