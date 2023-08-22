import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import doctorReducer from './docter/doctorSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    doctors: doctorReducer,
  },
});

export default store;
