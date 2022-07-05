import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarComponent from '../components/navbar';
import SidebarComponent from '../components/sidebar';

function Homepage() {
  const [sidebarActivated, setSidebarActivated] = useState(false);
  return (
    <div>
      <SidebarComponent active={sidebarActivated} />
      <NavbarComponent
        active={sidebarActivated}
        setActive={setSidebarActivated}
      />
      <div className="container mx-auto">
        <div className={`${sidebarActivated && 'mx-52 md:mx-36'} my-6`}>
          <Link to={'/'}>
            <span className="capitalize py-2 px-5 bg-orange-400 text-white rounded-md">
              new book
            </span>
          </Link>
          <div className="my-14">
            <h4>Books</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
