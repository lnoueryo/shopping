import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useBooksStore } from '@/stores/books';

const mockElement = {
  style: {height: '100px'},
};
global.document.getElementById = vi.fn(() => mockElement);

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
      const store = useBooksStore();
      const mockFetch = () => {
        expect(store.errorType).toBe('');
        expect(store.isLoading).toBe(true);
        return Promise.resolve({
          books,
        });
      };
      global.$fetch = mockFetch;
      expect(store.isLoading).toBe(false);
      await store.fetchBooksData();
      expect(store.isLoading).toBe(false);
      expect(store.bookList.books).toStrictEqual(books);
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

  describe('updateQuery', () => {
    const originalQuery = {
      keyword: '',
      genre: '',
      rate: 0,
      levels: [],
      page: 1,
    };
    it('Verify update keyword', async () => {
      const query = {
        keyword: 'test',
        page: 1,
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
        page: 1,
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
        page: 2,
      };
      const store = useBooksStore();
      store.fetchBooksData = vi.fn();
      expect(store.query).toStrictEqual({ ...originalQuery });
      expect(store.fetchBooksData).toHaveBeenCalledTimes(0);
      await store.updateQuery(query);
      expect(store.query).toStrictEqual({ ...originalQuery, ...query });
      // expect(store.query).toStrictEqual({ ...originalQuery, ...query, });
      expect(store.fetchBooksData).toHaveBeenCalledTimes(1);
    });
  });
});
