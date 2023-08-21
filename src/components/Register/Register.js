import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { signUpAsync } from '../../redux/user/userSlice';
import './register.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MINIMUM_PASSWORD_LENGTH = 6;

  const { signError, success } = useSelector((store) => store.user);
  const [errors, setErrors] = useState('');
  const [mismatch, setMismatch] = useState('');
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const passwordConfirmation = formData.get('password_confirmation');

    if (password.length < MINIMUM_PASSWORD_LENGTH) {
      setErrors(`Password must be at least ${MINIMUM_PASSWORD_LENGTH} characters!`);
      return;
    }

    if (password !== passwordConfirmation) {
      setMismatch('Passwords do not match');
      return;
    }

    setErrors('');
    setMismatch('');

    const data = {
      user: {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    };

    dispatch(signUpAsync(data)).then((result) => {
      if (result && result.error) return;
      navigate('/login');
    });
  };

  return (
    <section className="register-section">
      {signError && <span className="text-danger">{signError}</span>}
      {errors && <span className="text-danger">{errors}</span>}
      <div className="register-container">
        <h2 className="register-title">Sign Up</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            placeholder="Enter your name"
            required
          />
          <input
            type="text"
            className="form-control"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
          />
          <input
            type="password"
            className="form-control form-control-lg"
            name="password_confirmation"
            id="password_confirmation"
            placeholder="Password confirmation"
            required
          />
          <div className="d-flex flex-column gap-2 justify-content-center">
            <button type="submit" className="button1 btn btn-secondary me-4 fs-4">
              Sign Up
            </button>
            <NavLink to="/login">
              <button type="button" className="button1 btn btn-secondary me-4 fs-4">Log in</button>
            </NavLink>
          </div>
          <p className="text-danger">{mismatch}</p>
          <p>{success}</p>
        </form>
      </div>
    </section>
  );
};

export default Register;
