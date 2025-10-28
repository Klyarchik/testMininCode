import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './css/App.css'
import Reg from './pages/Reg'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import axios from 'axios'
import EditProfile from './pages/EditProfile'

const App = () => {

  axios.defaults.withCredentials = true  

  const location = useLocation() 
  const [isEnter, setIsEnter] = useState(false)
  const [currentName, setCurrentName] = useState("")
  const [currentEmail, setCurrentEmail] = useState("")
  const [avatar, setAvatar] = useState("")



  useEffect(() => {
    const isEnterFunc = async () => {
      try{
        const response = await axios.get('http://localhost:8000/auth/profile')
        console.log('response: ', response)
        setIsEnter(response.status === 200)
        setCurrentName(response.data.name)
        setCurrentEmail(response.data.email)
        setAvatar(response.data.avatar)
      } catch(error){
        if(error.response?.status === 403){
          return
        }
        setIsEnter(false)
        setCurrentName("")
        alert('Ошибка проверки пользователя ', (error.response?.data?.message || error.message))
      }
    }
    isEnterFunc()
  }, [location.pathname])
  



  return(
    <div>
      <Routes>

        <Route path='/' element={
          <Home 
            isEnter={isEnter} 
            currentName={currentName} 
            avatar={avatar} 
          />
        }/>

        <Route path='/reg' element={
          <Reg />
        }/>

        <Route path='/login' element={
          <Login 
            setIsEnter={setIsEnter} 
          />
        }/>

        <Route path='/profile' element={
          <Profile 
            setIsEnter={setIsEnter} 
            currentName={currentName} 
            currentEmail={currentEmail} 
            avatar={avatar}
          />
        }/>

        <Route path='/EditProfile' element={
          <EditProfile
            currentName={currentName}
            currentEmail={currentEmail}
            avatar={avatar}
          />
        }/>

      </Routes>
    </div>
  )
}

export default App