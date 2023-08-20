import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
  userData: null,
  isAuthenticated: false,
  success: false,
  signError: null,
  loginError: null,
};

const url = 'http://localhost:3000';

export const signUpAsync = createAsyncThunk(
  'signup/Async',
  async (FormData) => {
    try {
      const res = await axios.post(`${url}/signup`, FormData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const token = res.headers.get('Authorization');
      const expirationTimeInMinutes = 10;
      Cookies.set('jwt_token', token, { expires: expirationTimeInMinutes });
      return res.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Unknow action error!');
    }
  },
);

export const loginAsync = createAsyncThunk(
  'login/Async',
  async (formData) => {
    try {
      const res = await axios.post(`${url}/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const token = res.headers.get('Authorization');
      const userInfo = res.data.user;
      const expirationTimeInMinutes = 5;
      Cookies.set('jwt_token', token, { expires: expirationTimeInMinutes / (24 * 60) });
      Cookies.set('user_info', JSON.stringify(userInfo), { expires: expirationTimeInMinutes / (24 * 60) });
      return res.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Unknown action error!');
    }
  },
);

export const logoutAsync = createAsyncThunk(
  'logout/Async',
  async () => {
    const res = await axios.delete(`${url}/logout`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('jwt_token'),
      },
    });
    Cookies.remove('jwt_token');
    Cookies.remove('user_info');
    return res.data;
  },
);

const userSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers(builder) {
    builder.addCase(signUpAsync.fulfilled, (state, action) => ({
      ...state,
      userData: action.payload,
    })).addCase(signUpAsync.rejected, (state, action) => ({
      ...state,
      isAuthenticated: false,
      signError: action.error.message,
    })).addCase(loginAsync.fulfilled, (state, action) => ({
      ...state,
      userData: action.payload,
      isAuthenticated: true,
    })).addCase(loginAsync.rejected, (state, action) => ({
      ...state,
      isAuthenticated: false,
      loginError: action.error.message,
    }))
      .addCase(logoutAsync.fulfilled, (state) => ({
        ...state,
        userData: null,
        isAuthenticated: false,
      }));
  },
});
export default userSlice.reducer;