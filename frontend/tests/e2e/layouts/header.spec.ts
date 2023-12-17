import { test, expect, chromium, firefox, webkit } from '@playwright/test';
import { navigationData } from '../../../assets/js/navigation';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'fs';
test.describe('header', () => {
  test.beforeEach(async ({ page }) => {
    await page.waitForTimeout(2000);
  });
  test.describe('Redirect to Home', () => {
    test('Verify has logo', async ({ page }) => {
      await page.goto('/');
      const logoSelector = '#logo';
      await page.waitForSelector(logoSelector);
      const bodyContent = await page.textContent('body');
      expect(bodyContent).toContain('Webtech');
      expect(bodyContent).toContain('Bookstore');
      expect(bodyContent).toContain('{}');
    });

    test('Verify redirect to the Home when the logo is clicked', async ({
      page,
    }) => {
      await page.goto('/books'); // 初期URLを設定
      const booksUrl = page.url();
      const booksRelativePath = new URL(booksUrl).pathname;
      expect(booksRelativePath).toBe('/books');
      // await page.screenshot({ path: 'screenshot1.png' });
      const logoSelector = '#logo';
      await page.waitForSelector(logoSelector);
      await page.click(logoSelector);
      await page.waitForFunction(url => window.location.pathname === url, '/', {
        timeout: 30000,
      });
      const homeUrl = page.url();
      const homeRelativePath = new URL(homeUrl).pathname;
      expect(homeRelativePath).toBe('/');
      // await page.screenshot({ path: 'screenshot2.png' });
    });

    test('Verify redirect to the Home when the logo is clicked on the Home', async ({
      page,
    }) => {
      await page.goto('/');
      const logoSelector = '#logo';
      await page.waitForSelector(logoSelector);
      await page.click(logoSelector);
      const homeUrl = page.url();
      const homeRelativePath = new URL(homeUrl).pathname;
      expect(homeRelativePath).toBe('/');
    });
  });
  test.describe('Engineer-Specific Roadmap Page Transition', () => {
    test.beforeEach(async ({ page, isMobile }) => {
      await page.goto('/');
    });
    test('Verify navigation items', async ({ page }) => {
      const navSelector = 'nav';
      await page.waitForSelector(navSelector);
      const navContent = await page.textContent(navSelector);
      for (const item of navigationData) {
        expect(navContent).toContain(item.title);
      }
    });

    test('Verify go to them when pages are clicked', async ({ page }) => {
      for (const item of navigationData) {
        await page.goto('/');
        const navItemSelector = `#${item.id}`;
        await page.waitForSelector(navItemSelector);
        await page.click(navItemSelector);
        const to = item.to === 'javascript:void(0)' ? '/' : item.to;
        await page.waitForFunction(
          url => window.location.pathname === url,
          to,
          { timeout: 3000 }
        );
        const url = page.url();
        const relativePath = new URL(url).pathname;
        expect(relativePath).toBe(to);
      }
    });
  });
  test.describe('Search Book By Keyword', () => {
    test.beforeEach(async ({ page, isMobile }) => {
      await page.goto('/');
    });
    const searchBarSelector = 'header input';
    const searchBarButtonSelector = 'header .search-button';
    const bookResultSelector = '#book-result';
    const generateRandomString = (length) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    }
    const testNavigation = async(browserType, func) => {
      const browser = await browserType.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await func(page, context)
      await browser.close();
    }
    test('Verify search book by enter', async ({ page }) => {
      const bookName = '良いコード／悪いコードで学ぶ設計入門';
      await page.waitForSelector(searchBarSelector);
      await page.fill(searchBarSelector, bookName);
      await page.press(searchBarSelector, 'Enter');
      await page.waitForSelector(bookResultSelector);
      const url = page.url();
      const relativePath = new URL(url).pathname + new URL(url).search;
      const parts = bookName.split('/').map(part => encodeURIComponent(part));
      const encodedText = parts.join('/');
      expect(relativePath).toBe(`/books?keyword=${encodedText}`);
      const bookResultContent = await page.textContent(bookResultSelector);
      expect(bookResultContent).toContain(bookName);
    });

    test('Verify search book by click', async ({ page }) => {
      const bookName = '良いコード／悪いコードで学ぶ設計入門';
      await page.waitForSelector(searchBarSelector);
      await page.fill(searchBarSelector, bookName);
      await page.click(searchBarButtonSelector);
      await page.waitForSelector(bookResultSelector);
      const url = page.url();
      const relativePath = new URL(url).pathname + new URL(url).search;
      const parts = bookName.split('/').map(part => encodeURIComponent(part));
      const encodedText = parts.join('/');
      expect(relativePath).toBe(`/books?keyword=${encodedText}`);
      const bookResultContent = await page.textContent(bookResultSelector);
      expect(bookResultContent).toContain(bookName);
    });

    test('Verify search book without keyword', async ({ page }) => {
      const bookName = '';
      await page.waitForSelector(searchBarSelector);
      await page.fill(searchBarSelector, bookName);
      await page.press(searchBarSelector, 'Enter');

      const url = page.url();
      expect(new URL(url).pathname).toBe(`/`);
      await page.click(searchBarButtonSelector);
      const _url = page.url();
      expect(new URL(_url).pathname).toBe(`/`);
    });

    test('Verify search book with keywords longer than 101 characters', async ({ page }) => {
      const bookName = generateRandomString(101);
      await page.waitForSelector(searchBarSelector);
      await page.fill(searchBarSelector, bookName);
      await page.press(searchBarSelector, 'Enter');

      const url = page.url();
      expect(new URL(url).pathname).toBe(`/`);
      const modalSelector = '.modal-content';
      const modalCloseSelector = '.close-button';
      await page.waitForSelector(modalSelector);
      const modalContent = page.locator(modalSelector);
      await expect(modalContent).toBeVisible();
      const closeButton = modalContent.locator(modalCloseSelector);
      await closeButton.click();
      await expect(modalContent).not.toBeVisible();
    });

    test('Verify search book without result', async ({ page }) => {
      const bookName = generateRandomString(100);
      await page.waitForSelector(searchBarSelector);
      await page.fill(searchBarSelector, bookName);
      await page.press(searchBarSelector, 'Enter');
      await page.waitForSelector(bookResultSelector);
      const url = page.url();
      const relativePath = new URL(url).pathname + new URL(url).search;
      const parts = bookName.split('/').map(part => encodeURIComponent(part));
      const encodedText = parts.join('/');
      expect(relativePath).toBe(`/books?keyword=${encodedText}`);
      const errorSelector = '#no-book-result'
      await page.waitForSelector(errorSelector);
      const errorContent = page.locator(errorSelector);
      await expect(errorContent).toBeVisible();
    });

    test('Verify search book offline', async () => {
      const testOrder = async(page, context) => {
        const bookName = '良いコード／悪いコードで学ぶ設計入門';
        await page.goto(`/books?keyword=${bookName}`);
        await page.waitForSelector(bookResultSelector);
        await context.setOffline(true);
        await page.press(searchBarSelector, 'Enter');

        const errorSelector = '#offline'
        await page.waitForSelector(errorSelector);
        const errorContent = page.locator(errorSelector);
        await expect(errorContent).toBeVisible();
        await context.setOffline(false);
      }

      for (const browser of [chromium, firefox, webkit]) {
        await testNavigation(browser, testOrder)
      }
    });

    test('Verify search book with the query parameter genre included', async ({page}) => {
      const rate = '4';
      await page.goto(`/books?rate=${rate}&genre=001005003003`);
      const bookName = '良いコード／悪いコードで学ぶ設計入門';
      await page.waitForSelector(searchBarSelector);
      await page.fill(searchBarSelector, bookName);
      await page.click(searchBarButtonSelector);
      await page.waitForSelector(bookResultSelector);
      const currentUrl = page.url();
      const urlObj = new URL(currentUrl);
      const queryParams = urlObj.searchParams;

      expect(queryParams.has('keyword')).toBeTruthy();
      expect(queryParams.has('rate')).toBeTruthy();
      expect(queryParams.get('rate')).toBe(rate);
      expect(queryParams.has('genre')).toBeFalsy();
    });

  });

  test.describe('Fixed search bar', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 400, height: 600 })
    });

    test('Verify search bar exists on SP', async ({ page }) => {
      await page.goto('/books?genre=001005005');
      await page.waitForSelector('#book-result');
      await page.evaluate(() => window.scrollBy(0, 500));

      const searchBarIsVisible = await page.isVisible('#main-search-bar');
      expect(searchBarIsVisible).toBeTruthy();
    });

    test('Verify search bar is at original position', async ({ page }) => {
      await page.goto('/books?genre=001005005');
      await page.waitForSelector('#book-result');

      const screenshotBufferBefore = await page.screenshot();
      const imgBefore = PNG.sync.read(screenshotBufferBefore);

      await page.evaluate(() => window.scrollBy(0, 500));
      await page.evaluate(() => window.scrollBy(0, -500));

      const searchBarIsVisible = await page.isVisible('#main-search-bar');
      expect(searchBarIsVisible).toBeTruthy();

      const screenshotBufferAfter = await page.screenshot();
      const imgAfter = PNG.sync.read(screenshotBufferAfter);

      const diff = new PNG({ width: imgBefore.width, height: imgBefore.height });

      const numDiffPixels = pixelmatch(
        imgBefore.data, imgAfter.data, diff.data, imgBefore.width, imgBefore.height,
        { threshold: 0.1, diffColor: [255, 0, 0] }
      );
      if (numDiffPixels > 0) {
        fs.writeFileSync('diff.png', PNG.sync.write(diff));
        fs.writeFileSync('before.png', screenshotBufferBefore);
        fs.writeFileSync('after.png', screenshotBufferAfter);
      }

      expect(numDiffPixels).toBe(0);
    });

  });
});
