import { test, expect } from '@playwright/test';
import { skillLevelsData } from '/app/assets/js/skill-levels';
import * as utils from '../utils';
const { BASE_IMAGE_PATH, BASIC_SCALE_UP, waitAnimation, getStyleFromRoot, forceChangeStyle, hexToRgb, waitAnimationByText } = utils;
const SEARCHBAR_SELECTOR = '#main-search-bar';
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
      await page.on('console', msg => {
        console.log(`Browser console: ${msg.text()}`);
      });
    });

    test('activate ratings', async ({ page }) => {
      await waitInitialDisplay(page)
      const ratingFourSelector = '#main-content .bookfilter-container fieldset.rate-form label:nth-child(3)';
      await page.locator(ratingFourSelector).hover();
      const expectedColor = hexToRgb(await getStyleFromRoot(page, '--color-hover-rating', ratingFourSelector));
      if (browserName === 'Firefox') {
        forceChangeStyle(page, ratingFourSelector, 'color', expectedColor)
      }
      await waitAnimation(page, ratingFourSelector, 'color', expectedColor);
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/books/rating-hover.png` });

      await page.locator(ratingFourSelector).click();
      const _expectedColor = hexToRgb('#ffd24c');
      if (browserName === 'Firefox') {
        forceChangeStyle(page, ratingFourSelector, 'color', _expectedColor)
      }
      await waitAnimation(page, ratingFourSelector, 'color', _expectedColor);
      await page.waitForSelector('.spinner-border', { state: 'hidden' });
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/books/rating-active.png` });
    });

    test('activate skill levels', async ({ page }) => {
      await waitInitialDisplay(page)
      const skillLevelFirstSelector = '#main-content .bookfilter-container fieldset:not(.rate-form) .next-space label';
      const skillLevelsElements = skillLevelsData.map(level => {
        const title = level.title.charAt(0).toUpperCase() + level.title.slice(1);
        return page.locator(skillLevelFirstSelector).filter({ hasText: title })
      })
      await page.locator(skillLevelFirstSelector).filter({hasText: 'Beginner'}).hover();
      const expectedOpacity = await getStyleFromRoot(page, '--opacity-hover', skillLevelFirstSelector);
      if (browserName === 'Firefox') {
        forceChangeStyle(page, skillLevelFirstSelector, 'opacity', expectedOpacity)
      }
      await waitAnimation(page, skillLevelFirstSelector, 'opacity', expectedOpacity);
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/books/skill-level-hover.png` });


      for (let i = 0; i < skillLevelsElements.length; i++) {
        const skillLevel = skillLevelsElements[i];
        const expectedColorVar = hexToRgb(await getStyleFromRoot(page, skillLevelsData[i].color)); // CSS変数名
        const title = skillLevelsData[i].title.charAt(0).toUpperCase() + skillLevelsData[i].title.slice(1);

        await skillLevel.click();
        await waitAnimationByText(page, skillLevelFirstSelector, title, 'backgroundColor', expectedColorVar)

      }

      await page.waitForSelector('.spinner-border', { state: 'hidden' });
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/books/skill-level-active.png` });
    });

    test('hover genre selector', async ({ page }) => {
      await waitInitialDisplay(page)

      await page.locator('#sidebar').getByText('design').hover();
      if (browserName === 'Firefox') {
        forceChangeStyle(page, '#sidebar .genre-content', 'transform', BASIC_SCALE_UP)
      }
      await waitAnimation(page, '#sidebar .genre-content', 'transform', BASIC_SCALE_UP);
      await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/books/genre-hover.png` });
    });

  });
});
