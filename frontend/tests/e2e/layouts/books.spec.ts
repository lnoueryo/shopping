import { test, devices, expect } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'fs';
test.describe('Books', () => {
  const screenshotDir = './tests/e2e/screenshots';
  const chromium = 'chromium';
  const android = 'android';
  const iphone = 'iphone';

  test.describe('initial screen', () => {
    const prepareCondition = async page => {
      await page.waitForSelector('.skeleton', { state: 'hidden' });
      await page.waitForSelector('.spinner-container', { state: 'hidden' });
      const img = `${bookResultSelector} img`;
      await page.waitForSelector(img, { state: 'visible' });
      await page.waitForFunction(selector => {
        const img = document.querySelector(selector);
        return img && img.complete && img.naturalHeight !== 0;
      }, img);
      await page.fill(searchBarSelector, '');
      await page.locator(searchBarSelector).evaluate(e => e.blur());
    };
    const calculateNumDiffPixels = (currentImage, lastImagePath, diff) => {
      const lastImageBuffer = fs.readFileSync(lastImagePath);
      const lastImage = PNG.sync.read(lastImageBuffer);
      return pixelmatch(
        currentImage.data,
        lastImage.data,
        diff.data,
        currentImage.width,
        currentImage.height,
        { threshold: 0.1, diffColor: [255, 0, 0] }
      );
    };
    const createDiffImage = (project, diff, screenshotBuffer) => {
      const diffPath = `${screenshotDir}/${project}/diff/${pageName}-diff.png`;
      fs.writeFileSync(diffPath, PNG.sync.write(diff));
      const currentImagePath = `${screenshotDir}/${project}/diff/${pageName}.png`;
      fs.writeFileSync(currentImagePath, screenshotBuffer);
    };
    const ENDPOINT =
      '/books?keyword=良いコード／悪いコードで学ぶ設計入門&rate=4&levels=beginner';
    const THRESHOLD = 10;
    const pageName = 'books-page';
    const bookResultSelector = '#book-result';
    const searchBarSelector = 'header .header-middle-container input';

    test('Verify initial display on PC', async ({ page }) => {
      const project = test.info().project.name;
      if (project === 'webkit') return;
      await page.goto(ENDPOINT);
      await prepareCondition(page);
      const screenshotBuffer = await page.screenshot();
      const lastImagePath = `${screenshotDir}/${project}/${pageName}.png`;

      const currentImage = PNG.sync.read(screenshotBuffer);

      if (!fs.existsSync(lastImagePath))
        fs.writeFileSync(lastImagePath, screenshotBuffer);
      const diff = new PNG({
        width: currentImage.width,
        height: currentImage.height,
      });
      const numDiffPixels = calculateNumDiffPixels(
        currentImage,
        lastImagePath,
        diff
      );

      if (numDiffPixels > THRESHOLD)
        createDiffImage(project, diff, screenshotBuffer);

      expect(numDiffPixels).toBeLessThanOrEqual(THRESHOLD);
    });
    test('Verify initial display on android', async ({ browser }) => {
      const project = test.info().project.name;
      if (project !== chromium) return;
      const context = await browser.newContext({
        ...devices['Pixel 5'],
      });
      const page = await context.newPage();
      await page.goto(ENDPOINT);
      await prepareCondition(page);
      const screenshotBuffer = await page.screenshot();
      const lastImagePath = `${screenshotDir}/${android}/${pageName}.png`;

      const currentImage = PNG.sync.read(screenshotBuffer);

      if (!fs.existsSync(lastImagePath))
        fs.writeFileSync(lastImagePath, screenshotBuffer);
      const diff = new PNG({
        width: currentImage.width,
        height: currentImage.height,
      });
      const numDiffPixels = calculateNumDiffPixels(
        currentImage,
        lastImagePath,
        diff
      );

      if (numDiffPixels > THRESHOLD)
        createDiffImage(android, diff, screenshotBuffer);

      expect(numDiffPixels).toBeLessThanOrEqual(THRESHOLD);
    });
    test('Verify initial display on iphone', async ({ browser }) => {
      const project = test.info().project.name;
      if (project !== chromium) return;
      const context = await browser.newContext({
        ...devices['iPhone 12'],
      });
      const page = await context.newPage();
      await page.goto(ENDPOINT);
      await prepareCondition(page);
      const screenshotBuffer = await page.screenshot();
      const lastImagePath = `${screenshotDir}/${iphone}/${pageName}.png`;

      const currentImage = PNG.sync.read(screenshotBuffer);

      if (!fs.existsSync(lastImagePath))
        fs.writeFileSync(lastImagePath, screenshotBuffer);
      const diff = new PNG({
        width: currentImage.width,
        height: currentImage.height,
      });
      const numDiffPixels = calculateNumDiffPixels(
        currentImage,
        lastImagePath,
        diff
      );

      if (numDiffPixels > THRESHOLD)
        createDiffImage(iphone, diff, screenshotBuffer);

      expect(numDiffPixels).toBeLessThanOrEqual(THRESHOLD);
    });
    // TODO スマホのfilterオープン時のスクリーンショット
    // TODO 現状スクリーンショットが保存されてない
  });
});
