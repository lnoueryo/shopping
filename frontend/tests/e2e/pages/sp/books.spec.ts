// TODO スマホのfilterオープン時のスクリーンショット
import { test } from '@playwright/test';
import { skillLevelsData } from '../../../../assets/js/skill-levels';
import * as utils from '../utils';
const { BASE_IMAGE_PATH, waitAnimation, getStyleFromRoot, forceChangeStyle, hexToRgb, waitAnimationByText, createFileName } = utils;
let browserName: string;
let fileName: string;

test.describe('Books', () => {
  const FilterAccordionLabelSelector = '#float-filter label.label';
  const FilterAccordionContentSelector = FilterAccordionLabelSelector + ' ~ div.content';
  const waitInitialDisplay = async(page, path = '/books?keyword=ノーコードでつくるWebサイト　ツール選定・デザイン・制作・運用が全部わかる！') => {
    await page.goto(path);
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
    await waitAccordionOpen(page)
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
    const skillLevelFirstSelector = `${FilterAccordionContentSelector} fieldset:not(.rate-form) .next-space label`;
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

  test('04_activate_genre_selector', async ({ page }) => {
    await waitInitialDisplay(page);
    await waitAccordionOpen(page);
    const selector = `${FilterAccordionContentSelector} fieldset button[aria-label="Design genre"]`;
    await page.locator(selector).click();
    const expectedColor = hexToRgb(await getStyleFromRoot(page, '--color-text-selection'));

    // ボタンの背景色が期待する色に変わるまで待機
    await page.waitForFunction(([selector, expectedColor]) => {
      const element = document.querySelector(selector);
      console.log(window.getComputedStyle(element).backgroundColor, expectedColor);
      return window.getComputedStyle(element).backgroundColor === expectedColor;
    }, [selector, expectedColor]);
    await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}` });
  });

  test('05_float_search_bar', async ({ page }) => {
    const path = '/books?keyword=clean+co&page=1';
    await waitInitialDisplay(page, path);
    await page.waitForSelector(FilterAccordionLabelSelector);
    const heightContent = await getStyleFromRoot(page, '--height-content');
    const scrollY = heightContent.replace('px', '') * 2;
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), scrollY);
    await page.waitForFunction((scrollY) => {
      console.log(window.scrollY)
      return window.scrollY === scrollY;
    }, scrollY)
    await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}` });
  });

  test('06_hide_float_filter', async ({ page }) => {
    const path = '/books?keyword=clean+co&page=1';
    await waitInitialDisplay(page, path);
    const heightContent = await getStyleFromRoot(page, '--height-content');
    const scrollY = heightContent.replace('px', '') * 3 + 1;
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), scrollY);
    await page.waitForFunction((scrollY) => {
      console.log(window.scrollY)
      return window.scrollY === scrollY;
    }, scrollY)
    const floatAccordionSelector = '.float-menu';
    const expect = 0;
    await page.waitForFunction(({selector, expect}) => {
      const el = document.querySelector(selector);
      return el.getBoundingClientRect().top === expect;
    }, {selector: floatAccordionSelector, expect})
    await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}` });
  });

  test('07_show_float_filter', async ({ page }) => {
    const path = '/books?keyword=clean+co&page=1';
    await waitInitialDisplay(page, path);
    await page.evaluate(() => {
      let el = document.documentElement;
      let bottom = el.scrollHeight - el.clientHeight;
      window.scroll(0, bottom);
    });
    await page.waitForFunction(() => {
      let el = document.documentElement;
      let bottom = el.scrollHeight - el.clientHeight;
      return window.scrollY === bottom;
    })
    await page.evaluate(() => {
      let el = document.documentElement;
      let bottom = el.scrollHeight - el.clientHeight - 10;
      window.scroll(0, bottom);
    });
    await page.waitForFunction(() => {
      let el = document.documentElement;
      let bottom = el.scrollHeight - el.clientHeight - 10;
      return window.scrollY === bottom;
    })
    const floatAccordionSelector = '.float-menu';
    const expect = await getStyleFromRoot(page, '--height-content');
    await page.waitForFunction(({selector, expect}) => {
      const el = document.querySelector(selector);
      return el.getBoundingClientRect().top === Number(expect.replace('px', ''));
    }, {selector: floatAccordionSelector, expect})
    await page.screenshot({ path: `${BASE_IMAGE_PATH}/${browserName}/${fileName}` });
  });

});
