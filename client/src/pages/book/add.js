import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContainerComponent from '../../components/container';
import NavbarComponent from '../../components/navbar';
import SidebarComponent from '../../components/sidebar';
import { CONTENT_URL } from '../../config/constant';
import {
  allowOnlyNumber,
  escapeCharacters,
  isEmptyText,
} from '../../helpers/validation';
import useFetch from '../../hooks/useFetch';

const FormAddBook = () => {
  const [sidebarActivated, setSidebarActivated] = useState(false);
  const imageRef = useRef();
  const coverRef = useRef();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    title: '',
    author: '',
    publisher: '',
    currentPage: '',
    totalPage: '',
    description: '',
    cover: null,
  });
  const [validate, setValidate] = useState({
    title: {
      error: false,
      message: '',
    },
    publisher: {
      error: false,
      message: '',
    },
    currentPage: {
      error: false,
      message: '',
    },
    totalPage: {
      error: false,
      message: '',
    },
    author: {
      error: false,
      message: '',
    },
    description: {
      error: false,
      message: '',
    },
    cover: {
      error: false,
      message: '',
    },
  });
  const [failure, setFailure] = useState(null);

  const onChangePayload = (e) => {
    const { name, value } = e.target;

    if (escapeCharacters(value)) {
      setValidate({
        ...validate,
        [name]: { error: true, message: 'illegal characters' },
      });
      return;
    }

    if (name.includes('currentPage') || name.includes('totalPage')) {
      if (!allowOnlyNumber(value)) {
        setPayload({ ...payload, [name]: '' });
        setValidate({
          ...validate,
          [name]: { error: true, message: 'Allowed Only Number' },
        });
        return;
      }
    }

    setPayload({ ...payload, [name]: value });
  };

  const onSubmitNewBook = (e) => {
    e.preventDefault();
    if (parseInt(payload.currentPage) > parseInt(payload.totalPage)) {
      setValidate({
        ...validate,
        currentPage: {
          error: true,
          message: 'current page cannot be higher than total page',
        },
      });
      return;
    }

    useFetch
      .usePost(
        'books',
        { ...payload, reading: true },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(({ error }) => {
        if (error) throw error;
        setPayload({
          author: '',
          currentPage: '',
          description: '',
          publisher: '',
          title: '',
          totalPage: '',
          cover: null,
        });
        navigate('/');
      })
      .catch((error) => setFailure(error));
  };

  useEffect(() => {
    return () => {
      setTimeout(
        () =>
          setValidate({
            title: { error: false, message: '' },
            author: { error: false, message: '' },
            publisher: { error: false, message: '' },
            currentPage: { error: false, message: '' },
            totalPage: { error: false, message: '' },
            description: { error: false, message: '' },
            cover: { error: false, message: '' },
          }),

        2000
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validate]);

  const onClickImage = () => {
    imageRef.current.click();
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.includes('image')) {
      setValidate({
        ...validate,
        cover: { error: true, message: 'Only Allowed Image' },
      });
      return;
    }
    const previewImage = URL.createObjectURL(file);
    coverRef.current.src = previewImage;
    setPayload({ ...payload, cover: file });
  };

  return (
    <>
      <SidebarComponent active={sidebarActivated} />
      <NavbarComponent
        active={sidebarActivated}
        setActive={setSidebarActivated}
      />
      <ContainerComponent>
        <div className={`ml-0 ${sidebarActivated && 'md:ml-52'} my-6 `}>
          {failure && (
            <div className="my-8">
              <span className="text-red-600 font-medium text-sm">
                {failure.message}
              </span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <form>
              <div className="flex flex-col gap-y-8">
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="title"
                    className="text-gray-400 font-medium text-md capitalize mb-2 rounded-sm"
                  >
                    book cover
                  </label>
                  <img
                    src={`${CONTENT_URL}image/cover.jpg`}
                    alt="cover"
                    className="w-full object-cover h-auto cursor-pointer"
                    onClick={onClickImage}
                    ref={coverRef}
                  />
                  <input
                    type="file"
                    ref={imageRef}
                    className="hidden"
                    onChange={onImageChange}
                  />
                  {validate.cover.error && (
                    <span className="text-xs text-red-600 font-medium">
                      {validate.cover.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="title"
                    className="text-gray-400 font-medium text-md capitalize mb-2"
                  >
                    book title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter Book Title..."
                    className="px-4 py-3 bg-orange-200 font-medium text-gray-500 hover:border-none focus:outline-none rounded-md"
                    onChange={onChangePayload}
                    value={payload.title}
                    autoComplete={'off'}
                  />
                  {validate.title.error && (
                    <span className="text-xs text-red-600 font-medium">
                      {validate.title.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="author"
                    className="text-gray-400 font-medium text-md capitalize mb-2"
                  >
                    book author
                  </label>
                  <input
                    type="text"
                    name="author"
                    id="author"
                    placeholder="Enter Book Author..."
                    className="px-4 py-3 bg-orange-200 font-medium text-gray-500 hover:border-none focus:outline-none rounded-md"
                    onChange={onChangePayload}
                    value={payload.author}
                    autoComplete={'off'}
                  />
                  {validate.author.error && (
                    <span className="text-xs text-red-600 font-medium">
                      {validate.author.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="publisher"
                    className="text-gray-400 font-medium text-md capitalize mb-2"
                  >
                    book publisher
                  </label>
                  <input
                    type="text"
                    name="publisher"
                    id="publisher"
                    placeholder="Enter Book Publisher..."
                    className="px-4 py-3 bg-orange-200 font-medium text-gray-500 hover:border-none focus:outline-none rounded-md"
                    onChange={onChangePayload}
                    value={payload.publisher}
                    autoComplete={'off'}
                  />
                  {validate.publisher.error && (
                    <span className="text-xs text-red-600 font-medium">
                      {validate.publisher.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="totalPage"
                    className="text-gray-400 font-medium text-md capitalize mb-2"
                  >
                    book total page
                  </label>
                  <input
                    type="text"
                    name="totalPage"
                    id="totalPage"
                    placeholder="Enter Book Total Page..."
                    className="px-4 py-3 bg-orange-200 font-medium text-gray-500 hover:border-none focus:outline-none rounded-md"
                    onChange={onChangePayload}
                    value={payload.totalPage}
                    autoComplete={'off'}
                  />
                  {validate.totalPage.error && (
                    <span className="text-xs text-red-600 font-medium">
                      {validate.totalPage.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="currentPage"
                    className="text-gray-400 font-medium text-md capitalize mb-2"
                  >
                    book current page
                  </label>
                  <input
                    type="text"
                    name="currentPage"
                    id="currentPage"
                    placeholder="Enter Book Current Page..."
                    className="px-4 py-3 bg-orange-200 font-medium text-gray-500 hover:border-none focus:outline-none rounded-md"
                    onChange={onChangePayload}
                    value={payload.currentPage}
                    autoComplete={'off'}
                  />
                  {validate.currentPage.error && (
                    <span className="text-xs text-red-600 font-medium">
                      {validate.currentPage.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="description"
                    className="text-gray-400 font-medium text-md capitalize mb-2"
                  >
                    book description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Enter Book Description..."
                    className="px-4 py-3 bg-orange-200 font-medium text-gray-500 hover:border-none focus:outline-none rounded-md resize-none"
                    onChange={onChangePayload}
                    rows={'5'}
                    cols={'5'}
                    autoComplete={'off'}
                    value={payload.description}
                  />

                  {validate.description.error && (
                    <span className="text-xs text-red-600 font-medium">
                      {validate.description.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="my-12">
                <div className="flex">
                  <div className="ml-auto">
                    <button
                      onClick={onSubmitNewBook}
                      className={`capitalize px-6 py-2 text-md bg-orange-400 ${
                        (isEmptyText(payload.title) ||
                          isEmptyText(payload.author) ||
                          isEmptyText(payload.publisher) ||
                          isEmptyText(payload.currentPage) ||
                          isEmptyText(payload.totalPage)) &&
                        'bg-gray-600'
                      } text-white font-medium rounded-md cursor-pointer hover:text-gray-100`}
                      disabled={
                        isEmptyText(payload.title) ||
                        isEmptyText(payload.author) ||
                        isEmptyText(payload.publisher) ||
                        isEmptyText(payload.currentPage) ||
                        isEmptyText(payload.totalPage)
                      }
                    >
                      {isEmptyText(payload.title) ||
                      isEmptyText(payload.author) ||
                      isEmptyText(payload.publisher) ||
                      isEmptyText(payload.currentPage) ||
                      isEmptyText(payload.totalPage)
                        ? 'Fill The Form'
                        : 'Submit'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </ContainerComponent>
    </>
  );
};

export default FormAddBook;
