import React, { useContext } from 'react'
import { Route, Routes ,Router, Navigate} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import {Toaster} from "react-hot-toast"
import ProfilePage from './Pages/ProfilePage'
import { AuthContext } from '../context/AuthContext'

const App = () => {
  const {authUser} = useContext(AuthContext);
  return (
    <div className="bg-[url('/bgImage.svg')] bg-cover">
      <Toaster/>
        <Routes>
          <Route path='/' element={ authUser ? <HomePage/> : <Navigate to="/login" />}/>
          <Route path='/login' element={ !authUser ? <LoginPage/> : <Navigate to="/" />}/>
          <Route path='/profile' element={ authUser ? <ProfilePage/> : <Navigate to="/login" />}/>
 
        </Routes>
    </div>
  )
}

export default App
