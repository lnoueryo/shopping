import { defineStore } from 'pinia';

export const useBooksStore = defineStore('books', {
  state: (): BooksState => ({
    booksData: [],
    isLoading: false,
    errorType: '',
    query: {
      keyword: '',
      genre: '',
      rate: 0,
      levels: [],
    },
  }),
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
        this.booksData = response.books;
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
        this.booksData = [];
      } finally {
        this.isLoading = false;
      }
    },
    updateQuery(query: { [key: string]: string | number }) {
      this.query = { ...query };
      if ('rate' in query === false) this.query['rate'] = 0;
      else delete this.query['rate'];
      if ('levels' in query === false) this.query['levels'] = [];
      if ('genre' in query === false) this.query['genre'] = '';
      if ('keyword' in query === false) this.query['keyword'] = '';
      this.fetchBooksData();
    },
  },
});

const fetchWithTimeout = (url: string, options: BookRequest, timeout = 3000) => {
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

interface BookResponse {
  books: Book[];
  message?: string;
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
  booksData: Book[];
  isLoading: boolean;
  errorType: string;
  query: BookRequest
}

interface BookRequest {
  keyword: string;
  genre: string;
  rate: number;
  levels: string[];
}
