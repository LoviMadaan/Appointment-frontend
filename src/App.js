import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Layout,
  ProtectedRoute,
  SplashScreen,
  Login,
  Register,
  Doctors,
  DoctorDetails,
  NewDoctor,
  Appointments,
  NewAppointment,
} from './components';

const App = () => (
  <Routes>
    <Route exact path="/" element={<SplashScreen />} />
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/signup" element={<Register />} />
    <Route element={<ProtectedRoute />}>
      <Route exact path="/doctors" element={<Layout />}>
        <Route exact path="/doctors" element={<Doctors />} />
        <Route exact path="/doctors/:id" element={<DoctorDetails />} />
        <Route exact path="/doctors/appointments" element={<Appointments />} />
        <Route exact path="/doctors/new_appointment" element={<NewAppointment />} />
        <Route exact path="/doctors/new" element={<NewDoctor />} />
      </Route>
    </Route>
  </Routes>
);

export default App;
