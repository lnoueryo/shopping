import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useBooksStore } from '@/stores/books';
vi.mock('#app', () => ({
  useNuxtApp: () => ({
    provide: () => {},
    $mainRef: {
      value: document.createElement('div'),
    },
  }),
}));

describe('Books Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    global.window.scrollTo = (x, y) => {
      window.pageXOffset = x;
      window.pageYOffset = y;
    };
  });

  const books = [
    {
      title: 'Test',
      author: 'Tester',
      isbn: '123456789',
      price: 3180,
      thumbnail: 'https://example.com',
      publisher: 'Test Company',
      publish_date: '2023/12/20',
      description: 'test test test',
      rating: 4.3,
    },
  ];

  describe('fetchBooksData', () => {
    it('Verify Fetch Books', async () => {
      const mockFetch = () => {
        expect(store.errorType).toBe('');
        expect(store.isLoading).toBe(true);
        return Promise.resolve({
          books,
        });
      };
      global.$fetch = mockFetch;
      const store = useBooksStore();
      expect(store.isLoading).toBe(false);
      await store.fetchBooksData();
      expect(store.isLoading).toBe(false);
      expect(store.booksData).toStrictEqual(books);
    });

    it('Verify Error by Timeout', async () => {
      const mockFetch = () => {
        throw 'timeout';
        return Promise.resolve({
          books,
        });
      };
      global.$fetch = mockFetch;
      const store = useBooksStore();
      expect(store.isLoading).toBe(false);
      await store.fetchBooksData();
      expect(store.isLoading).toBe(false);
      expect(store.errorType).toBe('timeout');
    });

    it('Verify Error by Offline', async () => {
      const mockFetch = () => {
        throw 'Internal Server Error';
        return Promise.resolve({
          books,
        });
      };
      global.$fetch = mockFetch;
      const store = useBooksStore();
      expect(store.isLoading).toBe(false);
      await store.fetchBooksData();
      expect(store.isLoading).toBe(false);
      expect(store.errorType).toBe('server');
    });

    it('Verify Error by Offline', async () => {
      Object.defineProperty(window, 'navigator', {
        value: { onLine: false },
        writable: true,
      });
      const store = useBooksStore();
      expect(store.isLoading).toBe(false);
      await store.fetchBooksData();
      expect(store.isLoading).toBe(false);
      expect(store.errorType).toBe('offline');
    });
  });
  // updateQuery(query: { [key: string]: string | number }) {
  //   const cacheQuery = JSON.stringify(this.query);
  //   this.query = { ...query };
  //   if ('rate' in query === false) this.query['rate'] = 0;
  //   else this.query['rate'] = this.query['rate'] = Number(query.rate)
  //   if ('levels' in query === false) this.query['levels'] = [];
  //   else if(typeof query.levels === 'string') this.query['levels'] = new Array(query.levels);
  //   if ('genre' in query === false) this.query['genre'] = '';
  //   if ('keyword' in query === false) this.query['keyword'] = '';
  //   if (cacheQuery !== JSON.stringify(this.query)) this.fetchBooksData();
  // },
  describe('updateQuery', () => {
    const originalQuery = {
      keyword: '',
      genre: '',
      rate: 0,
      levels: [],
    };
    it('Verify update keyword', async () => {
      const query = {
        keyword: 'test',
      };
      const store = useBooksStore();
      store.fetchBooksData = vi.fn();
      expect(store.query).toStrictEqual({ ...originalQuery });
      expect(store.fetchBooksData).toHaveBeenCalledTimes(0);
      await store.updateQuery(query);
      expect(store.query).toStrictEqual({ ...originalQuery, ...query });
      expect(store.fetchBooksData).toHaveBeenCalledTimes(1);
    });
    it('Verify update keyword and rate', async () => {
      const query = {
        keyword: 'test',
        rate: 3,
      };
      const store = useBooksStore();
      store.fetchBooksData = vi.fn();
      expect(store.query).toStrictEqual({ ...originalQuery });
      expect(store.fetchBooksData).toHaveBeenCalledTimes(0);
      await store.updateQuery(query);
      expect(store.query).toStrictEqual({ ...originalQuery, ...query });
      expect(store.fetchBooksData).toHaveBeenCalledTimes(1);
    });
    it('Verify update keyword, rate and levels', async () => {
      const query = {
        keyword: 'test',
        rate: 3,
        levels: ['beginner'],
      };
      const store = useBooksStore();
      store.fetchBooksData = vi.fn();
      expect(store.query).toStrictEqual({ ...originalQuery });
      expect(store.fetchBooksData).toHaveBeenCalledTimes(0);
      await store.updateQuery(query);
      expect(store.query).toStrictEqual({ ...originalQuery, ...query });
      expect(store.fetchBooksData).toHaveBeenCalledTimes(1);
    });
  });
});
