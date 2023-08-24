import Axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const BASE_URL = 'https://doctor-4phi.onrender.com';


const initialState = {
  appointments: [],
  status: 'idle',
  error: null,
};

export const createAppointment = createAsyncThunk('appointment/createAppointment', async (data) => {
  const response = await Axios.post(`${BASE_URL}/doctors/${data.id}/appointments`, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: Cookies.get('jwt_token'),
    },
  });
  return response.data;
});

export const fetchAppointments = createAsyncThunk('appointment/fetchAppointments', async () => {
  const response = await Axios.get('https://doctor-4phi.onrender.com/appointments', {

    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: Cookies.get('jwt_token'),
    },
  });
  return response.data;
});

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAppointment.pending, (state) => ({
      ...state,
      status: 'loading',
    })).addCase(createAppointment.fulfilled, (state, action) => ({
      ...state,
      status: 'successful',
      appointment: state.appointments.concat(action.payload),

    })).addCase(createAppointment.rejected, (state, action) => ({
      ...state,
      status: 'failed',
      error: action.error.message,
      isSuccessfull: false,
    })).addCase(fetchAppointments.pending, (state) => {
      state.status = 'loading';
    })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default appointmentSlice.reducer;
