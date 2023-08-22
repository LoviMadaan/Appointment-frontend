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
} from './components';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<SplashScreen />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route exact path="/doctors" element={<Layout />}>
          <Route exact path="/doctors" element={<Doctors />} />
          <Route exact path="/doctors/:id" element={<DoctorDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
