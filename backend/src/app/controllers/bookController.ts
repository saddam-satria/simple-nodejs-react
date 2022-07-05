import { Request, Response } from 'express';
import log from '../helpers/log';
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

    log.server.setLog({
      log: `request GET ${
        page || take
          ? `${
              page && take
                ? `/books?page${page}&take=${take}`
                : page
                ? `/books?page=${page}`
                : `/books?take=${take}`
            }`
          : '/books'
      } 200`,
      type: 'info',
    });
    return response.status(200).json({
      status: 'success',
      code: request.statusCode,
      message: 'get books data',
      data: {
        count: data.count,
        books: data.books,
        next:
          page &&
          (data.count > 0 && parseInt(page as string) > 0
            ? parseInt(page as string) + 1
            : null),
        prev:
          (page && parseInt(page as string)) || parseInt(page as string) - 1 < 1
            ? null
            : parseInt(page as string) - 1,
      },
    });
  }

  public createBook(request: Request, response: Response) {
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

    this.bookService
      .insertBook({
        author,
        currentPage: currentPage as number,
        finished: finished as boolean,
        publisher,
        reading: reading as boolean,
        title,
        totalPage: totalPage as number,
        cover,
        description,
      })
      .then((res) => {
        if (res.error) {
          log.server.setLog({
            log: `request POST /books ${res.statuCode}`,
            type: 'error',
          });
          return response.status(res.statuCode ? res.statuCode : 400).json({
            status: 'error',
            message: res.message ? res.message : null,
            data: null,
            code: request.statusCode,
          });
        }

        log.server.setLog({
          log: `request POST /books 201`,
          type: 'info',
        });
        return response.status(201).json({
          status: 'success',
          message: 'success create new book',
          code: request.statusCode,
          data: {
            new: res.data,
          },
        });
      });
  }
  public async getBook(request: Request, response: Response) {
    const { id } = request.params;

    const result = await this.bookService.getBook(id);

    if (result.error) {
      log.server.setLog({
        log: `request GET /books/${id} ${result.statusCode}`,
        type: 'error',
      });
      return response.status(result.statusCode ? result.statusCode : 400).json({
        status: 'error',
        message: result.message,
        code: result.statusCode,
        data: null,
      });
    }

    log.server.setLog({
      log: `request GET /books/${id} 200`,
      type: 'info',
    });
    return response.status(200).json({
      status: 'success',
      message: `success get book ${id}`,
      code: 200,
      data: {
        id: result.id,
        ...result.data,
      },
    });
  }
  public async deleteBook(request: Request, response: Response) {
    const { id } = request.params;

    const result = await this.bookService.deleteBook(id);

    if (result.error) {
      log.server.setLog({
        log: `request DELETE /books/${id} ${result.statusCode}`,
        type: 'error',
      });

      return response.status(result.statusCode ? result.statusCode : 400).json({
        status: 'error',
        message: result.message,
        code: result.statusCode,
        data: null,
      });
    }
    log.server.setLog({
      log: `request DELETE /books/${id} 200`,
      type: 'info',
    });

    return response.status(200).json({
      status: 'success',
      message: `success delete book ${id}`,
      code: 200,
      data: {
        id: result.id,
      },
    });
  }
}

export default new BookController();
