import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SidebarComponent = ({ active }) => {
  return (
    <div
      className={`fixed -translate-x-80 ${
        active && 'translate-x-0'
      }  bg-orange-600 h-screen w-1/2 md:w-1/6`}
    >
      <div className="flex justify-center py-4">
        <h3 className="text-lg font-semibold text-white">Book Testing</h3>
      </div>
      <div className="py-12 ">
        <ul className="px-6 flex flex-col gap-y-8">
          <li className="cursor-pointer">
            <Link to={'/'}>
              <span className="flex items-center gap-x-2 text-white font-semibold">
                <FaHome /> Home
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarComponent;
