import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  const handleNavbarToggle = () => {
    setIsNavbarOpen((prevState) => !prevState);
  };

  return (
    <div className="container-fluid">
      <div className="row main-page">
        <div className={` col-xxl-1 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xm-6 ${isNavbarOpen ? 'open' : 'closed'}`}>
          {isNavbarOpen && <Sidebar />}
        </div>

        <div
          className={`col-outlet-${isNavbarOpen ? 'open' : 'closed'} col-xxl-9 col-xl-9 col-lg-8 col-md-8 col-sm-6 col-xm-6 mx-auto py-6`}
        >
          <Outlet />
          <button
            className="navbar-button d-flex btn card align-item-end justify-content-end mb-5 mt-auto border rounded-end-5 bg-info"
            type="button"
            onClick={handleNavbarToggle}
          >
            <i className={`bi bi-caret-${isNavbarOpen ? 'right' : 'left'}-fill text-light`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
