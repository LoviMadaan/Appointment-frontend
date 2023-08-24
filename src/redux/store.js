import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import doctorReducer from './docter/doctorSlice';
import appointmentsReducer from './appointment/appointmentSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    doctors: doctorReducer,
    appointments: appointmentsReducer,
  },
});

export default store;
