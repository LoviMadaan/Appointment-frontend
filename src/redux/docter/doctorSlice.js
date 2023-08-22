import Axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:3000';

const initialState = {
  doctors: [],
  details: [],
  status: 'idle',
  error: null,
};

export const fetchDoctors = createAsyncThunk('doctors/fechDoctors', async () => {
  const response = await Axios.get(BASE_URL, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: Cookies.get('jwt_token'),
    },
  });
  return response.data;
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
