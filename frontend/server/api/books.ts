import { defineEventHandler } from 'h3';
import { genreData } from '@/assets/js/genres';

export default defineEventHandler(async event => {
  try {
    const query = buildQuery(event);
    const data = await fetchBooksData(query);
    const books = transformBooksData(data);
    return { books };
  } catch (error) {
    return handleApiError(error);
  }
});

function buildQuery(event) {
  const { keyword, genre } = getQuery(event);
  const query: RakutenBooksAPIRequest = {
    applicationId: process.env.RAKUTEN_APP_ID,
  };
  if (keyword) query['title'] = keyword;
  if (genre) {
    const isRightId = genreData.some(genreObj => genreObj.id === genre);
    if (isRightId) {
      query['booksGenreId'] = genre;
    } else {
      console.warn('get wrong genre id:', genre);
    }
  }
  return query;
}

async function fetchBooksData(query) {
  return await $fetch(process.env.RAKUTEN_API_ENDPOINT, { query });
}

function transformBooksData(bookData: RakutenBooksAPIResponse) {
  if (!bookData || !Array.isArray(bookData.Items)) {
    throw new Error('Invalid API response format');
  }
  return bookData.Items.map(book => {
    const {
      title,
      author,
      isbn,
      itemPrice: price,
      largeImageUrl: thumbnail,
      publisherName: publisher,
      salesDate: publish_date,
      itemCaption: description,
      reviewAverage: ratingStr,
    } = book.Item;
    if (!(title && author && publisher && publish_date)) {
      console.warn('missing important key:', book.Item);
      return;
    }
    const rating = Number(ratingStr);
    return {
      title,
      author,
      isbn,
      price,
      thumbnail,
      publisher,
      publish_date,
      description,
      rating,
    };
  }).filter(book => book);
}

function handleApiError(error) {
  let message = 'An unexpected error occurred.';
  let statusCode = 500;

  if (error.response) {
    const { status, data } = error.response;
    statusCode = status;
    if (status === 400) {
      message = 'Request error. Please check your inputs.';
    } else if (status === 404) {
      message = 'Requested data not found.';
    } else if (status === 500) {
      message = 'Internal server error.';
    }
    console.error('API Error:', status, message, 'Details:', data);
  } else {
    console.error('Error:', message, 'Details:', error.message);
  }

  return createError({
    statusCode: statusCode,
    statusMessage: 'API Error',
    data: { books: [], message },
  });
}

interface RakutenBooksAPIRequest {
  title?: string;
  booksGenreId?: string;
  applicationId: string;
}

interface RakutenBooksAPIResponse {
  Items: { Item: Book }[];
}

interface Book {
  title: string;
  author: string;
  isbn: string;
  itemPrice: number;
  largeImageUrl: string;
  publisherName: string;
  salesDate: string;
  itemCaption: string;
  reviewAverage: string;
}
