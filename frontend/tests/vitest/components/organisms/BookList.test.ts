import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import BookList from '@/components/organisms/BookList.vue';
import { createTestingPinia } from '@pinia/testing';
import { deviceSize } from '@/assets/js/device-size';
vi.stubGlobal('useRuntimeConfig', () => {
  return {
    public: {
      BASE_IMAGE_PATH: '/images/',
    },
  };
});
const books = [
  {
    title: 'まとめて学ぶ Python＆JavaScript',
    author: '伊尾木 将之',
    isbn: '000001',
    price: 3520,
    thumbnail:
      'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/0252/9784296200252_1_2.jpg?_ex=200x200',
    publisher: '日経BP',
    publish_date: '2022年11月18日頃',
    description: '',
    rating: 0,
  },
  {
    title: 'Python／JavaScriptによるOpen AIプログラミング',
    author: '掌田津耶乃',
    isbn: '000002',
    price: 2420,
    thumbnail:
      'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/5416/9784899775416_1_2.jpg?_ex=200x200',
    publisher: 'ラトルズ',
    publish_date: '2023年08月22日頃',
    description:
      '最強の武器“ＯｐｅｎＡＩ　ＡＰＩ”であなたのプログラムをＡＩ化しよう！ＣｈａｔＧＰＴ開発元が提供するＡＩモデル利用のためのＡＰＩを使い、アプリやサービスに高度なＡＩ機能をＰｙｔｈｏｎ／ＪａｖａＳｃｒｉｐｔによるプログラミングで組み込む方法を分かりやすく解説。また、Ｐｏｗｅｒ　Ａｕｔｏｍａｔｅ、ＰｏｗｅｒＡｐｐｓ、Ａｐｐｓｈｅｅｔ、ＣｌｉｃｋなどのノーコードツールやＥｘｃｅｌ／ＯｆｆｉｃｅスクリプトやＧｏｏｇｌｅ　Ａｐｐ　ＳｃｒｉｐｔからＡＰＩを利用する方法も解説します。プログラマからオフィスユーザーまで幅広く利用して頂ける書籍です。',
    rating: 3,
  },
  {
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
  },
];

describe('BookList', () => {
  const createPinia = state => {
    return createTestingPinia({
      initialState: {
        index: { width: deviceSize.desktop },
        books: state,
      },
    });
  };
  const createRouterInstance = () => {
    return createRouter({
      history: createWebHistory(),
      routes: [],
    });
  };
  describe('Display BookList', () => {
    it('Render Correctly', async () => {
      Element.prototype.scrollTo = () => {};
      const state = { bookList: { books, page: 1, page_count: 1, count: 3 } };
      const wrapper = mount(BookList, {
        global: {
          plugins: [createRouterInstance(), createPinia(state)],
        },
      });

      const bookItems = wrapper.findAllComponents({ name: 'BookItem' });
      expect(bookItems.length).toBe(books.length);
      for (const [index, bookItem] of bookItems.entries()) {
        const book = books[index];
        expect(bookItem.text()).toMatch(book.title);
        expect(bookItem.text()).toMatch(book.author);
        expect(bookItem.text()).toMatch(String(book.price));
        expect(bookItem.text()).toMatch(book.publisher);
        expect(bookItem.text()).toMatch(book.publish_date);
        if (book.description) expect(bookItem.text()).toMatch(book.description);
        expect(bookItem.text()).toMatch(String(book.rating));
        const spinner = bookItem.findComponent({ name: 'Spinner' });
        expect(spinner.exists()).toBeTruthy();
        bookItem.vm.isLoading = false;
        await bookItem.vm.$nextTick();
        const img = bookItem.find('img');
        expect(img.element.src).toBe(book.thumbnail);
      }
      const pageInfos = wrapper.findAllComponents({ name: 'PageInfo' });
      expect(pageInfos.length).toBe(2);
      const pagination = wrapper.findComponent({ name: 'Pagination' });
      expect(pagination.exists()).toBeTruthy();
    });
    it('Render No Result', async () => {
      const state = { booksData: [] };
      const wrapper = mount(BookList, {
        global: {
          plugins: [createRouterInstance(), createPinia(state)],
        },
      });
      const bookItems = wrapper.findAllComponents({ name: 'BookItem' });
      expect(bookItems.length).toBe(0);
      const noBookResult = wrapper.findComponent({ name: 'NoBookResult' });
      expect(noBookResult.exists()).toBeTruthy();
    });
    it('Render Error', async () => {
      const errorTypes = ['offline', 'timeout', 'server'];
      const components = {
        offline: '#offline',
        timeout: '#connection-error',
        server: '#server-error',
      };
      const state = { booksData: [] };
      const wrapper = mount(BookList, {
        global: {
          plugins: [createRouterInstance(), createPinia(state)],
        },
      });
      const bookItems = wrapper.findAllComponents({ name: 'BookItem' });
      expect(bookItems.length).toBe(0);

      for (const errorType of errorTypes) {
        wrapper.vm.booksStore.errorType = errorType;
        await nextTick();
        const errorComponent = wrapper.find(components[errorType]);
        expect(errorComponent.exists()).toBeTruthy();
      }
    });
  });
});
