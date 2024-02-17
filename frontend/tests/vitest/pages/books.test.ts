import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Books from '@/pages/books/index.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import { genreData } from '@/assets/js/genres.js';
import { skillLevelsData } from '@/assets/js/skill-levels.js';
import { deviceSize } from '@/assets/js/device-size';
const createPinia = state => {
  return createTestingPinia({
    initialState: {
      index: state,
      books: {
        bookList: createBookList(1),
        isLoading: false,
      },
    },
  });
};
const createRouterInstance = () => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/books',
        name: 'books',
        component: Books,
      },
      {
        path: '/error',
        name: 'error',
      },
    ],
  });
};
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

for (let i = 0; i < 5; i++) {
  books.push(...books);
}

const createBookList = page => {
  const maxBooks = 30;
  const count = books.length;
  const page_count =
    books.length % maxBooks === 0
      ? books.length / maxBooks
      : Math.ceil(books.length / maxBooks);
  const first = 1 + maxBooks * (page - 1);
  const last = page === page_count ? count : page * maxBooks;
  return {
    books,
    page,
    first,
    last,
    page_count,
    count,
  };
};
describe('/books', () => {
  describe('Visit', () => {
    it(`verify change query parameters`, async () => {
      const generateRandom = (max: number) => {
        return Math.floor(Math.random() * max);
      };
      const path = '/books';

      const excuteTest = async () => {
        const query = {
          page: 1,
          genre: '001005003003',
        };
        const excutePage = async () => {
          const randomNum = generateRandom(Math.ceil(books.length / 30));
          const length = randomNum + 1;
          const bookList = wrapper.findComponent({ name: 'BookList' });
          const pagination = bookList.findComponent({ name: 'Pagination' });
          const page = pagination.find(`#page-buttons #button-${length}`);
          await page.trigger('click');
          store.state.value.books.bookList = createBookList(length);
          query['page'] = length;
        };
        const excuteGenre = async () => {
          const randomNum = generateRandom(genreData.length);
          const genre = wrapper.find(
            `button[aria-label="${genreData[randomNum].title} genre"]`
          );
          await genre.trigger('click');
          if (query['genre'] === genreData[randomNum].id) return;

          query['genre'] = genreData[randomNum].id;
          query['page'] = 1;
          store.state.value.books.bookList = createBookList(1);
        };
        const excuteRate = async () => {
          const randomNum = generateRandom(5);
          const rating = wrapper.findComponent({ name: 'Rating' });
          const ratingInputs = rating.findAll('input[type="radio"]');
          if (ratingInputs[randomNum].element.value === '5') return;
          await ratingInputs[randomNum].trigger('click');
          store.state.value.books.bookList = createBookList(1);
          if (
            'rate' in query &&
            String(query['rate']) ===
              String(ratingInputs[randomNum].element.value)
          ) {
            delete query['rate'];
          } else {
            query['rate'] = ratingInputs[randomNum].element.value;
          }
          query['page'] = 1;
        };
        const excuteLevels = async () => {
          const randomNum = generateRandom(skillLevelsData.length);
          const skillLevelChips = wrapper.findComponent({
            name: 'SkillLevelChips',
          });
          const skillLevelChipInputs = skillLevelChips.findAll(
            'input[type="checkbox"]'
          );
          if (skillLevelChipInputs[randomNum].element.checked) {
            await skillLevelChipInputs[randomNum].setChecked(false);
          } else {
            await skillLevelChipInputs[randomNum].setChecked(true);
          }
          if (skillLevelChips.vm.selectedSkillLevels.length === 0) {
            delete query['levels'];
          } else {
            query['levels'] = skillLevelChips.vm.selectedSkillLevels;
          }
          store.state.value.books.bookList = createBookList(1);
          query['page'] = 1;
        };
        const router = createRouterInstance();
        const store = createPinia({
          width: deviceSize.smallDesktop,
          isHeaderReady: true,
        });
        await router.push({ path, query });
        expect(router.currentRoute.value.path).toBe(path);
        const wrapper = mount(Books, {
          global: {
            plugins: [router, store],
          },
        });
        const searchQueryKeys = [
          excutePage,
          excuteGenre,
          excuteRate,
          excuteLevels,
        ];
        for (let i = 0; i < 40; i++) {
          const randomNum = generateRandom(searchQueryKeys.length);
          await searchQueryKeys[randomNum]();
          await flushPromises();
          expect(router.currentRoute.value.path).toBe(path);
          expect(router.currentRoute.value.query.genre).toBe(query.genre);
          if ('rate' in query)
            expect(router.currentRoute.value.query.rate).toBe(query.rate);
          else expect('rate' in query).toBeFalsy();
          if ('levels' in query)
            expect(router.currentRoute.value.query.levels).toEqual(
              query.levels
            );
          else expect('levels' in query).toBeFalsy();
          expect(Number(router.currentRoute.value.query.page)).toBe(query.page);
        }
      };
      const promiseTests = Array(10)
        .fill()
        .map(() => excuteTest());
      await Promise.all(promiseTests);
    }, 120000);
  });
});
