import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './css/App.css'
import Reg from './pages/Reg'
import Home from './pages/Home'

const App = () => {
  
  

  return(
    <div>



      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/reg' element={<Reg />} />
      </Routes>
    </div>
  )
}

export default App