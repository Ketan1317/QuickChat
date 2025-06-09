import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import { Toaster } from "react-hot-toast";
import { AuthContext } from '../context/AuthContext';

const App = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <div className="bg-[url('/okimage.png')] bg-cover">
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <LoginPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;