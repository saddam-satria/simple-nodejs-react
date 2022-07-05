import log from '../helpers/log';
import { IBook, IPayloadBook } from '../interfaces/bookInterface';
import BookRepository from '../repositories/bookRepository';

class BookService {
  constructor(private bookRepository: BookRepository) {}

  public async getBooks(page?: number, take?: number, columns?: IBook) {
    return await this.bookRepository.getAll(page, take, columns);
  }
  public async insertBook({
    author,
    cover,
    currentPage,
    description,
    finished,
    publisher,
    reading,
    title,
    totalPage,
  }: IPayloadBook): Promise<{
    error: boolean;
    message?: string;
    data?: IPayloadBook;
    statuCode?: number;
  }> {
    const validate = this.validation({
      title,
      author,
      publisher,
      totalPage,
      currentPage,
    });
    if (validate.isError)
      return {
        error: true,
        message: validate.message,
        statuCode: validate.statusCode,
      };

    try {
      await this.bookRepository.create({
        author,
        currentPage,
        finished,
        publisher,
        reading,
        title,
        totalPage,
        cover,
        description,
      });

      return {
        error: false,
        data: {
          author,
          cover,
          currentPage,
          finished,
          publisher,
          reading,
          title,
          totalPage,
          description,
        },
      };
    } catch (error) {
      log.server.setLog({ log: error.message, type: 'error' });
      return { error: true, message: error.message, statuCode: 400 };
    }
  }
  public async deleteBook(id?: string): Promise<{
    error: boolean;
    message?: string;
    statusCode?: number;
    id?: string;
  }> {
    if (!id) return { error: true, message: 'id cannot be empty' };

    try {
      const book = await this.getBook(id);
      if (book.error) throw new Error(`${book.message}-${book.statusCode}`);

      await this.bookRepository.destroy(id);

      return {
        error: false,
        message: 'success deleted book',
        statusCode: 200,
        id: book.id,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message && error.message.split('-')[0],
        statusCode: error.message && error.message.split('-')[1],
      };
    }
  }
  public async getBook(id?: string): Promise<{
    error: boolean;
    message?: string;
    data?: null | IPayloadBook;
    statusCode?: number;
    id?: string;
  }> {
    if (!id) return { error: true, message: 'id cannot be empty' };

    try {
      const book = await this.bookRepository.getByID(id);

      if (!book) throw new Error('Book Not Found');

      return {
        error: false,
        message: 'success get the book',
        statusCode: 200,
        data: {
          author: book.author,
          currentPage: book.currentPage,
          finished: book.finished,
          publisher: book.publisher,
          reading: book.reading,
          title: book.title,
          totalPage: book.totalPage,
          cover: book.cover ? book.cover : undefined,
          description: book.description ? book.description : undefined,
        },
        id: book.id,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 404,
        message: error.message,
      };
    }
  }

  private validation({
    title,
    author,
    publisher,
    totalPage,
    currentPage,
  }: {
    title?: string;
    author?: string;
    publisher?: string;
    totalPage?: number;
    currentPage: number;
  }): { isError: boolean; message?: string; statusCode?: number } {
    if (!title || !author || !publisher || !totalPage)
      return {
        isError: true,
        message: 'request body cannot be empty',
        statusCode: 400,
      };

    if (currentPage > totalPage)
      return {
        isError: true,
        message: 'current page size too larger than total page',
        statusCode: 400,
      };

    return {
      isError: false,
    };
  }
}

export default BookService;
