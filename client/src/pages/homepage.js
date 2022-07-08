import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ContainerComponent from '../components/container';
import LoadingComponent from '../components/loading';
import NavbarComponent from '../components/navbar';
import NotificationComponent from '../components/notification';
import SidebarComponent from '../components/sidebar';
import { CONTENT_URL } from '../config/constant';
import useFetch from '../hooks/useFetch';

function Homepage() {
  const [sidebarActivated, setSidebarActivated] = useState(false);
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState(null);
  const { loading, response, error } = useFetch.useGet('books', `page=${page}`);
  const [successDeleted, setSuccessDeleted] = useState(false);
  const [errorDeleted, setErrorDeleted] = useState(null);

  useEffect(() => {
    if (response) {
      const { data } = response.data;
      if (!books) {
        setBooks(data.books);
        return;
      }
      setBooks([...books, ...data.books]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const onDeleteBook = (id) => {
    useFetch
      .useDelete(`books/${id}`)
      .then((result) => {
        if (result.error) throw result.error;

        setBooks(books.filter((book) => book.id !== id));

        setSuccessDeleted(true);
      })
      .catch((err) => {
        setErrorDeleted(err);
      });
  };

  useEffect(() => {
    if (successDeleted || errorDeleted) {
      setTimeout(() => {
        setErrorDeleted(null);
        setSuccessDeleted(false);
      }, 2000);
    }
  }, [successDeleted, errorDeleted]);

  return (
    <div>
      <SidebarComponent active={sidebarActivated} />
      <NavbarComponent
        active={sidebarActivated}
        setActive={setSidebarActivated}
      />
      <ContainerComponent>
        <div className={`ml-0 ${sidebarActivated && 'md:ml-52'} my-6 `}>
          <Link to={'/book/new'}>
            <span className="capitalize py-2 px-10 bg-orange-400 text-white rounded-md">
              new book
            </span>
          </Link>
          {(successDeleted || errorDeleted) && (
            <div
              className={`my-4 p-4 rounded-xl ${
                errorDeleted ? 'bg-red-400' : 'bg-green-400'
              } text-white`}
            >
              <span className="text-md font-medium capitalize">
                {successDeleted ? 'success deleted book' : errorDeleted.message}
              </span>
            </div>
          )}
          {error && (
            <div className="my-14">
              <NotificationComponent.ErrorComponent message={error.message} />
            </div>
          )}

          {loading && !error && (
            <div className="my-14">
              <LoadingComponent />
            </div>
          )}

          <div className="my-14">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {!loading &&
                !error &&
                books &&
                books.map((book, index) => {
                  return (
                    <div
                      className="bg-gray-50 rounded-lg px-3"
                      style={{
                        boxShadow: '2px 2px 1px 3px rgba(17, 17, 17, 0.06)',
                      }}
                      key={index}
                    >
                      <div className="flex mt-4">
                        <div>
                          <Link to={`book/${book.id}/update`}>
                            <span className="cursor-pointer">
                              <FaPen color="blue" size={'1em'} />
                            </span>
                          </Link>
                        </div>

                        <div className="ml-auto">
                          <span
                            className="cursor-pointer"
                            onClick={() => onDeleteBook(book.id)}
                          >
                            <FaTrash color="red" size={'1em'} />
                          </span>
                        </div>
                      </div>
                      <div className="py-5">
                        <div>
                          <img
                            width={'auto'}
                            src={`${CONTENT_URL}/image/cover.jpg`}
                            alt="book cover"
                            className="object-cover rounded-sm"
                          />
                        </div>
                        <div className="py-6 flex flex-col">
                          <div className="text-center py-4 break-words">
                            <h4 className="font-bold text-xl text-gray-600 capitalize">
                              {book.title}
                            </h4>
                          </div>

                          <div className="flex flex-col gap-y-4">
                            <div className="break-words">
                              <h4 className="text-lg text-gray-400 font-medium capitalize">
                                {book.author}
                              </h4>
                            </div>

                            <div className="break-words">
                              <h4 className="text-lg text-gray-400 font-medium capitalize">
                                {book.publisher}
                              </h4>
                            </div>

                            <h4 className="font-semibold text-lg text-gray-400">
                              Page: {book.currentPage}
                            </h4>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="ml-auto">
                            <Link to={`/book/${book.id}`}>
                              <span className="capitalize py-2 px-10 bg-blue-400 hover:text-gray-100 text-white rounded-md">
                                Detail
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="my-6">
              <div className="flex justify-center">
                {!loading && !error && response.data.data.next && (
                  <span
                    onClick={() => setPage(page + 1)}
                    className="px-6 py-2 bg-orange-600 text-white text-md font-medium rounded-md"
                  >
                    Load More
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </ContainerComponent>
    </div>
  );
}

export default Homepage;
