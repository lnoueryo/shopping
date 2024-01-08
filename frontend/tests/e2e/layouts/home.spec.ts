import { test, devices, expect } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'fs';
test.describe('Home', () => {
  const screenshotDir = './tests/e2e/screenshots';
  const chromium = 'chromium';
  const android = 'android';
  const iphone = 'iphone';

  test.beforeEach(async ({ page }) => {
    await page.waitForTimeout(1000);
  });
  test.describe('initial screen', () => {
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
      const diffPath = `${screenshotDir}/${project}/diff/home-page-diff.png`;
      fs.writeFileSync(diffPath, PNG.sync.write(diff));
      const currentImagePath = `${screenshotDir}/${project}/diff/home-page.png`;
      fs.writeFileSync(currentImagePath, screenshotBuffer);
    };
    test('Verify initial display on PC', async ({ page }) => {
      const project = test.info().project.name;
      if (project === 'webkit') return;
      await page.goto('/');
      await page.waitForSelector('.skeleton', { state: 'hidden' });
      const screenshotBuffer = await page.screenshot();
      const lastImagePath = `${screenshotDir}/${project}/home-page.png`;

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

      if (numDiffPixels > 0) createDiffImage(project, diff, screenshotBuffer);

      expect(numDiffPixels).toBe(0);
    });
    test('Verify initial display on android', async ({ browser }) => {
      const project = test.info().project.name;
      if (project !== chromium) return;
      const context = await browser.newContext({
        ...devices['Pixel 5'],
      });
      const page = await context.newPage();
      await page.goto('/');
      await page.waitForSelector('.skeleton', { state: 'hidden' });
      const screenshotBuffer = await page.screenshot();
      const lastImagePath = `${screenshotDir}/${android}/home-page.png`;

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

      if (numDiffPixels > 0) createDiffImage(android, diff, screenshotBuffer);

      expect(numDiffPixels).toBe(0);
    });
    test('Verify initial display on iphone', async ({ browser }) => {
      const project = test.info().project.name;
      if (project !== chromium) return;
      // await page.setViewportSize({ width: 370, height: 600 });
      const context = await browser.newContext({
        ...devices['iPhone 12'],
      });
      const page = await context.newPage();
      await page.goto('/');
      await page.waitForSelector('.skeleton', { state: 'hidden' });
      const screenshotBuffer = await page.screenshot();
      const lastImagePath = `${screenshotDir}/${iphone}/home-page.png`;

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

      if (numDiffPixels > 0) createDiffImage(iphone, diff, screenshotBuffer);

      expect(numDiffPixels).toBe(0);
    });
  });
});
