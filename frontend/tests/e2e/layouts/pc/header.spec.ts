import { test, expect } from '@playwright/test';
import { navigationData } from '../../../../assets/js/navigation';

test.describe('header', () => {
  test.describe('Redirect to Home', () => {
    test('Verify has logo', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
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
      await page.goto('/books');
      await page.waitForLoadState('networkidle');
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
      await page.waitForLoadState('networkidle');
      const logoSelector = '#logo';
      await page.waitForSelector(logoSelector);
      await page.click(logoSelector);
      const homeUrl = page.url();
      const homeRelativePath = new URL(homeUrl).pathname;
      expect(homeRelativePath).toBe('/');
    });
  });
  test.describe('Engineer-Specific Roadmap Page Transition', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('.skeleton', { state: 'hidden' });
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
        if (item.to) {
          await page.goto('/');
          await page.waitForLoadState('networkidle');
          await page.waitForSelector('.skeleton', { state: 'hidden' });
          const navItemSelector = `#${item.id}`;
          await page.waitForSelector(navItemSelector);
          await page.click(navItemSelector);
          await page.waitForFunction(
            url => window.location.pathname === url,
            item.to,
            { timeout: 3000 }
          );
          const url = page.url();
          const relativePath = new URL(url).pathname;
          expect(relativePath).toBe(item.to);
        }
      }
    });
  });
  test.describe('Search Book By Keyword', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('.skeleton', { state: 'hidden' });
    });
    const searchBarSelector = 'header input';
    const searchBarButtonSelector = 'header .search-button';
    const bookResultSelector = '#book-result';
    test('Verify search book by enter', async ({ page }) => {
      const bookName = '良いコード／悪いコードで学ぶ設計入門';
      await page.waitForSelector(searchBarSelector);
      await page.fill(searchBarSelector, bookName);
      await page.press(searchBarSelector, 'Enter');
      await page.waitForLoadState('networkidle');
      await page.waitForSelector(bookResultSelector);
      await page.waitForSelector('.spinner-container', { state: 'hidden' });
      const url = page.url();
      const { searchParams } = new URL(url);
      expect(searchParams.get('keyword')).toBe(bookName);
      expect(searchParams.get('page')).toBe('1');
      const bookResultContent = await page.textContent(bookResultSelector);
      expect(bookResultContent).toContain(bookName);
    });

    test('Verify search book by click', async ({ page }) => {
      const bookName = '良いコード／悪いコードで学ぶ設計入門';
      await page.waitForSelector(searchBarSelector);
      await page.fill(searchBarSelector, bookName);
      await page.click(searchBarButtonSelector);
      await page.waitForLoadState('networkidle');
      await page.waitForSelector(bookResultSelector);
      await page.waitForSelector('.spinner-container', { state: 'hidden' });
      const url = page.url();
      const { searchParams } = new URL(url);
      expect(searchParams.get('keyword')).toBe(bookName);
      expect(searchParams.get('page')).toBe('1');
      const bookResultContent = await page.textContent(bookResultSelector);
      expect(bookResultContent).toContain(bookName);
    });
  });

  test.describe('Fixed search bar', () => {
    test.beforeEach(async ({ page }, testInfo) => {
      if (!testInfo.project.name.includes('mobile')) test.skip();
      await page.setViewportSize({ width: 400, height: 600 });
    });

    test('Verify search bar exists on SP', async ({ page }) => {
      await page.goto('/books?genre=001005005');
      await page.waitForSelector('#book-result');
      await page.evaluate(() => window.scrollBy(0, 500));

      const searchBarIsVisible = await page.isVisible('#main-search-bar');
      expect(searchBarIsVisible).toBeTruthy();
    });
  });
});

// TODO 1.シナリオテスト。EndPointからEndPointまでの一連の流れ。
// TODO 2.ブラウザの挙動。動きはコンポーネントテストで確認できない。
// TODO 3.スタイルの確認。見て確認したほうが確実に良い。
// TODO 4.ミドルウェアやAPIの挙動
