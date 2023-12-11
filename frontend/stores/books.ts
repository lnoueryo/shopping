import { defineStore } from 'pinia';

export const useBooksStore = defineStore('books', {
  state: (): BooksState => ({
    booksData: [],
    isLoading: false,
    hasError: false,
    errorType: '',
  }),
  actions: {
    async fetchBooksData(query: { [key: string]: any }) {
      this.isLoading = true;
      this.hasError = false;
      this.errorType = '';

      try {
        const response: BookResponse = await fetchWithTimeout('/api/books', { query }, 5000);
        this.booksData = response.books;
      } catch (err: any) {
        if (!navigator.onLine) {
          this.errorType = 'offline';
          console.error('You are offline. Please check your internet connection.');
        } else if (err === 'timeout') {
          this.errorType = 'timeout';
          console.error('Network request failed. Please try again later.');
        } else {
          this.errorType = 'server'
          console.error('An error occurred:', err);
        }
        this.hasError = true;
        this.booksData = [];
      } finally {
        this.isLoading = false;
      }
    },
  },
});

const fetchWithTimeout = (url: string, options: any, timeout = 3000) => {
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
}

interface BookResponse {
  books: Book[],
  message?: string
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
  // 他に必要なプロパティがあればここに追加
}

interface BooksState {
  booksData: Book[];
  isLoading: boolean;
  hasError: boolean;
  errorType: string;
}
