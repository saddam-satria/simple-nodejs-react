import React from 'react';
import { IoMdNotifications } from 'react-icons/io';
import ContainerComponent from './container';

const NavbarComponent = ({ active, setActive }) => {
  return (
    <div className="bg-orange-400 py-4">
      <ContainerComponent>
        <div className="flex">
          <div className={`flex ${active && 'ml-52'} items-center`}>
            <div
              className="flex flex-col gap-y-1 hover:text-gray-100 cursor-pointer"
              onClick={() => setActive(!active)}
            >
              <div className="h-1 w-6 bg-white rounded-xl"></div>
              <div className="h-1 w-6 bg-white rounded-xl"></div>
              <div className="h-1 w-6 bg-white rounded-xl"></div>
            </div>
          </div>
          <div className="ml-auto">
            <h3 className="text-md">
              <IoMdNotifications
                className="text-white hover:text-gray-100 cursor-pointer"
                size={'1.6em'}
              />
            </h3>
          </div>
        </div>
      </ContainerComponent>
    </div>
  );
};

export default NavbarComponent;
