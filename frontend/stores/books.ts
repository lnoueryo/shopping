import { defineStore } from 'pinia';
import { useStore } from '@/stores';
import { deviceSize } from '@/assets/js/device-size';
import { useNuxtApp } from '#app';

export const useBooksStore = defineStore('books', {
  state: (): BooksState => ({
    bookList: resetBookList(),
    isLoading: false,
    errorType: '',
    query: {
      keyword: '',
      genre: '',
      rate: 0,
      levels: [],
      page: 1,
    },
    isAccordionOpen: false,
  }),
  getters: {
    isBooksData: state => state.bookList.books.length !== 0,
  },
  actions: {
    async fetchBooksData() {
      this.isLoading = true;
      this.errorType = '';

      try {
        const response: BookResponse = await fetchWithTimeout(
          '/api/books',
          { query: this.query },
          5000
        );
        this.bookList = response;
      } catch (err: Error) {
        if (!navigator.onLine) {
          this.errorType = 'offline';
          console.error(
            'You are offline. Please check your internet connection.'
          );
        } else if (err === 'timeout') {
          this.errorType = 'timeout';
          console.error('Network request failed. Please try again later.');
        } else {
          this.errorType = 'server';
          console.error('An error occurred:', err);
        }
        this.bookList = resetBookList();
      } finally {
        this.isLoading = false;
      }
    },
    async updateQuery(query: { [key: string]: string | number }) {
      const nuxtApp = useNuxtApp();
      const cacheQuery = JSON.stringify(this.query);
      this.updateStateQuery(query);

      if (cacheQuery !== JSON.stringify(this.query)) {
        const store = useStore();
        await store.scrollToTop();
        if (deviceSize.smallDesktop > store.width)
          nuxtApp.$mainRef.value.style.height = `calc(100vh - ${
            store.heightContent * 2
          }px)`;
        await this.fetchBooksData();
      }
      nuxtApp.$mainRef.value.style.height = 'initial';
      return;
    },
    async updateStateQuery(query: { [key: string]: string | number }) {
      this.query = { ...query };
      if ('genre' in query === false) this.query['genre'] = '';
      else this.query['keyword'] = '';

      if ('rate' in query === false) this.query['rate'] = 0;
      else this.query['rate'] = Number(query.rate);

      if ('levels' in query === false) this.query['levels'] = [];
      else if (typeof query.levels === 'string')
        this.query['levels'] = new Array(query.levels);
    },
  },
});

const fetchWithTimeout = (
  url: string,
  options: BookRequest,
  timeout = 3000
) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject('timeout');
    }, timeout);

    $fetch(url, options)
      .then(response => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(error => {
        clearTimeout(timer);
        reject(error);
      });
  });
};

const resetBookList = () => {
  return {
    books: [],
    first: 0,
    last: 0,
    count: 0,
    page_count: 0,
    hits: 0,
  }
}

interface BookResponse extends BookList {
  message?: string;
}
interface BookList {
  books: Book[];
  first: number;
  last: number;
  count: number;
  page_count: number;
  hits: number;
}
interface Book {
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

interface BooksState {
  bookList: Book[];
  isLoading: boolean;
  errorType: string;
  query: BookRequest;
  isAccordionOpen: boolean;
}

interface BookRequest {
  keyword: string;
  genre: string;
  rate: number;
  levels: string[];
  page: number;
}
