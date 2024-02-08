import { test } from '@playwright/test';
import { navigationData } from '/app/assets/js/navigation';
test.describe('Screenshots', () => {
  const BASE_IMAGE_PATH = './tests/e2e/pages/screenshots/';
  const searchBarSelector = '#main-search-bar';
  const oneHundredOneStrings =
    'Ii4st7JwoSRjHHNahGp3XBW6oIdb9n4XXpx3LSsIrLhJ6Za6OWRGweL5ENXUmqGei4WiZQqSzFivVK6uZrk4UfEpPz8msYwIJ7I8R';
  test.beforeEach(async ({ page }) => {
    await page.waitForTimeout(1000);
  });
  test.describe('PC', () => {
    test('home', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('.skeleton');
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/home/skeleton.png` });
      await page.waitForSelector('.skeleton', { state: 'hidden' });
      await page.waitForSelector('#genre-content');
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/home/page.png` });
      await page.fill(searchBarSelector, oneHundredOneStrings);
      await page.press(searchBarSelector, 'Enter');
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('.modal-wrap input:checked ~ .modal-overlay');
      await page.waitForFunction(
        () =>
          window.getComputedStyle(document.querySelector('.modal-overlay'))
            .opacity === '1',
        { timeout: 1000 } // タイムアウトを1秒に設定して少し余裕を持たせる
      );
      await page.screenshot({
        path: `${BASE_IMAGE_PATH}/home/warn-search-words.png`,
      });
    });
    test('roadmaps', async ({ page }) => {
      for (const navigation of navigationData) {
        await page.goto(navigation.to);
        await page.waitForSelector('.skeleton', { state: 'hidden' });
        await page.screenshot({
          path: `${BASE_IMAGE_PATH}/${navigation.id}/page.png`,
        });
      }
    });
    test('books', async ({ page, context }) => {
      await page.goto('/books?keyword=python');
      await page.waitForSelector('.skeleton');
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/books/skeleton.png` });
      await page.waitForSelector('.skeleton', { state: 'hidden' });
      await page.waitForSelector('.spinner-border');
      await page.waitForSelector('.spinner-border', { state: 'hidden' });
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/books/page.png` });
      await page.fill(searchBarSelector, 'javascript');
      await page.press(searchBarSelector, 'Enter');
      await page.waitForSelector('.spinner-border');
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/books/spinner.png` });
      await page.waitForSelector('.spinner-border', { state: 'hidden' });
      await context.setOffline(true);
      await page.fill(searchBarSelector, 'java');
      await page.press(searchBarSelector, 'Enter');
      await page.waitForSelector('#error-book-result');
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/books/offline.png` });
      await context.setOffline(false);
      // click genre and screen shot
      // click rating and skill level and screen shot
      // offline, search error's weak reception's screen shot
    });
    // test('Verify initial display on iphone', async ({ browser }) => {
    //   const project = test.info().project.name;
    //   if (project !== 'chromium') return;
    //   // await page.setViewportSize({ width: 370, height: 600 });
    //   const context = await browser.newContext({
    //     ...devices['iPhone 12'],
    //   });
    //   const page = await context.newPage();
    //   await page.goto('/');
    //   await page.waitForSelector('.skeleton', { state: 'hidden' });
    //   const screenshotBuffer = await page.screenshot();
    //   const lastImagePath = `${screenshotDir}/${iphone}/home-page.png`;

    //   const currentImage = PNG.sync.read(screenshotBuffer);

    //   if (!fs.existsSync(lastImagePath))
    //     fs.writeFileSync(lastImagePath, screenshotBuffer);
    //   const diff = new PNG({
    //     width: currentImage.width,
    //     height: currentImage.height,
    //   });
    //   const numDiffPixels = calculateNumDiffPixels(
    //     currentImage,
    //     lastImagePath,
    //     diff
    //   );

    //   if (numDiffPixels > 0) createDiffImage(iphone, diff, screenshotBuffer);

    //   expect(numDiffPixels).toBe(0);
    // });
  });
});
