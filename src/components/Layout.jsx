import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => (
  <div className="container-fluid">
    <div className="row main-page">
      <div className=" col-xxl-1 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xm-6">
        <Sidebar />
      </div>

      <div
        className="col-outlet-oepn col-xxl-9 col-xl-9 col-lg-8 col-md-8 col-sm-6 col-xm-6 mx-auto py-6"
      >
        <Outlet />
      </div>
    </div>
  </div>
);

export default Layout;
