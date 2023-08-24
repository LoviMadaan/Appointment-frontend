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

const url = 'https://doctor-4phi.onrender.com';

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
      const { token } = res.data;
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
      const { token } = res.data;
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

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => ({
      ...state,
      userData: null,
      isAuthenticated: false,
    }),
  },
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
    }));
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
