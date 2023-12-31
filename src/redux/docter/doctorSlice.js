import Axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const BASE_URL = 'https://doctor-4phi.onrender.com';

const initialState = {
  doctors: [],
  details: [],
  status: 'idle',
  error: null,
};

// create a new doctors

export const createDoctor = createAsyncThunk('doctors/createDoctor', async (data) => {
  const response = await Axios.post(`${BASE_URL}/doctors`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: Cookies.get('jwt_token'),
    },
  });
  return response.data;
});

export const fetchDoctors = createAsyncThunk('doctors/fechDoctors', async () => {
  const token = Cookies.get('jwt_token');
  try {
    const response = await Axios.get(`${BASE_URL}/doctors`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error && error.response && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('network error');
    }
  }
});

export const showDoctors = createAsyncThunk('doctors/showDoctors', async (id) => {
  const response = await Axios.get(`${BASE_URL}/doctors/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: Cookies.get('jwt_token'),
    },
  });
  return response.data;
});

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDoctors.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchDoctors.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.doctors = action.payload;
    });
    builder.addCase(fetchDoctors.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }).addCase(showDoctors.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(showDoctors.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.details = action.payload;
    });
    builder.addCase(showDoctors.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default doctorsSlice.reducer;
