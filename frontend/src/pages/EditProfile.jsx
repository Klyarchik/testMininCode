import axios from "axios"
import InputEdit from "../components/forProfile/InputEdit"
import Avatar from "../components/forHome/Avatar"
import { useRef } from "react"

const EditProfile = ({ currentName, currentEmail, avatar }) => {

  const emailRef = useRef()
  const nameRef = useRef()
  const avatarRef  = useRef()

  const edit = async () => {
    try{
      const response = await axios.put('http://localhost:8000/auth/profile')

    } catch (error){
      alert('Ошибка ', (error.response?.data?.message || error.message))
    }
  }


  return(
    <div>
      <h1>Редактирование профиля</h1>
      <InputEdit 
        ref={emailRef}
        type="text"
        placeholder="email"
        value={currentEmail}
      />
      <InputEdit 
        ref={nameRef}
        type="text"
        placeholder="Юзернейм"
        value={currentName}
      />
      <Avatar avatar={avatar} />
      <InputEdit
        ref={avatarRef}
        type="file"
      />

    </div>
  )
}

export default EditProfile