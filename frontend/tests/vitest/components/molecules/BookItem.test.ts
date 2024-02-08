import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { deviceSize } from '@/assets/js/device-size.js';
import BookItem from '@/components/molecules/BookItem.vue';
import Spinner from '@/components/global/Spinner.vue';
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';

const book = {
  width: deviceSize.desktop,
  title: 'Python と JavaScriptではじめるデータビジュアライゼーション',
  author: 'Kyran Dale/嶋田 健志/木下 哲也',
  isbn: '000003',
  price: 4180,
  thumbnail:
    'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/8086/9784873118086.jpg?_ex=200x200',
  publisher: 'オライリー・ジャパン',
  publish_date: '2017年08月25日頃',
  description:
    'Ｗｅｂからデータを取得して、効率よく整理、分析を行い効果的な可視化を実現するには、さまざまなツールとテクニックが必要です。本書ではＰｙｔｈｏｎとＪａｖａＳｃｒｉｐｔを使い分け、それぞれの言語の強みを最大限利用します。ＰｙｔｈｏｎのＢｅａｕｔｉｆｕｌＳｏｕｐとＳｃｒａｐｙでデータを取得、ｐａｎｄａｓ、Ｍａｔｐｌｏｔｌｉｂ，Ｎｕｍｐｙでデータ処理を行い、Ｆｌａｓｋフレームワークを使ってデータを配信、ＪａｖａＳｃｒｉｐｔのＤ３．ｊｓを使ってインタラクティブなＷｅｂ可視化を実現します。データの収集からアウトプットまでの全体を視野に入れて解説しているので、実際にコードを追いながら、この一冊でデータ分析プロセスの全体像を理解できます。',
  rating: 3.5,
};
const createPinia = state => {
  return createTestingPinia({
    initialState: {
      index: state,
    },
  });
};
describe('BookItem', () => {
  describe('Display BookItem', () => {
    it('Render Correctly', async () => {
      const bookItem = createBookItem(book);
      expect(bookItem.text()).toMatch(book.title);
      expect(bookItem.text()).toMatch(book.author);
      expect(bookItem.text()).toMatch(String(book.price));
      expect(bookItem.text()).toMatch(book.publisher);
      expect(bookItem.text()).toMatch(book.publish_date);
      if (book.description) expect(bookItem.text()).toMatch(book.description);
      expect(bookItem.text()).toMatch(String(book.rating));
      expect(bookItem.findComponent(Spinner).exists()).toBeTruthy();
      bookItem.vm.isLoading = false;
      await nextTick();
      const img = bookItem.find('img');
      expect(img.element.src).toBe(book.thumbnail);
      expect(bookItem.findComponent(Spinner).exists()).toBeFalsy();
    });
    it('Render Correctly on SP', async () => {
      const bookItem = createBookItem({
        ...book,
        width: deviceSize.mobile - 1,
      });
      expect(bookItem.text()).toMatch(book.title);
      expect(bookItem.text()).toMatch(book.author);
      expect(bookItem.text()).toMatch(String(book.price));
      expect(bookItem.text()).toMatch(book.publisher);
      expect(bookItem.text()).toMatch(book.publish_date);
      expect(bookItem.text()).not.toMatch(book.description);
      expect(bookItem.text()).toMatch(String(book.rating));
      expect(bookItem.findComponent(Spinner).exists()).toBeTruthy();
      bookItem.vm.isLoading = false;
      await nextTick();
      const img = bookItem.find('img');
      expect(img.element.src).toBe(book.thumbnail);
      expect(bookItem.findComponent(Spinner).exists()).toBeFalsy();
    });
  });

  describe('Behavior', () => {
    it('Verify rating is read-only', async () => {
      const bookItem = createBookItem(book);
      const ratings = bookItem.findAll('input');
      await ratings[0].trigger('click');
      await flushPromises();
      expect(bookItem.vm.rate).toBe(book.rating);
    });
  });
});
interface Book {
  width: number;
  title: string;
  author: string;
  isbn: string;
  price: number;
  thumbnail: string;
  publisher: string;
  publish_date: string;
  description: string;
  rating: number;
}
const createBookItem = (bookData: Book) => {
  return mount(BookItem, {
    props: bookData,
    global: {
      plugins: [createPinia({ width: 1200 })],
    },
  });
};
