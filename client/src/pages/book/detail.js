import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContainerComponent from '../../components/container';
import LoadingComponent from '../../components/loading';
import NavbarComponent from '../../components/navbar';
import NotificationComponent from '../../components/notification';
import SidebarComponent from '../../components/sidebar';
import { CONTENT_URL } from '../../config/constant';
import useFetch from '../../hooks/useFetch';

const DetailBook = () => {
  const [sidebarActivated, setSidebarActivated] = useState(false);
  const [book, setBook] = useState(null);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const { response, loading, error } = useFetch.useGet(`books/${id}`);

  const mounted = useRef(true);

  useEffect(() => {
    if (mounted) {
      if (error && error.message.includes('404')) navigate('/');

      if (!loading && !error) {
        const { data } = response.data;

        setBook(data);
      }
    }
    return () => {
      mounted.current = false;
    };
  }, [loading, error, response, navigate]);

  return (
    <>
      <SidebarComponent active={sidebarActivated} />
      <NavbarComponent
        active={sidebarActivated}
        setActive={setSidebarActivated}
      />
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

      <ContainerComponent>
        <div className={`ml-0 ${sidebarActivated && 'md:ml-52'} my-6 `}>
          {book && (
            <div className="flex flex-col gap-y-12">
              <div className="flex justify-center">
                <img
                  src={`${CONTENT_URL}/image/cover.jpg`}
                  alt="cover"
                  className="object-cover h-120 rounded-lg w-auto"
                  style={{ boxShadow: '1px 1px 1px 3px rgba(5,14,14,0.1)' }}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="bg-gray-600 py-2 px-4 w-full rounded-lg">
                  <span className="text-lg text-white capitalize">
                    {book.title}
                  </span>
                </div>
                <div className="bg-gray-600 py-2 px-4 w-full rounded-lg">
                  <span className="text-lg text-white capitalize">
                    {book.author}
                  </span>{' '}
                </div>
                <div className="bg-gray-600 py-2 px-4 w-full rounded-lg">
                  <span className="text-lg text-white capitalize">
                    {book.publisher}
                  </span>{' '}
                </div>
                <div className="bg-gray-600 py-2 px-4 w-full rounded-lg">
                  <span className="text-lg text-white capitalize">
                    {book.currentPage}
                  </span>{' '}
                </div>
                <div className="bg-gray-600 py-2 px-4 w-full rounded-lg">
                  <span className="text-lg text-white capitalize">
                    {book.totalPage}
                  </span>{' '}
                </div>
                <div className="bg-gray-600 py-2 px-4 w-full rounded-lg">
                  <span className="text-lg text-white capitalize">
                    {book.finished ? 'finish' : 'Not Yet'}
                  </span>{' '}
                </div>
                <div className="bg-gray-600 py-2 px-4 w-full rounded-lg">
                  <span className="text-lg text-white capitalize">
                    {book.reading ? 'Still Reading' : 'Stop Reading'}
                  </span>{' '}
                </div>
                <div className="bg-gray-600 py-2 px-4 w-full rounded-lg">
                  <span className="text-lg text-white">
                    {book.totalPage - book.currentPage} Page Until Finish
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ContainerComponent>
    </>
  );
};

export default DetailBook;
