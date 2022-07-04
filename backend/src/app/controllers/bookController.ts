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
        next:
          page &&
          (data.count === 0 && parseInt(page as string) > 1
            ? parseInt(page as string) + 1
            : null),
        prev: page && parseInt(page as string) === 1 ? null : page,
      },
    });
  }

  public async createBook(request: Request, response: Response) {
    const {
      title,
      author,
      publisher,
      finished,
      reading,
      currentPage,
      totalPage,
      cover,
      description,
    } = request.body;

    const result = await this.bookService.insertBook({
      author,
      currentPage: currentPage as number,
      finished: finished as boolean,
      publisher,
      reading: reading as boolean,
      title,
      totalPage: totalPage as number,
      cover,
      description,
    });

    if (!result)
      return response.status(404).json({
        status: 'error',
        message: 'request body cannot empty',
        data: null,
        code: request.statusCode,
      });

    return response.status(201).json({
      status: 'success',
      message: 'success create new book',
      code: request.statusCode,
      data: {
        new: result,
      },
    });
  }
}

export default new BookController();
