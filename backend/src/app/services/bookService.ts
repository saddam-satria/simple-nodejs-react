import { IBook } from '../interfaces/bookInterface';
import BookRepository from '../repositories/bookRepository';

class BookService {
  constructor(private bookRepository: BookRepository) {}

  public async getBooks(page?: number, take?: number, columns?: IBook) {
    return await this.bookRepository.getAll(page, take, columns);
  }
}

export default BookService;
