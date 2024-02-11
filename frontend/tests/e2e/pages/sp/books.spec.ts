// TODO スマホのfilterオープン時のスクリーンショット
import { test } from '@playwright/test';
import { skillLevelsData } from '../../../../assets/js/skill-levels';
import * as utils from '../utils';
const { BASE_IMAGE_PATH, BASIC_SCALE_UP, waitAnimation, getStyleFromRoot, forceChangeStyle, hexToRgb, waitAnimationByText, createFileName } = utils;
let browserName: string;
let fileName: string;

test.describe('Books', () => {
  const FilterAccordionLabelSelector = '#float-filter label.label';
  const FilterAccordionContentSelector = FilterAccordionLabelSelector + ' ~ div.content';
  const waitInitialDisplay = async(page) => {
    await page.goto('/books?keyword=ノーコードでつくるWebサイト　ツール選定・デザイン・制作・運用が全部わかる！');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.skeleton', { state: 'hidden' });
    await page.waitForSelector('.spinner-border', { state: 'hidden' });
  }
  const waitAccordionOpen = async(page) => {
    await page.locator(FilterAccordionLabelSelector).click();
    const vh = await getStyleFromRoot(page, '--vh')
    await waitAnimation(page, FilterAccordionContentSelector, 'maxHeight', ((Number(vh.replace('px', '')) * 100) - 120 - 40) + 'px');
    await page.waitForSelector('.spinner-border', { state: 'hidden' });
    await page.waitForSelector('#server-error', {state: 'hidden'});
  }
  test.beforeEach(async ({ page }, testInfo) => {
    browserName = testInfo.project.name;
    fileName = createFileName(testInfo);
    await page.waitForTimeout(3000);
    await page.on('console', msg => {
      console.log(`Browser console: ${msg.text()}`);
    });
  });

  test('01_open_accordion', async ({ page }) => {
    await waitInitialDisplay(page)
    const vh = await getStyleFromRoot(page, '--vh')
    await waitAnimation(page, FilterAccordionContentSelector, 'maxHeight', ((Number(vh.replace('px', '')) * 100) - 120 - 40) + 'px');
    await page.waitForSelector('.spinner-border', { state: 'hidden' });
    await page.waitForSelector('#server-error', {state: 'hidden'});
    await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}` });
  });

  test('02_activate_ratings', async ({ page }) => {
    await waitInitialDisplay(page)
    await waitAccordionOpen(page)
    const ratingFourSelector = `${FilterAccordionContentSelector} fieldset.rate-form label:nth-child(3)`;
    await page.locator(ratingFourSelector).click();
    const expectedColor = hexToRgb('#ffd24c');
    if (browserName === 'firefox') {
      forceChangeStyle(page, ratingFourSelector, 'color', expectedColor)
    }
    await waitAnimation(page, ratingFourSelector, 'color', expectedColor);
    await page.waitForSelector('.spinner-border', { state: 'hidden' });
    await page.waitForSelector('#server-error', {state: 'hidden'});
    await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}` });
  });

  test('03_activate_skill_levels', async ({ page }) => {
    await waitInitialDisplay(page)
    await waitAccordionOpen(page)
    const skillLevelFirstSelector = `${FilterAccordionContentSelector} fieldset:not(.rate-form) label.next-space`;
    const skillLevelsElements = skillLevelsData.map(level => {
      const title = level.title.charAt(0).toUpperCase() + level.title.slice(1);
      return page.locator(skillLevelFirstSelector).filter({ hasText: title })
    })

    for (let i = 0; i < skillLevelsElements.length; i++) {
      const skillLevel = skillLevelsElements[i];
      const expectedColorVar = hexToRgb(await getStyleFromRoot(page, skillLevelsData[i].color));
      const title = skillLevelsData[i].title.charAt(0).toUpperCase() + skillLevelsData[i].title.slice(1);

      await skillLevel.click();
      await waitAnimationByText(page, skillLevelFirstSelector, title, 'backgroundColor', expectedColorVar)

    }

    await page.waitForSelector('.spinner-border', { state: 'hidden' });
    await page.waitForSelector('#error-book-result', {state: 'hidden'});
    await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}` });
  });

  test.only('04_activate_genre_selector', async ({ page }) => {
    await waitInitialDisplay(page);
    await waitAccordionOpen(page);
    const selector = `${FilterAccordionContentSelector} fieldset button[aria-label="search book by Design genre"]`;
    await page.locator(selector).click();
    const expectedColor = hexToRgb(await getStyleFromRoot(page, '--color-text-selection'));

    // ボタンの背景色が期待する色に変わるまで待機
    await page.waitForFunction(([selector, expectedColor]) => {
      const element = document.querySelector(selector);
      return window.getComputedStyle(element).backgroundColor === expectedColor;
    }, [selector, expectedColor]);
    await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}` });
  });

});
