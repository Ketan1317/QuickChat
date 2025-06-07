import React from 'react'
import { Route, Routes ,Router} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import ProfilePage from './Pages/ProfilePage'

const App = () => {
  return (
    <div className="bg-[url('/bgImage.svg')] bg-cover">
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
 
        </Routes>
    </div>
  )
}

export default App
