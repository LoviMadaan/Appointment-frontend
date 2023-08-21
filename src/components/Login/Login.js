import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginAsync } from '../../redux/user/userSlice';
import './login.css';

const Login = () => {
  const { loginError, success } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const email = formData.get('email');
    const password = formData.get('password');

    const data = {
      user: { email, password },
    };

    try {
      await dispatch(loginAsync(data));
      navigate('/mainpage');
      e.target.reset();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form" ref={formRef}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
          />
          <div className="d-flex flex-column gap-2">
            <button type="submit" className="button1 btn btn-secondary me-4 fs-4">
              Log in
            </button>
            <NavLink to="/signup">
              <button type="button" className="button1 btn btn-secondary me-4 fs-4">Sign Up</button>
            </NavLink>
          </div>
          {loginError && <p className="text-danger">{loginError}</p>}
          {success && <p>{success}</p>}
        </form>
      </div>
    </section>
  );
};

export default Login;
