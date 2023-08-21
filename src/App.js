import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import MainPage from './components/MainPage/MainPage';
import { ProtectedRoute, Layout } from './components';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<SplashScreen />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route exact path="/mainpage" element={<Layout />}>
          <Route exact path="/mainpage" element={<MainPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
