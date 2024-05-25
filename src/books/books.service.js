import { nanoid } from 'nanoid';
import Books from './books.data.js';
import Response from '../libs/response.js';

const BooksService = {
  getBooks: function (request, h) {
    const { name, reading, finished } = request.query;
    let filteredBooks = Books.filter((book) => {
      if (name && !new RegExp(name, 'gi').test(book.name)) return false;
      if (reading && Number(book.reading) !== Number(reading)) return false;
      if (finished && Number(book.finished) !== Number(finished)) return false;
      return true;
    });
    return Response.dataOnly(h, 200, {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    });
  },
  getBookById: function (request, h) {
    const { bookId } = request.params;
    const book = Books.filter((book) => book.id === bookId)[0];
    if (book) return Response.dataOnly(h, 200, { book });
    return Response.message(h, 404, 'Buku tidak ditemukan');
  },
  postBook: function (request, h) {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    if (!name) return Response.message(h, 400, 'Gagal menambahkan buku. Mohon isi nama buku');
    if (readPage > pageCount) return Response.message(h, 400, 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };
    Books.push(newBook);
    const isSuccess = Books.filter((book) => book.id === id).length > 0;
    if (isSuccess)
      return Response.data(h, 201, 'Buku berhasil ditambahkan', {
        bookId: id,
      });
    return Response.message(h, 500, 'Buku gagal ditambahkan');
  },
  putBook: function (request, h) {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    if (!name) return Response.message(h, 400, 'Gagal memperbarui buku. Mohon isi nama buku');
    if (readPage > pageCount) return Response.message(h, 400, 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();
    const index = Books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
      Books[index] = { ...Books[index], name, year, author, summary, publisher, pageCount, readPage, reading, finished, updatedAt };
      return Response.message(h, 200, 'Buku berhasil diperbarui');
    }
    return Response.message(h, 404, 'Gagal memperbarui buku. Id tidak ditemukan');
  },
  deleteBook: function (request, h) {
    const { bookId } = request.params;
    const index = Books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
      Books.splice(index, 1);
      return Response.message(h, 200, 'Buku berhasil dihapus');
    }
    return Response.message(h, 404, 'Buku gagal dihapus. Id tidak ditemukan');
  },
};

export default BooksService;
