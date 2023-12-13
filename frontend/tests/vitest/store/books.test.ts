import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest';
import { useBooksStore } from '@/stores/books'

describe('Books Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

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
    }
  ]


  describe('fetchBooksData', () => {

    it('Verify Fetch Books', async () => {
      const mockFetch = (url, options) => {
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
      const mockFetch = (url, options) => {
        throw('timeout')
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
      const mockFetch = (url, options) => {
        throw('Internal Server Error')
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
        writable: true
      });
      const store = useBooksStore();
      expect(store.isLoading).toBe(false);
      await store.fetchBooksData();
      expect(store.isLoading).toBe(false);
      expect(store.errorType).toBe('offline');
    });
  })
})
