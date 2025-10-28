import axios from 'axios'
import InputAuth from '../components/forAuth/InputAuth'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsEnter }) => {

  axios.defaults.withCredentials = true

  const navigate = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()
  


  const log = async (dataUser) => {
    try{
      if(!dataUser.email || !dataUser.password){
        alert('Введите все данные!')
        return
      }

      const response = await axios.post('http://localhost:8000/auth/enter', {
        email: dataUser.email,
        password: dataUser.password
      })

      setIsEnter(response.status === 200)
      alert('Вы вошли в аккаунт!')
      navigate('/')
    } catch (error){
      if(error.response?.status === 422){
        alert('Введите корректную почту!')
        return
      } else if (error.response?.status === 404){
        alert('Пользователя с такими данными не существует!')
        return
      } else {
        alert('Ошибка ', (error.response?.data?.message || error.message))
      }
      
    }
  }



  return(
    <div>
      <h1>Вход</h1>
      <InputAuth ref={emailRef} type="text" placeholder="email" /><br/>
      <InputAuth ref={passwordRef} type="password" placeholder="Пароль" /><br/>
      <button onClick={() => {
        const dataUser = {
          email: emailRef.current.value,
          password: passwordRef.current.value
        }
        log(dataUser)
      }}>
        Войти
      </button>
    </div>
  )
}

export default Login