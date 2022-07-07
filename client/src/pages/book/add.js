import React, { useState } from 'react';
import ContainerComponent from '../../components/container';
import NavbarComponent from '../../components/navbar';
import SidebarComponent from '../../components/sidebar';

const FormAddBook = () => {
  const [sidebarActivated, setSidebarActivated] = useState(false);
  const [payload, setPayload] = useState({});
  const [validate, setValidate] = useState({});

  const onChangePayload = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  console.log(payload);
  return (
    <>
      <SidebarComponent active={sidebarActivated} />
      <NavbarComponent
        active={sidebarActivated}
        setActive={setSidebarActivated}
      />
      <ContainerComponent>
        <div className={`ml-0 ${sidebarActivated && 'md:ml-52'} my-6 `}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <form>
              <div className="flex flex-col gap-y-8">
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
                  />
                  <span className="text-xs text-red-600 font-medium">
                    name must be fill
                  </span>
                </div>
              </div>
              <div className="my-3">
                <div className="flex">
                  <div className="ml-auto">
                    <span className="capitalize px-6 py-2 text-md bg-orange-400 text-white font-medium rounded-md cursor-pointer hover:text-gray-100">
                      submit
                    </span>
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
