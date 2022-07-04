import connection from '../config/database';
import { IBook, IPayloadBook } from '../interfaces/bookInterface';

class BookRepository {
  public async getAll(
    page = 1,
    take = 5,
    columns: IBook = {
      author: true,
      currentPage: true,
      finished: true,
      publisher: true,
      reading: true,
      title: true,
      totalPage: true,
      cover: true,
      description: true,
    }
  ) {
    const skip = (page - 1) * take;

    return {
      count: await connection.books.count({ take, skip }),
      books: await connection.books.findMany({ select: columns, skip, take }),
    };
  }
  public async create({
    author,
    cover,
    currentPage,
    description,
    finished,
    publisher,
    reading,
    title,
    totalPage,
  }: IPayloadBook) {
    return await connection.books.create({
      data: {
        author,
        publisher,
        title,
        totalPage,
        cover,
        currentPage,
        description,
        finished,
        reading,
      },
    });
  }
}

export default BookRepository;
