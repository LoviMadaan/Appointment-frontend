import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className={`layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className={`content ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button
          className={`sidebar-button btn btn-info ${isSidebarOpen ? 'open' : 'closed'}`}
          type="button"
          onClick={handleSidebarToggle}
        >
          <i className={`bi bi-caret-${isSidebarOpen ? 'right' : 'left'}-fill text-light`} />
        </button>
        <div className="content-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
