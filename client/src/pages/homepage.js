import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ContainerComponent from '../components/container';
import NavbarComponent from '../components/navbar';
import SidebarComponent from '../components/sidebar';
import { CONTENT_URL } from '../config/constant';

function Homepage() {
  const [sidebarActivated, setSidebarActivated] = useState(false);

  const unmounted = useRef(false);

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, [unmounted]);

  return (
    <div>
      <SidebarComponent active={sidebarActivated} />
      <NavbarComponent
        active={sidebarActivated}
        setActive={setSidebarActivated}
      />
      <ContainerComponent>
        <div className={`ml-0 ${sidebarActivated && 'md:ml-52'} my-6 `}>
          <Link to={'/'}>
            <span className="capitalize py-2 px-10 bg-orange-400 text-white rounded-md">
              new book
            </span>
          </Link>
          <div className="my-14">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div
                className="bg-gray-50 rounded-lg py-5 px-3"
                style={{
                  boxShadow: '2px 2px 1px 3px rgba(17, 17, 17, 0.06)',
                }}
              >
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
                      Advanced Javascript
                    </h4>
                  </div>

                  <div className="flex flex-col gap-y-4">
                    <div className="break-words">
                      <h4 className="text-lg text-gray-400 font-medium">
                        Author
                      </h4>
                    </div>

                    <div className="break-words">
                      <h4 className="text-lg text-gray-400 font-medium">
                        Publisher
                      </h4>
                    </div>

                    <h4 className="font-semibold text-lg text-gray-400">
                      Page: 80
                    </h4>
                  </div>
                </div>
                <div className="flex">
                  <div className="ml-auto">
                    <Link to={'/'}>
                      <span className="capitalize py-2 px-10 bg-blue-400 hover:text-gray-100 text-white rounded-md">
                        Detail
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerComponent>
    </div>
  );
}

export default Homepage;
