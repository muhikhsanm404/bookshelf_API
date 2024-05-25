import Routes from '../libs/routes.js';
import BooksService from './books.service.js';

const BooksController = [
  Routes('GET', '/books', BooksService.getBooks),
  Routes('GET', '/books/{bookId}', BooksService.getBookById),
  Routes('POST', '/books', BooksService.postBook),
  Routes('PUT', '/books/{bookId}', BooksService.putBook),
  Routes('DELETE', '/books/{bookId}', BooksService.deleteBook),
];

export default BooksController;
