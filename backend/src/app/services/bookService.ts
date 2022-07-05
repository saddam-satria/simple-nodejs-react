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
