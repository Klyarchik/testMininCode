import InputAuth from "../components/forAuth/InputAuth"
import { useRef, useState } from "react"
import { useNavigate } from 'react-router-dom'

import axios from 'axios'


const Reg = () => {

  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  const emailRef = useRef()
  const passwordRef = useRef()
  const returnPasswordRef = useRef()
  const usernameRef = useRef()

  const regUser = async (dataUser) => {
    if(!dataUser.email || !dataUser.password || !dataUser.name) {
      alert('Введите все данные!')
      return
    }

    if (dataUser.password !== returnPasswordRef.current.value) {
      alert('Пароли не совпадают!')
      return
    }

    try{
      const response = await axios.post('http://localhost:8000/auth/reg', {
        email: dataUser.email,
        password: dataUser.password,
        name: dataUser.name
      })


      console.log('response: ', response)
      alert('Вы успешно зарегистрировались!')
    } catch (error){
      alert('Ошибка авторизации\n ', (error.response?.data?.message || error.message))
    }
  }
    
  

  return (
    <div>
      <h1>Регистрация</h1>
      <InputAuth ref={emailRef} type="text" placeholder="Почта"/><br/>
      <InputAuth ref={usernameRef} type="text" placeholder="Юзернейм"/><br/>
      <InputAuth ref={passwordRef} type="password" placeholder="Пароль"/><br/>
      <InputAuth ref={returnPasswordRef} type="password" placeholder="Повторите пароль"/><br/>
      

      <button onClick={() => {
        const dataUser = {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          name: usernameRef.current.value
        }
        regUser(dataUser)
      }}>
        Клик
      </button>
    </div>
  )
}

export default Reg