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
  }: IPayloadBook): Promise<boolean | IPayloadBook> {
    const validate = this.validation({
      title,
      author,
      publisher,
      totalPage,
      currentPage,
    });
    if (!validate) return false;
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
        author,
        cover,
        currentPage,
        finished,
        publisher,
        reading,
        title,
        totalPage,
        description,
      };
    } catch (error) {
      log.server.setLog({ log: error.message, type: 'error' });
      return false;
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
  }): boolean {
    if (!title || !author || !publisher || !totalPage) return false;

    if (currentPage > totalPage) return false;

    return true;
  }
}

export default BookService;
