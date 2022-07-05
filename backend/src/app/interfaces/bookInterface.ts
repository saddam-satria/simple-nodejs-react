interface IBook {
  title?: boolean;
  author?: boolean;
  publisher?: boolean;
  finished?: boolean;
  reading?: boolean;
  currentPage?: boolean;
  totalPage?: boolean;
  cover?: boolean;
  description?: boolean;
  id?: boolean;
}
interface IPayloadBook {
  title: string;
  author: string;
  publisher: string;
  finished: boolean;
  reading: boolean;
  currentPage: number;
  totalPage: number;
  description?: string;
  cover?: string;
}

export { IBook, IPayloadBook };
