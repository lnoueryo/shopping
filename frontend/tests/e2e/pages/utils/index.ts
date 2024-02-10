export const BASE_IMAGE_PATH = `./tests/e2e/pages/screenshots/${process.env.GITHUB_REF_NAME}`;
export const BASIC_SCALE_UP = `matrix(1.15, 0, 0, 1.15, 0, 0)`;
export const hexToRgb = (hex: string) => {
  if (!hex) return;
  hex = hex.replace(/^#/, '');
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

export const getStyleFromRoot = async(page, value: string, selector: string = '') => {
  return await page.evaluate(({value, selector}) => {
    const el = selector ? document.querySelector(selector) : document.documentElement;
    return getComputedStyle(el).getPropertyValue(value.replace(/^var\((--[^)]+)\)$/, '$1')).trim();
  }, { value, selector });
}

export const waitAnimation = async(page, selector: string, style: string, expect: string) => {
  return await page.waitForFunction(
    ({selector, expect, style}: {selector: string, style: string, expect: string}) => {
      const value = window.getComputedStyle(document.querySelector(selector))[style];
      // console.log('expect: ', expect, 'value: ', value)
      return value === expect;
    },
    {selector, expect, style}
  );
}

export const waitAnimationByText = async(page, selector: string, title: string, style: string, expect: string) => {
  return await page.waitForFunction(
    ({selector, title, expect, style}: {selector: string, title: string, style: string, expect: string}) => {
      const element = Array.from(document.querySelectorAll(selector)).find(el => el.textContent.includes(title));
      if (!element) return false;
      const value = getComputedStyle(element)[style];
      console.log('value: ', value, 'expect: ', expect)
      return value === expect;
    },
    {selector, title, expect, style}
  );
}

export const forceChangeStyle = async(page, selector, style, value) => {
  await page.evaluate(({selector, style, value}) => {
    const el = document.querySelector(selector);
    el.style[style] = value;
  }, {selector, style, value})
}

