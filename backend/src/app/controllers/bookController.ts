import { Request, Response } from 'express';
import BookRepository from '../repositories/bookRepository';
import BookService from '../services/bookService';

class BookController {
  private bookService: BookService;
  constructor() {
    this.bookService = new BookService(new BookRepository());
  }

  public async getBooks(request: Request, response: Response) {
    const { page, take } = request.query;

    let data = await this.bookService.getBooks();

    if (page || take) {
      data = await this.bookService.getBooks(
        page ? parseInt(page as string) : undefined,
        take ? parseInt(take as string) : undefined
      );
    }

    response.status(200).json({
      status: 'success',
      code: request.statusCode,
      message: 'get books data',
      data: {
        count: data.count,
        books: data.books,
      },
    });
  }
}

export default new BookController();
