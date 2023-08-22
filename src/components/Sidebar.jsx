import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../redux/user/userSlice';

const links = [
  { path: '/doctors', text: 'DOCTORS', icon: 'bi-speedometer2' },
  { path: '/doctors/new_appointment', text: 'ADD APPOINTMENT', icon: 'bi-calendar-plus' },
  { path: '/doctors/appointments', text: 'MY APPOINTMENTS', icon: 'bi-calendar-check' },
  { path: '/doctors/new', text: 'ADD DOCTOR', icon: 'bi-person-plus' },
  { path: '/doctors/delete', text: 'DELETE DOCTOR', icon: 'bi-person-dash' },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAsync()).then(() => {
      navigate('/');
    });
  };

  return (
    <nav id="sidebar" className="bg-light" style={{ width: '250px' }}>
      <div className="position-sticky">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <NavLink to="/doctors" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-5 d-none d-sm-inline text-dark">Doctor Appoinments</span>
          </NavLink>
          <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            {links.map((link) => (
              <li className="nav-item" key={link.text}>
                <NavLink to={link.path} className="nav-link align-middle  my-1">
                  <i className={`fs-4 ${link.icon}`} />
                  {' '}
                  <span className="ms-1 d-none d-sm-inline">{link.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <hr className="d-none d-sm-block" />
          <button
            className="btn btn-outline-danger btn-sm mb-4"
            onClick={handleLogout}
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
